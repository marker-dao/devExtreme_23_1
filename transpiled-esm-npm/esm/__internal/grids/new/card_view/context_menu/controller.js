import _extends from "@babel/runtime/helpers/esm/extends";
import { ColumnsController } from '../../grid_core/columns_controller/index';
import { BaseContextMenuController } from '../../grid_core/context_menu/controller';
import { OptionsController } from '../options_controller';
export class ContextMenuController extends BaseContextMenuController {
  constructor(columnsController, options) {
    super();
    this.columnsController = columnsController;
    this.options = options;
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
    const onItemClick = e => {
      var _e$itemData;
      this.columnsController.columnOption(column, 'sortOrder', (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.value);
    };
    return [{
      text: this.options.oneWay('sorting.ascendingText').peek(),
      value: 'asc',
      disabled: column.sortOrder === 'asc',
      icon: 'sortuptext',
      onItemClick
    }, {
      text: this.options.oneWay('sorting.descendingText').peek(),
      value: 'desc',
      disabled: column.sortOrder === 'desc',
      icon: 'sortdowntext',
      onItemClick
    }, {
      text: this.options.oneWay('sorting.clearText').peek(),
      value: undefined,
      disabled: !column.sortOrder,
      icon: 'none',
      onItemClick
    }];
  }
}
ContextMenuController.dependencies = [ColumnsController, OptionsController];