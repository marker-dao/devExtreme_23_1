/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/snap_to_cells.js)
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
exports.snapToCells = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const snapToCells = function (entities, cells) {
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
exports.snapToCells = snapToCells;
