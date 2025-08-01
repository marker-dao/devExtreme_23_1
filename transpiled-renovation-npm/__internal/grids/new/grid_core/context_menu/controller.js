"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseContextMenuController = void 0;
var _inferno = require("inferno");
class BaseContextMenuController {
  constructor() {
    this.contextMenuRef = (0, _inferno.createRef)();
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
exports.BaseContextMenuController = BaseContextMenuController;