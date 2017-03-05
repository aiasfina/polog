var m = require('mithril');


function renderPrevButton(pagination, loadList) {
  return(
    <li className={pagination.is_first_page ? 'disabled' : ''}>
      <a href="javascript:void(0);" onclick={function() { !pagination.is_first_page && loadList(pagination.current_page - 1)() }}>
        <i className="fa fa-angle-left"></i>
      </a>
    </li>
  )
}

function renderNextButton(pagination, loadList) {
  return(
    <li className={pagination.is_last_page ? 'disabled' : ''}>
      <a href="javascript:void(0);" onclick={function() { !pagination.is_last_page && loadList(pagination.current_page + 1)() }}>
        <i className="fa fa-angle-right"></i>
      </a>
    </li>
  )
}

module.exports = {
  view: function(vnode) {
    var 
      pagination = vnode.attrs.pagination,
      loadList = vnode.attrs.loadList;

    return(
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {[
            renderPrevButton(pagination, loadList),
            renderNextButton(pagination, loadList)
          ]}
        </ul>
      </nav>
    )
  }
}
