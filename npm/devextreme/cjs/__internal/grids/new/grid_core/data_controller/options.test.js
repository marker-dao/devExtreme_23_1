/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/options.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _data = require("../../../../../common/data");
var _data_source = _interopRequireDefault(require("../../../../../data/data_source"));
var _m_console = require("../../../../core/utils/m_console");
var _m_array_store = _interopRequireDefault(require("../../../../data/m_array_store"));
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _data_controller = require("./data_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.beforeAll)(() => {
  _globals.jest.spyOn(_m_console.logger, 'error').mockImplementation(() => {});
});
(0, _globals.afterAll)(() => {
  _globals.jest.restoreAllMocks();
});
const setup = options => {
  const context = (0, _di.getContext)(options);
  return {
    optionsController: context.get(_options_controller.OptionsControllerMock),
    dataController: context.get(_data_controller.DataController)
  };
};
(0, _globals.describe)('Options', () => {
  (0, _globals.describe)('cacheEnabled', () => {
    const setupForCacheEnabled = _ref => {
      let {
        cacheEnabled
      } = _ref;
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
      _globals.jest.spyOn(store, 'load');
      const {
        dataController
      } = setup({
        cacheEnabled,
        dataSource: store,
        paging: {
          pageSize: 1
        }
      });
      return {
        store,
        dataController
      };
    };
    (0, _globals.describe)('when it is false', () => {
      (0, _globals.it)('should skip caching requests', () => {
        const {
          store,
          dataController
        } = setupForCacheEnabled({
          cacheEnabled: false
        });
        (0, _globals.expect)(store.load).toBeCalledTimes(1);
        dataController.pageIndex.value = 1;
        (0, _globals.expect)(store.load).toBeCalledTimes(2);
        dataController.pageIndex.value = 0;
        (0, _globals.expect)(store.load).toBeCalledTimes(3);
      });
    });
    (0, _globals.describe)('when it is true', () => {
      _globals.it.skip('should cache previously loaded pages', () => {});
      _globals.it.skip('should clear cache if not only pageIndex changed', () => {});
    });
  });
  (0, _globals.describe)('dataSourse', () => {
    (0, _globals.describe)('when it is dataSource instance', () => {
      (0, _globals.it)('should pass dataSource as is', () => {
        const dataSource = new _data_source.default({
          store: [{
            a: 1
          }, {
            b: 2
          }]
        });
        const {
          dataController
        } = setup({
          dataSource
        });
        (0, _globals.expect)(dataController.dataSource.peek()).toBe(dataSource);
      });
    });
    (0, _globals.describe)('when it is array', () => {
      (0, _globals.it)('should normalize to DataSource with given items', () => {
        const data = [{
          a: 1
        }, {
          b: 2
        }];
        const {
          dataController
        } = setup({
          dataSource: data
        });
        const dataSource = dataController.dataSource.peek();
        (0, _globals.expect)(dataSource).toBeInstanceOf(_data_source.default);
        (0, _globals.expect)(dataSource.items()).toEqual(data);
      });
    });
    (0, _globals.describe)('when it is empty', () => {
      (0, _globals.it)('should should normalize to empty DataSource', () => {
        const {
          dataController
        } = setup({});
        const dataSource = dataController.dataSource.peek();
        (0, _globals.expect)(dataSource).toBeInstanceOf(_data_source.default);
        (0, _globals.expect)(dataSource.items()).toHaveLength(0);
      });
    });
  });
  (0, _globals.describe)('keyExpr', () => {
    (0, _globals.describe)('when dataSource is array', () => {
      (0, _globals.it)('should be passed as key to DataSource', () => {
        const {
          dataController
        } = setup({
          dataSource: [{
            myKeyExpr: 1
          }, {
            myKeyExpr: 2
          }],
          keyExpr: 'myKeyExpr'
        });
        const dataSource = dataController.dataSource.peek();
        (0, _globals.expect)(dataSource.key()).toBe('myKeyExpr');
      });
    });
    (0, _globals.describe)('when dataSource is DataSource instance', () => {
      (0, _globals.it)('should be ignored', () => {
        const {
          dataController
        } = setup({
          dataSource: new _m_array_store.default({
            key: 'storeKeyExpr',
            data: [{
              storeKeyExpr: 1
            }, {
              storeKeyExpr: 2
            }]
          }),
          keyExpr: 'myKeyExpr'
        });
        const dataSource = dataController.dataSource.peek();
        (0, _globals.expect)(dataSource.key()).toBe('storeKeyExpr');
      });
    });
  });
  (0, _globals.describe)('onDataErrorOccurred', () => {
    (0, _globals.it)('should be called when load error happens', async () => {
      const onDataErrorOccurred = _globals.jest.fn();
      const {
        dataController
      } = setup({
        dataSource: new _data.CustomStore({
          load() {
            return Promise.reject(new Error('my error'));
          }
        }),
        onDataErrorOccurred
      });
      await dataController.waitLoaded();
      (0, _globals.expect)(onDataErrorOccurred).toBeCalledTimes(1);
      (0, _globals.expect)(onDataErrorOccurred.mock.calls[0]).toMatchSnapshot([{
        component: _globals.expect.any(Object)
      }]);
    });
  });
  (0, _globals.describe)('paging.enabled', () => {
    (0, _globals.describe)('when it is true', () => {
      (0, _globals.it)('should turn on pagination', () => {
        const {
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
            enabled: true,
            pageSize: 2
          }
        });
        const items = dataController.items.peek();
        (0, _globals.expect)(items).toHaveLength(2);
      });
    });
    (0, _globals.describe)('when it is false', () => {
      (0, _globals.it)('should turn on pagination', () => {
        const {
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
            enabled: false,
            pageSize: 2
          }
        });
        const items = dataController.items.peek();
        (0, _globals.expect)(items).toHaveLength(4);
      });
    });
  });
  (0, _globals.describe)('paging.pageIndex', () => {
    (0, _globals.it)('should change current page', () => {
      const {
        dataController,
        optionsController
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
          pageSize: 2,
          pageIndex: 1
        }
      });
      let items = dataController.items.peek();
      (0, _globals.expect)(items).toEqual([{
        a: '3'
      }, {
        a: '4'
      }]);
      optionsController.option('paging.pageIndex', 0);
      items = dataController.items.peek();
      (0, _globals.expect)(items).toEqual([{
        a: '1'
      }, {
        a: '2'
      }]);
    });
  });
  (0, _globals.describe)('paging.pageSize', () => {
    (0, _globals.it)('should change size of current page', () => {
      const {
        dataController,
        optionsController
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
      let items = dataController.items.peek();
      (0, _globals.expect)(items).toEqual([{
        a: '1'
      }, {
        a: '2'
      }]);
      optionsController.option('paging.pageSize', 3);
      items = dataController.items.peek();
      (0, _globals.expect)(items).toEqual([{
        a: '1'
      }, {
        a: '2'
      }, {
        a: '3'
      }]);
    });
  });
  (0, _globals.describe)('remoteOperations', () => {
    const setupForRemoteOperations = _ref2 => {
      let {
        remoteOperations
      } = _ref2;
      const store = new _data.CustomStore({
        key: 'id',
        load(loadOptions) {
          const data = [{
            id: 1,
            value: 'value 1'
          }, {
            id: 2,
            value: 'value 2'
          }, {
            id: 3,
            value: 'value 3'
          }];
          const remotePaging = loadOptions.skip === 0 && !!loadOptions.take;
          if (remotePaging) {
            return Promise.resolve({
              data: [data[0]],
              totalCount: 1
            });
          }
          return Promise.resolve({
            data,
            totalCount: data.length
          });
        }
      });
      _globals.jest.spyOn(store, 'load');
      const {
        dataController
      } = setup({
        remoteOperations,
        dataSource: store,
        paging: {
          pageSize: 1,
          pageIndex: 0
        }
      });
      return {
        store,
        dataController
      };
    };
    (0, _globals.it)('should exclude skip and take in the store load request by default for CustomStore', async () => {
      const {
        store,
        dataController
      } = setupForRemoteOperations({
        remoteOperations: 'auto'
      });
      await dataController.waitLoaded();
      const items = dataController.items.peek();
      (0, _globals.expect)(items).toHaveLength(1);
      // @ts-expect-error
      (0, _globals.expect)(store.load.mock.calls[0][0].skip).toBe(undefined);
      // @ts-expect-error
      (0, _globals.expect)(store.load.mock.calls[0][0].take).toBe(undefined);
    });
    (0, _globals.it)('should exclude skip and take in the store load request if remotePaging disabled', async () => {
      const {
        store,
        dataController
      } = setupForRemoteOperations({
        remoteOperations: {
          paging: false
        }
      });
      await dataController.waitLoaded();
      const items = dataController.items.peek();
      (0, _globals.expect)(items).toHaveLength(1);
      // @ts-expect-error
      (0, _globals.expect)(store.load.mock.calls[0][0].skip).toBe(undefined);
      // @ts-expect-error
      (0, _globals.expect)(store.load.mock.calls[0][0].take).toBe(undefined);
    });
    (0, _globals.it)('should include skip and take in the store load request if remotePaging enabled', async () => {
      const {
        store,
        dataController
      } = setupForRemoteOperations({
        remoteOperations: {
          paging: true
        }
      });
      await dataController.waitLoaded();
      const items = dataController.items.peek();
      (0, _globals.expect)(items).toHaveLength(1);
      // @ts-expect-error
      (0, _globals.expect)(store.load.mock.calls[0][0].skip).toBe(0);
      // @ts-expect-error
      (0, _globals.expect)(store.load.mock.calls[0][0].take).toBe(1);
    });
  });
});
