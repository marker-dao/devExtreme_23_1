"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _toolbar = require("./strategy/toolbar.multiline");
var _toolbar2 = require("./strategy/toolbar.singleline");
var _toolbar3 = _interopRequireDefault(require("./toolbar.base"));
var _toolbar4 = require("./toolbar.utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TOOLBAR_MULTILINE_CLASS = 'dx-toolbar-multiline';
const TOOLBAR_AUTO_HIDE_TEXT_CLASS = 'dx-toolbar-text-auto-hide';
class Toolbar extends _toolbar3.default {
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
    this._layoutStrategy = this._isMultiline() ? new _toolbar.MultiLineStrategy(this) : new _toolbar2.SingleLineStrategy(this);
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
      (0, _toolbar4.toggleItemFocusableElementTabIndex)(this, item);
    }
    if (property === 'location') {
      this.repaint();
    }
  }
  _updateFocusableItemsTabIndex() {
    this._getToolbarItems().forEach(item => (0, _toolbar4.toggleItemFocusableElementTabIndex)(this, item));
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
(0, _component_registrator.default)('dxToolbar', Toolbar);
var _default = exports.default = Toolbar;