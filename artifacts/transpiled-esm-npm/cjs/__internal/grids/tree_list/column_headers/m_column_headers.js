"use strict";

var _m_column_headers = require("../../../grids/grid_core/column_headers/m_column_headers");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnHeadersView = _m_column_headers.columnHeadersModule.views.columnHeadersView.inherit({
  setTableRole($tableElement) {
    this.setAria('role', 'treegrid', $tableElement);
  }
});
_m_core.default.registerModule('columnHeaders', {
  defaultOptions: _m_column_headers.columnHeadersModule.defaultOptions,
  views: {
    columnHeadersView: ColumnHeadersView
  }
});