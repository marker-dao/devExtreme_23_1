/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/toast.js)
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
exports.Toast = void 0;
var _toast = _interopRequireDefault(require("../../../../../ui/toast"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Toast extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _toast.default;
  }
}
exports.Toast = Toast;
