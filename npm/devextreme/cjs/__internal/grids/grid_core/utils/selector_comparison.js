/**
* DevExtreme (cjs/__internal/grids/grid_core/utils/selector_comparison.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSelectorEqualWithCallback = exports.isEqualSelectors = exports.getNormalizedColumnIdx = exports.getNormalizedCallback = exports.compareCallbacks = void 0;
const getNormalizedCallback = callback => 'originalCallback' in callback ? callback.originalCallback : callback;
exports.getNormalizedCallback = getNormalizedCallback;
const getNormalizedColumnIdx = callback => 'columnIndex' in callback ? callback.columnIndex ?? null : undefined;
exports.getNormalizedColumnIdx = getNormalizedColumnIdx;
const compareCallbacks = (callback, callbackToCompare) => {
  const normalizedCallback = getNormalizedCallback(callback);
  const normalizedCallbackToCompare = getNormalizedCallback(callbackToCompare);
  const normalizedColumnIdx = getNormalizedColumnIdx(callback);
  const normalizedColumnIdxToCompare = getNormalizedColumnIdx(callbackToCompare);
  const originalCallbacksEqual = normalizedCallback === normalizedCallbackToCompare;
  const shouldCompareColumnIdx = normalizedColumnIdx !== undefined;
  const columnIdxEqual = normalizedColumnIdx === normalizedColumnIdxToCompare;
  return originalCallbacksEqual && (!shouldCompareColumnIdx || columnIdxEqual);
};
exports.compareCallbacks = compareCallbacks;
const isEqualSelectors = (selector, selectorToCompare) => {
  if (typeof selector === 'string' && typeof selectorToCompare === 'string') {
    return selector === selectorToCompare;
  }
  if (typeof selector === 'function' && typeof selectorToCompare === 'function') {
    return compareCallbacks(selector, selectorToCompare);
  }
  return false;
};
exports.isEqualSelectors = isEqualSelectors;
const isSelectorEqualWithCallback = (selector, callback) => {
  if (typeof selector === 'function' && typeof callback === 'function') {
    return compareCallbacks(selector, callback);
  }
  return false;
};
exports.isSelectorEqualWithCallback = isSelectorEqualWithCallback;
