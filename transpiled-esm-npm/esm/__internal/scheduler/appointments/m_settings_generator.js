import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import { isEmptyObject } from '../../../core/utils/type';
import { dateUtilsTs } from '../../core/utils/date';
import { getRecurrenceProcessor } from '../m_recurrence';
import timeZoneUtils from '../m_utils_time_zone';
import { isDateAndTimeView } from '../r1/utils/index';
import { AppointmentAdapter } from '../utils/appointment_adapter/appointment_adapter';
import { getAppointmentGroupIndex, getAppointmentGroupValues } from '../utils/resource_manager/appointment_groups_utils';
import { CellPositionCalculator } from './m_cell_position_calculator';
import { createFormattedDateText } from './m_text_utils';
const toMs = dateUtils.dateToMilliseconds;
const APPOINTMENT_DATE_TEXT_FORMAT = 'TIME';
// TODO: Vinogradov types refactoring.
export class DateGeneratorBaseStrategy {
  constructor(options) {
    this.options = options;
  }
  get resourceManager() {
    return this.options.getResourceManager();
  }
  // TODO Vinogradov: Remove these getters.
  get rawAppointment() {
    return this.options.rawAppointment;
  }
  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }
  get viewDataProvider() {
    return this.options.viewDataProvider;
  }
  get appointmentTakesAllDay() {
    return this.options.appointmentTakesAllDay;
  }
  get supportAllDayRow() {
    return this.options.supportAllDayRow;
  }
  get isAllDayRowAppointment() {
    return this.options.isAllDayRowAppointment;
  }
  get timeZone() {
    return this.options.timeZone;
  }
  get dateRange() {
    return this.options.dateRange;
  }
  get firstDayOfWeek() {
    return this.options.firstDayOfWeek;
  }
  get viewStartDayHour() {
    return this.options.viewStartDayHour;
  }
  get viewEndDayHour() {
    return this.options.viewEndDayHour;
  }
  get endViewDate() {
    return this.options.endViewDate;
  }
  get viewType() {
    return this.options.viewType;
  }
  get isGroupedByDate() {
    return this.options.isGroupedByDate;
  }
  get isVerticalOrientation() {
    return this.options.isVerticalGroupOrientation;
  }
  get dataAccessors() {
    return this.options.dataAccessors;
  }
  get isDateAppointment() {
    return !isDateAndTimeView(this.viewType) && this.appointmentTakesAllDay;
  }
  getIntervalDuration() {
    return this.appointmentTakesAllDay ? this.options.allDayIntervalDuration : this.options.intervalDuration;
  }
  generate(appointmentAdapter) {
    const {
      isRecurrent
    } = appointmentAdapter;
    const itemGroupIndices = this._getGroupIndices(this.rawAppointment);
    let appointmentList = this._createAppointments(appointmentAdapter, itemGroupIndices);
    appointmentList = this._getProcessedByAppointmentTimeZone(appointmentList, appointmentAdapter); // T983264
    if (this._canProcessNotNativeTimezoneDates(appointmentAdapter)) {
      appointmentList = this._getProcessedNotNativeTimezoneDates(appointmentList, appointmentAdapter);
    }
    let dateSettings = this._createGridAppointmentList(appointmentList, appointmentAdapter);
    const firstViewDates = this._getAppointmentsFirstViewDate(dateSettings);
    dateSettings = this._fillNormalizedStartDate(dateSettings, firstViewDates);
    dateSettings = this._cropAppointmentsByStartDayHour(dateSettings, firstViewDates);
    dateSettings = this._fillNormalizedEndDate(dateSettings, this.rawAppointment);
    if (this._needSeparateLongParts()) {
      dateSettings = this._separateLongParts(dateSettings, appointmentAdapter);
    }
    dateSettings = this.shiftSourceAppointmentDates(dateSettings);
    return {
      dateSettings,
      itemGroupIndices,
      isRecurrent
    };
  }
  shiftSourceAppointmentDates(dateSettings) {
    const {
      viewOffset
    } = this.options;
    return dateSettings.map(item => _extends({}, item, {
      source: _extends({}, item.source, {
        startDate: dateUtilsTs.addOffsets(item.source.startDate, [viewOffset]),
        endDate: dateUtilsTs.addOffsets(item.source.endDate, [viewOffset])
      })
    }));
  }
  _getProcessedByAppointmentTimeZone(appointmentList, appointment) {
    const hasAppointmentTimeZone = !isEmptyObject(appointment.startDateTimeZone) || !isEmptyObject(appointment.endDateTimeZone);
    if (hasAppointmentTimeZone) {
      const appointmentOffsets = {
        startDate: this.timeZoneCalculator.getOffsets(appointment.startDate, appointment.startDateTimeZone),
        endDate: this.timeZoneCalculator.getOffsets(appointment.endDate, appointment.endDateTimeZone)
      };
      appointmentList.forEach(a => {
        const sourceOffsets = {
          startDate: this.timeZoneCalculator.getOffsets(a.startDate, appointment.startDateTimeZone),
          endDate: this.timeZoneCalculator.getOffsets(a.endDate, appointment.endDateTimeZone)
        };
        const startDateOffsetDiff = appointmentOffsets.startDate.appointment - sourceOffsets.startDate.appointment;
        const endDateOffsetDiff = appointmentOffsets.endDate.appointment - sourceOffsets.endDate.appointment;
        if (sourceOffsets.startDate.appointment !== sourceOffsets.startDate.common) {
          a.startDate = new Date(a.startDate.getTime() + startDateOffsetDiff * toMs('hour'));
        }
        if (sourceOffsets.endDate.appointment !== sourceOffsets.endDate.common) {
          a.endDate = new Date(a.endDate.getTime() + endDateOffsetDiff * toMs('hour'));
        }
      });
    }
    return appointmentList;
  }
  _createAppointments(appointment, groupIndices) {
    let appointments = this._createRecurrenceAppointments(appointment, groupIndices);
    if (!appointment.isRecurrent && appointments.length === 0) {
      appointments.push({
        startDate: appointment.startDate,
        endDate: appointment.endDate
      });
    }
    // T817857
    appointments = appointments.map(item => {
      var _item$endDate;
      const resultEndTime = (_item$endDate = item.endDate) === null || _item$endDate === void 0 ? void 0 : _item$endDate.getTime();
      if (item.startDate.getTime() === resultEndTime) {
        item.endDate.setTime(resultEndTime + toMs('minute'));
      }
      return _extends({}, item, {
        // TODO: Check usages & delete this field.
        exceptionDate: new Date(item.startDate)
      });
    });
    return appointments;
  }
  _canProcessNotNativeTimezoneDates(appointment) {
    const isTimeZoneSet = !isEmptyObject(this.timeZone);
    if (!isTimeZoneSet) {
      return false;
    }
    if (!appointment.isRecurrent) {
      return false;
    }
    return !timeZoneUtils.isEqualLocalTimeZone(this.timeZone, appointment.startDate);
  }
  _getDateOffsetDST(date) {
    const dateMinusHour = new Date(date);
    dateMinusHour.setHours(dateMinusHour.getHours() - 1);
    const dateCommonOffset = this.timeZoneCalculator.getOffsets(date).common;
    const dateMinusHourCommonOffset = this.timeZoneCalculator.getOffsets(dateMinusHour).common;
    return dateMinusHourCommonOffset - dateCommonOffset;
  }
  _getProcessedNotNativeDateIfCrossDST(date, offset) {
    return offset < 0 && this._getDateOffsetDST(date) !== 0 ? 0 : offset;
  }
  _getCommonOffset(date) {
    return this.timeZoneCalculator.getOffsets(date).common;
  }
  _getProcessedNotNativeTimezoneDates(appointmentList, appointment) {
    return appointmentList.map(item => {
      let diffStartDateOffset = this._getCommonOffset(appointment.startDate) - this._getCommonOffset(item.startDate);
      let diffEndDateOffset = this._getCommonOffset(appointment.endDate) - this._getCommonOffset(item.endDate);
      if (diffStartDateOffset === 0 && diffEndDateOffset === 0) {
        return item;
      }
      diffStartDateOffset = this._getProcessedNotNativeDateIfCrossDST(item.startDate, diffStartDateOffset);
      diffEndDateOffset = this._getProcessedNotNativeDateIfCrossDST(item.endDate, diffEndDateOffset);
      const newStartDate = new Date(item.startDate.getTime() + diffStartDateOffset * toMs('hour'));
      let newEndDate = new Date(item.endDate.getTime() + diffEndDateOffset * toMs('hour'));
      const testNewStartDate = this.timeZoneCalculator.createDate(newStartDate, 'toGrid');
      const testNewEndDate = this.timeZoneCalculator.createDate(newEndDate, 'toGrid');
      if (appointment.duration > testNewEndDate.getTime() - testNewStartDate.getTime()) {
        newEndDate = new Date(newStartDate.getTime() + appointment.duration);
      }
      return _extends({}, item, {
        startDate: newStartDate,
        endDate: newEndDate,
        // TODO: Check usages & delete this field.
        exceptionDate: new Date(newStartDate)
      });
    });
  }
  _needSeparateLongParts() {
    return this.isVerticalOrientation ? this.isGroupedByDate : this.isGroupedByDate && this.appointmentTakesAllDay;
  }
  normalizeEndDateByViewEnd(rawAppointment, endDate) {
    let result = new Date(endDate.getTime());
    const isAllDay = isDateAndTimeView(this.viewType) && this.appointmentTakesAllDay;
    if (!isAllDay) {
      const roundedEndViewDate = dateUtils.roundToHour(this.endViewDate);
      if (result > roundedEndViewDate) {
        result = roundedEndViewDate;
      }
    }
    const endDayHour = this.viewEndDayHour;
    const allDay = this.dataAccessors.get('allDay', rawAppointment);
    const currentViewEndTime = new Date(new Date(endDate.getTime()).setHours(endDayHour, 0, 0, 0));
    if (result.getTime() > currentViewEndTime.getTime() || allDay && result.getHours() < endDayHour) {
      result = currentViewEndTime;
    }
    return result;
  }
  _fillNormalizedEndDate(dateSettings, rawAppointment) {
    return dateSettings.map(item => _extends({}, item, {
      normalizedEndDate: this.normalizeEndDateByViewEnd(rawAppointment, item.endDate)
    }));
  }
  _separateLongParts(gridAppointmentList, appointmentAdapter) {
    let result = [];
    gridAppointmentList.forEach(gridAppointment => {
      const maxDate = new Date(this.dateRange[1]);
      const {
        startDate,
        normalizedEndDate: endDateOfPart
      } = gridAppointment;
      const longStartDateParts = dateUtils.getDatesOfInterval(startDate, endDateOfPart, {
        milliseconds: this.getIntervalDuration()
      });
      const list = longStartDateParts.filter(startDatePart => new Date(startDatePart) < maxDate).map(date => {
        const endDate = new Date(new Date(date).setMilliseconds(appointmentAdapter.duration));
        const normalizedEndDate = this.normalizeEndDateByViewEnd(this.rawAppointment, endDate);
        return {
          startDate: date,
          endDate,
          normalizedEndDate,
          source: gridAppointment.source
        };
      });
      result = result.concat(list);
    });
    return result;
  }
  _createGridAppointmentList(appointmentList, appointmentAdapter) {
    return appointmentList.map(source => {
      const offsetDifference = appointmentAdapter.startDate.getTimezoneOffset() - source.startDate.getTimezoneOffset();
      if (offsetDifference !== 0 && this._canProcessNotNativeTimezoneDates(appointmentAdapter)) {
        source.startDate = dateUtilsTs.addOffsets(source.startDate, [offsetDifference * toMs('minute')]);
        source.endDate = dateUtilsTs.addOffsets(source.endDate, [offsetDifference * toMs('minute')]);
        source.exceptionDate = new Date(source.startDate);
      }
      const duration = source.endDate.getTime() - source.startDate.getTime();
      const startDate = this.timeZoneCalculator.createDate(source.startDate, 'toGrid');
      const endDate = dateUtilsTs.addOffsets(startDate, [duration]);
      return {
        startDate,
        endDate,
        allDay: appointmentAdapter.allDay || false,
        source // TODO
      };
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createExtremeRecurrenceDates(groupIndex) {
    let startViewDate = this.appointmentTakesAllDay ? dateUtils.trimTime(this.dateRange[0]) : this.dateRange[0];
    let endViewDateByEndDayHour = this.dateRange[1];
    if (this.timeZone) {
      startViewDate = this.timeZoneCalculator.createDate(startViewDate, 'fromGrid');
      endViewDateByEndDayHour = this.timeZoneCalculator.createDate(endViewDateByEndDayHour, 'fromGrid');
      const daylightOffset = timeZoneUtils.getDaylightOffsetInMs(startViewDate, endViewDateByEndDayHour);
      if (daylightOffset) {
        endViewDateByEndDayHour = new Date(endViewDateByEndDayHour.getTime() + daylightOffset);
      }
    }
    return [startViewDate, endViewDateByEndDayHour];
  }
  _createRecurrenceOptions(appointment, groupIndex) {
    const {
      viewOffset
    } = this.options;
    // NOTE: For creating a recurrent appointments,
    // we should use original appointment's dates (without view offset).
    const originalAppointmentStartDate = dateUtilsTs.addOffsets(appointment.startDate, [viewOffset]);
    const originalAppointmentEndDate = dateUtilsTs.addOffsets(appointment.endDate, [viewOffset]);
    const [minRecurrenceDate, maxRecurrenceDate] = this._createExtremeRecurrenceDates(groupIndex);
    const shiftedMinRecurrenceDate = dateUtilsTs.addOffsets(minRecurrenceDate, [viewOffset]);
    const shiftedMaxRecurrenceDate = dateUtilsTs.addOffsets(maxRecurrenceDate, [viewOffset]);
    return {
      rule: appointment.recurrenceRule,
      exception: appointment.recurrenceException,
      min: shiftedMinRecurrenceDate,
      max: shiftedMaxRecurrenceDate,
      firstDayOfWeek: this.firstDayOfWeek,
      start: originalAppointmentStartDate,
      end: originalAppointmentEndDate,
      appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(originalAppointmentStartDate, appointment.startDateTimeZone, true),
      getExceptionDateTimezoneOffsets: date => {
        const localMachineTimezoneOffset = -timeZoneUtils.getClientTimezoneOffset(date);
        const appointmentTimezoneOffset = this.timeZoneCalculator.getOriginStartDateOffsetInMs(date, appointment.startDateTimeZone, true);
        const offsetDST = this._getDateOffsetDST(date);
        // NOTE: Apply only winter -> summer DST extra offset
        const extraSummerTimeChangeOffset = offsetDST < 0 ? offsetDST * toMs('hour') : 0;
        return [localMachineTimezoneOffset, appointmentTimezoneOffset, extraSummerTimeChangeOffset];
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createRecurrenceAppointments(appointment, groupIndices) {
    const {
      duration
    } = appointment;
    const {
      viewOffset
    } = this.options;
    const option = this._createRecurrenceOptions(appointment);
    const generatedStartDates = getRecurrenceProcessor().generateDates(option);
    return generatedStartDates.map(date => {
      const utcDate = timeZoneUtils.createUTCDateWithLocalOffset(date);
      utcDate.setTime(utcDate.getTime() + duration);
      const endDate = timeZoneUtils.createDateFromUTCWithLocalOffset(utcDate);
      return {
        startDate: new Date(date),
        endDate
      };
    })
    // NOTE: For the next calculations,
    // we should shift recurrence appointments by view offset.
    .map(_ref => {
      let {
        startDate,
        endDate
      } = _ref;
      return {
        startDate: dateUtilsTs.addOffsets(startDate, [-viewOffset]),
        endDate: dateUtilsTs.addOffsets(endDate, [-viewOffset])
      };
    });
  }
  _getAppointmentsFirstViewDate(appointments) {
    const {
      viewOffset
    } = this.options;
    return appointments.map(appointment => {
      const tableFirstDate = this._getAppointmentFirstViewDate(_extends({}, appointment, {
        startDate: dateUtilsTs.addOffsets(appointment.startDate, [viewOffset]),
        endDate: dateUtilsTs.addOffsets(appointment.endDate, [viewOffset])
      }));
      if (!tableFirstDate) {
        return appointment.startDate;
      }
      const firstDate = dateUtilsTs.addOffsets(tableFirstDate, [-viewOffset]);
      return firstDate > appointment.startDate ? firstDate : appointment.startDate;
    });
  }
  _fillNormalizedStartDate(appointments, firstViewDates,
  // TODO Vinogradov: Check this unused argument.
  rawAppointment) {
    return appointments.map((item, idx) => _extends({}, item, {
      startDate: this._getAppointmentResultDate({
        appointment: item,
        rawAppointment,
        startDate: new Date(item.startDate),
        startDayHour: this.viewStartDayHour,
        firstViewDate: firstViewDates[idx]
      })
    }));
  }
  _cropAppointmentsByStartDayHour(appointments, firstViewDates) {
    return appointments.filter((appointment, idx) => {
      if (!firstViewDates[idx]) {
        return false;
      }
      if (this.appointmentTakesAllDay) {
        return true;
      }
      return appointment.endDate > appointment.startDate;
    });
  }
  _getAppointmentResultDate(options) {
    const {
      appointment,
      startDayHour,
      firstViewDate
    } = options;
    let {
      startDate
    } = options;
    let resultDate;
    if (this.appointmentTakesAllDay) {
      resultDate = dateUtils.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }
      resultDate = dateUtils.normalizeDate(appointment.startDate, startDate);
    }
    return !this.isDateAppointment ? dateUtils.roundDateByStartDayHour(resultDate, startDayHour) : resultDate;
  }
  _getAppointmentFirstViewDate(appointment) {
    const groupIndex = appointment.source.groupIndex || 0;
    const {
      startDate,
      endDate
    } = appointment;
    if (this.isAllDayRowAppointment || appointment.allDay) {
      return this.viewDataProvider.findAllDayGroupCellStartDate(groupIndex);
    }
    return this.viewDataProvider.findGroupCellStartDate(groupIndex, startDate, endDate, this.isDateAppointment);
  }
  _getGroupIndices(rawAppointment) {
    const appointmentGroupValues = getAppointmentGroupValues(rawAppointment, this.resourceManager.resources);
    return getAppointmentGroupIndex(appointmentGroupValues, this.resourceManager.groupsLeafs);
  }
}
export class DateGeneratorVirtualStrategy extends DateGeneratorBaseStrategy {
  get groupCount() {
    return this.resourceManager.groupCount();
  }
  _createRecurrenceAppointments(appointment, groupIndices) {
    const {
      duration
    } = appointment;
    const result = [];
    const validGroupIndices = this.groupCount ? groupIndices : [0];
    validGroupIndices.forEach(groupIndex => {
      const option = this._createRecurrenceOptions(appointment, groupIndex);
      const generatedStartDates = getRecurrenceProcessor().generateDates(option);
      const recurrentInfo = generatedStartDates.map(date => {
        const startDate = new Date(date);
        const utcDate = timeZoneUtils.createUTCDateWithLocalOffset(date);
        utcDate.setTime(utcDate.getTime() + duration);
        const endDate = timeZoneUtils.createDateFromUTCWithLocalOffset(utcDate);
        return {
          startDate,
          endDate,
          groupIndex
        };
      });
      result.push(...recurrentInfo);
    });
    return result;
  }
  _updateGroupIndices(appointments, groupIndices) {
    const result = [];
    groupIndices.forEach(groupIndex => {
      const groupStartDate = this.viewDataProvider.getGroupStartDate(groupIndex);
      if (groupStartDate) {
        appointments.forEach(appointment => {
          const appointmentCopy = extend({}, appointment);
          appointmentCopy.groupIndex = groupIndex;
          result.push(appointmentCopy);
        });
      }
    });
    return result;
  }
  _getGroupIndices(rawAppointment) {
    var _groupIndices;
    let groupIndices = super._getGroupIndices(rawAppointment);
    const viewDataGroupIndices = this.viewDataProvider.getGroupIndices();
    if (!((_groupIndices = groupIndices) !== null && _groupIndices !== void 0 && _groupIndices.length)) {
      groupIndices = [0];
    }
    return groupIndices.filter(groupIndex => viewDataGroupIndices.indexOf(groupIndex) !== -1);
  }
  _createAppointments(appointment, groupIndices) {
    const appointments = super._createAppointments(appointment, groupIndices);
    return !appointment.isRecurrent ? this._updateGroupIndices(appointments, groupIndices) : appointments;
  }
}
// TODO rename to AppointmentInfoGenerator or AppointmentViewModel after refactoring geometry calculation strategies
export class AppointmentSettingsGenerator {
  constructor(options) {
    this.options = options;
    this.appointmentAdapter = new AppointmentAdapter(this.rawAppointment, this.dataAccessors);
  }
  get rawAppointment() {
    return this.options.rawAppointment;
  }
  get dataAccessors() {
    return this.options.dataAccessors;
  }
  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }
  get isAllDayRowAppointment() {
    return this.options.appointmentTakesAllDay && this.options.supportAllDayRow;
  }
  get groups() {
    return this.options.groups;
  }
  get dateSettingsStrategy() {
    const options = _extends({}, this.options, {
      isAllDayRowAppointment: this.isAllDayRowAppointment
    });
    return this.options.isVirtualScrolling ? new DateGeneratorVirtualStrategy(options) : new DateGeneratorBaseStrategy(options);
  }
  create() {
    const {
      dateSettings,
      itemGroupIndices,
      isRecurrent
    } = this._generateDateSettings();
    const {
      isVirtualScrolling,
      viewDataProvider
    } = this.options;
    const filteredDateSettings = this.isAllDayRowAppointment || !isVirtualScrolling ? dateSettings : dateSettings.filter(_ref2 => {
      let {
        source,
        startDate,
        endDate
      } = _ref2;
      return viewDataProvider.isGroupIntersectDateInterval(source.groupIndex, startDate, endDate);
    });
    const cellPositions = this._calculateCellPositions(filteredDateSettings, itemGroupIndices);
    const result = this._prepareAppointmentInfos(filteredDateSettings, cellPositions, isRecurrent);
    return result;
  }
  _generateDateSettings() {
    return this.dateSettingsStrategy.generate(this.appointmentAdapter);
  }
  _calculateCellPositions(dateSettings, itemGroupIndices) {
    const cellPositionCalculator = new CellPositionCalculator(_extends({}, this.options, {
      dateSettings
    }));
    return cellPositionCalculator.calculateCellPositions(itemGroupIndices, this.isAllDayRowAppointment, this.appointmentAdapter.isRecurrent);
  }
  _prepareAppointmentInfos(dateSettings, cellPositions, isRecurrent) {
    const infos = [];
    cellPositions.forEach(_ref3 => {
      let {
        coordinates,
        dateSettingIndex
      } = _ref3;
      const dateSetting = dateSettings[dateSettingIndex];
      const dateText = this._getAppointmentDateText(dateSetting);
      const info = {
        appointment: dateSetting,
        sourceAppointment: dateSetting.source,
        dateText,
        isRecurrent
      };
      infos.push(_extends({}, coordinates, {
        info
      }));
    });
    return infos;
  }
  _getAppointmentDateText(sourceAppointment) {
    const {
      startDate,
      endDate,
      allDay
    } = sourceAppointment;
    return createFormattedDateText({
      startDate,
      endDate,
      allDay,
      format: APPOINTMENT_DATE_TEXT_FORMAT
    });
  }
}