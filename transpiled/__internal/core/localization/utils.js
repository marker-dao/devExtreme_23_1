"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFixed = toFixed;
var _m_math = require("../../core/utils/m_math");
const DECIMAL_BASE = 10;
function roundByAbs(value) {
  const valueSign = (0, _m_math.sign)(value);
  return valueSign * Math.round(Math.abs(value));
}
function adjustValue(value, precision) {
  const precisionMultiplier = DECIMAL_BASE ** precision;
  const intermediateValue = (0, _m_math.multiplyInExponentialForm)(value, precision);
  return roundByAbs(intermediateValue) / precisionMultiplier;
}
function toFixed(value, precision) {
  const valuePrecision = precision ?? 0;
  const adjustedValue = valuePrecision > 0 ? adjustValue(value, valuePrecision) : value;
  return adjustedValue.toFixed(valuePrecision);
}