/**
* DevExtreme (esm/__internal/exporter/jspdf/autotable/export_data_grid.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isDefined, isObject } from '../../../../core/utils/type';
import { Export } from './export';
function _getFullOptions(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  // @ts-expect-error
  if (!(isDefined(options.component) && isObject(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  // @ts-expect-error
  if (!isDefined(options.selectedRowsOnly)) {
    // @ts-expect-error
    options.selectedRowsOnly = false;
  }
  return Export.getFullOptions(options);
}
function exportDataGrid(options) {
  return Export.export(_getFullOptions(options));
}
export { exportDataGrid };
