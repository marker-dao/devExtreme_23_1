import timeZoneUtils from '../../m_utils_time_zone';
import { TimeZoneCalculator } from './calculator';
export const createTimeZoneCalculator = currentTimeZone => new TimeZoneCalculator({
  timeZone: currentTimeZone,
  getClientOffset: date => timeZoneUtils.getClientTimezoneOffset(date),
  tryGetCommonOffset: date => timeZoneUtils.calculateTimezoneByValue(currentTimeZone, date),
  tryGetAppointmentOffset: (date, appointmentTimezone) => timeZoneUtils.calculateTimezoneByValue(appointmentTimezone, date)
});