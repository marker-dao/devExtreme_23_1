/**
* DevExtreme (esm/common/core/localization/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { sign, multiplyInExponentialForm } from '../../../core/utils/math';
const DECIMAL_BASE = 10;
function roundByAbs(value) {
  const valueSign = sign(value);
  return valueSign * Math.round(Math.abs(value));
}
function adjustValue(value, precision) {
  const precisionMultiplier = Math.pow(DECIMAL_BASE, precision);
  const intermediateValue = multiplyInExponentialForm(value, precision);
  return roundByAbs(intermediateValue) / precisionMultiplier;
}
export function toFixed(value, precision) {
  const valuePrecision = precision || 0;
  const adjustedValue = valuePrecision > 0 ? adjustValue(...arguments) : value;
  return adjustedValue.toFixed(valuePrecision);
}
