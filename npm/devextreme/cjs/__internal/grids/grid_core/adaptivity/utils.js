/**
* DevExtreme (cjs/__internal/grids/grid_core/adaptivity/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
