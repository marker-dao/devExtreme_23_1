/**
* DevExtreme (cjs/common/core/animation.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "TransitionExecutor", {
  enumerable: true,
  get: function () {
    return _transition_executor.default;
  }
});
Object.defineProperty(exports, "animationPresets", {
  enumerable: true,
  get: function () {
    return _presets.default;
  }
});
Object.defineProperty(exports, "cancelAnimationFrame", {
  enumerable: true,
  get: function () {
    return _frame.cancelAnimationFrame;
  }
});
Object.defineProperty(exports, "fx", {
  enumerable: true,
  get: function () {
    return _fx.default;
  }
});
Object.defineProperty(exports, "requestAnimationFrame", {
  enumerable: true,
  get: function () {
    return _frame.requestAnimationFrame;
  }
});
var _frame = require("./animation/frame");
var _fx = _interopRequireDefault(require("./animation/fx"));
var _presets = _interopRequireDefault(require("./animation/presets"));
var _transition_executor = _interopRequireDefault(require("./animation/transition_executor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
