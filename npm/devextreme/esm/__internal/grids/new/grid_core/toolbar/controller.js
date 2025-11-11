/**
* DevExtreme (esm/__internal/grids/new/grid_core/toolbar/controller.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { computed, effect, signal } from '../../../../core/state_manager/index';
import { OptionsController } from '../options_controller/options_controller';
import { DEFAULT_TOOLBAR_ITEMS } from './const';
import { getSortedToolbarItems, normalizeToolbarItems } from './utils';
export class ToolbarController {
  constructor(options) {
    this.options = options;
    this.itemSubscriptions = {};
    this.defaultItems = signal({});
    this.userItems = this.options.oneWay('toolbar.items');
    this.items = computed(() => normalizeToolbarItems(getSortedToolbarItems(this.defaultItems.value), this.userItems.value, DEFAULT_TOOLBAR_ITEMS));
  }
  addDefaultItem(item) {
    let needRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : signal(true);
    const {
      name
    } = item.peek();
    this.itemSubscriptions[name] = effect(() => {
      const newDefaultItems = _extends({}, this.defaultItems.peek());
      if (needRender.value) {
        newDefaultItems[name] = item.value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newDefaultItems[name];
      }
      this.defaultItems.value = newDefaultItems;
    });
  }
}
ToolbarController.dependencies = [OptionsController];
