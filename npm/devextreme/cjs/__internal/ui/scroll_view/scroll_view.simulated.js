/**
* DevExtreme (cjs/__internal/ui/scroll_view/scroll_view.simulated.js)
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
exports.default = exports.ScrollViewScroller = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _common = require("../../../core/utils/common");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _load_indicator = _interopRequireDefault(require("../../../ui/load_indicator"));
var _scrollable = require("../../ui/scroll_view/scrollable.simulated");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
const SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = 'dx-scrollview-pull-down-loading';
const SCROLLVIEW_PULLDOWN_READY_CLASS = 'dx-scrollview-pull-down-ready';
const SCROLLVIEW_PULLDOWN_IMAGE_CLASS = 'dx-scrollview-pull-down-image';
const SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = 'dx-scrollview-pull-down-indicator';
const SCROLLVIEW_PULLDOWN_TEXT_CLASS = 'dx-scrollview-pull-down-text';
const SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = 'dx-scrollview-pull-down-text-visible';
const STATE_RELEASED = 0;
const STATE_READY = 1;
const STATE_REFRESHING = 2;
const STATE_LOADING = 3;
class ScrollViewScroller extends _scrollable.Scroller {
  constructor(options) {
    super(options);
    this._topPocketSize = 0;
    this._bottomPocketSize = 0;
    this._initCallbacks();
    this._releaseState();
  }
  _releaseState() {
    this._state = STATE_RELEASED;
    this._refreshPullDownText();
  }
  _refreshPullDownText() {
    const pullDownTextItems = [{
      element: this._$pullingDownText,
      visibleState: STATE_RELEASED
    }, {
      element: this._$pulledDownText,
      visibleState: STATE_READY
    }, {
      element: this._$refreshingText,
      visibleState: STATE_REFRESHING
    }];
    (0, _iterator.each)(pullDownTextItems, (_, item) => {
      const action = this._state === item.visibleState ? 'addClass' : 'removeClass';
      item.element[action](SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS);
    });
  }
  _initCallbacks() {
    this.pullDownCallbacks = (0, _callbacks.default)();
    this.releaseCallbacks = (0, _callbacks.default)();
    this.reachBottomCallbacks = (0, _callbacks.default)();
  }
  _updateBounds() {
    const considerPockets = this._direction !== 'horizontal';
    if (considerPockets) {
      this._topPocketSize = this._$topPocket.get(0).clientHeight;
      this._bottomPocketSize = this._$bottomPocket.get(0).clientHeight;
      const containerEl = this._$container.get(0);
      const contentEl = this._$content.get(0);
      this._bottomBoundary = Math.max(contentEl.clientHeight - this._bottomPocketSize - containerEl.clientHeight, 0);
    }
    super._updateBounds();
  }
  _updateScrollbar() {
    this._scrollbar.option({
      containerSize: this._containerSize(),
      contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize,
      scaleRatio: this._getScaleRatio()
    });
  }
  _moveContent() {
    super._moveContent();
    if (this._isPullDown()) {
      this._pullDownReady();
    } else if (this._isReachBottom()) {
      this._reachBottomReady();
    } else if (this._state !== STATE_RELEASED) {
      this._stateReleased();
    }
  }
  _moveScrollbar() {
    this._scrollbar.moveTo(this._topPocketSize + this._location);
  }
  _isPullDown() {
    return this._pullDownEnabled && this._location >= 0;
  }
  _isReachBottom() {
    return this._reachBottomEnabled && this.isBottomReached();
  }
  isBottomReached() {
    const containerEl = this._$container.get(0);
    return Math.round(this._bottomBoundary - Math.ceil(containerEl.scrollTop)) <= 1;
  }
  _scrollComplete() {
    if (this._inBounds() && this._state === STATE_READY) {
      this._pullDownRefreshing();
    } else if (this._inBounds() && this._state === STATE_LOADING) {
      this._reachBottomLoading();
    } else {
      super._scrollComplete();
    }
  }
  _reachBottomReady() {
    if (this._state === STATE_LOADING) {
      return;
    }
    this._state = STATE_LOADING;
    this._minOffset = this._getMinOffset();
  }
  _getMaxOffset() {
    return -this._topPocketSize;
  }
  _getMinOffset() {
    return Math.min(super._getMinOffset(), -this._topPocketSize);
  }
  _reachBottomLoading() {
    this.reachBottomCallbacks.fire();
  }
  _pullDownReady() {
    if (this._state === STATE_READY) {
      return;
    }
    this._state = STATE_READY;
    this._maxOffset = 0;
    this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
    this._refreshPullDownText();
  }
  _stateReleased() {
    if (this._state === STATE_RELEASED) {
      return;
    }
    this._releaseState();
    this._updateBounds();
    this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
    this.releaseCallbacks.fire();
  }
  _pullDownRefreshing() {
    if (this._state === STATE_REFRESHING) {
      return;
    }
    this._state = STATE_REFRESHING;
    this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
    this._refreshPullDownText();
    this.pullDownCallbacks.fire();
  }
  _releaseHandler() {
    var _this$_releaseTask;
    if (this._state === STATE_RELEASED) {
      this._moveToBounds();
    }
    this._update();
    if (this._releaseTask) {
      // @ts-expect-error ts-error
      this._releaseTask.abort();
    }
    this._releaseTask = (0, _common.executeAsync)(this._release.bind(this));
    // @ts-expect-error ts-error
    return (_this$_releaseTask = this._releaseTask) === null || _this$_releaseTask === void 0 ? void 0 : _this$_releaseTask.promise;
  }
  _release() {
    this._stateReleased();
    this._scrollComplete();
  }
  _reachBottomEnablingHandler(enabled) {
    if (this._reachBottomEnabled === enabled) {
      return;
    }
    this._reachBottomEnabled = enabled;
    this._updateBounds();
  }
  _pullDownEnablingHandler(enabled) {
    if (this._pullDownEnabled === enabled) {
      return;
    }
    this._pullDownEnabled = enabled;
    this._considerTopPocketChange();
    this._updateHandler();
  }
  _considerTopPocketChange() {
    this._location -= (0, _size.getHeight)(this._$topPocket) || -this._topPocketSize;
    this._maxOffset = 0;
    this._move();
  }
  _pendingReleaseHandler() {
    this._state = STATE_READY;
  }
  dispose() {
    if (this._releaseTask) {
      // @ts-expect-error ts-error
      this._releaseTask.abort();
    }
    super.dispose();
  }
}
exports.ScrollViewScroller = ScrollViewScroller;
class SimulatedScrollViewStrategy extends _scrollable.SimulatedStrategy {
  // @ts-expect-error ts-error
  _init(scrollView) {
    // @ts-expect-error ts-error
    super._init(scrollView);
    this._$pullDown = scrollView._$pullDown;
    this._$topPocket = scrollView._$topPocket;
    this._$bottomPocket = scrollView._$bottomPocket;
    this._initCallbacks();
  }
  _initCallbacks() {
    this.pullDownCallbacks = (0, _callbacks.default)();
    this.releaseCallbacks = (0, _callbacks.default)();
    this.reachBottomCallbacks = (0, _callbacks.default)();
  }
  render() {
    this._renderPullDown();
    super.render();
  }
  _renderPullDown() {
    const $image = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_IMAGE_CLASS);
    const $loadContainer = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
    const loadIndicatorElement = (0, _renderer.default)('<div>')[0];
    const $loadIndicator = new _load_indicator.default(loadIndicatorElement).$element();
    this._$pullDownText = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_TEXT_CLASS);
    const {
      pullingDownText = '',
      pulledDownText = '',
      refreshingText = ''
    } = this.option();
    this._$pullingDownText = (0, _renderer.default)('<div>').text(pullingDownText).appendTo(this._$pullDownText);
    this._$pulledDownText = (0, _renderer.default)('<div>').text(pulledDownText).appendTo(this._$pullDownText);
    this._$refreshingText = (0, _renderer.default)('<div>').text(refreshingText).appendTo(this._$pullDownText);
    this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append(this._$pullDownText);
  }
  pullDownEnable(enabled) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('pullDownEnabling', enabled);
  }
  reachBottomEnable(enabled) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('reachBottomEnabling', enabled);
  }
  _createScroller(direction) {
    const scroller = new ScrollViewScroller(this._scrollerOptions(direction));
    this._scrollers[direction] = scroller;
    scroller.pullDownCallbacks.add(() => {
      this.pullDownCallbacks.fire();
    });
    scroller.releaseCallbacks.add(() => {
      this.releaseCallbacks.fire();
    });
    scroller.reachBottomCallbacks.add(() => {
      this.reachBottomCallbacks.fire();
    });
  }
  _scrollerOptions(direction) {
    return _extends({}, super._scrollerOptions(direction), {
      $topPocket: this._$topPocket,
      $bottomPocket: this._$bottomPocket,
      $pullDown: this._$pullDown,
      $pullDownText: this._$pullDownText,
      $pullingDownText: this._$pullingDownText,
      $pulledDownText: this._$pulledDownText,
      $refreshingText: this._$refreshingText
    });
  }
  pendingRelease() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._eventHandler('pendingRelease');
  }
  release() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._eventHandler('release').done(this._updateAction);
  }
  location() {
    const location = super.location();
    location.top += (0, _size.getHeight)(this._$topPocket);
    return location;
  }
  isBottomReached() {
    return this._scrollers.vertical.isBottomReached();
  }
  dispose() {
    (0, _iterator.each)(this._scrollers, function disposeScroller() {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.dispose();
    });
    super.dispose();
  }
}
var _default = exports.default = SimulatedScrollViewStrategy;
