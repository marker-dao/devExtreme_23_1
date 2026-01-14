/**
* DevExtreme (cjs/__internal/ui/file_manager/ui.file_manager.files_tree_view.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _icon = require("../../../core/utils/icon");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _tree_view = _interopRequireDefault(require("../../../ui/tree_view"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _uiFile_manager = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.file_actions_button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FILE_MANAGER_DIRS_TREE_CLASS = 'dx-filemanager-dirs-tree';
const FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS = 'dx-filemanager-focused-item';
const FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS = 'dx-filemanager-dirs-tree-item-text';
const TREE_VIEW_ITEM_CLASS = 'dx-treeview-item';
class FileManagerFilesTreeView extends _widget.default {
  _initMarkup() {
    this._initActions();
    const {
      getCurrentDirectory,
      storeExpandedState
    } = this.option();
    this._getCurrentDirectory = getCurrentDirectory;
    this._createFileActionsButton = _common.noop;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._storeExpandedState = storeExpandedState || false;
    const $treeView = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_DIRS_TREE_CLASS).appendTo(this.$element());
    const treeViewOptions = {
      dataStructure: 'plain',
      rootValue: '',
      createChildren: this._onFilesTreeViewCreateSubDirectories.bind(this),
      itemTemplate: this._createFilesTreeViewItemTemplate.bind(this),
      keyExpr: 'getInternalKey',
      parentIdExpr: 'parentDirectory.getInternalKey',
      // eslint-disable-next-line @stylistic/max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/explicit-function-return-type
      displayExpr: itemInfo => itemInfo.getDisplayName(),
      hasItemsExpr: 'fileItem.hasSubDirectories',
      onItemClick: e => {
        var _this$_actions$onDire, _this$_actions;
        return (_this$_actions$onDire = (_this$_actions = this._actions).onDirectoryClick) === null || _this$_actions$onDire === void 0 ? void 0 : _this$_actions$onDire.call(_this$_actions, e);
      },
      onItemExpanded: e => this._onFilesTreeViewItemExpanded(e),
      onItemCollapsed: e => this._onFilesTreeViewItemCollapsed(e),
      onItemRendered: e => this._onFilesTreeViewItemRendered(e),
      onContentReady: () => {
        var _this$_actions$onFile, _this$_actions2;
        return (_this$_actions$onFile = (_this$_actions2 = this._actions).onFilesTreeViewContentReady) === null || _this$_actions$onFile === void 0 ? void 0 : _this$_actions$onFile.call(_this$_actions2);
      }
    };
    if (this._contextMenu) {
      this._contextMenu.option('onContextMenuHidden', () => this._onContextMenuHidden());
      // @ts-expect-error ts-error
      treeViewOptions.onItemContextMenu = e => this._onFilesTreeViewItemContextMenu(e);
      this._createFileActionsButton = (element, options) => this._createComponent(element, _uiFile_manager.default, options);
    }
    this._filesTreeView = this._createComponent($treeView, _tree_view.default, treeViewOptions);
  }
  _initActions() {
    this._actions = {
      onDirectoryClick: this._createActionByOption('onDirectoryClick'),
      onFilesTreeViewContentReady: this._createActionByOption('onFilesTreeViewContentReady')
    };
  }
  _render() {
    super._render();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => {
      that._updateFocusedElement();
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _onFilesTreeViewCreateSubDirectories(rootItem) {
    const {
      getDirectories
    } = this.option();
    const directoryInfo = (rootItem === null || rootItem === void 0 ? void 0 : rootItem.itemData) || null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getDirectories === null || getDirectories === void 0 ? void 0 : getDirectories(directoryInfo, true);
  }
  _onFilesTreeViewItemRendered(_ref) {
    let {
      itemData
    } = _ref;
    const currentDirectory = this._getCurrentDirectory();
    if (currentDirectory !== null && currentDirectory !== void 0 && currentDirectory.fileItem.equals(itemData.fileItem)) {
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
    const $itemElement = (0, _renderer.default)(itemElement);
    const $itemWrapper = $itemElement.closest(this._filesTreeViewItemSelector);
    $itemWrapper.data('item', itemData);
    const $image = (0, _icon.getImageContainer)(itemData.icon);
    const $text = (0, _renderer.default)('<span>').text(itemData.getDisplayName()).addClass(FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS);
    const $button = (0, _renderer.default)('<div>');
    // @ts-expect-error ts-error
    $itemElement.append($image, $text, $button);
    this._createFileActionsButton($button, {
      onClick: e => this._onFileItemActionButtonClick(e)
    });
  }
  _onFilesTreeViewItemContextMenu(_ref4) {
    var _this$_contextMenu;
    let {
      itemElement,
      event
    } = _ref4;
    event.preventDefault();
    event.stopPropagation();
    const itemData = (0, _renderer.default)(itemElement).data('item');
    (_this$_contextMenu = this._contextMenu) === null || _this$_contextMenu === void 0 || _this$_contextMenu.showAt([itemData], itemElement, event, {
      itemData,
      itemElement
    });
  }
  _onFileItemActionButtonClick(_ref5) {
    var _this$_contextMenu2;
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
    (_this$_contextMenu2 = this._contextMenu) === null || _this$_contextMenu2 === void 0 || _this$_contextMenu2.showAt([itemData], element, event, target);
    this._activeFileActionsButton = component;
    this._activeFileActionsButton.setActive(true);
  }
  _onContextMenuHidden() {
    if (this._activeFileActionsButton) {
      this._activeFileActionsButton.setActive(false);
    }
  }
  toggleNodeDisabledState(key, state) {
    var _this$_filesTreeView;
    const node = this._getNodeByKey(key);
    if (!node) {
      return;
    }
    const items = (_this$_filesTreeView = this._filesTreeView) === null || _this$_filesTreeView === void 0 ? void 0 : _this$_filesTreeView.option('items');
    const itemIndex = items
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    === null || items
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    === void 0 ? void 0 : items
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map(item => item.getInternalKey()).indexOf(node.getInternalKey());
    if (itemIndex !== -1) {
      var _this$_filesTreeView2;
      (_this$_filesTreeView2 = this._filesTreeView) === null || _this$_filesTreeView2 === void 0 || _this$_filesTreeView2.option(`items[${itemIndex}].disabled`, state);
    }
  }
  _saveScrollTopPosition() {
    var _this$_filesTreeView3;
    if (!(0, _window.hasWindow)()) {
      return;
    }
    this._scrollTopPosition = (_this$_filesTreeView3 = this._filesTreeView) === null || _this$_filesTreeView3 === void 0 ? void 0 : _this$_filesTreeView3.getScrollable().scrollTop();
  }
  _restoreScrollTopPosition() {
    if (!(0, _window.hasWindow)() || !(0, _type.isNumeric)(this._scrollTopPosition)) {
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => {
      var _this$_filesTreeView4;
      return (_this$_filesTreeView4 = this._filesTreeView) === null || _this$_filesTreeView4 === void 0 ? void 0 : _this$_filesTreeView4.getScrollable().scrollTo(this._scrollTopPosition);
    });
  }
  _updateFocusedElement() {
    var _this$_$focusedElemen;
    const directoryInfo = this._getCurrentDirectory();
    const $element = this._getItemElementByKey(directoryInfo === null || directoryInfo === void 0 ? void 0 : directoryInfo.getInternalKey());
    if (this._$focusedElement) {
      this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, false);
    }
    this._$focusedElement = $element || (0, _renderer.default)();
    (_this$_$focusedElemen = this._$focusedElement) === null || _this$_$focusedElemen === void 0 || _this$_$focusedElemen.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, true);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getNodeByKey(key) {
    var _this$_filesTreeView5;
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_filesTreeView5 = this._filesTreeView) === null || _this$_filesTreeView5 === void 0 ? void 0 : _this$_filesTreeView5._getNode(key);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPublicNode(key) {
    var _this$_filesTreeView6;
    // @ts-expect-error ts-error
    // eslint-disable-next-line no-unsafe-optional-chaining
    const nodesQueue = [...((_this$_filesTreeView6 = this._filesTreeView) === null || _this$_filesTreeView6 === void 0 ? void 0 : _this$_filesTreeView6.getNodes())];
    while (nodesQueue.length) {
      const node = nodesQueue.shift();
      if (node.itemData.getInternalKey() === key) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return node;
      }
      if (node.children.length) {
        nodesQueue.push(...node.children);
      }
    }
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemElementByKey(key) {
    const node = this._getNodeByKey(key);
    if (node) {
      var _this$_filesTreeView7;
      // @ts-expect-error ts-error
      const $node = (_this$_filesTreeView7 = this._filesTreeView) === null || _this$_filesTreeView7 === void 0 ? void 0 : _this$_filesTreeView7._getNodeElement(node);
      if ($node) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return $node.children(this._filesTreeViewItemSelector);
      }
    }
    return null;
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      storeExpandedState: false,
      initialFolder: undefined,
      contextMenu: undefined,
      getItems: undefined,
      getCurrentDirectory: undefined,
      onDirectoryClick: undefined
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'storeExpandedState':
        // @ts-expect-error ts-error
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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get _contextMenu() {
    const {
      contextMenu
    } = this.option();
    return contextMenu;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  toggleDirectoryExpandedState(directoryInfo, state) {
    var _this$_filesTreeView8;
    // @ts-expect-error ts-error
    const deferred = new _deferred.Deferred();
    const treeViewNode = this._getPublicNode(directoryInfo === null || directoryInfo === void 0 ? void 0 : directoryInfo.getInternalKey());
    if (!treeViewNode) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return deferred.reject().promise();
    }
    if (treeViewNode.expanded === state || treeViewNode.itemsLoaded && !treeViewNode.itemData.fileItem.hasSubDirectories) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return deferred.resolve().promise();
    }
    const action = state ? 'expandItem' : 'collapseItem';
    return (_this$_filesTreeView8 = this._filesTreeView) === null || _this$_filesTreeView8 === void 0 ? void 0 : _this$_filesTreeView8[action](directoryInfo.getInternalKey());
  }
  refresh() {
    var _this$_filesTreeView9;
    this._$focusedElement = null;
    this._saveScrollTopPosition();
    (_this$_filesTreeView9 = this._filesTreeView) === null || _this$_filesTreeView9 === void 0 || _this$_filesTreeView9.option('dataSource', []);
  }
  updateCurrentDirectory() {
    if (this._disposed) {
      return;
    }
    this._updateFocusedElement();
    if (this._storeExpandedState) {
      this._updateExpandedStateToCurrentDirectory();
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _updateExpandedStateToCurrentDirectory() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.toggleDirectoryExpandedStateRecursive(this._getCurrentDirectory().parentDirectory, true);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  toggleDirectoryExpandedStateRecursive(directoryInfo, state) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dirLine = [];
    for (let dirInfo = directoryInfo; dirInfo; dirInfo = dirInfo.parentDirectory) {
      dirLine.unshift(dirInfo);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.toggleDirectoryLineExpandedState(dirLine, state);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  toggleDirectoryLineExpandedState(dirLine, state) {
    if (!dirLine.length) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().resolve().promise();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.toggleDirectoryExpandedState(dirLine.shift(), state)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then(() => this.toggleDirectoryLineExpandedState(dirLine, state));
  }
}
var _default = exports.default = FileManagerFilesTreeView;
