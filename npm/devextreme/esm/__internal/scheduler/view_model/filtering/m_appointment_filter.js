/**
* DevExtreme (esm/__internal/scheduler/view_model/filtering/m_appointment_filter.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isAppointmentTakesAllDay } from '../../r1/utils/index';
import { AppointmentAdapter } from '../../utils/appointment_adapter/appointment_adapter';
import { filterArray, getAppointmentFilter, getRawAppointments, getVisibleDateTimeIntervals, shiftIntervals } from './utils/index';
// TODO Vinogradov refactoring: this module should be refactored :)
export class AppointmentFilterBaseStrategy {
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
      visibleDateIntervals: getVisibleDateTimeIntervals(compareOptions, true),
      visibleTimeIntervals: getVisibleDateTimeIntervals(compareOptions, false)
    };
    intervals.visibleDateIntervals = shiftIntervals(intervals.visibleDateIntervals, viewOffset);
    intervals.visibleTimeIntervals = shiftIntervals(intervals.visibleTimeIntervals, viewOffset);
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
    const filteredItems = filterArray(preparedItems, combinedFilter);
    return getRawAppointments(filteredItems);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasAllDayAppointments(filteredItems, preparedItems) {
    return filteredItems.map(item => new AppointmentAdapter(item, this.dataAccessors)).some(item => isAppointmentTakesAllDay(item, this.allDayPanelMode));
  }
  createCombinedFilter(filterOptions) {
    return [[getAppointmentFilter(filterOptions, this.timeZoneCalculator)]];
  }
}
AppointmentFilterBaseStrategy.strategyName = 'standard';
