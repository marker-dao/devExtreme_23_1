/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/compatibility.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ColumnsController } from './columns_controller';
export class CompatibilityColumnsController {
  constructor(realColumnsController) {
    this.realColumnsController = realColumnsController;
  }
  getColumns() {
    return this.realColumnsController.columns.peek();
  }
  getFilteringColumns() {
    return this.realColumnsController.columns.peek();
  }
}
CompatibilityColumnsController.dependencies = [ColumnsController];
