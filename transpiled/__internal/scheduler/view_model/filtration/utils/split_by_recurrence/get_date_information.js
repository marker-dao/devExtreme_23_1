"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateOffsetMs = exports.getDateInformation = exports.findDSTOfDay = void 0;
var _date = _interopRequireDefault(require("../../../../../../core/utils/date"));
var _global_cache = require("../../../../global_cache");
var _m_utils_time_zone = _interopRequireDefault(require("../../../../m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const toMs = _date.default.dateToMilliseconds;
const getOffsetHours = _m_utils_time_zone.default.calculateTimezoneByValue;
const HOUR_MS = toMs('hour');
const roundToHour = date => Math.round(date / HOUR_MS) * HOUR_MS;
// NOTE: There is cases when DST appears in one month, but it happens in different days,
// so cache it by day. If there is no DST, then it requires 2 offset request,
// if day has DST, then it requires 2 + log2(24*2/3) ~ 7 offset requests
// and 0 offset requests if we already checked this day
const findDSTOfDay = (date, timeZone) => {
  const minDate = new Date(date).setUTCHours(0, 0, 0, 0);
  return _global_cache.globalCache.DST.memo(`${minDate}${timeZone}`, () => {
    const min = roundToHour(minDate - HOUR_MS);
    const max = roundToHour(minDate + toMs('day') + HOUR_MS);
    const minOffset = getOffsetHours(timeZone, min) ?? 0;
    const maxOffset = getOffsetHours(timeZone, max) ?? 0;
    if (minOffset === maxOffset) {
      return [-date, minOffset * HOUR_MS, maxOffset * HOUR_MS];
    }
    let left = min;
    let right = max;
    while (right - left > HOUR_MS / 3) {
      const mid = left + (right - left) / 2;
      const offset = getOffsetHours(timeZone, roundToHour(mid));
      if (offset === minOffset) {
        left = mid;
      } else {
        right = mid;
      }
    }
    return [roundToHour(left) + HOUR_MS, minOffset * HOUR_MS, maxOffset * HOUR_MS];
  });
};
exports.findDSTOfDay = findDSTOfDay;
const getDateInformation = (date, timeZone) => {
  const [targetDST, beforeDSTOffset, afterDSTOffset] = findDSTOfDay(date, timeZone);
  const deltaMs = afterDSTOffset - beforeDSTOffset;
  const condition = deltaMs > 0 ? date < targetDST + deltaMs : date < targetDST;
  return {
    offsetMs: condition ? beforeDSTOffset : afterDSTOffset,
    isUnreachableTime: deltaMs > 0 && date >= targetDST && date < targetDST + deltaMs,
    isDoubleTimeStart: date === targetDST,
    deltaMs
  };
};
exports.getDateInformation = getDateInformation;
const getDateOffsetMs = (date, timeZone) => timeZone ? getDateInformation(date, timeZone).offsetMs : 0;
exports.getDateOffsetMs = getDateOffsetMs;