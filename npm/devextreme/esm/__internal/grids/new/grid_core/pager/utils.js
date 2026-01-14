/**
* DevExtreme (esm/__internal/grids/new/grid_core/pager/utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// TODO: Need to fix case with runtime changes the allowedPageSizes property to 'auto'
export function calculatePageSizes(allowedPageSizes, pageSizesConfig, pageSize) {
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
export function isVisible(visibleConfig, pageCount) {
  if (visibleConfig === 'auto') {
    return pageCount > 1;
  }
  return visibleConfig;
}
