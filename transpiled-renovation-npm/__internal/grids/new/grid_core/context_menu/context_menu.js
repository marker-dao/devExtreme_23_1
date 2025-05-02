"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenu = ContextMenu;
var _inferno = require("inferno");
var _const = require("../const");
var _context_menu = require("../inferno_wrappers/context_menu");
function ContextMenu(props) {
  return (0, _inferno.createVNode)(1, "div", _const.CLASSES.excludeFlexBox, (0, _inferno.createComponentVNode)(2, _context_menu.ContextMenu, {
    "showEvent": undefined,
    "componentRef": props.componentRef,
    "cssClass": props.cssClass,
    "onInitialized": props.onInitialized,
    "onPositioning": props.onPositioning,
    "onItemClick": props.onItemClick
  }), 2);
}