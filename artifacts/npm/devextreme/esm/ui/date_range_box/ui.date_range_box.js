/**
* DevExtreme (esm/ui/date_range_box/ui.date_range_box.js)
* Version: 23.1.1
* Build date: Mon May 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../core/renderer';
import registerComponent from '../../core/component_registrator';
import domAdapter from '../../core/dom_adapter';
import { resetActiveElement } from '../../core/utils/dom';
import { extend } from '../../core/utils/extend';
import { getImageContainer } from '../../core/utils/icon';
import config from '../../core/config';
import messageLocalization from '../../localization/message';
import { current, isMaterial } from '../themes';
import Widget from '../widget/ui.widget';
import MultiselectDateBox from './ui.multiselect_date_box';
import TextEditorButtonCollection from '../text_box/texteditor_button_collection/index';
import DropDownButton from '../drop_down_editor/ui.drop_down_button';
import ClearButton from '../text_box/ui.text_editor.clear';
import { FunctionTemplate } from '../../core/templates/function_template';
import { isSameDates, isSameDateArrays, sortDatesArray } from './ui.date_range.utils';
import { each } from '../../core/utils/iterator';
import { camelize } from '../../core/utils/inflector';
var DATERANGEBOX_CLASS = 'dx-daterangebox';
var START_DATEBOX_CLASS = 'dx-start-datebox';
var END_DATEBOX_CLASS = 'dx-end-datebox';
var DATERANGEBOX_SEPARATOR_CLASS = 'dx-daterangebox-separator';
var DROP_DOWN_EDITOR_BUTTON_ICON = 'dx-dropdowneditor-icon';
var READONLY_STATE_CLASS = 'dx-state-readonly';
var TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
var ALLOWED_STYLING_MODES = ['outlined', 'filled', 'underlined'];
var SEPARATOR_ICON_NAME = 'to';
var EVENTS_LIST = ['KeyDown', 'KeyUp', 'Change', 'Cut', 'Copy', 'Paste', 'Input', 'EnterKey'];

// STYLE dateRangeBox

class DateRangeBox extends Widget {
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      acceptCustomValue: true,
      activeStateEnabled: true,
      applyButtonText: messageLocalization.format('OK'),
      applyValueMode: 'instantly',
      buttons: undefined,
      calendarOptions: {},
      cancelButtonText: messageLocalization.format('Cancel'),
      dateOutOfRangeMessage: messageLocalization.format('validation-range'),
      dateSerializationFormat: undefined,
      deferRendering: true,
      disabledDates: null,
      displayFormat: null,
      dropDownButtonTemplate: 'dropDownButton',
      dropDownOptions: {},
      endDate: null,
      endDateInputAttr: {},
      endDateLabel: 'End Date',
      endDateName: '',
      endDatePlaceholder: '',
      endDateText: undefined,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      invalidDateMessage: messageLocalization.format('dxDateBox-validation-datetime'),
      isValid: true,
      labelMode: 'static',
      max: undefined,
      min: undefined,
      onChange: null,
      onClosed: null,
      onCopy: null,
      onCut: null,
      onEnterKey: null,
      onInput: null,
      onKeyDown: null,
      onKeyUp: null,
      onOpened: null,
      onPaste: null,
      onValueChanged: null,
      openOnFieldClick: true,
      opened: false,
      pickerType: 'calendar',
      readOnly: false,
      showClearButton: false,
      showDropDownButton: true,
      spellcheck: false,
      startDate: null,
      startDateInputAttr: {},
      startDateLabel: 'Start Date',
      startDateName: '',
      startDatePlaceholder: '',
      startDateText: undefined,
      stylingMode: config().editorStylingMode || 'outlined',
      todayButtonText: messageLocalization.format('dxCalendar-todayButtonText'),
      useHiddenSubmitElement: false,
      useMaskBehavior: false,
      validationError: null,
      validationErrors: null,
      validationMessageMode: 'auto',
      validationMessagePosition: 'auto',
      validationStatus: 'valid',
      value: [null, null],
      valueChangeEvent: 'change'
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: function device() {
        var themeName = current();
        return isMaterial(themeName);
      },
      options: {
        stylingMode: config().editorStylingMode || 'filled',
        labelMode: 'floating'
      }
    }]);
  }
  _initOptions(options) {
    super._initOptions(options);
    var {
      value: initialValue
    } = this.initialOption();
    var {
      value,
      startDate,
      endDate
    } = this.option();
    if (isSameDateArrays(initialValue, value)) {
      this.option('value', [startDate, endDate]);
    } else {
      var [_startDate, _endDate] = value;
      this.option({
        startDate: _startDate,
        endDate: _endDate
      });
    }
  }
  _createOpenAction() {
    this._openAction = this._createActionByOption('onOpened', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _raiseOpenAction() {
    if (!this._openAction) {
      this._createOpenAction();
    }
    this._openAction();
  }
  _createCloseAction() {
    this._closeAction = this._createActionByOption('onClosed', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _raiseCloseAction() {
    if (!this._closeAction) {
      this._createCloseAction();
    }
    this._closeAction();
  }
  _createValueChangeAction() {
    this._valueChangeAction = this._createActionByOption('onValueChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _createEventAction(eventName) {
    this["_".concat(camelize(eventName), "Action")] = this._createActionByOption("on".concat(eventName), {
      excludeValidators: ['readOnly']
    });
  }
  _raiseAction(eventName, event) {
    var action = this["_".concat(camelize(eventName), "Action")];
    if (!action) {
      this._createEventAction(eventName);
    }
    this["_".concat(camelize(eventName), "Action")]({
      event
    });
  }
  _raiseValueChangeAction(value, previousValue) {
    if (!this._valueChangeAction) {
      this._createValueChangeAction();
    }
    this._valueChangeAction(this._valueChangeArgs(value, previousValue));
  }
  _valueChangeArgs(value, previousValue) {
    return {
      value: value,
      previousValue: previousValue,
      event: this._valueChangeEventInstance
    };
  }
  _saveValueChangeEvent(e) {
    this._valueChangeEventInstance = e;
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      dropDownButton: new FunctionTemplate(function (options) {
        var $icon = $('<div>').addClass(DROP_DOWN_EDITOR_BUTTON_ICON);
        $(options.container).append($icon);
      })
    });
    this.callBase();
  }
  _getDefaultButtons() {
    return [{
      name: 'clear',
      Ctor: ClearButton
    }, {
      name: 'dropDown',
      Ctor: DropDownButton
    }];
  }
  _initMarkup() {
    this.$element().addClass(DATERANGEBOX_CLASS)
    // TODO: remove next classes after adding styles
    .addClass('dx-texteditor').addClass('dx-datebox-date').addClass('dx-dropdowneditor');
    this._toggleReadOnlyState();
    this._renderStylingMode();
    // TODO: probably it need to update styling mode for dropDown in buttons container. It depends from design decision

    this._renderStartDateBox();
    this._renderSeparator();
    this._renderEndDateBox();
    this._renderButtonsContainer();
    super._initMarkup();
  }
  _attachKeyboardEvents() {
    if (!this.option('readOnly')) {
      super._attachKeyboardEvents();
    }
  }
  _toggleReadOnlyState() {
    var {
      readOnly
    } = this.option();
    this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
    // TODO: should we add area readonly here?
  }

  _getStylingModePrefix() {
    return "".concat(DATERANGEBOX_CLASS, "-");
  }

  // TODO: extract this part from Editor to separate file and use it here
  _renderStylingMode() {
    var optionName = 'stylingMode';
    var optionValue = this.option(optionName);
    var prefix = this._getStylingModePrefix();
    var allowedStylingClasses = ALLOWED_STYLING_MODES.map(mode => {
      return prefix + mode;
    });
    allowedStylingClasses.forEach(className => this.$element().removeClass(className));
    var stylingModeClass = prefix + optionValue;
    if (allowedStylingClasses.indexOf(stylingModeClass) === -1) {
      var defaultOptionValue = this._getDefaultOptions()[optionName];
      var platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules())[optionName];
      stylingModeClass = prefix + (platformOptionValue || defaultOptionValue);
    }
    this.$element().addClass(stylingModeClass);
  }
  _renderStartDateBox() {
    this._$startDateBox = $('<div>').addClass(START_DATEBOX_CLASS).appendTo(this.$element());
    this._startDateBox = this._createComponent(this._$startDateBox, MultiselectDateBox, this._getStartDateBoxConfig());
  }
  _renderEndDateBox() {
    this._$endDateBox = $('<div>').addClass(END_DATEBOX_CLASS).appendTo(this.$element());
    this._endDateBox = this._createComponent(this._$endDateBox, MultiselectDateBox, this._getEndDateBoxConfig());
  }
  _renderSeparator() {
    // TODO: request design for rtl mode and research rtl mode appearance
    // TODO: add transform: scale(-1, 1) for mirror of the icon in rtl mode
    var $icon = getImageContainer(SEPARATOR_ICON_NAME);
    this._$separator = $('<div>').addClass(DATERANGEBOX_SEPARATOR_CLASS).appendTo(this.$element());
    $icon.appendTo(this._$separator);
  }
  _renderButtonsContainer() {
    this._buttonCollection = new TextEditorButtonCollection(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    var {
      buttons
    } = this.option();
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, this.$element());
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, this.$element());
  }
  _updateButtons(names) {
    this._buttonCollection.updateButtons(names);
  }
  _openHandler() {
    this._toggleOpenState();
  }
  _shouldCallOpenHandler() {
    return true;
  }
  _toggleOpenState() {
    this.getStartDateBox().focus();
    this.option('opened', !this.option('opened'));
  }
  _clearValueHandler(e) {
    this.getEndDateBox()._clearValueHandler(e);
    this.getStartDateBox()._clearValueHandler(e);
  }
  _isClearButtonVisible() {
    return this.option('showClearButton') && !this.option('readOnly');
  }
  _focusInHandler(e) {
    super._focusInHandler(e);
  }
  _getPickerType() {
    var {
      pickerType
    } = this.option();
    return ['calendar', 'native'].includes(pickerType) ? pickerType : 'calendar';
  }
  _getDateBoxConfig() {
    var options = this.option();
    var dateBoxConfig = {
      acceptCustomValue: options.acceptCustomValue,
      activeStateEnabled: options.activeStateEnabled,
      applyValueMode: options.applyValueMode,
      dateOutOfRangeMessage: options.dateOutOfRangeMessage,
      dateSerializationFormat: options.dateSerializationFormat,
      deferRendering: options.deferRendering,
      disabled: options.disabled,
      displayFormat: options.displayFormat,
      focusStateEnabled: options.focusStateEnabled,
      tabIndex: options.tabIndex,
      height: options.height,
      hoverStateEnabled: options.hoverStateEnabled,
      invalidDateMessage: options.invalidDateMessage,
      isValid: options.isValid,
      labelMode: options.labelMode,
      max: options.max,
      min: options.min,
      openOnFieldClick: options.openOnFieldClick,
      pickerType: this._getPickerType(),
      readOnly: options.readOnly,
      rtlEnabled: options.rtlEnabled,
      spellcheck: options.spellcheck,
      stylingMode: 'underlined',
      type: 'date',
      useMaskBehavior: options.useMaskBehavior,
      validationMessageMode: options.validationMessageMode,
      validationMessagePosition: options.validationMessagePosition,
      validationStatus: options.validationStatus,
      valueChangeEvent: options.valueChangeEvent,
      onKeyDown: options.onKeyUp,
      onKeyUp: options.onKeyUp,
      onChange: options.onChange,
      onInput: options.onInput,
      onCut: options.onCut,
      onCopy: options.onCopy,
      onPaste: options.onPaste,
      onEnterKey: options.onEnterKey,
      _dateRangeBoxInstance: this
    };
    each(EVENTS_LIST, (_, eventName) => {
      var optionName = "on".concat(eventName);
      if (this.hasActionSubscription(optionName)) {
        dateBoxConfig[optionName] = e => {
          this._raiseAction(eventName, e.event);
        };
      }
    });
    return dateBoxConfig;
  }
  _getStartDateBoxConfig() {
    var options = this.option();
    return _extends({}, this._getDateBoxConfig(), {
      applyButtonText: options.applyButtonText,
      calendarOptions: options.calendarOptions,
      cancelButtonText: options.cancelButtonText,
      deferRendering: options.deferRendering,
      disabledDates: options.disabledDates,
      dropDownOptions: options.dropDownOptions,
      onValueChanged: _ref => {
        var {
          value
        } = _ref;
        var newValue = [value, this.option('value')[1]];
        this.updateValue(newValue);
      },
      opened: options.opened,
      onOpened: () => {
        this.option('opened', true);
        this._raiseOpenAction();
      },
      onClosed: () => {
        this.option('opened', false);
        this._raiseCloseAction();
      },
      onOptionChanged: _ref2 => {
        var {
          name,
          value
        } = _ref2;
        if (name === 'text') {
          this.option('startDateText', value);
        }
      },
      todayButtonText: options.todayButtonText,
      showClearButton: false,
      showDropDownButton: false,
      value: this.option('value')[0],
      label: options.startDateLabel,
      placeholder: options.startDatePlaceholder,
      inputAttr: options.startDateInputAttr,
      name: options.startDateName
    });
  }
  _getEndDateBoxConfig() {
    var options = this.option();
    return _extends({}, this._getDateBoxConfig(), {
      dropDownOptions: {
        onShowing: e => {
          e.cancel = true;
          this.getStartDateBox().focus();
          this.getStartDateBox().open();

          // TODO: datebox doesn't clear opened state after prevent of opening
          this.getEndDateBox().option('opened', false);
        }
      },
      onValueChanged: _ref3 => {
        var {
          value
        } = _ref3;
        var newValue = [this.option('value')[0], value];
        this.updateValue(newValue);
      },
      onOptionChanged: _ref4 => {
        var {
          name,
          value
        } = _ref4;
        if (name === 'text') {
          this.option('endDateText', value);
        }
      },
      showClearButton: false,
      showDropDownButton: false,
      value: this.option('value')[1],
      label: options.endDateLabel,
      placeholder: options.endDatePlaceholder,
      deferRendering: true,
      inputAttr: options.endDateInputAttr,
      name: options.endDateName
    });
  }
  updateValue(newValue) {
    if (!isSameDateArrays(newValue, this.option('value'))) {
      this.option('value', newValue);
    }
  }
  _updateDateBoxesValue(newValue) {
    var startDateBox = this.getStartDateBox();
    var endDateBox = this.getEndDateBox();
    var [newStartDate, newEndDate] = newValue;
    var oldStartDate = startDateBox.option('value');
    var oldEndDate = endDateBox.option('value');
    if (!isSameDates(newStartDate, oldStartDate)) {
      startDateBox.option('value', newStartDate);
    }
    if (!isSameDates(newEndDate, oldEndDate)) {
      endDateBox.option('value', newEndDate);
    }
  }
  _renderAccessKey() {
    var $startDateInput = $(this.field()[0]);
    var {
      accessKey
    } = this.option();
    $startDateInput.attr('accesskey', accessKey);
  }
  _focusTarget() {
    return this.$element().find(".".concat(TEXTEDITOR_INPUT_CLASS));
  }
  _focusEventTarget() {
    return this.element();
  }
  _focusClassTarget() {
    return this.$element();
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, this._focusClassTarget($element));
  }
  _hasActiveElement() {
    var [startDateInput, endDateInput] = this.field();
    return this._isActiveElement(startDateInput) || this._isActiveElement(endDateInput);
  }
  _isActiveElement(input) {
    return $(input).is(domAdapter.getActiveElement(input));
  }
  _cleanButtonContainers() {
    var _this$_$beforeButtons, _this$_$afterButtonsC;
    (_this$_$beforeButtons = this._$beforeButtonsContainer) === null || _this$_$beforeButtons === void 0 ? void 0 : _this$_$beforeButtons.remove();
    (_this$_$afterButtonsC = this._$afterButtonsContainer) === null || _this$_$afterButtonsC === void 0 ? void 0 : _this$_$afterButtonsC.remove();
    this._buttonCollection.clean();
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
  }
  _clean() {
    var _this$_$startDateBox, _this$_$endDateBox, _this$_$separator;
    this._cleanButtonContainers();
    (_this$_$startDateBox = this._$startDateBox) === null || _this$_$startDateBox === void 0 ? void 0 : _this$_$startDateBox.remove();
    (_this$_$endDateBox = this._$endDateBox) === null || _this$_$endDateBox === void 0 ? void 0 : _this$_$endDateBox.remove();
    (_this$_$separator = this._$separator) === null || _this$_$separator === void 0 ? void 0 : _this$_$separator.remove();
    super._clean();
  }
  _optionChanged(args) {
    var {
      name,
      fullName,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'acceptCustomValue':
      case 'dateSerializationFormat':
      case 'displayFormat':
      case 'max':
      case 'min':
      case 'rtlEnabled':
      case 'labelMode':
      case 'spellcheck':
      case 'useMaskBehavior':
      case 'valueChangeEvent':
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'applyButtonText':
      case 'applyValueMode':
      case 'cancelButtonText':
      case 'deferRendering':
      case 'disabledDates':
      case 'opened':
      case 'todayButtonText':
        this.getStartDateBox().option(name, value);
        break;
      case 'buttons':
        this._cleanButtonContainers();
        this._renderButtonsContainer();
        break;
      case 'calendarOptions':
      case 'dropDownOptions':
        this.getStartDateBox().option(fullName, value);
        break;
      case 'pickerType':
        {
          var pickerType = this._getPickerType();
          this.getStartDateBox().option(name, pickerType);
          this.getEndDateBox().option(name, pickerType);
          break;
        }
      case 'dateOutOfRangeMessage':
        break;
      case 'height':
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        super._optionChanged(args);
        break;
      case 'dropDownButtonTemplate':
      case 'showDropDownButton':
        this._updateButtons(['dropDown']);
        break;
      case 'showClearButton':
        this._updateButtons(['clear']);
        break;
      case 'endDate':
        this.updateValue([this.option('value')[0], value]);
        break;
      case 'invalidDateMessage':
      case 'isValid':
        break;
      case 'startDateLabel':
        this.getStartDateBox().option('label', value);
        break;
      case 'endDateLabel':
        this.getEndDateBox().option('label', value);
        break;
      case 'startDatePlaceholder':
        this.getStartDateBox().option('placeholder', value);
        break;
      case 'endDatePlaceholder':
        this.getEndDateBox().option('placeholder', value);
        break;
      case 'startDateInputAttr':
        this.getStartDateBox().option('inputAttr', value);
        break;
      case 'startDateName':
        this.getStartDateBox().option('name', value);
        break;
      case 'endDateInputAttr':
        this.getEndDateBox().option('inputAttr', value);
        break;
      case 'endDateName':
        this.getEndDateBox().option('name', value);
        break;
      case 'tabIndex':
      case 'focusStateEnabled':
        super._optionChanged(args);
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'onValueChanged':
        this._createValueChangeAction();
        break;
      case 'onOpened':
        this._createOpenAction();
        break;
      case 'onClosed':
        this._createCloseAction();
        break;
      case 'onKeyDown':
      case 'onKeyUp':
      case 'onChange':
      case 'onInput':
      case 'onCut':
      case 'onCopy':
      case 'onPaste':
      case 'onEnterKey':
        this._createEventAction(name.replace('on', ''));
        break;
      case 'openOnFieldClick':
        break;
      case 'readOnly':
        this._updateButtons();
        this._toggleReadOnlyState();
        this._refreshFocusState();
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'disabled':
        // TODO: understand the scenario where it needs and add test
        this._updateButtons();
        super._optionChanged(args);
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'startDate':
        this.updateValue([value, this.option('value')[1]]);
        break;
      case 'stylingMode':
        this._renderStylingMode();
        break;
      case 'startDateText':
      case 'endDateText':
      case 'useHiddenSubmitElement':
      case 'validationError':
      case 'validationErrors':
      case 'validationMessageMode':
      case 'validationMessagePosition':
      case 'validationStatus':
        break;
      case 'value':
        {
          var newValue = sortDatesArray(value);
          if (!isSameDateArrays(newValue, previousValue)) {
            this._setOptionWithoutOptionChange('value', newValue);
            this._setOptionWithoutOptionChange('startDate', newValue[0]);
            this._setOptionWithoutOptionChange('endDate', newValue[1]);
            this._raiseValueChangeAction(newValue, previousValue);
            this._saveValueChangeEvent(undefined);
            this._updateDateBoxesValue(newValue);
          }
          break;
        }
      default:
        super._optionChanged(args);
    }
  }
  getStartDateBox() {
    return this._startDateBox;
  }
  getEndDateBox() {
    return this._endDateBox;
  }
  getButton(name) {
    return this._buttonCollection.getButton(name);
  }
  open() {
    this.option('opened', true);
  }
  close() {
    this.option('opened', false);
  }
  content() {
    return this.getStartDateBox().content();
  }
  field() {
    return [this.getStartDateBox().field(), this.getEndDateBox().field()];
  }
  focus() {
    this.getStartDateBox().focus();
  }
  blur() {
    if (this._hasActiveElement()) {
      resetActiveElement();
    }
  }
  reset() {
    // TODO: add test
    this.getEndDateBox().reset();
    this.getStartDateBox().reset();
  }
}
registerComponent('dxDateRangeBox', DateRangeBox);
export default DateRangeBox;
