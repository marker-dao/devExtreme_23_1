/**
* DevExtreme (esm/__internal/grids/pivot_grid/data_source/m_data_source_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { map } from '../../../../core/utils/iterator';
import { isDefined } from '../../../../core/utils/type';
import { createPath, findField, foreachDataLevel, foreachTree, getCompareFunction } from '../m_widget_utils';
function sort(loadOptions, dataSource, getAscOrder) {
  sortDimension(dataSource, loadOptions, 'rows', getAscOrder);
  sortDimension(dataSource, loadOptions, 'columns', getAscOrder);
}
function sortDimension(dataSource, loadOptions, dimensionName, getAscOrder) {
  const fields = loadOptions[dimensionName] || [];
  const baseIndex = loadOptions.headerName === dimensionName ? loadOptions.path.length : 0;
  const sortingMethodByLevel = [];
  foreachDataLevel(dataSource[dimensionName], (item, index) => {
    const field = fields[index] || {};
    const sortingMethod = sortingMethodByLevel[index] = sortingMethodByLevel[index] || getSortingMethod(field, dataSource, loadOptions, dimensionName, getAscOrder);
    item.sort(sortingMethod);
  }, baseIndex);
}
function getSortingMethod(field, dataSource, loadOptions, dimensionName, getAscOrder) {
  const sortOrder = getAscOrder ? 'asc' : field.sortOrder;
  const sortBy = getMemberForSortBy(field.sortBy, getAscOrder);
  const defaultCompare = field.sortingMethod ? function (a, b) {
    return field.sortingMethod(a, b);
  } : getCompareFunction(item => item[sortBy]);
  const summaryValueSelector = !getAscOrder && getFieldSummaryValueSelector(field, dataSource, loadOptions, dimensionName);
  const summaryCompare = summaryValueSelector && getCompareFunction(summaryValueSelector);
  const sortingMethod = function (a, b) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const result = summaryCompare && summaryCompare(a, b) || defaultCompare(a, b);
    return sortOrder === 'desc' ? -result : result;
  };
  return sortingMethod;
}
function getFieldSummaryValueSelector(field, dataSource, loadOptions, dimensionName) {
  const {
    values
  } = dataSource;
  const sortBySummaryFieldIndex = findField(loadOptions.values, field.sortBySummaryField);
  const areRows = dimensionName === 'rows';
  const sortByDimension = areRows ? dataSource.columns : dataSource.rows;
  const grandTotalIndex = areRows ? dataSource.grandTotalRowIndex : dataSource.grandTotalColumnIndex;
  const sortBySummaryPath = field.sortBySummaryPath || [];
  const sliceIndex = sortBySummaryPath.length ? getSliceIndex(sortByDimension, sortBySummaryPath) : grandTotalIndex;
  if (values !== null && values !== void 0 && values.length && sortBySummaryFieldIndex >= 0 && isDefined(sliceIndex)) {
    return function (field) {
      const rowIndex = areRows ? field.index : sliceIndex;
      const columnIndex = areRows ? sliceIndex : field.index;
      const value = ((values[rowIndex] || [[]])[columnIndex] || [])[sortBySummaryFieldIndex];
      return isDefined(value) ? value : null;
    };
  }
  return undefined;
}
function getMemberForSortBy(sortBy, getAscOrder) {
  let member = 'text';
  if (sortBy === 'none') {
    member = 'index';
  } else if (getAscOrder || sortBy !== 'displayText') {
    member = 'value';
  }
  return member;
}
function getSliceIndex(items, path) {
  let index = null;
  const pathValue = (path || []).join('.');
  if (pathValue.length) {
    foreachTree(items, items => {
      const item = items[0];
      const itemPath = createPath(items).join('.');
      const textPath = map(items, item => item.text).reverse().join('.');
      if (pathValue === itemPath || item.key && textPath === pathValue) {
        index = items[0].index;
        return false;
      }
      return undefined;
    });
  }
  return index;
}
export default {
  sort
};
export { sort };
