/**
* DevExtreme (renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange.js)
* Version: 23.2.2
* Build date: Mon Nov 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getSkippedHoursInRange = (startDate, endDate, viewDataProvider) => {
  const msInHour = _date.default.dateToMilliseconds('hour');
  const startTime = _date.default.trimTime(startDate).getTime();
  const endTime = _date.default.setToDayEnd(new Date(endDate.getTime() - 1)).getTime();
  const allDayIntervalDuration = 24 * msInHour;
  let excludedHours = 0;
  for (let time = startTime; time < endTime; time += allDayIntervalDuration) {
    const checkDate = new Date(time);
    if (viewDataProvider.isSkippedDate(checkDate)) {
      excludedHours += 24;
    }
  }
  return excludedHours;
};
var _default = getSkippedHoursInRange;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
