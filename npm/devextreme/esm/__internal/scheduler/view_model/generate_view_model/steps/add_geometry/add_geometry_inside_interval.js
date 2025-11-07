/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/add_geometry_inside_interval.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
