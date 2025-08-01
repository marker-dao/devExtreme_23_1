/**
* DevExtreme (cjs/__internal/scheduler/appointments/appointment/text_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _appointment_data_accessor = require("../../../scheduler/__mock__/appointment_data_accessor.mock");
var _timezone_calculator = require("../../../scheduler/__mock__/timezone_calculator.mock");
var _text_utils = require("./text_utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getAppointmentResourcesValues = _globals.jest.fn();
const options = {
  dataAccessors: _appointment_data_accessor.mockAppointmentDataAccessor,
  timeZoneCalculator: _timezone_calculator.mockTimeZoneCalculator,
  getResourceManager: () => ({
    getAppointmentResourcesValues
  })
};
(0, _globals.describe)('Appointment text utils', () => {
  (0, _globals.describe)('getAriaLabel', () => {
    (0, _globals.it)('should return text for all day appointment', () => {
      (0, _globals.expect)((0, _text_utils.getAriaLabel)(_extends({}, options, {
        data: {
          allDay: true,
          text: 'Appointment name',
          startDate: Date.UTC(2025, 2, 10, 10),
          endDate: Date.UTC(2025, 2, 10, 10, 30)
        }
      }))).toBe('Appointment name: March 10, 2025, All day');
    });
    (0, _globals.it)('should return text for one day appointment', () => {
      (0, _globals.expect)((0, _text_utils.getAriaLabel)(_extends({}, options, {
        data: {
          text: 'Appointment name',
          startDate: Date.UTC(2025, 2, 10, 10),
          endDate: Date.UTC(2025, 2, 10, 10, 30)
        }
      }))).toBe('Appointment name: March 10, 2025, 10:00 AM - 10:30 AM');
    });
    (0, _globals.it)('should return text for a part of long appointment', () => {
      (0, _globals.expect)((0, _text_utils.getAriaLabel)(_extends({}, options, {
        data: {
          text: 'Appointment name',
          startDate: Date.UTC(2025, 2, 10, 10),
          endDate: Date.UTC(2025, 2, 11, 10, 30)
        },
        partIndex: 0,
        partTotalCount: 2
      }))).toBe('Appointment name: March 10, 2025, 10:00 AM - March 11, 2025, 10:30 AM (1/2)');
    });
  });
  (0, _globals.describe)('getReducedIconTooltip', () => {
    (0, _globals.it)('should return text with end date', () => {
      (0, _globals.expect)((0, _text_utils.getReducedIconTooltip)(_extends({}, options, {
        data: {
          text: 'Appointment name',
          startDate: Date.UTC(2025, 2, 10, 10),
          endDate: Date.UTC(2025, 2, 11, 10, 30)
        }
      }))).toBe('End Date: March 11, 2025');
    });
  });
  (0, _globals.describe)('getAriaDescription', () => {
    (0, _globals.afterAll)(() => {
      _globals.jest.clearAllMocks();
    });
    (0, _globals.it)('should return text with one resource', async () => {
      getAppointmentResourcesValues.mockReturnValue(Promise.resolve([{
        label: 'Assignee',
        values: ['Samantha Bright']
      }]));
      (0, _globals.expect)(await (0, _text_utils.getAriaDescription)(_extends({}, options, {
        groupTexts: []
      }))).toBe('Assignee: Samantha Bright');
    });
    (0, _globals.it)('should return text with multiple resources', async () => {
      getAppointmentResourcesValues.mockReturnValue(Promise.resolve([{
        label: 'Assignee',
        values: ['Samantha Bright', 'John Heart']
      }, {
        label: 'Room',
        values: ['Room 1']
      }]));
      (0, _globals.expect)(await (0, _text_utils.getAriaDescription)(_extends({}, options, {
        groupTexts: []
      }))).toBe('Assignee: Samantha Bright, John Heart; Room: Room 1');
    });
    (0, _globals.it)('should return text with group', async () => {
      getAppointmentResourcesValues.mockReturnValue([]);
      (0, _globals.expect)(await (0, _text_utils.getAriaDescription)(_extends({}, options, {
        groupIndex: 0,
        groupTexts: ['Samantha Bright']
      }))).toBe('Group: Samantha Bright');
    });
    (0, _globals.it)('should return text with multiple groups and resources', async () => {
      getAppointmentResourcesValues.mockReturnValue(Promise.resolve([{
        label: 'Assignee',
        values: ['Samantha Bright']
      }, {
        label: 'Room',
        values: ['Room 1', 'Room 2']
      }]));
      (0, _globals.expect)(await (0, _text_utils.getAriaDescription)(_extends({}, options, {
        groupIndex: 1,
        groupTexts: ['Samantha Bright', 'Room 1']
      }))).toBe('Group: Samantha Bright, Room 1; Assignee: Samantha Bright; Room: Room 1, Room 2');
    });
  });
});
