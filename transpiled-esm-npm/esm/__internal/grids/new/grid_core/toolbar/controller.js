import _extends from "@babel/runtime/helpers/esm/extends";
import { computed, effect, signal } from '@preact/signals-core';
import { OptionsController } from '../options_controller/options_controller';
import { DEFAULT_TOOLBAR_ITEMS } from './defaults';
import { normalizeToolbarItems } from './utils';
export class ToolbarController {
  constructor(options) {
    this.options = options;
    this.itemSubscriptions = {};
    this.defaultItems = signal({});
    this.userItems = this.options.oneWay('toolbar.items');
    this.items = computed(() => normalizeToolbarItems(Object.values(this.defaultItems.value), this.userItems.value, DEFAULT_TOOLBAR_ITEMS));
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