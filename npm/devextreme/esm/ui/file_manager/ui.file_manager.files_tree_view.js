/**
* DevExtreme (esm/ui/file_manager/ui.file_manager.files_tree_view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
import { getImageContainer } from '../../core/utils/icon';
import { noop } from '../../core/utils/common';
import Widget from '../widget/ui.widget';
import TreeViewSearch from '../tree_view';
import FileManagerFileActionsButton from './ui.file_manager.file_actions_button';
import { Deferred } from '../../core/utils/deferred';
import { hasWindow } from '../../core/utils/window';
import { isNumeric } from '../../core/utils/type';
const FILE_MANAGER_DIRS_TREE_CLASS = 'dx-filemanager-dirs-tree';
const FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS = 'dx-filemanager-focused-item';
const FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS = 'dx-filemanager-dirs-tree-item-text';
const TREE_VIEW_ITEM_CLASS = 'dx-treeview-item';
class FileManagerFilesTreeView extends Widget {
  _initMarkup() {
    this._initActions();
    this._getCurrentDirectory = this.option('getCurrentDirectory');
    this._createFileActionsButton = noop;
    this._storeExpandedState = this.option('storeExpandedState') || false;
    const $treeView = $('<div>').addClass(FILE_MANAGER_DIRS_TREE_CLASS).appendTo(this.$element());
    const treeViewOptions = {
      dataStructure: 'plain',
      rootValue: '',
      createChildren: this._onFilesTreeViewCreateSubDirectories.bind(this),
      itemTemplate: this._createFilesTreeViewItemTemplate.bind(this),
      keyExpr: 'getInternalKey',
      parentIdExpr: 'parentDirectory.getInternalKey',
      displayExpr: itemInfo => itemInfo.getDisplayName(),
      hasItemsExpr: 'fileItem.hasSubDirectories',
      onItemClick: e => this._actions.onDirectoryClick(e),
      onItemExpanded: e => this._onFilesTreeViewItemExpanded(e),
      onItemCollapsed: e => this._onFilesTreeViewItemCollapsed(e),
      onItemRendered: e => this._onFilesTreeViewItemRendered(e),
      onContentReady: () => this._actions.onFilesTreeViewContentReady()
    };
    if (this._contextMenu) {
      this._contextMenu.option('onContextMenuHidden', () => this._onContextMenuHidden());
      treeViewOptions.onItemContextMenu = e => this._onFilesTreeViewItemContextMenu(e);
      this._createFileActionsButton = (element, options) => this._createComponent(element, FileManagerFileActionsButton, options);
    }
    this._filesTreeView = this._createComponent($treeView, TreeViewSearch, treeViewOptions);
  }
  _initActions() {
    this._actions = {
      onDirectoryClick: this._createActionByOption('onDirectoryClick'),
      onFilesTreeViewContentReady: this._createActionByOption('onFilesTreeViewContentReady')
    };
  }
  _render() {
    super._render();
    const that = this;
    setTimeout(() => {
      that._updateFocusedElement();
    });
  }
  _onFilesTreeViewCreateSubDirectories(rootItem) {
    const getDirectories = this.option('getDirectories');
    const directoryInfo = rootItem && rootItem.itemData || null;
    return getDirectories && getDirectories(directoryInfo, true);
  }
  _onFilesTreeViewItemRendered(_ref) {
    let {
      itemData
    } = _ref;
    const currentDirectory = this._getCurrentDirectory();
    if (currentDirectory && currentDirectory.fileItem.equals(itemData.fileItem)) {
      this._updateFocusedElement();
      this._restoreScrollTopPosition();
    }
  }
  _onFilesTreeViewItemExpanded(_ref2) {
    let {
      itemData
    } = _ref2;
    if (this._storeExpandedState) {
      itemData.expanded = true;
    }
  }
  _onFilesTreeViewItemCollapsed(_ref3) {
    let {
      itemData
    } = _ref3;
    if (this._storeExpandedState) {
      itemData.expanded = false;
    }
  }
  _createFilesTreeViewItemTemplate(itemData, itemIndex, itemElement) {
    const $itemElement = $(itemElement);
    const $itemWrapper = $itemElement.closest(this._filesTreeViewItemSelector);
    $itemWrapper.data('item', itemData);
    const $image = getImageContainer(itemData.icon);
    const $text = $('<span>').text(itemData.getDisplayName()).addClass(FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS);
    const $button = $('<div>');
    $itemElement.append($image, $text, $button);
    this._createFileActionsButton($button, {
      onClick: e => this._onFileItemActionButtonClick(e)
    });
  }
  _onFilesTreeViewItemContextMenu(_ref4) {
    let {
      itemElement,
      event
    } = _ref4;
    event.preventDefault();
    event.stopPropagation();
    const itemData = $(itemElement).data('item');
    this._contextMenu.showAt([itemData], itemElement, event, {
      itemData,
      itemElement
    });
  }
  _onFileItemActionButtonClick(_ref5) {
    let {
      component,
      element,
      event
    } = _ref5;
    event.stopPropagation();
    const itemElement = component.$element().closest(this._filesTreeViewItemSelector);
    const itemData = itemElement.data('item');
    const target = {
      itemData,
      itemElement,
      isActionButton: true
    };
    this._contextMenu.showAt([itemData], element, event, target);
    this._activeFileActionsButton = component;
    this._activeFileActionsButton.setActive(true);
  }
  _onContextMenuHidden() {
    if (this._activeFileActionsButton) {
      this._activeFileActionsButton.setActive(false);
    }
  }
  toggleNodeDisabledState(key, state) {
    const node = this._getNodeByKey(key);
    if (!node) {
      return;
    }
    const items = this._filesTreeView.option('items');
    const itemIndex = items.map(item => item.getInternalKey()).indexOf(node.getInternalKey());
    if (itemIndex !== -1) {
      this._filesTreeView.option(`items[${itemIndex}].disabled`, state);
    }
  }
  _saveScrollTopPosition() {
    if (!hasWindow()) {
      return;
    }
    this._scrollTopPosition = this._filesTreeView.getScrollable().scrollTop();
  }
  _restoreScrollTopPosition() {
    if (!hasWindow() || !isNumeric(this._scrollTopPosition)) {
      return;
    }
    setTimeout(() => this._filesTreeView.getScrollable().scrollTo(this._scrollTopPosition));
  }
  _updateFocusedElement() {
    const directoryInfo = this._getCurrentDirectory();
    const $element = this._getItemElementByKey(directoryInfo === null || directoryInfo === void 0 ? void 0 : directoryInfo.getInternalKey());
    if (this._$focusedElement) {
      this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, false);
    }
    this._$focusedElement = $element || $();
    this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, true);
  }
  _getNodeByKey(key) {
    var _this$_filesTreeView;
    return (_this$_filesTreeView = this._filesTreeView) === null || _this$_filesTreeView === void 0 ? void 0 : _this$_filesTreeView._getNode(key);
  }
  _getPublicNode(key) {
    var _this$_filesTreeView2;
    const nodesQueue = [...((_this$_filesTreeView2 = this._filesTreeView) === null || _this$_filesTreeView2 === void 0 ? void 0 : _this$_filesTreeView2.getNodes())];
    while (nodesQueue.length) {
      const node = nodesQueue.shift();
      if (node.itemData.getInternalKey() === key) {
        return node;
      } else if (node.children.length) {
        nodesQueue.push(...node.children);
      }
    }
    return undefined;
  }
  _getItemElementByKey(key) {
    const node = this._getNodeByKey(key);
    if (node) {
      const $node = this._filesTreeView._getNodeElement(node);
      if ($node) {
        return $node.children(this._filesTreeViewItemSelector);
      }
    }
    return null;
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      storeExpandedState: false,
      initialFolder: null,
      contextMenu: null,
      getItems: null,
      getCurrentDirectory: null,
      onDirectoryClick: null
    });
  }
  _optionChanged(args) {
    const name = args.name;
    switch (name) {
      case 'storeExpandedState':
        this._storeExpandedState = this.option(name);
        break;
      case 'getItems':
      case 'rootFolderDisplayName':
      case 'initialFolder':
      case 'contextMenu':
        this.repaint();
        break;
      case 'getCurrentDirectory':
        this.getCurrentDirectory = this.option(name);
        break;
      case 'onDirectoryClick':
      case 'onFilesTreeViewContentReady':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
  get _filesTreeViewItemSelector() {
    return `.${TREE_VIEW_ITEM_CLASS}`;
  }
  get _contextMenu() {
    return this.option('contextMenu');
  }
  toggleDirectoryExpandedState(directoryInfo, state) {
    const deferred = new Deferred();
    const treeViewNode = this._getPublicNode(directoryInfo === null || directoryInfo === void 0 ? void 0 : directoryInfo.getInternalKey());
    if (!treeViewNode) {
      return deferred.reject().promise();
    }
    if (treeViewNode.expanded === state || treeViewNode.itemsLoaded && !treeViewNode.itemData.fileItem.hasSubDirectories) {
      return deferred.resolve().promise();
    }
    const action = state ? 'expandItem' : 'collapseItem';
    return this._filesTreeView[action](directoryInfo.getInternalKey());
  }
  refresh() {
    this._$focusedElement = null;
    this._saveScrollTopPosition();
    this._filesTreeView.option('dataSource', []);
  }
  updateCurrentDirectory() {
    if (this._disposed) {
      return;
    }
    this._updateFocusedElement();
    this._storeExpandedState && this._updateExpandedStateToCurrentDirectory();
  }
  _updateExpandedStateToCurrentDirectory() {
    return this.toggleDirectoryExpandedStateRecursive(this._getCurrentDirectory().parentDirectory, true);
  }
  toggleDirectoryExpandedStateRecursive(directoryInfo, state) {
    const dirLine = [];
    for (let dirInfo = directoryInfo; dirInfo; dirInfo = dirInfo.parentDirectory) {
      dirLine.unshift(dirInfo);
    }
    return this.toggleDirectoryLineExpandedState(dirLine, state);
  }
  toggleDirectoryLineExpandedState(dirLine, state) {
    if (!dirLine.length) {
      return new Deferred().resolve().promise();
    }
    return this.toggleDirectoryExpandedState(dirLine.shift(), state).then(() => this.toggleDirectoryLineExpandedState(dirLine, state));
  }
}
export default FileManagerFilesTreeView;
