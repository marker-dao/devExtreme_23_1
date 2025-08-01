/**
* DevExtreme (esm/__internal/exporter/jspdf/common/pdf_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isDefined } from '../../../../core/utils/type';
const DOTS_TEXT = '...';
function toPdfUnit(doc, value) {
  const defaultScaleFactor = 1; // https://github.com/parallax/jsPDF/blob/master/src/jspdf.js#L3212
  const coefficient = defaultScaleFactor / doc.internal.scaleFactor;
  return value * coefficient;
}
function getPageWidth(doc) {
  return doc.internal.pageSize.getWidth();
}
function getPageHeight(doc) {
  return doc.internal.pageSize.getHeight();
}
function getTextLines(doc, text, font, _ref) {
  let {
    wordWrapEnabled,
    targetRectWidth
  } = _ref;
  if (wordWrapEnabled) {
    const usedFont = doc.getFont(font === null || font === void 0 ? void 0 : font.name, font === null || font === void 0 ? void 0 : font.style);
    return doc.splitTextToSize(text, targetRectWidth, {
      fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize(),
      fontName: usedFont.fontName,
      fontStyle: usedFont.fontStyle
    });
  }
  let textWithoutLineBreak = text.split('\n').filter(ch => ch !== '').join(' ');
  if (getTextDimensions(doc, textWithoutLineBreak, font).w <= targetRectWidth) {
    return [textWithoutLineBreak];
  }
  let textWidth = getTextDimensions(doc, textWithoutLineBreak + DOTS_TEXT, font).w;
  while (textWithoutLineBreak.length > 0 && textWidth > targetRectWidth) {
    let symbolsCountToRemove = 0;
    if (textWidth >= targetRectWidth * 2) {
      symbolsCountToRemove = textWithoutLineBreak.length / 2;
    }
    if (symbolsCountToRemove < 1) {
      symbolsCountToRemove = 1;
    }
    textWithoutLineBreak = textWithoutLineBreak.substring(0, textWithoutLineBreak.length - symbolsCountToRemove);
    textWidth = getTextDimensions(doc, textWithoutLineBreak + DOTS_TEXT, font).w;
  }
  return [textWithoutLineBreak + DOTS_TEXT];
}
function calculateTargetRectWidth(columnWidth, padding) {
  const width = columnWidth - (padding.left + padding.right);
  return width >= 0 ? width : 0;
}
function getTextDimensions(doc, text, font) {
  return doc.getTextDimensions(text, {
    font: doc.getFont(font === null || font === void 0 ? void 0 : font.name, font === null || font === void 0 ? void 0 : font.style),
    fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
  });
}
function calculateTextHeight(doc, text, font, _ref2) {
  let {
    wordWrapEnabled,
    targetRectWidth
  } = _ref2;
  const heightOfOneLine = getTextDimensions(doc, text, font).h;
  const linesCount = getTextLines(doc, text, font, {
    wordWrapEnabled,
    targetRectWidth
  }).length;
  return heightOfOneLine * linesCount * doc.getLineHeightFactor();
}
function calculateRowHeight(doc, cells, columnWidths) {
  if (cells.length !== columnWidths.length) {
    throw 'the cells count must be equal to the count of the columns';
  }
  let rowHeight = 0;
  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if (isDefined(cells[cellIndex].rowSpan)) {
      // height will be computed at the recalculateHeightForMergedRows step
      continue;
    }
    const cellText = cells[cellIndex].pdfCell.text;
    const cellPadding = cells[cellIndex].pdfCell.padding;
    const {
      font
    } = cells[cellIndex].pdfCell;
    const {
      wordWrapEnabled
    } = cells[cellIndex].pdfCell;
    const columnWidth = columnWidths[cellIndex];
    const targetRectWidth = calculateTargetRectWidth(columnWidth, cellPadding);
    if (isDefined(cellText)) {
      const textHeight = cellText !== '' ? calculateTextHeight(doc, cellText, font, {
        wordWrapEnabled,
        targetRectWidth
      }) : 0;
      const cellHeight = textHeight + cellPadding.top + cellPadding.bottom;
      if (rowHeight < cellHeight) {
        rowHeight = cellHeight;
      }
    }
  }
  return rowHeight;
}
function applyWordWrap(doc, rowsInfo) {
  rowsInfo.forEach(row => {
    row.cells.forEach(_ref3 => {
      let {
        pdfCell
      } = _ref3;
      if (isDefined(pdfCell.text)) {
        const lines = getTextLines(doc, pdfCell.text, pdfCell.font, {
          wordWrapEnabled: pdfCell.wordWrapEnabled,
          targetRectWidth: calculateTargetRectWidth(pdfCell._rect.w, pdfCell.padding)
        });
        pdfCell.text = lines.join('\n');
      }
    });
  });
}
function applyRtl(doc, rectsByPages, options) {
  rectsByPages.forEach(pageRects => {
    pageRects.forEach(pdfCell => {
      const mirroredX = getPageWidth(doc) - (pdfCell._rect.x + pdfCell._rect.w);
      const marginDiff = options.margin.left - options.margin.right;
      pdfCell._rect.x = mirroredX + marginDiff;
    });
  });
}
export { applyRtl, applyWordWrap, calculateRowHeight, calculateTargetRectWidth, calculateTextHeight, getPageHeight, getPageWidth, getTextDimensions, getTextLines, toPdfUnit };
