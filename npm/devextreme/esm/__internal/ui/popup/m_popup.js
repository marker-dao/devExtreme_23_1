/**
* DevExtreme (esm/__internal/ui/popup/m_popup.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/toolbar/ui.toolbar.base';
import { triggerResizeEvent } from '../../../common/core/events/visibility_change';
import messageLocalization from '../../../common/core/localization/message';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import { getPublicElement } from '../../../core/element';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import resizeObserverSingleton from '../../../core/resize_observer';
import { EmptyTemplate } from '../../../core/templates/empty_template';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { camelize } from '../../../core/utils/inflector';
import { each } from '../../../core/utils/iterator';
import { getBoundingRect } from '../../../core/utils/position';
import { addOffsetToMaxHeight, addOffsetToMinHeight, getHeight, getOuterWidth, getVerticalOffsets, getVisibleHeight, getWidth } from '../../../core/utils/size';
import { isDefined, isObject } from '../../../core/utils/type';
import Button from '../../../ui/button';
import Resizable from '../../../ui/resizable';
import { current, isFluent, isMaterial, isMaterialBased } from '../../../ui/themes';
import windowUtils from '../../core/utils/m_window';
import Overlay from '../../ui/overlay/overlay';
import * as zIndexPool from '../../ui/overlay/z_index';
import { TOOLBAR_CLASS } from '../../ui/toolbar/constants';
import PopupDrag from './m_popup_drag';
import { createBodyOverflowManager } from './m_popup_overflow_manager';
import { PopupPositionController } from './m_popup_position_controller';
// STYLE popup
const window = windowUtils.getWindow();
export const POPUP_CLASS = 'dx-popup';
const POPUP_WRAPPER_CLASS = 'dx-popup-wrapper';
const POPUP_FULL_SCREEN_CLASS = 'dx-popup-fullscreen';
const POPUP_FULL_SCREEN_WIDTH_CLASS = 'dx-popup-fullscreen-width';
const POPUP_NORMAL_CLASS = 'dx-popup-normal';
export const POPUP_CONTENT_CLASS = 'dx-popup-content';
export const POPUP_CONTENT_SCROLLABLE_CLASS = 'dx-popup-content-scrollable';
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const POPUP_DRAGGABLE_CLASS = 'dx-popup-draggable';
const POPUP_TITLE_CLASS = 'dx-popup-title';
export const POPUP_TITLE_CLOSEBUTTON_CLASS = 'dx-closebutton';
const POPUP_BOTTOM_CLASS = 'dx-popup-bottom';
const POPUP_HAS_CLOSE_BUTTON_CLASS = 'dx-has-close-button';
export const TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
const POPUP_CONTENT_FLEX_HEIGHT_CLASS = 'dx-popup-flex-height';
const POPUP_CONTENT_INHERIT_HEIGHT_CLASS = 'dx-popup-inherit-height';
const TOOLBAR_LABEL_CLASS = 'dx-toolbar-label';
const ALLOWED_TOOLBAR_ITEM_ALIASES = ['cancel', 'clear', 'done'];
const BUTTON_DEFAULT_TYPE = 'default';
const BUTTON_NORMAL_TYPE = 'normal';
const BUTTON_TEXT_MODE = 'text';
const BUTTON_CONTAINED_MODE = 'contained';
const BUTTON_OUTLINED_MODE = 'outlined';
const TOOLBAR_NAME_BASE = 'dxToolbarBase';
const HEIGHT_STRATEGIES = {
  static: '',
  inherit: POPUP_CONTENT_INHERIT_HEIGHT_CLASS,
  flex: POPUP_CONTENT_FLEX_HEIGHT_CLASS
};
const getButtonPlace = name => {
  const device = devices.current();
  const {
    platform
  } = device;
  let toolbar = 'bottom';
  let location = 'before';
  if (platform === 'ios') {
    // eslint-disable-next-line default-case
    switch (name) {
      case 'cancel':
        toolbar = 'top';
        break;
      case 'clear':
        toolbar = 'top';
        location = 'after';
        break;
      case 'done':
        location = 'after';
        break;
    }
  } else if (platform === 'android') {
    // eslint-disable-next-line default-case
    switch (name) {
      case 'cancel':
        location = 'after';
        break;
      case 'done':
        location = 'after';
        break;
    }
  }
  return {
    toolbar,
    location
  };
};
const getLocalizationKey = itemType => itemType.toLowerCase() === 'done' ? 'OK' : camelize(itemType, true);
const getHeightStrategyChangeOffset = (currentHeightStrategyClass, popupVerticalPaddings) => currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0;
class Popup extends Overlay {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      upArrow: e => {
        var _this$_drag;
        (_this$_drag = this._drag) === null || _this$_drag === void 0 || _this$_drag.moveUp(e);
      },
      downArrow: e => {
        var _this$_drag2;
        (_this$_drag2 = this._drag) === null || _this$_drag2 === void 0 || _this$_drag2.moveDown(e);
      },
      leftArrow: e => {
        var _this$_drag3;
        (_this$_drag3 = this._drag) === null || _this$_drag3 === void 0 || _this$_drag3.moveLeft(e);
      },
      rightArrow: e => {
        var _this$_drag4;
        (_this$_drag4 = this._drag) === null || _this$_drag4 === void 0 || _this$_drag4.moveRight(e);
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      fullScreen: false,
      title: '',
      showTitle: true,
      titleTemplate: 'title',
      onTitleRendered: null,
      dragOutsideBoundary: false,
      dragEnabled: false,
      enableBodyScroll: true,
      outsideDragFactor: 0,
      onResizeStart: null,
      onResize: null,
      onResizeEnd: null,
      resizeEnabled: false,
      toolbarItems: [],
      showCloseButton: false,
      bottomTemplate: 'bottom',
      useDefaultToolbarButtons: false,
      useFlatToolbarButtons: false,
      autoResizeEnabled: true
    });
  }
  _defaultOptionsRules() {
    // @ts-expect-error ts-error
    return super._defaultOptionsRules().concat([{
      device: {
        platform: 'ios'
      },
      options: {
        animation: this._iosAnimation
      }
    }, {
      device: {
        platform: 'android'
      },
      options: {
        animation: this._androidAnimation
      }
    }, {
      device: {
        platform: 'generic'
      },
      options: {
        showCloseButton: true
      }
    }, {
      device(device) {
        return devices.real().deviceType === 'desktop' && device.platform === 'generic';
      },
      options: {
        dragEnabled: true
      }
    }, {
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return isMaterialBased(current());
      },
      options: {
        useFlatToolbarButtons: true
      }
    }, {
      device() {
        return isMaterial(current());
      },
      options: {
        useDefaultToolbarButtons: true,
        showCloseButton: false
      }
    }]);
  }
  // eslint-disable-next-line class-methods-use-this
  _iosAnimation() {
    return {
      show: {
        type: 'slide',
        duration: 400,
        from: {
          position: {
            my: 'top',
            at: 'bottom'
          }
        },
        to: {
          position: {
            my: 'center',
            at: 'center'
          }
        }
      },
      hide: {
        type: 'slide',
        duration: 400,
        from: {
          opacity: 1,
          position: {
            my: 'center',
            at: 'center'
          }
        },
        to: {
          opacity: 1,
          position: {
            my: 'top',
            at: 'bottom'
          }
        }
      }
    };
  }
  _androidAnimation() {
    const fullScreenConfig = {
      show: {
        type: 'slide',
        duration: 300,
        from: {
          top: '30%',
          opacity: 0
        },
        to: {
          top: 0,
          opacity: 1
        }
      },
      hide: {
        type: 'slide',
        duration: 300,
        from: {
          top: 0,
          opacity: 1
        },
        to: {
          top: '30%',
          opacity: 0
        }
      }
    };
    const defaultConfig = {
      show: {
        type: 'fade',
        duration: 400,
        from: 0,
        to: 1
      },
      hide: {
        type: 'fade',
        duration: 400,
        from: 1,
        to: 0
      }
    };
    // @ts-expect-error ts-error
    return this.option('fullScreen') ? fullScreenConfig : defaultConfig;
  }
  _init() {
    const {
      _wrapperClassExternal: popupWrapperClassExternal
    } = this.option();
    const popupWrapperClasses = popupWrapperClassExternal ? `${POPUP_WRAPPER_CLASS} ${popupWrapperClassExternal}` : POPUP_WRAPPER_CLASS;
    super._init();
    this._createBodyOverflowManager();
    this._updateResizeCallbackSkipCondition();
    this.$element().addClass(POPUP_CLASS);
    this.$wrapper().addClass(popupWrapperClasses);
    this._$popupContent = this._$content.wrapInner($('<div>').addClass(POPUP_CONTENT_CLASS)).children().eq(0);
    this._toggleContentScrollClass();
    this.$overlayContent().attr('role', 'dialog');
  }
  _render() {
    const isFullscreen = Boolean(this.option('fullScreen'));
    this._toggleFullScreenClass(isFullscreen);
    super._render();
  }
  _createBodyOverflowManager() {
    this._bodyOverflowManager = createBodyOverflowManager();
  }
  _toggleFullScreenClass(value) {
    this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_CLASS, value).toggleClass(POPUP_NORMAL_CLASS, !value);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new EmptyTemplate(),
      bottom: new EmptyTemplate()
    });
  }
  _getActionsList() {
    return super._getActionsList().concat(['onResizeStart', 'onResize', 'onResizeEnd']);
  }
  _contentResizeHandler(entry) {
    if (!this._shouldSkipContentResize(entry)) {
      this._renderGeometry({
        shouldOnlyReposition: true
      });
    }
  }
  _isShowAnimationResizing() {
    const animation = this.option('animation');
    return ['to', 'from'].some(prop => {
      var _animation$show;
      // @ts-expect-error ts-error
      const config = animation === null || animation === void 0 || (_animation$show = animation.show) === null || _animation$show === void 0 ? void 0 : _animation$show[prop];
      return isObject(config) && ('width' in config || 'height' in config);
    });
  }
  _updateResizeCallbackSkipCondition() {
    const isShowAnimationResizing = this._isShowAnimationResizing();
    this._shouldSkipContentResize = entry => isShowAnimationResizing
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    && this._showAnimationProcessing || this._areContentDimensionsRendered(entry);
  }
  _observeContentResize(shouldObserve) {
    if (!this.option('useResizeObserver')) {
      return;
    }
    const contentElement = this._$content.get(0);
    if (shouldObserve) {
      resizeObserverSingleton.observe(contentElement, entry => {
        this._contentResizeHandler(entry);
      });
    } else {
      resizeObserverSingleton.unobserve(contentElement);
    }
  }
  _areContentDimensionsRendered(entry) {
    var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
    const contentBox = (_entry$contentBoxSize = entry.contentBoxSize) === null || _entry$contentBoxSize === void 0 ? void 0 : _entry$contentBoxSize[0];
    if (contentBox) {
      var _this$_renderedDimens, _this$_renderedDimens2;
      // @ts-expect-error ts-error
      return parseInt(contentBox.inlineSize, 10) === ((_this$_renderedDimens = this._renderedDimensions) === null || _this$_renderedDimens === void 0 ? void 0 : _this$_renderedDimens.width)
      // @ts-expect-error ts-error
      && parseInt(contentBox.blockSize, 10) === ((_this$_renderedDimens2 = this._renderedDimensions) === null || _this$_renderedDimens2 === void 0 ? void 0 : _this$_renderedDimens2.height);
    }
    const {
      contentRect
    } = entry;
    // @ts-expect-error ts-error
    return parseInt(contentRect.width, 10) === ((_this$_renderedDimens3 = this._renderedDimensions) === null || _this$_renderedDimens3 === void 0 ? void 0 : _this$_renderedDimens3.width)
    // @ts-expect-error ts-error
    && parseInt(contentRect.height, 10) === ((_this$_renderedDimens4 = this._renderedDimensions) === null || _this$_renderedDimens4 === void 0 ? void 0 : _this$_renderedDimens4.height);
  }
  _renderContent() {
    super._renderContent();
    // NOTE: This observe should not be called before async showing is called. See T1130045.
    this._observeContentResize(true);
  }
  _processContentRendering() {
    this._renderTopToolbar();
    this._renderBottomToolbar();
    this._renderResize();
    super._processContentRendering();
  }
  _getTopToolbarItems() {
    const {
      showTitle,
      title
    } = this.option();
    const {
      ios: isIOS
    } = devices.current();
    const items = this._getToolbarItems('top');
    if (showTitle && Boolean(title)) {
      items.unshift({
        location: isIOS ? 'center' : 'before',
        text: title
      });
    }
    return items;
  }
  _renderTopToolbar() {
    const {
      showTitle
    } = this.option();
    const items = this._getTopToolbarItems();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const shouldBeShown = showTitle || items.length > 0;
    if (shouldBeShown) {
      var _this$_$topToolbar;
      if (this._$topToolbar) {
        this._updateToolbarOptions('top', {
          items
        });
      } else {
        this._renderTopToolbarImpl();
      }
      (_this$_$topToolbar = this._$topToolbar) === null || _this$_$topToolbar === void 0 || _this$_$topToolbar.toggleClass(POPUP_HAS_CLOSE_BUTTON_CLASS, this._hasCloseButton());
    } else {
      var _this$_$topToolbar2;
      (_this$_$topToolbar2 = this._$topToolbar) === null || _this$_$topToolbar2 === void 0 || _this$_$topToolbar2.detach();
    }
    this._toggleAriaLabel();
  }
  _renderTopToolbarImpl() {
    var _this$_$topToolbar3;
    (_this$_$topToolbar3 = this._$topToolbar) === null || _this$_$topToolbar3 === void 0 || _this$_$topToolbar3.remove();
    const items = this._getTopToolbarItems();
    const $toolbarContainer = $('<div>').addClass(POPUP_TITLE_CLASS).addClass(TOOLBAR_CLASS).insertBefore(this.$content());
    this._$topToolbar = this._renderToolbar('titleTemplate', items, $toolbarContainer, {
      onInitialized: e => {
        this._topToolbar = e.component;
      }
    });
    this._$topToolbar.addClass(POPUP_TITLE_CLASS);
    this._renderDrag();
    this._executeTitleRenderAction(this._$topToolbar);
  }
  _renderBottomToolbar() {
    const items = this._getToolbarItems('bottom');
    if (!items.length) {
      var _this$_$bottomToolbar;
      (_this$_$bottomToolbar = this._$bottomToolbar) === null || _this$_$bottomToolbar === void 0 || _this$_$bottomToolbar.detach();
      return;
    }
    if (this._$bottomToolbar) {
      this._updateToolbarOptions('bottom', {
        items
      });
    } else {
      this._renderBottomToolbarImpl();
    }
    this._toggleClasses();
  }
  _renderBottomToolbarImpl() {
    var _this$_$bottomToolbar2;
    (_this$_$bottomToolbar2 = this._$bottomToolbar) === null || _this$_$bottomToolbar2 === void 0 || _this$_$bottomToolbar2.remove();
    const items = this._getToolbarItems('bottom');
    const $toolbarContainer = $('<div>').addClass(POPUP_BOTTOM_CLASS).addClass(TOOLBAR_CLASS).insertAfter(this.$content());
    this._$bottomToolbar = this._renderToolbar('bottomTemplate', items, $toolbarContainer, {
      compactMode: true,
      onInitialized: e => {
        this._bottomToolbar = e.component;
      }
    });
    this._$bottomToolbar.addClass(POPUP_BOTTOM_CLASS);
  }
  _triggerToolbarResizeEvent() {
    // To trigger toolbar width to set overflow menu button width (T1245421)
    [this._$topToolbar, this._$bottomToolbar].forEach($toolbar => {
      if ($toolbar) {
        triggerResizeEvent($toolbar);
        triggerResizeEvent($toolbar);
      }
    });
  }
  _renderToolbar(optionName, items, $container) {
    let additionalToolbarOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const template = this._getTemplateByOption(optionName);
    const isEmptyTemplate = template instanceof EmptyTemplate;
    if (isEmptyTemplate) {
      return this._renderByPolymorphicTemplate(items, $container, additionalToolbarOptions);
    }
    return this._renderByTemplate(template, $container);
  }
  _renderByPolymorphicTemplate(items, $container, additionalToolbarOptions) {
    const {
      disabled,
      rtlEnabled,
      useDefaultToolbarButtons,
      useFlatToolbarButtons
    } = this.option();
    const integrationOptions = extend({}, this.option('integrationOptions'), {
      skipTemplates: ['content', 'title']
    });
    const toolbarOptions = extend(additionalToolbarOptions, {
      disabled,
      rtlEnabled,
      items,
      useDefaultButtons: useDefaultToolbarButtons,
      useFlatButtons: useFlatToolbarButtons,
      integrationOptions
    });
    const template = this._getTemplate('dx-polymorph-widget');
    template.render({
      container: $container,
      model: {
        widget: this._getToolbarName(),
        options: toolbarOptions
      }
    });
    const $toolbar = $container.children('div');
    $container.replaceWith($toolbar);
    return $toolbar;
  }
  // eslint-disable-next-line class-methods-use-this
  _renderByTemplate(template, $container) {
    const $result = $(template.render({
      container: getPublicElement($container)
    }));
    if ($result.hasClass(TEMPLATE_WRAPPER_CLASS)) {
      $container.replaceWith($result);
      // eslint-disable-next-line no-param-reassign
      $container = $result;
    }
    return $container;
  }
  _updateToolbarOptions(toolbar, options) {
    const instance = toolbar === 'top' ? this._topToolbar : this._bottomToolbar;
    instance === null || instance === void 0 || instance.option(options);
  }
  _toggleAriaLabel() {
    var _this$_$topToolbar4;
    const {
      title,
      showTitle
    } = this.option();
    const shouldSetAriaLabel = showTitle && Boolean(title);
    const titleId = shouldSetAriaLabel ? new Guid().toString() : null;
    (_this$_$topToolbar4 = this._$topToolbar) === null || _this$_$topToolbar4 === void 0 || _this$_$topToolbar4.find(`.${TOOLBAR_LABEL_CLASS}`).eq(0).attr('id', titleId);
    this.$overlayContent().attr('aria-labelledby', titleId);
  }
  _animateShowing() {
    this._triggerToolbarResizeEvent();
    super._animateShowing();
  }
  _renderVisibilityAnimate(visible) {
    return super._renderVisibilityAnimate(visible);
  }
  _hide() {
    this._observeContentResize(false);
    return super._hide();
  }
  _executeTitleRenderAction($titleElement) {
    this._getTitleRenderAction()({
      titleElement: getPublicElement($titleElement)
    });
  }
  _getTitleRenderAction() {
    return this._titleRenderAction ?? this._createTitleRenderAction();
  }
  _createTitleRenderAction() {
    this._titleRenderAction = this._createActionByOption('onTitleRendered', {
      element: this.element(),
      excludeValidators: ['disabled', 'readOnly']
    });
    return this._titleRenderAction;
  }
  _getCloseButton() {
    return {
      toolbar: 'top',
      location: 'after',
      template: this._getCloseButtonRenderer()
    };
  }
  _getCloseButtonRenderer() {
    return (_, __, container) => {
      const $button = $('<div>').addClass(POPUP_TITLE_CLOSEBUTTON_CLASS);
      this._createComponent($button, Button, {
        icon: 'close',
        onClick: this._createToolbarItemAction(undefined),
        stylingMode: 'text',
        integrationOptions: {}
      });
      $(container).append($button);
    };
  }
  _getToolbarItems(toolbar) {
    const {
      platform: currentPlatform
    } = devices.current();
    const {
      toolbarItems
    } = this.option();
    const toolbarsItems = [];
    this._toolbarItemClasses = [];
    let index = 0;
    each(toolbarItems, (_, data) => {
      const isShortcut = isDefined(data.shortcut);
      const item = isShortcut ? getButtonPlace(data.shortcut) : data;
      if (isShortcut && currentPlatform === 'ios' && index < 2) {
        item.toolbar = 'top';
        // eslint-disable-next-line no-plusplus
        index++;
      }
      item.toolbar = data.toolbar || item.toolbar || 'top';
      if (item && item.toolbar === toolbar) {
        if (isShortcut) {
          extend(item, {
            location: data.location
          }, this._getToolbarItemByAlias(data));
        }
        const isLTROrder = currentPlatform === 'generic';
        if (data.shortcut === 'done' && isLTROrder || data.shortcut === 'cancel' && !isLTROrder) {
          toolbarsItems.unshift(item);
        } else {
          toolbarsItems.push(item);
        }
      }
    });
    if (toolbar === 'top' && this._hasCloseButton()) {
      toolbarsItems.push(this._getCloseButton());
    }
    return toolbarsItems;
  }
  _hasCloseButton() {
    const {
      showCloseButton,
      showTitle
    } = this.option();
    return showCloseButton && showTitle;
  }
  _getToolbarButtonStylingMode(shortcut) {
    if (isFluent(current())) {
      return shortcut === 'done' ? BUTTON_CONTAINED_MODE : BUTTON_OUTLINED_MODE;
    }
    return this.option('useFlatToolbarButtons') ? BUTTON_TEXT_MODE : BUTTON_CONTAINED_MODE;
  }
  _getToolbarButtonType(shortcut) {
    if (isFluent(current()) && shortcut === 'done' || this.option('useDefaultToolbarButtons')) {
      return BUTTON_DEFAULT_TYPE;
    }
    return BUTTON_NORMAL_TYPE;
  }
  _getToolbarItemByAlias(data) {
    const itemType = data.shortcut;
    if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
      return false;
    }
    const itemConfig = extend({
      text: messageLocalization.format(getLocalizationKey(itemType)),
      onClick: this._createToolbarItemAction(data.onClick),
      integrationOptions: {},
      type: this._getToolbarButtonType(itemType),
      stylingMode: this._getToolbarButtonStylingMode(itemType)
    }, data.options || {});
    const itemClass = `${POPUP_CLASS}-${itemType}`;
    this._toolbarItemClasses.push(itemClass);
    return {
      template: (_, __, container) => {
        const $toolbarItem = $('<div>').addClass(itemClass).appendTo(container);
        this._createComponent($toolbarItem, Button, itemConfig);
      }
    };
  }
  _createToolbarItemAction(clickAction) {
    return this._createAction(clickAction, {
      afterExecute(e) {
        // @ts-expect-error ts-error
        e.component.hide();
      }
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _getToolbarName() {
    return TOOLBAR_NAME_BASE;
  }
  _toggleDisabledState(value) {
    // @ts-expect-error ts-error
    super._toggleDisabledState(...arguments);
    this.$content().toggleClass(DISABLED_STATE_CLASS, Boolean(value));
  }
  _toggleClasses() {
    const aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
    each(aliases, (_, alias) => {
      var _this$_$bottomToolbar3;
      const className = `${POPUP_CLASS}-${alias}`;
      const isVisible = this._toolbarItemClasses.includes(className);
      this.$wrapper().toggleClass(`${className}-visible`, isVisible);
      (_this$_$bottomToolbar3 = this._$bottomToolbar) === null || _this$_$bottomToolbar3 === void 0 || _this$_$bottomToolbar3.toggleClass(className, isVisible);
    });
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, $element);
    if (isFocused && !zIndexPool.isLastZIndexInStack(this._zIndex)) {
      const zIndex = zIndexPool.create(this._zIndexInitValue());
      zIndexPool.remove(this._zIndex);
      this._zIndex = zIndex;
      this._$wrapper.css('zIndex', zIndex);
      this._$content.css('zIndex', zIndex);
    }
  }
  _toggleContentScrollClass() {
    const isNativeScrollingEnabled = !this.option('preventScrollEvents');
    this.$content().toggleClass(POPUP_CONTENT_SCROLLABLE_CLASS, isNativeScrollingEnabled);
  }
  _getPositionControllerConfig() {
    const {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = this.option();
    return _extends({}, super._getPositionControllerConfig(), {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
  }
  _initPositionController() {
    if (this._positionController) {
      return;
    }
    this._positionController = new PopupPositionController(this._getPositionControllerConfig());
  }
  _getDragTarget() {
    return this.topToolbar();
  }
  _renderGeometry() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      visible,
      useResizeObserver
    } = this.option();
    const {
      forceStopAnimation,
      shouldOnlyReposition,
      isDimensionChange
    } = options;
    if (visible && windowUtils.hasWindow()) {
      const isAnimated = this._showAnimationProcessing;
      const shouldRepeatAnimation = isAnimated && !forceStopAnimation && useResizeObserver;
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      this._isAnimationPaused = shouldRepeatAnimation || undefined;
      this._stopAnimation();
      if (shouldOnlyReposition) {
        this._renderPosition(false);
      } else {
        this._renderGeometryImpl(isDimensionChange);
      }
      if (shouldRepeatAnimation) {
        this._animateShowing();
        this._isAnimationPaused = undefined;
      }
    }
  }
  _cacheDimensions() {
    if (!this.option('useResizeObserver')) {
      return;
    }
    this._renderedDimensions = {
      width: parseInt(getWidth(this._$content), 10),
      height: parseInt(getHeight(this._$content), 10)
    };
  }
  _renderGeometryImpl() {
    let isDimensionChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!isDimensionChange) {
      // NOTE: to save content scroll position T1113123
      // NOTE: for correct new position calculation
      this._resetContentHeight();
    }
    super._renderGeometryImpl();
    this._cacheDimensions();
    this._setContentHeight();
  }
  _resetContentHeight() {
    const height = this._getOptionValue('height');
    if (height === 'auto') {
      this.$content().css({
        height: 'auto',
        maxHeight: 'none'
      });
    }
  }
  _renderDrag() {
    const $dragTarget = this._getDragTarget();
    const {
      dragEnabled
    } = this.option();
    if (!$dragTarget) {
      return;
    }
    const config = {
      dragEnabled,
      handle: $dragTarget.get(0),
      draggableElement: this._$content.get(0),
      positionController: this._positionController
    };
    if (this._drag) {
      this._drag.init(config);
    } else {
      this._drag = new PopupDrag(config);
    }
    this.$overlayContent().toggleClass(POPUP_DRAGGABLE_CLASS, dragEnabled);
  }
  _renderResize() {
    this._resizable = this._createComponent(this._$content, Resizable, {
      handles: this.option('resizeEnabled') ? 'all' : 'none',
      onResizeStart: e => {
        var _this$_actions, _this$_actions$onResi;
        this._observeContentResize(false);
        (_this$_actions = this._actions) === null || _this$_actions === void 0 || (_this$_actions$onResi = _this$_actions.onResizeStart) === null || _this$_actions$onResi === void 0 || _this$_actions$onResi.call(_this$_actions, e);
      },
      onResize: e => {
        var _this$_actions2, _this$_actions2$onRes;
        this._setContentHeight();
        (_this$_actions2 = this._actions) === null || _this$_actions2 === void 0 || (_this$_actions2$onRes = _this$_actions2.onResize) === null || _this$_actions2$onRes === void 0 || _this$_actions2$onRes.call(_this$_actions2, e);
      },
      onResizeEnd: e => {
        this._resizeEndHandler(e);
        this._observeContentResize(true);
      },
      minHeight: 100,
      minWidth: 100,
      area: this._positionController.$dragResizeContainer,
      keepAspectRatio: false
    });
  }
  _resizeEndHandler(e) {
    var _this$_actions3, _this$_actions3$onRes;
    const width = this._resizable.option('width');
    const height = this._resizable.option('height');
    if (width) {
      this._setOptionWithoutOptionChange('width', width);
    }
    if (height) {
      this._setOptionWithoutOptionChange('height', height);
    }
    this._cacheDimensions();
    this._positionController.resizeHandled();
    this._positionController.detectVisualPositionChange(e.event);
    (_this$_actions3 = this._actions) === null || _this$_actions3 === void 0 || (_this$_actions3$onRes = _this$_actions3.onResizeEnd) === null || _this$_actions3$onRes === void 0 || _this$_actions3$onRes.call(_this$_actions3, e);
  }
  _setContentHeight() {
    const {
      forceApplyBindings
    } = this.option();
    (forceApplyBindings ?? noop)();
    const overlayContent = this.$overlayContent().get(0);
    const currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
    this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
    this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass);
  }
  _chooseHeightStrategy(overlayContent) {
    const isAutoWidth = overlayContent.style.width === 'auto' || overlayContent.style.width === '';
    let currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
    if (this._isAutoHeight() && this.option('autoResizeEnabled')) {
      if (isAutoWidth) {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit;
      } else {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.flex;
      }
    }
    return currentHeightStrategyClass;
  }
  _getHeightCssStyles(currentHeightStrategyClass, overlayContent) {
    let cssStyles = {};
    const contentMaxHeight = this._getOptionValue('maxHeight', overlayContent);
    const contentMinHeight = this._getOptionValue('minHeight', overlayContent);
    const popupHeightParts = this._splitPopupHeight();
    const heightStrategyChangeOffset = getHeightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
    const toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + heightStrategyChangeOffset;
    if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
      if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
        const overlayHeight = this.option('fullScreen') ? Math.min(getBoundingRect(overlayContent).height, windowUtils.getWindow().innerHeight) : getBoundingRect(overlayContent).height;
        const contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
        cssStyles = {
          height: Math.max(0, contentHeight),
          minHeight: 'auto',
          maxHeight: 'auto'
        };
      }
    } else {
      const container = $(this._positionController.$visualContainer).get(0);
      const maxHeightValue = addOffsetToMaxHeight(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
      const minHeightValue = addOffsetToMinHeight(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
      cssStyles = {
        height: 'auto',
        minHeight: minHeightValue,
        maxHeight: maxHeightValue
      };
    }
    return cssStyles;
  }
  // eslint-disable-next-line class-methods-use-this
  _setHeightClasses($container, currentClass) {
    let excessClasses = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const name in HEIGHT_STRATEGIES) {
      if (HEIGHT_STRATEGIES[name] !== currentClass) {
        excessClasses += ` ${HEIGHT_STRATEGIES[name]}`;
      }
    }
    $container.removeClass(excessClasses).addClass(currentClass);
  }
  _isAutoHeight() {
    // @ts-expect-error ts-error
    return this.$overlayContent().get(0).style.height === 'auto';
  }
  _splitPopupHeight() {
    const topToolbar = this.topToolbar();
    const bottomToolbar = this.bottomToolbar();
    return {
      header: getVisibleHeight(topToolbar === null || topToolbar === void 0 ? void 0 : topToolbar.get(0)),
      footer: getVisibleHeight(bottomToolbar === null || bottomToolbar === void 0 ? void 0 : bottomToolbar.get(0)),
      contentVerticalOffsets: getVerticalOffsets(this.$overlayContent().get(0), true),
      popupVerticalOffsets: getVerticalOffsets(this.$content().get(0), true),
      popupVerticalPaddings: getVerticalOffsets(this.$content().get(0), false)
    };
  }
  _isAllWindowCovered() {
    const {
      fullScreen
    } = this.option();
    return super._isAllWindowCovered() || Boolean(fullScreen);
  }
  _renderDimensions() {
    if (this.option('fullScreen')) {
      this.$overlayContent().css({
        width: '100%',
        height: '100%',
        minWidth: '',
        maxWidth: '',
        minHeight: '',
        maxHeight: ''
      });
    } else {
      super._renderDimensions();
    }
    if (windowUtils.hasWindow()) {
      this._renderFullscreenWidthClass();
    }
  }
  _dimensionChanged() {
    this._renderGeometry({
      isDimensionChange: true
    });
  }
  _clean() {
    super._clean();
    this._observeContentResize(false);
  }
  _dispose() {
    super._dispose();
    this._toggleBodyScroll(true);
  }
  _renderFullscreenWidthClass() {
    const isFullScreen = getOuterWidth(this.$overlayContent()) === getWidth(window);
    this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_WIDTH_CLASS, isFullScreen);
  }
  _toggleSafariScrolling() {
    if (!this.option('enableBodyScroll')) {
      return;
    }
    super._toggleSafariScrolling();
  }
  _toggleBodyScroll(enabled) {
    if (!this._bodyOverflowManager) {
      return;
    }
    const {
      setOverflow,
      restoreOverflow
    } = this._bodyOverflowManager;
    if (enabled) {
      restoreOverflow();
    } else {
      setOverflow();
    }
  }
  refreshPosition() {
    this._renderPosition();
  }
  _optionChanged(args) {
    var _this$_resizable2;
    const {
      value,
      name
    } = args;
    switch (name) {
      case 'rtlEnabled':
      case 'disabled':
        {
          super._optionChanged(args);
          const options = {
            [name]: Boolean(value)
          };
          this._updateToolbarOptions('top', options);
          this._updateToolbarOptions('bottom', options);
          break;
        }
      case 'animation':
        this._updateResizeCallbackSkipCondition();
        break;
      case 'enableBodyScroll':
        if (this.option('visible')) {
          // @ts-expect-error ts-error
          this._toggleBodyScroll(value);
        }
        break;
      case 'showTitle':
      case 'title':
        this._renderTopToolbar();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'titleTemplate':
        {
          this._renderTopToolbarImpl();
          this._renderGeometry();
          triggerResizeEvent(this.$overlayContent());
          break;
        }
      case 'bottomTemplate':
        this._renderBottomToolbarImpl();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'container':
        super._optionChanged(args);
        if (this.option('resizeEnabled')) {
          var _this$_resizable;
          // @ts-expect-error ts-error
          (_this$_resizable = this._resizable) === null || _this$_resizable === void 0 || _this$_resizable.option('area', this._positionController.$dragResizeContainer);
        }
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        // @ts-expect-error ts-error
        (_this$_resizable2 = this._resizable) === null || _this$_resizable2 === void 0 || _this$_resizable2.option(name, value);
        break;
      case 'onTitleRendered':
        this._createTitleRenderAction();
        break;
      case 'toolbarItems':
      case 'useDefaultToolbarButtons':
      case 'useFlatToolbarButtons':
        {
          this._renderTopToolbar();
          this._renderBottomToolbar();
          this._renderGeometry();
          this._triggerToolbarResizeEvent();
          break;
        }
      case 'dragEnabled':
        this._renderDrag();
        break;
      case 'dragAndResizeArea':
        this._positionController.dragAndResizeArea = value;
        if (this.option('resizeEnabled')) {
          // @ts-expect-error ts-error
          this._resizable.option('area', this._positionController.$dragResizeContainer);
        }
        this._positionController.positionContent();
        break;
      case 'dragOutsideBoundary':
        this._positionController.dragOutsideBoundary = value;
        if (this.option('resizeEnabled')) {
          // @ts-expect-error ts-error
          this._resizable.option('area', this._positionController.$dragResizeContainer);
        }
        break;
      case 'outsideDragFactor':
        this._positionController.outsideDragFactor = value;
        break;
      case 'resizeEnabled':
        this._renderResize();
        this._renderGeometry();
        break;
      case 'autoResizeEnabled':
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'fullScreen':
        this._positionController.fullScreen = value;
        this._toggleFullScreenClass(Boolean(value));
        this._toggleSafariScrolling();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'showCloseButton':
        this._renderTopToolbar();
        break;
      case 'preventScrollEvents':
        super._optionChanged(args);
        this._toggleContentScrollClass();
        break;
      default:
        super._optionChanged(args);
    }
  }
  bottomToolbar() {
    return this._$bottomToolbar;
  }
  topToolbar() {
    return this._$topToolbar;
  }
  $content() {
    return this._$popupContent;
  }
  content() {
    return getPublicElement(this.$content());
  }
  $overlayContent() {
    return this._$content;
  }
  getFocusableElements() {
    return this.$wrapper().find('[tabindex]')
    // @ts-expect-error ts-error
    .filter((_, item) => item.getAttribute('tabindex') >= 0);
  }
}
registerComponent('dxPopup', Popup);
export default Popup;
