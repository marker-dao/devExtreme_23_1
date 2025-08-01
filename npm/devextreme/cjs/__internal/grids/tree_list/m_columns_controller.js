/**
* DevExtreme (cjs/__internal/grids/tree_list/m_columns_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _type = require("../../../core/utils/type");
var _m_columns_controller = require("../../grids/grid_core/columns_controller/m_columns_controller");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TreeListColumnsController extends _m_columns_controller.ColumnsController {
  _getFirstItems(dataSourceAdapter) {
    return super._getFirstItems(dataSourceAdapter).map(node => node.data);
  }
  getFirstDataColumnIndex() {
    const visibleColumns = this.getVisibleColumns();
    const visibleColumnsLength = visibleColumns.length;
    let firstDataColumnIndex = 0;
    for (let i = 0; i <= visibleColumnsLength - 1; i++) {
      if (!(0, _type.isDefined)(visibleColumns[i].command)) {
        firstDataColumnIndex = visibleColumns[i].index;
        break;
      }
    }
    return firstDataColumnIndex;
  }
}
_m_core.default.registerModule('columns', {
  defaultOptions: _m_columns_controller.columnsControllerModule.defaultOptions,
  controllers: {
    columns: TreeListColumnsController
  }
});
