"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceIncorrectEndDate = exports.getAppointmentDataItems = void 0;
var _type = require("../../../../core/utils/type");
var _date = require("../../../core/utils/date");
var _m_date = require("../../../core/utils/m_date");
var _appointment_adapter = require("../../utils/appointment_adapter/appointment_adapter");
const toMs = _m_date.dateUtils.dateToMilliseconds;
const replaceIncorrectEndDate = (rawAppointment, appointmentMinDuration, dataAccessors) => {
  const startDate = dataAccessors.get('startDate', rawAppointment);
  const endDate = dataAccessors.get('endDate', rawAppointment);
  // NOTE: error E1032
  if (!_date.dateUtilsTs.isValidDate(startDate)) {
    return false;
  }
  const isEndDateIncorrect = !_date.dateUtilsTs.isValidDate(endDate) || startDate.getTime() > endDate.getTime();
  if (isEndDateIncorrect) {
    const isAllDay = dataAccessors.get('allDay', rawAppointment);
    const correctedEndDate = isAllDay ? _m_date.dateUtils.setToDayEnd(new Date(startDate)) : new Date(startDate.getTime() + appointmentMinDuration * toMs('minute'));
    // TODO(4): fixme. serializationFormat auto-detection will not the same as in startDate
    dataAccessors.set('endDate', rawAppointment, correctedEndDate);
  }
  return true;
};
exports.replaceIncorrectEndDate = replaceIncorrectEndDate;
const getAppointmentDataItems = (dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) => {
  const result = [];
  dataItems === null || dataItems === void 0 || dataItems.forEach(rawAppointment => {
    const isAppointmentSafe = replaceIncorrectEndDate(rawAppointment, cellDurationInMinutes, dataAccessors);
    if (!isAppointmentSafe) {
      return;
    }
    const adapter = new _appointment_adapter.AppointmentAdapter(rawAppointment, dataAccessors);
    const {
      startDate,
      endDate
    } = adapter.getCalculatedDates(timeZoneCalculator, 'toGrid');
    const {
      recurrenceRule
    } = adapter;
    const hasRecurrenceRule = adapter.isRecurrent;
    const visible = (0, _type.isDefined)(rawAppointment.visible) ? Boolean(rawAppointment.visible) : true;
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
exports.getAppointmentDataItems = getAppointmentDataItems;