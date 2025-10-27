import _extends from "@babel/runtime/helpers/esm/extends";
import { triggerResizeEvent } from '../../../common/core/events/visibility_change';
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import dateUtils from '../../../core/utils/date';
import { Deferred, when } from '../../../core/utils/deferred';
import { getWidth } from '../../../core/utils/size';
import { getWindow } from '../../../core/utils/window';
import Popup from '../../../ui/popup/ui.popup';
import { current, isFluent } from '../../../ui/themes';
import { hide as hideLoading, show as showLoading } from '../m_loading';
import { AppointmentAdapter } from '../utils/appointment_adapter/appointment_adapter';
import { getAppointmentGroupValues, getRawAppointmentGroupValues } from '../utils/resource_manager/appointment_groups_utils';
export const APPOINTMENT_POPUP_CLASS = 'dx-scheduler-appointment-popup';
const POPUP_FULL_SCREEN_MODE_WINDOW_WIDTH_THRESHOLD = 460;
const DAY_IN_MS = dateUtils.dateToMilliseconds('day');
export const ACTION_TO_APPOINTMENT = {
  CREATE: 0,
  UPDATE: 1,
  EXCLUDE_FROM_SERIES: 2
};
export class AppointmentPopup {
  get popup() {
    return this._popup;
  }
  get visible() {
    var _this$_popup;
    return Boolean((_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.option('visible'));
  }
  constructor(scheduler, form) {
    this.scheduler = scheduler;
    this.form = form;
    this.state = {
      action: null,
      lastEditData: null,
      saveChangesLocker: false,
      appointment: {
        data: null
      }
    };
  }
  show(appointment, config) {
    this.state.appointment.data = appointment;
    this.state.action = config.action;
    this.state.allowSaving = config.allowSaving;
    this.state.excludeInfo = config.excludeInfo;
    if (!this._popup) {
      const popupConfig = this._createPopupConfig();
      this._popup = this._createPopup(popupConfig);
    }
    this._popup.show();
  }
  hide() {
    var _this$_popup2;
    (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 || _this$_popup2.hide();
  }
  dispose() {
    var _this$_popup3;
    this.form.dispose();
    (_this$_popup3 = this._popup) === null || _this$_popup3 === void 0 || _this$_popup3.dispose();
    this._popup = undefined;
  }
  _createPopup(options) {
    const popupElement = $('<div>').addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.getElement());
    return this.scheduler.createComponent(popupElement, Popup, options);
  }
  _createPopupConfig() {
    return {
      height: 'auto',
      maxHeight: '90%',
      showCloseButton: false,
      showTitle: false,
      preventScrollEvents: false,
      enableBodyScroll: false,
      _ignorePreventScrollEventsDeprecation: true,
      onHiding: () => {
        this.scheduler.focus();
      },
      contentTemplate: () => {
        this.form.create({
          updateToolbarForMainGroup: () => this.updateToolbarForMainGroup(),
          updateToolbarForRecurrenceGroup: () => this.updateToolbarForRecurrenceGroup()
        });
        return this.form.dxForm.$element();
      },
      onShowing: e => this._onShowing(e),
      wrapperAttr: {
        class: APPOINTMENT_POPUP_CLASS
      }
    };
  }
  _onShowing(e) {
    this._updateForm();
    e.component.$overlayContent().attr('aria-label', messageLocalization.format('dxScheduler-ariaEditForm'));
    const arg = {
      form: this.form.dxForm,
      popup: this.popup,
      appointmentData: this.state.appointment.data,
      cancel: false
    };
    this.scheduler.getAppointmentFormOpening()(arg);
    this.scheduler.processActionResult(arg, canceled => {
      if (canceled) {
        e.cancel = true;
      } else {
        this.updateToolbarForMainGroup();
        this.updatePopupFullScreenMode();
      }
    });
  }
  _isReadOnly(appointmentAdapter) {
    if (Boolean(appointmentAdapter.source) && appointmentAdapter.disabled) {
      return true;
    }
    if (this.state.action === ACTION_TO_APPOINTMENT.CREATE) {
      return false;
    }
    return !this.scheduler.getEditingConfig().allowUpdating;
  }
  _createAppointmentAdapter(rawAppointment) {
    return new AppointmentAdapter(rawAppointment, this.scheduler.getDataAccessors());
  }
  _updateForm() {
    this.form.showMainGroup(false);
    const rawAppointment = this.state.appointment.data;
    const appointmentAdapter = this._createAppointmentAdapter(rawAppointment).clone().calculateDates(this.scheduler.getTimeZoneCalculator(), 'toAppointment');
    const formData = this._createFormData(appointmentAdapter);
    this.form.formData = formData;
    this.form.readOnly = this._isReadOnly(appointmentAdapter);
  }
  _createFormData(appointmentAdapter) {
    const {
      resources
    } = this.scheduler.getResourceManager();
    const groupValues = getRawAppointmentGroupValues(appointmentAdapter.source, resources);
    const {
      allDayExpr,
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    return _extends({}, appointmentAdapter.source, groupValues, {
      [allDayExpr]: Boolean(appointmentAdapter.allDay),
      [recurrenceRuleExpr]: appointmentAdapter.recurrenceRule
    });
  }
  triggerResize() {
    var _this$popup;
    if ((_this$popup = this.popup) !== null && _this$popup !== void 0 && _this$popup.$element()) {
      triggerResizeEvent(this.popup.$element());
    }
  }
  updatePopupFullScreenMode() {
    if (this.visible) {
      const isPopupFullScreenNeeded = () => {
        const window = getWindow();
        const width = window && getWidth(window);
        return width < POPUP_FULL_SCREEN_MODE_WINDOW_WIDTH_THRESHOLD;
      };
      const isFullScreen = isPopupFullScreenNeeded();
      const maxWidth = isFluent(current()) ? 380 : 420;
      this.popup.option('fullScreen', isFullScreen);
      this.popup.option('maxWidth', isFullScreen ? '100%' : maxWidth);
    }
  }
  saveChangesAsync(isShowLoadPanel) {
    // @ts-expect-error
    const deferred = new Deferred();
    const validation = this.form.dxForm.validate();
    isShowLoadPanel && this._showLoadPanel();
    when((validation === null || validation === void 0 ? void 0 : validation.complete) ?? validation).done(validation => {
      if (validation && !validation.isValid) {
        hideLoading();
        deferred.resolve(false);
        return;
      }
      const adapter = this._createAppointmentAdapter(this.form.formData);
      const clonedAdapter = adapter.clone().calculateDates(this.scheduler.getTimeZoneCalculator(), 'fromAppointment');
      this._addMissingDSTTime(adapter, clonedAdapter);
      const appointment = clonedAdapter.source;
      switch (this.state.action) {
        case ACTION_TO_APPOINTMENT.CREATE:
          this.scheduler.addAppointment(appointment).done(deferred.resolve);
          break;
        case ACTION_TO_APPOINTMENT.UPDATE:
          this.scheduler.updateAppointment(this.state.appointment.data, appointment).done(deferred.resolve);
          break;
        case ACTION_TO_APPOINTMENT.EXCLUDE_FROM_SERIES:
          this.scheduler.updateAppointment(this.state.excludeInfo.sourceAppointment, this.state.excludeInfo.updatedAppointment);
          this.scheduler.addAppointment(appointment).done(deferred.resolve);
          break;
        default:
          break;
      }
      deferred.done(() => {
        hideLoading();
        this.state.lastEditData = appointment;
      });
    });
    return deferred.promise();
  }
  _saveButtonClickHandler(e) {
    e.cancel = true;
    this.saveEditDataAsync();
  }
  saveEditDataAsync() {
    // @ts-expect-error
    const deferred = new Deferred();
    if (this._tryLockSaveChanges()) {
      when(this.saveChangesAsync(true)).done(() => {
        if (this.state.lastEditData) {
          // TODO
          const adapter = this._createAppointmentAdapter(this.state.lastEditData);
          const {
            startDate,
            endDate,
            allDay
          } = adapter;
          const startTime = startDate.getTime();
          const endTime = endDate.getTime();
          const inAllDayRow = allDay || endTime - startTime >= DAY_IN_MS;
          const resourceManager = this.scheduler.getResourceManager();
          const appointmentGroupValues = getAppointmentGroupValues(this.state.lastEditData, resourceManager.resources);
          this.scheduler.updateScrollPosition(startDate, appointmentGroupValues, inAllDayRow);
          this.state.lastEditData = null;
        }
        this._unlockSaveChanges();
        deferred.resolve();
      });
    }
    return deferred.promise();
  }
  _showLoadPanel() {
    const container = this.popup.$overlayContent();
    showLoading({
      container,
      position: {
        of: container
      }
    });
  }
  _tryLockSaveChanges() {
    if (this.state.saveChangesLocker === false) {
      this.state.saveChangesLocker = true;
      return true;
    }
    return false;
  }
  _unlockSaveChanges() {
    this.state.saveChangesLocker = false;
  }
  // NOTE: Fix ticket T1102713
  _addMissingDSTTime(formAppointmentAdapter, clonedAppointmentAdapter) {
    const timeZoneCalculator = this.scheduler.getTimeZoneCalculator();
    clonedAppointmentAdapter.startDate = this._addMissingDSTShiftToDate(timeZoneCalculator, formAppointmentAdapter.startDate, clonedAppointmentAdapter.startDate);
    if (clonedAppointmentAdapter.endDate) {
      clonedAppointmentAdapter.endDate = this._addMissingDSTShiftToDate(timeZoneCalculator, formAppointmentAdapter.endDate, clonedAppointmentAdapter.endDate);
    }
  }
  _addMissingDSTShiftToDate(timeZoneCalculator, originFormDate, clonedDate) {
    var _timeZoneCalculator$g, _timeZoneCalculator$g2;
    const originTimezoneShift = (_timeZoneCalculator$g = timeZoneCalculator.getOffsets(originFormDate)) === null || _timeZoneCalculator$g === void 0 ? void 0 : _timeZoneCalculator$g.common;
    const clonedTimezoneShift = (_timeZoneCalculator$g2 = timeZoneCalculator.getOffsets(clonedDate)) === null || _timeZoneCalculator$g2 === void 0 ? void 0 : _timeZoneCalculator$g2.common;
    const shiftDifference = originTimezoneShift - clonedTimezoneShift;
    return shiftDifference ? new Date(clonedDate.getTime() + shiftDifference * dateUtils.dateToMilliseconds('hour')) : clonedDate;
  }
  updateToolbarForRecurrenceGroup() {
    const toolbarItems = [{
      toolbar: 'top',
      location: 'before',
      widget: 'dxButton',
      options: {
        icon: 'back',
        stylingMode: 'text',
        onClick: () => {
          this.form.showMainGroup();
        }
      }
    }, {
      toolbar: 'top',
      location: 'before',
      text: messageLocalization.format('dxScheduler-editorLabelRecurrence'),
      cssClass: 'dx-toolbar-label'
    }, {
      toolbar: 'top',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: messageLocalization.format('dxScheduler-editPopupSaveButtonText'),
        stylingMode: 'contained',
        type: 'default',
        onClick: e => {
          this.form.showMainGroup();
          e.cancel = true;
          this.saveEditDataAsync();
        }
      }
    }, {
      toolbar: 'top',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: messageLocalization.format('Cancel'),
        stylingMode: 'outlined',
        onClick: () => {
          this.hide();
        }
      }
    }];
    this.popup.option('toolbarItems', toolbarItems);
  }
  updateToolbarForMainGroup() {
    const toolbarItems = [{
      toolbar: 'top',
      location: 'before',
      text: messageLocalization.format('dxScheduler-editPopupTitle'),
      cssClass: 'dx-toolbar-label'
    }];
    const canSave = !this.form.readOnly;
    if (canSave) {
      toolbarItems.push({
        toolbar: 'top',
        location: 'after',
        options: {
          onClick: e => this._saveButtonClickHandler(e),
          stylingMode: 'contained',
          type: 'default',
          text: messageLocalization.format('dxScheduler-editPopupSaveButtonText')
        },
        shortcut: 'done'
      });
    }
    toolbarItems.push({
      toolbar: 'top',
      location: 'after',
      shortcut: 'cancel',
      options: {
        stylingMode: 'outlined'
      }
    });
    this.popup.option('toolbarItems', toolbarItems);
  }
}