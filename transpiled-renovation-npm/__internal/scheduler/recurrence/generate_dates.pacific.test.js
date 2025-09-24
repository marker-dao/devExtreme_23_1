"use strict";

require("./generate_dates.test");
var _globals = require("@jest/globals");
var _generate_dates2 = require("./generate_dates");
/**
 * @timezone America/Los_Angeles
 */

(0, _globals.describe)('generateDates', () => {
  (0, _globals.it)('Recurrence rule with UNTIL date in UTC format should apply correctly to local dates', () => {
    const dates = (0, _generate_dates2.generateDates)({
      rule: 'FREQ=DAILY;UNTIL=20210625T075959Z',
      start: new Date(2021, 5, 24, 1, 30),
      min: new Date(2021, 5, 20),
      max: new Date(2021, 5, 26),
      appointmentTimezoneOffset: 0
    });
    (0, _globals.expect)(dates).toEqual([new Date(2021, 5, 24, 1, 30)]);
  });
});