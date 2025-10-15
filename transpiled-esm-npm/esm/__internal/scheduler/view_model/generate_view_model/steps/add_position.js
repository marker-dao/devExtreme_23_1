import _extends from "@babel/runtime/helpers/esm/extends";
import { binarySearchCellIndex } from './binary_search_cell_index';
export const addPosition = (entities, cells) => entities.map(entity => {
  const cellIndex = binarySearchCellIndex(cells, entity.startDateUTC);
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