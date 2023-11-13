/**
* DevExtreme (esm/renovation/utils/type_conversion.js)
* Version: 23.2.2
* Build date: Mon Nov 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function toNumber(attribute) {
  return attribute ? Number(attribute.replace('px', '')) : 0;
}
