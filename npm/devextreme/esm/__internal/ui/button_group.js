/**
* DevExtreme (esm/__internal/ui/button_group.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../core/component_registrator';
import $ from '../../core/renderer';
import { BindableTemplate } from '../../core/templates/bindable_template';
import { extend } from '../../core/utils/extend';
import { isDefined, isFunction } from '../../core/utils/type';
import Button from '../../ui/button';
import CollectionWidgetEdit from '../../ui/collection/ui.collection_widget.edit';
import Widget from '../core/widget/widget';
export const BUTTON_GROUP_CLASS = 'dx-buttongroup';
const BUTTON_GROUP_WRAPPER_CLASS = `${BUTTON_GROUP_CLASS}-wrapper`;
const BUTTON_GROUP_ITEM_CLASS = `${BUTTON_GROUP_CLASS}-item`;
const BUTTON_GROUP_FIRST_ITEM_CLASS = `${BUTTON_GROUP_CLASS}-first-item`;
const BUTTON_GROUP_LAST_ITEM_CLASS = `${BUTTON_GROUP_CLASS}-last-item`;
const BUTTON_GROUP_ITEM_HAS_WIDTH = `${BUTTON_GROUP_ITEM_CLASS}-has-width`;
const SHAPE_STANDARD_CLASS = 'dx-shape-standard';
const BUTTON_GROUP_STYLING_MODE_CLASS = {
  contained: 'dx-buttongroup-mode-contained',
  outlined: 'dx-buttongroup-mode-outlined',
  text: 'dx-buttongroup-mode-text'
};
class ButtonCollection extends CollectionWidgetEdit {
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(($container, data, model) => {
        this._prepareItemStyles($container);
        const {
          buttonTemplate
        } = this.option();
        this._createComponent($container, Button, extend({}, model, data, this._getBasicButtonOptions(), {
          _templateData: this._hasCustomTemplate(buttonTemplate) ? model : {},
          template: model.template || buttonTemplate
        }));
      }, ['text', 'type', 'icon', 'disabled', 'visible', 'hint'], this.option('integrationOptions.watchMethod'))
    });
  }
  _getBasicButtonOptions() {
    const {
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode
    } = this.option();
    return {
      focusStateEnabled: false,
      // @ts-expect-error ts-error
      onClick: null,
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode
    };
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      itemTemplateProperty: null
    });
  }
  _hasCustomTemplate(template) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isFunction(template) || this.option('integrationOptions.templates')[template];
  }
  _selectedItemClass() {
    return 'dx-item-selected dx-state-selected';
  }
  _prepareItemStyles($item) {
    // @ts-expect-error ts-error
    const itemIndex = $item.data('dxItemIndex');
    if (itemIndex === 0) {
      $item.addClass(BUTTON_GROUP_FIRST_ITEM_CLASS);
    }
    const {
      items
    } = this.option();
    if (items && itemIndex === items.length - 1) {
      $item.addClass(BUTTON_GROUP_LAST_ITEM_CLASS);
    }
    $item.addClass(SHAPE_STANDARD_CLASS);
  }
  _renderItemContent(args) {
    args.container = $(args.container).parent();
    return super._renderItemContent(args);
  }
  _setAriaSelectionAttribute($target, value) {
    this.setAria('pressed', value, $target);
  }
  _renderItemContentByNode(args, $node) {
    args.container = $(args.container).children().first();
    return super._renderItemContentByNode(args, $node);
  }
  _focusTarget() {
    return this.$element().parent();
  }
  _keyboardEventBindingTarget() {
    return this._focusTarget();
  }
  _enterKeyHandler(e) {
    e.preventDefault();
    super._enterKeyHandler(e);
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _itemClass() {
    return BUTTON_GROUP_ITEM_CLASS;
  }
  _itemSelectHandler(e) {
    const {
      selectionMode
    } = this.option();
    if (selectionMode === 'single' && this.isItemSelected(e.currentTarget)) {
      return;
    }
    super._itemSelectHandler(e);
  }
}
class ButtonGroup extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      focusStateEnabled: true,
      selectionMode: 'single',
      selectedItems: [],
      selectedItemKeys: [],
      stylingMode: 'contained',
      keyExpr: 'text',
      items: [],
      buttonTemplate: 'content',
      // @ts-expect-error ts-error
      onSelectionChanged: null,
      // @ts-expect-error ts-error
      onItemClick: null
    });
  }
  _init() {
    super._init();
    this._createItemClickAction();
  }
  _createItemClickAction() {
    this._itemClickAction = this._createActionByOption('onItemClick');
  }
  _initMarkup() {
    this.setAria('role', 'group');
    this.$element().addClass(BUTTON_GROUP_CLASS);
    this._renderStylingMode();
    this._renderButtons();
    this._syncSelectionOptions();
    super._initMarkup();
  }
  _renderStylingMode() {
    const {
      stylingMode
    } = this.option();
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in BUTTON_GROUP_STYLING_MODE_CLASS) {
      this.$element().removeClass(BUTTON_GROUP_STYLING_MODE_CLASS[key]);
    }
    this.$element().addClass(BUTTON_GROUP_STYLING_MODE_CLASS[stylingMode ?? 'contained']);
  }
  _fireSelectionChangeEvent(addedItems, removedItems) {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })({
      addedItems,
      removedItems
    });
  }
  _renderButtons() {
    const $buttons = $('<div>').addClass(BUTTON_GROUP_WRAPPER_CLASS).appendTo(this.$element());
    const {
      selectedItems,
      selectionMode,
      items,
      keyExpr,
      buttonTemplate,
      selectedItemKeys,
      focusStateEnabled,
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode,
      accessKey,
      tabIndex
    } = this.option();
    const options = {
      selectionMode,
      items,
      keyExpr,
      buttonTemplate,
      selectedItemKeys,
      focusStateEnabled,
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode,
      accessKey,
      tabIndex,
      noDataText: '',
      selectionRequired: false,
      onItemRendered: e => {
        const {
          width
        } = this.option();
        if (isDefined(width)) {
          $(e.itemElement).addClass(BUTTON_GROUP_ITEM_HAS_WIDTH);
        }
      },
      onSelectionChanged: e => {
        this._syncSelectionOptions();
        this._fireSelectionChangeEvent(e.addedItems, e.removedItems);
      },
      onItemClick: e => {
        this._itemClickAction(e);
      }
    };
    if (isDefined(selectedItems) && selectedItems.length) {
      options.selectedItems = selectedItems;
    }
    this._buttonsCollection = this._createComponent($buttons, ButtonCollection, options);
  }
  _syncSelectionOptions() {
    this._setOptionWithoutOptionChange('selectedItems', this._buttonsCollection.option('selectedItems'));
    this._setOptionWithoutOptionChange('selectedItemKeys', this._buttonsCollection.option('selectedItemKeys'));
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'stylingMode':
      case 'selectionMode':
      case 'keyExpr':
      case 'buttonTemplate':
      case 'items':
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
      case 'tabIndex':
        this._invalidate();
        break;
      case 'selectedItemKeys':
      case 'selectedItems':
        this._buttonsCollection.option(name, value);
        break;
      case 'onItemClick':
        this._createItemClickAction();
        break;
      case 'onSelectionChanged':
        break;
      case 'width':
        super._optionChanged(args);
        this._buttonsCollection.itemElements().toggleClass(BUTTON_GROUP_ITEM_HAS_WIDTH, !!value);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
registerComponent('dxButtonGroup', ButtonGroup);
export default ButtonGroup;
