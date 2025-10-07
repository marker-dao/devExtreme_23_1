/**
* DevExtreme (esm/__internal/scheduler/recurrence/generate_dates.pacific.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @timezone America/Los_Angeles
 */
import './generate_dates.test';
import { describe, expect, it } from '@jest/globals';
import { generateDates } from './generate_dates';
describe('generateDates', () => {
  it('Recurrence rule with UNTIL date in UTC format should apply correctly to local dates', () => {
    const dates = generateDates({
      rule: 'FREQ=DAILY;UNTIL=20210625T075959Z',
      start: new Date(2021, 5, 24, 1, 30),
      min: new Date(2021, 5, 20),
      max: new Date(2021, 5, 26),
      appointmentTimezoneOffset: 0
    });
    expect(dates).toEqual([new Date(2021, 5, 24, 1, 30)]);
  });
});
