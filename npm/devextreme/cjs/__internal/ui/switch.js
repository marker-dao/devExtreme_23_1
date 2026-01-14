/**
* DevExtreme (cjs/__internal/ui/switch.js)
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
var _animation = require("../../common/core/animation");
var _click = require("../../common/core/events/click");
var _emitter = require("../../common/core/events/core/emitter.feedback");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _swipeable = _interopRequireDefault(require("../../common/core/events/gesture/swipeable"));
var _index = require("../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _position = require("../../core/utils/position");
var _size = require("../../core/utils/size");
var _editor = _interopRequireDefault(require("../ui/editor/editor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SWITCH_CLASS = 'dx-switch';
const SWITCH_WRAPPER_CLASS = `${SWITCH_CLASS}-wrapper`;
const SWITCH_CONTAINER_CLASS = `${SWITCH_CLASS}-container`;
const SWITCH_INNER_CLASS = `${SWITCH_CLASS}-inner`;
const SWITCH_HANDLE_CLASS = `${SWITCH_CLASS}-handle`;
const SWITCH_ON_VALUE_CLASS = `${SWITCH_CLASS}-on-value`;
const SWITCH_ON_CLASS = `${SWITCH_CLASS}-on`;
const SWITCH_OFF_CLASS = `${SWITCH_CLASS}-off`;
const SWITCH_ANIMATION_DURATION = 100;
class Switch extends _editor.default {
  _feedbackHideTimeout() {
    return 0;
  }
  _supportedKeys() {
    const {
      rtlEnabled
    } = this.option();
    const click = e => {
      var _this$_clickAction;
      e.preventDefault();
      (_this$_clickAction = this._clickAction) === null || _this$_clickAction === void 0 || _this$_clickAction.call(this, {
        event: e
      });
    };
    const move = (value, e) => {
      e.preventDefault();
      e.stopPropagation();
      // @ts-expect-error ValueChangedEvent should be compatible with KeyboardEvent
      this._saveValueChangeEvent(e);
      this._animateValue(value);
    };
    return Object.assign({}, super._supportedKeys(), {
      space: click,
      enter: click,
      leftArrow: e => {
        move(Boolean(rtlEnabled), e);
      },
      rightArrow: e => {
        move(!rtlEnabled, e);
      }
    });
  }
  _useTemplates() {
    return false;
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      switchedOnText: _message.default.format('dxSwitch-switchedOnText'),
      switchedOffText: _message.default.format('dxSwitch-switchedOffText'),
      value: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _init() {
    super._init();
    this._animating = false;
  }
  _initMarkup() {
    this._renderContainers();
    this.$element().addClass(SWITCH_CLASS).append(this._$switchWrapper);
    this._renderSubmitElement();
    this._renderClick();
    this.setAria('role', 'switch');
    this._renderSwipeable();
    super._initMarkup();
    this._renderSwitchInner();
    this._renderLabels();
    this._renderValue();
  }
  _getInnerOffset(value, offset) {
    const ratio = (offset - this._offsetDirection() * Number(!value)) / 2;
    return `${100 * ratio}%`;
  }
  _getHandleOffset(value, offset) {
    const {
      rtlEnabled
    } = this.option();
    const valueWithRtl = rtlEnabled ? !value : value;
    if (valueWithRtl) {
      const calcValue = -100 + 100 * -offset;
      return `${calcValue}%`;
    }
    return `${100 * -offset}%`;
  }
  _renderSwitchInner() {
    this._$switchInner = (0, _renderer.default)('<div>').addClass(SWITCH_INNER_CLASS).appendTo(this._$switchContainer);
    this._$handle = (0, _renderer.default)('<div>').addClass(SWITCH_HANDLE_CLASS).appendTo(this._$switchInner);
  }
  _renderLabels() {
    this._$labelOn = (0, _renderer.default)('<div>').addClass(SWITCH_ON_CLASS).prependTo(this._$switchInner);
    this._$labelOff = (0, _renderer.default)('<div>').addClass(SWITCH_OFF_CLASS).appendTo(this._$switchInner);
    this._setLabelsText();
  }
  _renderContainers() {
    this._$switchContainer = (0, _renderer.default)('<div>').addClass(SWITCH_CONTAINER_CLASS);
    this._$switchWrapper = (0, _renderer.default)('<div>').addClass(SWITCH_WRAPPER_CLASS).append(this._$switchContainer);
  }
  _renderSwipeable() {
    this._createComponent(this.$element(), _swipeable.default, {
      elastic: false,
      immediate: true,
      onStart: e => {
        this._swipeStartHandler(e.event);
      },
      onUpdated: e => {
        this._swipeUpdateHandler(e.event);
      },
      onEnd: e => {
        this._swipeEndHandler(e.event);
      },
      itemSizeFunc: () => this._getItemSizeFunc()
    });
  }
  _getItemSizeFunc() {
    return (0, _size.getOuterWidth)(this._$switchContainer, true) - (0, _position.getBoundingRect)(this._$handle.get(0)).width;
  }
  _renderSubmitElement() {
    this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _offsetDirection() {
    const {
      rtlEnabled
    } = this.option();
    return rtlEnabled ? -1 : 1;
  }
  _renderPosition(state, swipeOffset) {
    const innerOffset = this._getInnerOffset(state, swipeOffset);
    const handleOffset = this._getHandleOffset(state, swipeOffset);
    this._$switchInner.css('transform', ` translateX(${innerOffset})`);
    this._$handle.css('transform', ` translateX(${handleOffset})`);
  }
  _validateValue() {
    const {
      value: check
    } = this.option();
    if (typeof check !== 'boolean') {
      this._options.silent('value', !!check);
    }
  }
  _renderClick() {
    const eventName = (0, _index.addNamespace)(_click.name, this.NAME ?? '');
    const $element = this.$element();
    this._clickAction = this._createAction(this._clickHandler.bind(this));
    _events_engine.default.off($element, eventName);
    _events_engine.default.on($element, eventName, e => {
      var _this$_clickAction2;
      (_this$_clickAction2 = this._clickAction) === null || _this$_clickAction2 === void 0 || _this$_clickAction2.call(this, {
        event: e
      });
    });
  }
  _clickHandler(args) {
    const {
      event
    } = args;
    // @ts-expect-error ValueChangedEvent should be compatible with KeyboardEvent
    this._saveValueChangeEvent(event);
    if (this._animating || this._swiping) {
      return;
    }
    const {
      value
    } = this.option();
    this._animateValue(!value);
  }
  _animateValue(newValue) {
    const {
      value
    } = this.option();
    const startValue = Boolean(value);
    const endValue = newValue;
    if (startValue === endValue) {
      return;
    }
    this._animating = true;
    const fromInnerOffset = this._getInnerOffset(startValue, 0);
    const toInnerOffset = this._getInnerOffset(endValue, 0);
    const fromHandleOffset = this._getHandleOffset(startValue, 0);
    const toHandleOffset = this._getHandleOffset(endValue, 0);
    const fromInnerConfig = {
      transform: ` translateX(${fromInnerOffset})`
    };
    const toInnerConfig = {
      transform: ` translateX(${toInnerOffset})`
    };
    const fromHandleConfig = {
      transform: ` translateX(${fromHandleOffset})`
    };
    const toHandlerConfig = {
      transform: ` translateX(${toHandleOffset})`
    };
    this.$element().toggleClass(SWITCH_ON_VALUE_CLASS, endValue);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate(this._$handle.get(0), {
      // @ts-expect-error AnimationState type should be extended
      from: fromHandleConfig,
      // @ts-expect-error AnimationState type should be extended
      to: toHandlerConfig,
      duration: SWITCH_ANIMATION_DURATION
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate(this._$switchInner.get(0), {
      // @ts-expect-error AnimationState type should be extended
      from: fromInnerConfig,
      // @ts-expect-error AnimationState type should be extended
      to: toInnerConfig,
      duration: SWITCH_ANIMATION_DURATION,
      complete: () => {
        this._animating = false;
        this.option({
          value: endValue
        });
      }
    });
  }
  _swipeStartHandler(event) {
    const {
      value: state,
      rtlEnabled,
      activeStateEnabled
    } = this.option();
    const maxOffOffset = rtlEnabled ? 0 : 1;
    const maxOnOffset = rtlEnabled ? 1 : 0;
    event.maxLeftOffset = state ? maxOffOffset : maxOnOffset;
    event.maxRightOffset = state ? maxOnOffset : maxOffOffset;
    this._swiping = true;
    this._feedbackDeferred = (0, _deferred.Deferred)();
    (0, _emitter.lock)(this._feedbackDeferred);
    this._toggleActiveState(this.$element(), Boolean(activeStateEnabled));
  }
  _swipeUpdateHandler(event) {
    const {
      value
    } = this.option();
    this._renderPosition(Boolean(value), event.offset);
  }
  _swipeEndHandler(event) {
    const {
      value
    } = this.option();
    const offsetDirection = this._offsetDirection();
    const innerOffset = this._getInnerOffset(Boolean(value), event.targetOffset);
    const handleOffset = this._getHandleOffset(Boolean(value), event.targetOffset);
    const toInnerConfig = {
      transform: ` translateX(${innerOffset})`
    };
    const toHandleConfig = {
      transform: ` translateX(${handleOffset})`
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate(this._$handle.get(0), {
      // @ts-expect-error AnimationState type should be extended
      to: toHandleConfig,
      duration: SWITCH_ANIMATION_DURATION
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate(this._$switchInner.get(0), {
      // @ts-expect-error AnimationState type should be extended
      to: toInnerConfig,
      duration: SWITCH_ANIMATION_DURATION,
      complete: () => {
        var _this$_feedbackDeferr;
        this._swiping = false;
        const pos = Number(value) + offsetDirection * event.targetOffset;
        // @ts-expect-error ValueChangedEvent should be compatible with KeyboardEvent
        this._saveValueChangeEvent(event);
        this.option({
          value: Boolean(pos)
        });
        (_this$_feedbackDeferr = this._feedbackDeferred) === null || _this$_feedbackDeferr === void 0 || _this$_feedbackDeferr.resolve();
        this._toggleActiveState(this.$element(), false);
      }
    });
  }
  _renderValue() {
    this._validateValue();
    const {
      value,
      switchedOnText,
      switchedOffText
    } = this.option();
    this._renderPosition(Boolean(value), 0);
    this.$element().toggleClass(SWITCH_ON_VALUE_CLASS, value);
    this._getSubmitElement().val(String(value ?? ''));
    this.setAria({
      checked: value,
      label: value ? switchedOnText : switchedOffText
    });
  }
  _setLabelsText() {
    var _this$_$labelOn, _this$_$labelOff;
    const {
      switchedOnText = '',
      switchedOffText = ''
    } = this.option();
    (_this$_$labelOn = this._$labelOn) === null || _this$_$labelOn === void 0 || _this$_$labelOn.text(switchedOnText);
    (_this$_$labelOff = this._$labelOff) === null || _this$_$labelOff === void 0 || _this$_$labelOff.text(switchedOffText);
  }
  _visibilityChanged(visible) {
    if (visible) {
      this.repaint();
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'width':
        this._refresh();
        break;
      case 'switchedOnText':
      case 'switchedOffText':
        this._setLabelsText();
        break;
      case 'value':
        this._renderValue();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxSwitch', Switch);
var _default = exports.default = Switch;
