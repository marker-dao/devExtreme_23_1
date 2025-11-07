/**
* DevExtreme (esm/__internal/scheduler/utils/get_targeted_appointment.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { setAppointmentGroupValues } from './resource_manager/appointment_groups_utils';
import { getLeafGroupValues } from './resource_manager/group_utils';
const setTargetedAppointmentResources = (rawAppointment, settings, resourceManager) => {
  const {
    groups,
    resourceById,
    groupsLeafs
  } = resourceManager;
  if (groups.length) {
    const cellGroups = getLeafGroupValues(groupsLeafs, settings.groupIndex);
    setAppointmentGroupValues(rawAppointment, resourceById, cellGroups);
  }
};
export const getTargetedAppointmentFromInfo = function (rawAppointment, settings, dataAccessor, resourceManager) {
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
export const getTargetedAppointment = (rawAppointment, settings, dataAccessor, resourceManager) => {
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
