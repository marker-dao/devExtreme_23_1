/**
* DevExtreme (cjs/__internal/scheduler/workspaces/view_model/m_view_data_generator_day.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewDataGeneratorDay = void 0;
var _index = require("../../r1/utils/index");
var _m_view_data_generator = require("./m_view_data_generator");
class ViewDataGeneratorDay extends _m_view_data_generator.ViewDataGenerator {
  _calculateStartViewDate(options) {
    return _index.dayUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount));
  }
}
exports.ViewDataGeneratorDay = ViewDataGeneratorDay;
