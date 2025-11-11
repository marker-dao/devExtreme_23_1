/**
* DevExtreme (esm/__internal/scheduler/view_model/filtration/utils/get_filter_options/get_filter_options.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { mockAppointmentDataAccessor } from '../../../../__mock__/appointment_data_accessor.mock';
import { ResourceManager } from '../../../../utils/resource_manager/resource_manager';
import { getFilterOptions } from './get_filter_options';
export const getSchedulerMock = _ref => {
  let {
    type,
    startDayHour,
    endDayHour,
    offsetMinutes,
    resourceManager,
    dateRange
  } = _ref;
  return {
    currentView: {
      type,
      skippedDays: []
    },
    getWorkSpace: () => ({
      getDateRange: () => dateRange ?? [new Date(2000, 0, 10, startDayHour), new Date(2000, 0, 11, endDayHour)]
    }),
    getTimeZone: () => 'Etc/UTC',
    getViewOption: name => ({
      startDayHour,
      endDayHour,
      allDayPanelMode: 'allDay'
    })[name],
    option: name => ({
      firstDayOfWeek: 0,
      showAllDayPanel: true
    })[name],
    getViewOffsetMs: () => offsetMinutes * 60000,
    resourceManager: resourceManager ?? new ResourceManager([]),
    _dataAccessors: mockAppointmentDataAccessor
  };
};
describe('getFilterOptions', () => {
  ['agenda', 'month'].forEach(type => {
    it(`should return correct filter options for ${type} view`, () => {
      const schedulerStore = getSchedulerMock({
        type,
        startDayHour: 0,
        endDayHour: 24,
        offsetMinutes: 30
      });
      expect(getFilterOptions(schedulerStore)).toEqual({
        allDayPanelMode: 'allDay',
        showAllDayPanel: true,
        supportAllDayPanel: false,
        isDateTimeView: false,
        resourceManager: schedulerStore.resourceManager,
        dataAccessor: schedulerStore._dataAccessors,
        timeZone: 'Etc/UTC',
        viewOffset: 30 * 60000,
        firstDayOfWeek: 0,
        allDayIntervals: [{
          min: Date.UTC(2000, 0, 10, 0, 30),
          max: Date.UTC(2000, 0, 12, 0, 30)
        }],
        regularIntervals: [{
          min: Date.UTC(2000, 0, 10, 0, 30),
          max: Date.UTC(2000, 0, 12, 0, 30)
        }]
      });
    });
  });
});
