/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/add_grouping_offset.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
