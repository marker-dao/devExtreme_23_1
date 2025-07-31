import dateUtils from '../../../../core/utils/date';
// TODO: wrong place for these functions - move it to root utils
export const getAppointmentTakesSeveralDays = dates => !dateUtils.sameDate(dates.startDate, dates.endDate);
export const sortAppointmentsByStartDate = (appointments, dataAccessors) => {
  appointments.sort((a, b) => {
    const firstDate = dataAccessors.get('startDate', a.settings || a);
    const secondDate = dataAccessors.get('startDate', b.settings || b);
    return Math.sign(firstDate.getTime() - secondDate.getTime());
  });
};