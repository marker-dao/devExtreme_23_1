import { computed, signal } from '@preact/signals-core';
import { anyOf, noneOf } from '../../../../grids/grid_core/filter/m_filter_custom_operations';
import gridCoreUtils from '../../../../grids/grid_core/m_utils';
import { ColumnsController } from '../columns_controller/index';
import { OptionsController } from '../options_controller/options_controller';
import { getAppliedFilterExpressions } from './utils';
export class FilterController {
  constructor(options, columnsController) {
    this.options = options;
    this.columnsController = columnsController;
    this.filterBuilderCustomOperations = this.options.oneWay('filterBuilder.customOperations');
    this.filterPanelFilterEnabled = this.options.oneWay('filterPanel.filterEnabled');
    this.filterValueOption = this.options.twoWay('filterValue');
    this.appliedFilters = signal({});
    this.customOperations = computed(() => [anyOf(null), noneOf(null)].concat(this.filterBuilderCustomOperations.value).filter(o => o));
    this.appliedFilterExpressions = computed(() => getAppliedFilterExpressions(this.appliedFilters.value, this.columnsController.visibleColumns.value, this.customOperations.value));
    this.displayFilter = computed(() => gridCoreUtils.combineFilters(this.appliedFilterExpressions.value));
    this.clearFilterCallback = () => {};
  }
  clearFilter() {
    this.clearFilterCallback();
  }
}
FilterController.dependencies = [OptionsController, ColumnsController];