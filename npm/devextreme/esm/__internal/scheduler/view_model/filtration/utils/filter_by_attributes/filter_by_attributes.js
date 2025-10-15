/**
* DevExtreme (esm/__internal/scheduler/view_model/filtration/utils/filter_by_attributes/filter_by_attributes.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
