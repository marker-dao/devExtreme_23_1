/**
* DevExtreme (cjs/__internal/ui/scroll_view/scroll_view.native.pull_down.js)
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
var _translator = require("../../../common/core/animation/translator");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _deferred = require("../../../core/utils/deferred");
var _iterator = require("../../../core/utils/iterator");
var _load_indicator = _interopRequireDefault(require("../../../ui/load_indicator"));
var _scrollable = _interopRequireDefault(require("./scrollable.native"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
const PULLDOWN_RELEASE_TIME = 400;
class PullDownNativeScrollViewStrategy extends _scrollable.default {
  // @ts-expect-error ts-error
  _init(scrollView) {
    // @ts-expect-error ts-error
    super._init(scrollView);
    this._$topPocket = scrollView._$topPocket;
    this._$pullDown = scrollView._$pullDown;
    // @ts-expect-error ts-error
    this._$refreshingText = scrollView._$refreshingText;
    this._$scrollViewContent = (0, _renderer.default)(scrollView.content());
    this._$container = (0, _renderer.default)(scrollView.container());
    this._initCallbacks();
  }
  _initCallbacks() {
    this.pullDownCallbacks = (0, _callbacks.default)();
    this.releaseCallbacks = (0, _callbacks.default)();
    this.reachBottomCallbacks = (0, _callbacks.default)();
  }
  render() {
    super.render();
    this._renderPullDown();
    this._releaseState();
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
  update() {
    super.update();
    this._setTopPocketOffset();
  }
  _updateDimensions() {
    super._updateDimensions();
    this._topPocketSize = this._$topPocket.get(0).clientHeight;
    const contentEl = this._$scrollViewContent.get(0);
    const containerEl = this._$container.get(0);
    this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0);
  }
  _allowedDirections() {
    const allowedDirections = super._allowedDirections();
    allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
    return allowedDirections;
  }
  _setTopPocketOffset() {
    this._$topPocket.css({
      top: -this._topPocketSize
    });
  }
  handleEnd() {
    super.handleEnd();
    this._complete();
  }
  handleStop() {
    super.handleStop();
    this._complete();
  }
  _complete() {
    if (this._state === STATE_READY) {
      this._setPullDownOffset(this._topPocketSize);
      clearTimeout(this._pullDownRefreshTimeout);
      // eslint-disable-next-line no-restricted-globals
      this._pullDownRefreshTimeout = setTimeout(() => {
        this._pullDownRefreshing();
      }, 400);
    }
  }
  _setPullDownOffset(offset) {
    (0, _translator.move)(this._$topPocket, {
      top: offset
    });
    (0, _translator.move)(this._$scrollViewContent, {
      top: offset
    });
  }
  handleScroll(e) {
    super.handleScroll(e);
    // TODO: replace with disabled check
    if (this._state === STATE_REFRESHING) {
      return;
    }
    const currentLocation = this.location().top;
    const scrollDelta = (this._location || 0) - currentLocation;
    this._location = currentLocation;
    if (this._isPullDown()) {
      this._pullDownReady();
    } else if (scrollDelta > 0 && this._isReachBottom()) {
      this._reachBottom();
    } else {
      this._stateReleased();
    }
  }
  _isPullDown() {
    return this._pullDownEnabled && this._location >= this._topPocketSize;
  }
  _isReachBottom() {
    return this._reachBottomEnabled && this.isBottomReached();
  }
  isBottomReached() {
    return Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
  }
  _reachBottom() {
    if (this._state === STATE_LOADING) {
      return;
    }
    this._state = STATE_LOADING;
    this.reachBottomCallbacks.fire();
  }
  _pullDownReady() {
    if (this._state === STATE_READY) {
      return;
    }
    this._state = STATE_READY;
    this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
    this._refreshPullDownText();
  }
  _stateReleased() {
    if (this._state === STATE_RELEASED) {
      return;
    }
    this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
    this._releaseState();
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
  pullDownEnable(enabled) {
    if (enabled) {
      this._updateDimensions();
      this._setTopPocketOffset();
    }
    this._pullDownEnabled = enabled;
  }
  reachBottomEnable(enabled) {
    this._reachBottomEnabled = enabled;
  }
  pendingRelease() {
    this._state = STATE_READY;
  }
  release() {
    const deferred = (0, _deferred.Deferred)();
    this._updateDimensions();
    clearTimeout(this._releaseTimeout);
    if (this._state === STATE_LOADING) {
      this._state = STATE_RELEASED;
    }
    // eslint-disable-next-line no-restricted-globals
    this._releaseTimeout = setTimeout(() => {
      this._setPullDownOffset(0);
      this._stateReleased();
      this.releaseCallbacks.fire();
      this._updateAction();
      deferred.resolve();
    }, PULLDOWN_RELEASE_TIME);
    return deferred.promise();
  }
  dispose() {
    clearTimeout(this._pullDownRefreshTimeout);
    clearTimeout(this._releaseTimeout);
    super.dispose();
  }
}
var _default = exports.default = PullDownNativeScrollViewStrategy;
