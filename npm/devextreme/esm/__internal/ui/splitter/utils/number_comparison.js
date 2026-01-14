/**
* DevExtreme (esm/__internal/ui/splitter/utils/number_comparison.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { toFixed } from '../../../../common/core/localization/utils';
export const PRECISION = 10;
export function compareNumbersWithPrecision(actual, expected) {
  let precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRECISION;
  const delta = parseFloat(toFixed(actual, precision)) - parseFloat(toFixed(expected, precision));
  if (delta === 0) {
    return 0;
  }
  return delta > 0 ? 1 : -1;
}
