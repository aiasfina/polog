var m = require('mithril');
var utils = require('../utils.js');

function updatePagination(resp) {
  Attachment.pagination.current_page = resp.current_page;
  Attachment.pagination.is_first_page = resp.is_first_page;
  Attachment.pagination.is_last_page = resp.is_last_page;
}

var Attachment = {
  list: [],
  pagination: {
    current_page: 0,
    is_first_page: false,
    is_last_page: false
  },
  loadList: function(page) {
    page = page || 1;
    return function() {
      m.request({
        method: 'GET',
        url: '/admin/attachments.json',
        data: {page: page}
      })
      .then(function(resp) {
        Attachment.list = resp.data;
        updatePagination(resp);
      });
    }
  }
}

module.exports = Attachment;
