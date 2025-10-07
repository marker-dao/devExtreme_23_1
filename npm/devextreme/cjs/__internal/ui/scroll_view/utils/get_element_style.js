/**
* DevExtreme (cjs/__internal/ui/scroll_view/utils/get_element_style.js)
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
exports.getElementMargin = getElementMargin;
exports.getElementOverflowX = getElementOverflowX;
exports.getElementOverflowY = getElementOverflowY;
exports.getElementPadding = getElementPadding;
exports.getElementStyle = getElementStyle;
exports.getElementTransform = getElementTransform;
var _inflector = require("../../../../core/utils/inflector");
var _window = require("../../../../core/utils/window");
var _type_conversion = require("../../../utils/type_conversion");
function getElementStyle(el) {
  var _getWindow$getCompute, _getWindow;
  return el && (0, _window.hasWindow)() ? (_getWindow$getCompute = (_getWindow = (0, _window.getWindow)()).getComputedStyle) === null || _getWindow$getCompute === void 0 ? void 0 : _getWindow$getCompute.call(_getWindow, el) : null;
}
function getElementMargin(element, side) {
  const style = getElementStyle(element);
  return style ? (0, _type_conversion.toNumber)(style[`margin${(0, _inflector.titleize)(side)}`]) : 0;
}
function getElementPadding(element, side) {
  const style = getElementStyle(element);
  return style ? (0, _type_conversion.toNumber)(style[`padding${(0, _inflector.titleize)(side)}`]) : 0;
}
function getElementOverflowX(element) {
  const style = getElementStyle(element);
  return style ? style.overflowX : 'visible';
}
function getElementOverflowY(element) {
  const style = getElementStyle(element);
  return style ? style.overflowY : 'visible';
}
function getElementTransform(element) {
  const style = getElementStyle(element);
  return style ? style.transform : '';
}
