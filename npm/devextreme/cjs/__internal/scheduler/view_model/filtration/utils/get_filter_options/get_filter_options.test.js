/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/get_filter_options/get_filter_options.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchedulerMock = void 0;
var _globals = require("@jest/globals");
var _appointment_data_accessor = require("../../../../__mock__/appointment_data_accessor.mock");
var _resource_manager = require("../../../../utils/resource_manager/resource_manager");
var _get_filter_options = require("./get_filter_options");
const getSchedulerMock = _ref => {
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
    resourceManager: resourceManager ?? new _resource_manager.ResourceManager([]),
    _dataAccessors: _appointment_data_accessor.mockAppointmentDataAccessor
  };
};
exports.getSchedulerMock = getSchedulerMock;
(0, _globals.describe)('getFilterOptions', () => {
  ['agenda', 'month'].forEach(type => {
    (0, _globals.it)(`should return correct filter options for ${type} view`, () => {
      const schedulerStore = getSchedulerMock({
        type,
        startDayHour: 0,
        endDayHour: 24,
        offsetMinutes: 30
      });
      (0, _globals.expect)((0, _get_filter_options.getFilterOptions)(schedulerStore)).toEqual({
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
