/* eslint-disable @typescript-eslint/no-unsafe-return */
import { computed } from '@preact/signals-core';
import gridCoreUtils from '../../../../grids/grid_core/m_utils';
import { getColumnByIndexOrName } from '../../../../grids/new/grid_core/columns_controller/utils';
import { HeaderFilterController } from '../../../../grids/new/grid_core/filtering/header_filter/controller';
import { anyOf, noneOf } from '../../../../grids/new/grid_core/filtering/legacy_filter_custom_operations';
import { SearchController } from '../../../../grids/new/grid_core/search/index';
import { ColumnsController } from '../columns_controller/index';
import { OptionsController } from '../options_controller/options_controller';
import { getAppliedFilterExpressions } from './utils';
export class FilterController {
  constructor(options, columnsController, searchController, headerFilterController) {
    this.options = options;
    this.columnsController = columnsController;
    this.searchController = searchController;
    this.headerFilterController = headerFilterController;
    this.filterBuilderCustomOperations = this.options.oneWay('filterBuilder.customOperations');
    this.filterPanelFilterEnabled = this.options.twoWay('filterPanel.filterEnabled');
    this.filterPanelVisible = this.options.oneWay('filterPanel.visible');
    this.filterValueOption = this.options.twoWay('filterValue');
    this.filterBuilderPopupOptions = this.options.oneWay('filterBuilderPopup');
    this.filterPanelOptions = this.options.twoWay('filterPanel');
    this.filterBuilderOptions = this.options.twoWay('filterBuilder');
    this.filterSyncEnabledOption = this.options.oneWay('_filterSyncEnabled');
    this.filterSyncEnabled = computed(() => this.filterSyncEnabledOption.value === 'auto' ? !!this.filterPanelVisible.value : !!this.filterSyncEnabledOption.value);
    this.filterPanelValue = computed(() => this.filterPanelFilterEnabled.value ? this.filterValueOption.value : null);
    this.filterSyncValue = computed(() => this.filterSyncEnabled.value ? this.filterPanelValue.value : null);
    this.appliedFilters = computed(() => ({
      filterPanel: this.filterPanelValue.value,
      headerFilter: this.headerFilterController.composedHeaderFilter.value,
      search: this.searchController.searchFilter.value
    }));
    this.customOperations = computed(() => {
      const config = {
        columnOption: columnName => {
          const columns = this.columnsController.columns.peek();
          return getColumnByIndexOrName(columns, columnName);
        },
        /*
          Note: Root headerFilter options are used because the legacy code handles retrieving
          options for specific columns on its own
        */
        getHeaderFilterOptions: () => this.options.oneWay('headerFilter').peek(),
        getHeaderFilterController: () => this.headerFilterCompatibilityController
      };
      const builtInCustomOperation = [anyOf(config), noneOf(config)];
      return builtInCustomOperation.concat(this.filterBuilderCustomOperations.value).filter(o => o);
    });
    this.displayFilter = computed(() => {
      const appliedFilterExpressions = getAppliedFilterExpressions(this.appliedFilters.value, this.columnsController.filterableColumns.value, this.customOperations.value, this.filterSyncEnabled.value);
      return gridCoreUtils.combineFilters(appliedFilterExpressions) ?? null;
    });
    this.headerFilterCompatibilityController = null;
  }
}
FilterController.dependencies = [OptionsController, ColumnsController, SearchController, HeaderFilterController];