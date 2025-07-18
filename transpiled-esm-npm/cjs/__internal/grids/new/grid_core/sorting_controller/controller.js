"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortingController = void 0;
var _signalsCore = require("@preact/signals-core");
var _index = require("../columns_controller/index");
var _utils = require("../columns_controller/utils");
var _options_controller = require("../options_controller/options_controller");
var _utils2 = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class SortingController {
  constructor(options, columnsController) {
    // TODO: Resolve the nested update issue
    this.options = options;
    this.columnsController = columnsController;
    this.ascendingText = this.options.oneWay('sorting.ascendingText');
    this.clearText = this.options.oneWay('sorting.clearText');
    this.descendingText = this.options.oneWay('sorting.descendingText');
    this.mode = this.options.oneWay('sorting.mode');
    this._showSortIndexes = this.options.oneWay('sorting.showSortIndexes');
    this.sortedColumns = (0, _signalsCore.computed)(() => this.columnsController.visibleColumns.value.filter(column => column.sortOrder));
    this.orderedSortedColumns = (0, _signalsCore.computed)(() => {
      const columns = this.sortedColumns.value;
      const mode = this.mode.value;
      const result = columns.sort(_utils2.sortOrderDelegate);
      if (mode !== 'multiple' && this.areColumnsInitialized) {
        return result;
      }
      if (!this.areColumnsInitialized) {
        this.areColumnsInitialized = true;
        result.forEach((col, idx) => {
          this.columnsController.columnOption(col, 'sortIndex', idx);
        });
      }
      return result;
    });
    this.showSortIndexes = (0, _signalsCore.computed)(() => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _showSortIndexes = this._showSortIndexes.value;
      const sortedColumns = this.sortedColumns.value;
      if (!_showSortIndexes) {
        return _showSortIndexes;
      }
      return sortedColumns.length > 1;
    });
    this.sortParameters = (0, _signalsCore.computed)(() => {
      const columns = this.orderedSortedColumns.value;
      const result = [];
      columns.forEach(c => {
        const sortItem = {
          selector: c.calculateSortValue ?? c.dataField ?? c.selector,
          desc: c.sortOrder === 'desc'
        };
        if (c.sortingMethod) {
          sortItem.compare = c.sortingMethod.bind(c);
        }
        result.push(sortItem);
      });
      return result;
    });
    this.areColumnsInitialized = false;
    // const updateOrderedSortedColumns = (
    //   orderedSortedColumns: Column[],
    //   mode: SingleMultipleOrNone,
    // ): void => {
    //   const needChanges = !this.areColumnsInitialized || mode === 'multiple';
    //   if (!needChanges) {
    //     return;
    //   }
    //   this.areColumnsInitialized = true;
    //   let counter = 0;
    //   orderedSortedColumns.forEach((c) => {
    //     this.columnsController.columnOption(c, 'sortIndex', counter);
    //     counter += 1;
    //     return c;
    //   });
    // };
    // effect(
    //   updateOrderedSortedColumns,
    //   [this.orderedSortedColumns, this.mode],
    // );
  }
  clearSorting() {
    this.columnsController.updateColumns(columns => columns.map(c => {
      delete c.sortOrder;
      delete c.sortIndex;
      return c;
    }));
  }
  onSingleModeSortClick(column, e) {
    if (!column.allowSorting) {
      return;
    }
    const isCtrl = e.ctrlKey || e.metaKey;
    const isClearSorting = !!column.sortOrder && isCtrl;
    if (isClearSorting) {
      this.clearSorting();
      return;
    }
    const isClearSortingRequired = !column.sortOrder && !isCtrl || this.sortedColumns.peek().length > 1;
    const nextSortOrder = (0, _utils2.getNextSortOrder)(column.sortOrder, isCtrl);
    this.onSingleModeSortCore(column, isClearSortingRequired, nextSortOrder);
  }
  onSingleModeSortCore(column, isClearSortingRequired, nextSortOrder) {
    (0, _signalsCore.batch)(() => {
      if (isClearSortingRequired) {
        this.clearSorting();
      }
      this.columnsController.columnOption(column, 'sortOrder', nextSortOrder);
    });
  }
  onMultipleModeSortClick(column, e) {
    if (!column.allowSorting) {
      return;
    }
    const isCtrl = e.ctrlKey || e.metaKey;
    const hasNothingToChange = !column.sortOrder && isCtrl && !e.shiftKey;
    if (hasNothingToChange) {
      return;
    }
    const nextSortOrder = (0, _utils2.getNextSortOrder)(column.sortOrder, isCtrl);
    const isClearSortingRequired = !isCtrl && !e.shiftKey;
    this.onMultipleModeSortCore(column, isClearSortingRequired, nextSortOrder);
  }
  onMultipleModeSortCore(column, isClearSortingRequired, nextSortOrder) {
    (0, _signalsCore.batch)(() => {
      if (isClearSortingRequired) {
        this.clearSorting();
      }
      // TODO: Resolve the nested update issue
      // this.columnsController.columnOption(column, 'sortOrder', nextSortOrder);
      this.updateColumnSortOrder(column, nextSortOrder);
    });
  }
  updateColumnSortOrder(column, nextSortOrder) {
    const needChanges = this.mode.peek() === 'multiple';
    if (!needChanges) {
      return;
    }
    this.columnsController.updateColumns(columns => {
      const newColumns = [...columns];
      let needNormalizing = false;
      const orderedSortedColumns = this.orderedSortedColumns.peek();
      const orderedIndex = (0, _utils.getColumnIndexByName)(orderedSortedColumns, column.name);
      const commonIndex = (0, _utils.getColumnIndexByName)(newColumns, column.name);
      newColumns[commonIndex].sortOrder = nextSortOrder;
      if (!!nextSortOrder && orderedIndex === -1) {
        orderedSortedColumns.push(newColumns[commonIndex]);
        needNormalizing = true;
      }
      if (!nextSortOrder && orderedIndex > -1) {
        delete newColumns[commonIndex].sortOrder;
        delete newColumns[commonIndex].sortIndex;
        orderedSortedColumns.splice(orderedIndex, 1);
        needNormalizing = true;
      }
      if (needNormalizing) {
        let counter = 0;
        orderedSortedColumns.forEach(c => {
          const index = (0, _utils.getColumnIndexByName)(newColumns, c.name);
          if (newColumns[index].sortIndex !== counter) {
            newColumns[index] = _extends({}, newColumns[index], {
              sortIndex: counter
            });
          }
          counter += 1;
        });
      }
      return newColumns;
    });
  }
}
exports.SortingController = SortingController;
SortingController.dependencies = [_options_controller.OptionsController, _index.ColumnsController];