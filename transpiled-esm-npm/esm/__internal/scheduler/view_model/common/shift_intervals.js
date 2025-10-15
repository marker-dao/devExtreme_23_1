import _extends from "@babel/runtime/helpers/esm/extends";
export const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => _extends({}, interval, {
  min: interval.min + viewOffset,
  max: interval.max + viewOffset
}));