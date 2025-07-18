/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/utils.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeFilterWithSelectors = exports.getAppliedFilterExpressions = void 0;
var _m_type = require("../../../../core/utils/m_type");
var _m_utils = require("../../../../filter_builder/m_utils");
var _utils = require("../columns_controller/utils");
const getAppliedFilterExpressions = (appliedFilters, columns, customOperations, filterSyncEnabled) => {
  const filters = [(0, _m_utils.getFilterExpression)(appliedFilters.filterPanel, (0, _utils.addDataFieldToComputedColumns)(columns), customOperations, 'filterBuilder'),
  // Note: Search filters do not contain filter expressions
  appliedFilters.search];
  if (!filterSyncEnabled) {
    filters.push((0, _m_utils.getFilterExpression)(appliedFilters.headerFilter, (0, _utils.addDataFieldToComputedColumns)(columns), customOperations, 'headerFilter'));
  }
  return filters.filter(filter => filter);
};
/**
 * @param columnMap for internal usage inside util, omit this
 */
exports.getAppliedFilterExpressions = getAppliedFilterExpressions;
const normalizeFilterWithSelectors = (filter, columns, remoteFiltering, columnMap) => {
  if (!Array.isArray(filter)) return filter;
  if (!columnMap) {
    // eslint-disable-next-line no-param-reassign
    columnMap = new Map(columns.map(column => [column.dataField ?? column.name, column]));
  }
  const resultFilter = [...filter];
  if ((0, _m_type.isString)(resultFilter[0]) && resultFilter[0] !== '!') {
    const column = columnMap.get(resultFilter[0]);
    if (column && !remoteFiltering) {
      resultFilter[0] = column.calculateFieldValue.bind(column);
    }
  }
  for (let i = 0; i < resultFilter.length; i += 1) {
    resultFilter[i] = normalizeFilterWithSelectors(resultFilter[i], columns, remoteFiltering, columnMap);
  }
  return resultFilter;
};
exports.normalizeFilterWithSelectors = normalizeFilterWithSelectors;
