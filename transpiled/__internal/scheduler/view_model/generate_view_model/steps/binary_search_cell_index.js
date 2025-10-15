"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearchCellIndex = void 0;
const binarySearchCellIndex = (cells, targetDate) => {
  let left = 0;
  let right = cells.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const cell = cells[mid];
    if (targetDate >= cell.min && targetDate < cell.max) {
      return mid;
    }
    if (targetDate < cell.min) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return Math.min(left, cells.length - 1);
};
exports.binarySearchCellIndex = binarySearchCellIndex;