/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/compatibility.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompatibilityDataController = void 0;
var _callbacks = _interopRequireDefault(require("../../../../../core/utils/callbacks"));
var _index = require("../../../../core/state_manager/index");
var _data_controller = require("./data_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CompatibilityDataController {
  constructor(realDataController) {
    this.realDataController = realDataController;
    this.dataSourceChanged = (0, _callbacks.default)();
    (0, _index.effect)(() => {
      this.dataSourceChanged.fire(this.realDataController.dataSource.value);
    });
  }
  dataSource() {
    return this.realDataController.dataSource.peek();
  }
}
exports.CompatibilityDataController = CompatibilityDataController;
CompatibilityDataController.dependencies = [_data_controller.DataController];
