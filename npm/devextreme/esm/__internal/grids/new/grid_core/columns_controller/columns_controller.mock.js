/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/columns_controller.mock.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { normalizeColumns, preNormalizeColumns } from './utils';
export function normalizeColumn(column) {
  return normalizeColumns(preNormalizeColumns([column]),
  // @ts-expect-error
  v => v)[0];
}
