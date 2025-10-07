/**
* DevExtreme (cjs/__internal/ui/calendar/calendar.range.selection.strategy.js)
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
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _calendarSelection = _interopRequireDefault(require("./calendar.selection.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DAY_INTERVAL = 86400000;
class CalendarRangeSelectionStrategy extends _calendarSelection.default {
  constructor(component) {
    super(component);
    this.NAME = 'RangeSelection';
  }
  dateOption(optionName) {
    if (optionName === 'value') {
      return this.calendar._getDateOption('value') || null;
    }
    return this.calendar._getDateOption(optionName);
  }
  getViewOptions() {
    const value = this._getValue();
    const range = this._getDaysInRange(value[0], value[1]);
    return {
      value,
      range,
      selectionMode: 'range',
      onCellHover: this._cellHoverHandler.bind(this),
      onWeekNumberClick: this._shouldHandleWeekNumberClick() ? this._weekNumberClickHandler.bind(this) : null
    };
  }
  selectValue(selectedValue, e) {
    const [startDate, endDate] = this._getValue();
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    const {
      allowChangeSelectionOrder,
      currentSelection
    } = this.calendar.option();
    if (allowChangeSelectionOrder === true) {
      this.calendar._valueSelected = true;
      const convertedSelectedValue = this.calendar._convertToDate(selectedValue);
      if (currentSelection === 'startDate') {
        if (convertedSelectedValue > (this.calendar._convertToDate(endDate) ?? new Date(0))) {
          this.dateValue([selectedValue, null], e);
        } else {
          this.dateValue([selectedValue, endDate], e);
        }
      } else if (convertedSelectedValue >= (this.calendar._convertToDate(startDate) ?? new Date(0))) {
        this.dateValue([startDate, selectedValue], e);
      } else {
        this.dateValue([selectedValue, null], e);
      }
    } else if (!startDate || endDate) {
      this.dateValue([selectedValue, null], e);
    } else {
      this.dateValue(startDate < selectedValue ? [startDate, selectedValue] : [selectedValue, startDate], e);
    }
  }
  updateAriaSelected(val, previousVal) {
    const value = val ?? this._getValue();
    const previousValue = previousVal ?? [];
    super.updateAriaSelected(value, previousValue);
  }
  processValueChanged(value, previousValue) {
    super.processValueChanged(value, previousValue);
    const range = this._getRange();
    this._updateViewsOption('range', range);
  }
  getDefaultCurrentDate() {
    const {
      allowChangeSelectionOrder,
      currentSelection
    } = this.calendar.option();
    const value = this.dateOption('value');
    if (allowChangeSelectionOrder) {
      if (currentSelection === 'startDate' && value[0]) {
        return value[0];
      }
      if (currentSelection === 'endDate' && value[1]) {
        return value[1];
      }
    }
    const dates = value.filter(date => date !== null);
    return this._getLowestDateInArray(dates);
  }
  restoreValue() {
    this.calendar.option('value', [null, null]);
  }
  _getValue() {
    const value = this.dateOption('value');
    if (!value.length) {
      return value;
    }
    let [startDate, endDate] = value;
    if (startDate && endDate && startDate > endDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    return [startDate, endDate];
  }
  _getRange() {
    const [startDate, endDate] = this._getValue();
    return this._getDaysInRange(startDate, endDate);
  }
  _getDaysInRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return [];
    }
    const {
      currentDate,
      viewsCount
    } = this.calendar.option();
    const isAdditionalViewDate = this.calendar._isAdditionalViewDate(currentDate);
    const firstDateInViews = _date.default.getFirstMonthDate(currentDate, isAdditionalViewDate ? -2 : -1);
    const lastDateInViews = _date.default.getLastMonthDate(currentDate, isAdditionalViewDate ? 1 : viewsCount);
    const rangeStartDate = new Date(Math.max(firstDateInViews.getTime(), startDate.getTime()));
    const rangeEndDate = new Date(Math.min(lastDateInViews.getTime(), endDate.getTime()));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [..._date.default.getDatesOfInterval(rangeStartDate, rangeEndDate, DAY_INTERVAL), rangeEndDate];
  }
  _cellHoverHandler(e) {
    const isMaxZoomLevel = this._isMaxZoomLevel();
    const [startDate, endDate] = this._getValue();
    const {
      allowChangeSelectionOrder,
      currentSelection
    } = this.calendar.option();
    if (isMaxZoomLevel) {
      const skipHoveredRange = allowChangeSelectionOrder && currentSelection === 'startDate';
      if (startDate && !endDate && !skipHoveredRange) {
        if (e.value > startDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(startDate, e.value));
          return;
        }
      } else if (!startDate && endDate && !(allowChangeSelectionOrder && currentSelection === 'endDate')) {
        if (e.value < endDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(e.value, endDate));
          return;
        }
      } else if (startDate && endDate) {
        if (currentSelection === 'startDate' && e.value < startDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(e.value, startDate));
          return;
        }
        if (currentSelection === 'endDate' && e.value > endDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(endDate, e.value));
          return;
        }
      }
      this._updateViewsOption('hoveredRange', []);
    }
  }
  _weekNumberClickHandler(_ref) {
    let {
      rowDates,
      event
    } = _ref;
    const selectedDates = rowDates.filter(date => !this._isDateDisabled(date));
    const value = selectedDates.length ? [selectedDates[0], selectedDates[selectedDates.length - 1]] : [null, null];
    this.dateValue(value, event);
  }
}
var _default = exports.default = CalendarRangeSelectionStrategy;
