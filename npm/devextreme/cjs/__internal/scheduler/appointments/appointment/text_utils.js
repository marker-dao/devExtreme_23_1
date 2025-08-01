/**
* DevExtreme (cjs/__internal/scheduler/appointments/appointment/text_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReducedIconTooltip = exports.getAriaLabel = exports.getAriaDescription = void 0;
var _date = _interopRequireDefault(require("../../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _type = require("../../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const localizeDate = date => `${_date.default.format(date, 'monthAndDay')}, ${_date.default.format(date, 'year')}`;
const localizeTime = date => `${_date.default.format(date, 'shorttime')}`;
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
  const allDayText = _message.default.format('dxScheduler-allDay');
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
  return (0, _type.isDefined)(partIndex) ? ` (${partIndex + 1}/${partTotalCount})` : '';
};
const getAriaLabel = options => {
  const name = options.dataAccessors.get('text', options.data) ?? '';
  const dates = getDateText(options);
  const parts = getPartsText(options);
  return `${name}: ${dates}${parts}`;
};
exports.getAriaLabel = getAriaLabel;
const getReducedIconTooltip = options => {
  const tooltipLabel = _message.default.format('dxScheduler-editorLabelEndDate');
  const endDateText = localizeDate(getDate(options, 'endDate'));
  return `${tooltipLabel}: ${endDateText}`;
};
exports.getReducedIconTooltip = getReducedIconTooltip;
const getGroupText = options => {
  if (!options.groupTexts.length) {
    return '';
  }
  const groupText = options.groupTexts.join(', ');
  // @ts-ignore @ts-expect-error
  return _message.default.format('dxScheduler-appointmentAriaLabel-group', groupText);
};
const getResourceText = async options => {
  const resourceManager = options.getResourceManager();
  const list = await resourceManager.getAppointmentResourcesValues(options.data);
  return list.map(item => `${item.label}: ${item.values.join(', ')}`);
};
const getAriaDescription = async options => {
  const resources = await getResourceText(options);
  const texts = [getGroupText(options), ...resources].filter(Boolean);
  return texts.join('; ');
};
exports.getAriaDescription = getAriaDescription;
