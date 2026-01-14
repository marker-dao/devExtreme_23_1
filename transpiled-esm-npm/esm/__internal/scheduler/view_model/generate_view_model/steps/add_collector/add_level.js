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
    const extended = Object.assign({}, entity, {
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