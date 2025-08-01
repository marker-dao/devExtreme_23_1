/**
* DevExtreme (cjs/__internal/ui/m_validation_message.js)
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
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _position = require("../../core/utils/position");
var _size = require("../../core/utils/size");
var _string = require("../../core/utils/string");
var _overlay = _interopRequireDefault(require("../ui/overlay/overlay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const INVALID_MESSAGE = 'dx-invalid-message';
const INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
const INVALID_MESSAGE_ALWAYS = 'dx-invalid-message-always';
const INVALID_MESSAGE_CONTENT = 'dx-invalid-message-content';
const VALIDATION_MESSAGE_MIN_WIDTH = 100;
class ValidationMessage extends _overlay.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      integrationOptions: {},
      templatesRenderAsynchronously: false,
      shading: false,
      width: 'auto',
      height: 'auto',
      hideOnOutsideClick: false,
      // @ts-expect-error ts-error
      animation: null,
      visible: true,
      propagateOutsideClick: true,
      _checkParentVisibility: false,
      rtlEnabled: false,
      contentTemplate: this._renderInnerHtml,
      maxWidth: '100%',
      container: this.$element(),
      mode: 'auto',
      preventScrollEvents: false,
      positionSide: 'top',
      offset: {
        h: 0,
        v: 0
      }
    });
  }
  _init() {
    super._init();
    this.updateMaxWidth();
    this._updatePosition();
  }
  _initMarkup() {
    super._initMarkup();
    this._ensureMessageNotEmpty();
    this._updatePositionByTarget();
    this._toggleModeClass();
    this._updateContentId();
  }
  _updatePositionByTarget() {
    const {
      target
    } = this.option();
    this.option('position.of', target);
  }
  _ensureMessageNotEmpty() {
    this._textMarkup = this._getTextMarkup();
    const shouldShowMessage = this.option('visible') && this._textMarkup;
    this._toggleVisibilityClasses(shouldShowMessage);
  }
  _toggleVisibilityClasses(visible) {
    if (visible) {
      this.$element().addClass(INVALID_MESSAGE);
      this.$wrapper().addClass(INVALID_MESSAGE);
    } else {
      this.$element().removeClass(INVALID_MESSAGE);
      this.$wrapper().removeClass(INVALID_MESSAGE);
    }
  }
  _updateContentId() {
    const {
      container,
      contentId
    } = this.option();
    const id = contentId ?? (0, _renderer.default)(container).attr('aria-describedby');
    this.$content().addClass(INVALID_MESSAGE_CONTENT).attr('id', id);
  }
  _renderInnerHtml(element) {
    const $element = element && (0, _renderer.default)(element);
    $element === null || $element === void 0 || $element.html(this._textMarkup);
  }
  _getTextMarkup() {
    const validationErrors = this.option('validationErrors') ?? [];
    let validationErrorMessage = '';
    // @ts-expect-error ts-error
    validationErrors.forEach(err => {
      const separator = validationErrorMessage ? '<br />' : '';
      validationErrorMessage += separator + (0, _string.encodeHtml)((err === null || err === void 0 ? void 0 : err.message) ?? '');
    });
    return validationErrorMessage;
  }
  _toggleModeClass() {
    const {
      mode
    } = this.option();
    this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, mode === 'auto').toggleClass(INVALID_MESSAGE_ALWAYS, mode === 'always');
  }
  updateMaxWidth() {
    const target = this.option('target');
    const targetWidth = (0, _size.getOuterWidth)(target);
    let maxWidth = '100%';
    if (targetWidth) {
      // @ts-expect-error ts-error
      maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH);
    }
    this.option({
      maxWidth
    });
  }
  _getPositionsArray(positionSide, rtlSide) {
    switch (positionSide) {
      case 'top':
        return [`${rtlSide} bottom`, `${rtlSide} top`];
      case 'left':
        return ['right', 'left'];
      case 'right':
        return ['left', 'right'];
      default:
        return [`${rtlSide} top`, `${rtlSide} bottom`];
    }
  }
  _updatePosition() {
    const {
      positionSide,
      rtlEnabled,
      offset: componentOffset,
      boundary
    } = this.option();
    const rtlSide = (0, _position.getDefaultAlignment)(rtlEnabled);
    const positions = this._getPositionsArray(positionSide, rtlSide);
    const offset = _extends({}, componentOffset);
    this.$element().addClass(`dx-invalid-message-${positionSide}`);
    // @ts-expect-error ts-error
    if (rtlEnabled && positionSide !== 'left' && positionSide !== 'right') offset.h = -offset.h;
    // @ts-expect-error ts-error
    if (positionSide === 'top') offset.v = -offset.v;
    // @ts-expect-error ts-error
    if (positionSide === 'left') offset.h = -offset.h;
    this.option('position', {
      offset,
      boundary,
      my: positions[0],
      at: positions[1],
      collision: 'none flip'
    });
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'target':
        this._updatePositionByTarget();
        this.updateMaxWidth();
        super._optionChanged(args);
        break;
      case 'boundary':
        this.option('position.boundary', value);
        break;
      case 'mode':
        this._toggleModeClass();
        break;
      case 'rtlEnabled':
      case 'offset':
      case 'positionSide':
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        this.$element().removeClass(`dx-invalid-message-${previousValue}`);
        this._updatePosition();
        break;
      case 'container':
        this._updateContentId();
        super._optionChanged(args);
        break;
      case 'contentId':
        this._updateContentId();
        break;
      case 'validationErrors':
        this._ensureMessageNotEmpty();
        this._renderInnerHtml(this.$content());
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxValidationMessage', ValidationMessage);
var _default = exports.default = ValidationMessage;
