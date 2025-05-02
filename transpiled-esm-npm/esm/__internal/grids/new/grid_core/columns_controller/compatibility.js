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