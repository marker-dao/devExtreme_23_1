import { dateUtilsTs } from '../../../../core/utils/date';
import { dateUtils } from '../../../../core/utils/m_date';
const toMs = dateUtils.dateToMilliseconds;
export const replaceIncorrectEndDate = (rawAppointments, appointmentMinDuration, dataAccessors) => {
  if (!rawAppointments) {
    return [];
  }
  return rawAppointments.reduce((result, rawAppointment) => {
    const startDate = dataAccessors.get('startDate', rawAppointment);
    const endDate = dataAccessors.get('endDate', rawAppointment);
    // NOTE: error E1032
    if (!dateUtilsTs.isValidDate(startDate)) {
      return result;
    }
    const isEndDateIncorrect = !dateUtilsTs.isValidDate(endDate) || startDate.getTime() > endDate.getTime();
    if (isEndDateIncorrect) {
      const isAllDay = dataAccessors.get('allDay', rawAppointment);
      const correctedEndDate = isAllDay ? dateUtils.setToDayEnd(new Date(startDate)) : new Date(startDate.getTime() + appointmentMinDuration * toMs('minute'));
      // TODO(4): fixme. serializationFormat auto-detection will not the same as in startDate
      dataAccessors.set('endDate', rawAppointment, correctedEndDate);
    }
    result.push(rawAppointment);
    return result;
  }, []);
};