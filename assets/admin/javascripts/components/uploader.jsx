var m = require('mithril');
var Dropzone = require('dropzone');
var Attachment = require('../models/attachment.js');
var utils = require('../utils.js');

Dropzone.autoDiscover = false;

var Component = {
  dropzone: null,
  oncreate: function(vnode) {
    if (!Component.dropzone) {
      Component.dropzone = new Dropzone(vnode.dom, {
        url: '/admin/attachments/create'
      });

      Component.dropzone.on('sending', function(file, xhr, formData) {
        var token = utils.getCSRFToken();
        formData.append(token[0], token[1]);
      })

      Component.dropzone.on('success', function(file, resp, event) {
        Attachment.list.unshift(JSON.parse(resp));
        m.redraw();
      });
    }
  },
  view: function() {
    return(
      <div className="dropzone"></div>
    )
  }
}

module.exports = Component;
