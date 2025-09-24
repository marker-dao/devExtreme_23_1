import { isDefined } from '../../../../core/utils/type';
const HIDEABLE_COMMAND_COLUMNS = ['ai'];
function isHideableColumn(column) {
  const isGroup = ((column === null || column === void 0 ? void 0 : column.groupIndex) ?? -1) >= 0;
  return column.visible === true && (!isDefined(column.type) || HIDEABLE_COMMAND_COLUMNS.includes(column.type)) && !column.fixed && !isGroup;
}
export function getHideableColumns(columns) {
  return columns.filter(isHideableColumn);
}