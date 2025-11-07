"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCellText = void 0;
var _const = require("../ai_column/const");
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getCellText = (column, displayValue) => !column.command || column.type === _const.AI_COLUMN_NAME ? _m_utils.default.formatValue(displayValue, column) : '';
exports.getCellText = getCellText;