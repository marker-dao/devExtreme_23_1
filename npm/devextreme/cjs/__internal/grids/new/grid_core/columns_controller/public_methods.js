/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/public_methods.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
var _type = require("../../../../../core/utils/type");
var _utils = require("./utils");
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function PublicMethods(GridCore) {
  return class GridCoreWithColumnsController extends GridCore {
    getVisibleColumns() {
      return this.columnsController.visibleColumns.peek();
    }
    addColumn(column) {
      this.columnsController.addColumn(column);
    }
    getVisibleColumnIndex(columnNameOrIndex) {
      const column = (0, _utils.getColumnByIndexOrName)(this.columnsController.columns.peek(), columnNameOrIndex);
      return this.columnsController.visibleColumns.peek().findIndex(c => c.name === (column === null || column === void 0 ? void 0 : column.name));
    }
    deleteColumn(columnNameOrIndex) {
      const column = (0, _utils.getColumnByIndexOrName)(this.columnsController.columns.peek(), columnNameOrIndex);
      if (!column) {
        return;
      }
      this.columnsController.deleteColumn(column);
    }
    columnOption(columnNameOrIndex, option, value) {
      const column = (0, _utils.getColumnByIndexOrName)(this.columnsController.columns.peek(), columnNameOrIndex);
      if (!column) {
        return;
      }
      if (arguments.length === 1) {
        return column;
      }
      if (arguments.length === 2) {
        if ((0, _type.isObject)(option)) {
          Object.entries(option).forEach(_ref => {
            let [optionName, optionValue] = _ref;
            this.columnsController.columnOption(column, optionName, optionValue);
          });
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return column[option];
        }
      }
      if (arguments.length === 3) {
        this.columnsController.columnOption(column, option, value);
      }
    }
  };
}
