/**
* DevExtreme (esm/__internal/scheduler/a11y_status/a11y_status_text.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../common/core/localization/date';
import messageLocalization from '../../../common/core/localization/message';
const KEYS = {
  dateRange: 'dxScheduler-dateRange',
  label: 'dxScheduler-ariaLabel',
  indicatorPresent: 'dxScheduler-ariaLabel-currentIndicator-present',
  indicatorNotPresent: 'dxScheduler-ariaLabel-currentIndicator-not-present'
};
const viewTypeLocalization = {
  agenda: 'dxScheduler-switcherAgenda',
  day: 'dxScheduler-switcherDay',
  month: 'dxScheduler-switcherMonth',
  week: 'dxScheduler-switcherWeek',
  workWeek: 'dxScheduler-switcherWorkWeek',
  timelineDay: 'dxScheduler-switcherTimelineDay',
  timelineMonth: 'dxScheduler-switcherTimelineMonth',
  timelineWeek: 'dxScheduler-switcherTimelineWeek',
  timelineWorkWeek: 'dxScheduler-switcherTimelineWorkWeek'
};
const localizeMonth = date => String(dateLocalization.format(date, 'monthAndYear'));
const localizeDate = date => `${dateLocalization.format(date, 'monthAndDay')}, ${dateLocalization.format(date, 'year')}`;
const localizeCurrentIndicator = (date, startDate, endDate) => messageLocalization.format(date >= startDate && date < endDate ? KEYS.indicatorPresent : KEYS.indicatorNotPresent);
const localizeName = (viewName, viewType) => {
  if (viewName) {
    return viewName;
  }
  if (viewType) {
    return messageLocalization.format(viewTypeLocalization[viewType]);
  }
  return '';
};
export const getA11yStatusText = (view, startDate, endDate, appointmentCount, indicatorTime) => {
  const viewType = view === null || view === void 0 ? void 0 : view.type;
  const viewName = view === null || view === void 0 ? void 0 : view.name;
  const viewTypeLabel = localizeName(viewName, viewType);
  const isMonth = viewType === 'month' || viewType === 'timelineMonth';
  const startDateText = isMonth ? localizeMonth(startDate) : localizeDate(startDate);
  const endDateText = isMonth ? localizeMonth(endDate) : localizeDate(endDate);
  const intervalText = startDateText === endDateText ? `${startDateText}`
  // @ts-expect-error ts-error
  : messageLocalization.format(KEYS.dateRange, startDateText, endDateText);
  const statusText = messageLocalization
  // @ts-expect-error
  .format(KEYS.label, viewTypeLabel, intervalText, appointmentCount);
  if (indicatorTime) {
    const indicatorStatus = localizeCurrentIndicator(indicatorTime, startDate, endDate);
    return `${statusText}. ${indicatorStatus}`;
  }
  return statusText;
};
