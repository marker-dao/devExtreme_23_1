/**
* DevExtreme (cjs/__internal/ui/html_editor/modules/m_toolbar.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../../ui/select_box");
require("../../../ui/color_box/m_color_view");
require("../../../../ui/number_box");
require("../../../../ui/menu");
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _index = require("../../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _inflector = require("../../../../core/utils/inflector");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _toolbar = _interopRequireDefault(require("../../../../ui/toolbar"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _capitalize = require("../../../core/utils/capitalize");
var _menu2 = require("../../../ui/menu/menu");
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _ai = require("../utils/ai");
var _m_table_helper = require("../utils/m_table_helper");
var _m_toolbar_helper = require("../utils/m_toolbar_helper");
var _m_base = _interopRequireDefault(require("./m_base"));
var _m_widget_collector = _interopRequireDefault(require("./m_widget_collector"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-mutable-exports
let ToolbarModule = _m_base.default;
if (_devextremeQuill.default) {
  const TOOLBAR_WRAPPER_CLASS = 'dx-htmleditor-toolbar-wrapper';
  const TOOLBAR_CLASS = 'dx-htmleditor-toolbar';
  const TOOLBAR_FORMAT_WIDGET_CLASS = 'dx-htmleditor-toolbar-format';
  const TOOLBAR_SEPARATOR_CLASS = 'dx-htmleditor-toolbar-separator';
  const TOOLBAR_MENU_SEPARATOR_CLASS = 'dx-htmleditor-toolbar-menu-separator';
  const ACTIVE_FORMAT_CLASS = 'dx-format-active';
  const SELECTED_STATE_CLASS = 'dx-state-selected';
  const ICON_CLASS = 'dx-icon';
  const SELECTION_CHANGE_EVENT = 'selection-change';
  const USER_ACTION = 'user';
  const SILENT_ACTION = 'silent';
  const FORMAT_HOTKEYS = {
    66: 'bold',
    73: 'italic',
    85: 'underline'
  };
  const KEY_CODES = {
    b: 66,
    i: 73,
    u: 85
  };
  const TOOLBAR_AI_ITEM_NAME = 'ai';
  const localize = name => _message.default.format(`dxHtmlEditor-${(0, _inflector.camelize)(name)}`);
  const localizeValue = (value, name) => {
    if (name === 'header') {
      const isHeaderValue = (0, _type.isDefined)(value) && value !== false;
      return isHeaderValue ? `${localize('heading')} ${value}` : localize('normalText');
    }
    return localize(value) || value;
  };
  // @ts-expect-error
  ToolbarModule = class ToolbarModule extends _m_base.default {
    constructor(quill, options) {
      var _this;
      // @ts-expect-error
      super(quill, options);
      _this = this;
      this._toolbarWidgets = new _m_widget_collector.default();
      this._formatHandlers = (0, _m_toolbar_helper.getFormatHandlers)(this);
      this._tableFormats = (0, _m_table_helper.getTableFormats)(quill);
      if ((0, _type.isDefined)(options.items)) {
        this._addCallbacks();
        this._renderToolbar();
        // NOTE: Fixes the synchronization of the states of items placed in a menu that is rendered postponed.
        // See bug t1117604: menu items' state could be updated after selection change before the menu is rendered.
        // We cannot just modify items' state using a toolbar api because of:
        // - runtime adding in-line styles for color formats' icon;
        // - "dx-format-active" class toggling (using elementAttr will trigger toolbar item rerendering);
        // - changing the value of non-button items.
        // Possible better solutions:
        // - rework or extend a toolbar menu api or life cycle;
        // - support a separate cache for toolbar items' state and apply it on each item's initialization.
        // @ts-expect-error
        const toolbarMenu = this.toolbarInstance._layoutStrategy._menu;
        if (toolbarMenu) {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const {
            _renderPopup
          } = toolbarMenu;
          toolbarMenu._renderPopup = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            _renderPopup.apply(toolbarMenu, ...args);
            toolbarMenu._popup.on('showing', () => {
              _this._updateToolbar(true);
            });
          };
        }
        this.quill.on('editor-change', (eventName, newValue, oldValue, eventSource) => {
          const isSilentMode = eventSource === SILENT_ACTION && (0, _type.isEmptyObject)(this.quill.getFormat());
          if (!isSilentMode) {
            const isSelectionChanged = eventName === SELECTION_CHANGE_EVENT;
            this._updateToolbar(isSelectionChanged);
          }
        });
      }
    }
    _addCallbacks() {
      // @ts-expect-error
      this.addCleanCallback(this.clean.bind(this));
      this.editorInstance.addContentInitializedCallback(this.updateHistoryWidgets.bind(this));
    }
    _updateToolbar(isSelectionChanged) {
      this.updateFormatWidgets(isSelectionChanged);
      this.updateHistoryWidgets();
      this.updateTableWidgets();
    }
    _updateFormatWidget(name, isApplied, formats) {
      const widget = this._toolbarWidgets.getByName(name);
      if (!widget) {
        return;
      }
      if (isApplied) {
        this._markActiveFormatWidget(name, widget, formats);
      } else {
        this._resetFormatWidget(name, widget);
        // @ts-expect-error
        if (Object.prototype.hasOwnProperty.call(name)) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete formats[name];
        }
      }
      this._toggleClearFormatting(isApplied || !(0, _type.isEmptyObject)(formats));
    }
    _renderToolbar() {
      const container = this.options.container || this._getContainer();
      this._$toolbar = (0, _renderer.default)('<div>').addClass(TOOLBAR_CLASS).appendTo(container);
      this._$toolbarContainer = (0, _renderer.default)(container).addClass(TOOLBAR_WRAPPER_CLASS);
      _events_engine.default.on(this._$toolbarContainer, (0, _index.addNamespace)('mousedown', this.editorInstance.NAME), e => {
        e.target.focus();
        e.preventDefault();
      });
      this._subscribeFormatHotKeys();
      this.toolbarInstance = this.editorInstance._createComponent(this._$toolbar, _toolbar.default, this.toolbarConfig);
      this.editorInstance.on('optionChanged', _ref => {
        let {
          name
        } = _ref;
        if (name === 'readOnly' || name === 'disabled') {
          this.toolbarInstance.option('disabled', this.isInteractionDisabled);
        }
      });
    }
    get toolbarConfig() {
      return {
        dataSource: this._prepareToolbarItems(),
        disabled: this.isInteractionDisabled,
        menuContainer: this._$toolbarContainer,
        multiline: this.isMultilineMode()
      };
    }
    get isInteractionDisabled() {
      return this.editorInstance.option('readOnly') || this.editorInstance.option('disabled');
    }
    isMultilineMode() {
      return this.options.multiline ?? true;
    }
    clean() {
      this._toolbarWidgets.clear();
      if (this._$toolbarContainer) {
        this._$toolbarContainer.empty().removeClass(TOOLBAR_WRAPPER_CLASS);
      }
    }
    repaint() {
      this.toolbarInstance && this.toolbarInstance.repaint();
    }
    _getContainer() {
      const $container = (0, _renderer.default)('<div>');
      this.editorInstance.$element().prepend($container);
      return $container;
    }
    _subscribeFormatHotKeys() {
      this.quill.keyboard.addBinding({
        which: KEY_CODES.b,
        shortKey: true
      }, this._handleFormatHotKey.bind(this));
      this.quill.keyboard.addBinding({
        which: KEY_CODES.i,
        shortKey: true
      }, this._handleFormatHotKey.bind(this));
      this.quill.keyboard.addBinding({
        which: KEY_CODES.u,
        shortKey: true
      }, this._handleFormatHotKey.bind(this));
    }
    _handleFormatHotKey(range, context, _ref2) {
      let {
        which
      } = _ref2;
      const formatName = FORMAT_HOTKEYS[which];
      this._updateButtonState(formatName);
    }
    _updateButtonState(formatName) {
      const formatWidget = this._toolbarWidgets.getByName(formatName);
      const currentFormat = this.quill.getFormat();
      const formatValue = currentFormat[formatName];
      if (formatValue) {
        this._markActiveFormatWidget(formatName, formatWidget, currentFormat);
      } else {
        this._resetFormatWidget(formatName, formatWidget);
      }
    }
    _prepareToolbarItems() {
      const resultItems = [];
      (0, _iterator.each)(this.options.items, (index, item) => {
        let newItem;
        if ((0, _type.isObject)(item)) {
          newItem = this._handleObjectItem(item);
        } else if (item === TOOLBAR_AI_ITEM_NAME) {
          resultItems.push(this._getToolbarItem(this._prepareAIMenuItemConfig(item)));
        } else if ((0, _type.isString)(item)) {
          const buttonItemConfig = this._prepareButtonItemConfig(item);
          newItem = this._getToolbarItem(buttonItemConfig);
        }
        if (newItem) {
          resultItems.push(newItem);
        }
      });
      return resultItems;
    }
    _handleObjectItem(item) {
      if (item.name === TOOLBAR_AI_ITEM_NAME) {
        return this._getToolbarItem(this._prepareAIMenuItemConfig(item));
      }
      if (item.name && item.acceptedValues && this._isAcceptableItem(item.widget, 'dxSelectBox')) {
        const selectItemConfig = this._prepareSelectItemConfig(item);
        return this._getToolbarItem(selectItemConfig);
      }
      if (item.name && this._isAcceptableItem(item.widget, 'dxButton')) {
        const defaultButtonItemConfig = this._prepareButtonItemConfig(item.name);
        const buttonItemConfig = (0, _extend.extend)(true, defaultButtonItemConfig, item);
        return this._getToolbarItem(buttonItemConfig);
      }
      return this._getToolbarItem(item);
    }
    _isAcceptableItem(widget, acceptableWidgetName) {
      return !widget || widget === acceptableWidgetName;
    }
    _prepareButtonItemConfig(name) {
      const iconName = _m_toolbar_helper.ICON_MAP[name] ?? name;
      const buttonText = (0, _inflector.titleize)(name);
      return {
        widget: 'dxButton',
        name,
        options: {
          hint: localize(buttonText),
          text: localize(buttonText),
          icon: iconName.toLowerCase(),
          onClick: this._formatHandlers[name] || (0, _m_toolbar_helper.getDefaultClickHandler)(this, name),
          stylingMode: 'text'
        },
        showText: 'inMenu'
      };
    }
    _prepareSelectItemConfig(item) {
      const {
        name,
        acceptedValues
      } = item;
      return (0, _extend.extend)(true, {
        widget: 'dxSelectBox',
        name,
        options: {
          stylingMode: 'filled',
          dataSource: acceptedValues,
          displayExpr: value => localizeValue(value, name),
          placeholder: localize(name),
          onValueChanged: e => {
            if (!this._isReset) {
              this._hideAdaptiveMenu();
              (0, _m_toolbar_helper.applyFormat)(this, [name, e.value, USER_ACTION], e.event);
              this._setValueSilent(e.component, e.value);
            }
          }
        }
      }, item);
    }
    _createCommandMenuItem(command, text, commandOptions) {
      var _getDefaultOptionsByC;
      const options = (commandOptions === null || commandOptions === void 0 ? void 0 : commandOptions.map(_capitalize.capitalize)) ?? ((_getDefaultOptionsByC = (0, _ai.getDefaultOptionsByCommand)(command)) === null || _getDefaultOptionsByC === void 0 ? void 0 : _getDefaultOptionsByC.map(_capitalize.capitalize));
      const item = {
        id: command,
        name: command,
        text: text ?? _ai.defaultCommandNames[command],
        items: options === null || options === void 0 ? void 0 : options.map(option => ({
          id: option,
          text: option,
          parentCommand: command,
          options: options === null || options === void 0 ? void 0 : options.map(_capitalize.capitalize)
        }))
      };
      return item;
    }
    _buildMenuItems(commands) {
      let customCommandIndex = 0;
      const items = commands === null || commands === void 0 ? void 0 : commands.map(command => {
        if (typeof command === 'object') {
          if (command.name === 'custom') {
            var _command$options;
            const id = `custom${customCommandIndex}`;
            const {
              prompt,
              options
            } = command;
            const capitalized = options === null || options === void 0 ? void 0 : options.map(_capitalize.capitalize);
            const item = {
              id,
              name: 'custom',
              text: command.text,
              items: (_command$options = command.options) === null || _command$options === void 0 ? void 0 : _command$options.map(rawOptionName => {
                const option = (0, _capitalize.capitalize)(rawOptionName);
                const result = {
                  parentCommand: id,
                  id: option,
                  text: option,
                  options: capitalized,
                  prompt
                };
                return result;
              }),
              disabled: !prompt,
              prompt
            };
            customCommandIndex += 1;
            return item;
          }
          return this._createCommandMenuItem(command.name, command.text, command.options);
        }
        return this._createCommandMenuItem(command);
      });
      return items;
    }
    _validateAIToolbarItemConfig(commandsMap) {
      const {
        aiIntegration
      } = this.editorInstance.option();
      if (!aiIntegration) {
        _ui.default.log('W1026');
      }
      if ((0, _ai.hasInvalidCustomCommand)(commandsMap)) {
        _ui.default.log('W1027');
      }
    }
    _prepareAIMenuItemConfig(item) {
      var _dataSource$0$items;
      const {
        name = TOOLBAR_AI_ITEM_NAME,
        commands = Object.keys(_ai.defaultCommandNames)
      } = item;
      const commandsMap = (0, _ai.buildCommandsMap)(commands);
      const menuItems = this._buildMenuItems(commands);
      this._validateAIToolbarItemConfig(commandsMap);
      const dataSource = [{
        id: 'root',
        icon: 'sparkle',
        items: menuItems
      }];
      const {
        aiIntegration
      } = this.editorInstance.option();
      const isMenuDisabled = !((_dataSource$0$items = dataSource[0].items) !== null && _dataSource$0$items !== void 0 && _dataSource$0$items.length) || !aiIntegration;
      const options = {
        dataSource,
        disabled: isMenuDisabled,
        onContentReady: e => {
          const $item = (0, _renderer.default)(e.element).find(`.${_menu2.DX_MENU_ITEM_CLASS}`).first();
          $item.attr('aria-label', _message.default.format('dxHtmlEditor-aiToolbarItemAriaLabel'));
        },
        onItemClick: e => {
          var _itemData$items;
          const {
            itemData
          } = e;
          if (!itemData || (_itemData$items = itemData.items) !== null && _itemData$items !== void 0 && _itemData$items.length) {
            return;
          }
          const aiDialogOptions = {
            command: itemData.id,
            parentCommand: itemData.parentCommand,
            commandsMap,
            prompt: itemData.prompt
          };
          this._formatHandlers[name](aiDialogOptions);
        }
      };
      return (0, _extend.extend)(true, {
        widget: 'dxMenu',
        name,
        options
      }, typeof item === 'string' ? {} : item);
    }
    _hideAdaptiveMenu() {
      if (this.toolbarInstance.option('overflowMenuVisible')) {
        this.toolbarInstance.option('overflowMenuVisible', false);
      }
    }
    _getToolbarItem(item) {
      const baseItem = {
        options: {
          onInitialized: e => {
            if (item.name) {
              e.component.$element().addClass(TOOLBAR_FORMAT_WIDGET_CLASS);
              e.component.$element().toggleClass(`dx-${item.name.toLowerCase()}-format`, !!item.name);
              this._toolbarWidgets.add(item.name, e.component);
            }
          },
          onDisposing: () => {
            this._toolbarWidgets.remove(item.name);
          }
        }
      };
      return (0, _extend.extend)(true, {
        location: 'before',
        locateInMenu: 'auto'
      }, this._getDefaultConfig(item.name), item, baseItem);
    }
    _getDefaultItemsConfig() {
      return {
        clear: {
          options: {
            disabled: true
          }
        },
        undo: {
          options: {
            disabled: true
          }
        },
        redo: {
          options: {
            disabled: true
          }
        },
        // ToDo: move it to the table module
        insertRowAbove: {
          options: {
            disabled: true
          }
        },
        insertRowBelow: {
          options: {
            disabled: true
          }
        },
        insertHeaderRow: {
          options: {
            disabled: true
          }
        },
        insertColumnLeft: {
          options: {
            disabled: true
          }
        },
        insertColumnRight: {
          options: {
            disabled: true
          }
        },
        deleteRow: {
          options: {
            disabled: true
          }
        },
        deleteColumn: {
          options: {
            disabled: true
          }
        },
        deleteTable: {
          options: {
            disabled: true
          }
        },
        cellProperties: {
          options: {
            disabled: true
          }
        },
        tableProperties: {
          options: {
            disabled: true
          }
        },
        separator: {
          template: (data, index, element) => {
            (0, _renderer.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS);
          },
          menuItemTemplate: (data, index, element) => {
            (0, _renderer.default)(element).addClass(TOOLBAR_MENU_SEPARATOR_CLASS);
          }
        }
      };
    }
    _getDefaultConfig(name) {
      return this._getDefaultItemsConfig()[name];
    }
    updateHistoryWidgets() {
      const historyModule = this.quill.history;
      if (!historyModule) {
        return;
      }
      const {
        undo: undoOps,
        redo: redoOps
      } = historyModule.stack;
      this._updateManipulationWidget(this._toolbarWidgets.getByName('undo'), Boolean(undoOps.length));
      this._updateManipulationWidget(this._toolbarWidgets.getByName('redo'), Boolean(redoOps.length));
    }
    updateTableWidgets() {
      const table = this.quill.getModule('table');
      if (!table) {
        return;
      }
      const selection = this.quill.getSelection();
      const formats = selection && this.quill.getFormat(selection) || {};
      const isTableOperationsEnabled = this._tableFormats.some(format => Boolean(formats[format]));
      _m_table_helper.TABLE_OPERATIONS.forEach(operationName => {
        const isInsertTable = operationName === 'insertTable';
        const widget = this._toolbarWidgets.getByName(operationName);
        this._updateManipulationWidget(widget, isInsertTable ? !isTableOperationsEnabled : isTableOperationsEnabled);
      });
    }
    _updateManipulationWidget(widget, isOperationEnabled) {
      if (!widget) {
        return;
      }
      widget.option('disabled', !isOperationEnabled);
    }
    updateFormatWidgets(isResetRequired) {
      const selection = this.quill.getSelection();
      if (!selection) {
        return;
      }
      const formats = this.quill.getFormat(selection);
      const hasFormats = !(0, _type.isEmptyObject)(formats);
      if (!hasFormats || isResetRequired) {
        this._resetFormatWidgets();
      }
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const formatName in formats) {
        const widgetName = this._getFormatWidgetName(formatName, formats);
        const formatWidget = this._toolbarWidgets.getByName(widgetName) ?? this._toolbarWidgets.getByName(formatName);
        if (!formatWidget) {
          continue;
        }
        this._markActiveFormatWidget(formatName, formatWidget, formats);
      }
      this._toggleClearFormatting(hasFormats || selection.length > 1);
    }
    _markActiveFormatWidget(name, widget, formats) {
      if (this._isColorFormat(name)) {
        this._updateColorWidget(name, formats[name]);
      }
      if ('value' in widget.option()) {
        this._setValueSilent(widget, formats[name]);
      } else {
        widget.$element().addClass(ACTIVE_FORMAT_CLASS);
        widget.$element().addClass(SELECTED_STATE_CLASS);
        widget.$element().attr('aria-pressed', true);
      }
    }
    _toggleClearFormatting(hasFormats) {
      const clearWidget = this._toolbarWidgets.getByName('clear');
      if (clearWidget) {
        // @ts-expect-error
        clearWidget.option('disabled', !hasFormats);
      }
    }
    _isColorFormat(name) {
      return name === 'color' || name === 'background';
    }
    _updateColorWidget(name, color) {
      const formatWidget = this._toolbarWidgets.getByName(name);
      if (!formatWidget) {
        return;
      }
      formatWidget
      // @ts-expect-error
      .$element().find(`.${ICON_CLASS}`).css('borderBottomColor', color || 'transparent');
    }
    _getFormatWidgetName(name, formats) {
      let widgetName;
      switch (name) {
        case 'align':
          widgetName = name + (0, _inflector.titleize)(formats[name]);
          break;
        case 'list':
          widgetName = formats[name] + (0, _inflector.titleize)(name);
          break;
        case 'code-block':
          widgetName = 'codeBlock';
          break;
        case 'script':
          widgetName = formats[name] + name;
          break;
        case 'imageSrc':
          widgetName = 'image';
          break;
        default:
          widgetName = name;
      }
      return widgetName;
    }
    _setValueSilent(widget, value) {
      this._isReset = true;
      widget.option('value', value);
      this._isReset = false;
    }
    _resetFormatWidgets() {
      this._toolbarWidgets.each((name, widget) => {
        this._resetFormatWidget(name, widget);
      });
    }
    _resetFormatWidget(name, widget) {
      widget.$element().removeClass(ACTIVE_FORMAT_CLASS);
      widget.$element().removeClass(SELECTED_STATE_CLASS);
      widget.$element().removeAttr('aria-pressed');
      if (this._isColorFormat(name)) {
        this._updateColorWidget(name);
      }
      if (name === 'clear') {
        widget.option('disabled', true);
      }
      if (widget.NAME === 'dxSelectBox') {
        this._setValueSilent(widget, null);
      }
    }
    addClickHandler(name, handler) {
      this._formatHandlers[name] = handler;
      const formatWidget = this._toolbarWidgets.getByName(name);
      // @ts-expect-error
      if (formatWidget && formatWidget.NAME === 'dxButton') {
        // @ts-expect-error
        formatWidget.option('onClick', handler);
      }
    }
  };
}
var _default = exports.default = ToolbarModule;
