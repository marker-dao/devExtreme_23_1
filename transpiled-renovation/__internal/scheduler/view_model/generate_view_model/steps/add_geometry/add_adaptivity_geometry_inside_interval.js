"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdaptivityGeometryInsideInterval = void 0;
var _swap_by_view_orientation = require("./swap_by_view_orientation");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const COLLECTOR_ADAPTIVE_BOTTOM_OFFSET = 40;
const addAdaptivityGeometryInsideInterval = (entity, _ref) => {
  let {
    cellSize,
    collectorSize,
    collectorWithMarginsSize,
    viewOrientation
  } = _ref;
  const cellAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(cellSize, viewOrientation);
  const topInsideCell = entity.isAllDayPanelOccupied || viewOrientation === 'vertical' ? (cellSize.height - collectorWithMarginsSize.height) / 2 : cellSize.height - COLLECTOR_ADAPTIVE_BOTTOM_OFFSET;
  const leftInsideCell = (cellSize.width - collectorWithMarginsSize.width) / 2;
  const abstractGeometry = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)({
    top: topInsideCell,
    left: leftInsideCell,
    width: collectorSize.width,
    height: collectorSize.height
  }, viewOrientation);
  abstractGeometry.offsetX += entity.columnIndex * cellAbstractSize.sizeX;
  const geometry = (0, _swap_by_view_orientation.getRealSizeByViewOrientation)(abstractGeometry, viewOrientation);
  const items = entity.items.map(item => _extends({}, item, {
    width: cellSize.width,
    height: cellSize.height
  }));
  return _extends({}, entity, geometry, {
    items
  });
};
exports.addAdaptivityGeometryInsideInterval = addAdaptivityGeometryInsideInterval;