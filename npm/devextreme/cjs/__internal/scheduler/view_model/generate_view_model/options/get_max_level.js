/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/options/get_max_level.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaxLevel = void 0;
var _swap_by_view_orientation = require("../steps/add_geometry/swap_by_view_orientation");
var _get_min_appointment_size = require("./get_min_appointment_size");
const ADAPTIVITY_MIN_APPOINTMENT_COUNT = 0;
const MIN_APPOINTMENT_COUNT = 1;
const CELL_MIN_Y = 30;
const getMaxLevel = _ref => {
  let {
    maxAppointmentsPerCell,
    cellSize,
    collectorSize,
    viewOrientation,
    isTimelineView,
    isAdaptivityEnabled
  } = _ref;
  switch (maxAppointmentsPerCell) {
    case 'auto':
      {
        if (isAdaptivityEnabled && viewOrientation === 'horizontal') {
          return ADAPTIVITY_MIN_APPOINTMENT_COUNT;
        }
        const cellSizeY = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(cellSize, viewOrientation).sizeY;
        const isSmallCell = cellSizeY < CELL_MIN_Y;
        if (isSmallCell) {
          return ADAPTIVITY_MIN_APPOINTMENT_COUNT;
        }
        const defaultAppointmentSize = (0, _get_min_appointment_size.getDefaultAppointmentSize)({
          isTimelineView,
          isAdaptivityEnabled,
          viewOrientation
        });
        const minAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(defaultAppointmentSize, viewOrientation);
        const collectorSizeY = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(collectorSize, viewOrientation).sizeY;
        const calculated = Math.floor(Math.max(0, cellSizeY - collectorSizeY) / minAbstractSize.sizeY);
        return Math.max(calculated, isAdaptivityEnabled ? ADAPTIVITY_MIN_APPOINTMENT_COUNT : MIN_APPOINTMENT_COUNT);
      }
    case 'unlimited':
      return -1;
    default:
      return parseInt(String(maxAppointmentsPerCell), 10);
  }
};
exports.getMaxLevel = getMaxLevel;
