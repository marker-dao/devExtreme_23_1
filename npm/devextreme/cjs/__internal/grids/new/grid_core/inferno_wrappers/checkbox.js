/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/checkbox.js)
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
exports.CheckBox = void 0;
var _check_box = _interopRequireDefault(require("../../../../../ui/check_box"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckBox extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _check_box.default;
  }
}
exports.CheckBox = CheckBox;
