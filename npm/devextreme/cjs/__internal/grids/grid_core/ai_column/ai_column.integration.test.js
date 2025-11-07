/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/ai_column.integration.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _data_source = _interopRequireDefault(require("../../../../data/data_source"));
var _data_grid = _interopRequireDefault(require("../../../../ui/data_grid"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _ai_integration = require("../../../core/ai_integration/core/ai_integration");
var _m_array_store = _interopRequireDefault(require("../../../data/m_array_store"));
var _data_grid2 = require("../../../grids/data_grid/__tests__/__mock__/model/data_grid");
var _const = require("./const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECTORS = {
  gridContainer: '#gridContainer'
};
const GRID_CONTAINER_ID = 'gridContainer';
const EMPTY_CELL_TEXT = '\u00A0';
const items = [{
  id: 1,
  name: 'Name 1',
  value: 10
}, {
  id: 2,
  name: 'Name 2',
  value: 20
}];
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
      (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).css('text-align')).toBe('left');
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
      (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).css('text-align')).toBe('right');
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
      (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).css('text-align')).toBe('center');
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
      (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).hasClass('custom-class')).toBe(true);
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
      var _headerCell$getElemen, _headerCell$getElemen2;
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
      const headerCell = component.getAIHeaderCell(3);
      (0, _globals.expect)(headerCellTemplate).toHaveBeenCalledTimes(1);
      (0, _globals.expect)((_headerCell$getElemen = headerCell.getElement()) === null || _headerCell$getElemen === void 0 ? void 0 : _headerCell$getElemen.querySelectorAll('.template-class').length).toBe(1);
      (0, _globals.expect)((_headerCell$getElemen2 = headerCell.getElement()) === null || _headerCell$getElemen2 === void 0 ? void 0 : _headerCell$getElemen2.textContent).toBe('Template');
      (0, _globals.expect)(headerCell.getHeaderContent()).toBeNull();
      (0, _globals.expect)(headerCell.getIcon()).toBeNull();
      (0, _globals.expect)(headerCell.getDropDownButton()).not.toBeNull();
    });
  });
  (0, _globals.describe)('when headerCellTemplate isn\'t set', () => {
    (0, _globals.it)('should render icon, text and button by default', async () => {
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
      const headerCell = component.getAIHeaderCell(3);
      (0, _globals.expect)(headerCell.getIcon()).not.toBeNull();
      (0, _globals.expect)(headerCell.getText()).toBe('AI Column');
      (0, _globals.expect)(headerCell.getDropDownButton()).not.toBeNull();
    });
  });
  (0, _globals.describe)('when headerCellTemplate is dynamically updated', () => {
    (0, _globals.it)('should replace default header template', async () => {
      var _headerCellUpdated$ge, _headerCellUpdated$ge2;
      const headerCellTemplate = _globals.jest.fn(container => {
        const span = document.createElement('span');
        span.className = 'my-template-class';
        span.textContent = 'Test';
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
      const headerCellUpdated = component.getAIHeaderCell(3);
      (0, _globals.expect)(headerCellTemplate).toHaveBeenCalledTimes(1);
      (0, _globals.expect)((_headerCellUpdated$ge = headerCellUpdated.getElement()) === null || _headerCellUpdated$ge === void 0 ? void 0 : _headerCellUpdated$ge.querySelector('.my-template-class')).not.toBeNull();
      (0, _globals.expect)((_headerCellUpdated$ge2 = headerCellUpdated.getElement()) === null || _headerCellUpdated$ge2 === void 0 ? void 0 : _headerCellUpdated$ge2.textContent).toBe('Test');
      (0, _globals.expect)(headerCellUpdated.getHeaderContent()).toBeNull();
      (0, _globals.expect)(headerCellUpdated.getIcon()).toBeNull();
      (0, _globals.expect)(headerCellUpdated.getDropDownButton()).not.toBeNull();
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
      const dataCell = component.getDataCell(0, 3).getElement();
      (0, _globals.expect)(cellTemplate).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(dataCell === null || dataCell === void 0 ? void 0 : dataCell.querySelectorAll('.template-class').length).toBe(1);
      (0, _globals.expect)(dataCell === null || dataCell === void 0 ? void 0 : dataCell.textContent).toBe('Template');
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
  (0, _globals.describe)('when column.ai.showHeaderMenu is set to false', () => {
    (0, _globals.it)('should not render header button', async () => {
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
          ai: {
            showHeaderMenu: false
          }
        }]
      });
      const headerCell = component.getAIHeaderCell(3);
      (0, _globals.expect)(headerCell.getHeaderContent()).not.toBeNull();
      (0, _globals.expect)(headerCell.getIcon()).not.toBeNull();
      (0, _globals.expect)(headerCell.getText()).toBe('AI Column');
      (0, _globals.expect)(headerCell.getDropDownButton().getElement()).toBeNull();
    });
  });
  (0, _globals.describe)('when the noDataText is set', () => {
    (0, _globals.it)('should render this text', async () => {
      const {
        component
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
          cssClass: 'custom-class',
          ai: {
            prompt: 'Initial Prompt',
            noDataText: 'Test - No Data',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"","2":""}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('Test - No Data');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('Test - No Data');
    });
  });
  (0, _globals.describe)('when the emptyText is set', () => {
    (0, _globals.it)('should render this text', async () => {
      const {
        component
      } = await createDataGrid({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          name: 'Name 1',
          value: 10
        }, {
          id: 2,
          name: 'Name 2',
          value: 20
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
          cssClass: 'custom-class',
          ai: {
            emptyText: 'Test - Empty Data',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"","2":""}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('Test - Empty Data');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('Test - Empty Data');
    });
  });
  (0, _globals.describe)('when the noDataText is set and mode = "manual"', () => {
    (0, _globals.it)('should render this text', async () => {
      const {
        component,
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
          cssClass: 'custom-class',
          ai: {
            prompt: 'Initial Prompt',
            noDataText: 'Test - No Data',
            mode: 'manual',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"","2":""}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe(EMPTY_CELL_TEXT);
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe(EMPTY_CELL_TEXT);
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('Test - No Data');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('Test - No Data');
    });
  });
  (0, _globals.describe)('when the emptyText is set and mode = "manual"', () => {
    (0, _globals.it)('should render this text', async () => {
      const {
        component,
        instance
      } = await createDataGrid({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          name: 'Name 1',
          value: 10
        }, {
          id: 2,
          name: 'Name 2',
          value: 20
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
          cssClass: 'custom-class',
          ai: {
            emptyText: 'Test - Empty Data',
            noDataText: 'Test - No Data',
            mode: 'manual',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"","2":""}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('Test - Empty Data');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('Test - Empty Data');
      instance.columnOption('myColumn', 'ai.prompt', 'Updated Prompt');
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('Test - No Data');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('Test - No Data');
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
    (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).hasClass('custom-class')).toBe(false);
    component.apiColumnOption('myColumn', 'cssClass', 'custom-class');
    (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).hasClass('custom-class')).toBe(true);
  });
  (0, _globals.it)('should apply headerCellTemplate to AI column', async () => {
    var _headerCell$getElemen3, _headerCell$getElemen4;
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
    const headerCell = component.getAIHeaderCell(3);
    (0, _globals.expect)(headerCellTemplate).toHaveBeenCalledTimes(1);
    (0, _globals.expect)((_headerCell$getElemen3 = headerCell.getElement()) === null || _headerCell$getElemen3 === void 0 ? void 0 : _headerCell$getElemen3.querySelectorAll('.template-class').length).toBe(1);
    (0, _globals.expect)((_headerCell$getElemen4 = headerCell.getElement()) === null || _headerCell$getElemen4 === void 0 ? void 0 : _headerCell$getElemen4.textContent).toBe('Template');
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
    const dataCell = component.getDataCell(0, 3).getElement();
    (0, _globals.expect)(cellTemplate).toHaveBeenCalledTimes(1);
    (0, _globals.expect)(dataCell === null || dataCell === void 0 ? void 0 : dataCell.querySelectorAll('.template-class').length).toBe(1);
    (0, _globals.expect)(dataCell === null || dataCell === void 0 ? void 0 : dataCell.textContent).toBe('Template');
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
    (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).css('text-align')).toBe('left');
    component.apiColumnOption('myColumn', 'alignment', 'right');
    (0, _globals.expect)((0, _renderer.default)(component.getDataCell(0, 3).getElement()).css('text-align')).toBe('right');
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
    (0, _globals.it)('should call a toast with error text if the request is rejected', async () => {
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
      const {
        instance,
        component
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
        }]
      });
      (0, _globals.expect)(component.getToast().getInstance()).toBeUndefined();
      instance.sendAIColumnRequest('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(0);
      // There is enough time to resolve a promise
      _globals.jest.advanceTimersByTime(10000);
      await Promise.resolve();
      await Promise.resolve();
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
      const toastInstance = component.getToast().getInstance();
      (0, _globals.expect)(toastInstance).toBeDefined();
      (0, _globals.expect)(toastInstance.option('message')).toEqual('Test error');
      (0, _globals.expect)(toastInstance.option('type')).toEqual('error');
      (0, _globals.expect)(toastInstance.option('position.at')).toEqual('bottom');
      (0, _globals.expect)(toastInstance.option('position.my')).toEqual('bottom');
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
    (0, _globals.it)('should clear cell values', async () => {
      var _dropDownButton$getBu, _dropDownButton$getLi;
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            prompt: 'Initial prompt',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('AI Response 1');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('AI Response 2');
      (_dropDownButton$getBu = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu === void 0 || _dropDownButton$getBu.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      // click the 'Clear Data' button
      (_dropDownButton$getLi = dropDownButton.getList().getItem(2).getElement()) === null || _dropDownButton$getLi === void 0 || _dropDownButton$getLi.click();
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe(EMPTY_CELL_TEXT);
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe(EMPTY_CELL_TEXT);
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
      instance.clearAIColumn('myColumn');
      (0, _globals.expect)(columnSendRequestStarted).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(columnSendRequestResolved).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(abortSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should clear column cache', async () => {
      const aiIntegrationResult = prompt => ({
        promise: new Promise(resolve => {
          var _prompt$data;
          const result = {};
          Object.entries((_prompt$data = prompt.data) === null || _prompt$data === void 0 ? void 0 : _prompt$data.data).forEach(_ref3 => {
            let [key, value] = _ref3;
            result[key] = `Response ${value.name}`;
          });
          resolve(JSON.stringify(result));
        }),
        abort: () => {
          abortSpy();
        }
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          return aiIntegrationResult(prompt);
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
      await Promise.resolve();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBe('Response Name 1');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toBe('Response Name 2');
      instance.clearAIColumn('myColumn');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBeUndefined();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toBeUndefined();
    });
  });
  (0, _globals.describe)('getAIColumnText', () => {
    (0, _globals.it)('should return undefined if there is no value for the row', async () => {
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest() {
          return {
            promise: new Promise(() => {}),
            abort: () => {}
          };
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
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBeUndefined();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toBeUndefined();
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBeUndefined();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toBeUndefined();
    });
    (0, _globals.it)('should support string keys', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          const result = {
            a1: 'Response Name A1',
            b2: 'Response Name B2'
          };
          resolve(JSON.stringify(result));
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
          id: 'a1',
          name: 'Name A1',
          value: 10
        }, {
          id: 'b2',
          name: 'Name B2',
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
      await Promise.resolve();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 'a1')).toBe('Response Name A1');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 'b2')).toBe('Response Name B2');
    });
    (0, _globals.it)('should support number keys', async () => {
      const aiIntegrationResult = () => ({
        promise: new Promise(resolve => {
          const result = {
            1: 'Response Name 1',
            2: 'Response Name 2'
          };
          resolve(JSON.stringify(result));
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
      await Promise.resolve();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBe('Response Name 1');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toBe('Response Name 2');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', '1')).toBe('Response Name 1');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', '2')).toBe('Response Name 2');
    });
  });
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
      sendRequest(_ref4) {
        let {
          prompt,
          data
        } = _ref4;
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
        useCache: false,
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
        user: _globals.expect.stringContaining('Dataset: {"2":{"id":2,"name":"Name 2","value":20}}')
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
    (0, _globals.it)('should have useCache property set to true by default', async () => {
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          sendRequestDataSpy();
          return {
            promise: new Promise(resolve => {
              var _prompt$data2;
              const result = {};
              Object.entries((_prompt$data2 = prompt.data) === null || _prompt$data2 === void 0 ? void 0 : _prompt$data2.data).forEach(_ref5 => {
                let [key, value] = _ref5;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
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
        paging: {
          pageSize: 1
        },
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
            aiIntegration,
            prompt: 'Test prompt'
          }
        }]
      });
      await Promise.resolve();
      (0, _globals.expect)(sendRequestDataSpy).toHaveBeenCalledTimes(1);
      instance.option('paging.pageIndex', 1);
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(sendRequestDataSpy).toHaveBeenCalledTimes(2);
      instance.option('paging.pageIndex', 0);
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(sendRequestDataSpy).toHaveBeenCalledTimes(2);
    });
    (0, _globals.it)('should not use cache when useCache property set to false', async () => {
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          sendRequestDataSpy();
          return {
            promise: new Promise(resolve => {
              var _prompt$data3;
              const result = {};
              Object.entries((_prompt$data3 = prompt.data) === null || _prompt$data3 === void 0 ? void 0 : _prompt$data3.data).forEach(_ref6 => {
                let [key, value] = _ref6;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
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
        paging: {
          pageSize: 1
        },
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
            aiIntegration,
            prompt: 'Test prompt'
          }
        }],
        onAIColumnRequestCreating: e => {
          e.useCache = false;
        }
      });
      await Promise.resolve();
      (0, _globals.expect)(sendRequestDataSpy).toHaveBeenCalledTimes(1);
      instance.option('paging.pageIndex', 1);
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(sendRequestDataSpy).toHaveBeenCalledTimes(2);
      instance.option('paging.pageIndex', 0);
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(sendRequestDataSpy).toHaveBeenCalledTimes(3);
    });
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
        error: 'Test error'
      }));
    });
  });
});
(0, _globals.describe)('Popup', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  (0, _globals.it)('should be visible when the ai.popup.visible is true (dynamic update)', async () => {
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
    (0, _globals.expect)(component.getAIDialog()).toBeNull();
    component.apiColumnOption('myColumn', 'ai.popup.visible', true);
    _globals.jest.runAllTimers();
    await Promise.resolve();
    (0, _globals.expect)(component.getAIDialog()).not.toBeNull();
    const popupInstance = component.getAIPromptEditor().getPopupInstance();
    (0, _globals.expect)(popupInstance.option('visible')).toBe(true);
  });
  (0, _globals.it)('should be invisible when the ai.popup.visible is false (dynamic update)', async () => {
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
        ai: {
          popup: {
            visible: true
          }
        }
      }]
    });
    (0, _globals.expect)(component.getAIDialog()).not.toBeNull();
    component.apiColumnOption('myColumn', 'ai.popup.visible', false);
    _globals.jest.runAllTimers();
    await Promise.resolve();
    (0, _globals.expect)(component.getAIDialog()).toBeNull();
    const popupInstance = component.getAIPromptEditor().getPopupInstance();
    (0, _globals.expect)(popupInstance.option('visible')).toBe(false);
  });
  (0, _globals.it)('should pass popup options to the AI column prompt editor popup (initial rendering)', async () => {
    var _popupInstance$option, _popupInstance$option2, _popupInstance$option3, _popupInstance$option4, _popupInstance$option5, _popupInstance$option6, _popupInstance$option7, _popupInstance$option8, _popupInstance$option9, _popupInstance$option10, _popupInstance$option11;
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
        ai: {
          popup: {
            visible: true,
            title: 'Custom Title',
            height: 400,
            animation: {
              show: {
                type: 'fade',
                duration: 300
              },
              hide: {
                type: 'fade',
                duration: 300
              }
            },
            toolbarItems: [{
              widget: 'dxButton',
              options: {
                text: 'Custom Button'
              },
              location: 'after'
            }],
            accessKey: 'h',
            hideOnOutsideClick: true,
            dragEnabled: true,
            enableBodyScroll: false,
            hint: 'Custom Hint',
            maxHeight: 2000,
            minHeight: 100,
            maxWidth: 800,
            minWidth: 200,
            onDisposing: _globals.jest.fn().mockReturnValue('onDisposing'),
            onHidden: _globals.jest.fn().mockReturnValue('onHidden'),
            onShowing: _globals.jest.fn().mockReturnValue('onShowing'),
            onShown: _globals.jest.fn().mockReturnValue('onShown'),
            onContentReady: _globals.jest.fn().mockReturnValue('onContentReady'),
            onResize: _globals.jest.fn().mockReturnValue('onResize'),
            onResizeEnd: _globals.jest.fn().mockReturnValue('onResizeEnd'),
            onResizeStart: _globals.jest.fn().mockReturnValue('onResizeStart'),
            onHiding: _globals.jest.fn().mockReturnValue('onHiding'),
            onTitleRendered: _globals.jest.fn().mockReturnValue('onTitleRendered'),
            onInitialized: _globals.jest.fn().mockReturnValue('onInitialized'),
            resizeEnabled: true,
            restorePosition: true,
            rtlEnabled: true,
            shading: false,
            showTitle: true
          }
        }
      }]
    });
    const popupInstance = component.getAIPromptEditor().getPopupInstance();
    (0, _globals.expect)(popupInstance.option('visible')).toBe(true);
    (0, _globals.expect)(popupInstance.option('title')).toBe('Custom Title');
    (0, _globals.expect)(popupInstance.option('width')).toBe(360); // default width
    (0, _globals.expect)(popupInstance.option('height')).toBe(400);
    (0, _globals.expect)(popupInstance.option('animation')).toEqual({
      show: {
        type: 'fade',
        duration: 300
      },
      hide: {
        type: 'fade',
        duration: 300
      }
    });
    const toolbarItems = popupInstance.option('toolbarItems');
    (0, _globals.expect)(toolbarItems).toEqual(_globals.expect.arrayContaining([_globals.expect.objectContaining({
      widget: 'dxButton',
      options: _globals.expect.objectContaining({
        text: 'Custom Button'
      }),
      location: 'after'
    })]));
    (0, _globals.expect)(popupInstance.option('accessKey')).toBe('h');
    (0, _globals.expect)(popupInstance.option('hideOnOutsideClick')).toBe(true);
    (0, _globals.expect)(popupInstance.option('dragEnabled')).toBe(true);
    (0, _globals.expect)(popupInstance.option('enableBodyScroll')).toBe(false);
    (0, _globals.expect)(popupInstance.option('hint')).toBe('Custom Hint');
    (0, _globals.expect)(popupInstance.option('maxHeight')).toBe(2000);
    (0, _globals.expect)(popupInstance.option('minHeight')).toBe(100);
    (0, _globals.expect)(popupInstance.option('maxWidth')).toBe(800);
    (0, _globals.expect)(popupInstance.option('minWidth')).toBe(200);
    (0, _globals.expect)((_popupInstance$option = popupInstance.option('onDisposing')) === null || _popupInstance$option === void 0 ? void 0 : _popupInstance$option({})).toEqual('onDisposing');
    (0, _globals.expect)((_popupInstance$option2 = popupInstance.option('onHidden')) === null || _popupInstance$option2 === void 0 ? void 0 : _popupInstance$option2({})).toEqual('onHidden');
    (0, _globals.expect)((_popupInstance$option3 = popupInstance.option('onShowing')) === null || _popupInstance$option3 === void 0 ? void 0 : _popupInstance$option3({})).toEqual('onShowing');
    (0, _globals.expect)((_popupInstance$option4 = popupInstance.option('onShown')) === null || _popupInstance$option4 === void 0 ? void 0 : _popupInstance$option4({})).toEqual('onShown');
    (0, _globals.expect)((_popupInstance$option5 = popupInstance.option('onContentReady')) === null || _popupInstance$option5 === void 0 ? void 0 : _popupInstance$option5({})).toEqual('onContentReady');
    (0, _globals.expect)((_popupInstance$option6 = popupInstance.option('onResize')) === null || _popupInstance$option6 === void 0 ? void 0 : _popupInstance$option6({})).toEqual('onResize');
    (0, _globals.expect)((_popupInstance$option7 = popupInstance.option('onResizeEnd')) === null || _popupInstance$option7 === void 0 ? void 0 : _popupInstance$option7({})).toEqual('onResizeEnd');
    (0, _globals.expect)((_popupInstance$option8 = popupInstance.option('onResizeStart')) === null || _popupInstance$option8 === void 0 ? void 0 : _popupInstance$option8({})).toEqual('onResizeStart');
    (0, _globals.expect)((_popupInstance$option9 = popupInstance.option('onHiding')) === null || _popupInstance$option9 === void 0 ? void 0 : _popupInstance$option9({})).toEqual('onHiding');
    (0, _globals.expect)((_popupInstance$option10 = popupInstance.option('onTitleRendered')) === null || _popupInstance$option10 === void 0 ? void 0 : _popupInstance$option10({})).toEqual('onTitleRendered');
    (0, _globals.expect)((_popupInstance$option11 = popupInstance.option('onInitialized')) === null || _popupInstance$option11 === void 0 ? void 0 : _popupInstance$option11({})).toEqual('onInitialized');
    (0, _globals.expect)(popupInstance.option('resizeEnabled')).toBe(true);
    (0, _globals.expect)(popupInstance.option('restorePosition')).toBe(true);
    (0, _globals.expect)(popupInstance.option('rtlEnabled')).toBe(true);
    (0, _globals.expect)(popupInstance.option('shading')).toBe(false);
    (0, _globals.expect)(popupInstance.option('showTitle')).toBe(true);
  });
  (0, _globals.it)('should pass popup options to the AI column prompt editor popup (dynamic update)', async () => {
    var _popupInstance$option12, _popupInstance$option13, _popupInstance$option14, _popupInstance$option15, _popupInstance$option16, _popupInstance$option17, _popupInstance$option18, _popupInstance$option19, _popupInstance$option20, _popupInstance$option21, _popupInstance$option22;
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
    component.apiColumnOption('myColumn', 'ai.popup', {
      visible: true,
      title: 'Custom Title',
      height: 400,
      animation: {
        show: {
          type: 'fade',
          duration: 300
        },
        hide: {
          type: 'fade',
          duration: 300
        }
      },
      toolbarItems: [{
        widget: 'dxButton',
        options: {
          text: 'Custom Button'
        },
        location: 'after'
      }],
      accessKey: 'h',
      hideOnOutsideClick: true,
      dragEnabled: true,
      enableBodyScroll: false,
      hint: 'Custom Hint',
      maxHeight: 2000,
      minHeight: 100,
      maxWidth: 800,
      minWidth: 200,
      onDisposing: _globals.jest.fn().mockReturnValue('onDisposing'),
      onHidden: _globals.jest.fn().mockReturnValue('onHidden'),
      onShowing: _globals.jest.fn().mockReturnValue('onShowing'),
      onShown: _globals.jest.fn().mockReturnValue('onShown'),
      onContentReady: _globals.jest.fn().mockReturnValue('onContentReady'),
      onResize: _globals.jest.fn().mockReturnValue('onResize'),
      onResizeEnd: _globals.jest.fn().mockReturnValue('onResizeEnd'),
      onResizeStart: _globals.jest.fn().mockReturnValue('onResizeStart'),
      onHiding: _globals.jest.fn().mockReturnValue('onHiding'),
      onTitleRendered: _globals.jest.fn().mockReturnValue('onTitleRendered'),
      onInitialized: _globals.jest.fn().mockReturnValue('onInitialized'),
      resizeEnabled: true,
      restorePosition: true,
      rtlEnabled: true,
      shading: false,
      showTitle: true
    });
    _globals.jest.runAllTimers();
    await Promise.resolve();
    const popupInstance = component.getAIPromptEditor().getPopupInstance();
    (0, _globals.expect)(popupInstance.option('visible')).toBe(true);
    (0, _globals.expect)(popupInstance.option('title')).toBe('Custom Title');
    (0, _globals.expect)(popupInstance.option('width')).toBe(360); // default width
    (0, _globals.expect)(popupInstance.option('height')).toBe(400);
    (0, _globals.expect)(popupInstance.option('animation')).toEqual({
      show: {
        type: 'fade',
        duration: 300
      },
      hide: {
        type: 'fade',
        duration: 300
      }
    });
    const toolbarItems = popupInstance.option('toolbarItems');
    (0, _globals.expect)(toolbarItems).toEqual(_globals.expect.arrayContaining([_globals.expect.objectContaining({
      widget: 'dxButton',
      options: _globals.expect.objectContaining({
        text: 'Custom Button'
      }),
      location: 'after'
    })]));
    (0, _globals.expect)(popupInstance.option('accessKey')).toBe('h');
    (0, _globals.expect)(popupInstance.option('hideOnOutsideClick')).toBe(true);
    (0, _globals.expect)(popupInstance.option('dragEnabled')).toBe(true);
    (0, _globals.expect)(popupInstance.option('enableBodyScroll')).toBe(false);
    (0, _globals.expect)(popupInstance.option('hint')).toBe('Custom Hint');
    (0, _globals.expect)(popupInstance.option('maxHeight')).toBe(2000);
    (0, _globals.expect)(popupInstance.option('minHeight')).toBe(100);
    (0, _globals.expect)(popupInstance.option('maxWidth')).toBe(800);
    (0, _globals.expect)(popupInstance.option('minWidth')).toBe(200);
    (0, _globals.expect)((_popupInstance$option12 = popupInstance.option('onDisposing')) === null || _popupInstance$option12 === void 0 ? void 0 : _popupInstance$option12({})).toEqual('onDisposing');
    (0, _globals.expect)((_popupInstance$option13 = popupInstance.option('onHidden')) === null || _popupInstance$option13 === void 0 ? void 0 : _popupInstance$option13({})).toEqual('onHidden');
    (0, _globals.expect)((_popupInstance$option14 = popupInstance.option('onShowing')) === null || _popupInstance$option14 === void 0 ? void 0 : _popupInstance$option14({})).toEqual('onShowing');
    (0, _globals.expect)((_popupInstance$option15 = popupInstance.option('onShown')) === null || _popupInstance$option15 === void 0 ? void 0 : _popupInstance$option15({})).toEqual('onShown');
    (0, _globals.expect)((_popupInstance$option16 = popupInstance.option('onContentReady')) === null || _popupInstance$option16 === void 0 ? void 0 : _popupInstance$option16({})).toEqual('onContentReady');
    (0, _globals.expect)((_popupInstance$option17 = popupInstance.option('onResize')) === null || _popupInstance$option17 === void 0 ? void 0 : _popupInstance$option17({})).toEqual('onResize');
    (0, _globals.expect)((_popupInstance$option18 = popupInstance.option('onResizeEnd')) === null || _popupInstance$option18 === void 0 ? void 0 : _popupInstance$option18({})).toEqual('onResizeEnd');
    (0, _globals.expect)((_popupInstance$option19 = popupInstance.option('onResizeStart')) === null || _popupInstance$option19 === void 0 ? void 0 : _popupInstance$option19({})).toEqual('onResizeStart');
    (0, _globals.expect)((_popupInstance$option20 = popupInstance.option('onHiding')) === null || _popupInstance$option20 === void 0 ? void 0 : _popupInstance$option20({})).toEqual('onHiding');
    (0, _globals.expect)((_popupInstance$option21 = popupInstance.option('onTitleRendered')) === null || _popupInstance$option21 === void 0 ? void 0 : _popupInstance$option21({})).toEqual('onTitleRendered');
    (0, _globals.expect)((_popupInstance$option22 = popupInstance.option('onInitialized')) === null || _popupInstance$option22 === void 0 ? void 0 : _popupInstance$option22({})).toEqual('onInitialized');
    (0, _globals.expect)(popupInstance.option('resizeEnabled')).toBe(true);
    (0, _globals.expect)(popupInstance.option('restorePosition')).toBe(true);
    (0, _globals.expect)(popupInstance.option('rtlEnabled')).toBe(true);
    (0, _globals.expect)(popupInstance.option('shading')).toBe(false);
    (0, _globals.expect)(popupInstance.option('showTitle')).toBe(true);
  });
});
(0, _globals.describe)('Editor', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  (0, _globals.it)('should pass editor options to the AI column prompt editor (initial rendering)', async () => {
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
        ai: {
          popup: {
            visible: true
          },
          prompt: 'Test prompt',
          editorOptions: {
            height: 200,
            placeholder: 'Custom placeholder',
            accessKey: 'h',
            activeStateEnabled: true,
            hint: 'Custom Hint',
            label: 'Custom Label',
            labelMode: 'floating',
            maxLength: 500,
            readOnly: false,
            spellcheck: true,
            onChange: _globals.jest.fn().mockReturnValue('onChange'),
            onCopy: _globals.jest.fn().mockReturnValue('onCopy'),
            onCut: _globals.jest.fn().mockReturnValue('onCut'),
            onEnterKey: _globals.jest.fn().mockReturnValue('onEnterKey'),
            onFocusIn: _globals.jest.fn().mockReturnValue('onFocusIn'),
            onFocusOut: _globals.jest.fn().mockReturnValue('onFocusOut'),
            onInput: _globals.jest.fn().mockReturnValue('onInput'),
            onKeyDown: _globals.jest.fn().mockReturnValue('onKeyDown'),
            onKeyUp: _globals.jest.fn().mockReturnValue('onKeyUp'),
            onPaste: _globals.jest.fn().mockReturnValue('onPaste'),
            onDisposing: _globals.jest.fn().mockReturnValue('onDisposing'),
            onInitialized: _globals.jest.fn().mockReturnValue('onInitialized'),
            rtlEnabled: true,
            stylingMode: 'underlined',
            tabIndex: 1,
            width: '100px'
          }
        }
      }]
    });
    const textEditorInstance = component.getAIPromptEditor().getTextArea().getInstance();
    (0, _globals.expect)(textEditorInstance.option('height')).toBe(200);
    (0, _globals.expect)(textEditorInstance.option('placeholder')).toBe('Custom placeholder');
    (0, _globals.expect)(textEditorInstance.option('value')).toBe('Test prompt');
    (0, _globals.expect)(textEditorInstance.option('accessKey')).toBe('h');
    (0, _globals.expect)(textEditorInstance.option('activeStateEnabled')).toBe(true);
    (0, _globals.expect)(textEditorInstance.option('hint')).toBe('Custom Hint');
    (0, _globals.expect)(textEditorInstance.option('label')).toBe('Custom Label');
    (0, _globals.expect)(textEditorInstance.option('labelMode')).toBe('floating');
    (0, _globals.expect)(textEditorInstance.option('maxLength')).toBe(500);
    (0, _globals.expect)(textEditorInstance.option('readOnly')).toBe(false);
    (0, _globals.expect)(textEditorInstance.option('spellcheck')).toBe(true);
    (0, _globals.expect)(textEditorInstance.option('onChange')()).toEqual('onChange');
    (0, _globals.expect)(textEditorInstance.option('onCopy')()).toEqual('onCopy');
    (0, _globals.expect)(textEditorInstance.option('onCut')()).toEqual('onCut');
    (0, _globals.expect)(textEditorInstance.option('onEnterKey')()).toEqual('onEnterKey');
    (0, _globals.expect)(textEditorInstance.option('onFocusIn')()).toEqual('onFocusIn');
    (0, _globals.expect)(textEditorInstance.option('onFocusOut')()).toEqual('onFocusOut');
    (0, _globals.expect)(textEditorInstance.option('onInput')()).toEqual('onInput');
    (0, _globals.expect)(textEditorInstance.option('onKeyDown')()).toEqual('onKeyDown');
    (0, _globals.expect)(textEditorInstance.option('onKeyUp')()).toEqual('onKeyUp');
    (0, _globals.expect)(textEditorInstance.option('onPaste')()).toEqual('onPaste');
    (0, _globals.expect)(textEditorInstance.option('onDisposing')()).toEqual('onDisposing');
    (0, _globals.expect)(textEditorInstance.option('onInitialized')()).toEqual('onInitialized');
    (0, _globals.expect)(textEditorInstance.option('rtlEnabled')).toBe(true);
    (0, _globals.expect)(textEditorInstance.option('stylingMode')).toBe('underlined');
    (0, _globals.expect)(textEditorInstance.option('tabIndex')).toBe(1);
    (0, _globals.expect)(textEditorInstance.option('width')).toBe('100px');
  });
  (0, _globals.it)('should pass editor options to the AI column prompt editor (dynamic update)', async () => {
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
        ai: {
          popup: {
            visible: true
          }
        }
      }]
    });
    component.apiColumnOption('myColumn', 'ai.editorOptions', {
      height: 200,
      placeholder: 'Custom placeholder',
      accessKey: 'h',
      activeStateEnabled: true,
      hint: 'Custom Hint',
      label: 'Custom Label',
      labelMode: 'floating',
      maxLength: 500,
      readOnly: false,
      spellcheck: true,
      onChange: _globals.jest.fn().mockReturnValue('onChange'),
      onCopy: _globals.jest.fn().mockReturnValue('onCopy'),
      onCut: _globals.jest.fn().mockReturnValue('onCut'),
      onEnterKey: _globals.jest.fn().mockReturnValue('onEnterKey'),
      onFocusIn: _globals.jest.fn().mockReturnValue('onFocusIn'),
      onFocusOut: _globals.jest.fn().mockReturnValue('onFocusOut'),
      onInput: _globals.jest.fn().mockReturnValue('onInput'),
      onKeyDown: _globals.jest.fn().mockReturnValue('onKeyDown'),
      onKeyUp: _globals.jest.fn().mockReturnValue('onKeyUp'),
      onPaste: _globals.jest.fn().mockReturnValue('onPaste'),
      onDisposing: _globals.jest.fn().mockReturnValue('onDisposing'),
      onInitialized: _globals.jest.fn().mockReturnValue('onInitialized'),
      rtlEnabled: true,
      stylingMode: 'underlined',
      tabIndex: 1,
      width: '100px'
    });
    component.apiColumnOption('myColumn', 'ai.prompt', 'My test prompt');
    const textEditorInstance = component.getAIPromptEditor().getTextArea().getInstance();
    (0, _globals.expect)(textEditorInstance.option('height')).toBe(200);
    (0, _globals.expect)(textEditorInstance.option('placeholder')).toBe('Custom placeholder');
    (0, _globals.expect)(textEditorInstance.option('value')).toBe('My test prompt');
    (0, _globals.expect)(textEditorInstance.option('accessKey')).toBe('h');
    (0, _globals.expect)(textEditorInstance.option('activeStateEnabled')).toBe(true);
    (0, _globals.expect)(textEditorInstance.option('hint')).toBe('Custom Hint');
    (0, _globals.expect)(textEditorInstance.option('label')).toBe('Custom Label');
    (0, _globals.expect)(textEditorInstance.option('labelMode')).toBe('floating');
    (0, _globals.expect)(textEditorInstance.option('maxLength')).toBe(500);
    (0, _globals.expect)(textEditorInstance.option('readOnly')).toBe(false);
    (0, _globals.expect)(textEditorInstance.option('spellcheck')).toBe(true);
    (0, _globals.expect)(textEditorInstance.option('onChange')()).toEqual('onChange');
    (0, _globals.expect)(textEditorInstance.option('onCopy')()).toEqual('onCopy');
    (0, _globals.expect)(textEditorInstance.option('onCut')()).toEqual('onCut');
    (0, _globals.expect)(textEditorInstance.option('onEnterKey')()).toEqual('onEnterKey');
    (0, _globals.expect)(textEditorInstance.option('onFocusIn')()).toEqual('onFocusIn');
    (0, _globals.expect)(textEditorInstance.option('onFocusOut')()).toEqual('onFocusOut');
    (0, _globals.expect)(textEditorInstance.option('onInput')()).toEqual('onInput');
    (0, _globals.expect)(textEditorInstance.option('onKeyDown')()).toEqual('onKeyDown');
    (0, _globals.expect)(textEditorInstance.option('onKeyUp')()).toEqual('onKeyUp');
    (0, _globals.expect)(textEditorInstance.option('onPaste')()).toEqual('onPaste');
    (0, _globals.expect)(textEditorInstance.option('onDisposing')()).toEqual('onDisposing');
    (0, _globals.expect)(textEditorInstance.option('onInitialized')()).toEqual('onInitialized');
    (0, _globals.expect)(textEditorInstance.option('rtlEnabled')).toBe(true);
    (0, _globals.expect)(textEditorInstance.option('stylingMode')).toBe('underlined');
    (0, _globals.expect)(textEditorInstance.option('tabIndex')).toBe(1);
    (0, _globals.expect)(textEditorInstance.option('width')).toBe('100px');
  });
  (0, _globals.it)('should pass ai.prompt to the editor value', async () => {
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
        ai: {
          popup: {
            visible: true
          },
          prompt: 'Initial prompt'
        }
      }]
    });
    let textEditorInstance = component.getAIPromptEditor().getTextArea().getInstance();
    (0, _globals.expect)(textEditorInstance.option('value')).toBe('Initial prompt');
    component.apiColumnOption('myColumn', 'ai.prompt', 'Updated prompt');
    textEditorInstance = component.getAIPromptEditor().getTextArea().getInstance();
    (0, _globals.expect)(textEditorInstance.option('value')).toBe('Updated prompt');
  });
});
(0, _globals.describe)('DropDownButton', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  (0, _globals.describe)('when prompt isn\'t set', () => {
    (0, _globals.it)('\'Regenerate\' and \'Clear Data\' should be disabled', async () => {
      var _dropDownButton$getBu2;
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
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getBu2 = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu2 === void 0 || _dropDownButton$getBu2.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(0).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(1).isDisabled).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(2).isDisabled).toBe(true);
    });
  });
  (0, _globals.describe)('when prompt is set', () => {
    (0, _globals.it)('\'Regenerate\' and \'Clear Data\' should be enabled', async () => {
      var _dropDownButton$getBu3;
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
          ai: {
            prompt: 'Initial prompt'
          }
        }]
      });
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getBu3 = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu3 === void 0 || _dropDownButton$getBu3.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(0).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(1).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(2).isDisabled).toBe(false);
    });
  });
  (0, _globals.describe)('when prompt is updated via apiColumnOption', () => {
    (0, _globals.it)('\'Regenerate\' and \'Clear Data\' should be enabled', async () => {
      var _dropDownButton, _dropDownButton2;
      const {
        component,
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
      let dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      (_dropDownButton = dropDownButton) === null || _dropDownButton === void 0 || (_dropDownButton = _dropDownButton.getButtonElement()) === null || _dropDownButton === void 0 || _dropDownButton.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(0).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(1).isDisabled).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(2).isDisabled).toBe(true);
      instance.columnOption('myColumn', 'ai.prompt', 'Updated prompt');
      dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      (_dropDownButton2 = dropDownButton) === null || _dropDownButton2 === void 0 || (_dropDownButton2 = _dropDownButton2.getButtonElement()) === null || _dropDownButton2 === void 0 || _dropDownButton2.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(0).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(1).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(2).isDisabled).toBe(false);
    });
  });
  (0, _globals.describe)('when prompt is updated via AIPromptEditor', () => {
    (0, _globals.it)('\'Regenerate\' and \'Clear Data\' should be enabled', async () => {
      var _dropDownButton3, _dropDownButton$getLi2, _dropDownButton4;
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
      let dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      (_dropDownButton3 = dropDownButton) === null || _dropDownButton3 === void 0 || (_dropDownButton3 = _dropDownButton3.getButtonElement()) === null || _dropDownButton3 === void 0 || _dropDownButton3.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(0).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(1).isDisabled).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(2).isDisabled).toBe(true);
      (_dropDownButton$getLi2 = dropDownButton.getList()) === null || _dropDownButton$getLi2 === void 0 || (_dropDownButton$getLi2 = _dropDownButton$getLi2.getItem(0)) === null || _dropDownButton$getLi2 === void 0 || (_dropDownButton$getLi2 = _dropDownButton$getLi2.getElement()) === null || _dropDownButton$getLi2 === void 0 || _dropDownButton$getLi2.click(); // show AIPromptEditor
      const aiPromptEditor = component.getAIPromptEditor();
      (0, _globals.expect)(aiPromptEditor.isVisible()).toBe(true);
      aiPromptEditor.getTextArea().setValue('Updated prompt');
      aiPromptEditor.getApplyButton().getElement().click();
      dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      (_dropDownButton4 = dropDownButton) === null || _dropDownButton4 === void 0 || (_dropDownButton4 = _dropDownButton4.getButtonElement()) === null || _dropDownButton4 === void 0 || _dropDownButton4.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (0, _globals.expect)(dropDownButton.getList().getItem(0).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(1).isDisabled).toBe(false);
      (0, _globals.expect)(dropDownButton.getList().getItem(2).isDisabled).toBe(false);
    });
  });
  (0, _globals.describe)('when click the \'Autofill with AI\' button', () => {
    (0, _globals.it)('AIPromptEditor should appear', async () => {
      var _dropDownButton$getBu4, _dropDownButton$getLi3;
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
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getBu4 = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu4 === void 0 || _dropDownButton$getBu4.click();
      (0, _globals.expect)(dropDownButton === null || dropDownButton === void 0 ? void 0 : dropDownButton.isOpened()).toBe(true);
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getLi3 = dropDownButton.getList()) === null || _dropDownButton$getLi3 === void 0 || (_dropDownButton$getLi3 = _dropDownButton$getLi3.getItem(0)) === null || _dropDownButton$getLi3 === void 0 || (_dropDownButton$getLi3 = _dropDownButton$getLi3.getElement()) === null || _dropDownButton$getLi3 === void 0 || _dropDownButton$getLi3.click();
      (0, _globals.expect)(component.getAIPromptEditor().isVisible()).toBe(true);
    });
  });
  (0, _globals.describe)('when click the \'Regenerate\' button', () => {
    (0, _globals.it)('request should be sent', async () => {
      var _dropDownButton$getBu5, _dropDownButton$getLi4;
      const sendRequestSpy = _globals.jest.fn();
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
          ai: {
            prompt: 'Initial prompt',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                sendRequestSpy();
                return {
                  promise: new Promise(resolve => {
                    resolve('123');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getBu5 = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu5 === void 0 || _dropDownButton$getBu5.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      sendRequestSpy.mockClear();
      (_dropDownButton$getLi4 = dropDownButton.getList()) === null || _dropDownButton$getLi4 === void 0 || (_dropDownButton$getLi4 = _dropDownButton$getLi4.getItem(1)) === null || _dropDownButton$getLi4 === void 0 || (_dropDownButton$getLi4 = _dropDownButton$getLi4.getElement()) === null || _dropDownButton$getLi4 === void 0 || _dropDownButton$getLi4.click();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
    });
  });
  (0, _globals.describe)('when click the \'Clear Data\' button', () => {
    (0, _globals.it)('prompt should reset', async () => {
      var _dropDownButton$getBu6, _dropDownButton$getLi5;
      const {
        component,
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
          name: 'myColumn',
          ai: {
            prompt: 'Initial prompt'
          }
        }]
      });
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getBu6 = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu6 === void 0 || _dropDownButton$getBu6.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (_dropDownButton$getLi5 = dropDownButton.getList()) === null || _dropDownButton$getLi5 === void 0 || (_dropDownButton$getLi5 = _dropDownButton$getLi5.getItem(2)) === null || _dropDownButton$getLi5 === void 0 || (_dropDownButton$getLi5 = _dropDownButton$getLi5.getElement()) === null || _dropDownButton$getLi5 === void 0 || _dropDownButton$getLi5.click();
      (0, _globals.expect)(instance.columnOption('myColumn', 'ai.prompt')).toBe('');
    });
    (0, _globals.it)('should clear cached data', async () => {
      var _dropDownButton$getBu7, _dropDownButton$getLi6;
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          return {
            promise: new Promise(resolve => {
              var _prompt$data4;
              const result = {};
              Object.entries((_prompt$data4 = prompt.data) === null || _prompt$data4 === void 0 ? void 0 : _prompt$data4.data).forEach(_ref7 => {
                let [key, value] = _ref7;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
        }
      });
      const {
        component,
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
            prompt: 'Initial prompt',
            aiIntegration
          }
        }]
      });
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBe('Response Name 1');
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getBu7 = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu7 === void 0 || _dropDownButton$getBu7.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (_dropDownButton$getLi6 = dropDownButton.getList()) === null || _dropDownButton$getLi6 === void 0 || (_dropDownButton$getLi6 = _dropDownButton$getLi6.getItem(2)) === null || _dropDownButton$getLi6 === void 0 || (_dropDownButton$getLi6 = _dropDownButton$getLi6.getElement()) === null || _dropDownButton$getLi6 === void 0 || _dropDownButton$getLi6.click();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBeUndefined();
    });
  });
});
(0, _globals.describe)('Cache', () => {
  const sendRequestSpy = _globals.jest.fn();
  (0, _globals.beforeEach)(() => {
    beforeTest();
    sendRequestSpy.mockClear();
  });
  (0, _globals.afterEach)(afterTest);
  (0, _globals.describe)('when use public methods', () => {
    (0, _globals.it)('should not use cached data with sendAIColumnRequest', async () => {
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          sendRequestSpy();
          return {
            promise: new Promise(resolve => {
              var _prompt$data5;
              const result = {};
              Object.entries((_prompt$data5 = prompt.data) === null || _prompt$data5 === void 0 ? void 0 : _prompt$data5.data).forEach(_ref8 => {
                let [key, value] = _ref8;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
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
            aiIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(2);
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(3);
    });
    (0, _globals.it)('should not use cached data with refreshAIColumn', async () => {
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          sendRequestSpy();
          return {
            promise: new Promise(resolve => {
              var _prompt$data6;
              const result = {};
              Object.entries((_prompt$data6 = prompt.data) === null || _prompt$data6 === void 0 ? void 0 : _prompt$data6.data).forEach(_ref9 => {
                let [key, value] = _ref9;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
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
            aiIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.refreshAIColumn('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      instance.refreshAIColumn('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(2);
      instance.refreshAIColumn('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(3);
    });
  });
  (0, _globals.describe)('when update column options', () => {
    (0, _globals.it)('should clear cached data on ai.prompt change', async () => {
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          sendRequestSpy();
          return {
            promise: new Promise(resolve => {
              var _prompt$data7;
              const result = {};
              Object.entries((_prompt$data7 = prompt.data) === null || _prompt$data7 === void 0 ? void 0 : _prompt$data7.data).forEach(_ref10 => {
                let [key, value] = _ref10;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
        }
      });
      const {
        component,
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
            aiIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toEqual('Response Name 1');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toEqual('Response Name 2');
      component.apiColumnOption('myColumn', 'ai.prompt', 'Updated prompt');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBeUndefined();
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toBeUndefined();
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toEqual('Response Name 1');
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 2)).toEqual('Response Name 2');
    });
    (0, _globals.it)('should use cache with pagination in auto mode', async () => {
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          var _prompt$data8;
          sendRequestSpy((_prompt$data8 = prompt.data) === null || _prompt$data8 === void 0 ? void 0 : _prompt$data8.data);
          return {
            promise: new Promise(resolve => {
              var _prompt$data9;
              const result = {};
              Object.entries((_prompt$data9 = prompt.data) === null || _prompt$data9 === void 0 ? void 0 : _prompt$data9.data).forEach(_ref11 => {
                let [key, value] = _ref11;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
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
        paging: {
          pageSize: 1
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
            aiIntegration,
            prompt: 'Test prompt'
          }
        }]
      });
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledWith({
        1: {
          id: 1,
          name: 'Name 1',
          value: 10
        }
      });
      instance.option('paging.pageIndex', 1);
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledWith({
        2: {
          id: 2,
          name: 'Name 2',
          value: 20
        }
      });
      instance.option('paging.pageIndex', 0);
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(2);
    });
    (0, _globals.it)('should use cache with filtering in auto mode', async () => {
      const aiIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          var _prompt$data10;
          sendRequestSpy((_prompt$data10 = prompt.data) === null || _prompt$data10 === void 0 ? void 0 : _prompt$data10.data);
          return {
            promise: new Promise(resolve => {
              var _prompt$data11;
              const result = {};
              Object.entries((_prompt$data11 = prompt.data) === null || _prompt$data11 === void 0 ? void 0 : _prompt$data11.data).forEach(_ref12 => {
                let [key, value] = _ref12;
                result[key] = `Response ${value.name}`;
              });
              resolve(JSON.stringify(result));
            }),
            abort: () => {}
          };
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
            aiIntegration,
            prompt: 'Test prompt'
          }
        }],
        filterValue: ['id', '=', 1]
      });
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledWith({
        1: {
          id: 1,
          name: 'Name 1',
          value: 10
        }
      });
      instance.option('filterValue', undefined);
      _globals.jest.runAllTimers();
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledWith({
        2: {
          id: 2,
          name: 'Name 2',
          value: 20
        }
      });
    });
  });
  (0, _globals.describe)('common behavior', () => {
    (0, _globals.it)('should not cache empty responses', async () => {
      const aiIntegrationResult = prompt => ({
        promise: new Promise(resolve => {
          var _prompt$data12;
          const result = {};
          Object.entries((_prompt$data12 = prompt.data) === null || _prompt$data12 === void 0 ? void 0 : _prompt$data12.data).forEach(_ref13 => {
            let [key] = _ref13;
            result[key] = '';
          });
          resolve(JSON.stringify(result));
        }),
        abort: () => {}
      });
      const columnAIIntegration = new _ai_integration.AIIntegration({
        sendRequest(prompt) {
          sendRequestSpy();
          return aiIntegrationResult(prompt);
        }
      });
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
            aiIntegration: columnAIIntegration,
            mode: 'manual',
            prompt: 'Test prompt'
          }
        }]
      });
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBeUndefined();
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBe('');
      instance.sendAIColumnRequest('myColumn');
      await Promise.resolve();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(instance.getAIColumnText('myColumn', 1)).toBe('');
    });
  });
});
(0, _globals.describe)('AI data', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  const store = new _m_array_store.default(items);
  const loadMock = _globals.jest.fn(loadOptions => new Promise((resolve, reject) => {
    setTimeout(() => {
      store.load(loadOptions).done(resolve).fail(reject);
    }, 300);
  }));
  const totalCountMock = _globals.jest.fn(() => new Promise((resolve, reject) => {
    store.totalCount().done(resolve).fail(reject);
  }));
  const remoteDataSource = new _data_source.default({
    key: 'id',
    load: loadMock,
    totalCount: totalCountMock
  });
  const compareCellNodes = (prevCells, currentCells) => {
    prevCells.forEach((cell, index) => {
      const currentCell = currentCells[index];
      if (cell === null || currentCell === null) {
        throw new Error('Cell is null');
      }
      if (cell.classList.contains(_const.CLASSES.aiColumn)) {
        (0, _globals.expect)(cell).not.toBe(currentCell);
      } else {
        (0, _globals.expect)(cell).toBe(currentCell);
      }
    });
  };
  (0, _globals.describe)('when prompt is set', () => {
    (0, _globals.it)('should be rendered', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            prompt: 'Initial prompt',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('AI Response 1');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('AI Response 2');
    });
  });
  (0, _globals.describe)('when prompt is set via column option', () => {
    (0, _globals.it)('should be rendered', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe(EMPTY_CELL_TEXT);
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe(EMPTY_CELL_TEXT);
      component.apiColumnOption('myColumn', 'ai.prompt', 'Initial prompt');
      await Promise.resolve();
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('AI Response 1');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('AI Response 2');
    });
  });
  (0, _globals.describe)('when prompt is set via AI prompt editor', () => {
    (0, _globals.it)('should be rendered', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            popup: {
              visible: true
            },
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe(EMPTY_CELL_TEXT);
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe(EMPTY_CELL_TEXT);
      component.getAIPromptEditor().getTextArea().setValue('Initial prompt');
      component.getAIPromptEditor().getApplyButton().getElement().click();
      await Promise.resolve();
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe('AI Response 1');
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe('AI Response 2');
    });
  });
  (0, _globals.describe)('when prompt is set when there are multiple AI columns', () => {
    (0, _globals.it)('should be rendered in the correct column', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
          caption: 'AI Column 1',
          name: 'myColumn1',
          ai: {
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Column 1 - AI Response 1","2":"AI Column 1 - AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }, {
          type: 'ai',
          caption: 'AI Column 2',
          name: 'myColumn2',
          ai: {
            prompt: 'Initial prompt',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Column 2 - AI Response 1","2":"AI Column 2 - AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      // check data cells of the first AI column
      (0, _globals.expect)(component.getDataCell(0, 3).getText()).toBe(EMPTY_CELL_TEXT);
      (0, _globals.expect)(component.getDataCell(1, 3).getText()).toBe(EMPTY_CELL_TEXT);
      // check data cells of the second AI column
      (0, _globals.expect)(component.getDataCell(0, 4).getText()).toBe('AI Column 2 - AI Response 1');
      (0, _globals.expect)(component.getDataCell(1, 4).getText()).toBe('AI Column 2 - AI Response 2');
    });
  });
  (0, _globals.describe)('when refresh is called', () => {
    (0, _globals.it)('should be re-rendered', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            prompt: 'Initial prompt',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      _globals.jest.useRealTimers();
      const aiCells = [component.getDataCell(0, 3).getElement(), component.getDataCell(1, 3).getElement()];
      await component.apiRefresh();
      compareCellNodes(aiCells, [component.getDataCell(0, 3).getElement(), component.getDataCell(1, 3).getElement()]);
    });
  });
  (0, _globals.describe)('when remoteOperations is enabled and refresh is called', () => {
    (0, _globals.it)('should be re-rendered', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: remoteDataSource,
        remoteOperations: true,
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
            prompt: 'Initial prompt',
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      _globals.jest.useRealTimers();
      const aiCells = [component.getDataCell(0, 3).getElement(), component.getDataCell(1, 3).getElement()];
      (0, _globals.expect)(loadMock).toHaveBeenCalledTimes(1);
      await component.apiRefresh();
      (0, _globals.expect)(loadMock).toHaveBeenCalledTimes(2);
      compareCellNodes(aiCells, [component.getDataCell(0, 3).getElement(), component.getDataCell(1, 3).getElement()]);
    });
  });
  (0, _globals.describe)('when repaintChangesOnly is enabled', () => {
    (0, _globals.it)('should render only AI cells', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
        keyExpr: 'id',
        repaintChangesOnly: true,
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
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      const cells = [...component.getDataCells(0), ...component.getDataCells(1)];
      component.apiColumnOption('myColumn', 'ai.prompt', 'Initial prompt');
      await Promise.resolve();
      compareCellNodes(cells, [...component.getDataCells(0), ...component.getDataCells(1)]);
    });
  });
});
(0, _globals.describe)('Load panel', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  (0, _globals.describe)('when requesting an API service', () => {
    (0, _globals.it)('should be displayed', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    setTimeout(() => {
                      resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                    }, 300);
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      component.apiColumnOption('myColumn', 'ai.prompt', 'Updated prompt');
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(true);
      _globals.jest.runAllTimers(); // wait for request
      await Promise.resolve(); // wait for DataGrid to process the response
      _globals.jest.runAllTimers(); // wait hidden load panel
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(false);
    });
  });
  (0, _globals.describe)('when an error occurs while requesting the AI service', () => {
    (0, _globals.it)('should be hidden', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise((resolve, reject) => {
                    setTimeout(() => {
                      reject(new Error('AI service error'));
                    }, 300);
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      component.apiColumnOption('myColumn', 'ai.prompt', 'Updated prompt');
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(true);
      _globals.jest.runAllTimers(); // wait for request
      await Promise.resolve(); // wait for DataGrid to process the error
      await Promise.resolve(); // wait for DataGrid to process the error
      _globals.jest.runAllTimers(); // wait hidden load panel
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(false);
    });
  });
  (0, _globals.describe)('when the request was aborted', () => {
    (0, _globals.it)('should be hidden', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    setTimeout(() => {
                      resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                    }, 300);
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      component.apiColumnOption('myColumn', 'ai.prompt', 'Updated prompt');
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(true);
      component.apiAbortAIColumnRequest('myColumn');
      _globals.jest.runAllTimers(); // wait hidden load panel
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(false);
    });
  });
  (0, _globals.describe)('when there are several requests and one of them is aborted', () => {
    (0, _globals.it)('should be displayed', async () => {
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
          caption: 'AI Column 1',
          name: 'myColumn1',
          ai: {
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    setTimeout(() => {
                      resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                    }, 300);
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }, {
          type: 'ai',
          caption: 'AI Column 2',
          name: 'myColumn2',
          ai: {
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    setTimeout(() => {
                      resolve('{"1":"AI Response 3","2":"AI Response 4"}');
                    }, 300);
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      component.apiColumnOption('myColumn1', 'ai.prompt', 'Updated prompt 1');
      component.apiColumnOption('myColumn2', 'ai.prompt', 'Updated prompt 2');
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(true);
      component.apiAbortAIColumnRequest('myColumn1');
      _globals.jest.runAllTimers();
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(true);
      await Promise.resolve(); // wait for DataGrid to process the response
      _globals.jest.runAllTimers(); // wait hidden load panel
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(false);
    });
  });
  (0, _globals.describe)('when a request is made using AIPromptEditor', () => {
    (0, _globals.it)('should be hidden', async () => {
      var _dropDownButton$getBu8, _dropDownButton$getLi7;
      const {
        component
      } = await createDataGrid({
        dataSource: items,
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
            aiIntegration: new _ai_integration.AIIntegration({
              sendRequest() {
                return {
                  promise: new Promise(resolve => {
                    setTimeout(() => {
                      resolve('{"1":"AI Response 1","2":"AI Response 2"}');
                    }, 300);
                  }),
                  abort: () => {}
                };
              }
            })
          }
        }]
      });
      const dropDownButton = component.getAIHeaderCell(3).getDropDownButton();
      dropDownButton === null || dropDownButton === void 0 || (_dropDownButton$getBu8 = dropDownButton.getButtonElement()) === null || _dropDownButton$getBu8 === void 0 || _dropDownButton$getBu8.click();
      (0, _globals.expect)(dropDownButton.isOpened()).toBe(true);
      (_dropDownButton$getLi7 = dropDownButton.getList()) === null || _dropDownButton$getLi7 === void 0 || (_dropDownButton$getLi7 = _dropDownButton$getLi7.getItem(0)) === null || _dropDownButton$getLi7 === void 0 || (_dropDownButton$getLi7 = _dropDownButton$getLi7.getElement()) === null || _dropDownButton$getLi7 === void 0 || _dropDownButton$getLi7.click(); // show AIPromptEditor
      const aiPromptEditor = component.getAIPromptEditor();
      (0, _globals.expect)(aiPromptEditor.isVisible()).toBe(true);
      aiPromptEditor.getTextArea().setValue('Updated prompt');
      aiPromptEditor.getApplyButton().getElement().click();
      _globals.jest.runAllTimers(); // wait for request
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(false);
      (0, _globals.expect)(aiPromptEditor.getProgressBar().isVisible()).toBe(true);
      await Promise.resolve(); // wait for DataGrid to process the response
      _globals.jest.runAllTimers(); // wait hidden load panel
      (0, _globals.expect)(component.getLoadPanel().isVisible()).toBe(false);
      (0, _globals.expect)(aiPromptEditor.getProgressBar().isVisible()).toBe(false);
    });
  });
});
