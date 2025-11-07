/**
* DevExtreme (esm/__internal/scheduler/appointments/m_text_utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../common/core/localization/date';
import dateUtils from '../../../core/utils/date';
export var DateFormatType;
(function (DateFormatType) {
  DateFormatType["DATETIME"] = "DATETIME";
  DateFormatType["TIME"] = "TIME";
  DateFormatType["DATE"] = "DATE";
})(DateFormatType || (DateFormatType = {}));
export const createFormattedDateText = options => {
  const {
    startDate,
    endDate,
    allDay,
    format
  } = options;
  const formatType = format || getFormatType(startDate, endDate, allDay);
  return formatDates(startDate, endDate, formatType);
};
export const getFormatType = (startDate, endDate, isAllDay, isDateAndTimeView) => {
  if (isAllDay) {
    return DateFormatType.DATE;
  }
  if (isDateAndTimeView && dateUtils.sameDate(startDate, endDate)) {
    return DateFormatType.TIME;
  }
  return DateFormatType.DATETIME;
};
export const formatDates = (startDate, endDate, formatType) => {
  const dateFormat = 'monthandday';
  const timeFormat = 'shorttime';
  const isSameDate = startDate.getDate() === endDate.getDate();
  switch (formatType) {
    case DateFormatType.DATETIME:
      return [dateLocalization.format(startDate, dateFormat), ' ', dateLocalization.format(startDate, timeFormat), ' - ', isSameDate ? '' : `${dateLocalization.format(endDate, dateFormat)} `, dateLocalization.format(endDate, timeFormat)].join('');
    case DateFormatType.TIME:
      return `${dateLocalization.format(startDate, timeFormat)} - ${dateLocalization.format(endDate, timeFormat)}`;
    case DateFormatType.DATE:
      return `${dateLocalization.format(startDate, dateFormat)}${isSameDate ? '' : ` - ${dateLocalization.format(endDate, dateFormat)}`}`;
    default:
      return undefined;
  }
};
