/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/add_geometry.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGeometry = void 0;
var _add_adaptivity_geometry_inside_interval = require("./add_adaptivity_geometry_inside_interval");
var _add_geometry_inside_interval = require("./add_geometry_inside_interval");
var _add_grouping_offset = require("./add_grouping_offset");
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
const addGeometry = (entities, options) => entities.map(rawEntity => {
  const {
    isAdaptivityEnabled,
    maxAppointmentsPerCell
  } = options;
  const entity = isAdaptivityEnabled && maxAppointmentsPerCell === 0 ? (0, _add_adaptivity_geometry_inside_interval.addAdaptivityGeometryInsideInterval)(rawEntity, options) : (0, _add_geometry_inside_interval.addGeometryInsideInterval)(rawEntity, options);
  addPanelOffset(entity, options);
  (0, _add_grouping_offset.addGroupingOffset)(entity, options);
  RTLSwap(entity, options);
  return entity;
});
exports.addGeometry = addGeometry;
