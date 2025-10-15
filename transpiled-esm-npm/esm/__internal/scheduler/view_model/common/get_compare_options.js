import timeZoneUtils from '../../m_utils_time_zone';
export const getCompareOptions = schedulerStore => {
  const workspace = schedulerStore.getWorkSpace();
  const dateRange = workspace.getDateRange();
  const compareOptions = {
    startDayHour: schedulerStore.getViewOption('startDayHour'),
    endDayHour: schedulerStore.getViewOption('endDayHour'),
    min: timeZoneUtils.createUTCDateWithLocalOffset(dateRange[0]).getTime(),
    max: timeZoneUtils.createUTCDateWithLocalOffset(dateRange[1]).getTime(),
    skippedDays: schedulerStore.currentView.skippedDays
  };
  return compareOptions;
};