"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptAgendaSettings = void 0;
var _appointment_adapter = require("../../utils/appointment_adapter/appointment_adapter");
var _plain_view_model = require("./plain_view_model");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const adaptAgendaSettings = (viewModel, dataAccessor, timeZoneCalculator) => {
  const settings = (0, _plain_view_model.plainViewModel)(viewModel);
  return settings.map(item => {
    const {
      agendaSettings
    } = item;
    const adapter = new _appointment_adapter.AppointmentAdapter(agendaSettings ?? item.itemData, dataAccessor);
    return {
      isAgendaModel: true,
      itemData: item.itemData,
      allDay: Boolean(item.allDay),
      groupIndex: item.groupIndex,
      sortedIndex: item.sortedIndex,
      direction: item.direction,
      height: item.height,
      width: item.width,
      info: {
        sourceAppointment: {
          allDay: item.allDay,
          startDate: adapter.startDate,
          endDate: adapter.endDate
        },
        appointment: _extends({
          allDay: item.allDay
        }, adapter.getCalculatedDates(timeZoneCalculator, 'toGrid'))
      }
    };
  });
};
exports.adaptAgendaSettings = adaptAgendaSettings;