import { getMinimalAppointments } from './utils/get_minimal_appointments';
import { replaceIncorrectEndDate } from './utils/replace_incorrect_end_date';
export const prepareAppointments = (schedulerStore, items) => {
  const cellDurationInMinutes = schedulerStore.getViewOption('cellDuration');
  const dataAccessors = schedulerStore._dataAccessors;
  const safeItems = replaceIncorrectEndDate(items, cellDurationInMinutes, dataAccessors);
  return getMinimalAppointments(safeItems, {
    dataAccessors,
    timeZoneCalculator: schedulerStore.timeZoneCalculator
  });
};