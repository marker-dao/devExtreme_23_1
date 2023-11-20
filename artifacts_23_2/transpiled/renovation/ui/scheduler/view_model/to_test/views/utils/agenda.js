"use strict";

exports.calculateStartViewDate = void 0;
var _base = require("./base");
const calculateStartViewDate = (currentDate, startDayHour) => {
  const validCurrentDate = new Date(currentDate);
  return (0, _base.setOptionHour)(validCurrentDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;