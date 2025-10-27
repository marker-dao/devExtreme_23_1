"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _data_grid = _interopRequireDefault(require("../../../../ui/data_grid"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _ai_integration = require("../../../core/ai_integration/core/ai_integration");
var _data_grid2 = require("../../../grids/data_grid/__tests__/__mock__/model/data_grid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECTORS = {
  gridContainer: '#gridContainer'
};
const GRID_CONTAINER_ID = 'gridContainer';
const createDataGrid = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(resolve => {
    const $container = (0, _renderer.default)('<div>').attr('id', GRID_CONTAINER_ID).appendTo(document.body);
    const instance = new _data_grid.default($container.get(0), options);
    const component = new _data_grid2.DataGridModel($container.get(0));
    _globals.jest.runAllTimers();
    resolve({
      $container,
      component,
      instance
    });
  });
};
const beforeTest = () => {
  _globals.jest.useFakeTimers();
  _globals.jest.spyOn(_ui.default, 'log').mockImplementation(_globals.jest.fn());
};
const afterTest = () => {
  const $container = (0, _renderer.default)(SELECTORS.gridContainer);
  const dataGrid = $container.dxDataGrid('instance');
  dataGrid.dispose();
  $container.remove();
  _globals.jest.clearAllMocks();
  _globals.jest.useRealTimers();
};
(0, _globals.describe)('Options', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  (0, _globals.describe)('when alignment is left', () => {
    (0, _globals.it)('should set text-align to the left', async () => {
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
      (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).css('text-align')).toBe('left');
    });
  });
  (0, _globals.describe)('when alignment is right', () => {
    (0, _globals.it)('should set text-align to the right', async () => {
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
      (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).css('text-align')).toBe('right');
    });
  });
  (0, _globals.describe)('when alignment is center', () => {
    (0, _globals.it)('should set text-align to the center', async () => {
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
      (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).css('text-align')).toBe('center');
    });
  });
  (0, _globals.describe)('when the cssClass is set', () => {
    (0, _globals.it)('should have class', async () => {
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
      (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).hasClass('custom-class')).toBe(true);
    });
  });
  (0, _globals.describe)('when the name is not set', () => {
    (0, _globals.it)('should throw E1066', async () => {
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
      (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1066');
    });
  });
  (0, _globals.describe)('when the name specified is not unique', () => {
    (0, _globals.it)('should throw E1059', async () => {
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
      (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1059', '"myColumn"');
    });
  });
  (0, _globals.describe)('when headerCellTemplate is set', () => {
    (0, _globals.it)('should render this template', async () => {
      const headerCellTemplate = _globals.jest.fn(container => {
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
      (0, _globals.expect)(headerCellTemplate).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(headerCell.querySelectorAll('.template-class').length).toBe(1);
      (0, _globals.expect)(headerCell.textContent).toBe('Template');
    });
  });
  (0, _globals.describe)('when cellTemplate is set', () => {
    (0, _globals.it)('should render this template', async () => {
      const cellTemplate = _globals.jest.fn(container => {
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
      (0, _globals.expect)(cellTemplate).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(dataCell.querySelectorAll('.template-class').length).toBe(1);
      (0, _globals.expect)(dataCell.textContent).toBe('Template');
    });
  });
  (0, _globals.describe)('when the visibleIndex is set', () => {
    (0, _globals.it)('should have the correct order', async () => {
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
      (0, _globals.expect)(visibleColumns.map(_ref => {
        let {
          caption
        } = _ref;
        return caption;
      })).toEqual(['ID', 'AI Column', 'Name', 'Value']);
    });
  });
});
(0, _globals.describe)('columnOption', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  (0, _globals.it)('should return a column by name', async () => {
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
    (0, _globals.expect)(aiColumn.type).toBe('ai');
    (0, _globals.expect)(aiColumn.caption).toBe('AI Column');
    (0, _globals.expect)(aiColumn.index).toBe(3);
  });
  (0, _globals.it)('should apply cssClass to AI column', async () => {
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
    (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).hasClass('custom-class')).toBe(false);
    component.apiColumnOption('myColumn', 'cssClass', 'custom-class');
    (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).hasClass('custom-class')).toBe(true);
  });
  (0, _globals.it)('should apply headerCellTemplate to AI column', async () => {
    const headerCellTemplate = _globals.jest.fn(container => {
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
    (0, _globals.expect)(headerCellTemplate).toHaveBeenCalledTimes(1);
    (0, _globals.expect)(headerCell.querySelectorAll('.template-class').length).toBe(1);
    (0, _globals.expect)(headerCell.textContent).toBe('Template');
  });
  (0, _globals.it)('should apply cellTemplate to AI column', async () => {
    const cellTemplate = _globals.jest.fn(container => {
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
    (0, _globals.expect)(cellTemplate).toHaveBeenCalledTimes(1);
    (0, _globals.expect)(dataCell.querySelectorAll('.template-class').length).toBe(1);
    (0, _globals.expect)(dataCell.textContent).toBe('Template');
  });
  (0, _globals.it)('should apply alignment', async () => {
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
    (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).css('text-align')).toBe('left');
    component.apiColumnOption('myColumn', 'alignment', 'right');
    (0, _globals.expect)((0, _renderer.default)(component.getCellElement(0, 3)).css('text-align')).toBe('right');
  });
  (0, _globals.it)('should apply visibleIndex to AI column', async () => {
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
    (0, _globals.expect)(visibleColumns.map(_ref2 => {
      let {
        caption
      } = _ref2;
      return caption;
    })).toEqual(['ID', 'AI Column', 'Name', 'Value']);
  });
  (0, _globals.describe)('when the name is reset', () => {
    (0, _globals.it)('should throw E1066', async () => {
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
      (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1066');
    });
  });
  (0, _globals.describe)('when the name specified is not unique', () => {
    (0, _globals.it)('should throw E1059', async () => {
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
      (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1059', '"myColumn1"');
    });
  });
  (0, _globals.it)('should be able to switch column type to "ai" at runtime', async () => {
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
        caption: 'AI Column',
        name: 'myColumn'
      }]
    });
    component.apiColumnOption('myColumn', 'type', 'ai');
    (0, _globals.expect)(component.apiColumnOption('myColumn').type).toBe('ai');
  });
});
(0, _globals.describe)('aiIntegration', () => {
  const rootSendRequestSpy = _globals.jest.fn();
  const columnSendRequestSpy = _globals.jest.fn();
  (0, _globals.beforeEach)(() => {
    beforeTest();
    rootSendRequestSpy.mockClear();
    columnSendRequestSpy.mockClear();
  });
  (0, _globals.afterEach)(afterTest);
  const aiIntegrationResult = () => ({
    promise: new Promise(resolve => {
      resolve('1');
    }),
    abort: () => {}
  });
  const rootAIIntegration = new _ai_integration.AIIntegration({
    sendRequest() {
      rootSendRequestSpy();
      return aiIntegrationResult();
    }
  });
  const columnAIIntegration = new _ai_integration.AIIntegration({
    sendRequest() {
      columnSendRequestSpy();
      return aiIntegrationResult();
    }
  });
  (0, _globals.it)('should be taken from grid level if it set up (first load)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }],
      keyExpr: 'id',
      aiIntegration: rootAIIntegration,
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
          prompt: 'Test prompt'
        }
      }]
    });
    instance.sendAIColumnRequest('myColumn');
    (0, _globals.expect)(rootSendRequestSpy).toHaveBeenCalled();
    (0, _globals.expect)(columnSendRequestSpy).not.toHaveBeenCalled();
  });
  (0, _globals.it)('should be taken from grid level if it set up (dynamic update)', async () => {
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
        name: 'myColumn',
        ai: {
          prompt: 'Test prompt'
        }
      }]
    });
    instance.option('aiIntegration', rootAIIntegration);
    instance.sendAIColumnRequest('myColumn');
    (0, _globals.expect)(rootSendRequestSpy).toHaveBeenCalled();
    (0, _globals.expect)(columnSendRequestSpy).not.toHaveBeenCalled();
  });
  (0, _globals.it)('should be taken from column level if it set up (first load)', async () => {
    const {
      instance
    } = await createDataGrid({
      dataSource: [{
        id: 1,
        name: 'Name 1',
        value: 10
      }],
      keyExpr: 'id',
      aiIntegration: rootAIIntegration,
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
          aiIntegration: columnAIIntegration,
          prompt: 'Test prompt'
        }
      }]
    });
    instance.sendAIColumnRequest('myColumn');
    (0, _globals.expect)(columnSendRequestSpy).toHaveBeenCalled();
    (0, _globals.expect)(rootSendRequestSpy).not.toHaveBeenCalled();
  });
  (0, _globals.it)('should be taken from column level if it set up (dynamic update)', async () => {
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
        name: 'myColumn',
        ai: {
          prompt: 'Test prompt'
        }
      }]
    });
    instance.columnOption('myColumn', 'ai', {
      aiIntegration: columnAIIntegration,
      prompt: 'Test prompt'
    });
    instance.option('aiIntegration', rootAIIntegration);
    instance.sendAIColumnRequest('myColumn');
    (0, _globals.expect)(columnSendRequestSpy).toHaveBeenCalled();
    (0, _globals.expect)(rootSendRequestSpy).not.toHaveBeenCalled();
  });
});
(0, _globals.describe)('prompt', () => {
  const columnSendRequestSpy = _globals.jest.fn();
  const prompt = 'Test prompt';
  (0, _globals.beforeEach)(() => {
    beforeTest();
    columnSendRequestSpy.mockClear();
  });
  (0, _globals.afterEach)(afterTest);
  const aiIntegrationResult = () => ({
    promise: new Promise(resolve => {
      resolve('1');
    }),
    abort: () => {}
  });
  const columnAIIntegration = new _ai_integration.AIIntegration({
    sendRequest(params) {
      var _params$prompt$user;
      columnSendRequestSpy((_params$prompt$user = params.prompt.user) === null || _params$prompt$user === void 0 ? void 0 : _params$prompt$user.includes(prompt));
      return aiIntegrationResult();
    }
  });
  (0, _globals.it)('should be passed to aiIntegration.sendRequest (first load)', async () => {
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
          aiIntegration: columnAIIntegration,
          prompt
        }
      }]
    });
    instance.sendAIColumnRequest('myColumn');
    (0, _globals.expect)(columnSendRequestSpy).toHaveBeenCalledWith(true);
  });
  (0, _globals.it)('should be passed to aiIntegration.sendRequest (dynamic update)', async () => {
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
          aiIntegration: columnAIIntegration
        }
      }]
    });
    instance.columnOption('myColumn', 'ai.prompt', prompt);
    instance.sendAIColumnRequest('myColumn');
    (0, _globals.expect)(columnSendRequestSpy).toHaveBeenCalledWith(true);
  });
  (0, _globals.describe)('when aiIntegration is not set', () => {
    (0, _globals.it)('should throw E1067', async () => {
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
      (0, _globals.expect)(_ui.default.log).toHaveBeenCalledWith('E1067', 'myColumn');
    });
  });
});
(0, _globals.describe)('aiMode', () => {
  const columnSendRequestSpy = _globals.jest.fn();
  (0, _globals.beforeEach)(() => {
    beforeTest();
    columnSendRequestSpy.mockClear();
  });
  (0, _globals.afterEach)(afterTest);
  const aiIntegrationResult = () => ({
    promise: new Promise(resolve => {
      resolve('1');
    }),
    abort: () => {}
  });
  const columnAIIntegration = new _ai_integration.AIIntegration({
    sendRequest() {
      columnSendRequestSpy();
      return aiIntegrationResult();
    }
  });
  (0, _globals.it)('should be auto by default', async () => {
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
          aiIntegration: columnAIIntegration
        }
      }]
    });
    const aiMode = instance.columnOption('myColumn', 'ai.mode');
    (0, _globals.expect)(aiMode).toBe('auto');
  });
  (0, _globals.it)('should call aiIntegration.sendRequest with every visible rows change', async () => {
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
          aiIntegration: columnAIIntegration,
          prompt: 'Test prompt'
        }
      }]
    });
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(1);
    instance.option('paging.pageIndex', 2);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(2);
    instance.option('paging.pageIndex', 3);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(3);
    instance.option('filterValue', ['id', '>', 50]);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(4);
    instance.option('filterValue', undefined);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(5);
    instance.columnOption('name', 'groupIndex', 0);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(6);
    instance.clearGrouping();
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(7);
  });
  (0, _globals.it)('should NOT call aiIntegration.sendRequest with manual mode', async () => {
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
          aiIntegration: columnAIIntegration,
          mode: 'manual'
        }
      }]
    });
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('paging.pageIndex', 2);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('paging.pageIndex', 3);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('filterValue', ['id', '>', 50]);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(0);
    instance.option('filterValue', undefined);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(0);
    instance.columnOption('name', 'groupIndex', 0);
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(0);
    instance.clearGrouping();
    _globals.jest.runAllTimers();
    (0, _globals.expect)(columnSendRequestSpy).toBeCalledTimes(0);
  });
});
(0, _globals.describe)('API Methods', () => {
  const columnSendRequestStarted = _globals.jest.fn();
  const columnSendRequestResolved = _globals.jest.fn();
  const abortSpy = _globals.jest.fn();
  (0, _globals.beforeEach)(() => {
    beforeTest();
    columnSendRequestStarted.mockClear();
    columnSendRequestResolved.mockClear();
    abortSpy.mockClear();
  });
  (0, _globals.afterEach)(afterTest);
  (0, _globals.describe)('abortAIColumnRequest', () => {
    const aiIntegrationResult = () => ({
      promise: new Promise(resolve => {
        columnSendRequestStarted();
        // Timeouts are mocked and do not delay tests execution
        setTimeout(() => {
          columnSendRequestResolved();
          resolve('1');
        }, 10000);
      }),
      abort: () => {
        abortSpy();
      }
    });
    const columnAIIntegration = new _ai_integration.AIIntegration({
      sendRequest() {
        return aiIntegrationResult();
      }
    });
    (0, _globals.it)('should have no effect after the promise is resolved', async () => {
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      instance.abortAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should interrupt a promise and call abortSpy', async () => {
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is NOT enough time to resolve a promise
      _globals.jest.advanceTimersByTime(1000);
      instance.abortAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
  });
  (0, _globals.describe)('sendAIColumnRequest', () => {
    (0, _globals.it)('should send a request only if there is a prompt', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestResolved();
          resolve('1');
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      instance.columnOption('myColumn', 'ai.prompt', 'Test prompt');
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
      await Promise.resolve();
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should send a request after changing the prompt in auto mode (dynamic update)', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestResolved();
          resolve('1');
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      instance.columnOption('myColumn', 'ai.prompt', 'Test prompt');
      // TODO: There should be only one call to sendAIColumnRequest
      // Now there are two calls: one from optionChangedHandler, and other from handleDataChanged
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(2);
      await Promise.resolve();
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(2);
    });
    (0, _globals.it)('should not send a request if there are no data rows', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestResolved();
          resolve('1');
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
      const {
        instance
      } = await createDataGrid({
        dataSource: [],
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
    });
    (0, _globals.it)('should abort the previous request of the same column', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestStarted();
          // Timeouts are mocked and do not delay tests execution
          setTimeout(() => {
            columnSendRequestResolved();
            resolve('1');
          }, 10000);
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is NOT enough time to resolve a promise
      _globals.jest.advanceTimersByTime(5000);
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should not abort the previous request of other column', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestStarted();
          // Timeouts are mocked and do not delay tests execution
          setTimeout(() => {
            columnSendRequestResolved();
            resolve('1');
          }, 10000);
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
      const columnAIIntegration2 = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }, {
          type: 'ai',
          caption: 'AI Column2',
          name: 'myColumn2',
          ai: {
            aiIntegration: columnAIIntegration2,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is NOT enough time to resolve a promise
      _globals.jest.advanceTimersByTime(5000);
      instance.sendAIColumnRequest('myColumn2');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
    });
  });
  (0, _globals.describe)('refreshAIColumn', () => {
    (0, _globals.it)('should send a request only if there is a prompt', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestResolved();
          resolve('1');
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual'
          }
        }]
      });
      instance.refreshAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      instance.columnOption('myColumn', 'ai.prompt', 'Test prompt');
      instance.refreshAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
      await Promise.resolve();
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should not send a request if there are no data rows', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestResolved();
          resolve('1');
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
      const {
        instance
      } = await createDataGrid({
        dataSource: [],
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.refreshAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
    });
    (0, _globals.it)('should abort the previous request of the same column', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestStarted();
          // Timeouts are mocked and do not delay tests execution
          setTimeout(() => {
            columnSendRequestResolved();
            resolve('1');
          }, 10000);
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.refreshAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is NOT enough time to resolve a promise
      _globals.jest.advanceTimersByTime(5000);
      instance.refreshAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should not abort the previous request of other column', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestStarted();
          // Timeouts are mocked and do not delay tests execution
          setTimeout(() => {
            columnSendRequestResolved();
            resolve('1');
          }, 10000);
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
      const columnAIIntegration2 = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }, {
          type: 'ai',
          caption: 'AI Column2',
          name: 'myColumn2',
          ai: {
            aiIntegration: columnAIIntegration2,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.refreshAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is NOT enough time to resolve a promise
      _globals.jest.advanceTimersByTime(5000);
      instance.refreshAIColumn('myColumn2');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
    });
  });
  (0, _globals.describe)('clearAIColumn', () => {
    // TODO: Implement after data showing in the cell is done
    // it('should clear cell values', async () => { });
    (0, _globals.it)('should abort the previous request of the same column', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestStarted();
          // Timeouts are mocked and do not delay tests execution
          setTimeout(() => {
            columnSendRequestResolved();
            resolve('1');
          }, 10000);
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResult();
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is NOT enough time to resolve a promise
      _globals.jest.advanceTimersByTime(5000);
      instance.clearAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    // TODO: Implement after cache is done
    // it('should clear column cache', async () => { });
  });
  // TODO: implement after column cache is done
  // describe('getAIColumnValue', () => { });
});
(0, _globals.describe)('API Handlers', () => {
  const columnSendRequestStarted = _globals.jest.fn();
  const columnSendRequestResolved = _globals.jest.fn();
  const sendRequestPromptSpy = _globals.jest.fn();
  const sendRequestDataSpy = _globals.jest.fn();
  const abortSpy = _globals.jest.fn();
  (0, _globals.beforeEach)(() => {
    beforeTest();
    columnSendRequestStarted.mockClear();
    columnSendRequestResolved.mockClear();
    sendRequestPromptSpy.mockClear();
    sendRequestDataSpy.mockClear();
    abortSpy.mockClear();
  });
  (0, _globals.afterEach)(afterTest);
  (0, _globals.describe)('onAIColumnRequestCreating', () => {
    const aiIntegrationResult = () => ({
      promise: new Promise(resolve => {
        columnSendRequestStarted();
        // Timeouts are mocked and do not delay tests execution
        setTimeout(() => {
          columnSendRequestResolved();
          resolve('1');
        }, 10000);
      }),
      abort: () => {
        abortSpy();
      }
    });
    const columnAIIntegration = new _ai_integration.AIIntegration({
      sendRequest(_ref3) {
        let {
          prompt,
          data
        } = _ref3;
        sendRequestPromptSpy(prompt);
        sendRequestDataSpy(data);
        return aiIntegrationResult();
      }
    });
    (0, _globals.it)('should be called by default', async () => {
      const onAIColumnRequestCreating = _globals.jest.fn();
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnRequestCreating
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnRequestCreating).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnRequestCreating).toHaveBeenCalledWith(_globals.expect.objectContaining({
        component: _globals.expect.objectContaining({
          NAME: 'dxDataGrid'
        }),
        element: _globals.expect.objectContaining({
          id: GRID_CONTAINER_ID
        }),
        column: _globals.expect.objectContaining({
          name: 'myColumn',
          ai: _globals.expect.objectContaining({
            mode: 'manual',
            prompt: 'Test prompt'
          })
        }),
        data: _globals.expect.arrayContaining([{
          id: 1,
          name: 'Name 1',
          value: 10
        }, {
          id: 2,
          name: 'Name 2',
          value: 20
        }]),
        useCache: true,
        cancel: false,
        additionalInfo: {}
      }));
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should cancel the request if e.cancel is true', async () => {
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnRequestCreating: e => {
          e.cancel = true;
        }
      });
      instance.sendAIColumnRequest('myColumn');
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
    });
    (0, _globals.it)('should take into account reduced data', async () => {
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnRequestCreating: e => {
          const filtered = e.data.filter(item => item.id === 2);
          e.data.splice(0, e.data.length, ...filtered);
        }
      });
      instance.sendAIColumnRequest('myColumn');
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(sendRequestPromptSpy).toHaveBeenCalledWith(_globals.expect.objectContaining({
        user: _globals.expect.stringContaining('Data: {"2":{"id":2,"name":"Name 2","value":20}}')
      }));
      await Promise.resolve();
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should pass additional info to the AI request', async () => {
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnRequestCreating: e => {
          e.additionalInfo = {
            customData: 'My custom data'
          };
        }
      });
      instance.sendAIColumnRequest('myColumn');
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(sendRequestDataSpy).toHaveBeenCalledWith(_globals.expect.objectContaining({
        additionalInfo: {
          customData: 'My custom data'
        }
      }));
      await Promise.resolve();
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    // TODO: Implement after cache is done
    // if('should take into account useCache property', async () => {
    // });
  });
  (0, _globals.describe)('onAIColumnResponseReceived', () => {
    const aiIntegrationResult = () => ({
      promise: new Promise(resolve => {
        columnSendRequestStarted();
        // Timeouts are mocked and do not delay tests execution
        setTimeout(() => {
          columnSendRequestResolved();
          resolve('1');
        }, 10000);
      }),
      abort: () => {
        abortSpy();
      }
    });
    const columnAIIntegration = new _ai_integration.AIIntegration({
      sendRequest() {
        return aiIntegrationResult();
      }
    });
    (0, _globals.it)('should call onAIColumnResponseReceived handler', async () => {
      const onAIColumnResponseReceived = _globals.jest.fn();
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnResponseReceived
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      await Promise.resolve();
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledWith(_globals.expect.objectContaining({
        component: _globals.expect.objectContaining({
          NAME: 'dxDataGrid'
        }),
        element: _globals.expect.objectContaining({
          id: GRID_CONTAINER_ID
        }),
        column: _globals.expect.objectContaining({
          name: 'myColumn',
          ai: _globals.expect.objectContaining({
            mode: 'manual',
            prompt: 'Test prompt'
          })
        }),
        data: 1,
        additionalInfo: undefined,
        error: null
      }));
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should not call onAIColumnResponseReceived handler if the request is aborted', async () => {
      const onAIColumnResponseReceived = _globals.jest.fn();
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnResponseReceived
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      instance.abortAIColumnRequest('myColumn');
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      await Promise.resolve();
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(0);
    });
    (0, _globals.it)('should pass additional data to the handler', async () => {
      const aiIntegrationCustomResult = () => ({
        promise: new Promise(resolve => {
          columnSendRequestStarted();
          // Timeouts are mocked and do not delay tests execution
          setTimeout(() => {
            columnSendRequestResolved();
            resolve({
              data: '1',
              additionalInfo: {
                customData: 'My custom data',
                value: 1
              }
            });
          }, 10000);
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnCustomAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationCustomResult();
        }
      });
      const onAIColumnResponseReceived = _globals.jest.fn();
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
            aiIntegration: columnCustomAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnResponseReceived
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      await Promise.resolve();
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledWith(_globals.expect.objectContaining({
        component: _globals.expect.objectContaining({
          NAME: 'dxDataGrid'
        }),
        element: _globals.expect.objectContaining({
          id: GRID_CONTAINER_ID
        }),
        column: _globals.expect.objectContaining({
          name: 'myColumn',
          ai: _globals.expect.objectContaining({
            mode: 'manual',
            prompt: 'Test prompt'
          })
        }),
        data: 1,
        additionalInfo: {
          customData: 'My custom data',
          value: 1
        },
        error: null
      }));
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should call onAIColumnResponseReceived handler with error object if the request is rejected', async () => {
      const aiIntegrationResultWithError = () => ({
        promise: new Promise((_resolve, reject) => {
          columnSendRequestStarted();
          // Timeouts are mocked and do not delay tests execution
          setTimeout(() => {
            reject(new Error('Test error'));
          }, 10000);
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegrationWithError = new _ai_integration.AIIntegration({
        sendRequest() {
          return aiIntegrationResultWithError();
        }
      });
      const onAIColumnResponseReceived = _globals.jest.fn();
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
            aiIntegration: columnAIIntegrationWithError,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }],
        onAIColumnResponseReceived
      });
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      await Promise.resolve();
      await Promise.resolve();
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(onAIColumnResponseReceived).toHaveBeenCalledWith(_globals.expect.objectContaining({
        component: _globals.expect.objectContaining({
          NAME: 'dxDataGrid'
        }),
        element: _globals.expect.objectContaining({
          id: GRID_CONTAINER_ID
        }),
        column: _globals.expect.objectContaining({
          name: 'myColumn',
          ai: _globals.expect.objectContaining({
            mode: 'manual',
            prompt: 'Test prompt'
          })
        }),
        data: null,
        additionalInfo: undefined,
        error: 'Test error'
      }));
    });
  });
});