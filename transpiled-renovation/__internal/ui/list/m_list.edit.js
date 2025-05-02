"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _m_type = require("../../core/utils/m_type");
var _m_collection_widget = require("../../ui/collection/m_collection_widget.edit");
var _m_list = require("./m_list.base");
var _m_listEdit = _interopRequireDefault(require("./m_list.edit.provider"));
var _m_listEditStrategy = _interopRequireDefault(require("./m_list.edit.strategy.grouped"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';
const LIST_ITEM_RESPONSE_WAIT_CLASS = 'dx-list-item-response-wait';
class ListEdit extends _m_list.ListBase {
  _supportedKeys() {
    const that = this;
    const parent = super._supportedKeys();
    const deleteFocusedItem = e => {
      if (that.option('allowItemDeleting')) {
        e.preventDefault();
        that.deleteItem(that.option('focusedElement'));
      }
    };
    const moveFocusedItem = (e, moveUp) => {
      const editStrategy = this._editStrategy;
      const {
        focusedElement
      } = this.option();
      // @ts-expect-error ts-error
      const focusedItemIndex = editStrategy.getNormalizedIndex(focusedElement);
      const isLastIndexFocused = focusedItemIndex === this._getLastItemIndex();
      // @ts-expect-error ts-error
      if (isLastIndexFocused && this._dataController.isLoading()) {
        return;
      }
      if (e.shiftKey && that.option('itemDragging.allowReordering')) {
        const nextItemIndex = focusedItemIndex + (moveUp ? -1 : 1);
        const $nextItem = editStrategy.getItemElement(nextItemIndex);
        const isMoveFromGroup = this.option('grouped') && (0, _renderer.default)(focusedElement).parent().get(0) !== $nextItem.parent().get(0);
        if (!isMoveFromGroup) {
          this.reorderItem(focusedElement, $nextItem);
          this.scrollToItem(focusedElement);
        }
        e.preventDefault();
      } else {
        const editProvider = this._editProvider;
        const isInternalMoving = editProvider.handleKeyboardEvents(focusedItemIndex, moveUp);
        if (!isInternalMoving) {
          moveUp ? parent.upArrow(e) : parent.downArrow(e);
        }
      }
    };
    const enter = function (e) {
      if (!this._editProvider.handleEnterPressing(e)) {
        // @ts-expect-error ts-error
        parent.enter.apply(this, arguments);
      }
    };
    const space = function (e) {
      if (!this._editProvider.handleEnterPressing(e)) {
        // @ts-expect-error ts-error
        parent.space.apply(this, arguments);
      }
    };
    return _extends({}, parent, {
      del: deleteFocusedItem,
      upArrow: e => moveFocusedItem(e, true),
      downArrow: e => moveFocusedItem(e),
      enter,
      space
    });
  }
  _updateSelection() {
    this._editProvider.afterItemsRendered();
    super._updateSelection();
  }
  _getLastItemIndex() {
    return this._itemElements().length - 1;
  }
  _refreshItemElements() {
    super._refreshItemElements();
    const excludedSelectors = this._editProvider.getExcludedItemSelectors();
    if (excludedSelectors.length) {
      this._itemElementsCache = this._itemElementsCache.not(excludedSelectors);
    }
  }
  _isItemStrictEquals(item1, item2) {
    const privateKey = item1 === null || item1 === void 0 ? void 0 : item1.__dx_key__;
    if (privateKey && !this.key() && this._selection.isItemSelected(privateKey)) {
      return false;
    }
    return super._isItemStrictEquals(item1, item2);
  }
  _getDefaultOptions() {
    return (0, _extend.extend)(super._getDefaultOptions(), {
      showSelectionControls: false,
      selectionMode: 'none',
      selectAllMode: 'page',
      onSelectAllValueChanged: null,
      selectAllText: _message.default.format('dxList-selectAll'),
      menuItems: [],
      menuMode: 'context',
      allowItemDeleting: false,
      itemDeleteMode: 'static',
      itemDragging: {}
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: device => device.platform === 'ios',
      options: {
        menuMode: 'slide',
        itemDeleteMode: 'slideItem'
      }
    }, {
      device: {
        platform: 'android'
      },
      options: {
        itemDeleteMode: 'swipe'
      }
    }]);
  }
  _init() {
    super._init();
    this._initEditProvider();
  }
  _initDataSource() {
    // @ts-expect-error ts-error
    super._initDataSource();
    if (!this._isPageSelectAll()) {
      var _this$_dataSource;
      // @ts-expect-error ts-error
      (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 || _this$_dataSource.requireTotalCount(true);
    }
  }
  _isPageSelectAll() {
    const {
      selectAllMode
    } = this.option();
    return selectAllMode === 'page';
  }
  _initEditProvider() {
    // @ts-expect-error ts-error
    this._editProvider = new _m_listEdit.default(this);
  }
  _disposeEditProvider() {
    if (this._editProvider) {
      this._editProvider.dispose();
    }
  }
  _refreshEditProvider() {
    this._disposeEditProvider();
    this._initEditProvider();
  }
  _initEditStrategy() {
    if (this.option('grouped')) {
      // @ts-expect-error ts-error
      this._editStrategy = new _m_listEditStrategy.default(this);
    } else {
      super._initEditStrategy();
    }
  }
  _initMarkup() {
    this._refreshEditProvider();
    super._initMarkup();
  }
  _renderItems() {
    // @ts-expect-error ts-error
    super._renderItems(...arguments);
    this._editProvider.afterItemsRendered();
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const {
      showSelectionControls,
      selectionMode
    } = this.option();
    const $itemFrame = super._renderItem(index, itemData, $container, $itemToReplace);
    if (showSelectionControls && selectionMode !== 'none') {
      this._updateItemAriaLabel($itemFrame, itemData);
    }
    return $itemFrame;
  }
  _updateItemAriaLabel($itemFrame, itemData) {
    var _this$_displayGetter;
    // @ts-expect-error ts-error
    const label = ((_this$_displayGetter = this._displayGetter) === null || _this$_displayGetter === void 0 ? void 0 : _this$_displayGetter.call(this, itemData)) ?? (itemData === null || itemData === void 0 ? void 0 : itemData.text) ?? itemData;
    this.setAria('label', (0, _m_type.isObject)(label) ? _message.default.format('dxList-listAriaLabel-itemContent') : label, $itemFrame);
  }
  _selectedItemClass() {
    return LIST_ITEM_SELECTED_CLASS;
  }
  _itemResponseWaitClass() {
    return LIST_ITEM_RESPONSE_WAIT_CLASS;
  }
  _itemClickHandler(e) {
    const $itemElement = (0, _renderer.default)(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    const handledByEditProvider = this._editProvider.handleClick($itemElement, e);
    if (handledByEditProvider) {
      return;
    }
    this._saveSelectionChangeEvent(e);
    // @ts-expect-error ts-error
    super._itemClickHandler(...arguments);
  }
  _shouldFireContextMenuEvent() {
    // @ts-expect-error ts-error
    return super._shouldFireContextMenuEvent(...arguments) || this._editProvider.contextMenuHandlerExists();
  }
  _itemHoldHandler(e) {
    const $itemElement = (0, _renderer.default)(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    const handledByEditProvider = (0, _index.isTouchEvent)(e) && this._editProvider.handleContextMenu($itemElement, e);
    if (handledByEditProvider) {
      e.handledByEditProvider = true;
      return;
    }
    // @ts-expect-error ts-error
    super._itemHoldHandler(...arguments);
  }
  _getItemContainer(changeData) {
    if (this.option('grouped')) {
      var _this$_editStrategy$g;
      const groupIndex = (_this$_editStrategy$g = this._editStrategy.getIndexByItemData(changeData)) === null || _this$_editStrategy$g === void 0 ? void 0 : _this$_editStrategy$g.group;
      return this._getGroupContainerByIndex(groupIndex);
    }
    // @ts-expect-error ts-error
    return super._getItemContainer(changeData);
  }
  _itemContextMenuHandler(e) {
    const $itemElement = (0, _renderer.default)(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    const handledByEditProvider = !e.handledByEditProvider && this._editProvider.handleContextMenu($itemElement, e);
    if (handledByEditProvider) {
      e.preventDefault();
      return;
    }
    // @ts-expect-error ts-error
    super._itemContextMenuHandler(...arguments);
  }
  _postprocessRenderItem(args) {
    // @ts-expect-error ts-error
    super._postprocessRenderItem(...arguments);
    this._editProvider.modifyItemElement(args);
  }
  _clean() {
    this._disposeEditProvider();
    super._clean();
  }
  focusListItem(index) {
    const $item = this._editStrategy.getItemElement(index);
    this.option('focusedElement', $item);
    this.focus();
    this.scrollToItem(this.option('focusedElement'));
  }
  _getFlatIndex() {
    const {
      selectedIndex = _m_collection_widget.NOT_EXISTING_INDEX
    } = this.option();
    if ((0, _m_type.isNumeric)(selectedIndex) || !selectedIndex) {
      return selectedIndex;
    }
    const $item = this._editStrategy.getItemElement(selectedIndex);
    const index = this.getFlatIndexByItemElement($item);
    return index;
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'selectAllMode':
        this._initDataSource();
        // @ts-expect-error ts-error
        this._dataController.pageIndex(0);
        // @ts-expect-error ts-error
        this._dataController.load();
        break;
      case 'grouped':
        this._clearSelectedItems();
        delete this._renderingGroupIndex;
        this._initEditStrategy();
        super._optionChanged(args);
        break;
      case 'showSelectionControls':
      case 'menuItems':
      case 'menuMode':
      case 'allowItemDeleting':
      case 'itemDeleteMode':
      case 'itemDragging':
      case 'selectAllText':
        this._invalidate();
        break;
      case 'onSelectAllValueChanged':
        break;
      default:
        super._optionChanged(args);
    }
  }
  selectAll() {
    return this._selection.selectAll(this._isPageSelectAll());
  }
  unselectAll() {
    return this._selection.deselectAll(this._isPageSelectAll());
  }
  isSelectAll() {
    return this._selection.getSelectAllState(this._isPageSelectAll());
  }
  getFlatIndexByItemElement(itemElement) {
    return this._itemElements().index(itemElement);
  }
  getItemElementByFlatIndex(flatIndex) {
    const $itemElements = this._itemElements();
    if (flatIndex < 0 || flatIndex >= $itemElements.length) {
      return (0, _renderer.default)();
    }
    return $itemElements.eq(flatIndex);
  }
  getItemByIndex(index) {
    return this._editStrategy.getItemDataByIndex(index);
  }
  deleteItem(itemElement) {
    const editStrategy = this._editStrategy;
    const deletingElementIndex = editStrategy.getNormalizedIndex(itemElement);
    const {
      focusedElement,
      focusStateEnabled
    } = this.option();
    // @ts-expect-error ts-error
    const focusedItemIndex = focusedElement ? editStrategy.getNormalizedIndex(focusedElement) : deletingElementIndex;
    const isLastIndexFocused = focusedItemIndex === this._getLastItemIndex();
    const nextFocusedItem = isLastIndexFocused || deletingElementIndex < focusedItemIndex ? focusedItemIndex - 1 : focusedItemIndex;
    const promise = super.deleteItem(itemElement);
    return promise.done(function () {
      if (focusStateEnabled) {
        this.focusListItem(nextFocusedItem);
      }
    });
  }
}
var _default = exports.default = ListEdit;