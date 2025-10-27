/**
* DevExtreme (esm/__internal/grids/grid_core/__tests__/__mock__/model/grid_core.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../../../core/renderer';
const SELECTORS = {
  headerRowClass: 'dx-header-row',
  dataRowClass: 'dx-data-row',
  groupRowClass: 'dx-group-row'
};
export class GridCoreModel {
  constructor(root) {
    this.root = root;
  }
  getHeaderCells() {
    return this.root.querySelectorAll(`.${SELECTORS.headerRowClass} > td`);
  }
  getHeaderCell(columnIndex) {
    return this.getHeaderCells()[columnIndex];
  }
  getCellElement(rowIndex, columnIndex) {
    var _this$root$querySelec;
    return (_this$root$querySelec = this.root.querySelectorAll(`.${SELECTORS.dataRowClass}`)[rowIndex]) === null || _this$root$querySelec === void 0 ? void 0 : _this$root$querySelec.querySelectorAll('td')[columnIndex];
  }
  getGroupRows() {
    return this.root.querySelectorAll(`.${SELECTORS.groupRowClass}`);
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
  getHeaderByText(text) {
    return $(Array.from(this.getHeaderCells()).find(el => $(el).text().includes(text)));
  }
}
