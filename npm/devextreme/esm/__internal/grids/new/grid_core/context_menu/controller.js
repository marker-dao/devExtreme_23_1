/**
* DevExtreme (esm/__internal/grids/new/grid_core/context_menu/controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createRef } from 'inferno';
export class BaseContextMenuController {
  constructor() {
    this.contextMenuRef = createRef();
    this.onPositioning = e => {
      // @ts-expect-error
      e.position.of = this.lastEvent;
    };
  }
  show(event, view, contextInfo, onMenuCloseCallback) {
    const contextMenu = this.contextMenuRef.current;
    const targetElement = event.target;
    if (event === this.lastEvent || !contextMenu || !targetElement) {
      return;
    }
    this.lastEvent = event;
    const items = this.getItems(view, targetElement, contextInfo);
    if (!items) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    contextMenu.option('items', items);
    contextMenu.option('onHiding', () => {
      onMenuCloseCallback === null || onMenuCloseCallback === void 0 || onMenuCloseCallback();
    });
    contextMenu.show().catch(console.error);
  }
}
