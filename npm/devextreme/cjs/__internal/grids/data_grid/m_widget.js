/**
* DevExtreme (cjs/__internal/grids/data_grid/m_widget.js)
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
var _m_widget_base = _interopRequireDefault(require("./m_widget_base"));
require("./module_not_extended/state_storing");
require("./module_not_extended/selection");
require("./module_not_extended/column_chooser");
require("./grouping/m_grouping");
require("./module_not_extended/master_detail");
require("./m_editing");
require("./module_not_extended/editing_row_based");
require("./module_not_extended/editing_form_based");
require("./module_not_extended/editing_cell_based");
require("./module_not_extended/validating");
require("./module_not_extended/virtual_scrolling");
require("./module_not_extended/filter_row");
require("./module_not_extended/header_filter");
require("./module_not_extended/filter_sync");
require("./module_not_extended/filter_builder");
require("./module_not_extended/filter_panel");
require("./module_not_extended/search");
require("./module_not_extended/pager");
require("./module_not_extended/columns_resizing_reordering");
require("./module_not_extended/keyboard_navigation");
require("./keyboard_navigation/m_headers_keyboard_navigation");
require("./keyboard_navigation/m_group_panel_keyboard_navigation");
require("./summary/m_summary");
require("./module_not_extended/sticky_columns");
require("./module_not_extended/column_fixing");
require("./module_not_extended/adaptivity");
require("./module_not_extended/virtual_columns");
require("./export/m_export");
require("./focus/m_focus");
require("./module_not_extended/row_dragging");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// NOTE: Order of imports important here and shouldn't be changed.
/* eslint-disable simple-import-sort/imports */
var _default = exports.default = _m_widget_base.default;
