var m = require('mithril');

var Account = {
  list: [],
  loadList: function() {
    m.request({
      method: 'GET',
      url: '/admin/accounts.json',
      withCredentials: true
    })
    .then(function(data) {
      Account.list = data;
    })
  },
  selectedObject: {}
}

module.exports = Account;
