/**
* DevExtreme (esm/__internal/scheduler/appointments/utils/m_utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
