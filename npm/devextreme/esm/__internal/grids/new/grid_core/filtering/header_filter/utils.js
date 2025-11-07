/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["texts", "visible"];
import errors from '../../../../../../core/errors';
import { isDefined } from '../../../../../../core/utils/type';
import filterUtils from '../../../../../../ui/shared/filtering';
import gridCoreUtils from '../../../../../grids/grid_core/m_utils';
export const mergeColumnHeaderFilterOptions = (column, rootOptions) => {
  var _column$headerFilter;
  const _ref = rootOptions ?? {},
    restRootOptions = _objectWithoutPropertiesLoose(_ref, _excluded);
  return _extends({}, column, {
    allowHeaderFiltering: !!(rootOptions !== null && rootOptions !== void 0 && rootOptions.visible) && !!(column !== null && column !== void 0 && column.allowFiltering) && !!(column !== null && column !== void 0 && column.allowHeaderFiltering),
    headerFilter: _extends({}, restRootOptions, column === null || column === void 0 ? void 0 : column.headerFilter, {
      search: _extends({}, restRootOptions === null || restRootOptions === void 0 ? void 0 : restRootOptions.search, column === null || column === void 0 || (_column$headerFilter = column.headerFilter) === null || _column$headerFilter === void 0 ? void 0 : _column$headerFilter.search)
    })
  });
};
export const getColumnIdentifier = column => column.name ?? column.dataField;
export const getColumnName = column => {
  const name = getColumnIdentifier(column);
  if (!isDefined(name)) {
    throw errors.Error('E1049', column.caption);
  }
  return name;
};
export const getFilterOperator = (values, filterType) => {
  const isInclude = !filterType || filterType === 'include';
  const isValueArray = Array.isArray(values);
  switch (true) {
    case isValueArray && isInclude:
      return 'anyof';
    case isValueArray && !isInclude:
      return 'noneof';
    case !isValueArray && isInclude:
      return '=';
    case !isValueArray && !isInclude:
      return '<>';
    default:
      throw new Error('Invalid state');
  }
};
const isFilteringAllowed = column => column.allowFiltering || column.allowHeaderFiltering;
export const isColumnFilterable = column => isFilteringAllowed(column);
export const needCreateHeaderFilter = column => {
  const values = column.filterValues;
  const hasSelectedItems = isDefined(values) && values.length > 0;
  return isFilteringAllowed(column) && hasSelectedItems;
};
const getFilterExpression = (filterValues, column) => {
  var _column$headerFilter2;
  const columnName = getColumnName(column);
  const hasGroupInterval = !!((_column$headerFilter2 = column.headerFilter) !== null && _column$headerFilter2 !== void 0 && _column$headerFilter2.groupInterval);
  const needNormalizeFilterValues = (filterValues === null || filterValues === void 0 ? void 0 : filterValues.length) === 1 && !hasGroupInterval;
  const normalizedFilterValues = needNormalizeFilterValues ? filterValues[0] : filterValues;
  const filterOperator = getFilterOperator(normalizedFilterValues, column.filterType);
  return [columnName, filterOperator, normalizedFilterValues];
};
// NOTE: Logic from util function grid_core/filter/m_filter_sync "getConditionFromHeaderFilter"
export const getHeaderFilterValuesType = column => {
  var _column$headerFilter3;
  const {
    filterValues
  } = column;
  // NOTE: if empty or an empty array
  if (!(filterValues !== null && filterValues !== void 0 && filterValues.length)) {
    return 'empty';
  }
  const [firstFilterItem] = filterValues;
  const hasGroupInterval = !!filterUtils.getGroupInterval(column);
  const hasCustomDataSource = !!((_column$headerFilter3 = column.headerFilter) !== null && _column$headerFilter3 !== void 0 && _column$headerFilter3.dataSource);
  const isSingleValue = filterValues.length === 1 && !Array.isArray(firstFilterItem)
  // NOTE: "canSyncHeaderFilterWithFilterRow" logic part
  && (!hasGroupInterval && !hasCustomDataSource || filterValues.length === 1 && firstFilterItem === null);
  return isSingleValue ? 'single-value' : 'values-or-condition';
};
export const getHeaderFilterInfo = column => {
  if (!isFilteringAllowed(column)) {
    return null;
  }
  const columnId = getColumnIdentifier(column);
  const headerFilterValueType = getHeaderFilterValuesType(column);
  if (headerFilterValueType === 'empty') {
    return {
      type: 'empty',
      columnId,
      filterType: 'include',
      filterValues: [],
      composedFilterValues: []
    };
  }
  const {
    filterType,
    filterValues
  } = column;
  const normalizedFilterType = filterType ?? 'include';
  const normalizedFilterValues = Array.isArray(filterValues) ? filterValues : [filterValues];
  const filterValuesWithExpressions = normalizedFilterValues.filter(value => Array.isArray(value));
  const filterValuesWithoutExpressions = normalizedFilterValues.filter(value => !Array.isArray(value));
  const filterExpression = filterValuesWithoutExpressions.length ? [getFilterExpression(filterValuesWithoutExpressions, column)] : [];
  const composedFilterValues = gridCoreUtils.combineFilters([...filterExpression, ...filterValuesWithExpressions], 'or');
  return {
    type: headerFilterValueType,
    columnId,
    filterType: normalizedFilterType,
    filterValues,
    composedFilterValues
  };
};
export const getHeaderFilterInfoArray = columns => columns.map(column => getHeaderFilterInfo(column)).filter(info => !!info);
export const getComposedHeaderFilter = headerFilterInfoArray => headerFilterInfoArray
// NOTE: Exclude empty header filters from the composed header filter value
.filter(_ref2 => {
  let {
    type
  } = _ref2;
  return type !== 'empty';
}).reduce((result, _ref3, idx, infoArray) => {
  let {
    composedFilterValues
  } = _ref3;
  result.push(composedFilterValues);
  if (idx < infoArray.length - 1) {
    result.push('and');
  }
  return result;
}, []);
