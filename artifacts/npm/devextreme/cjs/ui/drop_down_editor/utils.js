/**
* DevExtreme (cjs/ui/drop_down_editor/utils.js)
* Version: 23.2.2
* Build date: Mon Nov 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getSizeValue = exports.getElementWidth = void 0;
var _size = require("../../core/utils/size");
var _window = require("../../core/utils/window");
const getElementWidth = function ($element) {
  if ((0, _window.hasWindow)()) {
    return (0, _size.getOuterWidth)($element);
  }
};
exports.getElementWidth = getElementWidth;
const getSizeValue = function (size) {
  if (size === null) {
    size = undefined;
  }
  if (typeof size === 'function') {
    size = size();
  }
  return size;
};
exports.getSizeValue = getSizeValue;
