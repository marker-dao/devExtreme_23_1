/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/options/get_one_day_cell_intervals.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
