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