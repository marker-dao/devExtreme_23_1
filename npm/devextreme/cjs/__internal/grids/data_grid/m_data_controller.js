/**
* DevExtreme (cjs/__internal/grids/data_grid/m_data_controller.js)
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
exports.DataController = void 0;
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_data_controller = require("../../grids/grid_core/data_controller/m_data_controller");
var _m_core = _interopRequireDefault(require("./m_core"));
var _m_data_source_adapter = _interopRequireDefault(require("./m_data_source_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
class DataGridDataController extends _m_data_controller.DataController {
  _getDataSourceAdapter() {
    return _m_data_source_adapter.default;
  }
  _getSpecificDataSourceOption() {
    const dataSource = this.option('dataSource');
    if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
      _ui.default.log('W1011');
    }
    return super._getSpecificDataSourceOption();
  }
}
exports.DataController = DataGridDataController;
_m_core.default.registerModule('data', {
  defaultOptions: _m_data_controller.dataControllerModule.defaultOptions,
  controllers: {
    data: DataGridDataController
  }
});
