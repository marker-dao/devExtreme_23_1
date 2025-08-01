/**
* DevExtreme (esm/__internal/core/utils/m_comparator.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../../../core/dom_adapter';
import { toComparable } from '../../../core/utils/data';
import { isRenderer } from '../../../core/utils/type';
const hasNegation = function (oldValue, newValue) {
  return 1 / oldValue === 1 / newValue;
};
export const equals = function (oldValue, newValue) {
  oldValue = toComparable(oldValue, true);
  newValue = toComparable(newValue, true);
  if (oldValue && newValue && isRenderer(oldValue) && isRenderer(newValue)) {
    return newValue.is(oldValue);
  }
  const oldValueIsNaN = oldValue !== oldValue;
  const newValueIsNaN = newValue !== newValue;
  if (oldValueIsNaN && newValueIsNaN) {
    return true;
  }
  if (oldValue === 0 && newValue === 0) {
    return hasNegation(oldValue, newValue);
  }
  if (oldValue === null || typeof oldValue !== 'object' || domAdapter.isElementNode(oldValue)) {
    return oldValue === newValue;
  }
  return false;
};
