/**
* DevExtreme (cjs/__internal/scheduler/appointment_popup/m_form.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
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
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _data_source = _interopRequireDefault(require("../../../common/data/data_source"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _extend = require("../../../core/utils/extend");
var _form = _interopRequireDefault(require("../../../ui/form"));
var _themes = require("../../../ui/themes");
var _m_utils_time_zone = _interopRequireDefault(require("../m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SCREEN_SIZE_OF_SINGLE_COLUMN = 600;
const APPOINTMENT_FORM_GROUP_NAMES = exports.APPOINTMENT_FORM_GROUP_NAMES = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};
// TODO: Remove duplication in the scheduler's popup testing model.
// NOTE: These CSS classes allow access the editors
// from e2e testcafe tests.
const E2E_TEST_CLASSES = {
  form: 'e2e-dx-scheduler-form',
  textEditor: 'e2e-dx-scheduler-form-text',
  descriptionEditor: 'e2e-dx-scheduler-form-description',
  startDateEditor: 'e2e-dx-scheduler-form-start-date',
  endDateEditor: 'e2e-dx-scheduler-form-end-date',
  startDateTimeZoneEditor: 'e2e-dx-scheduler-form-start-date-timezone',
  endDateTimeZoneEditor: 'e2e-dx-scheduler-form-end-date-timezone',
  allDaySwitch: 'e2e-dx-scheduler-form-all-day-switch',
  recurrenceSwitch: 'e2e-dx-scheduler-form-recurrence-switch'
};
const createTimeZoneDataSource = () => new _data_source.default({
  store: _m_utils_time_zone.default.getTimeZonesCache(),
  paginate: true,
  pageSize: 10
});
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
  var _form$getEditor;
  form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'visible', value);
  (_form$getEditor = form.getEditor(recurrenceRuleExpr)) === null || _form$getEditor === void 0 || _form$getEditor.changeValueByVisibility(value);
};
class AppointmentForm {
  constructor(scheduler) {
    // NOTE: flag to prevent double value set during form updating
    this.isFormUpdating = false;
    this.scheduler = scheduler;
    this.form = null;
  }
  get dxForm() {
    return this.form;
  }
  set readOnly(value) {
    this.form.option('readOnly', value);
    const {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    const recurrenceEditor = this.form.getEditor(recurrenceRuleExpr);
    recurrenceEditor === null || recurrenceEditor === void 0 || recurrenceEditor.option('readOnly', value);
  }
  get formData() {
    return this.form.option('formData');
  }
  set formData(value) {
    this.form.option('formData', value);
  }
  create(triggerResize, changeSize, formData) {
    const {
      allowTimeZoneEditing
    } = this.scheduler.getEditingConfig();
    const dataAccessors = this.scheduler.getDataAccessors();
    const {
      expr
    } = dataAccessors;
    const isRecurrence = Boolean(dataAccessors.get('recurrenceRule', formData));
    const colSpan = isRecurrence ? 1 : 2;
    const mainItems = [...this._createMainItems(expr, triggerResize, changeSize, allowTimeZoneEditing), ...this.scheduler.createResourceEditorModel()];
    changeSize(isRecurrence);
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
      visible: isRecurrence,
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
      screenByWidth: width => width < SCREEN_SIZE_OF_SINGLE_COLUMN || _devices.default.current().deviceType !== 'desktop' ? 'xs' : 'lg',
      elementAttr: {
        class: E2E_TEST_CLASSES.form
      }
    });
  }
  _dateBoxValueChanged(args, dateExpr, isNeedCorrect) {
    validateAppointmentFormDate(args.component, args.value, args.previousValue);
    const value = _date_serialization.default.deserializeDate(args.value);
    const previousValue = _date_serialization.default.deserializeDate(args.previousValue);
    const dateEditor = this.form.getEditor(dateExpr);
    const dateValue = _date_serialization.default.deserializeDate(dateEditor.option('value'));
    if (!this.isFormUpdating && dateValue && value && isNeedCorrect(dateValue, value)) {
      const duration = previousValue ? dateValue.getTime() - previousValue.getTime() : 0;
      dateEditor.option('value', new Date(value.getTime() + duration));
    }
  }
  _createTimezoneEditor(timeZoneExpr, secondTimeZoneExpr, visibleIndex, colSpan, isMainTimeZone, cssClass) {
    let visible = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    const noTzTitle = _message.default.format('dxScheduler-noTimezoneTitle');
    return {
      name: this.normalizeEditorName(timeZoneExpr),
      dataField: timeZoneExpr,
      editorType: 'dxSelectBox',
      visibleIndex,
      colSpan,
      cssClass,
      label: {
        text: ' '
      },
      editorOptions: {
        displayExpr: 'title',
        valueExpr: 'id',
        placeholder: noTzTitle,
        searchEnabled: true,
        dataSource: createTimeZoneDataSource(),
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
  }
  _createDateBoxItems(dataExprs, allowTimeZoneEditing) {
    const colSpan = allowTimeZoneEditing ? 2 : 1;
    const firstDayOfWeek = this.scheduler.getFirstDayOfWeek();
    return [this.createDateBoxEditor(dataExprs.startDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelStartDate', E2E_TEST_CLASSES.startDateEditor, args => {
      this._dateBoxValueChanged(args, dataExprs.endDateExpr, (endValue, startValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.startDateTimeZoneExpr, dataExprs.endDateTimeZoneExpr, 1, colSpan, true, E2E_TEST_CLASSES.startDateTimeZoneEditor, allowTimeZoneEditing), this.createDateBoxEditor(dataExprs.endDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelEndDate', E2E_TEST_CLASSES.endDateEditor, args => {
      this._dateBoxValueChanged(args, dataExprs.startDateExpr, (startValue, endValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.endDateTimeZoneExpr, dataExprs.startDateTimeZoneExpr, 3, colSpan, false, E2E_TEST_CLASSES.endDateTimeZoneEditor, allowTimeZoneEditing)];
  }
  _changeFormItemDateType(name, groupName, isAllDay) {
    const editorPath = this.getEditorPath(name, groupName);
    const itemEditorOptions = this.form.itemOption(editorPath).editorOptions;
    const type = isAllDay ? 'date' : 'datetime';
    const newEditorOption = _extends({}, itemEditorOptions, {
      type
    });
    this.form.itemOption(editorPath, 'editorOptions', newEditorOption);
  }
  _createMainItems(dataExprs, triggerResize, changeSize, allowTimeZoneEditing) {
    return [{
      name: this.normalizeEditorName(dataExprs.textExpr),
      dataField: dataExprs.textExpr,
      cssClass: E2E_TEST_CLASSES.textEditor,
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
        name: this.normalizeEditorName(dataExprs.allDayExpr),
        dataField: dataExprs.allDayExpr,
        cssClass: `dx-appointment-form-switch ${E2E_TEST_CLASSES.allDaySwitch}`,
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
            if (!this.isFormUpdating && startDate) {
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
            this._changeFormItemDateType(dataExprs.startDateExpr, 'Main', value);
            this._changeFormItemDateType(dataExprs.endDateExpr, 'Main', value);
          }
        }
      }, {
        editorType: 'dxSwitch',
        dataField: 'repeat',
        cssClass: `dx-appointment-form-switch ${E2E_TEST_CLASSES.recurrenceSwitch}`,
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
      name: this.normalizeEditorName(dataExprs.descriptionExpr),
      dataField: dataExprs.descriptionExpr,
      cssClass: E2E_TEST_CLASSES.descriptionEditor,
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
  }
  _createRecurrenceEditor(dataExprs) {
    return [{
      name: this.normalizeEditorName(dataExprs.recurrenceRuleExpr),
      dataField: dataExprs.recurrenceRuleExpr,
      editorType: 'dxRecurrenceEditor',
      editorOptions: {
        firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
        timeZoneCalculator: this.scheduler.getTimeZoneCalculator(),
        getStartDateTimeZone: () => this.scheduler.getDataAccessors().get('startDateTimeZone', this.formData)
      },
      label: {
        text: ' ',
        visible: false
      }
    }];
  }
  setEditorsType(allDay) {
    const {
      startDateExpr,
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
    const startDateItemPath = this.getEditorPath(startDateExpr, 'Main');
    const endDateItemPath = this.getEditorPath(endDateExpr, 'Main');
    const startDateFormItem = this.form.itemOption(startDateItemPath);
    const endDateFormItem = this.form.itemOption(endDateItemPath);
    if (startDateFormItem && endDateFormItem) {
      const startDateEditorOptions = startDateFormItem.editorOptions;
      const endDateEditorOptions = endDateFormItem.editorOptions;
      startDateEditorOptions.type = endDateEditorOptions.type = allDay ? 'date' : 'datetime';
      this.form.itemOption(startDateItemPath, 'editorOptions', startDateEditorOptions);
      this.form.itemOption(endDateItemPath, 'editorOptions', endDateEditorOptions);
    }
  }
  updateRecurrenceEditorStartDate(date, expression) {
    const options = {
      startDate: date
    };
    this.setEditorOptions(expression, 'Recurrence', options);
  }
  setEditorOptions(name, groupName, options) {
    const editorPath = this.getEditorPath(name, groupName);
    const editor = this.form.itemOption(editorPath);
    editor && this.form.itemOption(editorPath, 'editorOptions', (0, _extend.extend)({}, editor.editorOptions, options));
  }
  updateFormData(formData) {
    this.isFormUpdating = true;
    this.form.option('formData', formData);
    const dataAccessors = this.scheduler.getDataAccessors();
    const {
      expr
    } = dataAccessors;
    const rawStartDate = dataAccessors.get('startDate', formData);
    const allDay = dataAccessors.get('allDay', formData);
    const startDate = new Date(rawStartDate);
    this.updateRecurrenceEditorStartDate(startDate, expr.recurrenceRuleExpr);
    this.setEditorsType(allDay);
    this.isFormUpdating = false;
  }
  createDateBoxEditor(dataField, colSpan, firstDayOfWeek, label, cssClass, onValueChanged) {
    return {
      editorType: 'dxDateBox',
      name: this.normalizeEditorName(dataField),
      dataField,
      colSpan,
      cssClass,
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
    };
  }
  getEditorPath(name, groupName) {
    const normalizedName = this.normalizeEditorName(name);
    return `${APPOINTMENT_FORM_GROUP_NAMES[groupName]}.${normalizedName}`;
  }
  normalizeEditorName(name) {
    // NOTE: This ternary operator covers the "recurrenceRuleExpr: null/''" scenarios.
    return name ? name.replace(/\./g, '_') : name;
  }
}
exports.AppointmentForm = AppointmentForm;
