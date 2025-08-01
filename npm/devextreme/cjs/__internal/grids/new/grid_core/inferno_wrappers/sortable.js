/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/sortable.js)
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
exports.Sortable = void 0;
var _inferno = require("inferno");
var _sortable = _interopRequireDefault(require("../../../../../ui/sortable"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Sortable extends _widget_wrapper.InfernoWrapper {
  render() {
    return (0, _inferno.createVNode)(1, "div", this.props.className, this.props.children, 0, null, null, this.ref);
  }
  getComponentFabric() {
    return _sortable.default;
  }
}
exports.Sortable = Sortable;
