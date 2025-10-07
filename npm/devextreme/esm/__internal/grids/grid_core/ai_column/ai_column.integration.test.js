/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/ai_column.integration.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
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
    const contentReadyHandler = () => {
      resolve({
        $container,
        component: new DataGridModel($container.get(0))
      });
      instance.off('contentReady', contentReadyHandler);
    };
    instance.on('contentReady', contentReadyHandler);
  });
};
const beforeTest = () => {
  jest.spyOn(errors, 'log').mockImplementation(jest.fn());
};
const afterTest = () => {
  const $container = $(SELECTORS.gridContainer);
  const dataGrid = $container.dxDataGrid('instance');
  dataGrid.dispose();
  $container.remove();
  jest.clearAllMocks();
};
describe('Options', () => {
  beforeEach(beforeTest);
  afterEach(afterTest);
  describe('when alignment is left', () => {
    it('should set text-align to the left', async () => {
      const {
        component
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
          name: 'myColumn',
          alignment: 'left'
        }]
      });
      expect($(component.getCellElement(0, 3)).css('text-align')).toBe('left');
    });
  });
  describe('when alignment is right', () => {
    it('should set text-align to the right', async () => {
      const {
        component
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
          name: 'myColumn',
          alignment: 'right'
        }]
      });
      expect($(component.getCellElement(0, 3)).css('text-align')).toBe('right');
    });
  });
  describe('when alignment is center', () => {
    it('should set text-align to the center', async () => {
      const {
        component
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
          name: 'myColumn',
          alignment: 'center'
        }]
      });
      expect($(component.getCellElement(0, 3)).css('text-align')).toBe('center');
    });
  });
  describe('when the cssClass is set', () => {
    it('should have class', async () => {
      const {
        component
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
          name: 'myColumn',
          cssClass: 'custom-class'
        }]
      });
      expect($(component.getCellElement(0, 3)).hasClass('custom-class')).toBe(true);
    });
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
  describe('when headerCellTemplate is set', () => {
    it('should render this template', async () => {
      const headerCellTemplate = jest.fn(container => {
        const span = document.createElement('span');
        span.className = 'template-class';
        span.textContent = 'Template';
        container.append(span);
      });
      const {
        component
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
          name: 'myColumn',
          headerCellTemplate
        }]
      });
      const headerCell = component.getHeaderCell(3);
      expect(headerCellTemplate).toHaveBeenCalledTimes(1);
      expect(headerCell.querySelectorAll('.template-class').length).toBe(1);
      expect(headerCell.textContent).toBe('Template');
    });
  });
  describe('when cellTemplate is set', () => {
    it('should render this template', async () => {
      const cellTemplate = jest.fn(container => {
        const span = document.createElement('span');
        span.className = 'template-class';
        span.textContent = 'Template';
        container.append(span);
      });
      const {
        component
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
          name: 'myColumn',
          cellTemplate
        }]
      });
      const dataCell = component.getCellElement(0, 3);
      expect(cellTemplate).toHaveBeenCalledTimes(1);
      expect(dataCell.querySelectorAll('.template-class').length).toBe(1);
      expect(dataCell.textContent).toBe('Template');
    });
  });
  describe('when the visibleIndex is set', () => {
    it('should have the correct order', async () => {
      const {
        component
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
          name: 'myColumn',
          visibleIndex: 1
        }]
      });
      const visibleColumns = component.apiGetVisibleColumns();
      expect(visibleColumns.map(_ref => {
        let {
          caption
        } = _ref;
        return caption;
      })).toEqual(['ID', 'AI Column', 'Name', 'Value']);
    });
  });
});
describe('columnOption', () => {
  beforeEach(beforeTest);
  afterEach(afterTest);
  it('should return a column by name', async () => {
    const {
      component
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
    const aiColumn = component.apiColumnOption('myColumn');
    expect(aiColumn.type).toBe('ai');
    expect(aiColumn.caption).toBe('AI Column');
    expect(aiColumn.index).toBe(3);
  });
  it('should apply cssClass to AI column', async () => {
    const {
      component
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
    expect($(component.getCellElement(0, 3)).hasClass('custom-class')).toBe(false);
    component.apiColumnOption('myColumn', 'cssClass', 'custom-class');
    expect($(component.getCellElement(0, 3)).hasClass('custom-class')).toBe(true);
  });
  it('should apply headerCellTemplate to AI column', async () => {
    const headerCellTemplate = jest.fn(container => {
      const span = document.createElement('span');
      span.className = 'template-class';
      span.textContent = 'Template';
      container.append(span);
    });
    const {
      component
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
    component.apiColumnOption('myColumn', 'headerCellTemplate', headerCellTemplate);
    const headerCell = component.getHeaderCell(3);
    expect(headerCellTemplate).toHaveBeenCalledTimes(1);
    expect(headerCell.querySelectorAll('.template-class').length).toBe(1);
    expect(headerCell.textContent).toBe('Template');
  });
  it('should apply cellTemplate to AI column', async () => {
    const cellTemplate = jest.fn(container => {
      const span = document.createElement('span');
      span.className = 'template-class';
      span.textContent = 'Template';
      container.append(span);
    });
    const {
      component
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
    component.apiColumnOption('myColumn', 'cellTemplate', cellTemplate);
    const dataCell = component.getCellElement(0, 3);
    expect(cellTemplate).toHaveBeenCalledTimes(1);
    expect(dataCell.querySelectorAll('.template-class').length).toBe(1);
    expect(dataCell.textContent).toBe('Template');
  });
  it('should apply alignment', async () => {
    const {
      component
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
    expect($(component.getCellElement(0, 3)).css('text-align')).toBe('left');
    component.apiColumnOption('myColumn', 'alignment', 'right');
    expect($(component.getCellElement(0, 3)).css('text-align')).toBe('right');
  });
  it('should apply visibleIndex to AI column', async () => {
    const {
      component
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
    component.apiColumnOption('myColumn', 'visibleIndex', 1);
    const visibleColumns = component.apiGetVisibleColumns();
    expect(visibleColumns.map(_ref2 => {
      let {
        caption
      } = _ref2;
      return caption;
    })).toEqual(['ID', 'AI Column', 'Name', 'Value']);
  });
  describe('when the name is reset', () => {
    it('should throw E1066', async () => {
      const {
        component
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
      component.apiColumnOption('myColumn', 'name', '');
      expect(errors.log).toHaveBeenCalledWith('E1066');
    });
  });
  describe('when the name specified is not unique', () => {
    it('should throw E1059', async () => {
      const {
        component
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
      component.apiColumnOption('myColumn2', 'name', 'myColumn1');
      expect(errors.log).toHaveBeenCalledWith('E1059', '"myColumn1"');
    });
  });
});
