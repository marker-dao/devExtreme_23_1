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