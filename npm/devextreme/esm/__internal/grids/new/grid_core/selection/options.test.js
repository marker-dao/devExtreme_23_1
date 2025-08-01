/**
* DevExtreme (esm/__internal/grids/new/grid_core/selection/options.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import { getContext } from '../di.test_utils';
import { ItemsController } from '../items_controller/items_controller';
import { ToolbarController } from '../toolbar/controller';
import { SelectionController } from './controller';
const setup = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = getContext(_extends({
    selection: {
      mode: 'single'
    }
  }, config));
  return {
    selectionController: context.get(SelectionController),
    itemsController: context.get(ItemsController),
    toolbarController: context.get(ToolbarController)
  };
};
describe('Options', () => {
  describe('selectedCardKeys', () => {
    describe('when given', () => {
      it('should set the select state of the item', () => {
        const {
          itemsController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selectedCardKeys: [1]
        });
        expect(itemsController.items).toMatchSnapshot();
      });
    });
  });
  describe('selection', () => {
    describe('mode', () => {
      describe('when it is \'none\'', () => {
        it('selection should not work', () => {
          const {
            itemsController,
            selectionController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'none'
            }
          });
          selectionController.selectCards([1]);
          expect(itemsController.items).toMatchSnapshot();
        });
      });
      describe('when it is \'none\' and the selectedCardKeys is specified', () => {
        it('selection should not apply', () => {
          const {
            itemsController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selectedCardKeys: [1],
            selection: {
              mode: 'none'
            }
          });
          expect(itemsController.items).toMatchSnapshot();
        });
      });
    });
    describe('allowSelectAll', () => {
      describe('when it is true and selection mode is \'multiple\'', () => {
        it('selection should not work', () => {
          const {
            toolbarController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'multiple',
              allowSelectAll: true
            }
          });
          expect(toolbarController.items.peek()).toMatchSnapshot();
        });
      });
      describe('when it is false and selection mode is \'multiple\'', () => {
        it('selection should not work', () => {
          const {
            toolbarController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'multiple',
              allowSelectAll: false
            }
          });
          expect(toolbarController.items.peek()).toMatchSnapshot();
        });
      });
      describe('when it is true and selection mode isn\'t \'multiple\'', () => {
        it('selection should not work', () => {
          const {
            toolbarController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'single',
              allowSelectAll: true
            }
          });
          expect(toolbarController.items.peek()).toMatchSnapshot();
        });
      });
    });
  });
});
