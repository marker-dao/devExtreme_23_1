/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/column_chooser.js)
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
exports.ColumnChooserView = exports.ColumnChooserController = void 0;
var _m_column_chooser = require("../../../grids/grid_core/column_chooser/m_column_chooser");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ColumnChooserController = exports.ColumnChooserController = _m_column_chooser.columnChooserModule.controllers.columnChooser;
const ColumnChooserView = exports.ColumnChooserView = _m_column_chooser.columnChooserModule.views.columnChooserView;
_m_core.default.registerModule('columnChooser', _m_column_chooser.columnChooserModule);
