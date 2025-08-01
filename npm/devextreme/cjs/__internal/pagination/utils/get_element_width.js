/**
* DevExtreme (cjs/__internal/pagination/utils/get_element_width.js)
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
exports.getElementContentWidth = getElementContentWidth;
exports.getElementMinWidth = getElementMinWidth;
exports.getElementStyle = getElementStyle;
exports.getElementWidth = getElementWidth;
var _get_computed_style = _interopRequireDefault(require("../../core/r1/utils/get_computed_style"));
var _type_conversion = require("../../core/r1/utils/type_conversion");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getElementStyle(name, element) {
  const computedStyle = (0, _get_computed_style.default)(element) ?? {};
  return (0, _type_conversion.toNumber)(computedStyle[name]);
}
function getElementContentWidth(element) {
  const padding = getElementStyle('paddingLeft', element) + getElementStyle('paddingRight', element);
  const width = getElementStyle('width', element);
  return width - padding;
}
function getElementWidth(element) {
  const margin = getElementStyle('marginLeft', element) + getElementStyle('marginRight', element);
  const width = getElementStyle('width', element);
  return margin + width;
}
function getElementMinWidth(element) {
  return getElementStyle('minWidth', element);
}
