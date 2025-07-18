import { computed } from '@preact/signals-core';
import { ColumnsController } from '../../../../../grids/new/grid_core/columns_controller/index';
import { getComposedHeaderFilter, getHeaderFilterInfoArray } from './utils';
export class HeaderFilterController {
  constructor(columnsController) {
    this.columnsController = columnsController;
    this.headerFilterInfoArray = computed(() => getHeaderFilterInfoArray(this.columnsController.visibleColumns.value));
    this.composedHeaderFilter = computed(() => getComposedHeaderFilter(this.headerFilterInfoArray.value));
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