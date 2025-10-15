import _extends from "@babel/runtime/helpers/esm/extends";
import { getMinAppointmentSize } from '../options/get_min_appointment_size';
export const addEmptiness = (entities, options) => {
  const minSize = getMinAppointmentSize(options);
  return entities.map(entity => _extends({}, entity, {
    empty: !entity.isAllDayPanelOccupied && (entity.height < minSize.height || entity.width < minSize.width)
  }));
};