var m = require('mithril');
var Post = require('../models/post.js');
var utils = require('../utils.js');
var MarkdownComponent = require('./markdown.jsx');
var ModalComponent = require('./modal.jsx');
var UploaderComponent = require('./uploader.jsx');
var AttachmentList = require('./attachments.jsx');
require('bootstrap-tagsinput/dist/bootstrap-tagsinput.js');

var Form = {
  title: '',
  tags: [],
  content: '',
  published: false
}

var TagInputComponent = {
  max: 5,
  $el: null,
  oncreateTagInput: function(vnode) {
    var $el = TagInputComponent.$el = $(vnode.dom);
    $el.tagsinput({maxTags: TagInputComponent.max});
    $el
      .on('itemAdded', function(event) {
        Form.tags.push(event.item);
      })
      .on('itemRemoved', function(event) {
        var index = Form.tags.indexOf(event.item);
        Form.tags.splice(index, 1);
      });
  },
  guid: function() {
    this._guid = this._guid || utils.guid();
    return this._guid;
  },
  view: function(vnode) {
    return(
      <div className="form-group">
        <label htmlFor={this.guid()} className="control-label">{vnode.attrs.label}</label>
        <input className="form-control" data-role="tagsinput" type="text" id={this.guid()}
          placeholder={vnode.attrs.placeholder} oncreate={TagInputComponent.oncreateTagInput} value={Form.tags.join(',')} />
      </div>
    )
  }
}

var AttachmentsModalComponent = {
  open: function(e) {
    e.preventDefault();
    $('#attachmentsModal').modal();
  },
  view: function() {
    return(
      [
        m(UploaderComponent),
        m(AttachmentList)
      ]
    )
  }
}

var PostEditorComponent = {
  oninit: function() {
    if (window.postId) {
      Post.load(window.postId)
      .then(function(resp) {
        Form.id = resp.id;
        Form.title = resp.title;
        Form.tags = resp.tags;
        Form.content = resp.content;
        Form.published = resp.published;
        
        MarkdownComponent.setContent(Form.content);

        for (var i = 0; i < Form.tags.length; i++) {
          TagInputComponent.$el.tagsinput('add', Form.tags[i]);
        }
      })
    }
  },
  onsubmit: function(e) {
    e.preventDefault();

    Form.tags = TagInputComponent.$el.tagsinput('items');
    Form.content = MarkdownComponent.getContent();

    if (Form.id) {
      Post.update(Form);
    } else {
      Post.create(Form)
      .then(function(resp) {
        Form.id = resp.id;
      });
    }
  },
  view: function(vnode) {
    return(
      <div className="container">
        <form className="form" onsubmit={PostEditorComponent.onsubmit}>
          <div className="form-group clearfix">
            <button className="btn btn-primary pull-right">提交</button>
            <button className="btn btn-success pull-right" onclick={AttachmentsModalComponent.open}>附件</button>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="control-label">标题</label>
                <input placeholder="请输入标题" className="form-control" type="text"
                  oninput={m.withAttr('value', function(value) { Form.title = value })} 
                  value={Form.title} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="control-label">是否发布</label>
                <select className="form-control" onchange={m.withAttr('value', function(value) { Form.published = (value == 'true') })}>
                  <option value="true" selected={Form.published}>是</option>
                  <option value="false" selected={!Form.published}>否</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              {m(TagInputComponent, {label: '标签', placeholder: '请输入标签，最多只能输入5个'})}
            </div>
          </div>
          <div className="row">
            {m(MarkdownComponent)}
          </div>
        </form>
        {m(ModalComponent, {id: 'attachmentsModal'}, m(AttachmentsModalComponent))}
      </div>
    )
  }
}

module.exports = PostEditorComponent;
