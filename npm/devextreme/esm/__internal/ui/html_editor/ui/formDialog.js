/**
* DevExtreme (esm/__internal/ui/html_editor/ui/formDialog.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import localizationMessage from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import Form from '../../../../ui/form';
import { current, isFluent, isMaterialBased } from '../../../../ui/themes';
import BaseDialog from './m_baseDialog';
const FORM_CLASS = 'dx-formdialog-form';
const FORM_DIALOG_CLASS = 'dx-formdialog';
const getApplyButtonConfig = () => {
  if (isFluent(current())) {
    return {
      stylingMode: 'contained',
      type: 'default'
    };
  }
  return {};
};
const getCancelButtonConfig = () => {
  if (isFluent(current())) {
    return {
      stylingMode: 'outlined',
      type: 'normal'
    };
  }
  return {};
};
export default class FormDialog extends BaseDialog {
  constructor($container, popupConfig) {
    super($container, popupConfig);
    this._attachOptionChangedHandler();
  }
  _attachOptionChangedHandler() {
    var _this$_popup;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.on('optionChanged', _ref => {
      let {
        name,
        value
      } = _ref;
      if (name === 'title') {
        this._onTitleChanged(value);
      }
    });
  }
  _getPopupConfig() {
    const baseConfig = super._getPopupConfig();
    return extend(true, {}, baseConfig, _extends({
      showCloseButton: false,
      onInitialized: e => {
        this._popup = e.component;
        this._popup.on('hiding', () => this.onHiding());
        this._popup.on('shown', () => {
          this._form.focus();
        });
        this._addEscapeHandler.bind(this);
      },
      toolbarItems: [{
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: _extends({
          onInitialized: this._addEscapeHandler.bind(this),
          text: localizationMessage.format('OK'),
          onClick: e => {
            this.callAddButtonAction(e.event);
          }
        }, getApplyButtonConfig())
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: _extends({
          onInitialized: this._addEscapeHandler.bind(this),
          text: localizationMessage.format('Cancel'),
          onClick: () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this._popup.hide();
          }
        }, getCancelButtonConfig())
      }]
    }, this._popupConfig));
  }
  _renderContent($contentElem) {
    const $formContainer = $('<div>').appendTo($contentElem);
    this._renderForm($formContainer, {
      onEditorEnterKey: e => {
        // @ts-expect-error 'event' does not exist in EditorEnterKeyEvent
        this.callAddButtonAction(e.event);
      },
      customizeItem: item => {
        if (item.itemType === 'simple') {
          item.editorOptions = extend(true, {}, item.editorOptions, {
            onInitialized: this._addEscapeHandler.bind(this)
          });
        }
      }
    });
    this._updateFormLabel();
  }
  _getPopupClass() {
    return FORM_DIALOG_CLASS;
  }
  _onTitleChanged(value) {
    this._updateFormLabel(value);
  }
  _renderForm($container, options) {
    $container.addClass(FORM_CLASS);
    this._form = new Form($container.get(0), options);
    this._updateFormLabel();
  }
  _updateFormLabel(text) {
    var _this$_form;
    const label = text ?? this.popupOption('title');
    (_this$_form = this._form) === null || _this$_form === void 0 || _this$_form.$element().attr('aria-label', label);
  }
  _getDefaultFormOptions() {
    return {
      colCount: 1,
      width: 'auto',
      labelLocation: isMaterialBased(current()) ? 'top' : 'left'
    };
  }
  callAddButtonAction(event) {
    if (this.beforeAddButtonAction && !this.beforeAddButtonAction()) {
      return;
    }
    const formData = this._form.option('formData');
    this.hide(formData, event);
  }
  show(formUserConfig) {
    const formConfig = extend(this._getDefaultFormOptions(), formUserConfig);
    this._form.option(formConfig);
    return super.show();
  }
  hide(formData, event) {
    var _this$deferred;
    (_this$deferred = this.deferred) === null || _this$deferred === void 0 || _this$deferred.resolve(formData, event);
    super.hide();
  }
  onHiding() {
    this.beforeAddButtonAction = undefined;
    super.onHiding();
  }
  formOption() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // @ts-expect-error args
    // eslint-disable-next-line prefer-spread
    return this._form.option.apply(this._form, args);
  }
}
