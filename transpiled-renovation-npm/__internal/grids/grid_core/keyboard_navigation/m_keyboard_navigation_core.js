"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardNavigationController = void 0;
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _short = require("../../../../common/core/events/short");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _const = require("./const");
var _m_keyboard_navigation_utils = require("./m_keyboard_navigation_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class KeyboardNavigationController extends _m_modules.default.ViewController {
  constructor() {
    super(...arguments);
    this.isNeedToFocus = false;
  }
  _getFocusedColumnIndexOffset(columnIndex) {
    let offset = 0;
    const column = this._columnsController.getVisibleColumns()[columnIndex];
    if (column !== null && column !== void 0 && column.fixed) {
      offset = this._getFixedColumnIndexOffset(column);
    } else if (columnIndex >= 0) {
      offset = this._columnsController.getColumnIndexOffset();
    }
    return offset;
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
      _short.keyboard.off(this.keyDownListener);
    }
  }
  subscribeToKeyDownEvent() {
    const $focusedViewElement = this.getFocusedViewElement();
    if ($focusedViewElement) {
      this.keyDownListener = _short.keyboard.on($focusedViewElement, null, e => this.keyDownHandler(e));
    }
  }
  getFocusedViewElement() {
    var _this$getFocusedView;
    return (_this$getFocusedView = this.getFocusedView()) === null || _this$getFocusedView === void 0 ? void 0 : _this$getFocusedView.element();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  keyDownHandler(e) {}
  initKeyDownHandler() {
    this.unsubscribeFromKeyDownEvent();
    this.subscribeToKeyDownEvent();
  }
  unsubscribeFromFocusinEvent() {
    const $focusedView = this.getFocusedViewElement();
    if ($focusedView) {
      _events_engine.default.off($focusedView, 'focusin', this.focusinHandlerContext);
    }
  }
  subscribeToFocusinEvent() {
    const $focusedView = this.getFocusedViewElement();
    const focusinSelector = this.getFocusinSelector();
    if ($focusedView) {
      _events_engine.default.on($focusedView, 'focusin', focusinSelector, this.focusinHandlerContext);
    }
  }
  getFocusinSelector() {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  focusinHandler(e) {}
  initHandlers() {
    var _focusedView$renderCo;
    const focusedView = this.getFocusedView();
    this.unsubscribeFromKeyDownEvent();
    focusedView === null || focusedView === void 0 || (_focusedView$renderCo = focusedView.renderCompleted) === null || _focusedView$renderCo === void 0 || _focusedView$renderCo.remove(this.renderCompletedWithContext);
    if (this.isKeyboardEnabled()) {
      var _focusedView$renderCo2;
      focusedView === null || focusedView === void 0 || (_focusedView$renderCo2 = focusedView.renderCompleted) === null || _focusedView$renderCo2 === void 0 || _focusedView$renderCo2.add(this.renderCompletedWithContext);
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
    const offset = (0, _m_keyboard_navigation_utils.isFixedColumnIndexOffsetRequired)(this, column) ? visibleColumnCount - this._columnsController.getVisibleColumns().length : 0;
    return offset;
  }
  getNewVisibleIndex(visibleIndex, direction) {
    return direction === 'previous' ? visibleIndex - 1 : visibleIndex + 1;
  }
  _getCellPosition($cell, direction) {
    const $row = (0, _m_keyboard_navigation_utils.isElementDefined)($cell) && $cell.closest('tr');
    if ((0, _m_keyboard_navigation_utils.isElementDefined)($row)) {
      const rowIndex = this._getRowIndex($row);
      let columnIndex = this.getCellIndex($cell, rowIndex);
      columnIndex += this._getFocusedColumnIndexOffset(columnIndex);
      if (direction) {
        columnIndex = this.getNewVisibleIndex(columnIndex, direction);
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
    if (this.isNeedToFocus) {
      this.restoreFocus();
      this.isNeedToFocus = false;
    }
  }
  init() {
    this._columnsController = this.getController('columns');
    this._focusedCellPosition = {};
    if (this.isKeyboardEnabled()) {
      this.createAction('onKeyDown');
    }
    this.renderCompletedWithContext = this.renderCompletedWithContext ?? this.renderCompleted.bind(this);
    this.focusinHandlerContext = this.focusinHandlerContext ?? this.focusinHandler.bind(this);
    this.initHandlers();
  }
  dispose() {
    _short.keyboard.off(this.keyDownListener);
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
    return (0, _renderer.default)(this._getCell(this._focusedCellPosition));
  }
  restoreFocus() {
    const $focusElement = this._getFocusedCell();
    // @ts-expect-error
    _events_engine.default.trigger($focusElement, 'focus');
  }
  getDirectionByKeyName(keyName) {
    const rtlEnabled = this.option('rtlEnabled');
    switch (keyName) {
      case 'leftArrow':
        {
          return rtlEnabled ? _const.Direction.Next : _const.Direction.Previous;
        }
      case 'rightArrow':
        {
          return rtlEnabled ? _const.Direction.Previous : _const.Direction.Next;
          break;
        }
      default:
        {
          return _const.Direction.Next;
        }
    }
  }
}
exports.KeyboardNavigationController = KeyboardNavigationController;