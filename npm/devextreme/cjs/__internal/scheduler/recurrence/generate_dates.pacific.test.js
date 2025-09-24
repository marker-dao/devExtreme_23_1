/**
* DevExtreme (cjs/__internal/scheduler/recurrence/generate_dates.pacific.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
