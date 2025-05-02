/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/controller.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
