/**
* DevExtreme (esm/__internal/common/core/animation/frame.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import callOnce from '../../../../core/utils/call_once';
import { getWindow, hasWindow } from '../../../../core/utils/window';
const window = hasWindow() ? getWindow() : {};
const FRAME_ANIMATION_STEP_TIME = 1000 / 60;
let request = function (callback) {
  /* eslint-disable no-restricted-globals */
  return setTimeout(callback, FRAME_ANIMATION_STEP_TIME);
};
let cancel = function (requestID) {
  clearTimeout(requestID);
};
const setAnimationFrameMethods = callOnce(() => {
  const nativeRequest = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  const nativeCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
  if (nativeRequest && nativeCancel) {
    request = nativeRequest;
    cancel = nativeCancel;
  }
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function requestAnimationFrame() {
  setAnimationFrameMethods();
  // @ts-ignore
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return request.apply(window, args);
}
export function cancelAnimationFrame(requestID) {
  setAnimationFrameMethods();
  cancel.apply(window, [requestID]);
}
