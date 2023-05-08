class CalendarSelectionStrategy {
  constructor(component) {
    this.calendar = component;
  }
  dateOption(optionName) {
    return this.calendar._dateOption(optionName);
  }
  dateValue(value, e) {
    this.calendar._dateValue(value, e);
  }
  skipNavigate() {
    this.calendar._skipNavigate = true;
  }
  updateAriaSelected(value, previousValue) {
    this.calendar._updateAriaSelected(value, previousValue);
    if (value[0] && this.calendar.option('currentDate').getTime() === value[0].getTime()) {
      this.calendar._updateAriaId(value[0]);
    }
  }
  processValueChanged(value, previousValue) {
    var _value, _previousValue;
    value = ((_value = value) === null || _value === void 0 ? void 0 : _value.map(item => this._convertToDate(item))) || [];
    previousValue = ((_previousValue = previousValue) === null || _previousValue === void 0 ? void 0 : _previousValue.map(item => this._convertToDate(item))) || [];
    this._updateViewsValue(value);
    this.updateAriaSelected(value, previousValue);
    if (!this._currentDateChanged) {
      this.calendar._initCurrentDate();
    }
    this._currentDateChanged = false;
  }
  _getLowestDateInArray(dates) {
    if (dates.length) {
      return new Date(Math.min(...dates));
    }
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
    this.calendar.option('currentDate', value !== null && value !== void 0 ? value : new Date());
  }
}
export default CalendarSelectionStrategy;