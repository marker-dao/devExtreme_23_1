/**
* DevExtreme (cjs/__internal/scheduler/utils/macro_task_array/index.js)
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
exports.default = void 0;
var _dispatcher = _interopRequireDefault(require("./dispatcher"));
var _methods = require("./methods");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  forEach: _methods.macroTaskArrayForEach,
  map: _methods.macroTaskArrayMap,
  dispose: _dispatcher.default.dispose
};
