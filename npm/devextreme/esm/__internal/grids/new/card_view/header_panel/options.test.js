/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/options.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { describe, expect, it, jest } from '@jest/globals';
import { rerender } from 'inferno';
import { Sortable } from '../../grid_core/inferno_wrappers/sortable';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller.mock';
import { HeaderPanelView } from './view';
const setup = config => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('test-container');
  const context = getContext(config);
  const optionsController = context.get(OptionsControllerMock);
  const headerPanelView = context.get(HeaderPanelView);
  headerPanelView.render(rootElement);
  rerender();
  return {
    optionsController,
    headerPanelView,
    rootElement
  };
};
describe('Options', () => {
  describe('headerPanel', () => {
    describe('dragging', () => {
      it('should pass options to inner Sortable', () => {
        const renderSpy = jest.spyOn(Sortable.prototype, 'render');
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
        expect(renderSpy.mock.calls[0][0]).toMatchObject({
          dropFeedbackMode: 'push',
          scrollSpeed: 555,
          scrollSensitivity: 111
        });
      });
    });
    describe('visible', () => {
      describe('when it is false', () => {
        it('should hide headerPanel', () => {
          const {
            rootElement
          } = setup({
            columns: ['column1'],
            headerPanel: {
              visible: false
            }
          });
          expect(rootElement).toMatchSnapshot();
        });
      });
      describe('when it is true', () => {
        it('should show headerPanel', () => {
          const {
            rootElement
          } = setup({
            columns: ['column1'],
            headerPanel: {
              visible: true
            }
          });
          expect(rootElement).toMatchSnapshot();
        });
      });
    });
    describe('itemTemplate', () => {
      // TODO: fix option controller to enable test
      it.skip('should override content of headerPanel item', () => {
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
        expect(rootElement).toMatchSnapshot();
      });
    });
    describe('itemCssClass', () => {
      it('should add css class to headerPanel item', () => {
        const {
          rootElement
        } = setup({
          columns: ['column1'],
          headerPanel: {
            itemCssClass: 'my-class'
          }
        });
        expect(rootElement.querySelector('.dx-scrollable')).toMatchSnapshot();
      });
    });
  });
});
// TODO: update after related column props are extracted from columns_controller
describe('ColumnProperties', () => {
  describe('headerItemTemplate', () => {
    it.skip('should override content of headerPanel item', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('headerItemCssClass', () => {
    it('should override content of headerPanel item', () => {
      const {
        rootElement
      } = setup({
        columns: [{
          dataField: 'column1',
          headerItemCssClass: 'my-css-class'
        }]
      });
      expect(rootElement).toMatchSnapshot();
    });
  });
});
