"use strict";

exports.createTimeZoneCalculator = void 0;
var _utils = require("./utils");
var _m_utils_time_zone = _interopRequireDefault(require("../../../../__internal/scheduler/m_utils_time_zone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createTimeZoneCalculator = currentTimeZone => new _utils.TimeZoneCalculator({
  getClientOffset: date => _m_utils_time_zone.default.getClientTimezoneOffset(date),
  tryGetCommonOffset: date => _m_utils_time_zone.default.calculateTimezoneByValue(currentTimeZone, date),
  tryGetAppointmentOffset: (date, appointmentTimezone) => _m_utils_time_zone.default.calculateTimezoneByValue(appointmentTimezone, date)
});
exports.createTimeZoneCalculator = createTimeZoneCalculator;