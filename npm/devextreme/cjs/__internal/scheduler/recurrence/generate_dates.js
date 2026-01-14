/**
* DevExtreme (cjs/__internal/scheduler/recurrence/generate_dates.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDates = void 0;
var _date = require("../../core/utils/date");
var _rrule = require("rrule");
var _m_utils_time_zone = _interopRequireDefault(require("../m_utils_time_zone"));
var _base = require("./base");
var _validate_rule = require("./validate_rule");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  addOffsets
} = _date.dateUtilsTs;
const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;
const RRULE_BROKEN_TIMEZONES = ['Etc/GMT-13', 'MIT', 'Pacific/Apia', 'Pacific/Enderbury', 'Pacific/Tongatapu', 'Etc/GMT-14', 'Pacific/Kiritimati'];
const getRruleParams = options => {
  const {
    start,
    min,
    max,
    appointmentTimezoneOffset
  } = options;
  // NOTE: Get local timezone offset of each Rrule date params.
  const clientOffsets = {
    startDate: _m_utils_time_zone.default.getClientTimezoneOffset(start),
    minViewDate: _m_utils_time_zone.default.getClientTimezoneOffset(min),
    maxViewDate: _m_utils_time_zone.default.getClientTimezoneOffset(max)
  };
  const duration = options.end ? options.end.getTime() - options.start.getTime() : 0;
  // NOTE: Remove local timezone offsets from Rrule date params.
  const startIntervalDate = addOffsets(options.start, -clientOffsets.startDate, appointmentTimezoneOffset);
  const minViewTime = options.min.getTime() - clientOffsets.minViewDate + appointmentTimezoneOffset;
  // NOTE: Shift minViewDate, because recurrent appointment may start before start view date.
  const minViewDate = new Date(minViewTime - duration);
  const maxViewDate = addOffsets(options.max, -clientOffsets.maxViewDate, appointmentTimezoneOffset);
  // NOTE: Check DST after start date without local timezone offset conversion.
  const startDateDSTDifferenceMs = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(options.start, startIntervalDate);
  const switchToSummerTime = startDateDSTDifferenceMs < 0;
  return {
    startIntervalDate,
    minViewTime,
    minViewDate,
    maxViewDate,
    startIntervalDateDSTShift: switchToSummerTime ? 0 : startDateDSTDifferenceMs,
    appointmentDuration: duration
  };
};
const getLocalMachineOffset = rruleDate => {
  const machineTimezoneOffset = _m_utils_time_zone.default.getClientTimezoneOffset(rruleDate);
  const machineTimezoneName = _m_utils_time_zone.default.getMachineTimezoneName();
  const result = [machineTimezoneOffset];
  // NOTE: Workaround for the RRule bug with timezones greater than GMT+12
  // (e.g. Apia Standard Time GMT+13)
  // GitHub issue: https://github.com/jakubroztocil/rrule/issues/555
  // UPD: 05.09.2023 - The issue still hasn't been fixed in the Rule package.
  // RRule returns results that are one day greater than expected.
  // Therefore, for broken from RRule point of view timezones, we subtract one day from the result.
  const brokenTimezonesOffset = -13;
  const isTimezoneOffsetInBrokenRange = machineTimezoneOffset / MS_IN_HOUR <= brokenTimezonesOffset;
  const isTimezoneNameInBrokenNames = !machineTimezoneName || RRULE_BROKEN_TIMEZONES.some(timezone => machineTimezoneName.includes(timezone));
  if (isTimezoneOffsetInBrokenRange && isTimezoneNameInBrokenNames) {
    result.push(-MS_IN_DAY);
  }
  return result;
};
const convertRruleResult = (rruleIntervalParams, options, rruleDate) => {
  const convertedBackDate = addOffsets(rruleDate, ...getLocalMachineOffset(rruleDate), -options.appointmentTimezoneOffset, rruleIntervalParams.startIntervalDateDSTShift);
  const convertedDateDSTShift = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(convertedBackDate, rruleDate);
  const switchToSummerTime = convertedDateDSTShift < 0;
  const resultDate = addOffsets(convertedBackDate, convertedDateDSTShift);
  const resultDateDSTShift = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(resultDate, convertedBackDate);
  if (resultDateDSTShift && switchToSummerTime) {
    return new Date(resultDate.getTime() + resultDateDSTShift);
  }
  return resultDate;
};
const createRRule = (options, startDateUtc, until) => {
  const ruleOptions = _rrule.RRule.parseString(String(options.rule));
  const {
    firstDayOfWeek
  } = options;
  ruleOptions.dtstart = startDateUtc;
  if (!ruleOptions.wkst && firstDayOfWeek) {
    const weekDayNumbers = [6, 0, 1, 2, 3, 4, 5];
    ruleOptions.wkst = weekDayNumbers[firstDayOfWeek];
  }
  if (until) {
    ruleOptions.until = addOffsets(until, -_m_utils_time_zone.default.getClientTimezoneOffset(until), options.appointmentTimezoneOffset);
  }
  const rRuleSet = new _rrule.RRuleSet();
  const rRule = new _rrule.RRule(ruleOptions);
  rRuleSet.rrule(rRule);
  if (options.exception) {
    const exceptionStrings = options.exception;
    const exceptionDates = exceptionStrings.split(',').map(rule => (0, _base.getDateByAsciiString)(rule)).filter(Boolean);
    exceptionDates.forEach(date => {
      const rruleTimezoneOffsets = typeof options.getExceptionDateTimezoneOffsets === 'function' ? options.getExceptionDateTimezoneOffsets(date) : [-_m_utils_time_zone.default.getClientTimezoneOffset(date), options.appointmentTimezoneOffset];
      const exceptionDateInPseudoUtc = addOffsets(date, ...rruleTimezoneOffsets);
      rRuleSet.exdate(exceptionDateInPseudoUtc);
    });
  }
  return rRuleSet;
};
const generateDates = options => {
  if (!options.rule) {
    return [];
  }
  const rule = (0, _base.parseRecurrenceRule)(options.rule);
  const isValid = (0, _validate_rule.validateRRuleObject)(rule, options.rule);
  if (!isValid) {
    return [];
  }
  const rruleIntervalParams = getRruleParams(options);
  const {
    startIntervalDate,
    maxViewDate,
    minViewDate,
    minViewTime,
    appointmentDuration
  } = rruleIntervalParams;
  const rRuleSet = createRRule(options, startIntervalDate, rule.until);
  return rRuleSet.between(minViewDate, maxViewDate, true).filter(date => date.getTime() + appointmentDuration >= minViewTime).map(date => convertRruleResult(rruleIntervalParams, options, date));
};
exports.generateDates = generateDates;
