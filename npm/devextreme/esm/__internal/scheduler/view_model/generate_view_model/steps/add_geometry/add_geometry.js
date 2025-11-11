/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/add_geometry.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { addAdaptivityGeometryInsideInterval } from './add_adaptivity_geometry_inside_interval';
import { addGeometryInsideInterval } from './add_geometry_inside_interval';
import { addGroupingOffset } from './add_grouping_offset';
const RTLSwap = (entity, _ref) => {
  let {
    panelSize,
    isRTLEnabled
  } = _ref;
  if (isRTLEnabled) {
    const deltaWidth = entity.items.length ? 0 : entity.width;
    entity.left = panelSize.width - entity.left - deltaWidth;
  }
};
const addPanelOffset = (entity, _ref2) => {
  let {
    cellSize,
    viewOrientation,
    isTimelineView
  } = _ref2;
  switch (true) {
    case viewOrientation === 'horizontal' && !isTimelineView:
      // month
      entity.top += entity.rowIndex * cellSize.height;
      break;
    case viewOrientation === 'horizontal' && isTimelineView: // timelineX
    case viewOrientation === 'vertical':
      // day, week, workWeek
      entity.left += entity.rowIndex * cellSize.width;
      break;
    default:
  }
};
export const addGeometry = (entities, options) => entities.map(rawEntity => {
  const {
    isAdaptivityEnabled,
    maxAppointmentsPerCell
  } = options;
  const entity = isAdaptivityEnabled && maxAppointmentsPerCell === 0 ? addAdaptivityGeometryInsideInterval(rawEntity, options) : addGeometryInsideInterval(rawEntity, options);
  addPanelOffset(entity, options);
  addGroupingOffset(entity, options);
  RTLSwap(entity, options);
  return entity;
});
