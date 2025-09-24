/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/ai_column.integration.test.js)
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
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECTORS = {
  gridContainer: '#gridContainer'
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
(0, _globals.describe)('GridCore AI Column', () => {
  (0, _globals.beforeEach)(() => {
    _globals.jest.spyOn(_ui.default, 'log').mockImplementation(_globals.jest.fn());
  });
  (0, _globals.afterEach)(() => {
    const $container = (0, _renderer.default)(SELECTORS.gridContainer);
    const dataGrid = $container.dxDataGrid('instance');
    dataGrid.dispose();
    $container.remove();
    _globals.jest.clearAllMocks();
  });
  (0, _globals.describe)('when the name is not set', () => {
    (0, _globals.it)('should throw E1066', async () => {
      await createDataGrid({
        dataSource: [{
          id: 1,
          name: 'Name 1',
          value: 10
        }],
        columns: [{
          dataField: 'id',
          caption: 'ID'
        }, {
          dataField: 'name',
          caption: 'Name'
        }, {
          dataField: 'value',
          caption: 'Value'
        }, {
          type: 'ai',
          caption: 'AI Column'
        }]
      });
      (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1066');
    });
  });
  (0, _globals.describe)('when the name specified is not unique', () => {
    (0, _globals.it)('should throw E1059', async () => {
      await createDataGrid({
        dataSource: [{
          id: 1,
          name: 'Name 1',
          value: 10
        }],
        columns: [{
          dataField: 'id',
          caption: 'ID'
        }, {
          dataField: 'name',
          caption: 'Name'
        }, {
          dataField: 'value',
          caption: 'Value',
          name: 'myColumn'
        }, {
          type: 'ai',
          caption: 'AI Column',
          name: 'myColumn'
        }]
      });
      (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1059', '"myColumn"');
    });
  });
  (0, _globals.describe)('columnOption', () => {
    (0, _globals.it)('should return a column by name', async () => {
      const {
        instance
      } = await createDataGrid({
        dataSource: [{
          id: 1,
          name: 'Name 1',
          value: 10
        }],
        columns: [{
          dataField: 'id',
          caption: 'ID'
        }, {
          dataField: 'name',
          caption: 'Name'
        }, {
          dataField: 'value',
          caption: 'Value'
        }, {
          type: 'ai',
          caption: 'AI Column',
          name: 'myColumn'
        }]
      });
      const aiColumn = instance.columnOption('myColumn');
      (0, _globals.expect)(aiColumn.type).toBe('ai');
      (0, _globals.expect)(aiColumn.caption).toBe('AI Column');
      (0, _globals.expect)(aiColumn.index).toBe(3);
    });
    (0, _globals.describe)('when the name is reset', () => {
      (0, _globals.it)('should throw E1066', async () => {
        const {
          instance
        } = await createDataGrid({
          dataSource: [{
            id: 1,
            name: 'Name 1',
            value: 10
          }],
          columns: [{
            dataField: 'id',
            caption: 'ID'
          }, {
            dataField: 'name',
            caption: 'Name'
          }, {
            dataField: 'value',
            caption: 'Value'
          }, {
            type: 'ai',
            caption: 'AI Column',
            name: 'myColumn'
          }]
        });
        instance.columnOption('myColumn', 'name', '');
        (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1066');
      });
    });
    (0, _globals.describe)('when the name specified is not unique', () => {
      (0, _globals.it)('should throw E1059', async () => {
        const {
          instance
        } = await createDataGrid({
          dataSource: [{
            id: 1,
            name: 'Name 1',
            value: 10
          }],
          columns: [{
            dataField: 'id',
            caption: 'ID'
          }, {
            dataField: 'name',
            caption: 'Name'
          }, {
            dataField: 'value',
            caption: 'Value',
            name: 'myColumn1'
          }, {
            type: 'ai',
            caption: 'AI Column',
            name: 'myColumn2'
          }]
        });
        instance.columnOption('myColumn2', 'name', 'myColumn1');
        (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1059', '"myColumn1"');
      });
    });
  });
});
