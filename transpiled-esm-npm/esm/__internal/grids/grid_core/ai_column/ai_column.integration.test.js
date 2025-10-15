import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import $ from '../../../../core/renderer';
import DataGrid from '../../../../ui/data_grid';
import errors from '../../../../ui/widget/ui.errors';
import { AIIntegration } from '../../../core/ai_integration/core/ai_integration';
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
    jest.runOnlyPendingTimers();
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
describe('aiIntegration', () => {
  const rootSendRequestSpy = jest.fn();
  const columnSendRequestSpy = jest.fn();
  beforeEach(() => {
    beforeTest();
    rootSendRequestSpy.mockClear();
    columnSendRequestSpy.mockClear();
  });
  afterEach(afterTest);
  const aiIntegrationResult = () => ({
    promise: new Promise(resolve => {
      resolve('1');
    }),
    abort: () => {}
  });
  const rootAiIntegration = new AIIntegration({
    sendRequest() {
      rootSendRequestSpy();
      return aiIntegrationResult();
    }
  });
  const columnAiIntegration = new AIIntegration({
    sendRequest() {
      columnSendRequestSpy();
      return aiIntegrationResult();
    }
  });
  it('should be taken from grid level if it set up (first load)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }],
      keyExpr: 'id',
      aiIntegration: rootAiIntegration,
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
    instance.sendAIColumnRequest('myColumn');
    expect(rootSendRequestSpy).toHaveBeenCalled();
    expect(columnSendRequestSpy).not.toHaveBeenCalled();
  });
  it('should be taken from grid level if it set up (dynamic update)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }],
      keyExpr: 'id',
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
    instance.option('aiIntegration', rootAiIntegration);
    instance.sendAIColumnRequest('myColumn');
    expect(rootSendRequestSpy).toHaveBeenCalled();
    expect(columnSendRequestSpy).not.toHaveBeenCalled();
  });
  it('should be taken from column level if it set up (first load)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }],
      keyExpr: 'id',
      aiIntegration: rootAiIntegration,
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
        ai: {
          aiIntegration: columnAiIntegration
        }
      }]
    });
    instance.sendAIColumnRequest('myColumn');
    expect(columnSendRequestSpy).toHaveBeenCalled();
    expect(rootSendRequestSpy).not.toHaveBeenCalled();
  });
  it('should be taken from column level if it set up (dynamic update)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }],
      keyExpr: 'id',
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
    instance.columnOption('myColumn', 'ai', {
      aiIntegration: columnAiIntegration
    });
    instance.option('aiIntegration', rootAiIntegration);
    instance.sendAIColumnRequest('myColumn');
    expect(columnSendRequestSpy).toHaveBeenCalled();
    expect(rootSendRequestSpy).not.toHaveBeenCalled();
  });
});
describe('prompt', () => {
  const columnSendRequestSpy = jest.fn();
  const prompt = 'Test prompt';
  beforeEach(() => {
    beforeTest();
    columnSendRequestSpy.mockClear();
  });
  afterEach(afterTest);
  const aiIntegrationResult = () => ({
    promise: new Promise(resolve => {
      resolve('1');
    }),
    abort: () => {}
  });
  const columnAiIntegration = new AIIntegration({
    sendRequest(params) {
      var _params$prompt$user;
      columnSendRequestSpy((_params$prompt$user = params.prompt.user) === null || _params$prompt$user === void 0 ? void 0 : _params$prompt$user.includes(prompt));
      return aiIntegrationResult();
    }
  });
  it('should be passed to aiIntegration.sendRequest (first load)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }, {
        id: 2,
        name: 'Name 2',
        value: 20
      }],
      keyExpr: 'id',
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
        ai: {
          aiIntegration: columnAiIntegration,
          prompt
        }
      }]
    });
    instance.sendAIColumnRequest('myColumn');
    expect(columnSendRequestSpy).toHaveBeenCalledWith(true);
  });
  it('should be passed to aiIntegration.sendRequest (dynamic update)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }, {
        id: 2,
        name: 'Name 2',
        value: 20
      }],
      keyExpr: 'id',
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
        ai: {
          aiIntegration: columnAiIntegration
        }
      }]
    });
    instance.columnOption('myColumn', 'ai.prompt', prompt);
    instance.sendAIColumnRequest('myColumn');
    expect(columnSendRequestSpy).toHaveBeenCalledWith(true);
  });
  describe('when aiIntegration is not set', () => {
    it('should throw E1067', async () => {
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
          caption: 'AI Column',
          name: 'myColumn'
        }]
      });
      expect(errors.log).toHaveBeenCalledWith('E1067', 'myColumn');
    });
  });
});
describe('aiMode', () => {
  const columnSendRequestSpy = jest.fn();
  beforeEach(() => {
    beforeTest();
    columnSendRequestSpy.mockClear();
  });
  afterEach(afterTest);
  const aiIntegrationResult = () => ({
    promise: new Promise(resolve => {
      resolve('1');
    }),
    abort: () => {}
  });
  const columnAiIntegration = new AIIntegration({
    sendRequest() {
      columnSendRequestSpy();
      return aiIntegrationResult();
    }
  });
  it('should be auto by default', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }, {
        id: 2,
        name: 'Name 2',
        value: 20
      }],
      keyExpr: 'id',
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
        ai: {
          aiIntegration: columnAiIntegration
        }
      }]
    });
    const aiMode = instance.columnOption('myColumn', 'ai.mode');
    expect(aiMode).toBe('auto');
  });
  it('should call aiIntegration.sendRequest with every visible rows change', async () => {
    const dataSource = Array.from({
      length: 100
    }, (_, i) => ({
      id: i + 1,
      name: `Name ${i + 1}`,
      value: (i + 1) * 10
    }));
    const {
      instance
    } = await createDataGrid({
      dataSource,
      keyExpr: 'id',
      paging: {
        pageSize: 5
      },
      pager: {
        visible: true
      },
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
        ai: {
          aiIntegration: columnAiIntegration
        }
      }]
    });
    expect(columnSendRequestSpy).toBeCalledTimes(1);
    instance.option('paging.pageIndex', 2);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(2);
    instance.option('paging.pageIndex', 3);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(3);
    instance.option('filterValue', ['id', '>', 50]);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(4);
    instance.option('filterValue', undefined);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(5);
    instance.columnOption('name', 'groupIndex', 0);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(6);
    instance.clearGrouping();
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(7);
  });
  it('should NOT call aiIntegration.sendRequest with manual mode', async () => {
    const dataSource = Array.from({
      length: 100
    }, (_, i) => ({
      id: i + 1,
      name: `Name ${i + 1}`,
      value: (i + 1) * 10
    }));
    const {
      instance
    } = await createDataGrid({
      dataSource,
      keyExpr: 'id',
      paging: {
        pageSize: 5
      },
      pager: {
        visible: true
      },
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
        ai: {
          aiIntegration: columnAiIntegration,
          mode: 'manual'
        }
      }]
    });
    expect(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('paging.pageIndex', 2);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('paging.pageIndex', 3);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('filterValue', ['id', '>', 50]);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('filterValue', undefined);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(0);
    instance.columnOption('name', 'groupIndex', 0);
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(0);
    instance.clearGrouping();
    jest.runOnlyPendingTimers();
    expect(columnSendRequestSpy).toBeCalledTimes(0);
  });
});