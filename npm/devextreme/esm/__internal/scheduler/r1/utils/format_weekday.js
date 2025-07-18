/**
* DevExtreme (esm/__internal/scheduler/r1/utils/format_weekday.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../../common/core/localization/date';
export const formatWeekday = date => dateLocalization.getDayNames('abbreviated')[date.getDay()];
export const formatWeekdayAndDay = date => `${formatWeekday(date)} ${dateLocalization.format(date, 'day')}`;
