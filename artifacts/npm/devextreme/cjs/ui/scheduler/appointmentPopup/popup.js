/**
* DevExtreme (cjs/ui/scheduler/appointmentPopup/popup.js)
* Version: 23.2.0
* Build date: Thu Jun 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.AppointmentPopup = exports.ACTION_TO_APPOINTMENT = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _deferred = require("../../../core/utils/deferred");
var _visibility_change = require("../../../events/visibility_change");
var _ui = _interopRequireDefault(require("../../popup/ui.popup"));
var _loading = require("../loading");
var _appointmentAdapter = require("../appointmentAdapter");
var _utils = require("../resources/utils");
var _popup_config = require("../../../renovation/ui/scheduler/appointment_edit_form/popup_config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var toMs = _date.default.dateToMilliseconds;
var APPOINTMENT_POPUP_CLASS = 'dx-scheduler-appointment-popup';
var DAY_IN_MS = toMs('day');
var POPUP_CONFIG = {
  height: 'auto',
  maxHeight: '100%',
  showCloseButton: false,
  showTitle: false,
  preventScrollEvents: false,
  enableBodyScroll: false,
  defaultOptionsRules: [{
    device: function device() {
      return _devices.default.current().android;
    },
    options: {
      showTitle: false
    }
  }]
};
var ACTION_TO_APPOINTMENT = {
  CREATE: 0,
  UPDATE: 1,
  EXCLUDE_FROM_SERIES: 2
};
exports.ACTION_TO_APPOINTMENT = ACTION_TO_APPOINTMENT;
var AppointmentPopup = /*#__PURE__*/function () {
  function AppointmentPopup(scheduler, form) {
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
  var _proto = AppointmentPopup.prototype;
  _proto.show = function show(appointment, config) {
    var _this = this;
    this.state.appointment.data = appointment;
    this.state.action = config.action;
    this.state.excludeInfo = config.excludeInfo;
    if (!this.popup) {
      var popupConfig = this._createPopupConfig();
      this.popup = this._createPopup(popupConfig);
    }
    this.popup.option('toolbarItems', (0, _popup_config.getPopupToolbarItems)(config.isToolbarVisible, function (e) {
      return _this._doneButtonClickHandler(e);
    }));
    this.popup.show();
  };
  _proto.hide = function hide() {
    this.popup.hide();
  };
  _proto.dispose = function dispose() {
    var _this$popup;
    (_this$popup = this.popup) === null || _this$popup === void 0 ? void 0 : _this$popup.$element().remove();
  };
  _proto._createPopup = function _createPopup(options) {
    var popupElement = (0, _renderer.default)('<div>').addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.getElement());
    return this.scheduler.createComponent(popupElement, _ui.default, options);
  };
  _proto._createPopupConfig = function _createPopupConfig() {
    var _this2 = this;
    return _extends({}, POPUP_CONFIG, {
      onHiding: function onHiding() {
        return _this2.scheduler.focus();
      },
      contentTemplate: function contentTemplate() {
        return _this2._createPopupContent();
      },
      onShowing: function onShowing(e) {
        return _this2._onShowing(e);
      },
      wrapperAttr: {
        class: APPOINTMENT_POPUP_CLASS
      }
    });
  };
  _proto._onShowing = function _onShowing(e) {
    var _this3 = this;
    this._updateForm();
    var arg = {
      form: this.form.dxForm,
      popup: this.popup,
      appointmentData: this.state.appointment.data,
      cancel: false
    };
    this.scheduler.getAppointmentFormOpening()(arg);
    this.scheduler.processActionResult(arg, function (canceled) {
      if (canceled) {
        e.cancel = true;
      } else {
        _this3.updatePopupFullScreenMode();
      }
    });
  };
  _proto._createPopupContent = function _createPopupContent() {
    this._createForm();
    return this.form.dxForm.$element(); // TODO
  };
  _proto._createFormData = function _createFormData(rawAppointment) {
    var appointment = this._createAppointmentAdapter(rawAppointment);
    var dataAccessors = this.scheduler.getDataAccessors();
    var resources = this.scheduler.getResources();
    var normalizedResources = (0, _utils.getNormalizedResources)(rawAppointment, dataAccessors, resources);
    return _extends({}, rawAppointment, normalizedResources, {
      repeat: !!appointment.recurrenceRule
    });
  };
  _proto._createForm = function _createForm() {
    var rawAppointment = this.state.appointment.data;
    var formData = this._createFormData(rawAppointment);
    this.form.create(this.triggerResize.bind(this), this.changeSize.bind(this), formData); // TODO
  };
  _proto._isReadOnly = function _isReadOnly(rawAppointment) {
    var appointment = this._createAppointmentAdapter(rawAppointment);
    if (rawAppointment && appointment.disabled) {
      return true;
    }
    if (this.state.action === ACTION_TO_APPOINTMENT.CREATE) {
      return false;
    }
    return !this.scheduler.getEditingConfig().allowUpdating;
  };
  _proto._createAppointmentAdapter = function _createAppointmentAdapter(rawAppointment) {
    return (0, _appointmentAdapter.createAppointmentAdapter)(rawAppointment, this.scheduler.getDataAccessors(), this.scheduler.getTimeZoneCalculator());
  };
  _proto._updateForm = function _updateForm() {
    var data = this.state.appointment.data;
    var appointment = this._createAppointmentAdapter(this._createFormData(data));
    if (appointment.startDate) {
      appointment.startDate = appointment.calculateStartDate('toAppointment');
    }
    if (appointment.endDate) {
      appointment.endDate = appointment.calculateEndDate('toAppointment');
    }
    var formData = appointment.source();
    this.form.readOnly = this._isReadOnly(formData);
    this.form.updateFormData(formData);
  };
  _proto.triggerResize = function triggerResize() {
    if (this.popup) {
      (0, _visibility_change.triggerResizeEvent)(this.popup.$element());
    }
  };
  _proto.changeSize = function changeSize(isRecurrence) {
    if (this.popup) {
      var isFullScreen = (0, _popup_config.isPopupFullScreenNeeded)();
      var maxWidth = isFullScreen ? '100%' : (0, _popup_config.getMaxWidth)(isRecurrence);
      this.popup.option('fullScreen', isFullScreen);
      this.popup.option('maxWidth', maxWidth);
    }
  };
  _proto.updatePopupFullScreenMode = function updatePopupFullScreenMode() {
    if (this.form.dxForm) {
      // TODO
      var formData = this.form.formData;
      var isRecurrence = formData[this.scheduler.getDataAccessors().expr.recurrenceRuleExpr];
      if (this.visible) {
        this.changeSize(isRecurrence);
      }
    }
  };
  _proto.saveChangesAsync = function saveChangesAsync(isShowLoadPanel) {
    var _this4 = this;
    var deferred = new _deferred.Deferred();
    var validation = this.form.dxForm.validate();
    isShowLoadPanel && this._showLoadPanel();
    (0, _deferred.when)(validation && validation.complete || validation).done(function (validation) {
      if (validation && !validation.isValid) {
        (0, _loading.hide)();
        deferred.resolve(false);
        return;
      }
      var adapter = _this4._createAppointmentAdapter(_this4.form.formData);
      var clonedAdapter = adapter.clone({
        pathTimeZone: 'fromAppointment'
      }); // TODO:

      _this4._addMissingDSTTime(adapter, clonedAdapter);
      var appointment = clonedAdapter.source();
      delete appointment.repeat; // TODO

      switch (_this4.state.action) {
        case ACTION_TO_APPOINTMENT.CREATE:
          _this4.scheduler.addAppointment(appointment).done(deferred.resolve);
          break;
        case ACTION_TO_APPOINTMENT.UPDATE:
          _this4.scheduler.updateAppointment(_this4.state.appointment.data, appointment).done(deferred.resolve);
          break;
        case ACTION_TO_APPOINTMENT.EXCLUDE_FROM_SERIES:
          _this4.scheduler.updateAppointment(_this4.state.excludeInfo.sourceAppointment, _this4.state.excludeInfo.updatedAppointment);
          _this4.scheduler.addAppointment(appointment).done(deferred.resolve);
          break;
      }
      deferred.done(function () {
        (0, _loading.hide)();
        _this4.state.lastEditData = appointment;
      });
    });
    return deferred.promise();
  };
  _proto._doneButtonClickHandler = function _doneButtonClickHandler(e) {
    e.cancel = true;
    this.saveEditDataAsync();
  };
  _proto.saveEditDataAsync = function saveEditDataAsync() {
    var _this5 = this;
    var deferred = new _deferred.Deferred();
    if (this._tryLockSaveChanges()) {
      (0, _deferred.when)(this.saveChangesAsync(true)).done(function () {
        if (_this5.state.lastEditData) {
          // TODO
          var adapter = _this5._createAppointmentAdapter(_this5.state.lastEditData);
          var startDate = adapter.startDate,
            endDate = adapter.endDate,
            allDay = adapter.allDay;
          var startTime = startDate.getTime();
          var endTime = endDate.getTime();
          var inAllDayRow = allDay || endTime - startTime >= DAY_IN_MS;
          var dataAccessors = _this5.scheduler.getDataAccessors();
          var resourceList = _this5.scheduler.getResources();
          var normalizedResources = (0, _utils.getNormalizedResources)(_this5.state.lastEditData, dataAccessors, resourceList);
          _this5.scheduler.updateScrollPosition(startDate, normalizedResources, inAllDayRow);
          _this5.state.lastEditData = null;
        }
        _this5._unlockSaveChanges();
        deferred.resolve();
      });
    }
    return deferred.promise();
  };
  _proto._showLoadPanel = function _showLoadPanel() {
    var container = this.popup.$overlayContent();
    (0, _loading.show)({
      container: container,
      position: {
        of: container
      }
    });
  };
  _proto._tryLockSaveChanges = function _tryLockSaveChanges() {
    if (this.state.saveChangesLocker === false) {
      this.state.saveChangesLocker = true;
      return true;
    }
    return false;
  };
  _proto._unlockSaveChanges = function _unlockSaveChanges() {
    this.state.saveChangesLocker = false;
  }

  // NOTE: Fix ticket T1100758
  ;
  _proto._addMissingDSTTime = function _addMissingDSTTime(formAppointmentAdapter, clonedAppointmentAdapter) {
    var timeZoneCalculator = this.scheduler.getTimeZoneCalculator();
    clonedAppointmentAdapter.startDate = this._addMissingDSTShiftToDate(timeZoneCalculator, formAppointmentAdapter.startDate, clonedAppointmentAdapter.startDate);
    if (clonedAppointmentAdapter.endDate) {
      clonedAppointmentAdapter.endDate = this._addMissingDSTShiftToDate(timeZoneCalculator, formAppointmentAdapter.endDate, clonedAppointmentAdapter.endDate);
    }
  };
  _proto._addMissingDSTShiftToDate = function _addMissingDSTShiftToDate(timeZoneCalculator, originFormDate, clonedDate) {
    var _timeZoneCalculator$g, _timeZoneCalculator$g2;
    var originTimezoneShift = (_timeZoneCalculator$g = timeZoneCalculator.getOffsets(originFormDate)) === null || _timeZoneCalculator$g === void 0 ? void 0 : _timeZoneCalculator$g.common;
    var clonedTimezoneShift = (_timeZoneCalculator$g2 = timeZoneCalculator.getOffsets(clonedDate)) === null || _timeZoneCalculator$g2 === void 0 ? void 0 : _timeZoneCalculator$g2.common;
    var shiftDifference = originTimezoneShift - clonedTimezoneShift;
    return shiftDifference ? new Date(clonedDate.getTime() + shiftDifference * toMs('hour')) : clonedDate;
  };
  _createClass(AppointmentPopup, [{
    key: "visible",
    get: function get() {
      return this.popup ? this.popup.option('visible') : false;
    }
  }]);
  return AppointmentPopup;
}();
exports.AppointmentPopup = AppointmentPopup;
