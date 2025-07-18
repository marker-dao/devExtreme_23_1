"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../ui/radio_group");
var _date = _interopRequireDefault(require("../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _date2 = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _button_group = _interopRequireDefault(require("../../ui/button_group"));
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _form = _interopRequireDefault(require("../../ui/form"));
var _themes = require("../../ui/themes");
var _m_recurrence = require("./m_recurrence");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file, spellcheck/spell-checker */

const RECURRENCE_EDITOR = 'dx-recurrence-editor';
const LABEL_POSTFIX = '-label';
const WRAPPER_POSTFIX = '-wrapper';
const RECURRENCE_EDITOR_CONTAINER = 'dx-recurrence-editor-container';
const REPEAT_END_TYPE_EDITOR = 'dx-recurrence-radiogroup-repeat-type';
const REPEAT_COUNT_EDITOR = 'dx-recurrence-numberbox-repeat-count';
const REPEAT_UNTIL_DATE_EDITOR = 'dx-recurrence-datebox-until-date';
const RECURRENCE_BUTTON_GROUP = 'dx-recurrence-button-group';
const FREQUENCY_EDITOR = 'dx-recurrence-selectbox-freq';
const INTERVAL_EDITOR = 'dx-recurrence-numberbox-interval';
const REPEAT_ON_EDITOR = 'dx-recurrence-repeat-on';
const DAY_OF_MONTH = 'dx-recurrence-numberbox-day-of-month';
const MONTH_OF_YEAR = 'dx-recurrence-selectbox-month-of-year';
const recurrentEditorNumberBoxWidth = 90;
const repeatInputWidth = '100%';
const recurrentEditorSelectBoxWidth = 120;
const defaultRecurrenceTypeIndex = 1; // default daily recurrence
const frequenciesMessages = [
/* {
      // functionality is not removed, but hide the ability to set minute recurrence in the editor.
      // in the future, if we publish the dxRecurrenceEditor, then we publish the minute recurrence
      recurrence: 'dxScheduler-recurrenceMinutely',
      value: 'minutely'
  } */
{
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
}];
const frequencies = frequenciesMessages.map(item => ({
  text() {
    return _message.default.format(item.recurrence);
  },
  value: item.value
}));
const repeatEndTypes = [{
  type: 'never'
}, {
  type: 'until'
}, {
  type: 'count'
}];
const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
const getStylingModeFunc = () => (0, _themes.isFluent)((0, _themes.current)()) ? 'filled' : undefined;
class RecurrenceRule {
  constructor(rule) {
    this._recurrenceProcessor = (0, _m_recurrence.getRecurrenceProcessor)();
    this._recurrenceProcessor = (0, _m_recurrence.getRecurrenceProcessor)();
    this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(rule).rule;
  }
  makeRules(string) {
    this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(string).rule;
  }
  makeRule(field, value) {
    if (!value || Array.isArray(value) && !value.length) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._recurrenceRule[field];
      return;
    }
    if ((0, _type.isDefined)(field)) {
      if (field === 'until') {
        delete this._recurrenceRule.count;
      }
      if (field === 'count') {
        delete this._recurrenceRule.until;
      }
      this._recurrenceRule[field] = value;
    }
  }
  getRepeatEndRule() {
    const rules = this._recurrenceRule;
    if ('count' in rules) {
      return 'count';
    }
    if ('until' in rules) {
      return 'until';
    }
    return 'never';
  }
  getRecurrenceString() {
    return this._recurrenceProcessor.getRecurrenceString(this._recurrenceRule);
  }
  getRules() {
    return this._recurrenceRule;
  }
  getDaysFromByDayRule() {
    return this._recurrenceProcessor.daysFromByDayRule(this._recurrenceRule);
  }
}
class RecurrenceEditor extends _editor.default {
  _getDefaultOptions() {
    // @ts-expect-error
    const defaultOptions = super._getDefaultOptions();
    return (0, _extend.extend)(defaultOptions, {
      value: null,
      startDate: new Date(),
      firstDayOfWeek: undefined
    });
  }
  _getFirstDayOfWeek() {
    const firstDayOfWeek = this.option('firstDayOfWeek');
    return (0, _type.isDefined)(firstDayOfWeek) ? firstDayOfWeek : _date.default.firstDayOfWeekIndex();
  }
  _createComponent(element, name) {
    let config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // @ts-expect-error
    this._extendConfig(config, {
      readOnly: this.option('readOnly')
    });
    // @ts-expect-error
    return super._createComponent(element, name, config);
  }
  _init() {
    // @ts-expect-error
    super._init();
    this._recurrenceRule = new RecurrenceRule(this.option('value'));
  }
  _render() {
    // @ts-expect-error
    super._render();
    this.$element().addClass(RECURRENCE_EDITOR);
    this._$container = (0, _renderer.default)('<div>').addClass(RECURRENCE_EDITOR_CONTAINER).appendTo(this.$element());
    this._prepareEditors();
    this._renderEditors(this._$container);
    this._updateRepeatInputAriaLabel();
  }
  getEditorByField(fieldName) {
    let editor = this.getRecurrenceForm().getEditor(fieldName);
    if (!(0, _type.isDefined)(editor)) {
      switch (fieldName) {
        case 'byday':
          editor = this._weekEditor;
          break;
        default:
          break;
      }
    }
    return editor;
  }
  _prepareEditors() {
    const freq = (this._recurrenceRule.getRules().freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase();
    this._editors = [this._createFreqEditor(freq), this._createIntervalEditor(freq), this._createRepeatOnLabel(freq), {
      itemType: 'group',
      cssClass: REPEAT_ON_EDITOR,
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: this._createRepeatOnEditor(freq)
    }, {
      itemType: 'group',
      colCount: 2,
      items: this._createRepeatEndEditor()
    }];
    return this._editors;
  }
  _createFreqEditor(freq) {
    return {
      dataField: 'freq',
      name: 'FREQ',
      editorType: 'dxSelectBox',
      cssClass: FREQUENCY_EDITOR,
      editorOptions: {
        stylingMode: getStylingModeFunc(),
        items: frequencies,
        value: freq,
        field: 'freq',
        valueExpr: 'value',
        displayExpr: 'text',
        layout: 'horizontal',
        elementAttr: {
          class: FREQUENCY_EDITOR
        },
        onValueChanged: args => this._valueChangedHandler(args)
      },
      label: {
        text: _message.default.format('dxScheduler-editorLabelRecurrence')
      }
    };
  }
  _createIntervalEditor(freq) {
    const interval = this._recurrenceRule.getRules().interval || 1;
    return {
      itemType: 'group',
      colCount: 2,
      cssClass: `${INTERVAL_EDITOR}${WRAPPER_POSTFIX}`,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        dataField: 'interval',
        editorType: 'dxNumberBox',
        editorOptions: {
          stylingMode: getStylingModeFunc(),
          format: '#',
          width: recurrentEditorNumberBoxWidth,
          min: 1,
          field: 'interval',
          value: interval,
          showSpinButtons: true,
          useLargeSpinButtons: false,
          elementAttr: {
            class: INTERVAL_EDITOR
          },
          onValueChanged: args => this._valueChangedHandler(args)
        },
        label: {
          text: _message.default.format('dxScheduler-recurrenceRepeatEvery')
        }
      }, {
        name: 'intervalLabel',
        cssClass: `${INTERVAL_EDITOR}${LABEL_POSTFIX}`,
        template: () => _message.default.format(`dxScheduler-recurrenceRepeat${freq.charAt(0).toUpperCase()}${freq.substr(1).toLowerCase()}`)
      }]
    };
  }
  _createRepeatOnLabel(freq) {
    return {
      itemType: 'group',
      cssClass: `${REPEAT_ON_EDITOR}${LABEL_POSTFIX}`,
      items: [{
        name: 'repeatOnLabel',
        colSpan: 2,
        template: () => _message.default.format('dxScheduler-recurrenceRepeatOn'),
        visible: freq && freq !== 'daily' && freq !== 'hourly'
      }]
    };
  }
  _createRepeatOnEditor(freq) {
    return [this._createByDayEditor(freq), this._createByMonthEditor(freq), this._createByMonthDayEditor(freq)];
  }
  _createByDayEditor(freq) {
    return {
      dataField: 'byday',
      colSpan: 2,
      template: (_, itemElement) => {
        const firstDayOfWeek = this._getFirstDayOfWeek();
        const byDay = this._daysOfWeekByRules();
        const localDaysNames = _date.default.getDayNames('abbreviated');
        const dayNames = days.slice(firstDayOfWeek).concat(days.slice(0, firstDayOfWeek));
        const itemsButtonGroup = localDaysNames.slice(firstDayOfWeek).concat(localDaysNames.slice(0, firstDayOfWeek)).map((item, index) => ({
          text: item,
          key: dayNames[index]
        }));
        this._$repeatOnWeek = (0, _renderer.default)('<div>').addClass(RECURRENCE_BUTTON_GROUP).appendTo(itemElement);
        this._weekEditor = this._createComponent(this._$repeatOnWeek, _button_group.default, {
          items: itemsButtonGroup,
          field: 'byday',
          selectionMode: 'multiple',
          selectedItemKeys: byDay,
          keyExpr: 'key',
          onSelectionChanged: e => {
            const selectedItemKeys = e.component.option('selectedItemKeys');
            const selectedKeys = selectedItemKeys !== null && selectedItemKeys !== void 0 && selectedItemKeys.length ? selectedItemKeys : this._getDefaultByDayValue();
            this._recurrenceRule.makeRule('byday', selectedKeys);
            this._changeEditorValue();
          }
        });
      },
      visible: freq === 'weekly',
      label: {
        visible: false
      }
    };
  }
  _createByMonthEditor(freq) {
    const monthsName = _date.default.getMonthNames('wide');
    const months = [...Array(12)].map((_, i) => ({
      value: `${i + 1}`,
      text: monthsName[i]
    }));
    return {
      dataField: 'bymonth',
      editorType: 'dxSelectBox',
      editorOptions: {
        stylingMode: getStylingModeFunc(),
        field: 'bymonth',
        items: months,
        value: this._monthOfYearByRules(),
        width: recurrentEditorSelectBoxWidth,
        displayExpr: 'text',
        valueExpr: 'value',
        elementAttr: {
          class: MONTH_OF_YEAR
        },
        onValueChanged: args => this._valueChangedHandler(args)
      },
      visible: freq === 'yearly',
      label: {
        visible: false
      }
    };
  }
  _createByMonthDayEditor(freq) {
    return {
      dataField: 'bymonthday',
      editorType: 'dxNumberBox',
      editorOptions: {
        stylingMode: getStylingModeFunc(),
        min: 1,
        max: 31,
        format: '#',
        width: recurrentEditorNumberBoxWidth,
        field: 'bymonthday',
        showSpinButtons: true,
        useLargeSpinButtons: false,
        value: this._dayOfMonthByRules(),
        elementAttr: {
          class: DAY_OF_MONTH
        },
        onValueChanged: args => this._valueChangedHandler(args)
      },
      visible: freq === 'monthly' || freq === 'yearly',
      label: {
        visible: false
      }
    };
  }
  _createRepeatEndEditor() {
    const repeatType = this._recurrenceRule.getRepeatEndRule();
    return [{
      colSpan: 2,
      template: _message.default.format('dxScheduler-recurrenceEnd')
    }, {
      colSpan: 1,
      label: {
        visible: false
      },
      dataField: 'repeatEnd',
      editorType: 'dxRadioGroup',
      editorOptions: {
        items: repeatEndTypes,
        value: repeatType,
        valueExpr: 'type',
        field: 'repeatEnd',
        itemTemplate: itemData => {
          if (itemData.type === 'count') {
            return _message.default.format('dxScheduler-recurrenceAfter');
          }
          if (itemData.type === 'until') {
            return _message.default.format('dxScheduler-recurrenceOn');
          }
          return _message.default.format('dxScheduler-recurrenceNever');
        },
        layout: 'vertical',
        elementAttr: {
          class: REPEAT_END_TYPE_EDITOR
        },
        onValueChanged: args => this._repeatEndValueChangedHandler(args)
      }
    }, {
      colSpan: 1,
      itemType: 'group',
      items: [this._getRepeatUntilEditorOptions(), this._getRepeatCountEditorOptions()]
    }];
  }
  _renderEditors($container) {
    this._recurrenceForm = this._createComponent($container, _form.default, {
      items: this._editors,
      showValidationSummary: false,
      scrollingEnabled: true,
      showColonAfterLabel: false,
      labelLocation: 'top'
    });
    this._changeRepeatEndInputsVisibility();
  }
  getRecurrenceForm() {
    return this._recurrenceForm;
  }
  changeValueByVisibility(value) {
    if (value) {
      if (!this.option('value')) {
        this._handleDefaults();
      }
    } else {
      this._recurrenceRule.makeRules('');
      this.option('value', '');
    }
  }
  _handleDefaults() {
    this._recurrenceRule.makeRule('freq', frequenciesMessages[defaultRecurrenceTypeIndex].value);
    this._changeEditorValue();
  }
  _changeEditorValue() {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.option('value', this._recurrenceRule.getRecurrenceString() || '');
  }
  _daysOfWeekByRules() {
    let daysByRule = this._recurrenceRule.getDaysFromByDayRule();
    if (!daysByRule.length) {
      daysByRule = this._getDefaultByDayValue();
    }
    return daysByRule;
  }
  _getDefaultByDayValue() {
    const startDate = this.option('startDate');
    const startDay = startDate.getDay();
    return [days[startDay]];
  }
  _dayOfMonthByRules() {
    let dayByRule = this._recurrenceRule.getRules().bymonthday;
    if (!dayByRule) {
      dayByRule = this.option('startDate').getDate();
    }
    return dayByRule;
  }
  _monthOfYearByRules() {
    let monthByRule = this._recurrenceRule.getRules().bymonth;
    if (!monthByRule) {
      monthByRule = this.option('startDate').getMonth() + 1;
    }
    return String(monthByRule);
  }
  _repeatEndValueChangedHandler(args) {
    const {
      value
    } = args;
    this._changeRepeatEndInputsVisibility(value);
    if (value === 'until') {
      this._recurrenceRule.makeRule(value, this._getUntilValue());
    }
    if (value === 'count') {
      this._recurrenceRule.makeRule(value, this._recurrenceForm.option('formData.count'));
    }
    if (value === 'never') {
      this._recurrenceRule.makeRule('count', '');
      this._recurrenceRule.makeRule('until', '');
    }
    this._changeEditorValue();
    this._updateRepeatInputAriaLabel();
  }
  _changeRepeatEndInputsVisibility() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._recurrenceRule.getRepeatEndRule();
    if (value === 'until') {
      this._recurrenceForm.itemOption('until', 'visible', true);
      this._recurrenceForm.itemOption('count', 'visible', false);
    }
    if (value === 'count') {
      this._recurrenceForm.itemOption('until', 'visible', false);
      this._recurrenceForm.itemOption('count', 'visible', true);
    }
    if (value === 'never') {
      this._recurrenceForm.itemOption('until', 'visible', false);
      this._recurrenceForm.itemOption('count', 'visible', false);
    }
  }
  _getRepeatCountEditorOptions() {
    const count = this._recurrenceRule.getRules().count || 1;
    return {
      dataField: 'count',
      cssClass: REPEAT_COUNT_EDITOR,
      label: {
        visible: false
      },
      editorType: 'dxNumberBox',
      editorOptions: {
        stylingMode: getStylingModeFunc(),
        field: 'count',
        format: `# ${_message.default.format('dxScheduler-recurrenceRepeatCount')}`,
        width: repeatInputWidth,
        min: 1,
        showSpinButtons: true,
        useLargeSpinButtons: false,
        value: count,
        onValueChanged: this._repeatCountValueChangeHandler.bind(this),
        inputAttr: {
          'aria-label': _message.default.format('dxScheduler-recurrenceOccurrenceLabel')
        }
      }
    };
  }
  _updateRepeatInputAriaLabel() {
    const radioButtons = this.getEditorByField('repeatEnd').itemElements();
    const untilLabel = _message.default.format('dxScheduler-recurrenceOn');
    const untilValue = this._recurrenceForm.getEditor('until').option('value');
    const untilValueFormat = `${_date.default.format(untilValue, 'd')} ${_date.default.format(untilValue, 'monthAndYear')}`;
    const isUntilVisible = this._recurrenceForm.itemOption('until').visible;
    const countLabel = _message.default.format('dxScheduler-recurrenceAfter');
    const countPostfix = _message.default.format('dxScheduler-recurrenceRepeatCount');
    const countValue = this._recurrenceForm.getEditor('count').option('value');
    const isCountVisible = this._recurrenceForm.itemOption('count').visible;
    radioButtons[1].setAttribute('aria-label', isUntilVisible ? `${untilLabel} ${untilValueFormat}` : untilLabel);
    radioButtons[2].setAttribute('aria-label', isCountVisible ? `${countLabel} ${countValue} ${countPostfix}` : countLabel);
  }
  _repeatCountValueChangeHandler(args) {
    if (this._recurrenceRule.getRepeatEndRule() === 'count') {
      const {
        value
      } = args;
      this._recurrenceRule.makeRule('count', value);
      this._changeEditorValue();
      this._updateRepeatInputAriaLabel();
    }
  }
  _getRepeatUntilEditorOptions() {
    const until = this._getUntilValue();
    return {
      dataField: 'until',
      label: {
        visible: false
      },
      cssClass: REPEAT_UNTIL_DATE_EDITOR,
      editorType: 'dxDateBox',
      editorOptions: {
        stylingMode: getStylingModeFunc(),
        field: 'until',
        value: until,
        type: 'date',
        width: repeatInputWidth,
        onValueChanged: this._repeatUntilValueChangeHandler.bind(this),
        calendarOptions: {
          firstDayOfWeek: this._getFirstDayOfWeek()
        },
        useMaskBehavior: true,
        inputAttr: {
          'aria-label': _message.default.format('dxScheduler-recurrenceUntilDateLabel')
        }
      }
    };
  }
  _formatUntilDate(date) {
    const untilDate = this._recurrenceRule.getRules().until;
    const isSameDate = _date2.default.sameDate(untilDate, date);
    return untilDate && isSameDate ? date : _date2.default.setToDayEnd(date);
  }
  _repeatUntilValueChangeHandler(args) {
    if (this._recurrenceRule.getRepeatEndRule() === 'until') {
      const dateInTimeZone = this._formatUntilDate(new Date(args.value));
      const getStartDateTimeZone = this.option('getStartDateTimeZone');
      const appointmentTimeZone = getStartDateTimeZone();
      const path = appointmentTimeZone ? 'fromAppointment' : 'fromGrid';
      const dateInLocaleTimeZone = this.option('timeZoneCalculator').createDate(dateInTimeZone, path, appointmentTimeZone);
      this._recurrenceRule.makeRule('until', dateInLocaleTimeZone);
      this._changeEditorValue();
      this._updateRepeatInputAriaLabel();
    }
  }
  _valueChangedHandler(args) {
    const {
      value,
      previousValue
    } = args;
    const field = args.component.option('field');
    if (!this.option('visible')) {
      this.option('value', '');
    } else {
      this._recurrenceRule.makeRule(field, value);
      if (field === 'freq') {
        this._makeRepeatOnRule(value);
        this._changeRepeatOnVisibility(value, previousValue);
      }
      this._changeEditorValue();
    }
  }
  _makeRepeatOnRule(value) {
    if (value === 'daily' || value === 'hourly') {
      this._recurrenceRule.makeRule('byday', '');
      this._recurrenceRule.makeRule('bymonth', '');
      this._recurrenceRule.makeRule('bymonthday', '');
    }
    if (value === 'weekly') {
      this._recurrenceRule.makeRule('byday', this._daysOfWeekByRules());
      this._recurrenceRule.makeRule('bymonth', '');
      this._recurrenceRule.makeRule('bymonthday', '');
    }
    if (value === 'monthly') {
      this._recurrenceRule.makeRule('bymonthday', this._dayOfMonthByRules());
      this._recurrenceRule.makeRule('bymonth', '');
      this._recurrenceRule.makeRule('byday', '');
    }
    if (value === 'yearly') {
      this._recurrenceRule.makeRule('bymonthday', this._dayOfMonthByRules());
      this._recurrenceRule.makeRule('bymonth', this._monthOfYearByRules());
      this._recurrenceRule.makeRule('byday', '');
    }
  }
  _optionChanged(args) {
    var _this$_recurrenceForm, _this$_weekEditor;
    switch (args.name) {
      case 'readOnly':
        (_this$_recurrenceForm = this._recurrenceForm) === null || _this$_recurrenceForm === void 0 || _this$_recurrenceForm.option('readOnly', args.value);
        (_this$_weekEditor = this._weekEditor) === null || _this$_weekEditor === void 0 || _this$_weekEditor.option('readOnly', args.value);
        // @ts-expect-error
        super._optionChanged(args);
        break;
      case 'value':
        this._recurrenceRule.makeRules(args.value);
        this._changeRepeatIntervalLabel();
        this._changeRepeatEndInputsVisibility();
        this._changeEditorsValue(this._recurrenceRule.getRules());
        // @ts-expect-error
        super._optionChanged(args);
        break;
      case 'startDate':
        this._makeRepeatOnRule(this._recurrenceRule.getRules().freq);
        if ((0, _type.isDefined)(this._recurrenceRule.getRecurrenceString())) {
          this._changeEditorValue();
        }
        break;
      case 'firstDayOfWeek':
        if (this._weekEditor) {
          const localDaysNames = _date.default.getDayNames('abbreviated');
          const dayNames = days.slice(args.value).concat(days.slice(0, args.value));
          const itemsButtonGroup = localDaysNames.slice(args.value).concat(localDaysNames.slice(0, args.value)).map((item, index) => ({
            text: item,
            key: dayNames[index]
          }));
          this._weekEditor.option('items', itemsButtonGroup);
        }
        if (this._recurrenceForm.itemOption('until').visible) {
          this._recurrenceForm.getEditor('until').option('calendarOptions.firstDayOfWeek', this._getFirstDayOfWeek());
        }
        break;
      default:
        // @ts-expect-error
        super._optionChanged(args);
    }
  }
  _changeRepeatOnVisibility(freq, previousFreq) {
    if (freq !== previousFreq) {
      this._recurrenceForm.itemOption('byday', 'visible', false);
      this._recurrenceForm.itemOption('bymonthday', 'visible', false);
      this._recurrenceForm.itemOption('bymonth', 'visible', false);
      this._recurrenceForm.itemOption('repeatOnLabel', 'visible', freq && freq !== 'daily' && freq !== 'hourly');
      if (freq === 'weekly') {
        this._recurrenceForm.itemOption('byday', 'visible', true);
      }
      if (freq === 'monthly') {
        this._recurrenceForm.itemOption('bymonthday', 'visible', true);
      }
      if (freq === 'yearly') {
        this._recurrenceForm.itemOption('bymonthday', 'visible', true);
        this._recurrenceForm.itemOption('bymonth', 'visible', true);
      }
    }
  }
  _changeRepeatIntervalLabel() {
    const {
      freq
    } = this._recurrenceRule.getRules();
    freq && this._recurrenceForm.itemOption('intervalLabel', 'template', _message.default.format(`dxScheduler-recurrenceRepeat${freq.charAt(0).toUpperCase()}${freq.substr(1).toLowerCase()}`));
  }
  _changeEditorsValue(rules) {
    this._recurrenceForm.getEditor('freq').option('value', (rules.freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase());
    this._changeDayOfWeekValue();
    this._changeDayOfMonthValue();
    this._changeMonthOfYearValue();
    this._changeIntervalValue(rules.interval);
    this._changeRepeatCountValue();
    this._changeRepeatEndValue();
    this._changeRepeatUntilValue();
  }
  _changeIntervalValue(value) {
    this._recurrenceForm.getEditor('interval').option('value', value || 1);
  }
  _changeRepeatEndValue() {
    const repeatType = this._recurrenceRule.getRepeatEndRule();
    this._recurrenceForm.getEditor('repeatEnd').option('value', repeatType);
  }
  _changeDayOfWeekValue() {
    const isEditorVisible = this._recurrenceForm.itemOption('byday').visible;
    if (isEditorVisible) {
      const days = this._daysOfWeekByRules();
      this.getEditorByField('byday').option('selectedItemKeys', days);
    }
  }
  _changeDayOfMonthValue() {
    const isEditorVisible = this._recurrenceForm.itemOption('bymonthday').visible;
    if (isEditorVisible) {
      const day = this._dayOfMonthByRules();
      this._recurrenceForm.getEditor('bymonthday').option('value', day);
    }
  }
  _changeMonthOfYearValue() {
    const isEditorVisible = this._recurrenceForm.itemOption('bymonth').visible;
    if (isEditorVisible) {
      const month = this._monthOfYearByRules();
      this._recurrenceForm.getEditor('bymonth').option('value', month);
    }
  }
  _changeRepeatCountValue() {
    const count = this._recurrenceRule.getRules().count || 1;
    this._recurrenceForm.getEditor('count').option('value', count);
  }
  _changeRepeatUntilValue() {
    this._recurrenceForm.getEditor('until').option('value', this._getUntilValue());
  }
  _getUntilValue() {
    const untilDate = this._recurrenceRule.getRules().until;
    if (!untilDate) {
      return this._formatUntilDate(new Date());
    }
    const getStartDateTimeZone = this.option('getStartDateTimeZone');
    const appointmentTimeZone = getStartDateTimeZone();
    const path = appointmentTimeZone ? 'toAppointment' : 'toGrid';
    return this.option('timeZoneCalculator').createDate(untilDate, path, appointmentTimeZone);
  }
}
(0, _component_registrator.default)('dxRecurrenceEditor', RecurrenceEditor);
var _default = exports.default = RecurrenceEditor;