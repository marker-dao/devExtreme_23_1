/**
* DevExtreme (cjs/__internal/grids/new/card_view/header_panel/options.test.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _inferno = require("inferno");
var _sortable = require("../../grid_core/inferno_wrappers/sortable");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller.mock");
var _view = require("./view");
/* eslint-disable spellcheck/spell-checker */

const setup = config => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('test-container');
  const context = (0, _di.getContext)(config);
  const optionsController = context.get(_options_controller.OptionsControllerMock);
  const headerPanelView = context.get(_view.HeaderPanelView);
  headerPanelView.render(rootElement);
  (0, _inferno.rerender)();
  return {
    optionsController,
    headerPanelView,
    rootElement
  };
};
(0, _globals.describe)('Options', () => {
  (0, _globals.describe)('headerPanel', () => {
    (0, _globals.describe)('dragging', () => {
      (0, _globals.it)('should pass options to inner Sortable', () => {
        const renderSpy = _globals.jest.spyOn(_sortable.Sortable.prototype, 'render');
        setup({
          columns: ['column1'],
          allowColumnReordering: true,
          headerPanel: {
            dragging: {
              dropFeedbackMode: 'push',
              scrollSpeed: 555,
              scrollSensitivity: 111
            }
          }
        });
        // @ts-expect-error
        (0, _globals.expect)(renderSpy.mock.calls[0][0]).toMatchObject({
          dropFeedbackMode: 'push',
          scrollSpeed: 555,
          scrollSensitivity: 111
        });
      });
    });
    (0, _globals.describe)('visible', () => {
      (0, _globals.describe)('when it is false', () => {
        (0, _globals.it)('should hide headerPanel', () => {
          const {
            rootElement
          } = setup({
            columns: ['column1'],
            headerPanel: {
              visible: false
            }
          });
          (0, _globals.expect)(rootElement).toMatchSnapshot();
        });
      });
      (0, _globals.describe)('when it is true', () => {
        (0, _globals.it)('should show headerPanel', () => {
          const {
            rootElement
          } = setup({
            columns: ['column1'],
            headerPanel: {
              visible: true
            }
          });
          (0, _globals.expect)(rootElement).toMatchSnapshot();
        });
      });
    });
    (0, _globals.describe)('itemTemplate', () => {
      // TODO: fix option controller to enable test
      _globals.it.skip('should override content of headerPanel item', () => {
        const {
          rootElement
        } = setup({
          columns: ['column1'],
          headerPanel: {
            // @ts-expect-error
            itemTemplate: _ref => {
              let {
                column
              } = _ref;
              return $('<div>').addClass('my-class').text(column.caption);
            }
          }
        });
        (0, _globals.expect)(rootElement).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('itemCssClass', () => {
      (0, _globals.it)('should add css class to headerPanel item', () => {
        const {
          rootElement
        } = setup({
          columns: ['column1'],
          headerPanel: {
            itemCssClass: 'my-class'
          }
        });
        (0, _globals.expect)(rootElement.querySelector('.dx-scrollable')).toMatchSnapshot();
      });
    });
  });
});
// TODO: update after related column props are extracted from columns_controller
(0, _globals.describe)('ColumnProperties', () => {
  (0, _globals.describe)('headerItemTemplate', () => {
    _globals.it.skip('should override content of headerPanel item', () => {
      const {
        rootElement
      } = setup({
        columns: [{
          dataField: 'column1',
          // @ts-expect-error
          headerItemTemplate: _ref2 => {
            let {
              column
            } = _ref2;
            return $('<div>').addClass('my-class').text(column.caption);
          }
        }]
      });
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('headerItemCssClass', () => {
    (0, _globals.it)('should override content of headerPanel item', () => {
      const {
        rootElement
      } = setup({
        columns: [{
          dataField: 'column1',
          headerItemCssClass: 'my-css-class'
        }]
      });
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
});
