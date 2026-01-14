export const addDirection = (entities, allDayPanelDirection, regularPanelDirection) => entities.map(entity => Object.assign({}, entity, {
  direction: entity.isAllDayPanelOccupied ? allDayPanelDirection : regularPanelDirection
}));