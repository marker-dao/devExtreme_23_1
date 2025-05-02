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