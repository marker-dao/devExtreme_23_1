"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
function PublicMethods(GridCore) {
  return class GridCoreWithSearchController extends GridCore {
    searchByText(text) {
      this.searchController.updateSearchText(text);
    }
  };
}