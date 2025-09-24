"use strict";

var _globals = require("@jest/globals");
var _deferred = require("../../../../../../core/utils/deferred");
var _index = require("../../../../../core/state_manager/index");
var _store_load_adapter = require("./store_load_adapter");
const setup = localOperations => {
  const remoteStoreLoadFnMock = _globals.jest.fn().mockImplementation(() => (0, _deferred.Deferred)().resolve());
  const localStoreLoadFnMock = _globals.jest.fn().mockImplementation(() => (0, _deferred.Deferred)().resolve());
  const dataSourceMock = (0, _index.signal)({
    store() {
      return {
        load: remoteStoreLoadFnMock
      };
    }
  });
  const localLoadOptionsMock = (0, _index.signal)(localOperations);
  const arrayStoreMock = {
    load: localStoreLoadFnMock
  };
  const storeLoadAdapter = new _store_load_adapter.StoreLoadAdapter(dataSourceMock, localLoadOptionsMock, () => arrayStoreMock);
  return {
    remoteStoreLoadFnMock,
    localStoreLoadFnMock,
    dataSourceMock,
    localLoadOptionsMock,
    storeLoadAdapter
  };
};
(0, _globals.describe)('DataController', () => {
  (0, _globals.describe)('StoreLoadAdapter', () => {
    (0, _globals.describe)('load', () => {
      _globals.it.each([{
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
        (0, _globals.expect)(remoteStoreLoadFnMock).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(localStoreLoadFnMock).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(remoteStoreLoadFnMock).toHaveBeenCalledWith(expectedRemoteLoadOptions);
        (0, _globals.expect)(localStoreLoadFnMock).toHaveBeenCalledWith(expectedLocalLoadOptions);
      });
      (0, _globals.it)('should return result from the local store load', async () => {
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
        remoteStoreLoadFnMock.mockImplementation(() => (0, _deferred.Deferred)().resolve(loadedData));
        localStoreLoadFnMock.mockImplementation(() => (0, _deferred.Deferred)().resolve(expectedData));
        const loadResult = await storeLoadAdapter.load();
        (0, _globals.expect)(loadResult).toBe(expectedData);
      });
      (0, _globals.it)('should handle remote operations reject', async () => {
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
        remoteStoreLoadFnMock.mockImplementation(() => (0, _deferred.Deferred)().reject('REMOTE_FAILED'));
        localStoreLoadFnMock.mockImplementation(() => (0, _deferred.Deferred)().resolve(expectedData));
        const result = await storeLoadAdapter.load().catch(data => data);
        (0, _globals.expect)(result).toEqual('REMOTE_FAILED');
      });
      (0, _globals.it)('should handle local operations reject', async () => {
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
        remoteStoreLoadFnMock.mockImplementation(() => (0, _deferred.Deferred)().resolve(loadedData));
        localStoreLoadFnMock.mockImplementation(() => (0, _deferred.Deferred)().reject('LOCAL_FAILED'));
        const result = await storeLoadAdapter.load().catch(data => data);
        (0, _globals.expect)(result).toEqual('LOCAL_FAILED');
      });
    });
    (0, _globals.describe)('getLocalLoadOperations', () => {
      (0, _globals.it)('should return initial local operations', () => {
        const initialLocalOperations = {
          paging: false,
          filtering: false,
          grouping: false
        };
        const {
          storeLoadAdapter
        } = setup(initialLocalOperations);
        const result = storeLoadAdapter.getLocalLoadOperations();
        (0, _globals.expect)(result).toEqual(initialLocalOperations);
      });
      (0, _globals.it)('should return actual local operations', () => {
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
        (0, _globals.expect)(result).toEqual(updatedLocalOperations);
      });
    });
  });
});