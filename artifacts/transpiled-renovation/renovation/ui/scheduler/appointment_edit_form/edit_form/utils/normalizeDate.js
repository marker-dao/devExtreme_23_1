"use strict";

exports.normalizeNewStartDate = exports.normalizeNewEndDate = void 0;
var _date_serialization = _interopRequireDefault(require("../../../../../../core/utils/date_serialization"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var validateAppointmentFormDate = function validateAppointmentFormDate(date) {
  return date === null || !!date && !!new Date(date).getDate();
};
var normalizeNewDate = function normalizeNewDate(newDate, currentDate, currentOppositeDate, needCorrect) {
  if (!validateAppointmentFormDate(newDate)) {
    return currentDate;
  }
  var normalizedDate = _date_serialization.default.deserializeDate(newDate);
  var normalizedOppositeDate = _date_serialization.default.deserializeDate(currentOppositeDate);
  var result = normalizedDate;
  if (normalizedOppositeDate && normalizedDate && needCorrect(normalizedOppositeDate, normalizedDate)) {
    var duration = normalizedOppositeDate.getTime() - normalizedDate.getTime();
    result = new Date(normalizedDate.getTime() + duration);
  }
  return result;
};
var normalizeNewStartDate = function normalizeNewStartDate(newStartDate, currentStartDate, currentEndDate) {
  return normalizeNewDate(newStartDate, currentStartDate, currentEndDate, function (endDate, startDate) {
    return endDate < startDate;
  });
};
exports.normalizeNewStartDate = normalizeNewStartDate;
var normalizeNewEndDate = function normalizeNewEndDate(newEndDate, currentStartDate, currentEndDate) {
  return normalizeNewDate(newEndDate, currentEndDate, currentStartDate, function (startDate, endDate) {
    return endDate < startDate;
  });
};
exports.normalizeNewEndDate = normalizeNewEndDate;