/**
* DevExtreme (esm/__internal/grids/new/card_view/context_menu/controller.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { ColumnsController } from '../../grid_core/columns_controller/index';
import { BaseContextMenuController } from '../../grid_core/context_menu/controller';
import { SortingController } from '../../grid_core/sorting_controller/index';
import { OptionsController } from '../options_controller';
export class ContextMenuController extends BaseContextMenuController {
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
    const event = _extends({
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
ContextMenuController.dependencies = [ColumnsController, OptionsController, SortingController];
