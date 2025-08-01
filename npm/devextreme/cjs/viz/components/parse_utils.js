/**
* DevExtreme (cjs/viz/components/parse_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.correctValueType = correctValueType;
exports.getParser = void 0;
var _common = require("../../core/utils/common");
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _type = require("../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const parsers = {
  string: function (val) {
    return (0, _type.isDefined)(val) ? '' + val : val;
  },
  numeric: function (val) {
    if (!(0, _type.isDefined)(val)) {
      return val;
    }
    let parsedVal = Number(val);
    if (isNaN(parsedVal)) {
      parsedVal = undefined;
    }
    return parsedVal;
  },
  datetime: function (val) {
    if (!(0, _type.isDefined)(val)) {
      return val;
    }
    let parsedVal;
    const numVal = Number(val);
    if (!isNaN(numVal)) {
      parsedVal = new Date(numVal);
    } else {
      parsedVal = _date_serialization.default.deserializeDate(val);
    }
    if (isNaN(Number(parsedVal))) {
      parsedVal = undefined;
    }
    return parsedVal;
  }
};
function correctValueType(type) {
  return type === 'numeric' || type === 'datetime' || type === 'string' ? type : '';
}
const getParser = function (valueType) {
  return parsers[correctValueType(valueType)] || _common.noop;
};
exports.getParser = getParser;
