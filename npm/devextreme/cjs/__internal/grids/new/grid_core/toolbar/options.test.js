/**
* DevExtreme (cjs/__internal/grids/new/grid_core/toolbar/options.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _view = require("./view");
const setup = config => {
  const context = (0, _di.getContext)(config ?? {
    toolbar: {
      visible: true
    }
  });
  const rootElement = document.createElement('div');
  const optionsController = context.get(_options_controller.OptionsControllerMock);
  const toolbar = context.get(_view.ToolbarView);
  toolbar.render(rootElement);
  return {
    rootElement,
    optionsController
  };
};
(0, _globals.describe)('Options', () => {
  (0, _globals.describe)('visilbe', () => {
    (0, _globals.describe)('when it is \'true\'', () => {
      (0, _globals.it)('Toolbar should be visible', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: true
          }
        });
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('when it is \'false\'', () => {
      (0, _globals.it)('Toolbar should be hidden', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: false
          }
        });
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('when changing it to \'false\' at runtime', () => {
      (0, _globals.it)('Toolbar should be hidden', () => {
        const {
          rootElement,
          optionsController
        } = setup({
          toolbar: {
            visible: true
          }
        });
        optionsController.option('toolbar.visible', false);
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('when changing it to \'true\' at runtime', () => {
      (0, _globals.it)('Toolbar should be visible', () => {
        const {
          rootElement,
          optionsController
        } = setup({
          toolbar: {
            visible: false
          }
        });
        optionsController.option('toolbar.visible', true);
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
  });
  (0, _globals.describe)('items', () => {
    (0, _globals.describe)('when these are not set', () => {
      (0, _globals.it)('Toolbar should be hidden', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            items: []
          }
        });
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('when these are set', () => {
      (0, _globals.it)('Toolbar should be visible', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            items: [{
              location: 'before',
              widget: 'dxButton',
              options: {
                text: 'button1'
              }
            }, {
              location: 'after',
              widget: 'dxButton',
              options: {
                text: 'button2'
              }
            }]
          }
        });
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
  });
  (0, _globals.describe)('disabled', () => {
    (0, _globals.describe)('when it is \'true\'', () => {
      (0, _globals.it)('Toolbar should be disabled', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: true,
            disabled: true
          }
        });
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('when it is \'false\'', () => {
      (0, _globals.it)('Toolbar should not be disabled', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: true,
            disabled: false
          }
        });
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
  });
});
