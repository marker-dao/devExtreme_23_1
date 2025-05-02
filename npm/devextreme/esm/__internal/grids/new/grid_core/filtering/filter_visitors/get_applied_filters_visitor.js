/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/filter_visitors/get_applied_filters_visitor.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { computed, effect } from '@preact/signals-core';
import { SearchController } from '../../search/index';
import { FilterController } from '../filter_controller';
import { HeaderFilterController } from '../header_filter/index';
export class GetAppliedFilterVisitor {
  constructor(searchController, headerFilterController, filterController) {
    this.searchController = searchController;
    this.headerFilterController = headerFilterController;
    this.filterController = filterController;
    this.filterPanelValue = computed(() => this.filterController.filterPanelFilterEnabled.value ? this.filterController.filterValueOption.value : undefined);
    effect(() => {
      this.filterController.appliedFilters.value = {
        filterPanel: this.filterPanelValue.value,
        headerFilter: this.headerFilterController.composedHeaderFilter.value,
        search: this.searchController.searchFilter.value
      };
    });
  }
}
GetAppliedFilterVisitor.dependencies = [SearchController, HeaderFilterController, FilterController];
