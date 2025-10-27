/**
* DevExtreme (esm/__internal/grids/data_grid/__tests__/__mock__/model/data_grid.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataGrid from '../../../../../../ui/data_grid';
import { GridCoreModel } from '../../../../grid_core/__tests__/__mock__/model/grid_core';
export class DataGridModel extends GridCoreModel {
  getInstance() {
    return DataGrid.getInstance(this.root);
  }
  apiGetVisibleColumns(headerLevel) {
    if (headerLevel === undefined) {
      return this.getInstance().getVisibleColumns();
    }
    return this.getInstance().getVisibleColumns(headerLevel);
  }
}
