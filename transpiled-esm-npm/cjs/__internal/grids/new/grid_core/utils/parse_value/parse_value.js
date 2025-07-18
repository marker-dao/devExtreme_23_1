"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseValue = exports.parseNumberValue = exports.parseDateValue = exports.parseBooleanValue = void 0;
var _date = _interopRequireDefault(require("../../../../../../common/core/localization/date"));
var _type = require("../../../../../../core/utils/type");
var _m_columns_controller_utils = require("../../../../../grids/grid_core/columns_controller/m_columns_controller_utils");
var _m_utils = _interopRequireDefault(require("../../../../../grids/grid_core/m_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const parseNumberValue = (text, format) => {
  switch (true) {
    case (0, _type.isString)(text) && !!format:
      return (0, _m_columns_controller_utils.strictParseNumber)(text.trim(), format);
    case (0, _type.isDefined)(text) && (0, _type.isNumeric)(text):
      return Number(text);
    default:
      return undefined;
  }
};
exports.parseNumberValue = parseNumberValue;
const parseBooleanValue = (text, trueText, falseText) => {
  switch (true) {
    case text === trueText:
      return true;
    case text === falseText:
      return false;
    default:
      return undefined;
  }
};
exports.parseBooleanValue = parseBooleanValue;
const parseDateValue = (text, format) => {
  let parsedValue = null;
  if (format) {
    try {
      // @ts-expect-error
      parsedValue = _date.default.parse(text, format);
    } catch {
      parsedValue = null;
    }
  }
  if (!parsedValue) {
    parsedValue = new Date(text);
  }
  return isNaN(parsedValue.getTime()) ? text : parsedValue;
};
exports.parseDateValue = parseDateValue;
const parseValue = (column, text) => {
  switch (true) {
    case column.dataType === 'number':
      return parseNumberValue(text, column.format);
    case column.dataType === 'boolean':
      return parseBooleanValue(text, column.trueText, column.falseText);
    case _m_utils.default.isDateType(column.dataType):
      return parseDateValue(text, column.format);
    default:
      return text;
  }
};
exports.parseValue = parseValue;