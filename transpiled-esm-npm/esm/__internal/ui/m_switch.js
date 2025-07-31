import _extends from "@babel/runtime/helpers/esm/extends";
import { fx } from '../../common/core/animation';
import { name as clickEventName } from '../../common/core/events/click';
import { lock } from '../../common/core/events/core/emitter.feedback';
import eventsEngine from '../../common/core/events/core/events_engine';
import Swipeable from '../../common/core/events/gesture/swipeable';
import { addNamespace } from '../../common/core/events/utils/index';
import messageLocalization from '../../common/core/localization/message';
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import $ from '../../core/renderer';
import { Deferred } from '../../core/utils/deferred';
import { getBoundingRect } from '../../core/utils/position';
import { getOuterWidth } from '../../core/utils/size';
import Editor from '../ui/editor/editor';
const SWITCH_CLASS = 'dx-switch';
const SWITCH_WRAPPER_CLASS = `${SWITCH_CLASS}-wrapper`;
const SWITCH_CONTAINER_CLASS = `${SWITCH_CLASS}-container`;
const SWITCH_INNER_CLASS = `${SWITCH_CLASS}-inner`;
const SWITCH_HANDLE_CLASS = `${SWITCH_CLASS}-handle`;
const SWITCH_ON_VALUE_CLASS = `${SWITCH_CLASS}-on-value`;
const SWITCH_ON_CLASS = `${SWITCH_CLASS}-on`;
const SWITCH_OFF_CLASS = `${SWITCH_CLASS}-off`;
const SWITCH_ANIMATION_DURATION = 100;
class Switch extends Editor {
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
    return _extends({}, super._supportedKeys(), {
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
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      switchedOnText: messageLocalization.format('dxSwitch-switchedOnText'),
      switchedOffText: messageLocalization.format('dxSwitch-switchedOffText'),
      value: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _init() {
    super._init();
    this._feedbackHideTimeout = 0;
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
    this._$switchInner = $('<div>').addClass(SWITCH_INNER_CLASS).appendTo(this._$switchContainer);
    this._$handle = $('<div>').addClass(SWITCH_HANDLE_CLASS).appendTo(this._$switchInner);
  }
  _renderLabels() {
    this._$labelOn = $('<div>').addClass(SWITCH_ON_CLASS).prependTo(this._$switchInner);
    this._$labelOff = $('<div>').addClass(SWITCH_OFF_CLASS).appendTo(this._$switchInner);
    this._setLabelsText();
  }
  _renderContainers() {
    this._$switchContainer = $('<div>').addClass(SWITCH_CONTAINER_CLASS);
    this._$switchWrapper = $('<div>').addClass(SWITCH_WRAPPER_CLASS).append(this._$switchContainer);
  }
  _renderSwipeable() {
    this._createComponent(this.$element(), Swipeable, {
      elastic: false,
      immediate: true,
      onStart: e => this._swipeStartHandler(e),
      onUpdated: e => this._swipeUpdateHandler(e),
      onEnd: e => this._swipeEndHandler(e),
      itemSizeFunc: () => this._getItemSizeFunc()
    });
  }
  _getItemSizeFunc() {
    return getOuterWidth(this._$switchContainer, true) - getBoundingRect(this._$handle.get(0)).width;
  }
  _renderSubmitElement() {
    this._$submitElement = $('<input>').attr('type', 'hidden').appendTo(this.$element());
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
    const eventName = addNamespace(clickEventName, this.NAME ?? '');
    const $element = this.$element();
    this._clickAction = this._createAction(this._clickHandler.bind(this));
    eventsEngine.off($element, eventName);
    eventsEngine.on($element, eventName, e => {
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
    fx.animate(this._$handle.get(0), {
      // @ts-expect-error AnimationState type should be extended
      from: fromHandleConfig,
      // @ts-expect-error AnimationState type should be extended
      to: toHandlerConfig,
      duration: SWITCH_ANIMATION_DURATION
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fx.animate(this._$switchInner.get(0), {
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
  _swipeStartHandler(e) {
    const {
      value: state,
      rtlEnabled,
      activeStateEnabled
    } = this.option();
    const maxOffOffset = rtlEnabled ? 0 : 1;
    const maxOnOffset = rtlEnabled ? 1 : 0;
    e.event.maxLeftOffset = state ? maxOffOffset : maxOnOffset;
    e.event.maxRightOffset = state ? maxOnOffset : maxOffOffset;
    this._swiping = true;
    this._feedbackDeferred = Deferred();
    lock(this._feedbackDeferred);
    this._toggleActiveState(this.$element(), Boolean(activeStateEnabled));
  }
  _swipeUpdateHandler(e) {
    const {
      value
    } = this.option();
    this._renderPosition(Boolean(value), e.event.offset);
  }
  _swipeEndHandler(e) {
    const {
      value
    } = this.option();
    const offsetDirection = this._offsetDirection();
    const innerOffset = this._getInnerOffset(Boolean(value), e.event.targetOffset);
    const handleOffset = this._getHandleOffset(Boolean(value), e.event.targetOffset);
    const toInnerConfig = {
      transform: ` translateX(${innerOffset})`
    };
    const toHandleConfig = {
      transform: ` translateX(${handleOffset})`
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fx.animate(this._$handle.get(0), {
      // @ts-expect-error AnimationState type should be extended
      to: toHandleConfig,
      duration: SWITCH_ANIMATION_DURATION
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fx.animate(this._$switchInner.get(0), {
      // @ts-expect-error AnimationState type should be extended
      to: toInnerConfig,
      duration: SWITCH_ANIMATION_DURATION,
      complete: () => {
        var _this$_feedbackDeferr;
        this._swiping = false;
        const pos = Number(value) + offsetDirection * e.event.targetOffset;
        // @ts-expect-error ValueChangedEvent should be compatible with KeyboardEvent
        this._saveValueChangeEvent(e.event);
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
registerComponent('dxSwitch', Switch);
export default Switch;