/**
* DevExtreme (cjs/__internal/scheduler/utils/get_targeted_appointment.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTargetedAppointmentFromInfo = exports.getTargetedAppointment = void 0;
var _appointment_groups_utils = require("./resource_manager/appointment_groups_utils");
var _group_utils = require("./resource_manager/group_utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const setTargetedAppointmentResources = (rawAppointment, settings, resourceManager) => {
  const {
    groups,
    resourceById,
    groupsLeafs
  } = resourceManager;
  if (groups.length) {
    const cellGroups = (0, _group_utils.getLeafGroupValues)(groupsLeafs, settings.groupIndex);
    (0, _appointment_groups_utils.setAppointmentGroupValues)(rawAppointment, resourceById, cellGroups);
  }
};
const getTargetedAppointmentFromInfo = function (rawAppointment, settings, dataAccessor, resourceManager) {
  let usePartialDates = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const {
    info
  } = settings;
  const rawTargetedAppointment = _extends({}, rawAppointment);
  dataAccessor.set('startDate', rawTargetedAppointment, new Date(info.sourceAppointment.startDate));
  dataAccessor.set('endDate', rawTargetedAppointment, new Date(info.sourceAppointment.endDate));
  const displayDates = usePartialDates && 'partialDates' in info ? info.partialDates : info.appointment;
  rawTargetedAppointment.displayStartDate = new Date(displayDates.startDate);
  rawTargetedAppointment.displayEndDate = new Date(displayDates.endDate);
  setTargetedAppointmentResources(rawTargetedAppointment, settings, resourceManager);
  return rawTargetedAppointment;
};
exports.getTargetedAppointmentFromInfo = getTargetedAppointmentFromInfo;
const getTargetedAppointment = (rawAppointment, settings, dataAccessor, resourceManager) => {
  const startDate = dataAccessor.get('startDate', rawAppointment);
  const endDate = dataAccessor.get('endDate', rawAppointment);
  if (!('info' in settings)) {
    return _extends({}, rawAppointment, {
      displayStartDate: startDate,
      displayEndDate: endDate
    });
  }
  return getTargetedAppointmentFromInfo(rawAppointment, settings, dataAccessor, resourceManager);
};
exports.getTargetedAppointment = getTargetedAppointment;
