"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentGeometry = void 0;
var _get_appointment_abstract_geometry = require("./get_appointment_abstract_geometry");
var _swap_by_view_orientation = require("./swap_by_view_orientation");
const getAppointmentGeometry = (entity, _ref) => {
  let {
    collectorPosition,
    cellSize,
    collectorWithMarginsSize,
    viewOrientation,
    cells
  } = _ref;
  const cellAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(cellSize, viewOrientation);
  const collectorFullAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(collectorWithMarginsSize, viewOrientation);
  const abstractGeometry = Object.assign({}, (0, _get_appointment_abstract_geometry.getAppointmentX)(entity, cellAbstractSize, cells), (0, _get_appointment_abstract_geometry.getAppointmentY)(entity, cellAbstractSize, collectorFullAbstractSize.sizeY, collectorPosition));
  const entityGeometry = (0, _swap_by_view_orientation.getRealSizeByViewOrientation)(abstractGeometry, viewOrientation);
  return entityGeometry;
};
exports.getAppointmentGeometry = getAppointmentGeometry;