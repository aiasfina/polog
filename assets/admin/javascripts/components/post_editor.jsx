var m = require('mithril');
var Post = require('../models/post.js');
var utils = require('../utils.js');
var MarkdownComponent = require('./markdown.jsx');
require('bootstrap-tagsinput/dist/bootstrap-tagsinput.js');

var TagInputComponent = {
  max: 5,
  $el: null,
  oncreate: function(vnode) {
    if (vnode.tag == 'input') {
      var $el = TagInputComponent.$el = $(vnode.dom);
      $el.tagsinput({maxTags: TagInputComponent.max});
      $el
        .on('itemAdded', function(event) {
          PostEditorComponent.form.tags.push(event.item);
        })
        .on('itemRemoved', function(event) {
          var index = PostEditorComponent.form.tags.indexOf(event.item);
          PostEditorComponent.form.tags.splice(index, 1);
        });
    }
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
          placeholder={vnode.attrs.placeholder} oncreate={TagInputComponent.oncreate} value={PostEditorComponent.form.tags.join(',')} />
      </div>
    )
  }
}

var PostEditorComponent = {
  oninit: function() {
    var form = PostEditorComponent.form;

    if (window.postId) {
      Post.load(window.postId)
      .then(function(resp) {
        form.id = resp.id;
        form.title = resp.title;
        form.tags = resp.tags;
        form.content = resp.content;
        
        MarkdownComponent.setContent(form.content);

        for (var i = 0; i < form.tags.length; i++) {
          TagInputComponent.$el.tagsinput('add', form.tags[i]);
        }
      })
    }
  },
  form: {
    title: '',
    tags: [],
    content: ''
  },
  onsubmit: function(e) {
    e.preventDefault();

    var form = PostEditorComponent.form;

    form.tags = TagInputComponent.$el.tagsinput('items');
    form.content = MarkdownComponent.getContent();

    if (form.id) {
      Post.update(form);
    } else {
      Post.create(form)
      .then(function(resp) {
        form.id = resp.id;
      });
    }
  },
  view: function(vnode) {
    return(
      <form className="form" onsubmit={PostEditorComponent.onsubmit}>
        <div className="form-group clearfix">
          <button className="btn btn-primary pull-right">提交</button>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label className="control-label">标题</label>
              <input placeholder="请输入标题" className="form-control" type="text"
                oninput={m.withAttr('value', function(value) { PostEditorComponent.form.title = value })} 
                value={PostEditorComponent.form.title} />
            </div>
          </div>
          <div className="col-lg-6">
            {m(TagInputComponent, {label: '标签', placeholder: '请输入标签，最多只能输入5个'})}
          </div>
        </div>
        <div className="row">
          {m(MarkdownComponent)}
        </div>
      </form>
    )
  }
}

module.exports = PostEditorComponent;
