/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/columns_resizing_reordering.js)
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
exports.default = exports.TrackerView = exports.TablePositionViewController = exports.DraggingHeaderViewController = exports.DraggingHeaderView = exports.ColumnsSeparatorView = exports.ColumnsResizerViewController = void 0;
var _m_columns_resizing_reordering = require("../../../grids/grid_core/columns_resizing_reordering/m_columns_resizing_reordering");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DraggingHeaderView = exports.DraggingHeaderView = _m_columns_resizing_reordering.columnsResizingReorderingModule.views.draggingHeaderView;
const DraggingHeaderViewController = exports.DraggingHeaderViewController = _m_columns_resizing_reordering.columnsResizingReorderingModule.controllers.draggingHeader;
const ColumnsSeparatorView = exports.ColumnsSeparatorView = _m_columns_resizing_reordering.columnsResizingReorderingModule.views.columnsSeparatorView;
const TablePositionViewController = exports.TablePositionViewController = _m_columns_resizing_reordering.columnsResizingReorderingModule.controllers.tablePosition;
const ColumnsResizerViewController = exports.ColumnsResizerViewController = _m_columns_resizing_reordering.columnsResizingReorderingModule.controllers.columnsResizer;
const TrackerView = exports.TrackerView = _m_columns_resizing_reordering.columnsResizingReorderingModule.views.trackerView;
_m_core.default.registerModule('columnsResizingReordering', _m_columns_resizing_reordering.columnsResizingReorderingModule);
// NOTE: default export for QUnit tests
var _default = exports.default = {
  DraggingHeaderView,
  DraggingHeaderViewController,
  ColumnsSeparatorView,
  TablePositionViewController,
  ColumnsResizerViewController,
  TrackerView
};
