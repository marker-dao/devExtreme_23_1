/**
* DevExtreme (cjs/__internal/ui/context_menu/menu_base.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _m_ink_ripple = require("../../core/utils/m_ink_ripple");
var _item = _interopRequireDefault(require("../../ui/collection/item"));
var _menu_baseEdit = _interopRequireDefault(require("../../ui/context_menu/menu_base.edit.strategy"));
var _hierarchical_collection_widget = _interopRequireDefault(require("../../ui/hierarchical_collection/hierarchical_collection_widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
const DX_MENU_CLASS = 'dx-menu';
const DX_MENU_NO_ICONS_CLASS = `${DX_MENU_CLASS}-no-icons`;
const DX_MENU_BASE_CLASS = 'dx-menu-base';
const ITEM_CLASS = `${DX_MENU_CLASS}-item`;
const DX_ITEM_CONTENT_CLASS = `${ITEM_CLASS}-content`;
const DX_MENU_SELECTED_ITEM_CLASS = `${ITEM_CLASS}-selected`;
const DX_MENU_ITEM_WRAPPER_CLASS = `${ITEM_CLASS}-wrapper`;
const DX_MENU_ITEMS_CONTAINER_CLASS = `${DX_MENU_CLASS}-items-container`;
const DX_MENU_ITEM_EXPANDED_CLASS = `${ITEM_CLASS}-expanded`;
const DX_MENU_SEPARATOR_CLASS = `${DX_MENU_CLASS}-separator`;
const DX_MENU_ITEM_LAST_GROUP_ITEM = `${DX_MENU_CLASS}-last-group-item`;
const DX_ITEM_HAS_TEXT = `${ITEM_CLASS}-has-text`;
const DX_ITEM_HAS_ICON = `${ITEM_CLASS}-has-icon`;
const DX_ITEM_HAS_SUBMENU = `${ITEM_CLASS}-has-submenu`;
const DX_MENU_ITEM_POPOUT_CLASS = `${ITEM_CLASS}-popout`;
const DX_MENU_ITEM_POPOUT_CONTAINER_CLASS = `${DX_MENU_ITEM_POPOUT_CLASS}-container`;
const DX_MENU_ITEM_CAPTION_CLASS = `${ITEM_CLASS}-text`;
const SINGLE_SELECTION_MODE = 'single';
const DEFAULT_DELAY = {
  show: 50,
  hide: 300
};
const DX_MENU_ITEM_CAPTION_URL_CLASS = `${DX_MENU_ITEM_CAPTION_CLASS}-with-url`;
const DX_ICON_WITH_URL_CLASS = 'dx-icon-with-url';
const ITEM_URL_CLASS = 'dx-item-url';
const DX_MENU_ITEM_DATA_KEY = 'dxMenuItemDataKey';
class MenuBase extends _hierarchical_collection_widget.default {
  _activeStateUnit() {
    return `.${ITEM_CLASS}`;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: [],
      cssClass: '',
      activeStateEnabled: true,
      showSubmenuMode: {
        name: 'onHover',
        delay: {
          show: 50,
          hide: 300
        }
      },
      animation: {
        show: {
          type: 'fade',
          from: 0,
          to: 1,
          duration: 100
        },
        hide: {
          type: 'fade',
          from: 1,
          to: 0,
          duration: 100
        }
      },
      selectByClick: false,
      focusOnSelectedItem: false,
      keyExpr: null,
      _itemAttributes: {
        role: 'menuitem'
      },
      useInkRipple: false
    });
  }
  _itemDataKey() {
    return DX_MENU_ITEM_DATA_KEY;
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _setAriaSelectionAttribute(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $itemElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isSelected) {}
  _selectedItemClass() {
    return DX_MENU_SELECTED_ITEM_CLASS;
  }
  _widgetClass() {
    return DX_MENU_BASE_CLASS;
  }
  _focusTarget() {
    return this._itemContainer();
  }
  _clean() {
    this.option('focusedElement', null);
    super._clean();
  }
  _supportedKeys() {
    const selectItem = () => {
      const {
        focusedElement
      } = this.option();
      const $item = (0, _renderer.default)(focusedElement);
      if (!$item.length || !this._isSelectionEnabled()) {
        return;
      }
      this.selectItem($item[0]);
    };
    return _extends({}, super._supportedKeys(), {
      space: selectItem,
      pageUp: _common.noop,
      pageDown: _common.noop
    });
  }
  _isSelectionEnabled() {
    const {
      selectionMode
    } = this.option();
    return selectionMode === SINGLE_SELECTION_MODE;
  }
  _init() {
    super._init();
    this._renderSelectedItem();
    this._initActions();
  }
  _getLinkContainer(iconContainer, textContainer, itemData) {
    const {
      linkAttr,
      url
    } = itemData;
    iconContainer === null || iconContainer === void 0 || iconContainer.addClass(DX_ICON_WITH_URL_CLASS);
    textContainer === null || textContainer === void 0 || textContainer.addClass(DX_MENU_ITEM_CAPTION_URL_CLASS);
    return super._getLinkContainer(iconContainer, textContainer, {
      linkAttr,
      url
    });
  }
  _addContent($container, itemData) {
    const {
      html,
      url
    } = itemData;
    if (url) {
      $container.html(html);
      const link = this._getLinkContainer(this._getIconContainer(itemData), this._getTextContainer(itemData), itemData);
      $container.append(link);
    } else {
      super._addContent($container, itemData);
    }
    $container.append(this._getPopoutContainer(itemData));
    this._addContentClasses(itemData, $container.parent());
  }
  _getTextContainer(itemData) {
    const {
      text
    } = itemData;
    if (!text) {
      return (0, _renderer.default)();
    }
    const $itemContainer = (0, _renderer.default)('<span>').addClass(DX_MENU_ITEM_CAPTION_CLASS);
    const itemText = (0, _type.isPlainObject)(itemData) ? text : String(itemData);
    return $itemContainer.text(itemText);
  }
  _getItemExtraPropNames() {
    return ['url', 'linkAttr'];
  }
  _getPopoutContainer(itemData) {
    const {
      items
    } = itemData;
    if (!(items !== null && items !== void 0 && items.length)) {
      return (0, _renderer.default)();
    }
    const $popOutImage = (0, _renderer.default)('<div>').addClass(DX_MENU_ITEM_POPOUT_CLASS);
    const $popOutContainer = (0, _renderer.default)('<span>').addClass(DX_MENU_ITEM_POPOUT_CONTAINER_CLASS);
    $popOutContainer.append($popOutImage);
    return $popOutContainer;
  }
  _getDataAdapterOptions() {
    return {
      rootValue: 0,
      multipleSelection: false,
      recursiveSelection: false,
      recursiveExpansion: false,
      searchValue: ''
    };
  }
  _selectByItem(selectedItem) {
    if (!selectedItem) {
      return;
    }
    const nodeToSelect = this._dataAdapter.getNodeByItem(selectedItem);
    if (nodeToSelect) {
      this._dataAdapter.toggleSelection(nodeToSelect.internalFields.key, true);
    }
  }
  _renderSelectedItem() {
    const selectedKeys = this._dataAdapter.getSelectedNodesKeys();
    const selectedKey = selectedKeys.length && selectedKeys[0];
    const selectedItem = this.option('selectedItem');
    if (!selectedKey) {
      this._selectByItem(selectedItem);
      return;
    }
    const node = this._dataAdapter.getNodeByKey(selectedKey);
    if (!node || node.selectable === false) {
      return;
    }
    if (!selectedItem) {
      this.option('selectedItem', node.internalFields.item);
      return;
    }
    if (selectedItem !== node.internalFields.item) {
      this._dataAdapter.toggleSelection(selectedKey, false);
      this._selectByItem(selectedItem);
    }
  }
  _initActions() {}
  _initMarkup() {
    super._initMarkup();
    const {
      useInkRipple
    } = this.option();
    if (useInkRipple) {
      this._renderInkRipple();
    }
  }
  _renderInkRipple() {
    this._inkRipple = (0, _m_ink_ripple.render)();
  }
  _toggleActiveState($element, value, event) {
    super._toggleActiveState($element, value);
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: $element,
      event
    };
    if (value) {
      this._inkRipple.showWave(config);
    } else {
      this._inkRipple.hideWave(config);
    }
  }
  _getShowSubmenuMode() {
    const defaultValue = 'onClick';
    const {
      showSubmenuMode
    } = this.option();
    const showMode = (0, _type.isObject)(showSubmenuMode) ? showSubmenuMode.name : showSubmenuMode;
    return this._isDesktopDevice() ? showMode : defaultValue;
  }
  _isDesktopDevice() {
    return _devices.default.real().deviceType === 'desktop';
  }
  _initEditStrategy() {
    this._editStrategy = new _menu_baseEdit.default(this);
  }
  _addCustomCssClass($element) {
    const {
      cssClass
    } = this.option();
    if (cssClass) {
      $element.addClass(cssClass);
    }
  }
  _hoverStartHandler(e) {
    const $itemElement = this._getItemElementByEventArgs(e);
    if (!$itemElement || this._isItemDisabled($itemElement)) return;
    e.stopPropagation();
    if (this._getShowSubmenuMode() === 'onHover') {
      const submenuDelay = this._getSubmenuDelay();
      if (submenuDelay === 0) {
        this._showSubmenu($itemElement);
      } else {
        clearTimeout(this._showSubmenusTimeout);
        // eslint-disable-next-line no-restricted-globals
        this._showSubmenusTimeout = setTimeout(this._showSubmenu.bind(this, $itemElement), submenuDelay);
      }
    }
  }
  _getAvailableItems($itemElements) {
    return super._getAvailableItems($itemElements).filter(
    // @ts-expect-error ts-error
    (_index, item) => (0, _renderer.default)(item).css('visibility') !== 'hidden');
  }
  _isItemDisabled($item) {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._disabledGetter($item.data(this._itemDataKey()));
  }
  _showSubmenu($itemElement) {
    this._addExpandedClass($itemElement);
  }
  _addExpandedClass(itemElement) {
    (0, _renderer.default)(itemElement).addClass(DX_MENU_ITEM_EXPANDED_CLASS);
  }
  _getSubmenuDelay() {
    const {
      showSubmenuMode
    } = this.option();
    const delay = (0, _type.isObject)(showSubmenuMode) ? showSubmenuMode.delay : undefined;
    if (!(0, _type.isDefined)(delay)) {
      return DEFAULT_DELAY.show;
    }
    if ((0, _type.isObject)(delay)) {
      return delay.show ?? DEFAULT_DELAY.show;
    }
    return delay;
  }
  _getItemElementByEventArgs(eventArgs) {
    let $target = (0, _renderer.default)(eventArgs.target);
    if ($target.hasClass(this._itemClass()) || $target.get(0) === eventArgs.currentTarget) {
      return $target;
    }
    // TODO: move it to inheritors, menuBase don't know about dx-submenu
    while (!$target.hasClass(this._itemClass())) {
      $target = $target.parent();
      if ($target.hasClass('dx-submenu')) {
        return null;
      }
    }
    return $target;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _hoverEndHandler(event) {
    clearTimeout(this._showSubmenusTimeout);
  }
  _hasSubmenu(node) {
    return !!(node !== null && node !== void 0 && node.internalFields.childrenKeys.length);
  }
  _renderContentImpl() {
    this._renderItems(this._dataAdapter.getRootNodes());
  }
  _renderItems(nodes, $submenuContainer) {
    if (!nodes.length) {
      return;
    }
    this.hasIcons = false;
    const $nodeContainer = this._renderContainer(this.$element(), $submenuContainer === null || $submenuContainer === void 0 ? void 0 : $submenuContainer[0]);
    let firstVisibleIndex = -1;
    let nextGroupFirstIndex = -1;
    (0, _iterator.each)(nodes, (index, node) => {
      const isVisibleNode = node.visible !== false;
      if (isVisibleNode && firstVisibleIndex < 0) {
        firstVisibleIndex = index;
      }
      const isBeginGroup = firstVisibleIndex < index
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      && (node.beginGroup || index === nextGroupFirstIndex);
      if (isBeginGroup) {
        nextGroupFirstIndex = isVisibleNode ? index : index + 1;
      }
      if (index === nextGroupFirstIndex && firstVisibleIndex < index) {
        this._renderSeparator($nodeContainer);
      }
      this._renderItem(index, node, $nodeContainer);
    });
    if (!this.hasIcons) $nodeContainer.addClass(DX_MENU_NO_ICONS_CLASS);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderContainer($wrapper, submenuContainer) {
    const $container = (0, _renderer.default)('<ul>');
    this.setAria('role', 'none', $container);
    return $container.appendTo($wrapper).addClass(DX_MENU_ITEMS_CONTAINER_CLASS);
  }
  _createDOMElement($nodeContainer) {
    const $node = (0, _renderer.default)('<li>');
    this.setAria('role', 'none', $node);
    return $node.appendTo($nodeContainer).addClass(DX_MENU_ITEM_WRAPPER_CLASS);
  }
  _renderItem(index, node, $nodeContainer, $nodeElement) {
    var _items;
    const {
      items = []
    } = this.option();
    const $node = $nodeElement ?? this._createDOMElement($nodeContainer);
    if ((_items = items[index + 1]) !== null && _items !== void 0 && _items.beginGroup) {
      $node.addClass(DX_MENU_ITEM_LAST_GROUP_ITEM);
    }
    const $itemFrame = super._renderItem(index, node.internalFields.item, $node);
    if (node.internalFields.item === this.option('selectedItem')) {
      $itemFrame.addClass(DX_MENU_SELECTED_ITEM_CLASS);
    }
    $itemFrame.attr('tabIndex', -1);
    if (this._hasSubmenu(node)) this.setAria('haspopup', 'true', $itemFrame);
    return $itemFrame;
  }
  _renderItemFrame(index, itemData, $itemContainer) {
    const $itemFrame = $itemContainer.children(`.${ITEM_CLASS}`);
    return $itemFrame.length ? $itemFrame : super._renderItemFrame(index, itemData, $itemContainer);
  }
  _refreshItem($item, item) {
    const node = this._dataAdapter.getNodeByItem(item);
    if (!node) {
      return;
    }
    // @ts-expect-error ts-error
    const index = $item.data(this._itemIndexKey());
    const $nodeContainer = $item.closest('ul');
    const $nodeElement = $item.closest('li');
    this._renderItem(index, node, $nodeContainer, $nodeElement);
  }
  _addContentClasses(itemData, $itemFrame) {
    const hasText = itemData.text ? !!itemData.text.length : false;
    const hasIcon = !!itemData.icon;
    const hasSubmenu = itemData.items ? !!itemData.items.length : false;
    $itemFrame.toggleClass(DX_ITEM_HAS_TEXT, hasText);
    $itemFrame.toggleClass(DX_ITEM_HAS_ICON, hasIcon);
    if (!this.hasIcons) {
      this.hasIcons = hasIcon;
    }
    $itemFrame.toggleClass(DX_ITEM_HAS_SUBMENU, hasSubmenu);
  }
  _getItemContent($itemFrame) {
    let $itemContent = super._getItemContent($itemFrame);
    if (!$itemContent.length) {
      $itemContent = $itemFrame.children(`.${DX_ITEM_CONTENT_CLASS}`);
    }
    return $itemContent;
  }
  _postprocessRenderItem(args) {
    const $itemElement = (0, _renderer.default)(args.itemElement);
    const selectedIndex = this._dataAdapter.getSelectedNodesKeys();
    if (!selectedIndex.length
    // @ts-expect-error ts-error
    || !this._selectedGetter(args.itemData) || !this._isItemSelectable(args.itemData)) {
      this._setAriaSelectionAttribute($itemElement, 'false');
      return;
    }
    const node = this._dataAdapter.getNodeByItem(args.itemData);
    if (node && node.internalFields.key === selectedIndex[0]) {
      $itemElement.addClass(this._selectedItemClass());
      this._setAriaSelectionAttribute($itemElement, 'true');
    } else {
      this._setAriaSelectionAttribute($itemElement, 'false');
    }
  }
  _isItemSelectable(item) {
    return item.selectable !== false;
  }
  _renderSeparator($itemsContainer) {
    (0, _renderer.default)('<li>').appendTo($itemsContainer).addClass(DX_MENU_SEPARATOR_CLASS);
  }
  _itemClickHandler(e) {
    if (e._skipHandling) return;
    const itemClickActionHandler = this._createAction(this._updateSubmenuVisibilityOnClick.bind(this));
    this._itemDXEventHandler(e, 'onItemClick', {}, {
      // @ts-expect-error ts-error
      beforeExecute: this._itemClick,
      afterExecute: itemClickActionHandler.bind(this)
    });
    e._skipHandling = true;
  }
  _isUrlItem(item) {
    return !!item && 'url' in item && !!item.url;
  }
  _itemClick(actionArgs) {
    var _actionArgs$args;
    const {
      event,
      itemData
    } = ((_actionArgs$args = actionArgs.args) === null || _actionArgs$args === void 0 ? void 0 : _actionArgs$args[0]) ?? {};
    if (!event) {
      return;
    }
    const $itemElement = this._getItemElementByEventArgs(event);
    const link = $itemElement === null || $itemElement === void 0 ? void 0 : $itemElement.find(`.${ITEM_URL_CLASS}`)[0];
    if (!this._isUrlItem(itemData) || !link) {
      return;
    }
    const isNativeLinkClick = (0, _renderer.default)(event.target).closest(`.${ITEM_URL_CLASS}`).length;
    if (isNativeLinkClick) {
      return;
    }
    this._clickByLink(link);
  }
  _updateSubmenuVisibilityOnClick(actionArgs) {
    this._updateSelectedItemOnClick(actionArgs);
    if (this._getShowSubmenuMode() === 'onClick') {
      var _actionArgs$args2;
      const itemElement = (_actionArgs$args2 = actionArgs.args) === null || _actionArgs$args2 === void 0 ? void 0 : _actionArgs$args2[0].itemElement;
      if (itemElement) {
        this._addExpandedClass(itemElement);
      }
    }
  }
  _updateSelectedItemOnClick(actionArgs) {
    const args = actionArgs.args ? actionArgs.args[0] : actionArgs;
    const {
      itemData
    } = args;
    if (!itemData || !this._isItemSelectAllowed(itemData)) {
      return;
    }
    const selectedItemKey = this._dataAdapter.getSelectedNodesKeys();
    const selectedNode = selectedItemKey.length && this._dataAdapter.getNodeByKey(selectedItemKey[0]);
    if (selectedNode) {
      this._toggleItemSelection(selectedNode, false);
    }
    if (!selectedNode || selectedNode.internalFields.item !== itemData) {
      this.selectItem(itemData);
    } else {
      this._fireSelectionChangeEvent(null, this.option('selectedItem'));
      this._setOptionWithoutOptionChange('selectedItem', null);
    }
  }
  _isItemSelectAllowed(item) {
    const {
      selectByClick
    } = this.option();
    const isSelectByClickEnabled = this._isSelectionEnabled() && selectByClick;
    return !this._isContainerEmpty() && isSelectByClickEnabled && this._isItemSelectable(item)
    // @ts-expect-error ts-error
    && !this._itemsGetter(item);
  }
  _isContainerEmpty() {
    return this._itemContainer().is(':empty');
  }
  _syncSelectionOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _common.asyncNoop)();
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'showSubmenuMode':
        break;
      case 'selectedItem':
        {
          const node = args.value ? this._dataAdapter.getNodeByItem(args.value) : null;
          const selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
          if (node && node.internalFields.key !== selectedKey) {
            // @ts-expect-error ts-error
            if (node.selectable === false) break;
            const selectedNode = this._dataAdapter.getNodeByKey(selectedKey);
            if (selectedKey && selectedNode) {
              this._toggleItemSelection(selectedNode, false);
            }
            this._toggleItemSelection(node, true);
          }
          break;
        }
      case 'cssClass':
      case 'position':
      case 'selectByClick':
      case 'animation':
      case 'useInkRipple':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _toggleItemSelection(node, value) {
    const itemElement = this._getElementByItem(node.internalFields.item);
    if (itemElement) {
      (0, _renderer.default)(itemElement).toggleClass(DX_MENU_SELECTED_ITEM_CLASS);
    }
    this._dataAdapter.toggleSelection(node.internalFields.key, value);
  }
  _getElementByItem(itemData) {
    let result = (0, _renderer.default)();
    (0, _iterator.each)(this._itemElements(), (_index, $itemElement) => {
      // @ts-expect-error ts-error
      if ((0, _renderer.default)($itemElement).data(this._itemDataKey()) !== itemData) {
        return true;
      }
      result = $itemElement;
      return false;
    });
    return result;
  }
  _updateSelectedItems() {}
  _updateSelectedItem(addedItem, removedItem) {
    if (addedItem || removedItem) {
      this._fireSelectionChangeEvent(addedItem, removedItem);
    }
  }
  _fireSelectionChangeEvent(addedItem, removedItem) {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })({
      addedItems: [addedItem],
      removedItems: [removedItem]
    });
  }
  selectItem(itemElement) {
    const isElement = item => typeof item === 'object' && 'nodeType' in item && !!item.nodeType;
    const itemData = isElement(itemElement) ? this._getItemData(itemElement) : itemElement;
    const selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
    const selectedItem = this.option('selectedItem');
    const node = this._dataAdapter.getNodeByItem(itemData);
    if (node && node.internalFields.key !== selectedKey) {
      const selectedNode = this._dataAdapter.getNodeByKey(selectedKey);
      if (selectedKey && selectedNode) {
        this._toggleItemSelection(selectedNode, false);
      }
      this._toggleItemSelection(node, true);
      this._updateSelectedItem(itemData, selectedItem);
      this._setOptionWithoutOptionChange('selectedItem', itemData);
    }
  }
  unselectItem(itemElement) {
    const itemData = itemElement.nodeType ? this._getItemData(itemElement) : itemElement;
    const node = this._dataAdapter.getNodeByItem(itemData);
    const selectedItem = this.option('selectedItem');
    if (node !== null && node !== void 0 && node.internalFields.selected) {
      this._toggleItemSelection(node, false);
      this._updateSelectedItem(null, selectedItem);
      this._setOptionWithoutOptionChange('selectedItem', null);
    }
  }
}
MenuBase.ItemClass = _item.default;
var _default = exports.default = MenuBase;
