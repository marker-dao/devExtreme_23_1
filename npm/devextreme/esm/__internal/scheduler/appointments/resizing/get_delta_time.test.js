/**
* DevExtreme (esm/__internal/scheduler/appointments/resizing/get_delta_time.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { VIEW_TYPES } from '../../utils/options/constants_view';
import { getDeltaTime } from './get_delta_time';
describe('getDeltaTime', () => {
  VIEW_TYPES.forEach(view => {
    it(`should return zero for not resized appointment in ${view} view`, () => {
      expect(getDeltaTime({
        width: 100,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: true
      })).toBe(0);
    });
  });
  ['day', 'week', 'workWeek'].forEach(view => {
    it(`should return correct delta in px for resized appointment in vertical ${view} view`, () => {
      expect(getDeltaTime({
        width: 100,
        height: 50
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: false
      })).toBe(-30 * 60000);
    });
    it(`should return correct delta in px for resized all day appointment in vertical ${view} view`, () => {
      expect(getDeltaTime({
        width: 50,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: true
      })).toBe(-24 * 3600000);
    });
  });
  ['timelineMonth', 'month'].forEach(view => {
    it(`should return correct delta in px for resized appointment in ${view} view`, () => {
      expect(getDeltaTime({
        width: 50,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: false
      })).toBe(-24 * 3600000);
    });
  });
  ['timelineDay', 'timelineWeek', 'timelineWorkWeek'].forEach(view => {
    it(`should return zero for not resized appointment in horizontal ${view} view`, () => {
      expect(getDeltaTime({
        width: 50,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: false
      })).toBe(-30 * 60000);
    });
  });
});
