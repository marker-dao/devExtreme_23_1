/**
* DevExtreme (esm/__internal/viz/tree_map/colorizing.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-names */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { noop as _noop } from '../../../core/utils/common';
import { normalizeEnum as _normalizeEnum } from '../../viz/core/utils';
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
export function getColorizer(options, themeManager, root) {
  var _colorizers$type;
  const type = _normalizeEnum(options.type || defaultColorizerName);
  const colorizer = (_colorizers$type = colorizers[type]) === null || _colorizers$type === void 0 ? void 0 : _colorizers$type.call(colorizers, options, themeManager, root);
  return colorizer ? (options.colorizeGroups ? wrapGroupColorGetter : wrapLeafColorGetter)(colorizer) : _noop;
}
export function addColorizer(name, colorizer) {
  colorizers[name] = colorizer;
}
export function setDefaultColorizer(name) {
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
export function createColorCodeGetter(options) {
  return options.colorCodeField ? createColorCode(options.colorCodeField) : getValueAsColorCode;
}
