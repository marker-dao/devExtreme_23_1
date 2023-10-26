"use strict";

exports.getDateForHeaderText = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../../../../../../../__internal/scheduler/m_utils_time_zone"));
var _base = require("./base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getDateForHeaderText = (index, date, options) => {
  if (!_m_utils_time_zone.default.isTimezoneChangeInDate(date)) {
    return date;
  }
  const {
    cellCountInDay,
    interval,
    startDayHour,
    startViewDate
  } = options;
  const result = (0, _base.getStartViewDateWithoutDST)(startViewDate, startDayHour);
  const validIndex = index % cellCountInDay;
  result.setTime(result.getTime() + validIndex * interval);
  return result;
};
exports.getDateForHeaderText = getDateForHeaderText;