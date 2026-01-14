import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["startDayHour", "endDayHour", "skippedDays"];
import { shiftIntervals } from '../../common/shift_intervals';
import { trimInterval } from '../../common/trim_interval';
import { getOneDayCellIntervals } from './get_one_day_cell_intervals';
const MONTH_INTERVAL_DAYS_COUNT = 7;
const splitBy7Days = intervals => {
  const result = [];
  const date = new Date(intervals.min);
  while (date.getTime() < intervals.max) {
    const min = date.getTime();
    date.setUTCDate(date.getUTCDate() + MONTH_INTERVAL_DAYS_COUNT);
    result.push({
      min,
      max: date.getTime()
    });
  }
  return result;
};
const cropIntervalsByDayHours = (intervals, startDayHour, endDayHour) => intervals.map(item => Object.assign({}, item, {
  min: new Date(item.min).setUTCHours(startDayHour, 0, 0, 0),
  max: new Date(item.max - 1).setUTCHours(endDayHour, 0, 0, 0)
}));
export const getMonthIntervals = (_ref, viewOffset, isTimeline) => {
  let {
      startDayHour,
      endDayHour,
      skippedDays
    } = _ref,
    dateInterval = _objectWithoutPropertiesLoose(_ref, _excluded);
  const trimmedInterval = trimInterval(dateInterval);
  const intervals = isTimeline ? [trimmedInterval] : splitBy7Days(trimmedInterval);
  const croppedIntervals = cropIntervalsByDayHours(intervals, startDayHour, endDayHour);
  const shiftedIntervals = shiftIntervals(croppedIntervals, viewOffset);
  const cells = getOneDayCellIntervals({
    intervals,
    startDayHour,
    endDayHour,
    skippedDays
  });
  const shiftedCells = shiftIntervals(cells, viewOffset);
  return {
    cells: shiftedCells,
    dayIntervals: shiftedCells,
    intervals: shiftedIntervals
  };
};