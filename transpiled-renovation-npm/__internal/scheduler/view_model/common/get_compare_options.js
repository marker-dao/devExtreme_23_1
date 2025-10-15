"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompareOptions = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getCompareOptions = schedulerStore => {
  const workspace = schedulerStore.getWorkSpace();
  const dateRange = workspace.getDateRange();
  const compareOptions = {
    startDayHour: schedulerStore.getViewOption('startDayHour'),
    endDayHour: schedulerStore.getViewOption('endDayHour'),
    min: _m_utils_time_zone.default.createUTCDateWithLocalOffset(dateRange[0]).getTime(),
    max: _m_utils_time_zone.default.createUTCDateWithLocalOffset(dateRange[1]).getTime(),
    skippedDays: schedulerStore.currentView.skippedDays
  };
  return compareOptions;
};
exports.getCompareOptions = getCompareOptions;