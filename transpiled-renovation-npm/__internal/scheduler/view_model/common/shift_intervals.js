"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shiftIntervals = void 0;
const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => Object.assign({}, interval, {
  min: interval.min + viewOffset,
  max: interval.max + viewOffset
}));
exports.shiftIntervals = shiftIntervals;