"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAllDayPanelOccupation = void 0;
var _base = require("../../../r1/utils/base");
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
    return Object.assign({}, entity, {
      isAllDayPanelOccupied
    });
  });
};
exports.addAllDayPanelOccupation = addAllDayPanelOccupation;