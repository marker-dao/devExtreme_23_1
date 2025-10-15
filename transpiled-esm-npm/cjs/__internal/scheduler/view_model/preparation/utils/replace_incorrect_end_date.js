"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceIncorrectEndDate = void 0;
var _date = require("../../../../core/utils/date");
var _m_date = require("../../../../core/utils/m_date");
const toMs = _m_date.dateUtils.dateToMilliseconds;
const replaceIncorrectEndDate = (rawAppointments, appointmentMinDuration, dataAccessors) => {
  if (!rawAppointments) {
    return [];
  }
  return rawAppointments.reduce((result, rawAppointment) => {
    const startDate = dataAccessors.get('startDate', rawAppointment);
    const endDate = dataAccessors.get('endDate', rawAppointment);
    // NOTE: error E1032
    if (!_date.dateUtilsTs.isValidDate(startDate)) {
      return result;
    }
    const isEndDateIncorrect = !_date.dateUtilsTs.isValidDate(endDate) || startDate.getTime() > endDate.getTime();
    if (isEndDateIncorrect) {
      const isAllDay = dataAccessors.get('allDay', rawAppointment);
      const correctedEndDate = isAllDay ? _m_date.dateUtils.setToDayEnd(new Date(startDate)) : new Date(startDate.getTime() + appointmentMinDuration * toMs('minute'));
      // TODO(4): fixme. serializationFormat auto-detection will not the same as in startDate
      dataAccessors.set('endDate', rawAppointment, correctedEndDate);
    }
    result.push(rawAppointment);
    return result;
  }, []);
};
exports.replaceIncorrectEndDate = replaceIncorrectEndDate;