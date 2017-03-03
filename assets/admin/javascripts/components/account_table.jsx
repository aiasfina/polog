var m = require('mithril');
var Account = require('../models/account.js');
var ModalComponent = require('./modal.jsx');

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

var TableComponent = {
  oninit: Account.loadList,
  checkedAll: false,
  selectAllAccount: function(checked) {
    this.checkedAll = checked;
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
  edit: function(account) {
    return function() {
      FormComponent.reset();
      ['id', 'name', 'surname', 'email', 'role'].forEach(function(name) {
        FormComponent.form[name] = account[name];
      });
      $('#accountModal').modal();
    }
  },
  renderRowView: function(account) {
    return(
      <tr className={Account.selectedObject[account.id] ? 'active' : ''}
        onclick={this.selectAccount.bind(account)} >
        <td><input type="checkbox" checked={!!Account.selectedObject[account.id]} /></td>
        <td>{account.id}</td>
        <td>{account.name}</td>
        <td>{account.email}</td>
        <td>{account.role}</td>
        <td><a href="javascript:void(0);" onclick={this.edit(account)}><i className="fa fa-edit"></i></a></td>
      </tr>
    )
  },
  view: function() {
    return(
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" onclick={m.withAttr('checked', this.selectAllAccount.bind(this))}
              checked={this.checkedAll} /></th>
            <th>id</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {Account.list.map(function(account) {
            return TableComponent.renderRowView(account)
          })}
        </tbody>
      </table>
    )
  }
}

var FormComponent = {
  form: {
    name: '',
    surname: '',
    password: '',
    password_confirmation: '',
    email: '',
    role: ''
  },
  errors: {},
  updateForm: function(name) {
    var form = this.form;
    return function(value) {
      form[name] = value;
    }
  },
  reset: function() {
    for (var key in this.form) {
      if (this.form.hasOwnProperty(key)) {
        this.form[key] = '';
      }
    }

    for (var key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        this.errors[key] = '';
      }
    }
  },
  submit: function(e) {
    if (Account.valid(this.form, this.errors)) {
      (FormComponent.isEdit() ? Account.update(this.form) : Account.create(this.form))
      .then(function() {
        $('#accountModal').modal('hide');
        FormComponent.reset();
      });
    }
  },
  isEdit: function() {
    return !!FormComponent.form.id
  },
  errorClassName: function(name) {
    return FormComponent.errors[name] ? ' has-error' : ''
  },
  errorMessage: function(name) {
    if (FormComponent.errors[name]) {
      return <p class="text-danger text-right">{FormComponent.errors[name]}</p>
    }
  },
  view: function() {
    return(
      <form>
        <div className={"form-group" + this.errorClassName('name')}>
          <label className="control-label" htmlFor="account_name">用户名</label>
          <input id="account_name" type="text" className="form-control" value={this.form.name} oninput={m.withAttr('value', this.updateForm('name'))} />
        </div>
        <div className={"form-group" + this.errorClassName('surname')}>
          <label className="control-label" htmlFor="account_surname">别名</label>
          <input id="account_surname" type="text" className="form-control" value={this.form.surname} oninput={m.withAttr('value', this.updateForm('surname'))} />
        </div>
        <div className={"form-group" + this.errorClassName('email')}>
          <label className="control-label" htmlFor="account_email">邮箱</label>
          <input id="account_email" type="text" className="form-control" disabled={this.isEdit()}
            value={this.form.email} oninput={m.withAttr('value', this.updateForm('email'))} />
          {this.errorMessage('email')}
        </div>
        <div className={"form-group" + this.errorClassName('password')}>
          <label className="control-label" htmlFor="account_password">密码</label>
          <input id="account_password" type="password" className="form-control" disabled={this.isEdit()}
            value={this.form.password} oninput={m.withAttr('value', this.updateForm('password'))} />
          {this.errorMessage('password')}
        </div>
        <div className={"form-group" + this.errorClassName('password_confirmation')}>
          <label className="control-label" htmlFor="account_password_confirmation">确认密码</label>
          <input id="account_password_confirmation" type="password" className="form-control" disabled={this.isEdit()}
            value={this.form.password_confirmation} oninput={m.withAttr('value', this.updateForm('password_confirmation'))} />
            {this.errorMessage('password_confirmation')}
        </div>
        <div className={"form-group" + this.errorClassName('role')}>
          <label className="control-label" htmlFor="account_role">角色</label>
          <input id="account_role" type="text" className="form-control" value={this.form.role} oninput={m.withAttr('value', this.updateForm('role'))} />
          {this.errorMessage('role')}
        </div>
        <div className="form-group clearfix">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary pull-right" onclick={this.submit.bind(this)}>保存</button>
        </div>
      </form>
    )
  }
}

module.exports = {
  view: function() {
    return [
      m(FilterComponent),
      m(TableComponent),
      m(ModalComponent, {id: 'accountModal'}, m(FormComponent))
    ]
  }
}
