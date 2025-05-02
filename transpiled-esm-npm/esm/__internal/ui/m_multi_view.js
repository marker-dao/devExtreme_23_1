import _extends from "@babel/runtime/helpers/esm/extends";
import { locate } from '../../common/core/animation/translator';
import Swipeable from '../../common/core/events/gesture/swipeable';
import { triggerResizeEvent } from '../../common/core/events/visibility_change';
import messageLocalization from '../../common/core/localization/message';
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
import { deferRender, noop } from '../../core/utils/common';
import { Deferred } from '../../core/utils/deferred';
import { sign } from '../../core/utils/math';
import { getWidth } from '../../core/utils/size';
import { isDefined } from '../../core/utils/type';
import CollectionWidget from '../../ui/collection/ui.collection_widget.live_update';
import { _translator, animation } from './multi_view/m_multi_view.animation';
// STYLE multiView
const MULTIVIEW_CLASS = 'dx-multiview';
const MULTIVIEW_WRAPPER_CLASS = 'dx-multiview-wrapper';
const MULTIVIEW_ITEM_CONTAINER_CLASS = 'dx-multiview-item-container';
const MULTIVIEW_ITEM_CLASS = 'dx-multiview-item';
const MULTIVIEW_ITEM_HIDDEN_CLASS = 'dx-multiview-item-hidden';
const MULTIVIEW_ITEM_DATA_KEY = 'dxMultiViewItemData';
const MULTIVIEW_ANIMATION_DURATION = 200;
const toNumber = value => +value;
const position = $element => locate($element).left;
class MultiView extends CollectionWidget {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      pageUp: noop,
      pageDown: noop
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
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
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
    if (!this._itemWidthValue) {
      this._itemWidthValue = getWidth(this._$wrapper);
    }
    return this._itemWidthValue;
  }
  _clearItemWidthCache() {
    // @ts-expect-error
    delete this._itemWidthValue;
  }
  _itemsCount() {
    // @ts-expect-error ts-error
    return this.option('items').length;
  }
  _isAllItemsHidden() {
    const {
      items
    } = this.option();
    // @ts-expect-error ts-error
    return items.every((_, index) => !this._isItemVisible(index));
  }
  _normalizeIndex(index, direction) {
    let loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const count = this._itemsCount();
    if (this._isAllItemsHidden()) {
      return;
    }
    if (index < 0) {
      index += count;
    }
    if (index >= count) {
      index -= count;
    }
    const step = direction > 0 ? -1 : 1;
    const lastNotLoopedIndex = step === -1 ? 0 : count - 1;
    while (!this._isItemVisible(index) && (loop || index !== lastNotLoopedIndex)) {
      index = (index + step + count) % count;
    }
    return index;
  }
  _getRTLSignCorrection() {
    return this.option('rtlEnabled') ? -1 : 1;
  }
  _init() {
    // @ts-expect-error ts-error
    super._init.apply(this, arguments);
    this._activeStateUnit = `.${MULTIVIEW_ITEM_CLASS}`;
    const $element = this.$element();
    $element.addClass(MULTIVIEW_CLASS);
    this._$wrapper = $('<div>').addClass(MULTIVIEW_WRAPPER_CLASS);
    this._$wrapper.appendTo($element);
    this._$itemContainer = $('<div>').addClass(MULTIVIEW_ITEM_CONTAINER_CLASS);
    this._$itemContainer.appendTo(this._$wrapper);
    this.option('loopItemFocus', this.option('loop'));
    this._findBoundaryIndices();
    this._initSwipeable();
  }
  _ensureSelectedItemIsVisible() {
    const {
      loop,
      selectedIndex: currentSelectedIndex
    } = this.option();
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
    // @ts-expect-error ts-error
    super._beforeItemElementInserted.apply(this, arguments);
    if (this._deferredItems) {
      // @ts-expect-error ts-error
      this._deferredItems.splice(change.index, 0, null);
    }
  }
  _executeItemRenderAction(index, itemData, itemElement) {
    // @ts-expect-error ts-error
    index = (this.option('items') || []).indexOf(itemData);
    super._executeItemRenderAction(index, itemData, itemElement);
  }
  _renderItemContent(args) {
    const renderContentDeferred = Deferred();
    const that = this;
    const deferred = Deferred();
    deferred.done(() => {
      const $itemContent = super._renderItemContent.call(that, args);
      renderContentDeferred.resolve($itemContent);
    });
    this._deferredItems[args.index] = deferred;
    this.option('deferRendering') || deferred.resolve();
    // @ts-expect-error ts-error
    return renderContentDeferred.promise();
  }
  _render() {
    super._render();
    deferRender(() => {
      const selectedItemIndices = this._getSelectedItemIndices();
      this._updateItems(selectedItemIndices[0]);
    });
  }
  _getElementAria() {
    return {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: messageLocalization.format('dxMultiView-elementAriaRoleDescription'),
      label: messageLocalization.format('dxMultiView-elementAriaLabel')
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
      this.setAria(aria, $(item));
    });
  }
  _getItemAria(args) {
    const {
      itemIndex,
      itemsCount
    } = args;
    const aria = {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: messageLocalization.format('dxMultiView-itemAriaRoleDescription'),
      label: messageLocalization.format('dxMultiView-itemAriaLabel',
      // @ts-expect-error
      itemIndex + 1, itemsCount)
    };
    return aria;
  }
  _updateItems(selectedIndex, newIndex) {
    this._updateItemsPosition(selectedIndex, newIndex);
    this._updateItemsVisibility(selectedIndex, newIndex);
  }
  _modifyByChanges() {
    // @ts-expect-error ts-error
    super._modifyByChanges.apply(this, arguments);
    const selectedItemIndices = this._getSelectedItemIndices();
    this._updateItemsVisibility(selectedItemIndices[0]);
  }
  _updateItemsPosition(selectedIndex, newIndex) {
    const $itemElements = this._itemElements();
    const positionSign = isDefined(newIndex) ? -this._animationDirection(newIndex, selectedIndex) : undefined;
    const $selectedItem = $itemElements.eq(selectedIndex);
    _translator.move($selectedItem, 0);
    if (isDefined(newIndex)) {
      // @ts-expect-error ts-error
      _translator.move($itemElements.eq(newIndex), `${positionSign * 100}%`);
    }
  }
  _isItemVisible(index) {
    var _this$option$index;
    return ((_this$option$index = this.option('items')[index]) === null || _this$option$index === void 0 ? void 0 : _this$option$index.visible) ?? true;
  }
  _updateItemsVisibility(selectedIndex, newIndex) {
    const $itemElements = this._itemElements();
    // @ts-expect-error ts-error
    $itemElements.each((itemIndex, item) => {
      const $item = $(item);
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
    if (isDefined(index) && !hasItemContent) {
      this._deferredItems[index].resolve();
      triggerResizeEvent($item);
    }
  }
  _refreshItem($item, item) {
    super._refreshItem($item, item);
    this._updateItemsVisibility(this.option('selectedIndex'));
  }
  _setAriaSelectionAttribute() {}
  _updateSelection(addedSelection, removedSelection) {
    const newIndex = addedSelection[0];
    const prevIndex = removedSelection[0];
    animation.complete(this._$itemContainer);
    this._updateItems(prevIndex, newIndex);
    const animationDirection = this._animationDirection(newIndex, prevIndex);
    this._animateItemContainer(animationDirection * this._itemWidth(), () => {
      _translator.move(this._$itemContainer, 0);
      this._updateItems(newIndex);
      // NOTE: force layout recalculation on iOS 6 & iOS 7.0 (B254713)
      getWidth(this._$itemContainer);
    });
  }
  _animateItemContainer(position, completeCallback) {
    const duration = this.option('animationEnabled') ? MULTIVIEW_ANIMATION_DURATION : 0;
    animation.moveTo(this._$itemContainer, position, duration, completeCallback);
  }
  _animationDirection(newIndex, prevIndex) {
    const containerPosition = position(this._$itemContainer);
    const indexDifference = (prevIndex - newIndex) * this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();
    const isSwipePresent = containerPosition !== 0;
    const directionSignVariable = isSwipePresent ? containerPosition : indexDifference;
    return sign(directionSignVariable);
  }
  _getSwipeDisabledState() {
    return !this.option('swipeEnabled') || this._itemsCount() <= 1;
  }
  _initSwipeable() {
    this._createComponent(this.$element(), Swipeable, {
      disabled: this._getSwipeDisabledState(),
      elastic: false,
      itemSizeFunc: this._itemWidth.bind(this),
      onStart: args => this._swipeStartHandler(args.event),
      onUpdated: args => this._swipeUpdateHandler(args.event),
      onEnd: args => this._swipeEndHandler(args.event)
    });
  }
  _findBoundaryIndices() {
    const items = this.option('items');
    let firstIndex;
    let lastIndex;
    // @ts-expect-error ts-error
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
      // @ts-expect-error ts-error
      lastAvailableIndex: lastIndex ?? items.length - 1,
      firstTrueIndex: 0,
      // @ts-expect-error ts-error
      lastTrueIndex: items.length - 1
    };
  }
  _swipeStartHandler(e) {
    animation.complete(this._$itemContainer);
    const selectedIndex = this.option('selectedIndex');
    const loop = this.option('loop');
    const {
      firstAvailableIndex,
      lastAvailableIndex
    } = this._boundaryIndices;
    const rtl = this.option('rtlEnabled');
    // @ts-expect-error ts-error
    e.maxLeftOffset = toNumber(loop || (rtl ? selectedIndex > firstAvailableIndex : selectedIndex < lastAvailableIndex));
    // @ts-expect-error ts-error
    e.maxRightOffset = toNumber(loop || (rtl ? selectedIndex < lastAvailableIndex : selectedIndex > firstAvailableIndex));
  }
  _swipeUpdateHandler(e) {
    const {
      offset
    } = e;
    const swipeDirection = sign(offset) * this._getRTLSignCorrection();
    const selectedIndex = this.option('selectedIndex');
    // @ts-expect-error ts-error
    const newIndex = this._normalizeIndex(selectedIndex - swipeDirection, swipeDirection);
    if (selectedIndex === newIndex) {
      return;
    }
    _translator.move(this._$itemContainer, offset * this._itemWidth());
    this._updateItems(selectedIndex, newIndex);
  }
  _findNextAvailableIndex(index, offset) {
    const {
      items,
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
      // @ts-expect-error ts-error
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
      const newSelectedIndex = this._findNextAvailableIndex(this.option('selectedIndex'), -targetOffset);
      this.selectItem(newSelectedIndex)
      // @ts-expect-error ts-error
      .fail(() => {
        this._animateItemContainer(0, noop);
      }).done(() => {
        this._postprocessSwipe({
          swipedTabsIndex: newSelectedIndex
        });
      });
      // TODO: change focusedElement on focusedItem
      const $selectedElement = this.itemElements().filter('.dx-item-selected');
      this.option('focusStateEnabled') && this.option('focusedElement', getPublicElement($selectedElement));
    } else {
      this._animateItemContainer(0, noop);
    }
  }
  _getItemFocusLoopSignCorrection() {
    return this._itemFocusLooped ? -1 : 1;
  }
  _moveFocus() {
    // @ts-expect-error ts-error
    super._moveFocus.apply(this, arguments);
    this._itemFocusLooped = false;
  }
  _prevItem($items) {
    // @ts-expect-error ts-error
    const $result = super._prevItem.apply(this, arguments);
    this._itemFocusLooped = $result.is($items.last());
    return $result;
  }
  _nextItem($items) {
    // @ts-expect-error ts-error
    const $result = super._nextItem.apply(this, arguments);
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
    Swipeable.getInstance(this.$element()).option('disabled', disabled);
  }
  _dispose() {
    // @ts-expect-error ts-error
    delete this._boundaryIndices;
    super._dispose();
  }
  _itemOptionChanged(item, property) {
    // @ts-expect-error ts-error
    super._itemOptionChanged(...arguments);
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
registerComponent('dxMultiView', MultiView);
export default MultiView;