/**
* DevExtreme (esm/__internal/grids/grid_core/sorting/m_sorting.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import { name as clickEventName } from '../../../../common/core/events/click';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { addNamespace, isCommandKeyPressed } from '../../../../common/core/events/utils/index';
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { isDefined } from '../../../../core/utils/type';
import sortingMixin from './m_sorting_mixin';
const COLUMN_HEADERS_VIEW_NAMESPACE = 'dxDataGridColumnHeadersView';
// TODO improve types of this mixin
//  Now all members - protected by default (it may be wrong)
// TODO getController
const columnHeadersView = Base => class ColumnHeadersViewSortingExtender extends sortingMixin(Base) {
  optionChanged(args) {
    const that = this;
    switch (args.name) {
      case 'sorting':
        that._invalidate();
        args.handled = true;
        break;
      default:
        super.optionChanged(args);
    }
  }
  _createRow(row) {
    const $row = super._createRow(row);
    if (row.rowType === 'header') {
      eventsEngine.on($row, addNamespace(clickEventName, COLUMN_HEADERS_VIEW_NAMESPACE), 'td', this.createAction(e => {
        this._processHeaderAction(e.event, $row);
      }));
    }
    return $row;
  }
  _processHeaderAction(event, $row) {
    if ($(event.currentTarget).parent().get(0) !== $row.get(0)) {
      return;
    }
    const that = this;
    let keyName = null;
    const $cellElementFromEvent = $(event.currentTarget);
    const rowIndex = $cellElementFromEvent.parent().index();
    let columnIndex = -1;
    // eslint-disable-next-line array-callback-return
    [].slice.call(that.getCellElements(rowIndex)).some(($cellElement, index) => {
      if ($cellElement === $cellElementFromEvent.get(0)) {
        columnIndex = index;
        return true;
      }
      return undefined;
    });
    const visibleColumns = that._columnsController.getVisibleColumns(rowIndex);
    const column = visibleColumns[columnIndex];
    const editingController = that.getController('editing');
    const editingMode = that.option('editing.mode');
    const isCellEditing = editingController && editingController.isEditing() && (editingMode === 'batch' || editingMode === 'cell');
    if (isCellEditing || !that._isSortableElement($(event.target))) {
      return;
    }
    if (column && !isDefined(column.groupIndex) && !column.command) {
      if (event.shiftKey) {
        keyName = 'shift';
      } else if (isCommandKeyPressed(event)) {
        keyName = 'ctrl';
      }
      setTimeout(() => {
        that._columnsController.changeSortOrder(column.index, keyName);
      });
    }
  }
  _renderCellContent($cell, options) {
    const that = this;
    const {
      column
    } = options;
    if (!column.command && options.rowType === 'header') {
      that._applyColumnState({
        name: 'sort',
        rootElement: $cell,
        column,
        showColumnLines: that.option('showColumnLines')
      });
    }
    super._renderCellContent.apply(this, arguments);
  }
  _columnOptionChanged(e) {
    const {
      changeTypes
    } = e;
    if (changeTypes.length === 1 && changeTypes.sorting) {
      this._updateIndicators('sort');
      return;
    }
    super._columnOptionChanged(e);
  }
};
const headerPanel = Base => class HeaderPanelSortingExtender extends sortingMixin(Base) {
  optionChanged(args) {
    const that = this;
    switch (args.name) {
      case 'sorting':
        that._invalidate();
        args.handled = true;
        break;
      default:
        super.optionChanged(args);
    }
  }
  _createGroupPanelItem($rootElement, groupColumn) {
    const that = this;
    const $item = super._createGroupPanelItem(...arguments);
    eventsEngine.on($item, addNamespace(clickEventName, 'dxDataGridHeaderPanel'), that.createAction(() => {
      that._processGroupItemAction(groupColumn.index);
    }));
    that._applyColumnState({
      name: 'sort',
      rootElement: $item,
      column: {
        alignment: that.option('rtlEnabled') ? 'right' : 'left',
        allowSorting: groupColumn.allowSorting,
        sortOrder: groupColumn.sortOrder === 'desc' ? 'desc' : 'asc',
        isGrouped: true
      },
      showColumnLines: true
    });
    return $item;
  }
  _processGroupItemAction(groupColumnIndex) {
    setTimeout(() => this.getController('columns').changeSortOrder(groupColumnIndex));
  }
};
export const sortingModule = {
  defaultOptions() {
    return {
      sorting: {
        mode: 'single',
        ascendingText: messageLocalization.format('dxDataGrid-sortingAscendingText'),
        descendingText: messageLocalization.format('dxDataGrid-sortingDescendingText'),
        clearText: messageLocalization.format('dxDataGrid-sortingClearText'),
        showSortIndexes: true
      }
    };
  },
  extenders: {
    views: {
      columnHeadersView,
      headerPanel
    }
  }
};
