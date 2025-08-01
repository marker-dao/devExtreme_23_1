"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentPopup = exports.ACTION_TO_APPOINTMENT = void 0;
var _visibility_change = require("../../../common/core/events/visibility_change");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _deferred = require("../../../core/utils/deferred");
var _ui = _interopRequireDefault(require("../../../ui/popup/ui.popup"));
var _index = require("../../scheduler/r1/appointment_popup/index");
var _m_loading = require("../m_loading");
var _appointment_adapter = require("../utils/appointment_adapter/appointment_adapter");
var _appointment_groups_utils = require("../utils/resource_manager/appointment_groups_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const toMs = _date.default.dateToMilliseconds;
const APPOINTMENT_POPUP_CLASS = 'dx-scheduler-appointment-popup';
const DAY_IN_MS = toMs('day');
const POPUP_CONFIG = {
  height: 'auto',
  maxHeight: '100%',
  showCloseButton: false,
  showTitle: false,
  preventScrollEvents: false,
  enableBodyScroll: false,
  defaultOptionsRules: [{
    device: () => _devices.default.current().android,
    options: {
      showTitle: false
    }
  }],
  _ignorePreventScrollEventsDeprecation: true
};
const ACTION_TO_APPOINTMENT = exports.ACTION_TO_APPOINTMENT = {
  CREATE: 0,
  UPDATE: 1,
  EXCLUDE_FROM_SERIES: 2
};
class AppointmentPopup {
  constructor(scheduler, form) {
    this.scheduler = scheduler;
    this.form = form;
    this.popup = null;
    this.state = {
      action: null,
      lastEditData: null,
      saveChangesLocker: false,
      appointment: {
        data: null
      }
    };
  }
  get visible() {
    return this.popup ? this.popup.option('visible') : false;
  }
  show(appointment, config) {
    this.state.appointment.data = appointment;
    this.state.action = config.action;
    this.state.excludeInfo = config.excludeInfo;
    if (!this.popup) {
      const popupConfig = this._createPopupConfig();
      this.popup = this._createPopup(popupConfig);
    }
    this.popup.option('toolbarItems', (0, _index.getPopupToolbarItems)(config.isToolbarVisible, e => this._doneButtonClickHandler(e)));
    this.popup.show();
  }
  hide() {
    this.popup.hide();
  }
  dispose() {
    var _this$popup;
    (_this$popup = this.popup) === null || _this$popup === void 0 || _this$popup.$element().remove();
  }
  _createPopup(options) {
    const popupElement = (0, _renderer.default)('<div>').addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.getElement());
    return this.scheduler.createComponent(popupElement, _ui.default, options);
  }
  _createPopupConfig() {
    return _extends({}, POPUP_CONFIG, {
      onHiding: () => this.scheduler.focus(),
      contentTemplate: () => this._createPopupContent(),
      onShowing: e => this._onShowing(e),
      wrapperAttr: {
        class: APPOINTMENT_POPUP_CLASS
      }
    });
  }
  _onShowing(e) {
    this._updateForm();
    e.component.$overlayContent().attr('aria-label', _message.default.format('dxScheduler-ariaEditForm'));
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
        this.updatePopupFullScreenMode();
      }
    });
  }
  _createPopupContent() {
    this._createForm();
    return this.form.dxForm.$element(); // TODO
  }
  _createFormData(rawAppointment) {
    const appointment = this._createAppointmentAdapter(rawAppointment);
    const resourceManager = this.scheduler.getResourceManager();
    const rawAppointmentGroupValues = (0, _appointment_groups_utils.getRawAppointmentGroupValues)(rawAppointment, resourceManager.resources);
    return _extends({}, rawAppointment, rawAppointmentGroupValues, {
      repeat: !!appointment.recurrenceRule
    });
  }
  _createForm() {
    const rawAppointment = this.state.appointment.data;
    const formData = this._createFormData(rawAppointment);
    this.form.create(this.triggerResize.bind(this), this.changeSize.bind(this), formData); // TODO
  }
  _isReadOnly(rawAppointment) {
    const appointment = this._createAppointmentAdapter(rawAppointment);
    if (rawAppointment && appointment.disabled) {
      return true;
    }
    if (this.state.action === ACTION_TO_APPOINTMENT.CREATE) {
      return false;
    }
    return !this.scheduler.getEditingConfig().allowUpdating;
  }
  _createAppointmentAdapter(rawAppointment) {
    return new _appointment_adapter.AppointmentAdapter(rawAppointment, this.scheduler.getDataAccessors());
  }
  _updateForm() {
    const {
      data
    } = this.state.appointment;
    const appointment = this._createFormData(data);
    const formData = this._createAppointmentAdapter(appointment).clone().calculateDates(this.scheduler.getTimeZoneCalculator(), 'toAppointment').source;
    this.form.readOnly = this._isReadOnly(formData);
    this.form.updateFormData(formData);
  }
  triggerResize() {
    if (this.popup) {
      (0, _visibility_change.triggerResizeEvent)(this.popup.$element());
    }
  }
  changeSize(isRecurrence) {
    if (this.popup) {
      const isFullScreen = (0, _index.isPopupFullScreenNeeded)();
      const maxWidth = isFullScreen ? '100%' : (0, _index.getMaxWidth)(isRecurrence);
      this.popup.option('fullScreen', isFullScreen);
      this.popup.option('maxWidth', maxWidth);
    }
  }
  updatePopupFullScreenMode() {
    if (this.form.dxForm && this.visible) {
      // TODO
      const {
        formData
      } = this.form;
      const dataAccessors = this.scheduler.getDataAccessors();
      const isRecurrence = dataAccessors.get('recurrenceRule', formData);
      this.changeSize(isRecurrence);
    }
  }
  saveChangesAsync(isShowLoadPanel) {
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    const validation = this.form.dxForm.validate();
    isShowLoadPanel && this._showLoadPanel();
    (0, _deferred.when)((validation === null || validation === void 0 ? void 0 : validation.complete) || validation).done(validation => {
      if (validation && !validation.isValid) {
        (0, _m_loading.hide)();
        deferred.resolve(false);
        return;
      }
      const {
        repeat
      } = this.form.formData;
      const adapter = this._createAppointmentAdapter(this.form.formData);
      const clonedAdapter = adapter.clone().calculateDates(this.scheduler.getTimeZoneCalculator(), 'fromAppointment');
      const shouldClearRecurrenceRule = !repeat && !!clonedAdapter.recurrenceRule;
      this._addMissingDSTTime(adapter, clonedAdapter);
      if (shouldClearRecurrenceRule) {
        clonedAdapter.recurrenceRule = '';
      }
      const appointment = clonedAdapter.source;
      delete appointment.repeat; // TODO
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
        (0, _m_loading.hide)();
        this.state.lastEditData = appointment;
      });
    });
    return deferred.promise();
  }
  _doneButtonClickHandler(e) {
    e.cancel = true;
    this.saveEditDataAsync();
  }
  saveEditDataAsync() {
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    if (this._tryLockSaveChanges()) {
      (0, _deferred.when)(this.saveChangesAsync(true)).done(() => {
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
          const appointmentGroupValues = (0, _appointment_groups_utils.getAppointmentGroupValues)(this.state.lastEditData, resourceManager.resources);
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
    (0, _m_loading.show)({
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
    return shiftDifference ? new Date(clonedDate.getTime() + shiftDifference * toMs('hour')) : clonedDate;
  }
}
exports.AppointmentPopup = AppointmentPopup;