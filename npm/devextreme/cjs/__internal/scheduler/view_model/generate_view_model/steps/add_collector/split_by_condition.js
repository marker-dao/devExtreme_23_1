/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_collector/split_by_condition.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitByCondition = void 0;
const splitByCondition = (arr, condition) => {
  const result = [[], []];
  arr.forEach(item => {
    if (condition(item)) {
      result[0].push(item);
    } else {
      result[1].push(item);
    }
  });
  return result;
};
exports.splitByCondition = splitByCondition;
