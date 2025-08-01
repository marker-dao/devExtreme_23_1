/**
* DevExtreme (esm/__internal/grids/grid_core/master_detail/m_master_detail.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
// @ts-expect-error
import { grep } from '../../../../core/utils/common';
import { Deferred, when } from '../../../../core/utils/deferred';
import { each } from '../../../../core/utils/iterator';
import { getHeight, getWidth } from '../../../../core/utils/size';
import { isDefined } from '../../../../core/utils/type';
import gridCoreUtils from '../m_utils';
const MASTER_DETAIL_CELL_CLASS = 'dx-master-detail-cell';
const MASTER_DETAIL_ROW_CLASS = 'dx-master-detail-row';
const CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
const ROW_LINES_CLASS = 'dx-row-lines';
const columns = Base => class ColumnsMasterDetailExtender extends Base {
  _getExpandColumnsCore() {
    const expandColumns = super._getExpandColumnsCore();
    if (this.option('masterDetail.enabled')) {
      expandColumns.push({
        type: 'detailExpand',
        cellTemplate: gridCoreUtils.getExpandCellTemplate()
      });
    }
    return expandColumns;
  }
};
const initMasterDetail = function (that) {
  that._expandedItems = [];
  that._isExpandAll = that.option('masterDetail.autoExpandAll');
};
export const dataMasterDetailExtenderMixin = Base => class DataMasterDetailExtender extends Base {
  init() {
    const that = this;
    initMasterDetail(that);
    super.init();
  }
  expandAll(groupIndex) {
    const that = this;
    if (groupIndex < 0) {
      that._isExpandAll = true;
      that._expandedItems = [];
      that.updateItems();
    } else {
      // @ts-expect-error
      super.expandAll.apply(that, arguments);
    }
  }
  collapseAll(groupIndex) {
    const that = this;
    if (groupIndex < 0) {
      that._isExpandAll = false;
      that._expandedItems = [];
      that.updateItems();
    } else {
      // @ts-expect-error
      super.collapseAll.apply(that, arguments);
    }
  }
  isRowExpandedHack() {
    // @ts-expect-error
    return super.isRowExpanded.apply(this, arguments);
  }
  isRowExpanded(key) {
    const that = this;
    const expandIndex = gridCoreUtils.getIndexByKey(key, that._expandedItems);
    if (Array.isArray(key)) {
      // @ts-expect-error
      return super.isRowExpanded.apply(that, arguments);
    }
    return !!(that._isExpandAll ^ (expandIndex >= 0 && that._expandedItems[expandIndex].visible));
  }
  _getRowIndicesForExpand(key) {
    const rowIndex = this.getRowIndexByKey(key);
    return [rowIndex, rowIndex + 1];
  }
  _changeRowExpandCore(key) {
    const that = this;
    let result;
    if (Array.isArray(key)) {
      // @ts-expect-error
      result = super._changeRowExpandCore.apply(that, arguments);
    } else {
      const expandIndex = gridCoreUtils.getIndexByKey(key, that._expandedItems);
      if (expandIndex >= 0) {
        const {
          visible
        } = that._expandedItems[expandIndex];
        that._expandedItems[expandIndex].visible = !visible;
      } else {
        that._expandedItems.push({
          key,
          visible: true
        });
      }
      that.updateItems({
        changeType: 'update',
        rowIndices: that._getRowIndicesForExpand(key)
      });
      // @ts-expect-error
      result = new Deferred().resolve();
    }
    return result;
  }
  _processDataItemHack() {
    return super._processDataItem.apply(this, arguments);
  }
  _processDataItem(data, options) {
    const that = this;
    const dataItem = super._processDataItem.apply(that, arguments);
    dataItem.isExpanded = that.isRowExpanded(dataItem.key);
    if (options.detailColumnIndex === undefined) {
      options.detailColumnIndex = -1;
      each(options.visibleColumns, (index, column) => {
        if (column.command === 'expand' && !isDefined(column.groupIndex)) {
          options.detailColumnIndex = index;
          return false;
        }
        return undefined;
      });
    }
    if (options.detailColumnIndex >= 0) {
      dataItem.values[options.detailColumnIndex] = dataItem.isExpanded;
    }
    return dataItem;
  }
  _processItemsHack() {
    return super._processItems.apply(this, arguments);
  }
  _processItems(items, change) {
    const that = this;
    const {
      changeType
    } = change;
    const result = [];
    items = super._processItems.apply(that, arguments);
    if (changeType === 'loadingAll') {
      return items;
    }
    if (changeType === 'refresh') {
      that._expandedItems = grep(that._expandedItems, item => item.visible);
    }
    each(items, (index, item) => {
      result.push(item);
      const expandIndex = gridCoreUtils.getIndexByKey(item.key, that._expandedItems);
      if (item.rowType === 'data' && (item.isExpanded || expandIndex >= 0) && !item.isNewRow) {
        result.push({
          visible: item.isExpanded,
          rowType: 'detail',
          key: item.key,
          data: item.data,
          values: []
        });
      }
    });
    return result;
  }
  optionChanged(args) {
    const that = this;
    let isEnabledChanged;
    let isAutoExpandAllChanged;
    if (args.name === 'masterDetail') {
      args.name = 'dataSource';
      // eslint-disable-next-line default-case
      switch (args.fullName) {
        case 'masterDetail':
          {
            const value = args.value || {};
            const previousValue = args.previousValue || {};
            isEnabledChanged = value.enabled !== previousValue.enabled;
            isAutoExpandAllChanged = value.autoExpandAll !== previousValue.autoExpandAll;
            break;
          }
        case 'masterDetail.template':
          {
            initMasterDetail(that);
            break;
          }
        case 'masterDetail.enabled':
          isEnabledChanged = true;
          break;
        case 'masterDetail.autoExpandAll':
          isAutoExpandAllChanged = true;
          break;
      }
      if (isEnabledChanged || isAutoExpandAllChanged) {
        initMasterDetail(that);
      }
    }
    super.optionChanged(args);
  }
};
const resizing = Base => class ResizingMasterDetailExtender extends Base {
  fireContentReadyAction() {
    super.fireContentReadyAction.apply(this, arguments);
    this._updateParentDataGrids(this.component.$element());
  }
  _updateParentDataGrids($element) {
    const $masterDetailRow = $element.closest(`.${MASTER_DETAIL_ROW_CLASS}`);
    if ($masterDetailRow.length) {
      when(this._updateMasterDataGrid($masterDetailRow, $element)).done(() => {
        this._updateParentDataGrids($masterDetailRow.parent());
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateMasterDataGrid($masterDetailRow, $detailElement) {
    const masterRowOptions = $($masterDetailRow).data('options');
    const masterDataGrid = $($masterDetailRow).closest(`.${this.getWidgetContainerClass()}`).parent().data('dxDataGrid');
    if (masterRowOptions && masterDataGrid) {
      return this._updateMasterDataGridCore(masterDataGrid, masterRowOptions);
    }
    return undefined;
  }
  _updateMasterDataGridCore(masterDataGrid, masterRowOptions) {
    var _masterDataGrid$getVi, _masterDataGrid$getVi2;
    const d = Deferred();
    if ((_masterDataGrid$getVi = masterDataGrid.getView('rowsView')) !== null && _masterDataGrid$getVi !== void 0 && (_masterDataGrid$getVi2 = _masterDataGrid$getVi.isFixedColumns) !== null && _masterDataGrid$getVi2 !== void 0 && _masterDataGrid$getVi2.call(_masterDataGrid$getVi)) {
      // @ts-expect-error
      this._updateFixedMasterDetailGrids(masterDataGrid, masterRowOptions.rowIndex, $(masterRowOptions.rowElement)).done(d.resolve);
    } else {
      if (masterDataGrid.option('scrolling.useNative') === true) {
        masterDataGrid.updateDimensions().done(() => d.resolve(true));
        return;
      }
      const scrollable = masterDataGrid.getScrollable();
      if (scrollable) {
        // T607490
        scrollable === null || scrollable === void 0 || scrollable.update().done(() => d.resolve());
      } else {
        d.resolve();
      }
    }
    return d.promise();
  }
  _updateFixedMasterDetailGrids(masterDataGrid, masterRowIndex, $detailElement) {
    const d = Deferred();
    const $rows = $(masterDataGrid.getRowElement(masterRowIndex));
    const $tables = $(masterDataGrid.getView('rowsView').getTableElements());
    const rowsNotEqual = ($rows === null || $rows === void 0 ? void 0 : $rows.length) === 2 && getHeight($rows.eq(0)) !== getHeight($rows.eq(1));
    const tablesNotEqual = ($tables === null || $tables === void 0 ? void 0 : $tables.length) === 2 && getHeight($tables.eq(0)) !== getHeight($tables.eq(1));
    if (rowsNotEqual || tablesNotEqual) {
      const detailElementWidth = getWidth($detailElement);
      masterDataGrid.updateDimensions().done(() => {
        const isDetailHorizontalScrollCanBeShown = this.option('columnAutoWidth') && masterDataGrid.option('scrolling.useNative') === true;
        const isDetailGridWidthChanged = isDetailHorizontalScrollCanBeShown && detailElementWidth !== getWidth($detailElement);
        if (isDetailHorizontalScrollCanBeShown && isDetailGridWidthChanged) {
          this.updateDimensions().done(() => d.resolve(true));
        } else {
          d.resolve(true);
        }
      });
      return d.promise();
    }
    return Deferred().resolve();
  }
  _toggleBestFitMode(isBestFit) {
    super._toggleBestFitMode.apply(this, arguments);
    if (this.option('masterDetail.template')) {
      const $rowsTable = this._rowsView.getTableElement();
      if ($rowsTable) {
        $rowsTable.find('.dx-master-detail-cell').css('maxWidth', isBestFit ? 0 : '');
      }
    }
  }
};
const rowsView = Base => class RowsViewMasterDetailExtender extends Base {
  _getCellTemplate(options) {
    const that = this;
    const {
      column
    } = options;
    const editingController = this._editingController;
    const isEditRow = editingController && editingController.isEditRow(options.rowIndex);
    let template;
    if (column.command === 'detail' && !isEditRow) {
      template = that.option('masterDetail.template') || {
        allowRenderToDetachedContainer: false,
        render: that._getDefaultTemplate(column)
      };
    } else {
      template = super._getCellTemplate.apply(that, arguments);
    }
    return template;
  }
  _isDetailRow(row) {
    return (row === null || row === void 0 ? void 0 : row.rowType) && row.rowType.indexOf('detail') === 0;
  }
  _createRow(row) {
    const $row = super._createRow.apply(this, arguments);
    if (row && this._isDetailRow(row)) {
      this.option('showRowLines') && $row.addClass(ROW_LINES_CLASS);
      $row.addClass(MASTER_DETAIL_ROW_CLASS);
      if (isDefined(row.visible)) {
        $row.toggle(row.visible);
      }
    }
    return $row;
  }
  _renderCells($row, options) {
    const {
      row
    } = options;
    if (row.rowType && this._isDetailRow(row)) {
      if (this._needRenderCell(0, options.columnIndices)) {
        this._renderMasterDetailCell($row, row, options);
      }
    } else {
      super._renderCells.apply(this, arguments);
    }
  }
  _renderMasterDetailCell($row, row, options) {
    const visibleColumns = this._columnsController.getVisibleColumns();
    const $detailCell = this._renderCell($row, {
      value: null,
      row,
      rowIndex: row.rowIndex,
      column: {
        command: 'detail'
      },
      columnIndex: 0,
      change: options.change
    });
    $detailCell.addClass(CELL_FOCUS_DISABLED_CLASS).addClass(MASTER_DETAIL_CELL_CLASS).attr('colSpan', visibleColumns.length);
    const isEditForm = row.isEditing;
    if (!isEditForm) {
      $detailCell.attr('aria-roledescription', messageLocalization.format('dxDataGrid-masterDetail'));
    }
    return $detailCell;
  }
};
export const masterDetailModule = {
  defaultOptions() {
    return {
      masterDetail: {
        enabled: false,
        autoExpandAll: false,
        template: null
      }
    };
  },
  extenders: {
    controllers: {
      columns,
      data: dataMasterDetailExtenderMixin,
      resizing
    },
    views: {
      rowsView
    }
  }
};
