/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/options/get_one_day_cell_intervals.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { splitIntervalByDay } from '../../common/split_interval_by_days';
export const getOneDayCellIntervals = _ref => {
  let {
    intervals,
    startDayHour,
    endDayHour,
    skippedDays
  } = _ref;
  return intervals.reduce((result, interval, rowIndex) => {
    const cells = splitIntervalByDay(_extends({}, interval, {
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
