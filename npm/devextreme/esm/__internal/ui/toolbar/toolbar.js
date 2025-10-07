/**
* DevExtreme (esm/__internal/ui/toolbar/toolbar.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../../core/component_registrator';
import { MultiLineStrategy } from './strategy/toolbar.multiline';
import { SingleLineStrategy } from './strategy/toolbar.singleline';
import ToolbarBase from './toolbar.base';
import { toggleItemFocusableElementTabIndex } from './toolbar.utils';
const TOOLBAR_MULTILINE_CLASS = 'dx-toolbar-multiline';
const TOOLBAR_AUTO_HIDE_TEXT_CLASS = 'dx-toolbar-text-auto-hide';
class Toolbar extends ToolbarBase {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      menuItemTemplate: 'menuItem',
      overflowMenuVisible: false,
      multiline: false
    });
  }
  _isMultiline() {
    const {
      multiline
    } = this.option();
    return multiline;
  }
  _dimensionChanged(dimension) {
    if (dimension === 'height') {
      return;
    }
    super._dimensionChanged();
    this._layoutStrategy._dimensionChanged();
  }
  _initMarkup() {
    super._initMarkup();
    this._updateFocusableItemsTabIndex();
    this._layoutStrategy._initMarkup();
  }
  _renderToolbar() {
    super._renderToolbar();
    this._renderLayoutStrategy();
  }
  _itemContainer() {
    if (this._isMultiline()) {
      return this._$toolbarItemsContainer;
    }
    return super._itemContainer();
  }
  _renderLayoutStrategy() {
    this.$element().toggleClass(TOOLBAR_MULTILINE_CLASS, this._isMultiline());
    this._layoutStrategy = this._isMultiline() ? new MultiLineStrategy(this) : new SingleLineStrategy(this);
  }
  _renderSections() {
    if (this._isMultiline()) {
      return;
    }
    super._renderSections();
  }
  _postProcessRenderItems() {
    this._layoutStrategy._hideOverflowItems();
    this._layoutStrategy._updateMenuVisibility();
    super._postProcessRenderItems();
    this._layoutStrategy._renderMenuItems();
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const $itemElement = super._renderItem(index, itemData, $container, $itemToReplace);
    this._layoutStrategy._renderItem(itemData, $itemElement);
    const {
      widget,
      showText
    } = itemData;
    if (widget === 'dxButton' && showText === 'inMenu') {
      $itemElement.toggleClass(TOOLBAR_AUTO_HIDE_TEXT_CLASS);
    }
    return $itemElement;
  }
  // for filemanager
  _getItemsWidth() {
    return this._layoutStrategy._getItemsWidth();
  }
  // for filemanager
  _getMenuItems() {
    return this._layoutStrategy._getMenuItems();
  }
  _getToolbarItems() {
    return this._layoutStrategy._getToolbarItems();
  }
  _arrangeItems() {
    if (this.$element().is(':hidden')) {
      return;
    }
    const elementWidth = this._layoutStrategy._arrangeItems();
    if (!this._isMultiline()) {
      super._arrangeItems(elementWidth);
    }
  }
  _itemOptionChanged(item, property, value, prevValue) {
    if (!this._isMenuItem(item)) {
      super._itemOptionChanged(item, property, value, prevValue);
    }
    this._layoutStrategy._itemOptionChanged(item, property, value);
    // @ts-expect-error ts-error
    if (property === 'disabled' || property === 'options.disabled') {
      toggleItemFocusableElementTabIndex(this, item);
    }
    if (property === 'location') {
      this.repaint();
    }
  }
  _updateFocusableItemsTabIndex() {
    this._getToolbarItems().forEach(item => toggleItemFocusableElementTabIndex(this, item));
  }
  _isMenuItem(itemData) {
    return itemData.locateInMenu === 'always';
  }
  _isToolbarItem(itemData) {
    return itemData.location === undefined || itemData.locateInMenu === 'never';
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    this._layoutStrategy._optionChanged(name, value);
    switch (name) {
      case 'menuContainer':
      case 'menuItemTemplate':
      case 'overflowMenuVisible':
        break;
      case 'multiline':
        this._invalidate();
        break;
      case 'disabled':
        super._optionChanged(args);
        this._updateFocusableItemsTabIndex();
        break;
      default:
        super._optionChanged(args);
    }
  }
  // it is not public
  updateDimensions() {
    this._dimensionChanged();
  }
}
registerComponent('dxToolbar', Toolbar);
export default Toolbar;
