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