var m = require('mithril');
var tableComponent = require('./components/account_table.jsx');

window.initAccountIndex = function() {
  var el = document.querySelectorAll('.table-wrapper')[0];
  m.mount(el, tableComponent);
}
