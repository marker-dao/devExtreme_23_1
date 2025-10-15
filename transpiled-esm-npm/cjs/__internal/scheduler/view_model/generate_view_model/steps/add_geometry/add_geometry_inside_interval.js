"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGeometryInsideInterval = void 0;
var _get_appointment_collector_geometry = require("./get_appointment_collector_geometry");
var _get_appointment_geometry = require("./get_appointment_geometry");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const addGeometryInsideInterval = (entity, options) => {
  if (entity.items.length) {
    const entityGeometry = (0, _get_appointment_collector_geometry.getAppointmentCollectorGeometry)(entity, options);
    const items = entity.items.map(item => {
      const size = (0, _get_appointment_geometry.getAppointmentGeometry)(_extends({}, entity, item), options);
      return _extends({}, item, {
        width: size.width,
        height: size.height
      });
    });
    return _extends({}, entity, entityGeometry, {
      items
    });
  }
  const entityGeometry = (0, _get_appointment_geometry.getAppointmentGeometry)(entity, options);
  return _extends({}, entity, entityGeometry, {
    items: []
  });
};
exports.addGeometryInsideInterval = addGeometryInsideInterval;