/**
* DevExtreme (esm/__internal/core/r1/utils/type_conversion.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function toNumber(attribute) {
  return attribute ? Number(attribute.replace('px', '')) : 0;
}
