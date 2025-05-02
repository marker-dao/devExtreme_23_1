"use strict";

var _globals = require("@jest/globals");
var _data_controller = require("../data_controller");
var _di = require("../di.test_utils");
var _items_controller = require("../items_controller/items_controller");
var _options_controller = require("../options_controller/options_controller.mock");
var _columns_controller = require("./columns_controller");
const setup = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = (0, _di.getContext)(config);
  return {
    options: context.get(_options_controller.OptionsControllerMock),
    dataController: context.get(_data_controller.DataController),
    columnsController: context.get(_columns_controller.ColumnsController),
    itemsController: context.get(_items_controller.ItemsController)
  };
};
(0, _globals.describe)('ColumnsController', () => {
  (0, _globals.describe)('columns', () => {
    (0, _globals.it)('should contain processed column configs', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', {
          dataField: 'b'
        }, {
          dataField: 'c',
          visible: false
        }]
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toMatchSnapshot();
    });
    (0, _globals.it)('should infer dataType and format from firstItems', () => {
      const {
        columnsController
      } = setup({
        columns: ['id', 'price', 'createdAt']
      });
      columnsController.setColumnOptionsFromDataItem({
        id: 1,
        price: 9.99,
        createdAt: new Date('2023-01-01T00:00:00Z')
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toMatchObject([{
        name: 'id',
        dataType: 'number'
      }, {
        name: 'price',
        dataType: 'number'
      }, {
        name: 'createdAt',
        dataType: 'date',
        format: 'shortDate'
      }]);
    });
    (0, _globals.it)('should generate columns from firstItems when no columns config is provided', () => {
      const {
        columnsController
      } = setup();
      columnsController.setColumnOptionsFromDataItem({
        id: 1,
        title: 'Hello',
        price: 99.99,
        createdAt: new Date('2024-01-01T00:00:00Z')
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toMatchObject([{
        name: 'id',
        dataType: 'number'
      }, {
        name: 'title',
        dataType: 'string'
      }, {
        name: 'price',
        dataType: 'number'
      }, {
        name: 'createdAt',
        dataType: 'date',
        format: 'shortDate'
      }]);
    });
    (0, _globals.it)('should not generate columns from firstItems when columns config is provided', () => {
      const {
        columnsController
      } = setup({
        columns: ['id', 'title']
      });
      columnsController.setColumnOptionsFromDataItem({
        id: 1,
        title: 'Sample',
        extra: 'Should be ignored'
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toHaveLength(2);
      (0, _globals.expect)(columns).toMatchObject([{
        name: 'id'
      }, {
        name: 'title'
      }]);
      (0, _globals.expect)(columns.find(col => col.name === 'extra')).toBeUndefined();
    });
  });
  (0, _globals.describe)('visibleColumns', () => {
    (0, _globals.it)('should contain visible columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', {
          dataField: 'b'
        }, {
          dataField: 'c',
          visible: false
        }]
      });
      const visibleColumns = columnsController.visibleColumns.peek();
      (0, _globals.expect)(visibleColumns).toHaveLength(2);
      (0, _globals.expect)(visibleColumns[0].name).toBe('a');
      (0, _globals.expect)(visibleColumns[1].name).toBe('b');
    });
    (0, _globals.it)('should have headerPanelIndex property', () => {
      const {
        columnsController
      } = setup({
        columns: [{
          dataField: 'a',
          visibleIndex: 2
        }, {
          dataField: 'b',
          visibleIndex: 0
        }, {
          dataField: 'c',
          visibleIndex: 1,
          visible: false
        }]
      });
      const visibleColumns = columnsController.visibleColumns.peek();
      (0, _globals.expect)(visibleColumns).toMatchObject([{
        name: 'b',
        headerPanelIndex: 0,
        visibleIndex: 0
      }, {
        name: 'a',
        headerPanelIndex: 1,
        visibleIndex: 2
      }]);
    });
  });
  (0, _globals.describe)('nonVisibleColumns', () => {
    (0, _globals.it)('should contain non visible columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', {
          dataField: 'b'
        }, {
          dataField: 'c',
          visible: false
        }]
      });
      const nonVisibleColumns = columnsController.nonVisibleColumns.peek();
      (0, _globals.expect)(nonVisibleColumns).toHaveLength(1);
      (0, _globals.expect)(nonVisibleColumns[0].name).toBe('c');
    });
  });
  (0, _globals.describe)('addColumn', () => {
    (0, _globals.it)('should add new column to columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b']
      });
      let columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toHaveLength(2);
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a'
      }, {
        dataField: 'b'
      }]);
      columnsController.addColumn('c');
      columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toHaveLength(3);
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a'
      }, {
        dataField: 'b'
      }, {
        dataField: 'c'
      }]);
    });
  });
  (0, _globals.describe)('deleteColumn', () => {
    (0, _globals.it)('should remove given column from columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b']
      });
      let columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toHaveLength(2);
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a'
      }, {
        dataField: 'b'
      }]);
      columnsController.deleteColumn(columns[1]);
      columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toHaveLength(1);
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a'
      }]);
    });
  });
  (0, _globals.describe)('columnOption', () => {
    (0, _globals.it)('should update option of given column', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b']
      });
      let columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a',
        visible: true
      }, {
        dataField: 'b',
        visible: true
      }]);
      columnsController.columnOption(columns[1], 'visible', false);
      columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a',
        visible: true
      }, {
        dataField: 'b',
        visible: false
      }]);
    });
    (0, _globals.it)('should correctly update visibleIndex option for all columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b', 'c']
      });
      let columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a',
        visibleIndex: 0
      }, {
        dataField: 'b',
        visibleIndex: 1
      }, {
        dataField: 'c',
        visibleIndex: 2
      }]);
      columnsController.columnOption(columns[2], 'visibleIndex', 0);
      columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toMatchObject([{
        dataField: 'a',
        visibleIndex: 1
      }, {
        dataField: 'b',
        visibleIndex: 2
      }, {
        dataField: 'c',
        visibleIndex: 0
      }]);
    });
  });
});