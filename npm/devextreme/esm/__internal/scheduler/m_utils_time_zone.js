/**
* DevExtreme (esm/__internal/scheduler/m_utils_time_zone.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// TODO(Refactoring): move this module to ./utils directory
import errors from '../../core/errors';
import { dateUtilsTs } from '../core/utils/date';
import { macroTaskArray } from '../scheduler/utils/index';
import dateUtils from '../../core/utils/date';
import { globalCache } from './global_cache';
import timeZoneList from './timezones/timezone_list';
const timeZoneListSet = new Set(timeZoneList.value);
const toMs = dateUtils.dateToMilliseconds;
const MINUTES_IN_HOUR = 60;
const MS_IN_MINUTE = 60000;
const GMT = 'GMT';
const offsetFormatRegexp = /^GMT(?:[+-]\d{2}:\d{2})?$/;
const createUTCDateWithLocalOffset = date => {
  if (!date) {
    return date;
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
const createDateFromUTCWithLocalOffset = date => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
const getTimezoneOffsetChangeInMinutes = (startDate, endDate, updatedStartDate, updatedEndDate) => getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate);
const getTimezoneOffsetChangeInMs = (startDate, endDate, updatedStartDate, updatedEndDate) => getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs('minute');
const getDaylightOffset = (startDate, endDate) => new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset();
const getDaylightOffsetInMs = (startDate, endDate) => getDaylightOffset(startDate, endDate) * toMs('minute');
const calculateTimezoneByValueCore = function (timeZone) {
  let date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  const offset = getStringOffset(timeZone, date);
  if (offset === undefined) {
    return undefined;
  }
  if (offset === GMT) {
    return 0;
  }
  const isMinus = offset.substring(3, 4) === '-';
  const hours = offset.substring(4, 6);
  const minutes = offset.substring(7, 9);
  const result = parseInt(hours, 10) + parseInt(minutes, 10) / MINUTES_IN_HOUR;
  return isMinus ? -result : result;
};
const calculateTimezoneByValue = function (timeZone) {
  let date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  if (!timeZone) {
    return undefined;
  }
  const isValidTimezone = timeZoneListSet.has(timeZone);
  if (!isValidTimezone) {
    errors.log('W0009', timeZone);
    return undefined;
  }
  const dateObj = new Date(date);
  if (!dateUtilsTs.isValidDate(dateObj)) {
    return undefined;
  }
  if (isEqualLocalTimeZone(timeZone)) {
    return -dateObj.getTimezoneOffset() / MINUTES_IN_HOUR;
  }
  return calculateTimezoneByValueCore(timeZone, dateObj);
};
// 'GMT±XX:YY' or 'GMT' format
const getStringOffset = function (timeZone) {
  let date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  let result = '';
  try {
    var _dateTimeFormat$forma;
    const dateTimeFormat = globalCache.timezones.memo(`intl${timeZone}`, () => new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset'
    }));
    result = ((_dateTimeFormat$forma = dateTimeFormat.formatToParts(date).find(_ref => {
      let {
        type
      } = _ref;
      return type === 'timeZoneName';
    })) === null || _dateTimeFormat$forma === void 0 ? void 0 : _dateTimeFormat$forma.value) ?? '';
  } catch (e) {
    errors.log('W0009', timeZone);
    return undefined;
  }
  const isSupportedFormat = offsetFormatRegexp.test(result);
  if (!isSupportedFormat) {
    errors.log('W0009', timeZone);
    return undefined;
  }
  return result;
};
const getOffsetNamePart = offset => {
  if (offset === GMT) {
    return `${offset} +00:00`;
  }
  return offset.replace(GMT, `${GMT} `);
};
const getTimezoneTitle = function (timeZone) {
  let date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  if (!dateUtilsTs.isValidDate(date)) {
    return '';
  }
  const tzNamePart = timeZone.replace(/\//g, ' - ').replace(/_/g, ' ');
  const offset = getStringOffset(timeZone, date);
  if (offset === undefined) {
    return undefined;
  }
  const offsetNamePart = getOffsetNamePart(offset);
  return `(${offsetNamePart}) ${tzNamePart}`;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const _getDaylightOffsetByTimezone = (startDate, endDate, timeZone) => {
  const startDayOffset = calculateTimezoneByValue(timeZone, startDate);
  const endDayOffset = calculateTimezoneByValue(timeZone, endDate);
  if (startDayOffset === undefined || endDayOffset === undefined) {
    return 0;
  }
  return startDayOffset - endDayOffset;
};
const getCorrectedDateByDaylightOffsets = (convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) => {
  const daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
  const daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
  const diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
  return new Date(date.getTime() - diff * toMs('hour'));
};
const correctRecurrenceExceptionByTimezone = (exception, exceptionByStartDate) => {
  const timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / MINUTES_IN_HOUR;
  return new Date(exception.getTime() + timezoneOffset * toMs('hour'));
};
const isTimezoneChangeInDate = date => {
  const startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  const endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
  return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0;
};
const getDateWithoutTimezoneChange = date => {
  const clonedDate = new Date(date);
  if (isTimezoneChangeInDate(clonedDate)) {
    const result = new Date(clonedDate);
    return new Date(result.setDate(result.getDate() + 1));
  }
  return clonedDate;
};
const isSameAppointmentDates = (startDate, endDate) => {
  // NOTE: subtract 1 millisecond to avoid 00.00 time. Method should return 'true' for "2020:10:10 22:00:00" and "2020:10:11 00:00:00", for example.
  endDate = new Date(endDate.getTime() - 1);
  return dateUtils.sameDate(startDate, endDate);
};
const getClientTimezoneOffset = function () {
  let date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return date.getTimezoneOffset() * MS_IN_MINUTE;
};
const getDiffBetweenClientTimezoneOffsets = function () {
  let firstDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  let secondDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  return getClientTimezoneOffset(firstDate) - getClientTimezoneOffset(secondDate);
};
const getMachineTimezoneName = () => globalCache.timezones.memo('localTimezone', () => dateUtils.getMachineTimezoneName());
const isEqualLocalTimeZone = timeZoneName => {
  const localTimeZoneName = getMachineTimezoneName();
  if (localTimeZoneName && localTimeZoneName === timeZoneName) {
    return true;
  }
  return false;
};
const addOffsetsWithoutDST = function (date) {
  for (var _len = arguments.length, offsets = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    offsets[_key - 1] = arguments[_key];
  }
  const newDate = dateUtilsTs.addOffsets(date, ...offsets);
  const daylightShift = getDaylightOffsetInMs(date, newDate);
  if (!daylightShift) {
    return newDate;
  }
  const correctLocalDate = dateUtilsTs.addOffsets(newDate, -daylightShift);
  const daylightSecondShift = getDaylightOffsetInMs(newDate, correctLocalDate);
  return !daylightSecondShift ? correctLocalDate : newDate;
};
const getTimeZones = function () {
  let date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  let timeZones = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : timeZoneList.value;
  return timeZones.map(timezoneId => ({
    id: timezoneId,
    title: getTimezoneTitle(timezoneId, date),
    offset: calculateTimezoneByValue(timezoneId, date)
  }));
};
const GET_TIMEZONES_BATCH_SIZE = 10;
const cacheTimeZones = async () => globalCache.timezones.memo('timeZonesCachePromise', () => macroTaskArray.map(timeZoneList.value, timezoneId => ({
  id: timezoneId,
  title: getTimezoneTitle(timezoneId, new Date())
}), GET_TIMEZONES_BATCH_SIZE).then(data => globalCache.timezones.memo('timeZonesCache', () => data)));
const getTimeZonesCache = () => globalCache.timezones.get('timeZonesCache') ?? [];
const isLocalTimeMidnightDST = date => {
  const startDayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return startDayDate.getHours() === 1;
};
const utils = {
  getDaylightOffset,
  getDaylightOffsetInMs,
  getTimezoneOffsetChangeInMinutes,
  getTimezoneOffsetChangeInMs,
  calculateTimezoneByValue,
  getCorrectedDateByDaylightOffsets,
  isSameAppointmentDates,
  correctRecurrenceExceptionByTimezone,
  getClientTimezoneOffset,
  getDiffBetweenClientTimezoneOffsets,
  createUTCDateWithLocalOffset,
  createDateFromUTCWithLocalOffset,
  isTimezoneChangeInDate,
  getDateWithoutTimezoneChange,
  getMachineTimezoneName,
  isEqualLocalTimeZone,
  addOffsetsWithoutDST,
  getTimeZones,
  getTimeZonesCache,
  cacheTimeZones,
  isLocalTimeMidnightDST
};
export default utils;
