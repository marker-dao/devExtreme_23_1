/**
* DevExtreme (esm/__internal/grids/grid_core/header_panel/m_header_panel.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { getPathParts } from '../../../../core/utils/data';
import { isDefined } from '../../../../core/utils/type';
import Toolbar from '../../../../ui/toolbar';
import { normalizeToolbarItems } from '../../../grids/new/grid_core/toolbar/utils';
import { ColumnsView } from '../views/m_columns_view';
const HEADER_PANEL_CLASS = 'header-panel';
const TOOLBAR_BUTTON_CLASS = 'toolbar-button';
const TOOLBAR_ARIA_LABEL = '-ariaToolbar';
const DEFAULT_TOOLBAR_ITEM_NAMES = ['addRowButton', 'applyFilterButton', 'columnChooserButton', 'exportButton', 'groupPanel', 'revertButton', 'saveButton', 'searchPanel'];
export class HeaderPanel extends ColumnsView {
  init() {
    super.init();
    this._editingController = this.getController('editing');
    this._headerFilterController = this.getController('headerFilter');
    this.createAction('onToolbarPreparing', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  /**
   * @extended: column_chooser, editing, filter_row, search
   */
  _getToolbarItems() {
    return [];
  }
  _getButtonContainer() {
    return $('<div>').addClass(this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS));
  }
  _getToolbarButtonClass(specificClass) {
    const secondClass = specificClass ? ` ${specificClass}` : '';
    return this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS) + secondClass;
  }
  _getToolbarOptions() {
    const userToolbarOptions = this.option('toolbar');
    const options = {
      toolbarOptions: {
        items: this._getToolbarItems(),
        visible: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.visible,
        disabled: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.disabled,
        onItemRendered(e) {
          const itemRenderedCallback = e.itemData.onItemRendered;
          if (itemRenderedCallback) {
            itemRenderedCallback(e);
          }
        }
      }
    };
    const userItems = userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.items;
    options.toolbarOptions.items = normalizeToolbarItems(options.toolbarOptions.items, userItems, DEFAULT_TOOLBAR_ITEM_NAMES);
    this.executeAction('onToolbarPreparing', options);
    if (options.toolbarOptions && !isDefined(options.toolbarOptions.visible)) {
      const toolbarItems = options.toolbarOptions.items;
      options.toolbarOptions.visible = !!(toolbarItems !== null && toolbarItems !== void 0 && toolbarItems.length);
    }
    return options.toolbarOptions;
  }
  _renderCore() {
    if (!this._toolbar) {
      const $headerPanel = this.element();
      $headerPanel.addClass(this.addWidgetPrefix(HEADER_PANEL_CLASS));
      const label = messageLocalization.format(this.component.NAME + TOOLBAR_ARIA_LABEL);
      const $toolbar = $('<div>').attr('aria-label', label).appendTo($headerPanel);
      this._toolbar = this._createComponent($toolbar, Toolbar, this._toolbarOptions);
    } else {
      this._toolbar.option(this._toolbarOptions);
    }
  }
  _columnOptionChanged() {}
  _handleDataChanged() {
    if (this._requireReady) {
      this.render();
    }
  }
  _isDisabledDefinedByUser(name) {
    var _this$option;
    const userItems = (_this$option = this.option('toolbar')) === null || _this$option === void 0 ? void 0 : _this$option.items;
    const userItem = userItems === null || userItems === void 0 ? void 0 : userItems.find(item => (item === null || item === void 0 ? void 0 : item.name) === name);
    return isDefined(userItem === null || userItem === void 0 ? void 0 : userItem.disabled);
  }
  render() {
    this._toolbarOptions = this._getToolbarOptions();
    super.render.apply(this, arguments);
  }
  setToolbarItemDisabled(name, disabled) {
    const toolbar = this._toolbar;
    const isDefinedByUser = this._isDisabledDefinedByUser(name);
    if (!toolbar || isDefinedByUser) {
      return;
    }
    const items = toolbar.option('items') ?? [];
    const itemIndex = items.findIndex(item => item.name === name);
    if (itemIndex < 0) {
      return;
    }
    const item = toolbar.option(`items[${itemIndex}]`);
    toolbar.option(`items[${itemIndex}].disabled`, disabled);
    if (item.options) {
      toolbar.option(`items[${itemIndex}].options.disabled`, disabled);
    }
  }
  updateToolbarDimensions() {
    var _this$_toolbar;
    (_this$_toolbar = this._toolbar) === null || _this$_toolbar === void 0 || _this$_toolbar.updateDimensions();
  }
  getHeaderPanel() {
    return this.element();
  }
  getHeight() {
    return this.getElementHeight();
  }
  optionChanged(args) {
    if (args.name === 'onToolbarPreparing') {
      this._invalidate();
      args.handled = true;
    }
    if (args.name === 'toolbar') {
      const parts = getPathParts(args.fullName);
      const optionName = args.fullName.replace(/^toolbar\./, '');
      if (parts.length === 1 || parts[1] === 'visible') {
        // `toolbar`, `toolbar.visible` case
        this._invalidate();
      } else if (parts[1] === 'items') {
        if (parts.length === 2) {
          // `toolbar.items` case
          this._invalidate();
        } else if (parts.length === 3) {
          var _this$_toolbar2;
          // `toolbar.items[i]` case
          const normalizedItem = normalizeToolbarItems(this._getToolbarItems(), [args.value], DEFAULT_TOOLBAR_ITEM_NAMES)[0];
          (_this$_toolbar2 = this._toolbar) === null || _this$_toolbar2 === void 0 || _this$_toolbar2.option(optionName, normalizedItem);
        } else if (parts.length >= 4) {
          var _this$_toolbar3;
          // `toolbar.items[i].prop` case
          (_this$_toolbar3 = this._toolbar) === null || _this$_toolbar3 === void 0 || _this$_toolbar3.option(optionName, args.value);
        }
      } else {
        var _this$_toolbar4;
        // `toolbar.disabled` case
        (_this$_toolbar4 = this._toolbar) === null || _this$_toolbar4 === void 0 || _this$_toolbar4.option(optionName, args.value);
      }
      args.handled = true;
    }
    super.optionChanged(args);
  }
  /**
   * @extended: column_chooser, editing
   */
  isVisible() {
    return !!(this._toolbarOptions && this._toolbarOptions.visible);
  }
  /**
   * @extended: DataGrid's grouping
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allowDragging(column) {
    return false;
  }
  hasGroupedColumns() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getContextMenuItems(options) {
    return undefined;
  }
}
const resizing = Base => class HeaderPanelResizingExtender extends Base {
  _updateDimensionsCore() {
    // @ts-expect-error
    super._updateDimensionsCore.apply(this, arguments);
    this.getView('headerPanel').updateToolbarDimensions();
  }
};
export const headerPanelModule = {
  defaultOptions() {
    return {};
  },
  views: {
    headerPanel: HeaderPanel
  },
  extenders: {
    controllers: {
      resizing
    }
  }
};
