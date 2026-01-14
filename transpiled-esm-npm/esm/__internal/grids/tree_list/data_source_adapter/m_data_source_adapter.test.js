import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Deferred } from '../../../../core/utils/deferred';
import CustomStore from '../../../../data/custom_store';
import DataSource from '../../../../data/data_source';
import { DataSourceAdapterTreeList } from './m_data_source_adapter';
describe('TreeList DataSourceAdapter - T1311885 Race Condition', () => {
  let dataSourceAdapter;
  let mockStore;
  let loadCalls;
  const parentData = [{
    Task_ID: 1,
    Task_Parent_ID: 0,
    Task_Subject: 'Parent 1'
  }, {
    Task_ID: 2,
    Task_Parent_ID: 0,
    Task_Subject: 'Parent 2'
  }];
  const childData = [{
    Task_ID: 10,
    Task_Parent_ID: 1,
    Task_Subject: 'Child 1'
  }, {
    Task_ID: 20,
    Task_Parent_ID: 2,
    Task_Subject: 'Child 2'
  }];
  const OPERATION_ID = {
    FIRST: 1,
    SECOND: 2
  };
  beforeEach(() => {
    loadCalls = [];
    mockStore = new CustomStore({
      key: 'Task_ID',
      load: options => {
        // @ts-expect-error
        const deferred = new Deferred();
        loadCalls.push({
          filter: options === null || options === void 0 ? void 0 : options.filter,
          deferred
        });
        return deferred.promise();
      }
    });
    const dataSource = new DataSource({
      store: mockStore,
      reshapeOnPush: true
    });
    const mockComponent = {
      option: jest.fn(key => {
        const options = {
          remoteOperations: {
            filtering: true,
            sorting: true
          },
          parentIdExpr: 'Task_Parent_ID',
          hasItemsExpr: 'Has_Items',
          filterMode: 'fullBranch',
          expandedRowKeys: [],
          dataStructure: 'plain',
          rootValue: 0
        };
        return options[key];
      }),
      _createActionByOption: jest.fn(() => jest.fn()),
      on: jest.fn(() => mockComponent),
      off: jest.fn(() => mockComponent),
      _eventsStrategy: {
        on: jest.fn(),
        off: jest.fn(),
        fireEvent: jest.fn(),
        hasEvent: jest.fn(() => false)
      }
    };
    dataSourceAdapter = new DataSourceAdapterTreeList(mockComponent);
    dataSourceAdapter.init(dataSource, {
      remoteOperations: {
        filtering: true
      }
    });
    dataSourceAdapter._loadDataSource = jest.fn(options => {
      // @ts-expect-error
      const deferred = new Deferred();
      loadCalls.push({
        filter: options === null || options === void 0 ? void 0 : options.filter,
        deferred,
        type: 'dataSource'
      });
      return deferred.promise();
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    loadCalls = [];
    dataSourceAdapter._loadDataSource = undefined;
    dataSourceAdapter.loadFromStore = undefined;
    mockStore = undefined;
    dataSourceAdapter = undefined;
  });
  test('T1311885 - _loadParentsOrChildren should NOT throw concat error when _cachedStoreData is cleared', async () => {
    let firstLoadDeferred = null;
    let errorMessage = '';
    const unhandledRejectionHandler = reason => {
      errorMessage = (reason === null || reason === void 0 ? void 0 : reason.message) || String(reason);
    };
    process.on('unhandledRejection', unhandledRejectionHandler);
    dataSourceAdapter._cachedStoreData = parentData;
    dataSourceAdapter._dataSource = {
      store: jest.fn(() => mockStore),
      cancel: jest.fn()
    };
    dataSourceAdapter._lastOperationId = OPERATION_ID.FIRST;
    const options = {
      remoteOperations: {
        filtering: true
      },
      storeLoadOptions: {
        sort: null
      },
      loadOptions: {
        sort: null
      },
      operationId: OPERATION_ID.FIRST
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataSourceAdapter.loadFromStore = jest.fn((loadOptions, store) => {
      // @ts-expect-error
      const deferred = new Deferred();
      if (!firstLoadDeferred) {
        firstLoadDeferred = deferred;
      }
      return deferred.promise();
    });
    dataSourceAdapter._loadParentsOrChildren(childData, options);
    expect(dataSourceAdapter.loadFromStore).toHaveBeenCalledTimes(1);
    expect(firstLoadDeferred).toBeDefined();
    dataSourceAdapter._cachedStoreData = undefined;
    dataSourceAdapter._lastOperationId = OPERATION_ID.SECOND;
    firstLoadDeferred.resolve(parentData);
    await Promise.resolve();
    process.off('unhandledRejection', unhandledRejectionHandler);
    expect(errorMessage).toBe('');
    expect(errorMessage).not.toMatch(/concat|Cannot read properties of undefined/i);
  });
});