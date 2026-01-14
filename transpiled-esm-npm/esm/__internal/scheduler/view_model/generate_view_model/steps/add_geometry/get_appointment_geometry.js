import { getAppointmentX, getAppointmentY } from './get_appointment_abstract_geometry';
import { getAbstractSizeByViewOrientation, getRealSizeByViewOrientation } from './swap_by_view_orientation';
export const getAppointmentGeometry = (entity, _ref) => {
  let {
    collectorPosition,
    cellSize,
    collectorWithMarginsSize,
    viewOrientation,
    cells
  } = _ref;
  const cellAbstractSize = getAbstractSizeByViewOrientation(cellSize, viewOrientation);
  const collectorFullAbstractSize = getAbstractSizeByViewOrientation(collectorWithMarginsSize, viewOrientation);
  const abstractGeometry = Object.assign({}, getAppointmentX(entity, cellAbstractSize, cells), getAppointmentY(entity, cellAbstractSize, collectorFullAbstractSize.sizeY, collectorPosition));
  const entityGeometry = getRealSizeByViewOrientation(abstractGeometry, viewOrientation);
  return entityGeometry;
};