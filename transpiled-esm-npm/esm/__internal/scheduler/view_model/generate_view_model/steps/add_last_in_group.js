import _extends from "@babel/runtime/helpers/esm/extends";
const getDayStart = date => new Date(date).setUTCHours(0, 0, 0, 0);
export const addLastInGroup = entities => {
  if (entities.length === 0) {
    return entities;
  }
  let nextGroupIndex = entities[0].groupIndex;
  let nextStartDate = getDayStart(entities[0].startDateUTC);
  return entities.map((entity, index) => {
    const nextEntity = entities[index + 1];
    if (!nextEntity) {
      return _extends({}, entity, {
        isLastInGroup: true
      });
    }
    const trimDate = nextEntity && getDayStart(nextEntity.startDateUTC);
    if (nextGroupIndex !== nextEntity.groupIndex || nextStartDate !== trimDate) {
      nextGroupIndex = nextEntity.groupIndex;
      nextStartDate = trimDate;
      return _extends({}, entity, {
        isLastInGroup: true
      });
    }
    return _extends({}, entity, {
      isLastInGroup: false
    });
  });
};