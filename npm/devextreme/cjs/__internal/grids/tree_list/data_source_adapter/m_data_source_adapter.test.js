/**
* DevExtreme (cjs/__internal/grids/tree_list/data_source_adapter/m_data_source_adapter.test.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _deferred = require("../../../../core/utils/deferred");
var _custom_store = _interopRequireDefault(require("../../../../data/custom_store"));
var _data_source = _interopRequireDefault(require("../../../../data/data_source"));
var _m_data_source_adapter = require("./m_data_source_adapter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('TreeList DataSourceAdapter - T1311885 Race Condition', () => {
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
  (0, _globals.beforeEach)(() => {
    loadCalls = [];
    mockStore = new _custom_store.default({
      key: 'Task_ID',
      load: options => {
        // @ts-expect-error
        const deferred = new _deferred.Deferred();
        loadCalls.push({
          filter: options === null || options === void 0 ? void 0 : options.filter,
          deferred
        });
        return deferred.promise();
      }
    });
    const dataSource = new _data_source.default({
      store: mockStore,
      reshapeOnPush: true
    });
    const mockComponent = {
      option: _globals.jest.fn(key => {
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
      _createActionByOption: _globals.jest.fn(() => _globals.jest.fn()),
      on: _globals.jest.fn(() => mockComponent),
      off: _globals.jest.fn(() => mockComponent),
      _eventsStrategy: {
        on: _globals.jest.fn(),
        off: _globals.jest.fn(),
        fireEvent: _globals.jest.fn(),
        hasEvent: _globals.jest.fn(() => false)
      }
    };
    dataSourceAdapter = new _m_data_source_adapter.DataSourceAdapterTreeList(mockComponent);
    dataSourceAdapter.init(dataSource, {
      remoteOperations: {
        filtering: true
      }
    });
    dataSourceAdapter._loadDataSource = _globals.jest.fn(options => {
      // @ts-expect-error
      const deferred = new _deferred.Deferred();
      loadCalls.push({
        filter: options === null || options === void 0 ? void 0 : options.filter,
        deferred,
        type: 'dataSource'
      });
      return deferred.promise();
    });
  });
  (0, _globals.afterEach)(() => {
    _globals.jest.clearAllMocks();
    _globals.jest.restoreAllMocks();
    loadCalls = [];
    dataSourceAdapter._loadDataSource = undefined;
    dataSourceAdapter.loadFromStore = undefined;
    mockStore = undefined;
    dataSourceAdapter = undefined;
  });
  (0, _globals.test)('T1311885 - _loadParentsOrChildren should NOT throw concat error when _cachedStoreData is cleared', async () => {
    let firstLoadDeferred = null;
    let errorMessage = '';
    const unhandledRejectionHandler = reason => {
      errorMessage = (reason === null || reason === void 0 ? void 0 : reason.message) || String(reason);
    };
    process.on('unhandledRejection', unhandledRejectionHandler);
    dataSourceAdapter._cachedStoreData = parentData;
    dataSourceAdapter._dataSource = {
      store: _globals.jest.fn(() => mockStore),
      cancel: _globals.jest.fn()
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
    dataSourceAdapter.loadFromStore = _globals.jest.fn((loadOptions, store) => {
      // @ts-expect-error
      const deferred = new _deferred.Deferred();
      if (!firstLoadDeferred) {
        firstLoadDeferred = deferred;
      }
      return deferred.promise();
    });
    dataSourceAdapter._loadParentsOrChildren(childData, options);
    (0, _globals.expect)(dataSourceAdapter.loadFromStore).toHaveBeenCalledTimes(1);
    (0, _globals.expect)(firstLoadDeferred).toBeDefined();
    dataSourceAdapter._cachedStoreData = undefined;
    dataSourceAdapter._lastOperationId = OPERATION_ID.SECOND;
    firstLoadDeferred.resolve(parentData);
    await Promise.resolve();
    process.off('unhandledRejection', unhandledRejectionHandler);
    (0, _globals.expect)(errorMessage).toBe('');
    (0, _globals.expect)(errorMessage).not.toMatch(/concat|Cannot read properties of undefined/i);
  });
});
