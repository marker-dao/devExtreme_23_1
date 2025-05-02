/**
* DevExtreme (cjs/__internal/core/utils/m_ready_callbacks.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readyCallbacksModule = exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _call_once = _interopRequireDefault(require("../../../core/utils/call_once"));
var _dependency_injector = _interopRequireDefault(require("../../../core/utils/dependency_injector"));
var _window = require("../../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let callbacks = [];
const subscribeReady = (0, _call_once.default)(() => {
  const removeListener = _dom_adapter.default.listen(_dom_adapter.default.getDocument(), 'DOMContentLoaded', () => {
    readyCallbacks.fire();
    removeListener();
  });
});
const readyCallbacks = {
  add: callback => {
    const windowExists = (0, _window.hasWindow)();
    if (windowExists && _dom_adapter.default.getReadyState() !== 'loading') {
      callback();
    } else {
      callbacks.push(callback);
      windowExists && subscribeReady();
    }
  },
  fire: () => {
    callbacks.forEach(callback => callback());
    callbacks = [];
  }
};
const readyCallbacksModule = exports.readyCallbacksModule = (0, _dependency_injector.default)(readyCallbacks);
var _default = exports.default = readyCallbacksModule;
