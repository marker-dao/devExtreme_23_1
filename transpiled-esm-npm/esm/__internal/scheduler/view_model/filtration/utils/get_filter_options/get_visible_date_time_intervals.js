import { splitIntervalByDay } from '../../../common/split_interval_by_days';
const mergeIntervalsWithoutGap = intervals => {
  if (intervals.length === 0) return [];
  return intervals.reduce((result, interval) => {
    const last = result[result.length - 1];
    if (last.max === interval.min) {
      last.max = interval.max;
      return result;
    }
    result.push(interval);
    return result;
  }, [{
    min: intervals[0].min,
    max: intervals[0].min
  }]);
};
export const getVisibleDateTimeIntervals = (_ref, isDateViewOnly) => {
  let {
    startDayHour,
    endDayHour,
    min,
    max,
    skippedDays
  } = _ref;
  if (isDateViewOnly || startDayHour === 0 && endDayHour === 24) {
    return mergeIntervalsWithoutGap(splitIntervalByDay({
      startDayHour: 0,
      endDayHour: 24,
      min,
      max,
      skippedDays
    }));
  }
  return splitIntervalByDay({
    startDayHour,
    endDayHour,
    min,
    max,
    skippedDays
  });
};