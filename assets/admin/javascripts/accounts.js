var m = require('mithril');
var AccountsComponent = require('./components/accounts.jsx');

window.initAccountIndex = function() {
  var el = document.querySelectorAll('.table-wrapper')[0];
  m.mount(el, AccountsComponent);
}
