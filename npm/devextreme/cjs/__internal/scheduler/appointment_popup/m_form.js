/**
* DevExtreme (cjs/__internal/scheduler/appointment_popup/m_form.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentForm = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _data = require("../../../common/data");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _form = _interopRequireDefault(require("../../../ui/form"));
var _themes = require("../../../ui/themes");
var _m_date_serialization = require("../../core/utils/m_date_serialization");
var _m_utils_time_zone = _interopRequireDefault(require("../m_utils_time_zone"));
var _constants = require("../utils/options/constants");
var _appointment_groups_utils = require("../utils/resource_manager/appointment_groups_utils");
var _m_customize_form_items = require("./m_customize_form_items");
var _m_recurrence_form = require("./m_recurrence_form");
var _utils = require("./utils");
const _excluded = ["items", "onContentReady", "onInitialized"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const CLASSES = {
  form: 'dx-scheduler-form',
  icon: 'dx-icon',
  hidden: 'dx-hidden',
  groupWithIcon: 'dx-scheduler-form-group-with-icon',
  formIcon: 'dx-scheduler-form-icon',
  defaultResourceIcon: 'dx-scheduler-default-resources-icon',
  mainGroup: 'dx-scheduler-form-main-group',
  subjectGroup: 'dx-scheduler-form-subject-group',
  dateRangeGroup: 'dx-scheduler-form-date-range-group',
  startDateGroup: 'dx-scheduler-form-start-date-group',
  endDateGroup: 'dx-scheduler-form-end-date-group',
  repeatGroup: 'dx-scheduler-form-repeat-group',
  descriptionGroup: 'dx-scheduler-form-description-group',
  resourcesGroup: 'dx-scheduler-form-resources-group',
  recurrenceRepeatEveryGroup: 'dx-scheduler-form-recurrence-repeat-every-group',
  recurrenceRepeatOnMonthlyGroup: 'dx-scheduler-form-recurrence-repeat-on-monthly-group',
  recurrenceRepeatOnYearlyGroup: 'dx-scheduler-form-recurrence-repeat-on-yearly-group',
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
  recurrenceSettingsButton: 'dx-scheduler-form-recurrence-settings-button',
  mainHidden: 'dx-scheduler-form-main-group-hidden',
  recurrenceGroup: 'dx-scheduler-form-recurrence-group',
  recurrenceHidden: 'dx-scheduler-form-recurrence-group-hidden'
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
const repeatNeverValue = repeatSelectBoxItems[0].value;
const createTimeZoneDataSource = () => new _data.DataSource({
  store: _m_utils_time_zone.default.getTimeZonesCache(),
  paginate: true,
  pageSize: 10
});
const MAIN_GROUP_NAME = 'mainGroup';
const DATE_GROUP_NAME = 'dateGroup';
const DATE_OPTIONS_GROUP_NAME = 'dateOptionsGroup';
const START_DATE_GROUP_NAME = 'startDateGroup';
const END_DATE_GROUP_NAME = 'endDateGroup';
const RESOURCES_GROUP_NAME = 'resourcesGroup';
const SUBJECT_GROUP_NAME = 'subjectGroup';
const REPEAT_GROUP_NAME = 'repeatGroup';
const DESCRIPTION_GROUP_NAME = 'descriptionGroup';
const START_DATE_TIME_GROUP_NAME = 'startDateTimeGroup';
const START_DATE_EDITOR_NAME = 'startDateEditor';
const START_TIME_EDITOR_NAME = 'startTimeEditor';
const END_DATE_TIME_GROUP_NAME = 'endDateTimeGroup';
const END_DATE_EDITOR_NAME = 'endDateEditor';
const END_TIME_EDITOR_NAME = 'endTimeEditor';
const REPEAT_EDITOR_NAME = 'repeatEditor';
const ALL_DAY_EDITOR_NAME = 'allDayEditor';
const SUBJECT_EDITOR_NAME = 'subjectEditor';
const DESCRIPTION_EDITOR_NAME = 'descriptionEditor';
const START_DATE_TIMEZONE_EDITOR_NAME = 'startDateTimeZoneEditor';
const END_DATE_TIMEZONE_EDITOR_NAME = 'endDateTimeZoneEditor';
const SUBJECT_ICON_NAME = 'subjectIcon';
const DATE_ICON_NAME = 'dateIcon';
const REPEAT_ICON_NAME = 'repeatIcon';
const DESCRIPTION_ICON_NAME = 'descriptionIcon';
class AppointmentForm {
  get dxForm() {
    return this._dxForm;
  }
  get dxPopup() {
    return this._popup.dxPopup;
  }
  get readOnly() {
    return this.dxForm.option('readOnly');
  }
  set readOnly(value) {
    this.dxForm.option('readOnly', value);
    this._recurrenceForm.setReadOnly(value);
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
    const value = this.getFormDataField(startDateExpr);
    return value ? new Date(_m_date_serialization.dateSerialization.deserializeDate(value)) : null;
  }
  get endDate() {
    const {
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
    const value = this.getFormDataField(endDateExpr);
    return value ? new Date(_m_date_serialization.dateSerialization.deserializeDate(value)) : null;
  }
  get recurrenceRuleRaw() {
    const {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    const value = this.getFormDataField(recurrenceRuleExpr);
    return value ?? null;
  }
  constructor(scheduler) {
    this.scheduler = scheduler;
    this.resourceManager = scheduler.getResourceManager();
  }
  getFormDataField(field) {
    return this.dxForm.option(`formData.${field}`);
  }
  dispose() {
    var _this$_dxForm;
    (_this$_dxForm = this._dxForm) === null || _this$_dxForm === void 0 || _this$_dxForm.dispose();
    this._dxForm = undefined;
    if (this._recurrenceForm) {
      this._recurrenceForm.dxForm = undefined;
    }
  }
  create(popup) {
    var _editingConfig$form;
    this._popup = popup;
    const mainGroup = this.createMainFormGroup();
    this._recurrenceForm = new _m_recurrence_form.RecurrenceForm(this.scheduler);
    const recurrenceGroup = this._recurrenceForm.createRecurrenceFormGroup();
    const items = [mainGroup, recurrenceGroup];
    const iconsShowMode = this.getIconsShowMode();
    const showMainGroupIcons = ['main', 'both'].includes(iconsShowMode);
    const showRecurrenceGroupIcons = ['recurrence', 'both'].includes(iconsShowMode);
    this.setStylingModeToEditors(mainGroup, showMainGroupIcons);
    this.setStylingModeToEditors(recurrenceGroup, showRecurrenceGroupIcons);
    const editingConfig = this.scheduler.getEditingConfig();
    const customizedItems = (0, _m_customize_form_items.customizeFormItems)(items, editingConfig === null || editingConfig === void 0 || (_editingConfig$form = editingConfig.form) === null || _editingConfig$form === void 0 ? void 0 : _editingConfig$form.items);
    this.createForm(customizedItems);
  }
  getIconsShowMode() {
    var _editingConfig$form2;
    const editingConfig = this.scheduler.getEditingConfig();
    if ((0, _type.isBoolean)(editingConfig)) {
      return _constants.DEFAULT_ICONS_SHOW_MODE;
    }
    return (editingConfig === null || editingConfig === void 0 || (_editingConfig$form2 = editingConfig.form) === null || _editingConfig$form2 === void 0 ? void 0 : _editingConfig$form2.iconsShowMode) ?? _constants.DEFAULT_ICONS_SHOW_MODE;
  }
  createForm(items) {
    const element = (0, _renderer.default)('<div>');
    const editingConfig = this.scheduler.getEditingConfig();
    const _ref = (editingConfig === null || editingConfig === void 0 ? void 0 : editingConfig.form) ?? {},
      {
        onContentReady,
        onInitialized
      } = _ref,
      customFormOptions = _objectWithoutPropertiesLoose(_ref, _excluded);
    const defaultOptions = {
      items,
      formData: {},
      showColonAfterLabel: false,
      showValidationSummary: false,
      scrollingEnabled: false,
      labelLocation: 'top',
      colCountByScreen: {
        xs: 1
      },
      elementAttr: {
        class: CLASSES.form
      },
      onFieldDataChanged: e => {
        const {
          startDateExpr,
          endDateExpr,
          recurrenceRuleExpr
        } = this.scheduler.getDataAccessors().expr;
        const {
          dataField
        } = e;
        if (!dataField) {
          return;
        }
        const isDateRangeChanged = [startDateExpr, endDateExpr].includes(dataField);
        const isRecurrenceRuleChanged = dataField === recurrenceRuleExpr;
        const isResourceChanged = Object.keys(this.scheduler.getResourceById()).includes(dataField);
        if (isDateRangeChanged) {
          this.updateDateEditorsValues();
        }
        if (isRecurrenceRuleChanged || startDateExpr === dataField) {
          this._recurrenceForm.updateRecurrenceFormValues(this.recurrenceRuleRaw, this.startDate);
        }
        if (isRecurrenceRuleChanged) {
          this.updateRepeatEditorValue();
        }
        if (isResourceChanged) {
          this.updateSubjectIconColor();
        }
      },
      onInitialized: e => {
        this._dxForm = e.component;
        this._recurrenceForm.dxForm = this.dxForm;
        onInitialized === null || onInitialized === void 0 || onInitialized.call(this, e);
      },
      onContentReady: e => {
        const $formElement = e.component.$element();
        this._$mainGroup = $formElement.find(`.${CLASSES.mainGroup}`);
        this._$recurrenceGroup = $formElement.find(`.${CLASSES.recurrenceGroup}`);
        onContentReady === null || onContentReady === void 0 || onContentReady.call(this, e);
      }
    };
    const formOptions = (0, _extend.extend)(true, defaultOptions, customFormOptions);
    return this.scheduler.createComponent(element, _form.default, formOptions);
  }
  createMainFormGroup() {
    return {
      name: MAIN_GROUP_NAME,
      itemType: 'group',
      colSpan: 1,
      cssClass: CLASSES.mainGroup,
      items: [this.createSubjectGroup(), this.createDateRangeGroup(), this.createRepeatGroup(), this.createResourcesGroup(), this.createDescriptionGroup()]
    };
  }
  createSubjectGroup() {
    const {
      textExpr
    } = this.scheduler.getDataAccessors().expr;
    return {
      name: SUBJECT_GROUP_NAME,
      itemType: 'group',
      cssClass: `${CLASSES.subjectGroup} ${CLASSES.groupWithIcon}`,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        name: SUBJECT_ICON_NAME,
        colSpan: 1,
        cssClass: CLASSES.formIcon,
        template: (0, _utils.createFormIconTemplate)('isnotblank')
      }, {
        name: SUBJECT_EDITOR_NAME,
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
      name: DATE_GROUP_NAME,
      itemType: 'group',
      cssClass: `${CLASSES.dateRangeGroup} ${CLASSES.groupWithIcon}`,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        name: DATE_ICON_NAME,
        colSpan: 1,
        cssClass: CLASSES.formIcon,
        template: (0, _utils.createFormIconTemplate)('clock')
      }, {
        colSpan: 1,
        name: DATE_OPTIONS_GROUP_NAME,
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
      name: ALL_DAY_EDITOR_NAME,
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
          this.updateDateTimeEditorsVisibility();
          const {
            startDate
          } = this;
          if (!startDate || e.event === undefined) {
            return;
          }
          if (e.value) {
            const allDayStartDate = _date.default.trimTime(startDate);
            this.dxForm.updateData(startDateExpr, allDayStartDate);
            this.dxForm.updateData(endDateExpr, allDayStartDate);
          } else {
            const startHour = this.scheduler.getStartDayHour();
            startDate.setHours(startHour);
            const calculatedEndDate = this.scheduler.getCalculatedEndDate(startDate);
            this.dxForm.updateData(startDateExpr, startDate);
            this.dxForm.updateData(endDateExpr, calculatedEndDate);
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
      name: START_DATE_GROUP_NAME,
      cssClass: CLASSES.startDateGroup
    }, {
      name: START_DATE_EDITOR_NAME,
      label: {
        text: _message.default.format('dxScheduler-editorLabelStartDate')
      },
      cssClass: CLASSES.startDateEditor
    }, {
      name: START_TIME_EDITOR_NAME,
      cssClass: CLASSES.startTimeEditor
    }, {
      name: START_DATE_TIMEZONE_EDITOR_NAME,
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
      name: END_DATE_GROUP_NAME,
      cssClass: CLASSES.endDateGroup
    }, {
      name: END_DATE_EDITOR_NAME,
      label: {
        text: _message.default.format('dxScheduler-editorLabelEndDate')
      },
      cssClass: CLASSES.endDateEditor
    }, {
      name: END_TIME_EDITOR_NAME,
      cssClass: CLASSES.endTimeEditor
    }, {
      name: END_DATE_TIMEZONE_EDITOR_NAME,
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
      if (!e.event && currentDate.getTime() === e.value.getTime()) {
        return;
      }
      const previousDateValue = new Date(currentDate);
      modifyDate(currentDate);
      this.dxForm.updateData(dateExpr, currentDate);
      correctDateRange(previousDateValue);
    };
    return Object.assign({
      itemType: 'group',
      items: [{
        name: isStartDateEditor ? START_DATE_TIME_GROUP_NAME : END_DATE_TIME_GROUP_NAME,
        itemType: 'group',
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        items: [(0, _extend.extend)(true, (0, _utils.getStartDateCommonConfig)(this.scheduler.getFirstDayOfWeek()), {
          editorOptions: {
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
        }, timeItemOptions)]
      }, (0, _extend.extend)(true, {
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
    const {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    return {
      name: REPEAT_GROUP_NAME,
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      cssClass: `${CLASSES.repeatGroup} ${CLASSES.groupWithIcon}`,
      items: [{
        name: REPEAT_ICON_NAME,
        colSpan: 1,
        cssClass: CLASSES.formIcon,
        template: (0, _utils.createFormIconTemplate)('repeat')
      }, {
        name: REPEAT_EDITOR_NAME,
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
            this.updateRepeatEditorValue();
          },
          onValueChanged: e => {
            if (e.value === repeatNeverValue) {
              this.dxForm.updateData(recurrenceRuleExpr, '');
            } else {
              const currentRecurrenceRule = this._recurrenceForm.recurrenceRule.toString() ?? '';
              const recurrenceRule = new _utils.RecurrenceRule(currentRecurrenceRule, this.startDate);
              recurrenceRule.frequency = e.value;
              this.dxForm.updateData(recurrenceRuleExpr, recurrenceRule.toString());
            }
            if (e.value !== repeatNeverValue && e.event) {
              this.showRecurrenceGroup();
            }
            e.component.option('buttons', this.getRepeatEditorButtons());
          }
        }
      }]
    };
  }
  createDescriptionGroup() {
    const {
      descriptionExpr
    } = this.scheduler.getDataAccessors().expr;
    return {
      name: DESCRIPTION_GROUP_NAME,
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      cssClass: `${CLASSES.descriptionGroup} ${CLASSES.groupWithIcon}`,
      items: [{
        name: DESCRIPTION_ICON_NAME,
        colSpan: 1,
        cssClass: CLASSES.formIcon,
        template: (0, _utils.createFormIconTemplate)('description')
      }, {
        name: DESCRIPTION_EDITOR_NAME,
        dataField: descriptionExpr,
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
    let resourcesItems = resourcesLoaders.map(resourceLoader => {
      const {
        dataSource,
        dataAccessor
      } = resourceLoader;
      const dataField = resourceLoader.resourceIndex;
      const label = resourceLoader.resourceName ?? dataField;
      const editorType = resourceLoader.allowMultiple ? 'dxTagBox' : 'dxSelectBox';
      return {
        itemType: 'simple',
        name: dataField,
        dataField,
        label: {
          text: label
        },
        colSpan: 1,
        editorType,
        editorOptions: {
          dataSource,
          displayExpr: dataAccessor.textExpr,
          valueExpr: dataAccessor.idExpr
        }
      };
    });
    const noCustomResourceIcons = resourcesLoaders.every(resource => !resource.icon);
    if (noCustomResourceIcons) {
      return {
        name: RESOURCES_GROUP_NAME,
        itemType: 'group',
        visible: resourcesItems.length > 0,
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        cssClass: `${CLASSES.resourcesGroup} ${CLASSES.groupWithIcon}`,
        items: [{
          name: `${RESOURCES_GROUP_NAME}Icon`,
          colSpan: 1,
          cssClass: `${CLASSES.formIcon} ${CLASSES.defaultResourceIcon}`,
          template: (0, _utils.createFormIconTemplate)('addcircleoutline')
        }, {
          name: `${RESOURCES_GROUP_NAME}Content`,
          itemType: 'group',
          colSpan: 1,
          items: resourcesItems
        }]
      };
    }
    resourcesItems = resourcesItems.map((item, index) => {
      const icon = resourcesLoaders[index].icon ?? '';
      const dataField = resourcesLoaders[index].resourceIndex;
      return {
        itemType: 'group',
        name: `${dataField}Group`,
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        cssClass: CLASSES.groupWithIcon,
        items: [{
          colSpan: 1,
          name: `${dataField}Icon`,
          cssClass: CLASSES.formIcon,
          template: (0, _utils.createFormIconTemplate)(icon)
        }, item]
      };
    });
    return {
      name: RESOURCES_GROUP_NAME,
      itemType: 'group',
      colCount: 1,
      colCountByScreen: {
        xs: 1
      },
      cssClass: CLASSES.resourcesGroup,
      items: resourcesItems
    };
  }
  setStylingModeToEditors(item, showIcon) {
    const itemClasses = (item.cssClass ?? '').split(' ');
    const isIconItem = itemClasses.includes(CLASSES.formIcon);
    if (isIconItem) {
      const isHidden = itemClasses.includes(CLASSES.hidden);
      if (!showIcon && !isHidden) {
        item.cssClass += ` ${CLASSES.hidden}`;
      }
      return;
    }
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
        this.setStylingModeToEditors(child, showIcon);
      });
    }
  }
  showMainGroup() {
    var _editingConfig$popup, _this$_$mainGroup, _this$_$mainGroup2, _this$_$recurrenceGro, _this$_$recurrenceGro2;
    const currentHeight = this.dxPopup.option('height');
    const editingConfig = this.scheduler.getEditingConfig();
    const configuredHeight = (editingConfig === null || editingConfig === void 0 || (_editingConfig$popup = editingConfig.popup) === null || _editingConfig$popup === void 0 ? void 0 : _editingConfig$popup.height) ?? 'auto';
    if (typeof currentHeight === 'number') {
      this.dxPopup.option('height', configuredHeight);
    }
    (_this$_$mainGroup = this._$mainGroup) === null || _this$_$mainGroup === void 0 || _this$_$mainGroup.removeClass(CLASSES.mainHidden);
    (_this$_$mainGroup2 = this._$mainGroup) === null || _this$_$mainGroup2 === void 0 || _this$_$mainGroup2.removeAttr('tabindex');
    (_this$_$recurrenceGro = this._$recurrenceGroup) === null || _this$_$recurrenceGro === void 0 || _this$_$recurrenceGro.addClass(CLASSES.recurrenceHidden);
    (_this$_$recurrenceGro2 = this._$recurrenceGroup) === null || _this$_$recurrenceGro2 === void 0 || _this$_$recurrenceGro2.attr('tabindex', '-1');
    this._popup.updateToolbarForMainGroup();
  }
  showRecurrenceGroup() {
    var _this$_$mainGroup3, _this$_$mainGroup4, _this$_$recurrenceGro3, _this$_$recurrenceGro4;
    const currentHeight = this.dxPopup.option('height');
    if (currentHeight === 'auto' || currentHeight === undefined) {
      const overlayHeight = this.dxPopup.$overlayContent().get(0).clientHeight;
      this.dxPopup.option('height', overlayHeight);
    }
    (_this$_$mainGroup3 = this._$mainGroup) === null || _this$_$mainGroup3 === void 0 || _this$_$mainGroup3.addClass(CLASSES.mainHidden);
    (_this$_$mainGroup4 = this._$mainGroup) === null || _this$_$mainGroup4 === void 0 || _this$_$mainGroup4.attr('tabindex', '-1');
    (_this$_$recurrenceGro3 = this._$recurrenceGroup) === null || _this$_$recurrenceGro3 === void 0 || _this$_$recurrenceGro3.removeClass(CLASSES.recurrenceHidden);
    (_this$_$recurrenceGro4 = this._$recurrenceGroup) === null || _this$_$recurrenceGro4 === void 0 || _this$_$recurrenceGro4.removeAttr('tabindex');
    this._popup.updateToolbarForRecurrenceGroup();
  }
  saveRecurrenceValue() {
    const {
      recurrenceRule
    } = this._recurrenceForm;
    const {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    const recurrenceRuleSerialized = recurrenceRule.toString() ?? '';
    this.dxForm.updateData(recurrenceRuleExpr, recurrenceRuleSerialized);
    if (recurrenceRuleSerialized) {
      var _this$dxForm$getEdito;
      (_this$dxForm$getEdito = this.dxForm.getEditor(START_DATE_EDITOR_NAME)) === null || _this$dxForm$getEdito === void 0 || _this$dxForm$getEdito.option('value', recurrenceRule.startDate);
    }
  }
  async updateSubjectIconColor() {
    const groupValues = (0, _appointment_groups_utils.getRawAppointmentGroupValues)(this.formData, this.resourceManager.resources);
    const groupIndex = (0, _appointment_groups_utils.getAppointmentGroupIndex)((0, _appointment_groups_utils.getSafeGroupValues)(groupValues), this.resourceManager.groupsLeafs)[0];
    const color = await this.resourceManager.getAppointmentColor({
      itemData: this.formData,
      groupIndex
    });
    const $icon = this.dxForm.$element().find(`.${CLASSES.subjectGroup} .${CLASSES.formIcon} .${CLASSES.icon}`);
    $icon.css('color', color ?? '');
  }
  updateDateEditorsValues() {
    const startDateEditor = this.dxForm.getEditor(START_DATE_EDITOR_NAME);
    const startTimeEditor = this.dxForm.getEditor(START_TIME_EDITOR_NAME);
    const endDateEditor = this.dxForm.getEditor(END_DATE_EDITOR_NAME);
    const endTimeEditor = this.dxForm.getEditor(END_TIME_EDITOR_NAME);
    startDateEditor === null || startDateEditor === void 0 || startDateEditor.option('value', this.startDate);
    startTimeEditor === null || startTimeEditor === void 0 || startTimeEditor.option('value', this.startDate);
    endDateEditor === null || endDateEditor === void 0 || endDateEditor.option('value', this.endDate);
    endTimeEditor === null || endTimeEditor === void 0 || endTimeEditor.option('value', this.endDate);
  }
  updateRepeatEditorValue() {
    const repeatEditor = this.dxForm.getEditor(REPEAT_EDITOR_NAME);
    if (!repeatEditor) {
      return;
    }
    if (this.recurrenceRuleRaw === null) {
      repeatEditor.option('value', repeatNeverValue);
    } else {
      const recurrenceRule = new _utils.RecurrenceRule(this.recurrenceRuleRaw, this.startDate);
      const {
        frequency
      } = recurrenceRule;
      const value = frequency ?? repeatNeverValue;
      repeatEditor.option('value', value);
    }
  }
  getRepeatEditorButtons() {
    const buttons = [];
    const repeatEditor = this.dxForm.getEditor(REPEAT_EDITOR_NAME);
    const selectedValue = repeatEditor === null || repeatEditor === void 0 ? void 0 : repeatEditor.option('value');
    if (selectedValue && selectedValue !== 'never') {
      buttons.push({
        location: 'after',
        name: 'settings',
        options: {
          disabled: false,
          icon: 'optionsoutline',
          stylingMode: 'text',
          onClick: () => {
            this.showRecurrenceGroup();
          },
          elementAttr: {
            class: `${CLASSES.recurrenceSettingsButton} dx-shape-standard`
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
    const visible = !this.getFormDataField(allDayExpr);
    const dateOptionsGroupPath = `${MAIN_GROUP_NAME}.${DATE_GROUP_NAME}.${DATE_OPTIONS_GROUP_NAME}`;
    const startDateGroupPath = `${dateOptionsGroupPath}.${START_DATE_GROUP_NAME}.${START_DATE_TIME_GROUP_NAME}`;
    const endDateGroupPath = `${dateOptionsGroupPath}.${END_DATE_GROUP_NAME}.${END_DATE_TIME_GROUP_NAME}`;
    const startDateItemName = `${startDateGroupPath}.${START_DATE_EDITOR_NAME}`;
    const startTimeItemName = `${startDateGroupPath}.${START_TIME_EDITOR_NAME}`;
    const endDateItemName = `${endDateGroupPath}.${END_DATE_EDITOR_NAME}`;
    const endTimeItemName = `${endDateGroupPath}.${END_TIME_EDITOR_NAME}`;
    this.dxForm.beginUpdate();
    this.dxForm.itemOption(startDateItemName, 'colSpan', visible ? 1 : 2);
    this.dxForm.itemOption(startTimeItemName, 'visible', visible);
    this.dxForm.itemOption(endDateItemName, 'colSpan', visible ? 1 : 2);
    this.dxForm.itemOption(endTimeItemName, 'visible', visible);
    this.dxForm.endUpdate();
  }
}
exports.AppointmentForm = AppointmentForm;
