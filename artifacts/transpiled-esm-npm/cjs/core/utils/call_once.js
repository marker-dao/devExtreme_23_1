"use strict";

exports.default = void 0;
const callOnce = function (handler) {
  let result;
  let wrappedHandler = function () {
    result = handler.apply(this, arguments);
    wrappedHandler = function () {
      return result;
    };
    return result;
  };
  return function () {
    return wrappedHandler.apply(this, arguments);
  };
};
var _default = callOnce;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;