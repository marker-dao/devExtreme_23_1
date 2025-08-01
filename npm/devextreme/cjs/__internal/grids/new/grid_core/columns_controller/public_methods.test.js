/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/public_methods.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _options_controller = require("../options_controller/options_controller.mock");
var _columns_controller = require("./columns_controller");
var _public_methods = require("./public_methods");
const setup = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const options = new _options_controller.OptionsControllerMock(config);
  const columnsController = new _columns_controller.ColumnsController(options);
  // @ts-expect-error
  const gridCore = new ((0, _public_methods.PublicMethods)(class {
    constructor() {
      this.columnsController = columnsController;
    }
  }))();
  return {
    options,
    columnsController,
    gridCore
  };
};
(0, _globals.describe)('PublicMethods', () => {
  (0, _globals.describe)('getVisibleColumns', () => {
    (0, _globals.it)('should return visible columns', () => {
      const {
        gridCore
      } = setup({
        columns: ['a', 'b', {
          dataField: 'c',
          visible: false
        }]
      });
      (0, _globals.expect)(gridCore.getVisibleColumns()).toMatchObject([{
        name: 'a'
      }, {
        name: 'b'
      }]);
    });
  });
  (0, _globals.describe)('addColumn', () => {
    // tested in columns_controller.test.ts
  });
  (0, _globals.describe)('getVisibleColumnIndex', () => {
    const {
      gridCore
    } = setup({
      columns: [{
        dataField: 'a',
        visible: false
      }, 'b', 'c']
    });
    (0, _globals.it)('should return visible index of visible column', () => {
      (0, _globals.expect)(gridCore.getVisibleColumnIndex('b')).toBe(0);
      (0, _globals.expect)(gridCore.getVisibleColumnIndex('c')).toBe(1);
    });
    (0, _globals.it)('should return -1 for non-visible colunm', () => {
      (0, _globals.expect)(gridCore.getVisibleColumnIndex('a')).toBe(-1);
    });
  });
  (0, _globals.describe)('deleteColumn', () => {
    // tested in columns_controller.test.ts
  });
  (0, _globals.describe)('columnOption', () => {
    // tested in columns_controller.test.ts
  });
});
