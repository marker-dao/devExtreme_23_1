import _extends from "@babel/runtime/helpers/esm/extends";
import { getAppointmentCollectorGeometry } from './get_appointment_collector_geometry';
import { getAppointmentGeometry } from './get_appointment_geometry';
export const addGeometryInsideInterval = (entity, options) => {
  if (entity.items.length) {
    const entityGeometry = getAppointmentCollectorGeometry(entity, options);
    const items = entity.items.map(item => {
      const size = getAppointmentGeometry(_extends({}, entity, item), options);
      return _extends({}, item, {
        width: size.width,
        height: size.height
      });
    });
    return _extends({}, entity, entityGeometry, {
      items
    });
  }
  const entityGeometry = getAppointmentGeometry(entity, options);
  return _extends({}, entity, entityGeometry, {
    items: []
  });
};