var m = require('mithril');
var TableComponent = require('./table.jsx');
var PaginationComponent = require('./pagination.jsx');
var Comment = require('../models/comment.js');

var HeaderList = [
  'Id',
  '文章标题',
  '用户名',
  '删除'
];

var Attributes = [
  'id',
  'post_title',
  'account_name',
  function(index) {
    return <a href="javascript:void(0);" className="btn btn-danger btn-xs" onclick={destroy(this, index)}><i className="fa fa-times"></i></a>
  }
];

function destroy(comment, index) {
  return function() {
    if (confirm('是否删除？') === true) {
      Comment.destroy(comment)
      .then(function() {
        Comment.list.splice(index, 1);
      })
    }
  }
}

module.exports = {
  oninit: Comment.loadList(1),
  view: function() {
    return(
      <div>
        {m(TableComponent, {headerList: HeaderList, attributes: Attributes, list: Comment.list})}
        {m(PaginationComponent, {pagination: Comment.pagination, loadList: Comment.loadList})}
      </div>
    )
  }
}
