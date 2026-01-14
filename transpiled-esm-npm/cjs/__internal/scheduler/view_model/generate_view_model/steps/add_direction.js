"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDirection = void 0;
const addDirection = (entities, allDayPanelDirection, regularPanelDirection) => entities.map(entity => Object.assign({}, entity, {
  direction: entity.isAllDayPanelOccupied ? allDayPanelDirection : regularPanelDirection
}));
exports.addDirection = addDirection;