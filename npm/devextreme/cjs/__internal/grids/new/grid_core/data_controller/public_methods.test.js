/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/public_methods.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _m_data_source = require("../../../../data/data_source/m_data_source");
var _m_array_store = _interopRequireDefault(require("../../../../data/m_array_store"));
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _data_controller = require("./data_controller");
var _public_methods = require("./public_methods");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const setup = options => {
  const context = (0, _di.getContext)(options);
  const optionsController = context.get(_options_controller.OptionsControllerMock);
  const dataController = context.get(_data_controller.DataController);
  // @ts-expect-error
  const gridCore = new ((0, _public_methods.PublicMethods)(class {
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
(0, _globals.describe)('PublicMethods', () => {
  (0, _globals.describe)('getDataSource', () => {
    (0, _globals.it)('should return current dataSource', () => {
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
      (0, _globals.expect)(gridCore.getDataSource()).toBe(dataController.dataSource.peek());
    });
  });
  (0, _globals.describe)('byKey', () => {
    (0, _globals.it)('should return item by key', async () => {
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
      (0, _globals.expect)(await gridCore.byKey(1)).toEqual({
        id: 1,
        value: 'value 1'
      });
      (0, _globals.expect)(await gridCore.byKey(2)).toEqual({
        id: 2,
        value: 'value 2'
      });
    });
    (0, _globals.describe)('when needed item is already loaded', () => {
      (0, _globals.it)('should return item by given key without request', async () => {
        const store = new _m_array_store.default({
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
        _globals.jest.spyOn(store, 'byKey');
        const {
          gridCore,
          dataController
        } = setup({
          dataSource: store
        });
        await dataController.waitLoaded();
        const item = await gridCore.byKey(1);
        (0, _globals.expect)(store.byKey).toBeCalledTimes(0);
        (0, _globals.expect)(item).toEqual({
          id: 1,
          value: 'value 1'
        });
      });
    });
    (0, _globals.describe)('when needed item is not already loaded', () => {
      (0, _globals.it)('should make request to get item by given key', async () => {
        const store = new _m_array_store.default({
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
        _globals.jest.spyOn(store, 'byKey');
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
        (0, _globals.expect)(store.byKey).toBeCalledTimes(1);
        (0, _globals.expect)(item).toEqual({
          id: 2,
          value: 'value 2'
        });
      });
    });
  });
  (0, _globals.describe)('keyOf', () => {
    (0, _globals.it)('should return key of given data object', () => {
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
      (0, _globals.expect)(gridCore.keyOf(dataObject)).toBe('my id');
    });
  });
  (0, _globals.describe)('pageCount', () => {
    (0, _globals.it)('should return current page count', () => {
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
      (0, _globals.expect)(gridCore.pageCount()).toBe(2);
      dataController.pageSize.value = 4;
      (0, _globals.expect)(gridCore.pageCount()).toBe(1);
    });
  });
  (0, _globals.describe)('pageSize', () => {
    (0, _globals.it)('should return current page size', () => {
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
      (0, _globals.expect)(gridCore.pageSize()).toBe(2);
      dataController.pageSize.value = 4;
      (0, _globals.expect)(gridCore.pageSize()).toBe(4);
    });
  });
  (0, _globals.describe)('pageIndex', () => {
    (0, _globals.it)('should return current page index', () => {
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
      (0, _globals.expect)(gridCore.pageIndex()).toBe(0);
      dataController.pageIndex.value = 1;
      (0, _globals.expect)(gridCore.pageIndex()).toBe(1);
    });
  });
  (0, _globals.describe)('totalCount', () => {
    (0, _globals.it)('should return current total count', () => {
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
      (0, _globals.expect)(gridCore.totalCount()).toBe(4);
    });
  });
  (0, _globals.describe)('getCombinedFilter', () => {
    const innerSetup = _ref => {
      let {
        dataSourceFilter,
        columnFilterValues
      } = _ref;
      return setup({
        dataSource: new _m_data_source.DataSource({
          store: {
            type: 'array',
            data: [{
              a: 1
            }, {
              a: 2
            }, {
              a: 3
            }]
          },
          filter: dataSourceFilter
        }),
        // if remoteOperations: false, selector are functions instead of dataFields
        // it's harder to match them in test
        remoteOperations: true,
        columns: [{
          dataField: 'a',
          filterValues: columnFilterValues
        }]
      });
    };
    (0, _globals.describe)('when displayFilter and filter from dataSource are empty', () => {
      (0, _globals.it)('should return empty filter', () => {
        const {
          gridCore
        } = innerSetup({
          dataSourceFilter: undefined,
          columnFilterValues: undefined
        });
        (0, _globals.expect)(gridCore.getCombinedFilter()).toBe(undefined);
      });
    });
    (0, _globals.describe)('when displayFilter is set and filter from dataSource is empty', () => {
      (0, _globals.it)('should return displayFilter filter', () => {
        const {
          gridCore
        } = innerSetup({
          dataSourceFilter: undefined,
          columnFilterValues: [1, 2]
        });
        (0, _globals.expect)(gridCore.getCombinedFilter()).toStrictEqual([['a', '=', 1], 'or', ['a', '=', 2]]);
      });
    });
    (0, _globals.describe)('when displayFilter is empty and filter from dataSource is set', () => {
      (0, _globals.it)('should return filter from dataSource', () => {
        const {
          gridCore
        } = innerSetup({
          dataSourceFilter: ['a', '=', 123],
          columnFilterValues: undefined
        });
        (0, _globals.expect)(gridCore.getCombinedFilter()).toStrictEqual(['a', '=', 123]);
      });
    });
    (0, _globals.describe)('when displayFilter and filter from dataSource are set', () => {
      (0, _globals.it)('should combine filters', () => {
        const {
          gridCore
        } = innerSetup({
          dataSourceFilter: ['a', '=', 123],
          columnFilterValues: [1, 2]
        });
        (0, _globals.expect)(gridCore.getCombinedFilter()).toStrictEqual([['a', '=', 123], 'and', [['a', '=', 1], 'or', ['a', '=', 2]]]);
      });
    });
  });
});
