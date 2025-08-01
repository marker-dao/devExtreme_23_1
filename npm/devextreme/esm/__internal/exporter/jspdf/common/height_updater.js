/**
* DevExtreme (esm/__internal/exporter/jspdf/common/height_updater.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-plusplus */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { isDefined } from '../../../../core/utils/type';
import { calculateTargetRectWidth, calculateTextHeight } from './pdf_utils';
function updateRowsAndCellsHeights(doc, rows) {
  const rowsAdditionalHeights = calculateAdditionalRowsHeights(doc, rows);
  rows.forEach(row => {
    row.height += rowsAdditionalHeights[row.rowIndex];
  });
  rows.forEach(row => {
    row.cells.forEach(cell => {
      const rowsCount = (cell.rowSpan ?? 0) + 1;
      cell.pdfCell._rect.h = rows.slice(row.rowIndex, row.rowIndex + rowsCount).reduce((accumulator, rowInfo) => accumulator + rowInfo.height, 0);
    });
  });
}
function calculateAdditionalRowsHeights(doc, rows) {
  const rowsAdditionalHeights = Array.from({
    length: rows.length
  }, () => 0);
  const sortedRows = sortRowsByMaxRowSpanAsc(rows);
  sortedRows.forEach(row => {
    const cellsWithRowSpan = row.cells.filter(cell => isDefined(cell.rowSpan));
    cellsWithRowSpan.forEach(cell => {
      const targetRectWidth = calculateTargetRectWidth(cell.pdfCell._rect.w, cell.pdfCell.padding);
      const textHeight = calculateTextHeight(doc, cell.pdfCell.text, cell.pdfCell.font, {
        wordWrapEnabled: cell.pdfCell.wordWrapEnabled,
        targetRectWidth
      });
      const cellHeight = textHeight + cell.pdfCell.padding.top + cell.pdfCell.padding.bottom;
      const rowsCount = cell.rowSpan + 1;
      const currentRowSpanRowsHeight = rows.slice(row.rowIndex, row.rowIndex + rowsCount).reduce((accumulator, rowInfo) => accumulator + rowInfo.height + rowsAdditionalHeights[rowInfo.rowIndex], 0);
      if (cellHeight > currentRowSpanRowsHeight) {
        const delta = (cellHeight - currentRowSpanRowsHeight) / rowsCount;
        for (let spanIndex = row.rowIndex; spanIndex < row.rowIndex + rowsCount; spanIndex++) {
          rowsAdditionalHeights[spanIndex] += delta;
        }
      }
    });
  });
  return rowsAdditionalHeights;
}
function sortRowsByMaxRowSpanAsc(rows) {
  const getMaxRowSpan = row => {
    const spansArray = row.cells.map(cell => cell.rowSpan ?? 0);
    return Math.max(...spansArray);
  };
  const sortByMaxRowSpan = (row1, row2) => {
    const row1RowSpan = getMaxRowSpan(row1);
    const row2RowSpan = getMaxRowSpan(row2);
    if (row1RowSpan > row2RowSpan) {
      return 1;
    }
    if (row2RowSpan > row1RowSpan) {
      return -1;
    }
    return 0;
  };
  return [...rows].sort(sortByMaxRowSpan);
}
export { updateRowsAndCellsHeights };
