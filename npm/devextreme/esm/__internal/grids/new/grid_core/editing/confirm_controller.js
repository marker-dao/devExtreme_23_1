/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/confirm_controller.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
