"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.virtualScrollingModule = void 0;
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
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _m_virtual_scrolling_core = require("./m_virtual_scrolling_core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var BOTTOM_LOAD_PANEL_CLASS = 'bottom-load-panel';
var GROUP_SPACE_CLASS = 'group-space';
var FREESPACE_CLASS = 'dx-freespace-row';
var COLUMN_LINES_CLASS = 'dx-column-lines';
var VIRTUAL_ROW_CLASS = 'dx-virtual-row';
var ROW_INSERTED = 'dx-row-inserted';
var SCROLLING_MODE_INFINITE = 'infinite';
var SCROLLING_MODE_VIRTUAL = 'virtual';
var LOAD_TIMEOUT = 300;
var LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
var VISIBLE_PAGE_INDEX = 'paging.pageIndex';
var isVirtualMode = function isVirtualMode(that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL;
};
var isAppendMode = function isAppendMode(that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_INFINITE;
};
var isVirtualPaging = function isVirtualPaging(that) {
  return isVirtualMode(that) || isAppendMode(that);
};
var correctCount = function correctCount(items, count, fromEnd, isItemCountableFunc) {
  for (var i = 0; i < count + 1; i++) {
    var item = items[fromEnd ? items.length - 1 - i : i];
    if (item && !isItemCountableFunc(item, i === count, fromEnd)) {
      count++;
    }
  }
  return count;
};
var isItemCountableByDataSource = function isItemCountableByDataSource(item, dataSource) {
  return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && dataSource.isGroupItemCountable(item.data);
};
var updateItemIndices = function updateItemIndices(items) {
  items.forEach(function (item, index) {
    item.rowIndex = index;
  });
  return items;
};
var VirtualScrollingDataSourceAdapterExtender = function () {
  var updateLoading = function updateLoading(that) {
    var beginPageIndex = that._virtualScrollController.beginPageIndex(-1);
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
  var result = {
    init() {
      this.callBase.apply(this, arguments);
      this._items = [];
      this._totalCount = -1;
      this._isLoaded = true;
      this._loadPageCount = 1;
      this._virtualScrollController = new _m_virtual_scrolling_core.VirtualScrollController(this.component, this._getVirtualScrollDataOptions());
    },
    _getVirtualScrollDataOptions() {
      var that = this;
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
    },
    _handleLoadingChanged(isLoading) {
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        this.callBase.apply(this, arguments);
        return;
      }
      if (!isVirtualMode(this) || this._isLoadingAll) {
        this._isLoading = isLoading;
        this.callBase.apply(this, arguments);
      }
      if (isLoading) {
        this._startLoadTime = new Date();
      } else {
        this._startLoadTime = undefined;
      }
    },
    _handleLoadError() {
      if (this.option(LEGACY_SCROLLING_MODE) !== false) {
        this._isLoading = false;
        this.loadingChanged.fire(false);
      }
      this.callBase.apply(this, arguments);
    },
    _handleDataChanged(e) {
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        this._items = this._dataSource.items().slice();
        this._totalCount = this._dataSourceTotalCount(true);
        this.callBase.apply(this, arguments);
        return;
      }
      var callBase = this.callBase.bind(this);
      this._virtualScrollController.handleDataChanged(callBase, e);
    },
    _customizeRemoteOperations(options, operationTypes) {
      var newMode = this.option(LEGACY_SCROLLING_MODE) === false;
      var renderAsync = this.option('scrolling.renderAsync');
      if (!(0, _type.isDefined)(renderAsync)) {
        renderAsync = this._renderTime >= this.option('scrolling.renderingThreshold');
      }
      if ((isVirtualMode(this) || isAppendMode(this) && newMode) && !operationTypes.reload && (operationTypes.skip || newMode) && !renderAsync) {
        options.delay = undefined;
      }
      this.callBase.apply(this, arguments);
    },
    items() {
      return this._items;
    },
    _dataSourceTotalCount(isBase) {
      return this.option(LEGACY_SCROLLING_MODE) === false && isVirtualMode(this) && !isBase ? this._totalCount : this.callBase();
    },
    itemsCount(isBase) {
      if (isBase || this.option(LEGACY_SCROLLING_MODE) === false) {
        return this.callBase();
      }
      return this._virtualScrollController.itemsCount();
    },
    load(loadOptions) {
      if (this.option(LEGACY_SCROLLING_MODE) === false || loadOptions) {
        return this.callBase(loadOptions);
      }
      return this._virtualScrollController.load();
    },
    isLoading() {
      return this.option(LEGACY_SCROLLING_MODE) === false ? this._dataSource.isLoading() : this._isLoading;
    },
    isLoaded() {
      return this._dataSource.isLoaded() && this._isLoaded;
    },
    resetPagesCache(isLiveUpdate) {
      if (!isLiveUpdate) {
        this._virtualScrollController.reset(true);
      }
      this.callBase.apply(this, arguments);
    },
    _changeRowExpandCore() {
      var result = this.callBase.apply(this, arguments);
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        return result;
      }
      this.resetPagesCache();
      updateLoading(this);
      return result;
    },
    reload() {
      this._dataSource.pageIndex(this.pageIndex());
      var virtualScrollController = this._virtualScrollController;
      if (this.option(LEGACY_SCROLLING_MODE) !== false && virtualScrollController) {
        // @ts-expect-error
        var d = new _deferred.Deferred();
        this.callBase.apply(this, arguments).done(function (r) {
          var delayDeferred = virtualScrollController.getDelayDeferred();
          if (delayDeferred) {
            delayDeferred.done(d.resolve).fail(d.reject);
          } else {
            d.resolve(r);
          }
        }).fail(d.reject);
        return d;
      }
      return this.callBase.apply(this, arguments);
    },
    refresh(options, operationTypes) {
      if (this.option(LEGACY_SCROLLING_MODE) !== false) {
        var storeLoadOptions = options.storeLoadOptions;
        var dataSource = this._dataSource;
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
      return this.callBase.apply(this, arguments);
    },
    dispose() {
      this._virtualScrollController.dispose();
      this.callBase.apply(this, arguments);
    },
    loadPageCount(count) {
      if (!(0, _type.isDefined)(count)) {
        return this._loadPageCount;
      }
      this._loadPageCount = count;
    },
    _handleDataLoading(options) {
      var loadPageCount = this.loadPageCount();
      var pageSize = this.pageSize();
      var newMode = this.option(LEGACY_SCROLLING_MODE) === false;
      var storeLoadOptions = options.storeLoadOptions;
      var takeIsDefined = (0, _type.isDefined)(storeLoadOptions.take);
      options.loadPageCount = loadPageCount;
      if (!options.isCustomLoading && newMode && takeIsDefined && loadPageCount > 1 && pageSize > 0) {
        storeLoadOptions.take = loadPageCount * pageSize;
      }
      this.callBase.apply(this, arguments);
    },
    _loadPageSize() {
      return this.callBase.apply(this, arguments) * this.loadPageCount();
    }
  };
  ['beginPageIndex', 'endPageIndex', 'pageIndex'].forEach(function (name) {
    result[name] = function () {
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        var dataSource = this._dataSource;
        return dataSource.pageIndex.apply(dataSource, arguments);
      }
      var virtualScrollController = this._virtualScrollController;
      return virtualScrollController[name].apply(virtualScrollController, arguments);
    };
  });
  ['virtualItemsCount', 'getContentOffset', 'getVirtualContentSize', 'setContentItemSizes', 'setViewportPosition', 'getViewportItemIndex', 'setViewportItemIndex', 'getItemIndexByPosition', 'viewportSize', 'viewportItemSize', 'getItemSize', 'getItemSizes', 'loadIfNeed'].forEach(function (name) {
    result[name] = function () {
      var virtualScrollController = this._virtualScrollController;
      return virtualScrollController[name].apply(virtualScrollController, arguments);
    };
  });
  return result;
}();
var VirtualScrollingRowsViewExtender = function () {
  var removeEmptyRows = function removeEmptyRows($emptyRows, className) {
    var getRowParent = function getRowParent(row) {
      return (0, _renderer.default)(row).parent(".".concat(className)).get(0);
    };
    var tBodies = $emptyRows.toArray().map(getRowParent).filter(function (row) {
      return row;
    });
    if (tBodies.length) {
      $emptyRows = (0, _renderer.default)(tBodies);
    }
    var rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;
    for (var i = 0; i < rowCount; i++) {
      $emptyRows.eq(i).remove();
    }
  };
  return {
    init() {
      var _this = this;
      var _a;
      var dataController = this.getController('data');
      this.callBase();
      dataController.pageChanged.add(function (pageIndex) {
        var scrollTop = _this._scrollTop;
        _this.scrollToPage(pageIndex !== null && pageIndex !== void 0 ? pageIndex : dataController.pageIndex());
        if (_this.option(LEGACY_SCROLLING_MODE) === false && _this._scrollTop === scrollTop) {
          dataController.updateViewport();
        }
      });
      dataController.dataSourceChanged.add(function () {
        !_this._scrollTop && _this._scrollToCurrentPageOnResize();
      });
      (_a = dataController.stateLoaded) === null || _a === void 0 ? void 0 : _a.add(function () {
        _this._scrollToCurrentPageOnResize();
      });
      this._scrollToCurrentPageOnResize();
    },
    _scrollToCurrentPageOnResize() {
      var _this2 = this;
      var dataController = this.getController('data');
      if (dataController.pageIndex() > 0) {
        var resizeHandler = function resizeHandler() {
          _this2.resizeCompleted.remove(resizeHandler);
          _this2.scrollToPage(dataController.pageIndex());
        };
        this.resizeCompleted.add(resizeHandler);
      }
    },
    scrollToPage(pageIndex) {
      var that = this;
      var dataController = that._dataController;
      var pageSize = dataController ? dataController.pageSize() : 0;
      var scrollPosition;
      if (isVirtualMode(that) || isAppendMode(that)) {
        var itemSize = dataController.getItemSize();
        var itemSizes = dataController.getItemSizes();
        var itemIndex = pageIndex * pageSize;
        scrollPosition = itemIndex * itemSize;
        // eslint-disable-next-line no-restricted-syntax
        for (var index in itemSizes) {
          // eslint-disable-next-line radix
          if (parseInt(index) < itemIndex) {
            scrollPosition += itemSizes[index] - itemSize;
          }
        }
      } else {
        scrollPosition = 0;
      }
      that.scrollTo({
        y: scrollPosition,
        x: that._scrollLeft
      });
    },
    renderDelayedTemplates() {
      var _this3 = this;
      this.waitAsyncTemplates().done(function () {
        _this3._updateContentPosition(true);
      });
      this.callBase.apply(this, arguments);
    },
    _renderCore(e) {
      var startRenderTime = new Date();
      var deferred = this.callBase.apply(this, arguments);
      var dataSource = this._dataController._dataSource;
      if (dataSource && e) {
        var itemCount = e.items ? e.items.length : 20;
        var viewportSize = this._dataController.viewportSize() || 20;
        if (_m_utils.default.isVirtualRowRendering(this) && itemCount > 0 && this.option(LEGACY_SCROLLING_MODE) !== false) {
          dataSource._renderTime = (new Date() - startRenderTime) * viewportSize / itemCount;
        } else {
          dataSource._renderTime = new Date() - startRenderTime;
        }
      }
      return deferred;
    },
    _getRowElements(tableElement) {
      var $rows = this.callBase(tableElement);
      return $rows && $rows.not(".".concat(VIRTUAL_ROW_CLASS));
    },
    _removeRowsElements(contentTable, removeCount, changeType) {
      var rowElements = this._getRowElements(contentTable).toArray();
      if (changeType === 'append') {
        rowElements = rowElements.slice(0, removeCount);
      } else {
        rowElements = rowElements.slice(-removeCount);
      }
      var errorHandlingController = this.getController('errorHandling');
      rowElements.map(function (rowElement) {
        var $rowElement = (0, _renderer.default)(rowElement);
        // @ts-expect-error
        errorHandlingController && errorHandlingController.removeErrorRow($rowElement.next());
        // @ts-expect-error
        $rowElement.remove();
      });
    },
    _updateContent(tableElement, change) {
      var _this4 = this;
      var $freeSpaceRowElements;
      var contentElement = this._findContentElement();
      var changeType = change && change.changeType;
      var d = (0, _deferred.Deferred)();
      var contentTable = contentElement.children().first();
      if (changeType === 'append' || changeType === 'prepend') {
        this.waitAsyncTemplates().done(function () {
          var $tBodies = _this4._getBodies(tableElement);
          if ($tBodies.length === 1) {
            _this4._getBodies(contentTable)[changeType === 'append' ? 'append' : 'prepend']($tBodies.children());
          } else {
            $tBodies[changeType === 'append' ? 'appendTo' : 'prependTo'](contentTable);
          }
          tableElement.remove();
          $freeSpaceRowElements = _this4._getFreeSpaceRowElements(contentTable);
          removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);
          if (change.removeCount) {
            _this4._removeRowsElements(contentTable, change.removeCount, changeType);
          }
          _this4._restoreErrorRow(contentTable);
          d.resolve();
        }).fail(d.reject);
      } else {
        this.callBase.apply(this, arguments).done(function () {
          if (changeType === 'update') {
            _this4._restoreErrorRow(contentTable);
          }
          d.resolve();
        }).fail(d.reject);
      }
      return d.promise().done(function () {
        _this4._updateBottomLoading();
      });
    },
    _addVirtualRow($table, isFixed, location, position) {
      if (!position) return;
      var $virtualRow = this._createEmptyRow(VIRTUAL_ROW_CLASS, isFixed, position);
      $virtualRow = this._wrapRowIfNeed($table, $virtualRow);
      this._appendEmptyRow($table, $virtualRow, location);
    },
    _updateContentItemSizes() {
      var rowHeights = this._getRowHeights();
      var correctedRowHeights = this._correctRowHeights(rowHeights);
      this._dataController.setContentItemSizes(correctedRowHeights);
    },
    _updateViewportSize(viewportHeight, scrollTop) {
      if (!(0, _type.isDefined)(viewportHeight)) {
        viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)());
      }
      this._dataController.viewportHeight(viewportHeight, scrollTop);
    },
    _getRowHeights() {
      var _a, _b;
      var isPopupEditMode = (_b = (_a = this.getController('editing')) === null || _a === void 0 ? void 0 : _a.isPopupEditMode) === null || _b === void 0 ? void 0 : _b.call(_a);
      var rowElements = this._getRowElements(this._tableElement).toArray();
      if (isPopupEditMode) {
        rowElements = rowElements.filter(function (row) {
          return !(0, _renderer.default)(row).hasClass(ROW_INSERTED);
        });
      }
      return rowElements.map(function (row) {
        return (0, _position.getBoundingRect)(row).height;
      });
    },
    _correctRowHeights(rowHeights) {
      var dataController = this._dataController;
      var dataSource = dataController._dataSource;
      var correctedRowHeights = [];
      var visibleRows = dataController.getVisibleRows();
      var itemSize = 0;
      var firstCountableItem = true;
      var lastLoadIndex = -1;
      for (var i = 0; i < rowHeights.length; i++) {
        var currentItem = visibleRows[i];
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
    },
    _updateContentPosition(isRender) {
      var _this5 = this;
      var dataController = this._dataController;
      var rowHeight = this._rowHeight || 20;
      dataController.viewportItemSize(rowHeight);
      if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
        if (!isRender) {
          this._updateContentItemSizes();
        }
        var top = dataController.getContentOffset('begin');
        var bottom = dataController.getContentOffset('end');
        var $tables = this.getTableElements();
        var $virtualRows = $tables.children('tbody').children(".".concat(VIRTUAL_ROW_CLASS));
        removeEmptyRows($virtualRows, VIRTUAL_ROW_CLASS);
        $tables.each(function (index, element) {
          var isFixed = index > 0;
          var prevFixed = _this5._isFixedTableRendering;
          _this5._isFixedTableRendering = isFixed;
          _this5._addVirtualRow((0, _renderer.default)(element), isFixed, 'top', top);
          _this5._addVirtualRow((0, _renderer.default)(element), isFixed, 'bottom', bottom);
          _this5._isFixedTableRendering = prevFixed;
        });
      }
    },
    _isTableLinesDisplaysCorrect(table) {
      var hasColumnLines = table.find(".".concat(COLUMN_LINES_CLASS)).length > 0;
      return hasColumnLines === this.option('showColumnLines');
    },
    _isColumnElementsEqual($columns, $virtualColumns) {
      var result = $columns.length === $virtualColumns.length;
      if (result) {
        (0, _iterator.each)($columns, function (index, element) {
          if (element.style.width !== $virtualColumns[index].style.width) {
            result = false;
            return result;
          }
          return undefined;
        });
      }
      return result;
    },
    _getCellClasses(column) {
      var classes = [];
      var cssClass = column.cssClass;
      var isExpandColumn = column.command === 'expand';
      cssClass && classes.push(cssClass);
      isExpandColumn && classes.push(this.addWidgetPrefix(GROUP_SPACE_CLASS));
      return classes;
    },
    _findBottomLoadPanel($contentElement) {
      var $element = $contentElement || this.element();
      var $bottomLoadPanel = $element && $element.find(".".concat(this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)));
      if ($bottomLoadPanel && $bottomLoadPanel.length) {
        return $bottomLoadPanel;
      }
    },
    _updateBottomLoading() {
      var that = this;
      var virtualMode = isVirtualMode(this);
      var appendMode = isAppendMode(this);
      var showBottomLoading = !that._dataController.hasKnownLastPage() && that._dataController.isLoaded() && (virtualMode || appendMode);
      var $contentElement = that._findContentElement();
      var bottomLoadPanelElement = that._findBottomLoadPanel($contentElement);
      if (showBottomLoading) {
        if (!bottomLoadPanelElement) {
          (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)).append(that._createComponent((0, _renderer.default)('<div>'), _load_indicator.default).$element()).appendTo($contentElement);
        }
      } else if (bottomLoadPanelElement) {
        bottomLoadPanelElement.remove();
      }
    },
    _handleScroll(e) {
      var legacyScrollingMode = this.option(LEGACY_SCROLLING_MODE) === true;
      var zeroTopPosition = e.scrollOffset.top === 0;
      var isScrollTopChanged = this._scrollTop !== e.scrollOffset.top;
      var hasScrolled = isScrollTopChanged || e.forceUpdateScrollPosition;
      var isValidScrollTarget = this._hasHeight || !legacyScrollingMode && zeroTopPosition;
      if (hasScrolled && isValidScrollTarget && this._rowHeight) {
        this._scrollTop = e.scrollOffset.top;
        var isVirtualRowRendering = isVirtualMode(this) || this.option('scrolling.rowRenderingMode') !== 'standard';
        if (isVirtualRowRendering && this.option(LEGACY_SCROLLING_MODE) === false) {
          this._updateContentItemSizes();
          this._updateViewportSize(null, this._scrollTop);
        }
        this._dataController.setViewportPosition(e.scrollOffset.top);
      }
      this.callBase.apply(this, arguments);
    },
    _needUpdateRowHeight(itemsCount) {
      return this.callBase.apply(this, arguments) || itemsCount > 0 && isAppendMode(this) && !_m_utils.default.isVirtualRowRendering(this);
    },
    _updateRowHeight() {
      this.callBase.apply(this, arguments);
      if (this._rowHeight) {
        this._updateContentPosition();
        var viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)());
        var dataController = this._dataController;
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          this._updateViewportSize(viewportHeight);
          dataController.updateViewport();
        } else {
          dataController.viewportSize(Math.ceil(viewportHeight / this._rowHeight));
        }
      }
    },
    updateFreeSpaceRowHeight() {
      var result = this.callBase.apply(this, arguments);
      if (result) {
        this._updateContentPosition();
      }
      return result;
    },
    setLoading(isLoading, messageText) {
      var dataController = this._dataController;
      var hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!this._findBottomLoadPanel();
      if (this.option(LEGACY_SCROLLING_MODE) === false && isLoading && dataController.isViewportChanging()) {
        return;
      }
      if (hasBottomLoadPanel) {
        isLoading = false;
      }
      this.callBase.call(this, isLoading, messageText);
    },
    _resizeCore() {
      var that = this;
      var $element = that.element();
      that.callBase();
      if (that.component.$element() && !that._windowScroll && (0, _dom.isElementInDom)($element)) {
        that._windowScroll = (0, _m_virtual_scrolling_core.subscribeToExternalScrollers)($element, function (scrollPos) {
          if (!that._hasHeight && that._rowHeight) {
            that._dataController.setViewportPosition(scrollPos);
          }
        }, that.component.$element());
        that.on('disposing', function () {
          that._windowScroll.dispose();
        });
      }
      if (this.option(LEGACY_SCROLLING_MODE) !== false) {
        that.loadIfNeed();
      }
    },
    loadIfNeed() {
      var _a;
      var dataController = this._dataController;
      (_a = dataController === null || dataController === void 0 ? void 0 : dataController.loadIfNeed) === null || _a === void 0 ? void 0 : _a.call(dataController);
    },
    _restoreErrorRow() {
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        var errorHandling = this.getController('errorHandling');
        errorHandling === null || errorHandling === void 0 ? void 0 : errorHandling.removeErrorRow();
      }
      this.callBase.apply(this, arguments);
    },
    dispose() {
      clearTimeout(this._scrollTimeoutID);
      this.callBase();
    }
  };
}();
var virtualScrollingModule = {
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
    dataSourceAdapter: VirtualScrollingDataSourceAdapterExtender,
    controllers: {
      data: function () {
        var members = {
          _refreshDataSource() {
            // @ts-expect-error
            var baseResult = this.callBase.apply(this, arguments) || new _deferred.Deferred().resolve().promise();
            baseResult.done(this.initVirtualRows.bind(this));
            return baseResult;
          },
          _loadDataSource() {
            var _a;
            if (this._rowsScrollController && isVirtualPaging(this)) {
              var _ref = (0, _type.isDefined)(this._loadViewportParams) ? this.getLoadPageParams() : {
                  loadPageCount: undefined
                },
                loadPageCount = _ref.loadPageCount;
              loadPageCount >= 1 && ((_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.loadPageCount(loadPageCount));
            }
            return this.callBase.apply(this, arguments);
          },
          getRowPageSize() {
            var rowPageSize = this.option('scrolling.rowPageSize');
            var pageSize = this.pageSize();
            return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize;
          },
          reload() {
            var _this6 = this;
            var rowsScrollController = this._rowsScrollController || this._dataSource;
            var itemIndex = rowsScrollController && rowsScrollController.getItemIndexByPosition();
            var result = this.callBase.apply(this, arguments);
            return result && result.done(function () {
              var _a;
              if (isVirtualMode(_this6) || _m_utils.default.isVirtualRowRendering(_this6)) {
                var rowIndexOffset = _this6.getRowIndexOffset();
                var rowIndex = Math.floor(itemIndex) - rowIndexOffset;
                var component = _this6.component;
                var scrollable = component.getScrollable && component.getScrollable();
                var isSortingOperation = _this6.dataSource().operationTypes().sorting;
                if (scrollable && !isSortingOperation && rowIndex >= 0) {
                  var rowElement = component.getRowElement(rowIndex);
                  var $rowElement = rowElement && rowElement[0] && (0, _renderer.default)(rowElement[0]);
                  var top = $rowElement && $rowElement.position().top;
                  var isChromeLatest = _browser.default.chrome && Number((_a = _browser.default.version) !== null && _a !== void 0 ? _a : 0) >= 91;
                  var allowedTopOffset = _browser.default.mozilla || isChromeLatest ? 1 : 0; // T884308
                  if (top > allowedTopOffset) {
                    top = Math.round(top + (0, _size.getOuterHeight)($rowElement) * (itemIndex % 1));
                    scrollable.scrollTo({
                      y: top
                    });
                  }
                }
              }
            });
          },
          initVirtualRows() {
            var _this7 = this;
            var virtualRowsRendering = _m_utils.default.isVirtualRowRendering(this);
            this._allItems = null;
            this._loadViewportParams = null;
            if (this.option('scrolling.mode') !== 'virtual' && !virtualRowsRendering || !virtualRowsRendering || this.option(LEGACY_SCROLLING_MODE) !== false && !this.option('scrolling.rowPageSize')) {
              this._visibleItems = null;
              this._rowsScrollController = null;
              return;
            }
            var pageIndex = !isVirtualMode(this) && this.pageIndex() >= this.pageCount() ? this.pageCount() - 1 : this.pageIndex();
            this._rowPageIndex = Math.ceil(pageIndex * this.pageSize() / this.getRowPageSize());
            this._visibleItems = this.option(LEGACY_SCROLLING_MODE) === false ? null : [];
            this._viewportChanging = false;
            this._needUpdateViewportAfterLoading = false;
            if (!this._rowsScrollController) {
              this._rowsScrollController = new _m_virtual_scrolling_core.VirtualScrollController(this.component, this._getRowsScrollDataOptions(), true);
              this._rowsScrollController.positionChanged.add(function () {
                var _a;
                if (_this7.option(LEGACY_SCROLLING_MODE) === false) {
                  _this7._viewportChanging = true;
                  _this7.loadViewport();
                  _this7._viewportChanging = false;
                  return;
                }
                (_a = _this7._dataSource) === null || _a === void 0 ? void 0 : _a.setViewportItemIndex(_this7._rowsScrollController.getViewportItemIndex());
              });
            }
            if (this.option(LEGACY_SCROLLING_MODE) === false) {
              this._updateLoadViewportParams();
            }
            if (this.isLoaded() && this.option(LEGACY_SCROLLING_MODE) !== false) {
              this._rowsScrollController.load();
            }
          },
          isViewportChanging() {
            return this._viewportChanging;
          },
          _getRowsScrollDataOptions() {
            var that = this;
            var isItemCountable = function isItemCountable(item) {
              return isItemCountableByDataSource(item, that._dataSource);
            };
            return {
              pageSize() {
                return that.getRowPageSize();
              },
              loadedOffset() {
                var _a;
                return isVirtualMode(that) && ((_a = that._dataSource) === null || _a === void 0 ? void 0 : _a.lastLoadOptions().skip) || 0;
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
                var pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
                return pageCount || 1;
              },
              load() {
                if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                  that._rowPageIndex = this.pageCount() - 1;
                  that._rowsScrollController.pageIndex(that._rowPageIndex);
                }
                if (!this.items().length && this.totalItemsCount()) return;
                that._rowsScrollController.handleDataChanged(function (change) {
                  change = change || {};
                  change.changeType = change.changeType || 'refresh';
                  change.items = change.items || that._visibleItems;
                  that._visibleItems.forEach(function (item, index) {
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
                return correctCount(items, count, fromEnd, function (item, isNextAfterLast, fromEnd) {
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
                var result = that._items;
                if (that.option(LEGACY_SCROLLING_MODE)) {
                  var dataSource = that.dataSource();
                  var virtualItemsCount = dataSource === null || dataSource === void 0 ? void 0 : dataSource.virtualItemsCount();
                  var begin = virtualItemsCount ? virtualItemsCount.begin : 0;
                  var rowPageSize = that.getRowPageSize();
                  var skip = that._rowPageIndex * rowPageSize - begin;
                  var take = rowPageSize;
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
                var dataSource = that.dataSource();
                if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.isLoading()) && that.option(LEGACY_SCROLLING_MODE) !== false) {
                  return LOAD_TIMEOUT;
                }
                return (dataSource === null || dataSource === void 0 ? void 0 : dataSource._renderTime) || 0;
              }
            };
          },
          _updateItemsCore(change) {
            var _this8 = this;
            var delta = this.getRowIndexDelta();
            this.callBase.apply(this, arguments);
            if (this.option(LEGACY_SCROLLING_MODE) === false && _m_utils.default.isVirtualRowRendering(this)) {
              if (change.changeType === 'update' && change.rowIndices.length === 0 && change.cancelEmptyChanges) {
                change.cancel = true;
              }
              return;
            }
            var rowsScrollController = this._rowsScrollController;
            if (rowsScrollController) {
              var visibleItems = this._visibleItems;
              var isRefresh = change.changeType === 'refresh' || change.isLiveUpdate;
              if (change.changeType === 'append' && change.items && !change.items.length) return;
              if (isRefresh || change.changeType === 'append' || change.changeType === 'prepend') {
                change.cancel = true;
                isRefresh && rowsScrollController.reset(true);
                rowsScrollController.load();
              } else {
                if (change.changeType === 'update') {
                  change.rowIndices.forEach(function (rowIndex, index) {
                    var changeType = change.changeTypes[index];
                    var newItem = change.items[index];
                    if (changeType === 'update') {
                      visibleItems[rowIndex] = newItem;
                    } else if (changeType === 'insert') {
                      visibleItems.splice(rowIndex, 0, newItem);
                    } else if (changeType === 'remove') {
                      visibleItems.splice(rowIndex, 1);
                    }
                  });
                } else {
                  visibleItems.forEach(function (item, index) {
                    visibleItems[index] = _this8._items[index + delta] || visibleItems[index];
                  });
                  change.items = visibleItems;
                }
                updateItemIndices(visibleItems);
              }
            }
          },
          _updateLoadViewportParams() {
            var viewportParams = this._rowsScrollController.getViewportParams();
            var pageSize = this.pageSize();
            if (viewportParams && !isVirtualPaging(this) && pageSize > 0) {
              var pageOffset = this.pageIndex() * pageSize;
              viewportParams.skip += pageOffset;
            }
            this._loadViewportParams = viewportParams;
          },
          _processItems() {
            var _a;
            var resultItems = this.callBase.apply(this, arguments);
            if (this.option(LEGACY_SCROLLING_MODE) === false) {
              var dataSource = this._dataSource;
              var currentIndex = (_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.lastLoadOptions().skip) !== null && _a !== void 0 ? _a : 0;
              var prevCountable;
              var prevRowType;
              var isPrevRowNew;
              var wasCountableItem = false;
              var newRows = [];
              resultItems.forEach(function (item) {
                var rowType = item.rowType;
                var itemCountable = isItemCountableByDataSource(item, dataSource);
                var isNextGroupItem = rowType === 'group' && (prevCountable || itemCountable || prevRowType !== 'group' && currentIndex > 0);
                var isNextDataItem = rowType === 'data' && itemCountable && (prevCountable || prevRowType !== 'group');
                if (!item.isNewRow && (0, _type.isDefined)(prevCountable)) {
                  var isPrevNewRowFirst = isPrevRowNew && !wasCountableItem;
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
                  newRows.forEach(function (it) {
                    it.loadIndex = currentIndex;
                  });
                  newRows = [];
                }
                item.loadIndex = currentIndex;
                prevCountable = itemCountable;
                prevRowType = rowType;
                isPrevRowNew = item.isNewRow;
              });
              newRows.forEach(function (it) {
                it.loadIndex = currentIndex;
              });
            }
            return resultItems;
          },
          _afterProcessItems(items) {
            var _this9 = this;
            this._itemCount = items.filter(function (item) {
              return isItemCountableByDataSource(item, _this9._dataSource);
            }).length;
            if ((0, _type.isDefined)(this._loadViewportParams)) {
              this._updateLoadViewportParams();
              var result = items;
              this._allItems = items;
              if (items.length) {
                var _this$getLoadPagePara = this.getLoadPageParams(true),
                  skipForCurrentPage = _this$getLoadPagePara.skipForCurrentPage;
                var skip = items[0].loadIndex + skipForCurrentPage;
                var take = this._loadViewportParams.take;
                result = items.filter(function (it) {
                  var isNewRowInEmptyData = it.isNewRow && it.loadIndex === skip && take === 0;
                  var isLoadIndexGreaterStart = it.loadIndex >= skip;
                  var isLoadIndexLessEnd = it.loadIndex < skip + take || isNewRowInEmptyData;
                  return isLoadIndexGreaterStart && isLoadIndexLessEnd;
                });
              }
              return result;
            }
            return this.callBase.apply(this, arguments);
          },
          _applyChange(change) {
            var that = this;
            var items = change.items;
            var changeType = change.changeType;
            var removeCount = change.removeCount;
            if (removeCount) {
              var fromEnd = changeType === 'prepend';
              removeCount = correctCount(that._items, removeCount, fromEnd, function (item, isNextAfterLast) {
                return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast);
              });
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
                that.callBase(change);
                break;
            }
          },
          items(allItems) {
            return allItems ? this._allItems || this._items : this._visibleItems || this._items;
          },
          getRowIndexDelta() {
            var delta = 0;
            if (this.option(LEGACY_SCROLLING_MODE)) {
              var visibleItems = this._visibleItems;
              if (visibleItems && visibleItems[0]) {
                delta = this._items.indexOf(visibleItems[0]);
              }
            }
            return delta < 0 ? 0 : delta;
          },
          getRowIndexOffset(byLoadedRows) {
            var _a;
            var offset = 0;
            var dataSource = this.dataSource();
            var rowsScrollController = this._rowsScrollController;
            var newMode = this.option(LEGACY_SCROLLING_MODE) === false;
            var virtualPaging = isVirtualPaging(this);
            if (rowsScrollController && !byLoadedRows) {
              if (newMode && (0, _type.isDefined)(this._loadViewportParams)) {
                var _this$getLoadPagePara2 = this.getLoadPageParams(true),
                  skipForCurrentPage = _this$getLoadPagePara2.skipForCurrentPage,
                  pageIndex = _this$getLoadPagePara2.pageIndex;
                var items = this.items(true);
                offset = virtualPaging ? pageIndex * this.pageSize() : 0;
                if (items.length) {
                  var firstLoadIndex = items[0].loadIndex;
                  offset += items.filter(function (item) {
                    return item.loadIndex < firstLoadIndex + skipForCurrentPage;
                  }).length;
                }
              } else {
                offset = rowsScrollController.beginPageIndex() * rowsScrollController.pageSize();
              }
            } else if (virtualPaging && newMode && dataSource) {
              offset = (_a = dataSource.lastLoadOptions().skip) !== null && _a !== void 0 ? _a : 0;
            } else if (isVirtualMode(this) && dataSource) {
              offset = dataSource.beginPageIndex() * dataSource.pageSize();
            }
            return offset;
          },
          getDataIndex() {
            if (this.option(LEGACY_SCROLLING_MODE) === false) {
              return this.getRowIndexOffset(true);
            }
            return this.callBase.apply(this, arguments);
          },
          viewportSize() {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;
            var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportSize.apply(rowsScrollController, arguments);
            if (this.option(LEGACY_SCROLLING_MODE) === false) {
              return result;
            }
            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportSize.apply(dataSource, arguments);
          },
          viewportHeight(height, scrollTop) {
            var _a;
            (_a = this._rowsScrollController) === null || _a === void 0 ? void 0 : _a.viewportHeight(height, scrollTop);
          },
          viewportItemSize() {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;
            var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);
            if (this.option(LEGACY_SCROLLING_MODE) === false) {
              return result;
            }
            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportItemSize.apply(dataSource, arguments);
          },
          setViewportPosition() {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;
            this._isPaging = false;
            if (rowsScrollController) {
              rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments);
            } else {
              dataSource === null || dataSource === void 0 ? void 0 : dataSource.setViewportPosition.apply(dataSource, arguments);
            }
          },
          setContentItemSizes(sizes) {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;
            var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.setContentItemSizes(sizes);
            if (this.option(LEGACY_SCROLLING_MODE) === false) {
              return result;
            }
            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.setContentItemSizes(sizes);
          },
          getPreloadedRowCount() {
            var preloadCount = this.option('scrolling.preloadedRowCount');
            var preloadEnabled = this.option('scrolling.preloadEnabled');
            if ((0, _type.isDefined)(preloadCount)) {
              return preloadCount;
            }
            var viewportSize = this.viewportSize();
            return preloadEnabled ? 2 * viewportSize : viewportSize;
          },
          getLoadPageParams(byLoadedPage) {
            var _a, _b;
            var pageSize = this.pageSize();
            var viewportParams = this._loadViewportParams;
            var lastLoadOptions = (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.lastLoadOptions();
            var loadedPageIndex = (lastLoadOptions === null || lastLoadOptions === void 0 ? void 0 : lastLoadOptions.pageIndex) || 0;
            var loadedTake = (lastLoadOptions === null || lastLoadOptions === void 0 ? void 0 : lastLoadOptions.take) || 0;
            var isScrollingBack = this._rowsScrollController.isScrollingBack();
            var topPreloadCount = isScrollingBack ? this.getPreloadedRowCount() : 0;
            var bottomPreloadCount = isScrollingBack ? 0 : this.getPreloadedRowCount();
            var totalCountCorrection = ((_b = this._dataSource) === null || _b === void 0 ? void 0 : _b.totalCountCorrection()) || 0;
            var skipWithPreload = Math.max(0, viewportParams.skip - topPreloadCount);
            var pageIndex = byLoadedPage ? loadedPageIndex : Math.floor(pageSize ? skipWithPreload / pageSize : 0);
            var pageOffset = pageIndex * pageSize;
            var skipForCurrentPage = viewportParams.skip - pageOffset;
            var loadingTake = viewportParams.take + skipForCurrentPage + bottomPreloadCount - totalCountCorrection;
            var take = byLoadedPage ? loadedTake : loadingTake;
            var loadPageCount = Math.ceil(pageSize ? take / pageSize : 0);
            return {
              pageIndex,
              loadPageCount: Math.max(1, loadPageCount),
              skipForCurrentPage: Math.max(0, skipForCurrentPage)
            };
          },
          _updateVisiblePageIndex(currentPageIndex) {
            if (!this._rowsScrollController) {
              return;
            }
            if ((0, _type.isDefined)(currentPageIndex)) {
              this._silentOption(VISIBLE_PAGE_INDEX, currentPageIndex);
              this.pageChanged.fire();
              return;
            }
            var viewPortItemIndex = this._rowsScrollController.getViewportItemIndex();
            var newPageIndex = Math.floor(viewPortItemIndex / this.pageSize());
            if (this.pageIndex() !== newPageIndex) {
              this._silentOption(VISIBLE_PAGE_INDEX, newPageIndex);
              this.updateItems({
                changeType: 'pageIndex'
              });
            }
          },
          _getChangedLoadParams() {
            var loadedPageParams = this.getLoadPageParams(true);
            var _this$getLoadPagePara3 = this.getLoadPageParams(),
              pageIndex = _this$getLoadPagePara3.pageIndex,
              loadPageCount = _this$getLoadPagePara3.loadPageCount;
            var pageIndexIsValid = this._pageIndexIsValid(pageIndex);
            var result = null;
            if (!this._isLoading && pageIndexIsValid && (pageIndex !== loadedPageParams.pageIndex || loadPageCount !== loadedPageParams.loadPageCount)) {
              result = {
                pageIndex,
                loadPageCount
              };
            }
            return result;
          },
          _pageIndexIsValid(pageIndex) {
            var result = true;
            if (isAppendMode(this) && this.hasKnownLastPage() || isVirtualMode(this)) {
              result = pageIndex * this.pageSize() < this.totalItemsCount();
            }
            return result;
          },
          _loadItems(checkLoading, viewportIsFilled) {
            var _this10 = this;
            var _a, _b;
            var virtualPaging = isVirtualPaging(this);
            var dataSourceAdapter = this._dataSource;
            var changedParams = this._getChangedLoadParams();
            var currentLoadPageCount = (_a = dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.loadPageCount()) !== null && _a !== void 0 ? _a : 0;
            var lastRequiredItemCount = this.pageSize() * currentLoadPageCount;
            var currentPageIndex = (_b = dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.pageIndex()) !== null && _b !== void 0 ? _b : 0;
            var pageIndexNotChanged = (changedParams === null || changedParams === void 0 ? void 0 : changedParams.pageIndex) === currentPageIndex;
            var allLoadedInAppendMode = isAppendMode(this) && this.totalItemsCount() < lastRequiredItemCount;
            var isRepaintMode = this.option('editing.refreshMode') === 'repaint';
            var pageIndexIncreased = (changedParams === null || changedParams === void 0 ? void 0 : changedParams.pageIndex) > currentPageIndex;
            var result = false;
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
              var viewportChanging = this._viewportChanging;
              this.load().always(function () {
                _this10._repaintChangesOnly = undefined;
                _this10._needUpdateDimensions = undefined;
              }).done(function () {
                var isLastPage = _this10.pageCount() > 0 && _this10.pageIndex() === _this10.pageCount() - 1;
                (viewportChanging || isLastPage) && _this10._updateVisiblePageIndex();
                if (_this10._needUpdateViewportAfterLoading) {
                  _this10._needUpdateViewportAfterLoading = false;
                  _this10.loadViewport({
                    checkLoadedParamsOnly: true
                  });
                }
              });
            }
            return result;
          },
          loadViewport(params) {
            var _a, _b;
            var _ref2 = params !== null && params !== void 0 ? params : {},
              checkLoadedParamsOnly = _ref2.checkLoadedParamsOnly,
              checkLoading = _ref2.checkLoading,
              viewportIsNotFilled = _ref2.viewportIsNotFilled;
            var virtualPaging = isVirtualPaging(this);
            if (virtualPaging || _m_utils.default.isVirtualRowRendering(this)) {
              this._updateLoadViewportParams();
              var loadingItemsStarted = this._loadItems(checkLoading, !viewportIsNotFilled);
              var needToUpdateItems = !(loadingItemsStarted || this._isLoading && checkLoading || checkLoadedParamsOnly);
              if (needToUpdateItems) {
                var noPendingChangesInEditing = !((_b = (_a = this.getController('editing')) === null || _a === void 0 ? void 0 : _a.getChanges()) === null || _b === void 0 ? void 0 : _b.length);
                this.updateItems({
                  repaintChangesOnly: true,
                  needUpdateDimensions: true,
                  useProcessedItemsCache: noPendingChangesInEditing,
                  cancelEmptyChanges: true
                });
              }
            }
          },
          updateViewport() {
            var _a, _b;
            var viewportSize = this.viewportSize();
            var itemCount = this.items().length;
            var viewportIsNotFilled = viewportSize > itemCount;
            var currentTake = (_b = (_a = this._loadViewportParams) === null || _a === void 0 ? void 0 : _a.take) !== null && _b !== void 0 ? _b : 0;
            var rowsScrollController = this._rowsScrollController;
            var newTake = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.getViewportParams().take;
            (viewportIsNotFilled || currentTake < newTake) && !this._isPaging && itemCount && this.loadViewport({
              checkLoading: true,
              viewportIsNotFilled
            });
          },
          loadIfNeed() {
            if (this.option(LEGACY_SCROLLING_MODE) === false) {
              return;
            }
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.loadIfNeed();
            var dataSource = this._dataSource;
            return dataSource && dataSource.loadIfNeed();
          },
          getItemSize() {
            var rowsScrollController = this._rowsScrollController;
            if (rowsScrollController) {
              return rowsScrollController.getItemSize.apply(rowsScrollController, arguments);
            }
            var dataSource = this._dataSource;
            return dataSource && dataSource.getItemSize.apply(dataSource, arguments);
          },
          getItemSizes() {
            var rowsScrollController = this._rowsScrollController;
            if (rowsScrollController) {
              return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments);
            }
            var dataSource = this._dataSource;
            return dataSource && dataSource.getItemSizes.apply(dataSource, arguments);
          },
          getContentOffset() {
            var rowsScrollController = this._rowsScrollController;
            if (rowsScrollController) {
              return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments);
            }
            var dataSource = this._dataSource;
            return dataSource && dataSource.getContentOffset.apply(dataSource, arguments);
          },
          refresh(options) {
            var dataSource = this._dataSource;
            if (dataSource && options && options.load && isAppendMode(this)) {
              dataSource.resetCurrentTotalCount();
            }
            return this.callBase.apply(this, arguments);
          },
          dispose() {
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.dispose();
            this.callBase.apply(this, arguments);
          },
          topItemIndex() {
            var _a;
            return (_a = this._loadViewportParams) === null || _a === void 0 ? void 0 : _a.skip;
          },
          bottomItemIndex() {
            var viewportParams = this._loadViewportParams;
            return viewportParams && viewportParams.skip + viewportParams.take;
          },
          virtualItemsCount() {
            var rowsScrollController = this._rowsScrollController;
            if (rowsScrollController) {
              return rowsScrollController.virtualItemsCount.apply(rowsScrollController, arguments);
            }
            var dataSource = this._dataSource;
            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.virtualItemsCount.apply(dataSource, arguments);
          },
          pageIndex(pageIndex) {
            var _a;
            var virtualPaging = isVirtualPaging(this);
            var rowsScrollController = this._rowsScrollController;
            if (this.option(LEGACY_SCROLLING_MODE) === false && virtualPaging && rowsScrollController) {
              if (pageIndex === undefined) {
                return (_a = this.option(VISIBLE_PAGE_INDEX)) !== null && _a !== void 0 ? _a : 0;
              }
            }
            return this.callBase.apply(this, arguments);
          },
          _fireChanged(e) {
            this.callBase.apply(this, arguments);
            var operationTypes = e.operationTypes;
            if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this) && operationTypes) {
              var fullReload = operationTypes.fullReload,
                pageIndex = operationTypes.pageIndex;
              if (e.isDataChanged && !fullReload && pageIndex) {
                this._updateVisiblePageIndex(this._dataSource.pageIndex());
              }
            }
          },
          _getPagingOptionValue(optionName) {
            var result = this.callBase.apply(this, arguments);
            if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this)) {
              result = this[optionName]();
            }
            return result;
          },
          isEmpty() {
            return this.option(LEGACY_SCROLLING_MODE) === false ? !this.items(true).length : this.callBase(this, arguments);
          },
          isLastPageLoaded() {
            var result = false;
            if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this)) {
              var _this$getLoadPagePara4 = this.getLoadPageParams(true),
                pageIndex = _this$getLoadPagePara4.pageIndex,
                loadPageCount = _this$getLoadPagePara4.loadPageCount;
              var pageCount = this.pageCount();
              result = pageIndex + loadPageCount >= pageCount;
            } else {
              result = this.callBase.apply(this, arguments);
            }
            return result;
          },
          reset() {
            this._itemCount = 0;
            this._allItems = null;
            this.callBase.apply(this, arguments);
          },
          _applyFilter() {
            var _a;
            (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.loadPageCount(1);
            this.callBase.apply(this, arguments);
          }
        };
        _m_utils.default.proxyMethod(members, 'getVirtualContentSize');
        _m_utils.default.proxyMethod(members, 'setViewportItemIndex');
        return members;
      }(),
      resizing: {
        _updateMasterDataGridCore(masterDataGrid) {
          return (0, _deferred.when)(this.callBase.apply(this, arguments)).done(function (masterDataGridUpdated) {
            var isNewVirtualMode = isVirtualMode(masterDataGrid) && masterDataGrid.option(LEGACY_SCROLLING_MODE) === false;
            if (!masterDataGridUpdated && isNewVirtualMode) {
              var scrollable = masterDataGrid.getScrollable();
              if (scrollable) {
                masterDataGrid.updateDimensions();
              }
            }
          });
        },
        hasResizeTimeout() {
          return !!this._resizeTimeout;
        },
        resize() {
          var _this11 = this;
          var callBase = this.callBase;
          var result;
          if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = null;
            var diff = new Date() - this._lastTime;
            var updateTimeout = this.option('scrolling.updateTimeout');
            if (this._lastTime && diff < updateTimeout) {
              // @ts-expect-error
              result = new _deferred.Deferred();
              this._resizeTimeout = setTimeout(function () {
                _this11._resizeTimeout = null;
                callBase.apply(_this11).done(result.resolve).fail(result.reject);
                _this11._lastTime = new Date();
              }, updateTimeout);
              this._lastTime = new Date();
            } else {
              result = callBase.apply(this);
              if (this._dataController.isLoaded()) {
                this._lastTime = new Date();
              }
            }
          } else {
            result = callBase.apply(this);
          }
          return result;
        },
        dispose() {
          this.callBase.apply(this, arguments);
          clearTimeout(this._resizeTimeout);
        }
      }
    },
    views: {
      rowsView: VirtualScrollingRowsViewExtender
    }
  }
};
exports.virtualScrollingModule = virtualScrollingModule;