/**
* DevExtreme (esm/__internal/ui/toolbar/internal/toolbar.menu.list.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import { each } from '../../../../core/utils/iterator';
import { ListBase } from '../../../ui/list/m_list.base';
const TOOLBAR_MENU_ACTION_CLASS = 'dx-toolbar-menu-action';
const TOOLBAR_HIDDEN_BUTTON_CLASS = 'dx-toolbar-hidden-button';
const TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS = 'dx-toolbar-hidden-button-group';
const TOOLBAR_MENU_SECTION_CLASS = 'dx-toolbar-menu-section';
const TOOLBAR_MENU_CUSTOM_CLASS = 'dx-toolbar-menu-custom';
const TOOLBAR_MENU_LAST_SECTION_CLASS = 'dx-toolbar-menu-last-section';
const SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
export default class ToolbarMenuList extends ListBase {
  _init() {
    super._init();
    this._activeStateUnit = `.${TOOLBAR_MENU_ACTION_CLASS}:not(.${TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS})`;
  }
  _initMarkup() {
    this._renderSections();
    super._initMarkup();
    this._setMenuRole();
  }
  _getSections() {
    return this._itemContainer().children();
  }
  _itemElements() {
    return this._getSections().children(this._itemSelector());
  }
  _renderSections() {
    const $container = this._itemContainer();
    each(['before', 'center', 'after', 'menu'], (_, section) => {
      const sectionName = `_$${section}Section`;
      if (!this[sectionName]) {
        this[sectionName] = $('<div>').addClass(TOOLBAR_MENU_SECTION_CLASS);
      }
      this[sectionName].appendTo($container);
    });
  }
  _renderItems(items) {
    super._renderItems(items);
    this._updateSections();
  }
  _setMenuRole() {
    const $menuContainer = this.$element().find(`.${SCROLLVIEW_CONTENT_CLASS}`);
    $menuContainer.attr('role', 'menu');
  }
  _updateSections() {
    const $sections = this.$element().find(`.${TOOLBAR_MENU_SECTION_CLASS}`);
    $sections.removeClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
    $sections.not(':empty').eq(-1).addClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
  }
  _renderItem(index, item, _$container, $itemToReplace) {
    const $container = this[`_$${item.location ?? 'menu'}Section`];
    const $itemElement = super._renderItem(index, item, $container, $itemToReplace);
    const itemCssClasses = this._getItemCssClasses(item);
    $itemElement.addClass(itemCssClasses.join(' '));
    return $itemElement;
  }
  _getItemCssClasses(item) {
    const cssClasses = [];
    const actionableComponents = this._getActionableComponents();
    // @ts-expect-error ts-error
    if (this._getItemTemplateName({
      itemData: item
    })) {
      cssClasses.push(TOOLBAR_MENU_CUSTOM_CLASS);
    }
    if (!item.location && !item.widget || actionableComponents.some(component => component === item.widget)) {
      cssClasses.push(TOOLBAR_MENU_ACTION_CLASS);
    }
    if (item.widget === 'dxButton') {
      cssClasses.push(TOOLBAR_HIDDEN_BUTTON_CLASS);
    }
    if (item.widget === 'dxButtonGroup') {
      cssClasses.push(TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS);
    }
    if (item.cssClass) {
      cssClasses.push(item.cssClass);
    }
    return cssClasses;
  }
  _getActionableComponents() {
    return ['dxButton', 'dxButtonGroup'];
  }
  _getItemTemplateName(args) {
    const template = super._getItemTemplateName(args);
    const data = args.itemData;
    const menuTemplate = data === null || data === void 0 ? void 0 : data.menuItemTemplate;
    return menuTemplate ?? template;
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _itemClickHandler(e, args, config) {
    if ($(e.target).closest(`.${TOOLBAR_MENU_ACTION_CLASS}`).length) {
      super._itemClickHandler(e, args, config);
    }
  }
  _clean() {
    this._getSections().empty();
    super._clean();
  }
}
