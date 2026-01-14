"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snapToCells = void 0;
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
    return Object.assign({}, entity, {
      startDateUTC: cells[cellIndex].min,
      endDateUTC: cells[endCellIndex].max,
      duration: cells[endCellIndex].max - cells[cellIndex].min
    });
  });
};
exports.snapToCells = snapToCells;