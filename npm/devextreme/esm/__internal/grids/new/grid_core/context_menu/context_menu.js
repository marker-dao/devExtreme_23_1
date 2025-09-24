/**
* DevExtreme (esm/__internal/grids/new/grid_core/context_menu/context_menu.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { CLASSES } from '../const';
import { ContextMenu as ContextMenuComponent } from '../inferno_wrappers/context_menu';
export function ContextMenu(props) {
  return createVNode(1, "div", CLASSES.excludeFlexBox, createComponentVNode(2, ContextMenuComponent, {
    "showEvent": undefined,
    "componentRef": props.componentRef,
    "cssClass": props.cssClass,
    "onInitialized": props.onInitialized,
    "onPositioning": props.onPositioning,
    "onItemClick": props.onItemClick
  }), 2);
}
