import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["startDayHour", "endDayHour"];
import { shiftIntervals } from '../../common/shift_intervals';
import { splitIntervalByDay } from '../../common/split_interval_by_days';
import { trimInterval } from '../../common/trim_interval';
import { getMinutesCellIntervals } from './get_minutes_cell_intervals';
export const getWeekIntervals = (compareOptions, cellDurationMinutes, viewOffset, isTimeline) => {
  const dateInterval = _objectWithoutPropertiesLoose(compareOptions, _excluded);
  const trimmedInterval = trimInterval(dateInterval);
  const splitIntervals = splitIntervalByDay(compareOptions);
  const intervals = isTimeline ? [trimmedInterval] : splitIntervals;
  const shiftedIntervals = shiftIntervals(intervals, viewOffset);
  const shiftedSplitIntervals = shiftIntervals(splitIntervals, viewOffset);
  const cells = getMinutesCellIntervals(Object.assign({}, compareOptions, {
    intervals,
    durationMinutes: cellDurationMinutes
  }));
  const shiftedCells = shiftIntervals(cells, viewOffset);
  return {
    cells: shiftedCells,
    dayIntervals: shiftedSplitIntervals,
    intervals: shiftedIntervals
  };
};