/**
* DevExtreme (esm/__internal/grids/new/grid_core/toolbar/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
