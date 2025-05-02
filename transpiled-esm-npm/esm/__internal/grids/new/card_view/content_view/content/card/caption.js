import { createVNode, createFragment, createComponentVNode, createTextVNode } from "inferno";
export const Caption = props => {
  const Template = props.template;
  return createVNode(1, "div", "dx-cardview-field-caption", Template ? createComponentVNode(2, Template, {
    "field": props.field
  }) : createFragment([props.field.column.caption, createTextVNode(":")], 0), 0);
};