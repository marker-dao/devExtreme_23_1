/**
* DevExtreme (cjs/__internal/grids/grid_core/context_menu/m_column_context_menu_mixin.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnContextMenuMixin = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _const = require("../keyboard_navigation/const");
var _const2 = require("./const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ColumnContextMenuMixin = Base => class ColumnContextMenuMixin extends Base {
  constructor() {
    super(...arguments);
    this.isNeedToFocusColumn = false;
  }
  getMoveColumnContextMenuItems(options) {
    var _this$isColumnReorder, _this$getKeyboardNavi;
    const {
      column,
      rowIndex
    } = options;
    const allowColumnReordering = (_this$isColumnReorder = this.isColumnReorderingEnabled) === null || _this$isColumnReorder === void 0 ? void 0 : _this$isColumnReorder.call(this, options === null || options === void 0 ? void 0 : options.column);
    const keyboardNavigationController = (_this$getKeyboardNavi = this.getKeyboardNavigationController) === null || _this$getKeyboardNavi === void 0 ? void 0 : _this$getKeyboardNavi.call(this);
    if (!allowColumnReordering || !keyboardNavigationController) {
      return [];
    }
    const rtlEnabled = this.option('rtlEnabled');
    const onItemClick = e => {
      var _e$itemData;
      this.isNeedToFocusColumn = true;
      keyboardNavigationController.moveColumn(column, (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.value, rowIndex);
    };
    return [{
      text: rtlEnabled ? _message.default.format('dxDataGrid-moveColumnToTheRight') : _message.default.format('dxDataGrid-moveColumnToTheLeft'),
      value: _const.Direction.Previous,
      beginGroup: true,
      disabled: !keyboardNavigationController.canReorderColumn(column, _const.Direction.Previous, rowIndex),
      icon: rtlEnabled ? _const2.CONTEXT_MENU_MOVE_NEXT_ICON_NAME : _const2.CONTEXT_MENU_MOVE_PREVIOUS_ICON_NAME,
      onItemClick
    }, {
      text: rtlEnabled ? _message.default.format('dxDataGrid-moveColumnToTheLeft') : _message.default.format('dxDataGrid-moveColumnToTheRight'),
      value: _const.Direction.Next,
      disabled: !keyboardNavigationController.canReorderColumn(column, _const.Direction.Next, rowIndex),
      icon: rtlEnabled ? _const2.CONTEXT_MENU_MOVE_PREVIOUS_ICON_NAME : _const2.CONTEXT_MENU_MOVE_NEXT_ICON_NAME,
      onItemClick
    }];
  }
};
exports.ColumnContextMenuMixin = ColumnContextMenuMixin;
