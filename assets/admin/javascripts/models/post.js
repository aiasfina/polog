var m = require('mithril');
var utils = require('../utils.js');

var Post = {
  list: [],
  loadList: function (){
    m.request({
      method: 'GET',
      url: '/admin/posts.json',
      withCredentials: true
    })
    .then(function(data) {
      Post.list = data;
    })
  },
  selectedObject: {}
}

module.exports = Post;
