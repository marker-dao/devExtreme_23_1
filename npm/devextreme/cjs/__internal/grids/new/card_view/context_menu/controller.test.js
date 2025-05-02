/**
* DevExtreme (cjs/__internal/grids/new/card_view/context_menu/controller.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _context_menu = _interopRequireDefault(require("../../../../../ui/context_menu"));
var _index = require("../../grid_core/columns_controller/index");
var _options_controller = require("../options_controller.mock");
var _controller = require("./controller.mock");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const setup = options => {
  const optionsController = new _options_controller.OptionsControllerMock(options);
  const columnsController = new _index.ColumnsController(optionsController);
  const controller = new _controller.ContextMenuControllerMock(columnsController, optionsController);
  const container = document.createElement('div');
  // eslint-disable-next-line new-cap
  const contextMenu = new _context_menu.default(container, {
    onPositioning: controller.onPositioning
  });
  // @ts-expect-error
  controller.contextMenuRef = {
    current: contextMenu
  };
  return {
    controller,
    contextMenu
  };
};
(0, _globals.describe)('ContextMenu', () => {
  (0, _globals.describe)('Controller', () => {
    (0, _globals.it)('onContextMenuPreparing is called on getItems()', () => {
      const onContextMenuPreparing = _globals.jest.fn();
      const {
        controller
      } = setup({
        onContextMenuPreparing
      });
      controller.getItems('content', document.createElement('div'));
      (0, _globals.expect)(onContextMenuPreparing).toHaveBeenCalledTimes(1);
    });
  });
});
