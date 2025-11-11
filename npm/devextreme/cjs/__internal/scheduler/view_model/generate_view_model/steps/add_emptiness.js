/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_emptiness.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEmptiness = void 0;
var _get_min_appointment_size = require("../options/get_min_appointment_size");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const addEmptiness = (entities, options) => {
  const minSize = (0, _get_min_appointment_size.getMinAppointmentSize)(options);
  return entities.map(entity => _extends({}, entity, {
    empty: !entity.isAllDayPanelOccupied && (entity.height < minSize.height || entity.width < minSize.width)
  }));
};
exports.addEmptiness = addEmptiness;
