/**
* DevExtreme (esm/__internal/ui/editor/editor.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import EventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace, normalizeKeyName } from '../../../common/core/events/utils/index';
import { data } from '../../../core/element_data';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import Callbacks from '../../../core/utils/callbacks';
import { extend } from '../../../core/utils/extend';
import { hasWindow } from '../../../core/utils/window';
import ValidationEngine from '../../../ui/validation_engine';
import ValidationMessage from '../../../ui/validation_message';
import Widget from '../../core/widget/widget';
import domUtils from '../../core/utils/m_dom';
const INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
const READONLY_STATE_CLASS = 'dx-state-readonly';
const INVALID_CLASS = 'dx-invalid';
const DX_INVALID_BADGE_CLASS = 'dx-show-invalid-badge';
const VALIDATION_TARGET = 'dx-validation-target';
const VALIDATION_STATUS_VALID = 'valid';
const VALIDATION_STATUS_INVALID = 'invalid';
const READONLY_NAMESPACE = 'editorReadOnly';
const ALLOWED_STYLING_MODES = ['outlined', 'filled', 'underlined'];
const VALIDATION_MESSAGE_KEYS_MAP = {
  validationMessageMode: 'mode',
  validationMessagePosition: 'positionSide',
  validationMessageOffset: 'offset',
  validationBoundary: 'boundary'
};
class Editor extends Widget {
  static isEditor(instance) {
    return instance instanceof Editor;
  }
  ctor(element, options) {
    this.showValidationMessageTimeout = undefined;
    this.validationRequest = Callbacks();
    super.ctor(element, options);
  }
  _createElement(element) {
    super._createElement(element);
    const $element = this.$element();
    if ($element) {
      data($element[0], VALIDATION_TARGET, this);
    }
  }
  _initOptions(options) {
    super._initOptions(options);
    // @ts-expect-error ts-error
    this.option(ValidationEngine.initValidationOptions(options));
  }
  _init() {
    this._initialValue = this.option('value');
    super._init();
    const {
      validationTooltipOptions
    } = this.option();
    this._options.cache('validationTooltipOptions', validationTooltipOptions);
    const $element = this.$element();
    $element.addClass(DX_INVALID_BADGE_CLASS);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      value: null,
      name: '',
      onValueChanged: null,
      readOnly: false,
      isValid: true,
      validationError: null,
      validationErrors: null,
      validationStatus: VALIDATION_STATUS_VALID,
      validationMessageMode: 'auto',
      validationMessagePosition: 'bottom',
      validationBoundary: undefined,
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      validationTooltipOptions: {},
      _cached_validationTooltipOptions: {},
      _showValidationMessage: true,
      isDirty: false
    });
  }
  _shouldAttachKeyboardEvents() {
    const {
      readOnly
    } = this.option();
    return !readOnly;
  }
  _attachKeyboardEvents() {
    if (this._shouldAttachKeyboardEvents()) {
      super._attachKeyboardEvents();
    }
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      validationError: true
    });
  }
  _createValueChangeAction() {
    this._valueChangeAction = this._createActionByOption('onValueChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _suppressValueChangeAction() {
    this._valueChangeActionSuppressed = true;
  }
  _resumeValueChangeAction() {
    this._valueChangeActionSuppressed = false;
  }
  _initMarkup() {
    this._toggleReadOnlyState();
    const {
      name,
      _onMarkupRendered: markupRendered
    } = this.option();
    this._setSubmitElementName(name);
    super._initMarkup();
    this._renderValidationState();
    markupRendered === null || markupRendered === void 0 || markupRendered();
  }
  _raiseValueChangeAction(value, previousValue) {
    if (!this._valueChangeAction) {
      this._createValueChangeAction();
    }
    this._valueChangeAction(this._valueChangeArgs(value, previousValue));
  }
  _valueChangeArgs(value, previousValue) {
    return {
      value,
      previousValue,
      event: this._valueChangeEventInstance
    };
  }
  _saveValueChangeEvent(e) {
    this._valueChangeEventInstance = e;
  }
  _focusInHandler(e) {
    const {
      validationMessageMode
    } = this.option();
    const isValidationMessageShownOnFocus = validationMessageMode === 'auto';
    // NOTE: The click should be processed before the validation message is shown because
    // it can change the editor's value
    if (this._canValueBeChangedByClick() && isValidationMessageShownOnFocus) {
      var _this$_validationMess;
      // @ts-expect-error ts-error
      // NOTE: Prevent the validation message from showing
      const $validationMessageWrapper = (_this$_validationMess = this._validationMessage) === null || _this$_validationMess === void 0 ? void 0 : _this$_validationMess.$wrapper();
      $validationMessageWrapper === null || $validationMessageWrapper === void 0 || $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
      clearTimeout(this.showValidationMessageTimeout);
      // NOTE: Show the validation message after a click changes the value
      // eslint-disable-next-line no-restricted-globals
      this.showValidationMessageTimeout = setTimeout(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      () => $validationMessageWrapper === null || $validationMessageWrapper === void 0 ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO), 150);
    }
    super._focusInHandler(e);
  }
  _canValueBeChangedByClick() {
    return false;
  }
  _getStylingModePrefix() {
    return 'dx-editor-';
  }
  _renderStylingMode() {
    const {
      stylingMode
    } = this.option();
    const prefix = this._getStylingModePrefix();
    const allowedStylingClasses = ALLOWED_STYLING_MODES.map(mode => prefix + mode);
    allowedStylingClasses.forEach(className => this.$element().removeClass(className));
    let stylingModeClass = prefix + String(stylingMode);
    if (!allowedStylingClasses.includes(stylingModeClass)) {
      const optionName = 'stylingMode';
      const defaultOptionValue = this._getDefaultOptions()[optionName];
      const platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules())[optionName];
      stylingModeClass = prefix + (platformOptionValue ?? defaultOptionValue);
    }
    this.$element().addClass(stylingModeClass);
  }
  _getValidationErrors() {
    let {
      validationErrors
    } = this.option();
    const {
      validationError
    } = this.option();
    if (!validationErrors && validationError) {
      validationErrors = [validationError];
    }
    return validationErrors;
  }
  _disposeValidationMessage() {
    if (this._$validationMessage) {
      this._$validationMessage.remove();
      this.setAria('describedby', null);
      this._$validationMessage = undefined;
      this._validationMessage = undefined;
    }
  }
  _toggleValidationClasses(isInvalid) {
    this.$element().toggleClass(INVALID_CLASS, isInvalid);
    this.setAria(VALIDATION_STATUS_INVALID, isInvalid || undefined);
  }
  _renderValidationState() {
    const {
      validationStatus,
      _showValidationMessage: showValidationMessage
    } = this.option();
    const isValid = this.option('isValid') && validationStatus !== VALIDATION_STATUS_INVALID;
    const validationErrors = this._getValidationErrors();
    const $element = this.$element();
    this._toggleValidationClasses(!isValid);
    if (!hasWindow() || !showValidationMessage) {
      return;
    }
    this._disposeValidationMessage();
    if (!isValid && validationErrors) {
      const {
        validationMessageMode,
        validationMessageOffset,
        validationBoundary,
        rtlEnabled
      } = this.option();
      this._$validationMessage = $('<div>').appendTo($element);
      const validationMessageContentId = `dx-${new Guid()}`;
      this.setAria('describedby', validationMessageContentId);
      // @ts-expect-error ts-error
      this._validationMessage = new ValidationMessage(this._$validationMessage, extend({
        validationErrors,
        rtlEnabled,
        target: this._getValidationMessageTarget(),
        visualContainer: $element,
        mode: validationMessageMode,
        positionSide: this._getValidationMessagePosition(),
        offset: validationMessageOffset,
        boundary: validationBoundary,
        contentId: validationMessageContentId
      }, this._options.cache('validationTooltipOptions')));
      this._bindInnerWidgetOptions(this._validationMessage, 'validationTooltipOptions');
    }
  }
  _getValidationMessagePosition() {
    const {
      validationMessagePosition
    } = this.option();
    return validationMessagePosition;
  }
  _getValidationMessageTarget() {
    return this.$element();
  }
  _toggleReadOnlyState() {
    const {
      readOnly
    } = this.option();
    this._toggleBackspaceHandler(readOnly);
    this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
    this._setAriaReadonly(readOnly);
  }
  _setAriaReadonly(readOnly) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.setAria('readonly', readOnly || undefined);
  }
  _toggleBackspaceHandler(isReadOnly) {
    const $eventTarget = this._keyboardEventBindingTarget();
    const eventName = addNamespace('keydown', READONLY_NAMESPACE);
    EventsEngine.off($eventTarget, eventName);
    if (isReadOnly) {
      EventsEngine.on($eventTarget, eventName, e => {
        if (normalizeKeyName(e) === 'backspace') {
          e.preventDefault();
        }
      });
    }
  }
  _dispose() {
    const element = this.$element()[0];
    data(element, VALIDATION_TARGET, null);
    clearTimeout(this.showValidationMessageTimeout);
    this._disposeValidationMessage();
    super._dispose();
  }
  _setSubmitElementName(name) {
    const $submitElement = this._getSubmitElement();
    if (!$submitElement) {
      return;
    }
    if (name && name.length > 0) {
      $submitElement.attr('name', name);
    } else {
      $submitElement.removeAttr('name');
    }
  }
  _getSubmitElement() {
    return null;
  }
  _setValidationMessageOption(_ref) {
    var _this$_validationMess2;
    let {
      name,
      value
    } = _ref;
    const optionKey = VALIDATION_MESSAGE_KEYS_MAP[String(name)] ? VALIDATION_MESSAGE_KEYS_MAP[String(name)] : name;
    (_this$_validationMess2 = this._validationMessage) === null || _this$_validationMess2 === void 0 || _this$_validationMess2.option(optionKey, value);
  }
  _hasActiveElement() {
    return false;
  }
  _optionChanged(args) {
    var _this$_validationMess3;
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'onValueChanged':
        this._createValueChangeAction();
        break;
      case 'readOnly':
        this._toggleReadOnlyState();
        this._refreshFocusState();
        break;
      case 'value':
        if (value != previousValue) {
          // eslint-disable-line eqeqeq
          this.option('isDirty', this._initialValue !== value);
          this.validationRequest.fire({
            value,
            editor: this
          });
        }
        if (!this._valueChangeActionSuppressed) {
          this._raiseValueChangeAction(value, previousValue);
          this._saveValueChangeEvent(undefined);
        }
        break;
      case 'width':
        super._optionChanged(args);
        // @ts-expect-error ts-error
        (_this$_validationMess3 = this._validationMessage) === null || _this$_validationMess3 === void 0 || _this$_validationMess3.updateMaxWidth();
        break;
      case 'name':
        this._setSubmitElementName(value);
        break;
      case 'isValid':
      case 'validationError':
      case 'validationErrors':
      case 'validationStatus':
        // @ts-expect-error ts-error
        this.option(ValidationEngine.synchronizeValidationOptions(args, this.option()));
        this._renderValidationState();
        break;
      case 'validationBoundary':
      case 'validationMessageMode':
      case 'validationMessagePosition':
      case 'validationMessageOffset':
        this._setValidationMessageOption(args);
        break;
      case 'rtlEnabled':
        this._setValidationMessageOption(args);
        super._optionChanged(args);
        break;
      case 'validationTooltipOptions':
        this._innerWidgetOptionChanged(this._validationMessage, args);
        break;
      case '_cached_validationTooltipOptions':
        break;
      case '_showValidationMessage':
      case 'isDirty':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetToInitialValue() {
    this.option('value', this._initialValue);
  }
  blur() {
    if (this._hasActiveElement()) {
      domUtils.resetActiveElement();
    }
  }
  clear() {
    const defaultOptions = this._getDefaultOptions();
    this.option('value', defaultOptions.value);
  }
  reset() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (arguments.length) {
      this._initialValue = value;
    }
    this._resetToInitialValue();
    this.option('isDirty', false);
    this.option('isValid', true);
  }
}
export default Editor;
