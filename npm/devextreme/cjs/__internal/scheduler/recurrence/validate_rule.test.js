/**
* DevExtreme (cjs/__internal/scheduler/recurrence/validate_rule.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _base = require("./base");
var _validate_rule = require("./validate_rule");
(0, _globals.describe)('validateRRule', () => {
  (0, _globals.it)('should return true for valid rule', () => {
    const rule = 'FREQ=MONTHLY';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(true);
  });
  (0, _globals.it)('should return false for undefined rule', () => {
    const isValid = (0, _validate_rule.validateRRule)(undefined);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return false for incorrect freq', () => {
    const rule = 'FREQ=WRONG';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return false for wrong rule name', () => {
    const rule = 'FRE=DAILY';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return true and correct parsed rule for wrong count', () => {
    const rule = 'FREQ=DAILY;COUNT=wrong';
    const parsed = (0, _base.parseRecurrenceRule)(rule);
    const isValid = (0, _validate_rule.validateRRuleObject)(parsed, rule);
    (0, _globals.expect)(parsed).toEqual({
      freq: 'DAILY',
      interval: 1
    });
    (0, _globals.expect)(isValid).toBe(true);
  });
  (0, _globals.it)('should return true and correct parsed rule for wrong interval', () => {
    const rule = 'FREQ=DAILY;INTERVAL=wrong';
    const parsed = (0, _base.parseRecurrenceRule)(rule);
    const isValid = (0, _validate_rule.validateRRuleObject)(parsed, rule);
    (0, _globals.expect)(parsed).toEqual({
      freq: 'DAILY',
      interval: 1
    });
    (0, _globals.expect)(isValid).toBe(true);
  });
  (0, _globals.it)('should return false for wrong byDay', () => {
    const rule = 'FREQ=DAILY;BYDAY=wrong';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return false for empty byDay', () => {
    const rule = 'FREQ=DAILY;BYDAY=';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return false for wrong byDay, several value', () => {
    const rule = 'FREQ=DAILY;BYDAY=MO,wrong';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return false for wrong byMonthDay', () => {
    const rule = 'FREQ=MONTHLY;BYMONTHDAY=wrong';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return false for wrong byMonth', () => {
    const rule = 'FREQ=YEARLY;BYMONTH=wrong;BYMONTHDAY=12';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return false for wrong until date', () => {
    const rule = 'FREQ=DAILY;UNTIL=wrong';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(false);
  });
  (0, _globals.it)('should return true if byDay has frequence for day', () => {
    const rule = 'FREQ=MONTHLY;BYDAY=1TU';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(true);
  });
  (0, _globals.it)('should return true if byDay has frequence for day', () => {
    const rule = 'FREQ=MONTHLY;BYDAY=1TU,3FR';
    const isValid = (0, _validate_rule.validateRRule)(rule);
    (0, _globals.expect)(isValid).toBe(true);
  });
});
