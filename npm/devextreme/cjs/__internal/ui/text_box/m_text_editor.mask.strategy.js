/**
* DevExtreme (cjs/__internal/ui/text_box/m_text_editor.mask.strategy.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _browser = _interopRequireDefault(require("../../../core/utils/browser"));
var _dom = require("../../../core/utils/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MASK_EVENT_NAMESPACE = 'dxMask';
const BLUR_EVENT = 'blur beforedeactivate';
const EMPTY_CHAR = ' ';
const DELETE_INPUT_TYPES = ['deleteContentBackward', 'deleteSoftLineBackward', 'deleteContent', 'deleteHardLineBackward'];
const HISTORY_INPUT_TYPES = ['historyUndo', 'historyRedo'];
const EVENT_NAMES = ['focusIn', 'focusOut', 'input', 'paste', 'cut', 'drop', 'beforeInput'];
function getEmptyString(length) {
  return EMPTY_CHAR.repeat(length);
}
class MaskStrategy {
  constructor(editor) {
    this.editor = editor;
  }
  _editorOption() {
    return this.editor.option(...arguments);
  }
  _editorInput() {
    return this.editor._input();
  }
  _editorCaret(newCaret) {
    if (!newCaret) {
      return this.editor._caret();
    }
    this.editor._caret(newCaret);
  }
  _attachChangeEventHandler() {
    // @ts-expect-error
    if (!this._editorOption('valueChangeEvent').split(' ').includes('change')) {
      return;
    }
    const $input = this._editorInput();
    const namespace = (0, _index.addNamespace)(BLUR_EVENT, MASK_EVENT_NAMESPACE);
    _events_engine.default.on($input, namespace, e => {
      this.editor._changeHandler(e);
    });
  }
  _beforeInputHandler() {
    // @ts-expect-error
    this._previousText = this._editorOption('text');
    this._prevCaret = this._editorCaret();
  }
  _inputHandler(event) {
    const {
      originalEvent
    } = event;
    if (!originalEvent) {
      return;
    }
    const {
      inputType
    } = originalEvent;
    if (HISTORY_INPUT_TYPES.includes(inputType)) {
      this._handleHistoryInputEvent();
    } else if (DELETE_INPUT_TYPES.includes(inputType)) {
      this._handleBackwardDeleteInputEvent();
    } else {
      const currentCaret = this._editorCaret();
      if (!currentCaret.end) {
        return;
      }
      this._clearSelectedText();
      this._autoFillHandler(originalEvent);
      this._editorCaret(currentCaret);
      this._handleInsertTextInputEvent(originalEvent.data);
    }
    // @ts-expect-error
    if (this._editorOption('text') === this._previousText) {
      event.stopImmediatePropagation();
    }
  }
  _handleHistoryInputEvent() {
    const caret = this._editorCaret();
    this._updateEditorMask({
      start: caret.start,
      length: caret.end - caret.start,
      text: ''
    });
    this._editorCaret(this._prevCaret);
  }
  _handleBackwardDeleteInputEvent() {
    this._clearSelectedText(true);
    const caret = this._editorCaret();
    this.editor.setForwardDirection();
    this.editor._adjustCaret();
    const adjustedForwardCaret = this._editorCaret();
    if (adjustedForwardCaret.start !== caret.start) {
      this.editor.setBackwardDirection();
      this.editor._adjustCaret();
    }
  }
  _clearSelectedText(isDeleteInputEvent) {
    const selectionLength = this._prevCaret && this._prevCaret.end - this._prevCaret.start;
    const length = selectionLength || Number(isDeleteInputEvent);
    const caret = this._editorCaret();
    if (!this._isAutoFill()) {
      this.editor.setBackwardDirection();
      this._updateEditorMask({
        start: caret.start,
        length,
        text: getEmptyString(length)
      });
    }
  }
  _handleInsertTextInputEvent(data) {
    var _this$_prevCaret;
    // NOTE: data has length > 1 when autosuggestion is applied.
    const text = data ?? '';
    this.editor.setForwardDirection();
    const hasValidChars = this._updateEditorMask({
      start: ((_this$_prevCaret = this._prevCaret) === null || _this$_prevCaret === void 0 ? void 0 : _this$_prevCaret.start) ?? 0,
      length: text.length || 1,
      text
    });
    if (!hasValidChars) {
      this._editorCaret(this._prevCaret);
    }
  }
  _updateEditorMask(args) {
    const textLength = args.text.length;
    const processedCharsCount = this.editor._handleChain(args);
    this.editor._displayMask();
    if (this.editor.isForwardDirection()) {
      const {
        start,
        end
      } = this._editorCaret();
      const correction = processedCharsCount - textLength;
      const hasSkippedStub = processedCharsCount > 1;
      if (hasSkippedStub && textLength === 1) {
        this._editorCaret({
          start: start + correction,
          end: end + correction
        });
      }
      this.editor._adjustCaret();
    }
    return !!processedCharsCount;
  }
  _focusInHandler() {
    this.editor._showMaskPlaceholder();
    this.editor.setForwardDirection();
    // @ts-expect-error
    if (!this.editor._isValueEmpty() && this._editorOption('isValid')) {
      this.editor._adjustCaret();
    } else {
      const caret = this.editor._maskRulesChain.first();
      this._caretTimeout = setTimeout(() => {
        this._editorCaret({
          start: caret,
          end: caret
        });
      }, 0);
    }
  }
  _focusOutHandler(event) {
    this.editor._changeHandler(event);
    // @ts-expect-error
    if (this._editorOption('showMaskMode') === 'onFocus' && this.editor._isValueEmpty()) {
      // @ts-expect-error
      this._editorOption('text', '');
      this.editor._renderDisplayText('');
    }
  }
  _delHandler(event) {
    const {
      editor
    } = this;
    editor._maskKeyHandler(event, () => {
      if (!editor._hasSelection()) {
        editor._handleKey(EMPTY_CHAR);
      }
    });
  }
  _cutHandler(event) {
    const caret = this._editorCaret();
    const selectedText = this._editorInput().val().substring(caret.start, caret.end);
    this.editor._maskKeyHandler(event, () => (0, _dom.clipboardText)(event, selectedText));
  }
  _dropHandler() {
    this._clearDragTimer();
    this._dragTimer = setTimeout(() => {
      const value = this.editor._convertToValue(this._editorInput().val());
      // @ts-expect-error
      this._editorOption('value', value);
    });
  }
  _pasteHandler(event) {
    const {
      editor
    } = this;
    // @ts-expect-error
    if (this._editorOption('disabled')) {
      return;
    }
    const caret = this._editorCaret();
    editor._maskKeyHandler(event, () => {
      const pastedText = (0, _dom.clipboardText)(event);
      const restText = editor._maskRulesChain.text().substring(caret.end);
      const accepted = editor._handleChain({
        text: pastedText,
        start: caret.start,
        length: pastedText.length
      });
      const newCaret = caret.start + accepted;
      editor._handleChain({
        text: restText,
        start: newCaret,
        length: restText.length
      });
      editor._caret({
        start: newCaret,
        end: newCaret
      });
    });
  }
  _autoFillHandler(event) {
    const {
      editor
    } = this;
    const inputVal = this._editorInput().val();
    this._inputHandlerTimer = setTimeout(() => {
      if (this._isAutoFill()) {
        editor._maskKeyHandler(event, () => {
          editor._handleChain({
            text: inputVal,
            start: 0,
            length: inputVal.length
          });
        });
        editor._validateMask();
      }
    });
  }
  _isAutoFill() {
    const $input = this._editorInput();
    if (_browser.default.webkit) {
      const input = $input.get(0);
      return (input === null || input === void 0 ? void 0 : input.matches(':-webkit-autofill')) ?? false;
    }
    return false;
  }
  _clearDragTimer() {
    clearTimeout(this._dragTimer);
  }
  _clearTimers() {
    this._clearDragTimer();
    clearTimeout(this._caretTimeout);
    clearTimeout(this._inputHandlerTimer);
  }
  getHandler(handlerName) {
    return args => {
      var _this;
      (_this = this[`_${handlerName}Handler`]) === null || _this === void 0 || _this.call(this, args);
    };
  }
  attachEvents() {
    const $input = this._editorInput();
    EVENT_NAMES.forEach(eventName => {
      const namespace = (0, _index.addNamespace)(eventName.toLowerCase(), MASK_EVENT_NAMESPACE);
      _events_engine.default.on($input, namespace, this.getHandler(eventName));
    });
    this._attachChangeEventHandler();
  }
  detachEvents() {
    this._clearTimers();
    _events_engine.default.off(this._editorInput(), `.${MASK_EVENT_NAMESPACE}`);
  }
  clean() {
    this._clearTimers();
  }
}
exports.default = MaskStrategy;
