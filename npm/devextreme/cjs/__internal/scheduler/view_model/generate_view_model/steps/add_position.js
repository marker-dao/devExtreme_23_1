/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_position.js)
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
exports.addPosition = void 0;
var _binary_search_cell_index = require("./binary_search_cell_index");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const addPosition = (entities, cells) => entities.map(entity => {
  const cellIndex = (0, _binary_search_cell_index.binarySearchCellIndex)(cells, entity.startDateUTC);
  let endCellIndex = cellIndex;
  while (endCellIndex < cells.length - 1 && entity.endDateUTC > cells[endCellIndex].max && entity.endDateUTC >= cells[endCellIndex + 1].min) {
    endCellIndex += 1;
  }
  return _extends({}, entity, {
    startDateUTC: Math.max(entity.startDateUTC, cells[cellIndex].min),
    endDateUTC: Math.min(entity.endDateUTC, cells[endCellIndex].max),
    cellIndex,
    endCellIndex,
    rowIndex: cells[cellIndex].rowIndex,
    columnIndex: cells[cellIndex].columnIndex
  });
});
exports.addPosition = addPosition;
