"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreModel = void 0;
var _renderer = _interopRequireDefault(require("../../../../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECTORS = {
  headerRowClass: 'dx-header-row',
  dataRowClass: 'dx-data-row',
  groupRowClass: 'dx-group-row'
};
class GridCoreModel {
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
    return (0, _renderer.default)(Array.from(this.getHeaderCells()).find(el => (0, _renderer.default)(el).text().includes(text)));
  }
}
exports.GridCoreModel = GridCoreModel;