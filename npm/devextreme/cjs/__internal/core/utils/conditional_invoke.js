/**
* DevExtreme (cjs/__internal/core/utils/conditional_invoke.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invokeConditionally = invokeConditionally;
var _type = require("../../../core/utils/type");
function invokeConditionally(cancelResult, callback, cancelCallback) {
  const invokeCallback = cancel => {
    const callbackToInvoke = cancel ? cancelCallback : callback;
    callbackToInvoke === null || callbackToInvoke === void 0 || callbackToInvoke();
  };
  if ((0, _type.isPromise)(cancelResult)) {
    cancelResult.then(invokeCallback).catch(callback);
  } else {
    invokeCallback(Boolean(cancelResult));
  }
}
