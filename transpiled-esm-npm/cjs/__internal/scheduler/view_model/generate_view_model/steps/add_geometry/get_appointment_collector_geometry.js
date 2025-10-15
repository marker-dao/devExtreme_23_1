"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentCollectorGeometry = void 0;
var _swap_by_view_orientation = require("./swap_by_view_orientation");
const getAppointmentCollectorGeometry = (entity, _ref) => {
  let {
    collectorPosition,
    cellSize,
    collectorSize,
    collectorWithMarginsSize,
    viewOrientation
  } = _ref;
  const collectorAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(collectorSize, viewOrientation);
  const cellAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(cellSize, viewOrientation);
  const abstractGeometry = {
    offsetX: entity.columnIndex * cellAbstractSize.sizeX,
    offsetY: collectorPosition === 'start' ? 0 : cellAbstractSize.sizeY - (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(collectorWithMarginsSize, viewOrientation).sizeY,
    sizeY: collectorAbstractSize.sizeY,
    sizeX: collectorAbstractSize.sizeX
  };
  const entityGeometry = (0, _swap_by_view_orientation.getRealSizeByViewOrientation)(abstractGeometry, viewOrientation);
  return entityGeometry;
};
exports.getAppointmentCollectorGeometry = getAppointmentCollectorGeometry;