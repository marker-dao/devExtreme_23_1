/**
* DevExtreme (cjs/__internal/core/utils/m_view_port.js)
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
exports.changeCallback = void 0;
exports.originalViewPort = originalViewPort;
exports.value = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _ready_callbacks = _interopRequireDefault(require("../../../core/utils/ready_callbacks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ready = _ready_callbacks.default.add;
const changeCallback = exports.changeCallback = (0, _callbacks.default)();
let $originalViewPort = (0, _renderer.default)();
const value = exports.value = function () {
  let $current;
  return function (element) {
    if (!arguments.length) {
      return $current;
    }
    const $element = (0, _renderer.default)(element);
    $originalViewPort = $element;
    const isNewViewportFound = !!$element.length;
    const prevViewPort = value();
    $current = isNewViewportFound ? $element : (0, _renderer.default)('body');
    changeCallback.fire(isNewViewportFound ? value() : (0, _renderer.default)(), prevViewPort);
  };
}();
ready(function () {
  value('.dx-viewport');
});
function originalViewPort() {
  return $originalViewPort;
}
