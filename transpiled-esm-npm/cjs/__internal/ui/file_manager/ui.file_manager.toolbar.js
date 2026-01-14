"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../ui/drop_down_button");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _themes = require("../../../ui/themes");
var _toolbar = _interopRequireDefault(require("../../../ui/toolbar"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _uiFile_manager = require("../../ui/file_manager/ui.file_manager.common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const FILE_MANAGER_TOOLBAR_CLASS = 'dx-filemanager-toolbar';
const FILE_MANAGER_GENERAL_TOOLBAR_CLASS = 'dx-filemanager-general-toolbar';
const FILE_MANAGER_FILE_TOOLBAR_CLASS = 'dx-filemanager-file-toolbar';
const FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS = `${FILE_MANAGER_TOOLBAR_CLASS}-separator-item`;
const FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS = `${FILE_MANAGER_TOOLBAR_CLASS}-viewmode-item`;
const FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS = `${FILE_MANAGER_TOOLBAR_CLASS}-has-large-icon`;
const FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS = 'dx-filemanager-view-switcher-popup';
const DEFAULT_ITEM_CONFIGS = {
  showNavPane: {
    location: 'before'
  },
  create: {
    location: 'before',
    compactMode: {
      showText: 'inMenu',
      locateInMenu: 'auto'
    }
  },
  upload: {
    location: 'before',
    compactMode: {
      showText: 'inMenu',
      locateInMenu: 'auto'
    }
  },
  refresh: {
    location: 'after',
    showText: 'inMenu',
    cssClass: FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS,
    compactMode: {
      showText: 'inMenu',
      locateInMenu: 'auto'
    }
  },
  switchView: {
    location: 'after'
  },
  download: {
    location: 'before',
    compactMode: {
      showText: 'inMenu',
      locateInMenu: 'auto'
    }
  },
  move: {
    location: 'before',
    compactMode: {
      showText: 'inMenu',
      locateInMenu: 'auto'
    }
  },
  copy: {
    location: 'before',
    compactMode: {
      showText: 'inMenu',
      locateInMenu: 'auto'
    }
  },
  rename: {
    location: 'before',
    compactMode: {
      showText: 'inMenu',
      locateInMenu: 'auto'
    }
  },
  delete: {
    location: 'before',
    compactMode: {
      showText: 'inMenu'
    }
  },
  clearSelection: {
    location: 'after',
    locateInMenu: 'never',
    compactMode: {
      showText: 'inMenu'
    }
  },
  separator: {
    location: 'before'
  }
};
const DEFAULT_ITEM_ALLOWED_PROPERTIES = ['visible', 'location', 'locateInMenu', 'disabled', 'showText'];
const DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES = ['accessKey', 'elementAttr', 'height', 'hint', 'icon', 'stylingMode', 'tabIndex', 'text', 'width'];
const ALWAYS_VISIBLE_TOOLBAR_ITEMS = ['separator', 'switchView'];
const REFRESH_ICON_MAP = {
  default: 'dx-filemanager-i dx-filemanager-i-refresh',
  progress: 'dx-filemanager-i dx-filemanager-i-progress',
  success: 'dx-filemanager-i dx-filemanager-i-done',
  error: 'dx-filemanager-i dx-filemanager-i-danger'
};
const REFRESH_ITEM_PROGRESS_MESSAGE_DELAY = 500;
class FileManagerToolbar extends _widget.default {
  _init() {
    super._init();
    this._generalToolbarVisible = true;
    this._refreshItemState = {
      message: '',
      status: 'default'
    };
  }
  _initMarkup() {
    this._createItemClickedAction();
    const {
      generalItems,
      fileItems
    } = this.option();
    this._$viewSwitcherPopup = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS);
    this._generalToolbar = this._createToolbar(generalItems, !this._generalToolbarVisible);
    this._fileToolbar = this._createToolbar(fileItems, this._generalToolbarVisible);
    this._$viewSwitcherPopup.appendTo(this.$element());
    this.$element().addClass(`${FILE_MANAGER_TOOLBAR_CLASS} ${FILE_MANAGER_GENERAL_TOOLBAR_CLASS}`);
  }
  _render() {
    super._render();
    const toolbar = this._getVisibleToolbar();
    this._checkCompactMode(toolbar);
  }
  _clean() {
    // @ts-expect-error ts-error
    delete this._commandManager;
    delete this._itemClickedAction;
    delete this._$viewSwitcherPopup;
    delete this._generalToolbar;
    delete this._fileToolbar;
    super._clean();
  }
  // @ts-expect-error ts-error
  _dimensionChanged(dimension) {
    if (!dimension || dimension !== 'height') {
      const toolbar = this._getVisibleToolbar();
      this._checkCompactMode(toolbar);
    }
  }
  _getVisibleToolbar() {
    return this._generalToolbarVisible ? this._generalToolbar : this._fileToolbar;
  }
  _createToolbar(items, hidden) {
    const toolbarItems = this._getPreparedItems(items);
    const $toolbar = (0, _renderer.default)('<div>').appendTo(this.$element());
    const toolbar = this._createComponent($toolbar, _toolbar.default, {
      items: toolbarItems,
      visible: !hidden,
      onItemClick: args => this._raiseItemClicked(args)
    });
    toolbar.compactMode = false;
    return toolbar;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPreparedItems(items) {
    // eslint-disable-next-line no-param-reassign
    items = items.map(item => {
      let extendedItem = item;
      if ((0, _type.isString)(item)) {
        extendedItem = {
          name: item
        };
      }
      const commandName = extendedItem.name;
      const preparedItem = this._configureItemByCommandName(commandName, extendedItem);
      preparedItem.originalItemData = item;
      if (commandName !== 'separator') {
        this._setItemVisibleAvailable(preparedItem);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return preparedItem;
    });
    this._updateSeparatorsVisibility(items);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items;
  }
  _updateSeparatorsVisibility(items, toolbar) {
    let hasModifications = false;
    const menuItems = this._getMenuItems(toolbar);
    const hasItemsBefore = {
      before: false,
      center: false,
      after: false
    };
    const itemGroups = {
      before: this._getItemsInGroup(items, menuItems, 'before'),
      center: this._getItemsInGroup(items, menuItems, 'center'),
      after: this._getItemsInGroup(items, menuItems, 'after')
    };
    items.forEach(item => {
      const itemLocation = item.location;
      if (item.name === 'separator') {
        const isSeparatorVisible = hasItemsBefore[itemLocation] && this._groupHasItemsAfter(itemGroups[itemLocation]);
        if (item.visible !== isSeparatorVisible) {
          hasModifications = true;
          item.visible = isSeparatorVisible;
        }
        hasItemsBefore[itemLocation] = false;
      } else {
        if (!this._isItemInMenu(menuItems, item)) {
          hasItemsBefore[itemLocation] = hasItemsBefore[itemLocation] || item.visible;
        }
        itemGroups[itemLocation].shift();
      }
    });
    if (toolbar && hasModifications) {
      toolbar.repaint();
    }
    return hasModifications;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getMenuItems(toolbar) {
    const result = toolbar ? toolbar._getMenuItems() : [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.map(menuItem => menuItem.originalItemData);
  }
  _isItemInMenu(menuItems, item) {
    return !!menuItems.length && (0, _common.ensureDefined)(item.locateInMenu, 'never') !== 'never' && menuItems.indexOf(item.originalItemData) !== -1;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemsInGroup(items, menuItems, groupName) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items.filter(item => item.location === groupName && !this._isItemInMenu(menuItems, item));
  }
  _groupHasItemsAfter(items) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].name !== 'separator' && items[i].visible) {
        return true;
      }
    }
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _configureItemByCommandName(commandName, item) {
    var _this$_commandManager, _result$options2;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result = {};
    const command = (_this$_commandManager = this._commandManager) === null || _this$_commandManager === void 0 ? void 0 : _this$_commandManager.getCommandByName(commandName);
    if (command) {
      result = this._createCommandItem(command);
    }
    switch (commandName) {
      case 'separator':
        result = this._createSeparatorItem();
        break;
      case 'switchView':
        result = this._createViewModeItem();
        break;
      default:
        break;
    }
    if (this._isDefaultItem(commandName)) {
      const defaultConfig = DEFAULT_ITEM_CONFIGS[commandName];
      (0, _extend.extend)(true, result, defaultConfig);
      let resultCssClass = result.cssClass || '';
      (0, _uiFile_manager.extendAttributes)(result, item, DEFAULT_ITEM_ALLOWED_PROPERTIES);
      if ((0, _type.isDefined)(item.options)) {
        (0, _uiFile_manager.extendAttributes)(result.options, item.options, DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES);
      }
      (0, _uiFile_manager.extendAttributes)(result.options, item, ['text', 'icon']);
      if (item.cssClass) {
        resultCssClass = `${resultCssClass} ${item.cssClass}`;
      }
      if (resultCssClass) {
        result.cssClass = resultCssClass;
      }
      if (!(0, _type.isDefined)(item.visible)) {
        result._autoHide = true;
      }
      if (result.widget === 'dxButton') {
        if (result.showText === 'inMenu' && !(0, _type.isDefined)(result.options.hint)) {
          result.options.hint = result.options.text;
        }
        if (result.compactMode && !(0, _type.isDefined)(result.options.hint)) {
          this._configureHintForCompactMode(result);
        }
      }
    } else {
      var _result$options;
      (0, _extend.extend)(true, result, item);
      if (!result.widget) {
        result.widget = 'dxButton';
      }
      if (result.widget === 'dxButton' && !result.compactMode && !result.showText && (_result$options = result.options) !== null && _result$options !== void 0 && _result$options.icon && result.options.text) {
        result.compactMode = {
          showText: 'inMenu'
        };
      }
    }
    if (commandName && !result.name) {
      (0, _extend.extend)(result, {
        name: commandName
      });
    }
    result.location = (0, _common.ensureDefined)(result.location, 'before');
    if (!(0, _type.isDefined)((_result$options2 = result.options) === null || _result$options2 === void 0 ? void 0 : _result$options2.stylingMode)) {
      if (result.widget === 'dxButton') {
        (0, _extend.extend)(true, result, {
          options: {
            stylingMode: 'text'
          }
        });
      }
      if (result.widget === 'dxSelectBox') {
        (0, _extend.extend)(true, result, {
          options: {
            stylingMode: 'filled'
          }
        });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  _isDefaultItem(commandName) {
    return !!DEFAULT_ITEM_CONFIGS[commandName];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createCommandItem(command) {
    return {
      widget: 'dxButton',
      options: {
        text: command.text,
        hint: command.hint,
        commandText: command.text,
        icon: command.icon,
        stylingMode: 'text',
        onClick: () => this._executeCommand(command)
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createSeparatorItem() {
    return {
      template: (_, __, element) => {
        (0, _renderer.default)(element).addClass(FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS);
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createViewModeItem() {
    const commandItems = ['details', 'thumbnails'].map(name => {
      var _this$_commandManager2;
      const {
        text,
        icon
      } = ((_this$_commandManager2 = this._commandManager) === null || _this$_commandManager2 === void 0 ? void 0 : _this$_commandManager2.getCommandByName(name)) ?? {};
      return {
        name,
        text,
        icon
      };
    });
    const {
      itemViewMode
    } = this.option();
    const selectedIndex = itemViewMode === 'thumbnails' ? 1 : 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dropDownOptions = {
      container: this._$viewSwitcherPopup
    };
    if ((0, _themes.isMaterial)((0, _themes.current)())) {
      dropDownOptions.width = (0, _themes.isCompact)((0, _themes.current)()) ? 28 : 36;
    } else if ((0, _themes.isFluent)((0, _themes.current)())) {
      dropDownOptions.width = (0, _themes.isCompact)((0, _themes.current)()) ? 34 : 40;
    }
    return {
      cssClass: FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS,
      widget: 'dxDropDownButton',
      options: {
        items: commandItems,
        keyExpr: 'name',
        selectedItemKey: itemViewMode,
        displayExpr: ' ',
        hint: commandItems[selectedIndex].text,
        stylingMode: 'text',
        showArrowIcon: false,
        useSelectMode: true,
        dropDownOptions,
        onItemClick: e => this._executeCommand(e.itemData.name)
      }
    };
  }
  _configureHintForCompactMode(item) {
    item.options.hint = '';
    item.compactMode.options = item.compactMode.options || {};
    item.compactMode.options.hint = item.options.text;
  }
  _checkCompactMode(toolbar) {
    if (toolbar.compactMode) {
      this._toggleCompactMode(toolbar, false);
    }
    const useCompactMode = this._toolbarHasItemsOverflow(toolbar);
    if (toolbar.compactMode !== useCompactMode) {
      if (!toolbar.compactMode) {
        this._toggleCompactMode(toolbar, useCompactMode);
      }
      toolbar.compactMode = useCompactMode;
    } else if (toolbar.compactMode) {
      this._toggleCompactMode(toolbar, true);
    }
  }
  _toolbarHasItemsOverflow(toolbar) {
    const toolbarWidth = (0, _size.getWidth)(toolbar.$element());
    const itemsWidth = toolbar._getItemsWidth();
    return toolbarWidth < itemsWidth;
  }
  _toggleCompactMode(toolbar, useCompactMode) {
    let hasModifications = false;
    const {
      items
    } = toolbar.option();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items === null || items === void 0 || items.forEach(item => {
      if (item.compactMode) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let optionsSource = null;
        if (useCompactMode) {
          item.saved = this._getCompactModeOptions(item, item._available);
          optionsSource = item.compactMode;
        } else {
          optionsSource = item.saved;
        }
        const options = this._getCompactModeOptions(optionsSource, item._available);
        (0, _extend.extend)(true, item, options);
        hasModifications = true;
      }
    });
    hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
    if (hasModifications) {
      toolbar.repaint();
    }
    this._updateSeparatorsVisibility(items, toolbar);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCompactModeOptions(optionsSource, available) {
    const {
      showText,
      locateInMenu,
      options
    } = optionsSource || {};
    return {
      visible: available,
      showText: (0, _common.ensureDefined)(showText, 'always'),
      locateInMenu: (0, _common.ensureDefined)(locateInMenu, 'never'),
      options: {
        hint: options === null || options === void 0 ? void 0 : options.hint
      }
    };
  }
  _ensureAvailableCommandsVisible(toolbar) {
    let hasModifications = false;
    const items = toolbar.option('items');
    items.forEach(item => {
      if (item.name !== 'separator') {
        const itemVisible = item._available;
        this._setItemVisibleAvailable(item);
        if (item._available !== itemVisible) {
          hasModifications = true;
        }
      }
    });
    hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
    if (hasModifications) {
      toolbar.repaint();
    }
    this._updateSeparatorsVisibility(items, toolbar);
  }
  _setItemVisibleAvailable(item) {
    var _item$originalItemDat;
    const originalVisible = (_item$originalItemDat = item.originalItemData) === null || _item$originalItemDat === void 0 ? void 0 : _item$originalItemDat.visible;
    item._available = this._isToolbarItemAvailable(item);
    item.visible = (0, _type.isDefined)(originalVisible) ? originalVisible : item._available;
  }
  _fileToolbarHasEffectiveItems() {
    var _this$_fileToolbar;
    const {
      items
    } = ((_this$_fileToolbar = this._fileToolbar) === null || _this$_fileToolbar === void 0 ? void 0 : _this$_fileToolbar.option()) ?? {};
    return items === null || items === void 0 ? void 0 : items.some(item => this._isFileToolbarItemAvailable(item));
  }
  _executeCommand(command) {
    var _this$_commandManager3;
    (_this$_commandManager3 = this._commandManager) === null || _this$_commandManager3 === void 0 || _this$_commandManager3.executeCommand(command);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _isToolbarItemAvailable(toolbarItem) {
    if (!this._isDefaultItem(toolbarItem.name) || !toolbarItem._autoHide) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (0, _common.ensureDefined)(toolbarItem.visible, true);
    }
    if (toolbarItem.name === 'refresh') {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      return this._generalToolbarVisible || !!this._isRefreshVisibleInFileToolbar;
    }
    if (ALWAYS_VISIBLE_TOOLBAR_ITEMS.includes(toolbarItem.name)) {
      return true;
    }
    return this._isCommandAvailable(toolbarItem.name);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _isFileToolbarItemAvailable(_ref) {
    let {
      name,
      visible
    } = _ref;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return !this._isDefaultItem(name)
    // eslint-disable-next-line @stylistic/no-mixed-operators
    && (0, _common.ensureDefined)(visible, true)
    // eslint-disable-next-line @stylistic/no-mixed-operators
    || name !== 'clearSelection' && name !== 'refresh'
    // eslint-disable-next-line @stylistic/no-mixed-operators
    && this._isCommandAvailable(name);
  }
  _isCommandAvailable(name) {
    var _this$_commandManager4;
    const {
      contextItems
    } = this.option();
    return !!((_this$_commandManager4 = this._commandManager) !== null && _this$_commandManager4 !== void 0 && _this$_commandManager4.isCommandAvailable(name, contextItems));
  }
  _updateItemInToolbar(toolbar, commandName, options) {
    toolbar.beginUpdate();
    const {
      items
    } = toolbar.option();
    if (items !== null && items !== void 0 && items.length) {
      for (let i = 0; i < (items === null || items === void 0 ? void 0 : items.length); i += 1) {
        const item = items === null || items === void 0 ? void 0 : items[i];
        if (item.name === commandName) {
          toolbar.option(`items[${i}]`, options);
          break;
        }
      }
    }
    toolbar.endUpdate();
  }
  _raiseItemClicked(args) {
    var _this$_itemClickedAct;
    const changedArgs = (0, _extend.extend)(true, {}, args);
    changedArgs.itemData = args.itemData.originalItemData;
    (_this$_itemClickedAct = this._itemClickedAction) === null || _this$_itemClickedAct === void 0 || _this$_itemClickedAct.call(this, changedArgs);
  }
  _createItemClickedAction() {
    this._itemClickedAction = this._createActionByOption('onItemClick');
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      commandManager: undefined,
      generalItems: [],
      fileItems: [],
      contextItems: [],
      itemViewMode: 'details',
      onItemClick: undefined
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'commandManager':
      case 'itemViewMode':
      case 'generalItems':
      case 'fileItems':
        this.repaint();
        break;
      case 'contextItems':
        this._update();
        break;
      case 'onItemClick':
        this._itemClickedAction = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
  updateItemPermissions() {
    this.repaint();
    this._restoreRefreshItemState();
  }
  _restoreRefreshItemState() {
    var _this$_refreshItemSta, _this$_refreshItemSta2;
    this.updateRefreshItem((_this$_refreshItemSta = this._refreshItemState) === null || _this$_refreshItemSta === void 0 ? void 0 : _this$_refreshItemSta.message, (_this$_refreshItemSta2 = this._refreshItemState) === null || _this$_refreshItemSta2 === void 0 ? void 0 : _this$_refreshItemSta2.status);
  }
  updateRefreshItem(message, status) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let generalToolbarOptions = null;
    let text = _message.default.format('dxFileManager-commandRefresh');
    let showText = 'inMenu';
    this._isRefreshVisibleInFileToolbar = false;
    this._refreshItemState = {
      message,
      status
    };
    if (status === 'default') {
      generalToolbarOptions = {
        options: {
          icon: REFRESH_ICON_MAP.default
        }
      };
    } else {
      generalToolbarOptions = {
        options: {
          icon: REFRESH_ICON_MAP[status]
        }
      };
      this._isRefreshVisibleInFileToolbar = true;
      text = message;
      showText = 'always';
    }
    const fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions, {
      visible: this._isRefreshVisibleInFileToolbar
    });
    this._applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions);
    this._refreshItemTextTimeout = this._updateRefreshItemText(status === 'progress', text, showText);
  }
  _updateRefreshItemText(isDeferredUpdate, text, showText) {
    const options = {
      showText,
      options: {
        text
      }
    };
    if (isDeferredUpdate) {
      // eslint-disable-next-line no-restricted-globals
      return setTimeout(() => {
        this._applyRefreshItemOptions(options);
        this._refreshItemTextTimeout = undefined;
      }, REFRESH_ITEM_PROGRESS_MESSAGE_DELAY);
    }
    if (this._refreshItemTextTimeout) {
      clearTimeout(this._refreshItemTextTimeout);
    }
    this._applyRefreshItemOptions(options);
    return undefined;
  }
  _applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions) {
    if (!fileToolbarOptions) {
      // eslint-disable-next-line no-param-reassign
      fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions);
    }
    // @ts-expect-error ts-error
    this._updateItemInToolbar(this._generalToolbar, 'refresh', generalToolbarOptions);
    // @ts-expect-error ts-error
    this._updateItemInToolbar(this._fileToolbar, 'refresh', fileToolbarOptions);
  }
  _update() {
    const {
      contextItems
    } = this.option();
    const showGeneralToolbar = contextItems.length === 0 || !this._fileToolbarHasEffectiveItems();
    if (this._generalToolbarVisible !== showGeneralToolbar) {
      var _this$_generalToolbar, _this$_fileToolbar2;
      (_this$_generalToolbar = this._generalToolbar) === null || _this$_generalToolbar === void 0 || _this$_generalToolbar.option('visible', showGeneralToolbar);
      (_this$_fileToolbar2 = this._fileToolbar) === null || _this$_fileToolbar2 === void 0 || _this$_fileToolbar2.option('visible', !showGeneralToolbar);
      this._generalToolbarVisible = showGeneralToolbar;
      this.$element().toggleClass(FILE_MANAGER_GENERAL_TOOLBAR_CLASS, showGeneralToolbar);
      this.$element().toggleClass(FILE_MANAGER_FILE_TOOLBAR_CLASS, !showGeneralToolbar);
    }
    const toolbar = this._getVisibleToolbar();
    this._ensureAvailableCommandsVisible(toolbar);
    this._checkCompactMode(toolbar);
  }
  get _commandManager() {
    const {
      commandManager
    } = this.option();
    return commandManager;
  }
}
var _default = exports.default = FileManagerToolbar;