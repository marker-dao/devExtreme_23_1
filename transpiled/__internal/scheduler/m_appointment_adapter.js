"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createAppointmentAdapter = void 0;
var _extend = require("../../core/utils/extend");
var _object = require("../../core/utils/object");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _m_recurrence = require("./m_recurrence");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO Vinogradov refactoring: add types to this module.
const PROPERTY_NAMES = {
  startDate: 'startDate',
  endDate: 'endDate',
  allDay: 'allDay',
  text: 'text',
  description: 'description',
  startDateTimeZone: 'startDateTimeZone',
  endDateTimeZone: 'endDateTimeZone',
  recurrenceRule: 'recurrenceRule',
  recurrenceException: 'recurrenceException',
  disabled: 'disabled'
};
class AppointmentAdapter {
  constructor(rawAppointment, dataAccessors, timeZoneCalculator) {
    this.rawAppointment = rawAppointment;
    this.dataAccessors = dataAccessors;
    this.timeZoneCalculator = timeZoneCalculator;
  }
  get duration() {
    return this.endDate && this.startDate ? this.endDate.getTime() - this.startDate.getTime() : 0;
  }
  get startDate() {
    const result = this.getField(PROPERTY_NAMES.startDate);
    return result === undefined ? result : new Date(result);
  }
  set startDate(value) {
    this.setField(PROPERTY_NAMES.startDate, value);
  }
  get endDate() {
    const result = this.getField(PROPERTY_NAMES.endDate);
    return result === undefined ? result : new Date(result);
  }
  set endDate(value) {
    this.setField(PROPERTY_NAMES.endDate, value);
  }
  get allDay() {
    return Boolean(this.getField(PROPERTY_NAMES.allDay));
  }
  set allDay(value) {
    this.setField(PROPERTY_NAMES.allDay, value);
  }
  get text() {
    return this.getField(PROPERTY_NAMES.text);
  }
  set text(value) {
    this.setField(PROPERTY_NAMES.text, value);
  }
  get description() {
    return this.getField(PROPERTY_NAMES.description);
  }
  set description(value) {
    this.setField(PROPERTY_NAMES.description, value);
  }
  get startDateTimeZone() {
    return this.getField(PROPERTY_NAMES.startDateTimeZone);
  }
  get endDateTimeZone() {
    return this.getField(PROPERTY_NAMES.endDateTimeZone);
  }
  get recurrenceRule() {
    return this.getField(PROPERTY_NAMES.recurrenceRule);
  }
  set recurrenceRule(value) {
    this.setField(PROPERTY_NAMES.recurrenceRule, value);
  }
  get recurrenceException() {
    return this.getField(PROPERTY_NAMES.recurrenceException);
  }
  set recurrenceException(value) {
    this.setField(PROPERTY_NAMES.recurrenceException, value);
  }
  get disabled() {
    return !!this.getField(PROPERTY_NAMES.disabled);
  }
  get isRecurrent() {
    return (0, _m_recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(this.recurrenceRule);
  }
  getField(property) {
    return this.dataAccessors.get(property, this.rawAppointment);
  }
  setField(property, value) {
    return this.dataAccessors.set(property, this.rawAppointment, value);
  }
  calculateStartDate(pathTimeZoneConversion) {
    if (!this.startDate || isNaN(this.startDate.getTime())) {
      throw _ui.default.Error('E1032', this.text);
    }
    return this.calculateDate(this.startDate, this.startDateTimeZone, pathTimeZoneConversion);
  }
  calculateEndDate(pathTimeZoneConversion) {
    return this.calculateDate(this.endDate, this.endDateTimeZone, pathTimeZoneConversion);
  }
  calculateDate(date, appointmentTimeZone, pathTimeZoneConversion) {
    return this.timeZoneCalculator.createDate(date, {
      appointmentTimeZone,
      path: pathTimeZoneConversion
    });
  }
  clone(options) {
    const result = new AppointmentAdapter((0, _object.deepExtendArraySafe)({}, this.rawAppointment, false, false, false, true), this.dataAccessors, this.timeZoneCalculator);
    if (options !== null && options !== void 0 && options.pathTimeZone) {
      result.calculateDates(options.pathTimeZone);
    }
    return result;
  }
  calculateDates(pathTimeZoneConversion) {
    const startDate = this.calculateStartDate(pathTimeZoneConversion);
    const endDate = this.calculateEndDate(pathTimeZoneConversion);
    if (startDate) {
      this.startDate = startDate;
    }
    if (endDate) {
      this.endDate = endDate;
    }
    return this;
  }
  source() {
    let serializeDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (serializeDate) {
      // hack for use dateSerializationFormat
      const clonedAdapter = this.clone();
      clonedAdapter.startDate = this.startDate;
      clonedAdapter.endDate = this.endDate;
      return clonedAdapter.source();
    }
    return (0, _extend.extend)({}, this.rawAppointment);
  }
}
var _default = exports.default = AppointmentAdapter; // TODO: refactor timezone to avoid optional calculator
const createAppointmentAdapter = (rawAppointment, dataAccessors, timeZoneCalculator) => new AppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator);
exports.createAppointmentAdapter = createAppointmentAdapter;