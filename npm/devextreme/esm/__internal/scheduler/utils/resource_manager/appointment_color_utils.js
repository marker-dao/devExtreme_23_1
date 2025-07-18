/**
* DevExtreme (esm/__internal/scheduler/utils/resource_manager/appointment_color_utils.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getAppointmentGroupValues, getResourceItemById } from './appointment_groups_utils';
import { getLeafGroupValues } from './group_utils';
/*
 Order:
 1. assigned resource with useColorAsDefault
 2. last resource of assigned groups (in order of grouping)
 3. last resource of assigned resources (in order of resources config)
 4. undefined
 */
export const getPaintedResource = (resources, appointmentGroups, groups) => {
  const assignedResources = resources.filter(resource => appointmentGroups.includes(resource.resourceIndex));
  const defaultColorResource = assignedResources.find(resource => resource.useColorAsDefault);
  if (defaultColorResource) {
    return defaultColorResource;
  }
  const assignedGroups = groups.filter(group => appointmentGroups.includes(group));
  const availableGroupedResources = assignedGroups.map(group => assignedResources.find(resource => resource.resourceIndex === group)).filter(Boolean);
  return availableGroupedResources.length ? availableGroupedResources.at(-1) : assignedResources.at(-1);
};
const getResourceColor = (resource, resourceId) => {
  var _getResourceItemById;
  return (_getResourceItemById = getResourceItemById(resource, resourceId)) === null || _getResourceItemById === void 0 ? void 0 : _getResourceItemById.color;
};
export const getAppointmentColor = async (resources, groupsLeafs, groups, appointmentConfig) => {
  const {
    groupIndex,
    itemData
  } = appointmentConfig;
  const appointmentGroupValues = getAppointmentGroupValues(itemData, resources);
  const appointmentGroups = Object.keys(appointmentGroupValues);
  const paintedResource = getPaintedResource(resources, appointmentGroups, groups);
  if (!paintedResource) {
    return undefined;
  }
  await paintedResource.load();
  /*
   Order:
   1. resource value of group with groupIndex
   2. resource value of the last value in appointment
   */
  const leafGroupValue = getLeafGroupValues(groupsLeafs, groupIndex);
  const resourceValues = paintedResource.idsGetter(itemData);
  const resourceId = leafGroupValue[paintedResource.resourceIndex] ?? resourceValues[0];
  return getResourceColor(paintedResource, resourceId);
};
