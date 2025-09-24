export const isAppointmentMatchedIntervals = (_ref, intervals) => {
  let {
    startDate,
    endDate
  } = _ref;
  const intersectionIntervalIndex = intervals.findIndex(_ref2 => {
    let {
      max
    } = _ref2;
    return startDate < max;
  });
  if (intersectionIntervalIndex === -1) {
    return false;
  }
  const intervalStartDate = intervals[intersectionIntervalIndex].min;
  return startDate >= intervalStartDate || endDate > intervalStartDate;
};