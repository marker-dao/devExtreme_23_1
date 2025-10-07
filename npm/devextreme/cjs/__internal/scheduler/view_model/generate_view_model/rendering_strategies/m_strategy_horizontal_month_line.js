/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/rendering_strategies/m_strategy_horizontal_month_line.js)
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
exports.default = void 0;
var _query = _interopRequireDefault(require("../../../../../common/data/query"));
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
var _m_utils = require("../../../appointments/utils/m_utils");
var _m_strategy_horizontal = _interopRequireDefault(require("./m_strategy_horizontal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ZERO_APPOINTMENT_DURATION_IN_DAYS = 1;
class HorizontalMonthLineRenderingStrategy extends _m_strategy_horizontal.default {
  calculateAppointmentWidth(_, position) {
    const {
      startDate: startDateWithTime,
      normalizedEndDate
    } = position.info.appointment;
    const startDate = _date.default.trimTime(startDateWithTime);
    const cellWidth = this.cellWidth || this.getAppointmentMinSize();
    const duration = Math.ceil(this._getDurationInDays(startDate, normalizedEndDate));
    let width = this.cropAppointmentWidth(duration * cellWidth, cellWidth);
    if (this.isVirtualScrolling) {
      const skippedDays = this.viewDataProvider.getSkippedDaysCount(position.groupIndex, startDate, normalizedEndDate, duration);
      width -= skippedDays * cellWidth;
    }
    return width;
  }
  _columnCondition(a, b) {
    const conditions = this._getConditions(a, b);
    return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition;
  }
  _getDurationInDays(startDate, endDate) {
    const adjustedDuration = this._adjustDurationByDaylightDiff(endDate.getTime() - startDate.getTime(), startDate, endDate);
    return adjustedDuration / _date.default.dateToMilliseconds('day') || ZERO_APPOINTMENT_DURATION_IN_DAYS;
  }
  isAllDay() {
    return false;
  }
  createTaskPositionMap(items, skipSorting) {
    if (!skipSorting) {
      (0, _m_utils.sortAppointmentsByStartDate)(items, this.dataAccessors);
    }
    return super.createTaskPositionMap(items);
  }
  _getSortedPositions(map, skipSorting) {
    let result = super._getSortedPositions(map);
    if (!skipSorting) {
      // @ts-expect-error
      result = (0, _query.default)(result).sortBy('top').thenBy('left').thenBy('cellPosition').thenBy('i').toArray();
    }
    return result;
  }
  getPositionShift(timeShift) {
    return {
      top: 0,
      left: 0,
      cellPosition: timeShift * this.cellWidth
    };
  }
}
var _default = exports.default = HorizontalMonthLineRenderingStrategy;
