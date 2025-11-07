"use strict";

Object.defineProperty(exports, "cancelAnimationFrame", {
  enumerable: true,
  get: function () {
    return _frame.cancelAnimationFrame;
  }
});
Object.defineProperty(exports, "requestAnimationFrame", {
  enumerable: true,
  get: function () {
    return _frame.requestAnimationFrame;
  }
});
var _frame = require("../../../__internal/common/core/animation/frame");