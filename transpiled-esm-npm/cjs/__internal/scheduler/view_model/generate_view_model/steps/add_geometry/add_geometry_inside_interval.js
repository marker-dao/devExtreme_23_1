"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGeometryInsideInterval = void 0;
var _get_appointment_collector_geometry = require("./get_appointment_collector_geometry");
var _get_appointment_geometry = require("./get_appointment_geometry");
const addGeometryInsideInterval = (entity, options) => {
  if (entity.items.length) {
    const entityGeometry = (0, _get_appointment_collector_geometry.getAppointmentCollectorGeometry)(entity, options);
    const items = entity.items.map(item => {
      const size = (0, _get_appointment_geometry.getAppointmentGeometry)(Object.assign({}, entity, item), options);
      return Object.assign({}, item, {
        width: size.width,
        height: size.height
      });
    });
    return Object.assign({}, entity, entityGeometry, {
      items
    });
  }
  const entityGeometry = (0, _get_appointment_geometry.getAppointmentGeometry)(entity, options);
  return Object.assign({}, entity, entityGeometry, {
    items: []
  });
};
exports.addGeometryInsideInterval = addGeometryInsideInterval;