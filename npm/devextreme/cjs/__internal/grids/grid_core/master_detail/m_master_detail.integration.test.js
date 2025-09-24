/**
* DevExtreme (cjs/__internal/grids/grid_core/master_detail/m_master_detail.integration.test.js)
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECTORS = {
  gridContainer: '#gridContainer',
  detailCell: 'dx-master-detail-cell',
  detailContainer: 'dx-datagrid-master-detail-container'
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
(0, _globals.describe)('GridCore master_detail', () => {
  (0, _globals.afterEach)(() => {
    const $container = (0, _renderer.default)(SELECTORS.gridContainer);
    const dataGrid = $container.dxDataGrid('instance');
    dataGrid.dispose();
    $container.remove();
  });
  (0, _globals.describe)('master detail container', () => {
    (0, _globals.it)('container is td element', async () => {
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
      (0, _globals.expect)((_containerElement = containerElement) === null || _containerElement === void 0 ? void 0 : _containerElement.tagName).toBe('TD');
      (0, _globals.expect)((_containerElement2 = containerElement) === null || _containerElement2 === void 0 ? void 0 : _containerElement2.classList).toContain(SELECTORS.detailCell);
    });
    (0, _globals.it)('container is div element when sticky columns enabled', async () => {
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
      (0, _globals.expect)((_containerElement3 = containerElement) === null || _containerElement3 === void 0 || (_containerElement3 = _containerElement3.parentElement) === null || _containerElement3 === void 0 ? void 0 : _containerElement3.tagName).toBe('TD');
      (0, _globals.expect)((_containerElement4 = containerElement) === null || _containerElement4 === void 0 || (_containerElement4 = _containerElement4.parentElement) === null || _containerElement4 === void 0 ? void 0 : _containerElement4.classList).toContain(SELECTORS.detailCell);
      (0, _globals.expect)((_containerElement5 = containerElement) === null || _containerElement5 === void 0 ? void 0 : _containerElement5.tagName).toBe('DIV');
      (0, _globals.expect)((_containerElement6 = containerElement) === null || _containerElement6 === void 0 ? void 0 : _containerElement6.classList).toContain(SELECTORS.detailContainer);
    });
  });
});
