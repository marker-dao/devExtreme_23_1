/**
* DevExtreme (esm/__internal/ui/scroll_view/scrollable.simulated.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { locate, move, resetPosition } from '../../../common/core/animation/translator';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace as addEventNamespace, isCommandKeyPressed, isDxMouseWheelEvent, normalizeKeyName } from '../../../common/core/events/utils/index';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { deferRender,
// @ts-expect-error ts-error
deferRenderer, deferUpdate,
// @ts-expect-error ts-error
deferUpdater } from '../../../core/utils/common';
import { Deferred, when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { titleize } from '../../../core/utils/inflector';
import { each, map } from '../../../core/utils/iterator';
import { getBoundingRect } from '../../../core/utils/position';
import { getHeight, getWidth } from '../../../core/utils/size';
import { isDefined } from '../../../core/utils/type';
import { getWindow, hasWindow } from '../../../core/utils/window';
import Animator from '../../ui/scroll_view/animator';
import Scrollbar from './scrollbar';
const SCROLLABLE_SIMULATED = 'dxSimulatedScrollable';
const SCROLLABLE_STRATEGY = 'dxScrollableStrategy';
const SCROLLABLE_SIMULATED_CURSOR = `${SCROLLABLE_SIMULATED}Cursor`;
const SCROLLABLE_SIMULATED_KEYBOARD = `${SCROLLABLE_SIMULATED}Keyboard`;
const SCROLLABLE_SIMULATED_CLASS = 'dx-scrollable-simulated';
const SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = 'dx-scrollable-scrollbars-alwaysvisible';
const SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';
const ACCELERATION = 0.92;
const OUT_BOUNDS_ACCELERATION = 0.5;
const MIN_VELOCITY_LIMIT = 1;
const FRAME_DURATION = Math.round(1000 / 60);
const SCROLL_LINE_HEIGHT = 40;
const VALIDATE_WHEEL_TIMEOUT = 500;
const BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
const BOUNCE_DURATION = 400;
const BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
const BOUNCE_ACCELERATION_SUM = (1 - ACCELERATION ** BOUNCE_FRAMES) / (1 - ACCELERATION);
const KEY_CODES = {
  PAGE_UP: 'pageUp',
  PAGE_DOWN: 'pageDown',
  END: 'end',
  HOME: 'home',
  LEFT: 'leftArrow',
  UP: 'upArrow',
  RIGHT: 'rightArrow',
  DOWN: 'downArrow',
  TAB: 'tab'
};
class InertiaAnimator extends Animator {
  constructor(scroller) {
    super();
    this.VELOCITY_LIMIT = MIN_VELOCITY_LIMIT;
    this.scroller = scroller;
  }
  _isFinished() {
    return Math.abs(this.scroller._velocity) <= this.VELOCITY_LIMIT;
  }
  _step() {
    this.scroller._scrollStep(this.scroller._velocity);
    this.scroller._velocity *= this._acceleration();
  }
  _acceleration() {
    return this.scroller._inBounds() ? ACCELERATION : OUT_BOUNDS_ACCELERATION;
  }
  _complete() {
    this.scroller._scrollComplete();
  }
}
class BounceAnimator extends InertiaAnimator {
  constructor() {
    super(...arguments);
    this.VELOCITY_LIMIT = BOUNCE_MIN_VELOCITY_LIMIT;
  }
  _isFinished() {
    return this.scroller._crossBoundOnNextStep() || super._isFinished();
  }
  _acceleration() {
    return ACCELERATION;
  }
  _complete() {
    this.scroller._move(this.scroller._bounceLocation);
    super._complete();
  }
}
export class Scroller {
  constructor(options) {
    this._initOptions(options);
    this._initAnimators();
    this._initScrollbar();
  }
  _initOptions(options) {
    this._location = 0;
    this._topReached = false;
    this._bottomReached = false;
    this._axis = options.direction === HORIZONTAL ? 'x' : 'y';
    this._prop = options.direction === HORIZONTAL ? 'left' : 'top';
    this._dimension = options.direction === HORIZONTAL ? 'width' : 'height';
    this._scrollProp = options.direction === HORIZONTAL ? 'scrollLeft' : 'scrollTop';
    each(options, (optionName, optionValue) => {
      this[`_${optionName}`] = optionValue;
    });
  }
  _initAnimators() {
    this._inertiaAnimator = new InertiaAnimator(this);
    this._bounceAnimator = new BounceAnimator(this);
  }
  _initScrollbar() {
    // @ts-expect-error ts-error
    this._scrollbar = new Scrollbar($('<div>').appendTo(this._$container), {
      direction: this._direction,
      visible: this._scrollByThumb,
      visibilityMode: this._visibilityModeNormalize(this._scrollbarVisible),
      expandable: this._scrollByThumb
    });
    this._$scrollbar = this._scrollbar.$element();
  }
  _visibilityModeNormalize(mode) {
    if (mode === true) return 'onScroll';
    if (mode === false) return 'never';
    return mode ?? 'never';
  }
  _scrollStep(delta) {
    const prevLocation = this._location;
    this._location += delta;
    this._suppressBounce();
    this._move();
    if (Math.abs(prevLocation - this._location) < 1) {
      return;
    }
    eventsEngine.triggerHandler(this._$container, {
      type: 'scroll'
    });
  }
  _suppressBounce() {
    if (this._bounceEnabled || this._inBounds(this._location)) {
      return;
    }
    this._velocity = 0;
    this._location = this._boundLocation();
  }
  _boundLocation(location) {
    const actualLocation = location ?? this._location;
    return Math.max(Math.min(actualLocation, this._maxOffset), this._minOffset);
  }
  _move(location) {
    this._location = location !== undefined ? location * this._getScaleRatio() : this._location;
    this._moveContent();
    this._moveScrollbar();
  }
  _moveContent() {
    const location = this._location;
    // @ts-expect-error ts-error
    this._$container[this._scrollProp](-location / this._getScaleRatio());
    this._moveContentByTranslator(location);
  }
  _getScaleRatio() {
    if (hasWindow() && !this._scaleRatio) {
      const element = this._$element[0];
      const dimension = this._dimension;
      const realDimension = this._getRealDimension(element, dimension);
      const baseDimension = this._getBaseDimension(element, dimension);
      // NOTE: Ratio can be a fractional number,
      // which leads to inaccuracy in the calculation of sizes.
      // We should round it to hundredths in order to reduce the inaccuracy
      // and prevent the unexpected appearance of a scrollbar.
      this._scaleRatio = Math.round(realDimension / baseDimension * 100) / 100;
    }
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return this._scaleRatio || 1;
  }
  _getRealDimension(element, dimension) {
    return Math.round(getBoundingRect(element)[dimension]);
  }
  _getBaseDimension(element, dimension) {
    // @ts-expect-error ts-error
    const dimensionName = `offset${titleize(dimension)}`;
    return element[dimensionName];
  }
  _moveContentByTranslator(location) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let translateOffset;
    const minOffset = -this._maxScrollPropValue;
    if (location > 0) {
      translateOffset = location;
    }
    if (location <= minOffset) {
      translateOffset = location - minOffset;
    }
    if (this._translateOffset === translateOffset) {
      return;
    }
    const targetLocation = {};
    targetLocation[this._prop] = translateOffset;
    this._translateOffset = translateOffset;
    if (!translateOffset) {
      resetPosition(this._$content);
      return;
    }
    move(this._$content, targetLocation);
  }
  _moveScrollbar() {
    this._scrollbar.moveTo(this._location);
  }
  _scrollComplete() {
    if (this._inBounds()) {
      this._hideScrollbar();
      if (this._completeDeferred) {
        this._completeDeferred.resolve();
      }
    }
    this._scrollToBounds();
  }
  _scrollToBounds() {
    var _this$_bounceAction;
    if (this._inBounds()) {
      return;
    }
    (_this$_bounceAction = this._bounceAction) === null || _this$_bounceAction === void 0 || _this$_bounceAction.call(this);
    this._setupBounce();
    this._bounceAnimator.start();
  }
  _setupBounce() {
    this._bounceLocation = this._boundLocation();
    const bounceDistance = this._bounceLocation - this._location;
    this._velocity = bounceDistance / BOUNCE_ACCELERATION_SUM;
  }
  _inBounds(location) {
    const currentLocation = location ?? this._location;
    return this._boundLocation(currentLocation) === currentLocation;
  }
  _crossBoundOnNextStep() {
    const location = this._location;
    const nextLocation = location + this._velocity;
    return location < this._minOffset && nextLocation >= this._minOffset || location > this._maxOffset && nextLocation <= this._maxOffset;
  }
  _initHandler(e) {
    this._stopScrolling();
    this._prepareThumbScrolling(e);
  }
  _stopScrolling() {
    deferRenderer(() => {
      this._hideScrollbar();
      this._inertiaAnimator.stop();
      this._bounceAnimator.stop();
    })();
  }
  _prepareThumbScrolling(e) {
    if (isDxMouseWheelEvent(e.originalEvent)) {
      return;
    }
    const $target = $(e.originalEvent.target);
    const scrollbarClicked = this._isScrollbar($target);
    if (scrollbarClicked) {
      this._moveToMouseLocation(e);
    }
    this._thumbScrolling = scrollbarClicked || this._isThumb($target);
    this._crossThumbScrolling = !this._thumbScrolling && this._isAnyThumbScrolling($target);
    if (this._thumbScrolling) {
      this._scrollbar.feedbackOn();
    }
  }
  _isThumbScrollingHandler($target) {
    return this._isThumb($target);
  }
  _moveToMouseLocation(e) {
    // @ts-expect-error ts-error
    const mouseLocation = e[`page${this._axis.toUpperCase()}`] - this._$element.offset()[this._prop];
    const location = this._location + mouseLocation / this._containerToContentRatio() - getHeight(this._$container) / 2;
    this._scrollStep(-Math.round(location));
  }
  _startHandler() {
    this._showScrollbar();
  }
  _moveHandler(delta) {
    if (this._crossThumbScrolling) {
      return;
    }
    if (this._thumbScrolling) {
      delta[this._axis] = -Math.round(delta[this._axis] / this._containerToContentRatio());
    }
    this._scrollBy(delta);
  }
  _scrollBy(delta) {
    let scrollDelta = delta[this._axis];
    if (!this._inBounds()) {
      scrollDelta *= OUT_BOUNDS_ACCELERATION;
    }
    this._scrollStep(scrollDelta);
  }
  _scrollByHandler(delta) {
    if (!delta.x && !delta.y) {
      return;
    }
    this._scrollBy(delta);
    this._scrollComplete();
  }
  _containerToContentRatio() {
    return this._scrollbar.containerToContentRatio();
  }
  _endHandler(velocity) {
    this._completeDeferred = Deferred();
    this._velocity = velocity[this._axis];
    this._inertiaHandler();
    this._resetThumbScrolling();
    return this._completeDeferred.promise();
  }
  _inertiaHandler() {
    this._suppressInertia();
    this._inertiaAnimator.start();
  }
  _suppressInertia() {
    if (!this._inertiaEnabled || this._thumbScrolling) {
      this._velocity = 0;
    }
  }
  _resetThumbScrolling() {
    this._thumbScrolling = false;
    this._crossThumbScrolling = false;
  }
  _stopHandler() {
    if (this._thumbScrolling) {
      this._scrollComplete();
    }
    this._resetThumbScrolling();
    this._scrollToBounds();
  }
  _disposeHandler() {
    this._stopScrolling();
    this._$scrollbar.remove();
  }
  _updateHandler() {
    this._update();
    this._moveToBounds();
  }
  _update() {
    this._stopScrolling();
    return deferUpdate(() => {
      this._resetScaleRatio();
      this._updateLocation();
      this._updateBounds();
      this._updateScrollbar();
      return deferRender(() => {
        this._moveScrollbar();
        this._scrollbar.update();
      });
    });
  }
  _resetScaleRatio() {
    this._scaleRatio = null;
  }
  _updateLocation() {
    // @ts-expect-error ts-error
    this._location = (locate(this._$content)[this._prop] - this._$container[this._scrollProp]()) * this._getScaleRatio();
  }
  _updateBounds() {
    this._maxOffset = this._getMaxOffset();
    this._minOffset = this._getMinOffset();
  }
  _getMaxOffset() {
    return 0;
  }
  _getMinOffset() {
    this._maxScrollPropValue = Math.max(this._contentSize() - this._containerSize(), 0);
    return -this._maxScrollPropValue;
  }
  _updateScrollbar() {
    deferUpdater(() => {
      const containerSize = this._containerSize();
      const contentSize = this._contentSize();
      // NOTE: Real container and content sizes can be a fractional number when scaling.
      //       Let's save sizes when scale = 100% to decide whether it is necessary to show
      //       the scrollbar based on by more precise numbers. We can do it because the container
      //       size to content size ratio should remain approximately the same at any zoom.
      const dimension = this._dimension;
      const baseContainerSize = this._getBaseDimension(this._$container[0], dimension);
      const baseContentSize = this._getBaseDimension(this._$content[0], dimension);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      deferRender(() => {
        this._scrollbar.option({
          containerSize,
          contentSize,
          baseContainerSize,
          baseContentSize,
          scaleRatio: this._getScaleRatio()
        });
      });
    })();
  }
  _moveToBounds() {
    deferRenderer(deferUpdater(deferRenderer(() => {
      const location = this._boundLocation();
      const locationChanged = location !== this._location;
      this._location = location;
      this._move();
      if (locationChanged) {
        var _this$_scrollAction;
        (_this$_scrollAction = this._scrollAction) === null || _this$_scrollAction === void 0 || _this$_scrollAction.call(this);
      }
    })))();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _createActionsHandler(actions) {
    this._scrollAction = actions.scroll;
    this._bounceAction = actions.bounce;
  }
  _showScrollbar() {
    this._scrollbar.option('visible', true);
  }
  _hideScrollbar() {
    this._scrollbar.option('visible', false);
  }
  _containerSize() {
    return this._getRealDimension(this._$container.get(0), this._dimension);
  }
  _contentSize() {
    // @ts-expect-error CSS method access
    const isOverflowHidden = this._$content.css(`overflow${this._axis.toUpperCase()}`) === 'hidden';
    let contentSize = this._getRealDimension(this._$content.get(0), this._dimension);
    if (!isOverflowHidden) {
      const containerScrollSize = this._$content[0][`scroll${titleize(this._dimension)}`] * this._getScaleRatio();
      contentSize = Math.max(containerScrollSize, contentSize);
    }
    return contentSize;
  }
  _validateEvent(e) {
    const $target = $(e.originalEvent.target);
    return this._isThumb($target) || this._isScrollbar($target);
  }
  _isThumb($element) {
    return this._scrollByThumb && this._scrollbar.isThumb($element);
  }
  _isScrollbar($element) {
    return Boolean(this._scrollByThumb && ($element === null || $element === void 0 ? void 0 : $element.is(this._$scrollbar)));
  }
  _reachedMin() {
    return Math.round(this._location - this._minOffset) <= 0;
  }
  _reachedMax() {
    return Math.round(this._location - this._maxOffset) >= 0;
  }
  _cursorEnterHandler() {
    this._resetScaleRatio();
    this._updateScrollbar();
    this._scrollbar.cursorEnter();
  }
  _cursorLeaveHandler() {
    this._scrollbar.cursorLeave();
  }
  isBottomReached() {
    return false;
  }
  dispose() {}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let hoveredScrollable = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let activeScrollable = null;
export class SimulatedStrategy {
  constructor(scrollable) {
    this._init(scrollable);
  }
  _init(scrollable) {
    this._component = scrollable;
    this._$element = scrollable.$element();
    this._$container = $(scrollable.container());
    this._$wrapper = scrollable._$wrapper;
    this._$content = scrollable.$content();
    this.option = scrollable.option.bind(scrollable);
    this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
    this._isLocked = scrollable._isLocked.bind(scrollable);
    this._isDirection = scrollable._isDirection.bind(scrollable);
    this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
    this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable);
  }
  render() {
    this._$element.addClass(SCROLLABLE_SIMULATED_CLASS);
    this._createScrollers();
    if (this.option('useKeyboard')) {
      this._$container.prop('tabIndex', 0);
    }
    this._attachKeyboardHandler();
    this._attachCursorHandlers();
  }
  _createScrollers() {
    // @ts-expect-error ts-error
    this._scrollers = {};
    if (this._isDirection(HORIZONTAL)) {
      this._createScroller(HORIZONTAL);
    }
    if (this._isDirection(VERTICAL)) {
      this._createScroller(VERTICAL);
    }
    this._$element.toggleClass(SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, this.option('showScrollbar') === 'always');
  }
  _createScroller(direction) {
    this._scrollers[direction] = new Scroller(this._scrollerOptions(direction));
  }
  _scrollerOptions(direction) {
    return {
      direction,
      $content: this._$content,
      $container: this._$container,
      $wrapper: this._$wrapper,
      $element: this._$element,
      scrollByThumb: this.option('scrollByThumb'),
      scrollbarVisible: this.option('showScrollbar'),
      bounceEnabled: this.option('bounceEnabled'),
      inertiaEnabled: this.option('inertiaEnabled'),
      isAnyThumbScrolling: this._isAnyThumbScrolling.bind(this)
    };
  }
  _applyScaleRatio(targetLocation) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const direction in this._scrollers) {
      const prop = this._getPropByDirection(direction);
      if (isDefined(targetLocation[prop])) {
        const scroller = this._scrollers[direction];
        const currentValue = targetLocation[prop];
        if (currentValue !== undefined) {
          targetLocation[prop] = currentValue * scroller._getScaleRatio();
        }
      }
    }
    return targetLocation;
  }
  _isAnyThumbScrolling($target) {
    let result = false;
    // @ts-expect-error ts-error
    this._eventHandler('isThumbScrolling', $target).done((isThumbScrollingVertical, isThumbScrollingHorizontal) => {
      result = isThumbScrollingVertical || isThumbScrollingHorizontal;
    });
    return result;
  }
  handleInit(e) {
    // @ts-expect-error ts-error
    this._suppressDirections(e);
    this._eventForUserAction = e;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('init', e);
  }
  _suppressDirections(e) {
    if (isDxMouseWheelEvent(e.originalEvent)) {
      this._prepareDirections(true);
      return;
    }
    this._prepareDirections();
    this._eachScroller(function suppressDirections(scroller, direction) {
      const $target = $(e.originalEvent.target);
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      const isValid = scroller._validateEvent(e) || this.option('scrollByContent') && this._isContent($target);
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this._validDirections[direction] = isValid;
    });
  }
  _isContent($element) {
    return !!$element.closest(this._$element).length;
  }
  _prepareDirections() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this._validDirections = {};
    this._validDirections[HORIZONTAL] = value;
    this._validDirections[VERTICAL] = value;
  }
  _eachScroller(callback) {
    const boundCallback = callback.bind(this);
    each(this._scrollers, (direction, scroller) => {
      boundCallback(scroller, direction);
    });
  }
  handleStart(e) {
    this._eventForUserAction = e;
    // @ts-expect-error ts-error
    this._eventHandler('start').done(this._startAction);
  }
  _saveActive() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    activeScrollable = this;
  }
  _resetActive() {
    if (activeScrollable === this) {
      activeScrollable = null;
    }
  }
  handleMove(e) {
    var _e$preventDefault;
    if (this._isLocked()) {
      e.cancel = true;
      this._resetActive();
      return;
    }
    this._saveActive();
    (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 || _e$preventDefault.call(e);
    this._adjustDistance(e, e.delta);
    this._eventForUserAction = e;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('move', e.delta);
  }
  _adjustDistance(e, distance) {
    // @ts-expect-error ts-error
    distance.x *= this._validDirections[HORIZONTAL];
    // @ts-expect-error ts-error
    distance.y *= this._validDirections[VERTICAL];
    const devicePixelRatio = this._tryGetDevicePixelRatio();
    if (devicePixelRatio && isDxMouseWheelEvent(e.originalEvent)) {
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  }
  _tryGetDevicePixelRatio() {
    if (hasWindow()) {
      return getWindow().devicePixelRatio;
    }
    return undefined;
  }
  handleEnd(e) {
    var _e$originalEvent;
    this._resetActive();
    this._refreshCursorState(((_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 ? void 0 : _e$originalEvent.target) ?? undefined);
    this._adjustDistance(e, e.velocity);
    this._eventForUserAction = e;
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._eventHandler('end', e.velocity).done(this._endAction);
  }
  handleCancel(e) {
    this._resetActive();
    this._eventForUserAction = e;
    return this._eventHandler('end', {
      x: 0,
      y: 0
    });
  }
  handleStop() {
    this._resetActive();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('stop');
  }
  handleScroll() {
    var _this$_scrollAction2;
    this._updateRtlConfig();
    (_this$_scrollAction2 = this._scrollAction) === null || _this$_scrollAction2 === void 0 || _this$_scrollAction2.call(this);
  }
  _attachKeyboardHandler() {
    eventsEngine.off(this._$element, `.${SCROLLABLE_SIMULATED_KEYBOARD}`);
    if (!this.option('disabled') && this.option('useKeyboard')) {
      eventsEngine.on(this._$element, addEventNamespace('keydown', SCROLLABLE_SIMULATED_KEYBOARD), this._keyDownHandler.bind(this));
    }
  }
  _keyDownHandler(e) {
    clearTimeout(this._updateHandlerTimeout);
    // eslint-disable-next-line no-restricted-globals
    this._updateHandlerTimeout = setTimeout(() => {
      if (normalizeKeyName(e) === KEY_CODES.TAB) {
        this._eachScroller(scroller => {
          scroller._updateHandler();
        });
      }
    });
    // @ts-expect-error ts-error
    if (!this._$container.is(domAdapter.getActiveElement(this._$container.get(0)))) {
      return;
    }
    let handled = true;
    switch (normalizeKeyName(e)) {
      case KEY_CODES.DOWN:
        this._scrollByLine({
          y: 1
        });
        break;
      case KEY_CODES.UP:
        this._scrollByLine({
          y: -1
        });
        break;
      case KEY_CODES.RIGHT:
        this._scrollByLine({
          x: 1
        });
        break;
      case KEY_CODES.LEFT:
        this._scrollByLine({
          x: -1
        });
        break;
      case KEY_CODES.PAGE_DOWN:
        this._scrollByPage(1);
        break;
      case KEY_CODES.PAGE_UP:
        this._scrollByPage(-1);
        break;
      case KEY_CODES.HOME:
        this._scrollToHome();
        break;
      case KEY_CODES.END:
        this._scrollToEnd();
        break;
      default:
        handled = false;
        break;
    }
    if (handled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  _scrollByLine(lines) {
    const devicePixelRatio = this._tryGetDevicePixelRatio();
    let scrollOffset = SCROLL_LINE_HEIGHT;
    if (devicePixelRatio) {
      scrollOffset = Math.abs(scrollOffset / devicePixelRatio * 100) / 100;
    }
    this.scrollBy({
      top: (lines.y ?? 0) * -scrollOffset,
      left: (lines.x ?? 0) * -scrollOffset
    });
  }
  _scrollByPage(page) {
    const prop = this._wheelProp();
    const dimension = this._dimensionByProp(prop);
    const distance = {};
    const getter = dimension === 'width' ? getWidth : getHeight;
    distance[prop] = page * -getter(this._$container);
    this.scrollBy(distance);
  }
  _dimensionByProp(prop) {
    return prop === 'left' ? 'width' : 'height';
  }
  _getPropByDirection(direction) {
    return direction === HORIZONTAL ? 'left' : 'top';
  }
  _scrollToHome() {
    const prop = this._wheelProp();
    const distance = {};
    distance[prop] = 0;
    this._component.scrollTo(distance);
  }
  _scrollToEnd() {
    const prop = this._wheelProp();
    const dimension = this._dimensionByProp(prop);
    const distance = {};
    const getter = dimension === 'width' ? getWidth : getHeight;
    distance[prop] = getter(this._$content) - getter(this._$container);
    this._component.scrollTo(distance);
  }
  createActions() {
    this._startAction = this._createActionHandler('onStart');
    this._endAction = this._createActionHandler('onEnd');
    this._updateAction = this._createActionHandler('onUpdated');
    this._createScrollerActions();
  }
  _createScrollerActions() {
    this._scrollAction = this._createActionHandler('onScroll');
    this._bounceAction = this._createActionHandler('onBounce');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('createActions', {
      scroll: this._scrollAction,
      bounce: this._bounceAction
    });
  }
  _createActionHandler(optionName) {
    var _this = this;
    const actionHandler = this._createActionByOption(optionName);
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      actionHandler(extend(_this._createActionArgs(), args));
    };
  }
  _createActionArgs() {
    const {
      horizontal: scrollerX,
      vertical: scrollerY
    } = this._scrollers;
    const offset = this._getScrollOffset();
    this._scrollOffset = {
      top: scrollerY && offset.top,
      left: scrollerX && offset.left
    };
    return {
      // @ts-expect-error ts-error
      event: this._eventForUserAction,
      scrollOffset: this._scrollOffset,
      reachedLeft: scrollerX === null || scrollerX === void 0 ? void 0 : scrollerX._reachedMax(),
      reachedRight: scrollerX === null || scrollerX === void 0 ? void 0 : scrollerX._reachedMin(),
      reachedTop: scrollerY === null || scrollerY === void 0 ? void 0 : scrollerY._reachedMax(),
      reachedBottom: scrollerY === null || scrollerY === void 0 ? void 0 : scrollerY._reachedMin()
    };
  }
  _getScrollOffset() {
    return {
      top: -this.location().top,
      left: -this.location().left
    };
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
  _eventHandler(eventName, location) {
    // eslint-disable-next-line prefer-rest-params
    const args = [].slice.call(arguments).slice(1);
    // eslint-disable-next-line prefer-spread, @typescript-eslint/no-unsafe-return
    const deferreds = map(this._scrollers, scroller => scroller[`_${eventName}Handler`].apply(scroller, args));
    return when.apply($, deferreds).promise();
  }
  location() {
    const location = locate(this._$content);
    // @ts-expect-error ts-error
    location.top -= this._$container.scrollTop();
    // @ts-expect-error ts-error
    location.left -= this._$container.scrollLeft();
    return location;
  }
  disabledChanged() {
    this._attachCursorHandlers();
  }
  _attachCursorHandlers() {
    eventsEngine.off(this._$element, `.${SCROLLABLE_SIMULATED_CURSOR}`);
    const {
      disabled
    } = this.option();
    if (!disabled && this._isHoverMode()) {
      eventsEngine.on(this._$element, addEventNamespace('mouseenter', SCROLLABLE_SIMULATED_CURSOR), this._cursorEnterHandler.bind(this));
      eventsEngine.on(this._$element, addEventNamespace('mouseleave', SCROLLABLE_SIMULATED_CURSOR), this._cursorLeaveHandler.bind(this));
    }
  }
  _isHoverMode() {
    return this.option('showScrollbar') === 'onHover';
  }
  _cursorEnterHandler(e) {
    const event = e || {};
    event.originalEvent = event.originalEvent || {};
    // @ts-expect-error ts-error
    if (activeScrollable || event.originalEvent._hoverHandled) {
      return;
    }
    if (hoveredScrollable) {
      hoveredScrollable._cursorLeaveHandler();
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    hoveredScrollable = this;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('cursorEnter');
    // @ts-expect-error ts-error
    event.originalEvent._hoverHandled = true;
  }
  _cursorLeaveHandler(e) {
    if (hoveredScrollable !== this || activeScrollable === hoveredScrollable) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('cursorLeave');
    hoveredScrollable = null;
    this._refreshCursorState(e === null || e === void 0 ? void 0 : e.relatedTarget);
  }
  _refreshCursorState(target) {
    if (!this._isHoverMode() && (!target || activeScrollable)) {
      return;
    }
    const $target = $(target);
    const $scrollable = $target.closest(`.${SCROLLABLE_SIMULATED_CLASS}:not(.dx-state-disabled)`);
    const targetScrollable = $scrollable.length && $scrollable.data(SCROLLABLE_STRATEGY);
    // @ts-expect-error ts-error
    if (hoveredScrollable && hoveredScrollable !== targetScrollable) {
      hoveredScrollable._cursorLeaveHandler();
    }
    if (targetScrollable) {
      // @ts-expect-error ts-error
      targetScrollable._cursorEnterHandler();
    }
  }
  update() {
    // @ts-expect-error ts-error
    const result = this._eventHandler('update').done(this._updateAction);
    return when(result, deferUpdate(() => {
      const allowedDirections = this._allowedDirections();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      deferRender(() => {
        let touchDirection = allowedDirections.vertical ? 'pan-x' : '';
        touchDirection = allowedDirections.horizontal ? 'pan-y' : touchDirection;
        touchDirection = allowedDirections.vertical && allowedDirections.horizontal ? 'none' : touchDirection;
        this._$container.css('touchAction', touchDirection);
      });
      return when().promise();
    }));
  }
  _allowedDirections() {
    const {
      bounceEnabled
    } = this.option();
    const verticalScroller = this._scrollers[VERTICAL];
    const horizontalScroller = this._scrollers[HORIZONTAL];
    return {
      vertical: Boolean(verticalScroller && (verticalScroller._minOffset < 0 || bounceEnabled)),
      horizontal: Boolean(horizontalScroller && (horizontalScroller._minOffset < 0 || bounceEnabled))
    };
  }
  _updateBounds() {
    var _this$_scrollers$HORI;
    (_this$_scrollers$HORI = this._scrollers[HORIZONTAL]) === null || _this$_scrollers$HORI === void 0 || _this$_scrollers$HORI._updateBounds();
  }
  _isHorizontalAndRtlEnabled() {
    return this.option('rtlEnabled') && this.option('direction') !== VERTICAL;
  }
  updateRtlPosition(needInitializeRtlConfig) {
    if (needInitializeRtlConfig) {
      this._rtlConfig = {
        scrollRight: 0,
        clientWidth: this._$container.get(0).clientWidth,
        windowPixelRatio: this._getWindowDevicePixelRatio()
      };
    }
    this._updateBounds();
    if (this._isHorizontalAndRtlEnabled()) {
      let scrollLeft = this._getMaxOffset().left - this._rtlConfig.scrollRight;
      if (scrollLeft <= 0) {
        scrollLeft = 0;
        this._rtlConfig.scrollRight = this._getMaxOffset().left;
      }
      if (this._getScrollOffset().left !== scrollLeft) {
        this._rtlConfig.skipUpdating = true;
        this._component.scrollTo({
          left: scrollLeft
        });
        this._rtlConfig.skipUpdating = false;
      }
    }
  }
  _updateRtlConfig() {
    if (this._isHorizontalAndRtlEnabled() && !this._rtlConfig.skipUpdating) {
      const {
        clientWidth,
        scrollLeft
      } = this._$container.get(0);
      const windowPixelRatio = this._getWindowDevicePixelRatio();
      if (this._rtlConfig.windowPixelRatio === windowPixelRatio && this._rtlConfig.clientWidth === clientWidth) {
        this._rtlConfig.scrollRight = this._getMaxOffset().left - scrollLeft;
      }
      this._rtlConfig.clientWidth = clientWidth;
      this._rtlConfig.windowPixelRatio = windowPixelRatio;
    }
  }
  _getWindowDevicePixelRatio() {
    return hasWindow() ? getWindow().devicePixelRatio : 1;
  }
  scrollBy(distance) {
    var _this$_startAction, _this$_endAction;
    const verticalScroller = this._scrollers[VERTICAL];
    const horizontalScroller = this._scrollers[HORIZONTAL];
    if (verticalScroller) {
      distance.top = verticalScroller._boundLocation(
      // @ts-expect-error ts-error
      distance.top + verticalScroller._location) - verticalScroller._location;
    }
    if (horizontalScroller) {
      distance.left = horizontalScroller._boundLocation(
      // @ts-expect-error ts-error
      distance.left + horizontalScroller._location) - horizontalScroller._location;
    }
    this._prepareDirections(true);
    (_this$_startAction = this._startAction) === null || _this$_startAction === void 0 || _this$_startAction.call(this);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('scrollBy', {
      x: distance.left,
      y: distance.top
    });
    (_this$_endAction = this._endAction) === null || _this$_endAction === void 0 || _this$_endAction.call(this);
    this._updateRtlConfig();
  }
  validate(e) {
    if (isDxMouseWheelEvent(e) && isCommandKeyPressed(e)) {
      return false;
    }
    if (this.option('disabled')) {
      return false;
    }
    if (this.option('bounceEnabled')) {
      return true;
    }
    return isDxMouseWheelEvent(e) ? this._validateWheel(e) : this._validateMove(e);
  }
  _validateWheel(e) {
    const scroller = this._scrollers[this._wheelDirection(e)];
    const reachedMin = scroller._reachedMin();
    const reachedMax = scroller._reachedMax();
    const contentGreaterThanContainer = !reachedMin || !reachedMax;
    const locatedNotAtBound = !reachedMin && !reachedMax;
    const scrollFromMin = reachedMin && e.delta > 0;
    const scrollFromMax = reachedMax && e.delta < 0;
    let validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
    validated = validated || this._validateWheelTimer !== undefined;
    if (validated) {
      clearTimeout(this._validateWheelTimer);
      // eslint-disable-next-line no-restricted-globals
      this._validateWheelTimer = setTimeout(() => {
        this._validateWheelTimer = undefined;
      }, VALIDATE_WHEEL_TIMEOUT);
    }
    return validated;
  }
  _validateMove(e) {
    const {
      scrollByContent
    } = this.option();
    if (!scrollByContent && !$(e.target).closest(`.${SCROLLABLE_SCROLLBAR_CLASS}`).length) {
      return false;
    }
    return this._allowedDirection();
  }
  getDirection(e) {
    return isDxMouseWheelEvent(e) ? this._wheelDirection(e) : this._allowedDirection();
  }
  _wheelProp() {
    return this._wheelDirection() === HORIZONTAL ? 'left' : 'top';
  }
  _wheelDirection(e) {
    const {
      direction
    } = this.option();
    switch (direction) {
      case HORIZONTAL:
        return HORIZONTAL;
      case VERTICAL:
        return VERTICAL;
      default:
        return e !== null && e !== void 0 && e.shiftKey ? HORIZONTAL : VERTICAL;
    }
  }
  dispose() {
    this._resetActive();
    if (hoveredScrollable === this) {
      hoveredScrollable = null;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('dispose');
    this._detachEventHandlers();
    this._$element.removeClass(SCROLLABLE_SIMULATED_CLASS);
    this._eventForUserAction = undefined;
    clearTimeout(this._validateWheelTimer);
    clearTimeout(this._updateHandlerTimeout);
  }
  _detachEventHandlers() {
    eventsEngine.off(this._$element, `.${SCROLLABLE_SIMULATED_CURSOR}`);
    eventsEngine.off(this._$container, `.${SCROLLABLE_SIMULATED_KEYBOARD}`);
  }
}
