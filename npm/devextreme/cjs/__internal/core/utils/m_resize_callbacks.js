/**
* DevExtreme (cjs/__internal/core/utils/m_resize_callbacks.js)
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
exports.resizeCallbacks = exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _call_once = _interopRequireDefault(require("../../../core/utils/call_once"));
var _m_callbacks = _interopRequireDefault(require("./m_callbacks"));
var _m_ready_callbacks = _interopRequireDefault(require("./m_ready_callbacks"));
var _m_window = _interopRequireDefault(require("./m_window"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-named-as-default

const resizeCallbacks = exports.resizeCallbacks = function () {
  let prevSize;
  const callbacks = (0, _m_callbacks.default)();
  const originalCallbacksAdd = callbacks.add;
  const originalCallbacksRemove = callbacks.remove;
  if (!_m_window.default.hasWindow()) {
    return callbacks;
  }
  const formatSize = function () {
    const window = _m_window.default.getWindow();
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
  const handleResize = function () {
    const now = formatSize();
    if (now.width === prevSize.width && now.height === prevSize.height) {
      return;
    }
    let changedDimension;
    if (now.width === prevSize.width) {
      changedDimension = 'height';
    }
    if (now.height === prevSize.height) {
      changedDimension = 'width';
    }
    prevSize = now;
    callbacks.fire(changedDimension);
  };
  const setPrevSize = (0, _call_once.default)(function () {
    prevSize = formatSize();
  });
  let removeListener;
  callbacks.add = function () {
    const result = originalCallbacksAdd.apply(callbacks, arguments);
    setPrevSize();
    _m_ready_callbacks.default.add(function () {
      if (!removeListener && callbacks.has()) {
        removeListener = _dom_adapter.default.listen(_m_window.default.getWindow(), 'resize', handleResize);
      }
    });
    return result;
  };
  callbacks.remove = function () {
    const result = originalCallbacksRemove.apply(callbacks, arguments);
    if (!callbacks.has() && removeListener) {
      removeListener();
      removeListener = undefined;
    }
    return result;
  };
  return callbacks;
}();
var _default = exports.default = resizeCallbacks;
