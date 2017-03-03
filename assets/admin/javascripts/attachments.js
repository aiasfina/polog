var m = require('mithril');
var UploaderComponent = require('./components/uploader.jsx');

window.initUploader = function() {
  var el = document.getElementById('uploader');
  m.mount(el, UploaderComponent);
}
