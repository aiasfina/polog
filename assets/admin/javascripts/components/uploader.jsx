var m = require('mithril');
var Dropzone = require('dropzone');
var Attachment = require('../models/attachment.js');

var Component = {
  view: function() {
    return(
      <form action="/admin/attachments/create" class="dropzone" enctype="multipart/form-data">
      </form>
    )
  }
}

module.exports = Component;
