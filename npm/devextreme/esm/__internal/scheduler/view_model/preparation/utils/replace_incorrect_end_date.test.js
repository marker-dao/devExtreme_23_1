/**
* DevExtreme (esm/__internal/scheduler/view_model/preparation/utils/replace_incorrect_end_date.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import { mockAppointmentDataAccessor } from '../../../../scheduler/__mock__/appointment_data_accessor.mock';
import { replaceIncorrectEndDate } from './replace_incorrect_end_date';
describe('replaceIncorrectEndDate', () => {
  it('should process endDate correctly', () => {
    const items = [{
      startDate: new Date(2019, 4, 3, 12),
      allDay: false
    }, {
      startDate: new Date(2019, 4, 3, 12),
      allDay: false,
      endDate: new Date('string')
    }, {
      startDate: new Date(2019, 4, 3, 12),
      allDay: true
    }, {
      startDate: new Date(2019, 4, 3, 12),
      endDate: new Date(2019, 4, 3, 13)
    }];
    const expectedEndDates = [new Date(2019, 4, 3, 12, 30), new Date(2019, 4, 3, 12, 30), new Date(2019, 4, 3, 23, 59, 59, 999)];
    expect(replaceIncorrectEndDate(items, 30, mockAppointmentDataAccessor)).toEqual([_extends({}, items[0], {
      endDate: expectedEndDates[0]
    }), _extends({}, items[1], {
      endDate: expectedEndDates[1]
    }), _extends({}, items[2], {
      endDate: expectedEndDates[2]
    }), items[3]]);
  });
  it('should return false for incorrect startDate', () => {
    const items = [{}, {
      startDate: 'Invalid date format'
    }];
    expect(replaceIncorrectEndDate(items, 30, mockAppointmentDataAccessor)).toEqual([]);
  });
});
