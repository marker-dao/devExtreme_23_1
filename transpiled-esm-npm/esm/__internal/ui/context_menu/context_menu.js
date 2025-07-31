import _extends from "@babel/runtime/helpers/esm/extends";
import { fx } from '../../../common/core/animation';
import animationPosition from '../../../common/core/animation/position';
import { name as contextMenuEventName } from '../../../common/core/events/contextmenu';
import eventsEngine from '../../../common/core/events/core/events_engine';
import holdEvent from '../../../common/core/events/hold';
import { addNamespace } from '../../../common/core/events/utils';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { Deferred } from '../../../core/utils/deferred';
import { contains } from '../../../core/utils/dom';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { getOuterHeight } from '../../../core/utils/size';
import { isDefined, isFunction, isObject, isPlainObject, isRenderer, isString } from '../../../core/utils/type';
import { getWindow, hasWindow } from '../../../core/utils/window';
import { current as currentTheme, isGeneric } from '../../../ui/themes';
import MenuBase from '../../ui/context_menu/menu_base';
import Overlay from '../../ui/overlay/overlay';
import Scrollable from '../../ui/scroll_view/scrollable';
const DX_MENU_CLASS = 'dx-menu';
export const DX_MENU_ITEM_CLASS = `${DX_MENU_CLASS}-item`;
const DX_MENU_ITEM_EXPANDED_CLASS = `${DX_MENU_ITEM_CLASS}-expanded`;
const DX_MENU_PHONE_CLASS = 'dx-menu-phone-overlay';
const DX_MENU_ITEMS_CONTAINER_CLASS = `${DX_MENU_CLASS}-items-container`;
const DX_MENU_ITEM_WRAPPER_CLASS = `${DX_MENU_ITEM_CLASS}-wrapper`;
const DX_SUBMENU_CLASS = 'dx-submenu';
export const DX_CONTEXT_MENU_CLASS = 'dx-context-menu';
const DX_HAS_CONTEXT_MENU_CLASS = 'dx-has-context-menu';
const DX_STATE_DISABLED_CLASS = 'dx-state-disabled';
const DX_STATE_FOCUSED_CLASS = 'dx-state-focused';
const DX_STATE_HOVER_CLASS = 'dx-state-hover';
const OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
const SCROLLABLE_CLASS = 'dx-scrollable';
const FOCUS_UP = 'up';
const FOCUS_DOWN = 'down';
const FOCUS_LEFT = 'left';
const FOCUS_RIGHT = 'right';
const FOCUS_FIRST = 'first';
const FOCUS_LAST = 'last';
const ACTIONS = ['onShowing', 'onShown', 'onSubmenuCreated', 'onHiding', 'onHidden', 'onPositioning', 'onLeftFirstItem', 'onLeftLastItem', 'onCloseRootSubmenu', 'onExpandLastSubmenu'];
const LOCAL_SUBMENU_DIRECTIONS = [FOCUS_UP, FOCUS_DOWN, FOCUS_FIRST, FOCUS_LAST];
const DEFAULT_SHOW_EVENT = 'dxcontextmenu';
const SUBMENU_PADDING = 10;
const BORDER_WIDTH = 1;
const window = getWindow();
class ContextMenu extends MenuBase {
  getShowEvent(showEventOption) {
    if (isObject(showEventOption)) {
      if (showEventOption.name === null) {
        return null;
      }
      return showEventOption.name ?? DEFAULT_SHOW_EVENT;
    }
    return showEventOption ?? null;
  }
  getShowDelay(showEventOption) {
    return isObject(showEventOption) ? showEventOption.delay ?? 0 : 0;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      showEvent: DEFAULT_SHOW_EVENT,
      hideOnOutsideClick: true,
      position: {
        at: 'top left',
        my: 'top left'
      },
      onShowing: null,
      onShown: null,
      onSubmenuCreated: null,
      onHiding: null,
      onHidden: null,
      onPositioning: null,
      submenuDirection: 'auto',
      visible: false,
      target: undefined,
      onLeftFirstItem: null,
      onLeftLastItem: null,
      onCloseRootSubmenu: null,
      onExpandLastSubmenu: null,
      hideOnParentScroll: true,
      visualContainer: window
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => !hasWindow(),
      // @ts-expect-error ts-error
      options: {
        animation: null
      }
    }]);
  }
  _initActions() {
    this._actions = {};
    each(ACTIONS, (_index, action) => {
      // @ts-expect-error ts-error
      this._actions[action] = this._createActionByOption(action) || noop;
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      animation: true,
      selectedItem: true
    });
  }
  _focusInHandler() {}
  _itemContainer() {
    return this._overlay ? this._overlay.$content() : $();
  }
  _eventBindingTarget() {
    return this._itemContainer();
  }
  itemsContainer() {
    var _this$_overlay;
    return ((_this$_overlay = this._overlay) === null || _this$_overlay === void 0 ? void 0 : _this$_overlay.$content()) ?? $();
  }
  _supportedKeys() {
    const selectItem = () => {
      const {
        focusedElement
      } = this.option();
      const $item = $(focusedElement);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.hide();
      if (!$item.length || !this._isSelectionEnabled()) {
        return;
      }
      this.selectItem($item[0]);
    };
    return _extends({}, super._supportedKeys(), {
      space: selectItem,
      escape: this.hide
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getActiveItem(_last) {
    const $availableItems = this._getAvailableItems();
    const $focusedItem = $availableItems.filter(`.${DX_STATE_FOCUSED_CLASS}`);
    const $hoveredItem = $availableItems.filter(`.${DX_STATE_HOVER_CLASS}`);
    const $hoveredItemContainer = $hoveredItem.closest(`.${DX_MENU_ITEMS_CONTAINER_CLASS}`);
    if ($hoveredItemContainer.find(`.${DX_MENU_ITEM_CLASS}`).index($focusedItem) >= 0) {
      return $focusedItem;
    }
    if ($hoveredItem.length) {
      return $hoveredItem;
    }
    return super._getActiveItem();
  }
  // eslint-disable-next-line consistent-return, @typescript-eslint/no-invalid-void-type
  _moveFocus(location) {
    const $items = this._getItemsByLocation(location);
    const $oldTarget = this._getActiveItem(true);
    const $hoveredItem = this.itemsContainer().find(`.${DX_STATE_HOVER_CLASS}`);
    const {
      focusedElement,
      rtlEnabled
    } = this.option();
    const $focusedItem = $(focusedElement);
    const $activeItemHighlighted = !!($focusedItem.length || $hoveredItem !== null && $hoveredItem !== void 0 && $hoveredItem.length);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let $newTarget;
    switch (location) {
      case FOCUS_UP:
        $newTarget = $activeItemHighlighted ? this._prevItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.first())) {
          var _this$_actions$onLeft, _this$_actions;
          (_this$_actions$onLeft = (_this$_actions = this._actions).onLeftFirstItem) === null || _this$_actions$onLeft === void 0 || _this$_actions$onLeft.call(_this$_actions, $oldTarget);
        }
        break;
      case FOCUS_DOWN:
        $newTarget = $activeItemHighlighted ? this._nextItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.last())) {
          var _this$_actions$onLeft2, _this$_actions2;
          (_this$_actions$onLeft2 = (_this$_actions2 = this._actions).onLeftLastItem) === null || _this$_actions$onLeft2 === void 0 || _this$_actions$onLeft2.call(_this$_actions2, $oldTarget);
        }
        break;
      case FOCUS_RIGHT:
        $newTarget = rtlEnabled ? this._hideSubmenuHandler() : this._expandSubmenuHandler($items, location);
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_LEFT:
        $newTarget = rtlEnabled ? this._expandSubmenuHandler($items, location) : this._hideSubmenuHandler();
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_FIRST:
        $newTarget = $items.first();
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_LAST:
        $newTarget = $items.last();
        this._setFocusedElement($newTarget);
        break;
      default:
        return super._moveFocus(location);
    }
  }
  _setFocusedElement($element) {
    if ($element && $element.length !== 0) {
      this.option('focusedElement', getPublicElement($element));
      this._scrollToElement($element);
    }
  }
  _scrollToElement($element) {
    const $scrollableElement = $element.closest(`.${SCROLLABLE_CLASS}`);
    const scrollableInstance = Scrollable.getInstance($scrollableElement.get(0));
    scrollableInstance === null || scrollableInstance === void 0 || scrollableInstance.scrollToElement($element);
  }
  _getItemsByLocation(location) {
    const $activeItem = this._getActiveItem(true);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let $items;
    if (LOCAL_SUBMENU_DIRECTIONS.includes(location)) {
      $items = $activeItem.closest(`.${DX_MENU_ITEMS_CONTAINER_CLASS}`).children().children();
    }
    $items = this._getAvailableItems($items);
    return $items;
  }
  _getAriaTarget() {
    return this.$element();
  }
  _refreshActiveDescendant() {
    if (isDefined(this._overlay)) {
      const $target = this._overlay.$content();
      super._refreshActiveDescendant($target);
    }
  }
  _hideSubmenuHandler() {
    var _this$_actions$onClos, _this$_actions3;
    const $curItem = this._getActiveItem(true);
    const $parentItem = $curItem.parents(`.${DX_MENU_ITEM_EXPANDED_CLASS}`).first();
    if ($parentItem.length) {
      this._hideSubmenusOnSameLevel($parentItem);
      this._hideSubmenu($curItem.closest(`.${DX_SUBMENU_CLASS}`));
      return $parentItem;
    }
    (_this$_actions$onClos = (_this$_actions3 = this._actions).onCloseRootSubmenu) === null || _this$_actions$onClos === void 0 || _this$_actions$onClos.call(_this$_actions3, $curItem);
    return undefined;
  }
  _expandSubmenuHandler($items, location) {
    var _this$_actions$onExpa, _this$_actions4;
    const $curItem = this._getActiveItem(true);
    const itemData = this._getItemData($curItem);
    const node = this._dataAdapter.getNodeByItem(itemData);
    const isItemHasSubmenu = this._hasSubmenu(node);
    const $submenu = $curItem.children(`.${DX_SUBMENU_CLASS}`);
    if (isItemHasSubmenu && !$curItem.hasClass(DX_STATE_DISABLED_CLASS)) {
      // @ts-expect-error ts-error
      if (!$submenu.length || $submenu.css('visibility') === 'hidden') {
        this._showSubmenu($curItem);
      }
      return this._nextItem(this._getItemsByLocation(location));
    }
    (_this$_actions$onExpa = (_this$_actions4 = this._actions).onExpandLastSubmenu) === null || _this$_actions$onExpa === void 0 || _this$_actions$onExpa.call(_this$_actions4, $curItem);
    return undefined;
  }
  _clean() {
    if (this._overlay) {
      this._overlay.$element().remove();
      this._overlay = null;
    }
    this._detachShowContextMenuEvents(this._getTarget());
    this._shownSubmenus = [];
    super._clean();
  }
  _initMarkup() {
    this.$element().addClass(DX_HAS_CONTEXT_MENU_CLASS);
    this._eventNamespace = `${this.NAME}${new Guid()}`;
    super._initMarkup();
  }
  _render() {
    super._render();
    const {
      visible
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._renderVisibility(visible);
    this._addWidgetClass();
  }
  _isTargetOutOfComponent(relatedTarget) {
    const isInsideContextMenu = $(relatedTarget).closest(`.${DX_CONTEXT_MENU_CLASS}`).length !== 0;
    return !isInsideContextMenu;
  }
  _focusOutHandler(e) {
    const {
      relatedTarget
    } = e;
    if (relatedTarget) {
      // ts-expect-error ts-error
      const isTargetOutside = this._isTargetOutOfComponent(relatedTarget);
      if (isTargetOutside) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.hide();
      }
    }
    super._focusOutHandler(e);
  }
  _renderContentImpl() {
    this._detachShowContextMenuEvents(this._getTarget());
    this._showContextMenuEventHandler = this._createShowContextMenuEventHandler();
    this._attachShowContextMenuEvents();
  }
  _attachKeyboardEvents() {
    if (!this._keyboardListenerId && this._focusTarget().length) {
      super._attachKeyboardEvents();
    }
  }
  _renderContextMenuOverlay() {
    if (this._overlay) {
      return;
    }
    const overlayOptions = this._getOverlayOptions();
    this._overlay = this._createComponent($('<div>').appendTo(this.$element()), Overlay, overlayOptions);
    const $overlayContent = this._overlay.$content();
    $overlayContent.addClass(DX_CONTEXT_MENU_CLASS);
    this._addCustomCssClass($overlayContent);
    this._addPlatformDependentClass($overlayContent);
    this._attachContextMenuEvent();
  }
  preventShowingDefaultContextMenuAboveOverlay() {
    const $itemContainer = this._itemContainer();
    const eventName = addNamespace(contextMenuEventName, this._eventNamespace);
    eventsEngine.off($itemContainer, eventName, `.${DX_SUBMENU_CLASS}`);
    eventsEngine.on($itemContainer, eventName, `.${DX_SUBMENU_CLASS}`, e => {
      e.stopPropagation();
      e.preventDefault();
      eventsEngine.off($itemContainer, eventName, `.${DX_SUBMENU_CLASS}`);
    });
  }
  _itemContextMenuHandler(e) {
    super._itemContextMenuHandler(e);
    e.stopPropagation();
  }
  _addPlatformDependentClass($element) {
    if (devices.current().phone) {
      $element.addClass(DX_MENU_PHONE_CLASS);
    }
  }
  _createShowContextMenuEventHandler() {
    const showContextMenuAction = this._createAction(e => {
      const {
        showEvent
      } = this.option();
      const delay = this.getShowDelay(showEvent);
      if (delay) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-restricted-globals
        setTimeout(() => this._show(e.event), delay);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._show(e.event);
      }
    }, {
      validatingTargetName: 'target'
    });
    return e => showContextMenuAction({
      event: e,
      target: $(e.currentTarget)
    });
  }
  _detachShowContextMenuEvents(target, event) {
    const {
      showEvent: showEventOption
    } = this.option();
    const showEvent = this.getShowEvent(event ?? showEventOption);
    if (!showEvent) {
      return;
    }
    const isSelector = isString(target);
    const eventName = addNamespace(showEvent, this._eventNamespace);
    if (isSelector) {
      eventsEngine.off(domAdapter.getDocument(), eventName, target,
      // @ts-expect-error ts-error
      this._showContextMenuEventHandler);
    } else {
      // @ts-expect-error ts-error
      eventsEngine.off($(target), eventName, this._showContextMenuEventHandler);
    }
  }
  _attachShowContextMenuEvents() {
    const {
      showEvent: showEventOption,
      disabled
    } = this.option();
    const showEvent = this.getShowEvent(showEventOption);
    if (!showEvent || disabled) {
      return;
    }
    const target = this._getTarget();
    const isSelector = isString(target);
    const eventName = addNamespace(showEvent, this._eventNamespace);
    if (isSelector) {
      eventsEngine.on(domAdapter.getDocument(), eventName, target, this._showContextMenuEventHandler);
    } else {
      eventsEngine.on(target, eventName, this._showContextMenuEventHandler);
    }
  }
  _hoverEndHandler(e) {
    super._hoverEndHandler(e);
    e.stopPropagation();
  }
  _renderDimensions() {}
  _renderContainer($wrapper, submenuContainer) {
    const $holder = submenuContainer ?? this._itemContainer();
    // eslint-disable-next-line no-param-reassign
    $wrapper = $('<div>');
    $wrapper.appendTo($holder).addClass(DX_SUBMENU_CLASS).css('visibility', submenuContainer ? 'hidden' : 'visible');
    if (!$wrapper.parent().hasClass(OVERLAY_CONTENT_CLASS)) {
      this._addCustomCssClass($wrapper);
    }
    const $itemsContainer = super._renderContainer($wrapper);
    if (submenuContainer) {
      return $itemsContainer;
    }
    const {
      width,
      height
    } = this.option();
    if (width) {
      return $itemsContainer.css('minWidth', width);
    }
    if (height) {
      return $itemsContainer.css('minHeight', height);
    }
    return $itemsContainer;
  }
  _renderSubmenuItems(node, $itemFrame) {
    var _this$_actions$onSubm, _this$_actions5;
    this._renderItems(this._getChildNodes(node), $itemFrame);
    const $submenu = $itemFrame.children(`.${DX_SUBMENU_CLASS}`);
    (_this$_actions$onSubm = (_this$_actions5 = this._actions).onSubmenuCreated) === null || _this$_actions$onSubm === void 0 || _this$_actions$onSubm.call(_this$_actions5, {
      itemElement: getPublicElement($itemFrame),
      itemData: node.internalFields.item,
      submenuElement: getPublicElement($submenu)
    });
    this._initScrollable($submenu);
    this.setAria({
      role: 'menu'
    }, $submenu);
  }
  _getOverlayOptions() {
    const {
      position,
      focusStateEnabled,
      animation,
      hideOnParentScroll,
      visualContainer,
      overlayContainer,
      boundaryOffset
    } = this.option();
    return {
      focusStateEnabled,
      animation,
      innerOverlay: true,
      hideOnOutsideClick: e => this._hideOnOutsideClickHandler(e),
      propagateOutsideClick: true,
      hideOnParentScroll,
      deferRendering: false,
      container: overlayContainer,
      position: {
        // @ts-expect-error ts-error
        at: position.at,
        // @ts-expect-error ts-error
        my: position.my,
        of: this._getTarget(),
        collision: 'flipfit',
        boundary: visualContainer,
        boundaryOffset
      },
      shading: false,
      showTitle: false,
      height: 'auto',
      width: 'auto',
      // @ts-expect-error ts-error
      onShown: this._overlayShownActionHandler.bind(this),
      // @ts-expect-error ts-error
      onHiding: this._overlayHidingActionHandler.bind(this),
      // @ts-expect-error ts-error
      onHidden: this._overlayHiddenActionHandler.bind(this),
      visualContainer
    };
  }
  _overlayShownActionHandler(arg) {
    var _this$_actions$onShow, _this$_actions6;
    (_this$_actions$onShow = (_this$_actions6 = this._actions).onShown) === null || _this$_actions$onShow === void 0 || _this$_actions$onShow.call(_this$_actions6, arg);
  }
  _overlayHidingActionHandler(arg) {
    var _this$_actions$onHidi, _this$_actions7;
    (_this$_actions$onHidi = (_this$_actions7 = this._actions).onHiding) === null || _this$_actions$onHidi === void 0 || _this$_actions$onHidi.call(_this$_actions7, arg);
    if (!arg.cancel) {
      this._hideAllShownSubmenus();
      this._setOptionWithoutOptionChange('visible', false);
    }
  }
  _overlayHiddenActionHandler(arg) {
    var _this$_actions$onHidd, _this$_actions8;
    (_this$_actions$onHidd = (_this$_actions8 = this._actions).onHidden) === null || _this$_actions$onHidd === void 0 || _this$_actions$onHidd.call(_this$_actions8, arg);
  }
  _shouldHideOnOutsideClick(e) {
    const {
      hideOnOutsideClick
    } = this.option();
    if (isFunction(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return hideOnOutsideClick;
  }
  _hideOnOutsideClickHandler(e) {
    if (!this._shouldHideOnOutsideClick(e)) {
      return false;
    }
    if (domAdapter.isDocument(e.target)) {
      return true;
    }
    const $activeItemContainer = this._getActiveItemsContainer(e.target);
    const $itemContainers = this._getItemsContainers();
    const $clickedItem = this._searchActiveItem(e.target);
    const $rootItem = this.$element().parents(`.${DX_MENU_ITEM_CLASS}`);
    const isRootItemClicked = $clickedItem[0] === $rootItem[0] && !!$clickedItem.length && !!$rootItem.length;
    const isInnerOverlayClicked = this._isIncludeOverlay($activeItemContainer, $itemContainers) && !!$clickedItem.length;
    if (isInnerOverlayClicked || isRootItemClicked) {
      if (this._getShowSubmenuMode() === 'onClick') {
        this._hideAllShownChildSubmenus($clickedItem);
      }
      return false;
    }
    return true;
  }
  _getActiveItemsContainer(target) {
    return $(target).closest(`.${DX_MENU_ITEMS_CONTAINER_CLASS}`);
  }
  _getItemsContainers() {
    var _this$_overlay2;
    return ((_this$_overlay2 = this._overlay) === null || _this$_overlay2 === void 0 ? void 0 : _this$_overlay2.$content().find(`.${DX_MENU_ITEMS_CONTAINER_CLASS}`)) ?? $();
  }
  _searchActiveItem(target) {
    return $(target).closest(`.${DX_MENU_ITEM_CLASS}`).eq(0);
  }
  _isIncludeOverlay($activeOverlay, $allOverlays) {
    let isSame = false;
    each($allOverlays, (_index, $overlay) => {
      if ($activeOverlay.is($overlay) && !isSame) {
        isSame = true;
      }
    });
    return isSame;
  }
  _hideAllShownChildSubmenus($clickedItem) {
    const $submenuElements = $clickedItem.find(`.${DX_SUBMENU_CLASS}`);
    const shownSubmenus = extend([], this._shownSubmenus);
    if ($submenuElements.length > 0) {
      each(shownSubmenus, (index, $submenu) => {
        const $context = this._searchActiveItem($submenu.context).parent();
        if ($context.parent().is($clickedItem.parent().parent()) && !$context.is($clickedItem.parent())) {
          this._hideSubmenu($submenu);
        }
      });
    }
  }
  _initScrollable($container) {
    this._createComponent($container, Scrollable, {
      useKeyboard: false,
      // @ts-expect-error ts-error
      _onVisibilityChanged: scrollable => {
        scrollable.scrollTo(0);
      }
    });
  }
  _setSubMenuHeight($submenu, $anchor, isNestedSubmenu) {
    const $itemsContainer = $submenu.find(`.${DX_MENU_ITEMS_CONTAINER_CLASS}`);
    const contentHeight = getOuterHeight($itemsContainer);
    const maxHeight = this._getMaxHeight($anchor, !isNestedSubmenu);
    const menuHeight = Math.min(contentHeight, maxHeight);
    $submenu.css('height', isNestedSubmenu ? menuHeight : '100%');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getMaxUsableSpace(_offsetTop, windowHeight, _anchorHeight) {
    return windowHeight;
  }
  _getMaxHeight($anchor) {
    let considerAnchorHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const windowHeight = getOuterHeight(window);
    const isAnchorRenderer = isRenderer($anchor);
    const document = domAdapter.getDocument();
    const isAnchorDocument = isObject($anchor) && 'length' in $anchor && $anchor.length && $anchor[0] === document;
    if (!isAnchorRenderer || isAnchorDocument) {
      return windowHeight;
    }
    const offsetTop = $anchor === null || $anchor === void 0 ? void 0 : $anchor[0].getBoundingClientRect().top;
    const anchorHeight = getOuterHeight($anchor);
    const availableHeight = considerAnchorHeight ? this._getMaxUsableSpace(offsetTop, windowHeight, anchorHeight) : Math.max(offsetTop + anchorHeight, windowHeight - offsetTop);
    return availableHeight - SUBMENU_PADDING;
  }
  _dimensionChanged() {
    if (!this._shownSubmenus) {
      return;
    }
    this._shownSubmenus.forEach($submenu => {
      const $item = $submenu.closest(`.${DX_MENU_ITEM_CLASS}`);
      this._setSubMenuHeight($submenu, $item, true);
      this._scrollToElement($item);
      const submenuPosition = this._getSubmenuPosition($item);
      animationPosition.setup($submenu, submenuPosition);
    });
  }
  _getSubmenuBorderWidth() {
    return isGeneric(currentTheme()) ? BORDER_WIDTH : 0;
  }
  _showSubmenu($item) {
    const node = this._dataAdapter.getNodeByItem(this._getItemData($item));
    this._hideSubmenusOnSameLevel($item);
    if (!this._hasSubmenu(node)) return;
    let $submenu = $item.children(`.${DX_SUBMENU_CLASS}`);
    const isSubmenuRendered = $submenu.length;
    super._showSubmenu($item);
    if (node && !isSubmenuRendered) {
      this._renderSubmenuItems(node, $item);
      $submenu = $item.children(`.${DX_SUBMENU_CLASS}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._planPostRenderActions($submenu);
  }
  _setSubmenuVisible($submenu) {
    if (!$submenu) {
      return;
    }
    const $item = $submenu === null || $submenu === void 0 ? void 0 : $submenu.closest(`.${DX_MENU_ITEM_CLASS}`);
    this._setSubMenuHeight($submenu, $item, true);
    if (!this._isSubmenuVisible($submenu) && $item) {
      this._drawSubmenu($item);
    }
  }
  _hideSubmenusOnSameLevel($item) {
    const $expandedItems = $item.parent(`.${DX_MENU_ITEM_WRAPPER_CLASS}`).siblings().find(`.${DX_MENU_ITEM_EXPANDED_CLASS}`);
    if ($expandedItems.length) {
      $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
      this._hideSubmenu($expandedItems.find(`.${DX_SUBMENU_CLASS}`));
    }
  }
  _isSubmenuVisible($submenu) {
    // @ts-expect-error ts-error
    return $submenu.css('visibility') === 'visible';
  }
  _drawSubmenu($itemElement) {
    var _this$_overlay3;
    const {
      animation: animationOption
    } = this.option();
    const animation = animationOption ? animationOption.show : {};
    const $submenu = $itemElement.children(`.${DX_SUBMENU_CLASS}`);
    const submenuPosition = this._getSubmenuPosition($itemElement);
    if ((_this$_overlay3 = this._overlay) !== null && _this$_overlay3 !== void 0 && _this$_overlay3.option('visible')) {
      if (!isDefined(this._shownSubmenus)) {
        this._shownSubmenus = [];
      }
      if (!this._shownSubmenus.includes($submenu)) {
        this._shownSubmenus.push($submenu);
      }
      if (animation) {
        fx.stop($submenu.get(0), false);
      }
      animationPosition.setup($submenu, submenuPosition);
      if (animation) {
        if (isPlainObject(animation.to)) {
          // @ts-expect-error ts-error
          animation.to.position = submenuPosition;
        }
        this._animate($submenu.get(0), animation);
      }
      $submenu.css('visibility', 'visible');
    }
  }
  _animate(container, options) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fx.animate(container, options);
  }
  _getSubmenuPosition($rootItem) {
    const {
      submenuDirection: submenuDirectionOption,
      rtlEnabled
    } = this.option();
    const submenuDirection = submenuDirectionOption === null || submenuDirectionOption === void 0 ? void 0 : submenuDirectionOption.toLowerCase();
    const $rootItemWrapper = $rootItem.parent(`.${DX_MENU_ITEM_WRAPPER_CLASS}`);
    const position = {
      collision: 'flip',
      // @ts-expect-error ts-error
      of: $rootItemWrapper,
      // @ts-expect-error ts-error
      offset: {
        h: 0,
        v: -1
      }
    };
    switch (submenuDirection) {
      case 'left':
        position.at = 'left top';
        position.my = 'right top';
        break;
      case 'right':
        position.at = 'right top';
        position.my = 'left top';
        break;
      default:
        if (rtlEnabled) {
          position.at = 'left top';
          position.my = 'right top';
        } else {
          position.at = 'right top';
          position.my = 'left top';
        }
        break;
    }
    return position;
  }
  // TODO: try to simplify it
  // @ts-expect-error ts-error
  _updateSubmenuVisibilityOnClick(actionArgs) {
    var _actionArgs$args;
    if (!((_actionArgs$args = actionArgs.args) !== null && _actionArgs$args !== void 0 && _actionArgs$args.length)) {
      return;
    }
    const {
      itemData,
      itemElement
    } = actionArgs.args[0];
    if (!itemData) {
      return;
    }
    const node = this._dataAdapter.getNodeByItem(itemData);
    if (!node) {
      return;
    }
    const $itemElement = $(itemElement);
    let $submenu = $itemElement.find(`.${DX_SUBMENU_CLASS}`);
    const shouldRenderSubmenu = this._hasSubmenu(node) && !$submenu.length;
    if (shouldRenderSubmenu) {
      this._renderSubmenuItems(node, $itemElement);
      $submenu = $itemElement.find(`.${DX_SUBMENU_CLASS}`);
    }
    // @ts-expect-error ts-error
    if ($itemElement.context === $submenu.context && $submenu.css('visibility') === 'visible') {
      return;
    }
    // @ts-expect-error ts-error
    this._updateSelectedItemOnClick(actionArgs);
    // T238943. Give the workaround with e.cancel and remove this hack
    const notCloseMenuOnItemClick = itemData && itemData.closeMenuOnClick === false;
    if (!itemData || itemData.disabled || notCloseMenuOnItemClick) {
      return;
    }
    if ($submenu.length === 0) {
      var _this$_overlay4;
      const $prevSubmenu = $($itemElement.parents(`.${DX_SUBMENU_CLASS}`)[0]);
      this._hideSubmenu($prevSubmenu);
      if (!actionArgs.canceled && (_this$_overlay4 = this._overlay) !== null && _this$_overlay4 !== void 0 && _this$_overlay4.option('visible')) {
        this.option('visible', false);
      }
    } else {
      if (this._shownSubmenus && this._shownSubmenus.length > 0) {
        if (this._shownSubmenus[0].is($submenu)) {
          this._hideSubmenu($submenu); // close to parent?
        }
      }
      this._showSubmenu($itemElement);
    }
  }
  _hideSubmenu($curSubmenu) {
    const shownSubmenus = this._shownSubmenus ?? [];
    each(shownSubmenus, (_index, $submenu) => {
      if ($curSubmenu.is($submenu) || contains($curSubmenu[0], $submenu[0])) {
        $submenu.parent().removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
        this._hideSubmenuCore($submenu);
      }
    });
  }
  _hideSubmenuCore($submenu) {
    const index = (this._shownSubmenus ?? []).indexOf($submenu);
    const {
      animation: animationOption
    } = this.option();
    const animation = animationOption ? animationOption.hide : null;
    if (index >= 0) {
      (this._shownSubmenus ?? []).splice(index, 1);
    }
    this._stopAnimate($submenu);
    if (animation) {
      this._animate($submenu.get(0), animation);
    }
    $submenu.css('visibility', 'hidden');
    // @ts-expect-error ts-error
    const scrollableInstance = $submenu.dxScrollable('instance');
    scrollableInstance.scrollTo(0);
    this.option('focusedElement', null);
  }
  _stopAnimate($container) {
    fx.stop($container.get(0), true);
  }
  _hideAllShownSubmenus() {
    var _this$_overlay5;
    const shownSubmenus = extend([], this._shownSubmenus);
    const $expandedItems = ((_this$_overlay5 = this._overlay) === null || _this$_overlay5 === void 0 ? void 0 : _this$_overlay5.$content().find(`.${DX_MENU_ITEM_EXPANDED_CLASS}`)) ?? $();
    $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
    each(shownSubmenus, (_, $submenu) => {
      this._hideSubmenu($submenu);
    });
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._renderContentImpl();
    }
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    if (ACTIONS.includes(name)) {
      this._initActions();
      return;
    }
    switch (name) {
      case 'visible':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._renderVisibility(value);
        break;
      case 'disabled':
      case 'position':
      case 'submenuDirection':
        this._invalidate();
        break;
      case 'showEvent':
        if (previousValue) {
          this._detachShowContextMenuEvents(this._getTarget(), previousValue);
        }
        this._invalidate();
        break;
      case 'target':
        if (previousValue) {
          this._detachShowContextMenuEvents(previousValue);
        }
        this._invalidate();
        break;
      case 'hideOnOutsideClick':
      case 'hideOnParentScroll':
      case 'visualContainer':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _renderVisibility(showing) {
    return showing ? this._show() : this._hide();
  }
  _toggleVisibility() {}
  _show(event) {
    var _this$_actions$onShow2, _this$_actions9;
    const args = {
      jQEvent: event
    };
    let promise = Deferred().reject().promise();
    (_this$_actions$onShow2 = (_this$_actions9 = this._actions).onShowing) === null || _this$_actions$onShow2 === void 0 || _this$_actions$onShow2.call(_this$_actions9, args);
    if (args.cancel) {
      return promise;
    }
    const position = this._positionContextMenu(event);
    if (position) {
      var _this$_overlay6, _this$_overlay7, _event$originalEvent;
      if (!this._overlay) {
        this._renderContextMenuOverlay();
        this._overlay.$content().addClass(this._widgetClass());
        this._renderFocusState();
        this._attachHoverEvents();
        this._attachClickEvent();
        this._renderItems(this._dataAdapter.getRootNodes());
      }
      const $subMenu = $((_this$_overlay6 = this._overlay) === null || _this$_overlay6 === void 0 ? void 0 : _this$_overlay6.content()).children(`.${DX_SUBMENU_CLASS}`);
      this._setOptionWithoutOptionChange('visible', true);
      (_this$_overlay7 = this._overlay) === null || _this$_overlay7 === void 0 || _this$_overlay7.option({
        height: () => this._getMaxHeight(position.of),
        maxHeight: () => {
          const $content = $subMenu.find(`.${DX_MENU_ITEMS_CONTAINER_CLASS}`);
          const outerHeight = getOuterHeight($content);
          const borderWidth = this._getSubmenuBorderWidth();
          return outerHeight + borderWidth * 2;
        },
        position
      });
      if ($subMenu.length) {
        this._setSubMenuHeight($subMenu, position.of, false);
      }
      if (this._overlay) {
        promise = this._overlay.show();
      }
      event === null || event === void 0 || event.stopPropagation();
      this._setAriaAttributes();
      // T983617. Prevent the browser's context menu appears on desktop touch screens.
      // @ts-expect-error ts-error
      if ((event === null || event === void 0 || (_event$originalEvent = event.originalEvent) === null || _event$originalEvent === void 0 ? void 0 : _event$originalEvent.type) === holdEvent.name) {
        this.preventShowingDefaultContextMenuAboveOverlay();
      }
    }
    return promise;
  }
  _renderItems(nodes, submenuContainer) {
    var _this$_overlay8;
    super._renderItems(nodes, submenuContainer);
    const $submenu = $((_this$_overlay8 = this._overlay) === null || _this$_overlay8 === void 0 ? void 0 : _this$_overlay8.content()).children(`.${DX_SUBMENU_CLASS}`);
    if ($submenu.length) {
      this._initScrollable($submenu);
    }
  }
  _setAriaAttributes() {
    var _this$_overlay9;
    this._overlayContentId = `dx-${new Guid()}`;
    this.setAria('owns', this._overlayContentId);
    this.setAria({
      id: this._overlayContentId,
      role: 'menu'
    }, (_this$_overlay9 = this._overlay) === null || _this$_overlay9 === void 0 ? void 0 : _this$_overlay9.$content());
  }
  _cleanAriaAttributes() {
    if (this._overlay) {
      this.setAria('id', null, this._overlay.$content());
    }
    this.setAria('owns', undefined);
  }
  _getTarget() {
    const {
      target,
      position
    } = this.option();
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return target || (position === null || position === void 0 ? void 0 : position.of) || $(domAdapter.getDocument());
  }
  _getContextMenuPosition() {
    const {
      position
    } = this.option();
    return _extends({}, position, {
      // @ts-expect-error ts-error
      of: this._getTarget()
    });
  }
  _positionContextMenu(jQEvent) {
    let position = this._getContextMenuPosition();
    const isInitialPosition = this._isInitialOptionValue('position');
    const positioningAction = this._createActionByOption('onPositioning');
    if (jQEvent !== null && jQEvent !== void 0 && jQEvent.preventDefault && isInitialPosition) {
      // @ts-expect-error ts-error
      position.of = jQEvent;
    }
    const actionArgs = {
      position,
      event: jQEvent
    };
    positioningAction(actionArgs);
    if (actionArgs.cancel) {
      position = null;
    } else if (actionArgs.event) {
      actionArgs.event.cancel = true;
      jQEvent === null || jQEvent === void 0 || jQEvent.preventDefault();
    }
    return position;
  }
  _refresh() {
    if (!hasWindow()) {
      super._refresh();
    } else if (this._overlay) {
      const {
        position: lastPosition
      } = this._overlay.option();
      super._refresh();
      if (this._overlay) {
        this._overlay.option('position', lastPosition);
      }
    } else {
      super._refresh();
    }
  }
  _hide() {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let promise;
    if (this._overlay) {
      promise = this._overlay.hide();
      this._setOptionWithoutOptionChange('visible', false);
    }
    this._cleanAriaAttributes();
    this.option('focusedElement', null);
    return promise ?? Deferred().reject().promise();
  }
  toggle(showing) {
    const {
      visible
    } = this.option();
    return this._renderVisibility(showing ?? !visible);
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  _postProcessRenderItems($submenu) {
    this._setSubmenuVisible($submenu);
  }
}
registerComponent('dxContextMenu', ContextMenu);
export default ContextMenu;