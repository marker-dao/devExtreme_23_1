/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/expand_all_day.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { dateUtils } from '../../../../core/utils/m_date';
const toMs = dateUtils.dateToMilliseconds;
const MINUTE_MS = toMs('minute');
const DAY_MS = toMs('day');
const getDayInterval = (date, viewOffsetMs) => {
  const trimmedDate = new Date(date).setUTCHours(0, 0, 0, 0);
  const startOfDay = trimmedDate + viewOffsetMs;
  const endOfDay = trimmedDate + DAY_MS + viewOffsetMs;
  return {
    min: startOfDay,
    max: endOfDay
  };
};
const getShiftedStartDate = (startDate, viewOffsetMs) => {
  const {
    min,
    max
  } = getDayInterval(startDate, viewOffsetMs);
  switch (true) {
    case startDate > max - MINUTE_MS:
      return max;
    case startDate < min:
      return min - DAY_MS;
    default:
      return min;
  }
};
const getShiftedEndDate = (endDate, viewOffsetMs) => {
  const {
    min,
    max
  } = getDayInterval(endDate, viewOffsetMs);
  switch (true) {
    case endDate >= max:
      return max + DAY_MS - MINUTE_MS;
    case endDate < min:
      return min - MINUTE_MS;
    default:
      return max - MINUTE_MS;
  }
};
// NOTE: if all day appointment ends at 00:00 make it longer to occupy next cells day
export const expandAllDayAllDayPanel = (entities, endDayHour, viewOffsetMs) => entities.map(entity => {
  if (!entity.allDay) {
    return entity;
  }
  if (viewOffsetMs === 0) {
    // NOTE: For case of start date higher than endDayHour:
    // (0 hours) [startHour, endHour] (appointment start, end) (24 hours)
    const minStartDate = new Date(entity.startDateUTC).setUTCHours(endDayHour, 0, 0, 0) - MINUTE_MS;
    const maxEndDate = new Date(entity.endDateUTC).setUTCHours(endDayHour, 0, 0, 0) - MINUTE_MS;
    return _extends({}, entity, {
      startDateUTC: Math.min(entity.startDateUTC, minStartDate),
      endDateUTC: maxEndDate
    });
  }
  return _extends({}, entity, {
    startDateUTC: getShiftedStartDate(entity.startDateUTC, viewOffsetMs),
    endDateUTC: getShiftedEndDate(entity.endDateUTC, viewOffsetMs)
  });
});
export const expandAllDayRegularPanel = entities => entities.map(entity => {
  if (!entity.allDay) {
    return entity;
  }
  const startDate = new Date(entity.startDateUTC);
  const endDate = new Date(entity.endDateUTC);
  endDate.setDate(endDate.getDate() + 1);
  return _extends({}, entity, {
    endDateUTC: endDate.setUTCHours(startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds(), startDate.getUTCMilliseconds())
  });
});
