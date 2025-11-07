/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_collector/add_collector_by_level.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { splitByCondition } from './split_by_condition';
const addEmptyCollector = entities => entities.map(entity => _extends({}, entity, {
  items: [],
  isCompact: false
}));
const groupByStart = (entities, cellsCount) => entities.reduce((result, entity) => {
  result[entity.cellIndex].push(entity);
  return result;
}, Array.from({
  length: cellsCount
}, () => []));
const groupByOccupation = (entities, cells, maxLevel) => entities.reduce((result, entity) => {
  result[entity.cellIndex].push(entity);
  for (let i = entity.cellIndex + 1; i <= entity.endCellIndex; i += 1) {
    if (entity.level >= maxLevel) {
      result[i].push(_extends({}, entity, {
        cellIndex: i,
        endCellIndex: i,
        startDateUTC: cells[i].min,
        endDateUTC: cells[i].max,
        columnIndex: cells[i].columnIndex,
        rowIndex: cells[i].rowIndex
      }));
    }
  }
  return result;
}, Array.from({
  length: cells.length
}, () => []));
export const addCollectorByLevel = (entities, _ref) => {
  let {
    cells,
    isCompact,
    maxLevel,
    collectBy
  } = _ref;
  if (maxLevel < 0) {
    return addEmptyCollector(entities);
  }
  const groupByCell = collectBy === 'byStartDate' ? groupByStart(entities, cells.length) : groupByOccupation(entities, cells, maxLevel);
  return groupByCell.reduce((result, cellEntities) => {
    const [free, collected] = splitByCondition(cellEntities, item => item.level < maxLevel);
    result.push(...addEmptyCollector(free));
    if (collected.length > 0) {
      result.push(_extends({}, collected[0], {
        items: collected,
        isCompact
      }));
    }
    return result;
  }, []);
};
