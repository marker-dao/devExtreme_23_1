"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeekIntervals = void 0;
var _shift_intervals = require("../../common/shift_intervals");
var _split_interval_by_days = require("../../common/split_interval_by_days");
var _trim_interval = require("../../common/trim_interval");
var _get_minutes_cell_intervals = require("./get_minutes_cell_intervals");
const _excluded = ["startDayHour", "endDayHour"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const getWeekIntervals = (compareOptions, cellDurationMinutes, viewOffset, isTimeline) => {
  const dateInterval = _objectWithoutPropertiesLoose(compareOptions, _excluded);
  const trimmedInterval = (0, _trim_interval.trimInterval)(dateInterval);
  const splitIntervals = (0, _split_interval_by_days.splitIntervalByDay)(compareOptions);
  const intervals = isTimeline ? [trimmedInterval] : splitIntervals;
  const shiftedIntervals = (0, _shift_intervals.shiftIntervals)(intervals, viewOffset);
  const shiftedSplitIntervals = (0, _shift_intervals.shiftIntervals)(splitIntervals, viewOffset);
  const cells = (0, _get_minutes_cell_intervals.getMinutesCellIntervals)(_extends({}, compareOptions, {
    intervals,
    durationMinutes: cellDurationMinutes
  }));
  const shiftedCells = (0, _shift_intervals.shiftIntervals)(cells, viewOffset);
  return {
    cells: shiftedCells,
    dayIntervals: shiftedSplitIntervals,
    intervals: shiftedIntervals
  };
};
exports.getWeekIntervals = getWeekIntervals;