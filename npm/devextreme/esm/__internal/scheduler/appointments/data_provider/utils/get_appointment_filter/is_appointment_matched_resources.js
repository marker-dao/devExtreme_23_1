/**
* DevExtreme (esm/__internal/scheduler/appointments/data_provider/utils/get_appointment_filter/is_appointment_matched_resources.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { equalByValue } from '../../../../../../core/utils/common';
import { getAppointmentGroupValues } from '../../../../utils/resource_manager/appointment_groups_utils';
export const isAppointmentMatchedResources = (appointment, groupsResources) => {
  if (groupsResources.length === 0) {
    return true;
  }
  const appointmentGroupValues = getAppointmentGroupValues(appointment, groupsResources);
  return groupsResources.every(resource => {
    const value = appointmentGroupValues[resource.resourceIndex];
    return value === null || value === void 0 ? void 0 : value.some(id => resource.items.some(item => equalByValue(id, item.id)));
  });
};
