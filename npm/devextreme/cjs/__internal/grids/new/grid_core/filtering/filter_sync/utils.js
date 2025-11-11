/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/filter_sync/utils.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeFilterPanelWithHeaderFilterValues = exports.getFilterValues = exports.getFilterType = exports.getConditionFromHeaderFilter = void 0;
var _m_utils = require("../../../../../filter_builder/m_utils");
// 🚨🚨🚨 Complex utils functions from grid_core used here for merging filters
// TODO filterSync: move these utils to the new grid_core

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFilterValues = filterConditions => {
  if (filterConditions.length !== 1) {
    return undefined;
  }
  const filterCondition = filterConditions[0];
  if (!filterCondition) {
    return undefined;
  }
  const value = filterCondition[2];
  const hasArrayValue = Array.isArray(value);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return hasArrayValue ? value : [value];
};
exports.getFilterValues = getFilterValues;
const getFilterType = filterConditions => {
  if (filterConditions.length !== 1) {
    return undefined;
  }
  const filterCondition = filterConditions[0];
  if (!filterCondition) {
    return undefined;
  }
  const selectedFilterOperation = filterCondition[1];
  switch (selectedFilterOperation) {
    case 'anyof':
    case '=':
      return 'include';
    case 'noneof':
    case '<>':
      return 'exclude';
    default:
      return undefined;
  }
};
// NOTE: Logic from util function grid_core/filter/m_filter_sync "getConditionFromHeaderFilter"
exports.getFilterType = getFilterType;
const getConditionFromHeaderFilter = _ref => {
  let {
    type,
    columnId,
    filterType,
    filterValues
  } = _ref;
  const [firstFilterItem] = filterValues;
  switch (true) {
    case type === 'single-value' && filterType === 'exclude':
      return [columnId, '<>', firstFilterItem];
    case type === 'single-value' && filterType === 'include':
      return [columnId, '=', firstFilterItem];
    case type === 'values-or-condition' && filterType === 'exclude':
      return [columnId, 'noneof', filterValues];
    case type === 'values-or-condition' && filterType === 'include':
      return [columnId, 'anyof', filterValues];
    case type === 'empty':
    default:
      return null;
  }
};
// 🚨🚨🚨 Complex utils functions from grid_core used here for merging filters
// TODO filterSync: move these utils to the new grid_core
exports.getConditionFromHeaderFilter = getConditionFromHeaderFilter;
const mergeFilterPanelWithHeaderFilterValues = (filterPanelValue, headerFilterInfoArray) => headerFilterInfoArray.reduce((result, info) => {
  const value = getConditionFromHeaderFilter(info);
  return value ? (0, _m_utils.syncFilters)(result, value) : (0, _m_utils.removeFieldConditionsFromFilter)(result, info.columnId);
}, filterPanelValue);
exports.mergeFilterPanelWithHeaderFilterValues = mergeFilterPanelWithHeaderFilterValues;
