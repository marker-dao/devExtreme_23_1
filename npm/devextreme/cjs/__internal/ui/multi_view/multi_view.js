/**
* DevExtreme (cjs/__internal/ui/multi_view/multi_view.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translator2 = require("../../../common/core/animation/translator");
var _swipeable = _interopRequireDefault(require("../../../common/core/events/gesture/swipeable"));
var _visibility_change = require("../../../common/core/events/visibility_change");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _math = require("../../../core/utils/math");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _uiCollection_widget = _interopRequireDefault(require("../../../ui/collection/ui.collection_widget.live_update"));
var _multi_view = require("./multi_view.animation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// STYLE multiView
const MULTIVIEW_CLASS = 'dx-multiview';
const MULTIVIEW_WRAPPER_CLASS = 'dx-multiview-wrapper';
const MULTIVIEW_ITEM_CONTAINER_CLASS = 'dx-multiview-item-container';
const MULTIVIEW_ITEM_CLASS = 'dx-multiview-item';
const MULTIVIEW_ITEM_HIDDEN_CLASS = 'dx-multiview-item-hidden';
const MULTIVIEW_ITEM_DATA_KEY = 'dxMultiViewItemData';
const MULTIVIEW_ANIMATION_DURATION = 200;
const toNumber = value => +value;
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const getPosition = $element => (0, _translator2.locate)($element).left;
class MultiView extends _uiCollection_widget.default {
  _activeStateUnit() {
    return `.${MULTIVIEW_ITEM_CLASS}`;
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      pageUp: _common.noop,
      pageDown: _common.noop
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      selectedIndex: 0,
      swipeEnabled: true,
      animationEnabled: true,
      loop: false,
      deferRendering: true,
      loopItemFocus: false,
      selectOnFocus: true,
      selectionMode: 'single',
      selectionRequired: true,
      selectByClick: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      // @ts-expect-error ts-error
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _itemClass() {
    return MULTIVIEW_ITEM_CLASS;
  }
  _itemDataKey() {
    return MULTIVIEW_ITEM_DATA_KEY;
  }
  _itemContainer() {
    return this._$itemContainer;
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  _itemWidth() {
    if (this._itemWidthValue) {
      return this._itemWidthValue;
    }
    return (0, _size.getWidth)(this._$wrapper);
  }
  _clearItemWidthCache() {
    delete this._itemWidthValue;
  }
  _itemsCount() {
    const {
      items = []
    } = this.option();
    return items.length;
  }
  _isAllItemsHidden() {
    const {
      items = []
    } = this.option();
    return items.every((_item, index) => !this._isItemVisible(index));
  }
  _normalizeIndex(index, direction) {
    let loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const count = this._itemsCount();
    let normalizedIndex = index;
    if (this._isAllItemsHidden()) {
      return undefined;
    }
    if (index < 0) {
      normalizedIndex += count;
    }
    if (index >= count) {
      normalizedIndex -= count;
    }
    const step = direction > 0 ? -1 : 1;
    const lastNotLoopedIndex = step === -1 ? 0 : count - 1;
    while (!this._isItemVisible(normalizedIndex) && (loop || normalizedIndex !== lastNotLoopedIndex)) {
      normalizedIndex = (normalizedIndex + step + count) % count;
    }
    return normalizedIndex;
  }
  _getRTLSignCorrection() {
    const {
      rtlEnabled
    } = this.option();
    return rtlEnabled ? -1 : 1;
  }
  _init() {
    super._init();
    const $element = this.$element();
    $element.addClass(MULTIVIEW_CLASS);
    this._$wrapper = (0, _renderer.default)('<div>').addClass(MULTIVIEW_WRAPPER_CLASS);
    this._$wrapper.appendTo($element);
    this._$itemContainer = (0, _renderer.default)('<div>').addClass(MULTIVIEW_ITEM_CONTAINER_CLASS);
    this._$itemContainer.appendTo(this._$wrapper);
    const {
      loop
    } = this.option();
    this.option('loopItemFocus', loop);
    this._findBoundaryIndices();
    this._initSwipeable();
  }
  _ensureSelectedItemIsVisible() {
    const {
      loop,
      selectedIndex: currentSelectedIndex
    } = this.option();
    if (!(0, _type.isDefined)(currentSelectedIndex)) {
      return;
    }
    if (this._isItemVisible(currentSelectedIndex)) {
      return;
    }
    if (this._isAllItemsHidden()) {
      this.option('selectedIndex', 0);
      return;
    }
    const direction = -1 * this._getRTLSignCorrection();
    let newSelectedIndex = this._normalizeIndex(currentSelectedIndex, direction, loop);
    if (newSelectedIndex === currentSelectedIndex) {
      newSelectedIndex = this._normalizeIndex(currentSelectedIndex, -direction, loop);
    }
    this.option('selectedIndex', newSelectedIndex);
  }
  _initMarkup() {
    this._deferredItems = [];
    super._initMarkup();
    this._ensureSelectedItemIsVisible();
    const selectedItemIndices = this._getSelectedItemIndices();
    this._updateItemsVisibility(selectedItemIndices[0]);
    this._setElementAria();
    this._setItemsAria();
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    super._afterItemElementDeleted($item, deletedActionArgs);
    if (this._deferredItems) {
      this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
    }
  }
  _beforeItemElementInserted(change) {
    super._beforeItemElementInserted(change);
    if (this._deferredItems) {
      this._deferredItems.splice(change.index, 0, null);
    }
  }
  _executeItemRenderAction(_index, itemData, itemElement) {
    const {
      items = []
    } = this.option();
    const index = items.indexOf(itemData);
    super._executeItemRenderAction(index, itemData, itemElement);
  }
  _renderItemContent(args) {
    const renderContentDeferred = (0, _deferred.Deferred)();
    const deferred = (0, _deferred.Deferred)();
    deferred.done(() => {
      const $itemContent = super._renderItemContent(args);
      renderContentDeferred.resolve($itemContent);
    });
    this._deferredItems[args.index] = deferred;
    const {
      deferRendering
    } = this.option();
    if (!deferRendering) {
      deferred.resolve();
    }
    // @ts-expect-error ts-error
    return renderContentDeferred.promise();
  }
  _render() {
    super._render();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (0, _common.deferRender)(() => {
      const selectedItemIndices = this._getSelectedItemIndices();
      this._updateItems(selectedItemIndices[0]);
    });
  }
  _getElementAria() {
    return {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: _message.default.format('dxMultiView-elementAriaRoleDescription'),
      label: _message.default.format('dxMultiView-elementAriaLabel')
    };
  }
  _setElementAria() {
    const aria = this._getElementAria();
    this.setAria(aria, this.$element());
  }
  _setItemsAria() {
    const $itemElements = this._itemElements();
    const itemsCount = this._itemsCount();
    // @ts-expect-error ts-error
    $itemElements.each((itemIndex, item) => {
      const aria = this._getItemAria({
        itemIndex,
        itemsCount
      });
      this.setAria(aria, (0, _renderer.default)(item));
    });
  }
  _getItemAria(args) {
    const {
      itemIndex,
      itemsCount
    } = args;
    return {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: _message.default.format('dxMultiView-itemAriaRoleDescription'),
      label: _message.default.format('dxMultiView-itemAriaLabel',
      // @ts-expect-error ts-error
      itemIndex + 1, itemsCount)
    };
  }
  _updateItems(selectedIndex, newIndex) {
    this._updateItemsPosition(selectedIndex, newIndex);
    this._updateItemsVisibility(selectedIndex, newIndex);
  }
  _modifyByChanges(changes, isPartialRefresh) {
    super._modifyByChanges(changes, isPartialRefresh);
    const selectedItemIndices = this._getSelectedItemIndices();
    this._updateItemsVisibility(selectedItemIndices[0]);
  }
  _updateItemsPosition(selectedIndex, newIndex) {
    const $itemElements = this._itemElements();
    const positionSign = (0, _type.isDefined)(newIndex) ? -this._animationDirection(newIndex, selectedIndex) : undefined;
    const $selectedItem = $itemElements.eq(selectedIndex);
    _multi_view._translator.move($selectedItem, 0);
    if ((0, _type.isDefined)(newIndex) && (0, _type.isDefined)(positionSign)) {
      _multi_view._translator.move($itemElements.eq(newIndex), `${positionSign * 100}%`);
    }
  }
  _isItemVisible(index) {
    var _items$index;
    const {
      items = []
    } = this.option();
    return ((0, _type.isDefined)(index) && ((_items$index = items[index]) === null || _items$index === void 0 ? void 0 : _items$index.visible)) ?? true;
  }
  _updateItemsVisibility(selectedIndex, newIndex) {
    const $itemElements = this._itemElements();
    // @ts-expect-error ts-error
    $itemElements.each((itemIndex, item) => {
      const $item = (0, _renderer.default)(item);
      const isHidden = itemIndex !== selectedIndex && itemIndex !== newIndex;
      if (!isHidden) {
        this._renderSpecificItem(itemIndex);
      }
      $item.toggleClass(MULTIVIEW_ITEM_HIDDEN_CLASS, isHidden);
      this.setAria('hidden', isHidden || undefined, $item);
    });
  }
  _renderSpecificItem(index) {
    const $item = this._itemElements().eq(index);
    const hasItemContent = $item.find(this._itemContentClass()).length > 0;
    if ((0, _type.isDefined)(index) && !hasItemContent) {
      var _this$_deferredItems$;
      (_this$_deferredItems$ = this._deferredItems[index]) === null || _this$_deferredItems$ === void 0 || _this$_deferredItems$.resolve();
      (0, _visibility_change.triggerResizeEvent)($item);
    }
  }
  _refreshItem($item, item) {
    super._refreshItem($item, item);
    const {
      selectedIndex = 0
    } = this.option();
    this._updateItemsVisibility(selectedIndex);
  }
  _setAriaSelectionAttribute() {}
  _updateSelection(addedSelection, removedSelection) {
    const newIndex = addedSelection[0];
    const prevIndex = removedSelection[0];
    _multi_view.animation.complete(this._$itemContainer);
    this._updateItems(prevIndex, newIndex);
    const animationDirection = this._animationDirection(newIndex, prevIndex);
    this._animateItemContainer(animationDirection * this._itemWidth(), () => {
      _multi_view._translator.move(this._$itemContainer, 0);
      this._updateItems(newIndex);
      // NOTE: force layout recalculation on iOS 6 & iOS 7.0 (B254713)
      (0, _size.getWidth)(this._$itemContainer);
    });
  }
  _animateItemContainer(position, completeCallback) {
    const {
      animationEnabled
    } = this.option();
    const duration = animationEnabled ? MULTIVIEW_ANIMATION_DURATION : 0;
    _multi_view.animation.moveTo(this._$itemContainer, position, duration, completeCallback);
  }
  _animationDirection(newIndex, prevIndex) {
    const containerPosition = getPosition(this._$itemContainer);
    const signCorrection = this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();
    const indexDifference = (prevIndex - newIndex) * signCorrection;
    const isSwipePresent = containerPosition !== 0;
    const directionSignVariable = isSwipePresent ? containerPosition : indexDifference;
    return (0, _math.sign)(directionSignVariable);
  }
  _getSwipeDisabledState() {
    const {
      swipeEnabled
    } = this.option();
    return !swipeEnabled || this._itemsCount() <= 1;
  }
  _initSwipeable() {
    this._createComponent(this.$element(), _swipeable.default, {
      disabled: this._getSwipeDisabledState(),
      elastic: false,
      itemSizeFunc: this._itemWidth.bind(this),
      onStart: args => {
        this._swipeStartHandler(args.event);
      },
      onUpdated: args => {
        this._swipeUpdateHandler(args.event);
      },
      onEnd: args => {
        this._swipeEndHandler(args.event);
      }
    });
  }
  _findBoundaryIndices() {
    const {
      items = []
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let firstIndex;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let lastIndex;
    items.forEach((item, index) => {
      const isDisabled = Boolean(item === null || item === void 0 ? void 0 : item.disabled);
      const isVisible = this._isItemVisible(index);
      if (!isDisabled && isVisible) {
        firstIndex ?? (firstIndex = index);
        lastIndex = index;
      }
    });
    this._boundaryIndices = {
      firstAvailableIndex: firstIndex ?? 0,
      lastAvailableIndex: lastIndex ?? items.length - 1,
      firstTrueIndex: 0,
      lastTrueIndex: items.length - 1
    };
  }
  _swipeStartHandler(e) {
    _multi_view.animation.complete(this._$itemContainer);
    const {
      selectedIndex,
      loop,
      rtlEnabled
    } = this.option();
    if (!(0, _type.isDefined)(selectedIndex) || !(0, _type.isDefined)(this._boundaryIndices)) {
      return;
    }
    const {
      firstAvailableIndex,
      lastAvailableIndex
    } = this._boundaryIndices;
    const canSwipeLeft = rtlEnabled ? selectedIndex > firstAvailableIndex : selectedIndex < lastAvailableIndex;
    const canSwipeRight = rtlEnabled ? selectedIndex < lastAvailableIndex : selectedIndex > firstAvailableIndex;
    e.maxLeftOffset = toNumber(!!loop || canSwipeLeft);
    e.maxRightOffset = toNumber(!!loop || canSwipeRight);
  }
  _swipeUpdateHandler(e) {
    const {
      offset
    } = e;
    const swipeDirection = (0, _math.sign)(offset) * this._getRTLSignCorrection();
    const {
      selectedIndex
    } = this.option();
    if (!(0, _type.isDefined)(selectedIndex)) {
      return;
    }
    const newIndex = this._normalizeIndex(selectedIndex - swipeDirection, swipeDirection);
    if (selectedIndex === newIndex) {
      return;
    }
    _multi_view._translator.move(this._$itemContainer, offset * this._itemWidth());
    this._updateItems(selectedIndex, newIndex);
  }
  _findNextAvailableIndex(index, offset) {
    if (!(0, _type.isDefined)(this._boundaryIndices)) {
      return index;
    }
    const {
      items = [],
      loop
    } = this.option();
    const {
      firstAvailableIndex,
      lastAvailableIndex,
      firstTrueIndex,
      lastTrueIndex
    } = this._boundaryIndices;
    const isFirstActive = [firstTrueIndex, firstAvailableIndex].includes(index);
    const isLastActive = [lastTrueIndex, lastAvailableIndex].includes(index);
    if (loop) {
      if (isFirstActive && offset < 0) {
        return lastAvailableIndex;
      }
      if (isLastActive && offset > 0) {
        return firstAvailableIndex;
      }
    }
    for (let i = index + offset; i >= firstAvailableIndex && i <= lastAvailableIndex; i += offset) {
      const isDisabled = Boolean(items[i].disabled);
      const isVisible = this._isItemVisible(i);
      if (!isDisabled && isVisible) {
        return i;
      }
    }
    return index;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _postprocessSwipe(args) {}
  _swipeEndHandler(e) {
    const targetOffset = e.targetOffset * this._getRTLSignCorrection();
    if (targetOffset) {
      const {
        selectedIndex
      } = this.option();
      if (!(0, _type.isDefined)(selectedIndex)) {
        return;
      }
      const newSelectedIndex = this._findNextAvailableIndex(selectedIndex, -targetOffset);
      this.selectItem(newSelectedIndex)
      // @ts-expect-error ts-error
      .fail(() => {
        this._animateItemContainer(0, _common.noop);
      }).done(() => {
        this._postprocessSwipe({
          swipedTabsIndex: newSelectedIndex
        });
      });
      // TODO: change focusedElement on focusedItem
      const $selectedElement = this.itemElements().filter('.dx-item-selected');
      const {
        focusStateEnabled
      } = this.option();
      if (focusStateEnabled) {
        this.option('focusedElement', (0, _element.getPublicElement)($selectedElement));
      }
    } else {
      this._animateItemContainer(0, _common.noop);
    }
  }
  _getItemFocusLoopSignCorrection() {
    return this._itemFocusLooped ? -1 : 1;
  }
  _moveFocus(location, e) {
    super._moveFocus(location, e);
    this._itemFocusLooped = false;
  }
  _prevItem($items) {
    const $result = super._prevItem($items);
    this._itemFocusLooped = $result.is($items.last());
    return $result;
  }
  _nextItem($items) {
    const $result = super._nextItem($items);
    this._itemFocusLooped = $result.is($items.first());
    return $result;
  }
  _dimensionChanged() {
    this._clearItemWidthCache();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _updateSwipeDisabledState() {
    const disabled = this._getSwipeDisabledState();
    _swipeable.default.getInstance(this.$element()).option('disabled', disabled);
  }
  _dispose() {
    delete this._boundaryIndices;
    super._dispose();
  }
  _itemOptionChanged(item, property, value, prevValue) {
    super._itemOptionChanged(item, property, value, prevValue);
    const {
      selectedItem
    } = this.option();
    if (property === 'visible' && item === selectedItem) {
      this._ensureSelectedItemIsVisible();
    }
  }
  _optionChanged(args) {
    const {
      value
    } = args;
    switch (args.name) {
      case 'loop':
        this.option('loopItemFocus', value);
        break;
      case 'animationEnabled':
        break;
      case 'swipeEnabled':
        this._updateSwipeDisabledState();
        break;
      case 'deferRendering':
        this._invalidate();
        break;
      case 'items':
        this._updateSwipeDisabledState();
        this._findBoundaryIndices();
        super._optionChanged(args);
        break;
      case 'selectedIndex':
        if (this._isItemVisible(value)) {
          super._optionChanged(args);
        } else {
          this._ensureSelectedItemIsVisible();
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxMultiView', MultiView);
var _default = exports.default = MultiView;
