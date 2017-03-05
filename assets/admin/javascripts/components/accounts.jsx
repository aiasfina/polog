var m = require('mithril');
var Account = require('../models/account.js');
var ModalComponent = require('./modal.jsx');
var FormComponent = require('./account_form.jsx');
var TableComponent = require('./table.jsx');
var PaginationComponent = require('./pagination.jsx');

var FilterComponent = {
  newAccount: function() {
    FormComponent.reset();
    $('#accountModal').modal();
  },
  view: function() {
    return(
      <div className="filters clearfix">
        <a href="#" className="btn btn-default">All</a>
        <a href="javascript:void(0);" className="btn btn-primary pull-right" onclick={this.newAccount}><i className="fa fa-plus"></i> 添加用户</a>
      </div>
    )
  }
}

var HeaderList = [
  'Id',
  '用户名',
  '别名',
  '邮箱',
  '角色',
  '编辑'
];

var Attributes = [
  'id',
  'name',
  'surname',
  'email',
  'role',
  function() {
    return <a href="javascript:void(0);" className="btn btn-primary btn-xs" onclick={edit(this)}><i className="fa fa-pencil"></i></a>
  }
];

function edit(account) {
  return function() {
    FormComponent.reset();
    ['id', 'name', 'surname', 'email', 'role'].forEach(function(name) {
      FormComponent.updateForm(name)(account[name]);
    });
    $('#accountModal').modal();
  }
}

module.exports = {
  oninit: Account.loadList(1),
  view: function() {
    return [
      m(FilterComponent),
      m(TableComponent, {headerList: HeaderList, attributes: Attributes, list: Account.list}),
      m(PaginationComponent, {pagination: Account.pagination, loadList: Account.loadList}),
      m(ModalComponent, {id: 'accountModal'}, m(FormComponent))
    ]
  }
}
