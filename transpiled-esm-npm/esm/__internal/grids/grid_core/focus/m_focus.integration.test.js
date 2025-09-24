import _extends from "@babel/runtime/helpers/esm/extends";
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import $ from '../../../../core/renderer';
import DataGrid from '../../../../ui/data_grid';
const SELECTORS = {
  gridContainer: '#gridContainer'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = $('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new DataGrid($container.get(0), _extends({
      // @ts-ignore
      loadingTimeout: null
    }, options));
    resolve({
      $container,
      instance
    });
  });
};
describe('GridCore focus', () => {
  afterEach(() => {
    const $container = $(SELECTORS.gridContainer);
    const dataGrid = $container.dxDataGrid('instance');
    dataGrid.dispose();
    $container.remove();
  });
  const testCases = [[true, 'insert', 2], [true, 'remove', 0], [true, 'update', 2], [false, 'insert', 2], [false, 'remove', 0], [false, 'update', 2]];
  // T1292991
  describe.each(testCases)('when repaintChangesOnly=%s and performing %s operation', (repaintChangesOnly, operation, expectedFocusedRowIndex) => {
    it('should updates the focused row index correctly', async () => {
      const onFocusedRowChanged = jest.fn();
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
      expect(onFocusedRowChanged.mock.calls.length).toBe(1);
      expect(instance.option('focusedRowKey')).toEqual(2);
      expect(instance.option('focusedRowIndex')).toEqual(expectedFocusedRowIndex);
    });
  });
});