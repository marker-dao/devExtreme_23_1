/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/header_filter/view_controller.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderFilterViewController = void 0;
var _signalsCore = require("@preact/signals-core");
var _m_utils = require("../../../../../filter_builder/m_utils");
var _m_utils2 = _interopRequireDefault(require("../../../../../grids/grid_core/m_utils"));
var _index = require("../../columns_controller/index");
var _utils = require("../../columns_controller/utils");
var _index2 = require("../../data_controller/index");
var _options_controller = require("../../options_controller/options_controller");
var _filter_controller = require("../filter_controller");
var _utils2 = require("../utils");
var _legacy_header_filter = require("./legacy_header_filter");
var _utils3 = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class HeaderFilterViewController {
  constructor(options, dataController, columnsController, filterController) {
    this.options = options;
    this.dataController = dataController;
    this.columnsController = columnsController;
    this.filterController = filterController;
    this.popupStateInternal = (0, _signalsCore.signal)(null);
    this.popupState = this.popupStateInternal;
  }
  openPopup(element, column, onFilterCloseCallback) {
    const rootDataSource = this.dataController.getStoreLoadAdapter();
    const rootHeaderFilterOptions = this.options.oneWay('headerFilter').peek();
    const filterExpression = this.getFilterExpressionWithoutCurrentColumn(column);
    const filterDataSourceOptions = (0, _legacy_header_filter.getDataSourceOptions)(rootDataSource, _extends({}, column, {
      filterType: column.filterType,
      filterValues: column.filterValues
    }),
    // NOTE: Only text used from root options
    {
      texts: rootHeaderFilterOptions.texts
    }, filterExpression);
    const type = (0, _legacy_header_filter.getFilterType)(column);
    const colsController = this.columnsController;
    this.popupStateInternal.value = {
      element,
      options: {
        type,
        headerFilter: _extends({}, column.headerFilter),
        dataSource: filterDataSourceOptions,
        filterType: column.filterType,
        // NOTE: Copy array because of mutations in legacy code
        filterValues: Array.isArray(column.filterValues) ? [...column.filterValues] : column.filterValues,
        apply() {
          colsController.updateColumns(columns => {
            const index = (0, _utils.getColumnIndexByName)(columns, column.name);
            const newColumns = [...columns];
            newColumns[index] = _extends({}, newColumns[index], {
              headerFilter: _extends({}, newColumns[index].headerFilter),
              filterValues: Array.isArray(this.filterValues) ? [...this.filterValues] : this.filterValues,
              filterType: this.filterType
            });
            return newColumns;
          });
          onFilterCloseCallback === null || onFilterCloseCallback === void 0 || onFilterCloseCallback();
        },
        hidePopupCallback: () => {
          this.popupStateInternal.value = null;
          onFilterCloseCallback === null || onFilterCloseCallback === void 0 || onFilterCloseCallback();
        }
      }
    };
  }
  removeColumnFromFilters(appliedFilters, excludedColumn) {
    const columnId = (0, _utils3.getColumnIdentifier)(excludedColumn);
    const filterPanel = (0, _m_utils.removeFieldConditionsFromFilter)(appliedFilters.filterPanel, columnId);
    const headerFilter = (0, _m_utils.removeFieldConditionsFromFilter)(appliedFilters.headerFilter, columnId);
    return {
      filterPanel,
      headerFilter,
      // Note: Search filter should not be handled as in the DataGrid implementation
      search: appliedFilters.search
    };
  }
  combineFilterExpressions(filterExpressions) {
    if (!filterExpressions || filterExpressions.length === 0) {
      return undefined;
    }
    return _m_utils2.default.combineFilters(filterExpressions);
  }
  getFilterExpressionWithoutCurrentColumn(column) {
    const appliedFilters = this.filterController.appliedFilters.peek();
    const filtersWithoutCurrentColumn = this.removeColumnFromFilters(appliedFilters, column);
    const allColumns = this.columnsController.columns.peek();
    const customOperations = this.filterController.customOperations.peek();
    const appliedFilterExpresssionsArray = (0, _utils2.getAppliedFilterExpressions)(filtersWithoutCurrentColumn, allColumns, customOperations);
    return this.combineFilterExpressions(appliedFilterExpresssionsArray);
  }
}
exports.HeaderFilterViewController = HeaderFilterViewController;
HeaderFilterViewController.dependencies = [_options_controller.OptionsController, _index2.DataController, _index.ColumnsController, _filter_controller.FilterController];
