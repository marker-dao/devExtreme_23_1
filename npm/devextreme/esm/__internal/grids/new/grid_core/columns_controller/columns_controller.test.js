/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/columns_controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
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
        dataSource: [{
          id: 1,
          price: 9.99,
          createdAt: new Date('2023-01-01T00:00:00Z')
        }],
        columns: ['id', 'price', 'createdAt']
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
      } = setup({
        dataSource: [{
          id: 1,
          title: 'Hello',
          price: 99.99,
          createdAt: new Date('2024-01-01T00:00:00Z')
        }]
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
    it('should not touch the option manager columns', () => {
      const {
        options,
        columnsController
      } = setup({
        columns: ['a', 'b', 'c']
      });
      const [col] = columnsController.columns.peek();
      columnsController.columnOption(col, 'sortOrder', 'desc');
      const result = options.oneWay('columns').peek();
      expect(result).toStrictEqual(['a', 'b', 'c']);
    });
    it('should update complex path with dots (nested options)', () => {
      const {
        columnsController
      } = setup({
        columns: [{
          dataField: 'a'
        }]
      });
      const [col] = columnsController.columns.peek();
      // @ts-expect-error fix columnOption type
      columnsController.columnOption(col, 'headerFilter.search.enabled', true);
      const [result] = columnsController.columns.peek();
      expect(result).toMatchObject({
        dataField: 'a',
        headerFilter: {
          search: {
            enabled: true
          }
        }
      });
    });
    it('should not be overridden by another column public option change', () => {
      const {
        options,
        columnsController
      } = setup({
        columns: [{
          dataField: 'a'
        }]
      });
      const [col] = columnsController.columns.peek();
      columnsController.columnOption(col, 'sortOrder', 'asc');
      const [resultFirst] = columnsController.columns.peek();
      expect(resultFirst).toMatchObject({
        dataField: 'a',
        sortOrder: 'asc'
      });
      options.option('columns[0].sortIndex', 99);
      const [resultSecond] = columnsController.columns.peek();
      expect(resultSecond).toMatchObject({
        dataField: 'a',
        sortOrder: 'asc'
      });
    });
    it('should be overridden by same column public option change', () => {
      const {
        options,
        columnsController
      } = setup({
        columns: [{
          dataField: 'a'
        }]
      });
      const [col] = columnsController.columns.peek();
      columnsController.columnOption(col, 'sortOrder', 'asc');
      const [resultFirst] = columnsController.columns.peek();
      expect(resultFirst).toMatchObject({
        dataField: 'a',
        sortOrder: 'asc'
      });
      options.option('columns[0].sortOrder', 'desc');
      const [resultSecond] = columnsController.columns.peek();
      expect(resultSecond).toMatchObject({
        dataField: 'a',
        sortOrder: 'desc'
      });
    });
    it('should be overridden by parent column public option change', () => {
      const {
        options,
        columnsController
      } = setup({
        columns: [{
          dataField: 'a'
        }]
      });
      const [col] = columnsController.columns.peek();
      // @ts-expect-error fix columnOption type
      columnsController.columnOption(col, 'headerFilter.allowSelectAll', false);
      const [resultFirst] = columnsController.columns.peek();
      expect(resultFirst).toMatchObject({
        dataField: 'a',
        headerFilter: {
          allowSelectAll: false
        }
      });
      options.option('columns[0].headerFilter', {
        height: 300
      });
      const [resultSecond] = columnsController.columns.peek();
      expect(resultSecond).toMatchObject({
        dataField: 'a',
        headerFilter: {
          height: 300
        }
      });
    });
    it('should be overridden by whole column array public option change', () => {
      const {
        options,
        columnsController
      } = setup({
        columns: ['a']
      });
      const [col] = columnsController.columns.peek();
      columnsController.columnOption(col, 'sortIndex', 35);
      const [resultFirst] = columnsController.columns.peek();
      expect(resultFirst).toMatchObject({
        dataField: 'a',
        sortIndex: 35
      });
      options.option('columns', ['a', 'b']);
      const [resultSecond, resultThird] = columnsController.columns.peek();
      expect(resultSecond.dataField).toBe('a');
      expect(resultSecond.sortIndex).toBeUndefined();
      expect(resultThird.dataField).toBe('b');
      expect(resultThird.sortIndex).toBeUndefined();
    });
    it('should be overridden by specific column public option change', () => {
      const {
        options,
        columnsController
      } = setup({
        columns: ['a']
      });
      const [col] = columnsController.columns.peek();
      columnsController.columnOption(col, 'sortIndex', 35);
      const [resultFirst] = columnsController.columns.peek();
      expect(resultFirst).toMatchObject({
        dataField: 'a',
        sortIndex: 35
      });
      options.option('columns[0]', {
        dataField: 'b'
      });
      const [resultSecond] = columnsController.columns.peek();
      expect(resultSecond.dataField).toBe('b');
      expect(resultSecond.sortIndex).toBeUndefined();
    });
    it('should not be overridden by another column public option change', () => {
      const {
        options,
        columnsController
      } = setup({
        columns: ['a', 'b']
      });
      const [col] = columnsController.columns.peek();
      columnsController.columnOption(col, 'sortIndex', 35);
      const [resultFirst] = columnsController.columns.peek();
      expect(resultFirst).toMatchObject({
        dataField: 'a',
        sortIndex: 35
      });
      options.option('columns[1]', {
        dataField: 'b',
        sortOrder: 'asc'
      });
      const [resultSecond, resultThird] = columnsController.columns.peek();
      expect(resultSecond.dataField).toBe('a');
      expect(resultSecond.sortOrder).toBeUndefined();
      expect(resultSecond.sortIndex).toBe(35);
      expect(resultThird.dataField).toBe('b');
      expect(resultThird.sortOrder).toBe('asc');
      expect(resultThird.sortIndex).toBeUndefined();
    });
  });
});
