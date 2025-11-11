/**
* DevExtreme (esm/__internal/grids/grid_core/master_detail/utils.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isDetailRow(row) {
  const rowType = row === null || row === void 0 ? void 0 : row.rowType;
  return rowType === 'detail' || rowType === 'detailAdaptive';
}
