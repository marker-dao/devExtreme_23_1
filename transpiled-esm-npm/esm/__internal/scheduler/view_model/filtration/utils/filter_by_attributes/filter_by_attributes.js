import { isAppointmentMatchedResources } from './is_appointment_matched_resources';
export const filterByAttributes = (entities, _ref) => {
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
    return isAppointmentMatchedResources(appointment.itemData, resources);
  });
};