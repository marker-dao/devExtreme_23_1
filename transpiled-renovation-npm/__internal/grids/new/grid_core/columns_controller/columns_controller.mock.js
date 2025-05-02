"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeColumn = normalizeColumn;
var _utils = require("./utils");
function normalizeColumn(column) {
  return (0, _utils.normalizeColumns)((0, _utils.preNormalizeColumns)([column]),
  // @ts-expect-error
  v => v)[0];
}