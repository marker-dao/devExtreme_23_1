/**
* DevExtreme (cjs/__internal/ui/speech_to_text/speech_to_text.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SPEECH_TO_TEXT_LISTENING_CLASS = exports.SPEECH_TO_TEXT_CLASS = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _common = require("../../../core/utils/common");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _themes = require("../../../ui/themes");
var _speech_recognition_adapter = require("../../core/speech_recognition_adapter");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SPEECH_TO_TEXT_CLASS = exports.SPEECH_TO_TEXT_CLASS = 'dx-speech-to-text';
const SPEECH_TO_TEXT_LISTENING_CLASS = exports.SPEECH_TO_TEXT_LISTENING_CLASS = 'dx-speech-to-text-listening';
const DEFAULT_INITIAL_ICON = 'micoutline';
const DEFAULT_LISTENING_ICON = 'stopfilled';
var SpeechToTextState;
(function (SpeechToTextState) {
  SpeechToTextState["INITIAL"] = "initial";
  SpeechToTextState["LISTENING"] = "listening";
  SpeechToTextState["DISABLED"] = "disabled";
})(SpeechToTextState || (SpeechToTextState = {}));
const ACTIONS = ['onStartClick', 'onStopClick', 'onResult', 'onError', 'onEnd'];
class SpeechToText extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      customSpeechRecognizer: {
        enabled: false,
        isListening: false
      },
      hoverStateEnabled: true,
      startIcon: DEFAULT_INITIAL_ICON,
      stopIcon: DEFAULT_LISTENING_ICON,
      startText: '',
      stopText: '',
      useInkRipple: false,
      onStartClick: undefined,
      onStopClick: undefined,
      onResult: undefined,
      onError: undefined,
      onEnd: undefined,
      speechRecognitionConfig: undefined
    });
  }
  _initSpeechRecognitionAdapter() {
    const {
      speechRecognitionConfig = {}
    } = this.option();
    if (this._isCustomSpeechRecognitionEnabled()) {
      return;
    }
    this._speechRecognitionAdapter = new _speech_recognition_adapter.SpeechRecognitionAdapter(speechRecognitionConfig, {
      onEnd: this._handleSpeechRecognitionEnd.bind(this),
      onResult: this._handleSpeechRecognitionResult.bind(this),
      onError: this._handleSpeechRecognitionError.bind(this)
    });
  }
  _isCustomSpeechRecognitionEnabled() {
    const {
      customSpeechRecognizer
    } = this.option();
    return Boolean(customSpeechRecognizer === null || customSpeechRecognizer === void 0 ? void 0 : customSpeechRecognizer.enabled);
  }
  _init() {
    this._actions = {};
    super._init();
    this._handleCustomEngineState();
    this._createActions();
    this._initSpeechRecognitionAdapter();
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(SPEECH_TO_TEXT_CLASS);
    this._renderButton();
    this._updateButtonState();
  }
  _createActions() {
    ACTIONS.forEach(action => {
      this._setAction(action);
    });
  }
  _setAction(action) {
    this._actions[action] = this._createActionByOption(action, {
      excludeValidators: ['disabled', 'readOnly']
    }) || _common.noop;
  }
  _attachFeedbackEvents() {}
  _renderButton() {
    this._button = this._createComponent(this.$element(), _button.default, this._getButtonOptions());
  }
  _getButtonOptions() {
    const {
      activeStateEnabled,
      disabled,
      focusStateEnabled,
      height,
      hint,
      hoverStateEnabled,
      stylingMode,
      type,
      useInkRipple,
      width
    } = this.option();
    return {
      activeStateEnabled,
      disabled,
      focusStateEnabled,
      height,
      hint,
      hoverStateEnabled,
      stylingMode,
      type,
      useInkRipple,
      width,
      icon: this._getCurrentIcon(),
      text: this._getCurrentText(),
      onClick: e => {
        this._handleButtonClick(e);
      }
    };
  }
  _defaultOptionsRules() {
    const rules = [...super._defaultOptionsRules(), {
      device: () => _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => (0, _themes.isMaterial)((0, _themes.current)()),
      options: {
        useInkRipple: true
      }
    }];
    return rules;
  }
  _getCurrentIcon() {
    const {
      startIcon,
      stopIcon
    } = this.option();
    return this._isListening() ? stopIcon : startIcon;
  }
  _getCurrentAriaLabel() {
    return this._isListening() ? _message.default.format('dxSpeechToText-ariaLabelStop') : _message.default.format('dxSpeechToText-ariaLabelStart');
  }
  _getCurrentAriaPressed() {
    return this._isListening();
  }
  _getCurrentText() {
    const {
      startText,
      stopText
    } = this.option();
    return this._isListening() ? stopText ?? '' : startText ?? '';
  }
  _emitNativeEvent(name, event) {
    var _this$_actions$name, _this$_actions;
    (_this$_actions$name = (_this$_actions = this._actions)[name]) === null || _this$_actions$name === void 0 || _this$_actions$name.call(_this$_actions, {
      component: this,
      element: this.element(),
      event
    });
  }
  _emitDxEvent(name, event) {
    var _this$_actions$name2, _this$_actions2;
    (_this$_actions$name2 = (_this$_actions2 = this._actions)[name]) === null || _this$_actions$name2 === void 0 || _this$_actions$name2.call(_this$_actions2, {
      component: this,
      element: this.element(),
      event
    });
  }
  _handleButtonClick(e) {
    if (this._state === SpeechToTextState.DISABLED) {
      return;
    }
    if (this._isListening()) {
      this._handleStopClick(e);
    } else {
      this._handleStartClick(e);
    }
  }
  _handleStartClick(e) {
    var _this$_speechRecognit;
    const isCustomEnabled = this._isCustomSpeechRecognitionEnabled();
    const isSRAvailable = (_this$_speechRecognit = this._speechRecognitionAdapter) === null || _this$_speechRecognit === void 0 ? void 0 : _this$_speechRecognit.isAvailable();
    if (!isCustomEnabled && isSRAvailable) {
      var _this$_speechRecognit2;
      this._setState(SpeechToTextState.LISTENING);
      (_this$_speechRecognit2 = this._speechRecognitionAdapter) === null || _this$_speechRecognit2 === void 0 || _this$_speechRecognit2.start();
    }
    this._emitDxEvent('onStartClick', e.event);
  }
  _handleStopClick(e) {
    if (!this._isCustomSpeechRecognitionEnabled()) {
      var _this$_speechRecognit3;
      this._setState(SpeechToTextState.INITIAL);
      (_this$_speechRecognit3 = this._speechRecognitionAdapter) === null || _this$_speechRecognit3 === void 0 || _this$_speechRecognit3.stop();
    }
    this._emitDxEvent('onStopClick', e.event);
  }
  _handleSpeechRecognitionEnd(event) {
    if (this._state !== SpeechToTextState.DISABLED && !this._isCustomSpeechRecognitionEnabled()) {
      this._setState(SpeechToTextState.INITIAL);
    }
    this._emitNativeEvent('onEnd', event);
  }
  _handleSpeechRecognitionResult(event) {
    this._emitNativeEvent('onResult', event);
  }
  _handleSpeechRecognitionError(event) {
    this._emitNativeEvent('onError', event);
  }
  _stopRecognitionOnDisable(disabled) {
    if (disabled) {
      var _this$_speechRecognit4;
      (_this$_speechRecognit4 = this._speechRecognitionAdapter) === null || _this$_speechRecognit4 === void 0 || _this$_speechRecognit4.stop();
    }
  }
  _setState(newState) {
    if (this._state === newState) {
      return;
    }
    this._state = newState;
    this._updateButtonState();
    this._updateCssClasses();
  }
  _updateButtonState() {
    var _this$_button;
    (_this$_button = this._button) === null || _this$_button === void 0 || _this$_button.option({
      icon: this._getCurrentIcon(),
      text: this._getCurrentText(),
      elementAttr: {
        'aria-label': this._getCurrentAriaLabel(),
        'aria-pressed': this._getCurrentAriaPressed()
      }
    });
  }
  _updateCssClasses() {
    this.$element().toggleClass(SPEECH_TO_TEXT_LISTENING_CLASS, this._isListening());
  }
  _updateSpeechRecognitionConfig(args) {
    var _this$_speechRecognit5;
    const options = _widget.default.getOptionsFromContainer(args);
    (_this$_speechRecognit5 = this._speechRecognitionAdapter) === null || _this$_speechRecognit5 === void 0 || _this$_speechRecognit5.applyConfig(options);
  }
  _optionChanged(args) {
    var _this$_button2, _this$_button3;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'customSpeechRecognizer':
        this._handleCustomEngineState();
        this._initSpeechRecognitionAdapter();
        break;
      case 'speechRecognitionConfig':
        this._updateSpeechRecognitionConfig(args);
        break;
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'height':
      case 'hint':
      case 'hoverStateEnabled':
      case 'stylingMode':
      case 'type':
      case 'width':
        (_this$_button2 = this._button) === null || _this$_button2 === void 0 || _this$_button2.option(name, value);
        break;
      case 'disabled':
        (_this$_button3 = this._button) === null || _this$_button3 === void 0 || _this$_button3.option(name, value);
        this._setState(value ? SpeechToTextState.DISABLED : SpeechToTextState.INITIAL);
        this._stopRecognitionOnDisable(value);
        break;
      case 'startIcon':
      case 'stopIcon':
      case 'startText':
      case 'stopText':
        this._updateButtonState();
        break;
      case 'onStartClick':
      case 'onStopClick':
      case 'onResult':
      case 'onError':
        this._setAction(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _handleCustomEngineState() {
    const {
      customSpeechRecognizer
    } = this.option();
    const {
      enabled,
      isListening: isListeningState
    } = customSpeechRecognizer ?? {};
    const isListening = enabled && isListeningState !== undefined ? isListeningState : false;
    const targetState = isListening ? SpeechToTextState.LISTENING : SpeechToTextState.INITIAL;
    this._setState(targetState);
  }
  _isListening() {
    return this._state === SpeechToTextState.LISTENING;
  }
  _cleanButton() {
    var _this$_button4;
    (_this$_button4 = this._button) === null || _this$_button4 === void 0 || _this$_button4.dispose();
    this._button = undefined;
  }
  _clean() {
    this._cleanButton();
    this._setState(SpeechToTextState.INITIAL);
    super._clean();
  }
  _dispose() {
    var _this$_speechRecognit6;
    this._actions = {};
    (_this$_speechRecognit6 = this._speechRecognitionAdapter) === null || _this$_speechRecognit6 === void 0 || _this$_speechRecognit6.dispose();
    this._speechRecognitionAdapter = null;
    super._dispose();
  }
}
(0, _component_registrator.default)('dxSpeechToText', SpeechToText);
var _default = exports.default = SpeechToText;
