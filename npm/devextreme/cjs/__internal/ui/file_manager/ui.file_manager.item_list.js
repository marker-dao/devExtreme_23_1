/**
* DevExtreme (cjs/__internal/ui/file_manager/ui.file_manager.item_list.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _double_click = require("../../../common/core/events/double_click");
var _index = require("../../../common/core/events/utils/index");
var _custom_store = require("../../../common/data/custom_store");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _deferred = require("../../../core/utils/deferred");
var _icon = require("../../../core/utils/icon");
var _window = require("../../../core/utils/window");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line @stylistic/max-len
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-unused-vars */

const FILE_MANAGER_FILES_VIEW_CLASS = 'dx-filemanager-files-view';
const FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE = 'dxFileManager_open';
class FileManagerItemListBase extends _widget.default {
  _init() {
    this._initActions();
    this._lockFocusedItemProcessing = false;
    this._focusedItemKey = this.option('focusedItemKey');
    super._init();
  }
  _initMarkup() {
    this._needResetScrollPosition = false;
    this.$element().addClass(FILE_MANAGER_FILES_VIEW_CLASS);
    const dblClickEventName = (0, _index.addNamespace)(_double_click.name, FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE);
    _events_engine.default.on(this.$element(), dblClickEventName, this._getItemSelector(), this._onItemDblClick.bind(this));
    super._initMarkup();
  }
  _initActions() {
    this._actions = {
      onError: this._createActionByOption('onError'),
      onSelectionChanged: this._createActionByOption('onSelectionChanged'),
      onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged'),
      onSelectedItemOpened: this._createActionByOption('onSelectedItemOpened'),
      onContextMenuShowing: this._createActionByOption('onContextMenuShowing'),
      onItemListDataLoaded: this._createActionByOption('onItemListDataLoaded')
    };
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      selectionMode: 'single',
      selectedItemKeys: [],
      focusedItemKey: undefined,
      contextMenu: undefined,
      getItems: undefined,
      getItemThumbnail: undefined,
      onError: undefined,
      onSelectionChanged: undefined,
      onFocusedItemChanged: undefined,
      onSelectedItemOpened: undefined,
      onContextMenuShowing: undefined
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'selectionMode':
      case 'contextMenu':
      case 'getItems':
      case 'getItemThumbnail':
        this.repaint();
        break;
      case 'selectedItemKeys':
        this._setSelectedItemKeys(args.value);
        break;
      case 'focusedItemKey':
        if (!this._lockFocusedItemProcessing) {
          this._setFocusedItemKey(args.value);
        }
        break;
      case 'onError':
      case 'onSelectedItemOpened':
      case 'onSelectionChanged':
      case 'onFocusedItemChanged':
      case 'onContextMenuShowing':
      case 'onItemListDataLoaded':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getItems() {
    return this._getItemsInternal().done(itemInfos => {
      this._itemCount = itemInfos.length;
      if (this._itemCount === 0) {
        this._resetFocus();
      }
      const parentDirectoryItem = this._findParentDirectoryItem(itemInfos);
      this._hasParentDirectoryItem = !!parentDirectoryItem;
      this._parentDirectoryItemKey = parentDirectoryItem ? parentDirectoryItem.fileItem.key : null;
    }).always(() => {
      this._onDataLoaded();
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getItemsInternal() {
    const {
      getItems: itemsGetter
    } = this.option();
    const itemsResult = itemsGetter ? itemsGetter() : [];
    return (0, _deferred.when)(itemsResult);
  }
  _raiseOnError(error) {
    var _this$_actions$onErro, _this$_actions;
    (_this$_actions$onErro = (_this$_actions = this._actions).onError) === null || _this$_actions$onErro === void 0 || _this$_actions$onErro.call(_this$_actions, {
      error
    });
  }
  _raiseSelectionChanged(args) {
    var _this$_actions$onSele, _this$_actions2;
    (_this$_actions$onSele = (_this$_actions2 = this._actions).onSelectionChanged) === null || _this$_actions$onSele === void 0 || _this$_actions$onSele.call(_this$_actions2, args);
  }
  _raiseFocusedItemChanged(args) {
    var _this$_actions$onFocu, _this$_actions3;
    (_this$_actions$onFocu = (_this$_actions3 = this._actions).onFocusedItemChanged) === null || _this$_actions$onFocu === void 0 || _this$_actions$onFocu.call(_this$_actions3, args);
  }
  _raiseSelectedItemOpened(fileItemInfo) {
    var _this$_actions$onSele2, _this$_actions4;
    (_this$_actions$onSele2 = (_this$_actions4 = this._actions).onSelectedItemOpened) === null || _this$_actions$onSele2 === void 0 || _this$_actions$onSele2.call(_this$_actions4, {
      fileItemInfo
    });
  }
  _raiseContextMenuShowing(e) {
    var _this$_actions$onCont, _this$_actions5;
    (_this$_actions$onCont = (_this$_actions5 = this._actions).onContextMenuShowing) === null || _this$_actions$onCont === void 0 || _this$_actions$onCont.call(_this$_actions5, e);
  }
  _raiseItemListDataLoaded() {
    var _this$_actions$onItem, _this$_actions6;
    (_this$_actions$onItem = (_this$_actions6 = this._actions).onItemListDataLoaded) === null || _this$_actions$onItem === void 0 || _this$_actions$onItem.call(_this$_actions6);
  }
  _onDataLoaded() {
    var _this$_refreshDeferre;
    this._raiseItemListDataLoaded();
    (_this$_refreshDeferre = this._refreshDeferred) === null || _this$_refreshDeferre === void 0 || _this$_refreshDeferre.resolve();
  }
  _onContentReady() {
    if (this._needResetScrollPosition) {
      this._resetScrollTopPosition();
      this._needResetScrollPosition = false;
    }
  }
  _tryRaiseSelectionChanged(_ref) {
    let {
      selectedItemInfos,
      selectedItems,
      selectedItemKeys,
      currentSelectedItemKeys,
      currentDeselectedItemKeys
    } = _ref;
    const parentDirectoryItem = this._findParentDirectoryItem(this.getSelectedItems());
    if (parentDirectoryItem) {
      this._deselectItem(parentDirectoryItem);
    }
    let raiseEvent = !this._hasParentDirectoryItem;
    raiseEvent = raiseEvent || this._hasValidKeys(currentSelectedItemKeys) || this._hasValidKeys(currentDeselectedItemKeys);
    if (raiseEvent) {
      // eslint-disable-next-line no-param-reassign
      selectedItemInfos = this._filterOutItemByPredicate(selectedItemInfos, item => item.fileItem.key === this._parentDirectoryItemKey);
      // eslint-disable-next-line no-param-reassign
      selectedItems = this._filterOutParentDirectory(selectedItems);
      // eslint-disable-next-line no-param-reassign
      selectedItemKeys = this._filterOutParentDirectoryKey(selectedItemKeys, true);
      // eslint-disable-next-line no-param-reassign
      currentSelectedItemKeys = this._filterOutParentDirectoryKey(currentSelectedItemKeys, true);
      // eslint-disable-next-line no-param-reassign
      currentDeselectedItemKeys = this._filterOutParentDirectoryKey(currentDeselectedItemKeys, true);
      this._raiseSelectionChanged({
        selectedItemInfos,
        selectedItems,
        selectedItemKeys,
        currentSelectedItemKeys,
        currentDeselectedItemKeys
      });
    }
  }
  _onFocusedItemChanged(args) {
    if (this._focusedItemKey === args.itemKey) {
      return;
    }
    this._focusedItemKey = args.itemKey;
    this._lockFocusedItemProcessing = true;
    this.option('focusedItemKey', args.itemKey);
    this._lockFocusedItemProcessing = false;
    this._raiseFocusedItemChanged(args);
  }
  _resetFocus() {}
  _resetScrollTopPosition() {
    if (!(0, _window.hasWindow)()) {
      return;
    }
    // @ts-expect-error ts-error
    // eslint-disable-next-line no-restricted-globals,@typescript-eslint/no-unsafe-return
    setTimeout(() => {
      var _this$_getScrollable;
      return (_this$_getScrollable = this._getScrollable()) === null || _this$_getScrollable === void 0 ? void 0 : _this$_getScrollable.scrollTo(0);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getScrollable() {}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemThumbnail(fileInfo) {
    const {
      getItemThumbnail: itemThumbnailGetter
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return itemThumbnailGetter ? itemThumbnailGetter(fileInfo) : {
      thumbnail: ''
    };
  }
  _getItemThumbnailContainer(fileInfo) {
    var _getImageContainer;
    const {
      thumbnail,
      cssClass
    } = this._getItemThumbnail(fileInfo);
    const $itemThumbnail = (_getImageContainer = (0, _icon.getImageContainer)(thumbnail)) === null || _getImageContainer === void 0 ? void 0 : _getImageContainer.addClass(this._getItemThumbnailCssClass());
    if (cssClass) {
      $itemThumbnail === null || $itemThumbnail === void 0 || $itemThumbnail.addClass(cssClass);
    }
    return $itemThumbnail;
  }
  _getItemThumbnailCssClass() {
    return '';
  }
  _getItemSelector() {}
  _onItemDblClick(e) {}
  _isDesktop() {
    return _devices.default.real().deviceType === 'desktop';
  }
  _showContextMenu(items, element, event, target) {
    this._contextMenu.showAt(items, element, event, target);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get _contextMenu() {
    const {
      contextMenu
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return contextMenu;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _findParentDirectoryItem(itemInfos) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < itemInfos.length; i += 1) {
      const itemInfo = itemInfos[i];
      if (this._isParentDirectoryItem(itemInfo)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return itemInfo;
      }
    }
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFileItemsForContextMenu(fileItem) {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = this.getSelectedItems();
    if (this._isParentDirectoryItem(fileItem)) {
      result.push(fileItem);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _isParentDirectoryItem(itemInfo) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return itemInfo.fileItem.isParentFolder;
  }
  _hasValidKeys(keys) {
    return keys.length > 1 || keys.length === 1 && keys[0] !== this._parentDirectoryItemKey;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _filterOutParentDirectory(array, createNewArray) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._filterOutItemByPredicate(array, item => item.key === this._parentDirectoryItemKey, createNewArray);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _filterOutParentDirectoryKey(array, createNewArray) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._filterOutItemByPredicate(array, key => key === this._parentDirectoryItemKey, createNewArray);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _filterOutItemByPredicate(array, predicate, createNewArray) {
    let result = array;
    let index = -1;
    for (let i = 0; i < array.length; i += 1) {
      if (predicate(array[i])) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      if (createNewArray) {
        result = [...array];
      }
      result.splice(index, 1);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  _isMultipleSelectionMode() {
    const {
      selectionMode
    } = this.option();
    return selectionMode === 'multiple';
  }
  _deselectItem(item) {}
  _setSelectedItemKeys(itemKeys) {}
  _setFocusedItemKey(itemKey) {}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createDataSource() {
    return {
      store: new _custom_store.CustomStore({
        key: 'fileItem.key',
        load: this._getItems.bind(this)
      })
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSelectedItems() {}
  clearSelection() {}
  selectItem() {}
  refresh(options, operation) {}
}
var _default = exports.default = FileManagerItemListBase;
