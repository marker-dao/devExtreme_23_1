/**
* DevExtreme (esm/__internal/grids/new/grid_core/toolbar/controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { signal } from '@preact/signals-core';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { ToolbarController } from './controller';
const setup = config => {
  const context = getContext(config ?? {
    toolbar: {
      visible: true
    }
  });
  return {
    toolbarController: context.get(ToolbarController),
    optionsController: context.get(OptionsControllerMock)
  };
};
describe('ToolbarController', () => {
  describe('items', () => {
    describe('when user items are specified', () => {
      it('should contain processed toolbar items', () => {
        const {
          toolbarController
        } = setup({
          toolbar: {
            items: [{
              location: 'before'
            }]
          }
        });
        expect(toolbarController.items.peek()).toStrictEqual([{
          location: 'before'
        }]);
      });
    });
    describe('when default items and user items are specified', () => {
      it('should contain processed toolbar items', () => {
        const {
          toolbarController
        } = setup({
          toolbar: {
            items: ['searchPanel', {
              location: 'before'
            }]
          }
        });
        toolbarController.addDefaultItem(signal({
          name: 'searchPanel',
          location: 'after'
        }));
        expect(toolbarController.items.peek()).toStrictEqual([{
          name: 'searchPanel',
          location: 'after'
        }, {
          location: 'before'
        }]);
      });
    });
  });
  describe('addDefaultItem', () => {
    it('should add new default item to items', () => {
      const {
        toolbarController
      } = setup();
      toolbarController.addDefaultItem(signal({
        name: 'searchPanel',
        location: 'after'
      }));
      expect(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel',
        location: 'after'
      }]);
    });
    it('item should toggle default item when needUpdate changes', () => {
      const {
        toolbarController
      } = setup();
      const needRender = signal(true);
      toolbarController.addDefaultItem(signal({
        name: 'searchPanel',
        location: 'after'
      }), needRender);
      expect(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel',
        location: 'after'
      }]);
      needRender.value = false;
      expect(toolbarController.items.peek()).toStrictEqual([]);
      needRender.value = true;
      expect(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel',
        location: 'after'
      }]);
    });
    it('should add item with order specified in consts', () => {
      const {
        toolbarController
      } = setup();
      const needRender = signal(true);
      toolbarController.addDefaultItem(signal({
        name: 'addCardButton'
      }), needRender);
      toolbarController.addDefaultItem(signal({
        name: 'searchPanel'
      }), signal(true));
      expect(toolbarController.items.peek()).toStrictEqual([{
        name: 'addCardButton'
      }, {
        name: 'searchPanel'
      }]);
      needRender.value = false;
      expect(toolbarController.items.peek()).toStrictEqual([{
        name: 'searchPanel'
      }]);
      needRender.value = true;
      expect(toolbarController.items.peek()).toStrictEqual([{
        name: 'addCardButton'
      }, {
        name: 'searchPanel'
      }]);
    });
  });
});
