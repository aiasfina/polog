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
  renderRowView: function(post) {
    return(
      <tr className={Post.selectedObject[post.id] ? 'active' : ''}
        onclick={this.select.bind(post)} >
        <td><input type="checkbox" checked={!!Post.selectedObject[post.id]} /></td>
        <td>{post.title}</td>
        <td>
          <input type="checkbox" onclick={m.withAttr('checked', TableComponent.publish.bind(post))} checked={post.published} />
        </td>
        <td>{post.published_at}</td>
        <td><a href={'/admin/posts/edit/' + post.id}> <i className="fa fa-edit"></i></a></td>
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
          {Post.list.map(function(post) {
            return TableComponent.renderRowView(post)
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
