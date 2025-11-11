/**
* DevExtreme (esm/__internal/ui/list/list.base.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { fx } from '../../../common/core/animation';
import { name as clickEventName } from '../../../common/core/events/click';
import eventsEngine from '../../../common/core/events/core/events_engine';
import pointerEvents from '../../../common/core/events/pointer';
import { end as swipeEventEnd } from '../../../common/core/events/swipe';
import { addNamespace } from '../../../common/core/events/utils';
import messageLocalization from '../../../common/core/localization/message';
import devices from '../../../core/devices';
import { getPublicElement } from '../../../core/element';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import { BindableTemplate } from '../../../core/templates/bindable_template';
import { ensureDefined, noop } from '../../../core/utils/common';
import { compileGetter } from '../../../core/utils/data';
import { Deferred } from '../../../core/utils/deferred';
import { getImageContainer } from '../../../core/utils/icon';
import { each } from '../../../core/utils/iterator';
import { getHeight, getOuterHeight, setHeight } from '../../../core/utils/size';
import { isDefined, isPlainObject } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import Button from '../../../ui/button';
import { current, isMaterial, isMaterialBased } from '../../../ui/themes';
import { render } from '../../core/utils/m_ink_ripple';
import supportUtils from '../../core/utils/m_support';
import { getDataSourceOptions } from '../../data/data_converter/grouped';
import CollectionWidget from '../../ui/collection/collection_widget.live_update';
import ListItem from '../../ui/list/item';
import ScrollView from '../../ui/scroll_view/scroll_view';
import { deviceDependentOptions } from '../../ui/scroll_view/scrollable.device';
import { getElementMargin } from '../../ui/scroll_view/utils/get_element_style';
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
// eslint-disable-next-line @typescript-eslint/naming-convention
let _scrollView = null;
function getScrollView() {
  return _scrollView ?? ScrollView;
}
export function setScrollView(value) {
  _scrollView = value;
}
export class ListBase extends CollectionWidget {
  _feedbackShowTimeout() {
    return LIST_FEEDBACK_SHOW_TIMEOUT;
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      leftArrow: noop,
      rightArrow: noop,
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
    const isFocusedItem = $item.is($(focusedElement));
    if (isFocusedItem) {
      this.scrollTo(this._getItemLocation($item, direction));
      $item = this._getEdgeVisibleItem(direction);
    }
    this.option('focusedElement', getPublicElement($item));
    this.scrollToItem($item);
  }
  _isLastItemFocused(direction) {
    const lastItemInDirection = direction === 'prev' ? this._itemElements().first() : this._itemElements().last();
    const {
      focusedElement
    } = this.option();
    return lastItemInDirection.is($(focusedElement));
  }
  _getNextItem($item, direction) {
    const $items = this._getAvailableItems();
    const itemIndex = $items.index($item);
    if (direction === 'prev') {
      return $($items[itemIndex - 1]);
    }
    return $($items[itemIndex + 1]);
  }
  _getEdgeVisibleItem(direction) {
    const scrollTop = this.scrollTop();
    const containerHeight = getHeight(this.$element());
    const {
      focusedElement
    } = this.option();
    let $item = $(focusedElement);
    let isItemVisible = true;
    if (!$item.length) {
      return $();
    }
    while (isItemVisible) {
      var _$nextItem$position;
      const $nextItem = this._getNextItem($item, direction);
      if (!$nextItem.length) {
        break;
      }
      const nextItemLocation = (((_$nextItem$position = $nextItem.position()) === null || _$nextItem$position === void 0 ? void 0 : _$nextItem$position.top) ?? 0) + getOuterHeight($nextItem) / 2;
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
      return $item.position().top - getHeight(this.$element()) + getOuterHeight($item);
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
      pullingDownText: messageLocalization.format('dxList-pullingDownText'),
      pulledDownText: messageLocalization.format('dxList-pulledDownText'),
      refreshingText: messageLocalization.format('dxList-refreshingText'),
      pageLoadingText: messageLocalization.format('dxList-pageLoadingText'),
      // @ts-expect-error ts-error
      onScroll: null,
      // @ts-expect-error ts-error
      onPullRefresh: null,
      // @ts-expect-error ts-error
      onPageLoading: null,
      pageLoadMode: 'scrollBottom',
      nextButtonText: messageLocalization.format('dxList-nextButtonText'),
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
    const themeName = current();
    return super._defaultOptionsRules().concat(deviceDependentOptions(), [{
      device() {
        return !supportUtils.nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }, {
      device(device) {
        return !supportUtils.nativeScrolling && !devices.isSimulator() && devices.real().deviceType === 'desktop' && device.platform === 'generic';
      },
      options: {
        showScrollbar: 'onHover',
        pageLoadMode: 'nextButton'
      }
    }, {
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return isMaterial(themeName);
      },
      options: {
        useInkRipple: true
      }
    }, {
      device() {
        return isMaterialBased(themeName);
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
    $(listContainer).empty();
    listContainer.appendTo(this._$container);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _saveSelectionChangeEvent(e) {
    this._selectionChangeEventInstance = e;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  _getSelectionChangeEvent() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    return $listGroup.find(itemAndHeaderSelector);
  }
  _getAvailableItems($itemElements) {
    const {
      collapsibleGroups
    } = this.option();
    if (collapsibleGroups) {
      const $elements = this._getItemAndHeaderElements();
      return $elements
      // @ts-expect-error ts-error
      .filter((_index, element) => {
        if ($(element).hasClass(LIST_GROUP_HEADER_CLASS)) {
          return true;
        }
        return !$(element).closest(`.${LIST_GROUP_CLASS}`).hasClass(LIST_GROUP_COLLAPSED_CLASS);
      });
    }
    return super._getAvailableItems($itemElements);
  }
  _modifyByChanges(changes, isPartialRefresh) {
    super._modifyByChanges(changes, isPartialRefresh);
    this._refreshItemElements();
    this._updateLoadingState(true);
  }
  reorderItem(itemElement, toItemElement) {
    const promise = super.reorderItem(itemElement, toItemElement);
    return promise.done(() => {
      this._refreshItemElements();
    });
  }
  deleteItem(itemElement) {
    const promise = super.deleteItem(itemElement);
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return promise.done(() => {
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
    const isSelectionControlClicked = $(e.target).closest(`.${LIST_SELECT_CHECKBOX}`).length || $(e.target).closest(`.${LIST_SELECT_RADIOBUTTON}`).length;
    if (isSelectionControlClicked) {
      this.option('focusedElement', getPublicElement($(e.currentTarget)));
    }
    // eslint-disable-next-line consistent-return
    return super._itemSelectHandler(e, isSelectionControlClicked);
  }
  _allowDynamicItemsAppend() {
    return true;
  }
  _activeStateUnit() {
    const {
      collapsibleGroups
    } = this.option();
    const selectors = [LIST_ITEM_SELECTOR, SELECT_ALL_ITEM_SELECTOR];
    if (collapsibleGroups) {
      selectors.push(`.${LIST_GROUP_HEADER_CLASS}`);
    }
    return selectors.join(',');
  }
  _init() {
    super._init();
    this._dataController.resetDataSourcePageIndex();
    this._$container = this.$element();
    this._$listContainer = $('<div>').addClass(LIST_ITEMS_CLASS);
    this._initScrollView();
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
    return _extends({}, super._dataSourceOptions(), {
      paginate: ensureDefined(scrollBottom || nextButton, true)
    });
  }
  _getSpecificDataSourceOption() {
    const {
      grouped
    } = this.option();
    const dataSource = this.option('dataSource');
    if (dataSource && grouped) {
      return getDataSourceOptions(dataSource);
    }
    return dataSource;
  }
  _getGroupContainerByIndex(groupIndex) {
    return this._getItemsContainer().find(`.${LIST_GROUP_CLASS}`).eq(groupIndex).find(`.${LIST_GROUP_BODY_CLASS}`);
  }
  _dataSourceFromUrlLoadMode() {
    return 'raw';
  }
  _initScrollView() {
    const {
      height,
      width,
      disabled,
      showScrollbar,
      useNativeScrolling,
      bounceEnabled,
      scrollByContent,
      scrollByThumb,
      pullingDownText,
      pulledDownText,
      refreshingText,
      pageLoadingText,
      scrollingEnabled,
      pullRefreshEnabled
    } = this.option();
    const isPullRefreshEnabled = scrollingEnabled && pullRefreshEnabled;
    const autoPagingEnabled = scrollingEnabled && this._scrollBottomMode() && !!this._dataController.getDataSource();
    this._scrollView = this._createComponent(this.$element(), getScrollView(), {
      height,
      width,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled: disabled || !scrollingEnabled,
      onScroll: e => {
        this._scrollHandler(e);
      },
      // @ts-expect-error ts-error
      onPullDown: isPullRefreshEnabled ? this._pullDownHandler.bind(this) : null,
      // @ts-expect-error ts-error
      onReachBottom: autoPagingEnabled ? this._scrollBottomHandler.bind(this) : null,
      showScrollbar,
      useNative: useNativeScrolling,
      bounceEnabled,
      scrollByContent,
      scrollByThumb,
      pullingDownText,
      pulledDownText,
      refreshingText,
      reachBottomText: pageLoadingText,
      useKeyboard: false
    });
    this._$container = $(this._scrollView.content());
    this._$listContainer.appendTo(this._$container);
    const {
      wrapItemText
    } = this.option();
    this._toggleWrapItemText(wrapItemText);
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
      group: new BindableTemplate(($container, data) => {
        if (isPlainObject(data)) {
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
      const $imageContainer = getImageContainer(data.icon);
      if (!$imageContainer) {
        return;
      }
      const $icon = $imageContainer.addClass(LIST_ITEM_ICON_CLASS);
      const $iconContainer = $('<div>').addClass(LIST_ITEM_ICON_CONTAINER_CLASS);
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
    // @ts-expect-error mixin method
    const isLastPage = this._isLastPage();
    const shouldLoadNextPage = scrollBottomMode && Boolean(tryLoadMore) && !isDataControllerLoading && !isLastPage;
    if (this._shouldContinueLoading(shouldLoadNextPage)) {
      this._infiniteDataLoading();
    } else {
      this._scrollView.release(!shouldLoadNextPage && !dataController.isLoading());
      // @ts-expect-error mixin method
      this._toggleNextButton(this._shouldRenderNextButton() && !this._isLastPage());
      this._loadIndicationSuppressed(false);
    }
  }
  _shouldRenderNextButton() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._nextButtonMode() && this._dataController.isLoaded();
  }
  _isDataSourceFirstLoadCompleted(newValue) {
    if (isDefined(newValue)) {
      this._isFirstLoadCompleted = newValue;
    }
    return this._isFirstLoadCompleted;
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    if (this._loadIndicationSuppressed()) {
      return;
    }
    const {
      indicateLoading
    } = this.option();
    if (isLoading && indicateLoading) {
      // eslint-disable-next-line no-restricted-globals
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
  _dataSourceChangedHandler(newItems, e) {
    if (!this._shouldAppendItems() && hasWindow()) {
      var _this$_scrollView3;
      (_this$_scrollView3 = this._scrollView) === null || _this$_scrollView3 === void 0 || _this$_scrollView3.scrollTo(0);
    }
    super._dataSourceChangedHandler(newItems, e);
    this._isDataSourceFirstLoadCompleted(true);
  }
  _refreshContent() {
    this._prepareContent();
    this._fireContentReadyAction();
  }
  _hideLoadingIfLoadIndicationOff() {
    const {
      indicateLoading
    } = this.option();
    if (!indicateLoading) {
      this._dataSourceLoadingChangedHandler(false);
    }
  }
  _loadIndicationSuppressed(value) {
    if (arguments.length) {
      this._isLoadIndicationSuppressed = value;
    }
    return this._isLoadIndicationSuppressed;
  }
  _scrollViewIsFull() {
    const scrollView = this._scrollView;
    return !scrollView || getHeight(scrollView.content()) > getHeight(scrollView.container());
  }
  _pullDownHandler() {
    var _this$_pullRefreshAct;
    const pullRefreshArgs = {
      component: this,
      element: this.element()
    };
    (_this$_pullRefreshAct = this._pullRefreshAction) === null || _this$_pullRefreshAct === void 0 || _this$_pullRefreshAct.call(this, pullRefreshArgs);
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
    const contentHeight = getHeight($content);
    const containerHeight = getHeight($container);
    const offsetTop = ((_this$_scrollView$scr = this._scrollView.scrollOffset()) === null || _this$_scrollView$scr === void 0 ? void 0 : _this$_scrollView$scr.top) ?? 0;
    const isBottomReached = contentHeight - containerHeight < offsetTop;
    const isFull = this._scrollViewIsFull();
    return shouldLoadNextPage && !isFull || isBottomReached;
  }
  _infiniteDataLoading() {
    const isElementVisible = this.$element().is(':visible');
    if (isElementVisible) {
      clearTimeout(this._loadNextPageTimer);
      // eslint-disable-next-line no-restricted-globals
      this._loadNextPageTimer = setTimeout(() => {
        this._loadNextPage();
      });
    }
  }
  _scrollBottomHandler(e) {
    var _this$_pageLoadingAct;
    (_this$_pageLoadingAct = this._pageLoadingAction) === null || _this$_pageLoadingAct === void 0 || _this$_pageLoadingAct.call(this, e);
    const dataController = this._dataController;
    // @ts-expect-error ts-error mixin method
    if (!dataController.isLoading() && !this._isLastPage()) {
      this._loadNextPage();
    } else {
      this._updateLoadingState();
    }
  }
  _renderItems(items) {
    const {
      grouped
    } = this.option();
    if (grouped) {
      each(items, this._renderGroup.bind(this));
      this._attachGroupCollapseEvent();
      this._renderEmptyMessage();
      if (isMaterial(current())) {
        this.attachGroupHeaderInkRippleEvents();
      }
    } else {
      super._renderItems(items);
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
    const eventNameClick = addNamespace(clickEventName, this.NAME);
    const headerSelector = `.${LIST_GROUP_HEADER_CLASS}`;
    const $element = this.$element();
    $element.toggleClass(LIST_COLLAPSIBLE_GROUPS_CLASS, collapsibleGroups);
    eventsEngine.off($element, eventNameClick, headerSelector);
    if (collapsibleGroups) {
      eventsEngine.on($element, eventNameClick, headerSelector, e => {
        this._processGroupCollapse(e);
      });
    }
  }
  _processGroupCollapse(e) {
    const actionCallback = evt => {
      var _evt$event;
      const {
        focusStateEnabled
      } = this.option();
      const $group = $((_evt$event = evt.event) === null || _evt$event === void 0 ? void 0 : _evt$event.currentTarget).parent();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._collapseGroupHandler($group);
      if (focusStateEnabled) {
        const groupHeader = getPublicElement($group.find(`.${LIST_GROUP_HEADER_CLASS}`));
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
    const isGroupHeader = $(focusedElement).hasClass(LIST_GROUP_HEADER_CLASS);
    if (collapsibleGroups && isGroupHeader) {
      // @ts-expect-error ts-error
      const params = this._getHandlerExtendedParams(e, $(focusedElement));
      this._processGroupCollapse(params);
      return;
    }
    super._enterKeyHandler(e);
  }
  _collapseGroupHandler($group, toggle) {
    const deferred = Deferred();
    const $groupHeader = $group.children(`.${LIST_GROUP_HEADER_CLASS}`);
    const collapsed = $group.hasClass(LIST_GROUP_COLLAPSED_CLASS);
    this._updateGroupHeaderAriaExpanded($groupHeader, collapsed);
    if (collapsed === toggle) {
      return deferred.resolve();
    }
    const $groupBody = $group.children(`.${LIST_GROUP_BODY_CLASS}`);
    const startHeight = getOuterHeight($groupBody);
    let endHeight = 0;
    if (collapsed) {
      setHeight($groupBody, 'auto');
      endHeight = getOuterHeight($groupBody);
    }
    $group.toggleClass(LIST_GROUP_COLLAPSED_CLASS, toggle);
    const groupBodyElement = $groupBody.get(0);
    if (fx.isAnimating(groupBodyElement)) {
      fx.stop(groupBodyElement, false);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fx.animate(groupBodyElement, {
      // @ts-expect-error fx.animate does not have proper typing
      type: 'custom',
      // @ts-expect-error fx.animate does not have proper typing
      from: {
        height: startHeight
      },
      // @ts-expect-error fx.animate does not have proper typing
      to: {
        height: endHeight
      },
      duration: 200,
      complete: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.updateDimensions();
        this._updateLoadingState(true);
        deferred.resolve();
      }
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
    this._itemElementsCache = $();
    this.$element().addClass(LIST_CLASS);
    super._initMarkup();
    const {
      useInkRipple
    } = this.option();
    if (useInkRipple) {
      this._renderInkRipple();
    }
    const elementAria = {
      role: 'group',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: messageLocalization.format('dxList-ariaRoleDescription')
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
    const label = allowItemDeleting ? messageLocalization.format('dxList-listAriaLabel-deletable') : messageLocalization.format('dxList-listAriaLabel');
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
    this._inkRipple = render();
  }
  _toggleActiveState($element, value, event) {
    super._toggleActiveState($element, value);
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: $element,
      event
    };
    if (value) {
      if (isMaterial(current())) {
        // eslint-disable-next-line no-restricted-globals
        this._inkRippleTimer = setTimeout(() => {
          var _this$_inkRipple;
          (_this$_inkRipple = this._inkRipple) === null || _this$_inkRipple === void 0 || _this$_inkRipple.showWave(config);
        }, LIST_FEEDBACK_SHOW_TIMEOUT / 2);
      } else {
        this._inkRipple.showWave(config);
      }
    } else {
      clearTimeout(this._inkRippleTimer);
      this._inkRipple.hideWave(config);
    }
  }
  _postprocessRenderItem(args) {
    this._refreshItemElements();
    super._postprocessRenderItem(args);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _swipeEnabled
    } = this.option();
    if (_swipeEnabled) {
      this._attachSwipeEvent($(args.itemElement));
    }
  }
  _getElementClassToSkipRefreshId() {
    return LIST_GROUP_HEADER_CLASS;
  }
  _attachSwipeEvent($itemElement) {
    // @ts-expect-error ts-error
    const endEventName = addNamespace(swipeEventEnd, this.NAME);
    eventsEngine.on($itemElement, endEventName, e => {
      this._itemSwipeEndHandler(e);
    });
  }
  _itemSwipeEndHandler(e) {
    this._itemDXEventHandler(e, 'onItemSwipe', {
      direction: e.offset < 0 ? 'left' : 'right'
    });
  }
  _nextButtonHandler() {
    var _this$_pageLoadingAct2;
    const pageLoadingArgs = {
      component: this,
      element: this.element()
    };
    (_this$_pageLoadingAct2 = this._pageLoadingAction) === null || _this$_pageLoadingAct2 === void 0 || _this$_pageLoadingAct2.call(this, pageLoadingArgs);
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
    var _this$_groupRenderAct;
    const $groupElement = $('<div>').addClass(LIST_GROUP_CLASS).appendTo(this._getItemsContainer());
    const groupHeaderId = `dx-${new Guid().toString()}`;
    const $groupHeaderElement = $('<div>').addClass(LIST_GROUP_HEADER_CLASS).attr('id', groupHeaderId).appendTo($groupElement);
    const {
      groupTemplate: templateName
    } = this.option();
    const groupTemplate = this._getTemplate(group.template ?? templateName,
    // @ts-expect-error ts-error
    group, index, $groupHeaderElement);
    const renderArgs = {
      index,
      itemData: group,
      container: getPublicElement($groupHeaderElement)
    };
    this._createItemByTemplate(groupTemplate, renderArgs);
    $('<div>').addClass(LIST_GROUP_HEADER_INDICATOR_CLASS).prependTo($groupHeaderElement);
    const groupBodyId = `dx-${new Guid().toString()}`;
    const $groupBody = $('<div>').addClass(LIST_GROUP_BODY_CLASS).attr('id', groupBodyId).appendTo($groupElement);
    const groupItemsGetter = compileGetter('items');
    // @ts-expect-error ts-error
    each(groupItemsGetter(group) || [], (itemIndex, item) => {
      this._renderItem({
        group: index,
        item: itemIndex
      }, item, $groupBody);
    });
    (_this$_groupRenderAct = this._groupRenderAction) === null || _this$_groupRenderAct === void 0 || _this$_groupRenderAct.call(this, {
      groupElement: getPublicElement($groupElement),
      groupIndex: index,
      groupData: group
    });
    this._setGroupAria($groupElement, groupHeaderId);
    this._setGroupHeaderAria($groupHeaderElement, groupBodyId);
    this._setGroupBodyAria($groupBody, groupHeaderId);
  }
  downInkRippleHandler(e) {
    this._toggleActiveState($(e.currentTarget), true, e);
  }
  upInkRippleHandler(e) {
    this._toggleActiveState($(e.currentTarget), false, e);
  }
  attachGroupHeaderInkRippleEvents() {
    const selector = `.${LIST_GROUP_HEADER_CLASS}`;
    const $element = this.$element();
    this._downInkRippleHandler = this._downInkRippleHandler ?? this.downInkRippleHandler.bind(this);
    this._upInkRippleHandler = this._upInkRippleHandler ?? this.upInkRippleHandler.bind(this);
    // @ts-expect-error ts-error
    eventsEngine.off($element, pointerEvents.down, selector, this._downInkRippleHandler);
    eventsEngine.on($element, pointerEvents.down, selector, this._downInkRippleHandler);
    // @ts-expect-error ts-error
    eventsEngine.off($element, [pointerEvents.up, pointerEvents.out].join(' '), selector, this._upInkRippleHandler);
    eventsEngine.on($element, [pointerEvents.up, pointerEvents.out].join(' '), selector, this._upInkRippleHandler);
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
    super._clean();
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
    const {
      scrollingEnabled
    } = this.option();
    this._scrollView.option('disabled', value || !scrollingEnabled);
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
    const $result = $('<div>').addClass(LIST_NEXT_BUTTON_CLASS);
    const $button = $('<div>').appendTo($result);
    const {
      nextButtonText
    } = this.option();
    this._createComponent($button, Button, {
      text: nextButtonText,
      onClick: () => {
        this._nextButtonHandler();
      },
      type: isMaterialBased(current()) ? 'default' : undefined,
      // @ts-expect-error
      integrationOptions: {}
    });
    return $result;
  }
  _moveFocus(location) {
    super._moveFocus(location);
    const {
      focusedElement
    } = this.option();
    if (focusedElement) {
      this.scrollToItem(focusedElement);
    }
  }
  _refresh() {
    if (!hasWindow()) {
      super._refresh();
    } else {
      const scrollTop = this._scrollView.scrollTop();
      super._refresh();
      if (scrollTop) {
        this._scrollView.scrollTo(scrollTop);
      }
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'pageLoadMode':
        this._toggleNextButton(!!value);
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
        this._invalidate();
        break;
      case 'wrapItemText':
        this._toggleWrapItemText(value);
        break;
      case 'onGroupRendered':
        this._createGroupRenderAction();
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        this._scrollView.option(name, value);
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
    const {
      grouped
    } = this.option();
    if (!grouped) {
      return super._extendActionArgs($itemElement);
    }
    const $group = $itemElement.closest(`.${LIST_GROUP_CLASS}`);
    const $item = $group.find(`.${LIST_ITEM_CLASS}`);
    return _extends({}, super._extendActionArgs($itemElement), {
      itemIndex: {
        group: $group.index(),
        item: $item.index($itemElement)
      }
    });
  }
  expandGroup(groupIndex) {
    const deferred = Deferred();
    const $group = this._getItemsContainer().find(`.${LIST_GROUP_CLASS}`).eq(groupIndex);
    // @ts-expect-error ts-error
    this._collapseGroupHandler($group, false).done(() => {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    });
    return deferred.promise();
  }
  collapseGroup(groupIndex) {
    const deferred = Deferred();
    const $group = this._getItemsContainer().find(`.${LIST_GROUP_CLASS}`).eq(groupIndex);
    // @ts-expect-error ts-error
    this._collapseGroupHandler($group, true).done(() => {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    });
    return deferred;
  }
  updateDimensions() {
    const deferred = Deferred();
    if (this._scrollView) {
      this._scrollView.update().done(() => {
        if (!this._scrollViewIsFull()) {
          this._updateLoadingState(true);
        }
        // @ts-expect-error ts-error
        deferred.resolveWith(this);
      });
    } else {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
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
    return this._scrollView.scrollOffset().top ?? 0;
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
    if (!isDefined(itemElement)) {
      return;
    }
    const $item = this._editStrategy.getItemElement(itemElement);
    this._scrollView.scrollToElement($item, {
      bottom: getElementMargin($item === null || $item === void 0 ? void 0 : $item.get(0), 'bottom')
    });
  }
  _dimensionChanged() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.updateDimensions();
  }
}
ListBase.ItemClass = ListItem;
