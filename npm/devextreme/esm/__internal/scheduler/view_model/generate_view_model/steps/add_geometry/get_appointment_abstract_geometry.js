/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/get_appointment_abstract_geometry.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const getInsideCellX = (date, _ref, cellSizeX) => {
  let {
    min,
    max
  } = _ref;
  const cellDuration = max - min;
  const startTimeDelta = date - min;
  return cellDuration === 0 ? 0 : startTimeDelta * cellSizeX / cellDuration;
};
export const getAppointmentX = (entity, cellSize, cells) => {
  const startX = getInsideCellX(entity.startDateUTC, cells[entity.cellIndex], cellSize.sizeX);
  const endX = getInsideCellX(entity.endDateUTC, cells[entity.endCellIndex], cellSize.sizeX);
  const offsetX = entity.columnIndex * cellSize.sizeX + startX;
  const sizeX = (entity.endCellIndex - entity.cellIndex) * cellSize.sizeX + endX - startX;
  return {
    offsetX,
    sizeX
  };
};
export const getAppointmentY = (entity, cellSize, collectorSizeY, collectorPosition) => {
  if (entity.isAllDayPanelOccupied && !entity.inStackWithCollector) {
    const sizeY = entity.maxLevel === 0 ? cellSize.sizeY - collectorSizeY : (cellSize.sizeY - collectorSizeY) / entity.maxLevel;
    const offsetY = entity.level * sizeY;
    return {
      sizeY,
      offsetY
    };
  }
  const maxSizeY = cellSize.sizeY - collectorSizeY;
  const sizeY = entity.maxLevel === 0 ? maxSizeY : maxSizeY / entity.maxLevel;
  let offsetY = entity.level * sizeY;
  if (collectorPosition === 'start') {
    offsetY += collectorSizeY;
  }
  return {
    sizeY,
    offsetY
  };
};
