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