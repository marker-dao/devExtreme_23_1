/**
* DevExtreme (cjs/__internal/grids/new/grid_core/sorting_controller/utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextSortOrder = getNextSortOrder;
exports.sortOrderDelegate = sortOrderDelegate;
function getNextSortOrder(currentOrder, ctrlKey) {
  if (ctrlKey) {
    return undefined;
  }
  if (currentOrder === 'asc') {
    return 'desc';
  }
  return 'asc';
}
function sortOrderDelegate(a, b) {
  if (a.sortIndex !== undefined && b.sortIndex === undefined) {
    return -1;
  }
  if (b.sortIndex !== undefined && a.sortIndex === undefined) {
    return 1;
  }
  if (a.sortIndex !== undefined && b.sortIndex !== undefined) {
    return a.sortIndex - b.sortIndex;
  }
  if (a.sortIndex === undefined && b.sortIndex === undefined) {
    return a.visibleIndex - b.visibleIndex;
  }
  throw new Error('Invalid state');
}
