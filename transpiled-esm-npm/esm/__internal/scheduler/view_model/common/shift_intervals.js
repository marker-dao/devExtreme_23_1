export const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => Object.assign({}, interval, {
  min: interval.min + viewOffset,
  max: interval.max + viewOffset
}));