/**
* DevExtreme (cjs/ui/date_range_box/ui.date_range_box.js)
* Version: 23.1.1
* Build date: Mon May 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _dom = require("../../core/utils/dom");
var _extend = require("../../core/utils/extend");
var _icon = require("../../core/utils/icon");
var _config = _interopRequireDefault(require("../../core/config"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _themes = require("../themes");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _ui2 = _interopRequireDefault(require("./ui.multiselect_date_box"));
var _index = _interopRequireDefault(require("../text_box/texteditor_button_collection/index"));
var _ui3 = _interopRequireDefault(require("../drop_down_editor/ui.drop_down_button"));
var _uiText_editor = _interopRequireDefault(require("../text_box/ui.text_editor.clear"));
var _function_template = require("../../core/templates/function_template");
var _uiDate_range = require("./ui.date_range.utils");
var _iterator = require("../../core/utils/iterator");
var _inflector = require("../../core/utils/inflector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
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
var DateRangeBox = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(DateRangeBox, _Widget);
  function DateRangeBox() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = DateRangeBox.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      acceptCustomValue: true,
      activeStateEnabled: true,
      applyButtonText: _message.default.format('OK'),
      applyValueMode: 'instantly',
      buttons: undefined,
      calendarOptions: {},
      cancelButtonText: _message.default.format('Cancel'),
      dateOutOfRangeMessage: _message.default.format('validation-range'),
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
      invalidDateMessage: _message.default.format('dxDateBox-validation-datetime'),
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
      stylingMode: (0, _config.default)().editorStylingMode || 'outlined',
      todayButtonText: _message.default.format('dxCalendar-todayButtonText'),
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
  };
  _proto._defaultOptionsRules = function _defaultOptionsRules() {
    return _Widget.prototype._defaultOptionsRules.call(this).concat([{
      device: function device() {
        var themeName = (0, _themes.current)();
        return (0, _themes.isMaterial)(themeName);
      },
      options: {
        stylingMode: (0, _config.default)().editorStylingMode || 'filled',
        labelMode: 'floating'
      }
    }]);
  };
  _proto._initOptions = function _initOptions(options) {
    _Widget.prototype._initOptions.call(this, options);
    var _this$initialOption = this.initialOption(),
      initialValue = _this$initialOption.value;
    var _this$option = this.option(),
      value = _this$option.value,
      startDate = _this$option.startDate,
      endDate = _this$option.endDate;
    if ((0, _uiDate_range.isSameDateArrays)(initialValue, value)) {
      this.option('value', [startDate, endDate]);
    } else {
      var _value = _slicedToArray(value, 2),
        _startDate = _value[0],
        _endDate = _value[1];
      this.option({
        startDate: _startDate,
        endDate: _endDate
      });
    }
  };
  _proto._createOpenAction = function _createOpenAction() {
    this._openAction = this._createActionByOption('onOpened', {
      excludeValidators: ['disabled', 'readOnly']
    });
  };
  _proto._raiseOpenAction = function _raiseOpenAction() {
    if (!this._openAction) {
      this._createOpenAction();
    }
    this._openAction();
  };
  _proto._createCloseAction = function _createCloseAction() {
    this._closeAction = this._createActionByOption('onClosed', {
      excludeValidators: ['disabled', 'readOnly']
    });
  };
  _proto._raiseCloseAction = function _raiseCloseAction() {
    if (!this._closeAction) {
      this._createCloseAction();
    }
    this._closeAction();
  };
  _proto._createValueChangeAction = function _createValueChangeAction() {
    this._valueChangeAction = this._createActionByOption('onValueChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  };
  _proto._createEventAction = function _createEventAction(eventName) {
    this["_".concat((0, _inflector.camelize)(eventName), "Action")] = this._createActionByOption("on".concat(eventName), {
      excludeValidators: ['readOnly']
    });
  };
  _proto._raiseAction = function _raiseAction(eventName, event) {
    var action = this["_".concat((0, _inflector.camelize)(eventName), "Action")];
    if (!action) {
      this._createEventAction(eventName);
    }
    this["_".concat((0, _inflector.camelize)(eventName), "Action")]({
      event: event
    });
  };
  _proto._raiseValueChangeAction = function _raiseValueChangeAction(value, previousValue) {
    if (!this._valueChangeAction) {
      this._createValueChangeAction();
    }
    this._valueChangeAction(this._valueChangeArgs(value, previousValue));
  };
  _proto._valueChangeArgs = function _valueChangeArgs(value, previousValue) {
    return {
      value: value,
      previousValue: previousValue,
      event: this._valueChangeEventInstance
    };
  };
  _proto._saveValueChangeEvent = function _saveValueChangeEvent(e) {
    this._valueChangeEventInstance = e;
  };
  _proto._initTemplates = function _initTemplates() {
    this._templateManager.addDefaultTemplates({
      dropDownButton: new _function_template.FunctionTemplate(function (options) {
        var $icon = (0, _renderer.default)('<div>').addClass(DROP_DOWN_EDITOR_BUTTON_ICON);
        (0, _renderer.default)(options.container).append($icon);
      })
    });
    this.callBase();
  };
  _proto._getDefaultButtons = function _getDefaultButtons() {
    return [{
      name: 'clear',
      Ctor: _uiText_editor.default
    }, {
      name: 'dropDown',
      Ctor: _ui3.default
    }];
  };
  _proto._initMarkup = function _initMarkup() {
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
    _Widget.prototype._initMarkup.call(this);
  };
  _proto._attachKeyboardEvents = function _attachKeyboardEvents() {
    if (!this.option('readOnly')) {
      _Widget.prototype._attachKeyboardEvents.call(this);
    }
  };
  _proto._toggleReadOnlyState = function _toggleReadOnlyState() {
    var _this$option2 = this.option(),
      readOnly = _this$option2.readOnly;
    this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
    // TODO: should we add area readonly here?
  };
  _proto._getStylingModePrefix = function _getStylingModePrefix() {
    return "".concat(DATERANGEBOX_CLASS, "-");
  }

  // TODO: extract this part from Editor to separate file and use it here
  ;
  _proto._renderStylingMode = function _renderStylingMode() {
    var _this = this;
    var optionName = 'stylingMode';
    var optionValue = this.option(optionName);
    var prefix = this._getStylingModePrefix();
    var allowedStylingClasses = ALLOWED_STYLING_MODES.map(function (mode) {
      return prefix + mode;
    });
    allowedStylingClasses.forEach(function (className) {
      return _this.$element().removeClass(className);
    });
    var stylingModeClass = prefix + optionValue;
    if (allowedStylingClasses.indexOf(stylingModeClass) === -1) {
      var defaultOptionValue = this._getDefaultOptions()[optionName];
      var platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules())[optionName];
      stylingModeClass = prefix + (platformOptionValue || defaultOptionValue);
    }
    this.$element().addClass(stylingModeClass);
  };
  _proto._renderStartDateBox = function _renderStartDateBox() {
    this._$startDateBox = (0, _renderer.default)('<div>').addClass(START_DATEBOX_CLASS).appendTo(this.$element());
    this._startDateBox = this._createComponent(this._$startDateBox, _ui2.default, this._getStartDateBoxConfig());
  };
  _proto._renderEndDateBox = function _renderEndDateBox() {
    this._$endDateBox = (0, _renderer.default)('<div>').addClass(END_DATEBOX_CLASS).appendTo(this.$element());
    this._endDateBox = this._createComponent(this._$endDateBox, _ui2.default, this._getEndDateBoxConfig());
  };
  _proto._renderSeparator = function _renderSeparator() {
    // TODO: request design for rtl mode and research rtl mode appearance
    // TODO: add transform: scale(-1, 1) for mirror of the icon in rtl mode
    var $icon = (0, _icon.getImageContainer)(SEPARATOR_ICON_NAME);
    this._$separator = (0, _renderer.default)('<div>').addClass(DATERANGEBOX_SEPARATOR_CLASS).appendTo(this.$element());
    $icon.appendTo(this._$separator);
  };
  _proto._renderButtonsContainer = function _renderButtonsContainer() {
    this._buttonCollection = new _index.default(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    var _this$option3 = this.option(),
      buttons = _this$option3.buttons;
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, this.$element());
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, this.$element());
  };
  _proto._updateButtons = function _updateButtons(names) {
    this._buttonCollection.updateButtons(names);
  };
  _proto._openHandler = function _openHandler() {
    this._toggleOpenState();
  };
  _proto._shouldCallOpenHandler = function _shouldCallOpenHandler() {
    return true;
  };
  _proto._toggleOpenState = function _toggleOpenState() {
    this.getStartDateBox().focus();
    this.option('opened', !this.option('opened'));
  };
  _proto._clearValueHandler = function _clearValueHandler(e) {
    this.getEndDateBox()._clearValueHandler(e);
    this.getStartDateBox()._clearValueHandler(e);
  };
  _proto._isClearButtonVisible = function _isClearButtonVisible() {
    return this.option('showClearButton') && !this.option('readOnly');
  };
  _proto._focusInHandler = function _focusInHandler(e) {
    _Widget.prototype._focusInHandler.call(this, e);
  };
  _proto._getPickerType = function _getPickerType() {
    var _this$option4 = this.option(),
      pickerType = _this$option4.pickerType;
    return ['calendar', 'native'].includes(pickerType) ? pickerType : 'calendar';
  };
  _proto._getDateBoxConfig = function _getDateBoxConfig() {
    var _this2 = this;
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
    (0, _iterator.each)(EVENTS_LIST, function (_, eventName) {
      var optionName = "on".concat(eventName);
      if (_this2.hasActionSubscription(optionName)) {
        dateBoxConfig[optionName] = function (e) {
          _this2._raiseAction(eventName, e.event);
        };
      }
    });
    return dateBoxConfig;
  };
  _proto._getStartDateBoxConfig = function _getStartDateBoxConfig() {
    var _this3 = this;
    var options = this.option();
    return _extends({}, this._getDateBoxConfig(), {
      applyButtonText: options.applyButtonText,
      calendarOptions: options.calendarOptions,
      cancelButtonText: options.cancelButtonText,
      deferRendering: options.deferRendering,
      disabledDates: options.disabledDates,
      dropDownOptions: options.dropDownOptions,
      onValueChanged: function onValueChanged(_ref) {
        var value = _ref.value;
        var newValue = [value, _this3.option('value')[1]];
        _this3.updateValue(newValue);
      },
      opened: options.opened,
      onOpened: function onOpened() {
        _this3.option('opened', true);
        _this3._raiseOpenAction();
      },
      onClosed: function onClosed() {
        _this3.option('opened', false);
        _this3._raiseCloseAction();
      },
      onOptionChanged: function onOptionChanged(_ref2) {
        var name = _ref2.name,
          value = _ref2.value;
        if (name === 'text') {
          _this3.option('startDateText', value);
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
  };
  _proto._getEndDateBoxConfig = function _getEndDateBoxConfig() {
    var _this4 = this;
    var options = this.option();
    return _extends({}, this._getDateBoxConfig(), {
      dropDownOptions: {
        onShowing: function onShowing(e) {
          e.cancel = true;
          _this4.getStartDateBox().focus();
          _this4.getStartDateBox().open();

          // TODO: datebox doesn't clear opened state after prevent of opening
          _this4.getEndDateBox().option('opened', false);
        }
      },
      onValueChanged: function onValueChanged(_ref3) {
        var value = _ref3.value;
        var newValue = [_this4.option('value')[0], value];
        _this4.updateValue(newValue);
      },
      onOptionChanged: function onOptionChanged(_ref4) {
        var name = _ref4.name,
          value = _ref4.value;
        if (name === 'text') {
          _this4.option('endDateText', value);
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
  };
  _proto.updateValue = function updateValue(newValue) {
    if (!(0, _uiDate_range.isSameDateArrays)(newValue, this.option('value'))) {
      this.option('value', newValue);
    }
  };
  _proto._updateDateBoxesValue = function _updateDateBoxesValue(newValue) {
    var startDateBox = this.getStartDateBox();
    var endDateBox = this.getEndDateBox();
    var _newValue = _slicedToArray(newValue, 2),
      newStartDate = _newValue[0],
      newEndDate = _newValue[1];
    var oldStartDate = startDateBox.option('value');
    var oldEndDate = endDateBox.option('value');
    if (!(0, _uiDate_range.isSameDates)(newStartDate, oldStartDate)) {
      startDateBox.option('value', newStartDate);
    }
    if (!(0, _uiDate_range.isSameDates)(newEndDate, oldEndDate)) {
      endDateBox.option('value', newEndDate);
    }
  };
  _proto._renderAccessKey = function _renderAccessKey() {
    var $startDateInput = (0, _renderer.default)(this.field()[0]);
    var _this$option5 = this.option(),
      accessKey = _this$option5.accessKey;
    $startDateInput.attr('accesskey', accessKey);
  };
  _proto._focusTarget = function _focusTarget() {
    return this.$element().find(".".concat(TEXTEDITOR_INPUT_CLASS));
  };
  _proto._focusEventTarget = function _focusEventTarget() {
    return this.element();
  };
  _proto._focusClassTarget = function _focusClassTarget() {
    return this.$element();
  };
  _proto._toggleFocusClass = function _toggleFocusClass(isFocused, $element) {
    _Widget.prototype._toggleFocusClass.call(this, isFocused, this._focusClassTarget($element));
  };
  _proto._hasActiveElement = function _hasActiveElement() {
    var _this$field = this.field(),
      _this$field2 = _slicedToArray(_this$field, 2),
      startDateInput = _this$field2[0],
      endDateInput = _this$field2[1];
    return this._isActiveElement(startDateInput) || this._isActiveElement(endDateInput);
  };
  _proto._isActiveElement = function _isActiveElement(input) {
    return (0, _renderer.default)(input).is(_dom_adapter.default.getActiveElement(input));
  };
  _proto._cleanButtonContainers = function _cleanButtonContainers() {
    var _this$_$beforeButtons, _this$_$afterButtonsC;
    (_this$_$beforeButtons = this._$beforeButtonsContainer) === null || _this$_$beforeButtons === void 0 ? void 0 : _this$_$beforeButtons.remove();
    (_this$_$afterButtonsC = this._$afterButtonsContainer) === null || _this$_$afterButtonsC === void 0 ? void 0 : _this$_$afterButtonsC.remove();
    this._buttonCollection.clean();
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
  };
  _proto._clean = function _clean() {
    var _this$_$startDateBox, _this$_$endDateBox, _this$_$separator;
    this._cleanButtonContainers();
    (_this$_$startDateBox = this._$startDateBox) === null || _this$_$startDateBox === void 0 ? void 0 : _this$_$startDateBox.remove();
    (_this$_$endDateBox = this._$endDateBox) === null || _this$_$endDateBox === void 0 ? void 0 : _this$_$endDateBox.remove();
    (_this$_$separator = this._$separator) === null || _this$_$separator === void 0 ? void 0 : _this$_$separator.remove();
    _Widget.prototype._clean.call(this);
  };
  _proto._optionChanged = function _optionChanged(args) {
    var name = args.name,
      fullName = args.fullName,
      value = args.value,
      previousValue = args.previousValue;
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
        _Widget.prototype._optionChanged.call(this, args);
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
        _Widget.prototype._optionChanged.call(this, args);
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
        _Widget.prototype._optionChanged.call(this, args);
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
          var newValue = (0, _uiDate_range.sortDatesArray)(value);
          if (!(0, _uiDate_range.isSameDateArrays)(newValue, previousValue)) {
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
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  _proto.getStartDateBox = function getStartDateBox() {
    return this._startDateBox;
  };
  _proto.getEndDateBox = function getEndDateBox() {
    return this._endDateBox;
  };
  _proto.getButton = function getButton(name) {
    return this._buttonCollection.getButton(name);
  };
  _proto.open = function open() {
    this.option('opened', true);
  };
  _proto.close = function close() {
    this.option('opened', false);
  };
  _proto.content = function content() {
    return this.getStartDateBox().content();
  };
  _proto.field = function field() {
    return [this.getStartDateBox().field(), this.getEndDateBox().field()];
  };
  _proto.focus = function focus() {
    this.getStartDateBox().focus();
  };
  _proto.blur = function blur() {
    if (this._hasActiveElement()) {
      (0, _dom.resetActiveElement)();
    }
  };
  _proto.reset = function reset() {
    // TODO: add test
    this.getEndDateBox().reset();
    this.getStartDateBox().reset();
  };
  return DateRangeBox;
}(_ui.default);
(0, _component_registrator.default)('dxDateRangeBox', DateRangeBox);
var _default = DateRangeBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
