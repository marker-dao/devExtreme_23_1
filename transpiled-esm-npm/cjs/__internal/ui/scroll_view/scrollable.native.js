"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _scrollbar = _interopRequireDefault(require("../../ui/scroll_view/scrollbar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SCROLLABLE_NATIVE = 'dxNativeScrollable';
const SCROLLABLE_NATIVE_CLASS = 'dx-scrollable-native';
const SCROLLABLE_SCROLLBAR_SIMULATED = 'dx-scrollable-scrollbar-simulated';
const SCROLLABLE_SCROLLBARS_HIDDEN = 'dx-scrollable-scrollbars-hidden';
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';
const HIDE_SCROLLBAR_TIMEOUT = 500;
class NativeStrategy {
  constructor(scrollable) {
    this._init(scrollable);
  }
  _init(scrollable) {
    this._component = scrollable;
    this._$element = scrollable.$element();
    this._$container = (0, _renderer.default)(scrollable.container());
    this._$content = scrollable.$content();
    const {
      direction,
      useSimulatedScrollbar
    } = scrollable.option();
    this._direction = direction;
    this._useSimulatedScrollbar = useSimulatedScrollbar;
    this.option = scrollable.option.bind(scrollable);
    // @ts-expect-error ts-error
    this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
    this._isLocked = scrollable._isLocked.bind(scrollable);
    this._isDirection = scrollable._isDirection.bind(scrollable);
    this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
    this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable);
    this._isRtlNativeStrategy = scrollable._isRtlNativeStrategy.bind(scrollable);
  }
  render() {
    const device = _devices.default.real();
    const deviceType = device.platform;
    this._$element.addClass(SCROLLABLE_NATIVE_CLASS).addClass(`${SCROLLABLE_NATIVE_CLASS}-${deviceType}`).toggleClass(SCROLLABLE_SCROLLBARS_HIDDEN, !this._isScrollbarVisible());
    if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
      this._renderScrollbars();
    }
  }
  updateRtlPosition(isFirstRender) {
    const {
      rtlEnabled
    } = this.option();
    if (isFirstRender && rtlEnabled) {
      if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
        this._moveScrollbars();
      }
    }
  }
  _renderScrollbars() {
    this._scrollbars = {};
    this._hideScrollbarTimeout = 0;
    this._$element.addClass(SCROLLABLE_SCROLLBAR_SIMULATED);
    this._renderScrollbar(VERTICAL);
    this._renderScrollbar(HORIZONTAL);
  }
  _renderScrollbar(direction) {
    if (!this._isDirection(direction)) {
      return;
    }
    const {
      scrollByThumb
    } = this.option();
    this._scrollbars[direction] = new _scrollbar.default(
    // @ts-expect-error ts-error
    (0, _renderer.default)('<div>').appendTo(this._$element), {
      direction,
      expandable: scrollByThumb
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleInit(e) {}
  handleStart() {}
  handleMove(e) {
    if (this._isLocked()) {
      e.cancel = true;
      return;
    }
    if (this._allowedDirection()) {
      // @ts-expect-error ts-error
      e.originalEvent.isScrollingEvent = true;
    }
  }
  handleEnd() {}
  handleCancel() {}
  handleStop() {}
  _eachScrollbar(callback) {
    (0, _iterator.each)(this._scrollbars || {}, (direction, scrollbar) => {
      callback(scrollbar, direction);
    });
  }
  createActions() {
    this._scrollAction = this._createActionByOption('onScroll');
    this._updateAction = this._createActionByOption('onUpdated');
  }
  _createActionArgs() {
    const {
      left,
      top
    } = this.location();
    return {
      event: this._eventForUserAction,
      scrollOffset: this._getScrollOffset(),
      reachedLeft: this._isRtlNativeStrategy() ? this._isReachedRight(-left) : this._isReachedLeft(left),
      reachedRight: this._isRtlNativeStrategy() ? this._isReachedLeft(-Math.abs(left)) : this._isReachedRight(left),
      reachedTop: this._isDirection(VERTICAL) ? Math.round(top) >= 0 : undefined,
      reachedBottom: this._isDirection(VERTICAL) ? Math.round(Math.abs(top) - this._getMaxOffset().top) >= 0 : undefined
    };
  }
  _getScrollOffset() {
    const {
      top,
      left
    } = this.location();
    return {
      top: -top,
      left: this._normalizeOffsetLeft(-left)
    };
  }
  _normalizeOffsetLeft(scrollLeft) {
    if (this._isRtlNativeStrategy()) {
      return this._getMaxOffset().left + scrollLeft;
    }
    return scrollLeft;
  }
  _isReachedLeft(left) {
    return this._isDirection(HORIZONTAL) ? Math.round(left) >= 0 : undefined;
  }
  _isReachedRight(left) {
    return this._isDirection(HORIZONTAL) ? Math.round(Math.abs(left) - this._getMaxOffset().left) >= 0 : undefined;
  }
  _isScrollbarVisible() {
    const showScrollbar = this.option('showScrollbar');
    // @ts-expect-error ts-error
    return showScrollbar !== 'never' && showScrollbar !== false;
  }
  handleScroll(e) {
    var _this$_scrollAction;
    this._eventForUserAction = e;
    this._moveScrollbars();
    (_this$_scrollAction = this._scrollAction) === null || _this$_scrollAction === void 0 || _this$_scrollAction.call(this, this._createActionArgs());
  }
  _moveScrollbars() {
    const {
      top,
      left
    } = this._getScrollOffset();
    this._eachScrollbar(scrollbar => {
      scrollbar.moveTo({
        top: -top,
        left: -left
      });
      scrollbar.option('visible', true);
    });
    this._hideScrollbars();
  }
  _hideScrollbars() {
    clearTimeout(this._hideScrollbarTimeout);
    // eslint-disable-next-line no-restricted-globals
    this._hideScrollbarTimeout = setTimeout(() => {
      this._eachScrollbar(scrollbar => {
        scrollbar.option('visible', false);
      });
    }, HIDE_SCROLLBAR_TIMEOUT);
  }
  location() {
    return {
      left: -this._$container.scrollLeft(),
      top: -this._$container.scrollTop()
    };
  }
  disabledChanged() {}
  update() {
    this._update();
    this._updateAction(this._createActionArgs());
  }
  _update() {
    this._updateDimensions();
    this._updateScrollbars();
  }
  _updateDimensions() {
    this._containerSize = {
      height: (0, _size.getHeight)(this._$container),
      width: (0, _size.getWidth)(this._$container)
    };
    this._componentContentSize = {
      height: (0, _size.getHeight)(this._component.$content()),
      width: (0, _size.getWidth)(this._component.$content())
    };
    this._contentSize = {
      height: (0, _size.getHeight)(this._$content),
      width: (0, _size.getWidth)(this._$content)
    };
  }
  _updateScrollbars() {
    this._eachScrollbar((scrollbar, direction) => {
      const dimension = direction === VERTICAL ? 'height' : 'width';
      scrollbar.option({
        containerSize: this._containerSize[dimension],
        contentSize: this._componentContentSize[dimension]
      });
      scrollbar.update();
    });
  }
  _prepareDirections() {}
  _allowedDirections() {
    return {
      vertical: this._isDirection(VERTICAL) && this._contentSize.height > this._containerSize.height,
      horizontal: this._isDirection(HORIZONTAL) && this._contentSize.width > this._containerSize.width
    };
  }
  dispose() {
    const {
      className
    } = this._$element.get(0);
    const scrollableNativeRegexp = new RegExp(`${SCROLLABLE_NATIVE_CLASS}\\S*`, 'g');
    if (scrollableNativeRegexp.test(className)) {
      const matches = className.match(scrollableNativeRegexp);
      if (matches) {
        this._$element.removeClass(matches.join(' '));
      }
    }
    _events_engine.default.off(this._$element, `.${SCROLLABLE_NATIVE}`);
    _events_engine.default.off(this._$container, `.${SCROLLABLE_NATIVE}`);
    this._removeScrollbars();
    clearTimeout(this._hideScrollbarTimeout);
  }
  _removeScrollbars() {
    this._eachScrollbar(scrollbar => {
      scrollbar.$element().remove();
    });
  }
  scrollBy(distance) {
    const location = this.location();
    // @ts-expect-error ts-error
    this._$container.scrollTop(Math.round(-location.top - distance.top));
    // @ts-expect-error ts-error
    this._$container.scrollLeft(Math.round(-location.left - distance.left));
  }
  validate(e) {
    const {
      disabled
    } = this.option();
    if (disabled) {
      return false;
    }
    if ((0, _index.isDxMouseWheelEvent)(e) && this._isScrolledInMaxDirection(e)) {
      return false;
    }
    return !!this._allowedDirection();
  }
  _isScrolledInMaxDirection(e) {
    const container = this._$container.get(0);
    let result = false;
    if (e.delta > 0) {
      result = e.shiftKey ? !container.scrollLeft : !container.scrollTop;
    } else if (e.shiftKey) {
      result = container.scrollLeft >= this._getMaxOffset().left;
    } else {
      result = container.scrollTop >= this._getMaxOffset().top;
    }
    return result;
  }
  getDirection() {
    return this._allowedDirection();
  }
}
var _default = exports.default = NativeStrategy;