/**
* DevExtreme (cjs/__internal/scheduler/appointments/data_provider/utils/shift_intervals.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shiftIntervals = void 0;
var _date = require("../../../../core/utils/date");
const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => ({
  min: _date.dateUtilsTs.addOffsets(interval.min, [viewOffset]),
  max: _date.dateUtilsTs.addOffsets(interval.max, [viewOffset])
}));
exports.shiftIntervals = shiftIntervals;
