/**
* DevExtreme (cjs/__internal/grids/new/grid_core/column_chooser/controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _columns_controller = require("../columns_controller");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _controller = require("./controller.mock");
const setup = options => {
  const context = (0, _di.getContext)(options);
  const columnsController = context.get(_columns_controller.ColumnsController);
  const optionsController = context.get(_options_controller.OptionsControllerMock);
  const controller = new _controller.ColumnChooserControllerMock(columnsController, optionsController);
  return {
    columnsController,
    controller,
    treeView: controller.treeView
  };
};
const expectColumnVisibility = (columnsController, visibility) => {
  const columns = columnsController.columns.peek();
  const columnsVisibility = columns.map(column => column.visible);
  (0, _globals.expect)(columnsVisibility).toEqual(visibility);
};
(0, _globals.describe)('ColumnChooser', () => {
  (0, _globals.describe)('Controller', () => {
    (0, _globals.describe)('chooserColumns', () => {
      const expectChooserColumns = (controller, columnNames) => {
        const columns = controller.chooserColumns.peek().map(column => column.name);
        (0, _globals.expect)(columns).toEqual(columnNames);
      };
      _globals.it.each([{
        mode: 'dragAndDrop',
        sortOrder: 'asc',
        result: []
      }, {
        mode: 'dragAndDrop',
        sortOrder: 'desc',
        result: []
      }, {
        mode: 'dragAndDrop',
        sortOrder: undefined,
        result: []
      }, {
        mode: 'select',
        sortOrder: 'asc',
        result: ['A', 'B', 'C']
      }, {
        mode: 'select',
        sortOrder: 'desc',
        result: ['C', 'B', 'A']
      }, {
        mode: 'select',
        sortOrder: undefined,
        result: ['C', 'A', 'B']
      }])('when mode: \'$mode\', sortOrder: \'$sortOrder\'', _ref => {
        let {
          mode,
          sortOrder,
          result
        } = _ref;
        const {
          controller
        } = setup({
          columns: [{
            dataField: 'C'
          }, {
            dataField: 'A'
          }, {
            dataField: 'B'
          }],
          columnChooser: {
            enabled: true,
            mode,
            sortOrder
          }
        });
        expectChooserColumns(controller, result);
      });
      _globals.it.each([{
        mode: 'dragAndDrop',
        sortOrder: 'asc',
        result: ['A', 'B', 'C']
      }, {
        mode: 'dragAndDrop',
        sortOrder: 'desc',
        result: ['C', 'B', 'A']
      }, {
        mode: 'dragAndDrop',
        sortOrder: undefined,
        result: ['C', 'A', 'B']
      }, {
        mode: 'select',
        sortOrder: 'asc',
        result: ['A', 'B', 'C', 'D', 'E']
      }, {
        mode: 'select',
        sortOrder: 'desc',
        result: ['E', 'D', 'C', 'B', 'A']
      }, {
        mode: 'select',
        sortOrder: undefined,
        result: ['C', 'D', 'A', 'B', 'E']
      }])('when some columns are invisible and mode: \'$mode\', sortOrder: \'$sortOrder\'', _ref2 => {
        let {
          mode,
          sortOrder,
          result
        } = _ref2;
        const {
          controller
        } = setup({
          columns: [{
            dataField: 'C',
            visible: false
          }, {
            dataField: 'D'
          }, {
            dataField: 'A',
            visible: false
          }, {
            dataField: 'B',
            visible: false
          }, {
            dataField: 'E'
          }],
          columnChooser: {
            enabled: true,
            mode,
            sortOrder
          }
        });
        expectChooserColumns(controller, result);
      });
      _globals.it.each([{
        mode: 'dragAndDrop',
        sortOrder: 'asc',
        result: ['A', 'C']
      }, {
        mode: 'dragAndDrop',
        sortOrder: 'desc',
        result: ['C', 'A']
      }, {
        mode: 'dragAndDrop',
        sortOrder: undefined,
        result: ['C', 'A']
      }, {
        mode: 'select',
        sortOrder: 'asc',
        result: ['A', 'C', 'D', 'E']
      }, {
        mode: 'select',
        sortOrder: 'desc',
        result: ['E', 'D', 'C', 'A']
      }, {
        mode: 'select',
        sortOrder: undefined,
        result: ['C', 'D', 'A', 'E']
      }])('when some columns have showInColumnChooser=false and mode: \'$mode\', sortOrder: \'$sortOrder\'', _ref3 => {
        let {
          mode,
          sortOrder,
          result
        } = _ref3;
        const {
          controller
        } = setup({
          columns: [{
            dataField: 'C',
            visible: false
          }, {
            dataField: 'D'
          }, {
            dataField: 'A',
            visible: false
          }, {
            dataField: 'B',
            visible: false,
            showInColumnChooser: false
          }, {
            dataField: 'E'
          }, {
            dataField: 'F',
            showInColumnChooser: false
          }],
          columnChooser: {
            enabled: true,
            mode,
            sortOrder
          }
        });
        expectChooserColumns(controller, result);
      });
    });
    (0, _globals.describe)('items', () => {
      _globals.it.each([{
        mode: 'select'
      }, {
        mode: 'dragAndDrop'
      }])('when mode=\'$mode\'', _ref4 => {
        let {
          mode
        } = _ref4;
        const {
          controller
        } = setup({
          columns: [{
            dataField: 'A',
            visible: true
          }, {
            dataField: 'B',
            visible: false
          }, {
            dataField: 'C',
            caption: '1',
            visible: true
          }, {
            dataField: 'D',
            caption: '2',
            visible: false
          }, {
            dataField: 'E',
            allowHiding: false,
            visible: true
          }, {
            dataField: 'F',
            allowHiding: false,
            visible: false
          }, {
            dataField: 'G',
            showInColumnChooser: false
          }, {
            dataField: 'H',
            showInColumnChooser: false,
            visible: false
          }],
          columnChooser: {
            enabled: true,
            mode
          }
        });
        let expectedItems = [{
          columnName: 'A',
          selected: true,
          text: 'A',
          disabled: false
        }, {
          columnName: 'B',
          selected: false,
          text: 'B',
          disabled: false
        }, {
          columnName: 'C',
          selected: true,
          text: '1',
          disabled: false
        }, {
          columnName: 'D',
          selected: false,
          text: '2',
          disabled: false
        }, {
          columnName: 'E',
          selected: true,
          text: 'E',
          disabled: true
        }, {
          columnName: 'F',
          selected: false,
          text: 'F',
          disabled: true
        }];
        if (mode === 'dragAndDrop') {
          expectedItems = expectedItems.filter(item => !item.selected);
        }
        (0, _globals.expect)(controller.items.peek()).toMatchObject(expectedItems);
      });
    });
    (0, _globals.it)('onSelectionChanged', () => {
      const {
        controller,
        columnsController
      } = setup({
        columns: [{
          dataField: 'A'
        }, {
          dataField: 'B'
        }, {
          dataField: 'C',
          allowHiding: false
        }, {
          dataField: 'D',
          allowHiding: false
        }, {
          dataField: 'E',
          visible: false
        }, {
          dataField: 'F',
          visible: false
        }, {
          dataField: 'G',
          allowHiding: false,
          visible: false
        }, {
          dataField: 'H',
          allowHiding: false,
          visible: false
        }]
      });
      controller.onSelectionChanged({
        component: {
          getNodes: () => [{
            itemData: {
              columnName: 'A'
            },
            selected: true
          }, {
            itemData: {
              columnName: 'B'
            },
            selected: false
          }, {
            itemData: {
              columnName: 'C'
            },
            selected: true
          }, {
            itemData: {
              columnName: 'D'
            },
            selected: false
          }, {
            itemData: {
              columnName: 'E'
            },
            selected: true
          }, {
            itemData: {
              columnName: 'F'
            },
            selected: false
          }, {
            itemData: {
              columnName: 'G'
            },
            selected: true
          }, {
            itemData: {
              columnName: 'H'
            },
            selected: false
          }]
        }
      });
      expectColumnVisibility(columnsController, [true, false, true, true, true, false, true, false]);
    });
    (0, _globals.it)('onColumnMove', () => {
      const {
        controller,
        columnsController
      } = setup({
        columns: [{
          dataField: 'A',
          visible: true
        }]
      });
      const getFirstColumn = () => columnsController.columns.peek()[0];
      controller.onColumnMove(getFirstColumn());
      (0, _globals.expect)(getFirstColumn().visible).toBeFalsy();
    });
    (0, _globals.describe)('select mode', () => {
      (0, _globals.it)('toggles column visibility on select/unselect', () => {
        const {
          columnsController,
          treeView
        } = setup({
          columns: ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
          columnChooser: {
            enabled: true,
            mode: 'select'
          }
        });
        treeView === null || treeView === void 0 || treeView.unselectItem(0);
        expectColumnVisibility(columnsController, [false, true, true, true]);
        treeView === null || treeView === void 0 || treeView.selectItem(0);
        expectColumnVisibility(columnsController, [true, true, true, true]);
      });
      (0, _globals.it)('toggles column visibility on selectAll/unselectAll', () => {
        const {
          columnsController,
          treeView
        } = setup({
          columns: [{
            name: 'Column 1',
            visible: false
          }, {
            name: 'Column 2',
            visible: true
          }],
          columnChooser: {
            enabled: true,
            mode: 'select'
          }
        });
        treeView === null || treeView === void 0 || treeView.selectAll();
        expectColumnVisibility(columnsController, [true, true]);
        treeView === null || treeView === void 0 || treeView.unselectAll();
        expectColumnVisibility(columnsController, [false, false]);
      });
      (0, _globals.it)('toggles column visibility on selectAll/unselectAll when some column have showInColumnChooser=false', () => {
        const {
          columnsController,
          treeView
        } = setup({
          columns: [{
            name: 'Column 1'
          }, {
            name: 'Column 2',
            showInColumnChooser: false
          }, {
            name: 'Column 3'
          }],
          columnChooser: {
            enabled: true,
            mode: 'select'
          }
        });
        treeView === null || treeView === void 0 || treeView.unselectAll();
        expectColumnVisibility(columnsController, [false, true, false]);
        // make second column invisible
        columnsController.columnOption(columnsController.columns.peek()[1], 'visible', false);
        treeView === null || treeView === void 0 || treeView.selectAll();
        expectColumnVisibility(columnsController, [true, false, true]);
      });
      (0, _globals.it)('does not toggle columns with allowHiding=false on selectAll/unselectAll', () => {
        const {
          columnsController,
          treeView
        } = setup({
          columns: [{
            name: 'Column 1'
          }, {
            name: 'Column 2',
            allowHiding: false
          }],
          columnChooser: {
            enabled: true,
            mode: 'select'
          }
        });
        treeView === null || treeView === void 0 || treeView.unselectAll();
        expectColumnVisibility(columnsController, [false, true]);
        // make second column invisible
        columnsController.columnOption(columnsController.columns.peek()[1], 'visible', false);
        treeView === null || treeView === void 0 || treeView.selectAll();
        expectColumnVisibility(columnsController, [true, true]);
      });
    });
  });
});
