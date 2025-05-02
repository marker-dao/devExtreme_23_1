/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/caption.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createFragment, createComponentVNode, createTextVNode } from "inferno";
export const Caption = props => {
  const Template = props.template;
  return createVNode(1, "div", "dx-cardview-field-caption", Template ? createComponentVNode(2, Template, {
    "field": props.field
  }) : createFragment([props.field.column.caption, createTextVNode(":")], 0), 0);
};
