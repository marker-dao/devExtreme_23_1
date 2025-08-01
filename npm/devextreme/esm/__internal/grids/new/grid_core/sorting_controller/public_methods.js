/**
* DevExtreme (esm/__internal/grids/new/grid_core/sorting_controller/public_methods.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function PublicMethods(GridCore) {
  return class GridCoreWithSortingController extends GridCore {
    clearSorting() {
      this.sortingController.clearSorting();
    }
  };
}
