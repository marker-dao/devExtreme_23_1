/**
* DevExtreme (cjs/__internal/grids/data_grid/m_data_source_adapter.js)
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
exports.default = void 0;
var _m_data_source_adapter = _interopRequireDefault(require("../../grids/grid_core/data_source_adapter/m_data_source_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let DataSourceAdapterType = _m_data_source_adapter.default;
var _default = exports.default = {
  extend(extender) {
    DataSourceAdapterType = extender(DataSourceAdapterType);
  },
  create(component) {
    return new DataSourceAdapterType(component);
  }
};
