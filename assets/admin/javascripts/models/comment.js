var m = require('mithril');
var utils = require('../utils.js');

function updatePagination(resp) {
  Comment.pagination.current_page = resp.current_page;
  Comment.pagination.is_first_page = resp.is_first_page;
  Comment.pagination.is_last_page = resp.is_last_page;
}

var Comment = {
  list: [],
  pagination: {
    current_page: 0,
    is_first_page: false,
    is_last_page: false
  },
  loadList: function(page) {
    page = page || 1;
    return function() {
      m.request({
        method: 'GET',
        url: '/admin/comments.json',
        data: {page: page}
      })
      .then(function(resp) {
        Comment.list = resp.data;
        updatePagination(resp);
      })
    }
  },
  destroy: function(comment) {
    return m.request({
      method: 'DELETE',
      url: '/admin/comments/destroy/' + comment.id,
      config: utils.xhrConfig
    })
  }
}

module.exports = Comment;
