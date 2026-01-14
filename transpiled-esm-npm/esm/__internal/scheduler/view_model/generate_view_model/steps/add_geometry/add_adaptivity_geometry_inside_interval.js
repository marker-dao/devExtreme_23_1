import { getAbstractSizeByViewOrientation, getRealSizeByViewOrientation } from './swap_by_view_orientation';
const COLLECTOR_ADAPTIVE_BOTTOM_OFFSET = 40;
export const addAdaptivityGeometryInsideInterval = (entity, _ref) => {
  let {
    cellSize,
    collectorSize,
    collectorWithMarginsSize,
    viewOrientation
  } = _ref;
  const cellAbstractSize = getAbstractSizeByViewOrientation(cellSize, viewOrientation);
  const topInsideCell = entity.isAllDayPanelOccupied || viewOrientation === 'vertical' ? (cellSize.height - collectorWithMarginsSize.height) / 2 : cellSize.height - COLLECTOR_ADAPTIVE_BOTTOM_OFFSET;
  const leftInsideCell = (cellSize.width - collectorWithMarginsSize.width) / 2;
  const abstractGeometry = getAbstractSizeByViewOrientation({
    top: topInsideCell,
    left: leftInsideCell,
    width: collectorSize.width,
    height: collectorSize.height
  }, viewOrientation);
  abstractGeometry.offsetX += entity.columnIndex * cellAbstractSize.sizeX;
  const geometry = getRealSizeByViewOrientation(abstractGeometry, viewOrientation);
  const items = entity.items.map(item => Object.assign({}, item, {
    width: cellSize.width,
    height: cellSize.height
  }));
  return Object.assign({}, entity, geometry, {
    items
  });
};