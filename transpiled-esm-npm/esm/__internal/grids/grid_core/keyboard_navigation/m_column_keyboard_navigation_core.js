import { isDefined, isEmptyObject } from '../../../../core/utils/type';
import { Direction } from './const';
import { KeyboardNavigationController as KeyboardNavigationControllerCore } from './m_keyboard_navigation_core';
export class ColumnKeyboardNavigationController extends KeyboardNavigationControllerCore {
  keyDownHandler(e) {
    return this.processOnKeyDown(e);
  }
  getVisibleIndex(column, rowIndex) {
    const visibleIndex = this._columnsController.getVisibleIndex(column.index, rowIndex);
    const columnIndexOffset = this.getColumnIndexOffset(visibleIndex);
    return visibleIndex >= 0 ? visibleIndex + columnIndexOffset : -1;
  }
  getNewVisibleIndex(visibleIndex, rowIndex, direction) {
    /*
          We need to add 2 to the index instead of 1,
          because that's how normalization of these indexes works.
               For example, we have columns with the following indexes:
          0 1 2 3
               We drag 1 to the right. Its index becomes 3.
          0 2 3(1) 3(3)
               After normalization of the indexes:
          0 1(2) 2(1) 3(3)
      */
    return direction === 'previous' ? visibleIndex - 1 : visibleIndex + 2;
  }
  getNewFocusedColumnIndex(newVisibleIndex, direction) {
    return direction === Direction.Next ? newVisibleIndex - 1 : newVisibleIndex;
  }
  resizeCompleted() {
    if (this.needToRestoreFocus) {
      this.restoreFocus();
    }
  }
  resetFocusedCellPosition() {
    this._focusedCellPosition = {};
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canReorderColumn(column, direction, rowIndex) {
    return false;
  }
  init() {
    var _this$columnFocusDisp;
    super.init();
    this.columnFocusDispatcher = this.getController('columnFocusDispatcher');
    (_this$columnFocusDisp = this.columnFocusDispatcher) === null || _this$columnFocusDisp === void 0 || _this$columnFocusDisp.registerKeyboardNavigationController(this);
  }
  moveColumn(column) {
    let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Direction.Next;
    let rowIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    const viewName = this.getFocusedView().getName();
    const visibleIndex = this.getVisibleIndex(column, rowIndex);
    const newVisibleIndex = this.getNewVisibleIndex(visibleIndex, rowIndex, direction);
    const newFocusedColumnIndex = this.getNewFocusedColumnIndex(newVisibleIndex, direction);
    this.updateViewFocusPosition({
      rowIndex,
      columnIndex: newFocusedColumnIndex
    });
    this._columnsController.moveColumn({
      columnIndex: visibleIndex,
      rowIndex
    }, {
      columnIndex: newVisibleIndex,
      rowIndex
    }, viewName, viewName);
  }
  getFirstFocusableVisibleIndex() {
    return -1;
  }
  updateViewFocusPosition(cellPosition) {
    var _this$columnFocusDisp2;
    (_this$columnFocusDisp2 = this.columnFocusDispatcher) === null || _this$columnFocusDisp2 === void 0 || _this$columnFocusDisp2.updateFocusPosition(this, cellPosition);
  }
  updateFocusPosition(cellPosition) {
    this.needToRestoreFocus = true;
    if (isDefined(cellPosition)) {
      this.setFocusedCellPosition(cellPosition.rowIndex, cellPosition.columnIndex);
    } else {
      this.resetFocusedCellPosition();
    }
  }
  restoreViewFocus() {
    var _this$columnFocusDisp3;
    (_this$columnFocusDisp3 = this.columnFocusDispatcher) === null || _this$columnFocusDisp3 === void 0 || _this$columnFocusDisp3.restoreFocus(this);
  }
  restoreFocus() {
    var _$focusedCell$;
    this.needToRestoreFocus = false;
    if (isEmptyObject(this._focusedCellPosition)) {
      this.setFocusedCellPosition(0, this.getFirstFocusableVisibleIndex());
    }
    const $focusedCell = this._getFocusedCell();
    $focusedCell === null || $focusedCell === void 0 || (_$focusedCell$ = $focusedCell[0]) === null || _$focusedCell$ === void 0 || _$focusedCell$.focus({
      preventScroll: true
    });
  }
}