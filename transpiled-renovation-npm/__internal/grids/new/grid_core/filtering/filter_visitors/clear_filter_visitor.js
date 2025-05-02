"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearFilterVisitor = void 0;
var _index = require("../../search/index");
var _filter_controller = require("../filter_controller");
var _index2 = require("../header_filter/index");
class ClearFilterVisitor {
  constructor(searchController, headerFilterController, filterController) {
    this.searchController = searchController;
    this.headerFilterController = headerFilterController;
    this.filterController = filterController;
    this.filterController.clearFilterCallback = () => {
      this.clearFilters();
    };
  }
  clearFilters() {
    this.searchController.searchTextOption.value = '';
    this.filterController.filterValueOption.value = null;
    // Note: if filterSync is enabled headerFilters should be cleared already
    this.headerFilterController.clearHeaderFilters();
  }
}
exports.ClearFilterVisitor = ClearFilterVisitor;
ClearFilterVisitor.dependencies = [_index.SearchController, _index2.HeaderFilterController, _filter_controller.FilterController];