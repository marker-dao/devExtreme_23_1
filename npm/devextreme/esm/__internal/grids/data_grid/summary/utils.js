/**
* DevExtreme (esm/__internal/grids/data_grid/summary/utils.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../core/utils/type';
export function getSummaryCellIndex(column, prevColumn) {
  let isGroupRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const cellIndex = column.index ?? -1;
  if (!isGroupRow) {
    return cellIndex;
  }
  if ((prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.type) === 'groupExpand' || column.type === 'groupExpand') {
    return (prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.index) ?? -1;
  }
  return !isDefined(column.groupIndex) ? cellIndex : -1;
}
