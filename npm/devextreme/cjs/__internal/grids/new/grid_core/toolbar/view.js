/**
* DevExtreme (cjs/__internal/grids/new/grid_core/toolbar/view.js)
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
exports.ToolbarView = void 0;
var _signalsCore = require("@preact/signals-core");
var _controller = require("../context_menu/controller");
var _view = require("../core/view");
var _options_controller = require("../options_controller/options_controller");
var _controller2 = require("./controller");
var _toolbar = require("./toolbar");
var _utils = require("./utils");
class ToolbarView extends _view.View {
  constructor(controller, contextMenuController, options) {
    super();
    this.controller = controller;
    this.contextMenuController = contextMenuController;
    this.options = options;
    this.component = _toolbar.ToolbarView;
    this.visibleConfig = this.options.oneWay('toolbar.visible');
    this.visible = (0, _signalsCore.computed)(() => (0, _utils.isVisible)(this.visibleConfig.value, this.controller.items.value));
  }
  getProps() {
    return (0, _signalsCore.computed)(() => ({
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
exports.ToolbarView = ToolbarView;
ToolbarView.dependencies = [_controller2.ToolbarController, _controller.BaseContextMenuController, _options_controller.OptionsController];
