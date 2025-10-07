import _extends from "@babel/runtime/helpers/esm/extends";
import { beforeEach } from 'node:test';
import { afterEach, describe, expect, it } from '@jest/globals';
import $ from '../../../../core/renderer';
import DataGrid from '../../../../ui/data_grid';
const SELECTORS = {
  gridContainer: '#gridContainer',
  headerCell: '[aria-colindex]'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = $('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new DataGrid($container.get(0), _extends({}, options));
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
  const $container = $(SELECTORS.gridContainer);
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
describe('Unsupported properties', () => {
  beforeEach(async () => {});
  afterEach(() => {
    const dataGrid = getGrid();
    dataGrid.dispose();
    $(SELECTORS.gridContainer).remove();
  });
  describe('Sorting properties', () => {
    it('should have no sorting state in the header after a click (first load)', async () => {
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
      const $headers = $(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = $($headers.toArray().find(el => $(el).text().includes('AI')));
      expect(aiTestHeader).toHaveLength(1);
      expect(aiTestHeader.attr('aria-colindex')).toEqual('2');
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
      aiTestHeader.get(0).click();
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
    it('should have no sorting state in the header after a click (dynamic update)', async () => {
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
      const $headers = $(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = $($headers.toArray().find(el => $(el).text().includes('AI')));
      expect(aiTestHeader).toHaveLength(1);
      expect(aiTestHeader.attr('aria-colindex')).toEqual('2');
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
      aiTestHeader.get(0).click();
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
    it('should have no sorting state in the header with sortOrder and sortIndex options (first load)', async () => {
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
      const $headers = $(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = $($headers.toArray().find(el => $(el).text().includes('AI')));
      expect(aiTestHeader).toHaveLength(1);
      expect(aiTestHeader.attr('aria-colindex')).toEqual('2');
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
      expect(aiTestHeader.attr('aria-roledescription')).toBeUndefined();
    });
    it('should have no sorting state in the header with sortOrder and sortIndex options (dynamic update)', async () => {
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
      const $headers = $(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = $($headers.toArray().find(el => $(el).text().includes('AI')));
      expect(aiTestHeader).toHaveLength(1);
      expect(aiTestHeader.attr('aria-colindex')).toEqual('2');
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
      expect(aiTestHeader.attr('aria-roledescription')).toBeUndefined();
    });
    it('should have no sorting state in the header with calculateSortValue (first load)', async () => {
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
      const $headers = $(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = $($headers.toArray().find(el => $(el).text().includes('AI')));
      expect(aiTestHeader).toHaveLength(1);
      expect(aiTestHeader.attr('aria-colindex')).toEqual('2');
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
    it('should have no sorting state in the header with calculateSortValue (dynamic update)', async () => {
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
      const $headers = $(instance.element()).find(SELECTORS.headerCell);
      const aiTestHeader = $($headers.toArray().find(el => $(el).text().includes('AI')));
      expect(aiTestHeader).toHaveLength(1);
      expect(aiTestHeader.attr('aria-colindex')).toEqual('2');
      expect(aiTestHeader.attr('aria-sort')).toBeUndefined();
    });
  });
});