/**
* DevExtreme (esm/__internal/grids/data_grid/__tests__/__mock__/model/data_grid.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
  setDataGridOptions(options) {
    const instance = this.getInstance();
    Object.entries(options).forEach(_ref => {
      let [optionName, optionValue] = _ref;
      instance.option(optionName, optionValue);
    });
  }
  setDataGridColumnOptions(columnName, options) {
    const instance = this.getInstance();
    Object.entries(options).forEach(_ref2 => {
      let [optionName, optionValue] = _ref2;
      instance.columnOption(columnName, optionName, optionValue);
    });
  }
}
