"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterController = void 0;
var _index = require("../../../../core/state_manager/index");
var _m_utils = _interopRequireDefault(require("../../../../grids/grid_core/m_utils"));
var _utils = require("../../../../grids/new/grid_core/columns_controller/utils");
var _controller = require("../../../../grids/new/grid_core/filtering/header_filter/controller");
var _legacy_filter_custom_operations = require("../../../../grids/new/grid_core/filtering/legacy_filter_custom_operations");
var _index2 = require("../../../../grids/new/grid_core/search/index");
var _index3 = require("../columns_controller/index");
var _options_controller = require("../options_controller/options_controller");
var _utils2 = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-unsafe-return */

class FilterController {
  constructor(options, columnsController, searchController, headerFilterController) {
    this.options = options;
    this.columnsController = columnsController;
    this.searchController = searchController;
    this.headerFilterController = headerFilterController;
    this.filterBuilderCustomOperations = this.options.oneWay('filterBuilder.customOperations');
    this.filterPanelFilterEnabled = this.options.twoWay('filterPanel.filterEnabled');
    this.filterPanelVisible = this.options.oneWay('filterPanel.visible');
    this.filterValueOption = this.options.twoWay('filterValue');
    this.filterBuilderPopupOptions = this.options.oneWay('filterBuilderPopup');
    this.filterPanelOptions = this.options.twoWay('filterPanel');
    this.filterBuilderOptions = this.options.twoWay('filterBuilder');
    this.filterSyncEnabledOption = this.options.oneWay('_filterSyncEnabled');
    this.filterSyncEnabled = (0, _index.computed)(() => this.filterSyncEnabledOption.value === 'auto' ? !!this.filterPanelVisible.value : !!this.filterSyncEnabledOption.value);
    this.filterPanelValue = (0, _index.computed)(() => this.filterPanelFilterEnabled.value ? this.filterValueOption.value : null);
    this.filterSyncValue = (0, _index.computed)(() => this.filterSyncEnabled.value ? this.filterPanelValue.value : null);
    this.appliedFilters = (0, _index.computed)(() => ({
      filterPanel: this.filterPanelValue.value,
      headerFilter: this.headerFilterController.composedHeaderFilter.value,
      search: this.searchController.searchFilter.value
    }));
    this.customOperations = (0, _index.computed)(() => {
      const config = {
        columnOption: columnName => {
          const columns = this.columnsController.columns.peek();
          return (0, _utils.getColumnByIndexOrName)(columns, columnName);
        },
        /*
          Note: Root headerFilter options are used because the legacy code handles retrieving
          options for specific columns on its own
        */
        getHeaderFilterOptions: () => this.options.oneWay('headerFilter').peek(),
        getHeaderFilterController: () => this.headerFilterCompatibilityController
      };
      const builtInCustomOperation = [(0, _legacy_filter_custom_operations.anyOf)(config), (0, _legacy_filter_custom_operations.noneOf)(config)];
      return builtInCustomOperation.concat(this.filterBuilderCustomOperations.value).filter(o => o);
    });
    this.displayFilter = (0, _index.computed)(() => {
      const appliedFilterExpressions = (0, _utils2.getAppliedFilterExpressions)(this.appliedFilters.value, this.columnsController.filterableColumns.value, this.customOperations.value, this.filterSyncEnabled.value);
      return _m_utils.default.combineFilters(appliedFilterExpressions) ?? null;
    });
    this.headerFilterCompatibilityController = null;
  }
}
exports.FilterController = FilterController;
FilterController.dependencies = [_options_controller.OptionsController, _index3.ColumnsController, _index2.SearchController, _controller.HeaderFilterController];