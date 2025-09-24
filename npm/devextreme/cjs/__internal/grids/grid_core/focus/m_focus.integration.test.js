/**
* DevExtreme (cjs/__internal/grids/grid_core/focus/m_focus.integration.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _data_grid = _interopRequireDefault(require("../../../../ui/data_grid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SELECTORS = {
  gridContainer: '#gridContainer'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = (0, _renderer.default)('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new _data_grid.default($container.get(0), _extends({
      // @ts-ignore
      loadingTimeout: null
    }, options));
    resolve({
      $container,
      instance
    });
  });
};
(0, _globals.describe)('GridCore focus', () => {
  (0, _globals.afterEach)(() => {
    const $container = (0, _renderer.default)(SELECTORS.gridContainer);
    const dataGrid = $container.dxDataGrid('instance');
    dataGrid.dispose();
    $container.remove();
  });
  const testCases = [[true, 'insert', 2], [true, 'remove', 0], [true, 'update', 2], [false, 'insert', 2], [false, 'remove', 0], [false, 'update', 2]];
  // T1292991
  _globals.describe.each(testCases)('when repaintChangesOnly=%s and performing %s operation', (repaintChangesOnly, operation, expectedFocusedRowIndex) => {
    (0, _globals.it)('should updates the focused row index correctly', async () => {
      const onFocusedRowChanged = _globals.jest.fn();
      const {
        instance
      } = await createDataGrid({
        dataSource: {
          store: {
            type: 'array',
            data: [{
              id: 1,
              name: 'Item 1'
            }, {
              id: 2,
              name: 'Item 2'
            }, {
              id: 3,
              name: 'Item 3'
            }],
            key: 'id'
          },
          reshapeOnPush: true,
          pushAggregationTimeout: 0
        },
        showBorders: true,
        focusedRowEnabled: true,
        focusedRowKey: 2,
        onFocusedRowChanged,
        repaintChangesOnly,
        columns: [{
          dataField: 'id',
          width: 80
        }, {
          dataField: 'name',
          caption: 'Name',
          sortOrder: 'asc'
        }]
      });
      const store = instance.getDataSource().store();
      onFocusedRowChanged.mockClear();
      switch (operation) {
        case 'insert':
          store.push([{
            type: 'insert',
            index: 0,
            data: {
              name: 'Item 0'
            }
          }]);
          break;
        case 'remove':
          store.push([{
            type: 'remove',
            key: 1
          }]);
          break;
        case 'update':
          store.push([{
            type: 'update',
            key: 3,
            data: {
              id: 3,
              name: 'A Item 3'
            }
          }]);
          break;
        default:
          break;
      }
      (0, _globals.expect)(onFocusedRowChanged.mock.calls.length).toBe(1);
      (0, _globals.expect)(instance.option('focusedRowKey')).toEqual(2);
      (0, _globals.expect)(instance.option('focusedRowIndex')).toEqual(expectedFocusedRowIndex);
    });
  });
});
