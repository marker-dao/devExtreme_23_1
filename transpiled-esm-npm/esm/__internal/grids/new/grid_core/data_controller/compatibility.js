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