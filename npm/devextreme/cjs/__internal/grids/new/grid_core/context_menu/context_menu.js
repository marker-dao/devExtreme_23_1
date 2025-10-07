/**
* DevExtreme (cjs/__internal/grids/new/grid_core/context_menu/context_menu.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
