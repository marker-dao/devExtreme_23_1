/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.items_list.thumbnails.list_box.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _hold = _interopRequireDefault(require("../../common/core/events/hold"));
var _index = require("../../common/core/events/utils/index");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _bindable_template = require("../../core/templates/bindable_template");
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _uiCollection_widget = _interopRequireDefault(require("../collection/ui.collection_widget.edit"));
var _m_selection = _interopRequireDefault(require("../../__internal/ui/selection/m_selection"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS = 'dx-filemanager-thumbnails-view-port';
const FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS = 'dx-filemanager-thumbnails-container';
const FILE_MANAGER_THUMBNAILS_ITEM_CLASS = 'dx-filemanager-thumbnails-item';
const FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS = 'dx-filemanager-thumbnails-item-name';
const FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS = 'dx-filemanager-thumbnails-item-spacer';
const FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY = 'dxFileManagerItemData';
const FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE = 'dxFileManagerThumbnailsListBox';
const FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME = (0, _index.addNamespace)(_hold.default.name, FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE);
class FileManagerThumbnailListBox extends _uiCollection_widget.default {
  _initMarkup() {
    this._initActions();
    this._lockFocusedItemProcessing = false;
    this.$element().addClass(FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS);
    this._renderScrollView();
    this._renderItemsContainer();
    this._createScrollViewControl();
    super._initMarkup();
    this.onFocusedItemChanged = this._onFocusedItemChanged.bind(this);
    this._layoutUtils = new ListBoxLayoutUtils(this._scrollView, this.$element(), this._$itemContainer, this.itemElements().first());
    this._syncFocusedItemKey();
  }
  _initActions() {
    this._actions = {
      onItemEnterKeyPressed: this._createActionByOption('onItemEnterKeyPressed'),
      onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged')
    };
  }
  _initTemplates() {
    super._initTemplates();
    this._itemThumbnailTemplate = this.option('itemThumbnailTemplate');
    this._getTooltipText = this.option('getTooltipText');
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(function ($container, data, itemModel) {
        const $itemElement = this._getDefaultItemTemplate(itemModel, $container);
        $container.append($itemElement);
      }.bind(this), ['fileItem'], this.option('integrationOptions.watchMethod'))
    });
  }
  _createScrollViewControl() {
    if (!this._scrollView) {
      this._scrollView = this._createComponent(this._$scrollView, _scroll_view.default, {
        scrollByContent: true,
        scrollByThumb: true,
        useKeyboard: false,
        showScrollbar: 'onHover'
      });
    }
  }
  _renderScrollView() {
    if (!this._$scrollView) {
      this._$scrollView = (0, _renderer.default)('<div>').appendTo(this.$element());
    }
  }
  getScrollable() {
    return this._scrollView;
  }
  _renderItemsContainer() {
    if (!this._$itemContainer) {
      this._$itemContainer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS).appendTo(this._$scrollView);
    }
  }
  _render() {
    super._render();
    this._detachEventHandlers();
    this._attachEventHandlers();
  }
  _clean() {
    this._detachEventHandlers();
    super._clean();
  }
  _supportedKeys() {
    return (0, _extend.extend)(super._supportedKeys(), {
      upArrow(e) {
        this._beforeKeyProcessing(e);
        this._processArrowKeys(-1, false, e);
      },
      downArrow(e) {
        this._beforeKeyProcessing(e);
        this._processArrowKeys(1, false, e);
      },
      home(e) {
        this._beforeKeyProcessing(e);
        this._processHomeEndKeys(0, true, e);
      },
      end(e) {
        this._beforeKeyProcessing(e);
        this._processHomeEndKeys(this._getItemsLength() - 1, true, e);
      },
      pageUp(e) {
        this._beforeKeyProcessing(e);
        this._processPageChange(true, e);
      },
      pageDown(e) {
        this._beforeKeyProcessing(e);
        this._processPageChange(false, e);
      },
      enter(e) {
        this._beforeKeyProcessing(e);
        this._actions.onItemEnterKeyPressed(this._getFocusedItem());
      },
      A(e) {
        this._beforeKeyProcessing(e);
        if ((0, _index.isCommandKeyPressed)(e)) {
          this.selectAll();
        }
      }
    });
  }
  _beforeKeyProcessing(e) {
    e.preventDefault();
    this._layoutUtils.reset();
  }
  _processArrowKeys(offset, horizontal, eventArgs) {
    const item = this._getFocusedItem();
    if (item) {
      if (!horizontal) {
        const layout = this._layoutUtils.getLayoutModel();
        if (!layout) {
          return;
        }
        offset *= layout.itemPerRowCount;
      }
      const newItemIndex = this._getIndexByItem(item) + offset;
      this._focusItemByIndex(newItemIndex, true, eventArgs);
    }
  }
  _processHomeEndKeys(index, scrollToItem, eventArgs) {
    this._focusItemByIndex(index, scrollToItem, eventArgs);
  }
  _processPageChange(pageUp, eventArgs) {
    const item = this._getFocusedItem();
    if (!item) {
      return;
    }
    const layout = this._layoutUtils.getLayoutModel();
    if (!layout) {
      return;
    }
    const itemLayout = this._layoutUtils.createItemLayoutModel(this._getIndexByItem(item));
    const rowOffset = pageUp ? layout.rowPerPageRate : -layout.rowPerPageRate;
    const newRowRate = itemLayout.itemRowIndex - rowOffset;
    const roundFunc = pageUp ? Math.ceil : Math.floor;
    const newRowIndex = roundFunc(newRowRate);
    let newItemIndex = newRowIndex * layout.itemPerRowCount + itemLayout.itemColumnIndex;
    if (newItemIndex < 0) {
      newItemIndex = 0;
    } else if (newItemIndex >= this._getItemsLength()) {
      newItemIndex = this._getItemsLength() - 1;
    }
    this._focusItemByIndex(newItemIndex, true, eventArgs);
  }
  _processLongTap(e) {
    const $targetItem = this._closestItemElement((0, _renderer.default)(e.target));
    const itemIndex = this._getIndexByItemElement($targetItem);
    this._selection.changeItemSelection(itemIndex, {
      control: true
    });
  }
  _attachEventHandlers() {
    if (this.option('selectionMode') === 'multiple') {
      _events_engine.default.on(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME, `.${this._itemContentClass()}`, e => {
        this._processLongTap(e);
        e.stopPropagation();
      });
    }
    _events_engine.default.on(this._itemContainer(), 'mousedown selectstart', e => {
      if (e.shiftKey) {
        e.preventDefault();
      }
    });
  }
  _detachEventHandlers() {
    _events_engine.default.off(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME);
    _events_engine.default.off(this._itemContainer(), 'mousedown selectstart');
  }
  _itemContainer() {
    return this._$itemContainer;
  }
  _itemClass() {
    return FILE_MANAGER_THUMBNAILS_ITEM_CLASS;
  }
  _itemDataKey() {
    return FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY;
  }
  _getDefaultItemTemplate(fileItemInfo, $itemElement) {
    $itemElement.attr('title', this._getTooltipText(fileItemInfo));
    const $itemThumbnail = this._itemThumbnailTemplate(fileItemInfo);
    const $itemSpacer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS);
    const $itemName = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS).text(fileItemInfo.fileItem.name);
    $itemElement.append($itemThumbnail, $itemSpacer, $itemName);
  }
  _itemSelectHandler(e) {
    let options = {};
    if (this.option('selectionMode') === 'multiple') {
      if (!this._isPreserveSelectionMode) {
        this._isPreserveSelectionMode = (0, _index.isCommandKeyPressed)(e) || e.shiftKey;
      }
      options = {
        control: this._isPreserveSelectionMode,
        shift: e.shiftKey
      };
    }
    const index = this._getIndexByItemElement(e.currentTarget);
    this._selection.changeItemSelection(index, options);
  }
  _initSelectionModule() {
    super._initSelectionModule();
    const options = (0, _extend.extend)(this._selection.options, {
      selectedKeys: this.option('selectedItemKeys'),
      onSelectionChanged: args => {
        this.option('selectedItems', this._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
        this._updateSelectedItems(args);
      }
    });
    this._selection = new _m_selection.default(options);
  }
  _updateSelectedItems(args) {
    const addedItemKeys = args.addedItemKeys;
    const removedItemKeys = args.removedItemKeys;
    if (this._rendered && (addedItemKeys.length || removedItemKeys.length)) {
      if (!this._rendering) {
        const addedSelection = [];
        let normalizedIndex;
        const removedSelection = [];
        this._editStrategy.beginCache();
        for (let i = 0; i < removedItemKeys.length; i++) {
          normalizedIndex = this._getIndexByKey(removedItemKeys[i]);
          removedSelection.push(normalizedIndex);
          this._removeSelection(normalizedIndex);
        }
        for (let i = 0; i < addedItemKeys.length; i++) {
          normalizedIndex = this._getIndexByKey(addedItemKeys[i]);
          addedSelection.push(normalizedIndex);
          this._addSelection(normalizedIndex);
        }
        this._editStrategy.endCache();
        this._updateSelection(addedSelection, removedSelection);
      }
      this._fireSelectionChangeEvent(args);
    }
  }
  _fireSelectionChangeEvent(args) {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })(args);
  }
  _updateSelection(addedSelection, removedSelection) {
    const selectedItemsCount = this.getSelectedItems().length;
    if (selectedItemsCount === 0) {
      this._isPreserveSelectionMode = false;
    }
  }
  _normalizeSelectedItems() {
    const newKeys = this._getKeysByItems(this.option('selectedItems'));
    const oldKeys = this._selection.getSelectedItemKeys();
    if (!this._compareKeys(oldKeys, newKeys)) {
      this._selection.setSelection(newKeys);
    }
    return new _deferred.Deferred().resolve().promise();
  }
  _focusOutHandler() {}
  _getItems() {
    return this.option('items') || [];
  }
  _getItemsLength() {
    return this._getItems().length;
  }
  _getIndexByItemElement(itemElement) {
    return this._editStrategy.getNormalizedIndex(itemElement);
  }
  _getItemByIndex(index) {
    return this._getItems()[index];
  }
  _getFocusedItem() {
    return this.getItemByItemElement(this.option('focusedElement'));
  }
  _focusItem(item, scrollToItem) {
    this.option('focusedElement', this.getItemElementByItem(item));
    if (scrollToItem) {
      this._layoutUtils.scrollToItem(this._getIndexByItem(item));
    }
  }
  _focusItemByIndex(index, scrollToItem, eventArgs) {
    if (index >= 0 && index < this._getItemsLength()) {
      const item = this._getItemByIndex(index);
      this._focusItem(item, scrollToItem, eventArgs);
    }
  }
  _syncFocusedItemKey() {
    if (!this._syncFocusedItemKeyDeferred) {
      this._syncFocusedItemKeyDeferred = new _deferred.Deferred();
    }
    const deferred = this._syncFocusedItemKeyDeferred;
    if (this._dataSource && this._dataSource.isLoading()) {
      return deferred.promise();
    }
    const focusedItemKey = this.option('focusedItemKey');
    if ((0, _type.isDefined)(focusedItemKey)) {
      const items = this.option('items');
      const focusedItem = items.find(item => this.keyOf(item) === focusedItemKey);
      if (focusedItem) {
        this._focusItem(focusedItem, true);
        deferred.resolve();
      } else {
        this.option('focusedItemKey', undefined);
        deferred.reject();
      }
    } else {
      deferred.resolve();
    }
    this._syncFocusedItemKeyDeferred = null;
    return deferred.promise();
  }
  _onFocusedItemChanged() {
    const focusedItem = this._getFocusedItem();
    const newFocusedItemKey = this.keyOf(focusedItem);
    const oldFocusedItemKey = this.option('focusedItemKey');
    if (newFocusedItemKey !== oldFocusedItemKey) {
      this._lockFocusedItemProcessing = true;
      this.option('focusedItemKey', newFocusedItemKey);
      this._lockFocusedItemProcessing = false;
      this._raiseFocusedItemChanged(focusedItem);
    }
  }
  _raiseFocusedItemChanged(focusedItem) {
    const args = {
      item: focusedItem,
      itemElement: this.option('focusedElement')
    };
    this._actions.onFocusedItemChanged(args);
  }
  _changeItemSelection(item, select) {
    if (this.isItemSelected(item) === select) {
      return;
    }
    const itemElement = this.getItemElementByItem(item);
    const index = this._getIndexByItemElement(itemElement);
    this._selection.changeItemSelection(index, {
      control: this._isPreserveSelectionMode
    });
  }
  _chooseSelectOption() {
    return 'selectedItemKeys';
  }
  getSelectedItems() {
    return this._selection.getSelectedItems();
  }
  getItemElementByItem(item) {
    return this._editStrategy.getItemElement(item);
  }
  getItemByItemElement(itemElement) {
    return this._getItemByIndex(this._getIndexByItemElement(itemElement));
  }
  selectAll() {
    if (this.option('selectionMode') !== 'multiple') return;
    this._selection.selectAll();
    this._isPreserveSelectionMode = true;
  }
  selectItem(item) {
    this._changeItemSelection(item, true);
  }
  deselectItem(item) {
    this._changeItemSelection(item, false);
  }
  clearSelection() {
    this._selection.deselectAll();
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'items':
        if (this._layoutUtils) {
          this._layoutUtils.updateItems(this.itemElements().first());
        }
        super._optionChanged(args);
        break;
      case 'focusedItemKey':
        if (this._lockFocusedItemProcessing) {
          break;
        }
        if ((0, _type.isDefined)(args.value)) {
          this._syncFocusedItemKey().done(() => {
            const focusedItem = this._getFocusedItem();
            this._raiseFocusedItemChanged(focusedItem);
          });
        } else {
          this.option('focusedElement', null);
          this._raiseFocusedItemChanged(null);
        }
        break;
      case 'onItemEnterKeyPressed':
      case 'onFocusedItemChanged':
        this._actions[args.name] = this._createActionByOption(args.name);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
class ListBoxLayoutUtils {
  constructor(scrollView, $viewPort, $itemContainer, $item) {
    this._layoutModel = null;
    this._scrollView = scrollView;
    this._$viewPort = $viewPort;
    this._$itemContainer = $itemContainer;
    this._$item = $item;
  }
  updateItems($item) {
    this._$item = $item;
  }
  reset() {
    this._layoutModel = null;
  }
  getLayoutModel() {
    if (!this._layoutModel) {
      this._layoutModel = this._createLayoutModel();
    }
    return this._layoutModel;
  }
  _createLayoutModel() {
    if (!this._$item) {
      return null;
    }
    const itemWidth = (0, _size.getOuterWidth)(this._$item, true);
    if (itemWidth === 0) {
      return null;
    }
    const itemHeight = (0, _size.getOuterHeight)(this._$item, true);
    const viewPortWidth = (0, _size.getInnerWidth)(this._$itemContainer);
    const viewPortHeight = (0, _size.getInnerHeight)(this._$viewPort);
    const viewPortScrollTop = this._scrollView.scrollTop();
    const viewPortScrollBottom = viewPortScrollTop + viewPortHeight;
    const itemPerRowCount = Math.floor(viewPortWidth / itemWidth);
    const rowPerPageRate = viewPortHeight / itemHeight;
    return {
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      viewPortWidth: viewPortWidth,
      viewPortHeight: viewPortHeight,
      viewPortScrollTop: viewPortScrollTop,
      viewPortScrollBottom: viewPortScrollBottom,
      itemPerRowCount: itemPerRowCount,
      rowPerPageRate: rowPerPageRate
    };
  }
  createItemLayoutModel(index) {
    const layout = this.getLayoutModel();
    if (!layout) {
      return null;
    }
    const itemRowIndex = Math.floor(index / layout.itemPerRowCount);
    const itemColumnIndex = index % layout.itemPerRowCount;
    const itemTop = itemRowIndex * layout.itemHeight;
    const itemBottom = itemTop + layout.itemHeight;
    return {
      itemRowIndex: itemRowIndex,
      itemColumnIndex: itemColumnIndex,
      itemTop: itemTop,
      itemBottom: itemBottom
    };
  }
  scrollToItem(index) {
    const layout = this.getLayoutModel();
    if (!layout) {
      return;
    }
    const itemRowIndex = Math.floor(index / layout.itemPerRowCount);
    const itemTop = itemRowIndex * layout.itemHeight;
    const itemBottom = itemTop + layout.itemHeight;
    let newScrollTop = layout.viewPortScrollTop;
    if (itemTop < layout.viewPortScrollTop) {
      newScrollTop = itemTop;
    } else if (itemBottom > layout.viewPortScrollBottom) {
      newScrollTop = itemBottom - layout.viewPortHeight;
    }
    this._scrollView.scrollTo(newScrollTop);
  }
}
var _default = exports.default = FileManagerThumbnailListBox;
module.exports = exports.default;
module.exports.default = exports.default;
