/**
* DevExtreme (esm/__internal/ui/file_manager/ui.file_manager.item_list.thumbnails.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { name as contextMenuEventName } from '../../../common/core/events/contextmenu';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../common/core/events/utils';
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { isDefined } from '../../../core/utils/type';
import { OPERATIONS } from '../../ui/file_manager/file_items_controller';
import { getDisplayFileSize } from '../../ui/file_manager/ui.file_manager.common';
import FileManagerItemListBase from '../../ui/file_manager/ui.file_manager.item_list';
import FileManagerThumbnailListBox from '../../ui/file_manager/ui.file_manager.items_list.thumbnails.list_box';
const FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS = 'dx-filemanager-thumbnails';
const FILE_MANAGER_THUMBNAILS_ITEM_CLASS = 'dx-filemanager-thumbnails-item';
const FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS = 'dx-filemanager-thumbnails-item-thumbnail';
const FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE = 'dxFileManager_thumbnails';
class FileManagerThumbnailsItemList extends FileManagerItemListBase {
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS);
    const contextMenuEvent = addNamespace(contextMenuEventName, FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE);
    eventsEngine.on(this.$element(), contextMenuEvent, this._onContextMenu.bind(this));
    this._createItemList();
  }
  _createItemList() {
    const selectionMode = this._isMultipleSelectionMode() ? 'multiple' : 'single';
    const {
      selectedItemKeys,
      focusedItemKey
    } = this.option();
    const $itemListContainer = $('<div>').appendTo(this.$element());
    this._itemList = this._createComponent($itemListContainer, FileManagerThumbnailListBox, {
      dataSource: this._createDataSource(),
      selectionMode,
      selectedItemKeys,
      focusedItemKey,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      loopItemFocus: false,
      focusStateEnabled: true,
      onItemEnterKeyPressed: this._tryOpen.bind(this),
      itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
      getTooltipText: this._getTooltipText.bind(this),
      // @ts-expect-error ts-error
      onSelectionChanged: this._onItemListSelectionChanged.bind(this),
      onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this),
      onContentReady: this._onContentReady.bind(this)
    });
  }
  _onContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this._isDesktop()) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let items = null;
    const targetItemElement = $(e.target).closest(this._getItemSelector());
    let targetItem = null;
    if (targetItemElement.length > 0) {
      var _this$_itemList, _this$_itemList2;
      targetItem = (_this$_itemList = this._itemList) === null || _this$_itemList === void 0 ? void 0 : _this$_itemList.getItemByItemElement(targetItemElement);
      (_this$_itemList2 = this._itemList) === null || _this$_itemList2 === void 0 || _this$_itemList2.selectItem(targetItem);
      items = this._getFileItemsForContextMenu(targetItem);
    }
    const target = {
      itemData: targetItem,
      itemElement: targetItemElement.length ? targetItemElement : undefined
    };
    this._showContextMenu(items, e.target, e, target);
  }
  _getItemThumbnailCssClass() {
    return FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS;
  }
  _getItemSelector() {
    return `.${FILE_MANAGER_THUMBNAILS_ITEM_CLASS}`;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTooltipText(fileItemInfo) {
    const item = fileItemInfo.fileItem;
    if (item.tooltipText) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return item.tooltipText;
    }
    let text = `${item.name}\r\n`;
    if (!item.isDirectory) {
      text += `${messageLocalization.format('dxFileManager-listThumbnailsTooltipTextSize')}: ${getDisplayFileSize(item.size)}\r\n`;
    }
    text += `${messageLocalization.format('dxFileManager-listThumbnailsTooltipTextDateModified')}: ${item.dateModified}`;
    return text;
  }
  _onItemDblClick(e) {
    var _this$_itemList3;
    const $item = $(e.currentTarget);
    const item = (_this$_itemList3 = this._itemList) === null || _this$_itemList3 === void 0 ? void 0 : _this$_itemList3.getItemByItemElement($item);
    this._tryOpen(item);
  }
  _tryOpen(item) {
    if (item) {
      this._raiseSelectedItemOpened(item);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getItemsInternal() {
    return super._getItemsInternal().then(items => {
      // @ts-expect-error ts-error
      const deferred = new Deferred();
      // eslint-disable-next-line no-restricted-globals,@typescript-eslint/no-unsafe-return
      setTimeout(() => deferred.resolve(items));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return deferred.promise();
    });
  }
  _disableDragging() {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      focusStateEnabled: true
    });
  }
  _onItemListSelectionChanged(_ref) {
    let {
      addedItemKeys,
      removedItemKeys
    } = _ref;
    const selectedItemInfos = this.getSelectedItems();
    const selectedItems = selectedItemInfos === null || selectedItemInfos === void 0 ? void 0 : selectedItemInfos.map(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    itemInfo => itemInfo.fileItem);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const selectedItemKeys = selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.map(item => item.key);
    this._tryRaiseSelectionChanged({
      selectedItemInfos,
      selectedItems,
      selectedItemKeys,
      currentSelectedItemKeys: addedItemKeys,
      currentDeselectedItemKeys: removedItemKeys
    });
  }
  _onItemListFocusedItemChanged(_ref2) {
    let {
      item,
      itemElement
    } = _ref2;
    if (!this._isMultipleSelectionMode()) {
      this._selectItemSingleSelection(item);
    }
    const fileSystemItem = (item === null || item === void 0 ? void 0 : item.fileItem) || null;
    this._onFocusedItemChanged({
      item: fileSystemItem,
      itemKey: fileSystemItem === null || fileSystemItem === void 0 ? void 0 : fileSystemItem.key,
      itemElement: itemElement || undefined
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getScrollable() {
    var _this$_itemList4;
    return (_this$_itemList4 = this._itemList) === null || _this$_itemList4 === void 0 ? void 0 : _this$_itemList4.getScrollable();
  }
  _setSelectedItemKeys(itemKeys) {
    var _this$_itemList5;
    (_this$_itemList5 = this._itemList) === null || _this$_itemList5 === void 0 || _this$_itemList5.option('selectedItemKeys', itemKeys);
  }
  _setFocusedItemKey(itemKey) {
    var _this$_itemList6;
    (_this$_itemList6 = this._itemList) === null || _this$_itemList6 === void 0 || _this$_itemList6.option('focusedItemKey', itemKey);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-misused-promises
  refresh(options, operation) {
    var _this$_itemList7, _this$_refreshDeferre;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actualOptions = {
      dataSource: this._createDataSource()
    };
    if (options && Object.prototype.hasOwnProperty.call(options, 'focusedItemKey')) {
      actualOptions.focusedItemKey = options.focusedItemKey;
    }
    if (options && Object.prototype.hasOwnProperty.call(options, 'selectedItemKeys')) {
      actualOptions.selectedItemKeys = options.selectedItemKeys;
    }
    if (!isDefined(actualOptions.focusedItemKey) && operation === OPERATIONS.NAVIGATION) {
      this._needResetScrollPosition = true;
    }
    (_this$_itemList7 = this._itemList) === null || _this$_itemList7 === void 0 || _this$_itemList7.option(actualOptions);
    // @ts-expect-error ts-error
    this._refreshDeferred = new Deferred();
    return (_this$_refreshDeferre = this._refreshDeferred) === null || _this$_refreshDeferre === void 0 ? void 0 : _this$_refreshDeferre.promise();
  }
  _deselectItem(item) {
    var _this$_itemList8, _this$_itemList9;
    const itemElement = (_this$_itemList8 = this._itemList) === null || _this$_itemList8 === void 0 ? void 0 : _this$_itemList8.getItemElementByItem(item);
    (_this$_itemList9 = this._itemList) === null || _this$_itemList9 === void 0 || _this$_itemList9.unselectItem(itemElement);
  }
  _selectItemSingleSelection(item) {
    if (item) {
      var _this$_itemList0;
      (_this$_itemList0 = this._itemList) === null || _this$_itemList0 === void 0 || _this$_itemList0.selectItem(item);
    } else {
      var _this$_itemList1;
      (_this$_itemList1 = this._itemList) === null || _this$_itemList1 === void 0 || _this$_itemList1.clearSelection();
    }
  }
  clearSelection() {
    var _this$_itemList10;
    (_this$_itemList10 = this._itemList) === null || _this$_itemList10 === void 0 || _this$_itemList10.clearSelection();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSelectedItems() {
    var _this$_itemList11;
    return (_this$_itemList11 = this._itemList) === null || _this$_itemList11 === void 0 ? void 0 : _this$_itemList11.getSelectedItems();
  }
}
export default FileManagerThumbnailsItemList;
