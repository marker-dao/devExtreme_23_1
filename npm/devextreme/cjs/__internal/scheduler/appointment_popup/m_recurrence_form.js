/**
* DevExtreme (cjs/__internal/scheduler/appointment_popup/m_recurrence_form.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecurrenceForm = void 0;
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _capitalize = require("../../core/utils/capitalize");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CLASSES = {
  groupWithIcon: 'dx-scheduler-form-group-with-icon',
  formIcon: 'dx-scheduler-form-icon',
  recurrenceGroup: 'dx-scheduler-form-recurrence-group',
  recurrenceHidden: 'dx-scheduler-form-recurrence-group-hidden',
  frequencyEditor: 'dx-scheduler-form-recurrence-frequency-editor',
  byMonthEditor: 'dx-scheduler-form-recurrence-by-month-editor',
  dayOfMonthEditor: 'dx-scheduler-form-day-of-month-editor',
  countEditor: 'dx-scheduler-form-recurrence-count-editor',
  daysOfWeekButtons: 'dx-scheduler-days-of-week-buttons',
  dayOfMonthGroup: 'dx-scheduler-form-day-of-month-group',
  dayOfYearGroup: 'dx-scheduler-form-day-of-year-group',
  recurrenceEndGroup: 'dx-scheduler-form-recurrence-end-group',
  recurrenceEndEditors: 'dx-scheduler-form-recurrence-end-editors',
  recurrenceSettingsGroup: 'dx-scheduler-form-recurrence-settings-group'
};
const frequenciesValues = [{
  recurrence: 'dxScheduler-recurrenceRepeatHourly',
  value: 'hourly'
}, {
  recurrence: 'dxScheduler-recurrenceRepeatDaily',
  value: 'daily'
}, {
  recurrence: 'dxScheduler-recurrenceRepeatWeekly',
  value: 'weekly'
}, {
  recurrence: 'dxScheduler-recurrenceRepeatMonthly',
  value: 'monthly'
}, {
  recurrence: 'dxScheduler-recurrenceRepeatYearly',
  value: 'yearly'
}].map(item => ({
  // todo: check if it works with runtime localization change
  text: (0, _capitalize.capitalize)(_message.default.format(item.recurrence)),
  value: item.value
}));
const monthsValues = _date.default.getMonthNames().map((monthName, index) => ({
  value: index + 1,
  text: monthName
}));
const FREQ = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};
const EDITOR_NAMES = {
  recurrenceStartDate: 'recurrenceStartDateEditor',
  interval: 'intervalEditor',
  frequency: 'frequencyEditor',
  byMonth: 'byMonthEditor',
  repeatEnd: 'repeatEndEditor',
  until: 'untilEditor',
  count: 'countEditor'
};
const GROUP_NAMES = {
  daysOfWeek: 'daysOfWeek',
  dayOfMonth: 'dayOfMonth',
  dayOfYear: 'dayOfYear'
};
const weekDays = _date.default.getDayNames('abbreviated').map(dayName => dayName.slice(0, 2).toUpperCase());
const RECURRENCE_GROUP_NAME = 'recurrenceGroup';
class RecurrenceForm {
  constructor(scheduler) {
    this._recurrenceRule = new _utils.RecurrenceRule('', new Date());
    this.weekDayItems = [];
    this._weekDayButtons = {};
    this.scheduler = scheduler;
    this.weekDayItems = this.createWeekDayItems();
  }
  createWeekDayItems() {
    const weekDayItems = weekDays.map(day => ({
      text: day[0],
      key: day
    }));
    const firstDayOfWeek = this.scheduler.getFirstDayOfWeek() ?? _date.default.firstDayOfWeekIndex();
    const arrangeWeekDayItems = weekDayItems.slice(firstDayOfWeek).concat(weekDayItems.slice(0, firstDayOfWeek));
    return arrangeWeekDayItems;
  }
  createByMonthDayNumberBoxItem(name, labelVisible) {
    return {
      itemType: 'simple',
      name,
      colSpan: 1,
      editorType: 'dxNumberBox',
      cssClass: CLASSES.dayOfMonthEditor,
      label: labelVisible ? {
        text: _message.default.format('dxScheduler-recurrenceRepeatOn')
      } : {
        visible: false
      },
      editorOptions: {
        min: 1,
        max: 31,
        format: '#',
        showSpinButtons: true,
        useLargeSpinButtons: false,
        onContentReady: e => {
          e.component.option('value', this.recurrenceRule.byMonthDay ?? undefined);
        },
        onValueChanged: e => {
          this.recurrenceRule.byMonthDay = e.value;
        }
      }
    };
  }
  get dxForm() {
    return this._dxForm;
  }
  set dxForm(value) {
    this._dxForm = value;
  }
  setReadOnly(value) {
    Object.values(this._weekDayButtons).forEach(button => {
      button === null || button === void 0 || button.option('disabled', value);
    });
  }
  get recurrenceRule() {
    return this._recurrenceRule;
  }
  set recurrenceRule(value) {
    this._recurrenceRule = value;
  }
  createRecurrenceFormGroup() {
    return {
      name: RECURRENCE_GROUP_NAME,
      itemType: 'group',
      cssClass: `${CLASSES.recurrenceGroup} ${CLASSES.recurrenceHidden}`,
      colSpan: 1,
      items: [this.createRecurrenceStartDateGroup(), this.createRecurrenceSettingsGroup(), this.createRecurrenceEndGroup()]
    };
  }
  createRecurrenceStartDateGroup() {
    return {
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      cssClass: CLASSES.groupWithIcon,
      items: [{
        colSpan: 1,
        cssClass: CLASSES.formIcon,
        template: (0, _utils.createFormIconTemplate)('clock')
      }, (0, _extend.extend)(true, (0, _utils.getStartDateCommonConfig)(this.scheduler.getFirstDayOfWeek()), {
        name: EDITOR_NAMES.recurrenceStartDate,
        label: {
          text: _message.default.format('dxScheduler-editorLabelStartDate')
        },
        editorOptions: {
          onContentReady: e => {
            e.component.option('value', this.recurrenceRule.startDate);
          },
          onValueChanged: e => {
            this.recurrenceRule.startDate = e.value;
          }
        }
      })]
    };
  }
  createRecurrenceSettingsGroup() {
    return {
      itemType: 'group',
      cssClass: `${CLASSES.recurrenceSettingsGroup} ${CLASSES.groupWithIcon}`,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        colSpan: 1,
        cssClass: CLASSES.formIcon,
        template: (0, _utils.createFormIconTemplate)('repeat')
      }, {
        itemType: 'group',
        colSpan: 1,
        colCount: 1,
        colCountByScreen: {
          xs: 1
        },
        items: [this.createRecurrenceRuleGroup(), this.createDaysOfWeekGroup(), this.createDayOfMonthGroup(), this.createDayOfYearGroup()]
      }]
    };
  }
  createRecurrenceRuleGroup() {
    return {
      itemType: 'group',
      colSpan: 1,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        itemType: 'simple',
        name: EDITOR_NAMES.interval,
        colSpan: 1,
        editorType: 'dxNumberBox',
        label: {
          text: _message.default.format('dxScheduler-recurrenceRepeatEvery')
        },
        editorOptions: {
          format: '#',
          min: 1,
          showSpinButtons: true,
          useLargeSpinButtons: false,
          onContentReady: e => {
            e.component.option('value', this.recurrenceRule.interval);
          },
          onValueChanged: e => {
            this.recurrenceRule.interval = e.value;
          }
        }
      }, {
        itemType: 'simple',
        name: EDITOR_NAMES.frequency,
        cssClass: CLASSES.frequencyEditor,
        colSpan: 1,
        editorType: 'dxSelectBox',
        label: {
          visible: false
        },
        editorOptions: {
          items: frequenciesValues,
          valueExpr: 'value',
          displayExpr: 'text',
          onContentReady: e => {
            e.component.option('value', this.recurrenceRule.frequency);
          },
          onValueChanged: e => {
            const previousValue = this.recurrenceRule.frequency;
            if (previousValue === e.value) {
              return;
            }
            this.recurrenceRule.frequency = e.value;
            this.updateDayEditorsVisibility();
          }
        }
      }]
    };
  }
  createDaysOfWeekGroup() {
    return {
      name: GROUP_NAMES.daysOfWeek,
      colSpan: 1,
      label: {
        visible: false
      },
      template: () => {
        const $container = (0, _renderer.default)('<div>').addClass(CLASSES.daysOfWeekButtons);
        this.weekDayItems.forEach(item => {
          const buttonContainer = (0, _renderer.default)('<div>').appendTo($container);
          this._weekDayButtons[item.key] = this.scheduler.createComponent(buttonContainer, _button.default, {
            text: item.text,
            onClick: () => {
              const isSelected = this.recurrenceRule.byDay.includes(item.key);
              if (isSelected) {
                const index = this.recurrenceRule.byDay.indexOf(item.key);
                this.recurrenceRule.byDay.splice(index, 1);
              } else {
                this.recurrenceRule.byDay.push(item.key);
              }
              this.updateWeekDaysButtons();
            }
          });
        });
        return $container;
      }
    };
  }
  createDayOfMonthGroup() {
    return {
      itemType: 'group',
      name: GROUP_NAMES.dayOfMonth,
      cssClass: CLASSES.dayOfMonthGroup,
      colCount: 1,
      colSpan: 1,
      items: [this.createByMonthDayNumberBoxItem('bymonthday', true)]
    };
  }
  createDayOfYearGroup() {
    return {
      itemType: 'group',
      name: GROUP_NAMES.dayOfYear,
      cssClass: CLASSES.dayOfYearGroup,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        itemType: 'simple',
        name: EDITOR_NAMES.byMonth,
        colSpan: 1,
        cssClass: CLASSES.byMonthEditor,
        editorType: 'dxSelectBox',
        label: {
          text: _message.default.format('dxScheduler-recurrenceRepeatEvery')
        },
        editorOptions: {
          items: monthsValues,
          displayExpr: 'text',
          valueExpr: 'value',
          onContentReady: e => {
            e.component.option('value', this.recurrenceRule.byMonth);
          },
          onValueChanged: e => {
            this.recurrenceRule.byMonth = e.value;
          }
        }
      }, this.createByMonthDayNumberBoxItem('bymonthdayYearly', false)]
    };
  }
  createRecurrenceEndGroup() {
    return {
      itemType: 'group',
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      cssClass: `${CLASSES.groupWithIcon} ${CLASSES.recurrenceEndGroup}`,
      items: [{
        colSpan: 1,
        cssClass: CLASSES.formIcon,
        template: (0, _utils.createFormIconTemplate)('description')
      }, {
        itemType: 'group',
        colSpan: 1,
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        label: {
          text: _message.default.format('dxScheduler-recurrenceEnd')
        },
        items: [this.createRecurrenceEndRadioGroup(), this.createRecurrenceEndEditors()]
      }]
    };
  }
  createRecurrenceEndRadioGroup() {
    return {
      itemType: 'simple',
      name: EDITOR_NAMES.repeatEnd,
      colSpan: 1,
      editorType: 'dxRadioGroup',
      cssClass: CLASSES.recurrenceEndEditors,
      label: {
        visible: false
      },
      editorOptions: {
        valueExpr: 'type',
        items: [{
          text: _message.default.format('dxScheduler-recurrenceNever'),
          type: 'never'
        }, {
          text: _message.default.format('dxScheduler-recurrenceOn'),
          type: 'until'
        }, {
          text: _message.default.format('dxScheduler-recurrenceAfter'),
          type: 'count'
        }],
        layout: 'vertical',
        onContentReady: e => {
          e.component.option('value', this.recurrenceRule.repeatEnd);
        },
        onValueChanged: e => {
          this.recurrenceRule.repeatEnd = e.value;
          this.updateRepeatEndEditors();
        }
      }
    };
  }
  createRecurrenceEndEditors() {
    return {
      itemType: 'group',
      cssClass: CLASSES.recurrenceEndEditors,
      colSpan: 1,
      items: [{
        itemType: 'empty'
      }, {
        itemType: 'simple',
        name: EDITOR_NAMES.until,
        label: {
          visible: false
        },
        editorType: 'dxDateBox',
        editorOptions: {
          type: 'date',
          useMaskBehavior: true,
          calendarOptions: {
            firstDayOfWeek: this.scheduler.getFirstDayOfWeek()
          },
          onContentReady: e => {
            e.component.option('value', this.recurrenceRule.until);
          },
          onValueChanged: e => {
            this.recurrenceRule.until = e.value;
          }
        }
      }, {
        itemType: 'simple',
        name: EDITOR_NAMES.count,
        cssClass: CLASSES.countEditor,
        label: {
          visible: false
        },
        editorType: 'dxNumberBox',
        editorOptions: {
          format: `# ${_message.default.format('dxScheduler-recurrenceRepeatCount')}`,
          min: 1,
          showSpinButtons: true,
          useLargeSpinButtons: false,
          onContentReady: e => {
            e.component.option('value', this.recurrenceRule.count ?? undefined);
          },
          onValueChanged: e => {
            this.recurrenceRule.count = e.value;
          }
        }
      }]
    };
  }
  updateRecurrenceFormValues(repeatEditorValue, recurrenceRuleRaw, startDate) {
    var _this$dxForm$getEdito, _this$dxForm$getEdito2, _this$dxForm$getEdito3, _this$dxForm$getEdito4, _this$dxForm$getEdito5, _this$dxForm$getEdito6;
    this.recurrenceRule = this.createRecurrenceRule(repeatEditorValue, recurrenceRuleRaw, startDate);
    (_this$dxForm$getEdito = this.dxForm.getEditor(EDITOR_NAMES.recurrenceStartDate)) === null || _this$dxForm$getEdito === void 0 || _this$dxForm$getEdito.option('value', this.recurrenceRule.startDate);
    (_this$dxForm$getEdito2 = this.dxForm.getEditor(EDITOR_NAMES.frequency)) === null || _this$dxForm$getEdito2 === void 0 || _this$dxForm$getEdito2.option('value', repeatEditorValue);
    (_this$dxForm$getEdito3 = this.dxForm.getEditor(EDITOR_NAMES.interval)) === null || _this$dxForm$getEdito3 === void 0 || _this$dxForm$getEdito3.option('value', this.recurrenceRule.interval);
    (_this$dxForm$getEdito4 = this.dxForm.getEditor(EDITOR_NAMES.repeatEnd)) === null || _this$dxForm$getEdito4 === void 0 || _this$dxForm$getEdito4.option('value', this.recurrenceRule.repeatEnd);
    (_this$dxForm$getEdito5 = this.dxForm.getEditor(EDITOR_NAMES.until)) === null || _this$dxForm$getEdito5 === void 0 || _this$dxForm$getEdito5.option('value', this.recurrenceRule.until);
    (_this$dxForm$getEdito6 = this.dxForm.getEditor(EDITOR_NAMES.count)) === null || _this$dxForm$getEdito6 === void 0 || _this$dxForm$getEdito6.option('value', this.recurrenceRule.count);
    this.updateRepeatEndEditors();
    this.updateDayEditorsVisibility();
  }
  createRecurrenceRule(repeatEditorValue, recurrenceRuleRaw, startDate) {
    const recurrenceRule = new _utils.RecurrenceRule(recurrenceRuleRaw ?? '', startDate);
    const {
      frequency
    } = recurrenceRule;
    if (frequency !== repeatEditorValue) {
      const newRecurrenceRule = new _utils.RecurrenceRule(`freq=${repeatEditorValue};`, startDate);
      const defaultByDay = [weekDays[(startDate === null || startDate === void 0 ? void 0 : startDate.getDay()) ?? this.scheduler.getFirstDayOfWeek()]];
      newRecurrenceRule.byDay = defaultByDay;
      return newRecurrenceRule;
    }
    return recurrenceRule;
  }
  updateRepeatEndEditors() {
    const repeatEndValue = this.recurrenceRule.repeatEnd;
    const untilEditor = this.dxForm.getEditor(EDITOR_NAMES.until);
    const countEditor = this.dxForm.getEditor(EDITOR_NAMES.count);
    untilEditor === null || untilEditor === void 0 || untilEditor.option('disabled', repeatEndValue !== 'until');
    countEditor === null || countEditor === void 0 || countEditor.option('disabled', repeatEndValue !== 'count');
  }
  updateDayEditorsVisibility() {
    this.dxForm.beginUpdate();
    const daysOfWeekGroup = `${RECURRENCE_GROUP_NAME}.${GROUP_NAMES.daysOfWeek}`;
    const dayOfMonthGroup = `${RECURRENCE_GROUP_NAME}.${GROUP_NAMES.dayOfMonth}`;
    const dayOfYearGroup = `${RECURRENCE_GROUP_NAME}.${GROUP_NAMES.dayOfYear}`;
    this.dxForm.itemOption(daysOfWeekGroup, 'visible', false);
    this.dxForm.itemOption(dayOfMonthGroup, 'visible', false);
    this.dxForm.itemOption(dayOfYearGroup, 'visible', false);
    switch (this.recurrenceRule.frequency) {
      case FREQ.WEEKLY:
        this.dxForm.itemOption(daysOfWeekGroup, 'visible', true);
        break;
      case FREQ.MONTHLY:
        this.dxForm.itemOption(dayOfMonthGroup, 'visible', true);
        break;
      case FREQ.YEARLY:
        this.dxForm.itemOption(dayOfYearGroup, 'visible', true);
        break;
      default:
        break;
    }
    this.dxForm.endUpdate();
    this.updateWeekDaysButtons();
  }
  updateWeekDaysButtons() {
    Object.entries(this._weekDayButtons).forEach(_ref => {
      let [dayKey, button] = _ref;
      const isSelected = this.recurrenceRule.byDay.includes(dayKey);
      button.option('stylingMode', isSelected ? 'contained' : 'outlined');
      button.option('type', isSelected ? 'default' : 'normal');
    });
  }
}
exports.RecurrenceForm = RecurrenceForm;
