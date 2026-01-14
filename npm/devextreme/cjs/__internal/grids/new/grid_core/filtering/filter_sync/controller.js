/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/filter_sync/controller.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSyncController = void 0;
var _common = require("../../../../../../core/utils/common");
var _index = require("../../../../../core/state_manager/index");
var _m_utils = require("../../../../../filter_builder/m_utils");
var _index2 = require("../../../../../grids/new/grid_core/search/index");
var _index3 = require("../../columns_controller/index");
var _utils = require("../../columns_controller/utils");
var _index4 = require("../header_filter/index");
var _utils2 = require("../header_filter/utils");
var _index5 = require("../index");
var _utils3 = require("./utils");
// import type { ReadonlySignal } from '../../../../../core/state_manager/index';
// import { computed } from '../../../../../core/state_manager/index';

const FILTER_DEEP_COMPARISON_OPTS = {
  maxDepth: 6,
  strict: true
};
class FilterSyncController {
  // 🚨🚨🚨 This controller was hotfixed during severe issues in filterSync feature.
  // Change logic in ctor very carefully, the order of conditions is important.
  // Here we sync two states "filterValue" and "column[].filterValues"
  // TODO filterSync: refactor filters and get rid of this hotfix states sync logic
  constructor(columnsController, filterController, headerFilterController, searchController) {
    this.columnsController = columnsController;
    this.filterController = filterController;
    this.headerFilterController = headerFilterController;
    this.searchController = searchController;
    this.previousFilterPanelValue = null;
    this.previousFilterPanelEnabled = this.filterController.filterPanelFilterEnabled.peek();
    this.previousHeaderFilterInfoArray = [];
    // --- FilterPanel -> HeaderFilter ---
    (0, _index.effect)(() => {
      const filterPanelValue = this.filterController.filterValueOption.value;
      const isFilterPanelEnabled = this.filterController.filterPanelFilterEnabled.value;
      if ((0, _common.equalByValue)(this.previousFilterPanelValue, filterPanelValue, FILTER_DEEP_COMPARISON_OPTS) && this.previousFilterPanelEnabled === isFilterPanelEnabled) {
        return;
      }
      this.previousFilterPanelValue = filterPanelValue;
      this.previousFilterPanelEnabled = isFilterPanelEnabled;
      // NOTE: If filterSync is disabled -> do nothing
      const isSyncEnabled = this.filterController.filterSyncEnabled.peek();
      if (!isSyncEnabled) {
        return;
      }
      // NOTE: If FilterPanel value is empty or disabled -> clear HeaderFilter values
      if (!isFilterPanelEnabled || filterPanelValue === null) {
        this.headerFilterController.clearHeaderFilters();
        this.previousHeaderFilterInfoArray = this.headerFilterController.headerFilterInfoArray.peek();
        return;
      }
      // NOTE: If all conditions above passed sync FilterPanel -> HeaderFilter values
      this.handleFilterPanelSync(filterPanelValue);
      this.previousHeaderFilterInfoArray = this.headerFilterController.headerFilterInfoArray.peek();
    });
    // --- HeaderFilter -> FilterPanel ---
    (0, _index.effect)(() => {
      const headerFilterInfoArray = this.headerFilterController.headerFilterInfoArray.value;
      if ((0, _common.equalByValue)(this.previousHeaderFilterInfoArray, headerFilterInfoArray, FILTER_DEEP_COMPARISON_OPTS)) {
        return;
      }
      this.previousHeaderFilterInfoArray = headerFilterInfoArray;
      // NOTE: If filterSync is disabled -> do nothing
      const isSyncEnabled = this.filterController.filterSyncEnabled.peek();
      if (!isSyncEnabled) {
        return;
      }
      // NOTE: If merged from HeaderFilter values equals current FilterPanel values
      // do nothing
      const filterPanelValue = this.filterController.filterPanelValue.peek() ?? [];
      const newFilterPanelValue = (0, _utils3.mergeFilterPanelWithHeaderFilterValues)(filterPanelValue, headerFilterInfoArray);
      if ((0, _common.equalByValue)(filterPanelValue, newFilterPanelValue, FILTER_DEEP_COMPARISON_OPTS)) {
        return;
      }
      // NOTE: If all conditions above passed sync HeaderFilter -> FilterPanel values
      this.handleHeaderFilterSync(newFilterPanelValue);
      this.previousFilterPanelValue = newFilterPanelValue;
    });
  }
  clearFilters() {
    (0, _index.batch)(() => {
      this.searchController.searchTextOption.value = '';
      this.filterController.filterValueOption.value = null;
      this.headerFilterController.clearHeaderFilters();
    });
  }
  handleFilterPanelSync(filterPanelValue) {
    const sourceColumns = this.columnsController.columns.peek();
    this.columnsController.updateColumns(columns => columns.map(column => {
      const sourceColumn = (0, _utils.getColumnByIndexOrName)(sourceColumns, column.name);
      if (!(0, _utils2.isColumnFilterable)(sourceColumn)) {
        return column;
      }
      const columnId = (0, _utils2.getColumnIdentifier)(column);
      const filterConditions = (0, _m_utils.getMatchedConditions)(filterPanelValue, columnId);
      const filterType = (0, _utils3.getFilterType)(filterConditions);
      const filterValues = filterType ? (0, _utils3.getFilterValues)(filterConditions) : undefined;
      return Object.assign({}, column, {
        filterType,
        filterValues
      });
    }));
  }
  handleHeaderFilterSync(newFilterPanelValue) {
    const normalizedValue = !(newFilterPanelValue !== null && newFilterPanelValue !== void 0 && newFilterPanelValue.length) ? null : newFilterPanelValue;
    // NOTE: If we update filters from HeaderFilter side
    // For better UX the filter panel will be enabled
    (0, _index.batch)(() => {
      this.filterController.filterValueOption.value = normalizedValue;
      this.filterController.filterPanelFilterEnabled.value = true;
    });
  }
}
exports.FilterSyncController = FilterSyncController;
FilterSyncController.dependencies = [_index3.ColumnsController, _index5.FilterController, _index4.HeaderFilterController, _index2.SearchController];
