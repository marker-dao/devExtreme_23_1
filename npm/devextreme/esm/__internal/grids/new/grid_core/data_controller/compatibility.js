/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/compatibility.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import createCallback from '../../../../../core/utils/callbacks';
import { effect } from '@preact/signals-core';
import { DataController } from './data_controller';
export class CompatibilityDataController {
  constructor(realDataController) {
    this.realDataController = realDataController;
    this.dataSourceChanged = createCallback();
    effect(() => {
      this.dataSourceChanged.fire(this.realDataController.dataSource.value);
    });
  }
  dataSource() {
    return this.realDataController.dataSource.peek();
  }
}
CompatibilityDataController.dependencies = [DataController];
