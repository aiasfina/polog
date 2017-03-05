var m = require('mithril');
var utils = require('../utils.js');

function updatePagination(resp) {
  Post.pagination.current_page = resp.current_page;
  Post.pagination.is_first_page = resp.is_first_page;
  Post.pagination.is_last_page = resp.is_last_page;
}

var Post = {
  list: [],
  pagination: {
    current_page: 0,
    is_first_page: false,
    is_last_page: false
  },
  loadList: function (page) {
    page = page || 1;
    return function() {
      m.request({
        method: 'GET',
        url: '/admin/posts.json',
        data: {page: page},
        withCredentials: true
      })
      .then(function(resp) {
        Post.list = resp.data;
        updatePagination(resp);
      })
    }
  },
  load: function(id) {
    return m.request({
      method: 'GET',
      url: '/admin/posts/show/' + id,
      withCredentials: true
    })
  },
  create: function(form) {
    return m.request({
        method: 'POST',
        url: '/admin/posts/create',
        data: {post: form},
        withCredentials: true,
        config: utils.xhrConfig
      })
  },
  update: function(form) {
    return m.request({
      method: 'PUT',
      url: '/admin/posts/update/' + form.id,
      data: {post: form},
      withCredentials: true,
      config: utils.xhrConfig
    })
  },
  publish: function(post) {
    return m.request({
      method: 'PUT',
      url: '/admin/posts/publish/' + post.id,
      data: {published: post.published},
      withCredentials: true,
      config: utils.xhrConfig
    })
    .then(function(resp) {
      post.published_at = resp.published_at;
    })
  },
  destroy: function(post) {
    return m.request({
      method: 'DELETE',
      url: '/admin/posts/destroy/' + post.id,
      withCredentials: true,
      config: utils.xhrConfig
    })
  },
  selectedObject: {}
}

module.exports = Post;
