import DataGrid from '../../../../../../ui/data_grid';
import { GridCoreModel } from '../../../../grid_core/__tests__/__mock__/model/grid_core';
export class DataGridModel extends GridCoreModel {
  constructor() {
    super(...arguments);
    this.NAME = 'dxDataGrid';
  }
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