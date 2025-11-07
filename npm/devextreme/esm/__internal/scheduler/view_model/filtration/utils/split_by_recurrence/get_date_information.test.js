/**
* DevExtreme (esm/__internal/scheduler/view_model/filtration/utils/split_by_recurrence/get_date_information.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterAll, describe, expect, it } from '@jest/globals';
import { globalCache } from '../../../../global_cache';
import { findDSTOfDay } from './get_date_information';
const HOUR_MS = 3600000;
describe('findDSTOfDay', () => {
  afterAll(() => {
    globalCache.DST.clear();
  });
  it('should return no DST if interval has no DST', () => {
    expect(findDSTOfDay(Date.UTC(2025, 0, 1), 'America/Santiago')).toEqual([-Date.UTC(2025, 0, 1), -3 * HOUR_MS, -3 * HOUR_MS]);
  });
  it('should return summer DST in America/Santiago', () => {
    expect(findDSTOfDay(Date.UTC(2025, 3, 6), 'America/Santiago')).toEqual([Date.UTC(2025, 3, 6, 3), -3 * HOUR_MS, -4 * HOUR_MS]);
  });
  it('should return winter DST in America/Santiago', () => {
    expect(findDSTOfDay(Date.UTC(2025, 8, 7), 'America/Santiago')).toEqual([Date.UTC(2025, 8, 7, 4), -4 * HOUR_MS, -3 * HOUR_MS]);
  });
  it('should return summer DST in Canada/Pacific', () => {
    expect(findDSTOfDay(Date.UTC(2025, 2, 9, 10), 'Canada/Pacific')).toEqual([Date.UTC(2025, 2, 9, 10), -8 * HOUR_MS, -7 * HOUR_MS]);
  });
  it('should return winter DST in Canada/Pacific', () => {
    expect(findDSTOfDay(Date.UTC(2025, 10, 2), 'Canada/Pacific')).toEqual([Date.UTC(2025, 10, 2, 2) + 7 * HOUR_MS, -7 * HOUR_MS, -8 * HOUR_MS]);
  });
});
