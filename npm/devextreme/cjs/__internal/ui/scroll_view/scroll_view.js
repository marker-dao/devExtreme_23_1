/**
* DevExtreme (cjs/__internal/ui/scroll_view/scroll_view.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ScrollViewServerSide = exports.ScrollView = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _window = require("../../../core/utils/window");
var _load_indicator = _interopRequireDefault(require("../../../ui/load_indicator"));
var _themes = require("../../../ui/themes");
var _load_panel = _interopRequireDefault(require("../../ui/load_panel"));
var _scroll_viewNative = _interopRequireDefault(require("../../ui/scroll_view/scroll_view.native.pull_down"));
var _scroll_viewNative2 = _interopRequireDefault(require("../../ui/scroll_view/scroll_view.native.swipe_down"));
var _scroll_view = _interopRequireDefault(require("../../ui/scroll_view/scroll_view.simulated"));
var _scrollable = _interopRequireDefault(require("../../ui/scroll_view/scrollable"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable max-classes-per-file */
// STYLE scrollView
const SCROLLVIEW_CLASS = 'dx-scrollview';
const SCROLLVIEW_CONTENT_CLASS = `${SCROLLVIEW_CLASS}-content`;
const SCROLLVIEW_TOP_POCKET_CLASS = `${SCROLLVIEW_CLASS}-top-pocket`;
const SCROLLVIEW_BOTTOM_POCKET_CLASS = `${SCROLLVIEW_CLASS}-bottom-pocket`;
const SCROLLVIEW_PULLDOWN_CLASS = `${SCROLLVIEW_CLASS}-pull-down`;
const SCROLLVIEW_REACHBOTTOM_CLASS = `${SCROLLVIEW_CLASS}-scrollbottom`;
const SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = `${SCROLLVIEW_REACHBOTTOM_CLASS}-indicator`;
const SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = `${SCROLLVIEW_REACHBOTTOM_CLASS}-text`;
const SCROLLVIEW_LOADPANEL = `${SCROLLVIEW_CLASS}-loadpanel`;
const refreshStrategies = {
  pullDown: _scroll_viewNative.default,
  swipeDown: _scroll_viewNative2.default,
  simulated: _scroll_view.default
};
const isServerSide = !(0, _window.hasWindow)();
class ScrollViewServerSide extends _scrollable.default {
  finishLoading() {}
  release() {}
  refresh() {}
  scrollOffset() {
    return {
      top: 0,
      left: 0
    };
  }
  isBottomReached() {
    return false;
  }
  // eslint-disable-next-line consistent-return
  _optionChanged(args) {
    const {
      name
    } = args;
    if (name !== 'onUpdated') {
      return super._optionChanged(args);
    }
  }
}
exports.ScrollViewServerSide = ScrollViewServerSide;
class ScrollView extends _scrollable.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      pullingDownText: _message.default.format('dxScrollView-pullingDownText'),
      pulledDownText: _message.default.format('dxScrollView-pulledDownText'),
      refreshingText: _message.default.format('dxScrollView-refreshingText'),
      reachBottomText: _message.default.format('dxScrollView-reachBottomText'),
      // @ts-expect-error ts-error
      onPullDown: null,
      // @ts-expect-error ts-error
      onReachBottom: null,
      refreshStrategy: 'pullDown'
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        const realDevice = _devices.default.real();
        return realDevice.platform === 'android';
      },
      options: {
        refreshStrategy: 'swipeDown'
      }
    }, {
      device() {
        return (0, _themes.isMaterialBased)((0, _themes.current)());
      },
      options: {
        pullingDownText: '',
        pulledDownText: '',
        refreshingText: '',
        reachBottomText: ''
      }
    }]);
  }
  _init() {
    super._init();
    this._loadingIndicatorEnabled = true;
  }
  _initScrollableMarkup() {
    super._initScrollableMarkup();
    this.$element().addClass(SCROLLVIEW_CLASS);
    this._initContent();
    this._initTopPocket();
    this._initBottomPocket();
    this._initLoadPanel();
  }
  _initContent() {
    const $content = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_CONTENT_CLASS);
    this._$content.wrapInner($content);
  }
  _initTopPocket() {
    this._$topPocket = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_TOP_POCKET_CLASS);
    this._$pullDown = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_CLASS);
    this._$topPocket.append(this._$pullDown);
    this._$content.prepend(this._$topPocket);
  }
  _initBottomPocket() {
    this._$bottomPocket = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_BOTTOM_POCKET_CLASS);
    this._$reachBottom = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_REACHBOTTOM_CLASS);
    const $loadContainer = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS);
    const loadIndicatorElement = (0, _renderer.default)('<div>')[0];
    const $loadIndicator = new _load_indicator.default(loadIndicatorElement).$element();
    this._$reachBottomText = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_REACHBOTTOM_TEXT_CLASS);
    this._updateReachBottomText();
    this._$reachBottom.append($loadContainer.append($loadIndicator)).append(this._$reachBottomText);
    this._$bottomPocket.append(this._$reachBottom);
    this._$content.append(this._$bottomPocket);
  }
  _initLoadPanel() {
    const $loadPanelElement = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_LOADPANEL).appendTo(this.$element());
    const {
      refreshingText
    } = this.option();
    this._loadPanel = this._createComponent($loadPanelElement, _load_panel.default, {
      shading: false,
      delay: 400,
      message: refreshingText,
      position: {
        // @ts-expect-error ts-error
        of: this.$element()
      }
    });
  }
  _updateReachBottomText() {
    const {
      reachBottomText
    } = this.option();
    // @ts-expect-error ts-error
    this._$reachBottomText.text(reachBottomText);
  }
  _createStrategy() {
    const {
      useNative,
      refreshStrategy
    } = this.option();
    const strategyName = useNative ? refreshStrategy : 'simulated';
    const StrategyClass = refreshStrategies[strategyName ?? 'pullDown'];
    this._strategy = new StrategyClass(this);
    this._strategy.pullDownCallbacks.add(this._pullDownHandler.bind(this));
    this._strategy.releaseCallbacks.add(this._releaseHandler.bind(this));
    this._strategy.reachBottomCallbacks.add(this._reachBottomHandler.bind(this));
  }
  _createActions() {
    super._createActions();
    this._pullDownAction = this._createActionByOption('onPullDown');
    this._reachBottomAction = this._createActionByOption('onReachBottom');
    this._tryRefreshPocketState();
  }
  _tryRefreshPocketState() {
    this._pullDownEnable(this.hasActionSubscription('onPullDown'));
    this._reachBottomEnable(this.hasActionSubscription('onReachBottom'));
  }
  on(eventName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    // @ts-expect-error ts-error
    const result = super.on.apply(this, [eventName, ...args]);
    if (eventName === 'pullDown' || eventName === 'reachBottom') {
      this._tryRefreshPocketState();
    }
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type, consistent-return
  _pullDownEnable(enabled) {
    if (arguments.length === 0) {
      return this._pullDownEnabled;
    }
    if (this._$pullDown && this._strategy) {
      this._$pullDown.toggle(enabled);
      this._strategy.pullDownEnable(enabled);
      this._pullDownEnabled = enabled;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type, consistent-return
  _reachBottomEnable(enabled) {
    if (arguments.length === 0) {
      return this._reachBottomEnabled;
    }
    if (this._$reachBottom && this._strategy) {
      this._$reachBottom.toggle(enabled);
      this._strategy.reachBottomEnable(enabled);
      this._reachBottomEnabled = enabled;
    }
  }
  _pullDownHandler() {
    this._loadingIndicator(false);
    this._pullDownLoading();
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type, consistent-return
  _loadingIndicator(value) {
    if (arguments.length < 1) {
      return this._loadingIndicatorEnabled;
    }
    this._loadingIndicatorEnabled = value;
  }
  _pullDownLoading() {
    var _this$_pullDownAction;
    this.startLoading();
    (_this$_pullDownAction = this._pullDownAction) === null || _this$_pullDownAction === void 0 || _this$_pullDownAction.call(this);
  }
  _reachBottomHandler() {
    this._loadingIndicator(false);
    this._reachBottomLoading();
  }
  _reachBottomLoading() {
    var _this$_reachBottomAct;
    this.startLoading();
    (_this$_reachBottomAct = this._reachBottomAction) === null || _this$_reachBottomAct === void 0 || _this$_reachBottomAct.call(this);
  }
  _releaseHandler() {
    this.finishLoading();
    this._loadingIndicator(true);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onPullDown':
      case 'onReachBottom':
        this._createActions();
        break;
      case 'pullingDownText':
      case 'pulledDownText':
      case 'refreshingText':
      case 'refreshStrategy':
        this._invalidate();
        break;
      case 'reachBottomText':
        this._updateReachBottomText();
        break;
      default:
        super._optionChanged(args);
    }
  }
  content() {
    return (0, _element.getPublicElement)(this._$content.children().eq(1));
  }
  release(preventReachBottom) {
    if (preventReachBottom !== undefined) {
      this.toggleLoading(!preventReachBottom);
    }
    return this._strategy.release();
  }
  toggleLoading(showOrHide) {
    this._reachBottomEnable(showOrHide);
  }
  refresh() {
    if (!this.hasActionSubscription('onPullDown')) {
      return;
    }
    this._strategy.pendingRelease();
    this._pullDownLoading();
  }
  startLoading() {
    if (this._loadingIndicator() && this.$element().is(':visible')) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._loadPanel.show();
    }
    this._lock();
  }
  finishLoading() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._loadPanel.hide();
    this._unlock();
  }
  isBottomReached() {
    return this._strategy.isBottomReached();
  }
  _dispose() {
    this._strategy.dispose();
    super._dispose();
    if (this._loadPanel) {
      this._loadPanel.$element().remove();
    }
  }
}
exports.ScrollView = ScrollView;
(0, _component_registrator.default)('dxScrollView', isServerSide ? ScrollViewServerSide : ScrollView);
var _default = exports.default = isServerSide ? ScrollViewServerSide : ScrollView;
