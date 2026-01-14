import { getMinAppointmentSize } from '../options/get_min_appointment_size';
export const addEmptiness = (entities, options) => entities.map(entity => {
  const minSize = getMinAppointmentSize(Object.assign({}, options, {
    isAllDayAppointment: entity.allDay
  }));
  return Object.assign({}, entity, {
    empty: !entity.isAllDayPanelOccupied && (entity.height < minSize.height || entity.width < minSize.width)
  });
});