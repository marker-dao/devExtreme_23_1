/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/columns_controller.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { DataController } from '../data_controller';
import { getContext } from '../di.test_utils';
import { ItemsController } from '../items_controller/items_controller';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { ColumnsController } from './columns_controller';
const setup = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = getContext(config);
  return {
    options: context.get(OptionsControllerMock),
    dataController: context.get(DataController),
    columnsController: context.get(ColumnsController),
    itemsController: context.get(ItemsController)
  };
};
describe('ColumnsController', () => {
  describe('columns', () => {
    it('should contain processed column configs', () => {
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
      expect(columns).toMatchSnapshot();
    });
    it('should infer dataType and format from firstItems', () => {
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
      expect(columns).toMatchObject([{
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
    it('should generate columns from firstItems when no columns config is provided', () => {
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
      expect(columns).toMatchObject([{
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
    it('should not generate columns from firstItems when columns config is provided', () => {
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
      expect(columns).toHaveLength(2);
      expect(columns).toMatchObject([{
        name: 'id'
      }, {
        name: 'title'
      }]);
      expect(columns.find(col => col.name === 'extra')).toBeUndefined();
    });
  });
  describe('visibleColumns', () => {
    it('should contain visible columns', () => {
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
      expect(visibleColumns).toHaveLength(2);
      expect(visibleColumns[0].name).toBe('a');
      expect(visibleColumns[1].name).toBe('b');
    });
    it('should have headerPanelIndex property', () => {
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
      expect(visibleColumns).toMatchObject([{
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
  describe('nonVisibleColumns', () => {
    it('should contain non visible columns', () => {
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
      expect(nonVisibleColumns).toHaveLength(1);
      expect(nonVisibleColumns[0].name).toBe('c');
    });
  });
  describe('addColumn', () => {
    it('should add new column to columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b']
      });
      let columns = columnsController.columns.peek();
      expect(columns).toHaveLength(2);
      expect(columns).toMatchObject([{
        dataField: 'a'
      }, {
        dataField: 'b'
      }]);
      columnsController.addColumn('c');
      columns = columnsController.columns.peek();
      expect(columns).toHaveLength(3);
      expect(columns).toMatchObject([{
        dataField: 'a'
      }, {
        dataField: 'b'
      }, {
        dataField: 'c'
      }]);
    });
  });
  describe('deleteColumn', () => {
    it('should remove given column from columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b']
      });
      let columns = columnsController.columns.peek();
      expect(columns).toHaveLength(2);
      expect(columns).toMatchObject([{
        dataField: 'a'
      }, {
        dataField: 'b'
      }]);
      columnsController.deleteColumn(columns[1]);
      columns = columnsController.columns.peek();
      expect(columns).toHaveLength(1);
      expect(columns).toMatchObject([{
        dataField: 'a'
      }]);
    });
  });
  describe('columnOption', () => {
    it('should update option of given column', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b']
      });
      let columns = columnsController.columns.peek();
      expect(columns).toMatchObject([{
        dataField: 'a',
        visible: true
      }, {
        dataField: 'b',
        visible: true
      }]);
      columnsController.columnOption(columns[1], 'visible', false);
      columns = columnsController.columns.peek();
      expect(columns).toMatchObject([{
        dataField: 'a',
        visible: true
      }, {
        dataField: 'b',
        visible: false
      }]);
    });
    it('should correctly update visibleIndex option for all columns', () => {
      const {
        columnsController
      } = setup({
        columns: ['a', 'b', 'c']
      });
      let columns = columnsController.columns.peek();
      expect(columns).toMatchObject([{
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
      expect(columns).toMatchObject([{
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
