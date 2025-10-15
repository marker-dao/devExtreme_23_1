import timeZoneUtils from '../../m_utils_time_zone';
import { setOptionHour } from './base';
export const calculateStartViewDate = (currentDate, startDayHour) => {
  const validCurrentDate = new Date(currentDate);
  return setOptionHour(validCurrentDate, startDayHour);
};
const getDayStart = date => new Date(date).setUTCHours(0, 0, 0, 0);
export const calculateRows = (appointments, agendaDuration, currentDate, groupCount) => {
  const dayMs = getDayStart(timeZoneUtils.createUTCDateWithLocalOffset(currentDate));
  const intervalsStartMap = new Map();
  const result = Array.from({
    length: groupCount || 1
  }, () => new Array(agendaDuration).fill(0));
  for (let i = 0; i < agendaDuration; i += 1) {
    const day = new Date(dayMs);
    intervalsStartMap.set(day.setUTCDate(day.getUTCDate() + i), i);
  }
  appointments.forEach(appointment => {
    const appointmentStart = getDayStart(appointment.startDateUTC);
    const intervalIndex = intervalsStartMap.get(appointmentStart);
    if (intervalIndex !== undefined) {
      result[appointment.groupIndex][intervalIndex] += 1;
    }
  });
  return result;
};