/**
* DevExtreme (cjs/__internal/core/m_memorized_callbacks.js)
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
exports.MemorizedCallbacks = void 0;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _iterator = require("../../core/utils/iterator");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MemorizedCallbacks {
  constructor() {
    this.memory = [];
    this.callbacks = (0, _callbacks.default)();
  }
  add(fn) {
    (0, _iterator.each)(this.memory, (_, item) => fn.apply(fn, item));
    this.callbacks.add(fn);
  }
  remove(fn) {
    this.callbacks.remove(fn);
  }
  fire() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this.memory.push(args);
    this.callbacks.fire.apply(this.callbacks, args);
  }
}
exports.MemorizedCallbacks = MemorizedCallbacks;
