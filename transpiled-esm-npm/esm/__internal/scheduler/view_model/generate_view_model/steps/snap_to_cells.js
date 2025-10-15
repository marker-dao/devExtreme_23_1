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