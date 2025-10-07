/**
* DevExtreme (esm/__internal/scheduler/utils/get_targeted_appointment.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
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
export const getTargetedAppointmentFromInfo = (rawAppointment, settings, dataAccessor, resourceManager) => {
  const {
    info
  } = settings;
  const rawTargetedAppointment = _extends({}, rawAppointment);
  dataAccessor.set('startDate', rawTargetedAppointment, new Date(info.sourceAppointment.startDate));
  dataAccessor.set('endDate', rawTargetedAppointment, new Date(info.sourceAppointment.endDate));
  rawTargetedAppointment.displayStartDate = new Date(info.appointment.startDate);
  rawTargetedAppointment.displayEndDate = new Date(info.appointment.endDate);
  setTargetedAppointmentResources(rawTargetedAppointment, settings, resourceManager);
  return rawTargetedAppointment;
};
export const getTargetedAppointment = (rawAppointment, settings, dataAccessor, timeZoneCalculator, resourceManager) => {
  const startDate = dataAccessor.get('startDate', rawAppointment);
  const endDate = dataAccessor.get('endDate', rawAppointment);
  if (!('info' in settings)) {
    return _extends({}, rawAppointment, {
      displayStartDate: startDate,
      displayEndDate: endDate
    });
  }
  if ('isAgendaModel' in settings && !dataAccessor.isRecurrent(rawAppointment)) {
    const rawTargetedAppointment = _extends({}, rawAppointment, {
      displayStartDate: timeZoneCalculator.createDate(startDate, 'toGrid'),
      displayEndDate: timeZoneCalculator.createDate(endDate, 'toGrid')
    });
    setTargetedAppointmentResources(rawTargetedAppointment, settings, resourceManager);
    return rawTargetedAppointment;
  }
  return getTargetedAppointmentFromInfo(rawAppointment, settings, dataAccessor, resourceManager);
};
