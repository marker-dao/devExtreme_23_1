"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caption = void 0;
var _inferno = require("inferno");
const Caption = props => {
  const Template = props.template;
  return (0, _inferno.createVNode)(1, "div", "dx-cardview-field-caption", Template ? (0, _inferno.createComponentVNode)(2, Template, {
    "field": props.field
  }) : (0, _inferno.createFragment)([props.field.column.caption, (0, _inferno.createTextVNode)(":")], 0), 0);
};
exports.Caption = Caption;