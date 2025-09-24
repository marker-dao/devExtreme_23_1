/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtering/m_appointment_filter.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentFilterBaseStrategy = void 0;
var _index = require("../../r1/utils/index");
var _appointment_adapter = require("../../utils/appointment_adapter/appointment_adapter");
var _index2 = require("./utils/index");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// TODO Vinogradov refactoring: this module should be refactored :)
class AppointmentFilterBaseStrategy {
  constructor(options) {
    this.options = options;
    this.dataAccessors = this.options.dataAccessors;
  }
  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }
  get viewStartDayHour() {
    return this._resolveOption('startDayHour');
  }
  get viewEndDayHour() {
    return this._resolveOption('endDayHour');
  }
  get firstDayOfWeek() {
    return this._resolveOption('firstDayOfWeek');
  }
  get showAllDayPanel() {
    return this._resolveOption('showAllDayPanel');
  }
  get supportAllDayRow() {
    return this._resolveOption('supportAllDayRow');
  }
  get viewType() {
    return this._resolveOption('viewType');
  }
  get viewDirection() {
    return this._resolveOption('viewDirection');
  }
  get dateRange() {
    return this._resolveOption('dateRange');
  }
  get groupCount() {
    return this._resolveOption('groupCount');
  }
  get viewDataProvider() {
    return this._resolveOption('viewDataProvider');
  }
  get allDayPanelMode() {
    return this._resolveOption('allDayPanelMode');
  }
  _resolveOption(name) {
    const result = this.options[name];
    return typeof result === 'function' ? result() : result;
  }
  getIntervals(compareOptions) {
    const viewOffset = this._resolveOption('viewOffset');
    const intervals = {
      visibleDateIntervals: (0, _index2.getVisibleDateTimeIntervals)(compareOptions, true),
      visibleTimeIntervals: (0, _index2.getVisibleDateTimeIntervals)(compareOptions, false)
    };
    intervals.visibleDateIntervals = (0, _index2.shiftIntervals)(intervals.visibleDateIntervals, viewOffset);
    intervals.visibleTimeIntervals = (0, _index2.shiftIntervals)(intervals.visibleTimeIntervals, viewOffset);
    return intervals;
  }
  getFilterOptions() {
    const [min, max] = this.dateRange;
    const allDayPanelFilter = !this.showAllDayPanel && this.supportAllDayRow ? false : undefined;
    const compareOptions = {
      startDayHour: this.viewStartDayHour,
      endDayHour: this.viewEndDayHour,
      min: new Date(min),
      max: new Date(max)
    };
    return _extends({}, compareOptions, this.getIntervals(compareOptions), {
      resources: this.options.getResourceManager().groupResources(),
      firstDayOfWeek: this.firstDayOfWeek,
      allDayPanelFilter,
      allDayPanelMode: this.allDayPanelMode,
      supportAllDayRow: this.supportAllDayRow,
      viewOffset: this._resolveOption('viewOffset')
    });
  }
  filter(preparedItems) {
    const filterOptions = this.getFilterOptions();
    const combinedFilter = this.createCombinedFilter(filterOptions);
    const filteredItems = (0, _index2.filterArray)(preparedItems, combinedFilter);
    return (0, _index2.getRawAppointments)(filteredItems);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasAllDayAppointments(filteredItems, preparedItems) {
    return filteredItems.map(item => new _appointment_adapter.AppointmentAdapter(item, this.dataAccessors)).some(item => (0, _index.isAppointmentTakesAllDay)(item, this.allDayPanelMode));
  }
  createCombinedFilter(filterOptions) {
    return [[(0, _index2.getAppointmentFilter)(filterOptions, this.timeZoneCalculator)]];
  }
}
exports.AppointmentFilterBaseStrategy = AppointmentFilterBaseStrategy;
AppointmentFilterBaseStrategy.strategyName = 'standard';
