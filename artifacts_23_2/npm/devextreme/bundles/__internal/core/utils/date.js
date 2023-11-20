/**
* DevExtreme (bundles/__internal/core/utils/date.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateUtilsTs = void 0;
// TODO Vinogradov: Refactor offsets: number[] -> ...offsets: number[]
const addOffsets = (date, offsets) => {
  const newDateMs = offsets.reduce((result, offset) => result + offset, date.getTime());
  return new Date(newDateMs);
};
const dateUtilsTs = {
  addOffsets
};
exports.dateUtilsTs = dateUtilsTs;
