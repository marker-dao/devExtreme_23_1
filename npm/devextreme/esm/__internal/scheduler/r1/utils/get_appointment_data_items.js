/**
* DevExtreme (esm/__internal/scheduler/r1/utils/get_appointment_data_items.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../core/utils/type';
import { dateUtilsTs } from '../../../core/utils/date';
import { dateUtils } from '../../../core/utils/m_date';
import { AppointmentAdapter } from '../../utils/appointment_adapter/appointment_adapter';
const toMs = dateUtils.dateToMilliseconds;
export const replaceIncorrectEndDate = (rawAppointment, appointmentMinDuration, dataAccessors) => {
  const startDate = dataAccessors.get('startDate', rawAppointment);
  const endDate = dataAccessors.get('endDate', rawAppointment);
  // NOTE: error E1032
  if (!dateUtilsTs.isValidDate(startDate)) {
    return false;
  }
  const isEndDateIncorrect = !dateUtilsTs.isValidDate(endDate) || startDate.getTime() > endDate.getTime();
  if (isEndDateIncorrect) {
    const isAllDay = dataAccessors.get('allDay', rawAppointment);
    const correctedEndDate = isAllDay ? dateUtils.setToDayEnd(new Date(startDate)) : new Date(startDate.getTime() + appointmentMinDuration * toMs('minute'));
    // TODO(4): fixme. serializationFormat auto-detection will not the same as in startDate
    dataAccessors.set('endDate', rawAppointment, correctedEndDate);
  }
  return true;
};
export const getAppointmentDataItems = (dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) => {
  const result = [];
  dataItems === null || dataItems === void 0 || dataItems.forEach(rawAppointment => {
    const isAppointmentSafe = replaceIncorrectEndDate(rawAppointment, cellDurationInMinutes, dataAccessors);
    if (!isAppointmentSafe) {
      return;
    }
    const adapter = new AppointmentAdapter(rawAppointment, dataAccessors);
    const {
      startDate,
      endDate
    } = adapter.getCalculatedDates(timeZoneCalculator, 'toGrid');
    const {
      recurrenceRule
    } = adapter;
    const hasRecurrenceRule = adapter.isRecurrent;
    const visible = isDefined(rawAppointment.visible) ? Boolean(rawAppointment.visible) : true;
    result.push({
      allDay: Boolean(adapter.allDay),
      startDate,
      startDateTimeZone: rawAppointment.startDateTimeZone,
      endDate,
      endDateTimeZone: rawAppointment.endDateTimeZone,
      recurrenceRule,
      recurrenceException: adapter.recurrenceException,
      hasRecurrenceRule,
      visible,
      rawAppointment
    });
  });
  return result;
};
