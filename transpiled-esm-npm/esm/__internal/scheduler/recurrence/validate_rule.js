/* eslint-disable spellcheck/spell-checker */
import errors from '../../../core/errors';
import { each } from '../../core/utils/m_iterator';
import { parseRecurrenceRule } from './base';
import { daysFromByDayRule } from './days_from_by_day_rule';
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
  const daysByRule = daysFromByDayRule(rule);
  let brokenDaysExist = false;
  if (byDay === '') {
    brokenDaysExist = true;
  }
  each(daysByRule, (_, day) => {
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
  each(rule, ruleName => {
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
    errors.log('W0006', recurrence);
    loggedWarnings.push(recurrence);
  }
};
export const validateRRuleObject = (rule, recurrence) => {
  if (brokenRuleNameExists(rule) || !rule.freq || !freqNames.includes(rule.freq) || wrongCountRule(rule) || wrongIntervalRule(rule) || wrongDayOfWeek(rule) || wrongByMonthDayRule(rule) || wrongByMonth(rule) || wrongUntilRule(rule)) {
    logBrokenRule(recurrence);
    return false;
  }
  return true;
};
export const validateRRule = ruleString => {
  if (!ruleString) {
    return false;
  }
  const rule = parseRecurrenceRule(ruleString);
  const isValid = validateRRuleObject(rule, ruleString);
  return isValid;
};