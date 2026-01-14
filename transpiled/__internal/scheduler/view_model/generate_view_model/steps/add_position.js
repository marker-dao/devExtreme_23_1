"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPosition = void 0;
var _binary_search_cell_index = require("./binary_search_cell_index");
const addPosition = (entities, cells) => entities.map(entity => {
  const cellIndex = (0, _binary_search_cell_index.binarySearchCellIndex)(cells, entity.startDateUTC);
  let endCellIndex = cellIndex;
  while (endCellIndex < cells.length - 1 && entity.endDateUTC > cells[endCellIndex].max && entity.endDateUTC >= cells[endCellIndex + 1].min) {
    endCellIndex += 1;
  }
  return Object.assign({}, entity, {
    startDateUTC: Math.max(entity.startDateUTC, cells[cellIndex].min),
    endDateUTC: Math.min(entity.endDateUTC, cells[endCellIndex].max),
    cellIndex,
    endCellIndex,
    rowIndex: cells[cellIndex].rowIndex,
    columnIndex: cells[cellIndex].columnIndex
  });
});
exports.addPosition = addPosition;