"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuControllerMock = void 0;
var _ = require(".");
class ContextMenuControllerMock extends _.ContextMenuController {
  getItems(view, targetElement) {
    let contextInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return super.getItems(view, targetElement, contextInfo);
  }
}
exports.ContextMenuControllerMock = ContextMenuControllerMock;