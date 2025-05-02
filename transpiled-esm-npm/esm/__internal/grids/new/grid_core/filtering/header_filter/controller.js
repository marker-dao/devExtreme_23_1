import { computed } from '@preact/signals-core';
import { ColumnsController } from '../../../../../grids/new/grid_core/columns_controller/index';
import { getComposedHeaderFilter } from './utils';
export class HeaderFilterController {
  constructor(columnsController) {
    this.columnsController = columnsController;
    this.composedHeaderFilter = computed(() => getComposedHeaderFilter(this.columnsController.visibleColumns.value));
  }
  clearHeaderFilters() {
    this.columnsController.updateColumns(columns => columns.map(col => {
      delete col.filterValues;
      delete col.filterType;
      return col;
    }));
  }
}
HeaderFilterController.dependencies = [ColumnsController];