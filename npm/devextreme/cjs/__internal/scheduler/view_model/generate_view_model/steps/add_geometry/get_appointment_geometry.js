/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/get_appointment_geometry.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentGeometry = void 0;
var _get_appointment_abstract_geometry = require("./get_appointment_abstract_geometry");
var _swap_by_view_orientation = require("./swap_by_view_orientation");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getAppointmentGeometry = (entity, _ref) => {
  let {
    collectorPosition,
    cellSize,
    collectorWithMarginsSize,
    viewOrientation,
    cells
  } = _ref;
  const cellAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(cellSize, viewOrientation);
  const collectorFullAbstractSize = (0, _swap_by_view_orientation.getAbstractSizeByViewOrientation)(collectorWithMarginsSize, viewOrientation);
  const abstractGeometry = _extends({}, (0, _get_appointment_abstract_geometry.getAppointmentX)(entity, cellAbstractSize, cells), (0, _get_appointment_abstract_geometry.getAppointmentY)(entity, cellAbstractSize, collectorFullAbstractSize.sizeY, collectorPosition));
  const entityGeometry = (0, _swap_by_view_orientation.getRealSizeByViewOrientation)(abstractGeometry, viewOrientation);
  return entityGeometry;
};
exports.getAppointmentGeometry = getAppointmentGeometry;
