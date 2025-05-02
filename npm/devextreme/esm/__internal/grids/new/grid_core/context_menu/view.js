/**
* DevExtreme (esm/__internal/grids/new/grid_core/context_menu/view.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { computed } from '@preact/signals-core';
import { View } from '../core/view';
import { ContextMenu } from './context_menu';
const CLASS = {
  contextMenu: 'dx-context-menu'
};
export class BaseContextMenuView extends View {
  constructor(controller) {
    super();
    this.controller = controller;
    this.component = ContextMenu;
  }
  getProps() {
    return computed(() => ({
      componentRef: this.controller.contextMenuRef,
      cssClass: this.getWidgetContainerClass(),
      onInitialized: e => {
        var _e$component, _e$component2;
        // @ts-expect-error
        (_e$component = e.component) === null || _e$component === void 0 || _e$component.setAria('role', 'presentation');
        (_e$component2 = e.component) === null || _e$component2 === void 0 || _e$component2.$element().addClass(CLASS.contextMenu);
      },
      onItemClick: e => {
        var _e$itemData, _e$itemData$onItemCli;
        (_e$itemData = e.itemData) === null || _e$itemData === void 0 || (_e$itemData$onItemCli = _e$itemData.onItemClick) === null || _e$itemData$onItemCli === void 0 || _e$itemData$onItemCli.call(_e$itemData, e);
      },
      onPositioning: this.controller.onPositioning
    }));
  }
  // TODO: move this to another place
  getWidgetContainerClass() {
    return 'dx-cardview-container';
  }
}
