/**
* DevExtreme (esm/__internal/grids/grid_core/ai_prompt_editor/ai_prompt_editor.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import Popup from '../../../../ui/popup';
import ProgressBar from '../../../../ui/progress_bar';
import TextArea from '../../../../ui/text_area';
import { APPLY_BUTTON_INDEX, CLASSES, DEFAULT_POPUP_OPTIONS, REGENERATE_DATA_BUTTON_INDEX, STOP_BUTTON_INDEX } from './const';
import { getPrompt, isPromptChanged } from './utils';
export class AIPromptEditor {
  constructor(options) {
    this.options = options;
    this.currentAction = null;
    const {
      container,
      createComponent
    } = options;
    container.addClass(CLASSES.aiPromptEditor);
    this.prompt = getPrompt(options.prompt);
    this.popupInstance = createComponent(container, Popup, this.getPopupConfig());
  }
  updateButtonOption(buttonIndex, optionName, optionValue) {
    this.popupInstance.option(`toolbarItems[${buttonIndex}].options.${optionName}`, optionValue);
  }
  updateToolbarItemVisibility(itemIndex, visible) {
    this.popupInstance.option(`toolbarItems[${itemIndex}].visible`, visible);
  }
  getTextAreaConfig() {
    return Object.assign({
      value: this.prompt,
      height: 110,
      stylingMode: 'outlined',
      onValueChanged: e => {
        this.updateButtonOption(APPLY_BUTTON_INDEX, 'disabled', !e.value || e.value === this.prompt); // Update the disable state of the Apply button
        this.updateButtonOption(REGENERATE_DATA_BUTTON_INDEX, 'disabled', !e.value || e.value !== this.prompt); // Update the disable state of the Regenerate Data button
      },
      placeholder: messageLocalization.format('dxDataGrid-aiPromptEditorPlaceholder'),
      valueChangeEvent: 'input change keyup'
    }, this.options.editorOptions);
  }
  getPopupConfig() {
    return Object.assign({}, DEFAULT_POPUP_OPTIONS, {
      shading: false,
      shadingColor: 'transparent',
      dragEnabled: true,
      hideOnOutsideClick: true,
      showCloseButton: true,
      title: messageLocalization.format('dxDataGrid-aiPromptEditorTitle'),
      wrapperAttr: {
        class: `${CLASSES.aiPromptEditor} ${CLASSES.aiDialog}`
      },
      contentTemplate: $container => {
        const $editorContainer = $('<div>').addClass(CLASSES.aiPromptEditorTextArea).appendTo($container);
        const $progressContainer = $('<div>').addClass(CLASSES.aiPromptEditorProgressBar).appendTo($container);
        this.editorInstance = this.options.createComponent($editorContainer, TextArea, this.getTextAreaConfig());
        this.progressBar = this.options.createComponent($progressContainer, ProgressBar, {
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
      text: messageLocalization.format('dxDataGrid-aiPromptEditorApplyButton'),
      disabled: !this.editorInstance || !isPromptChanged(this.prompt, this.editorInstance.option('value')),
      elementAttr: {
        class: CLASSES.aiPromptEditorApplyButton
      },
      onClick: this.options.onSubmit
    };
  }
  getRegenerateDataButtonConfig() {
    return {
      icon: 'refresh',
      stylingMode: 'outlined',
      text: messageLocalization.format('dxDataGrid-aiPromptEditorRegenerateButton'),
      disabled: !this.prompt,
      elementAttr: {
        class: CLASSES.aiPromptEditorRefreshButton
      },
      onClick: this.options.onRefresh
    };
  }
  getStopButtonConfig() {
    return {
      type: 'default',
      icon: 'square',
      stylingMode: 'contained',
      text: messageLocalization.format('dxDataGrid-aiPromptEditorStopButton'),
      elementAttr: {
        class: CLASSES.aiPromptEditorStopButton
      },
      onClick: this.options.onStop
    };
  }
  setPrompt(prompt) {
    this.prompt = getPrompt(prompt);
  }
  toggleDisableState(disabled) {
    const editorValue = this.getEditorValue();
    this.updateButtonOption(REGENERATE_DATA_BUTTON_INDEX, 'disabled', disabled ? true : isPromptChanged(this.prompt, editorValue)); // Update the disable state of the Regenerate data button
    this.updateButtonOption(APPLY_BUTTON_INDEX, 'disabled', disabled ? true : !isPromptChanged(this.prompt, editorValue)); // Update the disable state of the Apply button
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
    this.updateToolbarItemVisibility(APPLY_BUTTON_INDEX, visible); // Update Apply button visibility
    this.updateToolbarItemVisibility(STOP_BUTTON_INDEX, !visible); // Update Stop button visibility
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
    this.currentAction = action;
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
    this.updatePrompt(getPrompt(options.prompt));
    this.popupInstance.option(this.getPopupConfig());
  }
  isApplying() {
    return this.currentAction === 'apply';
  }
}
