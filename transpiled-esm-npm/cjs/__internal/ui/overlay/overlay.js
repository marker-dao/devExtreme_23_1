"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OVERLAY_CONTENT_CLASS = void 0;
var _animation = require("../../../common/core/animation");
var _hide_callback = require("../../../common/core/environment/hide_callback");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _drag = require("../../../common/core/events/drag");
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _short = require("../../../common/core/events/short");
var _utils = require("../../../common/core/events/utils");
var _visibility_change = require("../../../common/core/events/visibility_change");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _empty_template = require("../../../core/templates/empty_template");
var _browser = _interopRequireDefault(require("../../../core/utils/browser"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _ready_callbacks = _interopRequireDefault(require("../../../core/utils/ready_callbacks"));
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _view_port = require("../../../core/utils/view_port");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_dom = _interopRequireDefault(require("../../core/utils/m_dom"));
var _m_selectors = _interopRequireDefault(require("../../core/utils/m_selectors"));
var _m_window = _interopRequireDefault(require("../../core/utils/m_window"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _overlay_position_controller = require("../../ui/overlay/overlay_position_controller");
var zIndexPool = _interopRequireWildcard(require("../../ui/overlay/z_index"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ready = _ready_callbacks.default.add;
const window = _m_window.default.getWindow();
const viewPortChanged = _view_port.changeCallback;
const OVERLAY_STACK = [];
const ANONYMOUS_TEMPLATE_NAME = 'content';
const TAB_KEY = 'tab';
const OVERLAY_CLASS = 'dx-overlay';
const OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
const OVERLAY_CONTENT_CLASS = exports.OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
const OVERLAY_SHADER_CLASS = 'dx-overlay-shader';
const INNER_OVERLAY_CLASS = 'dx-inner-overlay';
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const RTL_DIRECTION_CLASS = 'dx-rtl';
const PREVENT_SAFARI_SCROLLING_CLASS = 'dx-prevent-safari-scrolling';
ready(() => {
  const callback = e => {
    for (let i = OVERLAY_STACK.length - 1; i >= 0; i -= 1) {
      var _OVERLAY_STACK$i$_pro, _OVERLAY_STACK$i;
      if (!((_OVERLAY_STACK$i$_pro = (_OVERLAY_STACK$i = OVERLAY_STACK[i])._proxiedDocumentDownHandler) !== null && _OVERLAY_STACK$i$_pro !== void 0 && _OVERLAY_STACK$i$_pro.call(_OVERLAY_STACK$i, e))) {
        return;
      }
    }
  };
  // @ts-expect-error subscribeGlobal should be described in .d.ts
  _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), _pointer.default.down, callback);
});
class Overlay extends _widget.default {
  _supportedKeys() {
    return Object.assign({}, super._supportedKeys(), {
      escape() {
        this.hide();
      }
    });
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: '',
      wrapperAttr: {},
      position: Object.assign({}, _overlay_position_controller.OVERLAY_POSITION_ALIASES.center),
      width: '80vw',
      minWidth: null,
      maxWidth: null,
      height: '80vh',
      minHeight: null,
      maxHeight: null,
      animation: {
        show: {
          type: 'pop',
          duration: 300,
          from: {
            scale: 0.55
          }
        },
        hide: {
          type: 'pop',
          duration: 300,
          from: {
            opacity: 1,
            scale: 1
          },
          to: {
            opacity: 0,
            scale: 0.55
          }
        }
      },
      hideOnOutsideClick: false,
      onShowing: null,
      onShown: null,
      onHiding: null,
      onHidden: null,
      contentTemplate: 'content',
      innerOverlay: false,
      restorePosition: true,
      hideOnParentScroll: false,
      preventScrollEvents: true,
      onPositioned: null,
      propagateOutsideClick: false,
      ignoreChildEvents: true,
      _checkParentVisibility: true,
      _fixWrapperPosition: false,
      _loopFocus: false,
      _ignorePreventScrollEventsDeprecation: false,
      // NOTE: private option
      hideTopOverlayHandler: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.hide();
      }
    });
  }
  _defaultOptionsRules() {
    const rules = [...super._defaultOptionsRules(), {
      device() {
        return !_m_window.default.hasWindow();
      },
      options: {
        width: null,
        height: null,
        animation: null,
        _checkParentVisibility: false
      }
    }];
    return rules;
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    this._optionsByReference = Object.assign({}, this._optionsByReference, {
      animation: true
    });
  }
  $wrapper() {
    return this._$wrapper;
  }
  // @ts-expect-error LSP
  _eventBindingTarget() {
    return this._$content;
  }
  ctor(element, options) {
    super.ctor(element, options);
    if (options) {
      if ('preventScrollEvents' in options && !options._ignorePreventScrollEventsDeprecation) {
        this._logDeprecatedPreventScrollEventsInfo();
      }
    }
  }
  _logDeprecatedPreventScrollEventsInfo() {
    this._logDeprecatedOptionWarning('preventScrollEvents', {
      since: '23.1',
      message: 'If you enable this option, end-users may experience scrolling issues.'
    });
  }
  _init() {
    super._init();
    this._initActions();
    this._initHideOnOutsideClickHandler();
    this._initTabTerminatorHandler();
    this._customWrapperClass = null;
    this._$wrapper = (0, _renderer.default)('<div>').addClass(OVERLAY_WRAPPER_CLASS);
    this._$content = (0, _renderer.default)('<div>').addClass(OVERLAY_CONTENT_CLASS);
    this._initInnerOverlayClass();
    const $element = this.$element();
    $element.addClass(OVERLAY_CLASS);
    this._$wrapper.attr('data-bind', 'dxControlsDescendantBindings: true');
    this._toggleViewPortSubscription(true);
    const {
      hideTopOverlayHandler
    } = this.option();
    this._initHideTopOverlayHandler(hideTopOverlayHandler);
    this._parentsScrollSubscriptionInfo = {
      handler: e => {
        this._hideOnParentsScrollHandler(e);
      }
    };
    this.warnPositionAsFunction();
  }
  warnPositionAsFunction() {
    const {
      position
    } = this.option();
    if ((0, _type.isFunction)(position)) {
      // position as function deprecated in 21.2
      _errors.default.log('W0018');
    }
  }
  _initInnerOverlayClass() {
    var _this$_$content;
    const {
      innerOverlay
    } = this.option();
    (_this$_$content = this._$content) === null || _this$_$content === void 0 || _this$_$content.toggleClass(INNER_OVERLAY_CLASS, innerOverlay);
  }
  _initHideTopOverlayHandler(handler) {
    if (handler) {
      this._hideTopOverlayHandler = handler;
    }
  }
  _getActionsList() {
    return ['onShowing', 'onShown', 'onHiding', 'onHidden', 'onPositioned', 'onVisualPositionChanged'];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    (0, _iterator.each)(actions, (_, action) => {
      if (this._actions) {
        this._actions[action] = this._createActionByOption(action, {
          excludeValidators: ['disabled', 'readOnly']
        }) || _common.noop;
      }
    });
  }
  _initHideOnOutsideClickHandler() {
    this._proxiedDocumentDownHandler = e => this._documentDownHandler(e);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapperAttributes();
    this._initPositionController();
  }
  _documentDownHandler(e) {
    var _this$_$content2, _this$_$content3;
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    const {
      target
    } = e;
    const $target = (0, _renderer.default)(target);
    const isTargetDocument = _m_dom.default.contains(window.document, target);
    const isAttachedTarget = (0, _renderer.default)(window.document).is($target) || isTargetDocument;
    const isInnerOverlay = (0, _renderer.default)($target).closest(`.${INNER_OVERLAY_CLASS}`).length;
    const isTargetContent = (_this$_$content2 = this._$content) === null || _this$_$content2 === void 0 ? void 0 : _this$_$content2.is($target);
    const content = (_this$_$content3 = this._$content) === null || _this$_$content3 === void 0 ? void 0 : _this$_$content3.get(0);
    const isTargetInContent = content ? _m_dom.default.contains(content, target) : false;
    const isOutsideClick = isAttachedTarget && !isInnerOverlay
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    && !(isTargetContent || isTargetInContent);
    if (isOutsideClick && this._shouldHideOnOutsideClick(e)) {
      this._outsideClickHandler(e);
    }
    const {
      propagateOutsideClick
    } = this.option();
    return Boolean(propagateOutsideClick);
  }
  _shouldHideOnOutsideClick(e) {
    const {
      hideOnOutsideClick
    } = this.option();
    if ((0, _type.isFunction)(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return Boolean(hideOnOutsideClick);
  }
  _outsideClickHandler(e) {
    const {
      shading
    } = this.option();
    if (shading) {
      e.preventDefault();
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.hide();
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new _empty_template.EmptyTemplate()
    });
    super._initTemplates();
  }
  _isTopOverlay() {
    const overlayStack = this._overlayStack();
    for (let i = overlayStack.length - 1; i >= 0; i -= 1) {
      const tabbableElements = overlayStack[i]._findTabbableBounds();
      if (tabbableElements.$first || tabbableElements.$last) {
        // @ts-ignore expected: types Overlay<OverlayProperties> and this have no overlap
        return overlayStack[i] === this;
      }
    }
    return false;
  }
  _overlayStack() {
    return OVERLAY_STACK;
  }
  _zIndexInitValue() {
    return Overlay.baseZIndex();
  }
  _toggleViewPortSubscription(toggle) {
    if (this._viewPortChangeHandle) {
      viewPortChanged.remove(this._viewPortChangeHandle);
    }
    if (toggle) {
      this._viewPortChangeHandle = () => {
        this._viewPortChangeHandler();
      };
      viewPortChanged.add(this._viewPortChangeHandle);
    }
  }
  _viewPortChangeHandler() {
    const {
      container
    } = this.option();
    this._positionController.updateContainer(container);
    this._refresh();
  }
  _renderWrapperAttributes() {
    const {
      wrapperAttr
    } = this.option();
    const attributes = Object.assign({}, wrapperAttr);
    const classNames = attributes.class;
    delete attributes.class;
    const $wrapper = this.$wrapper();
    $wrapper === null || $wrapper === void 0 || $wrapper.attr(attributes);
    if (this._customWrapperClass) {
      $wrapper === null || $wrapper === void 0 || $wrapper.removeClass(this._customWrapperClass);
    }
    $wrapper === null || $wrapper === void 0 || $wrapper.addClass(classNames);
    this._customWrapperClass = classNames;
  }
  _renderVisibilityAnimate(visible) {
    this._stopAnimation();
    return visible ? this._show() : this._hide();
  }
  _getAnimationConfig() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getOptionValue('animation', this) ?? {};
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _toggleBodyScroll(enabled) {}
  _animateShowing() {
    const animation = this._getAnimationConfig();
    const showAnimation = this._normalizeAnimation(animation.show, 'to');
    const startShowAnimation = (showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.start) ?? _common.noop;
    const completeShowAnimation = (showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.complete) ?? _common.noop;
    const completeCallback = (element, config) => {
      var _this$_actions, _this$_actions$onShow;
      if (this._isAnimationPaused) {
        return;
      }
      const {
        focusStateEnabled
      } = this.option();
      if (focusStateEnabled) {
        // @ts-expect-error trigger should be typed on type 'EventsEngineType'
        _events_engine.default.trigger(this._focusTarget(), 'focus');
      }
      completeShowAnimation.call(this, element, config);
      this._showAnimationProcessing = false;
      this._isHidden = false;
      // @ts-expect-error onShown should provide event
      (_this$_actions = this._actions) === null || _this$_actions === void 0 || (_this$_actions$onShow = _this$_actions.onShown) === null || _this$_actions$onShow === void 0 || _this$_actions$onShow.call(_this$_actions);
      this._toggleSafariScrolling();
      this._showingDeferred.resolve();
    };
    const startCallback = (element, config) => {
      if (this._isAnimationPaused) {
        return;
      }
      startShowAnimation.call(this, element, config);
      this._showAnimationProcessing = true;
    };
    this._animate(showAnimation, completeCallback, startCallback);
  }
  _processShowingHidingCancel(cancelArg, applyFunction, cancelFunction) {
    if ((0, _type.isPromise)(cancelArg)) {
      cancelArg.then(shouldCancel => {
        if (shouldCancel) {
          cancelFunction();
        } else {
          applyFunction();
        }
      }).catch(() => applyFunction());
    } else if (cancelArg) {
      cancelFunction();
    } else {
      applyFunction();
    }
  }
  _show() {
    this._showingDeferred = (0, _deferred.Deferred)();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done(() => {
      delete this._parentHidden;
    });
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      const show = () => {
        var _this$_$content4, _this$_$content5, _this$_actions2, _this$_actions2$onSho;
        this._stopAnimation();
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this._toggleVisibility(true);
        (_this$_$content4 = this._$content) === null || _this$_$content4 === void 0 || _this$_$content4.css('visibility', 'hidden');
        (_this$_$content5 = this._$content) === null || _this$_$content5 === void 0 || _this$_$content5.toggleClass(INVISIBLE_STATE_CLASS, false);
        this._updateZIndexStackPosition(true);
        this._positionController.openingHandled();
        this._renderContent();
        const showingArgs = {
          cancel: false
        };
        // @ts-expect-error onShowing should provide event
        (_this$_actions2 = this._actions) === null || _this$_actions2 === void 0 || (_this$_actions2$onSho = _this$_actions2.onShowing) === null || _this$_actions2$onSho === void 0 || _this$_actions2$onSho.call(_this$_actions2, showingArgs);
        const cancelShow = () => {
          var _this$_$content6, _this$_$content7;
          this._toggleVisibility(false);
          (_this$_$content6 = this._$content) === null || _this$_$content6 === void 0 || _this$_$content6.css('visibility', '');
          (_this$_$content7 = this._$content) === null || _this$_$content7 === void 0 || _this$_$content7.toggleClass(INVISIBLE_STATE_CLASS, true);
          this._isShowingActionCanceled = true;
          this._moveFromContainer();
          this._toggleBodyScroll(true);
          this.option('visible', false);
          this._showingDeferred.resolve();
        };
        const applyShow = () => {
          var _this$_$content8;
          (_this$_$content8 = this._$content) === null || _this$_$content8 === void 0 || _this$_$content8.css('visibility', '');
          this._renderVisibility(true);
          this._animateShowing();
        };
        this._processShowingHidingCancel(showingArgs.cancel, applyShow, cancelShow);
      };
      show();
    }
    return this._showingDeferred.promise();
  }
  _normalizeAnimation(showHideConfig, direction) {
    if (!showHideConfig) {
      return undefined;
    }
    const configuration = Object.assign({
      type: 'slide',
      // @ts-expect-error skipElementInitialStyles should be typed in AnimationConfig
      skipElementInitialStyles: true
    }, showHideConfig);
    if ((0, _type.isObject)(configuration[direction])) {
      (0, _extend.extend)(configuration[direction], {
        position: this._positionController.position
      });
    }
    return configuration;
  }
  _animateHiding() {
    const animation = this._getAnimationConfig();
    const hideAnimation = this._normalizeAnimation(animation.hide, 'from');
    const startHideAnimation = (hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.start) ?? _common.noop;
    const completeHideAnimation = (hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.complete) ?? _common.noop;
    const completeCallback = (element, config) => {
      var _this$_$content9, _this$_actions3, _this$_actions3$onHid;
      (_this$_$content9 = this._$content) === null || _this$_$content9 === void 0 || _this$_$content9.css('pointerEvents', '');
      this._renderVisibility(false);
      completeHideAnimation.call(this, element, config);
      this._hideAnimationProcessing = false;
      // @ts-expect-error onHidden should provide event
      (_this$_actions3 = this._actions) === null || _this$_actions3 === void 0 || (_this$_actions3$onHid = _this$_actions3.onHidden) === null || _this$_actions3$onHid === void 0 || _this$_actions3$onHid.call(_this$_actions3);
      this._hidingDeferred.resolve();
    };
    const startCallback = (element, config) => {
      var _this$_$content0;
      (_this$_$content0 = this._$content) === null || _this$_$content0 === void 0 || _this$_$content0.css('pointerEvents', 'none');
      startHideAnimation.call(this, element, config);
      this._hideAnimationProcessing = true;
    };
    this._animate(hideAnimation, completeCallback, startCallback);
  }
  _hide() {
    if (!this._currentVisible) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = (0, _deferred.Deferred)();
    const hidingArgs = {
      cancel: false
    };
    if (this._isShowingActionCanceled) {
      delete this._isShowingActionCanceled;
      this._hidingDeferred.reject();
    } else {
      var _this$_actions4, _this$_actions4$onHid;
      // @ts-expect-error onHiding should provide event
      (_this$_actions4 = this._actions) === null || _this$_actions4 === void 0 || (_this$_actions4$onHid = _this$_actions4.onHiding) === null || _this$_actions4$onHid === void 0 || _this$_actions4$onHid.call(_this$_actions4, hidingArgs);
      this._toggleSafariScrolling();
      this._toggleBodyScroll(true);
      const cancelHide = () => {
        this._isHidingActionCanceled = true;
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this.option('visible', true);
        this._hidingDeferred.resolve();
      };
      const applyHide = () => {
        this._forceFocusLost();
        this._toggleShading(false);
        this._toggleSubscriptions(false);
        this._animateHiding();
      };
      this._processShowingHidingCancel(hidingArgs.cancel, applyHide, cancelHide);
    }
    return this._hidingDeferred.promise();
  }
  _forceFocusLost() {
    var _this$_$content1;
    const activeElement = _dom_adapter.default.getActiveElement();
    const shouldResetActiveElement = !!((_this$_$content1 = this._$content) !== null && _this$_$content1 !== void 0 && _this$_$content1.find(activeElement).length);
    if (shouldResetActiveElement) {
      _m_dom.default.resetActiveElement();
    }
  }
  _animate(animation, completeCallback, startCallback) {
    if (animation) {
      const actualStartCallback = startCallback ?? animation.start ?? _common.noop;
      const configuration = Object.assign({}, animation, {
        start: actualStartCallback,
        complete: completeCallback
      });
      if (this._$content) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        _animation.fx.animate(this._$content.get(0), configuration);
      }
    } else {
      // @ts-expect-error complate in AnimationConfig contains required params
      completeCallback();
    }
  }
  _stopAnimation() {
    if (this._$content) {
      _animation.fx.stop(this._$content.get(0), true);
    }
  }
  _renderVisibility(visible) {
    if (visible && this._isParentHidden()) {
      return;
    }
    this._currentVisible = visible;
    this._stopAnimation();
    if (!visible) {
      (0, _visibility_change.triggerHidingEvent)(this._$content);
    }
    if (visible) {
      this._checkContainerExists();
      this._moveToContainer();
      this._renderGeometry();
      (0, _visibility_change.triggerShownEvent)(this._$content);
      (0, _visibility_change.triggerResizeEvent)(this._$content);
    } else {
      var _this$_$content10;
      this._toggleVisibility(visible);
      (_this$_$content10 = this._$content) === null || _this$_$content10 === void 0 || _this$_$content10.toggleClass(INVISIBLE_STATE_CLASS, !visible);
      this._updateZIndexStackPosition(visible);
      this._moveFromContainer();
    }
    this._toggleShading(visible);
    this._toggleSubscriptions(visible);
  }
  _handleZIndexOptionChanged() {
    const {
      zIndex
    } = this.option();
    this._zIndex = zIndex ?? zIndexPool.create(this._zIndexInitValue());
    this._updateZIndexStackPosition(this._isVisible());
  }
  _updateZIndexStackPosition(pushToStack) {
    const overlayStack = this._overlayStack();
    // @ts-expect-error this and Overlay have no overlap
    const index = overlayStack.indexOf(this);
    const isInStack = index !== -1;
    const {
      zIndex
    } = this.option();
    if (!pushToStack) {
      if (isInStack) {
        overlayStack.splice(index, 1);
        zIndexPool.remove(this._zIndex);
      }
      return;
    }
    if (!isInStack) {
      this._zIndex = zIndex ?? zIndexPool.create(this._zIndexInitValue());
      // @ts-expect-error this and Overlay have no overlap
      overlayStack.push(this);
    }
    this._updateZIndex();
  }
  _updateZIndex() {
    var _this$_$wrapper, _this$_$content11;
    (_this$_$wrapper = this._$wrapper) === null || _this$_$wrapper === void 0 || _this$_$wrapper.css('zIndex', this._zIndex);
    (_this$_$content11 = this._$content) === null || _this$_$content11 === void 0 || _this$_$content11.css('zIndex', this._zIndex);
  }
  _toggleShading(visible) {
    var _this$_$wrapper2, _this$_$wrapper3;
    const {
      shading,
      shadingColor
    } = this.option();
    (_this$_$wrapper2 = this._$wrapper) === null || _this$_$wrapper2 === void 0 || _this$_$wrapper2.toggleClass(OVERLAY_SHADER_CLASS, visible && shading);
    (_this$_$wrapper3 = this._$wrapper) === null || _this$_$wrapper3 === void 0 || _this$_$wrapper3.css('backgroundColor', shading ? shadingColor ?? '' : '');
    this._toggleTabTerminator(Boolean(visible && shading));
  }
  _initTabTerminatorHandler() {
    this._proxiedTabTerminatorHandler = e => {
      this._tabKeyHandler(e);
    };
  }
  _toggleTabTerminator(enabled) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _loopFocus
    } = this.option();
    // @ts-expect-error NAME has string | undefined type
    const eventName = (0, _utils.addNamespace)('keydown', this.NAME);
    if (_loopFocus || enabled) {
      _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    } else {
      this._destroyTabTerminator();
    }
  }
  _destroyTabTerminator() {
    // @ts-expect-error NAME has string | undefined type
    const eventName = (0, _utils.addNamespace)('keydown', this.NAME);
    _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
  }
  _findTabbableBounds() {
    var _this$_$wrapper4;
    const $elements = (_this$_$wrapper4 = this._$wrapper) === null || _this$_$wrapper4 === void 0 ? void 0 : _this$_$wrapper4.find('*');
    const elementsCount = (($elements === null || $elements === void 0 ? void 0 : $elements.length) ?? 0) - 1;
    let $first = null;
    let $last = null;
    for (let i = 0; i <= elementsCount; i += 1) {
      const $currentElement = ($elements === null || $elements === void 0 ? void 0 : $elements.eq(i)) ?? null;
      const $reverseElement = ($elements === null || $elements === void 0 ? void 0 : $elements.eq(elementsCount - i)) ?? null;
      // @ts-expect-error is should can get function as callback
      if (!$first && $currentElement.is(_m_selectors.default.tabbable)) {
        $first = $currentElement;
      }
      // @ts-expect-error is should can get function as callback
      if (!$last && $reverseElement.is(_m_selectors.default.tabbable)) {
        $last = $reverseElement;
      }
      if ($first && $last) {
        break;
      }
    }
    return {
      $first,
      $last
    };
  }
  _tabKeyHandler(e) {
    var _this$_$wrapper5;
    if ((0, _utils.normalizeKeyName)(e) !== TAB_KEY || !this._isTopOverlay()) {
      return;
    }
    const wrapper = (_this$_$wrapper5 = this._$wrapper) === null || _this$_$wrapper5 === void 0 ? void 0 : _this$_$wrapper5.get(0);
    const activeElement = _dom_adapter.default.getActiveElement(wrapper);
    const {
      $first: $firstTabbable,
      $last: $lastTabbable
    } = this._findTabbableBounds();
    const isTabOnLast = !e.shiftKey && activeElement === ($lastTabbable === null || $lastTabbable === void 0 ? void 0 : $lastTabbable.get(0));
    const isShiftTabOnFirst = e.shiftKey && activeElement === ($firstTabbable === null || $firstTabbable === void 0 ? void 0 : $firstTabbable.get(0));
    const isOutsideTarget = !_m_dom.default.contains(wrapper, activeElement);
    const shouldPreventDefault = isTabOnLast || isShiftTabOnFirst || isOutsideTarget;
    if (shouldPreventDefault) {
      e.preventDefault();
      const $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
      // @ts-expect-error trigger should be typed on type 'EventsEngineType'
      _events_engine.default.trigger($focusElement, 'focusin');
      // @ts-expect-error trigger should be typed on type 'EventsEngineType'
      _events_engine.default.trigger($focusElement, 'focus');
    }
  }
  _toggleSubscriptions(enabled) {
    if (_m_window.default.hasWindow()) {
      this._toggleHideTopOverlayCallback(enabled);
      this._toggleHideOnParentsScrollSubscription(enabled);
    }
  }
  _toggleHideTopOverlayCallback(subscribe) {
    if (!this._hideTopOverlayHandler) {
      return;
    }
    if (subscribe) {
      _hide_callback.hideCallback.add(this._hideTopOverlayHandler);
    } else {
      _hide_callback.hideCallback.remove(this._hideTopOverlayHandler);
    }
  }
  _toggleHideOnParentsScrollSubscription(needSubscribe) {
    // @ts-expect-error NAME has string | undefined type
    const scrollEvent = (0, _utils.addNamespace)('scroll', this.NAME);
    const info = this._parentsScrollSubscriptionInfo ?? {};
    const {
      prevTargets,
      handler
    } = info;
    _events_engine.default.off(prevTargets, scrollEvent, handler);
    const {
      hideOnParentScroll
    } = this.option();
    if (needSubscribe && hideOnParentScroll) {
      var _this$_getHideOnParen;
      let $parents = (_this$_getHideOnParen = this._getHideOnParentScrollTarget()) === null || _this$_getHideOnParen === void 0 ? void 0 : _this$_getHideOnParen.parents();
      if (_devices.default.real().deviceType === 'desktop') {
        var _$parents;
        $parents = (_$parents = $parents) === null || _$parents === void 0 ? void 0 : _$parents.add(window);
      }
      _events_engine.default.on($parents, scrollEvent, handler);
      this._parentsScrollSubscriptionInfo = Object.assign({}, info, {
        prevTargets: $parents
      });
    }
  }
  _hideOnParentsScrollHandler(e) {
    let hideHandled = false;
    const {
      hideOnParentScroll
    } = this.option();
    if ((0, _type.isFunction)(hideOnParentScroll)) {
      // @ts-expect-error hideOnParentScroll is typed as boolean
      hideHandled = hideOnParentScroll(e);
    }
    if (!hideHandled && !this._showAnimationProcessing) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.hide();
    }
  }
  _getHideOnParentScrollTarget() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _hideOnParentScrollTarget
    } = this.option();
    const $hideOnParentScrollTarget = (0, _renderer.default)(_hideOnParentScrollTarget);
    if ($hideOnParentScrollTarget.length) {
      return $hideOnParentScrollTarget;
    }
    return this._$wrapper;
  }
  _render() {
    super._render();
    this._appendContentToElement();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._renderVisibilityAnimate(this._isVisible());
  }
  _appendContentToElement() {
    var _this$_$content12;
    if (!((_this$_$content12 = this._$content) !== null && _this$_$content12 !== void 0 && _this$_$content12.parent().is(this.$element()))) {
      var _this$_$content13;
      (_this$_$content13 = this._$content) === null || _this$_$content13 === void 0 || _this$_$content13.appendTo(this.$element());
    }
  }
  _renderContent() {
    const {
      deferRendering
    } = this.option();
    const shouldDeferRendering = !this._currentVisible && deferRendering;
    const isParentHidden = this._isVisible() && this._isParentHidden();
    if (isParentHidden) {
      this._isHidden = true;
      return;
    }
    if (this._contentAlreadyRendered || shouldDeferRendering) {
      return;
    }
    this._contentAlreadyRendered = true;
    this._appendContentToElement();
    super._renderContent();
  }
  _isParentHidden() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _checkParentVisibility
    } = this.option();
    if (!_checkParentVisibility) {
      return false;
    }
    if (this._parentHidden !== undefined) {
      return this._parentHidden;
    }
    const $parent = this.$element().parent();
    if ($parent.is(':visible')) {
      return false;
    }
    let isHidden = false;
    // @ts-expect-error add should can get dxElementWrapper
    $parent.add($parent.parents()).each((index, element) => {
      const $element = (0, _renderer.default)(element);
      if ($element.css('display') === 'none') {
        isHidden = true;
        return false;
      }
      return undefined;
    });
    return isHidden || !_dom_adapter.default.getBody().contains($parent.get(0));
  }
  _renderContentImpl() {
    const {
      contentTemplate: contentTemplateOption
    } = this.option();
    const whenContentRendered = (0, _deferred.Deferred)();
    const contentTemplate = this._getTemplate(contentTemplateOption);
    const transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
    contentTemplate === null || contentTemplate === void 0 || contentTemplate.render({
      container: this.content(),
      noModel: true,
      transclude,
      onRendered: () => {
        whenContentRendered.resolve();
        const {
          templatesRenderAsynchronously
        } = this.option();
        // NOTE: T1114344
        if (templatesRenderAsynchronously) {
          this._dimensionChanged();
        }
      }
    });
    const {
      preventScrollEvents
    } = this.option();
    this._toggleWrapperScrollEventsSubscription(preventScrollEvents);
    whenContentRendered.done(() => {
      this._processContentRendering();
    });
    // @ts-expect-error Promise should be typed as Promise<T>
    return whenContentRendered.promise();
  }
  _processContentRendering() {
    if (this._isVisible()) {
      this._moveToContainer();
    }
  }
  _getPositionControllerConfig() {
    var _this$_actions5, _this$_actions6;
    const {
      container,
      visualContainer,
      restorePosition,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _fixWrapperPosition,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _skipContentPositioning
    } = this.option();
    // NOTE: position is passed to controller in renderGeometry
    // to prevent window field using in server side mode
    const properties = {
      container,
      visualContainer,
      restorePosition,
      _fixWrapperPosition,
      _skipContentPositioning,
      onPositioned: (_this$_actions5 = this._actions) === null || _this$_actions5 === void 0 ? void 0 : _this$_actions5.onPositioned,
      onVisualPositionChanged: (_this$_actions6 = this._actions) === null || _this$_actions6 === void 0 ? void 0 : _this$_actions6.onVisualPositionChanged
    };
    const elements = {
      $root: this.$element(),
      $content: this._$content,
      $wrapper: this._$wrapper
    };
    const positionControllerConfiguration = {
      properties,
      elements
    };
    return positionControllerConfiguration;
  }
  _initPositionController() {
    this._positionController = new _overlay_position_controller.OverlayPositionController(this._getPositionControllerConfig());
  }
  _toggleWrapperScrollEventsSubscription(enabled) {
    // @ts-expect-error NAME has string | undefined type
    const eventName = (0, _utils.addNamespace)(_drag.move, this.NAME);
    _events_engine.default.off(this._$wrapper, eventName);
    if (enabled) {
      const callback = e => {
        const {
          originalEvent
        } = e.originalEvent;
        const {
          type
        } = originalEvent ?? {};
        const isWheel = type === 'wheel';
        const isMouseMove = type === 'mousemove';
        const isScrollByWheel = isWheel && (0, _utils.isCommandKeyPressed)(e);
        e._cancelPreventDefault = true;
        if (originalEvent
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
        && e.cancelable !== false // T1082501
        && !(isMouseMove || isScrollByWheel)) {
          e.preventDefault();
        }
      };
      const options = {
        validate() {
          return true;
        },
        getDirection() {
          return 'both';
        },
        _toggleGestureCover(toggle) {
          if (!toggle) {
            this._toggleGestureCoverImpl(toggle);
          }
        },
        _clearSelection: _common.noop,
        isNative: true
      };
      _events_engine.default.on(this._$wrapper, eventName, options, callback);
    }
  }
  _moveFromContainer() {
    var _this$_$content14, _this$_$wrapper6;
    (_this$_$content14 = this._$content) === null || _this$_$content14 === void 0 || _this$_$content14.appendTo(this.$element());
    (_this$_$wrapper6 = this._$wrapper) === null || _this$_$wrapper6 === void 0 || _this$_$wrapper6.detach();
  }
  _checkContainerExists() {
    const $wrapperContainer = this._positionController.$container;
    // NOTE: The container is undefined when DOM is not ready yet. See T1143527
    if ($wrapperContainer === undefined) {
      return;
    }
    const containerExists = $wrapperContainer.length > 0;
    if (!containerExists) {
      _ui.default.log('W1021', this.NAME);
    }
  }
  _moveToContainer() {
    const $wrapperContainer = this._positionController.$container;
    if ($wrapperContainer !== undefined) {
      var _this$_$wrapper7;
      (_this$_$wrapper7 = this._$wrapper) === null || _this$_$wrapper7 === void 0 || _this$_$wrapper7.appendTo($wrapperContainer);
    }
    if (this._$wrapper) {
      var _this$_$content15;
      (_this$_$content15 = this._$content) === null || _this$_$content15 === void 0 || _this$_$content15.appendTo(this._$wrapper);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderGeometry() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (this._isVisible() && _m_window.default.hasWindow()) {
      this._stopAnimation();
      this._renderGeometryImpl();
    }
  }
  _renderGeometryImpl() {
    // NOTE: position can be specified as a function which needs to be called strict on render start
    this._positionController.updatePosition(this._getOptionValue('position'));
    this._renderWrapper();
    this._renderDimensions();
    this._renderPosition();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderPosition(state) {
    this._positionController.positionContent();
  }
  _isAllWindowCovered() {
    var _this$_positionContro;
    const {
      shading
    } = this.option();
    const element = (_this$_positionContro = this._positionController.$visualContainer) === null || _this$_positionContro === void 0 ? void 0 : _this$_positionContro.get(0);
    return (0, _type.isWindow)(element) && Boolean(shading);
  }
  _toggleSafariScrolling() {
    const visible = this._isVisible();
    const $body = (0, _renderer.default)(_dom_adapter.default.getBody());
    const isIosSafari = _devices.default.real().platform === 'ios' && _browser.default.safari;
    const isAllWindowCovered = this._isAllWindowCovered();
    const isScrollingPrevented = $body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS);
    const shouldPreventScrolling = !isScrollingPrevented && visible && isAllWindowCovered;
    const shouldEnableScrolling = isScrollingPrevented && (!visible || !isAllWindowCovered || this._disposed);
    if (isIosSafari) {
      if (shouldEnableScrolling) {
        $body.removeClass(PREVENT_SAFARI_SCROLLING_CLASS);
        window.scrollTo(0, this._cachedBodyScrollTop);
        this._cachedBodyScrollTop = undefined;
      } else if (shouldPreventScrolling) {
        this._cachedBodyScrollTop = window.pageYOffset;
        $body.addClass(PREVENT_SAFARI_SCROLLING_CLASS);
      }
    }
  }
  _renderWrapper() {
    this._positionController.styleWrapperPosition();
    this._renderWrapperDimensions();
    this._positionController.positionWrapper();
  }
  _renderWrapperDimensions() {
    var _this$_$wrapper8;
    const {
      $visualContainer
    } = this._positionController;
    const documentElement = _dom_adapter.default.getDocumentElement();
    const isVisualContainerWindow = (0, _type.isWindow)($visualContainer === null || $visualContainer === void 0 ? void 0 : $visualContainer.get(0));
    const wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : (0, _size.getOuterWidth)($visualContainer);
    const wrapperHeight = isVisualContainerWindow ? window.innerHeight : (0, _size.getOuterHeight)($visualContainer);
    (_this$_$wrapper8 = this._$wrapper) === null || _this$_$wrapper8 === void 0 || _this$_$wrapper8.css({
      width: wrapperWidth,
      height: wrapperHeight
    });
  }
  _renderDimensions() {
    var _this$_$content16, _this$_$content17;
    const content = (_this$_$content16 = this._$content) === null || _this$_$content16 === void 0 ? void 0 : _this$_$content16.get(0);
    (_this$_$content17 = this._$content) === null || _this$_$content17 === void 0 || _this$_$content17.css({
      minWidth: this._getOptionValue('minWidth', content),
      maxWidth: this._getOptionValue('maxWidth', content),
      minHeight: this._getOptionValue('minHeight', content),
      maxHeight: this._getOptionValue('maxHeight', content),
      width: this._getOptionValue('width', content),
      height: this._getOptionValue('height', content)
    });
  }
  // @ts-expect-error LSP
  _focusTarget() {
    return this._$content;
  }
  _attachKeyboardEvents() {
    this._keyboardListenerId = _short.keyboard.on(this._$content, null, options => this._keyboardHandler(options));
  }
  // @ts-expect-error return type in base class is not void
  _keyboardHandler(options, onlyChildProcessing) {
    const e = options.originalEvent;
    const $target = (0, _renderer.default)(e.target);
    const {
      ignoreChildEvents
    } = this.option();
    if ($target.is(this._$content ?? '') || !ignoreChildEvents) {
      super._keyboardHandler(options, onlyChildProcessing);
    }
  }
  _isVisible() {
    const visible = this.option('visible');
    return Boolean(visible);
  }
  _visibilityChanged(visible) {
    if (visible) {
      if (this._isVisible()) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._renderVisibilityAnimate(visible);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._renderVisibilityAnimate(visible);
    }
  }
  _dimensionChanged() {
    this._renderGeometry();
  }
  _clean() {
    if (!this._contentAlreadyRendered) {
      var _this$$content;
      (_this$$content = this.$content()) === null || _this$$content === void 0 || _this$$content.empty();
    }
    this._renderVisibility(false);
    this._cleanFocusState();
  }
  _dispose() {
    var _this$_$wrapper9, _this$_$content18;
    if (this._$content) {
      _animation.fx.stop(this._$content.get(0), false);
    }
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    super._dispose();
    this._toggleSafariScrolling();
    if (this._isVisible()) {
      zIndexPool.remove(this._zIndex);
    }
    this._destroyTabTerminator();
    this._positionController.clean();
    this._actions = {};
    this._parentsScrollSubscriptionInfo = undefined;
    (_this$_$wrapper9 = this._$wrapper) === null || _this$_$wrapper9 === void 0 || _this$_$wrapper9.remove();
    (_this$_$content18 = this._$content) === null || _this$_$content18 === void 0 || _this$_$content18.remove();
    this._$wrapper = null;
    this._$content = null;
  }
  _toggleRTLDirection(rtl) {
    var _this$_$content19;
    (_this$_$content19 = this._$content) === null || _this$_$content19 === void 0 || _this$_$content19.toggleClass(RTL_DIRECTION_CLASS, rtl);
  }
  _optionChanged(args) {
    const {
      value,
      name
    } = args;
    if (this._getActionsList().includes(name)) {
      this._initActions();
      return;
    }
    switch (name) {
      case 'animation':
        break;
      case '_loopFocus':
      case 'shading':
        {
          this._toggleShading(this._isVisible());
          this._toggleSafariScrolling();
          break;
        }
      case 'shadingColor':
        {
          this._toggleShading(this._isVisible());
          break;
        }
      case 'width':
      case 'height':
        this._renderGeometry();
        break;
      case 'minWidth':
      case 'maxWidth':
      case 'minHeight':
      case 'maxHeight':
        this._renderGeometry();
        break;
      case 'position':
        {
          const {
            position
          } = this.option();
          this._positionController.updatePosition(position);
          this._positionController.restorePositionOnNextRender(true);
          this._renderGeometry();
          this._toggleSafariScrolling();
          break;
        }
      case 'visible':
        this._renderVisibilityAnimate(Boolean(value))
        // @ts-expect-error done should be typed
        .done(() => {
          var _this$_animateDeferre;
          return (_this$_animateDeferre = this._animateDeferred) === null || _this$_animateDeferre === void 0 ? void 0 : _this$_animateDeferre.resolveWith(this);
        }).fail(() => {
          var _this$_animateDeferre2;
          return (_this$_animateDeferre2 = this._animateDeferred) === null || _this$_animateDeferre2 === void 0 ? void 0 : _this$_animateDeferre2.reject();
        });
        break;
      case 'container':
        this._positionController.updateContainer(value);
        this._invalidate();
        this._toggleSafariScrolling();
        break;
      case 'visualContainer':
        this._positionController.updateVisualContainer(value);
        this._renderWrapper();
        this._toggleSafariScrolling();
        break;
      case 'innerOverlay':
        this._initInnerOverlayClass();
        break;
      case 'deferRendering':
      case 'contentTemplate':
        this._contentAlreadyRendered = false;
        this._clean();
        this._invalidate();
        break;
      case 'hideTopOverlayHandler':
        this._toggleHideTopOverlayCallback(false);
        // @ts-expect-error ts-error
        this._initHideTopOverlayHandler(value);
        this._toggleHideTopOverlayCallback(this._isVisible());
        break;
      case 'zIndex':
        this._handleZIndexOptionChanged();
        break;
      case 'hideOnParentScroll':
      case '_hideOnParentScrollTarget':
        {
          this._toggleHideOnParentsScrollSubscription(this._isVisible());
          break;
        }
      case 'hideOnOutsideClick':
      case 'propagateOutsideClick':
        break;
      case 'rtlEnabled':
        this._contentAlreadyRendered = false;
        super._optionChanged(args);
        break;
      case '_fixWrapperPosition':
        this._positionController.fixWrapperPosition = value;
        break;
      case 'wrapperAttr':
        this._renderWrapperAttributes();
        break;
      case 'restorePosition':
        this._positionController.restorePosition = value;
        break;
      case 'preventScrollEvents':
        this._logDeprecatedPreventScrollEventsInfo();
        // @ts-expect-error ts-error
        this._toggleWrapperScrollEventsSubscription(value);
        break;
      default:
        super._optionChanged(args);
    }
  }
  toggle(showing) {
    const visible = this._isVisible();
    const isShowing = showing ?? !visible;
    const result = (0, _deferred.Deferred)();
    if (isShowing === visible) {
      // @ts-expect-error this
      return result.resolveWith(this, [isShowing]).promise();
    }
    const animateDeferred = (0, _deferred.Deferred)();
    this._animateDeferred = animateDeferred;
    this.option('visible', isShowing);
    animateDeferred.promise()
    // @ts-expect-error done should be typed
    .done(() => {
      delete this._animateDeferred;
      // @ts-expect-error this
      result.resolveWith(this, [this._isVisible()]);
    }).fail(() => {
      delete this._animateDeferred;
      result.reject();
    });
    return result.promise();
  }
  $content() {
    return this._$content;
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  content() {
    return (0, _element.getPublicElement)(this._$content);
  }
  repaint() {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      (0, _visibility_change.triggerResizeEvent)(this._$content);
    } else {
      super.repaint();
    }
  }
  static baseZIndex(zIndex) {
    return zIndexPool.base(zIndex);
  }
}
(0, _component_registrator.default)('dxOverlay', Overlay);
var _default = exports.default = Overlay;