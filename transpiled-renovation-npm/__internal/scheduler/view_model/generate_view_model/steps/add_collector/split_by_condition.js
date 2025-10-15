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