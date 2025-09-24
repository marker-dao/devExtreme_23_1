"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHideableColumns = getHideableColumns;
var _type = require("../../../../core/utils/type");
const HIDEABLE_COMMAND_COLUMNS = ['ai'];
function isHideableColumn(column) {
  const isGroup = ((column === null || column === void 0 ? void 0 : column.groupIndex) ?? -1) >= 0;
  return column.visible === true && (!(0, _type.isDefined)(column.type) || HIDEABLE_COMMAND_COLUMNS.includes(column.type)) && !column.fixed && !isGroup;
}
function getHideableColumns(columns) {
  return columns.filter(isHideableColumn);
}