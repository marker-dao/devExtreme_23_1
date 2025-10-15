"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAllDayPanelOccupation = void 0;
var _base = require("../../../r1/utils/base");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const addAllDayPanelOccupation = (entities, _ref) => {
  let {
    supportAllDayPanel,
    allDayPanelMode
  } = _ref;
  return entities.map(entity => {
    const isAllDayPanelOccupied = supportAllDayPanel && (0, _base.isAppointmentTakesAllDay)({
      allDay: entity.allDay,
      startDate: new Date(entity.source.startDate),
      endDate: new Date(entity.source.endDate)
    }, allDayPanelMode);
    return _extends({}, entity, {
      isAllDayPanelOccupied
    });
  });
};
exports.addAllDayPanelOccupation = addAllDayPanelOccupation;