"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../common/core/animation");
var _translator = require("../../common/core/animation/translator");
var _click = require("../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _swipeable = _interopRequireDefault(require("../../common/core/events/gesture/swipeable"));
var _utils = require("../../common/core/events/utils");
var _visibility_change = require("../../common/core/events/visibility_change");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _widget = _interopRequireDefault(require("../core/widget/widget"));
var _collection_widget = _interopRequireDefault(require("../ui/collection/collection_widget.edit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GALLERY_CLASS = 'dx-gallery';
const GALLERY_INDICATOR_VISIBLE_CLASS = 'dx-gallery-indicator-visible';
const GALLERY_WRAPPER_CLASS = `${GALLERY_CLASS}-wrapper`;
const GALLERY_LOOP_CLASS = 'dx-gallery-loop';
const GALLERY_ITEM_CONTAINER_CLASS = `${GALLERY_CLASS}-container`;
const GALLERY_ACTIVE_CLASS = `${GALLERY_CLASS}-active`;
const GALLERY_ITEM_CLASS = `${GALLERY_CLASS}-item`;
const GALLERY_INVISIBLE_ITEM_CLASS = `${GALLERY_CLASS}-item-invisible`;
const GALLERY_LOOP_ITEM_CLASS = `${GALLERY_ITEM_CLASS}-loop`;
const GALLERY_ITEM_SELECTOR = `.${GALLERY_ITEM_CLASS}`;
const GALLERY_ITEM_SELECTED_CLASS = `${GALLERY_ITEM_CLASS}-selected`;
const GALLERY_INDICATOR_CLASS = `${GALLERY_CLASS}-indicator`;
const GALLERY_INDICATOR_ITEM_CLASS = `${GALLERY_INDICATOR_CLASS}-item`;
const GALLERY_INDICATOR_ITEM_SELECTOR = `.${GALLERY_INDICATOR_ITEM_CLASS}`;
const GALLERY_INDICATOR_ITEM_SELECTED_CLASS = `${GALLERY_INDICATOR_ITEM_CLASS}-selected`;
const ITEM_CONTENT_SELECTOR = '.dx-item-content';
const GALLERY_IMAGE_CLASS = 'dx-gallery-item-image';
const GALLERY_ITEM_DATA_KEY = 'dxGalleryItemData';
const MAX_CALC_ERROR = 1;
class GalleryNavButton extends _widget.default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      pageUp: _common.noop,
      pageDown: _common.noop
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      direction: 'next',
      onClick: null,
      hoverStateEnabled: true,
      activeStateEnabled: true
    });
  }
  _render() {
    super._render();
    const $element = this.$element();
    // @ts-expect-error ts-error
    const eventName = (0, _utils.addNamespace)(_click.name, this.NAME);
    const {
      direction
    } = this.option();
    $element.addClass(`${GALLERY_CLASS}-nav-button-${direction}`);
    _events_engine.default.off($element, eventName);
    _events_engine.default.on($element, eventName, e => {
      this._createActionByOption('onClick')({
        event: e
      });
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onClick':
      case 'direction':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
class Gallery extends _collection_widget.default {
  _activeStateUnit() {
    return GALLERY_ITEM_SELECTOR;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: false,
      animationDuration: 400,
      animationEnabled: true,
      loop: false,
      swipeEnabled: true,
      indicatorEnabled: true,
      showIndicator: true,
      selectedIndex: 0,
      slideshowDelay: 0,
      showNavButtons: false,
      wrapAround: false,
      stretchImages: false,
      loopItemFocus: false,
      selectOnFocus: true,
      selectionMode: 'single',
      selectionRequired: true,
      selectByClick: false,
      _itemAttributes: {
        role: 'option',
        'aria-label': _message.default.format('dxGallery-itemName')
      }
    });
  }
  _defaultOptionsRules() {
    return [...super._defaultOptionsRules(), {
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }];
  }
  _init() {
    super._init();
    const {
      loop
    } = this.option();
    this.option('loopItemFocus', loop);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(($container, data) => {
        const $img = (0, _renderer.default)('<img>').addClass(GALLERY_IMAGE_CLASS);
        if ((0, _type.isPlainObject)(data)) {
          this._prepareDefaultItemTemplate(data, $container);
          // @ts-expect-error ts-error
          $img.attr({
            src: data.imageSrc,
            alt: data.imageAlt
          }).appendTo($container);
        } else {
          $img.attr('src', String(data)).appendTo($container);
        }
      }, ['imageSrc', 'imageAlt', 'text', 'html'], this.option('integrationOptions.watchMethod'))
    });
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _itemContainer() {
    return this._$container;
  }
  _itemClass() {
    return GALLERY_ITEM_CLASS;
  }
  _itemDataKey() {
    return GALLERY_ITEM_DATA_KEY;
  }
  _actualItemWidth() {
    const {
      wrapAround,
      stretchImages
    } = this.option();
    if (stretchImages) {
      const itemPerPage = wrapAround ? this._itemsPerPage() + 1 : this._itemsPerPage();
      return 1 / itemPerPage;
    }
    if (wrapAround) {
      return this._itemPercentWidth() * this._itemsPerPage() / (this._itemsPerPage() + 1);
    }
    return this._itemPercentWidth();
  }
  _itemPercentWidth() {
    const elementWidth = (0, _size.getOuterWidth)(this.$element());
    const {
      initialItemWidth
    } = this.option();
    if (initialItemWidth && initialItemWidth <= elementWidth) {
      return initialItemWidth / elementWidth;
    }
    return 1;
  }
  _itemsPerPage() {
    const itemsPerPage = (0, _window.hasWindow)() ? Math.floor(1 / this._itemPercentWidth()) : 1;
    return Math.min(itemsPerPage, this._itemsCount());
  }
  _pagesCount() {
    return Math.ceil(this._itemsCount() / this._itemsPerPage());
  }
  _itemsCount() {
    const {
      items = []
    } = this.option();
    return items.length;
  }
  _offsetDirection() {
    const {
      rtlEnabled
    } = this.option();
    return rtlEnabled ? -1 : 1;
  }
  _initMarkup() {
    this._renderWrapper();
    this._renderItemsContainer();
    this.$element().addClass(GALLERY_CLASS);
    const {
      loop
    } = this.option();
    this.$element().toggleClass(GALLERY_LOOP_CLASS, loop);
    super._initMarkup();
    const useListBoxRole = this._itemsCount() > 0;
    const ariaAttrs = {
      role: useListBoxRole ? 'listbox' : undefined,
      label: 'gallery'
    };
    this.setAria(ariaAttrs);
  }
  _render() {
    this._renderDragHandler();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._renderContainerPosition();
    this._renderItemSizes();
    this._renderItemPositions();
    this._renderNavButtons();
    this._renderIndicator();
    this._renderSelectedItem();
    this._renderItemVisibility();
    this._renderUserInteraction();
    this._setupSlideShow();
    this._reviseDimensions();
    super._render();
  }
  _dimensionChanged() {
    const {
      selectedIndex = 0
    } = this.option();
    this._stopItemAnimations();
    this._clearCacheWidth();
    this._cloneDuplicateItems();
    this._renderItemSizes();
    this._renderItemPositions();
    this._renderIndicator();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._renderContainerPosition(this._calculateIndexOffset(selectedIndex), true);
    this._renderItemVisibility();
  }
  _renderDragHandler() {
    // @ts-expect-error ts-error
    const eventName = (0, _utils.addNamespace)('dragstart', this.NAME);
    _events_engine.default.off(this.$element(), eventName);
    _events_engine.default.on(this.$element(), eventName, 'img', () => false);
  }
  _renderWrapper() {
    if (this._$wrapper) {
      return;
    }
    this._$wrapper = (0, _renderer.default)('<div>').addClass(GALLERY_WRAPPER_CLASS).appendTo(this.$element());
  }
  _renderItems(items) {
    if (!(0, _window.hasWindow)()) {
      const {
        selectedIndex = 0
      } = this.option();
      // eslint-disable-next-line no-param-reassign
      items = items.length > selectedIndex ? items.slice(selectedIndex, selectedIndex + 1) : items.slice(0, 1);
    }
    super._renderItems(items);
    this._loadNextPageIfNeeded();
  }
  _onItemTemplateRendered() {
    return () => {
      if (!Gallery._wasAnyItemTemplateRendered) {
        Gallery._wasAnyItemTemplateRendered = true;
        (0, _visibility_change.triggerResizeEvent)(this.$element()); // NOTE: T1132935
      }
    };
  }
  _renderItemsContainer() {
    if (this._$container) {
      return;
    }
    this._$container = (0, _renderer.default)('<div>').addClass(GALLERY_ITEM_CONTAINER_CLASS).appendTo(this._$wrapper);
  }
  _cloneDuplicateItems() {
    const {
      loop,
      items = []
    } = this.option();
    const itemsCount = items.length;
    if (!loop || !itemsCount) {
      return;
    }
    this._getLoopedItems().remove();
    const lastItemIndex = itemsCount - 1;
    const duplicateCount = Math.min(this._itemsPerPage(), itemsCount);
    const $items = this._getRealItems();
    const $container = this._itemContainer();
    for (let i = 0; i < duplicateCount; i += 1) {
      this._cloneItemForDuplicate($items[i], $container);
    }
    for (let i = 0; i < duplicateCount; i += 1) {
      this._cloneItemForDuplicate($items[lastItemIndex - i], $container);
    }
  }
  _cloneItemForDuplicate(item, $container) {
    if (item) {
      const $clonedItem = (0, _renderer.default)(item)
      // @ts-expect-error ts-error
      .clone(false).addClass(GALLERY_LOOP_ITEM_CLASS).removeAttr('id').css('margin', 0).appendTo($container);
      this.setAria({
        hidden: true
      }, $clonedItem);
    }
  }
  _getRealItems() {
    const selector = `.${GALLERY_ITEM_CLASS}:not(.${GALLERY_LOOP_ITEM_CLASS})`;
    return this.$element().find(selector);
  }
  _getLoopedItems() {
    return this.$element().find(`.${GALLERY_LOOP_ITEM_CLASS}`);
  }
  _emptyMessageContainer() {
    return this._$wrapper;
  }
  _renderItemSizes(startIndex) {
    let $items = this._itemElements();
    const itemWidth = this._actualItemWidth();
    if (startIndex !== undefined) {
      $items = $items.slice(startIndex);
    }
    $items.each((_index, element) => {
      (0, _size.setOuterWidth)((0, _renderer.default)(element), `${itemWidth * 100}%`);
      return true;
    });
  }
  _renderItemPositions() {
    const {
      rtlEnabled,
      wrapAround,
      selectedIndex = 0
    } = this.option();
    const itemWidth = this._actualItemWidth();
    const itemsCount = this._itemsCount();
    const itemsPerPage = this._itemsPerPage();
    const loopItemsCount = this.$element().find(`.${GALLERY_LOOP_ITEM_CLASS}`).length;
    const lastItemDuplicateIndex = itemsCount + loopItemsCount - 1;
    const offsetRatio = wrapAround ? 0.5 : 0;
    const freeSpace = this._itemFreeSpace();
    const isGapBetweenImages = !!freeSpace;
    const side = rtlEnabled ? 'Right' : 'Left';
    this._itemElements().each((index, item) => {
      let realIndex = index;
      const isLoopItem = (0, _renderer.default)(item).hasClass(GALLERY_LOOP_ITEM_CLASS);
      if (index > itemsCount + itemsPerPage - 1) {
        realIndex = lastItemDuplicateIndex - realIndex - itemsPerPage;
      }
      if (!isLoopItem && realIndex !== 0) {
        if (isGapBetweenImages) {
          (0, _renderer.default)(item).css(`margin${side}`, `${freeSpace * 100}%`);
        }
        return true;
      }
      const itemPosition = itemWidth * (realIndex + offsetRatio) + freeSpace * (realIndex + 1 - offsetRatio);
      const property = isLoopItem ? side.toLowerCase() : `margin${side}`;
      (0, _renderer.default)(item).css(property, `${itemPosition * 100}%`);
      return true;
    });
    this._relocateItems(selectedIndex, selectedIndex, true);
  }
  _itemFreeSpace() {
    const {
      wrapAround
    } = this.option();
    const itemsPerPage = wrapAround ? this._itemsPerPage() + 1 : this._itemsPerPage();
    return (1 - this._actualItemWidth() * itemsPerPage) / (itemsPerPage + 1);
  }
  _renderContainerPosition() {
    let offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let hideItems = arguments.length > 1 ? arguments[1] : undefined;
    let animate = arguments.length > 2 ? arguments[2] : undefined;
    this._releaseInvisibleItems();
    const itemWidth = this._actualItemWidth();
    const targetPosition = this._offsetDirection() * offset * (itemWidth + this._itemFreeSpace());
    let showAnimation = animate;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let positionReady;
    if ((0, _type.isDefined)(this._animationOverride)) {
      showAnimation = this._animationOverride;
      delete this._animationOverride;
    }
    if (showAnimation) {
      this._startSwipe();
      positionReady = this._animate(targetPosition).done(this._endSwipe);
    } else {
      (0, _translator.move)(this._$container, {
        // @ts-expect-error ts-error
        left: targetPosition * this._elementWidth(),
        top: 0
      });
      // @ts-expect-error ts-error
      positionReady = (0, _deferred.Deferred)().resolveWith(this);
    }
    positionReady.done(() => {
      var _this$_deferredAnimat;
      // @ts-expect-error ts-error
      (_this$_deferredAnimat = this._deferredAnimate) === null || _this$_deferredAnimat === void 0 || _this$_deferredAnimat.resolveWith(this);
      if (hideItems) {
        this._renderItemVisibility();
      }
    });
    return positionReady.promise();
  }
  _startSwipe() {
    this.$element().addClass(GALLERY_ACTIVE_CLASS);
  }
  _endSwipe() {
    this.$element().removeClass(GALLERY_ACTIVE_CLASS);
  }
  _animate(targetPosition) {
    let extraConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const $container = this._$container;
    const animationComplete = (0, _deferred.Deferred)();
    const {
      animationDuration
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate(this._$container.get(0), _extends({
      type: 'slide',
      to: {
        left: targetPosition * (this._elementWidth() ?? 0)
      },
      duration: animationDuration,
      complete() {
        if (that._needMoveContainerForward()) {
          (0, _translator.move)($container, {
            left: 0,
            top: 0
          });
        }
        if (that._needMoveContainerBack()) {
          (0, _translator.move)($container, {
            left: that._maxContainerOffset() * (that._elementWidth() ?? 0),
            top: 0
          });
        }
        // @ts-expect-error ts-error
        animationComplete.resolveWith(that);
      }
    }, extraConfig));
    return animationComplete;
  }
  _needMoveContainerForward() {
    var _this$_$container$pos;
    const expectedPosition = (((_this$_$container$pos = this._$container.position()) === null || _this$_$container$pos === void 0 ? void 0 : _this$_$container$pos.left) ?? 0) * this._offsetDirection();
    const actualPosition = -this._maxItemWidth() * (this._elementWidth() ?? 0) * this._itemsCount();
    return expectedPosition <= actualPosition + MAX_CALC_ERROR;
  }
  _needMoveContainerBack() {
    var _this$_$container$pos2;
    const expectedPosition = (((_this$_$container$pos2 = this._$container.position()) === null || _this$_$container$pos2 === void 0 ? void 0 : _this$_$container$pos2.left) ?? 0) * this._offsetDirection();
    const actualPosition = this._actualItemWidth() * (this._elementWidth() ?? 0);
    return expectedPosition >= actualPosition - MAX_CALC_ERROR;
  }
  _maxContainerOffset() {
    const itemOutPageCount = this._itemsCount() - this._itemsPerPage();
    return -this._maxItemWidth() * itemOutPageCount * this._offsetDirection();
  }
  _maxItemWidth() {
    return this._actualItemWidth() + this._itemFreeSpace();
  }
  _reviseDimensions() {
    const $firstItem = this._itemElements().first().find(ITEM_CONTENT_SELECTOR);
    if (!$firstItem || $firstItem.is(':hidden')) {
      return;
    }
    const {
      height,
      width
    } = this.option();
    if (!height) {
      this.option('height', (0, _size.getOuterHeight)($firstItem));
    }
    if (!width) {
      this.option('width', (0, _size.getOuterWidth)($firstItem));
    }
    this._dimensionChanged();
  }
  _renderIndicator() {
    const {
      showIndicator
    } = this.option();
    this._cleanIndicators();
    this.$element().toggleClass(GALLERY_INDICATOR_VISIBLE_CLASS, showIndicator);
    if (!showIndicator) {
      return;
    }
    this._$indicator = (0, _renderer.default)('<div>').addClass(GALLERY_INDICATOR_CLASS).appendTo(this._$wrapper);
    const {
      indicatorEnabled
    } = this.option();
    for (let i = 0; i < this._pagesCount(); i += 1) {
      const $indicatorItem = (0, _renderer.default)('<div>').addClass(GALLERY_INDICATOR_ITEM_CLASS).appendTo(this._$indicator);
      if (indicatorEnabled) {
        this._attachIndicatorClickHandler($indicatorItem, i);
      }
    }
    this._renderSelectedPageIndicator();
  }
  _attachIndicatorClickHandler($element, index) {
    // @ts-expect-error ts-error
    _events_engine.default.on($element, (0, _utils.addNamespace)(_click.name, this.NAME), event => {
      this._indicatorSelectHandler(event, index);
    });
  }
  _detachIndicatorClickHandler($element) {
    // @ts-expect-error ts-error
    _events_engine.default.off($element, (0, _utils.addNamespace)(_click.name, this.NAME));
  }
  _toggleIndicatorInteraction(clickEnabled) {
    var _this$_$indicator;
    const $indicatorItems = ((_this$_$indicator = this._$indicator) === null || _this$_$indicator === void 0 ? void 0 : _this$_$indicator.find(GALLERY_INDICATOR_ITEM_SELECTOR)) ?? (0, _renderer.default)();
    if ($indicatorItems.length) {
      $indicatorItems.each((index, element) => {
        if (clickEnabled) {
          this._attachIndicatorClickHandler((0, _renderer.default)(element), index);
        } else {
          this._detachIndicatorClickHandler((0, _renderer.default)(element));
        }
        return true;
      });
    }
  }
  _cleanIndicators() {
    if (this._$indicator) {
      this._$indicator.remove();
    }
  }
  _renderSelectedItem() {
    const {
      selectedIndex
    } = this.option();
    this._itemElements().removeClass(GALLERY_ITEM_SELECTED_CLASS);
    if ((0, _type.isDefined)(selectedIndex)) {
      this._itemElements().eq(selectedIndex).addClass(GALLERY_ITEM_SELECTED_CLASS);
    }
  }
  _renderItemVisibility() {
    const {
      initialItemWidth,
      wrapAround,
      selectedIndex
    } = this.option();
    if (initialItemWidth || wrapAround) {
      this._releaseInvisibleItems();
      return;
    }
    this._itemElements().each((index, item) => {
      if (selectedIndex !== index) {
        (0, _renderer.default)(item).find(ITEM_CONTENT_SELECTOR).addClass(GALLERY_INVISIBLE_ITEM_CLASS);
      }
      return true;
    });
  }
  _releaseInvisibleItems() {
    this._itemElements().find(ITEM_CONTENT_SELECTOR).removeClass(GALLERY_INVISIBLE_ITEM_CLASS);
  }
  _renderSelectedPageIndicator() {
    if (!this._$indicator) {
      return;
    }
    const {
      selectedIndex = 0
    } = this.option();
    const lastIndex = this._pagesCount() - 1;
    let pageIndex = Math.ceil(selectedIndex / this._itemsPerPage());
    pageIndex = Math.min(lastIndex, pageIndex);
    this._$indicator.find(GALLERY_INDICATOR_ITEM_SELECTOR).removeClass(GALLERY_INDICATOR_ITEM_SELECTED_CLASS).eq(pageIndex).addClass(GALLERY_INDICATOR_ITEM_SELECTED_CLASS);
  }
  _renderUserInteraction() {
    const {
      swipeEnabled: swipeEnabledOption,
      disabled
    } = this.option();
    const rootElement = this.$element();
    const swipeEnabled = swipeEnabledOption && this._itemsCount() > 1;
    this._createComponent(rootElement, _swipeable.default, {
      disabled: !!disabled || !swipeEnabled,
      onStart: e => {
        const {
          event
        } = e;
        this._swipeStartHandler(event);
      },
      onUpdated: e => {
        const {
          event
        } = e;
        this._swipeUpdateHandler(event);
      },
      onEnd: e => {
        const {
          event
        } = e;
        this._swipeEndHandler(event);
      },
      // @ts-expect-error ts-error
      itemSizeFunc: this._elementWidth.bind(this)
    });
  }
  _indicatorSelectHandler(_e, indicatorIndex) {
    const {
      indicatorEnabled
    } = this.option();
    if (!indicatorEnabled) {
      return;
    }
    const itemIndex = this._fitPaginatedIndex(indicatorIndex * this._itemsPerPage());
    this._needLongMove = true;
    this.option('selectedIndex', itemIndex);
    this._loadNextPageIfNeeded(itemIndex);
  }
  _renderNavButtons() {
    const {
      showNavButtons
    } = this.option();
    if (!showNavButtons) {
      this._cleanNavButtons();
      return;
    }
    const nextPage = this._nextPage.bind(this);
    const prevPage = this._prevPage.bind(this);
    this._prevNavButton = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
    this._createComponent(this._prevNavButton, GalleryNavButton, {
      direction: 'prev',
      onClick() {
        prevPage();
      }
    });
    this._nextNavButton = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
    this._createComponent(this._nextNavButton, GalleryNavButton, {
      direction: 'next',
      onClick() {
        nextPage();
      }
    });
    this._renderNavButtonsVisibility();
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _prevPage() {
    const visiblePageSize = this._itemsPerPage();
    const {
      selectedIndex = 0
    } = this.option();
    const newSelectedIndex = selectedIndex - visiblePageSize;
    if (newSelectedIndex === -visiblePageSize && visiblePageSize === this._itemsCount()) {
      return this._relocateItems(newSelectedIndex, 0);
    }
    return this.goToItem(this._fitPaginatedIndex(newSelectedIndex));
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _nextPage() {
    const visiblePageSize = this._itemsPerPage();
    const {
      selectedIndex = 0
    } = this.option();
    const newSelectedIndex = selectedIndex + visiblePageSize;
    if (newSelectedIndex === visiblePageSize && visiblePageSize === this._itemsCount()) {
      return this._relocateItems(newSelectedIndex, 0);
    }
    return this.goToItem(this._fitPaginatedIndex(newSelectedIndex)).done(this._loadNextPageIfNeeded);
  }
  _loadNextPageIfNeeded(index) {
    var _this$_dataSource;
    const {
      selectedIndex: selectedIndexOption = 0
    } = this.option();
    const selectedIndex = index ?? selectedIndexOption;
    if (
    // @ts-expect-error ts-error
    (_this$_dataSource = this._dataSource) !== null && _this$_dataSource !== void 0 && _this$_dataSource.paginate() && this._shouldLoadNextPage(selectedIndex)
    // @ts-expect-error ts-error
    && !this._isDataSourceLoading()
    // @ts-expect-error ts-error
    && !this._isLastPage()) {
      this._loadNextPage().done(() => {
        this._renderIndicator();
        this._cloneDuplicateItems();
        this._renderItemPositions();
        this._renderNavButtonsVisibility();
        this._renderItemSizes(selectedIndex);
      });
    }
  }
  _shouldLoadNextPage(selectedIndex) {
    const visiblePageSize = this._itemsPerPage();
    const {
      items = []
    } = this.option();
    return selectedIndex + 2 * visiblePageSize > items.length;
  }
  _allowDynamicItemsAppend() {
    return true;
  }
  _fitPaginatedIndex(itemIndex) {
    const itemsPerPage = this._itemsPerPage();
    const restItemsCount = itemIndex < 0 ? itemsPerPage + itemIndex : this._itemsCount() - itemIndex;
    if (itemIndex > this._itemsCount() - 1) {
      this._goToGhostItem = true;
      return 0;
    }
    if (restItemsCount < itemsPerPage && restItemsCount > 0) {
      if (itemIndex > 0) {
        return itemIndex - itemsPerPage + restItemsCount;
      }
      return itemIndex + itemsPerPage - restItemsCount;
    }
    return itemIndex;
  }
  _cleanNavButtons() {
    if (this._prevNavButton) {
      this._prevNavButton.remove();
      delete this._prevNavButton;
    }
    if (this._nextNavButton) {
      this._nextNavButton.remove();
      delete this._nextNavButton;
    }
  }
  _renderNavButtonsVisibility() {
    var _this$_dataSource2;
    const {
      showNavButtons,
      selectedIndex,
      loop
    } = this.option();
    if (!showNavButtons || !this._prevNavButton || !this._nextNavButton) {
      return;
    }
    const itemsCount = this._itemsCount();
    this._prevNavButton.show();
    this._nextNavButton.show();
    if (itemsCount === 0) {
      this._prevNavButton.hide();
      this._nextNavButton.hide();
    }
    if (loop) {
      return;
    }
    let nextHidden = selectedIndex === itemsCount - this._itemsPerPage();
    const prevHidden = itemsCount < 2 || selectedIndex === 0;
    // @ts-expect-error ts-error
    if ((_this$_dataSource2 = this._dataSource) !== null && _this$_dataSource2 !== void 0 && _this$_dataSource2.paginate()) {
      // @ts-expect-error ts-error
      nextHidden = nextHidden && this._isLastPage();
    } else {
      nextHidden = nextHidden || itemsCount < 2;
    }
    if (prevHidden) {
      this._prevNavButton.hide();
    }
    if (nextHidden) {
      this._nextNavButton.hide();
    }
  }
  _getUserInteraction() {
    return this._userInteraction;
  }
  _setupSlideShow() {
    const {
      slideshowDelay
    } = this.option();
    clearTimeout(this._slideshowTimer);
    if (!slideshowDelay) {
      return;
    }
    const getUserInteraction = this._getUserInteraction.bind(this);
    const setupSlideShow = this._setupSlideShow.bind(this);
    const nextItem = this.nextItem.bind(this);
    // eslint-disable-next-line no-restricted-globals
    this._slideshowTimer = setTimeout(() => {
      if (getUserInteraction()) {
        setupSlideShow();
        return;
      }
      nextItem(true).done(setupSlideShow);
    }, slideshowDelay);
  }
  _elementWidth() {
    if (!this._cacheElementWidth) {
      this._cacheElementWidth = (0, _size.getWidth)(this.$element());
    }
    return this._cacheElementWidth;
  }
  _clearCacheWidth() {
    delete this._cacheElementWidth;
  }
  _swipeStartHandler(event) {
    this._releaseInvisibleItems();
    this._clearCacheWidth();
    this._elementWidth();
    const itemsCount = this._itemsCount();
    if (!itemsCount) {
      event.cancel = true;
      return;
    }
    this._stopItemAnimations();
    this._startSwipe();
    this._userInteraction = true;
    const {
      selectedIndex = 0,
      rtlEnabled,
      loop
    } = this.option();
    if (!loop) {
      const startOffset = itemsCount - selectedIndex - this._itemsPerPage();
      const endOffset = selectedIndex;
      event.maxLeftOffset = rtlEnabled ? endOffset : startOffset;
      event.maxRightOffset = rtlEnabled ? startOffset : endOffset;
    }
  }
  _stopItemAnimations() {
    _animation.fx.stop(this._$container.get(0), true);
  }
  _swipeUpdateHandler(event) {
    const {
      selectedIndex = 0,
      wrapAround
    } = this.option();
    const wrapAroundRatio = wrapAround ? 1 : 0;
    const itemsPerPage = this._itemsPerPage() + wrapAroundRatio;
    const offset = this._offsetDirection() * event.offset * itemsPerPage - selectedIndex;
    if (offset < 0) {
      this._loadNextPageIfNeeded(Math.ceil(Math.abs(offset)));
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._renderContainerPosition(offset);
  }
  _swipeEndHandler(event) {
    const targetOffset = event.targetOffset * this._offsetDirection() * this._itemsPerPage();
    const {
      selectedIndex = 0
    } = this.option();
    const newIndex = this._fitIndex(selectedIndex - targetOffset);
    const paginatedIndex = this._fitPaginatedIndex(newIndex);
    if (Math.abs(targetOffset) < this._itemsPerPage()) {
      this._relocateItems(selectedIndex);
      return;
    }
    if (this._itemsPerPage() === this._itemsCount()) {
      if (targetOffset > 0) {
        this._relocateItems(-targetOffset);
      } else {
        this._relocateItems(0);
      }
      return;
    }
    this.option('selectedIndex', paginatedIndex);
  }
  _setFocusOnSelect() {
    this._userInteraction = true;
    const selectedItem = this._getRealItems().filter(`.${GALLERY_ITEM_SELECTED_CLASS}`);
    this.option('focusedElement', (0, _element.getPublicElement)(selectedItem));
    this._userInteraction = false;
  }
  _fitIndex(index) {
    const {
      loop
    } = this.option();
    if (!loop) {
      return index;
    }
    const itemsCount = this._itemsCount();
    let fittedIndex = index;
    if (fittedIndex >= itemsCount || fittedIndex < 0) {
      this._goToGhostItem = true;
    }
    if (fittedIndex >= itemsCount) {
      fittedIndex = itemsCount - fittedIndex;
    }
    fittedIndex %= itemsCount;
    if (fittedIndex < 0) {
      fittedIndex += itemsCount;
    }
    return fittedIndex;
  }
  _clean() {
    super._clean();
    this._cleanIndicators();
    this._cleanNavButtons();
  }
  _dispose() {
    Gallery._wasAnyItemTemplateRendered = null;
    clearTimeout(this._slideshowTimer);
    super._dispose();
  }
  _updateSelection(addedSelection, removedSelection) {
    this._stopItemAnimations();
    this._renderNavButtonsVisibility();
    this._renderSelectedItem();
    this._relocateItems(addedSelection[0], removedSelection[0]);
    this._renderSelectedPageIndicator();
  }
  _relocateItems(newIndex, prevIndex, withoutAnimation) {
    const indexOffset = this._calculateIndexOffset(newIndex, prevIndex ?? newIndex);
    const {
      animationEnabled
    } = this.option();
    this._renderContainerPosition(indexOffset, true, animationEnabled && !withoutAnimation)
    // @ts-expect-error ts-error
    // eslint-disable-next-line func-names
    .done(function () {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this._setFocusOnSelect();
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this._userInteraction = false;
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this._setupSlideShow();
    });
  }
  _focusInHandler(e) {
    if (_animation.fx.isAnimating(this._$container.get(0)) || this._userInteraction) {
      return;
    }
    super._focusInHandler(e);
  }
  _focusOutHandler(e) {
    if (_animation.fx.isAnimating(this._$container.get(0)) || this._userInteraction) {
      return;
    }
    super._focusOutHandler(e);
  }
  _selectFocusedItem() {}
  _moveFocus(location, e) {
    this._stopItemAnimations();
    super._moveFocus(location, e);
    const {
      focusedElement,
      animationEnabled
    } = this.option();
    const index = this.itemElements().index((0, _renderer.default)(focusedElement));
    this.goToItem(index, animationEnabled);
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._reviseDimensions();
    }
  }
  _calculateIndexOffset(newIndex, lastIndex) {
    const {
      loop
    } = this.option();
    const prevIndex = lastIndex ?? newIndex;
    let indexOffset = prevIndex - newIndex;
    if (loop && !this._needLongMove && this._goToGhostItem) {
      if (this._isItemOnFirstPage(newIndex) && this._isItemOnLastPage(prevIndex)) {
        indexOffset = -this._itemsPerPage();
      } else if (this._isItemOnLastPage(newIndex) && this._isItemOnFirstPage(prevIndex)) {
        indexOffset = this._itemsPerPage();
      }
      this._goToGhostItem = false;
    }
    this._needLongMove = false;
    indexOffset -= prevIndex;
    return indexOffset;
  }
  _isItemOnLastPage(itemIndex) {
    return itemIndex >= this._itemsCount() - this._itemsPerPage();
  }
  _isItemOnFirstPage(itemIndex) {
    return itemIndex <= this._itemsPerPage();
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'width':
      case 'initialItemWidth':
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case 'animationDuration':
        this._renderNavButtonsVisibility();
        break;
      case 'animationEnabled':
        break;
      case 'loop':
        this.$element().toggleClass(GALLERY_LOOP_CLASS, value);
        this.option('loopItemFocus', value);
        if ((0, _window.hasWindow)()) {
          this._cloneDuplicateItems();
          this._renderItemPositions();
          this._renderNavButtonsVisibility();
        }
        break;
      case 'showIndicator':
        this._renderIndicator();
        break;
      case 'showNavButtons':
        this._renderNavButtons();
        break;
      case 'slideshowDelay':
        this._setupSlideShow();
        break;
      case 'wrapAround':
      case 'stretchImages':
        if ((0, _window.hasWindow)()) {
          this._renderItemSizes();
          this._renderItemPositions();
          this._renderItemVisibility();
        }
        break;
      case 'swipeEnabled':
        this._renderUserInteraction();
        break;
      case 'indicatorEnabled':
        this._toggleIndicatorInteraction(value);
        break;
      default:
        super._optionChanged(args);
    }
  }
  goToItem(itemIndex, animation) {
    const {
      selectedIndex
    } = this.option();
    const itemsCount = this._itemsCount();
    if (animation !== undefined) {
      this._animationOverride = animation;
    }
    const fittedIndex = this._fitIndex(itemIndex);
    this._deferredAnimate = (0, _deferred.Deferred)();
    if (fittedIndex > itemsCount - 1 || fittedIndex < 0 || selectedIndex === fittedIndex) {
      // @ts-expect-error ts-error
      return this._deferredAnimate.resolveWith(this).promise();
    }
    this.option('selectedIndex', fittedIndex);
    // @ts-expect-error ts-error
    return this._deferredAnimate.promise();
  }
  prevItem(animation) {
    const {
      selectedIndex = 0
    } = this.option();
    return this.goToItem(selectedIndex - 1, animation);
  }
  nextItem(animation) {
    const {
      selectedIndex = 0
    } = this.option();
    return this.goToItem(selectedIndex + 1, animation);
  }
}
Gallery._wasAnyItemTemplateRendered = false;
(0, _component_registrator.default)('dxGallery', Gallery);
var _default = exports.default = Gallery;