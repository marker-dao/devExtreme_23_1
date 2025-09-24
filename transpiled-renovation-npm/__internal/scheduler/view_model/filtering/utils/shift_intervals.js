"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shiftIntervals = void 0;
var _date = require("../../../../core/utils/date");
const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => ({
  min: _date.dateUtilsTs.addOffsets(interval.min, viewOffset),
  max: _date.dateUtilsTs.addOffsets(interval.max, viewOffset)
}));
exports.shiftIntervals = shiftIntervals;