"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDetailRow = isDetailRow;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function isDetailRow(row) {
  const rowType = row === null || row === void 0 ? void 0 : row.rowType;
  return rowType === 'detail' || rowType === 'detailAdaptive';
}