/**
* DevExtreme (cjs/__internal/viz/tree_map/common.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRectAppearance = buildRectAppearance;
exports.buildTextAppearance = buildTextAppearance;
var _utils = require("../../viz/core/utils");
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

function buildRectAppearance(option) {
  const border = option.border || {};
  return {
    fill: option.color,
    opacity: option.opacity,
    stroke: border.color,
    'stroke-width': border.width,
    'stroke-opacity': border.opacity,
    hatching: option.hatching
  };
}
function buildTextAppearance(options, filter) {
  return {
    attr: {
      filter
    },
    css: (0, _utils.patchFontOptions)(options.font)
  };
}
