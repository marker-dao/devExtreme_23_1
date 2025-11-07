/**
* DevExtreme (cjs/__internal/scheduler/view_model/common/shift_intervals.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shiftIntervals = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => _extends({}, interval, {
  min: interval.min + viewOffset,
  max: interval.max + viewOffset
}));
exports.shiftIntervals = shiftIntervals;
