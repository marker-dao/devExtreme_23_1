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