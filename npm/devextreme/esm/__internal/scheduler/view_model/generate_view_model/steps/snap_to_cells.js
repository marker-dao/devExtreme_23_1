/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/snap_to_cells.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
export const snapToCells = function (entities, cells) {
  let isSnapToCell = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!isSnapToCell) {
    return entities;
  }
  return entities.map(entity => {
    const {
      cellIndex,
      endCellIndex
    } = entity;
    return _extends({}, entity, {
      startDateUTC: cells[cellIndex].min,
      endDateUTC: cells[endCellIndex].max,
      duration: cells[endCellIndex].max - cells[cellIndex].min
    });
  });
};
