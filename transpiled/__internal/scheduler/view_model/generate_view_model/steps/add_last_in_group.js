"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLastInGroup = void 0;
const getDayStart = date => new Date(date).setUTCHours(0, 0, 0, 0);
const addLastInGroup = entities => {
  if (entities.length === 0) {
    return entities;
  }
  let nextGroupIndex = entities[0].groupIndex;
  let nextStartDate = getDayStart(entities[0].startDateUTC);
  return entities.map((entity, index) => {
    const nextEntity = entities[index + 1];
    if (!nextEntity) {
      return Object.assign({}, entity, {
        isLastInGroup: true
      });
    }
    const trimDate = nextEntity && getDayStart(nextEntity.startDateUTC);
    if (nextGroupIndex !== nextEntity.groupIndex || nextStartDate !== trimDate) {
      nextGroupIndex = nextEntity.groupIndex;
      nextStartDate = trimDate;
      return Object.assign({}, entity, {
        isLastInGroup: true
      });
    }
    return Object.assign({}, entity, {
      isLastInGroup: false
    });
  });
};
exports.addLastInGroup = addLastInGroup;