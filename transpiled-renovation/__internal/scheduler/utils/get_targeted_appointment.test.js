"use strict";

var _globals = require("@jest/globals");
var _resource_manager = require("../../scheduler/__mock__/resource_manager.mock");
var _appointment_data_accessor = require("../__mock__/appointment_data_accessor.mock");
var _utils = require("../r1/timezone_calculator/utils");
var _appointment_data_accessor2 = require("./data_accessor/appointment_data_accessor");
var _get_targeted_appointment = require("./get_targeted_appointment");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /**
 * @timezone Europe/Belgrade
 */
const dataAccessor = new _appointment_data_accessor2.AppointmentDataAccessor(_appointment_data_accessor.mockUppercaseFieldExpressions, true);
const timeZoneCalculator = (0, _utils.createTimeZoneCalculator)('America/Los_Angeles');
const appointment = {
  StartDate: new Date(200, 0, 0),
  EndDate: new Date(200, 0, 1)
};
const appointmentRecurrence = _extends({}, appointment, {
  RecurrenceRule: 'FREQ=DAILY'
});
const getInfo = () => ({
  sourceAppointment: {
    startDate: new Date(200, 0, 5),
    endDate: new Date(200, 0, 6)
  },
  appointment: {
    startDate: new Date(200, 0, 5, 10),
    endDate: new Date(200, 0, 6, 11)
  }
});
(0, _globals.describe)('getTargetedAppointment', () => {
  (0, _globals.it)('should return collector targeted appointment', () => {
    (0, _globals.expect)((0, _get_targeted_appointment.getTargetedAppointment)(appointment, {}, dataAccessor, timeZoneCalculator, (0, _resource_manager.getResourceManagerMock)())).toEqual(_extends({}, appointment, {
      displayStartDate: new Date(200, 0, 0),
      displayEndDate: new Date(200, 0, 1)
    }));
  });
  (0, _globals.it)('should return grid item targeted appointment', () => {
    (0, _globals.expect)((0, _get_targeted_appointment.getTargetedAppointment)(appointmentRecurrence, {
      info: getInfo(),
      groupIndex: 0
    }, dataAccessor, timeZoneCalculator, (0, _resource_manager.getResourceManagerMock)())).toEqual(_extends({}, appointmentRecurrence, {
      StartDate: new Date(200, 0, 5),
      EndDate: new Date(200, 0, 6),
      displayStartDate: new Date(200, 0, 5, 10),
      displayEndDate: new Date(200, 0, 6, 11)
    }));
  });
  (0, _globals.it)('should return grid item targeted appointment with resources', async () => {
    const resourceManager = (0, _resource_manager.getResourceManagerMock)();
    await resourceManager.loadGroupResources(['roomId', 'assigneeId']);
    (0, _globals.expect)((0, _get_targeted_appointment.getTargetedAppointment)(appointmentRecurrence, {
      info: getInfo(),
      groupIndex: 5 // 0,1; 0,2; 0,3; 0,4; 1,1; 1,2; <- 5
    }, dataAccessor, timeZoneCalculator, resourceManager)).toEqual(_extends({}, appointmentRecurrence, {
      assigneeId: [2],
      roomId: 1,
      StartDate: new Date(200, 0, 5),
      EndDate: new Date(200, 0, 6),
      displayStartDate: new Date(200, 0, 5, 10),
      displayEndDate: new Date(200, 0, 6, 11)
    }));
  });
  (0, _globals.it)('should return agenda item targeted recurrence appointment', () => {
    (0, _globals.expect)((0, _get_targeted_appointment.getTargetedAppointment)(appointmentRecurrence, {
      isAgendaModel: true,
      info: getInfo(),
      groupIndex: 0
    }, dataAccessor, timeZoneCalculator, (0, _resource_manager.getResourceManagerMock)())).toEqual(_extends({}, appointmentRecurrence, {
      StartDate: new Date(200, 0, 5),
      EndDate: new Date(200, 0, 6),
      displayStartDate: new Date(200, 0, 5, 10),
      displayEndDate: new Date(200, 0, 6, 11)
    }));
  });
  (0, _globals.it)('should return agenda item targeted full appointment', () => {
    (0, _globals.expect)((0, _get_targeted_appointment.getTargetedAppointment)(appointment, {
      isAgendaModel: true,
      info: getInfo(),
      groupIndex: 0
    }, dataAccessor, timeZoneCalculator, (0, _resource_manager.getResourceManagerMock)())).toEqual(_extends({}, appointment, {
      displayStartDate: appointment.StartDate,
      displayEndDate: appointment.EndDate
    }));
  });
  (0, _globals.it)('should return agenda item targeted full appointment with resources', async () => {
    const resourceManager = (0, _resource_manager.getResourceManagerMock)();
    await resourceManager.loadGroupResources(['roomId', 'assigneeId']);
    (0, _globals.expect)((0, _get_targeted_appointment.getTargetedAppointment)(appointment, {
      isAgendaModel: true,
      info: getInfo(),
      groupIndex: 3 // 0,1; 0,2; 0,3; 0,4; <- 3
    }, dataAccessor, timeZoneCalculator, resourceManager)).toEqual(_extends({}, appointment, {
      assigneeId: [4],
      roomId: 0,
      displayStartDate: appointment.StartDate,
      displayEndDate: appointment.EndDate
    }));
  });
});