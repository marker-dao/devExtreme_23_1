/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/store_load_adapter/store_load_adapter.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import { Deferred } from '../../../../../../core/utils/deferred';
import { signal } from '@preact/signals-core';
import { StoreLoadAdapter } from './store_load_adapter';
const setup = localOperations => {
  const remoteStoreLoadFnMock = jest.fn().mockImplementation(() => Deferred().resolve());
  const localStoreLoadFnMock = jest.fn().mockImplementation(() => Deferred().resolve());
  const dataSourceMock = signal({
    store() {
      return {
        load: remoteStoreLoadFnMock
      };
    }
  });
  const localLoadOptionsMock = signal(localOperations);
  const arrayStoreMock = {
    load: localStoreLoadFnMock
  };
  const storeLoadAdapter = new StoreLoadAdapter(dataSourceMock, localLoadOptionsMock, () => arrayStoreMock);
  return {
    remoteStoreLoadFnMock,
    localStoreLoadFnMock,
    dataSourceMock,
    localLoadOptionsMock,
    storeLoadAdapter
  };
};
describe('DataController', () => {
  describe('StoreLoadAdapter', () => {
    describe('load', () => {
      it.each([{
        caseName: 'all operations local',
        localOperations: {
          paging: true,
          filtering: true,
          grouping: true
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {},
        expectedLocalLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        }
      }, {
        caseName: 'only paging local',
        localOperations: {
          paging: true,
          filtering: false,
          grouping: false
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedLocalLoadOptions: {
          skip: 0,
          take: 20
        }
      }, {
        caseName: 'paging & filtering local',
        localOperations: {
          paging: true,
          filtering: true,
          grouping: false
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {
          group: 'GROUP_A_VALUE'
        },
        expectedLocalLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE'
        }
      }, {
        caseName: 'paging & grouping local',
        localOperations: {
          paging: true,
          filtering: false,
          grouping: true
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {
          filter: 'SOME_FILTER_VALUE'
        },
        expectedLocalLoadOptions: {
          skip: 0,
          take: 20,
          group: 'GROUP_A_VALUE'
        }
      }, {
        caseName: 'only filtering local',
        localOperations: {
          paging: false,
          filtering: true,
          grouping: false
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {
          skip: 0,
          take: 20,
          group: 'GROUP_A_VALUE'
        },
        expectedLocalLoadOptions: {
          filter: 'SOME_FILTER_VALUE'
        }
      }, {
        caseName: 'filtering & grouping local',
        localOperations: {
          paging: false,
          filtering: true,
          grouping: true
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {
          skip: 0,
          take: 20
        },
        expectedLocalLoadOptions: {
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        }
      }, {
        caseName: 'only grouping local',
        localOperations: {
          paging: false,
          filtering: false,
          grouping: true
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE'
        },
        expectedLocalLoadOptions: {
          group: 'GROUP_A_VALUE'
        }
      }, {
        caseName: 'all operations remote',
        localOperations: {
          paging: false,
          filtering: false,
          grouping: false
        },
        originLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedRemoteLoadOptions: {
          skip: 0,
          take: 20,
          filter: 'SOME_FILTER_VALUE',
          group: 'GROUP_A_VALUE'
        },
        expectedLocalLoadOptions: {}
      }])('should split local and remote operations: $caseName', async _ref => {
        let {
          localOperations,
          originLoadOptions,
          expectedLocalLoadOptions,
          expectedRemoteLoadOptions
        } = _ref;
        const {
          storeLoadAdapter,
          remoteStoreLoadFnMock,
          localStoreLoadFnMock
        } = setup(localOperations);
        await storeLoadAdapter.load(originLoadOptions);
        expect(remoteStoreLoadFnMock).toHaveBeenCalledTimes(1);
        expect(localStoreLoadFnMock).toHaveBeenCalledTimes(1);
        expect(remoteStoreLoadFnMock).toHaveBeenCalledWith(expectedRemoteLoadOptions);
        expect(localStoreLoadFnMock).toHaveBeenCalledWith(expectedLocalLoadOptions);
      });
      it('should return result from the local store load', async () => {
        const loadedData = [1, 2, 3];
        const expectedData = ['A', 'B', 'C'];
        const {
          storeLoadAdapter,
          remoteStoreLoadFnMock,
          localStoreLoadFnMock
        } = setup({
          paging: false,
          filtering: false,
          grouping: false
        });
        remoteStoreLoadFnMock.mockImplementation(() => Deferred().resolve(loadedData));
        localStoreLoadFnMock.mockImplementation(() => Deferred().resolve(expectedData));
        const loadResult = await storeLoadAdapter.load();
        expect(loadResult).toBe(expectedData);
      });
      it('should handle remote operations reject', async () => {
        const expectedData = ['A', 'B', 'C'];
        const {
          storeLoadAdapter,
          remoteStoreLoadFnMock,
          localStoreLoadFnMock
        } = setup({
          paging: false,
          filtering: false,
          grouping: false
        });
        remoteStoreLoadFnMock.mockImplementation(() => Deferred().reject('REMOTE_FAILED'));
        localStoreLoadFnMock.mockImplementation(() => Deferred().resolve(expectedData));
        const result = await storeLoadAdapter.load().catch(data => data);
        expect(result).toEqual('REMOTE_FAILED');
      });
      it('should handle local operations reject', async () => {
        const loadedData = [1, 2, 3];
        const {
          storeLoadAdapter,
          remoteStoreLoadFnMock,
          localStoreLoadFnMock
        } = setup({
          paging: false,
          filtering: false,
          grouping: false
        });
        remoteStoreLoadFnMock.mockImplementation(() => Deferred().resolve(loadedData));
        localStoreLoadFnMock.mockImplementation(() => Deferred().reject('LOCAL_FAILED'));
        const result = await storeLoadAdapter.load().catch(data => data);
        expect(result).toEqual('LOCAL_FAILED');
      });
    });
    describe('getLocalLoadOperations', () => {
      it('should return initial local operations', () => {
        const initialLocalOperations = {
          paging: false,
          filtering: false,
          grouping: false
        };
        const {
          storeLoadAdapter
        } = setup(initialLocalOperations);
        const result = storeLoadAdapter.getLocalLoadOperations();
        expect(result).toEqual(initialLocalOperations);
      });
      it('should return actual local operations', () => {
        const initialLocalOperations = {
          paging: false,
          filtering: false,
          grouping: false
        };
        const updatedLocalOperations = {
          paging: true,
          filtering: true,
          grouping: true
        };
        const {
          storeLoadAdapter,
          localLoadOptionsMock
        } = setup(initialLocalOperations);
        localLoadOptionsMock.value = updatedLocalOperations;
        const result = storeLoadAdapter.getLocalLoadOperations();
        expect(result).toEqual(updatedLocalOperations);
      });
    });
  });
});
