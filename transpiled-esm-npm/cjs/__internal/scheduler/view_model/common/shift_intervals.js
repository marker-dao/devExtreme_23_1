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