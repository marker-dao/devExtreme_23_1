/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/filter_visitors/clear_filter_visitor.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { SearchController } from '../../search/index';
import { FilterController } from '../filter_controller';
import { HeaderFilterController } from '../header_filter/index';
export class ClearFilterVisitor {
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
ClearFilterVisitor.dependencies = [SearchController, HeaderFilterController, FilterController];
