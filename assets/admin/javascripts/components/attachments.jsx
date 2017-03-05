var m = require('mithril');
var Attachment = require('../models/attachment.js');
var utils = require('../utils.js');
var PaginationComponent = require('./pagination.jsx');

var ItemComponent = {
  itemCover: function(attachment) {
    switch(attachment.extname) {
      case 'png':
      case 'jpeg':
      case 'jpg':
        return <div className="attachment-cover img-cover"><img src={attachment.url} alt=""/></div>
      default:
        return <div className="attachment-cover default-cover">{attachment.extname}</div>
    }
  },
  view: function(vnode) {
    var attachment = vnode.attrs.attachment;

    return(
      <li>
        <p>{ItemComponent.itemCover(attachment)}</p>
        <p><input type="text" class="form-control" value={attachment.url} disabled title={attachment.url}/></p>
      </li>
    )
  }
}

var ListComponent = {
  oninit: Attachment.loadList(1),
  view: function() {
    return(
      <ul className="attachment-list">
        {Attachment.list.map(function(attachment) {
          return m(ItemComponent, {attachment: attachment})
        })}
      </ul>
    )
  }
}

module.exports = {
  view: function() {
    return [
      m(ListComponent),
      m(PaginationComponent, {pagination: Attachment.pagination, loadList: Attachment.loadList})
    ]
  }
};
