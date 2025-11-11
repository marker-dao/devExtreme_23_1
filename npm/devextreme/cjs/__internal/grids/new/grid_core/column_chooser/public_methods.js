/**
* DevExtreme (cjs/__internal/grids/new/grid_core/column_chooser/public_methods.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
function PublicMethods(GridCore) {
  return class GridCoreWithColumnChooser extends GridCore {
    showColumnChooser() {
      this.columnChooserView.show();
    }
    hideColumnChooser() {
      this.columnChooserView.hide();
    }
  };
}
