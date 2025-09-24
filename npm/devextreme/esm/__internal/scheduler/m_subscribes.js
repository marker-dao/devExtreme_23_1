/**
* DevExtreme (esm/__internal/scheduler/m_subscribes.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../core/renderer';
import dateUtils from '../../core/utils/date';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import { isPlainObject } from '../../core/utils/type';
import { formatDates, getFormatType } from './appointments/m_text_utils';
import { getDeltaTime } from './appointments/resizing/get_delta_time';
import { VERTICAL_VIEW_TYPES } from './constants';
import { AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS } from './m_classes';
import { utils } from './m_utils';
import { isAppointmentTakesAllDay } from './r1/utils/base';
import { AppointmentAdapter } from './utils/appointment_adapter/appointment_adapter';
const toMs = dateUtils.dateToMilliseconds;
const isAllDay = (scheduler, appointmentData) => {
  const adapter = new AppointmentAdapter(appointmentData, scheduler._dataAccessors);
  if (VERTICAL_VIEW_TYPES.includes(scheduler.currentView.type)) {
    return isAppointmentTakesAllDay(adapter, scheduler.option('allDayPanelMode'));
  }
  return adapter.allDay;
};
const subscribes = {
  isCurrentViewAgenda() {
    return this.currentView.type === 'agenda';
  },
  getOption(name) {
    return this.option(name);
  },
  isVirtualScrolling() {
    return this.isVirtualScrolling();
  },
  isGroupedByDate() {
    return this.getWorkSpace().isGroupedByDate();
  },
  showAppointmentTooltip(options) {
    const targetedAppointment = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentTooltip(options.data, options.target, targetedAppointment);
  },
  hideAppointmentTooltip() {
    this.hideAppointmentTooltip();
  },
  showEditAppointmentPopup(options) {
    const targetedData = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentPopup(options.data, false, targetedData);
  },
  updateAppointmentAfterResize(options) {
    const {
      info
    } = utils.dataAccessors.getAppointmentSettings(options.$appointment);
    const {
      startDate
    } = info.sourceAppointment;
    this._checkRecurringAppointment(options.target, options.data, startDate, () => {
      this._updateAppointment(options.target, options.data, function () {
        this._appointments.moveAppointmentBack();
      });
    });
  },
  getUpdatedData(rawAppointment) {
    return this._getUpdatedData(rawAppointment);
  },
  updateAppointmentAfterDrag(_ref) {
    let {
      event,
      element,
      rawAppointment,
      isDropToTheSameCell,
      isDropToSelfScheduler
    } = _ref;
    const {
      info
    } = utils.dataAccessors.getAppointmentSettings(element);
    // NOTE: enrich target appointment with additional data from the source
    // in case of one appointment of series will change
    const targetedRawAppointment = extend({}, rawAppointment, this._getUpdatedData(rawAppointment));
    const fromAllDay = Boolean(rawAppointment.allDay);
    const toAllDay = Boolean(targetedRawAppointment.allDay);
    const isDropBetweenAllDay = this._workSpace.supportAllDayRow() && fromAllDay !== toAllDay;
    const isDragAndDropBetweenComponents = event.fromComponent !== event.toComponent;
    const onCancel = () => {
      this._appointments.moveAppointmentBack(event);
    };
    if (!isDropToSelfScheduler && isDragAndDropBetweenComponents) {
      // drop between schedulers
      return;
    }
    if (isDropToSelfScheduler && (!isDropToTheSameCell || isDragAndDropBetweenComponents || isDropBetweenAllDay)) {
      this._checkRecurringAppointment(rawAppointment, targetedRawAppointment, info.sourceAppointment.startDate, () => {
        this._updateAppointment(rawAppointment, targetedRawAppointment, onCancel, event);
      }, undefined, undefined, event);
    } else {
      onCancel();
    }
  },
  onDeleteButtonPress(options) {
    const targetedData = this.getTargetedAppointment(options.data, $(options.target));
    this.checkAndDeleteAppointment(options.data, targetedData);
    this.hideAppointmentTooltip();
  },
  createFormattedDateText(appointment, targetedAppointmentRaw, format) {
    const targetedAppointment = _extends({}, appointment, targetedAppointmentRaw);
    const adapter = new AppointmentAdapter(targetedAppointment, this._dataAccessors);
    // pull out time zone converting from appointment adapter for knockout (T947938)
    const startDate = targetedAppointment.displayStartDate || this.timeZoneCalculator.createDate(adapter.startDate, 'toGrid');
    const endDate = targetedAppointment.displayEndDate || this.timeZoneCalculator.createDate(adapter.endDate, 'toGrid');
    const formatType = format ?? getFormatType(startDate, endDate, adapter.allDay, this.currentView.type !== 'month');
    return {
      text: adapter.text,
      formatDate: formatDates(startDate, endDate, formatType)
    };
  },
  _createAppointmentTitle(data) {
    if (isPlainObject(data)) {
      return data.text;
    }
    return String(data);
  },
  getResizableAppointmentArea(options) {
    const {
      allDay
    } = options;
    const groups = this.getViewOption('groups');
    if (groups !== null && groups !== void 0 && groups.length) {
      if (allDay || !VERTICAL_VIEW_TYPES.includes(this.currentView.type)) {
        const horizontalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);
        return {
          left: horizontalGroupBounds.left,
          right: horizontalGroupBounds.right,
          top: 0,
          bottom: 0
        };
      }
      if (!allDay && VERTICAL_VIEW_TYPES.includes(this.currentView.type) && this._workSpace._isVerticalGroupedWorkSpace()) {
        const verticalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);
        return {
          left: 0,
          right: 0,
          top: verticalGroupBounds.top,
          bottom: verticalGroupBounds.bottom
        };
      }
    }
    return undefined;
  },
  needRecalculateResizableArea() {
    return this.getWorkSpace().needRecalculateResizableArea();
  },
  isAllDay(appointmentData) {
    return isAllDay(this, appointmentData);
  },
  getDeltaTime(e, initialSize, itemData) {
    return getDeltaTime(e, initialSize, {
      viewType: this.currentView.type,
      cellSize: {
        width: this.getWorkSpace().getCellWidth(),
        height: this.getWorkSpace().getCellHeight()
      },
      cellDurationInMinutes: this.getWorkSpace().option('cellDuration'),
      resizableStep: this.getWorkSpace().positionHelper.getResizableStep(),
      isAllDay: isAllDay(this, itemData)
    });
  },
  getCellWidth() {
    return this.getWorkSpace().getCellWidth();
  },
  getCellHeight() {
    return this.getWorkSpace().getCellHeight();
  },
  needCorrectAppointmentDates() {
    return !['month', 'timelineMonth'].includes(this.currentView.type);
  },
  getRenderingStrategyDirection() {
    return VERTICAL_VIEW_TYPES.includes(this.currentView.type) ? 'vertical' : 'horizontal';
  },
  updateAppointmentEndDate(options) {
    const {
      endDate
    } = options;
    const endDayHour = this.getViewOption('endDayHour');
    const startDayHour = this.getViewOption('startDayHour');
    let updatedEndDate = endDate;
    if (endDate.getHours() >= endDayHour) {
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    } else if (!options.isSameDate && startDayHour > 0 && endDate.getHours() * 60 + endDate.getMinutes() < startDayHour * 60) {
      updatedEndDate = new Date(updatedEndDate.getTime() - toMs('day'));
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    }
    return updatedEndDate;
  },
  renderCompactAppointments(options) {
    return this._compactAppointmentsHelper.render(options);
  },
  clearCompactAppointments() {
    this._compactAppointmentsHelper.clear();
  },
  getGroupCount() {
    return this._workSpace._getGroupCount();
  },
  mapAppointmentFields(config) {
    const {
      itemData,
      itemElement,
      targetedAppointment
    } = config;
    const targetedData = targetedAppointment || this.getTargetedAppointment(itemData, itemElement);
    return {
      appointmentData: config.itemData,
      appointmentElement: config.itemElement,
      targetedAppointmentData: targetedData
    };
  },
  dayHasAppointment(day, appointment, trimTime) {
    return this.dayHasAppointment(day, appointment, trimTime);
  },
  getLayoutManager() {
    return this._layoutManager;
  },
  getAgendaVerticalStepHeight() {
    return this.getWorkSpace().getAgendaVerticalStepHeight();
  },
  getAgendaDuration() {
    return this.getViewOption('agendaDuration');
  },
  getStartViewDate() {
    return this.getStartViewDate();
  },
  getEndViewDate() {
    return this.getEndViewDate();
  },
  forceMaxAppointmentPerCell() {
    return this.forceMaxAppointmentPerCell();
  },
  onAgendaReady(rows) {
    const $appts = this.getAppointmentsInstance()._itemElements();
    let total = 0;
    const applyClass = function (_, count) {
      const index = count + total - 1;
      $appts.eq(index).addClass(AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
      total += count;
    };
    for (let i = 0; i < rows.length; i++) {
      each(rows[i], applyClass);
    }
  },
  getTargetedAppointmentData(appointment, element) {
    return this.getTargetedAppointment(appointment, element);
  },
  getEndDayHour() {
    return this._workSpace.option('endDayHour') || this.option('endDayHour');
  },
  getStartDayHour() {
    return this._workSpace.option('startDayHour') || this.option('startDayHour');
  },
  getViewOffsetMs() {
    return this.getViewOffsetMs();
  },
  isAdaptive() {
    return this.option('adaptivityEnabled');
  },
  removeDroppableCellClass() {
    this._workSpace.removeDroppableCellClass();
  }
};
export default subscribes;
