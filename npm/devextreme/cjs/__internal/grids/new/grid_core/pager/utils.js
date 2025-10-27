/**
* DevExtreme (cjs/__internal/grids/new/grid_core/pager/utils.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculatePageSizes = calculatePageSizes;
exports.isVisible = isVisible;
// TODO: Need to fix case with runtime changes the allowedPageSizes property to 'auto'
function calculatePageSizes(allowedPageSizes, pageSizesConfig, pageSize) {
  if (Array.isArray(pageSizesConfig)) {
    return pageSizesConfig;
  }
  if (Array.isArray(allowedPageSizes) && allowedPageSizes.includes(pageSize)) {
    return allowedPageSizes;
  }
  if (pageSizesConfig && pageSize > 1) {
    return [Math.floor(pageSize / 2), pageSize, pageSize * 2];
  }
  return [];
}
function isVisible(visibleConfig, pageCount) {
  if (visibleConfig === 'auto') {
    return pageCount > 1;
  }
  return visibleConfig;
}
