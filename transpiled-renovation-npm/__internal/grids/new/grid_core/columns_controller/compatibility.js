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