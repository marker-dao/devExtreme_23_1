import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../../common/core/localization/message';
import devices from '../../../../core/devices';
import $ from '../../../../core/renderer';
import { getOuterHeight } from '../../../../core/utils/size';
import Toolbar from '../../../../ui/toolbar';
import { CHAT_MESSAGEBOX_BUTTON_CLASS } from '../../../ui/chat/message_box/message_box';
import TextArea from '../../../ui/m_text_area';
const TEXT_AREA_TOOLBAR = 'dx-textarea-toolbar';
const TEXT_AREA_WITH_TOOLBAR = 'dx-textarea-with-toolbar';
const isMobile = () => devices.current().deviceType !== 'desktop';
class TextAreaOnSteroids extends TextArea {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      stylingMode: 'outlined',
      placeholder: messageLocalization.format('dxChat-textareaPlaceholder'),
      autoResizeEnabled: true,
      valueChangeEvent: 'input',
      maxHeight: '8em'
    });
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      enter: e => {
        if (!(e !== null && e !== void 0 && e.shiftKey) && this._isValuableTextEntered() && !isMobile()) {
          e.preventDefault();
          this._processSendPress(e);
        }
      }
    });
  }
  _init() {
    super._init();
    this._createSendAction();
  }
  _createSendAction() {
    this._sendAction = this._createActionByOption('onSend', {
      excludeValidators: ['disabled']
    });
  }
  _initMarkup() {
    this.$element().addClass(TEXT_AREA_WITH_TOOLBAR);
    super._initMarkup();
    this._renderToolbar();
  }
  _renderToolbar() {
    const toolbarItems = this._getToolbarItems();
    const toolbarOptions = {
      items: toolbarItems
    };
    this._$toolbar = $('<div>').addClass(TEXT_AREA_TOOLBAR).appendTo(this.$element());
    this._toolbar = this._createComponent(this._$toolbar, Toolbar, toolbarOptions);
  }
  _getToolbarItems() {
    const items = [...(this._getDefaultBeforeToolbarItems() ?? []), ...(this._getDefaultAfterToolbarItems() ?? [])];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items;
  }
  _getDefaultBeforeToolbarItems() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const items = [{
      widget: 'dxButton',
      location: 'before',
      options: {
        activeStateEnabled,
        focusStateEnabled,
        hoverStateEnabled,
        icon: 'attach',
        onClick: () => {
          // eslint-disable-next-line no-alert
          alert('FileUpploader integration');
        }
      }
    }];
    return items;
  }
  _getDefaultAfterToolbarItems() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
      /** Filter items if unavailable */
      // speechToTextEnabled,
      // attachmentsEnabled,
    } = this.option();
    const items = [{
      widget: 'dxSpeechToText',
      location: 'after',
      options: {
        activeStateEnabled,
        focusStateEnabled,
        hoverStateEnabled,
        stylingMode: 'text'
      }
    }, {
      widget: 'dxButton',
      location: 'after',
      options: {
        activeStateEnabled,
        focusStateEnabled,
        hoverStateEnabled,
        icon: 'arrowright',
        type: 'default',
        stylingMode: 'contained',
        disabled: true,
        elementAttr: {
          class: CHAT_MESSAGEBOX_BUTTON_CLASS,
          'aria-label': messageLocalization.format('dxChat-sendButtonAriaLabel')
        },
        onClick: e => {
          this._processSendPress(e);
        },
        onInitialized: e => {
          this._sendButton = e.component;
        }
      }
    }];
    return items;
  }
  _toggleButtonDisableState(state) {
    var _this$_sendButton;
    (_this$_sendButton = this._sendButton) === null || _this$_sendButton === void 0 || _this$_sendButton.option('disabled', state);
  }
  _renderButtonContainers() {}
  _getHeightDifference($input) {
    const superResult = super._getHeightDifference($input);
    const toolbarHeight = getOuterHeight(this._$toolbar);
    const sum = superResult + toolbarHeight;
    return sum;
  }
  /** Trigger of onInput-action */
  _keyPressHandler(e) {
    super._keyPressHandler(e);
    const shouldButtonBeDisabled = !this._isValuableTextEntered();
    this._toggleButtonDisableState(shouldButtonBeDisabled);
  }
  _processSendPress(e) {
    var _this$_sendAction;
    (_this$_sendAction = this._sendAction) === null || _this$_sendAction === void 0 || _this$_sendAction.call(this, e);
    this.reset();
    this._toggleButtonDisableState(true);
  }
  _optionChanged(args) {
    var _this$_sendButton2;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        (_this$_sendButton2 = this._sendButton) === null || _this$_sendButton2 === void 0 || _this$_sendButton2.option(name, value);
        break;
      case 'text':
        {
          const shouldButtonBeDisabled = !this._isValuableTextEntered();
          this._toggleButtonDisableState(shouldButtonBeDisabled);
          break;
        }
      case 'onSend':
        this._createSendAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _isValuableTextEntered() {
    const {
      text
    } = this.option();
    return Boolean(text === null || text === void 0 ? void 0 : text.trim());
  }
  isValuableTextEntered() {
    return this._isValuableTextEntered();
  }
  _dispose() {
    var _this$_toolbar, _this$_$toolbar;
    (_this$_toolbar = this._toolbar) === null || _this$_toolbar === void 0 || _this$_toolbar.dispose();
    (_this$_$toolbar = this._$toolbar) === null || _this$_$toolbar === void 0 || _this$_$toolbar.remove();
    this._toolbar = null;
    this._$toolbar = null;
    super._dispose();
  }
}
export default TextAreaOnSteroids;