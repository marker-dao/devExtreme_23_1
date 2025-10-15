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