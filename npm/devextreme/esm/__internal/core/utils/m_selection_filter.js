/**
* DevExtreme (esm/__internal/core/utils/m_selection_filter.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { equalByValue, getKeyHash } from '../../../core/utils/common';
import { compileGetter } from '../../../core/utils/data';
import { isFunction, isObject, isString } from '../../../core/utils/type';
export const SelectionFilterCreator = function (selectedItemKeys, isSelectAll) {
  this.getLocalFilter = function (keyGetter, equalKeys, equalByReference, keyExpr) {
    equalKeys = equalKeys === undefined ? equalByValue : equalKeys;
    return functionFilter.bind(this, equalKeys, keyGetter, equalByReference, keyExpr);
  };
  this.getExpr = function (keyExpr) {
    if (!keyExpr) {
      return;
    }
    let filterExpr;
    selectedItemKeys.forEach(function (key, index) {
      filterExpr = filterExpr || [];
      let filterExprPart;
      if (index > 0) {
        filterExpr.push(isSelectAll ? 'and' : 'or');
      }
      if (isString(keyExpr) || isFunction(keyExpr)) {
        filterExprPart = getFilterForPlainKey(keyExpr, key);
      } else {
        filterExprPart = getFilterForCompositeKey(keyExpr, key);
      }
      filterExpr.push(filterExprPart);
    });
    if (filterExpr && filterExpr.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      filterExpr = filterExpr[0];
    }
    return filterExpr;
  };
  this.getCombinedFilter = function (keyExpr, dataSourceFilter) {
    let forceCombinedFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const filterExpr = this.getExpr(keyExpr);
    let combinedFilter = filterExpr;
    if ((forceCombinedFilter || isSelectAll) && dataSourceFilter) {
      if (filterExpr) {
        combinedFilter = [];
        combinedFilter.push(filterExpr);
        combinedFilter.push(dataSourceFilter);
      } else {
        combinedFilter = dataSourceFilter;
      }
    }
    return combinedFilter;
  };
  let selectedItemKeyHashesMap;
  const getSelectedItemKeyHashesMap = function (keyOf, keyExpr) {
    if (!selectedItemKeyHashesMap) {
      selectedItemKeyHashesMap = {};
      const normalizedKeys = normalizeKeys(selectedItemKeys, keyOf, keyExpr);
      for (let i = 0; i < normalizedKeys.length; i++) {
        selectedItemKeyHashesMap[getKeyHash(normalizedKeys[i])] = true;
      }
    }
    return selectedItemKeyHashesMap;
  };
  const normalizeKeys = function (keys, keyOf, keyExpr) {
    return Array.isArray(keyExpr) ? keys.map(key => keyOf(key)) : keys;
  };
  function functionFilter(equalKeys, keyOf, equalByReference, keyExpr, item) {
    const key = keyOf(item);
    let keyHash;
    let i;
    if (!equalByReference) {
      keyHash = getKeyHash(key);
      if (!isObject(keyHash)) {
        const selectedKeyHashesMap = getSelectedItemKeyHashesMap(keyOf, keyExpr);
        if (selectedKeyHashesMap[keyHash]) {
          return !isSelectAll;
        }
        return !!isSelectAll;
      }
    }
    for (i = 0; i < selectedItemKeys.length; i++) {
      if (equalKeys(selectedItemKeys[i], key)) {
        return !isSelectAll;
      }
    }
    return !!isSelectAll;
  }
  function getFilterForPlainKey(keyExpr, keyValue) {
    if (keyValue === undefined) {
      return;
    }
    return [keyExpr, isSelectAll ? '<>' : '=', keyValue];
  }
  function getFilterForCompositeKey(keyExpr, itemKeyValue) {
    const filterExpr = [];
    for (let i = 0, {
        length
      } = keyExpr; i < length; i++) {
      const currentKeyExpr = keyExpr[i];
      const keyValueGetter = compileGetter(currentKeyExpr);
      // @ts-expect-error keyValueGetter is unknown
      const currentKeyValue = itemKeyValue && keyValueGetter(itemKeyValue);
      const filterExprPart = getFilterForPlainKey(currentKeyExpr, currentKeyValue);
      if (!filterExprPart) {
        break;
      }
      if (i > 0) {
        filterExpr.push(isSelectAll ? 'or' : 'and');
      }
      filterExpr.push(filterExprPart);
    }
    return filterExpr;
  }
};
