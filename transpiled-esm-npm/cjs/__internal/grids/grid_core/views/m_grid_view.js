"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridViewModule = exports.SynchronizeScrollingController = exports.ResizingController = exports.GridView = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _iterator = require("../../../../core/utils/iterator");
var _position = require("../../../../core/utils/position");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var accessibility = _interopRequireWildcard(require("../../../../ui/shared/accessibility"));
var _a11y_status_container_component = require("../../../grids/grid_core/views/a11y_status_container_component");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

const BORDERS_CLASS = 'borders';
const TABLE_FIXED_CLASS = 'table-fixed';
const IMPORTANT_MARGIN_CLASS = 'important-margin';
const GRIDBASE_CONTAINER_CLASS = 'dx-gridbase-container';
const GROUP_ROW_SELECTOR = 'tr.dx-group-row';
const HIDDEN_COLUMNS_WIDTH = 'adaptiveHidden';
const VIEW_NAMES = ['columnsSeparatorView', 'blockSeparatorView', 'trackerView', 'headerPanel', 'columnHeadersView', 'rowsView', 'footerView', 'columnChooserView', 'filterPanelView', 'pagerView', 'draggingHeaderView', 'contextMenuView', 'errorView', 'headerFilterView', 'filterBuilderView'];
const E2E_ATTRIBUTES = {
  a11yStatusContainer: 'e2e-a11y-general-status-container'
};
const isPercentWidth = function (width) {
  return (0, _type.isString)(width) && width.endsWith('%');
};
const isPixelWidth = function (width) {
  return (0, _type.isString)(width) && width.endsWith('px');
};
const calculateFreeWidth = function (that, widths) {
  const contentWidth = that._rowsView.contentWidth();
  const totalWidth = that._getTotalWidth(widths, contentWidth);
  return contentWidth - totalWidth;
};
const calculateFreeWidthWithCurrentMinWidth = function (that, columnIndex, currentMinWidth, widths) {
  return calculateFreeWidth(that, widths.map((width, index) => index === columnIndex ? currentMinWidth : width));
};
const restoreFocus = function (focusedElement, selectionRange) {
  accessibility.hiddenFocus(focusedElement, true);
  _m_utils.default.setSelectionRange(focusedElement, selectionRange);
};
class ResizingController extends _m_modules.default.ViewController {
  callbackNames() {
    return ['resizeCompleted'];
  }
  init() {
    this._prevContentMinHeight = null;
    this._dataController = this.getController('data');
    this._columnsController = this.getController('columns');
    this._columnHeadersView = this.getView('columnHeadersView');
    this._adaptiveColumnsController = this.getController('adaptiveColumns');
    this._editorFactoryController = this.getController('editorFactory');
    this._footerView = this.getView('footerView');
    this._rowsView = this.getView('rowsView');
    this._gridView = this.getView('gridView');
  }
  _initPostRenderHandlers() {
    if (!this._refreshSizesHandler) {
      this._refreshSizesHandler = e => {
        // @ts-expect-error
        let resizeDeferred = new _deferred.Deferred().resolve(null);
        const changeType = e === null || e === void 0 ? void 0 : e.changeType;
        const isDelayed = e === null || e === void 0 ? void 0 : e.isDelayed;
        const needFireContentReady = changeType && changeType !== 'updateSelection' && changeType !== 'updateFocusedRow' && changeType !== 'pageIndex' && !isDelayed;
        this._dataController.changed.remove(this._refreshSizesHandler);
        if (this._checkSize()) {
          resizeDeferred = this._refreshSizes(e);
        }
        if (needFireContentReady) {
          (0, _deferred.when)(resizeDeferred).done(() => {
            this._setAriaLabel(e);
            this.fireContentReadyAction();
          });
        }
      };
      // TODO remove resubscribing
      this._dataController.changed.add(() => {
        this._dataController.changed.add(this._refreshSizesHandler);
      });
    }
  }
  _refreshSizes(e) {
    // @ts-expect-error
    let resizeDeferred = new _deferred.Deferred().resolve(null);
    const changeType = e === null || e === void 0 ? void 0 : e.changeType;
    const isDelayed = e === null || e === void 0 ? void 0 : e.isDelayed;
    const items = this._dataController.items();
    if (!e || changeType === 'refresh' || changeType === 'prepend' || changeType === 'append') {
      if (!isDelayed) {
        resizeDeferred = this.resize();
      }
    } else if (changeType === 'update') {
      var _e$changeTypes;
      if (((_e$changeTypes = e.changeTypes) === null || _e$changeTypes === void 0 ? void 0 : _e$changeTypes.length) === 0) {
        return resizeDeferred;
      }
      if ((items.length > 1 || e.changeTypes[0] !== 'insert') && !(items.length === 0 && e.changeTypes[0] === 'remove') && !e.needUpdateDimensions) {
        // @ts-expect-error
        resizeDeferred = new _deferred.Deferred();
        this._waitAsyncTemplates().done(() => {
          (0, _common.deferUpdate)(() => (0, _common.deferRender)(() => (0, _common.deferUpdate)(() => {
            this._setScrollerSpacing();
            this._rowsView.resize();
            resizeDeferred.resolve();
          })));
        }).fail(resizeDeferred.reject);
      } else {
        resizeDeferred = this.resize();
      }
    }
    return resizeDeferred;
  }
  /**
   * @extended: master_detail
   */
  fireContentReadyAction() {
    this.component._fireContentReadyAction();
  }
  _getWidgetAriaLabel() {
    return 'dxDataGrid-ariaDataGrid';
  }
  _setAriaLabel(e) {
    var _this$_columnsControl;
    let widgetStatusText = '';
    let labelParts = [];
    const columnCount = ((_this$_columnsControl = this._columnsController) === null || _this$_columnsControl === void 0 || (_this$_columnsControl = _this$_columnsControl._columns) === null || _this$_columnsControl === void 0 ? void 0 : _this$_columnsControl.filter(_ref => {
      let {
        visible
      } = _ref;
      return !!visible;
    }).length) ?? 0;
    const totalItemsCount = Math.max(0, this._dataController.totalItemsCount());
    const widgetAriaLabel = this._getWidgetAriaLabel();
    widgetStatusText = _message.default
    // @ts-expect-error Badly typed format method
    .format(widgetAriaLabel, totalItemsCount, columnCount);
    // @ts-expect-error Treelist Variable
    const expandableWidgetAriaLabel = _message.default.format(this._expandableWidgetAriaId);
    labelParts = [widgetStatusText];
    if (expandableWidgetAriaLabel) {
      labelParts.push(expandableWidgetAriaLabel);
    }
    const $ariaLabelElement = this.component.$element().children(`.${GRIDBASE_CONTAINER_CLASS}`);
    this.component.setAria('label', labelParts.join('. '), $ariaLabelElement);
    if (!(e !== null && e !== void 0 && e.isFirstRender)) {
      this._gridView.setWidgetA11yStatusText(widgetStatusText);
    }
  }
  _getBestFitWidths() {
    var _widths;
    const rowsView = this._rowsView;
    const columnHeadersView = this._columnHeadersView;
    let widths = rowsView.getColumnWidths();
    if (!((_widths = widths) !== null && _widths !== void 0 && _widths.length)) {
      var _rowsView$getTableEle;
      const headersTableElement = columnHeadersView.getTableElement();
      columnHeadersView.setTableElement((_rowsView$getTableEle = rowsView.getTableElement()) === null || _rowsView$getTableEle === void 0 ? void 0 : _rowsView$getTableEle.children('.dx-header'));
      widths = columnHeadersView.getColumnWidths();
      columnHeadersView.setTableElement(headersTableElement);
    }
    return widths;
  }
  _setVisibleWidths(visibleColumns, widths) {
    const columnsController = this._columnsController;
    columnsController.beginUpdate();
    (0, _iterator.each)(visibleColumns, (index, column) => {
      const columnId = columnsController.getColumnId(column);
      columnsController.columnOption(columnId, 'visibleWidth', widths[index]);
    });
    columnsController.endUpdate();
  }
  _toggleBestFitModeForView(view, className, isBestFit) {
    if (!view || !view.isVisible()) return;
    const $rowsTables = this._rowsView.getTableElements();
    const $viewTables = view.getTableElements();
    (0, _iterator.each)($rowsTables, (index, tableElement) => {
      let $tableBody;
      const $rowsTable = (0, _renderer.default)(tableElement);
      const $viewTable = $viewTables.eq(index);
      if ($viewTable && $viewTable.length) {
        if (isBestFit) {
          $tableBody = $viewTable.children('tbody').appendTo($rowsTable);
        } else {
          $tableBody = $rowsTable.children(`.${className}`).appendTo($viewTable);
        }
        $tableBody.toggleClass(className, isBestFit);
        $tableBody.toggleClass(this.addWidgetPrefix('best-fit'), isBestFit);
      }
    });
  }
  /**
   * @extended: adaptivity, master_detail
   */
  _toggleBestFitMode(isBestFit) {
    const $rowsTable = this._rowsView.getTableElement();
    const $rowsFixedTable = this._rowsView.getTableElements().eq(1);
    if (!$rowsTable) return;
    $rowsTable.css('tableLayout', isBestFit ? 'auto' : 'fixed');
    $rowsTable.children('colgroup').css('display', isBestFit ? 'none' : '');
    // NOTE T1156153: Hide group row column to get correct fixed column widths.
    (0, _iterator.each)($rowsFixedTable.find(GROUP_ROW_SELECTOR), (idx, item) => {
      (0, _renderer.default)(item).css('display', isBestFit ? 'none' : '');
    });
    $rowsFixedTable.toggleClass(this.addWidgetPrefix(TABLE_FIXED_CLASS), !isBestFit);
    this._toggleBestFitModeForView(this._columnHeadersView, 'dx-header', isBestFit);
    this._toggleBestFitModeForView(this._footerView, 'dx-footer', isBestFit);
    if (this._needStretch()) {
      // @ts-expect-error
      $rowsTable.get(0).style.width = isBestFit ? 'auto' : '';
    }
  }
  _toggleContentMinHeight(value) {
    const scrollable = this._rowsView.getScrollable();
    const $contentElement = this._rowsView._findContentElement();
    if ((scrollable === null || scrollable === void 0 ? void 0 : scrollable.option('useNative')) === false) {
      if (value === true) {
        this._prevContentMinHeight = $contentElement.get(0).style.minHeight;
      }
      if ((0, _type.isDefined)(this._prevContentMinHeight)) {
        $contentElement.css({
          minHeight: value ? _m_utils.default.getContentHeightLimit(_browser.default) : this._prevContentMinHeight
        });
      }
    }
  }
  _synchronizeColumns() {
    const columnsController = this._columnsController;
    const visibleColumns = columnsController.getVisibleColumns();
    const columnAutoWidth = this.option('columnAutoWidth');
    const wordWrapEnabled = this.option('wordWrapEnabled');
    const hasUndefinedColumnWidth = visibleColumns.some(column => !(0, _type.isDefined)(column.width));
    let needBestFit = this._needBestFit();
    let hasMinWidth = false;
    let resetBestFitMode;
    let isColumnWidthsCorrected = false;
    let resultWidths = [];
    let focusedElement;
    let selectionRange;
    const normalizeWidthsByExpandColumns = function () {
      let expandColumnWidth;
      (0, _iterator.each)(visibleColumns, (index, column) => {
        if (column.type === 'groupExpand') {
          expandColumnWidth = resultWidths[index];
        }
      });
      (0, _iterator.each)(visibleColumns, (index, column) => {
        if (column.type === 'groupExpand' && expandColumnWidth) {
          resultWidths[index] = expandColumnWidth;
        }
      });
    };
    !needBestFit && (0, _iterator.each)(visibleColumns, (index, column) => {
      if (column.width === 'auto') {
        needBestFit = true;
        return false;
      }
      return undefined;
    });
    (0, _iterator.each)(visibleColumns, (index, column) => {
      if (column.minWidth) {
        hasMinWidth = true;
        return false;
      }
      return undefined;
    });
    this._setVisibleWidths(visibleColumns, []);
    const $element = this.component.$element();
    if (needBestFit) {
      // @ts-expect-error
      focusedElement = _dom_adapter.default.getActiveElement($element.get(0));
      selectionRange = _m_utils.default.getSelectionRange(focusedElement);
      this._toggleBestFitMode(true);
      resetBestFitMode = true;
    }
    this._toggleContentMinHeight(wordWrapEnabled); // T1047239
    if ($element && $element.get(0) && this._maxWidth) {
      delete this._maxWidth;
      $element[0].style.maxWidth = '';
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (0, _common.deferUpdate)(() => {
      if (needBestFit) {
        resultWidths = this._getBestFitWidths();
        (0, _iterator.each)(visibleColumns, (index, column) => {
          const columnId = columnsController.getColumnId(column);
          columnsController.columnOption(columnId, 'bestFitWidth', resultWidths[index], true);
        });
      } else if (hasMinWidth) {
        resultWidths = this._getBestFitWidths();
      }
      (0, _iterator.each)(visibleColumns, function (index) {
        const {
          width
        } = this;
        if (width !== 'auto') {
          if ((0, _type.isDefined)(width)) {
            resultWidths[index] = (0, _type.isNumeric)(width) || isPixelWidth(width) ? parseFloat(width) : width;
          } else if (!columnAutoWidth) {
            resultWidths[index] = undefined;
          }
        }
      });
      if (resetBestFitMode) {
        this._toggleBestFitMode(false);
        resetBestFitMode = false;
        if (focusedElement && focusedElement !== _dom_adapter.default.getActiveElement()) {
          const isFocusOutsideWindow = (0, _position.getBoundingRect)(focusedElement).bottom < 0;
          if (!isFocusOutsideWindow) {
            restoreFocus(focusedElement, selectionRange);
          }
        }
      }
      isColumnWidthsCorrected = this._correctColumnWidths(resultWidths, visibleColumns);
      if (columnAutoWidth) {
        normalizeWidthsByExpandColumns();
        if (this._needStretch()) {
          this._processStretch(resultWidths, visibleColumns);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (0, _common.deferRender)(() => {
        if (needBestFit || isColumnWidthsCorrected || hasUndefinedColumnWidth) {
          this._setVisibleWidths(visibleColumns, resultWidths);
        }
        if (wordWrapEnabled) {
          this._toggleContentMinHeight(false);
        }
      });
    });
  }
  /**
   * @extended: adaptivity
   */
  _needBestFit() {
    return this.option('columnAutoWidth');
  }
  /**
   * @extended: adaptivity
   */
  _needStretch() {
    return this._columnsController.getVisibleColumns().some(c => c.width === 'auto' && !c.command);
  }
  _getAverageColumnsWidth(resultWidths) {
    const freeWidth = calculateFreeWidth(this, resultWidths);
    const columnCountWithoutWidth = resultWidths.filter(width => width === undefined).length;
    return freeWidth / columnCountWithoutWidth;
  }
  /**
   * @extended: adaptivity
   */
  _correctColumnWidths(resultWidths, visibleColumns) {
    const that = this;
    let i;
    let hasPercentWidth = false;
    let hasAutoWidth = false;
    let isColumnWidthsCorrected = false;
    const $element = that.component.$element();
    const hasWidth = that._hasWidth;
    for (i = 0; i < visibleColumns.length; i++) {
      const index = i;
      const column = visibleColumns[index];
      const isHiddenColumn = resultWidths[index] === HIDDEN_COLUMNS_WIDTH;
      let width = resultWidths[index];
      const {
        minWidth
      } = column;
      if (minWidth) {
        if (width === undefined) {
          const averageColumnsWidth = that._getAverageColumnsWidth(resultWidths);
          width = averageColumnsWidth;
        } else if (isPercentWidth(width)) {
          const freeWidth = calculateFreeWidthWithCurrentMinWidth(that, index, minWidth, resultWidths);
          if (freeWidth < 0) {
            width = -1;
          }
        }
      }
      const realColumnWidth = that._getRealColumnWidth(index, resultWidths.map((columnWidth, columnIndex) => index === columnIndex ? width : columnWidth));
      if (minWidth && !isHiddenColumn && realColumnWidth < minWidth) {
        resultWidths[index] = minWidth;
        isColumnWidthsCorrected = true;
        i = -1;
      }
      if (!(0, _type.isDefined)(column.width)) {
        hasAutoWidth = true;
      }
      if (isPercentWidth(column.width)) {
        hasPercentWidth = true;
      }
    }
    if (!hasAutoWidth && resultWidths.length) {
      const $rowsViewElement = that._rowsView.element();
      const contentWidth = that._rowsView.contentWidth();
      const scrollbarWidth = that._rowsView.getScrollbarWidth();
      const totalWidth = that._getTotalWidth(resultWidths, contentWidth);
      if (totalWidth < contentWidth) {
        const lastColumnIndex = _m_utils.default.getLastResizableColumnIndex(visibleColumns, resultWidths);
        if (lastColumnIndex >= 0) {
          resultWidths[lastColumnIndex] = 'auto';
          isColumnWidthsCorrected = true;
          if (hasWidth === false && !hasPercentWidth) {
            const borderWidth = _m_utils.default.getComponentBorderWidth(this, $rowsViewElement);
            that._maxWidth = totalWidth + scrollbarWidth + borderWidth;
            $element.css('maxWidth', that._maxWidth);
          }
        }
      }
    }
    return isColumnWidthsCorrected;
  }
  _processStretch(resultSizes, visibleColumns) {
    const groupSize = this._rowsView.contentWidth();
    const tableSize = this._getTotalWidth(resultSizes, groupSize);
    const unusedIndexes = {
      length: 0
    };
    if (!resultSizes.length) return;
    (0, _iterator.each)(visibleColumns, function (index) {
      if (this.width || resultSizes[index] === HIDDEN_COLUMNS_WIDTH) {
        unusedIndexes[index] = true;
        unusedIndexes.length++;
      }
    });
    const diff = groupSize - tableSize;
    const diffElement = Math.floor(diff / (resultSizes.length - unusedIndexes.length));
    let onePixelElementsCount = diff - diffElement * (resultSizes.length - unusedIndexes.length);
    if (diff >= 0) {
      for (let i = 0; i < resultSizes.length; i++) {
        if (unusedIndexes[i]) {
          continue;
        }
        resultSizes[i] += diffElement;
        if (onePixelElementsCount > 0) {
          if (onePixelElementsCount < 1) {
            resultSizes[i] += onePixelElementsCount;
            onePixelElementsCount = 0;
          } else {
            resultSizes[i]++;
            onePixelElementsCount--;
          }
        }
      }
    }
  }
  _getRealColumnWidth(columnIndex, columnWidths, groupWidth) {
    let ratio = 1;
    const width = columnWidths[columnIndex];
    if (!isPercentWidth(width)) {
      return parseFloat(width);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const percentTotalWidth = columnWidths.reduce((sum, width, index) => {
      if (!isPercentWidth(width)) {
        return sum;
      }
      return sum + parseFloat(width);
    }, 0);
    const pixelTotalWidth = columnWidths.reduce((sum, width) => {
      if (!width || width === HIDDEN_COLUMNS_WIDTH || isPercentWidth(width)) {
        return sum;
      }
      return sum + parseFloat(width);
    }, 0);
    groupWidth = groupWidth || this._rowsView.contentWidth();
    const freeSpace = groupWidth - pixelTotalWidth;
    const percentTotalWidthInPixel = percentTotalWidth * groupWidth / 100;
    if (pixelTotalWidth > 0 && percentTotalWidthInPixel + pixelTotalWidth >= groupWidth) {
      ratio = percentTotalWidthInPixel > freeSpace ? freeSpace / percentTotalWidthInPixel : 1;
    }
    return parseFloat(width) * groupWidth * ratio / 100;
  }
  _getTotalWidth(widths, groupWidth) {
    let result = 0;
    for (let i = 0; i < widths.length; i++) {
      const width = widths[i];
      if (width && width !== HIDDEN_COLUMNS_WIDTH) {
        result += this._getRealColumnWidth(i, widths, groupWidth);
      }
    }
    return Math.ceil(result);
  }
  _getGroupElement() {
    return this.component.$element().children().get(0);
  }
  updateSize(rootElement) {
    const that = this;
    const $rootElement = (0, _renderer.default)(rootElement);
    const importantMarginClass = that.addWidgetPrefix(IMPORTANT_MARGIN_CLASS);
    if (that._hasHeight === undefined && $rootElement && $rootElement.is(':visible') && (0, _size.getWidth)($rootElement)) {
      const $groupElement = $rootElement.children(`.${that.getWidgetContainerClass()}`);
      if ($groupElement.length) {
        $groupElement.detach();
      }
      that._hasHeight = !!(0, _size.getHeight)($rootElement);
      const width = (0, _size.getWidth)($rootElement);
      $rootElement.addClass(importantMarginClass);
      that._hasWidth = (0, _size.getWidth)($rootElement) === width;
      $rootElement.removeClass(importantMarginClass);
      if ($groupElement.length) {
        $groupElement.appendTo($rootElement);
      }
    }
  }
  publicMethods() {
    return ['resize', 'updateDimensions'];
  }
  _waitAsyncTemplates() {
    var _this$_columnHeadersV, _this$_rowsView, _this$_footerView;
    return (0, _deferred.when)((_this$_columnHeadersV = this._columnHeadersView) === null || _this$_columnHeadersV === void 0 ? void 0 : _this$_columnHeadersV.waitAsyncTemplates(true), (_this$_rowsView = this._rowsView) === null || _this$_rowsView === void 0 ? void 0 : _this$_rowsView.waitAsyncTemplates(true), (_this$_footerView = this._footerView) === null || _this$_footerView === void 0 ? void 0 : _this$_footerView.waitAsyncTemplates(true));
  }
  /**
   * @extended: virtual_scrolling
   */
  resize() {
    if (this.component._requireResize) {
      // @ts-expect-error
      return new _deferred.Deferred().resolve();
    }
    // @ts-expect-error
    const d = new _deferred.Deferred();
    this._waitAsyncTemplates().done(() => {
      (0, _deferred.when)(this.updateDimensions()).done(d.resolve).fail(d.reject);
    }).fail(d.reject);
    return d.promise().done(() => {
      this.resizeCompleted.fire();
    });
  }
  updateDimensions(checkSize) {
    const that = this;
    that._initPostRenderHandlers();
    // T335767
    if (!that._checkSize(checkSize)) {
      return;
    }
    const prevResult = that._resizeDeferred;
    // @ts-expect-error
    const result = that._resizeDeferred = new _deferred.Deferred();
    (0, _deferred.when)(prevResult).always(() => {
      (0, _common.deferRender)(() => {
        if (that._dataController.isLoaded()) {
          that._synchronizeColumns();
        }
        // IE11
        that._resetGroupElementHeight();
        (0, _common.deferUpdate)(() => {
          (0, _common.deferRender)(() => {
            (0, _common.deferUpdate)(() => {
              that._updateDimensionsCore();
            });
          });
        });
        // @ts-expect-error
      }).done(result.resolve).fail(result.reject);
    });
    return result.promise();
  }
  _resetGroupElementHeight() {
    const groupElement = this._getGroupElement();
    const scrollable = this._rowsView.getScrollable();
    // @ts-expect-error
    if (groupElement && groupElement.style.height && (!scrollable || !scrollable.scrollTop())) {
      // @ts-expect-error
      groupElement.style.height = '';
    }
  }
  _checkSize(checkSize) {
    const $rootElement = this.component.$element();
    const isWidgetVisible = $rootElement.is(':visible');
    const isGridSizeChanged = this._lastWidth !== (0, _size.getWidth)($rootElement) || this._lastHeight !== (0, _size.getHeight)($rootElement) || this._devicePixelRatio !== (0, _window.getWindow)().devicePixelRatio;
    return isWidgetVisible && (!checkSize || isGridSizeChanged);
  }
  _setScrollerSpacingCore() {
    const that = this;
    const vScrollbarWidth = that._rowsView.getScrollbarWidth();
    const hScrollbarWidth = that._rowsView.getScrollbarWidth(true);
    (0, _common.deferRender)(() => {
      that._columnHeadersView && that._columnHeadersView.setScrollerSpacing(vScrollbarWidth);
      that._footerView && that._footerView.setScrollerSpacing(vScrollbarWidth);
      that._rowsView.setScrollerSpacing(vScrollbarWidth, hScrollbarWidth);
    });
  }
  _setScrollerSpacing() {
    const scrollable = this._rowsView.getScrollable();
    // T722415, T758955
    const isNativeScrolling = this.option('scrolling.useNative') === true;
    if (!scrollable || isNativeScrolling) {
      (0, _common.deferRender)(() => {
        (0, _common.deferUpdate)(() => {
          this._setScrollerSpacingCore();
        });
      });
    } else {
      this._setScrollerSpacingCore();
    }
  }
  /**
   * @extended: column_fixing
   */
  _setAriaOwns() {
    var _this$_columnHeadersV2, _this$_footerView2, _this$_rowsView2;
    const headerTable = (_this$_columnHeadersV2 = this._columnHeadersView) === null || _this$_columnHeadersV2 === void 0 ? void 0 : _this$_columnHeadersV2.getTableElement();
    const footerTable = (_this$_footerView2 = this._footerView) === null || _this$_footerView2 === void 0 ? void 0 : _this$_footerView2.getTableElement();
    // @ts-expect-error
    (_this$_rowsView2 = this._rowsView) === null || _this$_rowsView2 === void 0 || _this$_rowsView2.setAriaOwns(headerTable === null || headerTable === void 0 ? void 0 : headerTable.attr('id'), footerTable === null || footerTable === void 0 ? void 0 : footerTable.attr('id'));
  }
  /**
   * @extended: header_panel
   */
  _updateDimensionsCore() {
    const that = this;
    const dataController = that._dataController;
    const rowsView = that._rowsView;
    const $rootElement = that.component.$element();
    const groupElement = this._getGroupElement();
    const rootElementHeight = (0, _size.getHeight)($rootElement);
    // @ts-expect-error
    const height = that.option('height') ?? $rootElement.get(0).style.height;
    const isHeightSpecified = !!height && height !== 'auto';
    // @ts-expect-error
    // eslint-disable-next-line radix
    const maxHeight = parseInt($rootElement.css('maxHeight'));
    const maxHeightHappened = maxHeight && rootElementHeight >= maxHeight;
    // @ts-expect-error
    const isMaxHeightApplied = groupElement && groupElement.scrollHeight === groupElement.offsetHeight;
    that.updateSize($rootElement);
    (0, _common.deferRender)(() => {
      const hasHeight = that._hasHeight || !!maxHeight || isHeightSpecified;
      rowsView.hasHeight(hasHeight);
      this._setAriaOwns();
      // IE11
      if (maxHeightHappened && !isMaxHeightApplied) {
        (0, _renderer.default)(groupElement).css('height', maxHeight);
      }
      if (!dataController.isLoaded()) {
        rowsView.setLoading(dataController.isLoading());
        return;
      }
      (0, _common.deferUpdate)(() => {
        that._updateLastSizes($rootElement);
        that._setScrollerSpacing();
        (0, _iterator.each)(VIEW_NAMES, (index, viewName) => {
          // TODO getView
          const view = that.getView(viewName);
          if (view) {
            view.resize();
          }
        });
        this._editorFactoryController && this._editorFactoryController.resize();
      });
    });
  }
  _updateLastSizes($rootElement) {
    this._lastWidth = (0, _size.getWidth)($rootElement);
    this._lastHeight = (0, _size.getHeight)($rootElement);
    this._devicePixelRatio = (0, _window.getWindow)().devicePixelRatio;
  }
  optionChanged(args) {
    switch (args.name) {
      case 'width':
      case 'height':
        this.component._renderDimensions();
        this.resize();
      /* falls through */
      case 'renderAsync':
        args.handled = true;
        return;
      default:
        super.optionChanged(args);
    }
  }
  /**
   * @extended: virtual_scrolling
   */
  resetLastResizeTime() {}
}
exports.ResizingController = ResizingController;
class SynchronizeScrollingController extends _m_modules.default.ViewController {
  _scrollChangedHandler(views, pos, viewName) {
    for (let j = 0; j < views.length; j++) {
      if (views[j] && views[j].name !== viewName) {
        views[j].scrollTo({
          left: pos.left,
          top: pos.top
        });
      }
    }
  }
  init() {
    const views = [this.getView('columnHeadersView'), this.getView('footerView'), this.getView('rowsView')];
    for (let i = 0; i < views.length; i++) {
      const view = views[i];
      if (view) {
        view.scrollChanged.add(this._scrollChangedHandler.bind(this, views));
      }
    }
  }
}
exports.SynchronizeScrollingController = SynchronizeScrollingController;
class GridView extends _m_modules.default.View {
  init() {
    this._resizingController = this.getController('resizing');
    this._dataController = this.getController('data');
  }
  _endUpdateCore() {
    if (this.component._requireResize) {
      this.component._requireResize = false;
      this._resizingController.resize();
    }
  }
  getView(name) {
    return this.component._views[name];
  }
  element() {
    return this._groupElement;
  }
  optionChanged(args) {
    const that = this;
    if ((0, _type.isDefined)(that._groupElement) && args.name === 'showBorders') {
      that._groupElement.toggleClass(that.addWidgetPrefix(BORDERS_CLASS), !!args.value);
      args.handled = true;
    } else {
      super.optionChanged(args);
    }
  }
  _renderViews($groupElement) {
    const that = this;
    (0, _iterator.each)(VIEW_NAMES, (index, viewName) => {
      // TODO getView
      const view = that.getView(viewName);
      if (view) {
        view.render($groupElement);
      }
    });
  }
  _getTableRoleName() {
    return 'group';
  }
  render($rootElement) {
    const isFirstRender = !this._groupElement;
    const $groupElement = this._groupElement || (0, _renderer.default)('<div>').addClass(this.getWidgetContainerClass());
    $groupElement.addClass(GRIDBASE_CONTAINER_CLASS);
    $groupElement.toggleClass(this.addWidgetPrefix(BORDERS_CLASS), !!this.option('showBorders'));
    this.setAria('role', 'presentation', $rootElement);
    this.component.setAria('role', this._getTableRoleName(), $groupElement);
    this._rootElement = $rootElement || this._rootElement;
    if (isFirstRender) {
      this._groupElement = $groupElement;
      (0, _window.hasWindow)() && this._resizingController.updateSize($rootElement);
      $groupElement.appendTo($rootElement);
    }
    if (!this._a11yGeneralStatusElement) {
      this._a11yGeneralStatusElement = (0, _a11y_status_container_component.A11yStatusContainerComponent)({});
      this._a11yGeneralStatusElement.attr(E2E_ATTRIBUTES.a11yStatusContainer, 'true');
      $groupElement.append(this._a11yGeneralStatusElement);
    }
    this._renderViews($groupElement);
  }
  update() {
    const that = this;
    const $rootElement = that._rootElement;
    const $groupElement = that._groupElement;
    if ($rootElement && $groupElement) {
      this._resizingController.resize();
      if (that._dataController.isLoaded()) {
        that._resizingController.fireContentReadyAction();
      }
    }
  }
  setWidgetA11yStatusText(statusText) {
    var _this$_a11yGeneralSta;
    (_this$_a11yGeneralSta = this._a11yGeneralStatusElement) === null || _this$_a11yGeneralSta === void 0 || _this$_a11yGeneralSta.text(statusText);
  }
}
exports.GridView = GridView;
const gridViewModule = exports.gridViewModule = {
  defaultOptions() {
    return {
      showBorders: false,
      renderAsync: false
    };
  },
  controllers: {
    resizing: ResizingController,
    synchronizeScrolling: SynchronizeScrollingController
  },
  views: {
    gridView: GridView
  },
  VIEW_NAMES
};