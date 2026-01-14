/**
* DevExtreme (cjs/__internal/ui/text_box/m_text_editor.clear.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_button = _interopRequireDefault(require("../../ui/text_box/texteditor_button_collection/m_button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const pointerDown = _pointer.default.down;
const STATE_INVISIBLE_CLASS = 'dx-state-invisible';
const TEXTEDITOR_CLEAR_BUTTON_CLASS = 'dx-clear-button-area';
const TEXTEDITOR_CLEAR_ICON_CLASS = 'dx-icon-clear';
const TEXTEDITOR_ICON_CLASS = 'dx-icon';
const TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS = 'dx-show-clear-button';
class ClearButton extends _m_button.default {
  _create() {
    const $element = (0, _renderer.default)('<span>').addClass(TEXTEDITOR_CLEAR_BUTTON_CLASS).append((0, _renderer.default)('<span>').addClass(TEXTEDITOR_ICON_CLASS).addClass(TEXTEDITOR_CLEAR_ICON_CLASS));
    this._addToContainer($element);
    this.update(true);
    return {
      instance: $element,
      $element
    };
  }
  _isVisible() {
    const {
      editor
    } = this;
    return !!(editor !== null && editor !== void 0 && editor._isClearButtonVisible());
  }
  _attachEvents(instance, $button) {
    var _this$editor;
    const editorName = ((_this$editor = this.editor) === null || _this$editor === void 0 ? void 0 : _this$editor.NAME) ?? '';
    _events_engine.default.on($button, (0, _index.addNamespace)(pointerDown, editorName), e => {
      e.preventDefault();
      if (e.pointerType !== 'mouse') {
        var _this$editor2;
        (_this$editor2 = this.editor) === null || _this$editor2 === void 0 || _this$editor2._clearValueHandler(e);
      }
    });
    _events_engine.default.on($button, (0, _index.addNamespace)(_click.name, editorName), e => {
      var _this$editor3;
      return (_this$editor3 = this.editor) === null || _this$editor3 === void 0 ? void 0 : _this$editor3._clearValueHandler(e);
    });
  }
  // TODO: get rid of it
  // eslint-disable-next-line class-methods-use-this
  _legacyRender($editor, isVisible) {
    $editor.toggleClass(TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS, isVisible);
  }
  // @ts-expect-error ts-error
  update() {
    let rendered = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!rendered) {
      super.update();
    }
    const {
      editor,
      instance
    } = this;
    if (!editor) {
      return;
    }
    const $editor = editor.$element();
    const isVisible = this._isVisible();
    if (instance) {
      // @ts-expect-error instance is dxElementWrapper
      instance.toggleClass(STATE_INVISIBLE_CLASS, !isVisible);
    }
    this._legacyRender($editor, isVisible);
  }
}
exports.default = ClearButton;
