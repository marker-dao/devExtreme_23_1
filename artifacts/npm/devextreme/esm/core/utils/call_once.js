/**
* DevExtreme (esm/core/utils/call_once.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var callOnce = function callOnce(handler) {
  var result;
  var _wrappedHandler = function wrappedHandler() {
    result = handler.apply(this, arguments);
    _wrappedHandler = function wrappedHandler() {
      return result;
    };
    return result;
  };
  return function () {
    return _wrappedHandler.apply(this, arguments);
  };
};
export default callOnce;
