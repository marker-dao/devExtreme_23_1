"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneDayCellIntervals = void 0;
var _split_interval_by_days = require("../../common/split_interval_by_days");
const getOneDayCellIntervals = _ref => {
  let {
    intervals,
    startDayHour,
    endDayHour,
    skippedDays
  } = _ref;
  return intervals.reduce((result, interval, rowIndex) => {
    const cells = (0, _split_interval_by_days.splitIntervalByDay)(Object.assign({}, interval, {
      startDayHour,
      endDayHour,
      skippedDays
    }));
    let columnIndex = 0;
    cells.forEach(cell => {
      result.push({
        min: cell.min,
        max: cell.max,
        rowIndex,
        columnIndex,
        cellIndex: result.length
      });
      columnIndex += 1;
    });
    return result;
  }, []);
};
exports.getOneDayCellIntervals = getOneDayCellIntervals;