/**
* DevExtreme (esm/__internal/ui/html_editor/ui/aiDialog.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../../ui/drop_down_button';
import localizationMessage from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import LoadIndicator from '../../../../ui/load_indicator';
import SelectBox from '../../../../ui/select_box';
import TextArea from '../../../../ui/text_area';
import { isCompact } from '../../../../ui/themes';
import { currentTheme } from '../../../../viz/themes';
import { AI_DIALOG_ASKAI_COMMAND_NAME, AI_DIALOG_CUSTOM_COMMAND_NAME, buildAICommandParams, getAICommandName } from '../../../ui/html_editor/utils/ai';
import { AnimationType } from '../../../ui/m_load_indicator';
import { TEXTEDITOR_INPUT_CONTAINER_CLASS } from '../../../ui/text_box/m_text_editor.base';
import { isSmallScreen } from '../utils/small_screen';
import BaseDialog from './m_baseDialog';
export const AI_DIALOG_CLASS = 'dx-aidialog';
export const AI_DIALOG_CONTROLS_CLASS = 'dx-aidialog-controls';
export const AI_DIALOG_CONTENT_CLASS = 'dx-aidialog-content';
const AI_DIALOG_LOAD_INDICATOR_CLASS = 'dx-pending-indicator';
const AI_DIALOG_TITLE_CLASS = 'dx-aidialog-title';
const AI_DIALOG_TITLE_TEXT_CLASS = 'dx-aidialog-title-text';
const ICON_CLASS = 'dx-icon';
const ICON_SPARKLE_CLASS = 'dx-icon-sparkle';
const COPY_BUTTON_ICON = 'copy';
const TRY_AGAIN_BUTTON_ICON = 'restore';
const AI_DIALOG_COMMANDS_WITH_OPTIONS = ['translate', 'changeStyle', 'changeTone'];
const POPUP_MIN_WIDTH = 288;
const POPUP_MAX_WIDTH = 460;
export const TEXT_AREA_MIN_HEIGHT = 64;
export const TEXT_AREA_MAX_HEIGHT = 128;
export const REPLACE_DROPDOWN_WIDTH = 150;
export const ACTION_BUTTON_WIDTH = 110;
export const COMPACT_ACTION_BUTTON_WIDTH = 100;
function getActionButtonWidth() {
  return isCompact(currentTheme()) ? COMPACT_ACTION_BUTTON_WIDTH : ACTION_BUTTON_WIDTH;
}
var DialogState;
(function (DialogState) {
  DialogState["Initial"] = "initial";
  DialogState["Asking"] = "asking";
  DialogState["Generating"] = "generating";
  DialogState["ResultReady"] = "resultReady";
  DialogState["Error"] = "error";
})(DialogState || (DialogState = {}));
var ReplaceButtonActions;
(function (ReplaceButtonActions) {
  ReplaceButtonActions["Replace"] = "replace";
  ReplaceButtonActions["InsertAbove"] = "insertAbove";
  ReplaceButtonActions["InsertBelow"] = "insertBelow";
})(ReplaceButtonActions || (ReplaceButtonActions = {}));
export default class AIDialog extends BaseDialog {
  constructor($container, aiIntegration, popupConfig) {
    super($container, popupConfig);
    this._askAIPrompt = '';
    this._commandChangeSuppressed = false;
    this._commandsMap = {};
    this._dialogState = DialogState.Initial;
    this._isAICommandExecuting = false;
    this._isAskAICommandSelected = false;
    this._selectedText = '';
    this._aiIntegration = aiIntegration;
  }
  _getPopupConfig() {
    const baseConfig = super._getPopupConfig();
    return extend(true, {}, baseConfig, _extends({
      minWidth: POPUP_MIN_WIDTH,
      maxWidth: POPUP_MAX_WIDTH,
      height: 'auto',
      shading: true,
      shadingColor: 'transparent',
      dragEnabled: true,
      dragAndResizeArea: this._$container,
      toolbarItems: this._getToolbarItems(),
      hideOnOutsideClick: true,
      focusStateEnabled: true,
      showCloseButton: true,
      position: {
        my: 'center',
        at: 'center',
        of: this._$container
      }
    }, this._popupUserConfig));
  }
  _renderCommandSelectBox($container) {
    const $commandSelectBox = $('<div>').appendTo($container);
    this._commandSelectBox = new SelectBox($commandSelectBox.get(0), {
      value: this._currentCommand,
      displayExpr: 'text',
      valueExpr: 'name',
      onValueChanged: e => {
        var _this$_commandsMap$e$, _this$_commandOptions, _this$_commandsMap$e$2;
        if (this._commandChangeSuppressed) {
          return;
        }
        this._currentCommand = e.value;
        this._commandOptionsList = ((_this$_commandsMap$e$ = this._commandsMap[e.value]) === null || _this$_commandsMap$e$ === void 0 ? void 0 : _this$_commandsMap$e$.options) ?? [];
        this._currentOption = (_this$_commandOptions = this._commandOptionsList) === null || _this$_commandOptions === void 0 ? void 0 : _this$_commandOptions[0];
        this._isAskAICommandSelected = e.value === AI_DIALOG_ASKAI_COMMAND_NAME;
        this._askAIPrompt = '';
        this._getCustomCommandPrompt = (_this$_commandsMap$e$2 = this._commandsMap[e.value]) === null || _this$_commandsMap$e$2 === void 0 ? void 0 : _this$_commandsMap$e$2.prompt;
        this._setDialogState(this._getInitialDialogState());
        const shouldExecuteAICommand = !this._isAskAICommandSelected && this._isOpen();
        if (shouldExecuteAICommand) {
          this._executeAICommand();
        }
      }
    });
  }
  _renderOptionSelectBox($container) {
    var _this$_commandOptions2;
    const $optionSelectBox = $('<div>').appendTo($container);
    this._optionSelectBox = new SelectBox($optionSelectBox.get(0), {
      items: this._commandOptionsList,
      value: this._currentOption ?? ((_this$_commandOptions2 = this._commandOptionsList) === null || _this$_commandOptions2 === void 0 ? void 0 : _this$_commandOptions2[0]),
      visible: this._isCommandWithOptionsSelected(),
      onValueChanged: e => {
        this._currentOption = e.value;
        if (this._isOpen()) {
          this._executeAICommand();
        }
      }
    });
  }
  _renderPromptTextArea($container) {
    const $textArea = $('<div>').appendTo($container);
    this._promptTextArea = new TextArea($textArea.get(0), {
      value: this._askAIPrompt,
      minHeight: TEXT_AREA_MIN_HEIGHT,
      maxHeight: TEXT_AREA_MAX_HEIGHT,
      autoResizeEnabled: true,
      width: '100%',
      placeholder: localizationMessage.format('dxHtmlEditor-aiAskPlaceholder'),
      onValueChanged: e => {
        this._askAIPrompt = e.value;
      }
    });
  }
  _renderResultTextArea($container) {
    const $textArea = $('<div>').appendTo($container);
    const screenSpecificOptions = isSmallScreen() ? {
      maxHeight: '100%',
      height: '100%',
      autoResizeEnabled: false
    } : {
      maxHeight: TEXT_AREA_MAX_HEIGHT,
      autoResizeEnabled: true
    };
    this._resultTextArea = new TextArea($textArea.get(0), _extends({
      minHeight: TEXT_AREA_MIN_HEIGHT,
      width: '100%',
      readOnly: true
    }, screenSpecificOptions));
  }
  _renderContent($contentElem) {
    $contentElem.addClass(AI_DIALOG_CONTENT_CLASS);
    const $controls = $('<div>').addClass(AI_DIALOG_CONTROLS_CLASS).appendTo($contentElem);
    this._renderCommandSelectBox($controls);
    this._renderOptionSelectBox($controls);
    this._renderPromptTextArea($contentElem);
    this._renderResultTextArea($contentElem);
  }
  _renderLoadIndicator() {
    if (this._loadIndicator) {
      return;
    }
    const $inputContainer = this._resultTextArea.$element().find(`.${TEXTEDITOR_INPUT_CONTAINER_CLASS}`);
    const $indicatorElement = $('<div>').addClass(AI_DIALOG_LOAD_INDICATOR_CLASS).appendTo($inputContainer);
    const options = {
      _animationType: AnimationType.Sparkle,
      width: 64,
      height: 64
    };
    this._loadIndicator = new LoadIndicator($indicatorElement[0], options);
  }
  _getPopupClass() {
    return AI_DIALOG_CLASS;
  }
  _getTitleItem() {
    return {
      name: 'title',
      toolbar: 'top',
      location: 'before',
      template: (data, index, titleElement) => {
        const $titleContainer = $('<div>').addClass(AI_DIALOG_TITLE_CLASS);
        const $icon = $('<i>').addClass(`${ICON_CLASS} ${ICON_SPARKLE_CLASS}`);
        const $text = $('<span>').addClass(AI_DIALOG_TITLE_TEXT_CLASS).text(localizationMessage.format('dxHtmlEditor-aiDialogTitle'));
        $titleContainer.append($icon).append($text);
        $(titleElement).append($titleContainer);
      }
    };
  }
  _getReplaceButtonItem() {
    return {
      name: 'replace',
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxDropDownButton',
      locateInMenu: 'auto',
      options: {
        text: localizationMessage.format('dxHtmlEditor-aiReplace'),
        stylingMode: 'contained',
        type: 'default',
        splitButton: true,
        useSelectMode: false,
        items: [{
          id: ReplaceButtonActions.InsertAbove,
          text: localizationMessage.format('dxHtmlEditor-aiInsertAbove')
        }, {
          id: ReplaceButtonActions.InsertBelow,
          text: localizationMessage.format('dxHtmlEditor-aiInsertBelow')
        }],
        dropDownOptions: {
          width: REPLACE_DROPDOWN_WIDTH
        },
        onButtonClick: e => {
          this._replaceButtonAction(_extends({}, e, {
            itemData: {
              id: ReplaceButtonActions.Replace
            }
          }));
        },
        onItemClick: e => this._replaceButtonAction(e)
      }
    };
  }
  _getCopyButtonItem() {
    const text = isSmallScreen() ? undefined : localizationMessage.format('dxHtmlEditor-aiCopy');
    return {
      name: 'copy',
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'auto',
      options: {
        stylingMode: 'outlined',
        icon: COPY_BUTTON_ICON,
        text,
        onClick: () => {
          var _navigator;
          const {
            value
          } = this._resultTextArea.option();
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          (_navigator = navigator) === null || _navigator === void 0 || (_navigator = _navigator.clipboard) === null || _navigator === void 0 || _navigator.writeText(value ?? '');
        }
      }
    };
  }
  _getTryAgainButtonItem() {
    const text = isSmallScreen() ? undefined : localizationMessage.format('dxHtmlEditor-aiTryAgain');
    return {
      name: 'tryAgain',
      toolbar: 'bottom',
      location: 'before',
      widget: 'dxButton',
      options: {
        stylingMode: 'outlined',
        icon: TRY_AGAIN_BUTTON_ICON,
        text,
        onClick: () => this._retryExecuteAICommand()
      }
    };
  }
  _getGenerateButtonItem() {
    const width = getActionButtonWidth();
    return {
      name: 'generate',
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        type: 'default',
        text: localizationMessage.format('dxHtmlEditor-aiGenerate'),
        stylingMode: 'contained',
        width,
        onClick: () => this._executeAICommand()
      }
    };
  }
  _getStopButtonItem() {
    const width = getActionButtonWidth();
    return {
      name: 'stop',
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        type: 'default',
        stylingMode: 'contained',
        text: localizationMessage.format('dxHtmlEditor-aiStop'),
        width,
        onClick: () => this._stopAICommandExecution()
      }
    };
  }
  _getInitialToolbarItems() {
    return [this._getTryAgainButtonItem(), this._getCopyButtonItem(), this._getReplaceButtonItem()];
  }
  _getToolbarItems() {
    const items = [this._getTitleItem()];
    switch (this._dialogState) {
      case DialogState.Initial:
      case DialogState.ResultReady:
        items.push(...this._getInitialToolbarItems());
        break;
      case DialogState.Asking:
        items.push(this._getGenerateButtonItem());
        break;
      case DialogState.Generating:
        items.push(this._getStopButtonItem());
        break;
      case DialogState.Error:
        {
          if (this._isAskAICommandSelected) {
            items.push(this._getGenerateButtonItem());
          } else {
            items.push(...this._getInitialToolbarItems());
          }
          break;
        }
      default:
        break;
    }
    return items;
  }
  _setDialogState(newState) {
    this._dialogState = newState;
    this._syncDialogWithState();
  }
  _syncDialogWithState() {
    this._refreshCommandSelectBox();
    this._refreshOptionSelectBox();
    this._refreshTextAreas();
    this._refreshToolbarItems();
    this._refreshLoadIndicator();
  }
  _refreshToolbarItems() {
    this._popup.option('toolbarItems', this._getToolbarItems());
  }
  _retryExecuteAICommand() {
    this._updateResults();
    this._executeAICommand();
  }
  _getAICommandParams(uiCommand) {
    const {
      _askAIPrompt: askAIPrompt,
      _currentOption: option,
      _getCustomCommandPrompt: getCustomPrompt,
      _selectedText: text
    } = this;
    const uiCommandName = this._commandsMap[uiCommand].name;
    const params = buildAICommandParams(uiCommandName, askAIPrompt, option, getCustomPrompt, text);
    return params;
  }
  _updateResults() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    this._resultTextArea.option({
      value
    });
  }
  _processCommandCompletion(dialogState) {
    this._abort = undefined;
    this._isAICommandExecuting = false;
    this._setDialogState(dialogState);
  }
  _getAICommandCallbacks() {
    const callbacks = {
      onComplete: finalResponse => {
        this._updateResults(String(finalResponse));
        this._processCommandCompletion(DialogState.ResultReady);
      },
      onError: () => {
        this._processCommandCompletion(DialogState.Error);
      }
    };
    return callbacks;
  }
  _executeAICommand() {
    var _this$_commandsMap$ui;
    const {
      _currentCommand: uiCommand
    } = this;
    const aiCommandName = uiCommand && getAICommandName((_this$_commandsMap$ui = this._commandsMap[uiCommand]) === null || _this$_commandsMap$ui === void 0 ? void 0 : _this$_commandsMap$ui.name);
    if (!(aiCommandName && this._aiIntegration[aiCommandName])) {
      return;
    }
    const callbacks = this._getAICommandCallbacks();
    const params = this._getAICommandParams(uiCommand);
    this._isAICommandExecuting = true;
    this._setDialogState(DialogState.Generating);
    const abort = this._aiIntegration[aiCommandName](params, callbacks);
    this._abort = abort;
  }
  _stopAICommandExecution() {
    var _this$_abort;
    (_this$_abort = this._abort) === null || _this$_abort === void 0 || _this$_abort.call(this);
    this._processCommandCompletion(this._getInitialDialogState());
  }
  _isCommandWithOptionsSelected() {
    var _this$_commandsMap$th;
    if (this._currentCommand && ((_this$_commandsMap$th = this._commandsMap[this._currentCommand]) === null || _this$_commandsMap$th === void 0 ? void 0 : _this$_commandsMap$th.name) === AI_DIALOG_CUSTOM_COMMAND_NAME) {
      var _this$_commandOptions3;
      return Boolean((_this$_commandOptions3 = this._commandOptionsList) === null || _this$_commandOptions3 === void 0 ? void 0 : _this$_commandOptions3.length);
    }
    return AI_DIALOG_COMMANDS_WITH_OPTIONS.includes(this._currentCommand ?? '');
  }
  _refreshCommandSelectBox() {
    const commandsList = Object.entries(this._commandsMap).map(_ref => {
      let [name, config] = _ref;
      return {
        name,
        text: config.text
      };
    });
    this._commandChangeSuppressed = true;
    this._commandSelectBox.option({
      disabled: this._isAICommandExecuting,
      dataSource: commandsList,
      value: this._currentCommand
    });
    this._commandChangeSuppressed = false;
  }
  _refreshOptionSelectBox() {
    var _this$_commandOptions4;
    const hasOptions = this._isCommandWithOptionsSelected();
    this._optionSelectBox.option({
      disabled: this._isAICommandExecuting,
      visible: hasOptions,
      items: this._commandOptionsList ?? [],
      value: this._currentOption ?? ((_this$_commandOptions4 = this._commandOptionsList) === null || _this$_commandOptions4 === void 0 ? void 0 : _this$_commandOptions4[0])
    });
  }
  _setTextAreasInitialState() {
    this._promptTextArea.option({
      disabled: true,
      readOnly: false,
      value: undefined,
      visible: false
    });
    this._resultTextArea.option({
      disabled: false,
      readOnly: true,
      value: undefined,
      visible: true
    });
  }
  _setTextAreasAskingState() {
    this._promptTextArea.option({
      disabled: false,
      readOnly: false,
      value: this._askAIPrompt,
      visible: true
    });
    this._resultTextArea.option({
      disabled: true,
      readOnly: false,
      value: undefined,
      visible: false
    });
  }
  _refreshTextAreas() {
    switch (this._dialogState) {
      case DialogState.Initial:
        this._setTextAreasInitialState();
        break;
      case DialogState.Asking:
        this._setTextAreasAskingState();
        break;
      case DialogState.Generating:
        this._promptTextArea.option({
          disabled: true,
          readOnly: false,
          value: this._askAIPrompt,
          visible: this._isAskAICommandSelected
        });
        this._resultTextArea.option({
          disabled: true,
          readOnly: false,
          value: undefined,
          visible: true
        });
        break;
      case DialogState.ResultReady:
        this._promptTextArea.option({
          disabled: !this._isAskAICommandSelected,
          readOnly: true,
          value: this._askAIPrompt,
          visible: this._isAskAICommandSelected
        });
        this._resultTextArea.option({
          disabled: false,
          readOnly: true,
          visible: true
        });
        break;
      case DialogState.Error:
        {
          if (this._isAskAICommandSelected) {
            this._setTextAreasAskingState();
          } else {
            this._setTextAreasInitialState();
          }
          break;
        }
      default:
        break;
    }
  }
  _refreshLoadIndicator() {
    if (this._dialogState === DialogState.Generating) {
      this._renderLoadIndicator();
    } else {
      this._disposeLoadIndicator();
    }
  }
  _getInitialDialogState() {
    return this._isAskAICommandSelected ? DialogState.Asking : DialogState.Initial;
  }
  _replaceButtonAction(event) {
    const {
      value
    } = this._resultTextArea.option();
    this.hide(value ?? '', event);
  }
  _disposeLoadIndicator() {
    if (!this._loadIndicator) {
      return;
    }
    this._loadIndicator.dispose();
    this._loadIndicator.$element().remove();
    this._loadIndicator = undefined;
  }
  _isOpen() {
    const {
      visible
    } = this._popup.option();
    return visible;
  }
  updateAIIntegration(aiIntegration) {
    var _this$_abort2;
    (_this$_abort2 = this._abort) === null || _this$_abort2 === void 0 || _this$_abort2.call(this);
    this._processCommandCompletion(this._getInitialDialogState());
    this._aiIntegration = aiIntegration;
    this._executeAICommand();
  }
  show(payload) {
    var _commandsMap$currentC;
    const {
      currentCommand,
      currentCommandOption,
      commandsMap,
      text,
      prompt
    } = payload;
    this._commandsMap = commandsMap;
    this._currentCommand = currentCommand;
    this._selectedText = text ?? '';
    this._commandOptionsList = ((_commandsMap$currentC = commandsMap[currentCommand]) === null || _commandsMap$currentC === void 0 ? void 0 : _commandsMap$currentC.options) ?? [];
    this._currentOption = currentCommandOption;
    this._getCustomCommandPrompt = prompt;
    this._isAskAICommandSelected = currentCommand === AI_DIALOG_ASKAI_COMMAND_NAME;
    this._askAIPrompt = '';
    this._setDialogState(this._getInitialDialogState());
    if (!this._isAskAICommandSelected) {
      this._executeAICommand();
    }
    return super.show();
  }
  hide(resultText, event) {
    var _this$deferred, _this$_abort3;
    (_this$deferred = this.deferred) === null || _this$deferred === void 0 || _this$deferred.resolve({
      resultText,
      event
    });
    (_this$_abort3 = this._abort) === null || _this$_abort3 === void 0 || _this$_abort3.call(this);
    this._processCommandCompletion(this._getInitialDialogState());
    super.hide();
  }
}
