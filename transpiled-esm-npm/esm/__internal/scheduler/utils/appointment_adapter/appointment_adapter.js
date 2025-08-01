import { deepExtendArraySafe } from '../../../core/utils/m_object';
import { getRecurrenceProcessor } from '../../m_recurrence';
export class AppointmentAdapter {
  constructor(source, dataAccessors) {
    this.source = source;
    this.dataAccessors = dataAccessors;
  }
  get startDate() {
    return this.dataAccessors.get('startDate', this.source);
  }
  set startDate(value) {
    this.dataAccessors.set('startDate', this.source, value);
  }
  get endDate() {
    return this.dataAccessors.get('endDate', this.source);
  }
  set endDate(value) {
    this.dataAccessors.set('endDate', this.source, value);
  }
  get allDay() {
    return this.dataAccessors.get('allDay', this.source);
  }
  set allDay(value) {
    this.dataAccessors.set('allDay', this.source, value);
  }
  get text() {
    return this.dataAccessors.get('text', this.source) ?? '';
  }
  set text(value) {
    this.dataAccessors.set('text', this.source, value);
  }
  get description() {
    return this.dataAccessors.get('description', this.source) ?? '';
  }
  set description(value) {
    this.dataAccessors.set('description', this.source, value);
  }
  get startDateTimeZone() {
    return this.dataAccessors.get('startDateTimeZone', this.source);
  }
  get endDateTimeZone() {
    return this.dataAccessors.get('endDateTimeZone', this.source);
  }
  get recurrenceRule() {
    return this.dataAccessors.get('recurrenceRule', this.source);
  }
  set recurrenceRule(value) {
    this.dataAccessors.set('recurrenceRule', this.source, value);
  }
  get recurrenceException() {
    return this.dataAccessors.get('recurrenceException', this.source);
  }
  set recurrenceException(value) {
    this.dataAccessors.set('recurrenceException', this.source, value);
  }
  get disabled() {
    return this.dataAccessors.get('disabled', this.source);
  }
  get duration() {
    const {
      startDate,
      endDate
    } = this;
    return endDate && startDate ? endDate.getTime() - startDate.getTime() : 0;
  }
  get isRecurrent() {
    return getRecurrenceProcessor().isValidRecurrenceRule(this.recurrenceRule);
  }
  clone() {
    return new AppointmentAdapter(deepExtendArraySafe({}, this.source, false, false, false, true), this.dataAccessors);
  }
  serialize() {
    // getter of dataAccessors return serialized date
    this.dataAccessors.set('startDate', this.source, this.dataAccessors.get('startDate', this.source));
    this.dataAccessors.set('endDate', this.source, this.dataAccessors.get('endDate', this.source));
    return this;
  }
  getCalculatedDates(timeZoneCalculator, path) {
    return {
      startDate: timeZoneCalculator.createDate(this.startDate, path, this.startDateTimeZone),
      endDate: timeZoneCalculator.createDate(this.endDate, path, this.endDateTimeZone)
    };
  }
  calculateDates(timeZoneCalculator, path) {
    const {
      startDate,
      endDate
    } = this.getCalculatedDates(timeZoneCalculator, path);
    if (this.startDate) {
      this.startDate = startDate;
    }
    if (this.endDate) {
      this.endDate = endDate;
    }
    return this;
  }
}