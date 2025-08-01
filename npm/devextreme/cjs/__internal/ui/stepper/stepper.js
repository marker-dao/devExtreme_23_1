/**
* DevExtreme (cjs/__internal/ui/stepper/stepper.js)
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
exports.default = exports.STEP_TEXT_CLASS = exports.STEP_SELECTED_CLASS = exports.STEP_OPTIONAL_MARK_CLASS = exports.STEP_LIST_CLASS = exports.STEP_LABEL_CLASS = exports.STEP_INDICATOR_CLASS = exports.STEP_CLASS = exports.STEP_CAPTION_CLASS = exports.STEPPER_VERTICAL_ORIENTATION_CLASS = exports.STEPPER_ITEM_DATA_KEY = exports.STEPPER_HORIZONTAL_ORIENTATION_CLASS = exports.STEPPER_CLASS = exports.ORIENTATION = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _m_bindable_template = require("../../core/templates/m_bindable_template");
var _m_icon = require("../../core/utils/m_icon");
var _collection_widget = _interopRequireDefault(require("../../ui/collection/collection_widget.async"));
var _connector = _interopRequireDefault(require("../../ui/stepper/connector"));
var _stepper_item = _interopRequireWildcard(require("../../ui/stepper/stepper_item"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STEPPER_CLASS = exports.STEPPER_CLASS = 'dx-stepper';
const STEP_LIST_CLASS = exports.STEP_LIST_CLASS = 'dx-step-list';
const STEP_CLASS = exports.STEP_CLASS = 'dx-step';
const STEP_SELECTED_CLASS = exports.STEP_SELECTED_CLASS = 'dx-step-selected';
const STEPPER_HORIZONTAL_ORIENTATION_CLASS = exports.STEPPER_HORIZONTAL_ORIENTATION_CLASS = 'dx-stepper-horizontal';
const STEPPER_VERTICAL_ORIENTATION_CLASS = exports.STEPPER_VERTICAL_ORIENTATION_CLASS = 'dx-stepper-vertical';
const STEP_INDICATOR_CLASS = exports.STEP_INDICATOR_CLASS = 'dx-step-indicator';
const STEP_TEXT_CLASS = exports.STEP_TEXT_CLASS = 'dx-step-text';
const STEP_CAPTION_CLASS = exports.STEP_CAPTION_CLASS = 'dx-step-caption';
const STEP_LABEL_CLASS = exports.STEP_LABEL_CLASS = 'dx-step-label';
const STEP_OPTIONAL_MARK_CLASS = exports.STEP_OPTIONAL_MARK_CLASS = 'dx-step-optional-mark';
const STEPPER_ITEM_DATA_KEY = exports.STEPPER_ITEM_DATA_KEY = 'dxStepperItemData';
const ORIENTATION = exports.ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
class Stepper extends _collection_widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      orientation: 'horizontal',
      linear: true,
      selectionMode: 'single',
      selectOnFocus: true,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      focusStateEnabled: true,
      loopItemFocus: false,
      selectionRequired: true,
      hintExpr(data) {
        return data ? data.hint : undefined;
      },
      _itemAttributes: {
        role: 'tab'
      }
    });
  }
  _supportedKeys() {
    const defaultHandlers = super._supportedKeys();
    const {
      linear,
      selectOnFocus
    } = this.option();
    return _extends({}, defaultHandlers, {
      home: linear && selectOnFocus ? defaultHandlers.leftArrow : defaultHandlers.home,
      end: linear && selectOnFocus ? defaultHandlers.rightArrow : defaultHandlers.end
    });
  }
  _getStepIcon(data) {
    const {
      isValid,
      icon
    } = data;
    if (isValid === false) {
      return _stepper_item.STEP_INVALID_ICON;
    }
    if (isValid === true) {
      return _stepper_item.STEP_VALID_ICON;
    }
    return icon;
  }
  _getStepIndicator(data) {
    const {
      text
    } = data;
    const $indicatorElement = (0, _renderer.default)('<div>').addClass(STEP_INDICATOR_CLASS);
    const iconName = this._getStepIcon(data);
    const $indicatorContent = (0, _m_icon.getImageContainer)(iconName) ?? (0, _renderer.default)('<div>').addClass(STEP_TEXT_CLASS).text(text ?? '');
    $indicatorElement.append($indicatorContent);
    return $indicatorElement;
  }
  _getStepLabel(data) {
    const {
      label
    } = data;
    if ((0, _type.isDefined)(label)) {
      return (0, _renderer.default)('<div>').addClass(STEP_LABEL_CLASS).text(label);
    }
    return (0, _renderer.default)();
  }
  _getStepOptionalMark(data) {
    const {
      optional
    } = data;
    if (optional) {
      const optionalMarkText = _message.default.format('dxStepper-optionalMark');
      return (0, _renderer.default)('<div>').addClass(STEP_OPTIONAL_MARK_CLASS).text(optionalMarkText);
    }
    return (0, _renderer.default)();
  }
  _getStepCaption(data) {
    const $stepLabel = this._getStepLabel(data);
    const $stepOptionalMark = this._getStepOptionalMark(data);
    if ($stepLabel.length || $stepOptionalMark.length) {
      const $stepCaption = (0, _renderer.default)('<div>').addClass(STEP_CAPTION_CLASS);
      $stepCaption.append($stepLabel).append($stepOptionalMark);
      return $stepCaption;
    }
    return (0, _renderer.default)();
  }
  _prepareDefaultItemTemplate(data, $container) {
    const $stepIndicator = this._getStepIndicator(data);
    const $stepLabel = this._getStepCaption(data);
    $container.append($stepIndicator).append($stepLabel);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new _m_bindable_template.BindableTemplate(($container, data) => {
        this._prepareDefaultItemTemplate(data, $container);
      }, ['text', 'icon', 'label', 'isValid', 'optional'], this.option('integrationOptions.watchMethod'))
    });
  }
  _createItemByTemplate(itemTemplate, renderArgs) {
    const {
      itemData,
      index
    } = renderArgs;
    return super._createItemByTemplate(itemTemplate, _extends({}, renderArgs, {
      itemData: _extends({
        text: `${index + 1}`
      }, itemData)
    }));
  }
  _getItemInstance($item) {
    return _stepper_item.default.getInstance($item);
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const $itemFrame = super._renderItem(index, itemData, $container, $itemToReplace);
    this._getItemInstance($itemFrame).updateInvalidClass(itemData.isValid);
    return $itemFrame;
  }
  _postprocessRenderItem(args) {
    super._postprocessRenderItem(args);
    const {
      selectedIndex = 0
    } = this.option();
    const itemInstance = this._getItemInstance(args.itemElement);
    itemInstance.changeCompleted(args.itemIndex < selectedIndex);
  }
  _itemClass() {
    return STEP_CLASS;
  }
  _itemContainer() {
    return this._$stepsContainer;
  }
  _selectedItemClass() {
    return STEP_SELECTED_CLASS;
  }
  _isItemSelected(index) {
    const {
      items = [],
      selectedItem
    } = this.option();
    return selectedItem === items[index];
  }
  _itemDataKey() {
    return STEPPER_ITEM_DATA_KEY;
  }
  _init() {
    super._init();
    this.setAria('role', 'tablist');
    this._appendStepsContainer();
  }
  _initMarkup() {
    (0, _renderer.default)(this.element()).addClass(STEPPER_CLASS);
    this._renderConnector();
    this._toggleOrientationClass();
    this._setAriaOrientation();
    super._initMarkup();
  }
  _renderConnector() {
    if (this._connector) {
      return;
    }
    const {
      orientation
    } = this.option();
    this._connector = this._createComponent((0, _renderer.default)('<div>'), _connector.default, {
      orientation,
      size: this._getConnectorSize(),
      value: this._getConnectorValue()
    });
    (0, _renderer.default)(this.element()).prepend(this._connector.$element());
  }
  _getConnectorSize() {
    const {
      items = []
    } = this.option();
    const itemRatio = 100 / (items.length || 1);
    return 100 - itemRatio;
  }
  _getConnectorValue() {
    const {
      items = [],
      selectedIndex = 0
    } = this.option();
    const segmentsCount = items.length - 1;
    const itemRatio = 100 / Math.max(segmentsCount, 1);
    return selectedIndex * itemRatio;
  }
  _appendStepsContainer() {
    this._$stepsContainer = (0, _renderer.default)('<div>').addClass(STEP_LIST_CLASS);
    (0, _renderer.default)(this.element()).append(this._$stepsContainer);
  }
  _setAriaOrientation() {
    const {
      orientation
    } = this.option();
    this.setAria('orientation', orientation);
  }
  _toggleOrientationClass() {
    (0, _renderer.default)(this.element()).toggleClass(STEPPER_HORIZONTAL_ORIENTATION_CLASS, this._isHorizontalOrientation()).toggleClass(STEPPER_VERTICAL_ORIENTATION_CLASS, !this._isHorizontalOrientation());
  }
  _isHorizontalOrientation() {
    const {
      orientation
    } = this.option();
    return orientation === ORIENTATION.horizontal;
  }
  _shouldPreventItemEvent(itemElement) {
    const itemIndex = this._editStrategy.getIndex(itemElement);
    const {
      linear,
      selectedIndex = 0
    } = this.option();
    return !!linear && Math.abs(selectedIndex - itemIndex) > 1;
  }
  _itemClickHandler(e, args, config) {
    if (!this._shouldPreventItemEvent(e.currentTarget)) {
      super._itemClickHandler(e, args, config);
    }
  }
  _itemPointerHandler(e) {
    if (!this._shouldPreventItemEvent(e.currentTarget)) {
      super._itemPointerHandler(e);
    }
  }
  _itemSelectHandler(e) {
    if (!this._shouldPreventItemEvent(e.currentTarget)) {
      super._itemSelectHandler(e);
    }
  }
  _hover($el, $previous) {
    const $hoverTarget = this._findHoverTarget($el);
    if ($hoverTarget && this._shouldPreventItemEvent($hoverTarget)) {
      return;
    }
    super._hover($el, $previous);
  }
  _focusOutHandler(e) {
    this._clearFocusedItem();
    super._focusOutHandler(e);
  }
  _clearFocusedItem() {
    this.option('focusedElement', null);
  }
  _processChangeCompletedItems() {
    const itemElements = this._itemElements();
    if (!itemElements.length) {
      return;
    }
    const $lastCompletedElement = itemElements.filter(`.${_stepper_item.STEP_COMPLETED_CLASS}`).last();
    const lastCompletedIndex = this._editStrategy.getIndex($lastCompletedElement);
    const {
      selectedIndex = 0
    } = this.option();
    const startIndex = Math.min(lastCompletedIndex + 1, selectedIndex);
    const endIndex = Math.max(lastCompletedIndex + 1, selectedIndex);
    const isCompleted = lastCompletedIndex < selectedIndex;
    for (let i = startIndex; i < endIndex; i += 1) {
      const itemInstance = this._getItemInstance((0, _renderer.default)(itemElements[i]));
      itemInstance.changeCompleted(isCompleted);
    }
  }
  _postProcessSyncSelection() {
    this._connector.option('value', this._getConnectorValue());
    this._processChangeCompletedItems();
  }
  _syncSelectionOptions(byOption) {
    const parentDeferred = super._syncSelectionOptions(byOption);
    parentDeferred.done(() => {
      this._postProcessSyncSelection();
    });
    return parentDeferred;
  }
  _itemOptionChanged(item, property, value, prevValue) {
    switch (property) {
      case 'isValid':
        {
          const itemIndex = this._getIndexByItem(item);
          const $item = (0, _renderer.default)(this._itemElements()[itemIndex]);
          const itemInstance = this._getItemInstance($item);
          itemInstance.updateInvalidClass(value);
          super._itemOptionChanged(item, property, value, prevValue);
          break;
        }
      default:
        super._itemOptionChanged(item, property, value, prevValue);
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'orientation':
        this._toggleOrientationClass();
        this._setAriaOrientation();
        this._connector.option(name, value);
        break;
      case 'linear':
        break;
      case 'hintExpr':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
Stepper.ItemClass = _stepper_item.default;
(0, _component_registrator.default)('dxStepper', Stepper);
var _default = exports.default = Stepper;
