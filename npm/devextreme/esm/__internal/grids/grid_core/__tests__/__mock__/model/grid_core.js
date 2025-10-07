/**
* DevExtreme (esm/__internal/grids/grid_core/__tests__/__mock__/model/grid_core.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const CLASSES = {
  headerRow: 'dx-header-row',
  dataRow: 'dx-data-row'
};
export class GridCoreModel {
  constructor(root) {
    this.root = root;
  }
  getHeaderCell(columnIndex) {
    return this.root.querySelectorAll(`.${CLASSES.headerRow} > td`)[columnIndex];
  }
  getCellElement(rowIndex, columnIndex) {
    var _this$root$querySelec;
    return (_this$root$querySelec = this.root.querySelectorAll(`.${CLASSES.dataRow}`)[rowIndex]) === null || _this$root$querySelec === void 0 ? void 0 : _this$root$querySelec.querySelectorAll('td')[columnIndex];
  }
  apiColumnOption(id, name, value) {
    switch (arguments.length) {
      case 1:
        return this.getInstance().columnOption(id);
      case 2:
        return this.getInstance().columnOption(id, name);
      default:
        this.getInstance().columnOption(id, name, value);
        return undefined;
    }
  }
}
