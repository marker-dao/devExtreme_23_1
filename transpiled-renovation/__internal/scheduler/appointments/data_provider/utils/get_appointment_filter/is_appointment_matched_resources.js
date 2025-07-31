"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAppointmentMatchedResources = void 0;
var _common = require("../../../../../../core/utils/common");
var _appointment_groups_utils = require("../../../../utils/resource_manager/appointment_groups_utils");
const isAppointmentMatchedResources = (appointment, groupsResources) => {
  if (groupsResources.length === 0) {
    return true;
  }
  const appointmentGroupValues = (0, _appointment_groups_utils.getAppointmentGroupValues)(appointment, groupsResources);
  return groupsResources.every(resource => {
    const value = appointmentGroupValues[resource.resourceIndex];
    return value === null || value === void 0 ? void 0 : value.some(id => resource.items.some(item => (0, _common.equalByValue)(id, item.id)));
  });
};
exports.isAppointmentMatchedResources = isAppointmentMatchedResources;