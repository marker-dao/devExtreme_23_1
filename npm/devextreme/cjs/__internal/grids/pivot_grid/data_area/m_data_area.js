/**
* DevExtreme (cjs/__internal/grids/pivot_grid/data_area/m_data_area.js)
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
exports.default = exports.DataArea = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_support = _interopRequireDefault(require("../../../core/utils/m_support"));
var _m_area_item = require("../area_item/m_area_item");
var _m_widget_utils = require("../m_widget_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable class-methods-use-this */

const PIVOTGRID_AREA_CLASS = 'dx-pivotgrid-area';
const PIVOTGRID_AREA_DATA_CLASS = 'dx-pivotgrid-area-data';
const PIVOTGRID_TOTAL_CLASS = 'dx-total';
const PIVOTGRID_GRAND_TOTAL_CLASS = 'dx-grandtotal';
const PIVOTGRID_ROW_TOTAL_CLASS = 'dx-row-total';
class DataArea extends _m_area_item.AreaItem {
  _getAreaName() {
    return 'data';
  }
  _createGroupElement() {
    return (0, _renderer.default)('<div>').addClass(PIVOTGRID_AREA_CLASS).addClass(PIVOTGRID_AREA_DATA_CLASS).css('borderTopWidth', 0);
  }
  _applyCustomStyles(options) {
    const {
      cell
    } = options;
    const {
      classArray
    } = options;
    if (cell.rowType === 'T' || cell.columnType === 'T') {
      classArray.push(PIVOTGRID_TOTAL_CLASS);
    }
    if (cell.rowType === 'GT' || cell.columnType === 'GT') {
      classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS);
    }
    if (cell.rowType === 'T' || cell.rowType === 'GT') {
      classArray.push(PIVOTGRID_ROW_TOTAL_CLASS);
    }
    if (options.rowIndex === options.rowsCount - 1) {
      options.cssArray.push('border-bottom: 0px');
    }
    super._applyCustomStyles(options);
  }
  _moveFakeTable(scrollPos) {
    this._moveFakeTableHorizontally(scrollPos.x);
    this._moveFakeTableTop(scrollPos.y);
    super._moveFakeTable();
  }
  renderScrollable() {
    this._groupElement.dxScrollable({
      useNative: this.getUseNativeValue(),
      useSimulatedScrollbar: false,
      rtlEnabled: this.component.option('rtlEnabled'),
      bounceEnabled: false,
      updateManually: true
    });
  }
  getUseNativeValue() {
    const {
      useNative
    } = this.component.option('scrolling');
    return useNative === 'auto' ? !!_m_support.default.nativeScrolling : !!useNative;
  }
  getScrollbarWidth() {
    return this.getUseNativeValue() ? (0, _m_widget_utils.calculateScrollbarWidth)() : 0;
  }
  updateScrollableOptions(_ref) {
    let {
      direction,
      rtlEnabled
    } = _ref;
    const scrollable = this._getScrollable();
    scrollable.option('useNative', this.getUseNativeValue());
    scrollable.option({
      direction,
      rtlEnabled
    });
  }
  getScrollableDirection(horizontal, vertical) {
    if (horizontal && !vertical) {
      return 'horizontal';
    }
    if (!horizontal && vertical) {
      return 'vertical';
    }
    return 'both';
  }
  reset() {
    super.reset();
    if (this._virtualContent) {
      this._virtualContent.parent().css('height', 'auto');
    }
  }
  setVirtualContentParams(params) {
    super.setVirtualContentParams(params);
    this._virtualContent.parent().css('height', params.height);
    this._setTableCss({
      top: params.top,
      left: params.left
    });
  }
}
exports.DataArea = DataArea;
var _default = exports.default = {
  DataArea
};
