/**
* DevExtreme (esm/__internal/exporter/jspdf/export_data_grid.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import errors from '../../../core/errors';
import { isDefined, isObject } from '../../../core/utils/type';
import { Export } from './common/export';
const HOW_TO_MIGRATE_ARTICLE = 'https://supportcenter.devexpress.com/ticket/details/t1077554';
function _getFullOptions(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  // @ts-expect-error
  if (!(isDefined(options.component) && isObject(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  // @ts-expect-error
  if (!(isDefined(options.jsPDFDocument) && isObject(options.jsPDFDocument))) {
    throw Error('The "jsPDFDocument" field must contain a jsPDF instance.');
  }
  // @ts-expect-error
  if (isDefined(options.autoTableOptions)) {
    errors.log('W0001', 'Export', 'autoTableOptions', '22.1', `You can migrate from exporting to PDF with the AutoTable plugin to a new export system. See the following topic for more information: ${HOW_TO_MIGRATE_ARTICLE}`);
  }
  return Export.getFullOptions(options);
}
function exportDataGrid(options) {
  return Export.export(_getFullOptions(options));
}
export { exportDataGrid };
