/**
* DevExtreme (cjs/__internal/core/utils/swatch_container.js)
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
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _view_port = require("../../../core/utils/view_port");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SWATCH_CONTAINER_CLASS_PREFIX = 'dx-swatch-';
const getSwatchContainer = element => {
  const $element = (0, _renderer.default)(element);
  const swatchContainer = $element.closest(`[class^="${SWATCH_CONTAINER_CLASS_PREFIX}"], [class*=" ${SWATCH_CONTAINER_CLASS_PREFIX}"]`);
  const viewport = (0, _view_port.value)();
  if (!swatchContainer.length) {
    return viewport;
  }
  const swatchClassRegex = new RegExp(`(\\s|^)(${SWATCH_CONTAINER_CLASS_PREFIX}.*?)(\\s|$)`);
  const swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
  let viewportSwatchContainer = viewport.children(`.${swatchClass}`);
  if (!viewportSwatchContainer.length) {
    viewportSwatchContainer = (0, _renderer.default)('<div>').addClass(swatchClass).appendTo(viewport);
  }
  return viewportSwatchContainer;
};
var _default = exports.default = {
  getSwatchContainer
};
