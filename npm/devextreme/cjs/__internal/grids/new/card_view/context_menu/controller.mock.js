/**
* DevExtreme (cjs/__internal/grids/new/card_view/context_menu/controller.mock.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
