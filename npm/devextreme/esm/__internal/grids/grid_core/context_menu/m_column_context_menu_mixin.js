/**
* DevExtreme (esm/__internal/grids/grid_core/context_menu/m_column_context_menu_mixin.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../common/core/localization/message';
import { Direction } from '../keyboard_navigation/const';
import { CONTEXT_MENU_MOVE_NEXT_ICON_NAME, CONTEXT_MENU_MOVE_PREVIOUS_ICON_NAME } from './const';
export const ColumnContextMenuMixin = Base => class ColumnContextMenuMixin extends Base {
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
      text: rtlEnabled ? messageLocalization.format('dxDataGrid-moveColumnToTheRight') : messageLocalization.format('dxDataGrid-moveColumnToTheLeft'),
      value: Direction.Previous,
      beginGroup: true,
      disabled: !keyboardNavigationController.canReorderColumn(column, Direction.Previous, rowIndex),
      icon: rtlEnabled ? CONTEXT_MENU_MOVE_NEXT_ICON_NAME : CONTEXT_MENU_MOVE_PREVIOUS_ICON_NAME,
      onItemClick
    }, {
      text: rtlEnabled ? messageLocalization.format('dxDataGrid-moveColumnToTheLeft') : messageLocalization.format('dxDataGrid-moveColumnToTheRight'),
      value: Direction.Next,
      disabled: !keyboardNavigationController.canReorderColumn(column, Direction.Next, rowIndex),
      icon: rtlEnabled ? CONTEXT_MENU_MOVE_PREVIOUS_ICON_NAME : CONTEXT_MENU_MOVE_NEXT_ICON_NAME,
      onItemClick
    }];
  }
};
