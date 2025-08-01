/**
* DevExtreme (esm/__internal/grids/pivot_grid/headers_area/m_headers_area.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import domAdapter from '../../../../core/dom_adapter';
import $ from '../../../../core/renderer';
import { each } from '../../../../core/utils/iterator';
import { setHeight, setWidth } from '../../../../core/utils/size';
import { isDefined } from '../../../../core/utils/type';
import { AreaItem } from '../area_item/m_area_item';
const PIVOTGRID_AREA_CLASS = 'dx-pivotgrid-area';
const PIVOTGRID_AREA_COLUMN_CLASS = 'dx-pivotgrid-horizontal-headers';
const PIVOTGRID_AREA_ROW_CLASS = 'dx-pivotgrid-vertical-headers';
const PIVOTGRID_TOTAL_CLASS = 'dx-total';
const PIVOTGRID_GRAND_TOTAL_CLASS = 'dx-grandtotal';
const PIVOTGRID_ROW_TOTAL_CLASS = 'dx-row-total';
const PIVOTGRID_EXPANDED_CLASS = 'dx-pivotgrid-expanded';
const PIVOTGRID_COLLAPSED_CLASS = 'dx-pivotgrid-collapsed';
const PIVOTGRID_LAST_CELL_CLASS = 'dx-last-cell';
const PIVOTGRID_VERTICAL_SCROLL_CLASS = 'dx-vertical-scroll';
const PIVOTGRID_EXPAND_BORDER = 'dx-expand-border';
function getCellPath(tableElement, cell) {
  if (cell) {
    const {
      data
    } = tableElement.data();
    const {
      rowIndex
    } = cell.parentNode;
    const {
      cellIndex
    } = cell;
    return data[rowIndex] && data[rowIndex][cellIndex] && data[rowIndex][cellIndex].path;
  }
  return undefined;
}
class HorizontalHeadersArea extends AreaItem {
  constructor(component) {
    super(component);
    this._scrollBarWidth = 0;
  }
  _getAreaName() {
    return 'column';
  }
  _getAreaClassName() {
    return PIVOTGRID_AREA_COLUMN_CLASS;
  }
  _createGroupElement() {
    return $('<div>').addClass(this._getAreaClassName()).addClass(PIVOTGRID_AREA_CLASS);
  }
  _applyCustomStyles(options) {
    const {
      cssArray
    } = options;
    const {
      cell
    } = options;
    const {
      rowsCount
    } = options;
    const {
      classArray
    } = options;
    if (options.cellIndex === options.cellsCount - 1) {
      cssArray.push(`${options.rtlEnabled ? 'border-left:' : 'border-right:'}0px`);
    }
    if (cell.rowspan === rowsCount - options.rowIndex || options.rowIndex + 1 === rowsCount) {
      cssArray.push('border-bottom-width:0px');
    }
    if (cell.type === 'T' || cell.type === 'GT') {
      classArray.push(PIVOTGRID_ROW_TOTAL_CLASS);
    }
    if (options.cell.type === 'T') {
      classArray.push(PIVOTGRID_TOTAL_CLASS);
    }
    if (options.cell.type === 'GT') {
      classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS);
    }
    if (isDefined(cell.expanded)) {
      classArray.push(cell.expanded ? PIVOTGRID_EXPANDED_CLASS : PIVOTGRID_COLLAPSED_CLASS);
    }
    super._applyCustomStyles(options);
  }
  _getMainElementMarkup() {
    const thead = domAdapter.createElement('thead');
    thead.setAttribute('class', this._getAreaClassName());
    return thead;
  }
  _getCloseMainElementMarkup() {
    return '</thead>';
  }
  setVirtualContentParams(params) {
    super.setVirtualContentParams(params);
    this._setTableCss({
      left: params.left,
      top: 0
    });
    this._virtualContentWidth = params.width;
  }
  hasScroll() {
    const tableWidth = this._virtualContent ? this._virtualContentWidth : this._tableWidth;
    const groupWidth = this.getGroupWidth();
    if (groupWidth && tableWidth) {
      return tableWidth - groupWidth >= 1;
    }
    return false;
  }
  renderScrollable() {
    this._groupElement.dxScrollable({
      useNative: false,
      useSimulatedScrollbar: false,
      showScrollbar: 'never',
      bounceEnabled: false,
      direction: 'horizontal',
      rtlEnabled: false,
      updateManually: true
    });
  }
  processScrollBarSpacing(scrollBarWidth) {
    const groupAlignment = this.option('rtlEnabled') ? 'right' : 'left';
    const groupWidth = this.getGroupWidth();
    if (groupWidth) {
      this.setGroupWidth(groupWidth - scrollBarWidth);
    }
    if (this._scrollBarWidth) {
      this._groupElement.next().remove();
    }
    this._groupElement.toggleClass(PIVOTGRID_VERTICAL_SCROLL_CLASS, scrollBarWidth > 0);
    setWidth(this._groupElement.css('float', groupAlignment), this.getGroupHeight());
    this._scrollBarWidth = scrollBarWidth;
  }
  getScrollPath(offset) {
    const tableElement = this.tableElement();
    let cell;
    offset -= parseInt(tableElement[0].style.left, 10) || 0;
    each(tableElement.find('td'), (_, td) => {
      if (td.colSpan === 1 && td.offsetLeft <= offset && td.offsetWidth + td.offsetLeft > offset) {
        cell = td;
        return false;
      }
      return undefined;
    });
    return getCellPath(tableElement, cell);
  }
  _moveFakeTable(scrollPos) {
    this._moveFakeTableHorizontally(scrollPos);
    super._moveFakeTable();
  }
}
class VerticalHeadersArea extends HorizontalHeadersArea {
  _getAreaClassName() {
    return PIVOTGRID_AREA_ROW_CLASS;
  }
  _applyCustomStyles(options) {
    super._applyCustomStyles(options);
    if (options.cellIndex === options.cellsCount - 1) {
      options.classArray.push(PIVOTGRID_LAST_CELL_CLASS);
    }
    if (options.rowIndex === options.rowsCount - 1) {
      options.cssArray.push('border-bottom: 0px');
    }
    if (options.cell.isWhiteSpace) {
      options.classArray.push('dx-white-space-column');
    }
  }
  _getAreaName() {
    return 'row';
  }
  setVirtualContentParams(params) {
    super.setVirtualContentParams(params);
    this._setTableCss({
      top: params.top,
      left: 0
    });
    this._virtualContentHeight = params.height;
  }
  hasScroll() {
    const tableHeight = this._virtualContent ? this._virtualContentHeight : this._tableHeight;
    const groupHeight = this.getGroupHeight();
    if (groupHeight && tableHeight) {
      return tableHeight - groupHeight >= 1;
    }
    return false;
  }
  renderScrollable() {
    this._groupElement.dxScrollable({
      useNative: false,
      useSimulatedScrollbar: false,
      showScrollbar: 'never',
      bounceEnabled: false,
      direction: 'vertical',
      updateManually: true
    });
  }
  processScrollBarSpacing(scrollBarWidth) {
    const groupHeight = this.getGroupHeight();
    if (groupHeight) {
      this.setGroupHeight(groupHeight - scrollBarWidth);
    }
    if (this._scrollBarWidth) {
      this._groupElement.next().remove();
    }
    if (scrollBarWidth) {
      const $div = $('<div>');
      setWidth($div, '100%');
      setHeight($div, scrollBarWidth - 1);
      this._groupElement.after($div);
    }
    this._scrollBarWidth = scrollBarWidth;
  }
  getScrollPath(offset) {
    const tableElement = this.tableElement();
    let cell;
    offset -= parseInt(tableElement[0].style.top, 10) || 0;
    each(tableElement.find('tr'), (_, tr) => {
      const td = tr.childNodes[tr.childNodes.length - 1];
      if (td && td.rowSpan === 1 && td.offsetTop <= offset && td.offsetHeight + td.offsetTop > offset) {
        cell = td;
        return false;
      }
      return undefined;
    });
    return getCellPath(tableElement, cell);
  }
  _moveFakeTable(scrollPos) {
    this._moveFakeTableTop(scrollPos);
    // @ts-expect-error
    super._moveFakeTable();
  }
  _getRowClassNames(rowIndex, cell, rowClassNames) {
    // @ts-expect-error
    if (rowIndex !== 0 & cell.expanded && !rowClassNames.includes(PIVOTGRID_EXPAND_BORDER)) {
      rowClassNames.push(PIVOTGRID_EXPAND_BORDER);
    }
  }
  _getMainElementMarkup() {
    const tbody = domAdapter.createElement('tbody');
    tbody.classList.add(this._getAreaClassName());
    return tbody;
  }
  _getCloseMainElementMarkup() {
    return '</tbody>';
  }
  updateColspans(columnCount) {
    const {
      rows
    } = this.tableElement()[0];
    let columnOffset = 0;
    const columnOffsetResetIndexes = [];
    if (this.getColumnsCount() - columnCount > 0) {
      return;
    }
    for (let i = 0; i < rows.length; i += 1) {
      for (let j = 0; j < rows[i].cells.length; j += 1) {
        const cell = rows[i].cells[j];
        const {
          rowSpan
        } = cell;
        if (columnOffsetResetIndexes[i]) {
          columnOffset -= columnOffsetResetIndexes[i];
          columnOffsetResetIndexes[i] = 0;
        }
        const diff = columnCount - (columnOffset + cell.colSpan);
        if (j === rows[i].cells.length - 1 && diff > 0) {
          cell.colSpan += diff;
        }
        columnOffsetResetIndexes[i + rowSpan] = (columnOffsetResetIndexes[i + rowSpan] || 0) + cell.colSpan;
        columnOffset += cell.colSpan;
      }
    }
  }
}
export default {
  HorizontalHeadersArea,
  VerticalHeadersArea
};
export { HorizontalHeadersArea, VerticalHeadersArea };
