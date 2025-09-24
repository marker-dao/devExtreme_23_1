// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isDetailRow(row) {
  const rowType = row === null || row === void 0 ? void 0 : row.rowType;
  return rowType === 'detail' || rowType === 'detailAdaptive';
}