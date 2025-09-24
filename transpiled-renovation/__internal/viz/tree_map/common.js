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