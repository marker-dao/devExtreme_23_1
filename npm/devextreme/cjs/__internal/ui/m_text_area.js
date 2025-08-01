/**
* DevExtreme (cjs/__internal/ui/m_text_area.js)
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
exports.default = exports.TEXTAREA_CLASS = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _emitterGesture = _interopRequireDefault(require("../../common/core/events/gesture/emitter.gesture.scroll"));
var _pointer = _interopRequireDefault(require("../../common/core/events/pointer"));
var _index = require("../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _m_text_box = _interopRequireDefault(require("../ui/text_box/m_text_box"));
var _m_utils = require("../ui/text_box/m_utils.scroll");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TEXTAREA_CLASS = exports.TEXTAREA_CLASS = 'dx-textarea';
const TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE = 'dx-texteditor-input-auto-resize';
class TextArea extends _m_text_box.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      spellcheck: true,
      autoResizeEnabled: false,
      _shouldAttachKeyboardEvents: false
    });
  }
  _shouldAttachKeyboardEvents() {
    const {
      _shouldAttachKeyboardEvents: shouldAttachKeyboardEvents,
      readOnly
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return shouldAttachKeyboardEvents || !readOnly;
  }
  _initMarkup() {
    this.$element().addClass(TEXTAREA_CLASS);
    super._initMarkup();
    this.setAria('multiline', 'true');
  }
  _renderContentImpl() {
    this._updateInputHeight();
    super._renderContentImpl();
  }
  _renderInput() {
    super._renderInput();
    this._renderScrollHandler();
  }
  _createInput() {
    const $input = (0, _renderer.default)('<textarea>');
    this._applyInputAttributes($input, this.option('inputAttr'));
    this._updateInputAutoResizeAppearance($input);
    return $input;
  }
  _setInputMinHeight() {}
  _renderScrollHandler() {
    this._eventY = 0;
    const $input = this._input();
    const initScrollData = (0, _m_utils.prepareScrollData)($input, true);
    // @ts-expect-error ts-error
    _events_engine.default.on($input, (0, _index.addNamespace)(_emitterGesture.default.init, this.NAME), initScrollData, _common.noop);
    // @ts-expect-error ts-error
    _events_engine.default.on($input, (0, _index.addNamespace)(_pointer.default.down, this.NAME), this._pointerDownHandler.bind(this));
    // @ts-expect-error ts-error
    _events_engine.default.on($input, (0, _index.addNamespace)(_pointer.default.move, this.NAME), this._pointerMoveHandler.bind(this));
  }
  _pointerDownHandler(e) {
    this._eventY = (0, _index.eventData)(e).y;
  }
  _pointerMoveHandler(e) {
    const currentEventY = (0, _index.eventData)(e).y;
    const delta = this._eventY - currentEventY;
    if ((0, _m_utils.allowScroll)(this._input(), delta)) {
      e.isScrollingEvent = true;
      e.stopPropagation();
    }
    this._eventY = currentEventY;
  }
  _renderDimensions() {
    const $element = this.$element();
    const element = $element.get(0);
    const width = this._getOptionValue('width', element);
    const height = this._getOptionValue('height', element);
    const minHeight = this.option('minHeight');
    const maxHeight = this.option('maxHeight');
    $element.css({
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      minHeight: minHeight !== undefined ? minHeight : '',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      maxHeight: maxHeight !== undefined ? maxHeight : '',
      width,
      height
    });
  }
  _resetDimensions() {
    this.$element().css({
      height: '',
      minHeight: '',
      maxHeight: ''
    });
  }
  _renderEvents() {
    if (this.option('autoResizeEnabled')) {
      // @ts-expect-error ts-error
      _events_engine.default.on(this._input(), (0, _index.addNamespace)('input paste', this.NAME), this._updateInputHeight.bind(this));
    }
    super._renderEvents();
  }
  _refreshEvents() {
    // @ts-expect-error ts-error
    _events_engine.default.off(this._input(), (0, _index.addNamespace)('input paste', this.NAME));
    super._refreshEvents();
  }
  _getHeightDifference($input) {
    return (0, _size.getVerticalOffsets)(this.$element().get(0), false) + (0, _size.getVerticalOffsets)(this._$textEditorContainer.get(0), false) + (0, _size.getVerticalOffsets)(this._$textEditorInputContainer.get(0), true) + (0, _size.getElementBoxParams)('height', (0, _window.getWindow)().getComputedStyle($input.get(0))).margin;
  }
  _updateInputHeight() {
    if (!(0, _window.hasWindow)()) {
      return;
    }
    const $input = this._input();
    const height = this.option('height');
    const autoHeightResizing = height === undefined && this.option('autoResizeEnabled');
    const shouldCalculateInputHeight = autoHeightResizing || height === undefined && this.option('minHeight');
    if (!shouldCalculateInputHeight) {
      $input.css('height', '');
      return;
    }
    this._resetDimensions();
    this.$element().css('height', (0, _size.getOuterHeight)(this.$element()));
    $input.css('height', 0);
    const heightDifference = this._getHeightDifference($input);
    this._renderDimensions();
    const minHeight = this._getBoundaryHeight('minHeight');
    const maxHeight = this._getBoundaryHeight('maxHeight');
    let inputHeight = $input[0].scrollHeight;
    if (minHeight !== undefined) {
      inputHeight = Math.max(inputHeight, minHeight - heightDifference);
    }
    if (maxHeight !== undefined) {
      const adjustedMaxHeight = maxHeight - heightDifference;
      const needScroll = inputHeight > adjustedMaxHeight;
      inputHeight = Math.min(inputHeight, adjustedMaxHeight);
      this._updateInputAutoResizeAppearance($input, !needScroll);
    }
    $input.css('height', inputHeight);
    if (autoHeightResizing) {
      this.$element().css('height', 'auto');
    }
  }
  _getBoundaryHeight(optionName) {
    const boundaryValue = this.option(optionName);
    if ((0, _type.isDefined)(boundaryValue)) {
      return typeof boundaryValue === 'number' ? boundaryValue : (0, _size.parseHeight)(boundaryValue, this.$element().get(0).parentElement, this.$element().get(0));
    }
  }
  _renderInputType() {}
  _visibilityChanged(visible) {
    if (visible) {
      this._updateInputHeight();
    }
  }
  _updateInputAutoResizeAppearance($input, isAutoResizeEnabled) {
    if ($input) {
      const autoResizeEnabled = (0, _common.ensureDefined)(isAutoResizeEnabled, this.option('autoResizeEnabled'));
      $input.toggleClass(TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE, autoResizeEnabled);
    }
  }
  _dimensionChanged() {
    if (this.option('visible')) {
      this._updateInputHeight();
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case '_shouldAttachKeyboardEvents':
      case 'autoResizeEnabled':
        this._updateInputAutoResizeAppearance(this._input(), value);
        this._refreshEvents();
        this._updateInputHeight();
        break;
      case 'value':
      case 'height':
        super._optionChanged(args);
        this._updateInputHeight();
        break;
      case 'minHeight':
      case 'maxHeight':
        this._renderDimensions();
        this._updateInputHeight();
        break;
      case 'visible':
        super._optionChanged(args);
        if (value) {
          this._updateInputHeight();
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxTextArea', TextArea);
var _default = exports.default = TextArea;
