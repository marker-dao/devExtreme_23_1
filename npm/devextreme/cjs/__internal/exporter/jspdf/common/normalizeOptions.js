/**
* DevExtreme (cjs/__internal/exporter/jspdf/common/normalizeOptions.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeBoundaryValue = normalizeBoundaryValue;
exports.normalizeRowsInfo = normalizeRowsInfo;
var _type = require("../../../../core/utils/type");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function normalizeBoundaryValue(value) {
  if ((0, _type.isNumeric)(value)) {
    return {
      top: value,
      right: value,
      bottom: value,
      left: value
    };
  }
  return {
    top: (value === null || value === void 0 ? void 0 : value.top) ?? 0,
    right: (value === null || value === void 0 ? void 0 : value.right) ?? 0,
    bottom: (value === null || value === void 0 ? void 0 : value.bottom) ?? 0,
    left: (value === null || value === void 0 ? void 0 : value.left) ?? 0
  };
}
function normalizeRowsInfo(rowsInfo) {
  rowsInfo.forEach(row => {
    row.cells.forEach(_ref => {
      let {
        pdfCell
      } = _ref;
      pdfCell.padding = normalizeBoundaryValue(pdfCell.padding);
    });
  });
}
