/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/options/get_min_appointment_size.js)
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
exports.getMinAppointmentSize = exports.getDefaultAppointmentSize = void 0;
var _themes = require("../../../../../ui/themes");
const COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT = 18;
const APPOINTMENT_DEFAULT_HEIGHT = 20;
const APPOINTMENT_DEFAULT_HORIZONTAL_WIDTH = 40;
const APPOINTMENT_DEFAULT_VERTICAL_WIDTH = 50;
const APPOINTMENT_MIN_HEIGHT = 35;
const APPOINTMENT_MIN_WIDTH = 40;
const TIMELINE_APPOINTMENT_DEFAULT_HEIGHT = 60;
const ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH = 30; // used for vertical view
// TODO get rid of depending from themes
const isCompactTheme = () => ((0, _themes.current)() || '').split('.').pop() === 'compact';
const getMinAppointmentHeightByTheme = () => isCompactTheme() ? COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT : APPOINTMENT_DEFAULT_HEIGHT;
const getMinAppointmentSize = _ref => {
  let {
    isTimelineView,
    isAdaptivityEnabled
  } = _ref;
  if (isAdaptivityEnabled) {
    return {
      width: ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH,
      height: ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH
    };
  }
  return {
    width: APPOINTMENT_MIN_WIDTH,
    height: isTimelineView ? APPOINTMENT_MIN_HEIGHT : getMinAppointmentHeightByTheme()
  };
};
exports.getMinAppointmentSize = getMinAppointmentSize;
const getDefaultAppointmentSize = _ref2 => {
  let {
    isTimelineView,
    isAdaptivityEnabled,
    viewOrientation
  } = _ref2;
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
