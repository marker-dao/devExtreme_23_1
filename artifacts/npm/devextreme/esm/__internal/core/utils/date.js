/**
* DevExtreme (esm/__internal/core/utils/date.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var addOffsets = (date, offsets) => {
  var newDateMs = offsets.reduce((result, offset) => result + offset, date.getTime());
  return new Date(newDateMs);
};
export var dateUtilsTs = {
  addOffsets
};