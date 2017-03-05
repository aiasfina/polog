var m = require('mithril');
var Post = require('../models/post.js');
var TableComponent = require('./table.jsx');
var PaginationComponent = require('./pagination.jsx');

var HeaderList = [
  '标题',
  '发布',
  '发布时间',
  '编辑',
  '删除'
];

var Attributes = [
  'title',
  function() {
    return <input type="checkbox" onclick={m.withAttr('checked', publish.bind(this))} checked={this.published} />
  },
  'published_at',
  function() {
    return <a href={'/admin/posts/edit/' + this.id} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></a>
  },
  function(index) {
    return <a href="javascript:void(0);" className="btn btn-danger btn-xs" onclick={destroy(this, index)}><i className="fa fa-times"></i></a>
  }
];

function publish(checked) {
  this.published = checked;
  Post.publish(this);
}

function destroy(post, index) {
  return function() {
    if (confirm('是否删除？') === true) {
      Post.destroy(post)
      .then(function() {
        Post.list.splice(index, 1);
      });
    }
  }
}

module.exports = {
  oninit: Post.loadList(1),
  view: function() {
    return [
      m(TableComponent, {headerList: HeaderList, attributes: Attributes, list: Post.list}),
      m(PaginationComponent, {pagination: Post.pagination, loadList: Post.loadList})
    ]
  }
}
