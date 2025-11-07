/**
* DevExtreme (cjs/__internal/common/core/animation/frame.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAnimationFrame = cancelAnimationFrame;
exports.requestAnimationFrame = requestAnimationFrame;
var _call_once = _interopRequireDefault(require("../../../../core/utils/call_once"));
var _window = require("../../../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.hasWindow)() ? (0, _window.getWindow)() : {};
const FRAME_ANIMATION_STEP_TIME = 1000 / 60;
let request = function (callback) {
  /* eslint-disable no-restricted-globals */
  return setTimeout(callback, FRAME_ANIMATION_STEP_TIME);
};
let cancel = function (requestID) {
  clearTimeout(requestID);
};
const setAnimationFrameMethods = (0, _call_once.default)(() => {
  const nativeRequest = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  const nativeCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
  if (nativeRequest && nativeCancel) {
    request = nativeRequest;
    cancel = nativeCancel;
  }
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function requestAnimationFrame() {
  setAnimationFrameMethods();
  // @ts-ignore
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return request.apply(window, args);
}
function cancelAnimationFrame(requestID) {
  setAnimationFrameMethods();
  cancel.apply(window, [requestID]);
}
