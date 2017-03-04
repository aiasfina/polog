var m = require('mithril');

var Header = {
  view: function(vnode) {
    return(
      <thead>
        <tr>
          {vnode.attrs.headerList.map(function(header) {
            return <th>{header}</th>
          })}
        </tr>
      </thead>
    )
  }
}

var Body = {
  view: function(vnode) {
    return(
      <tbody>
        {vnode.attrs.list.map(function(item, index) {
          return m(Row, {item: item, index: index, attributes: vnode.attrs.attributes})
        })}
      </tbody>
    )
  }
}

var Row = {
  view: function(vnode) {
    return(
      <tr>
        {vnode.attrs.attributes.map(function(attr) {
          return m(Cell, {item: vnode.attrs.item, index: vnode.attrs.index, attr: attr})
        })}
      </tr>
    )
  }
}

var Cell = {
  view: function(vnode) {
    var
      item = vnode.attrs.item,
      index = vnode.attrs.index,
      attr = vnode.attrs.attr;

    if (Object.prototype.toString.call(attr) === '[object Function]') {
      return <td>{attr.call(item, index)}</td>
    } else {
      return <td>{item[attr]}</td>
    }
  }
}

module.exports = {
  view: function(vnode) {
    return(
      <table className="table">
        {m(Header, {headerList: vnode.attrs.headerList})}
        {m(Body, {list: vnode.attrs.list, attributes: vnode.attrs.attributes})}
      </table>
    )
  }
}
