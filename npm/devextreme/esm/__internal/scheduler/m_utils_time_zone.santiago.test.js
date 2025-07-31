/**
* DevExtreme (esm/__internal/scheduler/m_utils_time_zone.santiago.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @timezone America/Santiago
 */
import { describe, expect, it } from '@jest/globals';
import timeZoneUtils from './m_utils_time_zone';
describe('isLocalTimeMidnightDST', () => {
  it('should return false for summer DST', () => {
    const date = new Date(2025, 3, 6);
    expect(timeZoneUtils.isLocalTimeMidnightDST(date)).toBe(false);
  });
  it('should return false for no DST', () => {
    const date = new Date(2025, 6, 1);
    expect(timeZoneUtils.isLocalTimeMidnightDST(date)).toBe(false);
  });
  it('should return true for winter DST', () => {
    const date = new Date(2025, 8, 7);
    expect(timeZoneUtils.isLocalTimeMidnightDST(date)).toBe(true);
  });
});
