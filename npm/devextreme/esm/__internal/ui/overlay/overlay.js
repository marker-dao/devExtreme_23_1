/**
* DevExtreme (esm/__internal/ui/overlay/overlay.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { fx } from '../../../common/core/animation';
import { hideCallback as hideTopOverlayCallback } from '../../../common/core/environment/hide_callback';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { move as dragEventMove } from '../../../common/core/events/drag';
import pointerEvents from '../../../common/core/events/pointer';
import { keyboard } from '../../../common/core/events/short';
import { addNamespace, isCommandKeyPressed, normalizeKeyName } from '../../../common/core/events/utils';
import { triggerHidingEvent, triggerResizeEvent, triggerShownEvent } from '../../../common/core/events/visibility_change';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import errors from '../../../core/errors';
import $ from '../../../core/renderer';
import { EmptyTemplate } from '../../../core/templates/empty_template';
import browser from '../../../core/utils/browser';
import { noop } from '../../../core/utils/common';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import readyCallbacks from '../../../core/utils/ready_callbacks';
import { getOuterHeight, getOuterWidth } from '../../../core/utils/size';
import { isFunction, isObject, isPromise, isWindow } from '../../../core/utils/type';
import { changeCallback } from '../../../core/utils/view_port';
import uiErrors from '../../../ui/widget/ui.errors';
import domUtils from '../../core/utils/m_dom';
import selectors from '../../core/utils/m_selectors';
import windowUtils from '../../core/utils/m_window';
import Widget from '../../core/widget/widget';
import { OVERLAY_POSITION_ALIASES, OverlayPositionController } from '../../ui/overlay/overlay_position_controller';
import * as zIndexPool from '../../ui/overlay/z_index';
const ready = readyCallbacks.add;
const window = windowUtils.getWindow();
const viewPortChanged = changeCallback;
const OVERLAY_STACK = [];
const ANONYMOUS_TEMPLATE_NAME = 'content';
const TAB_KEY = 'tab';
const OVERLAY_CLASS = 'dx-overlay';
const OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
export const OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
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
  eventsEngine.subscribeGlobal(domAdapter.getDocument(), pointerEvents.down, callback);
});
class Overlay extends Widget {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      escape() {
        this.hide();
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: '',
      wrapperAttr: {},
      position: _extends({}, OVERLAY_POSITION_ALIASES.center),
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
        return !windowUtils.hasWindow();
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
    this._optionsByReference = _extends({}, this._optionsByReference, {
      animation: true
    });
  }
  $wrapper() {
    return this._$wrapper;
  }
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
    this._$wrapper = $('<div>').addClass(OVERLAY_WRAPPER_CLASS);
    this._$content = $('<div>').addClass(OVERLAY_CONTENT_CLASS);
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
    if (isFunction(position)) {
      // position as function deprecated in 21.2
      errors.log('W0018');
    }
  }
  _initInnerOverlayClass() {
    const {
      innerOverlay
    } = this.option();
    this._$content.toggleClass(INNER_OVERLAY_CLASS, innerOverlay);
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
    each(actions, (_, action) => {
      if (this._actions) {
        this._actions[action] = this._createActionByOption(action, {
          excludeValidators: ['disabled', 'readOnly']
        }) || noop;
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
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    const {
      target
    } = e;
    const $target = $(target);
    const isTargetDocument = domUtils.contains(window.document, target);
    const isAttachedTarget = $(window.document).is($target) || isTargetDocument;
    const isInnerOverlay = $($target).closest(`.${INNER_OVERLAY_CLASS}`).length;
    const isTargetContent = this._$content.is($target);
    const isTargetInContent = domUtils.contains(this._$content.get(0), target);
    const isOutsideClick = isAttachedTarget && !isInnerOverlay && !(isTargetContent || isTargetInContent);
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
    if (isFunction(hideOnOutsideClick)) {
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
      content: new EmptyTemplate()
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
    const attributes = _extends({}, wrapperAttr);
    const classNames = attributes.class;
    delete attributes.class;
    const $wrapper = this.$wrapper();
    $wrapper.attr(attributes);
    if (this._customWrapperClass) {
      $wrapper.removeClass(this._customWrapperClass);
    }
    $wrapper.addClass(classNames);
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
    const startShowAnimation = (showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.start) ?? noop;
    const completeShowAnimation = (showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.complete) ?? noop;
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
        eventsEngine.trigger(this._focusTarget(), 'focus');
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
    if (isPromise(cancelArg)) {
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
    this._showingDeferred = Deferred();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done(() => {
      delete this._parentHidden;
    });
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      const show = () => {
        var _this$_actions2, _this$_actions2$onSho;
        this._stopAnimation();
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this._toggleVisibility(true);
        this._$content.css('visibility', 'hidden');
        this._$content.toggleClass(INVISIBLE_STATE_CLASS, false);
        this._updateZIndexStackPosition(true);
        this._positionController.openingHandled();
        this._renderContent();
        const showingArgs = {
          cancel: false
        };
        // @ts-expect-error onShowing should provide event
        (_this$_actions2 = this._actions) === null || _this$_actions2 === void 0 || (_this$_actions2$onSho = _this$_actions2.onShowing) === null || _this$_actions2$onSho === void 0 || _this$_actions2$onSho.call(_this$_actions2, showingArgs);
        const cancelShow = () => {
          this._toggleVisibility(false);
          this._$content.css('visibility', '');
          this._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
          this._isShowingActionCanceled = true;
          this._moveFromContainer();
          this._toggleBodyScroll(true);
          this.option('visible', false);
          this._showingDeferred.resolve();
        };
        const applyShow = () => {
          this._$content.css('visibility', '');
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
    const configuration = _extends({
      type: 'slide',
      // @ts-expect-error skipElementInitialStyles should be typed in AnimationConfig
      skipElementInitialStyles: true
    }, showHideConfig);
    if (isObject(configuration[direction])) {
      extend(configuration[direction], {
        position: this._positionController.position
      });
    }
    return configuration;
  }
  _animateHiding() {
    const animation = this._getAnimationConfig();
    const hideAnimation = this._normalizeAnimation(animation.hide, 'from');
    const startHideAnimation = (hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.start) ?? noop;
    const completeHideAnimation = (hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.complete) ?? noop;
    const completeCallback = (element, config) => {
      var _this$_actions3, _this$_actions3$onHid;
      this._$content.css('pointerEvents', '');
      this._renderVisibility(false);
      completeHideAnimation.call(this, element, config);
      this._hideAnimationProcessing = false;
      // @ts-expect-error onHidden should provide event
      (_this$_actions3 = this._actions) === null || _this$_actions3 === void 0 || (_this$_actions3$onHid = _this$_actions3.onHidden) === null || _this$_actions3$onHid === void 0 || _this$_actions3$onHid.call(_this$_actions3);
      this._hidingDeferred.resolve();
    };
    const startCallback = (element, config) => {
      this._$content.css('pointerEvents', 'none');
      startHideAnimation.call(this, element, config);
      this._hideAnimationProcessing = true;
    };
    this._animate(hideAnimation, completeCallback, startCallback);
  }
  _hide() {
    if (!this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = Deferred();
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
    const activeElement = domAdapter.getActiveElement();
    const shouldResetActiveElement = !!this._$content.find(activeElement).length;
    if (shouldResetActiveElement) {
      domUtils.resetActiveElement();
    }
  }
  _animate(animation, completeCallback, startCallback) {
    if (animation) {
      const actualStartCallback = startCallback ?? animation.start ?? noop;
      const configuration = _extends({}, animation, {
        start: actualStartCallback,
        complete: completeCallback
      });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fx.animate(this._$content.get(0), configuration);
    } else {
      // @ts-expect-error complate in AnimationConfig contains required params
      completeCallback();
    }
  }
  _stopAnimation() {
    fx.stop(this._$content.get(0), true);
  }
  _renderVisibility(visible) {
    if (visible && this._isParentHidden()) {
      return;
    }
    this._currentVisible = visible;
    this._stopAnimation();
    if (!visible) {
      triggerHidingEvent(this._$content);
    }
    if (visible) {
      this._checkContainerExists();
      this._moveToContainer();
      this._renderGeometry();
      triggerShownEvent(this._$content);
      triggerResizeEvent(this._$content);
    } else {
      this._toggleVisibility(visible);
      this._$content.toggleClass(INVISIBLE_STATE_CLASS, !visible);
      this._updateZIndexStackPosition(visible);
      this._moveFromContainer();
    }
    this._toggleShading(visible);
    this._toggleSubscriptions(visible);
  }
  _updateZIndexStackPosition(pushToStack) {
    const overlayStack = this._overlayStack();
    // @ts-expect-error this and Overlay have no overlap
    const index = overlayStack.indexOf(this);
    if (pushToStack) {
      if (index === -1) {
        this._zIndex = zIndexPool.create(this._zIndexInitValue());
        // @ts-expect-error this and Overlay have no overlap
        overlayStack.push(this);
      }
      this._$wrapper.css('zIndex', this._zIndex);
      this._$content.css('zIndex', this._zIndex);
    } else if (index !== -1) {
      overlayStack.splice(index, 1);
      zIndexPool.remove(this._zIndex);
    }
  }
  _toggleShading(visible) {
    const {
      shading,
      shadingColor
    } = this.option();
    this._$wrapper.toggleClass(OVERLAY_SHADER_CLASS, visible && shading);
    this._$wrapper.css('backgroundColor', shading ? shadingColor ?? '' : '');
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
    const eventName = addNamespace('keydown', this.NAME);
    if (_loopFocus || enabled) {
      eventsEngine.on(domAdapter.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    } else {
      this._destroyTabTerminator();
    }
  }
  _destroyTabTerminator() {
    // @ts-expect-error NAME has string | undefined type
    const eventName = addNamespace('keydown', this.NAME);
    eventsEngine.off(domAdapter.getDocument(), eventName, this._proxiedTabTerminatorHandler);
  }
  _findTabbableBounds() {
    const $elements = this._$wrapper.find('*');
    const elementsCount = $elements.length - 1;
    let $first = null;
    let $last = null;
    for (let i = 0; i <= elementsCount; i += 1) {
      const $currentElement = $elements.eq(i);
      const $reverseElement = $elements.eq(elementsCount - i);
      // @ts-expect-error is should can get function as callback
      if (!$first && $currentElement.is(selectors.tabbable)) {
        $first = $currentElement;
      }
      // @ts-expect-error is should can get function as callback
      if (!$last && $reverseElement.is(selectors.tabbable)) {
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
    if (normalizeKeyName(e) !== TAB_KEY || !this._isTopOverlay()) {
      return;
    }
    const wrapper = this._$wrapper.get(0);
    const activeElement = domAdapter.getActiveElement(wrapper);
    const {
      $first: $firstTabbable,
      $last: $lastTabbable
    } = this._findTabbableBounds();
    const isTabOnLast = !e.shiftKey && activeElement === ($lastTabbable === null || $lastTabbable === void 0 ? void 0 : $lastTabbable.get(0));
    const isShiftTabOnFirst = e.shiftKey && activeElement === ($firstTabbable === null || $firstTabbable === void 0 ? void 0 : $firstTabbable.get(0));
    const isOutsideTarget = !domUtils.contains(wrapper, activeElement);
    const shouldPreventDefault = isTabOnLast || isShiftTabOnFirst || isOutsideTarget;
    if (shouldPreventDefault) {
      e.preventDefault();
      const $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
      // @ts-expect-error trigger should be typed on type 'EventsEngineType'
      eventsEngine.trigger($focusElement, 'focusin');
      // @ts-expect-error trigger should be typed on type 'EventsEngineType'
      eventsEngine.trigger($focusElement, 'focus');
    }
  }
  _toggleSubscriptions(enabled) {
    if (windowUtils.hasWindow()) {
      this._toggleHideTopOverlayCallback(enabled);
      this._toggleHideOnParentsScrollSubscription(enabled);
    }
  }
  _toggleHideTopOverlayCallback(subscribe) {
    if (!this._hideTopOverlayHandler) {
      return;
    }
    if (subscribe) {
      hideTopOverlayCallback.add(this._hideTopOverlayHandler);
    } else {
      hideTopOverlayCallback.remove(this._hideTopOverlayHandler);
    }
  }
  _toggleHideOnParentsScrollSubscription(needSubscribe) {
    // @ts-expect-error NAME has string | undefined type
    const scrollEvent = addNamespace('scroll', this.NAME);
    const info = this._parentsScrollSubscriptionInfo ?? {};
    const {
      prevTargets,
      handler
    } = info;
    eventsEngine.off(prevTargets, scrollEvent, handler);
    const {
      hideOnParentScroll
    } = this.option();
    if (needSubscribe && hideOnParentScroll) {
      let $parents = this._getHideOnParentScrollTarget().parents();
      if (devices.real().deviceType === 'desktop') {
        $parents = $parents.add(window);
      }
      eventsEngine.on($parents, scrollEvent, handler);
      this._parentsScrollSubscriptionInfo = _extends({}, info, {
        prevTargets: $parents
      });
    }
  }
  _hideOnParentsScrollHandler(e) {
    let hideHandled = false;
    const {
      hideOnParentScroll
    } = this.option();
    if (isFunction(hideOnParentScroll)) {
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
    const $hideOnParentScrollTarget = $(_hideOnParentScrollTarget);
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
    if (!this._$content.parent().is(this.$element())) {
      this._$content.appendTo(this.$element());
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
      const $element = $(element);
      if ($element.css('display') === 'none') {
        isHidden = true;
        return false;
      }
      return undefined;
    });
    return isHidden || !domAdapter.getBody().contains($parent.get(0));
  }
  _renderContentImpl() {
    const {
      contentTemplate: contentTemplateOption
    } = this.option();
    const whenContentRendered = Deferred();
    const contentTemplate = this._getTemplate(contentTemplateOption);
    const transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
    contentTemplate === null || contentTemplate === void 0 || contentTemplate.render({
      container: getPublicElement(this.$content()),
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
    this._positionController = new OverlayPositionController(this._getPositionControllerConfig());
  }
  _toggleWrapperScrollEventsSubscription(enabled) {
    // @ts-expect-error NAME has string | undefined type
    const eventName = addNamespace(dragEventMove, this.NAME);
    eventsEngine.off(this._$wrapper, eventName);
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
        const isScrollByWheel = isWheel && isCommandKeyPressed(e);
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
        _clearSelection: noop,
        isNative: true
      };
      eventsEngine.on(this._$wrapper, eventName, options, callback);
    }
  }
  _moveFromContainer() {
    this._$content.appendTo(this.$element());
    this._$wrapper.detach();
  }
  _checkContainerExists() {
    const $wrapperContainer = this._positionController.$container;
    // NOTE: The container is undefined when DOM is not ready yet. See T1143527
    if ($wrapperContainer === undefined) {
      return;
    }
    const containerExists = $wrapperContainer.length > 0;
    if (!containerExists) {
      uiErrors.log('W1021', this.NAME);
    }
  }
  _moveToContainer() {
    const $wrapperContainer = this._positionController.$container;
    if ($wrapperContainer !== undefined) {
      this._$wrapper.appendTo($wrapperContainer);
    }
    this._$content.appendTo(this._$wrapper);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderGeometry() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (this._isVisible() && windowUtils.hasWindow()) {
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
    return isWindow(element) && Boolean(shading);
  }
  _toggleSafariScrolling() {
    const visible = this._isVisible();
    const $body = $(domAdapter.getBody());
    const isIosSafari = devices.real().platform === 'ios' && browser.safari;
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
    const {
      $visualContainer
    } = this._positionController;
    const documentElement = domAdapter.getDocumentElement();
    const isVisualContainerWindow = isWindow($visualContainer === null || $visualContainer === void 0 ? void 0 : $visualContainer.get(0));
    const wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : getOuterWidth($visualContainer);
    const wrapperHeight = isVisualContainerWindow ? window.innerHeight : getOuterHeight($visualContainer);
    this._$wrapper.css({
      width: wrapperWidth,
      height: wrapperHeight
    });
  }
  _renderDimensions() {
    const content = this._$content.get(0);
    this._$content.css({
      minWidth: this._getOptionValue('minWidth', content),
      maxWidth: this._getOptionValue('maxWidth', content),
      minHeight: this._getOptionValue('minHeight', content),
      maxHeight: this._getOptionValue('maxHeight', content),
      width: this._getOptionValue('width', content),
      height: this._getOptionValue('height', content)
    });
  }
  _focusTarget() {
    return this._$content;
  }
  _attachKeyboardEvents() {
    this._keyboardListenerId = keyboard.on(this._$content, null, options => this._keyboardHandler(options));
  }
  // @ts-expect-error return type in base class is not void
  _keyboardHandler(options, onlyChildProcessing) {
    const e = options.originalEvent;
    const $target = $(e.target);
    const {
      ignoreChildEvents
    } = this.option();
    if ($target.is(this._$content) || !ignoreChildEvents) {
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
      this.$content().empty();
    }
    this._renderVisibility(false);
    this._cleanFocusState();
  }
  _dispose() {
    fx.stop(this._$content.get(0), false);
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    this._actions = {};
    this._parentsScrollSubscriptionInfo = undefined;
    super._dispose();
    this._toggleSafariScrolling();
    if (this._isVisible()) {
      zIndexPool.remove(this._zIndex);
    }
    this._$wrapper.remove();
    this._$content.remove();
    this._destroyTabTerminator();
  }
  _toggleRTLDirection(rtl) {
    this._$content.toggleClass(RTL_DIRECTION_CLASS, rtl);
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
    const result = Deferred();
    if (isShowing === visible) {
      // @ts-expect-error this
      return result.resolveWith(this, [isShowing]).promise();
    }
    const animateDeferred = Deferred();
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
    return getPublicElement(this._$content);
  }
  repaint() {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      triggerResizeEvent(this._$content);
    } else {
      super.repaint();
    }
  }
  static baseZIndex(zIndex) {
    return zIndexPool.base(zIndex);
  }
}
registerComponent('dxOverlay', Overlay);
export default Overlay;
