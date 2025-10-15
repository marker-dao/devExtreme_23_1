"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGroupingOffset = void 0;
const addGroupingOffset = (entity, _ref) => {
  let {
    groupCount,
    groupOrientation,
    viewOrientation,
    hasAllDayPanel,
    isGroupByDate,
    allDayPanelCellSize,
    cellSize,
    groupSize
  } = _ref;
  if (groupCount) {
    switch (true) {
      case groupOrientation === 'horizontal' && isGroupByDate:
        entity.left += (groupCount - 1) * cellSize.width * (viewOrientation === 'horizontal' ? entity.columnIndex : entity.rowIndex) // cells before date
        + cellSize.width * entity.groupIndex; // cells inside date
        break;
      case groupOrientation === 'horizontal':
        entity.left += entity.groupIndex * groupSize.width; // intervals before
        break;
      default:
        entity.top += entity.groupIndex * groupSize.height + (entity.groupIndex + Number(!entity.isAllDayPanelOccupied)) * Number(hasAllDayPanel) * allDayPanelCellSize.height;
    }
  }
};
exports.addGroupingOffset = addGroupingOffset;