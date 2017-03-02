var m = require('mithril');
var tableComponent = require('./components/post_table.jsx');

window.initPostIndex = function() {
  var el = document.querySelectorAll('.table-wrapper')[0];
  m.mount(el, tableComponent);
}
