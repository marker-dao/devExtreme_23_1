"use strict";

exports.normalizeNewStartDate = exports.normalizeNewEndDate = void 0;
var _date_serialization = _interopRequireDefault(require("../../../../../../core/utils/date_serialization"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validateAppointmentFormDate = date => date === null || !!date && !!new Date(date).getDate();
const normalizeNewDate = (newDate, currentDate, currentOppositeDate, needCorrect) => {
  if (!validateAppointmentFormDate(newDate)) {
    return currentDate;
  }
  const normalizedDate = _date_serialization.default.deserializeDate(newDate);
  const normalizedOppositeDate = _date_serialization.default.deserializeDate(currentOppositeDate);
  let result = normalizedDate;
  if (normalizedOppositeDate && normalizedDate && needCorrect(normalizedOppositeDate, normalizedDate)) {
    const duration = normalizedOppositeDate.getTime() - normalizedDate.getTime();
    result = new Date(normalizedDate.getTime() + duration);
  }
  return result;
};
const normalizeNewStartDate = (newStartDate, currentStartDate, currentEndDate) => normalizeNewDate(newStartDate, currentStartDate, currentEndDate, (endDate, startDate) => endDate < startDate);
exports.normalizeNewStartDate = normalizeNewStartDate;
const normalizeNewEndDate = (newEndDate, currentStartDate, currentEndDate) => normalizeNewDate(newEndDate, currentEndDate, currentStartDate, (startDate, endDate) => endDate < startDate);
exports.normalizeNewEndDate = normalizeNewEndDate;