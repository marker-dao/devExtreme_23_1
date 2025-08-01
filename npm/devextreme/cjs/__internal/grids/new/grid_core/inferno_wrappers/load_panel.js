/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/load_panel.js)
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
exports.LoadPanel = void 0;
var _load_panel = _interopRequireDefault(require("../../../../../ui/load_panel"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LoadPanel extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _load_panel.default;
  }
}
exports.LoadPanel = LoadPanel;
