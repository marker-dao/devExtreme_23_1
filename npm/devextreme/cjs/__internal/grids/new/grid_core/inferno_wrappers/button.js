/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/button.js)
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
exports.Button = void 0;
var _button = _interopRequireDefault(require("../../../../../ui/button"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Button extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _button.default;
  }
}
exports.Button = Button;
