/**
* DevExtreme (cjs/integration/knockout/utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getClosestNodeWithKoCreation = exports.getClosestNodeWithContext = void 0;
var _knockout = _interopRequireDefault(require("knockout"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

const getClosestNodeWithContext = node => {
  const context = _knockout.default.contextFor(node);
  if (!context && node.parentNode) {
    return getClosestNodeWithContext(node.parentNode);
  }
  return node;
};
exports.getClosestNodeWithContext = getClosestNodeWithContext;
const getClosestNodeWithKoCreation = node => {
  const $el = (0, _renderer.default)(node);
  const data = $el.data();
  const hasFlag = data && data['dxKoCreation'];
  if (hasFlag) {
    return node;
  }
  if (node.parentNode) {
    return getClosestNodeWithKoCreation(node.parentNode);
  }
  return null;
};
exports.getClosestNodeWithKoCreation = getClosestNodeWithKoCreation;
