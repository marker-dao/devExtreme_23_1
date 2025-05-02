/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/caption.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
