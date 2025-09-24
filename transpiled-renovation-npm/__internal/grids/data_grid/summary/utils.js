"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSummaryCellIndex = getSummaryCellIndex;
var _type = require("../../../../core/utils/type");
function getSummaryCellIndex(column, prevColumn) {
  let isGroupRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const cellIndex = column.index ?? -1;
  if (!isGroupRow) {
    return cellIndex;
  }
  if ((prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.type) === 'groupExpand' || column.type === 'groupExpand') {
    return (prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.index) ?? -1;
  }
  return !(0, _type.isDefined)(column.groupIndex) ? cellIndex : -1;
}