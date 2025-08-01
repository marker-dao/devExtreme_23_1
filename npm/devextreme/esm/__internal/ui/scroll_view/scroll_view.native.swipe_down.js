/**
* DevExtreme (esm/__internal/ui/scroll_view/scroll_view.native.swipe_down.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { move } from '../../../common/core/animation/translator';
import { eventData } from '../../../common/core/events/utils/index';
import $ from '../../../core/renderer';
import Callbacks from '../../../core/utils/callbacks';
import { Deferred } from '../../../core/utils/deferred';
import { getOuterHeight } from '../../../core/utils/size';
import LoadIndicator from '../../../ui/load_indicator';
import NativeStrategy from './scrollable.native';
const SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS = 'dx-scrollview-pull-down-loading';
const SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = 'dx-scrollview-pull-down-indicator';
const SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = 'dx-scrollview-pull-down-refreshing';
const PULLDOWN_ICON_CLASS = 'dx-icon-pulldown';
const STATE_RELEASED = 0;
const STATE_READY = 1;
const STATE_REFRESHING = 2;
const STATE_TOUCHED = 4;
const STATE_PULLED = 5;
class SwipeDownNativeScrollViewStrategy extends NativeStrategy {
  // @ts-expect-error ts-error
  _init(scrollView) {
    // @ts-expect-error ts-error
    super._init(scrollView);
    this._$topPocket = scrollView._$topPocket;
    this._$pullDown = scrollView._$pullDown;
    this._$scrollViewContent = $(scrollView.content());
    this._$container = $(scrollView.container());
    this._initCallbacks();
    this._location = 0;
  }
  _initCallbacks() {
    this.pullDownCallbacks = Callbacks();
    this.releaseCallbacks = Callbacks();
    this.reachBottomCallbacks = Callbacks();
  }
  render() {
    super.render();
    this._renderPullDown();
    this._releaseState();
  }
  _renderPullDown() {
    const $loadContainer = $('<div>').addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
    const loadIndicatorElement = $('<div>')[0];
    const $loadIndicator = new LoadIndicator(loadIndicatorElement).$element();
    this._$icon = $('<div>').addClass(PULLDOWN_ICON_CLASS);
    this._$pullDown.empty().append(this._$icon).append($loadContainer.append($loadIndicator));
  }
  _releaseState() {
    this._state = STATE_RELEASED;
    this._releasePullDown();
    this._updateDimensions();
  }
  _releasePullDown() {
    this._$pullDown.css({
      opacity: 0
    });
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
  handleInit(e) {
    super.handleInit(e);
    if (this._state === STATE_RELEASED && this._location === 0) {
      // @ts-expect-error ts-error
      this._startClientY = eventData(e.originalEvent).y;
      this._state = STATE_TOUCHED;
    }
  }
  handleMove(e) {
    super.handleMove(e);
    this._deltaY = eventData(e.originalEvent).y - this._startClientY;
    if (this._state === STATE_TOUCHED) {
      if (this._pullDownEnabled && this._deltaY > 0) {
        this._state = STATE_PULLED;
      } else {
        this._complete();
      }
    }
    if (this._state === STATE_PULLED) {
      e.preventDefault();
      this._movePullDown();
    }
  }
  _movePullDown() {
    const pullDownHeight = this._getPullDownHeight();
    const top = Math.min(pullDownHeight * 3, this._deltaY + this._getPullDownStartPosition());
    const angle = 180 * top / (pullDownHeight * 3);
    this._$pullDown.css({
      opacity: 1
    }).toggleClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS, top < pullDownHeight);
    move(this._$pullDown, {
      top
    });
    this._$icon.css({
      transform: `rotate(${angle}deg)`
    });
  }
  _isPullDown() {
    return this._pullDownEnabled && this._state === STATE_PULLED && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition();
  }
  _getPullDownHeight() {
    return Math.round(getOuterHeight(this._$element) * 0.05);
  }
  _getPullDownStartPosition() {
    return -Math.round(getOuterHeight(this._$pullDown) * 1.5);
  }
  handleEnd() {
    if (this._isPullDown()) {
      this._pullDownRefreshing();
    }
    this._complete();
  }
  handleStop() {
    this._complete();
  }
  _complete() {
    if (this._state === STATE_TOUCHED || this._state === STATE_PULLED) {
      this._releaseState();
    }
  }
  handleScroll(e) {
    super.handleScroll(e);
    // TODO: replace with disabled check
    if (this._state === STATE_REFRESHING) {
      return;
    }
    const currentLocation = this.location().top;
    const scrollDelta = this._location - currentLocation;
    this._location = currentLocation;
    if (scrollDelta > 0 && this._isReachBottom()) {
      this._reachBottom();
    } else {
      this._stateReleased();
    }
  }
  _isReachBottom() {
    return this._reachBottomEnabled && this.isBottomReached();
  }
  isBottomReached() {
    return Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
  }
  _reachBottom() {
    this.reachBottomCallbacks.fire();
  }
  _stateReleased() {
    if (this._state === STATE_RELEASED) {
      return;
    }
    this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
    this._releaseState();
  }
  _pullDownRefreshing() {
    this._state = STATE_REFRESHING;
    this._pullDownRefreshHandler();
  }
  _pullDownRefreshHandler() {
    this._refreshPullDown();
    this.pullDownCallbacks.fire();
  }
  _refreshPullDown() {
    this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
    move(this._$pullDown, {
      top: this._getPullDownHeight()
    });
  }
  pullDownEnable(enabled) {
    // @ts-expect-error ts-error
    this._$topPocket.toggle(enabled);
    this._pullDownEnabled = enabled;
  }
  reachBottomEnable(enabled) {
    this._reachBottomEnabled = enabled;
  }
  pendingRelease() {
    this._state = STATE_READY;
  }
  release() {
    const deferred = Deferred();
    this._updateDimensions();
    clearTimeout(this._releaseTimeout);
    // eslint-disable-next-line no-restricted-globals
    this._releaseTimeout = setTimeout(() => {
      this._stateReleased();
      this.releaseCallbacks.fire();
      this._updateAction();
      deferred.resolve();
    }, 800);
    return deferred.promise();
  }
  dispose() {
    clearTimeout(this._pullDownRefreshTimeout);
    clearTimeout(this._releaseTimeout);
    super.dispose();
  }
}
export default SwipeDownNativeScrollViewStrategy;
