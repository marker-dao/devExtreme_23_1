"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEmptiness = void 0;
var _get_min_appointment_size = require("../options/get_min_appointment_size");
const addEmptiness = (entities, options) => entities.map(entity => {
  const minSize = (0, _get_min_appointment_size.getMinAppointmentSize)(Object.assign({}, options, {
    isAllDayAppointment: entity.allDay
  }));
  return Object.assign({}, entity, {
    empty: !entity.isAllDayPanelOccupied && (entity.height < minSize.height || entity.width < minSize.width)
  });
});
exports.addEmptiness = addEmptiness;