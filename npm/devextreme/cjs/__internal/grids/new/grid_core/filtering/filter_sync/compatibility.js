/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/filter_sync/compatibility.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompatibilityFilterSyncController = void 0;
var _filter_controller = require("../filter_controller");
var _controller = require("./controller");
class CompatibilityFilterSyncController {
  constructor(realFilterController, realFilterSyncController) {
    this.realFilterController = realFilterController;
    this.realFilterSyncController = realFilterSyncController;
  }
  getCustomFilterOperations() {
    return this.realFilterController.customOperations.peek();
  }
}
exports.CompatibilityFilterSyncController = CompatibilityFilterSyncController;
CompatibilityFilterSyncController.dependencies = [_filter_controller.FilterController, _controller.FilterSyncController];
