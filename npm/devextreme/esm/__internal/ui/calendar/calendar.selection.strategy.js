/**
* DevExtreme (esm/__internal/ui/calendar/calendar.selection.strategy.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../core/utils/date';
import { isDefined } from '../../../core/utils/type';
class CalendarSelectionStrategy {
  constructor(component) {
    this.calendar = component;
  }
  dateValue(value, e) {
    this.calendar._dateValue(value, e);
  }
  skipNavigate() {
    this.calendar._skipNavigate = true;
  }
  updateAriaSelected(value, previousValue) {
    this.calendar._updateAriaSelected(value, previousValue);
    const {
      currentDate = new Date()
    } = this.calendar.option();
    if (value[0] && currentDate.getTime() === value[0].getTime()) {
      this.calendar._updateAriaId(value[0]);
    }
  }
  processValueChanged(val, previousVal) {
    var _value, _previousValue;
    let value = val;
    let previousValue = previousVal;
    if (isDefined(value) && !Array.isArray(value)) {
      value = [value];
    }
    if (isDefined(previousValue) && !Array.isArray(previousValue)) {
      previousValue = [previousValue];
    }
    value = ((_value = value) === null || _value === void 0 ? void 0 : _value.map(item => this._convertToDate(item))) ?? [];
    previousValue = ((_previousValue = previousValue) === null || _previousValue === void 0 ? void 0 : _previousValue.map(item => this._convertToDate(item))) ?? [];
    this._updateViewsValue(value.filter(item => item !== null));
    this.updateAriaSelected(value, previousValue);
    if (!this._currentDateChanged) {
      this.calendar._initCurrentDate();
    }
    this._currentDateChanged = false;
  }
  _isDateDisabled(date) {
    const min = this.calendar._getDateOption('min');
    const max = this.calendar._getDateOption('max');
    const isLessThanMin = isDefined(min) && date < min && !dateUtils.sameDate(min, date);
    const isBiggerThanMax = isDefined(max) && date > max && !dateUtils.sameDate(max, date);
    return this.calendar._view.isDateDisabled(date) || isLessThanMin || isBiggerThanMax;
  }
  _getLowestDateInArray(dates) {
    if (dates.length) {
      return new Date(Math.min(...dates.map(date => (date === null || date === void 0 ? void 0 : date.getTime()) ?? Infinity)));
    }
    return null;
  }
  _convertToDate(value) {
    return this.calendar._convertToDate(value);
  }
  _isMaxZoomLevel() {
    return this.calendar._isMaxZoomLevel();
  }
  _updateViewsOption(optionName, optionValue) {
    this.calendar._updateViewsOption(optionName, optionValue);
  }
  _updateViewsValue(value) {
    this._updateViewsOption('value', value);
  }
  _updateCurrentDate(value) {
    this.calendar.option('currentDate', value ?? new Date());
  }
  _shouldHandleWeekNumberClick() {
    const {
      selectionMode,
      selectWeekOnClick
    } = this.calendar.option();
    return selectWeekOnClick === true && selectionMode !== 'single';
  }
}
export default CalendarSelectionStrategy;
