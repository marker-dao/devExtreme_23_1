/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/filter_sync/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// 🚨🚨🚨 Complex utils functions from grid_core used here for merging filters
// TODO filterSync: move these utils to the new grid_core
import { removeFieldConditionsFromFilter, syncFilters } from '../../../../../filter_builder/m_utils';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFilterValues = filterConditions => {
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
export const getFilterType = filterConditions => {
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
export const getConditionFromHeaderFilter = _ref => {
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
export const mergeFilterPanelWithHeaderFilterValues = (filterPanelValue, headerFilterInfoArray) => headerFilterInfoArray.reduce((result, info) => {
  const value = getConditionFromHeaderFilter(info);
  return value ? syncFilters(result, value) : removeFieldConditionsFromFilter(result, info.columnId);
}, filterPanelValue);
