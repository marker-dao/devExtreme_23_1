/**
* DevExtreme (cjs/__internal/grids/new/card_view/context_menu/controller.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuController = void 0;
var _index = require("../../grid_core/columns_controller/index");
var _controller = require("../../grid_core/context_menu/controller");
var _index2 = require("../../grid_core/sorting_controller/index");
var _options_controller = require("../options_controller");
class ContextMenuController extends _controller.BaseContextMenuController {
  constructor(columnsController, options, sortingController) {
    super();
    this.columnsController = columnsController;
    this.options = options;
    this.sortingController = sortingController;
  }
  show(event, view) {
    let contextInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let onMenuCloseCallback = arguments.length > 3 ? arguments[3] : undefined;
    super.show(event, view, contextInfo, onMenuCloseCallback);
  }
  getItems(view, targetElement) {
    let contextInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const items = [];
    if (view === 'headerPanel' && contextInfo.column) {
      items.push(...this.getSortingItems(contextInfo.column));
    }
    // @ts-expect-error
    const event = Object.assign({
      items: items.length > 0 ? items : undefined,
      target: view,
      targetElement: targetElement,
      columnIndex: undefined,
      card: undefined,
      cardIndex: undefined,
      column: undefined
    }, contextInfo);
    const callback = this.options.action('onContextMenuPreparing').peek();
    callback(event);
    return event.items;
  }
  getSortingItems(column) {
    const mode = this.sortingController.mode.value;
    const isDisabled = mode === 'none' || !column.allowSorting;
    const onItemClick = event => {
      this.handleSortMenuClick(event, mode, column);
    };
    return [{
      text: this.options.oneWay('sorting.ascendingText').peek(),
      value: 'asc',
      disabled: isDisabled || column.sortOrder === 'asc',
      icon: 'sortuptext',
      onItemClick
    }, {
      text: this.options.oneWay('sorting.descendingText').peek(),
      value: 'desc',
      disabled: isDisabled || column.sortOrder === 'desc',
      icon: 'sortdowntext',
      onItemClick
    }, {
      text: this.options.oneWay('sorting.clearText').peek(),
      value: undefined,
      disabled: isDisabled || !column.sortOrder,
      icon: 'none',
      onItemClick
    }];
  }
  handleSortMenuClick(e, mode, column) {
    var _e$itemData;
    const sortOrder = (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.value;
    switch (mode) {
      case 'single':
        this.sortingController.onSingleModeSortCore(column, true, sortOrder);
        break;
      case 'multiple':
        this.sortingController.onMultipleModeSortCore(column, false, sortOrder);
        break;
      default:
        break;
    }
  }
}
exports.ContextMenuController = ContextMenuController;
ContextMenuController.dependencies = [_index.ColumnsController, _options_controller.OptionsController, _index2.SortingController];
