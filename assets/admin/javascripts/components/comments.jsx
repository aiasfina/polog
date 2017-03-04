var m = require('mithril');
var TableComponent = require('./table.jsx');
var Comment = require('../models/comment.js');

var HeaderList = [
  'Id',
  '文章标题',
  '用户名',
  '删除'
];

var Attributes = [
  'id',
  'post_id',
  'account_name',
  function(index) {
    return <a href="javascript:void(0);" className="btn btn-danger btn-xs" onclick={destroy(this, index)}><i className="fa fa-times"></i></a>
  }
];

function destroy(comment, index) {
  return function() {
    Comment.destroy(comment)
    .then(function() {
      Comment.list.splice(index, 1);
    })
  }
}

module.exports = {
  oninit: Comment.loadList,
  view: function() {
    return m(TableComponent, {headerList: HeaderList, attributes: Attributes, list: Comment.list})
  }
}
