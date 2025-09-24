import _extends from "@babel/runtime/helpers/esm/extends";
import positionUtils from '../../../common/core/animation/position';
import { move } from '../../../common/core/animation/translator';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../common/core/events/utils';
import registerComponent from '../../../core/component_registrator';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { fitIntoRange } from '../../../core/utils/math';
import { getBoundingRect } from '../../../core/utils/position';
import { getHeight, getWidth, setHeight, setWidth } from '../../../core/utils/size';
import { isObject, isString } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import { isMaterial, isMaterialBased } from '../../../ui/themes';
import errors from '../../../ui/widget/ui.errors';
import Popup from '../../ui/popup/m_popup';
import { POPOVER_POSITION_ALIASES, PopoverPositionController } from './popover_position_controller';
// STYLE popover
const POPOVER_CLASS = 'dx-popover';
const POPOVER_WRAPPER_CLASS = 'dx-popover-wrapper';
const POPOVER_ARROW_CLASS = 'dx-popover-arrow';
const POPOVER_WITHOUT_TITLE_CLASS = 'dx-popover-without-title';
const POSITION_FLIP_MAP = {
  left: 'right',
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  center: 'center'
};
class Popover extends Popup {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      shading: false,
      position: extend({}, POPOVER_POSITION_ALIASES.bottom),
      hideOnOutsideClick: true,
      animation: {
        show: {
          type: 'fade',
          from: 0,
          to: 1
        },
        hide: {
          type: 'fade',
          from: 1,
          to: 0
        }
      },
      showTitle: false,
      width: 'auto',
      height: 'auto',
      dragEnabled: false,
      resizeEnabled: false,
      fullScreen: false,
      hideOnParentScroll: true,
      arrowPosition: '',
      arrowOffset: 0,
      _fixWrapperPosition: true
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _defaultOptionsRules() {
    return [{
      device: {
        platform: 'ios'
      },
      // @ts-expect-error ts-error
      options: {
        arrowPosition: {
          boundaryOffset: {
            h: 20,
            v: -10
          },
          collision: 'fit'
        }
      }
    }, {
      device() {
        return !hasWindow();
      },
      // @ts-expect-error ts-error
      options: {
        animation: null
      }
    }, {
      device() {
        // @ts-expect-error ts-error
        return isMaterialBased();
      },
      // @ts-expect-error ts-error
      options: {
        useFlatToolbarButtons: true
      }
    }, {
      device() {
        // @ts-expect-error ts-error
        return isMaterial();
      },
      // @ts-expect-error ts-error
      options: {
        useDefaultToolbarButtons: true,
        showCloseButton: false
      }
    }];
  }
  _init() {
    super._init();
    this._renderArrow();
    this._timeouts = {};
    this.$element().addClass(POPOVER_CLASS);
    this.$wrapper().addClass(POPOVER_WRAPPER_CLASS);
    const {
      toolbarItems
    } = this.option();
    const isInteractive = toolbarItems === null || toolbarItems === void 0 ? void 0 : toolbarItems.length;
    this.setAria('role', isInteractive ? 'dialog' : 'tooltip');
  }
  _render() {
    // @ts-expect-error ts-error
    super._render.apply(this, arguments);
    this._detachEvents(this.option('target'));
    this._attachEvents();
  }
  _detachEvents(target) {
    this._detachEvent(target, 'show');
    this._detachEvent(target, 'hide');
  }
  _attachEvents() {
    this._attachEvent('show');
    this._attachEvent('hide');
  }
  _createEventHandler(name) {
    const action = this._createAction(() => {
      const delay = this._getEventDelay(`${name}Event`);
      this._clearEventsTimeouts();
      if (delay) {
        this._timeouts[name] = setTimeout(() => {
          this[name]();
        }, delay);
      } else {
        this[name]();
      }
    }, {
      validatingTargetName: 'target'
    });
    return e => {
      action({
        event: e,
        target: $(e.currentTarget)
      });
    };
  }
  _attachEvent(name) {
    const {
      target,
      shading,
      disabled,
      hideEvent
    } = this.option();
    const shouldIgnoreHideEvent = shading && name === 'hide';
    if (shouldIgnoreHideEvent && hideEvent) {
      errors.log('W1020');
    }
    const event = shouldIgnoreHideEvent ? null : this._getEventName(`${name}Event`);
    if (!event || disabled) {
      return;
    }
    const EVENT_HANDLER_NAME = this._getEventHandlerName(name);
    this[EVENT_HANDLER_NAME] = this._createEventHandler(name);
    const eventName = addNamespace(event, this.NAME);
    const isSelector = isString(target);
    if (isSelector) {
      eventsEngine.on(domAdapter.getDocument(), eventName, target, this[EVENT_HANDLER_NAME]);
    } else {
      eventsEngine.on(getPublicElement($(target)), eventName, this[EVENT_HANDLER_NAME]);
    }
  }
  _detachEvent(target, name, event) {
    let eventName = event || this._getEventName(`${name}Event`);
    if (!eventName) {
      return;
    }
    eventName = addNamespace(eventName, this.NAME);
    const EVENT_HANDLER_NAME = this._getEventHandlerName(name);
    const isSelector = isString(target);
    if (isSelector) {
      // @ts-expect-error ts-error
      eventsEngine.off(domAdapter.getDocument(), eventName, target, this[EVENT_HANDLER_NAME]);
    } else {
      eventsEngine.off(getPublicElement($(target)), eventName, this[EVENT_HANDLER_NAME]);
    }
  }
  _getEventHandlerName(name) {
    return `_${name}EventHandler`;
  }
  _getEventNameByOption(optionValue) {
    // @ts-expect-error
    return isObject(optionValue) ? optionValue.name : optionValue;
  }
  _getEventName(optionName) {
    const optionValue = this.option(optionName);
    return this._getEventNameByOption(optionValue);
  }
  _getEventDelay(optionName) {
    const optionValue = this.option(optionName);
    // @ts-expect-error
    return isObject(optionValue) && optionValue.delay;
  }
  _renderArrow() {
    this._$arrow = $('<div>').addClass(POPOVER_ARROW_CLASS).prependTo(this.$overlayContent());
  }
  _documentDownHandler(e) {
    if (this._isOutsideClick(e)) {
      return super._documentDownHandler(e);
    }
    return true;
  }
  _isOutsideClick(e) {
    const {
      target
    } = this.option();
    // @ts-expect-error ts-error
    return !$(e.target).closest(target).length;
  }
  _animate(animation) {
    if (animation !== null && animation !== void 0 && animation.to && typeof animation.to === 'object') {
      extend(animation.to, {
        position: this._getContainerPosition()
      });
    }
    // @ts-expect-error ts-error
    super._animate.apply(this, arguments);
  }
  _stopAnimation() {
    // @ts-expect-error ts-error
    super._stopAnimation.apply(this, arguments);
  }
  _renderTopToolbar() {
    this.$wrapper().toggleClass(POPOVER_WITHOUT_TITLE_CLASS, !this.option('showTitle'));
    super._renderTopToolbar();
  }
  _renderPosition() {
    var _this$_actions, _this$_actions$onPosi;
    let shouldUpdateDimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    super._renderPosition();
    this._renderOverlayPosition(shouldUpdateDimensions);
    // @ts-expect-error should provide event
    (_this$_actions = this._actions) === null || _this$_actions === void 0 || (_this$_actions$onPosi = _this$_actions.onPositioned) === null || _this$_actions$onPosi === void 0 || _this$_actions$onPosi.call(_this$_actions);
  }
  _renderOverlayPosition(shouldUpdateDimensions) {
    this._resetOverlayPosition(shouldUpdateDimensions);
    this._updateContentSize(shouldUpdateDimensions);
    const contentPosition = this._getContainerPosition();
    const resultLocation = positionUtils.setup(this.$overlayContent(), contentPosition);
    const positionSide = this._getSideByLocation(resultLocation);
    this._togglePositionClass(`dx-position-${positionSide}`);
    this._toggleFlippedClass(resultLocation.h.flip, resultLocation.v.flip);
    const isArrowVisible = this._isHorizontalSide() || this._isVerticalSide();
    if (isArrowVisible) {
      this._renderArrowPosition(positionSide);
    }
  }
  _resetOverlayPosition(shouldUpdateDimensions) {
    this._setContentHeight(shouldUpdateDimensions);
    this._togglePositionClass(`dx-position-${this._positionController._positionSide}`);
    move(this.$overlayContent(), {
      left: 0,
      top: 0
    });
    this._$arrow.css({
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    });
  }
  _updateContentSize(shouldUpdateDimensions) {
    if (!this.$content() || !shouldUpdateDimensions) {
      return;
    }
    const containerLocation = positionUtils.calculate(this.$overlayContent(), this._getContainerPosition());
    if (containerLocation.h.oversize > 0 && this._isHorizontalSide() && !containerLocation.h.fit) {
      const newContainerWidth = getWidth(this.$overlayContent()) - containerLocation.h.oversize;
      setWidth(this.$overlayContent(), newContainerWidth);
    }
    if (containerLocation.v.oversize > 0 && this._isVerticalSide() && !containerLocation.v.fit) {
      const newOverlayContentHeight = getHeight(this.$overlayContent()) - containerLocation.v.oversize;
      const newPopupContentHeight = getHeight(this.$content()) - containerLocation.v.oversize;
      setHeight(this.$overlayContent(), newOverlayContentHeight);
      setHeight(this.$content(), newPopupContentHeight);
    }
  }
  _getContainerPosition() {
    return this._positionController._getContainerPosition();
  }
  _getHideOnParentScrollTarget() {
    var _this$_positionContro;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return $(((_this$_positionContro = this._positionController._position) === null || _this$_positionContro === void 0 ? void 0 : _this$_positionContro.of) || super._getHideOnParentScrollTarget());
  }
  _getSideByLocation(location) {
    const isFlippedByVertical = location.v.flip;
    const isFlippedByHorizontal = location.h.flip;
    const isVertical = this._isVerticalSide() && isFlippedByVertical;
    const isHorizontal = this._isHorizontalSide() && isFlippedByHorizontal;
    const isInside = this._isPopoverInside();
    const condition = isVertical || isHorizontal || isInside;
    const positionSide = this._positionController._positionSide;
    if (condition && positionSide) {
      return POSITION_FLIP_MAP[positionSide];
    }
    if (positionSide) {
      return positionSide;
    }
    return undefined;
  }
  _togglePositionClass(positionClass) {
    this.$wrapper().removeClass('dx-position-left dx-position-right dx-position-top dx-position-bottom').addClass(positionClass);
  }
  _toggleFlippedClass(isFlippedHorizontal, isFlippedVertical) {
    this.$wrapper().toggleClass('dx-popover-flipped-horizontal', isFlippedHorizontal).toggleClass('dx-popover-flipped-vertical', isFlippedVertical);
  }
  _renderArrowPosition(side) {
    var _this$_positionContro2;
    const arrowRect = getBoundingRect(this._$arrow.get(0));
    const arrowFlip = -(this._isVerticalSide(side) ? arrowRect.height : arrowRect.width);
    this._$arrow.css(POSITION_FLIP_MAP[side], arrowFlip);
    const axis = this._isVerticalSide(side) ? 'left' : 'top';
    const sizeProperty = this._isVerticalSide(side) ? 'width' : 'height';
    const $target = $((_this$_positionContro2 = this._positionController._position) === null || _this$_positionContro2 === void 0 ? void 0 : _this$_positionContro2.of);
    const targetOffset = positionUtils.offset($target) ?? {
      top: 0,
      left: 0
    };
    const contentOffset = positionUtils.offset(this.$overlayContent());
    const arrowSize = arrowRect[sizeProperty];
    const contentLocation = contentOffset === null || contentOffset === void 0 ? void 0 : contentOffset[axis];
    const contentSize = getBoundingRect(this.$overlayContent().get(0))[sizeProperty];
    const targetLocation = targetOffset[axis];
    const targetElement = $target.get(0);
    // @ts-expect-error ts-error
    const targetSize = targetElement && !targetElement.preventDefault ? getBoundingRect(targetElement)[sizeProperty] : 0;
    const min = Math.max(contentLocation, targetLocation);
    const max = Math.min(contentLocation + contentSize, targetLocation + targetSize);
    let arrowLocation;
    const {
      arrowPosition
    } = this.option();
    if (arrowPosition === 'start') {
      arrowLocation = min - contentLocation;
    } else if (arrowPosition === 'end') {
      arrowLocation = max - contentLocation - arrowSize;
    } else {
      arrowLocation = (min + max) / 2 - contentLocation - arrowSize / 2;
    }
    const borderWidth = this._positionController._getContentBorderWidth(side);
    const {
      arrowOffset
    } = this.option();
    const finalArrowLocation = fitIntoRange(arrowLocation - borderWidth + arrowOffset, borderWidth, contentSize - arrowSize - borderWidth * 2);
    this._$arrow.css(axis, finalArrowLocation);
  }
  _isPopoverInside() {
    return this._positionController._isPopoverInside();
  }
  _setContentHeight(fullUpdate) {
    if (fullUpdate) {
      super._setContentHeight();
    }
  }
  // @ts-expect-error Override parent method with more specific type
  _getPositionControllerConfig() {
    const superConfiguration = super._getPositionControllerConfig();
    const {
      shading,
      target
    } = this.option();
    const properties = _extends({}, superConfiguration.properties, {
      target,
      shading
    });
    const elements = _extends({}, superConfiguration.elements, {
      $arrow: this._$arrow
    });
    const configuration = {
      properties,
      elements
    };
    return configuration;
  }
  _initPositionController() {
    this._positionController = new PopoverPositionController(this._getPositionControllerConfig());
  }
  _renderWrapperDimensions() {
    if (this.option('shading')) {
      this.$wrapper().css({
        width: '100%',
        height: '100%'
      });
    }
  }
  _isVerticalSide(side) {
    return this._positionController._isVerticalSide(side);
  }
  _isHorizontalSide(side) {
    return this._positionController._isHorizontalSide(side);
  }
  _clearEventTimeout(name) {
    clearTimeout(this._timeouts[name]);
  }
  _clearEventsTimeouts() {
    this._clearEventTimeout('show');
    this._clearEventTimeout('hide');
  }
  _clean() {
    this._detachEvents(this.option('target'));
    // @ts-expect-error ts-error
    super._clean.apply(this, arguments);
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'arrowPosition':
      case 'arrowOffset':
        this._renderGeometry();
        break;
      case 'fullScreen':
        if (value) {
          this.option('fullScreen', false);
        }
        break;
      case 'target':
        if (previousValue) {
          this._detachEvents(previousValue);
        }
        this._positionController.updateTarget(value);
        this._invalidate();
        break;
      case 'showEvent':
      case 'hideEvent':
        {
          const eventName = name.substring(0, 4);
          const event = this._getEventNameByOption(previousValue);
          this.hide();
          const {
            target
          } = this.option();
          this._detachEvent(target, eventName, event);
          this._attachEvent(eventName);
          break;
        }
      case 'visible':
        this._clearEventTimeout(value ? 'show' : 'hide');
        super._optionChanged(args);
        break;
      case 'disabled':
        this._detachEvents(this.option('target'));
        this._attachEvents();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  show(target) {
    if (target) {
      this.option('target', target);
    }
    return super.show();
  }
}
registerComponent('dxPopover', Popover);
export default Popover;