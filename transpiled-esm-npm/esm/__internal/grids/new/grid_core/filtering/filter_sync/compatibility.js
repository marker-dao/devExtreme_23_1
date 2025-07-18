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