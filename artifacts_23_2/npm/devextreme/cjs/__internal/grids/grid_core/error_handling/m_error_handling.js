/**
* DevExtreme (cjs/__internal/grids/grid_core/error_handling/m_error_handling.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandlingModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _iterator = require("../../../../core/utils/iterator");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_ROW_CLASS = 'dx-error-row';
const ERROR_MESSAGE_CLASS = 'dx-error-message';
const ERROR_CLOSEBUTTON_CLASS = 'dx-closebutton';
const ACTION_CLASS = 'action';
const ErrorHandlingController = _m_modules.default.ViewController.inherit({
  init() {
    const that = this;
    that._columnHeadersView = that.getView('columnHeadersView');
    that._rowsView = that.getView('rowsView');
  },
  _createErrorRow(error, $tableElements) {
    const that = this;
    let $errorRow;
    let $closeButton;
    const $errorMessage = this._renderErrorMessage(error);
    if ($tableElements) {
      $errorRow = (0, _renderer.default)('<tr>').attr('role', 'row').addClass(ERROR_ROW_CLASS);
      $closeButton = (0, _renderer.default)('<div>').addClass(ERROR_CLOSEBUTTON_CLASS).addClass(that.addWidgetPrefix(ACTION_CLASS));
      _events_engine.default.on($closeButton, _click.name, that.createAction(args => {
        const e = args.event;
        let $errorRow;
        const errorRowIndex = (0, _renderer.default)(e.currentTarget).closest(".".concat(ERROR_ROW_CLASS)).index();
        e.stopPropagation();
        (0, _iterator.each)($tableElements, (_, tableElement) => {
          $errorRow = (0, _renderer.default)(tableElement).children('tbody').children('tr').eq(errorRowIndex);
          that.removeErrorRow($errorRow);
        });
        that.getController('resizing') && that.getController('resizing').fireContentReadyAction();
      }));
      (0, _renderer.default)('<td>')
      // @ts-expect-errors
      .attr({
        colSpan: that.getController('columns').getVisibleColumns().length,
        role: 'gridcell'
      }).prepend($closeButton).append($errorMessage).appendTo($errorRow);
      return $errorRow;
    }
    return $errorMessage;
  },
  _renderErrorMessage(error) {
    const message = error.url ? error.message.replace(error.url, '') : error.message || error;
    const $message = (0, _renderer.default)('<div>').attr('role', 'alert').attr('aria-roledescription', _message.default.format('dxDataGrid-ariaError')).addClass(ERROR_MESSAGE_CLASS).text(message);
    if (error.url) {
      (0, _renderer.default)('<a>').attr('href', error.url).text(error.url).appendTo($message);
    }
    return $message;
  },
  renderErrorRow(error, rowIndex, $popupContent) {
    const that = this;
    let $errorMessageElement;
    let $firstErrorRow;
    if ($popupContent) {
      $popupContent.find(".".concat(ERROR_MESSAGE_CLASS)).remove();
      $errorMessageElement = that._createErrorRow(error);
      $popupContent.prepend($errorMessageElement);
      return $errorMessageElement;
    }
    const viewElement = rowIndex >= 0 || !that._columnHeadersView.isVisible() ? that._rowsView : that._columnHeadersView;
    const $tableElements = viewElement.getTableElements();
    (0, _iterator.each)($tableElements, (_, tableElement) => {
      $errorMessageElement = that._createErrorRow(error, $tableElements);
      $firstErrorRow = $firstErrorRow || $errorMessageElement;
      if (rowIndex >= 0) {
        const $row = viewElement._getRowElements((0, _renderer.default)(tableElement)).eq(rowIndex);
        that.removeErrorRow($row.next());
        $errorMessageElement.insertAfter($row);
      } else {
        const $tbody = (0, _renderer.default)(tableElement).children('tbody');
        const rowElements = $tbody.children('tr');
        if (that._columnHeadersView.isVisible()) {
          that.removeErrorRow(rowElements.last());
          (0, _renderer.default)(tableElement).append($errorMessageElement);
        } else {
          that.removeErrorRow(rowElements.first());
          $tbody.first().prepend($errorMessageElement);
        }
      }
    });
    const resizingController = that.getController('resizing');
    resizingController && resizingController.fireContentReadyAction();
    return $firstErrorRow;
  },
  removeErrorRow($row) {
    if (!$row) {
      const $columnHeaders = this._columnHeadersView && this._columnHeadersView.element();
      $row = $columnHeaders && $columnHeaders.find(".".concat(ERROR_ROW_CLASS));
      if (!$row || !$row.length) {
        const $rowsViewElement = this._rowsView.element();
        $row = $rowsViewElement && $rowsViewElement.find(".".concat(ERROR_ROW_CLASS));
      }
    }
    $row && $row.hasClass(ERROR_ROW_CLASS) && $row.remove();
  },
  optionChanged(args) {
    const that = this;
    switch (args.name) {
      case 'errorRowEnabled':
        args.handled = true;
        break;
      default:
        that.callBase(args);
    }
  }
});
const errorHandlingModule = {
  defaultOptions() {
    return {
      errorRowEnabled: true
    };
  },
  controllers: {
    errorHandling: ErrorHandlingController
  },
  extenders: {
    controllers: {
      data: {
        init() {
          const that = this;
          const errorHandlingController = that.getController('errorHandling');
          that.callBase();
          that.dataErrorOccurred.add((error, $popupContent) => {
            if (that.option('errorRowEnabled')) {
              errorHandlingController.renderErrorRow(error, undefined, $popupContent);
            }
          });
          that.changed.add(e => {
            if (e && e.changeType === 'loadError') {
              return;
            }
            const errorHandlingController = that.getController('errorHandling');
            const editingController = that.getController('editing');
            if (editingController && !editingController.hasChanges()) {
              errorHandlingController && errorHandlingController.removeErrorRow();
            }
          });
        }
      }
    }
  }
};
exports.errorHandlingModule = errorHandlingModule;