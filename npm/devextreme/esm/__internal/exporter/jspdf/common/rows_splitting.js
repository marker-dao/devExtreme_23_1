/**
* DevExtreme (esm/__internal/exporter/jspdf/common/rows_splitting.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isDefined } from '../../../../core/utils/type';
import { roundToThreeDecimals } from './draw_utils';
import { getPageHeight, getPageWidth } from './pdf_utils';
import { createOnSplitMultiPageRow } from './rows_spliting_utils/create_on_split_multipage_row';
import { checkPageContainsOnlyHeader, getMultiPageRowPages } from './rows_spliting_utils/get_multipage_row_pages';
const COORDINATE_EPSILON = 0.001;
function convertToCellsArray(rows) {
  return [].concat.apply([], rows.map(rowInfo => rowInfo.cells.filter(cell => !isDefined(cell.pdfCell.isMerged)).map(cellInfo => _extends({}, cellInfo.pdfCell._rect, {
    sourceCellInfo: _extends({}, cellInfo.pdfCell, {
      gridCell: cellInfo.gridCell
    })
  }))));
}
function splitByPages(doc, rowsInfo, options, onSeparateRectHorizontally, onSeparateRectVertically) {
  if (rowsInfo.length === 0) {
    // Empty Table
    return [[]];
  }
  const maxBottomRight = {
    x: getPageWidth(doc) - options.margin.right,
    y: getPageHeight(doc) - options.margin.bottom
  };
  const headerRows = rowsInfo.filter(r => r.rowType === 'header');
  const headerHeight = headerRows.reduce((accumulator, row) => accumulator + row.height, 0);
  const verticallyPages = splitRectsByPages(convertToCellsArray(rowsInfo), options.margin.top, 'y', 'h', (isFirstPage, currentCoordinate) => {
    const additionalHeight = !isFirstPage && options.repeatHeaders ? headerHeight : 0;
    return roundToThreeDecimals(currentCoordinate + additionalHeight) <= roundToThreeDecimals(maxBottomRight.y);
  }, (rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) => {
    const args = {
      sourceRect: rect,
      topRect: {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: currentPageMaxRectCoordinate - rect.y
      },
      bottomRect: {
        x: rect.x,
        y: currentPageMaxRectCoordinate,
        w: rect.w,
        h: rect.h - (currentPageMaxRectCoordinate - rect.y)
      }
    };
    onSeparateRectVertically(args);
    currentPageRects.push(args.topRect);
    rectsToSplit.push(args.bottomRect);
  }, createOnSplitMultiPageRow(doc, options, headerHeight, maxBottomRight));
  if (options.repeatHeaders) {
    for (let i = 1; i < verticallyPages.length; i++) {
      verticallyPages[i].forEach(rect => rect.y += headerHeight);
      // create deep copy of headers for each page
      const headerCells = convertToCellsArray(headerRows);
      headerCells.forEach(cell => {
        // @ts-expect-error
        cell.y -= options.topLeft.y;
        // cell.x -= options.topLeft.x; don't forget to uncomment this line after fixing topleft.x issue
      });
      verticallyPages[i] = [...headerCells, ...verticallyPages[i]];
    }
  }
  let pageIndex = 0;
  while (pageIndex < verticallyPages.length) {
    // @ts-expect-error
    const horizontallyPages = splitRectsByPages(verticallyPages[pageIndex], options.margin.left, 'x', 'w', (pagesLength, currentCoordinate) => roundToThreeDecimals(currentCoordinate) <= roundToThreeDecimals(maxBottomRight.x), (rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) => {
      const args = {
        sourceRect: rect,
        leftRect: {
          x: rect.x,
          y: rect.y,
          w: currentPageMaxRectCoordinate - rect.x,
          h: rect.h
        },
        rightRect: {
          x: currentPageMaxRectCoordinate,
          y: rect.y,
          w: rect.w - (currentPageMaxRectCoordinate - rect.x),
          h: rect.h
        }
      };
      onSeparateRectHorizontally(args);
      currentPageRects.push(args.leftRect);
      rectsToSplit.push(args.rightRect);
    });
    if (horizontallyPages.length > 1) {
      verticallyPages.splice(pageIndex, 1, ...horizontallyPages);
      pageIndex += horizontallyPages.length;
    } else {
      pageIndex += 1;
    }
  }
  return verticallyPages.map(rects => rects.map(rect => _extends({}, rect.sourceCellInfo, {
    _rect: rect
  })));
}
function splitRectsByPages(rects, marginValue, coordinate, dimension, isFitToPage, onSeparateCallback, onSplitMultiPageRow) {
  const pages = [];
  const rectsToSplit = [...rects];
  const isFitToPageForMultiPageRow = (isFirstPage, rectHeight) => isFitToPage(isFirstPage, rectHeight + marginValue);
  while (rectsToSplit.length > 0) {
    let currentPageMaxRectCoordinate = 0;
    const currentPageRects = rectsToSplit.filter(rect => {
      const currentRectCoordinate = rect[coordinate] + rect[dimension];
      if (isFitToPage(pages.length === 0, currentRectCoordinate)) {
        if (currentPageMaxRectCoordinate <= currentRectCoordinate) {
          currentPageMaxRectCoordinate = currentRectCoordinate;
        }
        return true;
      }
      return false;
    });
    const isCurrentPageContainsOnlyHeader = checkPageContainsOnlyHeader(currentPageRects, pages.length === 0);
    const multiPageRowPages = getMultiPageRowPages(currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, onSplitMultiPageRow, isFitToPageForMultiPageRow);
    const rectsToSeparate = rectsToSplit.filter(rect => {
      // Check cells that have 'coordinate' less than 'currentPageMaxRectCoordinate'
      const currentRectLeft = rect[coordinate];
      const currentRectRight = rect[coordinate] + rect[dimension];
      return currentPageMaxRectCoordinate - currentRectLeft > COORDINATE_EPSILON && currentRectRight - currentPageMaxRectCoordinate > COORDINATE_EPSILON;
    });
    rectsToSeparate.forEach(rect => {
      onSeparateCallback(rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit);
      const index = rectsToSplit.indexOf(rect);
      if (index !== -1) {
        rectsToSplit.splice(index, 1);
      }
    });
    currentPageRects.forEach(rect => {
      const index = rectsToSplit.indexOf(rect);
      if (index !== -1) {
        rectsToSplit.splice(index, 1);
      }
    });
    rectsToSplit.forEach(rect => {
      rect[coordinate] = isDefined(currentPageMaxRectCoordinate) ? rect[coordinate] - currentPageMaxRectCoordinate + marginValue : rect[coordinate];
    });
    const firstPageContainsHeaderAndMultiPageRow = isCurrentPageContainsOnlyHeader && multiPageRowPages.length > 0;
    if (firstPageContainsHeaderAndMultiPageRow) {
      const [firstPage, ...restOfPages] = multiPageRowPages;
      pages.push([...currentPageRects, ...firstPage]);
      pages.push(...restOfPages);
    } else if (currentPageRects.length > 0) {
      pages.push(currentPageRects);
      pages.push(...multiPageRowPages);
    } else if (multiPageRowPages.length > 0) {
      pages.push(...multiPageRowPages);
      pages.push(rectsToSplit);
    } else {
      pages.push(rectsToSplit);
      break;
    }
  }
  return pages;
}
export { splitByPages };
