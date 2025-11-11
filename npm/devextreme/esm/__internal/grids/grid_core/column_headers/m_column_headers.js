/**
* DevExtreme (esm/__internal/grids/grid_core/column_headers/m_column_headers.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../../common/core/events/core/events_engine';
import messageLocalization from '../../../../common/core/localization/message';
import domAdapter from '../../../../core/dom_adapter';
import $ from '../../../../core/renderer';
import { Deferred } from '../../../../core/utils/deferred';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { getHeight } from '../../../../core/utils/size';
import { isDefined } from '../../../../core/utils/type';
import { ColumnContextMenuMixin } from '../../../grids/grid_core/context_menu/m_column_context_menu_mixin';
import { CLASSES as REORDERING_CLASSES } from '../columns_resizing_reordering/const';
import { registerKeyboardAction } from '../m_accessibility';
import { ColumnsView } from '../views/m_columns_view';
import { CLASSES } from './const';
const HEADERS_CLASS = 'headers';
const NOWRAP_CLASS = 'nowrap';
const ROW_CLASS_SELECTOR = '.dx-row';
const HEADER_ROW_CLASS = 'dx-header-row';
const COLUMN_LINES_CLASS = 'dx-column-lines';
const CONTEXT_MENU_SORT_ASC_ICON = 'context-menu-sort-asc';
const CONTEXT_MENU_SORT_DESC_ICON = 'context-menu-sort-desc';
const CONTEXT_MENU_SORT_NONE_ICON = 'context-menu-sort-none';
const CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
const VISIBILITY_HIDDEN_CLASS = 'dx-visibility-hidden';
const TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX = 'dx-text-content-alignment-';
const SORT_INDICATOR_CLASS = 'dx-sort-indicator';
const SORT_INDEX_INDICATOR_CLASS = 'dx-sort-index-indicator';
const HEADER_FILTER_CLASS_SELECTOR = '.dx-header-filter';
const HEADER_FILTER_INDICATOR_CLASS = 'dx-header-filter-indicator';
const MULTI_ROW_HEADER_CLASS = 'dx-header-multi-row';
const LINK = 'dx-link';
export class ColumnHeadersView extends ColumnContextMenuMixin(ColumnsView) {
  addCssClassesToCellContent($cell, column, $cellContent) {
    const $indicatorElements = this._getIndicatorElements($cell, true);
    const $visibleIndicatorElements = this._getIndicatorElements($cell);
    const indicatorCount = $indicatorElements === null || $indicatorElements === void 0 ? void 0 : $indicatorElements.length;
    const columnAlignment = this._getColumnAlignment(column.alignment ?? '');
    const sortIndicatorClassName = `.${this._getIndicatorClassName('sort')}`;
    const sortIndexIndicatorClassName = `.${this._getIndicatorClassName('sortIndex')}`;
    const $sortIndicator = $visibleIndicatorElements.filter(sortIndicatorClassName);
    const $sortIndexIndicator = $visibleIndicatorElements.children().filter(sortIndexIndicatorClassName);
    const $content = $cellContent ?? $cell.children(`.${this.addWidgetPrefix(CLASSES.cellContent)}`);
    $content.toggleClass(TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX + columnAlignment, indicatorCount > 0).toggleClass(TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX + (columnAlignment === 'left' ? 'right' : 'left'), indicatorCount > 0 && column.alignment === 'center').toggleClass(SORT_INDICATOR_CLASS, !!$sortIndicator.length).toggleClass(SORT_INDEX_INDICATOR_CLASS, !!$sortIndexIndicator.length).toggleClass(HEADER_FILTER_INDICATOR_CLASS, !!$visibleIndicatorElements.filter(`.${this._getIndicatorClassName('headerFilter')}`).length);
  }
  createCellContent($cell, column) {
    const $cellContent = $('<div>').addClass(this.addWidgetPrefix(CLASSES.cellContent));
    this.setAria('role', 'presentation', $cellContent);
    this.addCssClassesToCellContent($cell, column, $cellContent);
    const showColumnLines = this.option('showColumnLines');
    // TODO getController
    const contentAlignment = this.getController('columns').getHeaderContentAlignment(column.alignment);
    if (showColumnLines || contentAlignment === 'right') {
      $cellContent.appendTo($cell);
    } else {
      $cellContent.prependTo($cell);
    }
    return $cellContent;
  }
  init() {
    super.init();
    this._headerPanelView = this.getView('headerPanel');
    this._headerFilterController = this.getController('headerFilter');
    this._dataController = this.getController('data');
    this._headersKeyboardNavigation = this.getController('headersKeyboardNavigation');
  }
  _createTable() {
    // @ts-expect-error
    const $table = super._createTable.apply(this, arguments);
    eventsEngine.on($table, 'mousedown selectstart', this.createAction(e => {
      const {
        event
      } = e;
      if (event.shiftKey) {
        event.preventDefault();
      }
    }));
    return $table;
  }
  _isLegacyKeyboardNavigation() {
    return this.option('useLegacyKeyboardNavigation');
  }
  getHeaderDefaultTemplate($container, options) {
    const {
      column
    } = options;
    const {
      caption
    } = column;
    const needCellContent = !column.command || caption && column.command !== 'expand';
    if (column.command === 'empty') {
      this._renderEmptyMessage($container, options);
    } else if (needCellContent) {
      const $content = this.createCellContent($container, column);
      $content.text(caption);
    } else if (column.command) {
      $container.html('&nbsp;');
    }
  }
  _renderEmptyMessage($container, options) {
    const textEmpty = this._getEmptyHeaderText();
    if (!textEmpty) {
      $container.html('&nbsp;');
      return;
    }
    const $cellContent = this.createCellContent($container, options.column);
    const needSplit = textEmpty.includes('{0}');
    if (needSplit) {
      const [leftPart, rightPart] = textEmpty.split('{0}');
      const columnChooserTitle = messageLocalization.format('dxDataGrid-emptyHeaderColumnChooserText');
      const columnChooserView = this._columnChooserView;
      const $link = $('<a>').text(columnChooserTitle).addClass(LINK);
      eventsEngine.on($link, 'click', this.createAction(() => columnChooserView.showColumnChooser()));
      $cellContent.append(domAdapter.createTextNode(leftPart)).append($link).append(domAdapter.createTextNode(rightPart));
    } else {
      $cellContent.text(textEmpty);
    }
  }
  _getEmptyHeaderText() {
    const hasHiddenColumns = !!this._columnChooserView.hasHiddenColumns();
    const hasGroupedColumns = !!this._headerPanelView.hasGroupedColumns();
    switch (true) {
      case hasHiddenColumns && hasGroupedColumns:
        return messageLocalization.format('dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText');
      case hasGroupedColumns:
        return messageLocalization.format('dxDataGrid-emptyHeaderWithGroupPanelText');
      case hasHiddenColumns:
        return messageLocalization.format('dxDataGrid-emptyHeaderWithColumnChooserText');
      default:
        return '';
    }
  }
  _getHeaderTemplate(column) {
    return column.headerCellTemplate || {
      allowRenderToDetachedContainer: true,
      render: this.getHeaderDefaultTemplate.bind(this)
    };
  }
  _processTemplate(template, options) {
    const that = this;
    let resultTemplate;
    const {
      column
    } = options;
    const renderingTemplate = super._processTemplate(template);
    if (options.rowType === 'header' && renderingTemplate && column.headerCellTemplate && !column.command) {
      resultTemplate = {
        render(options) {
          const $content = that.createCellContent(options.container, options.model);
          renderingTemplate.render(extend({}, options, {
            container: $content
          }));
        }
      };
    } else {
      resultTemplate = renderingTemplate;
    }
    return resultTemplate;
  }
  /**
   * @extended: filter_row, selection
   */
  _handleDataChanged(e) {
    if (e.changeType !== 'refresh') return;
    if (this._isGroupingChanged || this._requireReady) {
      this._isGroupingChanged = false;
      this.render();
    }
  }
  _renderCell($row, options) {
    const $cell = super._renderCell($row, options);
    if (options.row.rowType === 'header') {
      $cell.addClass(CELL_FOCUS_DISABLED_CLASS);
      if (!this._isLegacyKeyboardNavigation()) {
        const {
          column
        } = options;
        const isCustomCommandColumn = this._columnsController.isCustomCommandColumn(column);
        if (column && (!column.type || isCustomCommandColumn)) {
          $cell.attr('tabindex', this.option('tabindex') || 0);
        }
      }
    }
    return $cell;
  }
  _setCellAriaAttributes($cell, cellOptions, options) {
    super._setCellAriaAttributes($cell, cellOptions, options);
    if (cellOptions.rowType === 'header') {
      if (!cellOptions.column.type) {
        this.setAria('role', 'columnheader', $cell);
      }
      if (cellOptions.column && !cellOptions.column.command && !cellOptions.column.isBand) {
        $cell.attr('id', cellOptions.column.headerId);
        this.setAria('label', `${messageLocalization.format('dxDataGrid-ariaColumn')} ${cellOptions.column.caption}`, $cell);
      }
    }
  }
  /**
   * @extended: filter_row
   */
  _createRow(row) {
    // @ts-expect-error
    const $row = super._createRow.apply(this, arguments);
    $row.toggleClass(COLUMN_LINES_CLASS, this.option('showColumnLines'));
    if (row.rowType === 'header') {
      $row.addClass(HEADER_ROW_CLASS);
      if (!this._isLegacyKeyboardNavigation()) {
        registerKeyboardAction('columnHeaders', this, $row, 'td', this._handleActionKeyDown.bind(this));
      }
    }
    return $row;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _processHeaderAction(event, $row) {}
  _handleActionKeyDown(args) {
    const {
      event
    } = args;
    const $target = $(event.target);
    this._lastActionElement = event.target;
    if ($target.is(HEADER_FILTER_CLASS_SELECTOR)) {
      const headerFilterController = this._headerFilterController;
      const $column = $target.closest('td');
      const columnIndex = this.getColumnIndexByElement($column);
      if (columnIndex >= 0) {
        headerFilterController.showHeaderFilterMenu(columnIndex, false);
      }
    } else {
      const $row = $target.closest(ROW_CLASS_SELECTOR);
      this._processHeaderAction(event, $row);
    }
    event.preventDefault();
  }
  /**
   * @extended: filter_row, virtual_column
   */
  _renderCore() {
    const that = this;
    const $container = that.element();
    const change = {};
    if (that._tableElement && !that._dataController.isLoaded() && !that._hasRowElements) {
      // @ts-expect-error
      return new Deferred().resolve();
    }
    $container.addClass(that.addWidgetPrefix(HEADERS_CLASS)).toggleClass(that.addWidgetPrefix(NOWRAP_CLASS), !that.option('wordWrapEnabled'));
    that.setAria('role', 'presentation', $container);
    const deferred = that._updateContent(that._renderTable({
      change
    }), change);
    $container.toggleClass(MULTI_ROW_HEADER_CLASS, that.getRowCount() > 1);
    // @ts-expect-error
    super._renderCore.apply(that, arguments);
    return deferred;
  }
  _renderRows() {
    const that = this;
    if (that._dataController.isLoaded() || that._hasRowElements) {
      // @ts-expect-error
      super._renderRows.apply(that, arguments);
      that._hasRowElements = true;
    }
  }
  _renderRow($table, options) {
    const rowIndex = this.getRowCount() === 1 ? null : options.row.rowIndex;
    options.columns = this.getColumns(rowIndex);
    super._renderRow($table, options);
  }
  _createCell(options) {
    const {
      column
    } = options;
    // @ts-expect-error
    const $cellElement = super._createCell.apply(this, arguments);
    column.rowspan > 1 && options.rowType === 'header' && $cellElement.attr('rowSpan', column.rowspan);
    return $cellElement;
  }
  /**
   * @extended: filter_row
   */
  _getRows() {
    const result = [];
    const rowCount = this.getRowCount();
    if (this.option('showColumnHeaders')) {
      for (let i = 0; i < rowCount; i++) {
        result.push({
          rowType: 'header',
          rowIndex: i
        });
      }
    }
    return result;
  }
  _getCellTemplate(options) {
    if (options.rowType === 'header') {
      return this._getHeaderTemplate(options.column);
    }
  }
  /**
   * @extended: filter_row, header_filter
   */
  _columnOptionChanged(e) {
    const {
      changeTypes
    } = e;
    const {
      optionNames
    } = e;
    if (changeTypes.grouping || changeTypes.groupExpanding) {
      if (changeTypes.grouping) {
        this._isGroupingChanged = true;
      }
      return;
    }
    super._columnOptionChanged(e);
    if (optionNames.width || optionNames.visible) {
      this.resizeCompleted.fire();
    }
  }
  /**
   * @extended: filter_row
   */
  _isElementVisible(elementOptions) {
    return elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.visible;
  }
  _alignCaptionByCenter($cell) {
    var _$indicatorsContainer;
    let $indicatorsContainer = this._getIndicatorContainer($cell, true);
    if ((_$indicatorsContainer = $indicatorsContainer) !== null && _$indicatorsContainer !== void 0 && _$indicatorsContainer.length) {
      $indicatorsContainer.filter(`.${VISIBILITY_HIDDEN_CLASS}`).remove();
      $indicatorsContainer = this._getIndicatorContainer($cell);
      $indicatorsContainer.clone().addClass(VISIBILITY_HIDDEN_CLASS).css('float', '').insertBefore($cell.children(`.${this.addWidgetPrefix(CLASSES.cellContent)}`));
    }
  }
  _updateCell($cell, options) {
    if (options.rowType === 'header' && options.column.alignment === 'center') {
      this._alignCaptionByCenter($cell);
    }
    // @ts-expect-error
    super._updateCell.apply(this, arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateIndicator($cell, column, indicatorName) {
    // @ts-expect-error
    const $indicatorElement = super._updateIndicator.apply(this, arguments);
    if (column.alignment === 'center') {
      this._alignCaptionByCenter($cell);
    }
    this.addCssClassesToCellContent($cell, column);
    return $indicatorElement;
  }
  _getIndicatorContainer($cell, returnAll) {
    const $indicatorsContainer = super._getIndicatorContainer($cell);
    return returnAll ? $indicatorsContainer : $indicatorsContainer.filter(`:not(.${VISIBILITY_HIDDEN_CLASS})`);
  }
  /**
   * @extended: tree_list/selection
   */
  // eslint-disable-next-line
  _isSortableElement($target) {
    return true;
  }
  getHeadersRowHeight() {
    const $tableElement = this.getTableElement();
    const $headerRows = $tableElement === null || $tableElement === void 0 ? void 0 : $tableElement.find(`.${HEADER_ROW_CLASS}`);
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return ($headerRows === null || $headerRows === void 0 ? void 0 : $headerRows.toArray().reduce((sum, headerRow) => sum + getHeight(headerRow), 0)) || 0;
  }
  getHeaderElement(index) {
    const $columnElements = this.getColumnElements();
    return ($columnElements === null || $columnElements === void 0 ? void 0 : $columnElements.eq(index)) ?? $('');
  }
  getColumnElements(index, bandColumnIndex) {
    const that = this;
    let $cellElement;
    const columnsController = that._columnsController;
    const rowCount = that.getRowCount();
    if (that.option('showColumnHeaders')) {
      if (rowCount > 1 && (!isDefined(index) || isDefined(bandColumnIndex))) {
        const result = [];
        const visibleColumns = isDefined(bandColumnIndex) ? columnsController.getChildrenByBandColumn(bandColumnIndex, true) : columnsController.getVisibleColumns();
        each(visibleColumns, (_, column) => {
          const rowIndex = isDefined(index) ? index : columnsController.getRowIndex(column.index);
          $cellElement = that._getCellElement(rowIndex, columnsController.getVisibleIndex(column.index, rowIndex));
          $cellElement && result.push($cellElement.get(0));
        });
        return $(result);
      }
      if (!index || index < rowCount) {
        return that.getCellElements(index || 0);
      }
    }
    return undefined;
  }
  getColumnIndexByElement($cell) {
    const cellIndex = this.getCellIndex($cell);
    const $row = $cell.closest('.dx-row');
    const {
      rowIndex
    } = $row[0];
    const column = this.getColumns(rowIndex)[cellIndex];
    return column ? column.index : -1;
  }
  getVisibleColumnIndex(columnIndex, rowIndex) {
    const column = this.getColumns()[columnIndex];
    return column ? this._columnsController.getVisibleIndex(column.index, rowIndex) : -1;
  }
  /**
   * @extended: column_fixing
   */
  getColumnWidths($tableElement, rowIndex) {
    const $columnElements = this.getColumnElements(rowIndex);
    if ($columnElements !== null && $columnElements !== void 0 && $columnElements.length) {
      return this._getWidths($columnElements);
    }
    // @ts-expect-error
    return super.getColumnWidths.apply(this, arguments);
  }
  /**
   * @extended: column_chooser
   */
  isColumnReorderingEnabled(column) {
    return column.allowReordering && (this.option('allowColumnReordering') ?? this._columnsController.isColumnOptionUsed('allowReordering'));
  }
  allowDragging(column) {
    const rowIndex = column && this._columnsController.getRowIndex(column.index);
    const columns = this.getColumns(rowIndex);
    return this.isColumnReorderingEnabled(column) && columns.length > 1;
  }
  getBoundingRect() {
    const that = this;
    const $columnElements = that.getColumnElements();
    if ($columnElements !== null && $columnElements !== void 0 && $columnElements.length) {
      const offset = that.getTableElement().offset();
      return {
        top: offset.top
      };
    }
    return null;
  }
  getName() {
    return 'headers';
  }
  getColumnCount() {
    const $columnElements = this.getColumnElements();
    return $columnElements ? $columnElements.length : 0;
  }
  /**
   * @extended: filter_row
   */
  isVisible() {
    return this.option('showColumnHeaders');
  }
  optionChanged(args) {
    const that = this;
    switch (args.name) {
      case 'showColumnHeaders':
      case 'wordWrapEnabled':
      case 'showColumnLines':
        that._invalidate(true, true);
        args.handled = true;
        break;
      default:
        super.optionChanged(args);
    }
  }
  getHeight() {
    return this.getElementHeight();
  }
  /**
   * @extended: column_fixing
   */
  getContextMenuItems(options) {
    let items;
    const {
      column
    } = options;
    if (options.row && (options.row.rowType === 'header' || options.row.rowType === 'detailAdaptive')) {
      const sortingOptions = this.option('sorting');
      if (sortingOptions && sortingOptions.mode !== 'none' && column !== null && column !== void 0 && column.allowSorting) {
        const onItemClick = params => {
          setTimeout(() => {
            this._columnsController.changeSortOrder(column.index, params.itemData.value);
          });
        };
        items = [{
          text: sortingOptions.ascendingText,
          value: 'asc',
          disabled: column.sortOrder === 'asc',
          icon: CONTEXT_MENU_SORT_ASC_ICON,
          onItemClick
        }, {
          text: sortingOptions.descendingText,
          value: 'desc',
          disabled: column.sortOrder === 'desc',
          icon: CONTEXT_MENU_SORT_DESC_ICON,
          onItemClick
        }, {
          name: 'clearSorting',
          text: sortingOptions.clearText,
          value: 'none',
          disabled: !column.sortOrder,
          icon: CONTEXT_MENU_SORT_NONE_ICON,
          onItemClick
        }];
      }
      if (options.row.rowType === 'header') {
        const moveColumnItems = this.getMoveColumnContextMenuItems(options);
        if (moveColumnItems !== null && moveColumnItems !== void 0 && moveColumnItems.length) {
          items = items ?? [];
          items.push(...moveColumnItems);
        }
      }
    }
    return items;
  }
  getRowCount() {
    var _this$_columnsControl;
    return (_this$_columnsControl = this._columnsController) === null || _this$_columnsControl === void 0 ? void 0 : _this$_columnsControl.getRowCount();
  }
  toggleDraggableColumnClass(columnIndex, value, rowIndex) {
    let i;
    let columnElements;
    const rowCount = this.getRowCount();
    const columns = this._columnsController.getColumns();
    const column = columns === null || columns === void 0 ? void 0 : columns[columnIndex];
    const columnID = (column === null || column === void 0 ? void 0 : column.isBand) && column.index;
    const setColumnClass = (column, index) => {
      if (column.ownerBand === columnID) {
        columnElements.eq(index).toggleClass(this.addWidgetPrefix(REORDERING_CLASSES.draggableColumn), value);
        if (column.isBand) {
          this.toggleDraggableColumnClass(column.index, value, i + 1);
        }
      }
    };
    if (isDefined(columnID)) {
      rowIndex = rowIndex || 0;
      for (i = rowIndex; i < rowCount; i++) {
        columnElements = this.getCellElements(i);
        if (columnElements) {
          const rowColumns = this.getColumns(i);
          rowColumns.forEach(setColumnClass);
        }
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isFilterRowCell($cell) {
    return false;
  }
  getKeyboardNavigationController() {
    return this._headersKeyboardNavigation;
  }
  renderDragCellContent($dragContainer, column) {
    $dragContainer.text(column.caption ?? '');
  }
}
export const columnHeadersModule = {
  defaultOptions() {
    return {
      showColumnHeaders: true,
      cellHintEnabled: true
    };
  },
  views: {
    columnHeadersView: ColumnHeadersView
  }
};
