"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAppliedFilterVisitor = void 0;
var _signalsCore = require("@preact/signals-core");
var _index = require("../../search/index");
var _filter_controller = require("../filter_controller");
var _index2 = require("../header_filter/index");
class GetAppliedFilterVisitor {
  constructor(searchController, headerFilterController, filterController) {
    this.searchController = searchController;
    this.headerFilterController = headerFilterController;
    this.filterController = filterController;
    this.filterPanelValue = (0, _signalsCore.computed)(() => this.filterController.filterPanelFilterEnabled.value ? this.filterController.filterValueOption.value : undefined);
    (0, _signalsCore.effect)(() => {
      this.filterController.appliedFilters.value = {
        filterPanel: this.filterPanelValue.value,
        headerFilter: this.headerFilterController.composedHeaderFilter.value,
        search: this.searchController.searchFilter.value
      };
    });
  }
}
exports.GetAppliedFilterVisitor = GetAppliedFilterVisitor;
GetAppliedFilterVisitor.dependencies = [_index.SearchController, _index2.HeaderFilterController, _filter_controller.FilterController];