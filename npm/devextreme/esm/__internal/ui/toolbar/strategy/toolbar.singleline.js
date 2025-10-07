/**
* DevExtreme (esm/__internal/ui/toolbar/strategy/toolbar.singleline.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../core/renderer';
import { deferRender } from '../../../../core/utils/common';
import { compileGetter } from '../../../../core/utils/data';
import { each } from '../../../../core/utils/iterator';
import { getWidth } from '../../../../core/utils/size';
import DropDownMenu from '../../../ui/toolbar/internal/toolbar.menu';
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS = 'dx-toolbar-menu-container';
const TOOLBAR_BUTTON_CLASS = 'dx-toolbar-button';
const TOOLBAR_AUTO_HIDE_ITEM_CLASS = 'dx-toolbar-item-auto-hide';
const TOOLBAR_HIDDEN_ITEM = 'dx-toolbar-item-invisible';
export class SingleLineStrategy {
  constructor(toolbar) {
    this._restoreItems = [];
    this._toolbar = toolbar;
  }
  _initMarkup() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    deferRender(() => {
      this._renderOverflowMenu();
      this._renderMenuItems();
    });
  }
  _renderOverflowMenu() {
    if (!this._hasVisibleMenuItems()) {
      return;
    }
    this._renderMenuButtonContainer();
    const $menu = $('<div>').appendTo(this._overflowMenuContainer());
    const itemClickAction = this._toolbar._createActionByOption('onItemClick');
    const menuItemTemplate = this._toolbar._getTemplateByOption('menuItemTemplate');
    const {
      disabled,
      menuContainer
    } = this._toolbar.option();
    this._menu = this._toolbar._createComponent($menu, DropDownMenu, {
      disabled,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      itemTemplate: () => menuItemTemplate,
      onItemClick: e => {
        itemClickAction(e);
      },
      container: menuContainer,
      onOptionChanged: _ref => {
        let {
          name,
          value
        } = _ref;
        if (name === 'opened') {
          this._toolbar.option('overflowMenuVisible', value);
        }
        if (name === 'items') {
          this._updateMenuVisibility(value);
        }
      }
    });
  }
  renderMenuItems() {
    if (!this._menu) {
      this._renderOverflowMenu();
    }
    if (this._menu) {
      this._menu.option('items', this._getMenuItems());
      const {
        items = []
      } = this._menu.option();
      if (!items.length) {
        this._menu.option('opened', false);
      }
    }
  }
  _renderMenuButtonContainer() {
    this._$overflowMenuContainer = $('<div>').appendTo(this._toolbar._$afterSection).addClass(TOOLBAR_BUTTON_CLASS).addClass(TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS);
  }
  _overflowMenuContainer() {
    return this._$overflowMenuContainer;
  }
  _updateMenuVisibility(menuItems) {
    const items = menuItems ?? this._getMenuItems();
    const isMenuVisible = items.length && this._hasVisibleMenuItems(items);
    this._toggleMenuVisibility(!!isMenuVisible);
  }
  _toggleMenuVisibility(value) {
    if (!this._overflowMenuContainer()) {
      return;
    }
    this._overflowMenuContainer().toggleClass(INVISIBLE_STATE_CLASS, !value);
  }
  _renderMenuItems() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    deferRender(() => {
      this.renderMenuItems();
    });
  }
  _dimensionChanged() {
    this.renderMenuItems();
  }
  _getToolbarItems() {
    const {
      items = []
    } = this._toolbar.option();
    return items.filter(item => !this._toolbar._isMenuItem(item));
  }
  _getHiddenItems() {
    return this._toolbar._itemContainer().children(`.${TOOLBAR_AUTO_HIDE_ITEM_CLASS}.${TOOLBAR_HIDDEN_ITEM}`).not(`.${INVISIBLE_STATE_CLASS}`);
  }
  _getMenuItems() {
    const {
      items = []
    } = this._toolbar.option();
    const menuItems = items.filter(item => this._toolbar._isMenuItem(item));
    const $hiddenItems = this._getHiddenItems();
    this._restoreItems = this._restoreItems ?? [];
    const overflowItems = [].slice.call($hiddenItems).map(hiddenItem => {
      const itemData = this._toolbar._getItemData(hiddenItem);
      const $itemContainer = $(hiddenItem);
      const $itemMarkup = $itemContainer.children();
      return _extends({
        menuItemTemplate: () => {
          this._restoreItems.push({
            container: $itemContainer,
            item: $itemMarkup
          });
          const $container = $('<div>').addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
          return $container.append($itemMarkup);
        }
      }, itemData);
    });
    return [...overflowItems, ...menuItems];
  }
  _hasVisibleMenuItems(items) {
    const menuItems = items ?? this._toolbar.option('items');
    let result = false;
    const optionGetter = compileGetter('visible');
    const overflowGetter = compileGetter('locateInMenu');
    each(menuItems, (index, item) => {
      // @ts-expect-error ts-error
      const itemVisible = optionGetter(item, {
        functionsAsIs: true
      });
      // @ts-expect-error ts-error
      const itemOverflow = overflowGetter(item, {
        functionsAsIs: true
      });
      if (itemVisible !== false && (itemOverflow === 'auto' || itemOverflow === 'always')) {
        result = true;
      }
    });
    return result;
  }
  _arrangeItems() {
    this._toolbar._$centerSection.css({
      margin: '0 auto',
      float: 'none'
    });
    each(this._restoreItems ?? [], (_, obj) => {
      $(obj.container).append(obj.item);
    });
    this._restoreItems = [];
    const elementWidth = getWidth(this._toolbar.$element());
    this._hideOverflowItems(elementWidth);
    return elementWidth;
  }
  _hideOverflowItems(width) {
    const overflowItems = this._toolbar.$element().find(`.${TOOLBAR_AUTO_HIDE_ITEM_CLASS}`);
    if (!overflowItems.length) {
      return;
    }
    const elementWidth = width ?? getWidth(this._toolbar.$element());
    $(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
    let itemsWidth = this._getItemsWidth();
    while (overflowItems.length && elementWidth < itemsWidth) {
      const $item = overflowItems.eq(-1);
      $item.addClass(TOOLBAR_HIDDEN_ITEM);
      itemsWidth = this._getItemsWidth();
      [].splice.apply(overflowItems, [-1, 1]);
    }
  }
  _getItemsWidth() {
    return this._toolbar._getSummaryItemsSize('width', [this._toolbar._$beforeSection, this._toolbar._$centerSection, this._toolbar._$afterSection]);
  }
  _itemOptionChanged(item, property, value) {
    // @ts-expect-error ts-error
    if (property === 'disabled' || property === 'options.disabled') {
      if (this._toolbar._isMenuItem(item)) {
        var _this$_menu;
        (_this$_menu = this._menu) === null || _this$_menu === void 0 || _this$_menu._itemOptionChanged(item, 'disabled', value);
        return;
      }
    }
    this.renderMenuItems();
  }
  _renderItem(item, $itemElement) {
    if (item.locateInMenu === 'auto') {
      $itemElement.addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
    }
  }
  _optionChanged(name, value) {
    var _this$_menu2, _this$_menu3, _this$_menu4, _this$_menu5, _this$_menu6;
    switch (name) {
      case 'disabled':
        (_this$_menu2 = this._menu) === null || _this$_menu2 === void 0 || _this$_menu2.option(name, value);
        break;
      case 'overflowMenuVisible':
        (_this$_menu3 = this._menu) === null || _this$_menu3 === void 0 || _this$_menu3.option('opened', value);
        break;
      case 'onItemClick':
        (_this$_menu4 = this._menu) === null || _this$_menu4 === void 0 || _this$_menu4.option(name, value);
        break;
      case 'menuContainer':
        (_this$_menu5 = this._menu) === null || _this$_menu5 === void 0 || _this$_menu5.option('container', value);
        break;
      case 'menuItemTemplate':
        (_this$_menu6 = this._menu) === null || _this$_menu6 === void 0 || _this$_menu6.option('itemTemplate', value);
        break;
      default:
        break;
    }
  }
}
