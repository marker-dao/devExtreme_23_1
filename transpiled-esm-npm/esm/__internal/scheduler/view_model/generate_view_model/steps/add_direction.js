import _extends from "@babel/runtime/helpers/esm/extends";
export const addDirection = (entities, allDayPanelDirection, regularPanelDirection) => entities.map(entity => _extends({}, entity, {
  direction: entity.isAllDayPanelOccupied ? allDayPanelDirection : regularPanelDirection
}));