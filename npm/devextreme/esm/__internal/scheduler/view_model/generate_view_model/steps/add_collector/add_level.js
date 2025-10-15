/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_collector/add_level.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
const between = (value, min, max) => Math.min(Math.max(value, min), max);
export const addLevel = (entities, _ref) => {
  let {
    minLevel,
    maxLevel
  } = _ref;
  const minMaxLevel = maxLevel === -1 ? 0 : Math.min(minLevel, maxLevel);
  let levelsEndDate = [];
  let stack = [];
  return entities.map(entity => {
    const entityEndDate = entity.endDateUTC === entity.startDateUTC ? entity.endDateUTC + 1 : entity.endDateUTC;
    const index = levelsEndDate.findIndex(endDate => entity.startDateUTC >= endDate);
    const level = index === -1 ? levelsEndDate.length : index;
    const extended = _extends({}, entity, {
      level,
      maxLevel: minMaxLevel,
      inStackWithCollector: false
    });
    const isIntersectWithPrevious = levelsEndDate.some(endDate => entity.startDateUTC < endDate);
    if (isIntersectWithPrevious) {
      levelsEndDate[level] = entityEndDate;
      stack.push(extended);
      stack.forEach(item => {
        item.maxLevel = maxLevel === -1 ? levelsEndDate.length : between(levelsEndDate.length, minMaxLevel, maxLevel);
        item.inStackWithCollector = maxLevel !== -1 && levelsEndDate.length > maxLevel;
      });
    } else {
      extended.maxLevel = minMaxLevel;
      extended.inStackWithCollector = maxLevel !== -1 && levelsEndDate.length > maxLevel;
      levelsEndDate = [entityEndDate];
      stack = [extended];
    }
    return extended;
  });
};
