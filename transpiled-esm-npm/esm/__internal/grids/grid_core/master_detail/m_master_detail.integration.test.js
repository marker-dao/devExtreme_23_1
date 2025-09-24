import { afterEach, describe, expect, it } from '@jest/globals';
import $ from '../../../../core/renderer';
import DataGrid from '../../../../ui/data_grid';
const SELECTORS = {
  gridContainer: '#gridContainer',
  detailCell: 'dx-master-detail-cell',
  detailContainer: 'dx-datagrid-master-detail-container'
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
describe('GridCore master_detail', () => {
  afterEach(() => {
    const $container = $(SELECTORS.gridContainer);
    const dataGrid = $container.dxDataGrid('instance');
    dataGrid.dispose();
    $container.remove();
  });
  describe('master detail container', () => {
    it('container is td element', async () => {
      var _containerElement, _containerElement2;
      let containerElement;
      await createDataGrid({
        columns: ['field1', 'field2'],
        dataSource: [{
          field1: 'value1',
          field2: 'value2'
        }],
        masterDetail: {
          enabled: true,
          autoExpandAll: true,
          template: container => {
            containerElement = container;
          }
        }
      });
      expect((_containerElement = containerElement) === null || _containerElement === void 0 ? void 0 : _containerElement.tagName).toBe('TD');
      expect((_containerElement2 = containerElement) === null || _containerElement2 === void 0 ? void 0 : _containerElement2.classList).toContain(SELECTORS.detailCell);
    });
    it('container is div element when sticky columns enabled', async () => {
      var _containerElement3, _containerElement4, _containerElement5, _containerElement6;
      let containerElement;
      await createDataGrid({
        columns: [{
          dataField: 'field1',
          fixed: true
        }, 'field2'],
        dataSource: [{
          field1: 'value1',
          field2: 'value2'
        }],
        masterDetail: {
          enabled: true,
          autoExpandAll: true,
          template: container => {
            containerElement = container;
          }
        }
      });
      expect((_containerElement3 = containerElement) === null || _containerElement3 === void 0 || (_containerElement3 = _containerElement3.parentElement) === null || _containerElement3 === void 0 ? void 0 : _containerElement3.tagName).toBe('TD');
      expect((_containerElement4 = containerElement) === null || _containerElement4 === void 0 || (_containerElement4 = _containerElement4.parentElement) === null || _containerElement4 === void 0 ? void 0 : _containerElement4.classList).toContain(SELECTORS.detailCell);
      expect((_containerElement5 = containerElement) === null || _containerElement5 === void 0 ? void 0 : _containerElement5.tagName).toBe('DIV');
      expect((_containerElement6 = containerElement) === null || _containerElement6 === void 0 ? void 0 : _containerElement6.classList).toContain(SELECTORS.detailContainer);
    });
  });
});