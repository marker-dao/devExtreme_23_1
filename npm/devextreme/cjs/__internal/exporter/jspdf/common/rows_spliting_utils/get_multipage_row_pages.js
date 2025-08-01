/**
* DevExtreme (cjs/__internal/exporter/jspdf/common/rows_spliting_utils/get_multipage_row_pages.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMultiPageRowPages = exports.checkPageContainsOnlyHeader = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable operator-assignment */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const isHeader = rect => (rect === null || rect === void 0 ? void 0 : rect.sourceCellInfo.gridCell.rowType) === 'header';
const spitMultiPageRows = (rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc) => {
  let [newPageRects, remainPageRects] = splitMultiPageRowFunc(isCurrentPageContainsOnlyHeader, rectsToPatch);
  const newPageRectsArray = [isCurrentPageContainsOnlyHeader ? newPageRects.map(rect => _extends({}, rect, {
    y: firstRectYAdjustment
  })) : newPageRects];
  while (!checkIsFitToPageFunc(false, remainPageRects[0].h)) {
    [newPageRects, remainPageRects] = splitMultiPageRowFunc(false, remainPageRects);
    newPageRectsArray.push(newPageRects);
  }
  return [newPageRectsArray, remainPageRects];
};
const patchRects = (rectsToSplit, rectsToPatch, remainPageRects) => {
  rectsToPatch.forEach((rect, rectIndex) => {
    rect.sourceCellInfo.text = remainPageRects[rectIndex].sourceCellInfo.text;
    rect.h = remainPageRects[rectIndex].h;
  });
  const untouchedRowIdx = rectsToSplit.indexOf(rectsToPatch[rectsToPatch.length - 1]) + 1;
  if (untouchedRowIdx >= rectsToSplit.length) {
    return;
  }
  const delta = rectsToSplit[untouchedRowIdx].y - (rectsToPatch[0].y + remainPageRects[0].h);
  for (let idx = untouchedRowIdx; idx < rectsToSplit.length; idx++) {
    rectsToSplit[idx].y = rectsToSplit[idx].y - delta;
  }
};
const checkPageContainsOnlyHeader = (pageRects, isFirstPage) => isFirstPage && isHeader(pageRects[pageRects.length - 1]);
exports.checkPageContainsOnlyHeader = checkPageContainsOnlyHeader;
const getMultiPageRowPages = (currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, splitMultiPageRowFunc, checkIsFitToPageFunc) => {
  if (!splitMultiPageRowFunc) {
    return [];
  }
  const currentPageLastRect = currentPageRects[currentPageRects.length - 1];
  const nextPageFirstRect = rectsToSplit[currentPageRects.length];
  if (!nextPageFirstRect || isHeader(nextPageFirstRect)) {
    return [];
  }
  const isRectsFitsToPage = checkIsFitToPageFunc(isCurrentPageContainsOnlyHeader, nextPageFirstRect.h);
  if (isRectsFitsToPage && !isCurrentPageContainsOnlyHeader) {
    return [];
  }
  const rectsToPatch = rectsToSplit.filter(_ref => {
    let {
      y
    } = _ref;
    return y === nextPageFirstRect.y;
  });
  const firstRectYAdjustment = currentPageLastRect.y + currentPageLastRect.h;
  const [multiPageRowPages, remainPageRects] = spitMultiPageRows(rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc);
  patchRects(rectsToSplit, rectsToPatch, remainPageRects);
  return multiPageRowPages;
};
exports.getMultiPageRowPages = getMultiPageRowPages;
