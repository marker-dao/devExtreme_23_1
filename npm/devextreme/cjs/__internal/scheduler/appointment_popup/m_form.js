/**
* DevExtreme (cjs/__internal/scheduler/appointment_popup/m_form.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentForm = exports.APPOINTMENT_FORM_GROUP_NAMES = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _data = require("../../../common/data");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _form = _interopRequireDefault(require("../../../ui/form"));
var _themes = require("../../../ui/themes");
var _m_date_serialization = require("../../core/utils/m_date_serialization");
var _m_utils_time_zone = _interopRequireDefault(require("../m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const APPOINTMENT_FORM_GROUP_NAMES = exports.APPOINTMENT_FORM_GROUP_NAMES = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};
const CLASSES = {
  form: 'dx-scheduler-form',
  groupWithIcon: 'dx-scheduler-form-group-with-icon',
  icon: 'dx-scheduler-form-icon',
  defaultResourceIcon: 'dx-scheduler-default-resources-icon',
  mainGroup: 'dx-scheduler-form-main-group',
  subjectGroup: 'dx-scheduler-form-subject-group',
  dateRangeGroup: 'dx-scheduler-form-date-range-group',
  startDateGroup: 'dx-scheduler-form-start-date-group',
  endDateGroup: 'dx-scheduler-form-end-date-group',
  repeatGroup: 'dx-scheduler-form-repeat-group',
  descriptionGroup: 'dx-scheduler-form-description-group',
  resourcesGroup: 'dx-scheduler-form-resources-group',
  textEditor: 'dx-scheduler-form-text-editor',
  allDaySwitch: 'dx-scheduler-form-all-day-switch',
  startDateEditor: 'dx-scheduler-form-start-date-editor',
  startTimeEditor: 'dx-scheduler-form-start-time-editor',
  startDateTimeZoneEditor: 'dx-scheduler-form-start-date-timezone-editor',
  endDateEditor: 'dx-scheduler-form-end-date-editor',
  endTimeEditor: 'dx-scheduler-form-end-time-editor',
  endDateTimeZoneEditor: 'dx-scheduler-form-end-date-timezone-editor',
  repeatEditor: 'dx-scheduler-form-repeat-editor',
  descriptionEditor: 'dx-scheduler-form-description-editor',
  recurrenceSettingsButton: 'dx-scheduler-form-recurrence-settings-button'
};
const EDITOR_NAMES = {
  startDate: 'startDateEditor',
  startTime: 'startTimeEditor',
  endDate: 'endDateEditor',
  endTime: 'endTimeEditor',
  repeat: 'repeatEditor'
};
const repeatSelectBoxItems = [{
  recurrence: 'dxScheduler-recurrenceNever',
  value: 'never'
}, {
  recurrence: 'dxScheduler-recurrenceHourly',
  value: 'hourly'
}, {
  recurrence: 'dxScheduler-recurrenceDaily',
  value: 'daily'
}, {
  recurrence: 'dxScheduler-recurrenceWeekly',
  value: 'weekly'
}, {
  recurrence: 'dxScheduler-recurrenceMonthly',
  value: 'monthly'
}, {
  recurrence: 'dxScheduler-recurrenceYearly',
  value: 'yearly'
}].map(item => ({
  text: _message.default.format(item.recurrence),
  value: item.value
}));
const createTimeZoneDataSource = () => new _data.DataSource({
  store: _m_utils_time_zone.default.getTimeZonesCache(),
  paginate: true,
  pageSize: 10
});
class AppointmentForm {
  get dxForm() {
    return this._dxForm;
  }
  set readOnly(value) {
    this.dxForm.option('readOnly', value);
  }
  get formData() {
    return this.dxForm.option('formData');
  }
  set formData(formData) {
    this.dxForm.option('formData', formData);
  }
  get startDate() {
    const {
      startDateExpr
    } = this.scheduler.getDataAccessors().expr;
    const value = this.formData[startDateExpr];
    return value ? new Date(_m_date_serialization.dateSerialization.deserializeDate(value)) : null;
  }
  get endDate() {
    const {
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
    const value = this.formData[endDateExpr];
    return value ? new Date(_m_date_serialization.dateSerialization.deserializeDate(value)) : null;
  }
  get recurrenceRule() {
    const {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    const value = this.formData[recurrenceRuleExpr];
    return value ?? null;
  }
  constructor(scheduler) {
    this.scheduler = scheduler;
  }
  create() {
    const mainGroup = this.createMainFormGroup();
    const items = [mainGroup];
    this.setStylingModeToEditors(mainGroup);
    this.createForm(items);
  }
  createForm(items) {
    const element = (0, _renderer.default)('<div>');
    return this.scheduler.createComponent(element, _form.default, {
      items,
      formData: {},
      showColonAfterLabel: false,
      showValidationSummary: false,
      scrollingEnabled: false,
      labelLocation: 'top',
      elementAttr: {
        class: CLASSES.form
      },
      onFieldDataChanged: e => {
        const {
          startDateExpr,
          endDateExpr,
          recurrenceRuleExpr,
          allDayExpr
        } = this.scheduler.getDataAccessors().expr;
        const isAllDayChanged = e.dataField === allDayExpr;
        const isDateRangeChanged = [startDateExpr, endDateExpr].includes(e.dataField);
        const isRecurrenceRuleChanged = e.dataField === recurrenceRuleExpr;
        if (isAllDayChanged) {
          this.updateDateTimeEditorsVisibility();
        }
        if (isDateRangeChanged) {
          this.updateDateEditorsValues();
        }
        if (isRecurrenceRuleChanged) {
          this.updateRepeatEditor();
        }
      },
      onInitialized: e => {
        this._dxForm = e.component;
      }
    });
  }
  createMainFormGroup() {
    return {
      name: APPOINTMENT_FORM_GROUP_NAMES.Main,
      itemType: 'group',
      colSpan: 1,
      cssClass: CLASSES.mainGroup,
      items: [this.createSubjectGroup(), this.createDateRangeGroup(), this.createRepeatGroup(), this.createResourcesGroup(), this.createDescriptionGroup()]
    };
  }
  createRecurrenceFormGroup() {
    throw new Error('Method not implemented.');
  }
  createSubjectGroup() {
    const {
      textExpr
    } = this.scheduler.getDataAccessors().expr;
    return {
      itemType: 'group',
      cssClass: `${CLASSES.subjectGroup} ${CLASSES.groupWithIcon}`,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        colSpan: 1,
        cssClass: CLASSES.icon,
        template: this.createIconTemplate('isnotblank')
      }, {
        colSpan: 1,
        itemType: 'simple',
        cssClass: CLASSES.textEditor,
        dataField: textExpr,
        label: {
          text: _message.default.format('dxScheduler-editorLabelTitle')
        },
        editorType: 'dxTextBox'
      }]
    };
  }
  createDateRangeGroup() {
    return {
      itemType: 'group',
      cssClass: `${CLASSES.dateRangeGroup} ${CLASSES.groupWithIcon}`,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        colSpan: 1,
        cssClass: CLASSES.icon,
        template: this.createIconTemplate('clock')
      }, {
        colSpan: 1,
        itemType: 'group',
        items: [this.createAllDaySwitch(), this.createStartDateGroup(), this.createEndDateGroup()]
      }]
    };
  }
  createAllDaySwitch() {
    const {
      allDayExpr,
      startDateExpr,
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
    return {
      itemType: 'simple',
      dataField: allDayExpr,
      cssClass: CLASSES.allDaySwitch,
      label: {
        text: _message.default.format('dxScheduler-allDay'),
        location: 'left'
      },
      editorType: 'dxSwitch',
      editorOptions: {
        onValueChanged: e => {
          const {
            startDate
          } = this;
          if (!startDate) {
            return;
          }
          if (e.value) {
            const allDayStartDate = _date.default.trimTime(startDate);
            this.dxForm.updateData(startDateExpr, allDayStartDate);
            this.dxForm.updateData(endDateExpr, allDayStartDate);
          } else {
            const startHour = this.scheduler.getStartDayHour();
            startDate.setHours(startHour);
            const endDate = this.scheduler.getCalculatedEndDate(startDate);
            this.dxForm.updateData(startDateExpr, startDate);
            this.dxForm.updateData(endDateExpr, endDate);
          }
        }
      }
    };
  }
  createStartDateGroup() {
    const {
      startDateExpr,
      startDateTimeZoneExpr,
      endDateTimeZoneExpr
    } = this.scheduler.getDataAccessors().expr;
    return this.createDateGroup(startDateExpr, {
      cssClass: CLASSES.startDateGroup
    }, {
      name: EDITOR_NAMES.startDate,
      label: {
        text: _message.default.format('dxScheduler-editorLabelStartDate')
      },
      cssClass: CLASSES.startDateEditor
    }, {
      name: EDITOR_NAMES.startTime,
      cssClass: CLASSES.startTimeEditor
    }, {
      dataField: startDateTimeZoneExpr,
      cssClass: CLASSES.startDateTimeZoneEditor,
      editorOptions: {
        onValueChanged: e => {
          const endDateTimeZoneEditor = this.dxForm.getEditor(endDateTimeZoneExpr);
          endDateTimeZoneEditor === null || endDateTimeZoneEditor === void 0 || endDateTimeZoneEditor.option('value', e.value);
        }
      }
    });
  }
  createEndDateGroup() {
    const {
      endDateExpr,
      endDateTimeZoneExpr
    } = this.scheduler.getDataAccessors().expr;
    return this.createDateGroup(endDateExpr, {
      cssClass: CLASSES.endDateGroup
    }, {
      name: EDITOR_NAMES.endDate,
      label: {
        text: _message.default.format('dxScheduler-editorLabelEndDate')
      },
      cssClass: CLASSES.endDateEditor
    }, {
      name: EDITOR_NAMES.endTime,
      cssClass: CLASSES.endTimeEditor
    }, {
      dataField: endDateTimeZoneExpr,
      cssClass: CLASSES.endDateTimeZoneEditor
    });
  }
  createDateGroup(dateExpr, groupItemOptions, dateItemOptions, timeItemOptions, timezoneItemOptions) {
    const {
      allowTimeZoneEditing
    } = this.scheduler.getEditingConfig();
    const {
      startDateExpr,
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
    const isStartDateEditor = dateExpr === startDateExpr;
    const getEditorsDate = () => isStartDateEditor ? this.startDate : this.endDate;
    const correctDateRange = previousDateValue => {
      const {
        startDate,
        endDate
      } = this;
      if (!startDate || !endDate || startDate.getTime() <= endDate.getTime()) {
        return;
      }
      if (isStartDateEditor) {
        const duration = previousDateValue ? endDate.getTime() - previousDateValue.getTime() : 0;
        const correctedEndDate = new Date(startDate.getTime() + duration);
        this.dxForm.updateData(endDateExpr, correctedEndDate);
      } else {
        const duration = previousDateValue ? previousDateValue.getTime() - startDate.getTime() : 0;
        const correctedStartDate = new Date(endDate.getTime() - duration);
        this.dxForm.updateData(startDateExpr, correctedStartDate);
      }
    };
    const dateValueChanged = (e, modifyDate) => {
      const currentDate = getEditorsDate();
      if (!currentDate) {
        this.dxForm.updateData(dateExpr, e.value);
        return;
      }
      if (!e.value) {
        return;
      }
      const previousDateValue = new Date(currentDate);
      modifyDate(currentDate);
      this.dxForm.updateData(dateExpr, currentDate);
      correctDateRange(previousDateValue);
    };
    return _extends({
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [(0, _extend.extend)(true, {
        itemType: 'simple',
        colSpan: 1,
        editorType: 'dxDateBox',
        validationRules: [{
          type: 'required'
        }],
        editorOptions: {
          type: 'date',
          useMaskBehavior: true,
          onValueChanged: e => {
            dateValueChanged(e, date => {
              date.setFullYear(e.value.getFullYear(), e.value.getMonth(), e.value.getDate());
            });
          },
          onContentReady: e => {
            e.component.option('value', getEditorsDate());
          }
        }
      }, dateItemOptions), (0, _extend.extend)(true, {
        itemType: 'simple',
        colSpan: 1,
        editorType: 'dxDateBox',
        validationRules: [{
          type: 'required'
        }],
        editorOptions: {
          type: 'time',
          useMaskBehavior: true,
          calendarOptions: {
            firstDayOfWeek: this.scheduler.getFirstDayOfWeek()
          },
          onValueChanged: e => {
            dateValueChanged(e, date => {
              date.setHours(e.value.getHours(), e.value.getMinutes());
            });
          },
          onContentReady: e => {
            e.component.option('value', getEditorsDate());
          }
        }
      }, timeItemOptions), (0, _extend.extend)(true, {
        itemType: 'simple',
        colSpan: 2,
        editorType: 'dxSelectBox',
        visible: allowTimeZoneEditing,
        editorOptions: {
          displayExpr: 'title',
          valueExpr: 'id',
          placeholder: _message.default.format('dxScheduler-noTimezoneTitle'),
          searchEnabled: true,
          dataSource: createTimeZoneDataSource()
        }
      }, timezoneItemOptions)]
    }, groupItemOptions);
  }
  createRepeatGroup() {
    return {
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      cssClass: `${CLASSES.repeatGroup} ${CLASSES.groupWithIcon}`,
      items: [{
        colSpan: 1,
        cssClass: CLASSES.icon,
        template: this.createIconTemplate('repeat')
      }, {
        name: EDITOR_NAMES.repeat,
        colSpan: 1,
        itemType: 'simple',
        cssClass: CLASSES.repeatEditor,
        label: {
          text: _message.default.format('dxScheduler-editorLabelRecurrence')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: repeatSelectBoxItems,
          valueExpr: 'value',
          displayExpr: 'text',
          onContentReady: () => {
            this.updateRepeatEditor();
          }
        }
      }]
    };
  }
  createDescriptionGroup() {
    return {
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      cssClass: `${CLASSES.descriptionGroup} ${CLASSES.groupWithIcon}`,
      items: [{
        colSpan: 1,
        cssClass: CLASSES.icon,
        template: this.createIconTemplate('description')
      }, {
        colSpan: 1,
        itemType: 'simple',
        cssClass: CLASSES.descriptionEditor,
        label: {
          text: _message.default.format('dxScheduler-editorLabelDescription')
        },
        editorType: 'dxTextArea',
        editorOptions: {
          height: 100
        }
      }]
    };
  }
  createResourcesGroup() {
    const resourcesLoaders = Object.values(this.scheduler.getResourceById());
    const resourcesItems = resourcesLoaders.map(resourceLoader => {
      const {
        dataSource,
        dataAccessor
      } = resourceLoader;
      const dataField = resourceLoader.resourceIndex;
      const label = resourceLoader.resourceName ?? dataField;
      const editorType = resourceLoader.allowMultiple ? 'dxTagBox' : 'dxSelectBox';
      return {
        itemType: 'group',
        items: [{
          itemType: 'simple',
          dataField,
          label: {
            text: label
          },
          editorType,
          editorOptions: {
            dataSource,
            displayExpr: dataAccessor.textExpr,
            valueExpr: dataAccessor.idExpr
          }
        }]
      };
    });
    return {
      itemType: 'group',
      visible: resourcesItems.length > 0,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      cssClass: `${CLASSES.resourcesGroup} ${CLASSES.groupWithIcon}`,
      items: [{
        colSpan: 1,
        cssClass: `${CLASSES.icon} ${CLASSES.defaultResourceIcon}`,
        template: this.createIconTemplate('user') // TODO: change icon to 'addcircleoutline'
      }, {
        itemType: 'group',
        colSpan: 1,
        items: resourcesItems
      }]
    };
  }
  setStylingModeToEditors(item) {
    if (item.itemType === 'simple') {
      const simpleItem = item;
      const stylingMode = (0, _themes.isFluent)((0, _themes.current)()) ? 'filled' : undefined;
      simpleItem.editorOptions = (0, _extend.extend)(simpleItem.editorOptions, {
        stylingMode
      });
      return;
    }
    if (item.itemType === 'group') {
      var _groupItem$items;
      const groupItem = item;
      (_groupItem$items = groupItem.items) === null || _groupItem$items === void 0 || _groupItem$items.forEach(child => {
        this.setStylingModeToEditors(child);
      });
    }
  }
  showRecurrenceGroup() {
    throw new Error('Method not implemented.');
  }
  updateDateEditorsValues() {
    const startDateEditor = this.dxForm.getEditor(EDITOR_NAMES.startDate);
    const startTimeEditor = this.dxForm.getEditor(EDITOR_NAMES.startTime);
    const endDateEditor = this.dxForm.getEditor(EDITOR_NAMES.endDate);
    const endTimeEditor = this.dxForm.getEditor(EDITOR_NAMES.endTime);
    startDateEditor === null || startDateEditor === void 0 || startDateEditor.option('value', this.startDate);
    startTimeEditor === null || startTimeEditor === void 0 || startTimeEditor.option('value', this.startDate);
    endDateEditor === null || endDateEditor === void 0 || endDateEditor.option('value', this.endDate);
    endTimeEditor === null || endTimeEditor === void 0 || endTimeEditor.option('value', this.endDate);
  }
  updateRepeatEditor() {
    const repeatEditor = this.dxForm.getEditor(EDITOR_NAMES.repeat);
    if (!repeatEditor) {
      return;
    }
    repeatEditor.option('buttons', this.getRepeatEditorButtons());
  }
  getRepeatEditorButtons() {
    const buttons = [];
    if (this.recurrenceRule !== undefined) {
      buttons.push({
        location: 'after',
        name: 'settings',
        options: {
          icon: 'optionsoutline',
          stylingMode: 'text',
          onClick: () => {
            this.showRecurrenceGroup();
          },
          elementAttr: {
            class: CLASSES.recurrenceSettingsButton
          }
        }
      });
    }
    buttons.push({
      name: 'dropDown'
    });
    return buttons;
  }
  updateDateTimeEditorsVisibility() {
    const {
      allDayExpr
    } = this.scheduler.getDataAccessors().expr;
    const visible = !this.formData[allDayExpr];
    const mainGroup = APPOINTMENT_FORM_GROUP_NAMES.Main;
    this.dxForm.beginUpdate();
    this.dxForm.itemOption(`${mainGroup}.${EDITOR_NAMES.startDate}`, 'colSpan', visible ? 1 : 2);
    this.dxForm.itemOption(`${mainGroup}.${EDITOR_NAMES.startTime}`, 'visible', visible);
    this.dxForm.itemOption(`${mainGroup}.${EDITOR_NAMES.endDate}`, 'colSpan', visible ? 1 : 2);
    this.dxForm.itemOption(`${mainGroup}.${EDITOR_NAMES.endTime}`, 'visible', visible);
    this.dxForm.endUpdate();
  }
  createIconTemplate(iconName) {
    return () => (0, _renderer.default)('<i>').addClass('dx-icon').addClass(`dx-icon-${iconName}`);
  }
}
exports.AppointmentForm = AppointmentForm;
