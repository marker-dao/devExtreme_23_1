import { splitIntervalByDay } from '../../common/split_interval_by_days';
const filterBySkippedDays = (intervals, skippedDays) => intervals.filter(item => !skippedDays.includes(new Date(item.min).getUTCDay()));
export const getMinutesCellIntervals = _ref => {
  let {
    intervals,
    startDayHour,
    endDayHour,
    durationMinutes,
    skippedDays
  } = _ref;
  return intervals.reduce((result, interval, rowIndex) => {
    const dayIntervals = splitIntervalByDay(Object.assign({}, interval, {
      startDayHour,
      endDayHour,
      skippedDays
    }));
    let columnIndex = 0;
    filterBySkippedDays(dayIntervals, skippedDays).forEach(dayInterval => {
      const date = new Date(dayInterval.min);
      while (date.getTime() < dayInterval.max) {
        const min = date.getTime();
        let max = date.setUTCMinutes(date.getUTCMinutes() + durationMinutes);
        if (date.getUTCHours() > endDayHour) {
          date.setUTCDate(date.getUTCDate() + 1);
          date.setUTCHours(startDayHour, 0, 0, 0);
          max = date.getTime();
        }
        result.push({
          min,
          max,
          rowIndex,
          columnIndex,
          cellIndex: result.length
        });
        columnIndex += 1;
      }
    });
    return result;
  }, []);
};