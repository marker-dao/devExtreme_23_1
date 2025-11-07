/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/ai_prompt_editor/ai_prompt_editor.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AIPromptEditor = void 0;
var _message = _interopRequireDefault(require("../../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _popup = _interopRequireDefault(require("../../../../../ui/popup"));
var _progress_bar = _interopRequireDefault(require("../../../../../ui/progress_bar"));
var _text_area = _interopRequireDefault(require("../../../../../ui/text_area"));
var _const = require("./const");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class AIPromptEditor {
  constructor(options) {
    this.options = options;
    const {
      container,
      createComponent
    } = options;
    container.addClass(_const.CLASSES.aiPromptEditor);
    this.prompt = (0, _utils.getPrompt)(options.prompt);
    this.popupInstance = createComponent(container, _popup.default, this.getPopupConfig());
  }
  updateButtonOption(buttonIndex, optionName, optionValue) {
    this.popupInstance.option(`toolbarItems[${buttonIndex}].options.${optionName}`, optionValue);
  }
  updateToolbarItemVisibility(itemIndex, visible) {
    this.popupInstance.option(`toolbarItems[${itemIndex}].visible`, visible);
  }
  getTextAreaConfig() {
    return _extends({
      value: this.prompt,
      height: 110,
      stylingMode: 'outlined',
      onValueChanged: e => {
        this.updateButtonOption(_const.APPLY_BUTTON_INDEX, 'disabled', !e.value); // Update the disable state of the Apply button
        this.updateButtonOption(_const.REGENERATE_DATA_BUTTON_INDEX, 'disabled', true); // Update the disable state of the Regenerate Data button
      },
      placeholder: _message.default.format('dxDataGrid-aiPromptEditorPlaceholder'),
      valueChangeEvent: 'input change keyup'
    }, this.options.editorOptions);
  }
  getPopupConfig() {
    return _extends({}, _const.DEFAULT_POPUP_OPTIONS, {
      shading: false,
      shadingColor: 'transparent',
      dragEnabled: true,
      hideOnOutsideClick: true,
      showCloseButton: true,
      title: _message.default.format('dxDataGrid-aiPromptEditorTitle'),
      wrapperAttr: {
        class: `${_const.CLASSES.aiPromptEditor} ${_const.CLASSES.aiDialog}`
      },
      contentTemplate: $container => {
        const $editorContainer = (0, _renderer.default)('<div>').addClass(_const.CLASSES.aiPromptEditorTextArea).appendTo($container);
        const $progressContainer = (0, _renderer.default)('<div>').addClass(_const.CLASSES.aiPromptEditorProgressBar).appendTo($container);
        this.editorInstance = this.options.createComponent($editorContainer, _text_area.default, this.getTextAreaConfig());
        this.progressBar = this.options.createComponent($progressContainer, _progress_bar.default, {
          value: false,
          visible: false,
          showStatus: false,
          width: '100%'
        });
      },
      toolbarItems: [{
        toolbar: 'bottom',
        location: 'before',
        widget: 'dxButton',
        options: this.getRegenerateDataButtonConfig()
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: this.getApplyButtonConfig()
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        visible: false,
        options: this.getStopButtonConfig()
      }]
    }, this.options.popupOptions);
  }
  getApplyButtonConfig() {
    return {
      type: 'default',
      icon: 'arrowright',
      stylingMode: 'contained',
      text: _message.default.format('dxDataGrid-aiPromptEditorApplyButton'),
      disabled: !this.editorInstance || !(0, _utils.isPromptChanged)(this.prompt, this.editorInstance.option('value')),
      elementAttr: {
        class: _const.CLASSES.aiPromptEditorApplyButton
      },
      onClick: this.options.onSubmit
    };
  }
  getRegenerateDataButtonConfig() {
    return {
      icon: 'refresh',
      stylingMode: 'outlined',
      text: _message.default.format('dxDataGrid-aiPromptEditorRegenerateButton'),
      disabled: !this.prompt,
      elementAttr: {
        class: _const.CLASSES.aiPromptEditorRefreshButton
      },
      onClick: this.options.onRefresh
    };
  }
  getStopButtonConfig() {
    return {
      type: 'default',
      icon: 'square',
      stylingMode: 'contained',
      text: _message.default.format('dxDataGrid-aiPromptEditorStopButton'),
      elementAttr: {
        class: _const.CLASSES.aiPromptEditorStopButton
      },
      onClick: this.options.onStop
    };
  }
  setPrompt(prompt) {
    this.prompt = (0, _utils.getPrompt)(prompt);
  }
  toggleDisableState(disabled) {
    const editorValue = this.getEditorValue();
    this.updateButtonOption(_const.REGENERATE_DATA_BUTTON_INDEX, 'disabled', disabled ? true : (0, _utils.isPromptChanged)(this.prompt, editorValue)); // Update the disable state of the Regenerate data button
    this.updateButtonOption(_const.APPLY_BUTTON_INDEX, 'disabled', disabled ? true : !(0, _utils.isPromptChanged)(this.prompt, editorValue)); // Update the disable state of the Apply button
    this.editorInstance.option('disabled', disabled); // Update TextArea disable state
    this.popupInstance.option('shading', disabled);
    this.popupInstance.option('hideOnOutsideClick', !disabled);
  }
  getEditorValue() {
    return this.editorInstance.option('value');
  }
  show() {
    return this.popupInstance.show();
  }
  hide() {
    return this.popupInstance.hide();
  }
  isVisible() {
    return this.popupInstance.option('visible') === true;
  }
  toggleApplyButtonVisibility(visible) {
    this.updateToolbarItemVisibility(_const.APPLY_BUTTON_INDEX, visible); // Update Apply button visibility
    this.updateToolbarItemVisibility(_const.STOP_BUTTON_INDEX, !visible); // Update Stop button visibility
  }
  setLoading(isLoading) {
    this.progressBar.option('visible', isLoading);
  }
  updatePrompt(prompt) {
    this.setPrompt(prompt);
    this.editorInstance.option('value', prompt);
  }
  /**
   * Updates the component state based on the current action
   * @param action - The current action being performed
   */
  updateStateOnAction(action) {
    // eslint-disable-next-line default-case
    switch (action) {
      case 'apply':
      case 'regenerate':
        this.setLoading(true);
        this.toggleDisableState(true);
        this.toggleApplyButtonVisibility(false);
        break;
      case 'stop':
        this.setLoading(false);
        this.toggleDisableState(false);
        this.toggleApplyButtonVisibility(true);
        break;
    }
  }
  updateOptions(options) {
    this.options = options;
    this.updatePrompt((0, _utils.getPrompt)(options.prompt));
    this.popupInstance.option(this.getPopupConfig());
  }
}
exports.AIPromptEditor = AIPromptEditor;
