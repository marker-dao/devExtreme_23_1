import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../../common/core/events/core/events_engine';
import { end as hoverEventEnd } from '../../../common/core/events/hover';
import pointerEvents from '../../../common/core/events/pointer';
import { addNamespace } from '../../../common/core/events/utils';
import registerComponent from '../../../core/component_registrator';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { getOuterWidth } from '../../../core/utils/size';
import { isDefined, isObject, isPlainObject } from '../../../core/utils/type';
import Button from '../../../ui/button';
import Overlay from '../../../ui/overlay/ui.overlay';
import TreeView from '../../../ui/tree_view';
import MenuBase from '../../ui/context_menu/menu_base';
import { getElementMaxHeightByWindow } from '../../ui/overlay/m_utils';
import Submenu from './submenu';
const DX_MENU_CLASS = 'dx-menu';
const DX_MENU_VERTICAL_CLASS = `${DX_MENU_CLASS}-vertical`;
const DX_MENU_HORIZONTAL_CLASS = `${DX_MENU_CLASS}-horizontal`;
export const DX_MENU_ITEM_CLASS = `${DX_MENU_CLASS}-item`;
const DX_MENU_ITEMS_CONTAINER_CLASS = `${DX_MENU_CLASS}-items-container`;
const DX_MENU_ITEM_EXPANDED_CLASS = `${DX_MENU_ITEM_CLASS}-expanded`;
const DX_CONTEXT_MENU_CLASS = 'dx-context-menu';
const DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS = `${DX_CONTEXT_MENU_CLASS}-container-border`;
const DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS = 'dx-context-menu-content-delimiter';
const DX_SUBMENU_CLASS = 'dx-submenu';
const DX_STATE_DISABLED_CLASS = 'dx-state-disabled';
const DX_STATE_HOVER_CLASS = 'dx-state-hover';
const DX_STATE_ACTIVE_CLASS = 'dx-state-active';
const DX_ADAPTIVE_MODE_CLASS = `${DX_MENU_CLASS}-adaptive-mode`;
const DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS = `${DX_MENU_CLASS}-hamburger-button`;
const DX_ADAPTIVE_MODE_OVERLAY_WRAPPER_CLASS = `${DX_ADAPTIVE_MODE_CLASS}-overlay-wrapper`;
const FOCUS_UP = 'up';
const FOCUS_DOWN = 'down';
const FOCUS_LEFT = 'left';
const FOCUS_RIGHT = 'right';
const SHOW_SUBMENU_OPERATION = 'showSubmenu';
const NEXT_ITEM_OPERATION = 'nextItem';
const PREV_ITEM_OPERATION = 'prevItem';
const DEFAULT_DELAY = {
  show: 50,
  hide: 300
};
const ACTIONS = ['onSubmenuShowing', 'onSubmenuShown', 'onSubmenuHiding', 'onSubmenuHidden', 'onItemContextMenu', 'onItemClick', 'onSelectionChanged', 'onItemRendered'];
class Menu extends MenuBase {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      orientation: 'horizontal',
      submenuDirection: 'auto',
      showFirstSubmenuMode: {
        name: 'onClick',
        delay: {
          show: 50,
          hide: 300
        }
      },
      hideSubmenuOnMouseLeave: false,
      // @ts-expect-error ts-error
      onSubmenuShowing: null,
      // @ts-expect-error ts-error
      onSubmenuShown: null,
      // @ts-expect-error ts-error
      onSubmenuHiding: null,
      // @ts-expect-error ts-error
      onSubmenuHidden: null,
      adaptivityEnabled: false
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      animation: true,
      selectedItem: true
    });
  }
  _itemElements() {
    const rootMenuElements = super._itemElements();
    const submenuElements = this._submenuItemElements();
    // @ts-expect-error ts-error
    return rootMenuElements.add(submenuElements);
  }
  _submenuItemElements() {
    const itemSelector = `.${DX_MENU_ITEM_CLASS}`;
    const currentSubmenu = this._submenus.length && this._submenus[0];
    if (currentSubmenu && currentSubmenu.itemsContainer()) {
      var _currentSubmenu$items;
      return ((_currentSubmenu$items = currentSubmenu.itemsContainer()) === null || _currentSubmenu$items === void 0 ? void 0 : _currentSubmenu$items.find(itemSelector)) ?? $();
    }
    return $();
  }
  _focusTarget() {
    return this.$element();
  }
  _isMenuHorizontal() {
    const {
      orientation
    } = this.option();
    return orientation === 'horizontal';
  }
  // eslint-disable-next-line consistent-return,@typescript-eslint/no-invalid-void-type
  _moveFocus(location) {
    const $items = this._getAvailableItems();
    const isMenuHorizontal = this._isMenuHorizontal();
    const $activeItem = this._getActiveItem(true);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let $argument;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let operation;
    switch (location) {
      case FOCUS_UP:
        operation = isMenuHorizontal ? SHOW_SUBMENU_OPERATION : this._getItemsNavigationOperation(PREV_ITEM_OPERATION);
        $argument = isMenuHorizontal ? $activeItem : $items;
        break;
      case FOCUS_DOWN:
        operation = isMenuHorizontal ? SHOW_SUBMENU_OPERATION : this._getItemsNavigationOperation(NEXT_ITEM_OPERATION);
        $argument = isMenuHorizontal ? $activeItem : $items;
        break;
      case FOCUS_RIGHT:
        operation = isMenuHorizontal ? this._getItemsNavigationOperation(NEXT_ITEM_OPERATION) : SHOW_SUBMENU_OPERATION;
        $argument = isMenuHorizontal ? $items : $activeItem;
        break;
      case FOCUS_LEFT:
        operation = isMenuHorizontal ? this._getItemsNavigationOperation(PREV_ITEM_OPERATION) : SHOW_SUBMENU_OPERATION;
        $argument = isMenuHorizontal ? $items : $activeItem;
        break;
      default:
        return super._moveFocus(location);
    }
    const navigationAction = this._getKeyboardNavigationAction(operation, $argument);
    const $newTarget = navigationAction();
    if ($newTarget && $newTarget.length !== 0) {
      this.option('focusedElement', getPublicElement($newTarget));
    }
  }
  _getItemsNavigationOperation(operation) {
    const {
      rtlEnabled
    } = this.option();
    if (rtlEnabled) {
      return operation === PREV_ITEM_OPERATION ? NEXT_ITEM_OPERATION : PREV_ITEM_OPERATION;
    }
    return operation;
  }
  _getKeyboardNavigationAction(operation, argument) {
    let action = noop;
    switch (operation) {
      case SHOW_SUBMENU_OPERATION:
        if (!argument.hasClass(DX_STATE_DISABLED_CLASS)) {
          action = this._showSubmenu.bind(this, argument);
        }
        break;
      case NEXT_ITEM_OPERATION:
        action = this._nextItem.bind(this, argument);
        break;
      case PREV_ITEM_OPERATION:
        action = this._prevItem.bind(this, argument);
        break;
      default:
        break;
    }
    return action;
  }
  _clean() {
    super._clean();
    const {
      templatesRenderAsynchronously
    } = this.option();
    if (templatesRenderAsynchronously) {
      clearTimeout(this._resizeEventTimer);
    }
  }
  _visibilityChanged(visible) {
    if (visible) {
      if (!this._menuItemsWidth) {
        this._updateItemsWidthCache();
      }
      this._dimensionChanged();
    }
  }
  _isAdaptivityEnabled() {
    const {
      adaptivityEnabled,
      orientation
    } = this.option();
    return !!adaptivityEnabled && orientation === 'horizontal';
  }
  _updateItemsWidthCache() {
    const $menuItems = this.$element().find('ul').first().children('li').children(`.${DX_MENU_ITEM_CLASS}`);
    this._menuItemsWidth = this._getSummaryItemsSize('width', $menuItems, true);
  }
  _dimensionChanged() {
    if (!this._isAdaptivityEnabled()) {
      return;
    }
    const containerWidth = getOuterWidth(this.$element());
    this._toggleAdaptiveMode(this._menuItemsWidth > containerWidth);
  }
  _init() {
    super._init();
    this._submenus = [];
  }
  _initActions() {
    this._actions = {};
    each(ACTIONS, (_index, action) => {
      // @ts-expect-error ts-error
      this._actions[action] = this._createActionByOption(action);
    });
  }
  _initMarkup() {
    this._visibleSubmenu = null;
    this.$element().addClass(DX_MENU_CLASS);
    super._initMarkup();
    this._addCustomCssClass(this.$element());
    this.setAria('role', 'menubar');
  }
  _setAriaRole(state) {
    const role = this._isAdaptivityEnabled() && state ? undefined : 'menubar';
    this.setAria({
      role
    });
  }
  _render() {
    super._render();
    this._initAdaptivity();
  }
  _isTargetOutOfComponent(relatedTarget) {
    const isInsideRootMenu = $(relatedTarget).closest(`.${DX_MENU_CLASS}`).length !== 0;
    const isInsideContextMenu = $(relatedTarget).closest(`.${DX_CONTEXT_MENU_CLASS}`).length !== 0;
    return !(isInsideRootMenu || isInsideContextMenu);
  }
  _focusOutHandler(e) {
    const {
      relatedTarget
    } = e;
    if (relatedTarget) {
      const isTargetOutside = this._isTargetOutOfComponent(relatedTarget);
      if (isTargetOutside) {
        this._hideVisibleSubmenu();
      }
    }
    super._focusOutHandler(e);
  }
  _renderHamburgerButton() {
    // @ts-expect-error ts-error
    this._hamburger = new Button($('<div>').addClass(DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS), {
      icon: 'menu',
      activeStateEnabled: false,
      onClick: this._toggleTreeView.bind(this)
    });
    return this._hamburger.$element();
  }
  _toggleTreeView(state) {
    var _this$_overlay2;
    if (isPlainObject(state)) {
      var _this$_overlay;
      const {
        visible
      } = ((_this$_overlay = this._overlay) === null || _this$_overlay === void 0 ? void 0 : _this$_overlay.option()) ?? {};
      // eslint-disable-next-line no-param-reassign
      state = !visible;
    }
    (_this$_overlay2 = this._overlay) === null || _this$_overlay2 === void 0 || _this$_overlay2.option('visible', state);
    if (state) {
      var _this$_treeView;
      (_this$_treeView = this._treeView) === null || _this$_treeView === void 0 || _this$_treeView.focus();
    }
    this._toggleHamburgerActiveState(state);
  }
  _toggleHamburgerActiveState(isActive) {
    var _this$_hamburger;
    (_this$_hamburger = this._hamburger) === null || _this$_hamburger === void 0 || _this$_hamburger.$element().toggleClass(DX_STATE_ACTIVE_CLASS, isActive);
  }
  _toggleAdaptiveMode(state) {
    const $menuItemsContainer = this.$element().find(`.${DX_MENU_HORIZONTAL_CLASS}`);
    const $adaptiveElements = this.$element().find(`.${DX_ADAPTIVE_MODE_CLASS}`);
    if (state) {
      this._hideVisibleSubmenu();
    } else {
      var _this$_treeView2;
      (_this$_treeView2 = this._treeView) === null || _this$_treeView2 === void 0 || _this$_treeView2.collapseAll();
      if (this._overlay) {
        this._toggleTreeView(state);
      }
    }
    this._setAriaRole(state);
    // @ts-expect-error ts-error
    $menuItemsContainer.toggle(!state);
    // @ts-expect-error ts-error
    $adaptiveElements.toggle(state);
  }
  _removeAdaptivity() {
    if (!this._$adaptiveContainer) {
      return;
    }
    this._toggleAdaptiveMode(false);
    this._$adaptiveContainer.remove();
    this._$adaptiveContainer = null;
    this._treeView = null;
    this._hamburger = null;
    this._overlay = null;
  }
  _treeviewItemClickHandler(e) {
    var _e$node;
    // @ts-expect-error ts-error
    this._actions.onItemClick(e);
    if (!((_e$node = e.node) !== null && _e$node !== void 0 && (_e$node = _e$node.children) !== null && _e$node !== void 0 && _e$node.length)) {
      this._toggleTreeView(false);
    }
  }
  _getAdaptiveOverlayOptions() {
    var _this$_hamburger2;
    const {
      rtlEnabled
    } = this.option();
    const position = rtlEnabled ? 'right' : 'left';
    return {
      _ignoreFunctionValueDeprecation: true,
      // @ts-expect-error ts-error
      maxHeight: () => getElementMaxHeightByWindow(this.$element()),
      deferRendering: false,
      shading: false,
      // @ts-expect-error ts-error
      animation: false,
      hideOnParentScroll: true,
      onHidden: () => {
        this._toggleHamburgerActiveState(false);
      },
      height: 'auto',
      hideOnOutsideClick(e) {
        return !$(e.target).closest(`.${DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS}`).length;
      },
      position: {
        collision: 'flipfit',
        at: `bottom ${position}`,
        my: `top ${position}`,
        of: (_this$_hamburger2 = this._hamburger) === null || _this$_hamburger2 === void 0 ? void 0 : _this$_hamburger2.$element()
      }
    };
  }
  _getTreeViewOptions() {
    const menuOptions = {};
    const optionsToTransfer = ['rtlEnabled', 'width', 'accessKey', 'activeStateEnabled', 'animation', 'dataSource', 'disabled', 'displayExpr', 'displayExpr', 'focusStateEnabled', 'hint', 'hoverStateEnabled', 'itemsExpr', 'items', 'itemTemplate', 'selectedExpr', 'selectionMode', 'tabIndex', 'visible'];
    each(optionsToTransfer, (_index, option) => {
      menuOptions[option] = this.option(option);
    });
    const actionsToTransfer = ['onItemContextMenu', 'onSelectionChanged', 'onItemRendered'];
    each(actionsToTransfer, (_index, actionName) => {
      menuOptions[actionName] = e => {
        this._actions[actionName](e);
      };
    });
    const {
      animation,
      selectByClick
    } = this.option();
    return _extends({}, menuOptions, {
      // @ts-expect-error ts-error
      dataSource: this.getDataSource(),
      animationEnabled: !!animation,
      onItemClick: this._treeviewItemClickHandler.bind(this),
      onItemExpanded: e => {
        var _this$_overlay3, _this$_actions$onSubm, _this$_actions;
        (_this$_overlay3 = this._overlay) === null || _this$_overlay3 === void 0 || _this$_overlay3.repaint();
        // @ts-expect-error ts-error
        (_this$_actions$onSubm = (_this$_actions = this._actions).onSubmenuShown) === null || _this$_actions$onSubm === void 0 || _this$_actions$onSubm.call(_this$_actions, e);
      },
      onItemCollapsed: e => {
        var _this$_overlay4, _this$_actions$onSubm2, _this$_actions2;
        (_this$_overlay4 = this._overlay) === null || _this$_overlay4 === void 0 || _this$_overlay4.repaint();
        // @ts-expect-error ts-error
        (_this$_actions$onSubm2 = (_this$_actions2 = this._actions).onSubmenuHidden) === null || _this$_actions$onSubm2 === void 0 || _this$_actions$onSubm2.call(_this$_actions2, e);
      },
      selectNodesRecursive: false,
      selectByClick,
      expandEvent: 'click',
      _supportItemUrl: true
    });
  }
  _initAdaptivity() {
    if (!this._isAdaptivityEnabled()) {
      return;
    }
    const {
      cssClass
    } = this.option();
    const $hamburger = this._renderHamburgerButton();
    // @ts-expect-error ts-error
    this._treeView = this._createComponent($('<div>'), TreeView, this._getTreeViewOptions());
    this._overlay = this._createComponent($('<div>'), Overlay, this._getAdaptiveOverlayOptions());
    this._overlay.$content().append(this._treeView.$element()).addClass(DX_ADAPTIVE_MODE_CLASS)
    // @ts-expect-error ts-error
    .addClass(cssClass);
    this._overlay.$wrapper().addClass(DX_ADAPTIVE_MODE_OVERLAY_WRAPPER_CLASS);
    this._$adaptiveContainer = $('<div>').addClass(DX_ADAPTIVE_MODE_CLASS);
    this._$adaptiveContainer.append($hamburger);
    this._$adaptiveContainer.append(this._overlay.$element());
    this.$element().append(this._$adaptiveContainer);
    this._updateItemsWidthCache();
    this._dimensionChanged();
  }
  _getDelay(delayType) {
    const {
      showFirstSubmenuMode
    } = this.option();
    const delay = isObject(showFirstSubmenuMode) ? showFirstSubmenuMode.delay : undefined;
    if (!isDefined(delay)) {
      return DEFAULT_DELAY[delayType];
    }
    return isObject(delay) ? delay[delayType] ?? DEFAULT_DELAY[delayType] : delay;
  }
  _keyboardHandler(e) {
    return super._keyboardHandler(e, !!this._visibleSubmenu);
  }
  _renderContainer() {
    const $wrapper = $('<div>');
    $wrapper.appendTo(this.$element()).addClass(this._isMenuHorizontal() ? DX_MENU_HORIZONTAL_CLASS : DX_MENU_VERTICAL_CLASS);
    return super._renderContainer($wrapper);
  }
  _renderSubmenuItems(node, $itemFrame) {
    const submenu = this._createSubmenu(node, $itemFrame);
    this._submenus.push(submenu);
    this._renderBorderElement($itemFrame);
    return submenu;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getKeyboardListeners() {
    return super._getKeyboardListeners().concat(this._visibleSubmenu);
  }
  _createSubmenu(node, $rootItem) {
    const $submenuContainer = $('<div>').addClass(DX_CONTEXT_MENU_CLASS).appendTo($rootItem);
    const items = this._getChildNodes(node);
    const subMenu = this._createComponent($submenuContainer, Submenu, _extends({}, this._getSubmenuOptions(), {
      _dataAdapter: this._dataAdapter,
      _parentKey: node.internalFields.key,
      items,
      onHoverStart: this._clearTimeouts.bind(this),
      position: this.getSubmenuPosition($rootItem)
    }));
    this._attachSubmenuHandlers($rootItem, subMenu);
    return subMenu;
  }
  _getSubmenuOptions() {
    const $submenuTarget = $('<div>');
    const isMenuHorizontal = this._isMenuHorizontal();
    const {
      itemTemplate,
      orientation,
      selectionMode,
      cssClass,
      selectByClick,
      hoverStateEnabled,
      activeStateEnabled,
      focusStateEnabled,
      animation,
      showSubmenuMode,
      displayExpr,
      disabledExpr,
      selectedExpr,
      itemsExpr
    } = this.option();
    return {
      itemTemplate,
      // @ts-expect-error ts-error
      target: $submenuTarget,
      orientation,
      selectionMode,
      cssClass,
      selectByClick,
      hoverStateEnabled,
      activeStateEnabled,
      focusStateEnabled,
      animation,
      showSubmenuMode,
      displayExpr,
      disabledExpr,
      selectedExpr,
      itemsExpr,
      onFocusedItemChanged: e => {
        const {
          visible,
          focusedElement
        } = e.component.option();
        if (!visible) {
          return;
        }
        this.option('focusedElement', focusedElement);
      },
      // @ts-expect-error ts-error
      onSelectionChanged: this._nestedItemOnSelectionChangedHandler.bind(this),
      // @ts-expect-error ts-error
      onItemClick: this._nestedItemOnItemClickHandler.bind(this),
      // @ts-expect-error ts-error
      onItemRendered: this._nestedItemOnItemRenderedHandler.bind(this),
      onLeftFirstItem: isMenuHorizontal ? null : this._moveMainMenuFocus.bind(this, PREV_ITEM_OPERATION),
      onLeftLastItem: isMenuHorizontal ? null : this._moveMainMenuFocus.bind(this, NEXT_ITEM_OPERATION),
      onCloseRootSubmenu: this._moveMainMenuFocus.bind(this, isMenuHorizontal ? PREV_ITEM_OPERATION : null),
      onExpandLastSubmenu: isMenuHorizontal ? this._moveMainMenuFocus.bind(this, NEXT_ITEM_OPERATION) : null
    };
  }
  _getShowFirstSubmenuMode() {
    if (!this._isDesktopDevice()) {
      return 'onClick';
    }
    const {
      showFirstSubmenuMode: optionValue
    } = this.option();
    return isObject(optionValue) ? optionValue.name : optionValue;
  }
  _moveMainMenuFocus(direction) {
    const $items = this._getAvailableItems();
    const itemCount = $items.length;
    const $currentItem = $items.filter(`.${DX_MENU_ITEM_EXPANDED_CLASS}`).eq(0);
    let itemIndex = $items.index($currentItem);
    this._hideSubmenu(this._visibleSubmenu);
    itemIndex += direction === PREV_ITEM_OPERATION ? -1 : 1;
    if (itemIndex >= itemCount) {
      itemIndex = 0;
    } else if (itemIndex < 0) {
      itemIndex = itemCount - 1;
    }
    const $newItem = $items.eq(itemIndex);
    this.option('focusedElement', getPublicElement($newItem));
  }
  _nestedItemOnSelectionChangedHandler(args) {
    const selectedItem = args.addedItems.length && args.addedItems[0];
    const submenu = Submenu.getInstance(args.element);
    const {
      onSelectionChanged
    } = this._actions;
    onSelectionChanged === null || onSelectionChanged === void 0 || onSelectionChanged(args);
    if (selectedItem) {
      this._clearSelectionInSubmenus(submenu);
    }
    this._clearRootSelection();
    this._setOptionWithoutOptionChange('selectedItem', selectedItem);
  }
  _clearSelectionInSubmenus(targetSubmenu) {
    const cleanAllSubmenus = !arguments.length;
    each(this._submenus, (_index, submenu) => {
      const $submenu = submenu._itemContainer();
      const isOtherItem = !$submenu.is(targetSubmenu === null || targetSubmenu === void 0 ? void 0 : targetSubmenu._itemContainer());
      const $selectedItem = $submenu.find(`.${this._selectedItemClass()}`);
      if (isOtherItem && $selectedItem.length || cleanAllSubmenus) {
        $selectedItem.removeClass(this._selectedItemClass());
        const selectedItemData = this._getItemData($selectedItem);
        if (selectedItemData) {
          selectedItemData.selected = false;
        }
        submenu._clearSelectedItems();
      }
    });
  }
  _clearRootSelection() {
    const $prevSelectedItem = this.$element().find(`.${DX_MENU_ITEMS_CONTAINER_CLASS}`).first().children().children().filter(`.${this._selectedItemClass()}`);
    if ($prevSelectedItem.length) {
      const prevSelectedItemData = this._getItemData($prevSelectedItem);
      prevSelectedItemData.selected = false;
      $prevSelectedItem.removeClass(this._selectedItemClass());
    }
  }
  _nestedItemOnItemClickHandler(e) {
    var _this$_actions$onItem, _this$_actions3;
    (_this$_actions$onItem = (_this$_actions3 = this._actions).onItemClick) === null || _this$_actions$onItem === void 0 || _this$_actions$onItem.call(_this$_actions3, e);
  }
  _nestedItemOnItemRenderedHandler(e) {
    var _this$_actions$onItem2, _this$_actions4;
    (_this$_actions$onItem2 = (_this$_actions4 = this._actions).onItemRendered) === null || _this$_actions$onItem2 === void 0 || _this$_actions$onItem2.call(_this$_actions4, e);
  }
  _attachSubmenuHandlers($menuAnchorItem, submenu) {
    const $submenuOverlayContent = submenu.getOverlayContent();
    const submenus = $submenuOverlayContent === null || $submenuOverlayContent === void 0 ? void 0 : $submenuOverlayContent.find(`.${DX_SUBMENU_CLASS}`);
    const submenuMouseLeaveName = addNamespace(hoverEventEnd, `${this.NAME}_submenu`);
    submenu.option({
      onShowing: this._submenuOnShowingHandler.bind(this, $menuAnchorItem, submenu),
      onShown: this._submenuOnShownHandler.bind(this, $menuAnchorItem, submenu),
      onHiding: this._submenuOnHidingHandler.bind(this, $menuAnchorItem, submenu),
      onHidden: this._submenuOnHiddenHandler.bind(this, $menuAnchorItem, submenu)
    });
    each(submenus, (_index, subMenu) => {
      eventsEngine.off(subMenu, submenuMouseLeaveName);
      eventsEngine.on(subMenu, submenuMouseLeaveName, null, this._submenuMouseLeaveHandler.bind(this, $menuAnchorItem));
    });
  }
  _submenuOnShowingHandler($menuAnchorItem, submenu, _ref) {
    var _this$_actions$onSubm3, _this$_actions5;
    let {
      rootItem
    } = _ref;
    const $border = $menuAnchorItem.children(`.${DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS}`);
    const params = this._getVisibilityChangeEventParams(rootItem, submenu, $menuAnchorItem);
    (_this$_actions$onSubm3 = (_this$_actions5 = this._actions).onSubmenuShowing) === null || _this$_actions$onSubm3 === void 0 || _this$_actions$onSubm3.call(_this$_actions5, params);
    $border.show();
    $menuAnchorItem.addClass(DX_MENU_ITEM_EXPANDED_CLASS);
  }
  _submenuOnShownHandler($menuAnchorItem, submenu, _ref2) {
    var _this$_actions$onSubm4, _this$_actions6;
    let {
      rootItem
    } = _ref2;
    const params = this._getVisibilityChangeEventParams(rootItem, submenu, $menuAnchorItem);
    (_this$_actions$onSubm4 = (_this$_actions6 = this._actions).onSubmenuShown) === null || _this$_actions$onSubm4 === void 0 || _this$_actions$onSubm4.call(_this$_actions6, params);
  }
  _submenuOnHidingHandler($menuAnchorItem, submenu, eventArgs) {
    var _this$_actions$onSubm5, _this$_actions7;
    const $border = $menuAnchorItem.children(`.${DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS}`);
    const params = this._getVisibilityChangeEventParams(eventArgs.rootItem, submenu, $menuAnchorItem, true);
    // @ts-expect-error ts-error
    // noinspection JSConstantReassignment
    eventArgs.itemData = params.itemData;
    // @ts-expect-error ts-error
    // noinspection JSConstantReassignment
    eventArgs.rootItem = params.rootItem;
    // @ts-expect-error ts-error
    // noinspection JSConstantReassignment
    eventArgs.submenuContainer = params.submenuContainer;
    // @ts-expect-error ts-error
    eventArgs.submenu = params.submenu;
    (_this$_actions$onSubm5 = (_this$_actions7 = this._actions).onSubmenuHiding) === null || _this$_actions$onSubm5 === void 0 || _this$_actions$onSubm5.call(_this$_actions7, eventArgs);
    const {
      focusedElement
    } = this.option();
    const {
      focusedElement: submenuFocusedElement
    } = submenu.option();
    const isVisibleSubmenuHiding = this._visibleSubmenu === submenu;
    const isFocusedElementHiding = focusedElement === submenuFocusedElement;
    if (isVisibleSubmenuHiding && isFocusedElementHiding) {
      this.option('focusedElement', $menuAnchorItem);
    }
    if (!eventArgs.cancel) {
      if (isVisibleSubmenuHiding) {
        this._visibleSubmenu = null;
      }
      $border.hide();
      $menuAnchorItem.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
    }
  }
  _submenuOnHiddenHandler($menuAnchorItem, submenu, _ref3) {
    var _this$_actions$onSubm6, _this$_actions8;
    let {
      rootItem
    } = _ref3;
    const params = this._getVisibilityChangeEventParams(rootItem, submenu, $menuAnchorItem, true);
    (_this$_actions$onSubm6 = (_this$_actions8 = this._actions).onSubmenuHidden) === null || _this$_actions$onSubm6 === void 0 || _this$_actions$onSubm6.call(_this$_actions8, params);
  }
  _getVisibilityChangeEventParams(submenuItem, submenu, $menuAnchorItem, isHide) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let itemData;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let $submenuContainer;
    if (submenuItem) {
      const anchor = isHide ? $(submenuItem).closest(`.${DX_MENU_ITEM_CLASS}`)[0] : submenuItem;
      itemData = this._getItemData(anchor);
      $submenuContainer = $(anchor).find(`.${DX_SUBMENU_CLASS}`).first();
    } else {
      var _submenu$_overlay;
      const $overlayContent = $((_submenu$_overlay = submenu._overlay) === null || _submenu$_overlay === void 0 ? void 0 : _submenu$_overlay.content());
      itemData = this._getItemData($menuAnchorItem);
      $submenuContainer = $overlayContent.find(`.${DX_SUBMENU_CLASS}`).first();
    }
    return {
      itemData,
      rootItem: getPublicElement($menuAnchorItem),
      submenuContainer: getPublicElement($submenuContainer),
      submenu
    };
  }
  _submenuMouseLeaveHandler($rootItem, eventArgs) {
    var _submenu$getOverlayCo;
    const target = $(eventArgs.relatedTarget).parents(`.${DX_CONTEXT_MENU_CLASS}`)[0];
    const submenu = this._getSubmenuByRootElement($rootItem);
    const contextMenu = submenu === null || submenu === void 0 || (_submenu$getOverlayCo = submenu.getOverlayContent()) === null || _submenu$getOverlayCo === void 0 ? void 0 : _submenu$getOverlayCo[0];
    const {
      hideSubmenuOnMouseLeave
    } = this.option();
    if (hideSubmenuOnMouseLeave && target !== contextMenu) {
      this._clearTimeouts();
      // eslint-disable-next-line no-restricted-globals
      setTimeout(this._hideSubmenuAfterTimeout.bind(this), this._getDelay('hide'));
    }
  }
  _hideSubmenuAfterTimeout() {
    var _this$_visibleSubmenu, _this$_visibleSubmenu2;
    if (!this._visibleSubmenu) {
      return;
    }
    // @ts-expect-error ts-error
    const isRootItemHovered = $(this._visibleSubmenu.$element().context).hasClass(DX_STATE_HOVER_CLASS);
    const isSubmenuItemHovered = (_this$_visibleSubmenu = this._visibleSubmenu.getOverlayContent()) === null || _this$_visibleSubmenu === void 0 ? void 0 : _this$_visibleSubmenu.find(`.${DX_STATE_HOVER_CLASS}`).length;
    const hoveredElementFromSubMenu = (_this$_visibleSubmenu2 = this._visibleSubmenu.getOverlayContent()) === null || _this$_visibleSubmenu2 === void 0 ? void 0 : _this$_visibleSubmenu2.get(0).querySelector(':hover');
    if (!hoveredElementFromSubMenu && !isSubmenuItemHovered && !isRootItemHovered) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._visibleSubmenu.hide();
    }
  }
  _getSubmenuByRootElement($rootItem) {
    if (!$rootItem) {
      return undefined;
    }
    const $submenu = $rootItem.children(`.${DX_CONTEXT_MENU_CLASS}`);
    if (!$submenu.length) {
      return undefined;
    }
    return Submenu.getInstance($submenu);
  }
  getSubmenuPosition($rootItem) {
    const {
      submenuDirection: submenuDirectionOption,
      rtlEnabled
    } = this.option();
    const isHorizontalMenu = this._isMenuHorizontal();
    const submenuDirection = submenuDirectionOption === null || submenuDirectionOption === void 0 ? void 0 : submenuDirectionOption.toLowerCase();
    const submenuPosition = {
      collision: 'flip',
      // @ts-expect-error ts-error
      of: $rootItem,
      precise: true
    };
    switch (submenuDirection) {
      case 'leftortop':
        submenuPosition.at = 'left top';
        submenuPosition.my = isHorizontalMenu ? 'left bottom' : 'right top';
        break;
      case 'rightorbottom':
        submenuPosition.at = isHorizontalMenu ? 'left bottom' : 'right top';
        submenuPosition.my = 'left top';
        break;
      default:
        if (isHorizontalMenu) {
          submenuPosition.at = rtlEnabled ? 'right bottom' : 'left bottom';
          submenuPosition.my = rtlEnabled ? 'right top' : 'left top';
        } else {
          submenuPosition.at = rtlEnabled ? 'left top' : 'right top';
          submenuPosition.my = rtlEnabled ? 'right top' : 'left top';
        }
        break;
    }
    return submenuPosition;
  }
  _renderBorderElement($item) {
    $('<div>').appendTo($item).addClass(DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS).hide();
  }
  _itemPointerHandler(e) {
    const $target = $(e.target);
    const $closestItem = $target.closest(this._itemElements());
    if ($closestItem.hasClass('dx-menu-item-has-submenu')) {
      this.option('focusedElement', null);
      return;
    }
    super._itemPointerHandler(e);
  }
  _hoverStartHandler(e) {
    const mouseMoveEventName = addNamespace(pointerEvents.move, this.NAME);
    const $item = this._getItemElementByEventArgs(e);
    if (!$item || this._isItemDisabled($item)) {
      return;
    }
    const node = this._dataAdapter.getNodeByItem(this._getItemData($item));
    const isSelectionActive = isDefined(e.buttons) && e.buttons === 1 || !isDefined(e.buttons) && e.which === 1;
    eventsEngine.off($item, mouseMoveEventName);
    if (!this._hasChildren(node)) {
      // eslint-disable-next-line no-restricted-globals
      this._showSubmenuTimer = setTimeout(this._hideSubmenuAfterTimeout.bind(this), this._getDelay('hide'));
      return;
    }
    if (this._getShowFirstSubmenuMode() === 'onHover' && !isSelectionActive) {
      const submenu = this._getSubmenuByElement($item);
      this._clearTimeouts();
      if (!(submenu !== null && submenu !== void 0 && submenu.isOverlayVisible())) {
        eventsEngine.on($item, mouseMoveEventName, this._itemMouseMoveHandler.bind(this));
        this._showSubmenuTimer = this._getDelay('hide');
      }
    }
  }
  _hoverEndHandler(eventArg) {
    const $item = this._getItemElementByEventArgs(eventArg);
    const relatedTarget = $(eventArg.relatedTarget);
    super._hoverEndHandler(eventArg);
    this._clearTimeouts();
    if (!$item || this._isItemDisabled($item)) {
      return;
    }
    if (relatedTarget.hasClass(DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS)) {
      return;
    }
    const {
      hideSubmenuOnMouseLeave
    } = this.option();
    if (hideSubmenuOnMouseLeave && !relatedTarget.hasClass(DX_MENU_ITEMS_CONTAINER_CLASS)) {
      // eslint-disable-next-line no-restricted-globals
      this._hideSubmenuTimer = setTimeout(() => {
        this._hideSubmenuAfterTimeout();
      }, this._getDelay('hide'));
    }
  }
  _hideVisibleSubmenu() {
    if (!this._visibleSubmenu) {
      return false;
    }
    this._hideSubmenu(this._visibleSubmenu);
    return true;
  }
  _showSubmenu($itemElement) {
    const submenu = this._getSubmenuByElement($itemElement);
    if (this._visibleSubmenu !== submenu) {
      this._hideVisibleSubmenu();
    }
    if (submenu) {
      this._clearTimeouts();
      this.focus();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      submenu.show();
      const {
        focusedElement
      } = submenu.option();
      this.option('focusedElement', focusedElement);
    }
    this._visibleSubmenu = submenu;
    this._hoveredRootItem = $itemElement;
  }
  _hideSubmenu(submenu) {
    if (submenu) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      submenu.hide();
    }
    if (this._visibleSubmenu === submenu) {
      this._visibleSubmenu = null;
    }
    this._hoveredRootItem = null;
  }
  _itemMouseMoveHandler(e) {
    var _e$pointers;
    // todo: replace mousemove with hover event
    // @ts-expect-error ts-error
    if ((_e$pointers = e.pointers) !== null && _e$pointers !== void 0 && _e$pointers.length) {
      return;
    }
    const $item = $(e.currentTarget);
    if (!isDefined(this._showSubmenuTimer)) {
      return;
    }
    this._clearTimeouts();
    // eslint-disable-next-line no-restricted-globals
    this._showSubmenuTimer = setTimeout(() => {
      const submenu = this._getSubmenuByElement($item);
      if (submenu && !submenu.isOverlayVisible()) {
        this._showSubmenu($item);
      }
    }, this._getDelay('show'));
  }
  _clearTimeouts() {
    clearTimeout(this._hideSubmenuTimer);
    clearTimeout(this._showSubmenuTimer);
  }
  _getSubmenuByElement($itemElement, itemData) {
    const submenu = this._getSubmenuByRootElement($itemElement);
    if (submenu) {
      return submenu;
    }
    // eslint-disable-next-line no-param-reassign
    itemData = itemData ?? this._getItemData($itemElement);
    const node = this._dataAdapter.getNodeByItem(itemData);
    if (node && this._hasChildren(node)) {
      return this._renderSubmenuItems(node, $itemElement);
    }
    return undefined;
  }
  _updateSubmenuVisibilityOnClick(actionArgs) {
    var _actionArgs$args;
    const args = (_actionArgs$args = actionArgs.args) === null || _actionArgs$args === void 0 ? void 0 : _actionArgs$args[0];
    // @ts-expect-error ts-error
    if (!args || this._disabledGetter(args.itemData)) {
      return;
    }
    const $itemElement = $(args.itemElement);
    const currentSubmenu = this._getSubmenuByElement($itemElement, args.itemData);
    this._updateSelectedItemOnClick(actionArgs);
    if (this._visibleSubmenu) {
      if (this._visibleSubmenu === currentSubmenu) {
        const {
          showFirstSubmenuMode
        } = this.option();
        if (showFirstSubmenuMode === 'onClick') {
          this._hideSubmenu(this._visibleSubmenu);
        }
        return;
      }
      this._hideSubmenu(this._visibleSubmenu);
    }
    if (!currentSubmenu) {
      return;
    }
    if (!currentSubmenu.isOverlayVisible()) {
      this._showSubmenu($itemElement);
    }
  }
  _optionChanged(args) {
    if (ACTIONS.includes(args.name)) {
      this._initActions();
      return;
    }
    switch (args.name) {
      case 'orientation':
      case 'submenuDirection':
        this._invalidate();
        break;
      case 'showFirstSubmenuMode':
      case 'hideSubmenuOnMouseLeave':
        break;
      case 'showSubmenuMode':
        this._changeSubmenusOption(args);
        break;
      case 'adaptivityEnabled':
        if (args.value) {
          this._initAdaptivity();
        } else {
          this._removeAdaptivity();
        }
        break;
      case 'width':
        if (this._isAdaptivityEnabled()) {
          var _this$_treeView3, _this$_overlay5;
          (_this$_treeView3 = this._treeView) === null || _this$_treeView3 === void 0 || _this$_treeView3.option(args.name, args.value);
          (_this$_overlay5 = this._overlay) === null || _this$_overlay5 === void 0 || _this$_overlay5.option(args.name, args.value);
        }
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case 'animation':
        if (this._isAdaptivityEnabled()) {
          var _this$_treeView4;
          (_this$_treeView4 = this._treeView) === null || _this$_treeView4 === void 0 || _this$_treeView4.option('animationEnabled', !!args.value);
        }
        super._optionChanged(args);
        break;
      default:
        if (this._isAdaptivityEnabled() && (args.name === args.fullName || args.name === 'items')) {
          var _this$_treeView5;
          (_this$_treeView5 = this._treeView) === null || _this$_treeView5 === void 0 || _this$_treeView5.option(args.fullName, args.value);
        }
        super._optionChanged(args);
    }
  }
  _changeSubmenusOption(_ref4) {
    let {
      name,
      value
    } = _ref4;
    each(this._submenus, (_index, submenu) => {
      submenu.option(name, value);
    });
  }
  selectItem(itemElement) {
    this._hideSubmenu(this._visibleSubmenu);
    super.selectItem(itemElement);
  }
  unselectItem(itemElement) {
    this._hideSubmenu(this._visibleSubmenu);
    super.unselectItem(itemElement);
  }
}
registerComponent('dxMenu', Menu);
export default Menu;