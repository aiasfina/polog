var m = require('mithril');
var utils = require('../utils.js');

var Attachment = {
  list: [],
  loadList: function() {
    m.request({
      method: 'GET',
      url: '/admin/attachments.json'
    })
    .then(function(data) {
      Attachment.list = data;
    });
  }
}

module.exports = Attachment;
