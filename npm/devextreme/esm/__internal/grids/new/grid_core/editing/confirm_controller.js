/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/confirm_controller.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { confirm } from '../../../../../ui/dialog';
export class ConfirmController {
  confirm(message, title, showTitle) {
    return confirm(message, title,
    // @ts-expect-error wrong typing
    showTitle);
  }
}
ConfirmController.dependencies = [];
