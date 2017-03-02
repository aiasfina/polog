var m = require('mithril');
var Post = require('../models/post.js');

var TableComponent = {
  oninit: Post.loadList,
  checkedAll: false,
  selectAll: function(checked) {
    this.checkedAll = checked;
    if (checked) {
      Post.list.forEach(function(post) {
        Post.selectedObject[post.id] = post;
      });
    } else {
      Post.selectedObject = {};
    }
  },
  select: function() {
    Post.selectedObject[this.id] = Post.selectedObject[this.id] ? null : this;
  },
  publish: function(checked) {
    this.published = checked;
    Post.publish(this);
  },
  destroy: function(post, index) {
    return function() {
      if (confirm('是否删除？') === true) {
        Post.destroy(post)
        .then(function() {
          Post.list.splice(index, 1);
        });
      }
    }
  },
  renderRowView: function(post, index) {
    return(
      <tr className={Post.selectedObject[post.id] ? 'active' : ''}
        onclick={this.select.bind(post)} >
        <td><input type="checkbox" checked={!!Post.selectedObject[post.id]} /></td>
        <td>{post.title}</td>
        <td>
          <input type="checkbox" onclick={m.withAttr('checked', TableComponent.publish.bind(post))} checked={post.published} />
        </td>
        <td>{post.published_at}</td>
        <td>
          <a href={'/admin/posts/edit/' + post.id} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i> 编辑</a>
          <a href="javascript:void(0);" className="btn btn-danger btn-xs" onclick={TableComponent.destroy(post, index)}><i className="fa fa-times"></i> 删除</a>
        </td>
      </tr>
    )
  },
  view: function() {
    return(
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" onclick={m.withAttr('checked', this.selectAll.bind(this))}
              checked={this.checkedAll} /></th>
            <th>标题</th>
            <th>发布</th>
            <th>发布时间</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {Post.list.map(function(post, index) {
            return TableComponent.renderRowView(post, index)
          })}
        </tbody>
      </table>
    )
  }
}

module.exports = {
  view: function() {
    return [
      m(TableComponent)
    ]
  }
}
