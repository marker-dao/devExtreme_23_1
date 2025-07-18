"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportDataGrid = exportDataGrid;
var _type = require("../../../../core/utils/type");
var _export = require("./export");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function _getFullOptions(options) {
  if (!((0, _type.isDefined)(options) && (0, _type.isObject)(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  // @ts-expect-error
  if (!((0, _type.isDefined)(options.component) && (0, _type.isObject)(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  // @ts-expect-error
  if (!(0, _type.isDefined)(options.selectedRowsOnly)) {
    // @ts-expect-error
    options.selectedRowsOnly = false;
  }
  return _export.Export.getFullOptions(options);
}
function exportDataGrid(options) {
  return _export.Export.export(_getFullOptions(options));
}