var m = require('mithril');
var Account = require('../models/account.js');

var Form = {
  name: '',
  surname: '',
  password: '',
  password_confirmation: '',
  email: '',
  role: ''
};

var Error = {};

var FormComponent = {
  updateForm: function(name) {
    return function(value) {
      Form[name] = value;
    }
  },
  reset: function() {
    for (var key in Form) {
      if (Form.hasOwnProperty(key)) {
        Form[key] = '';
      }
    }

    for (var key in Error) {
      if (Error.hasOwnProperty(key)) {
        Error[key] = '';
      }
    }
  },
  submit: function(e) {
    if (Account.valid(Form, Error)) {
      (FormComponent.isEdit() ? Account.update(Form) : Account.create(Form))
      .then(function() {
        $('#accountModal').modal('hide');
        FormComponent.reset();
      });
    }
  },
  isEdit: function() {
    return !!Form.id
  },
  errorClassName: function(name) {
    return Error[name] ? ' has-error' : ''
  },
  errorMessage: function(name) {
    if (Error[name]) {
      return <p class="text-danger text-right">{Error[name]}</p>
    }
  },
  view: function() {
    return(
      <form>
        <div className={"form-group" + this.errorClassName('name')}>
          <label className="control-label" htmlFor="account_name">用户名</label>
          <input id="account_name" type="text" className="form-control" value={Form.name} oninput={m.withAttr('value', this.updateForm('name'))} />
        </div>
        <div className={"form-group" + this.errorClassName('surname')}>
          <label className="control-label" htmlFor="account_surname">别名</label>
          <input id="account_surname" type="text" className="form-control" value={Form.surname} oninput={m.withAttr('value', this.updateForm('surname'))} />
        </div>
        <div className={"form-group" + this.errorClassName('email')}>
          <label className="control-label" htmlFor="account_email">邮箱</label>
          <input id="account_email" type="text" className="form-control" disabled={this.isEdit()}
            value={Form.email} oninput={m.withAttr('value', this.updateForm('email'))} />
          {this.errorMessage('email')}
        </div>
        <div className={"form-group" + this.errorClassName('password')}>
          <label className="control-label" htmlFor="account_password">密码</label>
          <input id="account_password" type="password" className="form-control" disabled={this.isEdit()}
            value={Form.password} oninput={m.withAttr('value', this.updateForm('password'))} />
          {this.errorMessage('password')}
        </div>
        <div className={"form-group" + this.errorClassName('password_confirmation')}>
          <label className="control-label" htmlFor="account_password_confirmation">确认密码</label>
          <input id="account_password_confirmation" type="password" className="form-control" disabled={this.isEdit()}
            value={Form.password_confirmation} oninput={m.withAttr('value', this.updateForm('password_confirmation'))} />
            {this.errorMessage('password_confirmation')}
        </div>
        <div className={"form-group" + this.errorClassName('role')}>
          <label className="control-label" htmlFor="account_role">角色</label>
          <input id="account_role" type="text" className="form-control" value={Form.role} oninput={m.withAttr('value', this.updateForm('role'))} />
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

module.exports = FormComponent;
