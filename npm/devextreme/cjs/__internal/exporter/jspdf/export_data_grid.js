/**
* DevExtreme (cjs/__internal/exporter/jspdf/export_data_grid.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportDataGrid = exportDataGrid;
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _type = require("../../../core/utils/type");
var _export = require("./common/export");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const HOW_TO_MIGRATE_ARTICLE = 'https://supportcenter.devexpress.com/ticket/details/t1077554';
function _getFullOptions(options) {
  if (!((0, _type.isDefined)(options) && (0, _type.isObject)(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  // @ts-expect-error
  if (!((0, _type.isDefined)(options.component) && (0, _type.isObject)(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  // @ts-expect-error
  if (!((0, _type.isDefined)(options.jsPDFDocument) && (0, _type.isObject)(options.jsPDFDocument))) {
    throw Error('The "jsPDFDocument" field must contain a jsPDF instance.');
  }
  // @ts-expect-error
  if ((0, _type.isDefined)(options.autoTableOptions)) {
    _errors.default.log('W0001', 'Export', 'autoTableOptions', '22.1', `You can migrate from exporting to PDF with the AutoTable plugin to a new export system. See the following topic for more information: ${HOW_TO_MIGRATE_ARTICLE}`);
  }
  return _export.Export.getFullOptions(options);
}
function exportDataGrid(options) {
  return _export.Export.export(_getFullOptions(options));
}
