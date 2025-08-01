/**
* DevExtreme (cjs/__internal/grids/new/grid_core/context_menu/controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _context_menu = _interopRequireDefault(require("../../../../../ui/context_menu"));
var _controller = require("./controller.mock");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const setup = () => {
  const controller = new _controller.ContextMenuControllerMock();
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
(0, _globals.describe)('Core ContextMenu', () => {
  (0, _globals.describe)('Controller', () => {
    (0, _globals.it)('show()', () => {
      const {
        controller,
        contextMenu
      } = setup();
      _globals.jest.spyOn(controller, 'getItems').mockReturnValue([{
        text: 'test1'
      }]);
      _globals.jest.spyOn(controller, 'onPositioning');
      const target = document.createElement('div');
      const event = {
        preventDefault: _globals.jest.fn(),
        stopPropagation: _globals.jest.fn(),
        target
      };
      const onShowing = _globals.jest.fn();
      contextMenu.option('onShowing', onShowing);
      controller.show(event, 'test view', {
        data: 'test'
      });
      (0, _globals.expect)(controller.getItems).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(controller.getItems).toHaveBeenCalledWith('test view', target, {
        data: 'test'
      });
      (0, _globals.expect)(event.preventDefault).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(event.stopPropagation).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onShowing).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(contextMenu.option('items')).toEqual([{
        text: 'test1'
      }]);
    });
    (0, _globals.it)('getItems() is called only once when show() is fired several times for the same event', () => {
      const {
        controller
      } = setup();
      _globals.jest.spyOn(controller, 'getItems').mockReturnValue([{
        text: 'test1'
      }]);
      const target = document.createElement('div');
      const event = {
        preventDefault: _globals.jest.fn(),
        stopPropagation: _globals.jest.fn(),
        target
      };
      controller.show(event, 'test view', {
        data: 'test'
      });
      controller.show(event, 'test view', {
        data: 'test'
      });
      (0, _globals.expect)(controller.getItems).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('onPositioning() sets event to position.of', () => {
      const {
        controller
      } = setup();
      const event = {
        target: document.createElement('div')
      };
      controller.show(event, 'test view');
      const e = {
        position: {}
      };
      controller.onPositioning(e);
      (0, _globals.expect)(e.position.of).toBe(event);
    });
  });
});
