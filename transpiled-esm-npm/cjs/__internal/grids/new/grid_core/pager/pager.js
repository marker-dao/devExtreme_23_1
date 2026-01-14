"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagerView = PagerView;
var _inferno = require("inferno");
var _pager = require("../inferno_wrappers/pager");
function PagerView(props) {
  return props.visible ? (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _pager.Pager, Object.assign({}, props))) : (0, _inferno.createFragment)();
}