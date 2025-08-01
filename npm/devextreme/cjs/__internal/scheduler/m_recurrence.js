/**
* DevExtreme (cjs/__internal/scheduler/m_recurrence.js)
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
exports.getRecurrenceProcessor = getRecurrenceProcessor;
var _errors = _interopRequireDefault(require("../../core/errors"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _iterator = require("../../core/utils/iterator");
var _rrule = require("rrule");
var _m_utils_time_zone = _interopRequireDefault(require("./m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file, spellcheck/spell-checker */

const toMs = _date.default.dateToMilliseconds;
const ruleNames = ['freq', 'interval', 'byday', 'byweekno', 'byyearday', 'bymonth', 'bymonthday', 'count', 'until', 'byhour', 'byminute', 'bysecond', 'bysetpos', 'wkst'];
const freqNames = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'SECONDLY', 'MINUTELY', 'HOURLY'];
const days = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6
};
const loggedWarnings = [];
const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;
const RRULE_BROKEN_TIMEZONES = ['Etc/GMT-13', 'MIT', 'Pacific/Apia', 'Pacific/Enderbury', 'Pacific/Tongatapu', 'Etc/GMT-14', 'Pacific/Kiritimati'];
let recurrence = null;
function getRecurrenceProcessor() {
  if (!recurrence) {
    recurrence = new RecurrenceProcessor();
  }
  return recurrence;
}
class RecurrenceProcessor {
  constructor() {
    this.rRule = null;
    this.rRuleSet = null;
    this.validator = new RecurrenceValidator();
  }
  generateDates(options) {
    const recurrenceRule = this.evalRecurrenceRule(options.rule);
    const {
      rule
    } = recurrenceRule;
    if (!recurrenceRule.isValid || !rule.freq) {
      return [];
    }
    const rruleIntervalParams = this._createRruleIntervalParams(options);
    this._initializeRRule(options, rruleIntervalParams.startIntervalDate, rule.until);
    return this.rRuleSet.between(rruleIntervalParams.minViewDate, rruleIntervalParams.maxViewDate, true).filter(date => date.getTime() + rruleIntervalParams.appointmentDuration >= rruleIntervalParams.minViewTime).map(date => this._convertRruleResult(rruleIntervalParams, options, date));
  }
  _createRruleIntervalParams(options) {
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
    const startIntervalDate = _m_utils_time_zone.default.setOffsetsToDate(options.start, [-clientOffsets.startDate, appointmentTimezoneOffset]);
    const minViewTime = options.min.getTime() - clientOffsets.minViewDate + appointmentTimezoneOffset;
    // NOTE: Shift minViewDate, because recurrent appointment may start before start view date.
    const minViewDate = new Date(minViewTime - duration);
    const maxViewDate = _m_utils_time_zone.default.setOffsetsToDate(options.max, [-clientOffsets.maxViewDate, appointmentTimezoneOffset]);
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
  }
  _convertRruleResult(rruleIntervalParams, options, rruleDate) {
    const convertedBackDate = _m_utils_time_zone.default.setOffsetsToDate(rruleDate, [...this._getLocalMachineOffset(rruleDate), -options.appointmentTimezoneOffset, rruleIntervalParams.startIntervalDateDSTShift]);
    const convertedDateDSTShift = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(convertedBackDate, rruleDate);
    const switchToSummerTime = convertedDateDSTShift < 0;
    const resultDate = _m_utils_time_zone.default.setOffsetsToDate(convertedBackDate, [convertedDateDSTShift]);
    const resultDateDSTShift = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(resultDate, convertedBackDate);
    if (resultDateDSTShift && switchToSummerTime) {
      return new Date(resultDate.getTime() + resultDateDSTShift);
    }
    return resultDate;
  }
  _getLocalMachineOffset(rruleDate) {
    const machineTimezoneOffset = _m_utils_time_zone.default.getClientTimezoneOffset(rruleDate);
    const machineTimezoneName = _m_utils_time_zone.default.getMachineTimezoneName();
    const result = [machineTimezoneOffset];
    // NOTE: Workaround for the RRule bug with timezones greater than GMT+12 (e.g. Apia Standard Time GMT+13)
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
  }
  hasRecurrence(options) {
    return !!this.generateDates(options).length;
  }
  evalRecurrenceRule(rule) {
    const result = {
      rule: {},
      isValid: false
    };
    if (rule) {
      result.rule = this._parseRecurrenceRule(rule);
      result.isValid = this.validator.validateRRule(result.rule, rule);
    }
    return result;
  }
  isValidRecurrenceRule(rule) {
    return this.evalRecurrenceRule(rule).isValid;
  }
  daysFromByDayRule(rule) {
    let result = [];
    if (rule.byday) {
      if (Array.isArray(rule.byday)) {
        result = rule.byday;
      } else {
        result = rule.byday.split(',');
      }
    }
    return result.map(item => {
      const match = item.match(/[A-Za-z]+/);
      return !!match && match[0];
    }).filter(item => !!item);
  }
  getAsciiStringByDate(date) {
    const currentOffset = date.getTimezoneOffset() * toMs('minute');
    const offsetDate = new Date(date.getTime() + currentOffset);
    return `${offsetDate.getFullYear() + `0${offsetDate.getMonth() + 1}`.slice(-2) + `0${offsetDate.getDate()}`.slice(-2)}T${`0${offsetDate.getHours()}`.slice(-2)}${`0${offsetDate.getMinutes()}`.slice(-2)}${`0${offsetDate.getSeconds()}`.slice(-2)}Z`;
  }
  getRecurrenceString(object) {
    if (!object || !object.freq) {
      return;
    }
    let result = '';
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const field in object) {
      let value = object[field];
      if (field === 'interval' && value < 2) {
        continue;
      }
      if (field === 'until') {
        value = this.getAsciiStringByDate(value);
      }
      result += `${field}=${value};`;
    }
    result = result.substring(0, result.length - 1);
    return result.toUpperCase();
  }
  _parseExceptionToRawArray(value) {
    return value.match(/(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/);
  }
  getDateByAsciiString(exceptionText) {
    if (typeof exceptionText !== 'string') {
      return exceptionText;
    }
    const result = this._parseExceptionToRawArray(exceptionText);
    if (!result) {
      return null;
    }
    const [year, month, date, hours, minutes, seconds, isUtc] = this._createDateTuple(result);
    if (isUtc) {
      return new Date(Date.UTC(year, month, date, hours, minutes, seconds));
    }
    return new Date(year, month, date, hours, minutes, seconds);
  }
  _dispose() {
    if (this.rRuleSet) {
      // @ts-expect-error
      delete this.rRuleSet;
      this.rRuleSet = null;
    }
    if (this.rRule) {
      // @ts-expect-error
      delete this.rRule;
      this.rRule = null;
    }
  }
  _getTimeZoneOffset() {
    return new Date().getTimezoneOffset();
  }
  _initializeRRule(options, startDateUtc, until) {
    const ruleOptions = _rrule.RRule.parseString(options.rule);
    const {
      firstDayOfWeek
    } = options;
    ruleOptions.dtstart = startDateUtc;
    if (!ruleOptions.wkst && firstDayOfWeek) {
      const weekDayNumbers = [6, 0, 1, 2, 3, 4, 5];
      ruleOptions.wkst = weekDayNumbers[firstDayOfWeek];
    }
    if (until) {
      ruleOptions.until = _m_utils_time_zone.default.setOffsetsToDate(until, [-_m_utils_time_zone.default.getClientTimezoneOffset(until), options.appointmentTimezoneOffset]);
    }
    this._createRRule(ruleOptions);
    if (options.exception) {
      const exceptionStrings = options.exception;
      const exceptionDates = exceptionStrings.split(',').map(rule => this.getDateByAsciiString(rule));
      exceptionDates.forEach(date => {
        const rruleTimezoneOffsets = typeof options.getExceptionDateTimezoneOffsets === 'function' ? options.getExceptionDateTimezoneOffsets(date) : [-_m_utils_time_zone.default.getClientTimezoneOffset(date), options.appointmentTimezoneOffset];
        const exceptionDateInPseudoUtc = _m_utils_time_zone.default.setOffsetsToDate(date, rruleTimezoneOffsets);
        this.rRuleSet.exdate(exceptionDateInPseudoUtc);
      });
    }
  }
  _createRRule(ruleOptions) {
    this._dispose();
    this.rRuleSet = new _rrule.RRuleSet();
    this.rRule = new _rrule.RRule(ruleOptions);
    this.rRuleSet.rrule(this.rRule);
  }
  _parseRecurrenceRule(recurrence) {
    const ruleObject = {};
    const ruleParts = recurrence.split(';');
    for (let i = 0, len = ruleParts.length; i < len; i++) {
      const rule = ruleParts[i].split('=');
      const ruleName = rule[0].toLowerCase();
      const ruleValue = rule[1];
      ruleObject[ruleName] = ruleValue;
    }
    // eslint-disable-next-line radix
    const count = parseInt(ruleObject.count);
    if (!isNaN(count)) {
      ruleObject.count = count;
    }
    if (ruleObject.interval) {
      // eslint-disable-next-line radix
      const interval = parseInt(ruleObject.interval);
      if (!isNaN(interval)) {
        ruleObject.interval = interval;
      }
    } else {
      ruleObject.interval = 1;
    }
    if (ruleObject.freq && ruleObject.until) {
      ruleObject.until = this.getDateByAsciiString(ruleObject.until);
    }
    return ruleObject;
  }
  _createDateTuple(parseResult) {
    const isUtc = parseResult[8] !== undefined;
    parseResult.shift();
    if (parseResult[3] === undefined) {
      parseResult.splice(3);
    } else {
      parseResult.splice(3, 1);
      parseResult.splice(6);
    }
    parseResult[1]--;
    parseResult.unshift(null);
    /* eslint-disable radix */
    return [parseInt(parseResult[1]), parseInt(parseResult[2]), parseInt(parseResult[3]), parseInt(parseResult[4]) || 0, parseInt(parseResult[5]) || 0, parseInt(parseResult[6]) || 0, isUtc];
    /* eslint-enable radix */
  }
}
class RecurrenceValidator {
  validateRRule(rule, recurrence) {
    if (this._brokenRuleNameExists(rule) || !freqNames.includes(rule.freq) || this._wrongCountRule(rule) || this._wrongIntervalRule(rule) || this._wrongDayOfWeek(rule) || this._wrongByMonthDayRule(rule) || this._wrongByMonth(rule) || this._wrongUntilRule(rule)) {
      this._logBrokenRule(recurrence);
      return false;
    }
    return true;
  }
  _wrongUntilRule(rule) {
    let wrongUntil = false;
    const {
      until
    } = rule;
    if (until !== undefined && !(until instanceof Date)) {
      wrongUntil = true;
    }
    return wrongUntil;
  }
  _wrongCountRule(rule) {
    let wrongCount = false;
    const {
      count
    } = rule;
    if (count && typeof count === 'string') {
      wrongCount = true;
    }
    return wrongCount;
  }
  _wrongByMonthDayRule(rule) {
    let wrongByMonthDay = false;
    const byMonthDay = rule.bymonthday;
    // eslint-disable-next-line radix
    if (byMonthDay && isNaN(parseInt(byMonthDay))) {
      wrongByMonthDay = true;
    }
    return wrongByMonthDay;
  }
  _wrongByMonth(rule) {
    let wrongByMonth = false;
    const byMonth = rule.bymonth;
    // eslint-disable-next-line radix
    if (byMonth && isNaN(parseInt(byMonth))) {
      wrongByMonth = true;
    }
    return wrongByMonth;
  }
  _wrongIntervalRule(rule) {
    let wrongInterval = false;
    const {
      interval
    } = rule;
    if (interval && typeof interval === 'string') {
      wrongInterval = true;
    }
    return wrongInterval;
  }
  _wrongDayOfWeek(rule) {
    const byDay = rule.byday;
    const daysByRule = getRecurrenceProcessor().daysFromByDayRule(rule);
    let brokenDaysExist = false;
    if (byDay === '') {
      brokenDaysExist = true;
    }
    (0, _iterator.each)(daysByRule, (_, day) => {
      if (!Object.prototype.hasOwnProperty.call(days, day)) {
        brokenDaysExist = true;
        return false;
      }
      return undefined;
    });
    return brokenDaysExist;
  }
  _brokenRuleNameExists(rule) {
    let brokenRuleExists = false;
    (0, _iterator.each)(rule, ruleName => {
      if (!ruleNames.includes(ruleName)) {
        brokenRuleExists = true;
        return false;
      }
      return undefined;
    });
    return brokenRuleExists;
  }
  _logBrokenRule(recurrence) {
    if (!loggedWarnings.includes(recurrence)) {
      _errors.default.log('W0006', recurrence);
      loggedWarnings.push(recurrence);
    }
  }
}
