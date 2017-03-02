var m = require('mithril');
var utils = require('../utils.js');
var SimpleMDE = require('simplemde/src/js/simplemde.js');

var MarkdownComponent = {
  simplemde: null,
  oncreate: function(vnode) {
    if (vnode.tag == 'textarea') {
      MarkdownComponent.simplemde = new SimpleMDE({
        element: vnode.dom,
        autoDownloadFontAwesome: false
      });
    }
  },
  getContent: function() {
    return this.simplemde.value();
  },
  setContent: function(content) {
    this.simplemde.value(content);
  },
  view: function(vnode) {
    return(
      <div className="simplemde-wrapper">
        <textarea oncreate={MarkdownComponent.oncreate}></textarea>
      </div>
    )
  }
}

module.exports = MarkdownComponent;
