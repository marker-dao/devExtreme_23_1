"use strict";

var _globals = require("@jest/globals");
var _context_menu = _interopRequireDefault(require("../../../../../ui/context_menu"));
var _di = require("../di.test_utils");
var _controller = require("./controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const setup = options => {
  const context = (0, _di.getContext)(options);
  const controller = context.get(_controller.ContextMenuController);
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