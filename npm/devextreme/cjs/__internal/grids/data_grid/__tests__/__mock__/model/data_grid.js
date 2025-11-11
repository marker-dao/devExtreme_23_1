/**
* DevExtreme (cjs/__internal/grids/data_grid/__tests__/__mock__/model/data_grid.js)
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
}
exports.DataGridModel = DataGridModel;
