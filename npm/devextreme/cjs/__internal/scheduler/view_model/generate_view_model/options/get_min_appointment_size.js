/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/options/get_min_appointment_size.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMinAppointmentSize = exports.getDefaultAppointmentSize = void 0;
var _themes = require("../../../../../ui/themes");
const COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT = 18;
const APPOINTMENT_DEFAULT_HEIGHT = 20;
const DAY_VIEW_APPOINTMENT_MIN_HEIGHT = 12;
const APPOINTMENT_DEFAULT_HORIZONTAL_WIDTH = 40;
const APPOINTMENT_DEFAULT_VERTICAL_WIDTH = 50;
const APPOINTMENT_MIN_HEIGHT = 35;
const APPOINTMENT_MIN_WIDTH = 40;
const TIMELINE_APPOINTMENT_DEFAULT_HEIGHT = 60;
const ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH = 30; // used for vertical view
// TODO get rid of depending from themes
const getMinAppointmentHeightByTheme = () => (0, _themes.isCompact)((0, _themes.current)()) ? COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT : APPOINTMENT_DEFAULT_HEIGHT;
const getMinAppointmentSize = options => {
  const {
    isTimelineView,
    isAdaptivityEnabled,
    isMonthView,
    isAllDayAppointment
  } = options;
  if (isAdaptivityEnabled) {
    return {
      width: ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH,
      height: ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH
    };
  }
  if (isTimelineView) {
    return {
      width: APPOINTMENT_MIN_WIDTH,
      height: APPOINTMENT_MIN_HEIGHT
    };
  }
  const width = APPOINTMENT_MIN_WIDTH;
  const height = isMonthView || isAllDayAppointment ? getMinAppointmentHeightByTheme() : DAY_VIEW_APPOINTMENT_MIN_HEIGHT;
  return {
    width,
    height
  };
};
exports.getMinAppointmentSize = getMinAppointmentSize;
const getDefaultAppointmentSize = _ref => {
  let {
    isTimelineView,
    isAdaptivityEnabled,
    viewOrientation
  } = _ref;
  if (isAdaptivityEnabled) {
    return {
      width: ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH,
      height: ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH
    };
  }
  return {
    width: viewOrientation === 'vertical' ? APPOINTMENT_DEFAULT_VERTICAL_WIDTH : APPOINTMENT_DEFAULT_HORIZONTAL_WIDTH,
    height: isTimelineView ? TIMELINE_APPOINTMENT_DEFAULT_HEIGHT : getMinAppointmentHeightByTheme()
  };
};
exports.getDefaultAppointmentSize = getDefaultAppointmentSize;
