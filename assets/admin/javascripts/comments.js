var m = require('mithril');
var CommentsComponent = require('./components/comments.jsx');

window.initCommentIndex = function() {
  var el = document.querySelectorAll('.table-wrapper')[0];
  m.mount(el, CommentsComponent);
}
