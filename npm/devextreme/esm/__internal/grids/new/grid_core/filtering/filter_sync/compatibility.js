/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/filter_sync/compatibility.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { FilterController } from '../filter_controller';
import { FilterSyncController } from './controller';
export class CompatibilityFilterSyncController {
  constructor(realFilterController, realFilterSyncController) {
    this.realFilterController = realFilterController;
    this.realFilterSyncController = realFilterSyncController;
  }
  getCustomFilterOperations() {
    return this.realFilterController.customOperations.peek();
  }
}
CompatibilityFilterSyncController.dependencies = [FilterController, FilterSyncController];
