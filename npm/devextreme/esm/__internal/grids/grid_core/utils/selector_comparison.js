/**
* DevExtreme (esm/__internal/grids/grid_core/utils/selector_comparison.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const getNormalizedCallback = callback => 'originalCallback' in callback ? callback.originalCallback : callback;
export const getNormalizedColumnIdx = callback => 'columnIndex' in callback ? callback.columnIndex ?? null : undefined;
export const compareCallbacks = (callback, callbackToCompare) => {
  const normalizedCallback = getNormalizedCallback(callback);
  const normalizedCallbackToCompare = getNormalizedCallback(callbackToCompare);
  const normalizedColumnIdx = getNormalizedColumnIdx(callback);
  const normalizedColumnIdxToCompare = getNormalizedColumnIdx(callbackToCompare);
  const originalCallbacksEqual = normalizedCallback === normalizedCallbackToCompare;
  const shouldCompareColumnIdx = normalizedColumnIdx !== undefined;
  const columnIdxEqual = normalizedColumnIdx === normalizedColumnIdxToCompare;
  return originalCallbacksEqual && (!shouldCompareColumnIdx || columnIdxEqual);
};
export const isEqualSelectors = (selector, selectorToCompare) => {
  if (typeof selector === 'string' && typeof selectorToCompare === 'string') {
    return selector === selectorToCompare;
  }
  if (typeof selector === 'function' && typeof selectorToCompare === 'function') {
    return compareCallbacks(selector, selectorToCompare);
  }
  return false;
};
export const isSelectorEqualWithCallback = (selector, callback) => {
  if (typeof selector === 'function' && typeof callback === 'function') {
    return compareCallbacks(selector, callback);
  }
  return false;
};
