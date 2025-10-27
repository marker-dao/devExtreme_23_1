/**
* DevExtreme (esm/__internal/grids/grid_core/columns_controller/m_columns_controller.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { beforeEach } from 'node:test';
import { afterEach, describe, expect, it } from '@jest/globals';
import $ from '../../../../core/renderer';
import DataGrid from '../../../../ui/data_grid';
import { DataGridModel } from '../../../grids/data_grid/__tests__/__mock__/model/data_grid';
const UNSUPPORTED_GROUPING_COLUMN_TYPES = ['adaptive', 'buttons', 'detailExpand', 'groupExpand', 'selection', 'drag', 'ai'];
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = $('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new DataGrid($container.get(0), _extends({}, options));
    const contentReadyHandler = () => {
      resolve({
        $container,
        instance: new DataGridModel($container.get(0))
      });
      instance.off('contentReady', contentReadyHandler);
    };
    instance.on('contentReady', contentReadyHandler);
  });
};
const getGrid = () => {
  const $container = $(`#${GRID_CONTAINER_ID}`);
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
describe('Column Controller', () => {
  beforeEach(async () => {});
  afterEach(() => {
    const dataGrid = getGrid();
    dataGrid.dispose();
    $(`#${GRID_CONTAINER_ID}`).remove();
  });
  describe('Grouping for unsupported column types', () => {
    describe.each(UNSUPPORTED_GROUPING_COLUMN_TYPES)('unsupported grouping column types', columnType => {
      it(`Should have no group rows after put type property = ${columnType} (first load)`, async () => {
        const {
          instance
        } = await createDataGrid({
          dataSource,
          showBorders: true,
          columns: ['id', {
            caption: 'Test',
            type: columnType,
            name: 'test',
            groupIndex: 0
          }]
        });
        const groupRow = instance.getGroupRows();
        expect(groupRow.length).toBe(0);
      });
      it(`Should have no group rows after put type property = ${columnType} (dynamic update)`, async () => {
        const {
          instance
        } = await createDataGrid({
          dataSource,
          showBorders: true,
          columns: ['id', {
            caption: 'Test',
            name: 'AItest'
          }]
        });
        instance.apiColumnOption('AItest', 'type', columnType);
        const groupRow = instance.getGroupRows();
        expect(groupRow.length).toBe(0);
      });
    });
  });
});
