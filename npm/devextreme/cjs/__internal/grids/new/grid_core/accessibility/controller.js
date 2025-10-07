/**
* DevExtreme (cjs/__internal/grids/new/grid_core/accessibility/controller.js)
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
exports.AccessibilityController = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _index = require("../../../../core/state_manager/index");
var _columns_controller = require("../columns_controller/columns_controller");
var _index2 = require("../data_controller/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AccessibilityController {
  constructor(columnsController, dataController) {
    this.columnsController = columnsController;
    this.dataController = dataController;
    this.firstRender = (0, _index.signal)(true);
    this.description = (0, _index.computed)(
    // @ts-expect-error ts-error
    () => _message.default.format('dxCardView-ariaCardView', this.dataController.totalCount.value, this.columnsController.visibleColumns.value.length));
    this.componentDescription = (0, _index.computed)(() => this.description.value);
    this.componentStatus = (0, _index.computed)(() => {
      if (this.firstRender.value) {
        return '';
      }
      return this.componentDescription.value;
    });
    let firstRender = true;
    (0, _index.effect)(() => {
      // TODO: First Render refactor
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.componentDescription.value;
      if (!firstRender) {
        this.firstRender.value = false;
      }
      firstRender = false;
    });
  }
}
exports.AccessibilityController = AccessibilityController;
AccessibilityController.dependencies = [_columns_controller.ColumnsController, _index2.DataController];
