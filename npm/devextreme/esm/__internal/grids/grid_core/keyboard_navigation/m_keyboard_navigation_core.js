/**
* DevExtreme (esm/__internal/grids/grid_core/keyboard_navigation/m_keyboard_navigation_core.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { keyboard } from '../../../../common/core/events/short';
import $ from '../../../../core/renderer';
import { Deferred } from '../../../../core/utils/deferred';
import { getBoundingRect } from '../../../../core/utils/position';
import { getElementLocationInternal } from '../../../ui/scroll_view/utils/get_element_location_internal';
import modules from '../m_modules';
import gridCoreUtils from '../m_utils';
import { Direction } from './const';
import { isElementDefined, isFixedColumnIndexOffsetRequired } from './m_keyboard_navigation_utils';
export class KeyboardNavigationController extends modules.ViewController {
  constructor() {
    super(...arguments);
    this.needToRestoreFocus = false;
  }
  _applyColumnIndexBoundaries(columnIndex) {
    const visibleColumnCount = this._columnsController.getVisibleColumns(null, true).length;
    if (columnIndex < 0) {
      columnIndex = 0;
    } else if (columnIndex >= visibleColumnCount) {
      columnIndex = visibleColumnCount - 1;
    }
    return columnIndex;
  }
  unsubscribeFromKeyDownEvent() {
    if (this.keyDownListener) {
      keyboard.off(this.keyDownListener);
    }
  }
  subscribeToKeyDownEvent() {
    const $focusedViewElement = this.getFocusedViewElement();
    if ($focusedViewElement) {
      this.keyDownListener = keyboard.on($focusedViewElement, null, e => this.keyDownHandler(e));
    }
  }
  unsubscribeFromFocusinEvent() {
    const $focusedView = this.getFocusedViewElement();
    if ($focusedView) {
      eventsEngine.off($focusedView, 'focusin', this.focusinHandlerContext);
    }
  }
  subscribeToFocusinEvent() {
    const $focusedView = this.getFocusedViewElement();
    const focusinSelector = this.getFocusinSelector();
    if ($focusedView) {
      eventsEngine.on($focusedView, 'focusin', focusinSelector, this.focusinHandlerContext);
    }
  }
  getScrollPadding($container) {
    const containerRect = getBoundingRect($container.get(0));
    const containerBoundingRect = this.getContainerBoundingRect($container);
    return {
      left: containerBoundingRect.left - containerRect.left,
      right: containerRect.right - containerBoundingRect.right
    };
  }
  getVirtualCellWidth() {
    var _this$_focusedCellPos;
    const visibleColumns = this._columnsController.getVisibleColumns(undefined, true);
    const widths = gridCoreUtils.getColumnWidths(visibleColumns);
    const focusedColumnIndex = ((_this$_focusedCellPos = this._focusedCellPosition) === null || _this$_focusedCellPos === void 0 ? void 0 : _this$_focusedCellPos.columnIndex) ?? 0;
    return widths[focusedColumnIndex] ?? 0;
  }
  getNextCellLocation($cell, direction) {
    var _this$getFocusedView;
    const scrollable = this.getScrollable();
    const isVirtualColumnRender = this._isVirtualColumnRender();
    if (!scrollable || $cell === null && !isVirtualColumnRender) {
      return 0;
    }
    if ($cell === null) {
      const isLeftDirection = direction === 'previous' || direction === 'previousInRow';
      const multiplier = isLeftDirection !== this.option('rtlEnabled') ? -1 : 1;
      return scrollable.scrollLeft() + multiplier * this.getVirtualCellWidth();
    }
    const scrollPadding = this.getScrollPadding($(scrollable.container()));
    return getElementLocationInternal($cell[0], 'horizontal', $((_this$getFocusedView = this.getFocusedView()) === null || _this$getFocusedView === void 0 ? void 0 : _this$getFocusedView.getContent())[0], scrollable.scrollOffset(), scrollPadding, this.addWidgetPrefix('table'));
  }
  resizeCompleted() {}
  getColumnIndexOffset(visibleIndex) {
    let offset = 0;
    const column = this._columnsController.getVisibleColumns()[visibleIndex];
    if (column !== null && column !== void 0 && column.fixed) {
      offset = this._getFixedColumnIndexOffset(column);
    } else if (visibleIndex >= 0) {
      offset = this._columnsController.getColumnIndexOffset();
    }
    return offset;
  }
  getFocusedViewElement() {
    var _this$getFocusedView2;
    return (_this$getFocusedView2 = this.getFocusedView()) === null || _this$getFocusedView2 === void 0 ? void 0 : _this$getFocusedView2.element();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  keyDownHandler(e) {}
  initKeyDownHandler() {
    this.unsubscribeFromKeyDownEvent();
    this.subscribeToKeyDownEvent();
  }
  getFocusinSelector() {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  focusinHandler(e) {}
  initHandlers() {
    var _focusedView$renderCo, _this$_resizeControll;
    const focusedView = this.getFocusedView();
    this.unsubscribeFromKeyDownEvent();
    focusedView === null || focusedView === void 0 || (_focusedView$renderCo = focusedView.renderCompleted) === null || _focusedView$renderCo === void 0 || _focusedView$renderCo.remove(this.renderCompletedWithContext);
    (_this$_resizeControll = this._resizeController) === null || _this$_resizeControll === void 0 || (_this$_resizeControll = _this$_resizeControll.resizeCompleted) === null || _this$_resizeControll === void 0 || _this$_resizeControll.remove(this.resizeCompletedWithContext);
    if (this.isKeyboardEnabled()) {
      var _focusedView$renderCo2, _this$_resizeControll2;
      focusedView === null || focusedView === void 0 || (_focusedView$renderCo2 = focusedView.renderCompleted) === null || _focusedView$renderCo2 === void 0 || _focusedView$renderCo2.add(this.renderCompletedWithContext);
      (_this$_resizeControll2 = this._resizeController) === null || _this$_resizeControll2 === void 0 || (_this$_resizeControll2 = _this$_resizeControll2.resizeCompleted) === null || _this$_resizeControll2 === void 0 || _this$_resizeControll2.add(this.resizeCompletedWithContext);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  getFocusedView() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getCell(cellPosition) {}
  _getRowIndex($row) {
    return $row === null || $row === void 0 ? void 0 : $row.index();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCellIndex($cell, rowIndex) {
    return $cell === null || $cell === void 0 ? void 0 : $cell.index();
  }
  _getFixedColumnIndexOffset(column) {
    const visibleColumnCount = this._columnsController.getVisibleColumns(null, true).length;
    const offset = isFixedColumnIndexOffsetRequired(this, column) ? visibleColumnCount - this._columnsController.getVisibleColumns().length : 0;
    return offset;
  }
  getNewVisibleIndex(visibleIndex, rowIndex, direction) {
    return direction === 'previous' ? visibleIndex - 1 : visibleIndex + 1;
  }
  _getCellPosition($cell, direction) {
    const $row = isElementDefined($cell) && $cell.closest('tr');
    if (isElementDefined($row)) {
      const rowIndex = this._getRowIndex($row);
      let columnIndex = this.getCellIndex($cell, rowIndex);
      columnIndex += this.getColumnIndexOffset(columnIndex);
      if (direction) {
        columnIndex = this.getNewVisibleIndex(columnIndex, rowIndex, direction);
        columnIndex = this._applyColumnIndexBoundaries(columnIndex);
      }
      return {
        rowIndex,
        columnIndex
      };
    }
    return undefined;
  }
  _getColumnByCellElement($cell, rowIndex) {
    const cellIndex = this.getCellIndex($cell);
    const columnIndex = cellIndex + this._columnsController.getColumnIndexOffset();
    return this._columnsController.getVisibleColumns(rowIndex, true)[columnIndex];
  }
  processOnKeyDown(eventArgs) {
    const {
      originalEvent
    } = eventArgs;
    const args = {
      handled: false,
      event: originalEvent
    };
    this.executeAction('onKeyDown', args);
    eventArgs.ctrl = originalEvent.ctrlKey;
    eventArgs.alt = originalEvent.altKey;
    eventArgs.shift = originalEvent.shiftKey;
    return !!args.handled;
  }
  /**
     * @extended: focus
     */
  setFocusedColumnIndex(columnIndex) {
    if (!this._focusedCellPosition) {
      this._focusedCellPosition = {};
    }
    this._focusedCellPosition.columnIndex = columnIndex;
  }
  /**
   * @extended: focus
   */
  _updateFocusedCellPosition($cell, direction) {
    const position = this._getCellPosition($cell, direction);
    if (position) {
      if (!$cell.length || position.rowIndex >= 0 && position.columnIndex >= 0) {
        this.setFocusedCellPosition(position.rowIndex, position.columnIndex);
      }
    }
    return position;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderCompleted(e) {
    this.initKeyDownHandler();
    this.unsubscribeFromFocusinEvent();
    this.subscribeToFocusinEvent();
  }
  getScrollable() {
    return this._rowsView.getScrollable();
  }
  scrollLeft(scrollLeft) {
    const scrollable = this.getScrollable();
    if (!scrollable || scrollable.scrollLeft() === scrollLeft) {
      // @ts-expect-error
      return Deferred().resolve().promise();
    }
    const d = Deferred();
    const scrollHandler = () => {
      var _this$_columnsControl;
      scrollable.off('scroll', scrollHandler);
      const normalizeScrollLeft = this._rowsView.normalizeScrollLeft(scrollLeft);
      if ((_this$_columnsControl = this._columnsController) !== null && _this$_columnsControl !== void 0 && _this$_columnsControl.isNeedToRenderVirtualColumns(normalizeScrollLeft)) {
        const renderCompletedHandler = () => {
          this._rowsView.renderCompleted.remove(renderCompletedHandler);
          d.resolve();
        };
        this._rowsView.renderCompleted.add(renderCompletedHandler);
      } else {
        d.resolve();
      }
    };
    scrollable.on('scroll', scrollHandler);
    scrollable.scrollTo({
      left: scrollLeft
    });
    // @ts-expect-error
    return d.promise();
  }
  scrollToNextCell($nextCell, direction) {
    const scrollLeft = this.getNextCellLocation($nextCell, direction);
    return this.scrollLeft(scrollLeft);
  }
  _isVirtualColumnRender() {
    return this.option('scrolling.columnRenderingMode') === 'virtual';
  }
  getContainerBoundingRect($container) {
    const containerRect = getBoundingRect($container.get(0));
    return {
      left: containerRect.left,
      right: containerRect.right
    };
  }
  init() {
    this._columnsController = this.getController('columns');
    this._resizeController = this.getController('resizing');
    this._rowsView = this.getView('rowsView');
    this._focusedCellPosition = {};
    if (this.isKeyboardEnabled()) {
      this.createAction('onKeyDown');
    }
    this.renderCompletedWithContext = this.renderCompletedWithContext ?? this.renderCompleted.bind(this);
    this.resizeCompletedWithContext = this.resizeCompletedWithContext ?? this.resizeCompleted.bind(this);
    this.focusinHandlerContext = this.focusinHandlerContext ?? this.focusinHandler.bind(this);
    this.initHandlers();
  }
  dispose() {
    keyboard.off(this.keyDownListener);
  }
  /**
     * @extended: focus
     */
  setFocusedRowIndex(rowIndex) {
    if (!this._focusedCellPosition) {
      this._focusedCellPosition = {};
    }
    this._focusedCellPosition.rowIndex = rowIndex;
  }
  setFocusedCellPosition(rowIndex, columnIndex) {
    this.setFocusedRowIndex(rowIndex);
    this.setFocusedColumnIndex(columnIndex);
  }
  optionChanged(args) {
    switch (args.name) {
      case 'keyboardNavigation':
        if (args.fullName === 'keyboardNavigation.enabled') {
          this.init();
        }
        args.handled = true;
        break;
      case 'useLegacyKeyboardNavigation':
        this.init();
        args.handled = true;
        break;
      default:
        super.optionChanged(args);
    }
  }
  isKeyboardEnabled() {
    return this.option('keyboardNavigation.enabled');
  }
  _getFocusedCell() {
    return $(this._getCell(this._focusedCellPosition));
  }
  getDirectionByKeyName(keyName) {
    const rtlEnabled = this.option('rtlEnabled');
    switch (keyName) {
      case 'leftArrow':
        {
          return rtlEnabled ? Direction.Next : Direction.Previous;
        }
      case 'rightArrow':
        {
          return rtlEnabled ? Direction.Previous : Direction.Next;
          break;
        }
      default:
        {
          return Direction.Next;
        }
    }
  }
}
