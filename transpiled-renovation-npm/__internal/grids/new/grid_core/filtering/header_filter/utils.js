"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.needCreateHeaderFilter = exports.mergeColumnHeaderFilterOptions = exports.getFilterOperator = exports.getComposedHeaderFilter = exports.getColumnName = exports.getColumnIdentifier = void 0;
var _errors = _interopRequireDefault(require("../../../../../../core/errors"));
var _type = require("../../../../../../core/utils/type");
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
const needCreateHeaderFilter = column => {
  const allowFiltering = column.allowFiltering && column.allowHeaderFiltering;
  const values = column.filterValues;
  const hasSelectedItems = (0, _type.isDefined)(values) && values.length > 0;
  return allowFiltering && hasSelectedItems;
};
exports.needCreateHeaderFilter = needCreateHeaderFilter;
const getComposedHeaderFilter = columns => {
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
exports.getComposedHeaderFilter = getComposedHeaderFilter;