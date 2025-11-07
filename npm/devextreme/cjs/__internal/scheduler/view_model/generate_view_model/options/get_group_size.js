/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/options/get_group_size.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupSize = void 0;
const getGroupSize = _ref => {
  let {
    cellSize,
    cellDurationMinutes,
    endDayHour,
    startDayHour,
    cells,
    intervals,
    viewType,
    isAllDayPanel
  } = _ref;
  switch (viewType) {
    case 'month':
    case 'timelineMonth':
      {
        const intervalDaysCount = cells.filter(cell => cell.rowIndex === 0).length;
        return {
          width: cellSize.width * intervalDaysCount,
          height: cellSize.height * intervals.length
        };
      }
    case 'timelineDay':
    case 'timelineWeek':
    case 'timelineWorkWeek':
      {
        return {
          width: cellSize.width * cells.length,
          height: cellSize.height
        };
      }
    case 'day':
    case 'week':
    case 'workWeek':
      return {
        width: isAllDayPanel ? cellSize.width * cells.length : cellSize.width * intervals.length,
        height: cellSize.height * (endDayHour - startDayHour) * (60 / cellDurationMinutes)
      };
    default:
      return cellSize;
  }
};
exports.getGroupSize = getGroupSize;
