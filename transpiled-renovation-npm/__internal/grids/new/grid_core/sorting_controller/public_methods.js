"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
function PublicMethods(GridCore) {
  return class GridCoreWithSortingController extends GridCore {
    clearSorting() {
      this.sortingController.clearSorting();
    }
  };
}