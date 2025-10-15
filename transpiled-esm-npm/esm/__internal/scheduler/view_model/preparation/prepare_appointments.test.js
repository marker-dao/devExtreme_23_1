import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import { mockAppointmentDataAccessor } from '../../../scheduler/__mock__/appointment_data_accessor.mock';
import { createTimeZoneCalculator } from '../../r1/timezone_calculator';
import { prepareAppointments } from './prepare_appointments';
const schedulerMock = {
  currentView: {
    type: 'agenda'
  },
  getViewOption: name => ({
    cellDuration: 30,
    allDayPanelMode: 'all'
  })[name],
  _dataAccessors: mockAppointmentDataAccessor,
  timeZoneCalculator: createTimeZoneCalculator('')
};
describe('prepareAppointments', () => {
  it('should return empty array if no dataItems', () => {
    let result = prepareAppointments(schedulerMock, undefined);
    expect(result).toEqual([]);
    result = prepareAppointments(schedulerMock, []);
    expect(result).toEqual([]);
  });
  it('should return empty array without startDate', () => {
    const data = [{
      endDate: new Date(2021, 9, 9)
    }];
    const result = prepareAppointments(schedulerMock, data);
    expect(result).toEqual([]);
  });
  it('should correct endDate value if it doesn\'t set', () => {
    const data = [{
      startDate: new Date(2021, 9, 9, 17)
    }];
    const expectedResult = {
      allDay: false,
      source: {
        startDate: data[0].startDate.getTime(),
        endDate: data[0].startDate.getTime() + 30 * 60000
      },
      hasRecurrenceRule: false,
      itemData: _extends({}, data[0], {
        endDate: new Date(2021, 9, 9, 17, 30)
      }),
      recurrenceException: undefined,
      recurrenceRule: undefined,
      visible: true,
      disabled: false
    };
    const result = prepareAppointments(schedulerMock, data);
    expect(result).toEqual([expectedResult]);
  });
});