"use strict";

var _globals = require("@jest/globals");
var _base = require("./base");
var _days_from_by_day_rule = require("./days_from_by_day_rule");
(0, _globals.describe)('daysFromByDayRule', () => {
  (0, _globals.it)('get days of the week by byDay rule', () => {
    const rule = (0, _base.parseRecurrenceRule)('FREQ=WEEKLY;BYDAY=TU,SA');
    const days = (0, _days_from_by_day_rule.daysFromByDayRule)(rule);
    (0, _globals.expect)(days).toEqual(['TU', 'SA']);
  });
  (0, _globals.it)('get days of the week if byDay has frequence for day', () => {
    const rule = (0, _base.parseRecurrenceRule)('FREQ=MONTHLY;BYDAY=1TU');
    const days = (0, _days_from_by_day_rule.daysFromByDayRule)(rule);
    (0, _globals.expect)(days).toEqual(['TU']);
  });
  (0, _globals.it)('get days of the week if byDay has frequence for day (2 values)', () => {
    const rule = (0, _base.parseRecurrenceRule)('FREQ=MONTHLY;BYDAY=1TU,3FR');
    const days = (0, _days_from_by_day_rule.daysFromByDayRule)(rule);
    (0, _globals.expect)(days).toEqual(['TU', 'FR']);
  });
});