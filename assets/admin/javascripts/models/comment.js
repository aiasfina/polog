var m = require('mithril');
var utils = require('../utils.js');

var Comment = {
  list: [],
  loadList: function() {
    m.request({
      method: 'GET',
      url: '/admin/comments.json'
    })
    .then(function(resp) {
      Comment.list = resp.data;
    })
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
