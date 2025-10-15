/**
* DevExtreme (esm/__internal/scheduler/view_model/preparation/prepare_appointments.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
