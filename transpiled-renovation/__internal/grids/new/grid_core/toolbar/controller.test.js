"use strict";

var _globals = require("@jest/globals");
var _signalsCore = require("@preact/signals-core");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _controller = require("./controller");
const setup = config => {
  const context = (0, _di.getContext)(config ?? {
    toolbar: {
      visible: true
    }
  });
  return {
    toolbarController: context.get(_controller.ToolbarController),
    optionsController: context.get(_options_controller.OptionsControllerMock)
  };
};
(0, _globals.describe)('ToolbarController', () => {
  (0, _globals.describe)('items', () => {
    (0, _globals.describe)('when user items are specified', () => {
      (0, _globals.it)('should contain processed toolbar items', () => {
        const {
          toolbarController
        } = setup({
          toolbar: {
            items: [{
              location: 'before'
            }]
          }
        });
        (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
          location: 'before'
        }]);
      });
    });
    (0, _globals.describe)('when default items and user items are specified', () => {
      (0, _globals.it)('should contain processed toolbar items', () => {
        const {
          toolbarController
        } = setup({
          toolbar: {
            items: ['searchPanel', {
              location: 'before'
            }]
          }
        });
        toolbarController.addDefaultItem((0, _signalsCore.signal)({
          name: 'searchPanel',
          location: 'after'
        }));
        (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
          name: 'searchPanel',
          location: 'after'
        }, {
          location: 'before'
        }]);
      });
    });
  });
  (0, _globals.describe)('addDefaultItem', () => {
    (0, _globals.it)('should add new default item to items', () => {
      const {
        toolbarController
      } = setup();
      toolbarController.addDefaultItem((0, _signalsCore.signal)({
        name: 'searchPanel',
        location: 'after'
      }));
      (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel',
        location: 'after'
      }]);
    });
    (0, _globals.it)('item should toggle default item when needUpdate changes', () => {
      const {
        toolbarController
      } = setup();
      const needRender = (0, _signalsCore.signal)(true);
      toolbarController.addDefaultItem((0, _signalsCore.signal)({
        name: 'searchPanel',
        location: 'after'
      }), needRender);
      (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel',
        location: 'after'
      }]);
      needRender.value = false;
      (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([]);
      needRender.value = true;
      (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel',
        location: 'after'
      }]);
    });
    (0, _globals.it)('should add item with order specified in consts', () => {
      const {
        toolbarController
      } = setup();
      const needRender = (0, _signalsCore.signal)(true);
      toolbarController.addDefaultItem((0, _signalsCore.signal)({
        name: 'addCardButton'
      }), needRender);
      toolbarController.addDefaultItem((0, _signalsCore.signal)({
        name: 'searchPanel'
      }), (0, _signalsCore.signal)(true));
      (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
        name: 'addCardButton'
      }, {
        name: 'searchPanel'
      }]);
      needRender.value = false;
      (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel'
      }]);
      needRender.value = true;
      (0, _globals.expect)(toolbarController.items.peek()).toStrictEqual([{
        name: 'addCardButton'
      }, {
        name: 'searchPanel'
      }]);
    });
  });
});