/**
* DevExtreme (renovation/ui/scheduler/view_model/to_test/views/utils/agenda.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.calculateStartViewDate = void 0;
var _base = require("./base");
const calculateStartViewDate = (currentDate, startDayHour) => {
  const validCurrentDate = new Date(currentDate);
  return (0, _base.setOptionHour)(validCurrentDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;