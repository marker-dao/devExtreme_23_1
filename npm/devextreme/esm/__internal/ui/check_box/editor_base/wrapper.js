/**
* DevExtreme (esm/__internal/ui/check_box/editor_base/wrapper.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { data } from '../../../../core/element_data';
import $ from '../../../../core/renderer';
import Callbacks from '../../../../core/utils/callbacks';
import { extend } from '../../../../core/utils/extend';
import { isDefined } from '../../../../core/utils/type';
import OldEditor from '../../../../ui/editor/editor';
import ValidationEngine from '../../../../ui/validation_engine';
import { ComponentWrapper } from '../../../core/r1/component_wrapper';
import { querySelectorInSameDocument } from '../../../core/r1/utils/dom';
const INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
const VALIDATION_TARGET = 'dx-validation-target';
export default class Editor extends ComponentWrapper {
  getProps() {
    const props = super.getProps();
    props.onFocusIn = () => {
      const isValidationMessageShownOnFocus = this.option('validationMessageMode') === 'auto';
      if (isValidationMessageShownOnFocus) {
        // @ts-expect-error
        const $validationMessageWrapper = $(querySelectorInSameDocument(this.element(), '.dx-invalid-message.dx-overlay-wrapper'));
        $validationMessageWrapper === null || $validationMessageWrapper === void 0 || $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
        const timeToWaitBeforeShow = 150;
        if (this.showValidationMessageTimeout) {
          clearTimeout(this.showValidationMessageTimeout);
        }
        this.showValidationMessageTimeout = setTimeout(() => {
          $validationMessageWrapper === null || $validationMessageWrapper === void 0 || $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO);
        }, timeToWaitBeforeShow);
      }
    };
    props.saveValueChangeEvent = e => {
      this._valueChangeEventInstance = e;
    };
    return props;
  }
  _createElement(element) {
    super._createElement(element);
    this.showValidationMessageTimeout = undefined;
    this.validationRequest = Callbacks();
    data(this.$element()[0], VALIDATION_TARGET, this);
  }
  _render() {
    var _this$option;
    (_this$option = this.option('_onMarkupRendered')) === null || _this$option === void 0 || _this$option();
  }
  _init() {
    super._init();
    this._initialValue = this.option('value');
  }
  _initializeComponent() {
    super._initializeComponent();
    // @ts-expect-error
    this._valueChangeAction = this._createActionByOption('onValueChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _initOptions(options) {
    // @ts-expect-error
    super._initOptions(options);
    // @ts-expect-error
    this.option(ValidationEngine.initValidationOptions(options));
  }
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(super._getDefaultOptions(), {
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      validationTooltipOptions: {}
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    const innerWidgetOptions = extend({}, innerWidget.option());
    const syncOptions = () => this._silent(optionsContainer, innerWidgetOptions);
    syncOptions();
    innerWidget.on('optionChanged', syncOptions);
  }
  _raiseValidation(value, previousValue) {
    const areValuesEmpty = !isDefined(value) && !isDefined(previousValue);
    if (value !== previousValue && !areValuesEmpty) {
      this.validationRequest.fire({
        value,
        editor: this
      });
    }
  }
  _raiseValueChangeAction(value, previousValue) {
    var _this$_valueChangeAct;
    (_this$_valueChangeAct = this._valueChangeAction) === null || _this$_valueChangeAct === void 0 || _this$_valueChangeAct.call(this, {
      element: this.$element(),
      previousValue,
      value,
      event: this._valueChangeEventInstance
    });
    this._valueChangeEventInstance = undefined;
  }
  _optionChanged(option) {
    const {
      name,
      previousValue,
      value
    } = option;
    if (name && this._getActionConfigs()[name] !== undefined) {
      this._addAction(name);
    }
    switch (name) {
      case 'value':
        this._raiseValidation(value, previousValue);
        this.option('isDirty', this._initialValue !== value);
        this._raiseValueChangeAction(value, previousValue);
        break;
      case 'onValueChanged':
        // @ts-expect-error
        this._valueChangeAction = this._createActionByOption('onValueChanged', {
          excludeValidators: ['disabled', 'readOnly']
        });
        break;
      case 'isValid':
      case 'validationError':
      case 'validationErrors':
      case 'validationStatus':
        // @ts-expect-error
        this.option(ValidationEngine.synchronizeValidationOptions(option, this.option()));
        break;
      default:
        break;
    }
    super._optionChanged(option);
  }
  clear() {
    const {
      value
    } = this._getDefaultOptions();
    this.option({
      value
    });
  }
  reset() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (arguments.length) {
      this._initialValue = value;
    }
    this.option('value', this._initialValue);
    this.option('isDirty', false);
    this.option('isValid', true);
  }
  _dispose() {
    super._dispose();
    data(this.element(), VALIDATION_TARGET, null);
    if (this.showValidationMessageTimeout) {
      clearTimeout(this.showValidationMessageTimeout);
    }
  }
}
// @ts-expect-error
const prevIsEditor = OldEditor.isEditor;
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const newIsEditor = instance => prevIsEditor(instance) || instance instanceof Editor;
// @ts-expect-error
Editor.isEditor = newIsEditor;
// @ts-expect-error
OldEditor.isEditor = newIsEditor;
