"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByAttributes = void 0;
var _is_appointment_matched_resources = require("./is_appointment_matched_resources");
const filterByAttributes = (entities, _ref) => {
  let {
    resourceManager,
    showAllDayPanel,
    supportAllDayPanel
  } = _ref;
  return entities.filter(appointment => {
    if (!appointment.visible) {
      return false;
    }
    const allDayPanelAppointmentHidden = Boolean(supportAllDayPanel && !showAllDayPanel && appointment.isAllDayPanelOccupied);
    if (allDayPanelAppointmentHidden) {
      return false;
    }
    const resources = resourceManager.groupResources();
    return (0, _is_appointment_matched_resources.isAppointmentMatchedResources)(appointment.itemData, resources);
  });
};
exports.filterByAttributes = filterByAttributes;