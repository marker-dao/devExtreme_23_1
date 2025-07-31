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