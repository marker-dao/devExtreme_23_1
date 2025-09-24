/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/ai_column.integration.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import $ from '../../../../core/renderer';
import DataGrid from '../../../../ui/data_grid';
import errors from '../../../../ui/widget/ui.errors';
const SELECTORS = {
  gridContainer: '#gridContainer'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = $('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new DataGrid($container.get(0), options);
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
describe('GridCore AI Column', () => {
  beforeEach(() => {
    jest.spyOn(errors, 'log').mockImplementation(jest.fn());
  });
  afterEach(() => {
    const $container = $(SELECTORS.gridContainer);
    const dataGrid = $container.dxDataGrid('instance');
    dataGrid.dispose();
    $container.remove();
    jest.clearAllMocks();
  });
  describe('when the name is not set', () => {
    it('should throw E1066', async () => {
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
      expect(errors.log).toHaveBeenCalledWith('E1066');
    });
  });
  describe('when the name specified is not unique', () => {
    it('should throw E1059', async () => {
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
      expect(errors.log).toHaveBeenCalledWith('E1059', '"myColumn"');
    });
  });
  describe('columnOption', () => {
    it('should return a column by name', async () => {
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
      expect(aiColumn.type).toBe('ai');
      expect(aiColumn.caption).toBe('AI Column');
      expect(aiColumn.index).toBe(3);
    });
    describe('when the name is reset', () => {
      it('should throw E1066', async () => {
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
        expect(errors.log).toHaveBeenCalledWith('E1066');
      });
    });
    describe('when the name specified is not unique', () => {
      it('should throw E1059', async () => {
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
        expect(errors.log).toHaveBeenCalledWith('E1059', '"myColumn1"');
      });
    });
  });
});
