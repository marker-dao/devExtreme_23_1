/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.toolbar.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,max-depth */
// eslint-disable-next-line max-classes-per-file
import '../../../ui/select_box';
import '../../../ui/color_box';
import '../../../ui/check_box';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { getWidth, setWidth } from '../../../core/utils/size';
import { hasWindow } from '../../../core/utils/window';
import ContextMenu from '../../../ui/context_menu';
import Toolbar from '../../../ui/toolbar';
import DiagramBar from '../../ui/diagram/diagram.bar';
import { getDiagram } from '../../ui/diagram/diagram.importer';
import DiagramMenuHelper from '../../ui/diagram/ui.diagram.menu_helper';
import DiagramPanel from '../../ui/diagram/ui.diagram.panel';
const ACTIVE_FORMAT_CLASS = 'dx-format-active';
const DIAGRAM_TOOLBAR_CLASS = 'dx-diagram-toolbar';
const DIAGRAM_TOOLBAR_SEPARATOR_CLASS = 'dx-diagram-toolbar-separator';
const DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS = 'dx-diagram-toolbar-menu-separator';
const DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS = 'dx-diagram-mobile-toolbar-color-box-opened';
class DiagramToolbarItemHelper {
  constructor(widget) {
    this._widget = widget;
  }
  canUpdate(showingSubMenu) {
    return showingSubMenu === undefined;
  }
  setEnabled(enabled) {
    this._widget.option('disabled', !enabled);
  }
  setValue(value, displayValue, contextMenu, rootCommandKey) {
    if ('value' in this._widget.option()) {
      this._updateEditorValue(value, displayValue);
    } else if (value !== undefined) {
      this._updateButtonValue(value);
    }
    if (contextMenu) {
      this._updateContextMenuItemValue(contextMenu, '', rootCommandKey, value);
    }
  }
  setItems(items, contextMenu, rootCommandKey) {
    if (contextMenu) {
      this._updateContextMenuItems(contextMenu, '', rootCommandKey, items);
    } else {
      this._updateEditorItems(items);
    }
  }
  _updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items) {
    DiagramMenuHelper.updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items);
  }
  _updateEditorItems(items) {
    if ('items' in this._widget.option()) {
      this._widget.option('items', items.map(item => ({
        value: DiagramMenuHelper.getItemValue(item),
        text: item.text
      })));
    }
  }
  _updateEditorValue(value, displayValue) {
    this._widget.option('value', value);
    if (!this._widget.option('selectedItem') && displayValue) {
      this._widget.option('value', displayValue);
    }
  }
  _updateButtonValue(value) {
    if (this._widget.option('iconChecked') && this._widget.option('iconUnchecked')) {
      this._widget.option('icon', value ? this._widget.option('iconChecked') : this._widget.option('iconUnchecked'));
    } else {
      this._widget.$element().toggleClass(ACTIVE_FORMAT_CLASS, value);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value) {
    DiagramMenuHelper.updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value);
  }
}
class DiagramToolbarSubItemHelper extends DiagramToolbarItemHelper {
  constructor(widget, indexPath, rootCommandKey, rootWidget) {
    super(widget);
    this._indexPath = indexPath;
    this._rootCommandKey = rootCommandKey;
    this._rootWidget = rootWidget;
  }
  canUpdate(showingSubMenu) {
    return super.canUpdate(showingSubMenu) || showingSubMenu === this._widget;
  }
  setEnabled(enabled) {
    this._widget.option(`${this._getItemOptionText()}disabled`, !enabled);
    const rootEnabled = this._hasEnabledCommandItems(this._widget.option('items'));
    this._rootWidget.option('disabled', !rootEnabled);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _hasEnabledCommandItems(items) {
    if (items) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return items.some(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      item => item.command !== undefined && !item.disabled || this._hasEnabledCommandItems(item.items));
    }
    return false;
  }
  setValue(value) {
    this._updateContextMenuItemValue(this._widget, this._getItemOptionText(), this._rootCommandKey, value);
  }
  setItems(items) {
    this._updateContextMenuItems(this._widget, this._getItemOptionText(), this._rootCommandKey, items);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemOptionText() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return DiagramMenuHelper.getItemOptionText(this._widget, this._indexPath);
  }
}
class DiagramToolbarBar extends DiagramBar {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getCommandKeys() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getKeys(this._owner._commands);
  }
  setItemValue(key, value) {
    this._owner._setItemValue(key, value);
  }
  setItemEnabled(key, enabled) {
    this._owner._setItemEnabled(key, enabled);
  }
  setEnabled(enabled) {
    this._owner._setEnabled(enabled);
  }
  setItemSubItems(key, items) {
    this._owner._setItemSubItems(key, items);
  }
}
class DiagramToolbar extends DiagramPanel {
  _init() {
    this._commands = [];
    this._itemHelpers = {};
    this._commandContextMenus = {};
    this._contextMenuList = [];
    this._valueConverters = {};
    this.bar = new DiagramToolbarBar(this);
    this._createOnInternalCommand();
    this._createOnCustomCommand();
    this._createOnSubMenuVisibilityChangingAction();
    super._init();
  }
  _initMarkup() {
    super._initMarkup();
    const isServerSide = !hasWindow();
    if (!this.option('skipAdjustSize') && !isServerSide) {
      setWidth(this.$element(), '');
    }
    this._commands = this._getCommands();
    this._itemHelpers = {};
    this._commandContextMenus = {};
    this._contextMenuList = [];
    const $toolbar = this._createMainElement();
    this._renderToolbar($toolbar);
    if (!this.option('skipAdjustSize') && !isServerSide) {
      const $toolbarContent = this.$element().find('.dx-toolbar-before');
      setWidth(this.$element(), getWidth($toolbarContent));
    }
  }
  _createMainElement() {
    return $('<div>').addClass(DIAGRAM_TOOLBAR_CLASS).appendTo(this.$element());
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCommands() {
    // @ts-expect-error ts-error
    const {
      commands
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return commands || [];
  }
  _renderToolbar($toolbar) {
    var _this$_commands, _this$_commands2, _this$_commands3;
    const beforeCommands = (_this$_commands = this._commands) === null || _this$_commands === void 0 ? void 0 : _this$_commands.filter(
    // @ts-expect-error ts-error
    command => !['after', 'center'].includes(command.location));
    const centerCommands = (_this$_commands2 = this._commands) === null || _this$_commands2 === void 0 ? void 0 : _this$_commands2.filter(
    // @ts-expect-error ts-error
    command => command.location === 'center');
    const afterCommands = (_this$_commands3 = this._commands) === null || _this$_commands3 === void 0 ? void 0 : _this$_commands3.filter(
    // @ts-expect-error ts-error
    command => command.location === 'after');
    const dataSource = [].concat(this._prepareToolbarItems(beforeCommands, 'before', this._executeCommand)).concat(this._prepareToolbarItems(centerCommands, 'center', this._executeCommand)).concat(this._prepareToolbarItems(afterCommands, 'after', this._executeCommand));
    this._toolbarInstance = this._createComponent($toolbar, Toolbar, {
      dataSource
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _prepareToolbarItems(items, location, actionHandler) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items.map(item => extend(true, {
      location,
      locateInMenu: this.option('locateInMenu')
    }, this._createItem(item, location, actionHandler), this._createItemOptions(item), this._createItemActionOptions(item, actionHandler)));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createItem(item, location, actionHandler) {
    if (item.getCommandValue || item.getEditorValue || item.getEditorDisplayValue) {
      this._valueConverters[item.command] = {
        getCommandValue: item.getCommandValue,
        getEditorValue: item.getEditorValue,
        getEditorDisplayValue: item.getEditorDisplayValue
      };
    }
    if (item.widget === 'separator') {
      return {
        template: (data, index, element) => {
          $(element).addClass(DIAGRAM_TOOLBAR_SEPARATOR_CLASS);
        },
        menuItemTemplate: (data, index, element) => {
          $(element).addClass(DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS);
        }
      };
    }
    return {
      widget: item.widget || 'dxButton',
      cssClass: item.cssClass,
      options: {
        stylingMode: this.option('buttonStylingMode'),
        type: this.option('buttonType'),
        text: item.text,
        hint: item.hint,
        icon: item.icon || item.iconUnchecked || item.iconChecked,
        iconChecked: item.iconChecked,
        iconUnchecked: item.iconUnchecked,
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onInitialized: e => this._onItemInitialized(e.component, item),
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onContentReady: e => this._onItemContentReady(e.component, item, actionHandler)
      }
    };
  }
  // @ts-expect-error ts-error
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,consistent-return
  _createItemOptions(_ref) {
    let {
      widget,
      command,
      items,
      valueExpr,
      displayExpr,
      showText,
      hint,
      icon
    } = _ref;
    if (widget === 'dxSelectBox') {
      return this._createSelectBoxItemOptions(command, hint, items, valueExpr, displayExpr);
    }
    if (widget === 'dxTextBox') {
      return this._createTextBoxItemOptions(command, hint);
    }
    if (widget === 'dxColorBox') {
      return this._createColorBoxItemOptions(command, hint, icon);
    }
    if (!widget || widget === 'dxButton') {
      return {
        showText: showText || 'inMenu'
      };
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createSelectBoxItemOptions(command, hint, items, valueExpr, displayExpr) {
    let options = this._createTextEditorItemOptions(hint);
    options = extend(true, options, {
      options: {
        dataSource: items,
        displayExpr: displayExpr || 'text',
        valueExpr: valueExpr || 'value'
      }
    });
    const isSelectButton = items === null || items === void 0 ? void 0 : items.every(i => i.icon !== undefined);
    const nullIconClass = 'dx-diagram-i-selectbox-null-icon dx-diagram-i';
    if (isSelectButton) {
      options = extend(true, options, {
        options: {
          fieldAddons: {
            beforeTemplate: (data, container) => {
              $('<i>').addClass((data === null || data === void 0 ? void 0 : data.icon) || nullIconClass).appendTo(container);
            }
          },
          itemTemplate: (data, _, container) => {
            $(container).attr('title', data.hint);
            return `<i class="${data.icon}"></i>`;
          }
        }
      });
    }
    return options;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createTextBoxItemOptions(command, hint) {
    let options = this._createTextEditorItemOptions(hint);
    options = extend(true, options, {
      options: {
        readOnly: true,
        focusStateEnabled: false,
        hoverStateEnabled: false,
        buttons: [{
          name: 'dropDown',
          location: 'after',
          options: {
            icon: 'spindown',
            disabled: false,
            stylingMode: 'text',
            onClick: () => {
              const contextMenu = this._commandContextMenus[command];
              if (contextMenu) {
                this._toggleContextMenu(contextMenu);
              }
            }
          }
        }]
      }
    });
    return options;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createColorBoxItemOptions(command, hint, icon) {
    let options = this._createTextEditorItemOptions(hint);
    if (icon) {
      options = extend(true, options, {
        options: {
          openOnFieldClick: true,
          fieldAddons: {
            beforeTemplate: (data, container) => {
              $('<i>').addClass(icon).css('borderBottomColor', data).appendTo(container);
            }
          }
        }
      });
    }
    options = extend(true, options, {
      options: {
        onOpened: () => {
          if (this.option('isMobileView')) {
            $('body').addClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
          }
        },
        onClosed: () => {
          $('body').removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
        }
      }
    });
    return options;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createTextEditorItemOptions(hint) {
    return {
      options: {
        stylingMode: this.option('editorStylingMode'),
        hint
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createItemActionOptions(item, handler) {
    switch (item.widget) {
      case 'dxSelectBox':
      case 'dxColorBox':
      case 'dxCheckBox':
        return {
          options: {
            onValueChanged: e => {
              const parameter = DiagramMenuHelper.getItemCommandParameter(this, item, e.component.option('value'));
              handler.call(this, item.command, item.name, parameter);
            }
          }
        };
      case 'dxTextBox':
        return {};
      default:
        return {
          options: {
            onClick: e => {
              if (!item.items) {
                // @ts-expect-error ts-error
                const parameter = DiagramMenuHelper.getItemCommandParameter(this, item);
                handler.call(this, item.command, item.name, parameter);
              } else {
                const contextMenu = e.component._contextMenu;
                if (contextMenu) {
                  this._toggleContextMenu(contextMenu);
                }
              }
            }
          }
        };
    }
  }
  _toggleContextMenu(contextMenu) {
    var _this$_contextMenuLis;
    (_this$_contextMenuLis = this._contextMenuList) === null || _this$_contextMenuLis === void 0 || _this$_contextMenuLis.forEach(cm => {
      if (contextMenu !== cm) {
        cm.hide();
      }
    });
    contextMenu.toggle();
  }
  _onItemInitialized(widget, item) {
    this._addItemHelper(item.command, new DiagramToolbarItemHelper(widget));
  }
  _onItemContentReady(widget, item, actionHandler) {
    if ((widget.NAME === 'dxButton' || widget.NAME === 'dxTextBox') && item.items) {
      const isTouchMode = this._isTouchMode();
      const $menuContainer = $('<div>').appendTo(this.$element());
      widget._contextMenu = this._createComponent($menuContainer, ContextMenu, {
        items: item.items,
        target: widget.$element(),
        cssClass: DiagramMenuHelper.getContextMenuCssClass(),
        showEvent: '',
        hideOnOutsideClick: e => !isTouchMode && $(e.target).closest(widget._contextMenu._dropDownButtonElement).length === 0,
        focusStateEnabled: false,
        position: {
          at: 'left bottom'
        },
        itemTemplate(itemData, itemIndex, itemElement) {
          DiagramMenuHelper.getContextMenuItemTemplate(this, itemData, itemIndex, itemElement);
        },
        onItemClick: _ref2 => {
          var _itemData$items;
          let {
            component,
            itemData
          } = _ref2;
          DiagramMenuHelper.onContextMenuItemClick(this, itemData, actionHandler.bind(this));
          if (!(itemData !== null && itemData !== void 0 && (_itemData$items = itemData.items) !== null && _itemData$items !== void 0 && _itemData$items.length)) {
            component.hide();
          }
        },
        onShowing: e => {
          if (this._showingSubMenu) return;
          this._showingSubMenu = e.component;
          this._onSubMenuVisibilityChangingAction({
            visible: true,
            component: this
          });
          e.component.option('items', e.component.option('items'));
          delete this._showingSubMenu;
        },
        // eslint-disable-next-line @stylistic/max-len
        onInitialized: _ref3 => {
          let {
            component
          } = _ref3;
          return this._onContextMenuInitialized(component, item, widget);
        },
        onDisposing: _ref4 => {
          let {
            component
          } = _ref4;
          return this._onContextMenuDisposing(component, item);
        }
      });
      // prevent showing context menu by toggle "close" click
      if (!isTouchMode) {
        // i.e. widget.NAME === 'dxButton'
        widget._contextMenu._dropDownButtonElement = widget.$element();
        if (widget.NAME === 'dxTextBox') {
          widget._contextMenu._dropDownButtonElement = widget.getButton('dropDown').element();
        }
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _isTouchMode() {
    const {
      Browser
    } = getDiagram();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Browser.TouchUI;
  }
  _onContextMenuInitialized(widget, item, rootWidget) {
    var _this$_contextMenuLis2;
    (_this$_contextMenuLis2 = this._contextMenuList) === null || _this$_contextMenuLis2 === void 0 || _this$_contextMenuLis2.push(widget);
    if (item.command) {
      this._commandContextMenus[item.command] = widget;
    }
    this._addContextMenuHelper(item, widget, [], rootWidget);
  }
  _addItemHelper(command, helper) {
    if (command !== undefined) {
      if (this._itemHelpers[command]) {
        throw new Error('Toolbar cannot contain duplicated commands.');
      }
      this._itemHelpers[command] = helper;
    }
  }
  _addContextMenuHelper(item, widget, indexPath, rootWidget) {
    if (item.items) {
      item.items.forEach((subItem, index) => {
        const itemIndexPath = indexPath.concat(index);
        this._addItemHelper(subItem.command, new DiagramToolbarSubItemHelper(widget, itemIndexPath, subItem.command, rootWidget));
        this._addContextMenuHelper(subItem, widget, itemIndexPath, rootWidget);
      });
    }
  }
  _onContextMenuDisposing(widget, item) {
    var _this$_contextMenuLis3;
    (_this$_contextMenuLis3 = this._contextMenuList) === null || _this$_contextMenuLis3 === void 0 || _this$_contextMenuLis3.splice(this._contextMenuList.indexOf(widget), 1);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this._commandContextMenus[item.command];
  }
  _executeCommand(command, name, value) {
    if (this._updateLocked) return;
    if (typeof command === 'number') {
      var _this$bar;
      const valueConverter = this._valueConverters[command];
      if (valueConverter !== null && valueConverter !== void 0 && valueConverter.getCommandValue) {
        // eslint-disable-next-line no-param-reassign
        value = valueConverter.getCommandValue(value);
      }
      (_this$bar = this.bar) === null || _this$bar === void 0 || _this$bar.raiseBarCommandExecuted(command, value);
    } else if (typeof command === 'string') {
      this._onInternalCommandAction({
        command
      });
    }
    if (name !== undefined) {
      this._onCustomCommandAction({
        name
      });
    }
  }
  _createOnInternalCommand() {
    // @ts-expect-error ts-error
    this._onInternalCommandAction = this._createActionByOption('onInternalCommand');
  }
  _createOnCustomCommand() {
    // @ts-expect-error ts-error
    this._onCustomCommandAction = this._createActionByOption('onCustomCommand');
  }
  _setItemEnabled(command, enabled) {
    if (command in this._itemHelpers) {
      const helper = this._itemHelpers[command];
      if (helper.canUpdate(this._showingSubMenu)) {
        helper.setEnabled(enabled);
      }
    }
  }
  _setEnabled(enabled) {
    var _this$_toolbarInstanc, _this$_contextMenuLis4;
    (_this$_toolbarInstanc = this._toolbarInstance) === null || _this$_toolbarInstanc === void 0 || _this$_toolbarInstanc.option('disabled', !enabled);
    (_this$_contextMenuLis4 = this._contextMenuList) === null || _this$_contextMenuLis4 === void 0 || _this$_contextMenuLis4.forEach(contextMenu => {
      contextMenu.option('disabled', !enabled);
    });
  }
  _setItemValue(command, value) {
    try {
      this._updateLocked = true;
      if (command in this._itemHelpers) {
        const helper = this._itemHelpers[command];
        if (helper.canUpdate(this._showingSubMenu)) {
          const valueConverter = this._valueConverters[command];
          if (valueConverter !== null && valueConverter !== void 0 && valueConverter.getEditorValue) {
            // eslint-disable-next-line no-param-reassign
            value = valueConverter.getEditorValue(value);
          }
          // eslint-disable-next-line @typescript-eslint/init-declarations
          let displayValue;
          if (valueConverter !== null && valueConverter !== void 0 && valueConverter.getEditorDisplayValue) {
            displayValue = valueConverter.getEditorDisplayValue(value);
          }
          const contextMenu = this._commandContextMenus[command];
          helper.setValue(value, displayValue, contextMenu, contextMenu && command);
        }
      }
    } finally {
      this._updateLocked = false;
    }
  }
  _setItemSubItems(command, items) {
    this._updateLocked = true;
    if (command in this._itemHelpers) {
      const helper = this._itemHelpers[command];
      if (helper.canUpdate(this._showingSubMenu)) {
        const contextMenu = this._commandContextMenus[command];
        helper.setItems(items, contextMenu, contextMenu && command);
      }
    }
    this._updateLocked = false;
  }
  _createOnSubMenuVisibilityChangingAction() {
    this._onSubMenuVisibilityChangingAction = this._createActionByOption(
    // @ts-expect-error ts-error
    'onSubMenuVisibilityChanging');
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'isMobileView':
        $('body').removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
        this._invalidate();
        break;
      case 'onSubMenuVisibilityChanging':
        this._createOnSubMenuVisibilityChangingAction();
        break;
      case 'onInternalCommand':
        this._createOnInternalCommand();
        break;
      case 'onCustomCommand':
        this._createOnCustomCommand();
        break;
      case 'container':
      case 'commands':
        this._invalidate();
        break;
      case 'export':
        break;
      default:
        super._optionChanged(args);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(super._getDefaultOptions(), {
      isMobileView: false,
      export: {
        fileName: 'Diagram'
      },
      locateInMenu: 'auto',
      buttonStylingMode: 'text',
      buttonType: 'normal',
      editorStylingMode: 'filled',
      skipAdjustSize: false
    });
  }
  setCommandChecked(command, checked) {
    this._setItemValue(command, checked);
  }
  setCommandEnabled(command, enabled) {
    this._setItemEnabled(command, enabled);
  }
}
export default DiagramToolbar;
