/**
* DevExtreme (esm/__internal/scheduler/appointments/appointment/text_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../../common/core/localization/date';
import messageLocalization from '../../../../common/core/localization/message';
import { isDefined } from '../../../../core/utils/type';
const localizeDate = date => `${dateLocalization.format(date, 'monthAndDay')}, ${dateLocalization.format(date, 'year')}`;
const localizeTime = date => `${dateLocalization.format(date, 'shorttime')}`;
const getDate = (options, propName) => {
  var _options$timeZoneCalc;
  const result = options.dataAccessors.get(propName, options.data);
  if (!result) {
    return result;
  }
  const date = new Date(result);
  const gridDate = (_options$timeZoneCalc = options.timeZoneCalculator) === null || _options$timeZoneCalc === void 0 ? void 0 : _options$timeZoneCalc.createDate(date, 'toGrid');
  return gridDate ?? date;
};
const getDateText = options => {
  const startDate = getDate(options, 'startDate');
  const endDate = getDate(options, 'endDate');
  const startDateText = localizeDate(startDate);
  const endDateText = localizeDate(endDate);
  const startTimeText = localizeTime(startDate);
  const endTimeText = localizeTime(endDate);
  const isAllDay = options.dataAccessors.get('allDay', options.data);
  const allDayText = messageLocalization.format('dxScheduler-allDay');
  if (startDateText === endDateText) {
    return isAllDay ? `${startDateText}, ${allDayText}` : `${startDateText}, ${startTimeText} - ${endTimeText}`;
  }
  return isAllDay ? `${startDateText} - ${endDateText}, ${allDayText}` : `${startDateText}, ${startTimeText} - ${endDateText}, ${endTimeText}`;
};
const getPartsText = _ref => {
  let {
    partIndex,
    partTotalCount
  } = _ref;
  return isDefined(partIndex) ? ` (${partIndex + 1}/${partTotalCount})` : '';
};
export const getAriaLabel = options => {
  const name = options.dataAccessors.get('text', options.data) ?? '';
  const dates = getDateText(options);
  const parts = getPartsText(options);
  return `${name}: ${dates}${parts}`;
};
export const getReducedIconTooltip = options => {
  const tooltipLabel = messageLocalization.format('dxScheduler-editorLabelEndDate');
  const endDateText = localizeDate(getDate(options, 'endDate'));
  return `${tooltipLabel}: ${endDateText}`;
};
const getGroupText = options => {
  if (!options.groupTexts.length) {
    return '';
  }
  const groupText = options.groupTexts.join(', ');
  // @ts-ignore @ts-expect-error
  return messageLocalization.format('dxScheduler-appointmentAriaLabel-group', groupText);
};
const getResourceText = async options => {
  const resourceManager = options.getResourceManager();
  const list = await resourceManager.getAppointmentResourcesValues(options.data);
  return list.map(item => `${item.label}: ${item.values.join(', ')}`);
};
export const getAriaDescription = async options => {
  const resources = await getResourceText(options);
  const texts = [getGroupText(options), ...resources].filter(Boolean);
  return texts.join('; ');
};
