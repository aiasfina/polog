var m = require('mithril');
var Account = require('../models/account.js');

var Component = {
  oninit: Account.loadList,
  checkedAll: false,
  selectAllAccount: function(checked) {
    Component.checkedAll = checked;
    if (checked) {
      Account.list.forEach(function(account) {
        Account.selectedObject[account.id] = account;
      });
    } else {
      Account.selectedObject = {};
    }
  },
  selectAccount: function() {
    Account.selectedObject[this.id] = Account.selectedObject[this.id] ? null : this;
  },
  renderRowView: function(account) {
    return(
      <tr className={Account.selectedObject[account.id] ? 'active' : ''}
        onclick={Component.selectAccount.bind(account)} >
        <td><input type="checkbox" checked={!!Account.selectedObject[account.id]} /></td>
        <td>{account.id}</td>
        <td>{account.name}</td>
        <td>{account.email}</td>
        <td>{account.role}</td>
      </tr>
    )
  },
  view: function() {
    return(
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" onclick={m.withAttr('checked', Component.selectAllAccount)}
              checked={Component.checkedAll} /></th>
            <th>id</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
          </tr>
        </thead>
        <tbody>
          {Account.list.map(function(account) {
            return Component.renderRowView(account)
          })}
        </tbody>
      </table>
    )
  }
}

module.exports = Component;
