/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isString } from '../../../../core/utils/m_type';
import { getFilterExpression } from '../../../../filter_builder/m_utils';
import { addDataFieldToComputedColumns } from '../columns_controller/utils';
export const getAppliedFilterExpressions = (appliedFilters, columns, customOperations, filterSyncEnabled) => {
  const filters = [getFilterExpression(appliedFilters.filterPanel, addDataFieldToComputedColumns(columns), customOperations, 'filterBuilder'),
  // Note: Search filters do not contain filter expressions
  appliedFilters.search];
  if (!filterSyncEnabled) {
    filters.push(getFilterExpression(appliedFilters.headerFilter, addDataFieldToComputedColumns(columns), customOperations, 'headerFilter'));
  }
  return filters.filter(filter => filter);
};
/**
 * @param columnMap for internal usage inside util, omit this
 */
export const normalizeFilterWithSelectors = (filter, columns, remoteFiltering, columnMap) => {
  if (!Array.isArray(filter)) return filter;
  if (!columnMap) {
    // eslint-disable-next-line no-param-reassign
    columnMap = new Map(columns.map(column => [column.dataField ?? column.name, column]));
  }
  const resultFilter = [...filter];
  if (isString(resultFilter[0]) && resultFilter[0] !== '!') {
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
