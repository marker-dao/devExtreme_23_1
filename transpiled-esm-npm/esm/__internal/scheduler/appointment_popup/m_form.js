import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import { DataSource } from '../../../common/data';
import $ from '../../../core/renderer';
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import { isBoolean } from '../../../core/utils/type';
import dxForm from '../../../ui/form';
import { current, isFluent } from '../../../ui/themes';
import { dateSerialization } from '../../core/utils/m_date_serialization';
import timeZoneUtils from '../m_utils_time_zone';
import { DEFAULT_ICONS_SHOW_MODE } from '../utils/options/constants';
import { getAppointmentGroupIndex, getRawAppointmentGroupValues, getSafeGroupValues } from '../utils/resource_manager/appointment_groups_utils';
import { customizeFormItems } from './m_customize_form_items';
import { RecurrenceForm } from './m_recurrence_form';
import { createFormIconTemplate, getStartDateCommonConfig, RecurrenceRule } from './utils';
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
  text: messageLocalization.format(item.recurrence),
  value: item.value
}));
const repeatNeverValue = repeatSelectBoxItems[0].value;
const createTimeZoneDataSource = () => new DataSource({
  store: timeZoneUtils.getTimeZonesCache(),
  paginate: true,
  pageSize: 10
});
const MAIN_GROUP_NAME = 'mainGroup';
const DATE_GROUP_NAME = 'dateGroup';
const START_DATE_GROUP_NAME = 'startDateGroup';
const END_DATE_GROUP_NAME = 'endDateGroup';
const RESOURCES_GROUP_NAME = 'resourcesGroup';
const SUBJECT_GROUP_NAME = 'subjectGroup';
const REPEAT_GROUP_NAME = 'repeatGroup';
const DESCRIPTION_GROUP_NAME = 'descriptionGroup';
const START_DATE_EDITOR_NAME = 'startDate';
const START_TIME_EDITOR_NAME = 'startTime';
const END_DATE_EDITOR_NAME = 'endDate';
const END_TIME_EDITOR_NAME = 'endTime';
const REPEAT_EDITOR_NAME = 'repeat';
const ALL_DAY_EDITOR_NAME = 'allDay';
const SUBJECT_EDITOR_NAME = 'subject';
const DESCRIPTION_EDITOR_NAME = 'description';
const START_DATE_TIMEZONE_EDITOR_NAME = 'startDateTimeZone';
const END_DATE_TIMEZONE_EDITOR_NAME = 'endDateTimeZone';
const SUBJECT_ICON_NAME = 'subjectIcon';
const DATE_ICON_NAME = 'dateIcon';
const REPEAT_ICON_NAME = 'repeatIcon';
const DESCRIPTION_ICON_NAME = 'descriptionIcon';
export class AppointmentForm {
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
    const value = this.formData[startDateExpr];
    return value ? new Date(dateSerialization.deserializeDate(value)) : null;
  }
  get endDate() {
    const {
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
    const value = this.formData[endDateExpr];
    return value ? new Date(dateSerialization.deserializeDate(value)) : null;
  }
  get recurrenceRuleRaw() {
    const {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    const value = this.formData[recurrenceRuleExpr];
    return value ?? null;
  }
  constructor(scheduler) {
    this.scheduler = scheduler;
    this.resourceManager = scheduler.getResourceManager();
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
    this._recurrenceForm = new RecurrenceForm(this.scheduler);
    const recurrenceGroup = this._recurrenceForm.createRecurrenceFormGroup();
    const items = [mainGroup, recurrenceGroup];
    const iconsShowMode = this.getIconsShowMode();
    const showMainGroupIcons = ['main', 'both'].includes(iconsShowMode);
    const showRecurrenceGroupIcons = ['recurrence', 'both'].includes(iconsShowMode);
    this.setStylingModeToEditors(mainGroup, showMainGroupIcons);
    this.setStylingModeToEditors(recurrenceGroup, showRecurrenceGroupIcons);
    const editingConfig = this.scheduler.getEditingConfig();
    const customizedItems = customizeFormItems(items, editingConfig === null || editingConfig === void 0 || (_editingConfig$form = editingConfig.form) === null || _editingConfig$form === void 0 ? void 0 : _editingConfig$form.items);
    this.createForm(customizedItems);
  }
  getIconsShowMode() {
    var _editingConfig$form2;
    const editingConfig = this.scheduler.getEditingConfig();
    if (isBoolean(editingConfig)) {
      return DEFAULT_ICONS_SHOW_MODE;
    }
    return (editingConfig === null || editingConfig === void 0 || (_editingConfig$form2 = editingConfig.form) === null || _editingConfig$form2 === void 0 ? void 0 : _editingConfig$form2.iconsShowMode) ?? DEFAULT_ICONS_SHOW_MODE;
  }
  createForm(items) {
    const element = $('<div>');
    return this.scheduler.createComponent(element, dxForm, {
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
          recurrenceRuleExpr,
          allDayExpr
        } = this.scheduler.getDataAccessors().expr;
        const {
          dataField
        } = e;
        if (!dataField) {
          return;
        }
        const isAllDayChanged = dataField === allDayExpr;
        const isDateRangeChanged = [startDateExpr, endDateExpr].includes(dataField);
        const isRecurrenceRuleChanged = dataField === recurrenceRuleExpr;
        const isResourceChanged = Object.keys(this.scheduler.getResourceById()).includes(dataField);
        if (isAllDayChanged) {
          this.updateDateTimeEditorsVisibility();
        }
        if (isDateRangeChanged) {
          this.updateDateEditorsValues();
        }
        if (isRecurrenceRuleChanged) {
          this.updateRepeatEditor();
        }
        if (isResourceChanged) {
          this.updateSubjectIconColor();
        }
      },
      onInitialized: e => {
        this._dxForm = e.component;
        this._recurrenceForm.dxForm = this.dxForm;
      },
      onContentReady: e => {
        const $formElement = e.component.$element();
        this._$mainGroup = $formElement.find(`.${CLASSES.mainGroup}`);
        this._$recurrenceGroup = $formElement.find(`.${CLASSES.recurrenceGroup}`);
      }
    });
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
        template: createFormIconTemplate('isnotblank')
      }, {
        name: SUBJECT_EDITOR_NAME,
        colSpan: 1,
        itemType: 'simple',
        cssClass: CLASSES.textEditor,
        dataField: textExpr,
        label: {
          text: messageLocalization.format('dxScheduler-editorLabelTitle')
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
        template: createFormIconTemplate('clock')
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
      name: ALL_DAY_EDITOR_NAME,
      itemType: 'simple',
      dataField: allDayExpr,
      cssClass: CLASSES.allDaySwitch,
      label: {
        text: messageLocalization.format('dxScheduler-allDay'),
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
            const allDayStartDate = dateUtils.trimTime(startDate);
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
      name: START_DATE_GROUP_NAME,
      cssClass: CLASSES.startDateGroup
    }, {
      name: START_DATE_EDITOR_NAME,
      label: {
        text: messageLocalization.format('dxScheduler-editorLabelStartDate')
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
        text: messageLocalization.format('dxScheduler-editorLabelEndDate')
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
        // todo: maybe we should update form data here too?
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
    return _extends({
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [extend(true, getStartDateCommonConfig(this.scheduler.getFirstDayOfWeek()), {
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
      }, dateItemOptions), extend(true, {
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
      }, timeItemOptions), extend(true, {
        itemType: 'simple',
        colSpan: 2,
        editorType: 'dxSelectBox',
        visible: allowTimeZoneEditing,
        editorOptions: {
          displayExpr: 'title',
          valueExpr: 'id',
          placeholder: messageLocalization.format('dxScheduler-noTimezoneTitle'),
          searchEnabled: true,
          dataSource: createTimeZoneDataSource()
        }
      }, timezoneItemOptions)]
    }, groupItemOptions);
  }
  createRepeatGroup() {
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
        template: createFormIconTemplate('repeat')
      }, {
        name: REPEAT_EDITOR_NAME,
        colSpan: 1,
        itemType: 'simple',
        cssClass: CLASSES.repeatEditor,
        label: {
          text: messageLocalization.format('dxScheduler-editorLabelRecurrence')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: repeatSelectBoxItems,
          valueExpr: 'value',
          displayExpr: 'text',
          onContentReady: () => {
            this.updateRepeatEditor();
          },
          onValueChanged: e => {
            if (e.value === repeatNeverValue) {
              const {
                recurrenceRuleExpr
              } = this.scheduler.getDataAccessors().expr;
              this.dxForm.updateData(recurrenceRuleExpr, undefined);
            } else if (e.event) {
              this.showRecurrenceGroup();
            }
          }
        }
      }]
    };
  }
  createDescriptionGroup() {
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
        template: createFormIconTemplate('description')
      }, {
        name: DESCRIPTION_EDITOR_NAME,
        colSpan: 1,
        itemType: 'simple',
        cssClass: CLASSES.descriptionEditor,
        label: {
          text: messageLocalization.format('dxScheduler-editorLabelDescription')
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
          colSpan: 1,
          cssClass: `${CLASSES.formIcon} ${CLASSES.defaultResourceIcon}`,
          template: createFormIconTemplate('addcircleoutline')
        }, {
          itemType: 'group',
          colSpan: 1,
          items: resourcesItems
        }]
      };
    }
    resourcesItems = resourcesItems.map((item, index) => {
      const icon = resourcesLoaders[index].icon ?? '';
      const name = resourcesLoaders[index].resourceName ?? `resource_${index}`;
      return {
        itemType: 'group',
        name: `${name}Group`,
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        cssClass: CLASSES.groupWithIcon,
        items: [{
          colSpan: 1,
          name: `${name}Icon`,
          cssClass: CLASSES.formIcon,
          template: createFormIconTemplate(icon)
        }, _extends({}, item, {
          name
        })]
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
      const stylingMode = isFluent(current()) ? 'filled' : undefined;
      simpleItem.editorOptions = extend(simpleItem.editorOptions, {
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
  showRecurrenceGroup() {
    var _this$_$mainGroup, _this$_$recurrenceGro, _this$dxForm$getEdito;
    const currentHeight = this.dxPopup.option('height');
    if (currentHeight === 'auto' || currentHeight === undefined) {
      const overlayHeight = this.dxPopup.$overlayContent().get(0).clientHeight;
      this.dxPopup.option('height', overlayHeight);
    }
    (_this$_$mainGroup = this._$mainGroup) === null || _this$_$mainGroup === void 0 || _this$_$mainGroup.addClass(CLASSES.mainHidden);
    (_this$_$recurrenceGro = this._$recurrenceGroup) === null || _this$_$recurrenceGro === void 0 || _this$_$recurrenceGro.removeClass(CLASSES.recurrenceHidden);
    const repeatEditorValue = (_this$dxForm$getEdito = this.dxForm.getEditor(REPEAT_EDITOR_NAME)) === null || _this$dxForm$getEdito === void 0 ? void 0 : _this$dxForm$getEdito.option('value');
    this._recurrenceForm.updateRecurrenceFormValues(repeatEditorValue, this.recurrenceRuleRaw, this.startDate);
    this._popup.updateToolbarForRecurrenceGroup();
  }
  showMainGroup() {
    var _editingConfig$popup, _this$_$mainGroup2, _this$_$recurrenceGro2;
    let saveRecurrenceValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const currentHeight = this.dxPopup.option('height');
    const editingConfig = this.scheduler.getEditingConfig();
    const configuredHeight = (editingConfig === null || editingConfig === void 0 || (_editingConfig$popup = editingConfig.popup) === null || _editingConfig$popup === void 0 ? void 0 : _editingConfig$popup.height) ?? 'auto';
    if (typeof currentHeight === 'number') {
      this.dxPopup.option('height', configuredHeight);
    }
    (_this$_$mainGroup2 = this._$mainGroup) === null || _this$_$mainGroup2 === void 0 || _this$_$mainGroup2.removeClass(CLASSES.mainHidden);
    (_this$_$recurrenceGro2 = this._$recurrenceGroup) === null || _this$_$recurrenceGro2 === void 0 || _this$_$recurrenceGro2.addClass(CLASSES.recurrenceHidden);
    this._popup.updateToolbarForMainGroup();
    if (saveRecurrenceValue) {
      var _this$dxForm$getEdito2;
      const {
        recurrenceRule
      } = this._recurrenceForm;
      const {
        recurrenceRuleExpr
      } = this.scheduler.getDataAccessors().expr;
      this.dxForm.updateData(recurrenceRuleExpr, recurrenceRule.toString() ?? undefined);
      (_this$dxForm$getEdito2 = this.dxForm.getEditor(START_DATE_EDITOR_NAME)) === null || _this$dxForm$getEdito2 === void 0 || _this$dxForm$getEdito2.option('value', recurrenceRule.startDate);
    }
  }
  async updateSubjectIconColor() {
    const groupValues = getRawAppointmentGroupValues(this.formData, this.resourceManager.resources);
    const groupIndex = getAppointmentGroupIndex(getSafeGroupValues(groupValues), this.resourceManager.groupsLeafs)[0];
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
  updateRepeatEditor() {
    const repeatEditor = this.dxForm.getEditor(REPEAT_EDITOR_NAME);
    if (!repeatEditor) {
      return;
    }
    if (this.recurrenceRuleRaw === null) {
      repeatEditor.option('value', repeatNeverValue);
    } else {
      const recurrenceRule = new RecurrenceRule(this.recurrenceRuleRaw, this.startDate);
      const {
        frequency
      } = recurrenceRule;
      const value = frequency ?? repeatNeverValue;
      repeatEditor.option('value', value);
    }
    repeatEditor.option('buttons', this.getRepeatEditorButtons());
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
    const startDateItemName = `${MAIN_GROUP_NAME}.${DATE_GROUP_NAME}.${START_DATE_GROUP_NAME}.${START_DATE_EDITOR_NAME}`;
    const startTimeItemName = `${MAIN_GROUP_NAME}.${DATE_GROUP_NAME}.${START_DATE_GROUP_NAME}.${START_TIME_EDITOR_NAME}`;
    const endDateItemName = `${MAIN_GROUP_NAME}.${DATE_GROUP_NAME}.${END_DATE_GROUP_NAME}.${END_DATE_EDITOR_NAME}`;
    const endTimeItemName = `${MAIN_GROUP_NAME}.${DATE_GROUP_NAME}.${END_DATE_GROUP_NAME}.${END_TIME_EDITOR_NAME}`;
    this.dxForm.beginUpdate();
    this.dxForm.itemOption(startDateItemName, 'colSpan', visible ? 1 : 2);
    this.dxForm.itemOption(startTimeItemName, 'visible', visible);
    this.dxForm.itemOption(endDateItemName, 'colSpan', visible ? 1 : 2);
    this.dxForm.itemOption(endTimeItemName, 'visible', visible);
    this.dxForm.endUpdate();
  }
}