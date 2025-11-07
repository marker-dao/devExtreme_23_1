/**
* DevExtreme (cjs/__internal/viz/tree_map/colorizing.range.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colorizing = require("../../viz/tree_map/colorizing");
/* eslint-disable max-depth */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function getPaletteIndex(value, items) {
  let start = 0;
  let end = items.length - 1;
  let index = -1;
  let middle;
  if (items[start] <= value && value <= items[end]) {
    if (value === items[end]) {
      index = end - 1;
    } else {
      while (end - start > 1) {
        middle = start + end >> 1;
        if (value < items[middle]) {
          end = middle;
        } else {
          start = middle;
        }
      }
      index = start;
    }
  }
  return index;
}
function rangeColorizer(options, themeManager) {
  const range = options.range || [];
  const palette = themeManager.createDiscretePalette(options.palette, range.length - 1);
  const getValue = (0, _colorizing.createColorCodeGetter)(options);
  return function (node) {
    return palette.getColor(getPaletteIndex(getValue(node), range));
  };
}
(0, _colorizing.addColorizer)('range', rangeColorizer);
var _default = exports.default = rangeColorizer;
