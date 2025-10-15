"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLastInGroup = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
exports.addLastInGroup = addLastInGroup;