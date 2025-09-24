/**
* DevExtreme (esm/__internal/scheduler/recurrence/days_from_by_day_rule.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { parseRecurrenceRule } from './base';
import { daysFromByDayRule } from './days_from_by_day_rule';
describe('daysFromByDayRule', () => {
  it('get days of the week by byDay rule', () => {
    const rule = parseRecurrenceRule('FREQ=WEEKLY;BYDAY=TU,SA');
    const days = daysFromByDayRule(rule);
    expect(days).toEqual(['TU', 'SA']);
  });
  it('get days of the week if byDay has frequence for day', () => {
    const rule = parseRecurrenceRule('FREQ=MONTHLY;BYDAY=1TU');
    const days = daysFromByDayRule(rule);
    expect(days).toEqual(['TU']);
  });
  it('get days of the week if byDay has frequence for day (2 values)', () => {
    const rule = parseRecurrenceRule('FREQ=MONTHLY;BYDAY=1TU,3FR');
    const days = daysFromByDayRule(rule);
    expect(days).toEqual(['TU', 'FR']);
  });
});
