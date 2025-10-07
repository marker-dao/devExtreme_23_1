/**
* DevExtreme (cjs/__internal/grids/grid_core/selection/m_selection.integration.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _data = require("../../../../common/data");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _data_grid = _interopRequireDefault(require("../../../../ui/data_grid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECTORS = {
  gridContainer: '#gridContainer',
  detailCell: 'dx-master-detail-cell',
  detailContainer: 'dx-datagrid-master-detail-container'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = (0, _renderer.default)('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new _data_grid.default($container.get(0), options);
    const contentReadyHandler = () => {
      resolve({
        $container,
        instance
      });
      instance.off('contentReady', contentReadyHandler);
    };
    instance.on('contentReady', contentReadyHandler);
  });
};
(0, _globals.describe)('GridCore selection', () => {
  (0, _globals.afterEach)(() => {
    const $container = (0, _renderer.default)(SELECTORS.gridContainer);
    const dataGrid = $container.dxDataGrid('instance');
    dataGrid.dispose();
    $container.remove();
  });
  (0, _globals.describe)('selectionChanged handler', () => {
    [true, false].forEach(repaintChangesOnly => {
      (0, _globals.it)(`selectRowKeys are updated after refresh if selectedItem is not in dataSource anymore with repaintChangesOnly=${repaintChangesOnly}`, async () => {
        const dataSource = [{
          id: 1,
          name: 'Item 1'
        }, {
          id: 2,
          name: 'Item 2'
        }];
        const {
          instance
        } = await createDataGrid({
          dataSource,
          columns: ['id', 'name'],
          keyExpr: 'id',
          selection: {
            mode: 'single'
          },
          repaintChangesOnly
        });
        await instance.selectRows([2], false);
        (0, _globals.expect)(instance.getSelectedRowKeys()).toEqual([2]);
        dataSource.splice(1, 1); // Remove the item with id 2
        await instance.refresh(repaintChangesOnly);
        (0, _globals.expect)(instance.getSelectedRowKeys()).toEqual([]);
      });
      (0, _globals.it)(`selectionChanged handler is not called after refresh if selectedItem still present in dataSource with repaintChangesOnly=${repaintChangesOnly}`, async () => {
        const dataSource = [{
          id: 1,
          name: 'Item 1'
        }, {
          id: 2,
          name: 'Item 2'
        }];
        let selectionChangedCount = 0;
        const {
          instance
        } = await createDataGrid({
          dataSource,
          columns: ['id', 'name'],
          keyExpr: 'id',
          selection: {
            mode: 'single'
          },
          repaintChangesOnly,
          onSelectionChanged: () => {
            selectionChangedCount += 1;
          }
        });
        await instance.selectRows([1], false);
        (0, _globals.expect)(instance.getSelectedRowKeys()).toEqual([1]);
        (0, _globals.expect)(selectionChangedCount).toBe(1);
        dataSource.splice(1, 1); // Remove the item with id 2
        await instance.refresh(repaintChangesOnly);
        (0, _globals.expect)(instance.getSelectedRowKeys()).toEqual([1]);
        (0, _globals.expect)(selectionChangedCount).toBe(1);
      });
    });
  });
  (0, _globals.describe)('remote dataSource', () => {
    [{
      refreshMode: 'full',
      expectedCallCount: 2
    }, {
      refreshMode: 'reshape',
      expectedCallCount: 1
    }, {
      refreshMode: 'repaint',
      expectedCallCount: 0
    }].forEach(_ref => {
      let {
        refreshMode,
        expectedCallCount
      } = _ref;
      (0, _globals.it)(`dataSource.load is not called to load selectedRow after data save with editing.refreshMode=${refreshMode}`, async () => {
        let data = [{
          id: 1,
          name: 'Item 1'
        }, {
          id: 2,
          name: 'Item 2'
        }, {
          id: 3,
          name: 'Item 3'
        }, {
          id: 4,
          name: 'Item 4'
        }];
        const store = new _data.CustomStore({
          key: 'id',
          load: e => {
            const skip = e.skip ?? 0;
            const take = e.take ?? data.length;
            const pageData = data.slice(skip, skip + take);
            return Promise.resolve({
              data: pageData,
              totalCount: data.length
            });
          },
          remove(key) {
            data = data.filter(item => item.id !== key);
            return Promise.resolve();
          }
        });
        const {
          instance
        } = await createDataGrid({
          dataSource: store,
          editing: {
            mode: 'batch',
            refreshMode,
            allowDeleting: true
          },
          remoteOperations: true,
          paging: {
            pageSize: 2
          },
          columns: ['id', 'name'],
          keyExpr: 'id',
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          }
        });
        await instance.selectRows([4], false);
        let callCount = 0;
        store.on('loading', () => {
          callCount += 1;
        });
        instance.option('editing.changes', [{
          type: 'remove',
          key: 1
        }]);
        await instance.saveEditData();
        (0, _globals.expect)(callCount).toBe(expectedCallCount);
      });
    });
  });
});
