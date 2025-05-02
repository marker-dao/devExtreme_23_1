/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/public_methods.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import ArrayStore from '../../../../data/m_array_store';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { DataController } from './data_controller';
import { PublicMethods } from './public_methods';
const setup = options => {
  const context = getContext(options);
  const optionsController = context.get(OptionsControllerMock);
  const dataController = context.get(DataController);
  // @ts-expect-error
  const gridCore = new (PublicMethods(class {
    constructor() {
      this.dataController = dataController;
    }
  }))();
  return {
    optionsController,
    dataController,
    gridCore
  };
};
describe('PublicMethods', () => {
  describe('getDataSource', () => {
    it('should return current dataSource', () => {
      const data = [{
        a: 1
      }, {
        b: 2
      }];
      const {
        gridCore,
        dataController
      } = setup({
        dataSource: data
      });
      expect(gridCore.getDataSource()).toBe(dataController.dataSource.peek());
    });
  });
  describe('byKey', () => {
    it('should return item by key', async () => {
      const {
        gridCore
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'value 1'
        }, {
          id: 2,
          value: 'value 2'
        }]
      });
      expect(await gridCore.byKey(1)).toEqual({
        id: 1,
        value: 'value 1'
      });
      expect(await gridCore.byKey(2)).toEqual({
        id: 2,
        value: 'value 2'
      });
    });
    describe('when needed item is already loaded', () => {
      it('should return item by given key without request', async () => {
        const store = new ArrayStore({
          data: [{
            id: 1,
            value: 'value 1'
          }, {
            id: 2,
            value: 'value 2'
          }, {
            id: 3,
            value: 'value 3'
          }],
          key: 'id'
        });
        jest.spyOn(store, 'byKey');
        const {
          gridCore,
          dataController
        } = setup({
          dataSource: store
        });
        await dataController.waitLoaded();
        const item = await gridCore.byKey(1);
        expect(store.byKey).toBeCalledTimes(0);
        expect(item).toEqual({
          id: 1,
          value: 'value 1'
        });
      });
    });
    describe('when needed item is not already loaded', () => {
      it('should make request to get item by given key', async () => {
        const store = new ArrayStore({
          data: [{
            id: 1,
            value: 'value 1'
          }, {
            id: 2,
            value: 'value 2'
          }, {
            id: 3,
            value: 'value 3'
          }],
          key: 'id'
        });
        jest.spyOn(store, 'byKey');
        const {
          gridCore,
          dataController
        } = setup({
          dataSource: store,
          paging: {
            pageSize: 1
          }
        });
        await dataController.waitLoaded();
        const item = await gridCore.byKey(2);
        expect(store.byKey).toBeCalledTimes(1);
        expect(item).toEqual({
          id: 2,
          value: 'value 2'
        });
      });
    });
  });
  describe('getFilter', () => {
    // TODO: add test once some filter module (header filter, filter row etc) is implemented
    it.skip('should return filter applied to dataSource', () => {});
  });
  describe('keyOf', () => {
    it('should return key of given data object', () => {
      const {
        gridCore
      } = setup({
        keyExpr: 'id',
        dataSource: []
      });
      const dataObject = {
        value: 'my value',
        id: 'my id'
      };
      expect(gridCore.keyOf(dataObject)).toBe('my id');
    });
  });
  describe('pageCount', () => {
    it('should return current page count', () => {
      const {
        gridCore,
        dataController
      } = setup({
        dataSource: [{
          a: '1'
        }, {
          a: '2'
        }, {
          a: '3'
        }, {
          a: '4'
        }],
        paging: {
          pageSize: 2
        }
      });
      expect(gridCore.pageCount()).toBe(2);
      dataController.pageSize.value = 4;
      expect(gridCore.pageCount()).toBe(1);
    });
  });
  describe('pageSize', () => {
    it('should return current page size', () => {
      const {
        gridCore,
        dataController
      } = setup({
        dataSource: [{
          a: '1'
        }, {
          a: '2'
        }, {
          a: '3'
        }, {
          a: '4'
        }],
        paging: {
          pageSize: 2
        }
      });
      expect(gridCore.pageSize()).toBe(2);
      dataController.pageSize.value = 4;
      expect(gridCore.pageSize()).toBe(4);
    });
  });
  describe('pageIndex', () => {
    it('should return current page index', () => {
      const {
        gridCore,
        dataController
      } = setup({
        dataSource: [{
          a: '1'
        }, {
          a: '2'
        }, {
          a: '3'
        }, {
          a: '4'
        }],
        paging: {
          pageSize: 2
        }
      });
      expect(gridCore.pageIndex()).toBe(0);
      dataController.pageIndex.value = 3;
      expect(gridCore.pageIndex()).toBe(3);
    });
  });
  describe('totalCount', () => {
    it('should return current total count', () => {
      const {
        gridCore
      } = setup({
        dataSource: [{
          a: '1'
        }, {
          a: '2'
        }, {
          a: '3'
        }, {
          a: '4'
        }],
        paging: {
          pageSize: 2
        }
      });
      expect(gridCore.totalCount()).toBe(4);
    });
  });
});
