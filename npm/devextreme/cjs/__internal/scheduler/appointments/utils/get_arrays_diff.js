/**
* DevExtreme (cjs/__internal/scheduler/appointments/utils/get_arrays_diff.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArraysDiff = getArraysDiff;
exports.isNeedToRemove = exports.isNeedToAdd = void 0;
const isNeedToRemove = item => item.needToRemove;
exports.isNeedToRemove = isNeedToRemove;
const isNeedToAdd = item => item.needToAdd;
exports.isNeedToAdd = isNeedToAdd;
function getArraysDiff(a, b, equal) {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({
    length: n + 1
  }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i += 1) {
    const ai = a[i - 1];
    for (let j = 1; j <= m; j += 1) {
      dp[i][j] = equal(ai, b[j - 1]) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const result = [];
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    if (equal(a[i - 1], b[j - 1])) {
      result.push({
        item: b[j - 1]
      });
      i -= 1;
      j -= 1;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      result.push({
        item: a[i - 1],
        needToRemove: true
      });
      i -= 1;
    } else {
      result.push({
        item: b[j - 1],
        needToAdd: true
      });
      j -= 1;
    }
  }
  while (i > 0) {
    result.push({
      item: a[i - 1],
      needToRemove: true
    });
    i -= 1;
  }
  while (j > 0) {
    result.push({
      item: b[j - 1],
      needToAdd: true
    });
    j -= 1;
  }
  result.reverse();
  return result;
}
