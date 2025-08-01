/**
* DevExtreme (esm/__internal/ui/html_editor/modules/m_tableContextMenu.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../../common/core/events/utils/index';
import localizationMessage from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import { camelize, titleize } from '../../../../core/utils/inflector';
import { each } from '../../../../core/utils/iterator';
import { isObject, isString } from '../../../../core/utils/type';
import ContextMenu from '../../../../ui/context_menu';
import Quill from 'devextreme-quill';
import { getTableFormats } from '../utils/m_table_helper';
import { getDefaultClickHandler, getFormatHandlers, ICON_MAP } from '../utils/m_toolbar_helper';
import BaseModule from './m_base';
const MODULE_NAMESPACE = 'dxHtmlEditorTableContextMenu';
const CONTEXT_MENU_EVENT = addNamespace('dxcontextmenu', MODULE_NAMESPACE);
// eslint-disable-next-line import/no-mutable-exports
let TableContextMenuModule = BaseModule;
const localize = name => localizationMessage.format(`dxHtmlEditor-${camelize(name)}`);
if (Quill) {
  // @ts-expect-error
  TableContextMenuModule = class TableContextMenuModule extends BaseModule {
    constructor(quill, options) {
      // @ts-expect-error
      super(quill, options);
      this.enabled = !!options.enabled;
      this._quillContainer = this.editorInstance._getQuillContainer();
      // @ts-expect-error
      this.addCleanCallback(this.prepareCleanCallback());
      this._formatHandlers = getFormatHandlers(this);
      this._tableFormats = getTableFormats(quill);
      if (this.enabled) {
        this._enableContextMenu(options.items);
      }
    }
    _enableContextMenu(items) {
      var _this$_contextMenu;
      (_this$_contextMenu = this._contextMenu) === null || _this$_contextMenu === void 0 || _this$_contextMenu.dispose();
      this._contextMenu = this._createContextMenu(items);
      this._attachEvents();
    }
    _attachEvents() {
      eventsEngine.on(this.editorInstance._getContent(), CONTEXT_MENU_EVENT, this._prepareContextMenuHandler());
    }
    _detachEvents() {
      eventsEngine.off(this.editorInstance._getContent(), CONTEXT_MENU_EVENT);
    }
    _onContextMenuInitialized(e) {
      e.component.registerKeyHandler('escape', () => {
        this.editorInstance.focus();
      });
    }
    _createContextMenu(items) {
      const $container = $('<div>').appendTo(this.editorInstance.$element());
      const menuConfig = this._getMenuConfig(items);
      return this.editorInstance._createComponent($container, ContextMenu, menuConfig);
    }
    showPropertiesForm() {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cell';
      const $element = $(this._targetElement).closest(type === 'cell' ? 'th, td' : 'table');
      this._contextMenu.hide();
      this._formatHandlers[`${type}Properties`]($element);
      this._targetElement = null;
    }
    _isAcceptableItem(widget, acceptableWidgetName) {
      return !widget || widget === acceptableWidgetName;
    }
    _handleObjectItem(item) {
      if (item.name && this._isAcceptableItem(item.widget, 'dxButton')) {
        const defaultButtonItemConfig = this._prepareMenuItemConfig(item.name);
        const buttonItemConfig = extend(true, defaultButtonItemConfig, item);
        return buttonItemConfig;
      }
      if (item.items) {
        item.items = this._prepareMenuItems(item.items);
        return item;
      }
      return item;
    }
    _prepareMenuItemConfig(name) {
      const iconName = ICON_MAP[name] ?? name;
      const buttonText = titleize(name);
      return {
        text: localize(buttonText),
        icon: iconName.toLowerCase(),
        onClick: this._formatHandlers[name] ?? getDefaultClickHandler(this, name)
      };
    }
    _prepareMenuItems(items) {
      const resultItems = [];
      each(items, (_, item) => {
        let newItem;
        if (isObject(item)) {
          newItem = this._handleObjectItem(item);
        } else if (isString(item)) {
          newItem = this._prepareMenuItemConfig(item);
        }
        if (newItem) {
          resultItems.push(newItem);
        }
      });
      return resultItems;
    }
    _getMenuConfig(items) {
      const defaultItems = [{
        text: localize('insert'),
        items: ['insertHeaderRow', 'insertRowAbove', 'insertRowBelow', extend(this._prepareMenuItemConfig('insertColumnLeft'), {
          beginGroup: true
        }), 'insertColumnRight']
      }, {
        text: localize('delete'),
        items: ['deleteColumn', 'deleteRow', 'deleteTable']
      }, extend(this._prepareMenuItemConfig('cellProperties'), {
        onClick: () => {
          this.showPropertiesForm('cell');
        }
      }), extend(this._prepareMenuItemConfig('tableProperties'), {
        onClick: () => {
          this.showPropertiesForm('table');
        }
      })];
      const customItems = this._prepareMenuItems(items !== null && items !== void 0 && items.length ? items : defaultItems);
      return {
        target: this._quillContainer,
        showEvent: null,
        hideOnParentScroll: false,
        onInitialized: e => {
          this._onContextMenuInitialized(e);
        },
        items: customItems
      };
    }
    _prepareContextMenuHandler() {
      return event => {
        if (this._isTableTarget(event.target)) {
          this._targetElement = event.target;
          this._setContextMenuPosition(event);
          this._contextMenu.show();
          event.preventDefault();
        }
      };
    }
    _setContextMenuPosition(event) {
      const startPosition = this._quillContainer.get(0).getBoundingClientRect();
      // @ts-expect-error
      this._contextMenu.option({
        position: {
          my: 'left top',
          at: 'left top',
          collision: 'fit fit',
          offset: {
            x: event.clientX - startPosition.left,
            y: event.clientY - startPosition.top
          }
        }
      });
    }
    _isTableTarget(targetElement) {
      return !!$(targetElement).closest('.dx-htmleditor-content td, .dx-htmleditor-content th').length;
    }
    clean() {
      this._detachEvents();
    }
    option(option, value) {
      if (option === 'tableContextMenu') {
        // @ts-expect-error
        this.handleOptionChangeValue(value);
        return;
      }
      if (option === 'enabled') {
        this.enabled = value;
        value ? this._enableContextMenu() : this.clean();
      } else if (option === 'items') {
        var _this$_contextMenu2;
        (_this$_contextMenu2 = this._contextMenu) === null || _this$_contextMenu2 === void 0 || _this$_contextMenu2.dispose();
        this._contextMenu = this._createContextMenu(value);
      }
    }
    prepareCleanCallback() {
      return () => {
        this.clean();
      };
    }
  };
}
export default TableContextMenuModule;
