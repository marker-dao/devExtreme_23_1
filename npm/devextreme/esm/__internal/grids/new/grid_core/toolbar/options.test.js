/**
* DevExtreme (esm/__internal/grids/new/grid_core/toolbar/options.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { ToolbarView } from './view';
const setup = config => {
  const context = getContext(config ?? {
    toolbar: {
      visible: true
    }
  });
  const rootElement = document.createElement('div');
  const optionsController = context.get(OptionsControllerMock);
  const toolbar = context.get(ToolbarView);
  toolbar.render(rootElement);
  return {
    rootElement,
    optionsController
  };
};
describe('Options', () => {
  describe('visilbe', () => {
    describe('when it is \'true\'', () => {
      it('Toolbar should be visible', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: true
          }
        });
        expect(rootElement).toMatchSnapshot();
      });
    });
    describe('when it is \'false\'', () => {
      it('Toolbar should be hidden', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: false
          }
        });
        expect(rootElement).toMatchSnapshot();
      });
    });
    describe('when changing it to \'false\' at runtime', () => {
      it('Toolbar should be hidden', () => {
        const {
          rootElement,
          optionsController
        } = setup({
          toolbar: {
            visible: true
          }
        });
        optionsController.option('toolbar.visible', false);
        expect(rootElement).toMatchSnapshot();
      });
    });
    describe('when changing it to \'true\' at runtime', () => {
      it('Toolbar should be visible', () => {
        const {
          rootElement,
          optionsController
        } = setup({
          toolbar: {
            visible: false
          }
        });
        optionsController.option('toolbar.visible', true);
        expect(rootElement).toMatchSnapshot();
      });
    });
  });
  describe('items', () => {
    describe('when these are not set', () => {
      it('Toolbar should be hidden', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            items: []
          }
        });
        expect(rootElement).toMatchSnapshot();
      });
    });
    describe('when these are set', () => {
      it('Toolbar should be visible', () => {
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
        expect(rootElement).toMatchSnapshot();
      });
    });
  });
  describe('disabled', () => {
    describe('when it is \'true\'', () => {
      it('Toolbar should be disabled', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: true,
            disabled: true
          }
        });
        expect(rootElement).toMatchSnapshot();
      });
    });
    describe('when it is \'false\'', () => {
      it('Toolbar should not be disabled', () => {
        const {
          rootElement
        } = setup({
          toolbar: {
            visible: true,
            disabled: false
          }
        });
        expect(rootElement).toMatchSnapshot();
      });
    });
  });
});
