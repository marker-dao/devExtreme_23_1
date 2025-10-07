/**
* DevExtreme (cjs/__internal/ui/calendar/calendar.single.selection.strategy.js)
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
var _calendarSelection = _interopRequireDefault(require("./calendar.selection.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CalendarSingleSelectionStrategy extends _calendarSelection.default {
  constructor(component) {
    super(component);
    this.NAME = 'SingleSelection';
  }
  dateOption(optionName) {
    if (optionName === 'value') {
      return this.calendar._getDateOption('value');
    }
    return this.calendar._getDateOption(optionName);
  }
  getViewOptions() {
    const value = this.dateOption('value') ?? undefined;
    return {
      value,
      range: [],
      selectionMode: 'single'
    };
  }
  selectValue(selectedValue, e) {
    this.skipNavigate();
    this.dateValue(selectedValue, e);
  }
  updateAriaSelected(val, previousVal) {
    const value = val ?? [this.dateOption('value')];
    const previousValue = previousVal ?? [];
    super.updateAriaSelected(value, previousValue);
  }
  getDefaultCurrentDate() {
    return this.dateOption('value');
  }
  restoreValue() {
    this.calendar.option('value', null);
  }
  _updateViewsValue(value) {
    this._updateViewsOption('value', value[0]);
  }
}
var _default = exports.default = CalendarSingleSelectionStrategy;
