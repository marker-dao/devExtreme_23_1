/**
* DevExtreme (esm/__internal/grids/new/grid_core/options_validation/controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
