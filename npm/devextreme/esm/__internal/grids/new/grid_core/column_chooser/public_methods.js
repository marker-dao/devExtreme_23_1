/**
* DevExtreme (esm/__internal/grids/new/grid_core/column_chooser/public_methods.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function PublicMethods(GridCore) {
  return class GridCoreWithColumnChooser extends GridCore {
    showColumnChooser() {
      this.columnChooserView.show();
    }
    hideColumnChooser() {
      this.columnChooserView.hide();
    }
  };
}
