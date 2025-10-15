"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByVirtualScreen = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../../../m_utils_time_zone"));
var _is_appointment_matched_intervals = require("../../common/is_appointment_matched_intervals");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const filterByVirtualScreen = (entities, viewDataProvider, isVirtualScrolling) => {
  if (!isVirtualScrolling) {
    return entities;
  }
  const groupsInfo = viewDataProvider.getCompletedGroupsInfo();
  const groupIntervalsMap = new Map();
  groupsInfo.forEach(group => {
    groupIntervalsMap.set(group.groupIndex, {
      min: _m_utils_time_zone.default.createUTCDateWithLocalOffset(group.startDate).getTime(),
      max: _m_utils_time_zone.default.createUTCDateWithLocalOffset(group.endDate).getTime()
    });
  });
  return entities.filter(appointment => {
    const groupInterval = groupIntervalsMap.get(appointment.groupIndex);
    if (!groupInterval) {
      return false;
    }
    if (appointment.isAllDayPanelOccupied) {
      return true;
    }
    return (0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
      startDate: appointment.startDateUTC,
      endDate: appointment.endDateUTC
    }, [groupInterval]);
  });
};
exports.filterByVirtualScreen = filterByVirtualScreen;