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