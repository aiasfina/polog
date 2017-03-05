var m = require('mithril');
var PostsComponent = require('./components/posts.jsx');
var EditorComponent = require('./components/post_editor.jsx');

window.initPostIndex = function() {
  var el = document.querySelectorAll('.table-wrapper')[0];
  m.mount(el, PostsComponent);
}

window.initPostEditor = function() {
  var el = document.getElementById('post-editor');
  m.mount(el, EditorComponent);
}
