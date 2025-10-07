/**
* DevExtreme (cjs/__internal/viz/tree_map/colorizing.js)
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
exports.addColorizer = addColorizer;
exports.createColorCodeGetter = createColorCodeGetter;
exports.getColorizer = getColorizer;
exports.setDefaultColorizer = setDefaultColorizer;
var _common = require("../../../core/utils/common");
var _utils = require("../../viz/core/utils");
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-names */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const colorizers = {};
let defaultColorizerName;
function wrapLeafColorGetter(getter) {
  return function (node) {
    return !node.isNode() ? getter(node) : undefined;
  };
}
function wrapGroupColorGetter(getter) {
  return function (node) {
    const parent = !node.isNode() && node.parent;
    return parent ? parent._groupColor = parent._groupColor || getter(parent) : undefined;
  };
}
function getColorizer(options, themeManager, root) {
  var _colorizers$type;
  const type = (0, _utils.normalizeEnum)(options.type || defaultColorizerName);
  const colorizer = (_colorizers$type = colorizers[type]) === null || _colorizers$type === void 0 ? void 0 : _colorizers$type.call(colorizers, options, themeManager, root);
  return colorizer ? (options.colorizeGroups ? wrapGroupColorGetter : wrapLeafColorGetter)(colorizer) : _common.noop;
}
function addColorizer(name, colorizer) {
  colorizers[name] = colorizer;
}
function setDefaultColorizer(name) {
  defaultColorizerName = name;
}
function getValueAsColorCode(node) {
  return node.value;
}
function createColorCode(colorCodeField) {
  return function (node) {
    return Number(node.data[colorCodeField]);
  };
}
function createColorCodeGetter(options) {
  return options.colorCodeField ? createColorCode(options.colorCodeField) : getValueAsColorCode;
}
