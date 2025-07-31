/**
* DevExtreme (cjs/__internal/scheduler/utils/resource_manager/appointment_color_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaintedResource = exports.getAppointmentColor = void 0;
var _appointment_groups_utils = require("./appointment_groups_utils");
var _group_utils = require("./group_utils");
/*
 Order:
 1. assigned resource with useColorAsDefault
 2. last resource of assigned groups (in order of grouping)
 3. last resource of assigned resources (in order of resources config)
 4. undefined
 */
const getPaintedResource = (resources, appointmentGroups, groups) => {
  const assignedResources = resources.filter(resource => appointmentGroups.includes(resource.resourceIndex));
  const defaultColorResource = assignedResources.find(resource => resource.useColorAsDefault);
  if (defaultColorResource) {
    return defaultColorResource;
  }
  const assignedGroups = groups.filter(group => appointmentGroups.includes(group));
  const availableGroupedResources = assignedGroups.map(group => assignedResources.find(resource => resource.resourceIndex === group)).filter(Boolean);
  return availableGroupedResources.length ? availableGroupedResources.at(-1) : assignedResources.at(-1);
};
exports.getPaintedResource = getPaintedResource;
const getResourceColor = (resource, resourceId) => {
  var _getResourceItemById;
  return (_getResourceItemById = (0, _appointment_groups_utils.getResourceItemById)(resource, resourceId)) === null || _getResourceItemById === void 0 ? void 0 : _getResourceItemById.color;
};
const getAppointmentColor = async (resources, groupsLeafs, groups, appointmentConfig) => {
  const {
    groupIndex,
    itemData
  } = appointmentConfig;
  const appointmentGroupValues = (0, _appointment_groups_utils.getAppointmentGroupValues)(itemData, resources);
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
  const leafGroupValue = (0, _group_utils.getLeafGroupValues)(groupsLeafs, groupIndex);
  const resourceValues = paintedResource.idsGetter(itemData);
  const resourceId = leafGroupValue[paintedResource.resourceIndex] ?? resourceValues[0];
  return getResourceColor(paintedResource, resourceId);
};
exports.getAppointmentColor = getAppointmentColor;
