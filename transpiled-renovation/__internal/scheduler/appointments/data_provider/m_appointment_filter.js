"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentFilterBaseStrategy = void 0;
var _query = _interopRequireDefault(require("../../../../common/data/query"));
var _array = require("../../../../core/utils/array");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _date2 = require("../../../core/utils/date");
var _index = require("../../../scheduler/r1/utils/index");
var _m_appointment_adapter = require("../../m_appointment_adapter");
var _m_recurrence = require("../../m_recurrence");
var _m_utils = require("./m_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// TODO Vinogradov refactoring: this module should be refactored :)
const toMs = _date.default.dateToMilliseconds;
class AppointmentFilterBaseStrategy {
  constructor(options) {
    this.options = options;
    this.dataAccessors = this.options.dataAccessors;
  }
  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }
  get viewStartDayHour() {
    return this.options.startDayHour;
  }
  get viewEndDayHour() {
    return this.options.endDayHour;
  }
  get timezone() {
    return this.options.timezone;
  }
  get firstDayOfWeek() {
    return this.options.firstDayOfWeek;
  }
  get showAllDayPanel() {
    return this.options.showAllDayPanel;
  }
  get loadedResources() {
    return this._resolveOption('loadedResources');
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
  filter(preparedItems) {
    const [min, max] = this.dateRange;
    const {
      viewOffset
    } = this.options;
    const allDay = !this.showAllDayPanel && this.supportAllDayRow ? false : undefined;
    return this.filterLoadedAppointments({
      startDayHour: this.viewStartDayHour,
      endDayHour: this.viewEndDayHour,
      viewOffset,
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour,
      min,
      max,
      resources: this.loadedResources,
      allDay,
      supportMultiDayAppointments: (0, _index.isTimelineView)(this.viewType),
      firstDayOfWeek: this.firstDayOfWeek
    }, preparedItems);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasAllDayAppointments(filteredItems, preparedItems) {
    return filteredItems.map(item => (0, _m_appointment_adapter.createAppointmentAdapter)(item, this.dataAccessors, this.timeZoneCalculator)).some(item => (0, _index.isAppointmentTakesAllDay)(item, this.allDayPanelMode));
  }
  _createAllDayAppointmentFilter() {
    return [[appointment => (0, _index.isAppointmentTakesAllDay)(appointment, this.allDayPanelMode)]];
  }
  _createCombinedFilter(filterOptions) {
    const min = new Date(filterOptions.min);
    const max = new Date(filterOptions.max);
    const {
      startDayHour,
      endDayHour,
      viewOffset,
      viewStartDayHour,
      viewEndDayHour,
      resources,
      firstDayOfWeek,
      checkIntersectViewport,
      supportMultiDayAppointments
    } = filterOptions;
    const [trimMin, trimMax] = (0, _index.getDatesWithoutTime)(min, max);
    const useRecurrence = this.dataAccessors.has('recurrenceRule');
    return [[appointment => {
      const appointmentVisible = appointment.visible ?? true;
      if (!appointmentVisible) {
        return false;
      }
      const {
        allDay: isAllDay,
        hasRecurrenceRule
      } = appointment;
      const startDate = _date2.dateUtilsTs.addOffsets(appointment.startDate, [-viewOffset]);
      const endDate = _date2.dateUtilsTs.addOffsets(appointment.endDate, [-viewOffset]);
      const appointmentTakesAllDay = (0, _index.isAppointmentTakesAllDay)(appointment, this.allDayPanelMode);
      if (!hasRecurrenceRule) {
        if (!(endDate >= trimMin && startDate < trimMax || _date.default.sameDate(endDate, trimMin) && _date.default.sameDate(startDate, trimMin))) {
          return false;
        }
      }
      const appointmentTakesSeveralDays = (0, _m_utils.getAppointmentTakesSeveralDays)(appointment);
      const isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;
      if (resources !== null && resources !== void 0 && resources.length && !this._filterAppointmentByResources(appointment.rawAppointment, resources)) {
        return false;
      }
      if (appointmentTakesAllDay && filterOptions.allDay === false) {
        return false;
      }
      if (hasRecurrenceRule) {
        const recurrenceException = (0, _m_utils.getRecurrenceException)(appointment, this.timeZoneCalculator, this.timezone);
        if (!this._filterAppointmentByRRule(_extends({}, appointment, {
          recurrenceException,
          allDay: appointmentTakesAllDay
        }), min, max, startDayHour, endDayHour, firstDayOfWeek)) {
          return false;
        }
      }
      if (!isAllDay && supportMultiDayAppointments && isLongAppointment) {
        if (endDate < min && (!useRecurrence || useRecurrence && !hasRecurrenceRule)) {
          return false;
        }
      }
      if (!isAllDay && (0, _type.isDefined)(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        if (!(0, _m_utils.compareDateWithStartDayHour)(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
          return false;
        }
      }
      if (!isAllDay && (0, _type.isDefined)(endDayHour)) {
        if (!(0, _m_utils.compareDateWithEndDayHour)({
          startDate,
          endDate,
          startDayHour,
          endDayHour,
          viewOffset,
          viewStartDayHour,
          viewEndDayHour,
          allDay: appointmentTakesAllDay,
          severalDays: appointmentTakesSeveralDays,
          min,
          max,
          checkIntersectViewport
        })) {
          return false;
        }
      }
      if (!isAllDay && (!isLongAppointment || supportMultiDayAppointments)) {
        if (endDate < min && useRecurrence && !hasRecurrenceRule) {
          return false;
        }
      }
      return true;
    }]];
  }
  _filterAppointmentByResources(appointment, resources) {
    const checkAppointmentResourceValues = (resourceName, resourceIndex) => {
      const resourceGetter = this.dataAccessors.resources.getter[resourceName];
      let resource;
      if ((0, _type.isFunction)(resourceGetter)) {
        resource = resourceGetter(appointment);
      }
      const appointmentResourceValues = (0, _array.wrapToArray)(resource);
      const resourceData = (0, _iterator.map)(resources[resourceIndex].items, _ref => {
        let {
          id
        } = _ref;
        return id;
      });
      for (let i = 0; i < appointmentResourceValues.length; i++) {
        if ((0, _index.hasResourceValue)(resourceData, appointmentResourceValues[i])) {
          return true;
        }
      }
      return false;
    };
    let result = false;
    for (let i = 0; i < resources.length; i++) {
      const resourceName = resources[i].name;
      result = checkAppointmentResourceValues(resourceName, i);
      if (!result) {
        return false;
      }
    }
    return result;
  }
  _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    const {
      recurrenceRule
    } = appointment;
    const {
      recurrenceException
    } = appointment;
    const {
      allDay
    } = appointment;
    let result = true;
    const appointmentStartDate = appointment.startDate;
    const appointmentEndDate = appointment.endDate;
    const recurrenceProcessor = (0, _m_recurrence.getRecurrenceProcessor)();
    if (allDay || (0, _m_utils._appointmentPartInInterval)(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
      const [trimMin, trimMax] = (0, _index.getDatesWithoutTime)(min, max);
      min = trimMin;
      max = new Date(trimMax.getTime() - toMs('minute'));
    }
    if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = appointmentEndDate > min && appointmentStartDate <= max;
    }
    if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      const {
        viewOffset
      } = this.options;
      result = recurrenceProcessor.hasRecurrence({
        rule: recurrenceRule,
        exception: recurrenceException,
        start: appointmentStartDate,
        end: appointmentEndDate,
        min: _date2.dateUtilsTs.addOffsets(min, [viewOffset]),
        max: _date2.dateUtilsTs.addOffsets(max, [viewOffset]),
        firstDayOfWeek,
        appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(appointmentStartDate, appointment.startDateTimeZone, false)
      });
    }
    return result;
  }
  filterLoadedAppointments(filterOptions, preparedItems) {
    const filteredItems = this.filterPreparedItems(filterOptions, preparedItems);
    return filteredItems.map(_ref2 => {
      let {
        rawAppointment
      } = _ref2;
      return rawAppointment;
    });
  }
  filterPreparedItems(filterOptions, preparedItems) {
    const combinedFilter = this._createCombinedFilter(filterOptions);
    // @ts-expect-error
    return (0, _query.default)(preparedItems)
    // @ts-expect-error
    .filter(combinedFilter).toArray();
  }
  filterAllDayAppointments(preparedItems) {
    const combinedFilter = this._createAllDayAppointmentFilter();
    // @ts-expect-error
    return (0, _query.default)(preparedItems)
    // @ts-expect-error
    .filter(combinedFilter).toArray().map(_ref3 => {
      let {
        rawAppointment
      } = _ref3;
      return rawAppointment;
    });
  }
}
exports.AppointmentFilterBaseStrategy = AppointmentFilterBaseStrategy;
AppointmentFilterBaseStrategy.strategyName = 'standard';