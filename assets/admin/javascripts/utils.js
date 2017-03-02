var $ = require('jquery');

var utils = {};

utils.getCSRFToken = function() {
  var param = $("[name=csrf-param]").attr("content");
  var token = $("[name=csrf-token]").attr("content");

  return [param, token];
}

utils.xhrConfig = function(xhr) {
  xhr.setRequestHeader('X-CSRF-Token', utils.getCSRFToken()[1]);
}

utils.guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

module.exports = utils;
