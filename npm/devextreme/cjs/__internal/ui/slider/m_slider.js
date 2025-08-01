/**
* DevExtreme (cjs/__internal/ui/slider/m_slider.js)
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
var _click = require("../../../common/core/events/click");
var _emitter = require("../../../common/core/events/core/emitter.feedback");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _swipeable = _interopRequireDefault(require("../../../common/core/events/gesture/swipeable"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _number = _interopRequireDefault(require("../../../common/core/localization/number"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _math = require("../../../core/utils/math");
var _size = require("../../../core/utils/size");
var _themes = require("../../../ui/themes");
var _utils = require("../../../ui/widget/utils.ink_ripple");
var _m_track_bar = _interopRequireDefault(require("../m_track_bar"));
var _m_slider_handle = _interopRequireDefault(require("./m_slider_handle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
const SLIDER_CLASS = 'dx-slider';
const SLIDER_WRAPPER_CLASS = 'dx-slider-wrapper';
const SLIDER_HANDLE_SELECTOR = '.dx-slider-handle';
const SLIDER_BAR_CLASS = 'dx-slider-bar';
const SLIDER_RANGE_CLASS = 'dx-slider-range';
const SLIDER_RANGE_VISIBLE_CLASS = 'dx-slider-range-visible';
const SLIDER_LABEL_CLASS = 'dx-slider-label';
const SLIDER_LABEL_POSITION_CLASS_PREFIX = 'dx-slider-label-position-';
const SLIDER_TOOLTIP_POSITION_CLASS_PREFIX = 'dx-slider-tooltip-position-';
const INVALID_MESSAGE_VISIBLE_CLASS = 'dx-invalid-message-visible';
const SLIDER_VALIDATION_NAMESPACE = 'Validation';
class Slider extends _m_track_bar.default {
  _supportedKeys() {
    const {
      rtlEnabled
    } = this.option();
    const roundedValue = (offset, isLeftDirection) => {
      offset = this._valueStep(offset);
      const {
        step,
        value,
        min,
        max
      } = this.option();
      // @ts-expect-error ts-error
      const currentPosition = value - min;
      const remainder = (0, _math.getRemainderByDivision)(currentPosition, step, this._getValueExponentLength());
      let result = isLeftDirection
      // @ts-expect-error ts-error
      ? value - offset + (remainder ? step - remainder : 0) : value + offset - remainder;
      // @ts-expect-error ts-error
      if (result < min) {
        // @ts-expect-error ts-error
        result = min;
        // @ts-expect-error ts-error
      } else if (result > max) {
        // @ts-expect-error ts-error
        result = max;
      }
      return this._roundToExponentLength(result);
    };
    const moveHandleRight = offset => {
      this.option('value', roundedValue(offset, rtlEnabled));
    };
    const moveHandleLeft = offset => {
      this.option('value', roundedValue(offset, !rtlEnabled));
    };
    return _extends({}, super._supportedKeys(), {
      leftArrow(e) {
        this._processKeyboardEvent(e);
        moveHandleLeft(this.option('step'));
      },
      rightArrow(e) {
        this._processKeyboardEvent(e);
        moveHandleRight(this.option('step'));
      },
      pageUp(e) {
        this._processKeyboardEvent(e);
        moveHandleRight(this.option('step') * this.option('keyStep'));
      },
      pageDown(e) {
        this._processKeyboardEvent(e);
        moveHandleLeft(this.option('step') * this.option('keyStep'));
      },
      home(e) {
        this._processKeyboardEvent(e);
        const min = this.option('min');
        this.option('value', min);
      },
      end(e) {
        this._processKeyboardEvent(e);
        const max = this.option('max');
        this.option('value', max);
      }
    });
  }
  _processKeyboardEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      value: 50,
      hoverStateEnabled: true,
      activeStateEnabled: true,
      step: 1,
      showRange: true,
      tooltip: {
        enabled: false,
        format(value) {
          return value;
        },
        position: 'top',
        showMode: 'onHover'
      },
      label: {
        visible: false,
        position: 'bottom',
        format(value) {
          return value;
        }
      },
      keyStep: 1,
      useInkRipple: false,
      // @ts-expect-error ts-error
      validationMessageOffset: (0, _themes.isMaterial)() ? {
        h: 18,
        v: 0
      } : {
        h: 7,
        v: 4
      },
      focusStateEnabled: true,
      valueChangeMode: 'onHandleMove'
    });
  }
  _init() {
    super._init();
    this._activeStateUnit = SLIDER_HANDLE_SELECTOR;
  }
  _toggleValidationMessage(visible) {
    if (!this.option('isValid')) {
      this.$element().toggleClass(INVALID_MESSAGE_VISIBLE_CLASS, visible);
    }
  }
  _defaultOptionsRules() {
    // @ts-expect-error ts-error
    return super._defaultOptionsRules().concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        const themeName = (0, _themes.current)();
        return (0, _themes.isMaterial)(themeName);
      },
      options: {
        useInkRipple: true
      }
    }]);
  }
  _initMarkup() {
    this.$element().addClass(SLIDER_CLASS);
    this._renderSubmitElement();
    this.option('useInkRipple') && this._renderInkRipple();
    super._initMarkup();
    this._renderLabels();
    this._renderStartHandler();
    this._renderAriaMinAndMax();
  }
  _attachFocusEvents() {
    super._attachFocusEvents();
    const namespace = this.NAME + SLIDER_VALIDATION_NAMESPACE;
    const focusInEvent = (0, _index.addNamespace)('focusin', namespace);
    const focusOutEvent = (0, _index.addNamespace)('focusout', namespace);
    const $focusTarget = this._focusTarget();
    _events_engine.default.on($focusTarget, focusInEvent, this._toggleValidationMessage.bind(this, true));
    _events_engine.default.on($focusTarget, focusOutEvent, this._toggleValidationMessage.bind(this, false));
  }
  _detachFocusEvents() {
    super._detachFocusEvents();
    const $focusTarget = this._focusTarget();
    this._toggleValidationMessage(false);
    _events_engine.default.off($focusTarget, this.NAME + SLIDER_VALIDATION_NAMESPACE);
  }
  _render() {
    super._render();
    this._repaintHandle();
  }
  _renderSubmitElement() {
    this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _renderInkRipple() {
    this._inkRipple = (0, _utils.render)({
      waveSizeCoefficient: 0.7,
      isCentered: true,
      wavesNumber: 2,
      useHoldAnimation: false
    });
  }
  _renderInkWave(element, dxEvent, doRender, waveIndex) {
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element,
      event: dxEvent,
      wave: waveIndex
    };
    if (doRender) {
      this._inkRipple.showWave(config);
    } else {
      this._inkRipple.hideWave(config);
    }
  }
  _visibilityChanged() {
    this.repaint();
  }
  _renderWrapper() {
    super._renderWrapper();
    this._$wrapper.addClass(SLIDER_WRAPPER_CLASS);
    this._createComponent(this._$wrapper, _swipeable.default, {
      rtlEnabled: false,
      elastic: false,
      immediate: true,
      immediateTimeout: 0,
      onStart: this._swipeStartHandler.bind(this),
      onUpdated: this._swipeUpdateHandler.bind(this),
      onEnd: this._swipeEndHandler.bind(this),
      itemSizeFunc: this._itemWidthFunc.bind(this)
    });
  }
  _renderContainer() {
    super._renderContainer();
    this._$bar.addClass(SLIDER_BAR_CLASS);
  }
  _renderRange() {
    super._renderRange();
    this._$range.addClass(SLIDER_RANGE_CLASS);
    this._renderHandle();
    this._renderRangeVisibility();
  }
  _renderRangeVisibility() {
    this._$range.toggleClass(SLIDER_RANGE_VISIBLE_CLASS, Boolean(this.option('showRange')));
  }
  _renderHandle() {
    const {
      value
    } = this.option();
    this._$handle = this._renderHandleImpl(value, this._$handle);
  }
  _renderHandleImpl(value, $element) {
    const $handle = $element || (0, _renderer.default)('<div>').appendTo(this._$range);
    const {
      tooltip
    } = this.option();
    this.$element().toggleClass(`${SLIDER_TOOLTIP_POSITION_CLASS_PREFIX}bottom`, (tooltip === null || tooltip === void 0 ? void 0 : tooltip.enabled) && (tooltip === null || tooltip === void 0 ? void 0 : tooltip.position) === 'bottom').toggleClass(`${SLIDER_TOOLTIP_POSITION_CLASS_PREFIX}top`, (tooltip === null || tooltip === void 0 ? void 0 : tooltip.enabled) && (tooltip === null || tooltip === void 0 ? void 0 : tooltip.position) === 'top');
    this._createComponent($handle, _m_slider_handle.default, {
      value,
      tooltip
    });
    return $handle;
  }
  _renderAriaMinAndMax() {
    this.setAria({
      // eslint-disable-next-line spellcheck/spell-checker
      valuemin: this.option('min'),
      // eslint-disable-next-line spellcheck/spell-checker
      valuemax: this.option('max')
    }, this._$handle);
  }
  _toggleActiveState($element, value) {
    super._toggleActiveState($element, value);
    this._renderInkWave($element, null, !!value, 1);
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, $element);
    if (this._disposed) {
      return;
    }
    const $focusTarget = (0, _renderer.default)($element || this._focusTarget());
    this._renderInkWave($focusTarget, null, isFocused, 0);
  }
  _renderLabels() {
    this.$element().removeClass(`${SLIDER_LABEL_POSITION_CLASS_PREFIX}bottom`).removeClass(`${SLIDER_LABEL_POSITION_CLASS_PREFIX}top`);
    if (this.option('label.visible')) {
      const {
        min,
        max
      } = this.option();
      const position = this.option('label.position');
      const labelFormat = this.option('label.format');
      if (!this._$minLabel) {
        this._$minLabel = (0, _renderer.default)('<div>').addClass(SLIDER_LABEL_CLASS).appendTo(this._$wrapper);
      }
      this._$minLabel.text(_number.default.format(min, labelFormat));
      if (!this._$maxLabel) {
        this._$maxLabel = (0, _renderer.default)('<div>').addClass(SLIDER_LABEL_CLASS).appendTo(this._$wrapper);
      }
      this._$maxLabel.text(_number.default.format(max, labelFormat));
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-base-to-string
      this.$element().addClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + position);
    } else {
      if (this._$minLabel) {
        this._$minLabel.remove();
        delete this._$minLabel;
      }
      if (this._$maxLabel) {
        this._$maxLabel.remove();
        delete this._$maxLabel;
      }
    }
  }
  _renderStartHandler() {
    // @ts-expect-error ts-error
    const pointerDownEventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
    // @ts-expect-error ts-error
    const clickEventName = (0, _index.addNamespace)(_click.name, this.NAME);
    const startAction = this._createAction(this._startHandler.bind(this));
    const $element = this.$element();
    _events_engine.default.off($element, pointerDownEventName);
    _events_engine.default.on($element, pointerDownEventName, e => {
      if ((0, _index.isMouseEvent)(e)) {
        startAction({
          event: e
        });
      }
    });
    _events_engine.default.off($element, clickEventName);
    _events_engine.default.on($element, clickEventName, e => {
      const $handle = this._activeHandle();
      if ($handle) {
        // @ts-expect-error ts-error
        _events_engine.default.trigger($handle, 'focusin');
        // @ts-expect-error ts-error
        _events_engine.default.trigger($handle, 'focus');
      }
      startAction({
        event: e
      });
      const {
        valueChangeMode
      } = this.option();
      if (valueChangeMode === 'onHandleRelease') {
        this.option('value', this._getActualValue());
        this._actualValue = undefined;
      }
    });
  }
  _itemWidthFunc() {
    // @ts-expect-error ts-error
    return this._itemWidthRatio;
  }
  _swipeStartHandler(e) {
    const rtlEnabled = this.option('rtlEnabled');
    if ((0, _index.isTouchEvent)(e.event)) {
      this._createAction(this._startHandler.bind(this))({
        event: e.event
      });
    }
    this._feedbackDeferred = (0, _deferred.Deferred)();
    (0, _emitter.lock)(this._feedbackDeferred);
    const {
      activeStateEnabled
    } = this.option();
    // @ts-expect-error ts-error
    this._toggleActiveState(this._activeHandle(), activeStateEnabled);
    this._startOffset = this._currentRatio;
    const startOffset = this._startOffset * this._swipePixelRatio();
    const endOffset = (1 - this._startOffset) * this._swipePixelRatio();
    e.event.maxLeftOffset = rtlEnabled ? endOffset : startOffset;
    e.event.maxRightOffset = rtlEnabled ? startOffset : endOffset;
    this._itemWidthRatio = (0, _size.getWidth)(this.$element()) / this._swipePixelRatio();
    this._needPreventAnimation = true;
  }
  _swipeEndHandler(e) {
    var _this$_feedbackDeferr;
    if (this._isSingleValuePossible()) {
      return;
    }
    (_this$_feedbackDeferr = this._feedbackDeferred) === null || _this$_feedbackDeferr === void 0 || _this$_feedbackDeferr.resolve();
    this._toggleActiveState(this._activeHandle(), false);
    const offsetDirection = this.option('rtlEnabled') ? -1 : 1;
    // @ts-expect-error ts-error
    const ratio = this._startOffset + offsetDirection * e.event.targetOffset / this._swipePixelRatio();
    delete this._needPreventAnimation;
    this._saveValueChangeEvent(e.event);
    this._changeValueOnSwipe(ratio);
    const {
      valueChangeMode
    } = this.option();
    if (valueChangeMode === 'onHandleRelease') {
      this.option('value', this._getActualValue());
    }
    this._actualValue = undefined;
    delete this._startOffset;
    this._renderValue();
  }
  _activeHandle() {
    return this._$handle;
  }
  _swipeUpdateHandler(e) {
    if (this._isSingleValuePossible()) {
      return;
    }
    this._saveValueChangeEvent(e.event);
    this._updateHandlePosition(e);
  }
  _updateHandlePosition(e) {
    const offsetDirection = this.option('rtlEnabled') ? -1 : 1;
    // @ts-expect-error ts-error
    const newRatio = Math.min(this._startOffset + offsetDirection * e.event.offset / this._swipePixelRatio(), 1);
    (0, _size.setWidth)(this._$range, `${newRatio * 100}%`);
    this._changeValueOnSwipe(newRatio);
  }
  _swipePixelRatio() {
    const {
      min,
      max
    } = this.option();
    const step = this._valueStep(this.option('step'));
    // @ts-expect-error ts-error
    return (max - min) / step;
  }
  _valueStep(step) {
    if (!step || isNaN(step)) {
      step = 1;
    }
    return step;
  }
  _getValueExponentLength() {
    const {
      step,
      min
    } = this.option();
    return Math.max((0, _math.getExponentLength)(step), (0, _math.getExponentLength)(min));
  }
  _roundToExponentLength(value) {
    const valueExponentLength = this._getValueExponentLength();
    return (0, _math.roundFloatPart)(value, valueExponentLength);
  }
  _changeValueOnSwipe(ratio) {
    const {
      min,
      max
    } = this.option();
    const step = this._valueStep(this.option('step'));
    // @ts-expect-error ts-error
    const newChange = ratio * (max - min);
    // @ts-expect-error ts-error
    let newValue = min + newChange;
    if (step < 0) {
      return;
    }
    if (newValue === max || newValue === min) {
      this._setValueOnSwipe(newValue);
    } else {
      // @ts-expect-error ts-error
      const stepCount = Math.round((newValue - min) / step);
      // @ts-expect-error ts-error
      newValue = this._roundToExponentLength(stepCount * step + min);
      // @ts-expect-error ts-error
      this._setValueOnSwipe(Math.max(Math.min(newValue, max), min));
    }
  }
  _setValueOnSwipe(value) {
    this._actualValue = value;
    const {
      valueChangeMode
    } = this.option();
    if (valueChangeMode === 'onHandleRelease') {
      _m_slider_handle.default.getInstance(this._activeHandle()).option('value', value);
    } else {
      this.option('value', value);
      this._saveValueChangeEvent(undefined);
    }
  }
  _getActualValue() {
    const {
      value
    } = this.option();
    return this._actualValue ?? value;
  }
  _isSingleValuePossible() {
    const {
      min,
      max
    } = this.option();
    return min === max;
  }
  _startHandler(args) {
    if (this._isSingleValuePossible()) {
      return;
    }
    const e = args.event;
    // @ts-expect-error ts-error
    this._currentRatio = ((0, _index.eventData)(e).x - this._$bar.offset().left) / (0, _size.getWidth)(this._$bar);
    if (this.option('rtlEnabled')) {
      this._currentRatio = 1 - this._currentRatio;
    }
    this._saveValueChangeEvent(e);
    this._changeValueOnSwipe(this._currentRatio);
  }
  _renderValue() {
    super._renderValue();
    const value = this._getActualValue();
    this._getSubmitElement().val((0, _common.applyServerDecimalSeparator)(value));
    _m_slider_handle.default.getInstance(this._activeHandle()).option('value', value);
  }
  _setRangeStyles(options) {
    options && this._$range.css(options);
  }
  _callHandlerMethod(name, args) {
    _m_slider_handle.default.getInstance(this._$handle)[name](args);
  }
  _repaintHandle() {
    this._callHandlerMethod('repaint');
  }
  _fitTooltip() {
    this._callHandlerMethod('updateTooltipPosition');
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'visible':
        super._optionChanged(args);
        this._renderHandle();
        this._repaintHandle();
        break;
      case 'min':
      case 'max':
        this._renderValue();
        super._optionChanged(args);
        this._renderLabels();
        this._renderAriaMinAndMax();
        this._fitTooltip();
        break;
      case 'step':
        this._renderValue();
        break;
      case 'keyStep':
        break;
      case 'showRange':
        this._renderRangeVisibility();
        break;
      case 'tooltip':
        this._renderHandle();
        break;
      case 'label':
        this._renderLabels();
        break;
      case 'useInkRipple':
        this._invalidate();
        break;
      case 'valueChangeMode':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _refresh() {
    const {
      rtlEnabled
    } = this.option();
    this._toggleRTLDirection(rtlEnabled);
    this._renderDimensions();
    this._renderValue();
    this._renderHandle();
    this._repaintHandle();
  }
  _clean() {
    delete this._inkRipple;
    delete this._actualValue;
    super._clean();
  }
}
(0, _component_registrator.default)('dxSlider', Slider);
var _default = exports.default = Slider;
