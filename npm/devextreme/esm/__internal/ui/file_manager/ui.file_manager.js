/**
* DevExtreme (esm/__internal/ui/file_manager/ui.file_manager.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import messageLocalization from '../../../common/core/localization/message';
import registerComponent from '../../../core/component_registrator';
import { normalizeOptions } from '../../../core/options/utils';
import $ from '../../../core/renderer';
import { ensureDefined, equalByValue } from '../../../core/utils/common';
import { equals } from '../../../core/utils/comparator';
import { Deferred, when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { isDefined, isEmptyObject, isFunction, type } from '../../../core/utils/type';
import Widget from '../../core/widget/widget';
import { FileItemsController, OPERATIONS } from '../../ui/file_manager/file_items_controller';
import FileManagerAdaptivityControl from '../../ui/file_manager/ui.file_manager.adaptivity';
import FileManagerBreadcrumbs from '../../ui/file_manager/ui.file_manager.breadcrumbs';
import { defaultPermissions, FileManagerCommandManager } from '../../ui/file_manager/ui.file_manager.command_manager';
import { extendAttributes, findItemsByKeys } from '../../ui/file_manager/ui.file_manager.common';
import FileManagerContextMenu from '../../ui/file_manager/ui.file_manager.context_menu';
import FileManagerEditingControl from '../../ui/file_manager/ui.file_manager.editing';
import FileManagerFilesTreeView from '../../ui/file_manager/ui.file_manager.files_tree_view';
import FileManagerDetailsItemList from '../../ui/file_manager/ui.file_manager.item_list.details';
import FileManagerThumbnailsItemList from '../../ui/file_manager/ui.file_manager.item_list.thumbnails';
import FileManagerNotificationControl from '../../ui/file_manager/ui.file_manager.notification';
import FileManagerToolbar from '../../ui/file_manager/ui.file_manager.toolbar';
import notify from '../../ui/notify';
const FILE_MANAGER_CLASS = 'dx-filemanager';
const FILE_MANAGER_WRAPPER_CLASS = `${FILE_MANAGER_CLASS}-wrapper`;
const FILE_MANAGER_CONTAINER_CLASS = `${FILE_MANAGER_CLASS}-container`;
const FILE_MANAGER_DIRS_PANEL_CLASS = `${FILE_MANAGER_CLASS}-dirs-panel`;
const FILE_MANAGER_EDITING_CONTAINER_CLASS = `${FILE_MANAGER_CLASS}-editing-container`;
const FILE_MANAGER_ITEMS_PANEL_CLASS = `${FILE_MANAGER_CLASS}-items-panel`;
const FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS = `${FILE_MANAGER_CLASS}-item-custom-thumbnail`;
const PARENT_DIRECTORY_KEY_PREFIX = '[*DXPDK*]$40F96F03-FBD8-43DF-91BE-F55F4B8BA871$';
const VIEW_AREAS = {
  folders: 'navPane',
  items: 'itemView'
};
class FileManager extends Widget {
  _initTemplates() {}
  _init() {
    super._init();
    this._initActions();
    this._providerUpdateDeferred = null;
    this._lockCurrentPathProcessing = false;
    this._wasRendered = false;
    const {
      currentPath,
      currentPathKeys,
      rootFolderName,
      fileSystemProvider,
      allowedFileExtensions,
      upload
    } = this.option();
    this._controller = new FileItemsController({
      currentPath,
      currentPathKeys,
      rootText: rootFolderName,
      fileProvider: fileSystemProvider,
      allowedFileExtensions,
      uploadMaxFileSize: upload === null || upload === void 0 ? void 0 : upload.maxFileSize,
      uploadChunkSize: upload === null || upload === void 0 ? void 0 : upload.chunkSize,
      onInitialized: this._onControllerInitialized.bind(this),
      onDataLoading: this._onDataLoading.bind(this),
      onSelectedDirectoryChanged: this._onSelectedDirectoryChanged.bind(this),
      onPathPotentiallyChanged: this._checkPathActuality.bind(this),
      editingEvents: this._actions.editing
    });
  }
  _initMarkup() {
    super._initMarkup();
    this._firstItemViewLoad = true;
    this._lockSelectionProcessing = false;
    this._lockFocusedItemProcessing = false;
    this._itemKeyToFocus = undefined;
    this._loadedWidgets = [];
    const {
      permissions
    } = this.option();
    this._commandManager = new FileManagerCommandManager(permissions);
    this.$element().addClass(FILE_MANAGER_CLASS);
    if (this._wasRendered) {
      this._prepareToLoad();
    } else {
      this._wasRendered = true;
    }
    this._createNotificationControl();
    this._initCommandManager();
  }
  _createNotificationControl() {
    const $notificationControl = $('<div>').addClass('dx-filemanager-notification-container').appendTo(this.$element());
    const {
      notifications
    } = this.option();
    this._notificationControl = this._createComponent($notificationControl, FileManagerNotificationControl, {
      progressPanelContainer: this.$element(),
      // eslint-disable-next-line @stylistic/max-len
      contentTemplate: (container, notificationControl) => this._createWrapper(container, notificationControl),
      onActionProgress: e => this._onActionProgress(e),
      positionTargetSelector: `.${FILE_MANAGER_CONTAINER_CLASS}`,
      showProgressPanel: notifications === null || notifications === void 0 ? void 0 : notifications.showPanel,
      showNotificationPopup: notifications === null || notifications === void 0 ? void 0 : notifications.showPopup
    });
  }
  _createWrapper(container, notificationControl) {
    this._$wrapper = $('<div>').addClass(FILE_MANAGER_WRAPPER_CLASS).appendTo(container);
    this._createEditing(notificationControl);
    const {
      toolbar,
      itemView
    } = this.option();
    const $toolbar = $('<div>').appendTo(this._$wrapper);
    this._toolbar = this._createComponent($toolbar, FileManagerToolbar, {
      commandManager: this._commandManager,
      generalItems: toolbar === null || toolbar === void 0 ? void 0 : toolbar.items,
      fileItems: toolbar === null || toolbar === void 0 ? void 0 : toolbar.fileSelectionItems,
      itemViewMode: itemView === null || itemView === void 0 ? void 0 : itemView.mode,
      onItemClick: args => {
        var _this$_actions$onTool, _this$_actions;
        return (_this$_actions$onTool = (_this$_actions = this._actions).onToolbarItemClick) === null || _this$_actions$onTool === void 0 ? void 0 : _this$_actions$onTool.call(_this$_actions, args);
      }
    });
    this._createAdaptivityControl();
  }
  _createAdaptivityControl() {
    var _this$_editing;
    const $container = $('<div>').addClass(FILE_MANAGER_CONTAINER_CLASS).appendTo(this._$wrapper);
    this._adaptivityControl = this._createComponent($container, FileManagerAdaptivityControl, {
      drawerTemplate: container => this._createFilesTreeView(container),
      contentTemplate: container => this._createItemsPanel(container),
      onAdaptiveStateChanged: e => this._onAdaptiveStateChanged(e)
    });
    (_this$_editing = this._editing) === null || _this$_editing === void 0 || _this$_editing.setUploaderSplitterElement(this._adaptivityControl.getSplitterElement());
  }
  _createEditing(notificationControl) {
    const $editingContainer = $('<div>').addClass(FILE_MANAGER_EDITING_CONTAINER_CLASS).appendTo(this.$element());
    const {
      rtlEnabled
    } = this.option();
    this._editing = this._createComponent($editingContainer, FileManagerEditingControl, {
      controller: this._controller,
      model: {
        getMultipleSelectedItems: this._getSelectedItemInfos.bind(this)
      },
      getItemThumbnail: this._getItemThumbnailInfo.bind(this),
      notificationControl,
      uploadDropZonePlaceholderContainer: this.$element(),
      rtlEnabled,
      onSuccess: _ref => {
        let {
          updatedOnlyFiles
        } = _ref;
        return this._redrawComponent(updatedOnlyFiles);
      },
      onError: e => this._onEditingError(e)
    });
  }
  _createItemsPanel($container) {
    this._$itemsPanel = $('<div>').addClass(FILE_MANAGER_ITEMS_PANEL_CLASS).appendTo($container);
    this._createBreadcrumbs(this._$itemsPanel);
    this._createItemView(this._$itemsPanel);
    this._updateUploadDropZone();
  }
  _updateUploadDropZone() {
    var _this$_commandManager, _this$_editing2;
    const dropZone = (_this$_commandManager = this._commandManager) !== null && _this$_commandManager !== void 0 && _this$_commandManager.isCommandAvailable('upload') ? this._$itemsPanel : $();
    (_this$_editing2 = this._editing) === null || _this$_editing2 === void 0 || _this$_editing2.setUploaderDropZone(dropZone);
  }
  _createFilesTreeView(container) {
    this._filesTreeViewContextMenu = this._createContextMenu(false, VIEW_AREAS.folders);
    const $filesTreeView = $('<div>').addClass(FILE_MANAGER_DIRS_PANEL_CLASS).appendTo(container);
    this._filesTreeView = this._createComponent($filesTreeView, FileManagerFilesTreeView, {
      storeExpandedState: true,
      contextMenu: this._filesTreeViewContextMenu,
      getDirectories: this.getDirectories.bind(this),
      getCurrentDirectory: this._getCurrentDirectory.bind(this),
      onDirectoryClick: _ref2 => {
        let {
          itemData
        } = _ref2;
        return this._setCurrentDirectory(itemData);
      },
      onItemListDataLoaded: () => this._tryEndLoading(VIEW_AREAS.folders)
    });
    this._filesTreeView.updateCurrentDirectory();
  }
  _createItemView($container, viewMode) {
    var _itemView$details;
    this._itemViewContextMenu = this._createContextMenu(true, VIEW_AREAS.items);
    const {
      itemView,
      selectionMode,
      selectedItemKeys,
      focusedItemKey,
      customizeDetailColumns
    } = this.option();
    const options = {
      selectionMode,
      selectedItemKeys,
      focusedItemKey,
      contextMenu: this._itemViewContextMenu,
      getItems: this._getItemViewItems.bind(this),
      onError: _ref3 => {
        let {
          error
        } = _ref3;
        return this._showError(error);
      },
      onSelectionChanged: this._onItemViewSelectionChanged.bind(this),
      onFocusedItemChanged: this._onItemViewFocusedItemChanged.bind(this),
      onSelectedItemOpened: this._onSelectedItemOpened.bind(this),
      onContextMenuShowing: e => this._onContextMenuShowing(VIEW_AREAS.items, e),
      onItemListItemsLoaded: () => this._tryEndLoading(VIEW_AREAS.items),
      getItemThumbnail: this._getItemThumbnailInfo.bind(this),
      customizeDetailColumns,
      detailColumns: itemView === null || itemView === void 0 || (_itemView$details = itemView.details) === null || _itemView$details === void 0 ? void 0 : _itemView$details.columns
    };
    const $itemView = $('<div>').appendTo($container);
    // eslint-disable-next-line no-param-reassign
    viewMode = viewMode || (itemView === null || itemView === void 0 ? void 0 : itemView.mode);
    const widgetClass = viewMode === 'thumbnails' ? FileManagerThumbnailsItemList : FileManagerDetailsItemList;
    // @ts-expect-error ts-error
    this._itemView = this._createComponent($itemView, widgetClass, options);
  }
  _createBreadcrumbs($container) {
    const $breadcrumbs = $('<div>').appendTo($container);
    const {
      rootFolderName
    } = this.option();
    this._breadcrumbs = this._createComponent($breadcrumbs, FileManagerBreadcrumbs, {
      rootFolderDisplayName: rootFolderName,
      // eslint-disable-next-line @stylistic/max-len
      onCurrentDirectoryChanging: _ref4 => {
        let {
          currentDirectory
        } = _ref4;
        return this._setCurrentDirectory(currentDirectory, true);
      }
    });
    this._breadcrumbs.setCurrentDirectory(this._getCurrentDirectory());
  }
  _createContextMenu(isolateCreationItemCommands, viewArea) {
    const $contextMenu = $('<div>').appendTo(this._$wrapper);
    const {
      contextMenu
    } = this.option();
    return this._createComponent($contextMenu, FileManagerContextMenu, {
      commandManager: this._commandManager,
      items: contextMenu === null || contextMenu === void 0 ? void 0 : contextMenu.items,
      onItemClick: args => {
        var _this$_actions$onCont, _this$_actions2;
        return (_this$_actions$onCont = (_this$_actions2 = this._actions).onContextMenuItemClick) === null || _this$_actions$onCont === void 0 ? void 0 : _this$_actions$onCont.call(_this$_actions2, args);
      },
      onContextMenuShowing: e => this._onContextMenuShowing(viewArea, e),
      isolateCreationItemCommands,
      viewArea
    });
  }
  _initCommandManager() {
    var _this$_editing3, _this$_commandManager2;
    const actions = extend((_this$_editing3 = this._editing) === null || _this$_editing3 === void 0 ? void 0 : _this$_editing3.getCommandActions(), {
      refresh: () => this._refreshAndShowProgress(),
      thumbnails: () => this.option('itemView.mode', 'thumbnails'),
      details: () => this.option('itemView.mode', 'details'),
      clearSelection: () => this._clearSelection(),
      showNavPane: () => {
        var _this$_adaptivityCont;
        return (_this$_adaptivityCont = this._adaptivityControl) === null || _this$_adaptivityCont === void 0 ? void 0 : _this$_adaptivityCont.toggleDrawer();
      }
    });
    (_this$_commandManager2 = this._commandManager) === null || _this$_commandManager2 === void 0 || _this$_commandManager2.registerActions(actions);
  }
  _onItemViewSelectionChanged(_ref5) {
    var _this$_actions$onSele, _this$_actions3;
    let {
      selectedItemInfos,
      selectedItems,
      selectedItemKeys,
      currentSelectedItemKeys,
      currentDeselectedItemKeys
    } = _ref5;
    this._lockSelectionProcessing = true;
    this.option('selectedItemKeys', selectedItemKeys);
    this._lockSelectionProcessing = false;
    (_this$_actions$onSele = (_this$_actions3 = this._actions).onSelectionChanged) === null || _this$_actions$onSele === void 0 || _this$_actions$onSele.call(_this$_actions3, {
      selectedItems,
      selectedItemKeys,
      currentSelectedItemKeys,
      currentDeselectedItemKeys
    });
    this._updateToolbar(selectedItemInfos);
  }
  _onItemViewFocusedItemChanged(e) {
    var _this$_actions$onFocu, _this$_actions4;
    this._lockFocusedItemProcessing = true;
    this.option('focusedItemKey', e.itemKey);
    this._lockFocusedItemProcessing = false;
    (_this$_actions$onFocu = (_this$_actions4 = this._actions).onFocusedItemChanged) === null || _this$_actions$onFocu === void 0 || _this$_actions$onFocu.call(_this$_actions4, {
      item: e.item,
      itemElement: e.itemElement
    });
  }
  _onAdaptiveStateChanged(_ref6) {
    var _this$_commandManager3;
    let {
      enabled
    } = _ref6;
    (_this$_commandManager3 = this._commandManager) === null || _this$_commandManager3 === void 0 || _this$_commandManager3.setCommandEnabled('showNavPane', enabled);
    this._updateToolbar();
  }
  _onActionProgress(_ref7) {
    var _this$_toolbar;
    let {
      message,
      status
    } = _ref7;
    (_this$_toolbar = this._toolbar) === null || _this$_toolbar === void 0 || _this$_toolbar.updateRefreshItem(message, status);
    this._updateToolbar();
  }
  _onEditingError(e) {
    var _this$_actions$onErro, _this$_actions5;
    const args = extendAttributes({}, e, ['errorCode', 'errorText', 'fileSystemItem']);
    (_this$_actions$onErro = (_this$_actions5 = this._actions).onErrorOccurred) === null || _this$_actions$onErro === void 0 || _this$_actions$onErro.call(_this$_actions5, args);
    e.errorText = args.errorText;
  }
  _refreshAndShowProgress() {
    var _this$_notificationCo, _this$_controller;
    this._prepareToLoad();
    return when((_this$_notificationCo = this._notificationControl) === null || _this$_notificationCo === void 0 ? void 0 : _this$_notificationCo.tryShowProgressPanel(), (_this$_controller = this._controller) === null || _this$_controller === void 0 ? void 0 : _this$_controller.refresh()).then(() => {
      var _this$_filesTreeView;
      return (_this$_filesTreeView = this._filesTreeView) === null || _this$_filesTreeView === void 0 ? void 0 : _this$_filesTreeView.refresh();
    });
  }
  _isAllWidgetsLoaded() {
    var _this$_loadedWidgets, _this$_loadedWidgets2, _this$_loadedWidgets3;
    return ((_this$_loadedWidgets = this._loadedWidgets) === null || _this$_loadedWidgets === void 0 ? void 0 : _this$_loadedWidgets.length) === 2 && ((_this$_loadedWidgets2 = this._loadedWidgets) === null || _this$_loadedWidgets2 === void 0 ? void 0 : _this$_loadedWidgets2.includes(VIEW_AREAS.folders)) && ((_this$_loadedWidgets3 = this._loadedWidgets) === null || _this$_loadedWidgets3 === void 0 ? void 0 : _this$_loadedWidgets3.includes(VIEW_AREAS.items));
  }
  _tryEndLoading(area) {
    var _this$_loadedWidgets4;
    (_this$_loadedWidgets4 = this._loadedWidgets) === null || _this$_loadedWidgets4 === void 0 || _this$_loadedWidgets4.push(area);
    if (this._isAllWidgetsLoaded()) {
      var _this$_controller2;
      (_this$_controller2 = this._controller) === null || _this$_controller2 === void 0 || _this$_controller2.endSingleLoad();
    }
  }
  _prepareToLoad() {
    var _this$_controller3;
    this._loadedWidgets = [];
    (_this$_controller3 = this._controller) === null || _this$_controller3 === void 0 || _this$_controller3.startSingleLoad();
  }
  _updateToolbar(selectedItems) {
    var _this$_toolbar2;
    const items = selectedItems || this._getSelectedItemInfos();
    (_this$_toolbar2 = this._toolbar) === null || _this$_toolbar2 === void 0 || _this$_toolbar2.option('contextItems', ensureDefined(items, []));
  }
  _switchView(viewMode) {
    var _this$_itemView, _this$_toolbar3;
    this._disposeWidget((_this$_itemView = this._itemView) === null || _this$_itemView === void 0 ? void 0 : _this$_itemView.option('contextMenu'));
    this._disposeWidget(this._itemView);
    this._createItemView(this._$itemsPanel, viewMode);
    (_this$_toolbar3 = this._toolbar) === null || _this$_toolbar3 === void 0 || _this$_toolbar3.option({
      itemViewMode: viewMode
    });
  }
  _disposeWidget(widget) {
    widget.dispose();
    widget.$element().remove();
  }
  _clearSelection() {
    var _this$_itemView2;
    (_this$_itemView2 = this._itemView) === null || _this$_itemView2 === void 0 || _this$_itemView2.clearSelection();
  }
  _showError(message) {
    this._showNotification(message, false);
  }
  _showNotification(message, isSuccess) {
    notify({
      message,
      width: 450
    }, isSuccess ? 'success' : 'error', 5000);
  }
  _redrawComponent(onlyFileItemsView) {
    var _this$_itemView3;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_itemView3 = this._itemView) === null || _this$_itemView3 === void 0 || (_this$_itemView3 = _this$_itemView3.refresh()) === null || _this$_itemView3 === void 0 || _this$_itemView3.then(() => {
      var _this$_filesTreeView2;
      return !onlyFileItemsView && ((_this$_filesTreeView2 = this._filesTreeView) === null || _this$_filesTreeView2 === void 0 ? void 0 : _this$_filesTreeView2.refresh());
    });
  }
  _getItemViewItems() {
    var _this$_controller4;
    const {
      itemView
    } = this.option();
    let result = (_this$_controller4 = this._controller) === null || _this$_controller4 === void 0 ? void 0 : _this$_controller4.getCurrentItems(!(itemView !== null && itemView !== void 0 && itemView.showFolders));
    this._updateToolbarWithSelectionOnFirstLoad(result);
    if (itemView !== null && itemView !== void 0 && itemView.showParentFolder) {
      result = when(result)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then(items => this._getPreparedItemViewItems(items));
    }
    // @ts-expect-error ts-error
    return result;
  }
  _updateToolbarWithSelectionOnFirstLoad(itemsResult) {
    if (!this._firstItemViewLoad) {
      return;
    }
    this._firstItemViewLoad = false;
    const {
      selectedItemKeys
    } = this.option();
    if (selectedItemKeys !== null && selectedItemKeys !== void 0 && selectedItemKeys.length && selectedItemKeys.length > 0) {
      when(itemsResult).done(items => {
        const selectedItems = findItemsByKeys(items, selectedItemKeys);
        if (selectedItems.length > 0) {
          this._updateToolbar(selectedItems);
        }
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPreparedItemViewItems(items) {
    const selectedDir = this._getCurrentDirectory();
    if (selectedDir.fileItem.isRoot()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return items;
    }
    const parentDirItem = selectedDir.fileItem.createClone();
    parentDirItem.isParentFolder = true;
    parentDirItem.name = '..';
    parentDirItem.relativeName = '..';
    parentDirItem.key = `${PARENT_DIRECTORY_KEY_PREFIX}${selectedDir.fileItem.key}`;
    const itemsCopy = [...items];
    itemsCopy.unshift({
      fileItem: parentDirItem,
      icon: 'parentfolder'
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return itemsCopy;
  }
  _onContextMenuShowing(viewArea, e) {
    var _e$itemData, _this$_actions$onCont2, _this$_actions6;
    let eventArgs = extendAttributes({}, e, ['targetElement', 'cancel', 'event']);
    eventArgs = extend(eventArgs, {
      viewArea,
      fileSystemItem: (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.fileItem,
      _isActionButton: e.isActionButton
    });
    (_this$_actions$onCont2 = (_this$_actions6 = this._actions).onContextMenuShowing) === null || _this$_actions$onCont2 === void 0 || _this$_actions$onCont2.call(_this$_actions6, eventArgs);
    e.cancel = ensureDefined(eventArgs.cancel, false);
  }
  _getItemThumbnailInfo(fileInfo) {
    const {
      customizeThumbnail
    } = this.option();
    const thumbnail = isFunction(customizeThumbnail) ? customizeThumbnail(fileInfo.fileItem) : fileInfo.fileItem.thumbnail;
    if (thumbnail) {
      return {
        thumbnail,
        cssClass: FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS
      };
    }
    return {
      thumbnail: fileInfo.icon
    };
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      fileSystemProvider: null,
      currentPath: '',
      currentPathKeys: [],
      rootFolderName: messageLocalization.format('dxFileManager-rootDirectoryName'),
      selectionMode: 'multiple',
      selectedItemKeys: [],
      focusedItemKey: undefined,
      toolbar: {
        items: ['showNavPane', 'create', 'upload', 'switchView', {
          name: 'separator',
          location: 'after'
        }, 'refresh'],
        fileSelectionItems: ['download', 'separator', 'move', 'copy', 'rename', 'separator', 'delete', 'clearSelection', {
          name: 'separator',
          location: 'after'
        }, 'refresh']
      },
      contextMenu: {
        items: ['create', 'upload', 'rename', 'move', 'copy', 'delete', 'refresh', 'download']
      },
      itemView: {
        details: {
          columns: ['thumbnail', 'name', 'dateModified', 'size']
        },
        mode: 'details',
        showFolders: true,
        showParentFolder: true
      },
      customizeThumbnail: undefined,
      customizeDetailColumns: undefined,
      onContextMenuItemClick: undefined,
      onContextMenuShowing: undefined,
      onCurrentDirectoryChanged: undefined,
      onSelectedFileOpened: undefined,
      onSelectionChanged: undefined,
      onFocusedItemChanged: undefined,
      onToolbarItemClick: undefined,
      onErrorOccurred: undefined,
      onDirectoryCreating: undefined,
      onDirectoryCreated: undefined,
      onItemRenaming: undefined,
      onItemRenamed: undefined,
      onItemDeleting: undefined,
      onItemDeleted: undefined,
      onItemCopying: undefined,
      onItemCopied: undefined,
      onItemMoving: undefined,
      onItemMoved: undefined,
      onFileUploading: undefined,
      onFileUploaded: undefined,
      onItemDownloading: undefined,
      allowedFileExtensions: [],
      upload: {
        maxFileSize: 0,
        chunkSize: 200000
      },
      permissions: extend({}, defaultPermissions),
      notifications: {
        showPanel: true,
        showPopup: true
      }
    });
  }
  option(options, value) {
    const optionsToCheck = normalizeOptions(options, value);
    const isGetter = arguments.length < 2 && type(options) !== 'object';
    const isOptionDefined = name => isDefined(optionsToCheck[name]);
    const isOptionValueDiffers = name => {
      if (!isOptionDefined(name)) {
        return false;
      }
      const previousValue = this.option(name);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const value = optionsToCheck[name];
      return !equals(previousValue, value);
    };
    if (!isGetter && isOptionDefined('fileSystemProvider')) {
      // @ts-expect-error ts-error
      this._providerUpdateDeferred = new Deferred();
      if (isOptionValueDiffers('currentPath') || isOptionValueDiffers('currentPathKeys')) {
        this._lockCurrentPathProcessing = true;
      }
    }
    // eslint-disable-next-line prefer-rest-params
    return super.option(...arguments);
  }
  _optionChanged(args) {
    var _this$_controller7, _this$_controller9, _this$_notificationCo2, _this$_notificationCo3, _this$_editing4;
    const {
      name,
      fullName,
      value
    } = args;
    switch (name) {
      case 'currentPath':
        {
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          const updateFunc = () => {
            var _this$_controller5;
            this._lockCurrentPathProcessing = false;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return (_this$_controller5 = this._controller) === null || _this$_controller5 === void 0 ? void 0 : _this$_controller5.setCurrentPath(value);
          };
          this._lockCurrentPathProcessing = true;
          if (this._providerUpdateDeferred) {
            this._providerUpdateDeferred.then(updateFunc);
          } else {
            updateFunc();
          }
          break;
        }
      case 'currentPathKeys':
        {
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          const updateFunc = () => {
            var _this$_controller6;
            this._lockCurrentPathProcessing = false;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return (_this$_controller6 = this._controller) === null || _this$_controller6 === void 0 ? void 0 : _this$_controller6.setCurrentPathByKeys(value);
          };
          this._lockCurrentPathProcessing = true;
          if (this._providerUpdateDeferred) {
            this._providerUpdateDeferred.then(updateFunc);
          } else {
            updateFunc();
          }
          break;
        }
      case 'selectedItemKeys':
        if (!this._lockSelectionProcessing && this._itemView) {
          this._itemView.option('selectedItemKeys', value);
        }
        break;
      case 'focusedItemKey':
        if (!this._lockFocusedItemProcessing && this._itemView) {
          this._itemView.option('focusedItemKey', value);
        }
        break;
      case 'rootFolderName':
        (_this$_controller7 = this._controller) === null || _this$_controller7 === void 0 || _this$_controller7.setRootText(value);
        this._invalidate();
        break;
      case 'fileSystemProvider':
        {
          var _this$_controller8;
          if (!this._lockCurrentPathProcessing) {
            // @ts-expect-error ts-error
            this._providerUpdateDeferred = new Deferred();
          }
          const {
            currentPathKeys
          } = this.option();
          const pathKeys = this._lockCurrentPathProcessing ? undefined : currentPathKeys;
          (_this$_controller8 = this._controller) === null || _this$_controller8 === void 0 || _this$_controller8.updateProvider(value, pathKeys)
          // eslint-disable-next-line @stylistic/max-len,@typescript-eslint/no-misused-promises
          .then(() => {
            var _this$_providerUpdate;
            return (_this$_providerUpdate = this._providerUpdateDeferred) === null || _this$_providerUpdate === void 0 ? void 0 : _this$_providerUpdate.resolve();
          }).always(() => {
            this._providerUpdateDeferred = null;
            this.repaint();
          });
          break;
        }
      case 'allowedFileExtensions':
        (_this$_controller9 = this._controller) === null || _this$_controller9 === void 0 || _this$_controller9.setAllowedFileExtensions(value);
        this._invalidate();
        break;
      case 'upload':
        {
          var _this$_controller0;
          const {
            upload
          } = this.option();
          // @ts-expect-error ts-error
          (_this$_controller0 = this._controller) === null || _this$_controller0 === void 0 || _this$_controller0.setUploadOptions(upload);
          this._invalidate();
          break;
        }
      case 'permissions':
        {
          var _this$_commandManager4, _this$_filesTreeViewC, _this$_itemViewContex, _this$_toolbar4;
          const {
            permissions
          } = this.option();
          (_this$_commandManager4 = this._commandManager) === null || _this$_commandManager4 === void 0 || _this$_commandManager4.updatePermissions(permissions);
          (_this$_filesTreeViewC = this._filesTreeViewContextMenu) === null || _this$_filesTreeViewC === void 0 || _this$_filesTreeViewC.tryUpdateVisibleContextMenu();
          (_this$_itemViewContex = this._itemViewContextMenu) === null || _this$_itemViewContex === void 0 || _this$_itemViewContex.tryUpdateVisibleContextMenu();
          (_this$_toolbar4 = this._toolbar) === null || _this$_toolbar4 === void 0 || _this$_toolbar4.updateItemPermissions();
          this._updateUploadDropZone();
          break;
        }
      case 'selectionMode':
      case 'customizeThumbnail':
      case 'customizeDetailColumns':
        this._invalidate();
        break;
      case 'itemView':
        if (fullName === 'itemView.mode') {
          this._switchView(value);
        } else {
          this._invalidate();
        }
        break;
      case 'toolbar':
        {
          var _this$_toolbar5;
          const toolbarOptions = {};
          if (fullName === 'toolbar') {
            if (value !== null && value !== void 0 && value.items) {
              toolbarOptions.generalItems = value === null || value === void 0 ? void 0 : value.items;
            }
            if (value !== null && value !== void 0 && value.fileSelectionItems) {
              toolbarOptions.fileItems = value === null || value === void 0 ? void 0 : value.fileSelectionItems;
            }
          }
          const {
            toolbar
          } = this.option();
          if (fullName.startsWith('toolbar.items')) {
            toolbarOptions.generalItems = toolbar === null || toolbar === void 0 ? void 0 : toolbar.items;
          }
          if (fullName.startsWith('toolbar.fileSelectionItems')) {
            toolbarOptions.fileItems = toolbar === null || toolbar === void 0 ? void 0 : toolbar.fileSelectionItems;
          }
          (_this$_toolbar5 = this._toolbar) === null || _this$_toolbar5 === void 0 || _this$_toolbar5.option(toolbarOptions);
          break;
        }
      case 'contextMenu':
        // eslint-disable-next-line @stylistic/no-mixed-operators
        if (fullName === 'contextMenu' && value !== null && value !== void 0 && value.items || fullName.startsWith('contextMenu.items')) {
          var _this$_filesTreeViewC2, _this$_itemViewContex2;
          const {
            contextMenu
          } = this.option();
          (_this$_filesTreeViewC2 = this._filesTreeViewContextMenu) === null || _this$_filesTreeViewC2 === void 0 || _this$_filesTreeViewC2.option('items', contextMenu === null || contextMenu === void 0 ? void 0 : contextMenu.items);
          (_this$_itemViewContex2 = this._itemViewContextMenu) === null || _this$_itemViewContex2 === void 0 || _this$_itemViewContex2.option('items', contextMenu === null || contextMenu === void 0 ? void 0 : contextMenu.items);
        }
        break;
      case 'notifications':
        (_this$_notificationCo2 = this._notificationControl) === null || _this$_notificationCo2 === void 0 || _this$_notificationCo2.option('showProgressPanel', this.option('notifications.showPanel'));
        (_this$_notificationCo3 = this._notificationControl) === null || _this$_notificationCo3 === void 0 || _this$_notificationCo3.option('showNotificationPopup', this.option('notifications.showPopup'));
        break;
      case 'onContextMenuItemClick':
      case 'onContextMenuShowing':
      case 'onCurrentDirectoryChanged':
      case 'onSelectedFileOpened':
      case 'onSelectionChanged':
      case 'onFocusedItemChanged':
      case 'onToolbarItemClick':
      case 'onErrorOccurred':
        this._actions[name] = this._createActionByOption(name);
        break;
      case 'onDirectoryCreating':
      case 'onDirectoryCreated':
      case 'onItemRenaming':
      case 'onItemRenamed':
      case 'onItemDeleting':
      case 'onItemDeleted':
      case 'onItemCopying':
      case 'onItemCopied':
      case 'onItemMoving':
      case 'onItemMoved':
      case 'onFileUploading':
      case 'onFileUploaded':
      case 'onItemDownloading':
        this._actions.editing[name] = this._createActionByOption(name);
        break;
      case 'rtlEnabled':
        (_this$_editing4 = this._editing) === null || _this$_editing4 === void 0 || _this$_editing4.updateDialogRtl(value);
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _initActions() {
    this._actions = {
      onContextMenuItemClick: this._createActionByOption('onContextMenuItemClick'),
      onContextMenuShowing: this._createActionByOption('onContextMenuShowing'),
      onCurrentDirectoryChanged: this._createActionByOption('onCurrentDirectoryChanged'),
      onSelectedFileOpened: this._createActionByOption('onSelectedFileOpened'),
      onSelectionChanged: this._createActionByOption('onSelectionChanged'),
      onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged'),
      onToolbarItemClick: this._createActionByOption('onToolbarItemClick'),
      onErrorOccurred: this._createActionByOption('onErrorOccurred'),
      editing: {
        onDirectoryCreating: this._createActionByOption('onDirectoryCreating'),
        onDirectoryCreated: this._createActionByOption('onDirectoryCreated'),
        onItemRenaming: this._createActionByOption('onItemRenaming'),
        onItemRenamed: this._createActionByOption('onItemRenamed'),
        onItemDeleting: this._createActionByOption('onItemDeleting'),
        onItemDeleted: this._createActionByOption('onItemDeleted'),
        onItemCopying: this._createActionByOption('onItemCopying'),
        onItemCopied: this._createActionByOption('onItemCopied'),
        onItemMoving: this._createActionByOption('onItemMoving'),
        onItemMoved: this._createActionByOption('onItemMoved'),
        onFileUploading: this._createActionByOption('onFileUploading'),
        onFileUploaded: this._createActionByOption('onFileUploaded'),
        onItemDownloading: this._createActionByOption('onItemDownloading')
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  executeCommand(commandName) {
    var _this$_commandManager5;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_commandManager5 = this._commandManager) === null || _this$_commandManager5 === void 0 ? void 0 : _this$_commandManager5.executeCommand(commandName);
  }
  _setCurrentDirectory(directoryInfo, checkActuality) {
    var _this$_controller1;
    (_this$_controller1 = this._controller) === null || _this$_controller1 === void 0 || _this$_controller1.setCurrentDirectory(directoryInfo, checkActuality);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCurrentDirectory() {
    var _this$_controller10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_controller10 = this._controller) === null || _this$_controller10 === void 0 ? void 0 : _this$_controller10.getCurrentDirectory();
  }
  _onControllerInitialized(_ref8) {
    let {
      controller
    } = _ref8;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._controller = this._controller || controller;
    this._syncToCurrentDirectory();
  }
  _onDataLoading(_ref9) {
    var _this$_itemView4;
    let {
      operation
    } = _ref9;
    let options = null;
    const {
      selectedItemKeys
    } = this.option();
    if (operation === OPERATIONS.NAVIGATION) {
      options = {
        focusedItemKey: this._itemKeyToFocus,
        selectedItemKeys
      };
      this._itemKeyToFocus = undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_itemView4 = this._itemView) === null || _this$_itemView4 === void 0 || _this$_itemView4.refresh(options, operation);
  }
  _onSelectedDirectoryChanged() {
    var _this$_actions$onCurr, _this$_actions7;
    const currentDirectory = this._getCurrentDirectory();
    this._syncToCurrentDirectory();
    (_this$_actions$onCurr = (_this$_actions7 = this._actions).onCurrentDirectoryChanged) === null || _this$_actions$onCurr === void 0 || _this$_actions$onCurr.call(_this$_actions7, {
      directory: currentDirectory.fileItem
    });
  }
  _syncToCurrentDirectory() {
    const currentDirectory = this._getCurrentDirectory();
    if (this._filesTreeView) {
      this._filesTreeView.updateCurrentDirectory();
    }
    if (this._breadcrumbs) {
      this._breadcrumbs.setCurrentDirectory(currentDirectory);
    }
    this._checkPathActuality();
  }
  _checkPathActuality() {
    var _this$_controller11, _this$_controller12;
    if (this._lockCurrentPathProcessing) {
      return;
    }
    const currentPath = (_this$_controller11 = this._controller) === null || _this$_controller11 === void 0 ? void 0 : _this$_controller11.getCurrentPath();
    const currentPathKeys = (_this$_controller12 = this._controller) === null || _this$_controller12 === void 0 ? void 0 : _this$_controller12.getCurrentPathKeys();
    const options = {};
    const {
      currentPath: currentPathOption,
      currentPathKeys: currentPathKeysOption
    } = this.option();
    if (currentPathOption !== currentPath) {
      options.currentPath = currentPath;
    }
    if (!equalByValue(currentPathKeysOption, currentPathKeys)) {
      options.currentPathKeys = currentPathKeys;
    }
    if (!isEmptyObject(options)) {
      this.option(options);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getDirectories(parentDirectoryInfo, skipNavigationOnError) {
    var _this$_controller13;
    return (_this$_controller13 = this._controller) === null || _this$_controller13 === void 0 ? void 0 : _this$_controller13.getDirectories(parentDirectoryInfo, skipNavigationOnError);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getSelectedItemInfos() {
    return this._itemView ? this._itemView.getSelectedItems() : [];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  refresh() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.executeCommand('refresh');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getCurrentDirectory() {
    const directoryInfo = this._getCurrentDirectory();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (directoryInfo === null || directoryInfo === void 0 ? void 0 : directoryInfo.fileItem) || null;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSelectedItems() {
    var _this$_getSelectedIte;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_getSelectedIte = this._getSelectedItemInfos()) === null || _this$_getSelectedIte === void 0 ? void 0 : _this$_getSelectedIte.map(itemInfo => itemInfo.fileItem);
  }
  _onSelectedItemOpened(_ref0) {
    let {
      fileItemInfo
    } = _ref0;
    const {
      fileItem
    } = fileItemInfo;
    if (!fileItem.isDirectory) {
      var _this$_actions$onSele2, _this$_actions8;
      (_this$_actions$onSele2 = (_this$_actions8 = this._actions).onSelectedFileOpened) === null || _this$_actions$onSele2 === void 0 || _this$_actions$onSele2.call(_this$_actions8, {
        file: fileItem
      });
      return;
    }
    if (fileItem.isParentFolder) {
      this._itemKeyToFocus = this._getCurrentDirectory().fileItem.key;
    }
    const newCurrentDirectory = fileItem.isParentFolder ? this._getCurrentDirectory().parentDirectory : fileItemInfo;
    this._setCurrentDirectory(newCurrentDirectory);
    if (newCurrentDirectory) {
      var _this$_filesTreeView3;
      (_this$_filesTreeView3 = this._filesTreeView) === null || _this$_filesTreeView3 === void 0 || _this$_filesTreeView3.toggleDirectoryExpandedState(newCurrentDirectory.parentDirectory, true);
    }
  }
}
registerComponent('dxFileManager', FileManager);
export default FileManager;
