/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/public_methods.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
function PublicMethods(GridCore) {
  return class GridCoreWithFilterController extends GridCore {
    clearFilter() {
      this.filterSyncController.clearFilters();
    }
  };
}
