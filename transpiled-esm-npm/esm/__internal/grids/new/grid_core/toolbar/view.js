import { computed } from '@preact/signals-core';
import { BaseContextMenuController } from '../context_menu/controller';
import { View } from '../core/view';
import { OptionsController } from '../options_controller/options_controller';
import { ToolbarController } from './controller';
import { ToolbarView as Toolbar } from './toolbar';
import { isVisible } from './utils';
export class ToolbarView extends View {
  constructor(controller, contextMenuController, options) {
    super();
    this.controller = controller;
    this.contextMenuController = contextMenuController;
    this.options = options;
    this.component = Toolbar;
    this.visibleConfig = this.options.oneWay('toolbar.visible');
    this.visible = computed(() => isVisible(this.visibleConfig.value, this.controller.items.value));
  }
  getProps() {
    return computed(() => ({
      visible: this.visible.value,
      items: this.controller.items.value,
      disabled: this.options.oneWay('toolbar.disabled').value,
      multiline: this.options.oneWay('toolbar.multiline').value,
      showContextMenu: this.showContextMenu.bind(this)
    }));
  }
  showContextMenu(event) {
    this.contextMenuController.show(event, 'toolbar');
  }
}
ToolbarView.dependencies = [ToolbarController, BaseContextMenuController, OptionsController];