import { getAbstractSizeByViewOrientation, getRealSizeByViewOrientation } from './swap_by_view_orientation';
export const getAppointmentCollectorGeometry = (entity, _ref) => {
  let {
    collectorPosition,
    cellSize,
    collectorSize,
    collectorWithMarginsSize,
    viewOrientation
  } = _ref;
  const collectorAbstractSize = getAbstractSizeByViewOrientation(collectorSize, viewOrientation);
  const cellAbstractSize = getAbstractSizeByViewOrientation(cellSize, viewOrientation);
  const abstractGeometry = {
    offsetX: entity.columnIndex * cellAbstractSize.sizeX,
    offsetY: collectorPosition === 'start' ? 0 : cellAbstractSize.sizeY - getAbstractSizeByViewOrientation(collectorWithMarginsSize, viewOrientation).sizeY,
    sizeY: collectorAbstractSize.sizeY,
    sizeX: collectorAbstractSize.sizeX
  };
  const entityGeometry = getRealSizeByViewOrientation(abstractGeometry, viewOrientation);
  return entityGeometry;
};