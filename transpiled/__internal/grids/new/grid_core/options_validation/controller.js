"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsValidationController = void 0;
var _type = require("../../../../../core/utils/type");
var _index = require("../../../../grids/new/grid_core/data_controller/index");
var _utils = require("./utils");
class OptionsValidationController {
  constructor(dataController) {
    this.dataController = dataController;
  }
  validateKeyExpr() {
    const keyExpr = this.dataController.dataSource.peek().key();
    if (!(0, _type.isDefined)(keyExpr)) {
      (0, _utils.throwError)('E1042', 'CardView');
    }
  }
}
exports.OptionsValidationController = OptionsValidationController;
OptionsValidationController.dependencies = [_index.DataController];