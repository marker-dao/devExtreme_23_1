/**
* DevExtreme (cjs/__internal/events/core/m_hook_touch_props.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
const touchPropsToHook = ['pageX', 'pageY', 'screenX', 'screenY', 'clientX', 'clientY'];
const touchPropHook = function (name, event) {
  if (event[name] && !event.touches || !event.touches) {
    return event[name];
  }
  const touches = event.touches.length ? event.touches : event.changedTouches;
  if (!touches.length) {
    return;
  }
  return touches[0][name];
};
function _default(callback) {
  touchPropsToHook.forEach(name => {
    callback(name, event => touchPropHook(name, event));
  }, this);
}
