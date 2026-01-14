import { getAppointmentCollectorGeometry } from './get_appointment_collector_geometry';
import { getAppointmentGeometry } from './get_appointment_geometry';
export const addGeometryInsideInterval = (entity, options) => {
  if (entity.items.length) {
    const entityGeometry = getAppointmentCollectorGeometry(entity, options);
    const items = entity.items.map(item => {
      const size = getAppointmentGeometry(Object.assign({}, entity, item), options);
      return Object.assign({}, item, {
        width: size.width,
        height: size.height
      });
    });
    return Object.assign({}, entity, entityGeometry, {
      items
    });
  }
  const entityGeometry = getAppointmentGeometry(entity, options);
  return Object.assign({}, entity, entityGeometry, {
    items: []
  });
};