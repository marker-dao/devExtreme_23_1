/**
* DevExtreme (esm/__internal/grids/grid_core/adaptivity/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../core/utils/type';
const HIDEABLE_COMMAND_COLUMNS = ['ai'];
function isHideableColumn(column) {
  const isGroup = ((column === null || column === void 0 ? void 0 : column.groupIndex) ?? -1) >= 0;
  return column.visible === true && (!isDefined(column.type) || HIDEABLE_COMMAND_COLUMNS.includes(column.type)) && !column.fixed && !isGroup;
}
export function getHideableColumns(columns) {
  return columns.filter(isHideableColumn);
}
