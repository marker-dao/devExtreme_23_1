/**
* DevExtreme (esm/__internal/viz/tree_map/common.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { patchFontOptions as _patchFontOptions } from '../../viz/core/utils';
export function buildRectAppearance(option) {
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
export function buildTextAppearance(options, filter) {
  return {
    attr: {
      filter
    },
    css: _patchFontOptions(options.font)
  };
}
