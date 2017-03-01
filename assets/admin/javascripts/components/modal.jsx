var m = require('mithril');

var ModalComponent = {
  title: '',
  view: function(vnode) {
    this.title = vnode.attrs.title || this.title;
    return(
      <div class="modal fade" id="accountModal" tabindex="-1" role="dialog" aria-labelledby="accountModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              {vnode.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ModalComponent;
