"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.virtualScrollingModule = exports.rowsView = exports.resizing = exports.dataSourceAdapterExtender = exports.data = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _iterator = require("../../../../core/utils/iterator");
var _position = require("../../../../core/utils/position");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _load_indicator = _interopRequireDefault(require("../../../../ui/load_indicator"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _m_virtual_scrolling_core = require("./m_virtual_scrolling_core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

const BOTTOM_LOAD_PANEL_CLASS = 'bottom-load-panel';
const GROUP_SPACE_CLASS = 'group-space';
const FREESPACE_CLASS = 'dx-freespace-row';
const COLUMN_LINES_CLASS = 'dx-column-lines';
const VIRTUAL_ROW_CLASS = 'dx-virtual-row';
const ROW_INSERTED = 'dx-row-inserted';
const SCROLLING_MODE_INFINITE = 'infinite';
const SCROLLING_MODE_VIRTUAL = 'virtual';
const LOAD_TIMEOUT = 300;
const LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
const VISIBLE_PAGE_INDEX = 'paging.pageIndex';
const PAGING_METHOD_NAMES = ['beginPageIndex', 'endPageIndex', 'pageIndex'];
const isVirtualMode = function (that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL;
};
const isAppendMode = function (that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_INFINITE;
};
const isVirtualPaging = function (that) {
  return isVirtualMode(that) || isAppendMode(that);
};
const correctCount = function (items, count, fromEnd, isItemCountableFunc) {
  for (let i = 0; i < count + 1; i++) {
    const item = items[fromEnd ? items.length - 1 - i : i];
    if (item && !isItemCountableFunc(item, i === count, fromEnd)) {
      count++;
    }
  }
  return count;
};
const isItemCountableByDataSource = function (item, dataSource) {
  return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && dataSource.isGroupItemCountable(item.data);
};
const updateItemIndices = function (items) {
  items.forEach((item, index) => {
    item.rowIndex = index;
  });
  return items;
};
const updateLoading = function (that) {
  const beginPageIndex = that._virtualScrollController.beginPageIndex(-1);
  if (isVirtualMode(that)) {
    if (beginPageIndex < 0 || that.viewportSize() >= 0 && that.getViewportItemIndex() >= 0 && (beginPageIndex * that.pageSize() > that.getViewportItemIndex() || beginPageIndex * that.pageSize() + that.itemsCount() < that.getViewportItemIndex() + that.viewportSize()) && that._dataSource.isLoading()) {
      if (!that._isLoading) {
        that._isLoading = true;
        that.loadingChanged.fire(true);
      }
    } else if (that._isLoading) {
      that._isLoading = false;
      that.loadingChanged.fire(false);
    }
  }
};
const proxyDataSourceAdapterMethod = function (that, methodName, args) {
  if (that.option(LEGACY_SCROLLING_MODE) === false && PAGING_METHOD_NAMES.includes(methodName)) {
    const dataSource = that._dataSource;
    return dataSource.pageIndex.apply(dataSource, args);
  }
  const virtualScrollController = that._virtualScrollController;
  return virtualScrollController[methodName].apply(virtualScrollController, args);
};
const removeEmptyRows = function ($emptyRows, className) {
  const getRowParent = row => (0, _renderer.default)(row).parent(`.${className}`).get(0);
  const tBodies = $emptyRows.toArray().map(getRowParent).filter(row => row);
  if (tBodies.length) {
    $emptyRows = (0, _renderer.default)(tBodies);
  }
  const rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;
  for (let i = 0; i < rowCount; i++) {
    $emptyRows.eq(i).remove();
  }
};
const dataSourceAdapterExtender = Base => class VirtualScrollingCoreDataSourceAdapterExtender extends Base {
  init() {
    super.init.apply(this, arguments);
    this._items = [];
    this._totalCount = -1;
    this._isLoaded = true;
    this._loadPageCount = 1;
    this._virtualScrollController = new _m_virtual_scrolling_core.VirtualScrollController(this.component, this._getVirtualScrollDataOptions());
  }
  dispose() {
    this._virtualScrollController.dispose();
    super.dispose.apply(this, arguments);
  }
  _getVirtualScrollDataOptions() {
    const that = this;
    return {
      pageSize() {
        return that.pageSize();
      },
      totalItemsCount() {
        return that.totalItemsCount();
      },
      hasKnownLastPage() {
        return that.hasKnownLastPage();
      },
      pageIndex(index) {
        return that._dataSource.pageIndex(index);
      },
      isLoading() {
        return that._dataSource.isLoading() && !that.isCustomLoading();
      },
      pageCount() {
        return that.pageCount();
      },
      load() {
        return that._dataSource.load();
      },
      updateLoading() {
        updateLoading(that);
      },
      itemsCount() {
        return that.itemsCount(true);
      },
      items() {
        return that._dataSource.items();
      },
      viewportItems(items) {
        if (items) {
          that._items = items;
        }
        return that._items;
      },
      onChanged(e) {
        that.changed.fire(e);
      },
      changingDuration() {
        if (that.isLoading()) {
          return LOAD_TIMEOUT;
        }
        return that._renderTime || 0;
      }
    };
  }
  _handleLoadingChanged(isLoading) {
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      super._handleLoadingChanged.apply(this, arguments);
      return;
    }
    if (!isVirtualMode(this) || this._isLoadingAll) {
      this._isLoading = isLoading;
      super._handleLoadingChanged.apply(this, arguments);
    }
    if (isLoading) {
      this._startLoadTime = new Date();
    } else {
      this._startLoadTime = undefined;
    }
  }
  _handleLoadError() {
    if (this.option(LEGACY_SCROLLING_MODE) !== false) {
      this._isLoading = false;
      this.loadingChanged.fire(false);
    }
    super._handleLoadError.apply(this, arguments);
  }
  _handleDataChanged(e) {
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      this._items = this._dataSource.items().slice();
      this._totalCount = this._dataSourceTotalCount(true);
      super._handleDataChanged.apply(this, arguments);
      return;
    }
    const callBase = super._handleDataChanged.bind(this);
    this._virtualScrollController.handleDataChanged(callBase, e);
  }
  _customizeRemoteOperations(options, operationTypes) {
    const newMode = this.option(LEGACY_SCROLLING_MODE) === false;
    let renderAsync = this.option('scrolling.renderAsync');
    if (!(0, _type.isDefined)(renderAsync)) {
      renderAsync = this._renderTime >= this.option('scrolling.renderingThreshold');
    }
    if ((isVirtualMode(this) || isAppendMode(this) && newMode) && !operationTypes.reload && (operationTypes.skip || newMode) && !renderAsync) {
      options.delay = undefined;
    }
    super._customizeRemoteOperations.apply(this, arguments);
  }
  items() {
    return this._items;
  }
  _dataSourceTotalCount(isBase) {
    return this.option(LEGACY_SCROLLING_MODE) === false && isVirtualMode(this) && !isBase ? this._totalCount : super._dataSourceTotalCount();
  }
  itemsCount(isBase) {
    if (isBase || this.option(LEGACY_SCROLLING_MODE) === false) {
      return super.itemsCount();
    }
    return this._virtualScrollController.itemsCount();
  }
  load(loadOptions) {
    if (this.option(LEGACY_SCROLLING_MODE) === false || loadOptions) {
      return super.load(loadOptions);
    }
    return this._virtualScrollController.load();
  }
  isLoading() {
    return this.option(LEGACY_SCROLLING_MODE) === false ? this._dataSource.isLoading() : this._isLoading;
  }
  isLoaded() {
    return this._dataSource.isLoaded() && this._isLoaded;
  }
  resetPagesCache(isLiveUpdate) {
    if (!isLiveUpdate) {
      this._virtualScrollController.reset(true);
    }
    super.resetPagesCache.apply(this, arguments);
  }
  _changeRowExpandCore() {
    const result = super._changeRowExpandCore.apply(this, arguments);
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      return result;
    }
    this.resetPagesCache();
    updateLoading(this);
    return result;
  }
  reload() {
    this._dataSource.pageIndex(this.pageIndex());
    const virtualScrollController = this._virtualScrollController;
    if (this.option(LEGACY_SCROLLING_MODE) !== false && virtualScrollController) {
      // @ts-expect-error
      const d = new _deferred.Deferred();
      super.reload.apply(this, arguments).done(r => {
        const delayDeferred = virtualScrollController.getDelayDeferred();
        if (delayDeferred) {
          delayDeferred.done(d.resolve).fail(d.reject);
        } else {
          d.resolve(r);
        }
      }).fail(d.reject);
      return d;
    }
    return super.reload.apply(this, arguments);
  }
  refresh(options, operationTypes) {
    if (this.option(LEGACY_SCROLLING_MODE) !== false) {
      const {
        storeLoadOptions
      } = options;
      const dataSource = this._dataSource;
      if (operationTypes.reload) {
        this._virtualScrollController.reset();
        dataSource.items().length = 0;
        this._isLoaded = false;
        updateLoading(this);
        this._isLoaded = true;
        if (isAppendMode(this)) {
          this.pageIndex(0);
          dataSource.pageIndex(0);
          storeLoadOptions.pageIndex = 0;
          options.pageIndex = 0;
          storeLoadOptions.skip = 0;
        } else {
          dataSource.pageIndex(this.pageIndex());
          if (dataSource.paginate()) {
            options.pageIndex = this.pageIndex();
            storeLoadOptions.skip = this.pageIndex() * this.pageSize();
          }
        }
      } else if (isAppendMode(this) && storeLoadOptions.skip && this._totalCountCorrection < 0) {
        storeLoadOptions.skip += this._totalCountCorrection;
      }
    }
    return super.refresh.apply(this, arguments);
  }
  loadPageCount(count) {
    if (!(0, _type.isDefined)(count)) {
      return this._loadPageCount;
    }
    this._loadPageCount = count;
  }
  _handleDataLoading(options) {
    const loadPageCount = this.loadPageCount();
    const pageSize = this.pageSize();
    const newMode = this.option(LEGACY_SCROLLING_MODE) === false;
    const {
      storeLoadOptions
    } = options;
    const takeIsDefined = (0, _type.isDefined)(storeLoadOptions.take);
    options.loadPageCount = loadPageCount;
    if (!options.isCustomLoading && newMode && takeIsDefined && loadPageCount > 1 && pageSize > 0) {
      storeLoadOptions.take = loadPageCount * pageSize;
    }
    super._handleDataLoading.apply(this, arguments);
  }
  _loadPageSize() {
    return super._loadPageSize.apply(this, arguments) * this.loadPageCount();
  }
  beginPageIndex() {
    return proxyDataSourceAdapterMethod(this, 'beginPageIndex', [...arguments]);
  }
  endPageIndex() {
    return proxyDataSourceAdapterMethod(this, 'endPageIndex', [...arguments]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageIndex(pageIndex) {
    return proxyDataSourceAdapterMethod(this, 'pageIndex', [...arguments]);
  }
  virtualItemsCount() {
    return proxyDataSourceAdapterMethod(this, 'virtualItemsCount', [...arguments]);
  }
  getContentOffset() {
    return proxyDataSourceAdapterMethod(this, 'getContentOffset', [...arguments]);
  }
  getVirtualContentSize() {
    return proxyDataSourceAdapterMethod(this, 'getVirtualContentSize', [...arguments]);
  }
  setContentItemSizes() {
    return proxyDataSourceAdapterMethod(this, 'setContentItemSizes', [...arguments]);
  }
  setViewportPosition() {
    return proxyDataSourceAdapterMethod(this, 'setViewportPosition', [...arguments]);
  }
  getViewportItemIndex() {
    return proxyDataSourceAdapterMethod(this, 'getViewportItemIndex', [...arguments]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setViewportItemIndex(viewportItemIndex) {
    return proxyDataSourceAdapterMethod(this, 'setViewportItemIndex', [...arguments]);
  }
  getItemIndexByPosition() {
    return proxyDataSourceAdapterMethod(this, 'getItemIndexByPosition', [...arguments]);
  }
  viewportSize() {
    return proxyDataSourceAdapterMethod(this, 'viewportSize', [...arguments]);
  }
  viewportItemSize() {
    return proxyDataSourceAdapterMethod(this, 'viewportItemSize', [...arguments]);
  }
  getItemSize() {
    return proxyDataSourceAdapterMethod(this, 'getItemSize', [...arguments]);
  }
  getItemSizes() {
    return proxyDataSourceAdapterMethod(this, 'getItemSizes', [...arguments]);
  }
  loadIfNeed() {
    return proxyDataSourceAdapterMethod(this, 'loadIfNeed', [...arguments]);
  }
};
exports.dataSourceAdapterExtender = dataSourceAdapterExtender;
const data = Base => class VirtualScrollingDataControllerExtender extends Base {
  dispose() {
    const rowsScrollController = this._rowsScrollController;
    rowsScrollController && rowsScrollController.dispose();
    super.dispose.apply(this, arguments);
  }
  _refreshDataSource() {
    // @ts-expect-error
    const baseResult = super._refreshDataSource.apply(this, arguments) || new _deferred.Deferred().resolve().promise();
    baseResult.done(this.initVirtualRows.bind(this));
    return baseResult;
  }
  _loadDataSource() {
    if (this._rowsScrollController && isVirtualPaging(this)) {
      var _this$_dataSource;
      const {
        loadPageCount
      } = (0, _type.isDefined)(this._loadViewportParams) ? this.getLoadPageParams() : {
        loadPageCount: 0
      };
      loadPageCount >= 1 && ((_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource.loadPageCount(loadPageCount));
    }
    return super._loadDataSource.apply(this, arguments);
  }
  getRowPageSize() {
    const rowPageSize = this.option('scrolling.rowPageSize');
    const pageSize = this.pageSize();
    return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize;
  }
  reload() {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const rowsScrollController = this._rowsScrollController || this._dataSource;
    const itemIndex = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.getItemIndexByPosition();
    const result = super.reload.apply(this, arguments);
    return result === null || result === void 0 ? void 0 : result.done(() => {
      if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
        const rowIndexOffset = this.getRowIndexOffset();
        const rowIndex = Math.floor(itemIndex) - rowIndexOffset;
        const {
          component
        } = this;
        const scrollable = component.getScrollable && component.getScrollable();
        const isSortingOperation = this.dataSource().operationTypes().sorting;
        if (scrollable && !isSortingOperation && rowIndex >= 0) {
          var _$rowElement$position;
          const rowElement = component.getRowElement(rowIndex);
          const $rowElement = (rowElement === null || rowElement === void 0 ? void 0 : rowElement[0]) && (0, _renderer.default)(rowElement[0]);
          let top = $rowElement === null || $rowElement === void 0 || (_$rowElement$position = $rowElement.position()) === null || _$rowElement$position === void 0 ? void 0 : _$rowElement$position.top;
          const isChromeLatest = _browser.default.chrome && Number(_browser.default.version ?? 0) >= 91;
          const allowedTopOffset = _browser.default.mozilla || isChromeLatest ? 1 : 0; // T884308
          if (top && top > allowedTopOffset) {
            top = Math.round(top + (0, _size.getOuterHeight)($rowElement) * (itemIndex % 1));
            scrollable.scrollTo({
              y: top
            });
          }
        }
      }
    });
  }
  initVirtualRows() {
    const virtualRowsRendering = _m_utils.default.isVirtualRowRendering(this);
    this._allItems = null;
    this._loadViewportParams = null;
    if (this.option('scrolling.mode') !== 'virtual' && !virtualRowsRendering || !virtualRowsRendering || this.option(LEGACY_SCROLLING_MODE) !== false && !this.option('scrolling.rowPageSize')) {
      this._visibleItems = null;
      this._rowsScrollController = null;
      return;
    }
    const pageIndex = !isVirtualMode(this) && this.pageIndex() >= this.pageCount() ? this.pageCount() - 1 : this.pageIndex();
    this._rowPageIndex = Math.ceil(pageIndex * this.pageSize() / this.getRowPageSize());
    this._visibleItems = this.option(LEGACY_SCROLLING_MODE) === false ? null : [];
    this._viewportChanging = false;
    this._needUpdateViewportAfterLoading = false;
    if (!this._rowsScrollController) {
      this._rowsScrollController = new _m_virtual_scrolling_core.VirtualScrollController(this.component, this._getRowsScrollDataOptions(), true);
      this._rowsScrollController.positionChanged.add(() => {
        var _this$_dataSource2;
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          this._viewportChanging = true;
          this.loadViewport();
          this._viewportChanging = false;
          return;
        }
        (_this$_dataSource2 = this._dataSource) === null || _this$_dataSource2 === void 0 || _this$_dataSource2.setViewportItemIndex(this._rowsScrollController.getViewportItemIndex());
      });
    }
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      this._updateLoadViewportParams();
    }
    if (this.isLoaded() && this.option(LEGACY_SCROLLING_MODE) !== false) {
      this._rowsScrollController.load();
    }
  }
  isViewportChanging() {
    return this._viewportChanging;
  }
  _getRowsScrollDataOptions() {
    const that = this;
    const isItemCountable = function (item) {
      return isItemCountableByDataSource(item, that._dataSource);
    };
    return {
      pageSize() {
        return that.getRowPageSize();
      },
      loadedOffset() {
        var _that$_dataSource;
        return isVirtualMode(that) && ((_that$_dataSource = that._dataSource) === null || _that$_dataSource === void 0 ? void 0 : _that$_dataSource.lastLoadOptions().skip) || 0;
      },
      loadedItemCount() {
        return that._itemCount;
      },
      totalItemsCount() {
        if (isVirtualPaging(that)) {
          return that.totalItemsCount();
        }
        return that.option(LEGACY_SCROLLING_MODE) === false ? that._itemCount : that._items.filter(isItemCountable).length;
      },
      hasKnownLastPage() {
        return that.option(LEGACY_SCROLLING_MODE) === false ? that.hasKnownLastPage() : true;
      },
      pageIndex(index) {
        if (index !== undefined) {
          that._rowPageIndex = index;
        }
        return that._rowPageIndex;
      },
      isLoading() {
        return that.isLoading();
      },
      pageCount() {
        const pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
        return pageCount || 1;
      },
      load() {
        if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
          that._rowPageIndex = this.pageCount() - 1;
          that._rowsScrollController.pageIndex(that._rowPageIndex);
        }
        if (!this.items().length && this.totalItemsCount()) return;
        that._rowsScrollController.handleDataChanged(change => {
          change = change || {};
          change.changeType = change.changeType || 'refresh';
          change.items = change.items || that._visibleItems;
          that._visibleItems.forEach((item, index) => {
            item.rowIndex = index;
          });
          that._fireChanged(change);
        });
      },
      updateLoading() {},
      itemsCount() {
        return this.items(true).length;
      },
      correctCount(items, count, fromEnd) {
        return correctCount(items, count, fromEnd, (item, isNextAfterLast, fromEnd) => {
          if (item.isNewRow) {
            return isNextAfterLast && !fromEnd;
          }
          if (isNextAfterLast && fromEnd) {
            return !item.isNewRow;
          }
          return isItemCountable(item);
        });
      },
      items(countableOnly) {
        let result = that._items;
        if (that.option(LEGACY_SCROLLING_MODE)) {
          const dataSource = that.dataSource();
          const virtualItemsCount = dataSource === null || dataSource === void 0 ? void 0 : dataSource.virtualItemsCount();
          const begin = virtualItemsCount ? virtualItemsCount.begin : 0;
          const rowPageSize = that.getRowPageSize();
          let skip = that._rowPageIndex * rowPageSize - begin;
          let take = rowPageSize;
          if (skip < 0) {
            return [];
          }
          if (skip) {
            skip = this.correctCount(result, skip);
            result = result.slice(skip);
          }
          if (take) {
            take = this.correctCount(result, take);
            result = result.slice(0, take);
          }
        }
        return countableOnly ? result.filter(isItemCountable) : result;
      },
      viewportItems(items) {
        if (items && that.option(LEGACY_SCROLLING_MODE) !== false) {
          that._visibleItems = items;
        }
        return that._visibleItems;
      },
      onChanged() {},
      changingDuration() {
        const dataSource = that.dataSource();
        if (dataSource !== null && dataSource !== void 0 && dataSource.isLoading() && that.option(LEGACY_SCROLLING_MODE) !== false) {
          return LOAD_TIMEOUT;
        }
        return (dataSource === null || dataSource === void 0 ? void 0 : dataSource._renderTime) || 0;
      }
    };
  }
  _updateItemsCore(change) {
    const delta = this.getRowIndexDelta();
    super._updateItemsCore.apply(this, arguments);
    if (this.option(LEGACY_SCROLLING_MODE) === false && _m_utils.default.isVirtualRowRendering(this)) {
      if (change.changeType === 'update' && change.rowIndices.length === 0 && change.cancelEmptyChanges) {
        change.cancel = true;
      }
      return;
    }
    const rowsScrollController = this._rowsScrollController;
    if (rowsScrollController) {
      const visibleItems = this._visibleItems;
      const isRefresh = change.changeType === 'refresh' || change.isLiveUpdate;
      if (change.changeType === 'append' && change.items && !change.items.length) return;
      if (isRefresh || change.changeType === 'append' || change.changeType === 'prepend') {
        change.cancel = true;
        isRefresh && rowsScrollController.reset(true);
        rowsScrollController.load();
      } else {
        if (change.changeType === 'update') {
          change.rowIndices.forEach((rowIndex, index) => {
            const changeType = change.changeTypes[index];
            const newItem = change.items[index];
            if (changeType === 'update') {
              visibleItems[rowIndex] = newItem;
            } else if (changeType === 'insert') {
              visibleItems.splice(rowIndex, 0, newItem);
            } else if (changeType === 'remove') {
              visibleItems.splice(rowIndex, 1);
            }
          });
        } else {
          visibleItems.forEach((item, index) => {
            visibleItems[index] = this._items[index + delta] || visibleItems[index];
          });
          change.items = visibleItems;
        }
        updateItemIndices(visibleItems);
      }
    }
  }
  _updateLoadViewportParams() {
    const viewportParams = this._rowsScrollController.getViewportParams();
    const pageSize = this.pageSize();
    if (viewportParams && !isVirtualPaging(this) && pageSize > 0) {
      const pageOffset = this.pageIndex() * pageSize;
      viewportParams.skip += pageOffset;
    }
    this._loadViewportParams = viewportParams;
  }
  _processItems() {
    const resultItems = super._processItems.apply(this, arguments);
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      const dataSource = this._dataSource;
      let currentIndex = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.lastLoadOptions().skip) ?? 0;
      let prevCountable;
      let prevRowType;
      let isPrevRowNew;
      let wasCountableItem = false;
      let newRows = [];
      resultItems.forEach(item => {
        const {
          rowType
        } = item;
        const itemCountable = isItemCountableByDataSource(item, dataSource);
        const isNextGroupItem = rowType === 'group' && (prevCountable || itemCountable || prevRowType !== 'group' && currentIndex > 0);
        const isNextDataItem = rowType === 'data' && itemCountable && (prevCountable || prevRowType !== 'group');
        if (!item.isNewRow && (0, _type.isDefined)(prevCountable)) {
          const isPrevNewRowFirst = isPrevRowNew && !wasCountableItem;
          if ((isNextGroupItem || isNextDataItem) && !isPrevNewRowFirst) {
            currentIndex++;
          }
        }
        if (isNextGroupItem || isNextDataItem) {
          wasCountableItem = true;
        }
        if (item.isNewRow) {
          newRows.push(item);
        } else {
          newRows.forEach(it => {
            it.loadIndex = currentIndex;
          });
          newRows = [];
        }
        item.loadIndex = currentIndex;
        prevCountable = itemCountable;
        prevRowType = rowType;
        isPrevRowNew = item.isNewRow;
      });
      newRows.forEach(it => {
        it.loadIndex = currentIndex;
      });
    }
    return resultItems;
  }
  _afterProcessItems(items) {
    this._itemCount = items.filter(item => isItemCountableByDataSource(item, this._dataSource)).length;
    if ((0, _type.isDefined)(this._loadViewportParams)) {
      this._updateLoadViewportParams();
      let result = items;
      this._allItems = items;
      if (items.length) {
        const {
          skipForCurrentPage
        } = this.getLoadPageParams(true);
        const skip = items[0].loadIndex + skipForCurrentPage;
        const {
          take
        } = this._loadViewportParams;
        result = items.filter(it => {
          const isNewRowInEmptyData = it.isNewRow && it.loadIndex === skip && take === 0;
          const isLoadIndexGreaterStart = it.loadIndex >= skip;
          const isLoadIndexLessEnd = it.loadIndex < skip + take || isNewRowInEmptyData;
          return isLoadIndexGreaterStart && isLoadIndexLessEnd;
        });
      }
      return result;
    }
    return super._afterProcessItems.apply(this, arguments);
  }
  _applyChange(change) {
    const that = this;
    const {
      items
    } = change;
    const {
      changeType
    } = change;
    let {
      removeCount
    } = change;
    if (removeCount) {
      const fromEnd = changeType === 'prepend';
      removeCount = correctCount(that._items, removeCount, fromEnd, (item, isNextAfterLast) => item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast));
      change.removeCount = removeCount;
    }
    switch (changeType) {
      case 'prepend':
        that._items.unshift.apply(that._items, items);
        if (removeCount) {
          that._items.splice(-removeCount);
        }
        break;
      case 'append':
        that._items.push.apply(that._items, items);
        if (removeCount) {
          that._items.splice(0, removeCount);
        }
        break;
      default:
        super._applyChange(change);
        break;
    }
  }
  items(allItems) {
    return allItems ? this._allItems || this._items : this._visibleItems || this._items;
  }
  getRowIndexDelta() {
    let delta = 0;
    if (this.option(LEGACY_SCROLLING_MODE)) {
      const visibleItems = this._visibleItems;
      if (visibleItems !== null && visibleItems !== void 0 && visibleItems[0]) {
        delta = this._items.indexOf(visibleItems[0]);
      }
    }
    return delta < 0 ? 0 : delta;
  }
  getRowIndexOffset(byLoadedRows, needGroupOffset) {
    let offset = 0;
    const dataSource = this.dataSource();
    const rowsScrollController = this._rowsScrollController;
    const newMode = this.option(LEGACY_SCROLLING_MODE) === false;
    const virtualPaging = isVirtualPaging(this);
    if (rowsScrollController && !byLoadedRows) {
      if (newMode && (0, _type.isDefined)(this._loadViewportParams)) {
        const {
          skipForCurrentPage,
          pageIndex
        } = this.getLoadPageParams(true);
        const items = this.items(true);
        offset = virtualPaging ? pageIndex * this.pageSize() : 0;
        if (items.length) {
          const firstLoadIndex = items[0].loadIndex;
          offset += items.filter(item => item.loadIndex < firstLoadIndex + skipForCurrentPage).length;
        }
      } else {
        offset = rowsScrollController.beginPageIndex() * rowsScrollController.pageSize();
      }
    } else if (virtualPaging && newMode && dataSource) {
      var _lastLoadOptions$skip;
      const lastLoadOptions = dataSource.lastLoadOptions();
      if (needGroupOffset && (_lastLoadOptions$skip = lastLoadOptions.skips) !== null && _lastLoadOptions$skip !== void 0 && _lastLoadOptions$skip.length) {
        offset = lastLoadOptions.skips.reduce((res, skip) => res + skip, 0);
      } else {
        offset = lastLoadOptions.skip ?? 0;
      }
    } else if (isVirtualMode(this) && dataSource) {
      offset = dataSource.beginPageIndex() * dataSource.pageSize();
    }
    return offset;
  }
  getDataIndex() {
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      return this.getRowIndexOffset(true, true);
    }
    return super.getDataIndex.apply(this, arguments);
  }
  viewportSize() {
    const rowsScrollController = this._rowsScrollController;
    const dataSource = this._dataSource;
    // @ts-expect-error
    const result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportSize.apply(rowsScrollController, arguments);
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      return result;
    }
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportSize.apply(dataSource, arguments);
  }
  viewportHeight(height, scrollTop) {
    var _this$_rowsScrollCont;
    (_this$_rowsScrollCont = this._rowsScrollController) === null || _this$_rowsScrollCont === void 0 || _this$_rowsScrollCont.viewportHeight(height, scrollTop);
  }
  viewportItemSize() {
    const rowsScrollController = this._rowsScrollController;
    const dataSource = this._dataSource;
    // @ts-expect-error
    const result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      return result;
    }
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportItemSize.apply(dataSource, arguments);
  }
  setViewportPosition() {
    const rowsScrollController = this._rowsScrollController;
    const dataSource = this._dataSource;
    this._isPaging = false;
    if (rowsScrollController) {
      // @ts-expect-error
      rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments);
    } else {
      dataSource === null || dataSource === void 0 || dataSource.setViewportPosition.apply(dataSource, arguments);
    }
  }
  setContentItemSizes(sizes) {
    const rowsScrollController = this._rowsScrollController;
    const dataSource = this._dataSource;
    const result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.setContentItemSizes(sizes);
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      return result;
    }
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.setContentItemSizes(sizes);
  }
  getPreloadedRowCount() {
    const preloadCount = this.option('scrolling.preloadedRowCount');
    const preloadEnabled = this.option('scrolling.preloadEnabled');
    if ((0, _type.isDefined)(preloadCount)) {
      return preloadCount;
    }
    const viewportSize = this.viewportSize();
    return preloadEnabled ? 2 * viewportSize : viewportSize;
  }
  getLoadPageParams(byLoadedPage) {
    var _this$_dataSource3, _this$_dataSource4;
    const pageSize = this.pageSize();
    const viewportParams = this._loadViewportParams;
    const lastLoadOptions = (_this$_dataSource3 = this._dataSource) === null || _this$_dataSource3 === void 0 ? void 0 : _this$_dataSource3.lastLoadOptions();
    const loadedPageIndex = (lastLoadOptions === null || lastLoadOptions === void 0 ? void 0 : lastLoadOptions.pageIndex) || 0;
    const loadedTake = (lastLoadOptions === null || lastLoadOptions === void 0 ? void 0 : lastLoadOptions.take) || 0;
    const isScrollingBack = this._rowsScrollController.isScrollingBack();
    const topPreloadCount = isScrollingBack ? this.getPreloadedRowCount() : 0;
    const bottomPreloadCount = isScrollingBack ? 0 : this.getPreloadedRowCount();
    const totalCountCorrection = ((_this$_dataSource4 = this._dataSource) === null || _this$_dataSource4 === void 0 ? void 0 : _this$_dataSource4.totalCountCorrection()) || 0;
    const skipWithPreload = Math.max(0, viewportParams.skip - topPreloadCount);
    const pageIndex = byLoadedPage ? loadedPageIndex : Math.floor(pageSize ? skipWithPreload / pageSize : 0);
    const pageOffset = pageIndex * pageSize;
    const skipForCurrentPage = viewportParams.skip - pageOffset;
    const loadingTake = viewportParams.take + skipForCurrentPage + bottomPreloadCount - totalCountCorrection;
    const take = byLoadedPage ? loadedTake : loadingTake;
    const loadPageCount = Math.ceil(pageSize ? take / pageSize : 0);
    return {
      pageIndex,
      loadPageCount: Math.max(1, loadPageCount),
      skipForCurrentPage: Math.max(0, skipForCurrentPage)
    };
  }
  _updateVisiblePageIndex(currentPageIndex) {
    if (!this._rowsScrollController) {
      return;
    }
    if ((0, _type.isDefined)(currentPageIndex)) {
      this._silentOption(VISIBLE_PAGE_INDEX, currentPageIndex);
      this.pageChanged.fire();
      return;
    }
    const viewPortItemIndex = this._rowsScrollController.getViewportItemIndex();
    const newPageIndex = Math.floor(viewPortItemIndex / this.pageSize());
    if (this.pageIndex() !== newPageIndex) {
      this._silentOption(VISIBLE_PAGE_INDEX, newPageIndex);
      this.updateItems({
        changeType: 'pageIndex'
      });
    }
  }
  _getChangedLoadParams() {
    const loadedPageParams = this.getLoadPageParams(true);
    const {
      pageIndex,
      loadPageCount
    } = this.getLoadPageParams();
    const pageIndexIsValid = this._pageIndexIsValid(pageIndex);
    let result = null;
    if (!this._isLoading && pageIndexIsValid && (pageIndex !== loadedPageParams.pageIndex || loadPageCount !== loadedPageParams.loadPageCount)) {
      result = {
        pageIndex,
        loadPageCount
      };
    }
    return result;
  }
  _pageIndexIsValid(pageIndex) {
    let result = true;
    if (isAppendMode(this) && this.hasKnownLastPage() || isVirtualMode(this)) {
      result = pageIndex * this.pageSize() < this.totalItemsCount();
    }
    return result;
  }
  _loadItems(checkLoading, viewportIsFilled) {
    const virtualPaging = isVirtualPaging(this);
    const dataSourceAdapter = this._dataSource;
    const changedParams = this._getChangedLoadParams();
    const currentLoadPageCount = (dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.loadPageCount()) ?? 0;
    const lastRequiredItemCount = this.pageSize() * currentLoadPageCount;
    const currentPageIndex = (dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.pageIndex()) ?? 0;
    const pageIndexNotChanged = (changedParams === null || changedParams === void 0 ? void 0 : changedParams.pageIndex) === currentPageIndex;
    const allLoadedInAppendMode = isAppendMode(this) && this.totalItemsCount() < lastRequiredItemCount;
    const isRepaintMode = this.option('editing.refreshMode') === 'repaint';
    const pageIndexIncreased = (changedParams === null || changedParams === void 0 ? void 0 : changedParams.pageIndex) > currentPageIndex;
    let result = false;
    if (!dataSourceAdapter || virtualPaging && checkLoading && (isRepaintMode && viewportIsFilled || pageIndexIncreased || pageIndexNotChanged && allLoadedInAppendMode)) {
      return result;
    }
    if (virtualPaging && this._isLoading) {
      this._needUpdateViewportAfterLoading = true;
    }
    if (virtualPaging && changedParams) {
      result = true;
      dataSourceAdapter.pageIndex(changedParams.pageIndex);
      dataSourceAdapter.loadPageCount(changedParams.loadPageCount);
      this._repaintChangesOnly = true;
      this._needUpdateDimensions = true;
      const viewportChanging = this._viewportChanging;
      this.load().always(() => {
        this._repaintChangesOnly = undefined;
        this._needUpdateDimensions = undefined;
      }).done(() => {
        const isLastPage = this.pageCount() > 0 && this.pageIndex() === this.pageCount() - 1;
        (viewportChanging || isLastPage) && this._updateVisiblePageIndex();
        if (this._needUpdateViewportAfterLoading) {
          this._needUpdateViewportAfterLoading = false;
          this.loadViewport({
            checkLoadedParamsOnly: true
          });
        }
      });
    }
    return result;
  }
  loadViewport(params) {
    const {
      checkLoadedParamsOnly,
      checkLoading,
      viewportIsNotFilled
    } = params ?? {};
    const virtualPaging = isVirtualPaging(this);
    if (virtualPaging || _m_utils.default.isVirtualRowRendering(this)) {
      var _this$_dataSource5;
      this._updateLoadViewportParams();
      const loadingItemsStarted = this._loadItems(checkLoading, !viewportIsNotFilled);
      const isCustomLoading = (_this$_dataSource5 = this._dataSource) === null || _this$_dataSource5 === void 0 ? void 0 : _this$_dataSource5.isCustomLoading();
      const isLoading = checkLoading && !isCustomLoading && this._isLoading;
      const needToUpdateItems = !(loadingItemsStarted || isLoading || checkLoadedParamsOnly);
      if (needToUpdateItems) {
        var _this$_editingControl;
        const noPendingChangesInEditing = !((_this$_editingControl = this._editingController) !== null && _this$_editingControl !== void 0 && (_this$_editingControl = _this$_editingControl.getChanges()) !== null && _this$_editingControl !== void 0 && _this$_editingControl.length);
        this.updateItems({
          repaintChangesOnly: true,
          needUpdateDimensions: true,
          useProcessedItemsCache: noPendingChangesInEditing,
          cancelEmptyChanges: true
        });
      }
    }
  }
  updateViewport() {
    var _this$_loadViewportPa;
    const viewportSize = this.viewportSize();
    const itemCount = this.items().length;
    const viewportIsNotFilled = viewportSize > itemCount;
    const currentTake = ((_this$_loadViewportPa = this._loadViewportParams) === null || _this$_loadViewportPa === void 0 ? void 0 : _this$_loadViewportPa.take) ?? 0;
    const rowsScrollController = this._rowsScrollController;
    const newTake = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.getViewportParams().take;
    (viewportIsNotFilled || currentTake < newTake) && !this._isPaging && itemCount && this.loadViewport({
      checkLoading: true,
      viewportIsNotFilled
    });
  }
  loadIfNeed() {
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      return;
    }
    const rowsScrollController = this._rowsScrollController;
    rowsScrollController && rowsScrollController.loadIfNeed();
    const dataSource = this._dataSource;
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.loadIfNeed();
  }
  getItemSize() {
    const rowsScrollController = this._rowsScrollController;
    if (rowsScrollController) {
      // @ts-expect-error
      return rowsScrollController.getItemSize.apply(rowsScrollController, arguments);
    }
    const dataSource = this._dataSource;
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.getItemSize.apply(dataSource, arguments);
  }
  getItemSizes() {
    const rowsScrollController = this._rowsScrollController;
    if (rowsScrollController) {
      // @ts-expect-error
      return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments);
    }
    const dataSource = this._dataSource;
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.getItemSizes.apply(dataSource, arguments);
  }
  getContentOffset() {
    const rowsScrollController = this._rowsScrollController;
    if (rowsScrollController) {
      // @ts-expect-error
      return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments);
    }
    const dataSource = this._dataSource;
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.getContentOffset.apply(dataSource, arguments);
  }
  refresh(options) {
    const dataSource = this._dataSource;
    if (dataSource && options !== null && options !== void 0 && options.load && isAppendMode(this)) {
      dataSource.resetCurrentTotalCount();
    }
    return super.refresh.apply(this, arguments);
  }
  topItemIndex() {
    var _this$_loadViewportPa2;
    return (_this$_loadViewportPa2 = this._loadViewportParams) === null || _this$_loadViewportPa2 === void 0 ? void 0 : _this$_loadViewportPa2.skip;
  }
  bottomItemIndex() {
    const viewportParams = this._loadViewportParams;
    return viewportParams && viewportParams.skip + viewportParams.take;
  }
  virtualItemsCount() {
    const rowsScrollController = this._rowsScrollController;
    if (rowsScrollController) {
      // @ts-expect-error
      return rowsScrollController.virtualItemsCount.apply(rowsScrollController, arguments);
    }
    const dataSource = this._dataSource;
    return dataSource === null || dataSource === void 0 ? void 0 : dataSource.virtualItemsCount.apply(dataSource, arguments);
  }
  pageIndex(pageIndex) {
    const virtualPaging = isVirtualPaging(this);
    const rowsScrollController = this._rowsScrollController;
    if (this.option(LEGACY_SCROLLING_MODE) === false && virtualPaging && rowsScrollController) {
      if (pageIndex === undefined) {
        return this.option(VISIBLE_PAGE_INDEX) ?? 0;
      }
    }
    return super.pageIndex.apply(this, arguments);
  }
  _fireChanged(e) {
    super._fireChanged.apply(this, arguments);
    const {
      operationTypes
    } = e;
    if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this) && operationTypes) {
      const {
        fullReload,
        pageIndex
      } = operationTypes;
      if (e.isDataChanged && !fullReload && pageIndex) {
        this._updateVisiblePageIndex(this._dataSource.pageIndex());
      }
    }
  }
  _getPagingOptionValue(optionName) {
    let result = super._getPagingOptionValue.apply(this, arguments);
    if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this)) {
      result = this[optionName]();
    }
    return result;
  }
  isEmpty() {
    return this.option(LEGACY_SCROLLING_MODE) === false ? !this.items(true).length : super.isEmpty.apply(this, arguments);
  }
  isLastPageLoaded() {
    let result = false;
    if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this)) {
      const {
        pageIndex,
        loadPageCount
      } = this.getLoadPageParams(true);
      const pageCount = this.pageCount();
      result = pageIndex + loadPageCount >= pageCount;
    } else {
      result = super.isLastPageLoaded.apply(this, arguments);
    }
    return result;
  }
  reset() {
    this._itemCount = 0;
    this._allItems = null;
    super.reset.apply(this, arguments);
  }
  _applyFilter() {
    var _this$_dataSource6;
    (_this$_dataSource6 = this._dataSource) === null || _this$_dataSource6 === void 0 || _this$_dataSource6.loadPageCount(1);
    return super._applyFilter.apply(this, arguments);
  }
  getVirtualContentSize() {
    var _this$_dataSource7;
    return (_this$_dataSource7 = this._dataSource) === null || _this$_dataSource7 === void 0 ? void 0 : _this$_dataSource7.getVirtualContentSize.apply(this._dataSource, arguments);
  }
  setViewportItemIndex() {
    var _this$_dataSource8;
    return (_this$_dataSource8 = this._dataSource) === null || _this$_dataSource8 === void 0 ? void 0 : _this$_dataSource8.setViewportItemIndex.apply(this._dataSource, arguments);
  }
};
exports.data = data;
const resizing = Base => class VirtualScrollingResizingControllerExtender extends Base {
  dispose() {
    super.dispose.apply(this, arguments);
    clearTimeout(this._resizeTimeout);
  }
  _updateMasterDataGridCore(masterDataGrid) {
    // @ts-expect-error
    return (0, _deferred.when)(super._updateMasterDataGridCore.apply(this, arguments)).done(masterDataGridUpdated => {
      const isNewVirtualMode = isVirtualMode(masterDataGrid) && masterDataGrid.option(LEGACY_SCROLLING_MODE) === false;
      if (!masterDataGridUpdated && isNewVirtualMode) {
        const scrollable = masterDataGrid.getScrollable();
        if (scrollable) {
          masterDataGrid.updateDimensions();
        }
      }
    });
  }
  hasResizeTimeout() {
    return (0, _type.isDefined)(this._resizeTimeout);
  }
  resetLastResizeTime() {
    this._lastTime = undefined;
  }
  resize() {
    let result;
    if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = null;
      const diff = new Date() - this._lastTime;
      const updateTimeout = this.option('scrolling.updateTimeout');
      if (this._lastTime && diff < updateTimeout) {
        // @ts-expect-error
        result = new _deferred.Deferred();
        this._resizeTimeout = setTimeout(() => {
          this._resizeTimeout = null;
          super.resize.apply(this).done(result.resolve).fail(result.reject);
          this._lastTime = new Date();
        }, updateTimeout);
        this._lastTime = new Date();
      } else {
        result = super.resize.apply(this);
        if (this._dataController.isLoaded()) {
          this._lastTime = new Date();
        }
      }
    } else {
      result = super.resize.apply(this);
    }
    return result;
  }
};
exports.resizing = resizing;
const rowsView = Base => class VirtualScrollingRowsViewExtender extends Base {
  init() {
    var _this$_dataController;
    super.init();
    this._dataController.pageChanged.add(pageIndex => {
      const scrollTop = this._scrollTop;
      this.scrollToPage(pageIndex ?? this._dataController.pageIndex());
      if (this.option(LEGACY_SCROLLING_MODE) === false && this._scrollTop === scrollTop) {
        this._dataController
        // @ts-expect-error
        .updateViewport();
      }
    });
    this._dataController.dataSourceChanged.add(() => {
      !this._scrollTop && this._scrollToCurrentPageOnResize();
    });
    (_this$_dataController = this._dataController
    // @ts-expect-error
    .stateLoaded) === null || _this$_dataController === void 0 || _this$_dataController.add(() => {
      this._scrollToCurrentPageOnResize();
    });
    this._scrollToCurrentPageOnResize();
  }
  dispose() {
    clearTimeout(this._scrollTimeoutID);
    super.dispose();
  }
  _scrollToCurrentPageOnResize() {
    if (this._dataController.pageIndex() > 0) {
      const resizeHandler = () => {
        this.resizeCompleted.remove(resizeHandler);
        this.scrollToPage(this._dataController.pageIndex());
      };
      this.resizeCompleted.add(resizeHandler);
    }
  }
  scrollToPage(pageIndex) {
    const pageSize = this._dataController ? this._dataController.pageSize() : 0;
    let scrollPosition;
    if (isVirtualMode(this) || isAppendMode(this)) {
      const itemSize = this._dataController
      // @ts-expect-error
      .getItemSize();
      const itemSizes = this._dataController
      // @ts-expect-error
      .getItemSizes();
      const itemIndex = pageIndex * pageSize;
      scrollPosition = itemIndex * itemSize;
      for (const index in itemSizes) {
        // eslint-disable-next-line radix
        if (parseInt(index) < itemIndex) {
          scrollPosition += itemSizes[index] - itemSize;
        }
      }
    } else {
      scrollPosition = 0;
    }
    this.scrollTo({
      y: scrollPosition,
      x: this._scrollLeft
    });
  }
  renderDelayedTemplates() {
    this.waitAsyncTemplates().done(() => {
      this._updateContentPosition(true);
    });
    super.renderDelayedTemplates.apply(this, arguments);
  }
  _renderCore(e) {
    const startRenderTime = new Date();
    const deferred = super._renderCore.apply(this, arguments);
    const dataSource = this._dataController._dataSource;
    if (dataSource && e) {
      const itemCount = e.items ? e.items.length : 20;
      const viewportSize = this._dataController
      // @ts-expect-error
      .viewportSize() || 20;
      if (_m_utils.default.isVirtualRowRendering(this) && itemCount > 0 && this.option(LEGACY_SCROLLING_MODE) !== false) {
        dataSource._renderTime = (new Date() - startRenderTime) * viewportSize / itemCount;
      } else {
        dataSource._renderTime = new Date() - startRenderTime;
      }
    }
    return deferred;
  }
  _getRowElements(tableElement) {
    const $rows = super._getRowElements(tableElement);
    return $rows === null || $rows === void 0 ? void 0 : $rows.not(`.${VIRTUAL_ROW_CLASS}`);
  }
  _removeRowsElements(contentTable, removeCount, changeType) {
    let rowElements = this._getRowElements(contentTable).toArray();
    if (changeType === 'append') {
      rowElements = rowElements.slice(0, removeCount);
    } else {
      rowElements = rowElements.slice(-removeCount);
    }
    rowElements.map(rowElement => {
      const $rowElement = (0, _renderer.default)(rowElement);
      this._errorHandlingController && this._errorHandlingController.removeErrorRow($rowElement.next());
      $rowElement.remove();
    });
  }
  _updateContent(tableElement, change) {
    let $freeSpaceRowElements;
    const contentElement = this._findContentElement();
    const changeType = change === null || change === void 0 ? void 0 : change.changeType;
    const d = (0, _deferred.Deferred)();
    const contentTable = contentElement.children().first();
    if (changeType === 'append' || changeType === 'prepend') {
      this.waitAsyncTemplates().done(() => {
        const $tBodies = this._getBodies(tableElement);
        if ($tBodies.length === 1) {
          this._getBodies(contentTable)[changeType === 'append' ? 'append' : 'prepend']($tBodies.children());
        } else {
          $tBodies[changeType === 'append' ? 'appendTo' : 'prependTo'](contentTable);
        }
        tableElement.remove();
        $freeSpaceRowElements = this._getFreeSpaceRowElements(contentTable);
        removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);
        if (change.removeCount) {
          this._removeRowsElements(contentTable, change.removeCount, changeType);
        }
        this._restoreErrorRow(contentTable);
        d.resolve();
      }).fail(d.reject);
    } else {
      super._updateContent.apply(this, arguments).done(() => {
        if (changeType === 'update') {
          this._restoreErrorRow(contentTable);
        }
        d.resolve();
      }).fail(d.reject);
    }
    return d.promise().done(() => {
      this._updateBottomLoading();
    });
  }
  _addVirtualRow($table, isFixed, location, position) {
    if (!position) return;
    let $virtualRow = this._createEmptyRow(VIRTUAL_ROW_CLASS, isFixed, position);
    $virtualRow = this._wrapRowIfNeed($table, $virtualRow);
    this._appendEmptyRow($table, $virtualRow, location);
  }
  _updateContentItemSizes() {
    const rowHeights = this._getRowHeights();
    const correctedRowHeights = this._correctRowHeights(rowHeights);
    this._dataController
    // @ts-expect-error
    .setContentItemSizes(correctedRowHeights);
  }
  _updateViewportSize(viewportHeight, scrollTop) {
    if (!(0, _type.isDefined)(viewportHeight)) {
      viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)());
    }
    this._dataController
    // @ts-expect-error
    .viewportHeight(viewportHeight, scrollTop);
  }
  _getRowHeights() {
    var _this$_editingControl2, _this$_editingControl3;
    const isPopupEditMode = (_this$_editingControl2 = this._editingController
    // @ts-expect-error
    ) === null || _this$_editingControl2 === void 0 || (_this$_editingControl3 = _this$_editingControl2.isPopupEditMode) === null || _this$_editingControl3 === void 0 ? void 0 : _this$_editingControl3.call(_this$_editingControl2);
    let rowElements = this._getRowElements(this._tableElement).toArray();
    if (isPopupEditMode) {
      rowElements = rowElements.filter(row => !(0, _renderer.default)(row).hasClass(ROW_INSERTED));
    }
    return rowElements.map(row => (0, _position.getBoundingRect)(row).height);
  }
  _correctRowHeights(rowHeights) {
    const dataController = this._dataController;
    const dataSource = dataController._dataSource;
    const correctedRowHeights = [];
    const visibleRows = dataController.getVisibleRows();
    let itemSize = 0;
    let firstCountableItem = true;
    let lastLoadIndex = -1;
    for (let i = 0; i < rowHeights.length; i++) {
      const currentItem = visibleRows[i];
      if (!(0, _type.isDefined)(currentItem)) {
        continue;
      }
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        if (lastLoadIndex >= 0 && lastLoadIndex !== currentItem.loadIndex) {
          correctedRowHeights.push(itemSize);
          itemSize = 0;
        }
        lastLoadIndex = currentItem.loadIndex;
      } else if (isItemCountableByDataSource(currentItem, dataSource)) {
        if (firstCountableItem) {
          firstCountableItem = false;
        } else {
          correctedRowHeights.push(itemSize);
          itemSize = 0;
        }
      }
      itemSize += rowHeights[i];
    }
    itemSize > 0 && correctedRowHeights.push(itemSize);
    return correctedRowHeights;
  }
  _updateContentPosition(isRender) {
    const rowHeight = this._rowHeight || 20;
    this._dataController
    // @ts-expect-error
    .viewportItemSize(rowHeight);
    if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
      const isEmptyRows = this._dataController.isEmpty();
      if (isEmptyRows) {
        return;
      }
      if (!isRender) {
        this._updateContentItemSizes();
      }
      const top = this._dataController
      // @ts-expect-error
      .getContentOffset('begin');
      const bottom = this._dataController
      // @ts-expect-error
      .getContentOffset('end');
      const $tables = this.getTableElements();
      const $virtualRows = $tables.children('tbody').children(`.${VIRTUAL_ROW_CLASS}`);
      removeEmptyRows($virtualRows, VIRTUAL_ROW_CLASS);
      $tables.each((index, element) => {
        const isFixed = index > 0;
        const prevFixed = this._isFixedTableRendering;
        this._isFixedTableRendering = isFixed;
        this._addVirtualRow((0, _renderer.default)(element), isFixed, 'top', top);
        this._addVirtualRow((0, _renderer.default)(element), isFixed, 'bottom', bottom);
        this._isFixedTableRendering = prevFixed;
      });
    }
  }
  _isTableLinesDisplaysCorrect(table) {
    const hasColumnLines = table.find(`.${COLUMN_LINES_CLASS}`).length > 0;
    return hasColumnLines === this.option('showColumnLines');
  }
  _isColumnElementsEqual($columns, $virtualColumns) {
    let result = $columns.length === $virtualColumns.length;
    if (result) {
      (0, _iterator.each)($columns, (index, element) => {
        if (element.style.width !== $virtualColumns[index].style.width) {
          result = false;
          return result;
        }
        return undefined;
      });
    }
    return result;
  }
  _getCellClasses(column) {
    const classes = [];
    const {
      cssClass
    } = column;
    const isExpandColumn = column.command === 'expand';
    cssClass && classes.push(cssClass);
    isExpandColumn && classes.push(this.addWidgetPrefix(GROUP_SPACE_CLASS));
    return classes;
  }
  _findBottomLoadPanel($contentElement) {
    const $element = $contentElement || this.element();
    const $bottomLoadPanel = $element === null || $element === void 0 ? void 0 : $element.find(`.${this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)}`);
    if ($bottomLoadPanel !== null && $bottomLoadPanel !== void 0 && $bottomLoadPanel.length) {
      return $bottomLoadPanel;
    }
  }
  _updateBottomLoading() {
    const that = this;
    const virtualMode = isVirtualMode(this);
    const appendMode = isAppendMode(this);
    const showBottomLoading = !that._dataController.hasKnownLastPage() && that._dataController.isLoaded() && (virtualMode || appendMode);
    const $contentElement = that._findContentElement();
    const bottomLoadPanelElement = that._findBottomLoadPanel($contentElement);
    if (showBottomLoading) {
      if (!bottomLoadPanelElement) {
        (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)).append(that._createComponent((0, _renderer.default)('<div>'), _load_indicator.default, {
          elementAttr: {
            role: null,
            'aria-label': null
          }
        }).$element()).appendTo($contentElement);
      }
    } else if (bottomLoadPanelElement) {
      bottomLoadPanelElement.remove();
    }
  }
  _handleScroll(e) {
    const legacyScrollingMode = this.option(LEGACY_SCROLLING_MODE) === true;
    const zeroTopPosition = e.scrollOffset.top === 0;
    const isScrollTopChanged = this._scrollTop !== e.scrollOffset.top;
    const hasScrolled = isScrollTopChanged || e.forceUpdateScrollPosition;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const isValidScrollTarget = this._hasHeight || !legacyScrollingMode && zeroTopPosition;
    if (hasScrolled && isValidScrollTarget && this._rowHeight) {
      this._scrollTop = e.scrollOffset.top;
      const isVirtualRowRendering = isVirtualMode(this) || this.option('scrolling.rowRenderingMode') !== 'standard';
      if (isVirtualRowRendering && this.option(LEGACY_SCROLLING_MODE) === false) {
        this._updateContentItemSizes();
        this._updateViewportSize(null, this._scrollTop);
      }
      this._dataController
      // @ts-expect-error
      .setViewportPosition(e.scrollOffset.top);
    }
    super._handleScroll.apply(this, arguments);
  }
  _needUpdateRowHeight(itemsCount) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return super._needUpdateRowHeight.apply(this, arguments) || itemsCount > 0 && isAppendMode(this) && !_m_utils.default.isVirtualRowRendering(this);
  }
  _updateRowHeight() {
    super._updateRowHeight.apply(this, arguments);
    if (this._rowHeight) {
      this._updateContentPosition();
      const viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)());
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        this._updateViewportSize(viewportHeight);
        this._dataController
        // @ts-expect-error
        .updateViewport();
      } else {
        this._dataController
        // @ts-expect-error
        .viewportSize(Math.ceil(viewportHeight / this._rowHeight));
      }
    }
  }
  updateFreeSpaceRowHeight() {
    const result = super.updateFreeSpaceRowHeight.apply(this, arguments);
    if (result) {
      this._updateContentPosition();
    }
    return result;
  }
  setLoading(isLoading, messageText) {
    const dataController = this._dataController;
    const hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!this._findBottomLoadPanel();
    // @ts-expect-error
    if (this.option(LEGACY_SCROLLING_MODE) === false && isLoading && dataController.isViewportChanging()) {
      return;
    }
    if (hasBottomLoadPanel) {
      isLoading = false;
    }
    super.setLoading.call(this, isLoading, messageText);
  }
  isGridDragging() {
    return this.component.option('isDragging');
  }
  // NOTE: warning won't be thrown if height was specified and then removed,
  // because for some reason `_hasHeight` is not updated properly in this case
  throwHeightWarningIfNeed() {
    const isGridDragging = this.isGridDragging();
    if (this._hasHeight === undefined || isGridDragging) {
      return;
    }
    const needToThrow = !this._hasHeight && isVirtualPaging(this);
    if (needToThrow && !this._heightWarningIsThrown) {
      this._heightWarningIsThrown = true;
      _ui.default.log('W1025');
    }
  }
  _resizeCore() {
    const that = this;
    const $element = that.element();
    super._resizeCore();
    this.throwHeightWarningIfNeed();
    if (that.component.$element() && !that._windowScroll && (0, _dom.isElementInDom)($element)) {
      that._windowScroll = (0, _m_virtual_scrolling_core.subscribeToExternalScrollers)($element, scrollPos => {
        if (!that._hasHeight && that._rowHeight) {
          that._dataController
          // @ts-expect-error
          .setViewportPosition(scrollPos);
        }
      }, that.component.$element());
      that.on('disposing', () => {
        that._windowScroll.dispose();
      });
    }
    if (this.option(LEGACY_SCROLLING_MODE) !== false) {
      that.loadIfNeed();
    }
  }
  loadIfNeed() {
    var _this$_dataController2, _this$_dataController3;
    (_this$_dataController2 = this._dataController
    // @ts-expect-error
    ) === null || _this$_dataController2 === void 0 || (_this$_dataController3 = _this$_dataController2.loadIfNeed) === null || _this$_dataController3 === void 0 || _this$_dataController3.call(_this$_dataController2);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _restoreErrorRow(contentTable) {
    if (this.option(LEGACY_SCROLLING_MODE) === false) {
      var _this$_errorHandlingC;
      (_this$_errorHandlingC = this._errorHandlingController) === null || _this$_errorHandlingC === void 0 || _this$_errorHandlingC.removeErrorRow();
    }
    super._restoreErrorRow.apply(this, arguments);
  }
};
exports.rowsView = rowsView;
const virtualScrollingModule = exports.virtualScrollingModule = {
  defaultOptions() {
    return {
      scrolling: {
        timeout: 300,
        updateTimeout: 300,
        minTimeout: 0,
        renderingThreshold: 100,
        removeInvisiblePages: true,
        rowPageSize: 5,
        prerenderedRowChunkSize: 1,
        mode: 'standard',
        preloadEnabled: false,
        rowRenderingMode: 'standard',
        loadTwoPagesOnStart: false,
        legacyMode: false,
        prerenderedRowCount: 1
      }
    };
  },
  extenders: {
    controllers: {
      data,
      resizing
    },
    views: {
      rowsView
    }
  }
};