/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/compatibility.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompatibilityColumnsController = void 0;
var _columns_controller = require("./columns_controller");
class CompatibilityColumnsController {
  constructor(realColumnsController) {
    this.realColumnsController = realColumnsController;
  }
  getColumns() {
    return this.realColumnsController.columns.peek();
  }
  getFilteringColumns() {
    return this.realColumnsController.columns.peek();
  }
}
exports.CompatibilityColumnsController = CompatibilityColumnsController;
CompatibilityColumnsController.dependencies = [_columns_controller.ColumnsController];
