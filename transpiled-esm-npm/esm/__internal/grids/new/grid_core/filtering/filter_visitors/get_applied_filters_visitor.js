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