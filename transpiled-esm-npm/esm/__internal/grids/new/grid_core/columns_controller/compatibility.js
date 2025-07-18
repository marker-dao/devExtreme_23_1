import { ColumnsController } from './columns_controller';
import { addDataFieldToComputedColumns } from './utils';
export class CompatibilityColumnsController {
  constructor(realColumnsController) {
    this.realColumnsController = realColumnsController;
  }
  getColumns() {
    return this.realColumnsController.columns.peek();
  }
  getFilteringColumns() {
    return addDataFieldToComputedColumns(this.realColumnsController.filterableColumns.peek());
  }
}
CompatibilityColumnsController.dependencies = [ColumnsController];