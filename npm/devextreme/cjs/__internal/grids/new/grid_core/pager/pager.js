/**
* DevExtreme (cjs/__internal/grids/new/grid_core/pager/pager.js)
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
exports.PagerView = PagerView;
var _inferno = require("inferno");
var _pager = require("../inferno_wrappers/pager");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PagerView(props) {
  return props.visible ? (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _pager.Pager, _extends({}, props))) : (0, _inferno.createFragment)();
}
