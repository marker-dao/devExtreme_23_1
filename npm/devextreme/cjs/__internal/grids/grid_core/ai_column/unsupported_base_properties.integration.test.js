/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/unsupported_base_properties.integration.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _nodeTest = require("node:test");
var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _data_grid = _interopRequireDefault(require("../../../../ui/data_grid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SELECTORS = {
  gridContainer: '#gridContainer',
  headerCell: '[aria-colindex]'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = (0, _renderer.default)('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new _data_grid.default($container.get(0), _extends({}, options));
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
const getGrid = () => {
  const $container = (0, _renderer.default)(SELECTORS.gridContainer);
  return $container.dxDataGrid('instance');
};
const dataSource = [{
  id: 1,
  name: 'Item 1'
}, {
  id: 2,
  name: 'Item 2'
}, {
  id: 3,
  name: 'Item 3'
}];
(0, _globals.describe)('Unsupported properties', () => {
  (0, _nodeTest.beforeEach)(async () => {});
  (0, _globals.afterEach)(() => {
    const dataGrid = getGrid();
    dataGrid.dispose();
    (0, _renderer.default)(SELECTORS.gridContainer).remove();
  });
  (0, _globals.describe)('Sorting properties', () => {
    (0, _globals.it)('should have no sorting state in the header after a click (first load)', async () => {
      const {
        instance
      } = await createDataGrid({
        dataSource,
        showBorders: true,
        columns: ['id', {
          caption: 'AI',
          type: 'ai',
          name: 'AItest',
          allowSorting: true
        }]
      });
      const $headers = (0, _renderer.default)(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = (0, _renderer.default)($headers.toArray().find(el => (0, _renderer.default)(el).text().includes('AI')));
      (0, _globals.expect)(aiTestHeader).toHaveLength(1);
      (0, _globals.expect)(aiTestHeader.attr('aria-colindex')).toEqual('2');
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
      aiTestHeader.get(0).click();
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
    (0, _globals.it)('should have no sorting state in the header after a click (dynamic update)', async () => {
      const {
        instance
      } = await createDataGrid({
        dataSource,
        showBorders: true,
        columns: ['id', {
          caption: 'AI',
          type: 'ai',
          name: 'AItest'
        }]
      });
      instance.columnOption('AItest', 'allowSorting', true);
      const $headers = (0, _renderer.default)(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = (0, _renderer.default)($headers.toArray().find(el => (0, _renderer.default)(el).text().includes('AI')));
      (0, _globals.expect)(aiTestHeader).toHaveLength(1);
      (0, _globals.expect)(aiTestHeader.attr('aria-colindex')).toEqual('2');
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
      aiTestHeader.get(0).click();
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
    (0, _globals.it)('should have no sorting state in the header with sortOrder and sortIndex options (first load)', async () => {
      const {
        instance
      } = await createDataGrid({
        dataSource,
        showBorders: true,
        columns: [{
          dataField: 'id',
          sortOrder: 'asc',
          sortIndex: 1
        }, {
          caption: 'AI',
          type: 'ai',
          name: 'AItest',
          sortOrder: 'asc',
          sortIndex: 2
        }]
      });
      const $headers = (0, _renderer.default)(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = (0, _renderer.default)($headers.toArray().find(el => (0, _renderer.default)(el).text().includes('AI')));
      (0, _globals.expect)(aiTestHeader).toHaveLength(1);
      (0, _globals.expect)(aiTestHeader.attr('aria-colindex')).toEqual('2');
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
      (0, _globals.expect)(aiTestHeader.attr('aria-roledescription')).toBeUndefined();
    });
    (0, _globals.it)('should have no sorting state in the header with sortOrder and sortIndex options (dynamic update)', async () => {
      const {
        instance
      } = await createDataGrid({
        dataSource,
        showBorders: true,
        columns: [{
          dataField: 'id',
          sortOrder: 'asc',
          sortIndex: 1
        }, {
          caption: 'AI',
          type: 'ai',
          name: 'AItest'
        }]
      });
      instance.columnOption('AItest', 'sortOrder', 'asc');
      instance.columnOption('AItest', 'sortIndex', 2);
      const $headers = (0, _renderer.default)(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = (0, _renderer.default)($headers.toArray().find(el => (0, _renderer.default)(el).text().includes('AI')));
      (0, _globals.expect)(aiTestHeader).toHaveLength(1);
      (0, _globals.expect)(aiTestHeader.attr('aria-colindex')).toEqual('2');
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
      (0, _globals.expect)(aiTestHeader.attr('aria-roledescription')).toBeUndefined();
    });
    (0, _globals.it)('should have no sorting state in the header with calculateSortValue (first load)', async () => {
      const {
        instance
      } = await createDataGrid({
        dataSource,
        showBorders: true,
        columns: ['id', {
          caption: 'AI',
          type: 'ai',
          name: 'AItest',
          sortOrder: 'asc',
          calculateGroupValue: 'name'
        }]
      });
      const $headers = (0, _renderer.default)(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = (0, _renderer.default)($headers.toArray().find(el => (0, _renderer.default)(el).text().includes('AI')));
      (0, _globals.expect)(aiTestHeader).toHaveLength(1);
      (0, _globals.expect)(aiTestHeader.attr('aria-colindex')).toEqual('2');
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
    (0, _globals.it)('should have no sorting state in the header with calculateSortValue (dynamic update)', async () => {
      const {
        instance
      } = await createDataGrid({
        dataSource,
        showBorders: true,
        columns: ['id', {
          caption: 'AI',
          type: 'ai',
          name: 'AItest'
        }]
      });
      instance.columnOption('AItest', 'sortOrder', 'asc');
      instance.columnOption('AItest', 'calculateSortValue', 'name');
      const $headers = (0, _renderer.default)(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = (0, _renderer.default)($headers.toArray().find(el => (0, _renderer.default)(el).text().includes('AI')));
      (0, _globals.expect)(aiTestHeader).toHaveLength(1);
      (0, _globals.expect)(aiTestHeader.attr('aria-colindex')).toEqual('2');
      (0, _globals.expect)(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
  });
});
