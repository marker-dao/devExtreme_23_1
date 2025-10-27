/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/header_filter/utils.js)
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
exports.needCreateHeaderFilter = exports.mergeColumnHeaderFilterOptions = exports.isColumnFilterable = exports.getHeaderFilterValuesType = exports.getHeaderFilterInfoArray = exports.getHeaderFilterInfo = exports.getFilterOperator = exports.getComposedHeaderFilter = exports.getColumnName = exports.getColumnIdentifier = void 0;
var _errors = _interopRequireDefault(require("../../../../../../core/errors"));
var _type = require("../../../../../../core/utils/type");
var _filtering = _interopRequireDefault(require("../../../../../../ui/shared/filtering"));
var _m_utils = _interopRequireDefault(require("../../../../../grids/grid_core/m_utils"));
const _excluded = ["texts", "visible"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const mergeColumnHeaderFilterOptions = (column, rootOptions) => {
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
exports.mergeColumnHeaderFilterOptions = mergeColumnHeaderFilterOptions;
const getColumnIdentifier = column => column.name ?? column.dataField;
exports.getColumnIdentifier = getColumnIdentifier;
const getColumnName = column => {
  const name = getColumnIdentifier(column);
  if (!(0, _type.isDefined)(name)) {
    throw _errors.default.Error('E1049', column.caption);
  }
  return name;
};
exports.getColumnName = getColumnName;
const getFilterOperator = (values, filterType) => {
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
exports.getFilterOperator = getFilterOperator;
const isFilteringAllowed = column => column.allowFiltering || column.allowHeaderFiltering;
const isColumnFilterable = column => isFilteringAllowed(column);
exports.isColumnFilterable = isColumnFilterable;
const needCreateHeaderFilter = column => {
  const values = column.filterValues;
  const hasSelectedItems = (0, _type.isDefined)(values) && values.length > 0;
  return isFilteringAllowed(column) && hasSelectedItems;
};
exports.needCreateHeaderFilter = needCreateHeaderFilter;
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
const getHeaderFilterValuesType = column => {
  var _column$headerFilter3;
  const {
    filterValues
  } = column;
  // NOTE: if empty or an empty array
  if (!(filterValues !== null && filterValues !== void 0 && filterValues.length)) {
    return 'empty';
  }
  const [firstFilterItem] = filterValues;
  const hasGroupInterval = !!_filtering.default.getGroupInterval(column);
  const hasCustomDataSource = !!((_column$headerFilter3 = column.headerFilter) !== null && _column$headerFilter3 !== void 0 && _column$headerFilter3.dataSource);
  const isSingleValue = filterValues.length === 1 && !Array.isArray(firstFilterItem)
  // NOTE: "canSyncHeaderFilterWithFilterRow" logic part
  && (!hasGroupInterval && !hasCustomDataSource || filterValues.length === 1 && firstFilterItem === null);
  return isSingleValue ? 'single-value' : 'values-or-condition';
};
exports.getHeaderFilterValuesType = getHeaderFilterValuesType;
const getHeaderFilterInfo = column => {
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
  const composedFilterValues = _m_utils.default.combineFilters([...filterExpression, ...filterValuesWithExpressions], 'or');
  return {
    type: headerFilterValueType,
    columnId,
    filterType: normalizedFilterType,
    filterValues,
    composedFilterValues
  };
};
exports.getHeaderFilterInfo = getHeaderFilterInfo;
const getHeaderFilterInfoArray = columns => columns.map(column => getHeaderFilterInfo(column)).filter(info => !!info);
exports.getHeaderFilterInfoArray = getHeaderFilterInfoArray;
const getComposedHeaderFilter = headerFilterInfoArray => headerFilterInfoArray
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
exports.getComposedHeaderFilter = getComposedHeaderFilter;
