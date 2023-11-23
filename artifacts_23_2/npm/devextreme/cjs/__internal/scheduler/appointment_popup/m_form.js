/**
* DevExtreme (cjs/__internal/scheduler/appointment_popup/m_form.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentForm = exports.APPOINTMENT_FORM_GROUP_NAMES = void 0;
require("../m_recurrence_editor");
require("../../../ui/text_area");
require("../../../ui/tag_box");
require("../../../ui/switch");
require("../../../ui/select_box");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _extend = require("../../../core/utils/extend");
var _data_source = _interopRequireDefault(require("../../../data/data_source"));
var _message = _interopRequireDefault(require("../../../localization/message"));
var _semaphore = require("../../../renovation/ui/scheduler/utils/semaphore/semaphore");
var _form = _interopRequireDefault(require("../../../ui/form"));
var _themes = require("../../../ui/themes");
var _m_appointment_adapter = require("../m_appointment_adapter");
var _m_utils_timezones_data = _interopRequireDefault(require("../timezones/m_utils_timezones_data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const SCREEN_SIZE_OF_SINGLE_COLUMN = 600;
const APPOINTMENT_FORM_GROUP_NAMES = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};
exports.APPOINTMENT_FORM_GROUP_NAMES = APPOINTMENT_FORM_GROUP_NAMES;
const getStylingModeFunc = () => (0, _themes.isFluent)((0, _themes.current)()) ? 'filled' : undefined;
const getStartDateWithStartHour = (startDate, startDayHour) => new Date(new Date(startDate).setHours(startDayHour));
const validateAppointmentFormDate = (editor, value, previousValue) => {
  const isCurrentDateCorrect = value === null || !!value;
  const isPreviousDateCorrect = previousValue === null || !!previousValue;
  if (!isCurrentDateCorrect && isPreviousDateCorrect) {
    editor.option('value', previousValue);
  }
};
const updateRecurrenceItemVisibility = (recurrenceRuleExpr, value, form) => {
  var _a;
  form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'visible', value);
  !value && form.updateData(recurrenceRuleExpr, '');
  (_a = form.getEditor(recurrenceRuleExpr)) === null || _a === void 0 ? void 0 : _a.changeValueByVisibility(value);
};
const createDateBoxEditor = (dataField, colSpan, firstDayOfWeek, label, onValueChanged) => ({
  editorType: 'dxDateBox',
  dataField,
  colSpan,
  label: {
    text: _message.default.format(label)
  },
  validationRules: [{
    type: 'required'
  }],
  editorOptions: {
    stylingMode: getStylingModeFunc(),
    width: '100%',
    calendarOptions: {
      firstDayOfWeek
    },
    onValueChanged,
    useMaskBehavior: true
  }
});
let AppointmentForm = /*#__PURE__*/function () {
  function AppointmentForm(scheduler) {
    this.scheduler = scheduler;
    this.form = null;
    this.semaphore = new _semaphore.Semaphore();
  }
  var _proto = AppointmentForm.prototype;
  _proto.create = function create(triggerResize, changeSize, formData) {
    const {
      allowTimeZoneEditing
    } = this.scheduler.getEditingConfig();
    const {
      expr
    } = this.scheduler.getDataAccessors();
    const recurrenceEditorVisibility = !!formData[expr.recurrenceRuleExpr]; // TODO
    const colSpan = recurrenceEditorVisibility ? 1 : 2;
    const mainItems = [...this._createMainItems(expr, triggerResize, changeSize, allowTimeZoneEditing), ...this.scheduler.createResourceEditorModel()];
    changeSize(recurrenceEditorVisibility);
    const items = [{
      itemType: 'group',
      name: APPOINTMENT_FORM_GROUP_NAMES.Main,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      colSpan,
      items: mainItems
    }, {
      itemType: 'group',
      name: APPOINTMENT_FORM_GROUP_NAMES.Recurrence,
      visible: recurrenceEditorVisibility,
      colSpan,
      items: this._createRecurrenceEditor(expr)
    }];
    const element = (0, _renderer.default)('<div>');
    this.scheduler.createComponent(element, _form.default, {
      items,
      showValidationSummary: true,
      scrollingEnabled: true,
      colCount: 'auto',
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      formData,
      showColonAfterLabel: false,
      labelLocation: 'top',
      onInitialized: e => {
        this.form = e.component;
      },
      customizeItem: e => {
        if (this.form && e.itemType === 'group') {
          const dataExprs = this.scheduler.getDataAccessors().expr;
          const startDate = new Date(this.formData[dataExprs.startDateExpr]);
          const endDate = new Date(this.formData[dataExprs.endDateExpr]);
          const startTimeZoneEditor = e.items.find(i => i.dataField === dataExprs.startDateTimeZoneExpr);
          const endTimeZoneEditor = e.items.find(i => i.dataField === dataExprs.endDateTimeZoneExpr);
          if (startTimeZoneEditor) {
            startTimeZoneEditor.editorOptions.dataSource = this.createTimeZoneDataSource(startDate);
          }
          if (endTimeZoneEditor) {
            endTimeZoneEditor.editorOptions.dataSource = this.createTimeZoneDataSource(endDate);
          }
        }
      },
      screenByWidth: width => width < SCREEN_SIZE_OF_SINGLE_COLUMN || _devices.default.current().deviceType !== 'desktop' ? 'xs' : 'lg'
    });
  };
  _proto.createTimeZoneDataSource = function createTimeZoneDataSource(date) {
    return new _data_source.default({
      store: _m_utils_timezones_data.default.getDisplayedTimeZones(date),
      paginate: true,
      pageSize: 10
    });
  };
  _proto._createAppointmentAdapter = function _createAppointmentAdapter(rawAppointment) {
    return (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this.scheduler.getDataAccessors());
  };
  _proto._dateBoxValueChanged = function _dateBoxValueChanged(args, dateExpr, isNeedCorrect) {
    validateAppointmentFormDate(args.component, args.value, args.previousValue);
    const value = _date_serialization.default.deserializeDate(args.value);
    const previousValue = _date_serialization.default.deserializeDate(args.previousValue);
    const dateEditor = this.form.getEditor(dateExpr);
    const dateValue = _date_serialization.default.deserializeDate(dateEditor.option('value'));
    if (this.semaphore.isFree() && dateValue && value && isNeedCorrect(dateValue, value)) {
      const duration = previousValue ? dateValue.getTime() - previousValue.getTime() : 0;
      dateEditor.option('value', new Date(value.getTime() + duration));
    }
  };
  _proto._createTimezoneEditor = function _createTimezoneEditor(timeZoneExpr, secondTimeZoneExpr, visibleIndex, colSpan, isMainTimeZone) {
    let visible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    const noTzTitle = _message.default.format('dxScheduler-noTimezoneTitle');
    return {
      dataField: timeZoneExpr,
      editorType: 'dxSelectBox',
      visibleIndex,
      colSpan,
      label: {
        text: ' '
      },
      editorOptions: {
        displayExpr: 'title',
        valueExpr: 'id',
        placeholder: noTzTitle,
        searchEnabled: true,
        onValueChanged: args => {
          const {
            form
          } = this;
          const secondTimezoneEditor = form.getEditor(secondTimeZoneExpr);
          if (isMainTimeZone) {
            secondTimezoneEditor.option('value', args.value);
          }
        }
      },
      visible
    };
  };
  _proto._createDateBoxItems = function _createDateBoxItems(dataExprs, allowTimeZoneEditing) {
    const colSpan = allowTimeZoneEditing ? 2 : 1;
    const firstDayOfWeek = this.scheduler.getFirstDayOfWeek();
    return [createDateBoxEditor(dataExprs.startDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelStartDate', args => {
      this._dateBoxValueChanged(args, dataExprs.endDateExpr, (endValue, startValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.startDateTimeZoneExpr, dataExprs.endDateTimeZoneExpr, 1, colSpan, true, allowTimeZoneEditing), createDateBoxEditor(dataExprs.endDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelEndDate', args => {
      this._dateBoxValueChanged(args, dataExprs.startDateExpr, (startValue, endValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.endDateTimeZoneExpr, dataExprs.startDateTimeZoneExpr, 3, colSpan, false, allowTimeZoneEditing)];
  };
  _proto._changeFormItemDateType = function _changeFormItemDateType(itemPath, isAllDay) {
    const itemEditorOptions = this.form.itemOption(itemPath).editorOptions;
    const type = isAllDay ? 'date' : 'datetime';
    const newEditorOption = _extends(_extends({}, itemEditorOptions), {
      type
    });
    this.form.itemOption(itemPath, 'editorOptions', newEditorOption);
  };
  _proto._createMainItems = function _createMainItems(dataExprs, triggerResize, changeSize, allowTimeZoneEditing) {
    return [{
      dataField: dataExprs.textExpr,
      editorType: 'dxTextBox',
      colSpan: 2,
      label: {
        text: _message.default.format('dxScheduler-editorLabelTitle')
      },
      editorOptions: {
        stylingMode: getStylingModeFunc()
      }
    }, {
      itemType: 'group',
      colSpan: 2,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      items: this._createDateBoxItems(dataExprs, allowTimeZoneEditing)
    }, {
      itemType: 'group',
      colSpan: 2,
      colCountByScreen: {
        lg: 2,
        xs: 2
      },
      items: [{
        dataField: dataExprs.allDayExpr,
        cssClass: 'dx-appointment-form-switch',
        editorType: 'dxSwitch',
        label: {
          text: _message.default.format('dxScheduler-allDay'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: args => {
            const {
              value
            } = args;
            const startDateEditor = this.form.getEditor(dataExprs.startDateExpr);
            const endDateEditor = this.form.getEditor(dataExprs.endDateExpr);
            const startDate = _date_serialization.default.deserializeDate(startDateEditor.option('value'));
            if (this.semaphore.isFree() && startDate) {
              if (value) {
                const allDayStartDate = _date.default.trimTime(startDate);
                startDateEditor.option('value', new Date(allDayStartDate));
                endDateEditor.option('value', new Date(allDayStartDate));
              } else {
                const startDateWithStartHour = getStartDateWithStartHour(startDate, this.scheduler.getStartDayHour());
                const endDate = this.scheduler.getCalculatedEndDate(startDateWithStartHour);
                startDateEditor.option('value', startDateWithStartHour);
                endDateEditor.option('value', endDate);
              }
            }
            const startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.startDateExpr);
            const endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.endDateExpr);
            this._changeFormItemDateType(startDateItemPath, value);
            this._changeFormItemDateType(endDateItemPath, value);
          }
        }
      }, {
        editorType: 'dxSwitch',
        dataField: 'repeat',
        cssClass: 'dx-appointment-form-switch',
        name: 'visibilityChanged',
        label: {
          text: _message.default.format('dxScheduler-editorLabelRecurrence'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: args => {
            const {
              form
            } = this;
            const colSpan = args.value ? 1 : 2;
            form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Main, 'colSpan', colSpan);
            form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'colSpan', colSpan);
            updateRecurrenceItemVisibility(dataExprs.recurrenceRuleExpr, args.value, form);
            changeSize(args.value);
            triggerResize();
          }
        }
      }]
    }, {
      itemType: 'empty',
      colSpan: 2
    }, {
      dataField: dataExprs.descriptionExpr,
      editorType: 'dxTextArea',
      colSpan: 2,
      label: {
        text: _message.default.format('dxScheduler-editorLabelDescription')
      },
      editorOptions: {
        stylingMode: getStylingModeFunc()
      }
    }, {
      itemType: 'empty',
      colSpan: 2
    }];
  };
  _proto._createRecurrenceEditor = function _createRecurrenceEditor(dataExprs) {
    return [{
      dataField: dataExprs.recurrenceRuleExpr,
      editorType: 'dxRecurrenceEditor',
      editorOptions: {
        firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
        timeZoneCalculator: this.scheduler.getTimeZoneCalculator(),
        getStartDateTimeZone: () => this._createAppointmentAdapter(this.formData).startDateTimeZone
      },
      label: {
        text: ' ',
        visible: false
      }
    }];
  };
  _proto.setEditorsType = function setEditorsType(allDay) {
    const {
      startDateExpr,
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
    const startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(startDateExpr);
    const endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(endDateExpr);
    const startDateFormItem = this.form.itemOption(startDateItemPath);
    const endDateFormItem = this.form.itemOption(endDateItemPath);
    if (startDateFormItem && endDateFormItem) {
      const startDateEditorOptions = startDateFormItem.editorOptions;
      const endDateEditorOptions = endDateFormItem.editorOptions;
      startDateEditorOptions.type = endDateEditorOptions.type = allDay ? 'date' : 'datetime';
      this.form.itemOption(startDateItemPath, 'editorOptions', startDateEditorOptions);
      this.form.itemOption(endDateItemPath, 'editorOptions', endDateEditorOptions);
    }
  };
  _proto.updateRecurrenceEditorStartDate = function updateRecurrenceEditorStartDate(date, expression) {
    const options = {
      startDate: date
    };
    this.setEditorOptions(expression, 'Recurrence', options);
  };
  _proto.setEditorOptions = function setEditorOptions(name, groupName, options) {
    const editorPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES[groupName], ".").concat(name);
    const editor = this.form.itemOption(editorPath);
    editor && this.form.itemOption(editorPath, 'editorOptions', (0, _extend.extend)({}, editor.editorOptions, options));
  };
  _proto.setTimeZoneEditorDataSource = function setTimeZoneEditorDataSource(date, path) {
    const dataSource = this.createTimeZoneDataSource(date);
    this.setEditorOptions(path, 'Main', {
      dataSource
    });
  };
  _proto.updateFormData = function updateFormData(formData) {
    this.semaphore.take();
    this.form.option('formData', formData);
    const dataExprs = this.scheduler.getDataAccessors().expr;
    const allDay = formData[dataExprs.allDayExpr];
    const startDate = new Date(formData[dataExprs.startDateExpr]);
    const endDate = new Date(formData[dataExprs.endDateExpr]);
    this.setTimeZoneEditorDataSource(startDate, dataExprs.startDateTimeZoneExpr);
    this.setTimeZoneEditorDataSource(endDate, dataExprs.endDateTimeZoneExpr);
    this.updateRecurrenceEditorStartDate(startDate, dataExprs.recurrenceRuleExpr);
    this.setEditorsType(allDay);
    this.semaphore.release();
  };
  _createClass(AppointmentForm, [{
    key: "dxForm",
    get: function () {
      return this.form;
    }
  }, {
    key: "readOnly",
    set: function (value) {
      this.form.option('readOnly', value);
      const {
        recurrenceRuleExpr
      } = this.scheduler.getDataAccessors().expr;
      const recurrenceEditor = this.form.getEditor(recurrenceRuleExpr);
      recurrenceEditor === null || recurrenceEditor === void 0 ? void 0 : recurrenceEditor.option('readOnly', value);
    }
  }, {
    key: "formData",
    get: function () {
      return this.form.option('formData');
    },
    set: function (value) {
      this.form.option('formData', value);
    }
  }]);
  return AppointmentForm;
}();
exports.AppointmentForm = AppointmentForm;
