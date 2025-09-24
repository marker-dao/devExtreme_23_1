import _extends from "@babel/runtime/helpers/esm/extends";
import { isTouchEvent } from '../../../common/core/events/utils';
import localizationMessage from '../../../common/core/localization/message';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { isNumeric, isObject } from '../../core/utils/m_type';
import { NOT_EXISTING_INDEX } from '../../ui/collection/collection_widget.edit';
import { PRIVATE_KEY_FIELD } from '../../ui/collection/collection_widget.live_update';
import { ListBase } from '../../ui/list/list.base';
import EditProvider from '../../ui/list/list.edit.provider';
import GroupedEditStrategy from '../../ui/list/list.edit.strategy.grouped';
const LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';
const LIST_ITEM_RESPONSE_WAIT_CLASS = 'dx-list-item-response-wait';
class ListEdit extends ListBase {
  _supportedKeys() {
    const parent = super._supportedKeys();
    const deleteFocusedItem = e => {
      const {
        allowItemDeleting,
        focusedElement
      } = this.option();
      if (allowItemDeleting && focusedElement) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.deleteItem(focusedElement);
      }
    };
    const moveFocusedItem = (e, moveUp) => {
      const {
        focusedElement,
        itemDragging,
        grouped
      } = this.option();
      const editStrategy = this._editStrategy;
      // @ts-expect-error ts-error
      const focusedItemIndex = editStrategy.getNormalizedIndex(focusedElement);
      const isLastIndexFocused = focusedItemIndex === this._getLastItemIndex();
      if (isLastIndexFocused && this._dataController.isLoading()) {
        return;
      }
      if (e.shiftKey && itemDragging !== null && itemDragging !== void 0 && itemDragging.allowReordering) {
        const nextItemIndex = focusedItemIndex + (moveUp ? -1 : 1);
        const $nextItem = editStrategy.getItemElement(nextItemIndex);
        const isMoveFromGroup = grouped && $(focusedElement).parent().get(0) !== $nextItem.parent().get(0);
        if (!isMoveFromGroup) {
          this.reorderItem($(focusedElement).get(0), $nextItem.get(0));
          this.scrollToItem($(focusedElement));
        }
        e.preventDefault();
      } else {
        const editProvider = this._editProvider;
        const isInternalMoving = editProvider.handleKeyboardEvents(focusedItemIndex, moveUp);
        if (!isInternalMoving) {
          if (moveUp) {
            parent.upArrow(e);
          } else {
            parent.downArrow(e);
          }
        }
      }
    };
    const enter = e => {
      if (!this._editProvider.handleEnterPressing(e)) {
        parent.enter.apply(this, [e]);
      }
    };
    const space = e => {
      if (!this._editProvider.handleEnterPressing(e)) {
        parent.space.apply(this, [e]);
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
    const privateKey = item1 === null || item1 === void 0 ? void 0 : item1[PRIVATE_KEY_FIELD];
    if (privateKey && !this.key() && this._selection.isItemSelected(privateKey)) {
      return false;
    }
    return super._isItemStrictEquals(item1, item2);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      showSelectionControls: false,
      selectionMode: 'none',
      selectAllMode: 'page',
      // @ts-expect-error ts-error
      onSelectAllValueChanged: null,
      selectAllText: localizationMessage.format('dxList-selectAll'),
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
    this._editProvider = new EditProvider(this);
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
    const {
      grouped
    } = this.option();
    if (grouped) {
      this._editStrategy = new GroupedEditStrategy(this);
    } else {
      super._initEditStrategy();
    }
  }
  _initMarkup() {
    this._refreshEditProvider();
    super._initMarkup();
  }
  _renderItems(items) {
    super._renderItems(items);
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
    const label = ((_this$_displayGetter = this._displayGetter) === null || _this$_displayGetter === void 0 ? void 0 : _this$_displayGetter.call(this, itemData)) ?? (itemData === null || itemData === void 0 ? void 0 : itemData.text) ?? itemData;
    this.setAria('label', isObject(label) ? localizationMessage.format('dxList-listAriaLabel-itemContent') : label, $itemFrame);
  }
  _selectedItemClass() {
    return LIST_ITEM_SELECTED_CLASS;
  }
  _itemResponseWaitClass() {
    return LIST_ITEM_RESPONSE_WAIT_CLASS;
  }
  _itemClickHandler(e, args, config) {
    const $itemElement = $(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    const handledByEditProvider = this._editProvider.handleClick($itemElement, e);
    if (handledByEditProvider) {
      return;
    }
    this._saveSelectionChangeEvent(e);
    super._itemClickHandler(e, args, config);
  }
  _shouldFireContextMenuEvent() {
    return super._shouldFireContextMenuEvent() || this._editProvider.contextMenuHandlerExists();
  }
  _itemHoldHandler(e) {
    const $itemElement = $(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    const handledByEditProvider = isTouchEvent(e) && this._editProvider.handleContextMenu($itemElement, e);
    if (handledByEditProvider) {
      e.handledByEditProvider = true;
      return;
    }
    super._itemHoldHandler(e);
  }
  _itemContextMenuHandler(e) {
    const $itemElement = $(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    const handledByEditProvider = !e.handledByEditProvider && this._editProvider.handleContextMenu($itemElement, e);
    if (handledByEditProvider) {
      e.preventDefault();
      return;
    }
    super._itemContextMenuHandler(e);
  }
  _postprocessRenderItem(args) {
    super._postprocessRenderItem(args);
    this._editProvider.modifyItemElement(args);
  }
  _clean() {
    this._disposeEditProvider();
    super._clean();
  }
  focusListItem(index) {
    const $item = this._editStrategy.getItemElement(index);
    this.option('focusedElement', getPublicElement($item));
    this.focus();
    this.scrollToItem($item);
  }
  _getFlatIndex() {
    const {
      selectedIndex = NOT_EXISTING_INDEX
    } = this.option();
    if (isNumeric(selectedIndex) || !selectedIndex) {
      return selectedIndex;
    }
    const $item = this._editStrategy.getItemElement(selectedIndex);
    return this.getFlatIndexByItemElement($item);
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'selectAllMode':
        this._initDataSource();
        this._dataController.pageIndex(0);
        this._dataController.load();
        break;
      case 'grouped':
        this._clearSelectedItems();
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
      return $();
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
    const focusedItemIndex = focusedElement ? editStrategy.getNormalizedIndex(focusedElement) : deletingElementIndex;
    const isLastIndexFocused = focusedItemIndex === this._getLastItemIndex();
    const nextFocusedItem = isLastIndexFocused || deletingElementIndex < focusedItemIndex ? focusedItemIndex - 1 : focusedItemIndex;
    const promise = super.deleteItem(itemElement);
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return promise.done(() => {
      if (focusStateEnabled) {
        this.focusListItem(nextFocusedItem);
      }
    });
  }
}
export default ListEdit;