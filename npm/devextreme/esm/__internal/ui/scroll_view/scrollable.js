/**
* DevExtreme (esm/__internal/ui/scroll_view/scrollable.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../../common/core/events/core/events_engine';
import scrollEvents from '../../../common/core/events/gesture/emitter.gesture.scroll';
import { addNamespace } from '../../../common/core/events/utils/index';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import browser from '../../../core/utils/browser';
import { ensureDefined, noop } from '../../../core/utils/common';
import { Deferred, when } from '../../../core/utils/deferred';
import { getHeight, getOuterHeight, getOuterWidth, getWidth } from '../../../core/utils/size';
import { isDefined, isPlainObject } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import DOMComponent from '../../core/widget/dom_component';
import { getElementLocationInternal } from '../../ui/scroll_view/utils/get_element_location_internal';
import supportUtils from '../../core/utils/m_support';
import { deviceDependentOptions } from './scrollable.device';
import NativeStrategy from './scrollable.native';
import { SimulatedStrategy } from './scrollable.simulated';
const SCROLLABLE = 'dxScrollable';
const SCROLLABLE_STRATEGY = 'dxScrollableStrategy';
const SCROLLABLE_CLASS = 'dx-scrollable';
const SCROLLABLE_DISABLED_CLASS = 'dx-scrollable-disabled';
const SCROLLABLE_CONTAINER_CLASS = 'dx-scrollable-container';
const SCROLLABLE_WRAPPER_CLASS = 'dx-scrollable-wrapper';
const SCROLLABLE_CONTENT_CLASS = 'dx-scrollable-content';
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';
const BOTH = 'both';
class Scrollable extends DOMComponent {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      disabled: false,
      onScroll: null,
      direction: VERTICAL,
      showScrollbar: 'onScroll',
      useNative: true,
      bounceEnabled: true,
      scrollByContent: true,
      scrollByThumb: false,
      onUpdated: null,
      onStart: null,
      onEnd: null,
      onBounce: null,
      useSimulatedScrollbar: false,
      useKeyboard: true,
      inertiaEnabled: true,
      updateManually: false,
      _onVisibilityChanged: noop
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat(deviceDependentOptions(), [{
      device() {
        return !!(supportUtils.nativeScrolling && devices.real().platform === 'android' && !browser.mozilla);
      },
      // @ts-expect-error ts-error
      options: {
        useSimulatedScrollbar: true
      }
    }]);
  }
  _initOptions(options) {
    super._initOptions(options);
    if (!('useSimulatedScrollbar' in options)) {
      this._setUseSimulatedScrollbar();
    }
  }
  _setUseSimulatedScrollbar() {
    if (!this.initialOption('useSimulatedScrollbar')) {
      this.option('useSimulatedScrollbar', !this.option('useNative'));
    }
  }
  _init() {
    super._init();
    this._initScrollableMarkup();
    this._locked = false;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this.update();
      this._updateRtlPosition();
      if (this._savedScrollOffset) {
        this.scrollTo(this._savedScrollOffset);
      }
      delete this._savedScrollOffset;
      const {
        _onVisibilityChanged: onVisibilityChanged
      } = this.option();
      onVisibilityChanged === null || onVisibilityChanged === void 0 || onVisibilityChanged(this);
    } else {
      this._savedScrollOffset = this.scrollOffset();
    }
  }
  _initScrollableMarkup() {
    const $element = this.$element().addClass(SCROLLABLE_CLASS);
    const $container = $('<div>').addClass(SCROLLABLE_CONTAINER_CLASS);
    const $wrapper = $('<div>').addClass(SCROLLABLE_WRAPPER_CLASS);
    const $content = $('<div>').addClass(SCROLLABLE_CONTENT_CLASS);
    this._$container = $container;
    this._$wrapper = $wrapper;
    this._$content = $content;
    $content.append($element.contents()).appendTo($container);
    $container.appendTo($wrapper);
    $wrapper.appendTo($element);
  }
  _dimensionChanged() {
    this.update();
    this._updateRtlPosition();
  }
  _initMarkup() {
    super._initMarkup();
    this._renderDirection();
  }
  _render() {
    this._renderStrategy();
    this._attachEventHandlers();
    this._renderDisabledState();
    this._createActions();
    this.update();
    super._render();
    this._updateRtlPosition(true);
  }
  _updateRtlPosition(needInitializeRtlConfig) {
    this._strategy.updateRtlPosition(needInitializeRtlConfig);
  }
  _getMaxOffset() {
    const {
      scrollWidth,
      clientWidth,
      scrollHeight,
      clientHeight
    } = $(this.container()).get(0);
    return {
      left: scrollWidth - clientWidth,
      top: scrollHeight - clientHeight
    };
  }
  _attachEventHandlers() {
    const strategy = this._strategy;
    const initEventData = {
      getDirection: strategy.getDirection.bind(strategy),
      validate: this._validate.bind(this),
      isNative: this.option('useNative'),
      scrollTarget: this._$container
    };
    eventsEngine.off(this._$wrapper, `.${SCROLLABLE}`);
    eventsEngine.on(this._$wrapper, addNamespace(scrollEvents.init, SCROLLABLE), initEventData, this._initHandler.bind(this));
    eventsEngine.on(this._$wrapper, addNamespace(scrollEvents.start, SCROLLABLE), strategy.handleStart.bind(strategy));
    eventsEngine.on(this._$wrapper, addNamespace(scrollEvents.move, SCROLLABLE), strategy.handleMove.bind(strategy));
    eventsEngine.on(this._$wrapper, addNamespace(scrollEvents.end, SCROLLABLE), strategy.handleEnd.bind(strategy));
    eventsEngine.on(this._$wrapper, addNamespace(scrollEvents.cancel, SCROLLABLE), strategy.handleCancel.bind(strategy));
    eventsEngine.on(this._$wrapper, addNamespace(scrollEvents.stop, SCROLLABLE), strategy.handleStop.bind(strategy));
    eventsEngine.off(this._$container, `.${SCROLLABLE}`);
    eventsEngine.on(this._$container, addNamespace('scroll', SCROLLABLE), strategy.handleScroll.bind(strategy));
  }
  _validate(e) {
    if (this._isLocked()) {
      return false;
    }
    this._updateIfNeed();
    return this._moveIsAllowed(e);
  }
  _moveIsAllowed(e) {
    const result = this._strategy.validate(e);
    return Boolean(result);
  }
  handleMove(e) {
    this._strategy.handleMove(e);
  }
  _prepareDirections(value) {
    this._strategy._prepareDirections(value);
  }
  _initHandler(e) {
    this._strategy.handleInit(e);
  }
  _renderDisabledState() {
    const {
      disabled
    } = this.option();
    this.$element().toggleClass(SCROLLABLE_DISABLED_CLASS, disabled);
    if (this.option('disabled')) {
      this._lock();
    } else {
      this._unlock();
    }
  }
  _renderDirection() {
    const {
      direction
    } = this.option();
    this.$element().removeClass(`dx-scrollable-${HORIZONTAL}`).removeClass(`dx-scrollable-${VERTICAL}`).removeClass(`dx-scrollable-${BOTH}`).addClass(`dx-scrollable-${direction}`);
  }
  _renderStrategy() {
    this._createStrategy();
    this._strategy.render();
    this.$element().data(SCROLLABLE_STRATEGY, this._strategy);
  }
  _createStrategy() {
    const {
      useNative
    } = this.option();
    // @ts-expect-error ts-error
    this._strategy = useNative ? new NativeStrategy(this) : new SimulatedStrategy(this);
  }
  _createActions() {
    var _this$_strategy;
    (_this$_strategy = this._strategy) === null || _this$_strategy === void 0 || _this$_strategy.createActions();
  }
  _clean() {
    var _this$_strategy2;
    (_this$_strategy2 = this._strategy) === null || _this$_strategy2 === void 0 || _this$_strategy2.dispose();
  }
  _optionChanged(args) {
    var _this$_strategy3;
    switch (args.name) {
      case 'onStart':
      case 'onEnd':
      case 'onUpdated':
      case 'onScroll':
      case 'onBounce':
        this._createActions();
        break;
      case 'direction':
        this._resetInactiveDirection();
        this._invalidate();
        break;
      case 'useNative':
        this._setUseSimulatedScrollbar();
        this._invalidate();
        break;
      case 'inertiaEnabled':
      case 'scrollByThumb':
      case 'bounceEnabled':
      case 'useKeyboard':
      case 'showScrollbar':
      case 'useSimulatedScrollbar':
        this._invalidate();
        break;
      case 'disabled':
        this._renderDisabledState();
        (_this$_strategy3 = this._strategy) === null || _this$_strategy3 === void 0 || _this$_strategy3.disabledChanged();
        break;
      case 'updateManually':
      case 'scrollByContent':
      case '_onVisibilityChanged':
        break;
      case 'width':
        super._optionChanged(args);
        this._updateRtlPosition();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetInactiveDirection() {
    const inactiveProp = this._getInactiveProp();
    if (!inactiveProp || !hasWindow()) {
      return;
    }
    const scrollOffset = this.scrollOffset();
    scrollOffset[inactiveProp] = 0;
    this.scrollTo(scrollOffset);
  }
  _getInactiveProp() {
    const {
      direction
    } = this.option();
    if (direction === VERTICAL) {
      return 'left';
    }
    return 'top';
  }
  _location() {
    return this._strategy.location();
  }
  _normalizeLocation(location) {
    if (isPlainObject(location)) {
      const left = ensureDefined(location.left, location.x);
      const top = ensureDefined(location.top, location.y);
      return {
        left: isDefined(left) ? -left : undefined,
        top: isDefined(top) ? -top : undefined
      };
    }
    const {
      direction
    } = this.option();
    return {
      left: direction !== VERTICAL ? -location : undefined,
      top: direction !== HORIZONTAL ? -location : undefined
    };
  }
  _isLocked() {
    return this._locked;
  }
  _lock() {
    this._locked = true;
  }
  _unlock() {
    if (!this.option('disabled')) {
      this._locked = false;
    }
  }
  _isDirection(direction) {
    const {
      direction: current
    } = this.option();
    if (direction === VERTICAL) {
      return current !== HORIZONTAL;
    }
    if (direction === HORIZONTAL) {
      return current !== VERTICAL;
    }
    return current === direction;
  }
  _updateAllowedDirection() {
    const allowedDirections = this._strategy._allowedDirections();
    if (this._isDirection(BOTH) && allowedDirections.vertical && allowedDirections.horizontal) {
      this._allowedDirectionValue = BOTH;
    } else if (this._isDirection(HORIZONTAL) && allowedDirections.horizontal) {
      this._allowedDirectionValue = HORIZONTAL;
    } else if (this._isDirection(VERTICAL) && allowedDirections.vertical) {
      this._allowedDirectionValue = VERTICAL;
    } else {
      this._allowedDirectionValue = null;
    }
  }
  _allowedDirection() {
    return this._allowedDirectionValue;
  }
  $content() {
    return this._$content;
  }
  content() {
    return getPublicElement(this._$content);
  }
  container() {
    return getPublicElement(this._$container);
  }
  scrollOffset() {
    return this._strategy._getScrollOffset();
  }
  _isRtlNativeStrategy() {
    const {
      useNative,
      rtlEnabled
    } = this.option();
    return useNative && rtlEnabled;
  }
  scrollTop() {
    return this.scrollOffset().top;
  }
  scrollLeft() {
    return this.scrollOffset().left;
  }
  clientHeight() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getHeight(this._$container);
  }
  scrollHeight() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getOuterHeight(this.$content());
  }
  clientWidth() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getWidth(this._$container);
  }
  scrollWidth() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getOuterWidth(this.$content());
  }
  update() {
    if (!this._strategy) {
      return Deferred().resolve();
    }
    return when(this._strategy.update()).done(() => {
      this._updateAllowedDirection();
    });
  }
  scrollBy(distance) {
    const normalizedDistance = this._normalizeLocation(distance);
    if (!normalizedDistance.top && !normalizedDistance.left) {
      return;
    }
    this._updateIfNeed();
    this._strategy.scrollBy(normalizedDistance);
  }
  scrollTo(targetLocation) {
    if (!hasWindow()) {
      return;
    }
    let normalizedLocation = this._normalizeLocation(targetLocation);
    this._updateIfNeed();
    let location = this._location();
    const {
      useNative
    } = this.option();
    if (!useNative) {
      const strategy = this._strategy;
      normalizedLocation = strategy._applyScaleRatio(normalizedLocation);
      location = strategy._applyScaleRatio(location);
    }
    if (this._isRtlNativeStrategy()) {
      location.left -= this._getMaxOffset().left;
    }
    const distance = this._normalizeLocation({
      left: location.left - ensureDefined(normalizedLocation.left, location.left),
      top: location.top - ensureDefined(normalizedLocation.top, location.top)
    });
    if (!distance.top && !distance.left) {
      return;
    }
    this._strategy.scrollBy(distance);
  }
  scrollToElement(element, offset) {
    const $element = $(element);
    const elementInsideContent = this.$content().find(element).length;
    const elementIsInsideContent = $element.parents(`.${SCROLLABLE_CLASS}`).length - $element.parents(`.${SCROLLABLE_CONTENT_CLASS}`).length === 0;
    if (!elementInsideContent || !elementIsInsideContent) {
      return;
    }
    const scrollPosition = {
      top: 0,
      left: 0
    };
    const {
      direction
    } = this.option();
    if (direction !== VERTICAL) {
      scrollPosition.left = this.getScrollElementPosition($element, HORIZONTAL, offset);
    }
    if (direction !== HORIZONTAL) {
      scrollPosition.top = this.getScrollElementPosition($element, VERTICAL, offset);
    }
    this.scrollTo(scrollPosition);
  }
  getScrollElementPosition($element, direction, offset) {
    const scrollOffset = this.scrollOffset();
    return getElementLocationInternal($element[0], direction, $(this.container())[0], scrollOffset, offset);
  }
  _updateIfNeed() {
    if (!this.option('updateManually')) {
      this.update();
    }
  }
  _useTemplates() {
    return false;
  }
}
registerComponent(SCROLLABLE, Scrollable);
export default Scrollable;
