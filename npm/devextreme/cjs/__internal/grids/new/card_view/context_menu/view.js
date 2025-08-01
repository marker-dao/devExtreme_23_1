/**
* DevExtreme (cjs/__internal/grids/new/card_view/context_menu/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuView = void 0;
var _view = require("../../grid_core/context_menu/view");
var _controller = require("./controller");
class ContextMenuView extends _view.BaseContextMenuView {
  constructor(controller) {
    super(controller);
    this.controller = controller;
  }
}
exports.ContextMenuView = ContextMenuView;
ContextMenuView.dependencies = [_controller.ContextMenuController];
