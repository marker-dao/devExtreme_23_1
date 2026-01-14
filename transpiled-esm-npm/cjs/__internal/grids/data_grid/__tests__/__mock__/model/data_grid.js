"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridModel = void 0;
var _data_grid = _interopRequireDefault(require("../../../../../../ui/data_grid"));
var _grid_core = require("../../../../grid_core/__tests__/__mock__/model/grid_core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DataGridModel extends _grid_core.GridCoreModel {
  constructor() {
    super(...arguments);
    this.NAME = 'dxDataGrid';
  }
  getInstance() {
    return _data_grid.default.getInstance(this.root);
  }
  apiGetVisibleColumns(headerLevel) {
    if (headerLevel === undefined) {
      return this.getInstance().getVisibleColumns();
    }
    return this.getInstance().getVisibleColumns(headerLevel);
  }
  setDataGridOptions(options) {
    const instance = this.getInstance();
    Object.entries(options).forEach(_ref => {
      let [optionName, optionValue] = _ref;
      instance.option(optionName, optionValue);
    });
  }
  setDataGridColumnOptions(columnName, options) {
    const instance = this.getInstance();
    Object.entries(options).forEach(_ref2 => {
      let [optionName, optionValue] = _ref2;
      instance.columnOption(columnName, optionName, optionValue);
    });
  }
}
exports.DataGridModel = DataGridModel;