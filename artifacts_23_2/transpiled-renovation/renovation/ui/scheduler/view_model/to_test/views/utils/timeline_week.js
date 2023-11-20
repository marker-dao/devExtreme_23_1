"use strict";

exports.getDateForHeaderText = void 0;
var _base = require("./base");
const getDateForHeaderText = (index, date, _ref) => {
  let {
    cellCountInDay,
    interval,
    startDayHour,
    startViewDate,
    viewOffset
  } = _ref;
  return (0, _base.getValidCellDateForLocalTimeFormat)(date, {
    startViewDate,
    startDayHour,
    cellIndexShift: index % cellCountInDay * interval,
    viewOffset
  });
};
exports.getDateForHeaderText = getDateForHeaderText;