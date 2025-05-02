"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuControllerMock = void 0;
var _controller = require("./controller");
class ContextMenuControllerMock extends _controller.BaseContextMenuController {
  getItems() {
    return undefined;
  }
}
exports.ContextMenuControllerMock = ContextMenuControllerMock;
ContextMenuControllerMock.dependencies = [];