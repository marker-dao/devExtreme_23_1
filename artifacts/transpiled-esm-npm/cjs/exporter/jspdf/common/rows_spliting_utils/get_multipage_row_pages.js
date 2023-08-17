"use strict";

exports.getMultiPageRowPages = exports.checkPageContainsOnlyHeader = void 0;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var isHeader = function isHeader(rect) {
  return (rect === null || rect === void 0 ? void 0 : rect.sourceCellInfo.gridCell.rowType) === 'header';
};
var spitMultiPageRows = function spitMultiPageRows(rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc) {
  var _splitMultiPageRowFun = splitMultiPageRowFunc(isCurrentPageContainsOnlyHeader, rectsToPatch),
    _splitMultiPageRowFun2 = _slicedToArray(_splitMultiPageRowFun, 2),
    newPageRects = _splitMultiPageRowFun2[0],
    remainPageRects = _splitMultiPageRowFun2[1];
  var newPageRectsArray = [isCurrentPageContainsOnlyHeader ? newPageRects.map(function (rect) {
    return _extends({}, rect, {
      y: firstRectYAdjustment
    });
  }) : newPageRects];
  while (!checkIsFitToPageFunc(false, remainPageRects[0].h)) {
    var _splitMultiPageRowFun3 = splitMultiPageRowFunc(false, remainPageRects);
    var _splitMultiPageRowFun4 = _slicedToArray(_splitMultiPageRowFun3, 2);
    newPageRects = _splitMultiPageRowFun4[0];
    remainPageRects = _splitMultiPageRowFun4[1];
    newPageRectsArray.push(newPageRects);
  }
  return [newPageRectsArray, remainPageRects];
};
var patchRects = function patchRects(rectsToSplit, rectsToPatch, remainPageRects) {
  rectsToPatch.forEach(function (rect, rectIndex) {
    rect.sourceCellInfo.text = remainPageRects[rectIndex].sourceCellInfo.text;
    rect.h = remainPageRects[rectIndex].h;
  });
  var untouchedRowIdx = rectsToSplit.indexOf(rectsToPatch[rectsToPatch.length - 1]) + 1;
  if (untouchedRowIdx >= rectsToSplit.length) {
    return;
  }
  var delta = rectsToSplit[untouchedRowIdx].y - (rectsToPatch[0].y + remainPageRects[0].h);
  for (var idx = untouchedRowIdx; idx < rectsToSplit.length; idx++) {
    rectsToSplit[idx].y = rectsToSplit[idx].y - delta;
  }
};
var checkPageContainsOnlyHeader = function checkPageContainsOnlyHeader(pageRects, isFirstPage) {
  return isFirstPage && isHeader(pageRects[pageRects.length - 1]);
};
exports.checkPageContainsOnlyHeader = checkPageContainsOnlyHeader;
var getMultiPageRowPages = function getMultiPageRowPages(currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, splitMultiPageRowFunc, checkIsFitToPageFunc) {
  if (!splitMultiPageRowFunc) {
    return [];
  }
  var currentPageLastRect = currentPageRects[currentPageRects.length - 1];
  var nextPageFirstRect = rectsToSplit[currentPageRects.length];
  if (!nextPageFirstRect || isHeader(nextPageFirstRect)) {
    return [];
  }
  var isRectsFitsToPage = checkIsFitToPageFunc(isCurrentPageContainsOnlyHeader, nextPageFirstRect.h);
  if (isRectsFitsToPage && !isCurrentPageContainsOnlyHeader) {
    return [];
  }
  var rectsToPatch = rectsToSplit.filter(function (_ref) {
    var y = _ref.y;
    return y === nextPageFirstRect.y;
  });
  var firstRectYAdjustment = currentPageLastRect.y + currentPageLastRect.h;
  var _spitMultiPageRows = spitMultiPageRows(rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc),
    _spitMultiPageRows2 = _slicedToArray(_spitMultiPageRows, 2),
    multiPageRowPages = _spitMultiPageRows2[0],
    remainPageRects = _spitMultiPageRows2[1];
  patchRects(rectsToSplit, rectsToPatch, remainPageRects);
  return multiPageRowPages;
};
exports.getMultiPageRowPages = getMultiPageRowPages;