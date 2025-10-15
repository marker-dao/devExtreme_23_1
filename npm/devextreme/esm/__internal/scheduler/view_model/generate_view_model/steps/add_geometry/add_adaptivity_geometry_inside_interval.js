/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/add_adaptivity_geometry_inside_interval.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
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
  const items = entity.items.map(item => _extends({}, item, {
    width: cellSize.width,
    height: cellSize.height
  }));
  return _extends({}, entity, geometry, {
    items
  });
};
