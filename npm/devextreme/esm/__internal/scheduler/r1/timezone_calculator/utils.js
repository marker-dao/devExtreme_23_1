/**
* DevExtreme (esm/__internal/scheduler/r1/timezone_calculator/utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import timeZoneUtils from '../../m_utils_time_zone';
import { TimeZoneCalculator } from './calculator';
export const createTimeZoneCalculator = currentTimeZone => new TimeZoneCalculator({
  timeZone: currentTimeZone,
  getClientOffset: date => timeZoneUtils.getClientTimezoneOffset(date),
  tryGetCommonOffset: date => timeZoneUtils.calculateTimezoneByValue(currentTimeZone, date),
  tryGetAppointmentOffset: (date, appointmentTimezone) => timeZoneUtils.calculateTimezoneByValue(appointmentTimezone, date)
});
