"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBase = void 0;
exports.setScrollView = setScrollView;
var _animation = require("../../../common/core/animation");
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _swipe = require("../../../common/core/events/swipe");
var _utils = require("../../../common/core/events/utils");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _element = require("../../../core/element");
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _bindable_template = require("../../../core/templates/bindable_template");
var _common = require("../../../core/utils/common");
var _data = require("../../../core/utils/data");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _icon = require("../../../core/utils/icon");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _scroll_view = _interopRequireDefault(require("../../../ui/scroll_view"));
var _themes = require("../../../ui/themes");
var _utils2 = require("../../../ui/widget/utils.ink_ripple");
var _m_support = _interopRequireDefault(require("../../core/utils/m_support"));
var _collection_widget = _interopRequireDefault(require("../../ui/collection/collection_widget.live_update"));
var _scrollable = require("../../ui/scroll_view/scrollable.device");
var _get_element_style = require("../../ui/scroll_view/utils/get_element_style");
var _m_grouped_data_converter_mixin = _interopRequireDefault(require("../../ui/shared/m_grouped_data_converter_mixin"));
var _item = _interopRequireDefault(require("./item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LIST_CLASS = 'dx-list';
const LIST_ITEMS_CLASS = 'dx-list-items';
const LIST_ITEM_CLASS = 'dx-list-item';
const LIST_ITEM_SELECTOR = `.${LIST_ITEM_CLASS}`;
const LIST_ITEM_ICON_CONTAINER_CLASS = 'dx-list-item-icon-container';
const LIST_ITEM_ICON_CLASS = 'dx-list-item-icon';
const LIST_GROUP_CLASS = 'dx-list-group';
const LIST_GROUP_HEADER_CLASS = 'dx-list-group-header';
const LIST_GROUP_BODY_CLASS = 'dx-list-group-body';
const LIST_COLLAPSIBLE_GROUPS_CLASS = 'dx-list-collapsible-groups';
const LIST_GROUP_COLLAPSED_CLASS = 'dx-list-group-collapsed';
const LIST_GROUP_HEADER_INDICATOR_CLASS = 'dx-list-group-header-indicator';
const LIST_HAS_NEXT_CLASS = 'dx-has-next';
const LIST_NEXT_BUTTON_CLASS = 'dx-list-next-button';
const LIST_SELECT_CHECKBOX = 'dx-list-select-checkbox';
const LIST_SELECT_RADIOBUTTON = 'dx-list-select-radiobutton';
const WRAP_ITEM_TEXT_CLASS = 'dx-wrap-item-text';
const SELECT_ALL_ITEM_SELECTOR = '.dx-list-select-all';
const LIST_ITEM_DATA_KEY = 'dxListItemData';
const LIST_FEEDBACK_SHOW_TIMEOUT = 70;
const groupItemsGetter = (0, _data.compileGetter)('items');
// eslint-disable-next-line @typescript-eslint/naming-convention
let _scrollView;
class ListBase extends _collection_widget.default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      leftArrow: _common.noop,
      rightArrow: _common.noop,
      pageUp(e) {
        this._moveFocusPerPage(e, 'prev');
      },
      pageDown(e) {
        this._moveFocusPerPage(e, 'next');
      }
    });
  }
  _moveFocusPerPage(e, direction) {
    if (this._isLastItemFocused(direction)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    let $item = this._getEdgeVisibleItem(direction);
    const {
      focusedElement
    } = this.option();
    const isFocusedItem = $item.is((0, _renderer.default)(focusedElement));
    if (isFocusedItem) {
      this.scrollTo(this._getItemLocation($item, direction));
      $item = this._getEdgeVisibleItem(direction);
    }
    this.option('focusedElement', (0, _element.getPublicElement)($item));
    this.scrollToItem($item);
  }
  _isLastItemFocused(direction) {
    const lastItemInDirection = direction === 'prev' ? this._itemElements().first() : this._itemElements().last();
    const {
      focusedElement
    } = this.option();
    return lastItemInDirection.is((0, _renderer.default)(focusedElement));
  }
  _getNextItem($item, direction) {
    const $items = this._getAvailableItems();
    const itemIndex = $items.index($item);
    if (direction === 'prev') {
      return (0, _renderer.default)($items[itemIndex - 1]);
    }
    return (0, _renderer.default)($items[itemIndex + 1]);
  }
  _getEdgeVisibleItem(direction) {
    const scrollTop = this.scrollTop();
    const containerHeight = (0, _size.getHeight)(this.$element());
    const {
      focusedElement
    } = this.option();
    let $item = (0, _renderer.default)(focusedElement);
    let isItemVisible = true;
    if (!$item.length) {
      return (0, _renderer.default)();
    }
    while (isItemVisible) {
      var _$nextItem$position;
      const $nextItem = this._getNextItem($item, direction);
      if (!$nextItem.length) {
        break;
      }
      const nextItemLocation = (((_$nextItem$position = $nextItem.position()) === null || _$nextItem$position === void 0 ? void 0 : _$nextItem$position.top) ?? 0) + (0, _size.getOuterHeight)($nextItem) / 2;
      isItemVisible = nextItemLocation < containerHeight + scrollTop && nextItemLocation > scrollTop;
      if (isItemVisible) {
        $item = $nextItem;
      }
    }
    return $item;
  }
  _getItemLocation($item, direction) {
    if (direction === 'prev') {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return $item.position().top - (0, _size.getHeight)(this.$element()) + (0, _size.getOuterHeight)($item);
    }
    // @ts-expect-error ts-error
    return $item.position().top;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      pullRefreshEnabled: false,
      scrollingEnabled: true,
      selectByClick: true,
      showScrollbar: 'onScroll',
      useNativeScrolling: true,
      bounceEnabled: true,
      scrollByContent: true,
      scrollByThumb: false,
      pullingDownText: _message.default.format('dxList-pullingDownText'),
      pulledDownText: _message.default.format('dxList-pulledDownText'),
      refreshingText: _message.default.format('dxList-refreshingText'),
      pageLoadingText: _message.default.format('dxList-pageLoadingText'),
      // @ts-expect-error ts-error
      onScroll: null,
      // @ts-expect-error ts-error
      onPullRefresh: null,
      // @ts-expect-error ts-error
      onPageLoading: null,
      pageLoadMode: 'scrollBottom',
      nextButtonText: _message.default.format('dxList-nextButtonText'),
      // @ts-expect-error ts-error
      onItemSwipe: null,
      grouped: false,
      // @ts-expect-error ts-error
      onGroupRendered: null,
      collapsibleGroups: false,
      groupTemplate: 'group',
      indicateLoading: true,
      activeStateEnabled: true,
      _itemAttributes: {
        role: 'option'
      },
      useInkRipple: false,
      wrapItemText: false,
      _swipeEnabled: true,
      showChevronExpr(data) {
        return data === null || data === void 0 ? void 0 : data.showChevron;
      },
      badgeExpr(data) {
        return data === null || data === void 0 ? void 0 : data.badge;
      },
      _onItemsRendered: () => {}
    });
  }
  _defaultOptionsRules() {
    const themeName = (0, _themes.current)();
    return super._defaultOptionsRules().concat((0, _scrollable.deviceDependentOptions)(), [{
      device() {
        return !_m_support.default.nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }, {
      device(device) {
        return !_m_support.default.nativeScrolling && !_devices.default.isSimulator() && _devices.default.real().deviceType === 'desktop' && device.platform === 'generic';
      },
      options: {
        showScrollbar: 'onHover',
        pageLoadMode: 'nextButton'
      }
    }, {
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return (0, _themes.isMaterial)(themeName);
      },
      options: {
        useInkRipple: true
      }
    }, {
      device() {
        return (0, _themes.isMaterialBased)(themeName);
      },
      options: {
        pullingDownText: '',
        pulledDownText: '',
        refreshingText: '',
        pageLoadingText: ''
      }
    }]);
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._updateLoadingState(true);
    }
  }
  _itemClass() {
    return LIST_ITEM_CLASS;
  }
  _itemDataKey() {
    return LIST_ITEM_DATA_KEY;
  }
  _itemContainer() {
    return this._$container;
  }
  _getItemsContainer() {
    return this._$listContainer;
  }
  _cleanItemContainer() {
    super._cleanItemContainer();
    const listContainer = this._getItemsContainer();
    (0, _renderer.default)(listContainer).empty();
    listContainer.appendTo(this._$container);
  }
  _saveSelectionChangeEvent(e) {
    this._selectionChangeEventInstance = e;
  }
  _getSelectionChangeEvent() {
    return this._selectionChangeEventInstance;
  }
  _refreshItemElements() {
    const {
      grouped
    } = this.option();
    const $itemsContainer = this._getItemsContainer();
    if (grouped) {
      this._itemElementsCache = $itemsContainer.children(`.${LIST_GROUP_CLASS}`).children(`.${LIST_GROUP_BODY_CLASS}`).children(this._itemSelector());
    } else {
      this._itemElementsCache = $itemsContainer.children(this._itemSelector());
    }
  }
  _getItemAndHeaderElements() {
    const itemSelector = `> .${LIST_GROUP_BODY_CLASS} > ${this._itemSelector()}`;
    const itemAndHeaderSelector = `${itemSelector}, > .${LIST_GROUP_HEADER_CLASS}`;
    const $listGroup = this._getItemsContainer().children(`.${LIST_GROUP_CLASS}`);
    const $items = $listGroup.find(itemAndHeaderSelector);
    return $items;
  }
  _getAvailableItems($itemElements) {
    const {
      collapsibleGroups
    } = this.option();
    if (collapsibleGroups) {
      const $elements = this._getItemAndHeaderElements();
      // @ts-expect-error ts-error
      const $visibleItems = $elements.filter((_, element) => {
        if ((0, _renderer.default)(element).hasClass(LIST_GROUP_HEADER_CLASS)) {
          return true;
        }
        return !(0, _renderer.default)(element).closest(`.${LIST_GROUP_CLASS}`).hasClass(LIST_GROUP_COLLAPSED_CLASS);
      });
      return $visibleItems;
    }
    return super._getAvailableItems($itemElements);
  }
  _modifyByChanges() {
    // @ts-expect-error ts-error
    super._modifyByChanges.apply(this, arguments);
    this._refreshItemElements();
    this._updateLoadingState(true);
  }
  reorderItem(itemElement, toItemElement) {
    const promise = super.reorderItem(itemElement, toItemElement);
    return promise.done(function () {
      this._refreshItemElements();
    });
  }
  deleteItem(itemElement) {
    const promise = super.deleteItem(itemElement);
    // @ts-expect-error ts-error
    return promise.done(function () {
      this._refreshItemElements();
    });
  }
  _itemElements() {
    return this._itemElementsCache;
  }
  _itemSelectHandler(e) {
    const {
      selectionMode
    } = this.option();
    const isSingleSelectedItemClicked = selectionMode === 'single' && this.isItemSelected(e.currentTarget);
    if (isSingleSelectedItemClicked) {
      return;
    }
    const isSelectionControlClicked = (0, _renderer.default)(e.target).closest(`.${LIST_SELECT_CHECKBOX}`).length || (0, _renderer.default)(e.target).closest(`.${LIST_SELECT_RADIOBUTTON}`).length;
    if (isSelectionControlClicked) {
      this.option('focusedElement', e.currentTarget);
    }
    return super._itemSelectHandler(e, isSelectionControlClicked);
  }
  _allowDynamicItemsAppend() {
    return true;
  }
  _updateActiveStateUnit() {
    const {
      collapsibleGroups
    } = this.option();
    const selectors = [LIST_ITEM_SELECTOR, SELECT_ALL_ITEM_SELECTOR];
    if (collapsibleGroups) {
      selectors.push(`.${LIST_GROUP_HEADER_CLASS}`);
    }
    this._activeStateUnit = selectors.join(',');
  }
  _init() {
    super._init();
    this._updateActiveStateUnit();
    this._dataController.resetDataSourcePageIndex();
    this._$container = this.$element();
    this._$listContainer = (0, _renderer.default)('<div>').addClass(LIST_ITEMS_CLASS);
    this._initScrollView();
    // @ts-expect-error ts-error
    this._feedbackShowTimeout = LIST_FEEDBACK_SHOW_TIMEOUT;
    this._createGroupRenderAction();
  }
  _scrollBottomMode() {
    const {
      pageLoadMode
    } = this.option();
    return pageLoadMode === 'scrollBottom';
  }
  _nextButtonMode() {
    const {
      pageLoadMode
    } = this.option();
    return pageLoadMode === 'nextButton';
  }
  _dataSourceOptions() {
    const scrollBottom = this._scrollBottomMode();
    const nextButton = this._nextButtonMode();
    return (0, _extend.extend)(super._dataSourceOptions(), {
      paginate: (0, _common.ensureDefined)(scrollBottom || nextButton, true)
    });
  }
  _getGroupedOption() {
    return this.option('grouped');
  }
  _getGroupContainerByIndex(groupIndex) {
    return this._getItemsContainer().find(`.${LIST_GROUP_CLASS}`).eq(groupIndex).find(`.${LIST_GROUP_BODY_CLASS}`);
  }
  _dataSourceFromUrlLoadMode() {
    return 'raw';
  }
  _initScrollView() {
    const scrollingEnabled = this.option('scrollingEnabled');
    const pullRefreshEnabled = scrollingEnabled && this.option('pullRefreshEnabled');
    const autoPagingEnabled = scrollingEnabled && this._scrollBottomMode() && !!this._dataController.getDataSource();
    this._scrollView = this._createComponent(this.$element(), getScrollView(), {
      height: this.option('height'),
      width: this.option('width'),
      disabled: this.option('disabled') || !scrollingEnabled,
      onScroll: this._scrollHandler.bind(this),
      onPullDown: pullRefreshEnabled ? this._pullDownHandler.bind(this) : null,
      onReachBottom: autoPagingEnabled ? this._scrollBottomHandler.bind(this) : null,
      showScrollbar: this.option('showScrollbar'),
      useNative: this.option('useNativeScrolling'),
      bounceEnabled: this.option('bounceEnabled'),
      scrollByContent: this.option('scrollByContent'),
      scrollByThumb: this.option('scrollByThumb'),
      pullingDownText: this.option('pullingDownText'),
      pulledDownText: this.option('pulledDownText'),
      refreshingText: this.option('refreshingText'),
      reachBottomText: this.option('pageLoadingText'),
      useKeyboard: false
    });
    this._$container = (0, _renderer.default)(this._scrollView.content());
    this._$listContainer.appendTo(this._$container);
    this._toggleWrapItemText(this.option('wrapItemText'));
    this._createScrollViewActions();
  }
  _toggleWrapItemText(value) {
    this._$listContainer.toggleClass(WRAP_ITEM_TEXT_CLASS, value);
  }
  _createScrollViewActions() {
    this._scrollAction = this._createActionByOption('onScroll');
    this._pullRefreshAction = this._createActionByOption('onPullRefresh');
    this._pageLoadingAction = this._createActionByOption('onPageLoading');
  }
  _scrollHandler(e) {
    var _this$_scrollAction;
    (_this$_scrollAction = this._scrollAction) === null || _this$_scrollAction === void 0 || _this$_scrollAction.call(this, e);
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      group: new _bindable_template.BindableTemplate(($container, data) => {
        if ((0, _type.isPlainObject)(data)) {
          if (data.key) {
            $container.text(data.key);
          }
        } else {
          $container.text(String(data));
        }
      }, ['key'], this.option('integrationOptions.watchMethod'))
    });
    super._initTemplates();
  }
  _prepareDefaultItemTemplate(data, $container) {
    super._prepareDefaultItemTemplate(data, $container);
    if (data.icon) {
      // @ts-expect-error
      const $icon = (0, _icon.getImageContainer)(data.icon).addClass(LIST_ITEM_ICON_CLASS);
      const $iconContainer = (0, _renderer.default)('<div>').addClass(LIST_ITEM_ICON_CONTAINER_CLASS);
      $iconContainer.append($icon);
      $container.prepend($iconContainer);
    }
  }
  _getBindableFields() {
    return ['text', 'html', 'icon'];
  }
  _updateLoadingState(tryLoadMore) {
    const dataController = this._dataController;
    const scrollBottomMode = this._scrollBottomMode();
    const isDataControllerLoading = dataController.isLoading();
    // @ts-expect-error ts-error
    const isLastPage = this._isLastPage();
    const shouldLoadNextPage = scrollBottomMode && Boolean(tryLoadMore) && !isDataControllerLoading && !isLastPage;
    if (this._shouldContinueLoading(shouldLoadNextPage)) {
      this._infiniteDataLoading();
    } else {
      this._scrollView.release(!shouldLoadNextPage && !dataController.isLoading());
      // @ts-expect-error ts-error
      this._toggleNextButton(this._shouldRenderNextButton() && !this._isLastPage());
      this._loadIndicationSuppressed(false);
    }
  }
  _shouldRenderNextButton() {
    return this._nextButtonMode() && this._dataController.isLoaded();
  }
  _isDataSourceFirstLoadCompleted(newValue) {
    if ((0, _type.isDefined)(newValue)) {
      this._isFirstLoadCompleted = newValue;
    }
    return this._isFirstLoadCompleted;
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    if (this._loadIndicationSuppressed()) {
      return;
    }
    if (isLoading && this.option('indicateLoading')) {
      this._showLoadingIndicatorTimer = setTimeout(() => {
        const isEmpty = !this._itemElements().length;
        const shouldIndicateLoading = !isEmpty || this._isDataSourceFirstLoadCompleted();
        if (shouldIndicateLoading) {
          var _this$_scrollView;
          (_this$_scrollView = this._scrollView) === null || _this$_scrollView === void 0 || _this$_scrollView.startLoading();
        }
      });
    } else {
      var _this$_scrollView2;
      clearTimeout(this._showLoadingIndicatorTimer);
      (_this$_scrollView2 = this._scrollView) === null || _this$_scrollView2 === void 0 || _this$_scrollView2.finishLoading();
    }
    if (!isLoading) {
      this._isDataSourceFirstLoadCompleted(false);
    }
  }
  _dataSourceChangedHandler() {
    if (!this._shouldAppendItems() && (0, _window.hasWindow)()) {
      var _this$_scrollView3;
      (_this$_scrollView3 = this._scrollView) === null || _this$_scrollView3 === void 0 || _this$_scrollView3.scrollTo(0);
    }
    // @ts-expect-error ts-error
    super._dataSourceChangedHandler.apply(this, arguments);
    this._isDataSourceFirstLoadCompleted(true);
  }
  _refreshContent() {
    this._prepareContent();
    this._fireContentReadyAction();
  }
  _hideLoadingIfLoadIndicationOff() {
    if (!this.option('indicateLoading')) {
      this._dataSourceLoadingChangedHandler(false);
    }
  }
  // @ts-expect-error ts-error
  _loadIndicationSuppressed(value) {
    if (!arguments.length) {
      return this._isLoadIndicationSuppressed;
    }
    this._isLoadIndicationSuppressed = value;
  }
  _scrollViewIsFull() {
    const scrollView = this._scrollView;
    return !scrollView || (0, _size.getHeight)(scrollView.content()) > (0, _size.getHeight)(scrollView.container());
  }
  _pullDownHandler(e) {
    var _this$_pullRefreshAct;
    (_this$_pullRefreshAct = this._pullRefreshAction) === null || _this$_pullRefreshAct === void 0 || _this$_pullRefreshAct.call(this, e);
    const dataController = this._dataController;
    if (dataController.getDataSource() && !dataController.isLoading()) {
      this._clearSelectedItems();
      dataController.pageIndex(0);
      dataController.reload();
    } else {
      this._updateLoadingState();
    }
  }
  _shouldContinueLoading(shouldLoadNextPage) {
    var _this$_scrollView$scr;
    if (!shouldLoadNextPage) {
      return false;
    }
    const $content = this._scrollView.content();
    const $container = this._scrollView.container();
    const contentHeight = (0, _size.getHeight)($content);
    const containerHeight = (0, _size.getHeight)($container);
    const offsetTop = ((_this$_scrollView$scr = this._scrollView.scrollOffset()) === null || _this$_scrollView$scr === void 0 ? void 0 : _this$_scrollView$scr.top) ?? 0;
    const isBottomReached = contentHeight - containerHeight < offsetTop;
    const isFull = this._scrollViewIsFull();
    const shouldContinueLoading = shouldLoadNextPage && !isFull || isBottomReached;
    return shouldContinueLoading;
  }
  _infiniteDataLoading() {
    const isElementVisible = this.$element().is(':visible');
    if (isElementVisible) {
      clearTimeout(this._loadNextPageTimer);
      this._loadNextPageTimer = setTimeout(() => {
        this._loadNextPage();
      });
    }
  }
  _scrollBottomHandler(e) {
    var _this$_pageLoadingAct;
    (_this$_pageLoadingAct = this._pageLoadingAction) === null || _this$_pageLoadingAct === void 0 || _this$_pageLoadingAct.call(this, e);
    const dataController = this._dataController;
    // @ts-expect-error ts-error
    if (!dataController.isLoading() && !this._isLastPage()) {
      this._loadNextPage();
    } else {
      this._updateLoadingState();
    }
  }
  _renderItems(items) {
    if (this.option('grouped')) {
      (0, _iterator.each)(items, this._renderGroup.bind(this));
      this._attachGroupCollapseEvent();
      this._renderEmptyMessage();
      // @ts-expect-error ts-error
      if ((0, _themes.isMaterial)()) {
        this.attachGroupHeaderInkRippleEvents();
      }
    } else {
      // @ts-expect-error ts-error
      super._renderItems.apply(this, arguments);
    }
    this._refreshItemElements();
    this._updateLoadingState(true);
  }
  _postProcessRenderItems() {
    const {
      _onItemsRendered: onItemsRendered
    } = this.option();
    onItemsRendered === null || onItemsRendered === void 0 || onItemsRendered();
  }
  _attachGroupCollapseEvent() {
    const {
      collapsibleGroups
    } = this.option();
    // @ts-expect-error ts-error
    const eventNameClick = (0, _utils.addNamespace)(_click.name, this.NAME);
    const headerSelector = `.${LIST_GROUP_HEADER_CLASS}`;
    const $element = this.$element();
    $element.toggleClass(LIST_COLLAPSIBLE_GROUPS_CLASS, collapsibleGroups);
    _events_engine.default.off($element, eventNameClick, headerSelector);
    if (collapsibleGroups) {
      _events_engine.default.on($element, eventNameClick, headerSelector, e => {
        this._processGroupCollapse(e);
      });
    }
  }
  _processGroupCollapse(e) {
    const actionCallback = e => {
      const {
        focusStateEnabled
      } = this.option();
      const $group = (0, _renderer.default)(e.event.currentTarget).parent();
      this._collapseGroupHandler($group);
      if (focusStateEnabled) {
        const groupHeader = (0, _element.getPublicElement)($group.find(`.${LIST_GROUP_HEADER_CLASS}`));
        this.option({
          focusedElement: groupHeader
        });
      }
    };
    const actionParams = {
      validatingTargetName: 'element'
    };
    const action = this._createAction(actionCallback, actionParams);
    action({
      event: e
    });
  }
  _enterKeyHandler(e) {
    const {
      collapsibleGroups,
      focusedElement
    } = this.option();
    const isGroupHeader = (0, _renderer.default)(focusedElement).hasClass(LIST_GROUP_HEADER_CLASS);
    if (collapsibleGroups && isGroupHeader) {
      const params = this._getHandlerExtendedParams(e, (0, _renderer.default)(focusedElement));
      this._processGroupCollapse(params);
      return;
    }
    super._enterKeyHandler(e);
  }
  _collapseGroupHandler($group, toggle) {
    const deferred = (0, _deferred.Deferred)();
    const $groupHeader = $group.children(`.${LIST_GROUP_HEADER_CLASS}`);
    const collapsed = $group.hasClass(LIST_GROUP_COLLAPSED_CLASS);
    this._updateGroupHeaderAriaExpanded($groupHeader, collapsed);
    if (collapsed === toggle) {
      return deferred.resolve();
    }
    const $groupBody = $group.children(`.${LIST_GROUP_BODY_CLASS}`);
    const startHeight = (0, _size.getOuterHeight)($groupBody);
    let endHeight = 0;
    if (collapsed) {
      (0, _size.setHeight)($groupBody, 'auto');
      endHeight = (0, _size.getOuterHeight)($groupBody);
    }
    $group.toggleClass(LIST_GROUP_COLLAPSED_CLASS, toggle);
    if (_animation.fx.isAnimating($groupBody)) {
      _animation.fx.stop($groupBody, false);
    }
    _animation.fx.animate($groupBody, {
      // @ts-expect-error
      type: 'custom',
      // @ts-expect-error
      from: {
        height: startHeight
      },
      // @ts-expect-error
      to: {
        height: endHeight
      },
      duration: 200,
      complete: function () {
        this.updateDimensions();
        this._updateLoadingState(true);
        deferred.resolve();
      }.bind(this)
    });
    return deferred.promise();
  }
  _dataSourceLoadErrorHandler() {
    this._forgetNextPageLoading();
    if (this._initialized) {
      this._renderEmptyMessage();
      this._updateLoadingState();
    }
  }
  _initMarkup() {
    this._itemElementsCache = (0, _renderer.default)();
    this.$element().addClass(LIST_CLASS);
    super._initMarkup();
    this.option('useInkRipple') && this._renderInkRipple();
    const elementAria = {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: _message.default.format('dxList-ariaRoleDescription')
    };
    this.setAria(elementAria, this.$element());
    this.setAria({
      role: 'application'
    }, this._focusTarget());
    this._setListAria();
  }
  _setListAria() {
    const {
      items,
      allowItemDeleting,
      collapsibleGroups
    } = this.option();
    const label = allowItemDeleting ? _message.default.format('dxList-listAriaLabel-deletable') : _message.default.format('dxList-listAriaLabel');
    const shouldSetAria = (items === null || items === void 0 ? void 0 : items.length) && !collapsibleGroups;
    const listArea = {
      role: shouldSetAria ? 'listbox' : undefined,
      label: shouldSetAria ? label : undefined
    };
    this.setAria(listArea, this._$listContainer);
  }
  _focusTarget() {
    return this._itemContainer();
  }
  _renderInkRipple() {
    this._inkRipple = (0, _utils2.render)();
  }
  _toggleActiveState($element, value, e) {
    // @ts-expect-error ts-error
    super._toggleActiveState.apply(this, arguments);
    const that = this;
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: $element,
      event: e
    };
    if (value) {
      // @ts-expect-error ts-error
      if ((0, _themes.isMaterial)()) {
        this._inkRippleTimer = setTimeout(() => {
          var _that$_inkRipple;
          (_that$_inkRipple = that._inkRipple) === null || _that$_inkRipple === void 0 || _that$_inkRipple.showWave(config);
        }, LIST_FEEDBACK_SHOW_TIMEOUT / 2);
      } else {
        var _that$_inkRipple2;
        (_that$_inkRipple2 = that._inkRipple) === null || _that$_inkRipple2 === void 0 || _that$_inkRipple2.showWave(config);
      }
    } else {
      clearTimeout(this._inkRippleTimer);
      this._inkRipple.hideWave(config);
    }
  }
  _postprocessRenderItem(args) {
    this._refreshItemElements();
    // @ts-expect-error ts-error
    super._postprocessRenderItem.apply(this, arguments);
    if (this.option('_swipeEnabled')) {
      this._attachSwipeEvent((0, _renderer.default)(args.itemElement));
    }
  }
  _getElementClassToSkipRefreshId() {
    return LIST_GROUP_HEADER_CLASS;
  }
  _attachSwipeEvent($itemElement) {
    // @ts-expect-error ts-error
    const endEventName = (0, _utils.addNamespace)(_swipe.end, this.NAME);
    _events_engine.default.on($itemElement, endEventName, this._itemSwipeEndHandler.bind(this));
  }
  _itemSwipeEndHandler(e) {
    this._itemDXEventHandler(e, 'onItemSwipe', {
      direction: e.offset < 0 ? 'left' : 'right'
    });
  }
  _nextButtonHandler(e) {
    var _this$_pageLoadingAct2;
    (_this$_pageLoadingAct2 = this._pageLoadingAction) === null || _this$_pageLoadingAct2 === void 0 || _this$_pageLoadingAct2.call(this, e);
    const dataController = this._dataController;
    if (dataController.getDataSource() && !dataController.isLoading()) {
      var _this$_$nextButton;
      this._scrollView.toggleLoading(true);
      (_this$_$nextButton = this._$nextButton) === null || _this$_$nextButton === void 0 || _this$_$nextButton.detach();
      this._loadIndicationSuppressed(true);
      this._loadNextPage();
    }
  }
  _setGroupAria($group, groupHeaderId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupAria = {
      role: collapsibleGroups ? undefined : 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      labelledby: collapsibleGroups ? undefined : groupHeaderId
    };
    this.setAria(groupAria, $group);
  }
  _updateGroupHeaderAriaExpanded($groupHeader, expanded) {
    this.setAria({
      expanded
    }, $groupHeader);
  }
  _setGroupHeaderAria($groupHeader, listGroupBodyId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupHeaderAria = {
      role: collapsibleGroups ? 'button' : undefined,
      expanded: collapsibleGroups ? true : undefined,
      controls: collapsibleGroups ? listGroupBodyId : undefined
    };
    this.setAria(groupHeaderAria, $groupHeader);
  }
  _setGroupBodyAria($groupBody, groupHeaderId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupHeaderAria = {
      role: collapsibleGroups ? 'listbox' : undefined,
      // eslint-disable-next-line spellcheck/spell-checker
      labelledby: collapsibleGroups ? groupHeaderId : undefined
    };
    this.setAria(groupHeaderAria, $groupBody);
  }
  _renderGroup(index, group) {
    const $groupElement = (0, _renderer.default)('<div>').addClass(LIST_GROUP_CLASS).appendTo(this._getItemsContainer());
    const groupHeaderId = `dx-${new _guid.default().toString()}`;
    const $groupHeaderElement = (0, _renderer.default)('<div>').addClass(LIST_GROUP_HEADER_CLASS).attr('id', groupHeaderId).appendTo($groupElement);
    const {
      groupTemplate: templateName
    } = this.option();
    const groupTemplate = this._getTemplate(group.template || templateName,
    // @ts-expect-error ts-error
    group, index, $groupHeaderElement);
    const renderArgs = {
      index,
      itemData: group,
      container: (0, _element.getPublicElement)($groupHeaderElement)
    };
    // @ts-expect-error ts-error
    this._createItemByTemplate(groupTemplate, renderArgs);
    (0, _renderer.default)('<div>').addClass(LIST_GROUP_HEADER_INDICATOR_CLASS).prependTo($groupHeaderElement);
    const groupBodyId = `dx-${new _guid.default().toString()}`;
    const $groupBody = (0, _renderer.default)('<div>').addClass(LIST_GROUP_BODY_CLASS).attr('id', groupBodyId).appendTo($groupElement);
    // @ts-expect-error ts-error
    (0, _iterator.each)(groupItemsGetter(group) || [], (itemIndex, item) => {
      this._renderItem({
        group: index,
        item: itemIndex
      }, item, $groupBody);
    });
    // @ts-expect-error ts-error
    this._groupRenderAction({
      groupElement: (0, _element.getPublicElement)($groupElement),
      groupIndex: index,
      groupData: group
    });
    this._setGroupAria($groupElement, groupHeaderId);
    this._setGroupHeaderAria($groupHeaderElement, groupBodyId);
    this._setGroupBodyAria($groupBody, groupHeaderId);
  }
  downInkRippleHandler(e) {
    this._toggleActiveState((0, _renderer.default)(e.currentTarget), true, e);
  }
  upInkRippleHandler(e) {
    this._toggleActiveState((0, _renderer.default)(e.currentTarget), false);
  }
  attachGroupHeaderInkRippleEvents() {
    const selector = `.${LIST_GROUP_HEADER_CLASS}`;
    const $element = this.$element();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._downInkRippleHandler = this._downInkRippleHandler || this.downInkRippleHandler.bind(this);
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this._upInkRippleHandler = this._upInkRippleHandler || this.upInkRippleHandler.bind(this);
    const downArguments = [$element, 'dxpointerdown', selector, this._downInkRippleHandler];
    const upArguments = [$element, 'dxpointerup dxpointerout', selector, this._upInkRippleHandler];
    // @ts-expect-error
    _events_engine.default.off(...downArguments);
    // @ts-expect-error
    _events_engine.default.on(...downArguments);
    // @ts-expect-error
    _events_engine.default.off(...upArguments);
    // @ts-expect-error
    _events_engine.default.on(...upArguments);
  }
  _createGroupRenderAction() {
    this._groupRenderAction = this._createActionByOption('onGroupRendered');
  }
  _clean() {
    clearTimeout(this._inkRippleTimer);
    if (this._$nextButton) {
      this._$nextButton.remove();
      this._$nextButton = null;
    }
    // @ts-expect-error ts-error
    super._clean.apply(this, arguments);
  }
  _dispose() {
    this._isDataSourceFirstLoadCompleted(false);
    clearTimeout(this._holdTimer);
    clearTimeout(this._loadNextPageTimer);
    clearTimeout(this._showLoadingIndicatorTimer);
    super._dispose();
  }
  _toggleDisabledState(value) {
    super._toggleDisabledState(value);
    this._scrollView.option('disabled', value || !this.option('scrollingEnabled'));
  }
  _toggleNextButton(value) {
    const dataController = this._dataController;
    const $nextButton = this._getNextButton();
    this.$element().toggleClass(LIST_HAS_NEXT_CLASS, value);
    if (value && dataController.isLoaded()) {
      $nextButton.appendTo(this._itemContainer());
    }
    if (!value) {
      $nextButton.detach();
    }
  }
  _getNextButton() {
    if (!this._$nextButton) {
      this._$nextButton = this._createNextButton();
    }
    return this._$nextButton;
  }
  _createNextButton() {
    const $result = (0, _renderer.default)('<div>').addClass(LIST_NEXT_BUTTON_CLASS);
    const $button = (0, _renderer.default)('<div>').appendTo($result);
    this._createComponent($button, _button.default, {
      text: this.option('nextButtonText'),
      onClick: this._nextButtonHandler.bind(this),
      // @ts-expect-error ts-error
      type: (0, _themes.isMaterialBased)() ? 'default' : undefined,
      integrationOptions: {}
    });
    return $result;
  }
  _moveFocus() {
    // @ts-expect-error ts-error
    super._moveFocus.apply(this, arguments);
    this.scrollToItem(this.option('focusedElement'));
  }
  _refresh() {
    if (!(0, _window.hasWindow)()) {
      super._refresh();
    } else {
      const scrollTop = this._scrollView.scrollTop();
      super._refresh();
      scrollTop && this._scrollView.scrollTo(scrollTop);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'pageLoadMode':
        this._toggleNextButton(args.value);
        this._initScrollView();
        break;
      case 'dataSource':
        super._optionChanged(args);
        this._initScrollView();
        this._updateLoadingState(true);
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case 'items':
        super._optionChanged(args);
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case 'pullingDownText':
      case 'pulledDownText':
      case 'refreshingText':
      case 'pageLoadingText':
      case 'showScrollbar':
      case 'bounceEnabled':
      case 'scrollByContent':
      case 'scrollByThumb':
      case 'useNativeScrolling':
      case 'scrollingEnabled':
      case 'pullRefreshEnabled':
        this._initScrollView();
        this._updateLoadingState(true);
        break;
      case 'nextButtonText':
      case 'onItemSwipe':
      case 'useInkRipple':
        this._invalidate();
        break;
      case 'onScroll':
      case 'onPullRefresh':
      case 'onPageLoading':
        this._createScrollViewActions();
        break;
      case 'grouped':
      case 'groupTemplate':
        this._invalidate();
        break;
      case 'collapsibleGroups':
        this._updateActiveStateUnit();
        this._invalidate();
        break;
      case 'wrapItemText':
        this._toggleWrapItemText(args.value);
        break;
      case 'onGroupRendered':
        this._createGroupRenderAction();
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        this._scrollView.option(args.name, args.value);
        this._scrollView.update();
        break;
      case 'indicateLoading':
        this._hideLoadingIfLoadIndicationOff();
        break;
      case 'visible':
        super._optionChanged(args);
        this._scrollView.update();
        break;
      case 'rtlEnabled':
        this._initScrollView();
        super._optionChanged(args);
        break;
      case 'showChevronExpr':
      case 'badgeExpr':
        this._invalidate();
        break;
      case '_swipeEnabled':
      case '_onItemsRendered':
      case 'selectByClick':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _extendActionArgs($itemElement) {
    if (!this.option('grouped')) {
      return super._extendActionArgs($itemElement);
    }
    const $group = $itemElement.closest(`.${LIST_GROUP_CLASS}`);
    const $item = $group.find(`.${LIST_ITEM_CLASS}`);
    return (0, _extend.extend)(super._extendActionArgs($itemElement), {
      itemIndex: {
        group: $group.index(),
        item: $item.index($itemElement)
      }
    });
  }
  expandGroup(groupIndex) {
    const deferred = (0, _deferred.Deferred)();
    const $group = this._getItemsContainer().find(`.${LIST_GROUP_CLASS}`).eq(groupIndex);
    // @ts-expect-error ts-error
    this._collapseGroupHandler($group, false).done(() => {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    });
    return deferred.promise();
  }
  collapseGroup(groupIndex) {
    const deferred = (0, _deferred.Deferred)();
    const $group = this._getItemsContainer().find(`.${LIST_GROUP_CLASS}`).eq(groupIndex);
    // @ts-expect-error ts-error
    this._collapseGroupHandler($group, true).done(() => {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    });
    return deferred;
  }
  updateDimensions() {
    const that = this;
    const deferred = (0, _deferred.Deferred)();
    if (that._scrollView) {
      that._scrollView.update().done(() => {
        !that._scrollViewIsFull() && that._updateLoadingState(true);
        // @ts-expect-error ts-error
        deferred.resolveWith(that);
      });
    } else {
      // @ts-expect-error ts-error
      deferred.resolveWith(that);
    }
    return deferred.promise();
  }
  reload() {
    super.reload();
    this.scrollTo(0);
    this._pullDownHandler();
  }
  repaint() {
    this.scrollTo(0);
    super.repaint();
  }
  scrollTop() {
    return this._scrollView.scrollOffset().top;
  }
  clientHeight() {
    return this._scrollView.clientHeight();
  }
  scrollHeight() {
    return this._scrollView.scrollHeight();
  }
  scrollBy(distance) {
    this._scrollView.scrollBy(distance);
  }
  scrollTo(location) {
    this._scrollView.scrollTo(location);
  }
  scrollToItem(itemElement) {
    const $item = this._editStrategy.getItemElement(itemElement);
    const item = $item === null || $item === void 0 ? void 0 : $item.get(0);
    this._scrollView.scrollToElement(item, {
      bottom: (0, _get_element_style.getElementMargin)(item, 'bottom')
    });
  }
  _dimensionChanged() {
    this.updateDimensions();
  }
}
exports.ListBase = ListBase;
ListBase.ItemClass = _item.default;
// @ts-expect-error ts-error
ListBase.include(_m_grouped_data_converter_mixin.default);
function getScrollView() {
  return _scrollView || _scroll_view.default;
}
function setScrollView(value) {
  _scrollView = value;
}