var m = require('mithril');
var UploaderComponent = require('./components/uploader.jsx');
var Attachments = require('./components/attachments.jsx');

window.initUploader = function() {
  var el = document.getElementById('uploader');
  m.mount(el, {
    view: function() {
      return [
        m(UploaderComponent),
        m(Attachments)
      ]
    }
  });
}
