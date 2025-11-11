/**
* DevExtreme (esm/__internal/grids/grid_core/columns_resizing_reordering/m_columns_resizing_reordering.integration.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { end as dragEventEnd, move as dragEventMove, start as dragEventStart } from '../../../../common/core/events/drag';
import $ from '../../../../core/renderer';
import DataGrid from '../../../../ui/data_grid';
import errors from '../../../../ui/widget/ui.errors';
import { DataGridModel } from '../../../grids/data_grid/__tests__/__mock__/model/data_grid';
const SELECTORS = {
  gridContainer: '#gridContainer'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = $('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new DataGrid($container.get(0), options);
    const component = new DataGridModel($container.get(0));
    jest.runAllTimers();
    resolve({
      $container,
      component,
      instance
    });
  });
};
const beforeTest = () => {
  jest.useFakeTimers();
  jest.spyOn(errors, 'log').mockImplementation(jest.fn());
};
const afterTest = () => {
  const $container = $(SELECTORS.gridContainer);
  const dataGrid = $container.dxDataGrid('instance');
  dataGrid.dispose();
  $container.remove();
  jest.clearAllMocks();
  jest.useRealTimers();
};
describe('Performance optimization', () => {
  beforeEach(beforeTest);
  afterEach(afterTest);
  const createGridWith200Columns = async () => {
    const columns = [{
      dataField: 'id',
      caption: 'ID',
      width: '100px',
      fixed: true
    }, {
      caption: 'Name',
      columns: [{
        dataField: 'name.first',
        caption: 'First name',
        width: '150px'
      }, {
        dataField: 'name.last',
        caption: 'Last name',
        width: '150px'
      }]
    }, ...Array.from({
      length: 198
    }, (_, index) => ({
      dataField: `values.${index}`,
      caption: `Value ${index + 1}`,
      width: '100px'
    }))];
    const dataSource = [{
      id: 1,
      name: {
        first: 'John',
        last: 'Doe'
      },
      values: Array.from({
        length: 198
      }, (_, index) => index + 1)
    }];
    return createDataGrid({
      dataSource,
      columns,
      width: '100%',
      showBorders: true,
      showColumnLines: true,
      allowColumnResizing: true,
      allowColumnReordering: true
    });
  };
  describe('ColumnsResizerViewController', () => {
    it('should call "_pointCreated" 202 times when generating points by columns (1 fixed + 1 group + 2 group children + 198 regular)', async () => {
      const {
        instance
      } = await createGridWith200Columns();
      const columnsResizerController = instance.getController('columnsResizer');
      const pointCreatedSpy = jest.spyOn(columnsResizerController, '_pointCreated');
      columnsResizerController.pointsByColumns();
      expect(pointCreatedSpy).toHaveBeenCalledTimes(202);
    });
    it('should call "getColumnElements" as many times as there are head rows', async () => {
      const {
        instance
      } = await createGridWith200Columns();
      const columnsResizerController = instance.getController('columnsResizer');
      const columnHeadersView = instance.getView('columnHeadersView');
      const columnHeadersViewSpy = jest.spyOn(columnHeadersView, 'getColumnElements');
      columnsResizerController.pointsByColumns();
      expect(columnHeadersViewSpy).toHaveBeenCalledTimes(2);
    });
  });
  describe('DraggingHeaderViewController', () => {
    const getDragEvent = (eventName, headerOffset, dragOffset) => {
      const dragEndEvent = document.createEvent('CustomEvent');
      dragEndEvent.initCustomEvent(eventName, true, true);
      dragEndEvent.pageX = headerOffset.left + dragOffset.left;
      dragEndEvent.pageY = headerOffset.top + dragOffset.top;
      dragEndEvent.pointerType = 'mouse';
      return dragEndEvent;
    };
    it('should call "getBoundingRect" once for each dragging panel view', async () => {
      var _$headerCell$get, _$headerCell$get2, _$headerCell$get3;
      const {
        instance
      } = await createGridWith200Columns();
      const columnHeadersView = instance.getView('columnHeadersView');
      const columnChooserView = instance.getView('columnChooserView');
      const headerPanelView = instance.getView('headerPanel');
      const getBoundingViewMocks = [jest.spyOn(columnHeadersView, 'getBoundingRect'), jest.spyOn(columnChooserView, 'getBoundingRect'), jest.spyOn(headerPanelView, 'getBoundingRect')];
      const $headerCell = $(columnHeadersView.element()).find('.dx-header-row td').eq(5);
      const headerOffset = $headerCell.offset();
      if (!headerOffset) {
        throw new Error('Header cell not found');
      }
      const dragStartOffset = {
        left: 10,
        top: 10
      };
      const dragStartEvent = getDragEvent(dragEventStart, headerOffset, dragStartOffset);
      (_$headerCell$get = $headerCell.get(0)) === null || _$headerCell$get === void 0 || _$headerCell$get.dispatchEvent(dragStartEvent);
      const dragMoveOffset = {
        left: 500,
        top: 10
      };
      const dragMoveEvent = getDragEvent(dragEventMove, headerOffset, dragMoveOffset);
      (_$headerCell$get2 = $headerCell.get(0)) === null || _$headerCell$get2 === void 0 || _$headerCell$get2.dispatchEvent(dragMoveEvent);
      const dragEndOffset = {
        left: 500,
        top: 10
      };
      const dragEndEvent = getDragEvent(dragEventEnd, headerOffset, dragEndOffset);
      (_$headerCell$get3 = $headerCell.get(0)) === null || _$headerCell$get3 === void 0 || _$headerCell$get3.dispatchEvent(dragEndEvent);
      getBoundingViewMocks.forEach(getBoundingViewMock => {
        expect(getBoundingViewMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
