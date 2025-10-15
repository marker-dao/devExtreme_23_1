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