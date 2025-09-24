/**
* DevExtreme (cjs/__internal/scheduler/recurrence/validate_rule.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRRuleObject = exports.validateRRule = void 0;
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _m_iterator = require("../../core/utils/m_iterator");
var _base = require("./base");
var _days_from_by_day_rule = require("./days_from_by_day_rule");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

const loggedWarnings = [];
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
const wrongUntilRule = rule => {
  const {
    until
  } = rule;
  return until !== undefined && !(until instanceof Date);
};
const wrongCountRule = rule => {
  const {
    count
  } = rule;
  return Boolean(count && typeof count === 'string');
};
const wrongByMonthDayRule = rule => {
  const byMonthDay = rule.bymonthday;
  return Boolean(byMonthDay && isNaN(parseInt(byMonthDay, 10)));
};
const wrongByMonth = rule => {
  const byMonth = rule.bymonth;
  return Boolean(byMonth && isNaN(parseInt(byMonth, 10)));
};
const wrongIntervalRule = rule => {
  const {
    interval
  } = rule;
  return Boolean(interval && typeof interval === 'string');
};
const wrongDayOfWeek = rule => {
  const byDay = rule.byday;
  const daysByRule = (0, _days_from_by_day_rule.daysFromByDayRule)(rule);
  let brokenDaysExist = false;
  if (byDay === '') {
    brokenDaysExist = true;
  }
  (0, _m_iterator.each)(daysByRule, (_, day) => {
    if (!Object.prototype.hasOwnProperty.call(days, day)) {
      brokenDaysExist = true;
      return false;
    }
    return undefined;
  });
  return brokenDaysExist;
};
const brokenRuleNameExists = rule => {
  let brokenRuleExists = false;
  (0, _m_iterator.each)(rule, ruleName => {
    if (!ruleNames.includes(ruleName)) {
      brokenRuleExists = true;
      return false;
    }
    return undefined;
  });
  return brokenRuleExists;
};
const logBrokenRule = recurrence => {
  if (!loggedWarnings.includes(recurrence)) {
    _errors.default.log('W0006', recurrence);
    loggedWarnings.push(recurrence);
  }
};
const validateRRuleObject = (rule, recurrence) => {
  if (brokenRuleNameExists(rule) || !rule.freq || !freqNames.includes(rule.freq) || wrongCountRule(rule) || wrongIntervalRule(rule) || wrongDayOfWeek(rule) || wrongByMonthDayRule(rule) || wrongByMonth(rule) || wrongUntilRule(rule)) {
    logBrokenRule(recurrence);
    return false;
  }
  return true;
};
exports.validateRRuleObject = validateRRuleObject;
const validateRRule = ruleString => {
  if (!ruleString) {
    return false;
  }
  const rule = (0, _base.parseRecurrenceRule)(ruleString);
  const isValid = validateRRuleObject(rule, ruleString);
  return isValid;
};
exports.validateRRule = validateRRule;
