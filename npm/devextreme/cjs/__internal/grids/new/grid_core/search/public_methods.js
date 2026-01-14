/**
* DevExtreme (cjs/__internal/grids/new/grid_core/search/public_methods.js)
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
exports.PublicMethods = PublicMethods;
function PublicMethods(GridCore) {
  return class GridCoreWithSearchController extends GridCore {
    searchByText(text) {
      this.searchController.updateSearchText(text);
    }
  };
}
