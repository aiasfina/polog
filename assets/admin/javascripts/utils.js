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

module.exports = utils;
