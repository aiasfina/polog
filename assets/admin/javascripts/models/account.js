var m = require('mithril');
var utils = require('../utils.js');

var validations = {
  email: {
    pattern: function(value) { return /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/.test(value) },
    message: '邮箱格式不合法',
    skip: function() { return !!this.id }
  },
  role: {
    pattern: function(value) { return /[A-Za-z]/.test(value) },
    message: '角色只允许英文字母'
  },
  password: {
    pattern: function(value) { return value.length > 4 },
    message: '密码长度必须大于4',
    skip: function() { return !!this.id }
  },
  password_confirmation: {
    pattern: function(value) { return value === this.password },
    message: '两次输入密码不同',
    skip: function() { return !!this.id }
  }
}

var Account = {
  list: [],
  loadList: function() {
    m.request({
      method: 'GET',
      url: '/admin/accounts.json',
      withCredentials: true
    })
    .then(function(resp) {
      Account.list = resp.data;
    })
  },
  create: function(form) {
    return m.request({
            method: 'POST',
            url: '/admin/accounts/create',
            data: {account: form},
            withCredentials: true,
            config: utils.xhrConfig
          })
          .then(function(resp) {
            Account.list.unshift(resp);
          })
  },
  update: function(form) {
    return m.request({
            method: 'PUT',
            url: '/admin/accounts/update/' + form.id,
            data: {account: form},
            withCredentials: true,
            config: utils.xhrConfig
          })
          .then(function(resp) {
            for (var i = 0; i < Account.list.length; i++) {
              if (resp.id === Account.list[i].id) {
                Account.list[i] = resp;
              }
            }
          })
  },
  valid: function(form, errors) {
    var validation, flag = true;

    for (var key in form) {
      validation = validations[key];
      if (validation) {
        if (!(validation.skip && validation.skip.call(form))) {
          if (!validation.pattern.call(form, form[key])) {
            errors[key] = validation.message;
            flag = false;
          } else {
            errors[key] = null;
          }
        }
      }
    }

    return flag
  },
  selectedObject: {}
}

module.exports = Account;
