/**
* DevExtreme (cjs/__internal/grids/pivot_grid/data_controller/m_data_controller.js)
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
exports.default = exports.DataController__internals = exports.DataController = void 0;
var _class = _interopRequireDefault(require("../../../../core/class"));
var _callbacks = _interopRequireDefault(require("../../../../core/utils/callbacks"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _string = require("../../../../core/utils/string");
var _type = require("../../../../core/utils/type");
var _m_state_storing_core = _interopRequireDefault(require("../../../grids/grid_core/state_storing/m_state_storing_core"));
var _m_virtual_columns_core = require("../../../grids/grid_core/virtual_columns/m_virtual_columns_core");
var _m_virtual_scrolling_core = _interopRequireDefault(require("../../../grids/grid_core/virtual_scrolling/m_virtual_scrolling_core"));
var _m_data_source = require("../data_source/m_data_source");
var _m_widget_utils = require("../m_widget_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const math = Math;
const GRAND_TOTAL_TYPE = 'GT';
const TOTAL_TYPE = 'T';
const DATA_TYPE = 'D';
const NOT_AVAILABLE = '#N/A';
const CHANGING_DURATION_IF_PAGINATE = 300;
const proxyMethod = function (instance, methodName, defaultResult) {
  if (!instance[methodName]) {
    instance[methodName] = function () {
      const dataSource = this._dataSource;
      return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
    };
  }
};
const DataController = exports.DataController = _class.default.inherit(function () {
  // - @ts-expect-error
  function getHeaderItemText(item, description, options) {
    let {
      text
    } = item;
    if ((0, _type.isDefined)(item.displayText)) {
      text = item.displayText;
    } else if ((0, _type.isDefined)(item.caption)) {
      text = item.caption;
    } else if (item.type === GRAND_TOTAL_TYPE) {
      text = options.texts.grandTotal;
    }
    if (item.isAdditionalTotal) {
      text = (0, _string.format)(options.texts.total || '', text);
    }
    return text;
  }
  function formatCellValue(value, dataField, errorText) {
    return value === NOT_AVAILABLE ? errorText : (0, _m_widget_utils.formatValue)(value, dataField);
  }
  const createHeaderInfo = function () {
    const getHeaderItemsDepth = function (headerItems) {
      let depth = 0;
      (0, _m_widget_utils.foreachTree)(headerItems, items => {
        depth = math.max(depth, items.length);
      });
      return depth;
    };
    const createInfoItem = function (headerItem, breadth, isHorizontal, isTree) {
      var _headerItem$children;
      const infoItem = {
        type: headerItem.type,
        text: headerItem.text
      };
      if (headerItem.path) {
        infoItem.path = headerItem.path;
      }
      if (headerItem.width) {
        infoItem.width = headerItem.width;
      }
      if ((0, _type.isDefined)(headerItem.wordWrapEnabled)) {
        infoItem.wordWrapEnabled = headerItem.wordWrapEnabled;
      }
      if (headerItem.isLast) {
        infoItem.isLast = true;
      }
      if (headerItem.sorted) {
        infoItem.sorted = true;
      }
      if (headerItem.isMetric) {
        infoItem.dataIndex = headerItem.dataIndex;
      }
      if ((0, _type.isDefined)(headerItem.expanded)) {
        infoItem.expanded = headerItem.expanded;
      }
      if (breadth > 1) {
        infoItem[isHorizontal ? 'colspan' : 'rowspan'] = breadth;
      }
      if (headerItem.depthSize && headerItem.depthSize > 1) {
        infoItem[isHorizontal ? 'rowspan' : 'colspan'] = headerItem.depthSize;
      }
      if (headerItem.index >= 0) {
        infoItem.dataSourceIndex = headerItem.index;
      }
      if (isTree && (_headerItem$children = headerItem.children) !== null && _headerItem$children !== void 0 && _headerItem$children.length && !headerItem.children[0].isMetric) {
        infoItem.width = null;
        infoItem.isWhiteSpace = true;
      }
      return infoItem;
    };
    const addInfoItem = function (info, options) {
      const breadth = options.lastIndex - options.index || 1;
      const addInfoItemCore = function (info, infoItem, itemIndex, depthIndex, isHorizontal) {
        const index = isHorizontal ? depthIndex : itemIndex;
        while (!info[index]) {
          info.push([]);
        }
        if (isHorizontal) {
          info[index].push(infoItem);
        } else {
          info[index].unshift(infoItem);
        }
      };
      const itemInfo = createInfoItem(options.headerItem, breadth, options.isHorizontal, options.isTree);
      addInfoItemCore(info, itemInfo, options.index, options.depth, options.isHorizontal);
      if (!options.headerItem.children || options.headerItem.children.length === 0) {
        return options.lastIndex + 1;
      }
      return options.lastIndex;
    };
    const isItemSorted = function (items, sortBySummaryPath) {
      let path;
      const item = items[0];
      const stringValuesUsed = (0, _type.isString)(sortBySummaryPath[0]);
      const headerItem = item.dataIndex >= 0 ? items[1] : item;
      if (stringValuesUsed && sortBySummaryPath[0].indexOf('&[') !== -1 && headerItem.key || !headerItem.key) {
        path = (0, _m_widget_utils.createPath)(items);
      } else {
        path = (0, _iterator.map)(items, item => item.dataIndex >= 0 ? item.value : item.text).reverse();
      }
      if (item.type === GRAND_TOTAL_TYPE) {
        path = path.slice(1);
      }
      return path.join('/') === sortBySummaryPath.join('/');
    };
    const getViewHeaderItems = function (headerItems, headerDescriptions, cellDescriptions, depthSize, options) {
      const cellDescriptionsCount = cellDescriptions.length;
      const viewHeaderItems = createViewHeaderItems(headerItems, headerDescriptions);
      const {
        dataFields
      } = options;
      // @ts-expect-error
      const d = new _deferred.Deferred();
      (0, _deferred.when)(viewHeaderItems).done(viewHeaderItems => {
        options.notifyProgress(0.5);
        if (options.showGrandTotals) {
          viewHeaderItems[!options.showTotalsPrior ? 'push' : 'unshift']({
            type: GRAND_TOTAL_TYPE,
            isEmpty: options.isEmptyGrandTotal
          });
        }
        const hideTotals = options.showTotals === false || dataFields.length > 0 && dataFields.length === options.hiddenTotals.length;
        const hideData = dataFields.length > 0 && options.hiddenValues.length === dataFields.length;
        if (hideData && hideTotals) {
          depthSize = 1;
        }
        if (!hideTotals || options.layout === 'tree') {
          addAdditionalTotalHeaderItems(viewHeaderItems, headerDescriptions, options.showTotalsPrior, options.layout === 'tree');
        }
        (0, _deferred.when)((0, _m_widget_utils.foreachTreeAsync)(viewHeaderItems, items => {
          const item = items[0];
          if (!item.children || item.children.length === 0) {
            item.depthSize = depthSize - items.length + 1;
          }
        })).done(() => {
          if (cellDescriptionsCount > 1) {
            addMetricHeaderItems(viewHeaderItems, cellDescriptions, options);
          }
          !options.showEmpty && removeHiddenItems(viewHeaderItems);
          options.notifyProgress(0.75);
          (0, _deferred.when)((0, _m_widget_utils.foreachTreeAsync)(viewHeaderItems, items => {
            var _item$children;
            const item = items[0];
            const {
              isMetric
            } = item;
            const field = headerDescriptions[items.length - 1] || {};
            if (item.type === DATA_TYPE && !isMetric) {
              item.width = field.width;
            }
            if (hideData && item.type === DATA_TYPE) {
              const parentChildren = (items[1] ? items[1].children : viewHeaderItems) || [];
              parentChildren.splice(parentChildren.indexOf(item), 1);
              return;
            }
            if (isMetric) {
              item.wordWrapEnabled = cellDescriptions[item.dataIndex].wordWrapEnabled;
            } else {
              item.wordWrapEnabled = field.wordWrapEnabled;
            }
            item.isLast = !((_item$children = item.children) !== null && _item$children !== void 0 && _item$children.length);
            if (item.isLast) {
              (0, _iterator.each)(options.sortBySummaryPaths, (_, sortBySummaryPath) => {
                if (!(0, _type.isDefined)(item.dataIndex)) {
                  sortBySummaryPath = sortBySummaryPath.slice(0);
                  sortBySummaryPath.pop();
                }
                if (isItemSorted(items, sortBySummaryPath)) {
                  item.sorted = true;
                  return false;
                }
                return undefined;
              });
            }
            item.text = getHeaderItemText(item, field, options);
          })).done(() => {
            if (!viewHeaderItems.length) {
              viewHeaderItems.push({});
            }
            options.notifyProgress(1);
            d.resolve(viewHeaderItems);
          });
        });
      });
      return d;
    };
    function createHeaderItem(childrenStack, depth, index) {
      const parent = childrenStack[depth] = childrenStack[depth] || [];
      const node = parent[index] = {};
      if (childrenStack[depth + 1]) {
        node.children = childrenStack[depth + 1];
        // T541266
        for (let i = depth + 1; i < childrenStack.length; i += 1) {
          childrenStack[i] = undefined;
        }
        childrenStack.length = depth + 1;
      }
      return node;
    }
    function createViewHeaderItems(headerItems, headerDescriptions) {
      const headerDescriptionsCount = (headerDescriptions === null || headerDescriptions === void 0 ? void 0 : headerDescriptions.length) || 0;
      const childrenStack = [];
      // @ts-expect-error
      const d = new _deferred.Deferred();
      let headerItem;
      (0, _deferred.when)((0, _m_widget_utils.foreachTreeAsync)(headerItems, (items, index) => {
        const item = items[0];
        const path = (0, _m_widget_utils.createPath)(items);
        headerItem = createHeaderItem(childrenStack, path.length, index);
        headerItem.type = DATA_TYPE;
        headerItem.value = item.value;
        headerItem.path = path;
        headerItem.text = item.text;
        headerItem.index = item.index;
        headerItem.displayText = item.displayText;
        headerItem.key = item.key;
        headerItem.isEmpty = item.isEmpty;
        if (path.length < headerDescriptionsCount && (!item.children || item.children.length !== 0)) {
          headerItem.expanded = !!item.children;
        }
      })).done(() => {
        d.resolve(createHeaderItem(childrenStack, 0, 0).children || []);
      });
      return d;
    }
    function addMetricHeaderItems(headerItems, cellDescriptions, options) {
      (0, _m_widget_utils.foreachTree)(headerItems, items => {
        const item = items[0];
        let i;
        if (!item.children || item.children.length === 0) {
          item.children = [];
          for (i = 0; i < cellDescriptions.length; i += 1) {
            var _item$isEmpty;
            const isGrandTotal = item.type === GRAND_TOTAL_TYPE;
            const isTotal = item.type === TOTAL_TYPE;
            const isValue = item.type === DATA_TYPE;
            const columnIsHidden = cellDescriptions[i].visible === false || isGrandTotal && options.hiddenGrandTotals.includes(i) || isTotal && options.hiddenTotals.includes(i) || isValue && options.hiddenValues.includes(i);
            if (columnIsHidden) {
              continue;
            }
            item.children.push({
              caption: cellDescriptions[i].caption,
              path: item.path,
              type: item.type,
              value: i,
              index: item.index,
              dataIndex: i,
              isMetric: true,
              isEmpty: (_item$isEmpty = item.isEmpty) === null || _item$isEmpty === void 0 ? void 0 : _item$isEmpty[i]
            });
          }
        }
      });
    }
    function addAdditionalTotalHeaderItems(headerItems, headerDescriptions, showTotalsPrior, isTree) {
      showTotalsPrior = showTotalsPrior || isTree;
      (0, _m_widget_utils.foreachTree)(headerItems, (items, index) => {
        const item = items[0];
        const parentChildren = (items[1] ? items[1].children : headerItems) || [];
        const dataField = headerDescriptions[items.length - 1];
        if (item.type === DATA_TYPE && item.expanded && (dataField.showTotals !== false || isTree)) {
          index !== -1 && parentChildren.splice(showTotalsPrior ? index : index + 1, 0, (0, _extend.extend)({}, item, {
            children: null,
            type: TOTAL_TYPE,
            expanded: showTotalsPrior ? true : null,
            isAdditionalTotal: true
          }));
          if (showTotalsPrior) {
            item.expanded = null;
          }
        }
      });
    }
    const removeEmptyParent = function (items, index) {
      const parent = items[index + 1];
      if (!items[index].children.length && parent !== null && parent !== void 0 && parent.children) {
        parent.children.splice(parent.children.indexOf(items[index]), 1);
        removeEmptyParent(items, index + 1);
      }
    };
    function removeHiddenItems(headerItems) {
      (0, _m_widget_utils.foreachTree)([{
        children: headerItems
      }], (items, index) => {
        var _isEmpty;
        const item = items[0];
        const parentChildren = (items[1] ? items[1].children : headerItems) || [];
        let {
          isEmpty
        } = item;
        if ((_isEmpty = isEmpty) !== null && _isEmpty !== void 0 && _isEmpty.length) {
          isEmpty = item.isEmpty.filter(isEmpty => isEmpty).length === isEmpty.length;
        }
        if (item && !item.children && isEmpty) {
          parentChildren.splice(index, 1);
          removeEmptyParent(items, 1);
        }
      });
    }
    const fillHeaderInfo = function (info, viewHeaderItems, depthSize, isHorizontal, isTree) {
      let lastIndex = 0;
      let index;
      let depth;
      const indexesByDepth = [0];
      (0, _m_widget_utils.foreachTree)(viewHeaderItems, items => {
        const headerItem = items[0];
        depth = headerItem.isMetric ? depthSize : items.length - 1;
        while (indexesByDepth.length - 1 < depth) {
          indexesByDepth.push(indexesByDepth[indexesByDepth.length - 1]);
        }
        index = indexesByDepth[depth] || 0;
        lastIndex = addInfoItem(info, {
          headerItem,
          index,
          lastIndex,
          depth,
          isHorizontal,
          isTree
        });
        indexesByDepth.length = depth;
        indexesByDepth.push(lastIndex);
      });
    };
    return function (headerItems, headerDescriptions, cellDescriptions, isHorizontal, options) {
      const info = [];
      const depthSize = getHeaderItemsDepth(headerItems) || 1;
      // @ts-expect-error
      const d = new _deferred.Deferred();
      getViewHeaderItems(headerItems, headerDescriptions, cellDescriptions, depthSize, options).done(viewHeaderItems => {
        fillHeaderInfo(info, viewHeaderItems, depthSize, isHorizontal, options.layout === 'tree');
        options.notifyProgress(1);
        d.resolve(info);
      });
      return d;
    };
  }();
  function createSortPaths(headerFields, dataFields) {
    const sortBySummaryPaths = [];
    (0, _iterator.each)(headerFields, (_, headerField) => {
      const fieldIndex = (0, _m_widget_utils.findField)(dataFields, headerField.sortBySummaryField);
      if (fieldIndex >= 0) {
        sortBySummaryPaths.push((headerField.sortBySummaryPath || []).concat([fieldIndex]));
      }
    });
    return sortBySummaryPaths;
  }
  function foreachRowInfo(rowsInfo, callback) {
    let columnOffset = 0;
    const columnOffsetResetIndexes = [];
    for (let i = 0; i < rowsInfo.length; i += 1) {
      for (let j = 0; j < rowsInfo[i].length; j += 1) {
        const rowSpanOffset = (rowsInfo[i][j].rowspan || 1) - 1;
        const visibleIndex = i + rowSpanOffset;
        if (columnOffsetResetIndexes[i]) {
          columnOffset -= columnOffsetResetIndexes[i];
          columnOffsetResetIndexes[i] = 0;
        }
        if (callback(rowsInfo[i][j], visibleIndex, i, j, columnOffset) === false) {
          break;
        }
        columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] = (columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] || 0) + 1;
        columnOffset += 1;
      }
    }
  }
  function createCellsInfo(rowsInfo, columnsInfo, data, dataFields, dataFieldArea, errorText) {
    const info = [];
    const dataFieldAreaInRows = dataFieldArea === 'row';
    const dataSourceCells = data.values;
    dataSourceCells.length && foreachRowInfo(rowsInfo, (rowInfo, rowIndex) => {
      const row = info[rowIndex] = [];
      const dataRow = dataSourceCells[rowInfo.dataSourceIndex >= 0 ? rowInfo.dataSourceIndex : data.grandTotalRowIndex] || [];
      rowInfo.isLast && (0, _m_virtual_columns_core.foreachColumnInfo)(columnsInfo, (columnInfo, columnIndex) => {
        const dataIndex = (dataFieldAreaInRows ? rowInfo.dataIndex : columnInfo.dataIndex) || 0;
        const dataField = dataFields[dataIndex];
        if (columnInfo.isLast && dataField && dataField.visible !== false) {
          let cell = dataRow[columnInfo.dataSourceIndex >= 0 ? columnInfo.dataSourceIndex : data.grandTotalColumnIndex];
          if (!Array.isArray(cell)) {
            cell = [cell];
          }
          const cellValue = cell[dataIndex];
          row[columnIndex] = {
            text: formatCellValue(cellValue, dataField, errorText),
            value: cellValue,
            format: dataField.format,
            dataType: dataField.dataType,
            columnType: columnInfo.type,
            rowType: rowInfo.type,
            rowPath: rowInfo.path || [],
            columnPath: columnInfo.path || [],
            dataIndex
          };
          if (dataField.width) {
            row[columnIndex].width = dataField.width;
          }
        }
      });
    });
    return info;
  }
  function getHeaderIndexedItems(headerItems, options) {
    let visibleIndex = 0;
    const indexedItems = [];
    (0, _m_widget_utils.foreachTree)(headerItems, items => {
      const headerItem = items[0];
      const path = (0, _m_widget_utils.createPath)(items);
      if (headerItem.children && options.showTotals === false) return;
      const indexedItem = (0, _extend.extend)(true, {}, headerItem, {
        visibleIndex: visibleIndex += 1,
        path
      });
      if ((0, _type.isDefined)(indexedItem.index)) {
        indexedItems[indexedItem.index] = indexedItem;
      } else {
        indexedItems.push(indexedItem);
      }
    });
    return indexedItems;
  }
  function createScrollController(dataController, component, dataAdapter) {
    return new _m_virtual_scrolling_core.default.VirtualScrollController(component, (0, _extend.extend)({
      hasKnownLastPage() {
        return true;
      },
      pageCount() {
        return math.ceil(this.totalItemsCount() / this.pageSize());
      },
      updateLoading() {},
      itemsCount() {
        if (this.pageIndex() < this.pageCount() - 1) {
          return this.pageSize();
        }
        return this.totalItemsCount() % this.pageSize();
      },
      items() {
        return [];
      },
      viewportItems() {
        return [];
      },
      onChanged() {},
      isLoading() {
        return dataController.isLoading();
      },
      changingDuration() {
        const dataSource = dataController._dataSource;
        if (dataSource.paginate()) {
          return CHANGING_DURATION_IF_PAGINATE;
        }
        return dataController._changingDuration || 0;
      }
    }, dataAdapter));
  }
  function getHiddenTotals(dataFields) {
    const result = [];
    (0, _iterator.each)(dataFields, (index, field) => {
      if (field.showTotals === false) {
        result.push(index);
      }
    });
    return result;
  }
  function getHiddenValues(dataFields) {
    const result = [];
    dataFields.forEach((field, index) => {
      if (field.showValues === undefined && field.showTotals === false || field.showValues === false) {
        result.push(index);
      }
    });
    return result;
  }
  function getHiddenGrandTotalsTotals(dataFields, columnFields) {
    let result = [];
    (0, _iterator.each)(dataFields, (index, field) => {
      if (field.showGrandTotals === false) {
        result.push(index);
      }
    });
    if (columnFields.length === 0 && result.length === dataFields.length) {
      result = [];
    }
    return result;
  }
  const members = {
    ctor(options) {
      const that = this;
      const virtualScrollControllerChanged = that._fireChanged.bind(that);
      options = that._options = options || {};
      that.dataSourceChanged = (0, _callbacks.default)();
      that._dataSource = that._createDataSource(options);
      if (options.component && options.component.option('scrolling.mode') === 'virtual') {
        that._rowsScrollController = createScrollController(that, options.component, {
          totalItemsCount() {
            return that.totalRowCount();
          },
          pageIndex(index) {
            return that.rowPageIndex(index);
          },
          pageSize() {
            return that.rowPageSize();
          },
          load() {
            if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
              that._rowsScrollController.pageIndex(this.pageCount() - 1);
            }
            return that._rowsScrollController.handleDataChanged(function () {
              if (that._dataSource.paginate()) {
                that._dataSource.load();
              } else {
                // - @ts-expect-error
                virtualScrollControllerChanged.apply(this, arguments);
              }
            });
          }
        });
        that._columnsScrollController = createScrollController(that, options.component, {
          totalItemsCount() {
            return that.totalColumnCount();
          },
          pageIndex(index) {
            return that.columnPageIndex(index);
          },
          pageSize() {
            return that.columnPageSize();
          },
          load() {
            if (that._columnsScrollController.pageIndex() >= this.pageCount()) {
              that._columnsScrollController.pageIndex(this.pageCount() - 1);
            }
            return that._columnsScrollController.handleDataChanged(function () {
              if (that._dataSource.paginate()) {
                that._dataSource.load();
              } else {
                // - @ts-expect-error
                virtualScrollControllerChanged.apply(this, arguments);
              }
            });
          }
        });
      }
      that._stateStoringController = new _m_state_storing_core.default.StateStoringController(options.component).init();
      that._columnsInfo = [];
      that._rowsInfo = [];
      that._cellsInfo = [];
      that.expandValueChanging = (0, _callbacks.default)();
      that.loadingChanged = (0, _callbacks.default)();
      that.progressChanged = (0, _callbacks.default)();
      that.scrollChanged = (0, _callbacks.default)();
      that.load();
      that._update();
      that.changed = (0, _callbacks.default)();
    },
    _fireChanged() {
      const that = this;
      const startChanging = new Date();
      that.changed && !that._lockChanged && that.changed.fire();
      that._changingDuration = new Date() - startChanging;
    },
    _correctSkipsTakes(rowIndex, rowSkip, rowSpan, levels, skips, takes) {
      const endIndex = rowSpan ? rowIndex + rowSpan - 1 : rowIndex;
      skips[levels.length] = skips[levels.length] || 0;
      takes[levels.length] = takes[levels.length] || 0;
      if (endIndex < rowSkip) {
        skips[levels.length] += 1;
      } else {
        takes[levels.length] += 1;
      }
    },
    _calculatePagingForRowExpandedPaths(options, skips, takes, rowExpandedSkips, rowExpandedTakes) {
      const rows = this._rowsInfo;
      const rowCount = Math.min(options.rowSkip + options.rowTake, rows.length);
      const {
        rowExpandedPaths
      } = options;
      let levels = [];
      const expandedPathIndexes = {};
      let i;
      let j;
      let path;
      rowExpandedPaths.forEach((path, index) => {
        expandedPathIndexes[path] = index;
      });
      for (i = 0; i < rowCount; i += 1) {
        takes.length = skips.length = levels.length + 1;
        for (j = 0; j < rows[i].length; j += 1) {
          const cell = rows[i][j];
          if (cell.type === 'D') {
            this._correctSkipsTakes(i, options.rowSkip, cell.rowspan, levels, skips, takes);
            path = cell.path || path;
            const expandIndex = path && path.length > 1 ? expandedPathIndexes[path.slice(0, -1)] : -1;
            if (expandIndex >= 0) {
              rowExpandedSkips[expandIndex] = skips[levels.length] || 0;
              rowExpandedTakes[expandIndex] = takes[levels.length] || 0;
            }
            if (cell.rowspan) {
              levels.push(cell.rowspan);
            }
          }
        }
        levels = levels.map(level => level - 1).filter(level => level > 0);
      }
    },
    _calculatePagingForColumnExpandedPaths(options, skips, takes, expandedSkips, expandedTakes) {
      const skipByPath = {};
      const takeByPath = {};
      (0, _m_virtual_columns_core.foreachColumnInfo)(this._columnsInfo, (columnInfo, columnIndex) => {
        if (columnInfo.type === 'D' && columnInfo.path && columnInfo.dataIndex === undefined) {
          const colspan = columnInfo.colspan || 1;
          const path = columnInfo.path.slice(0, -1).toString();
          skipByPath[path] = skipByPath[path] || 0;
          takeByPath[path] = takeByPath[path] || 0;
          if (columnIndex + colspan <= options.columnSkip) {
            skipByPath[path] += 1;
          } else if (columnIndex < options.columnSkip + options.columnTake) {
            takeByPath[path] += 1;
          }
        }
      });
      skips[0] = skipByPath[''];
      takes[0] = takeByPath[''];
      options.columnExpandedPaths.forEach((path, index) => {
        const skip = skipByPath[path];
        const take = takeByPath[path];
        if (skip !== undefined) {
          expandedSkips[index] = skip;
        }
        if (take !== undefined) {
          expandedTakes[index] = take;
        }
      });
    },
    _processPagingForExpandedPaths(options, area, storeLoadOptions, reload) {
      const expandedPaths = options[`${area}ExpandedPaths`];
      const expandedSkips = expandedPaths.map(() => 0);
      const expandedTakes = expandedPaths.map(() => reload ? options.pageSize : 0);
      const skips = [];
      const takes = [];
      if (!reload) {
        if (area === 'row') {
          this._calculatePagingForRowExpandedPaths(options, skips, takes, expandedSkips, expandedTakes);
        } else {
          this._calculatePagingForColumnExpandedPaths(options, skips, takes, expandedSkips, expandedTakes);
        }
      }
      this._savePagingForExpandedPaths(options, area, storeLoadOptions, skips[0], takes[0], expandedSkips, expandedTakes);
    },
    _savePagingForExpandedPaths(options, area, storeLoadOptions, skip, take, expandedSkips, expandedTakes) {
      const expandedPaths = options[`${area}ExpandedPaths`];
      options[`${area}ExpandedPaths`] = [];
      options[`${area}Skip`] = skip !== undefined ? skip : options[`${area}Skip`];
      options[`${area}Take`] = take !== undefined ? take : options[`${area}Take`];
      for (let i = 0; i < expandedPaths.length; i += 1) {
        if (expandedTakes[i]) {
          const isOppositeArea = options.area && options.area !== area;
          storeLoadOptions.push((0, _extend.extend)({
            area,
            headerName: `${area}s`
          }, options, {
            [`${area}Skip`]: expandedSkips[i],
            [`${area}Take`]: expandedTakes[i],
            [isOppositeArea ? 'oppositePath' : 'path']: expandedPaths[i]
          }));
        }
      }
    },
    _handleCustomizeStoreLoadOptions(storeLoadOptions, reload) {
      const options = storeLoadOptions[0];
      const rowsScrollController = this._rowsScrollController;
      if (this._dataSource.paginate() && rowsScrollController) {
        const rowPageSize = rowsScrollController.pageSize();
        if (options.headerName === 'rows') {
          options.rowSkip = 0;
          options.rowTake = rowPageSize;
          options.rowExpandedPaths = [];
        } else {
          options.rowSkip = rowsScrollController.beginPageIndex() * rowPageSize;
          options.rowTake = (rowsScrollController.endPageIndex() - rowsScrollController.beginPageIndex() + 1) * rowPageSize;
          this._processPagingForExpandedPaths(options, 'row', storeLoadOptions, reload);
        }
      }
      const columnsScrollController = this._columnsScrollController;
      if (this._dataSource.paginate() && columnsScrollController) {
        const columnPageSize = columnsScrollController.pageSize();
        storeLoadOptions.forEach(options => {
          if (options.headerName === 'columns') {
            options.columnSkip = 0;
            options.columnTake = columnPageSize;
            options.columnExpandedPaths = [];
          } else {
            options.columnSkip = columnsScrollController.beginPageIndex() * columnPageSize;
            options.columnTake = (columnsScrollController.endPageIndex() - columnsScrollController.beginPageIndex() + 1) * columnPageSize;
            this._processPagingForExpandedPaths(options, 'column', storeLoadOptions, reload);
          }
        });
      }
    },
    load() {
      const that = this;
      const stateStoringController = this._stateStoringController;
      if (stateStoringController.isEnabled() && !stateStoringController.isLoaded()) {
        stateStoringController.load().always(state => {
          if (state) {
            that._dataSource.state(state);
          } else {
            that._dataSource.load();
          }
        });
      } else {
        that._dataSource.load();
      }
    },
    calculateVirtualContentParams(contentParams) {
      const that = this;
      const rowsScrollController = that._rowsScrollController;
      const columnsScrollController = that._columnsScrollController;
      if (rowsScrollController && columnsScrollController) {
        rowsScrollController.viewportItemSize(contentParams.virtualRowHeight);
        rowsScrollController.viewportSize(contentParams.viewportHeight / rowsScrollController.viewportItemSize());
        rowsScrollController.setContentItemSizes(contentParams.itemHeights);
        columnsScrollController.viewportItemSize(contentParams.virtualColumnWidth);
        columnsScrollController.viewportSize(contentParams.viewportWidth / columnsScrollController.viewportItemSize());
        columnsScrollController.setContentItemSizes(contentParams.itemWidths);
        (0, _common.deferUpdate)(() => {
          columnsScrollController.loadIfNeed();
          rowsScrollController.loadIfNeed();
        });
        that.scrollChanged.fire({
          left: columnsScrollController.getViewportPosition(),
          top: rowsScrollController.getViewportPosition()
        });
        return {
          contentTop: rowsScrollController.getContentOffset(),
          contentLeft: columnsScrollController.getContentOffset(),
          width: columnsScrollController.getVirtualContentSize(),
          height: rowsScrollController.getVirtualContentSize()
        };
      }
      return undefined;
    },
    setViewportPosition(left, top) {
      this._rowsScrollController.setViewportPosition(top || 0);
      this._columnsScrollController.setViewportPosition(left || 0);
    },
    subscribeToWindowScrollEvents($element) {
      var _this$_rowsScrollCont;
      (_this$_rowsScrollCont = this._rowsScrollController) === null || _this$_rowsScrollCont === void 0 || _this$_rowsScrollCont.subscribeToWindowScrollEvents($element);
    },
    updateWindowScrollPosition(position) {
      var _this$_rowsScrollCont2;
      (_this$_rowsScrollCont2 = this._rowsScrollController) === null || _this$_rowsScrollCont2 === void 0 || _this$_rowsScrollCont2.scrollTo(position);
    },
    updateViewOptions(options) {
      (0, _extend.extend)(this._options, options);
      this._update();
    },
    _handleExpandValueChanging(e) {
      this.expandValueChanging.fire(e);
    },
    _handleLoadingChanged(isLoading) {
      this.loadingChanged.fire(isLoading);
    },
    _handleProgressChanged(progress) {
      this.progressChanged.fire(progress);
    },
    _handleFieldsPrepared(e) {
      var _this$_options$onFiel, _this$_options;
      (_this$_options$onFiel = (_this$_options = this._options).onFieldsPrepared) === null || _this$_options$onFiel === void 0 || _this$_options$onFiel.call(_this$_options, e);
    },
    _createDataSource(options) {
      const that = this;
      const dataSourceOptions = options.dataSource;
      let dataSource;
      that._isSharedDataSource = dataSourceOptions instanceof _m_data_source.PivotGridDataSource;
      if (that._isSharedDataSource) {
        dataSource = dataSourceOptions;
      } else {
        dataSource = new _m_data_source.PivotGridDataSource(dataSourceOptions);
      }
      that._expandValueChangingHandler = that._handleExpandValueChanging.bind(that);
      that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
      that._fieldsPreparedHandler = that._handleFieldsPrepared.bind(that);
      that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
      that._changedHandler = function () {
        that._update();
        that.dataSourceChanged.fire();
      };
      that._progressChangedHandler = function (progress) {
        that._handleProgressChanged(progress * 0.8);
      };
      dataSource.on('changed', that._changedHandler);
      dataSource.on('expandValueChanging', that._expandValueChangingHandler);
      dataSource.on('loadingChanged', that._loadingChangedHandler);
      dataSource.on('progressChanged', that._progressChangedHandler);
      dataSource.on('fieldsPrepared', that._fieldsPreparedHandler);
      dataSource.on('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
      return dataSource;
    },
    getDataSource() {
      return this._dataSource;
    },
    isLoading() {
      return this._dataSource.isLoading();
    },
    beginLoading() {
      this._dataSource.beginLoading();
    },
    endLoading() {
      this._dataSource.endLoading();
    },
    _update() {
      const that = this;
      const dataSource = that._dataSource;
      const options = that._options;
      const columnFields = dataSource.getAreaFields('column');
      const rowFields = dataSource.getAreaFields('row');
      const dataFields = dataSource.getAreaFields('data');
      const dataFieldsForRows = options.dataFieldArea === 'row' ? dataFields : [];
      const dataFieldsForColumns = options.dataFieldArea !== 'row' ? dataFields : [];
      const data = dataSource.getData();
      const hiddenTotals = getHiddenTotals(dataFields);
      const hiddenValues = getHiddenValues(dataFields);
      const hiddenGrandTotals = getHiddenGrandTotalsTotals(dataFields, columnFields);
      const grandTotalsAreHiddenForNotAllDataFields = dataFields.length > 0 ? hiddenGrandTotals.length !== dataFields.length : true;
      const commonOptions = {
        texts: options.texts || {},
        hiddenTotals,
        hiddenValues,
        hiddenGrandTotals,
        showEmpty: !options.hideEmptySummaryCells,
        dataFields,
        progress: 0
      };
      const rowOptions = (0, _extend.extend)({}, commonOptions, {
        isEmptyGrandTotal: data.isEmptyGrandTotalRow,
        showTotals: options.showRowTotals,
        showTotalsPrior: options.showTotalsPrior === 'rows' || options.showTotalsPrior === 'both',
        showGrandTotals: options.showRowGrandTotals !== false && grandTotalsAreHiddenForNotAllDataFields,
        sortBySummaryPaths: createSortPaths(columnFields, dataFields),
        layout: options.rowHeaderLayout,
        fields: rowFields
      });
      const columnOptions = (0, _extend.extend)({}, commonOptions, {
        isEmptyGrandTotal: data.isEmptyGrandTotalColumn,
        showTotals: options.showColumnTotals,
        showTotalsPrior: options.showTotalsPrior === 'columns' || options.showTotalsPrior === 'both',
        showGrandTotals: options.showColumnGrandTotals !== false && grandTotalsAreHiddenForNotAllDataFields,
        sortBySummaryPaths: createSortPaths(rowFields, dataFields),
        fields: columnFields
      });
      const notifyProgress = function (progress) {
        // - @ts-expect-error
        this.progress = progress;
        that._handleProgressChanged(0.8 + 0.1 * rowOptions.progress + 0.1 * columnOptions.progress);
      };
      rowOptions.notifyProgress = notifyProgress;
      columnOptions.notifyProgress = notifyProgress;
      if (!(0, _type.isDefined)(data.grandTotalRowIndex)) {
        data.grandTotalRowIndex = getHeaderIndexedItems(data.rows, rowOptions).length;
      }
      if (!(0, _type.isDefined)(data.grandTotalColumnIndex)) {
        data.grandTotalColumnIndex = getHeaderIndexedItems(data.columns, columnOptions).length;
      }
      dataSource._changeLoadingCount(1);
      (0, _deferred.when)(createHeaderInfo(data.columns, columnFields, dataFieldsForColumns, true, columnOptions), createHeaderInfo(data.rows, rowFields, dataFieldsForRows, false, rowOptions)).always(() => {
        dataSource._changeLoadingCount(-1);
      }).done((columnsInfo, rowsInfo) => {
        that._columnsInfo = columnsInfo;
        that._rowsInfo = rowsInfo;
        if (that._rowsScrollController && that._columnsScrollController && that.changed && !that._dataSource.paginate()) {
          that._rowsScrollController.reset(true);
          that._columnsScrollController.reset(true);
          that._lockChanged = true;
          that._rowsScrollController.load();
          that._columnsScrollController.load();
          that._lockChanged = false;
        }
      }).done(() => {
        that._fireChanged();
        if (that._stateStoringController.isEnabled() && !that._dataSource.isLoading()) {
          that._stateStoringController.state(that._dataSource.state());
          that._stateStoringController.save();
        }
      });
    },
    getRowsInfo(getAllData) {
      const that = this;
      const rowsInfo = that._rowsInfo;
      const scrollController = that._rowsScrollController;
      let rowspan;
      const isOnePredefinedRow = rowsInfo.length === 1 && (!rowsInfo[0].type || rowsInfo[0].type === GRAND_TOTAL_TYPE);
      if (scrollController && !getAllData && !isOnePredefinedRow) {
        const startIndex = scrollController.beginPageIndex() * that.rowPageSize();
        const endIndex = scrollController.endPageIndex() * that.rowPageSize() + that.rowPageSize();
        const summaryFields = that._dataSource.getSummaryFields();
        const isRowDataFieldArea = this._options.dataFieldArea === 'row';
        const newRowsInfo = [];
        let maxDepth = 1;
        foreachRowInfo(rowsInfo, (rowInfo, visibleIndex, rowIndex, _, columnIndex) => {
          const isVisible = visibleIndex >= startIndex && rowIndex < endIndex;
          const index = rowIndex < startIndex ? 0 : rowIndex - startIndex;
          let cell = rowInfo;
          if (isVisible) {
            newRowsInfo[index] = newRowsInfo[index] || [];
            rowspan = rowIndex < startIndex ? rowInfo.rowspan - (startIndex - rowIndex) || 1 : rowInfo.rowspan;
            if (startIndex + index + rowspan > endIndex) {
              rowspan = endIndex - (index + startIndex) || 1;
            }
            if (rowspan !== rowInfo.rowspan) {
              cell = (0, _extend.extend)({}, cell, {
                rowspan
              });
            }
            newRowsInfo[index].push(cell);
            const isSummaryCell = summaryFields.some(field => field.caption === cell.text);
            if (!isRowDataFieldArea || !isSummaryCell) {
              maxDepth = math.max(maxDepth, columnIndex + 1);
            }
          } else {
            return false;
          }
          return undefined;
        });
        foreachRowInfo(newRowsInfo,
        // - @ts-expect-error
        (rowInfo, visibleIndex, rowIndex, columnIndex, realColumnIndex) => {
          const colspan = rowInfo.colspan || 1;
          if (realColumnIndex + colspan > maxDepth) {
            newRowsInfo[rowIndex][columnIndex] = (0, _extend.extend)({}, rowInfo, {
              colspan: maxDepth - realColumnIndex || 1
            });
          }
        });
        return newRowsInfo;
      }
      return rowsInfo;
    },
    getColumnsInfo(getAllData) {
      const that = this;
      let info = that._columnsInfo;
      const scrollController = that._columnsScrollController;
      if (scrollController && !getAllData) {
        const startIndex = scrollController.beginPageIndex() * that.columnPageSize();
        const endIndex = scrollController.endPageIndex() * that.columnPageSize() + that.columnPageSize();
        info = (0, _m_virtual_columns_core.createColumnsInfo)(info, startIndex, endIndex);
      }
      return info;
    },
    totalRowCount() {
      return this._rowsInfo.length;
    },
    rowPageIndex(index) {
      if (index !== undefined) {
        this._rowPageIndex = index;
      }
      return this._rowPageIndex || 0;
    },
    totalColumnCount() {
      var _this$_columnsInfo;
      let count = 0;
      if ((_this$_columnsInfo = this._columnsInfo) !== null && _this$_columnsInfo !== void 0 && _this$_columnsInfo.length) {
        for (let i = 0; i < this._columnsInfo[0].length; i += 1) {
          count += this._columnsInfo[0][i].colspan || 1;
        }
      }
      return count;
    },
    rowPageSize(size) {
      if (size !== undefined) {
        this._rowPageSize = size;
      }
      return this._rowPageSize || 20;
    },
    columnPageSize(size) {
      if (size !== undefined) {
        this._columnPageSize = size;
      }
      return this._columnPageSize || 20;
    },
    columnPageIndex(index) {
      if (index !== undefined) {
        this._columnPageIndex = index;
      }
      return this._columnPageIndex || 0;
    },
    getCellsInfo(getAllData) {
      const rowsInfo = this.getRowsInfo(getAllData);
      const columnsInfo = this.getColumnsInfo(getAllData);
      const data = this._dataSource.getData();
      const texts = this._options.texts || {};
      return createCellsInfo(rowsInfo, columnsInfo, data, this._dataSource.getAreaFields('data'), this._options.dataFieldArea, texts.dataNotAvailable);
    },
    dispose() {
      var _that$_columnsScrollC, _that$_rowsScrollCont;
      const that = this;
      if (that._isSharedDataSource) {
        that._dataSource.off('changed', that._changedHandler);
        that._dataSource.off('expandValueChanging', that._expandValueChangingHandler);
        that._dataSource.off('loadingChanged', that._loadingChangedHandler);
        that._dataSource.off('progressChanged', that._progressChangedHandler);
        that._dataSource.off('fieldsPrepared', that._fieldsPreparedHandler);
        that._dataSource.off('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
      } else {
        that._dataSource.dispose();
      }
      (_that$_columnsScrollC = that._columnsScrollController) === null || _that$_columnsScrollC === void 0 || _that$_columnsScrollC.dispose();
      (_that$_rowsScrollCont = that._rowsScrollController) === null || _that$_rowsScrollCont === void 0 || _that$_rowsScrollCont.dispose();
      that._stateStoringController.dispose();
      that.expandValueChanging.empty();
      that.changed.empty();
      that.loadingChanged.empty();
      that.progressChanged.empty();
      that.scrollChanged.empty();
      that.dataSourceChanged.empty();
    }
  };
  proxyMethod(members, 'applyPartialDataSource');
  proxyMethod(members, 'collapseHeaderItem');
  proxyMethod(members, 'expandHeaderItem');
  proxyMethod(members, 'getData');
  proxyMethod(members, 'isEmpty');
  return members;
}());
// eslint-disable-next-line @typescript-eslint/naming-convention
const DataController__internals = exports.DataController__internals = {
  NO_DATA_AVAILABLE_TEXT: NOT_AVAILABLE
};
var _default = exports.default = {
  DataController,
  DataController__internals
};
