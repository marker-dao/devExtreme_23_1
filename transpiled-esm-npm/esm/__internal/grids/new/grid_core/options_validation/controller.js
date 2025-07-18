import { isDefined } from '../../../../../core/utils/type';
import { DataController } from '../../../../grids/new/grid_core/data_controller/index';
import { throwError } from './utils';
export class OptionsValidationController {
  constructor(dataController) {
    this.dataController = dataController;
  }
  validateKeyExpr() {
    const keyExpr = this.dataController.dataSource.peek().key();
    if (!isDefined(keyExpr)) {
      throwError('E1042', 'CardView');
    }
  }
}
OptionsValidationController.dependencies = [DataController];