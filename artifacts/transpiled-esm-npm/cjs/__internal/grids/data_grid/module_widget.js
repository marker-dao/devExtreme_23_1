"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _module_widget_base = _interopRequireDefault(require("./module_widget_base"));
require("./module_not_extended/state_storing");
require("./module_not_extended/selection");
require("./module_not_extended/column_chooser");
require("./grouping/module");
require("./module_not_extended/master_detail");
require("./module_editing");
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
require("./summary/module");
require("./module_not_extended/column_fixing");
require("./module_not_extended/adaptivity");
require("./module_not_extended/virtual_columns");
require("./export/module");
require("./focus/module");
require("./module_not_extended/row_dragging");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _module_widget_base.default;
exports.default = _default;