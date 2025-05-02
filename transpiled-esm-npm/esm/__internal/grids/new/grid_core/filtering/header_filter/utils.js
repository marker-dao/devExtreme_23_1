import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["texts", "visible"];
import errors from '../../../../../../core/errors';
import { isDefined } from '../../../../../../core/utils/type';
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
export const needCreateHeaderFilter = column => {
  const allowFiltering = column.allowFiltering && column.allowHeaderFiltering;
  const values = column.filterValues;
  const hasSelectedItems = isDefined(values) && values.length > 0;
  return allowFiltering && hasSelectedItems;
};
export const getComposedHeaderFilter = columns => {
  const filterValue = [];
  const filterableColumns = columns.filter(col => needCreateHeaderFilter(col));
  filterableColumns.forEach((col, index) => {
    filterValue.push([getColumnName(col), getFilterOperator(col.filterValues, col.filterType), col.filterValues]);
    if (index < filterableColumns.length - 1) {
      filterValue.push('and');
    }
  });
  return filterValue;
};