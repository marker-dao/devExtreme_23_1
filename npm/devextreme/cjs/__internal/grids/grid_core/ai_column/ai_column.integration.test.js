/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/ai_column.integration.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _data_grid = _interopRequireDefault(require("../../../../ui/data_grid"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
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
    const contentReadyHandler = () => {
      resolve({
        $container,
        component: new _data_grid2.DataGridModel($container.get(0))
      });
      instance.off('contentReady', contentReadyHandler);
    };
    instance.on('contentReady', contentReadyHandler);
  });
};
const beforeTest = () => {
  _globals.jest.spyOn(_ui.default, 'log').mockImplementation(_globals.jest.fn());
};
const afterTest = () => {
  const $container = (0, _renderer.default)(SELECTORS.gridContainer);
  const dataGrid = $container.dxDataGrid('instance');
  dataGrid.dispose();
  $container.remove();
  _globals.jest.clearAllMocks();
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
});
