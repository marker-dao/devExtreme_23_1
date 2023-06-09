"use strict";

exports.toFixed = toFixed;
var _math = require("../core/utils/math");
var DECIMAL_BASE = 10;
function roundByAbs(value) {
  var valueSign = (0, _math.sign)(value);
  return valueSign * Math.round(Math.abs(value));
}
function adjustValue(value, precision) {
  var precisionMultiplier = Math.pow(DECIMAL_BASE, precision);
  var intermediateValue = (0, _math.multiplyInExponentialForm)(value, precision);
  return roundByAbs(intermediateValue) / precisionMultiplier;
}
function toFixed(value, precision) {
  var valuePrecision = precision || 0;
  var adjustedValue = valuePrecision > 0 ? adjustValue.apply(void 0, arguments) : value;
  return adjustedValue.toFixed(valuePrecision);
}