/**
* DevExtreme (cjs/core/utils/call_once.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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