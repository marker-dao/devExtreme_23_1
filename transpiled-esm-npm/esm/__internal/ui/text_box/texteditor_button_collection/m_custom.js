import { name as clickEventName } from '../../../../common/core/events/click';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { end, start } from '../../../../common/core/events/hover';
import $ from '../../../../core/renderer';
import Button from '../../../../ui/button';
import TextEditorButton, { isButtonInstance } from './m_button';
const CUSTOM_BUTTON_HOVERED_CLASS = 'dx-custom-button-hovered';
export default class CustomButton extends TextEditorButton {
  _attachEvents(instance, $element) {
    eventsEngine.on($element, start, () => {
      var _this$editor;
      (_this$editor = this.editor) === null || _this$editor === void 0 || _this$editor.$element().addClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    eventsEngine.on($element, end, () => {
      var _this$editor2;
      (_this$editor2 = this.editor) === null || _this$editor2 === void 0 || _this$editor2.$element().removeClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    eventsEngine.on($element, clickEventName, e => {
      e.stopPropagation();
    });
  }
  _create() {
    const {
      editor
    } = this;
    if (!editor) {
      return undefined;
    }
    const $element = $('<div>');
    this._addToContainer($element);
    const instance = editor._createComponent($element, Button, Object.assign({}, this.options, {
      // @ts-expect-error ignoreParentReadOnly is private
      ignoreParentReadOnly: true,
      disabled: this._isDisabled(),
      integrationOptions: this._prepareIntegrationOptions(editor)
    }));
    return {
      instance,
      $element
    };
  }
  // eslint-disable-next-line class-methods-use-this
  _prepareIntegrationOptions(editor) {
    return Object.assign({}, editor.option('integrationOptions'), {
      skipTemplates: ['content']
    });
  }
  update() {
    const isUpdated = super.update();
    if (isButtonInstance(this.instance)) {
      this.instance.option('disabled', this._isDisabled());
    }
    return isUpdated;
  }
  _isVisible() {
    var _this$editor3;
    const {
      visible
    } = ((_this$editor3 = this.editor) === null || _this$editor3 === void 0 ? void 0 : _this$editor3.option()) ?? {};
    return !!visible;
  }
  _isDisabled() {
    var _this$editor4;
    const isDefinedByUser = this.options.disabled !== undefined;
    if (isDefinedByUser) {
      if (isButtonInstance(this.instance)) {
        return this.instance.option('disabled');
      }
      return this.options.disabled;
    }
    const {
      readOnly
    } = ((_this$editor4 = this.editor) === null || _this$editor4 === void 0 ? void 0 : _this$editor4.option()) ?? {};
    return readOnly;
  }
}