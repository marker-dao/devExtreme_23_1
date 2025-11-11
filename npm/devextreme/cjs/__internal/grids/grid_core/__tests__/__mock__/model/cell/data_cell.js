/**
* DevExtreme (cjs/__internal/grids/grid_core/__tests__/__mock__/model/cell/data_cell.js)
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
exports.DataCellModel = void 0;
class DataCellModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getText() {
    var _this$root;
    return ((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.textContent) ?? '';
  }
}
exports.DataCellModel = DataCellModel;
