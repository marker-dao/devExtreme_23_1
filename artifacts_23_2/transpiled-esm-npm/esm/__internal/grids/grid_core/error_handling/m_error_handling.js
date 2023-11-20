import $ from '../../../../core/renderer';
import { each } from '../../../../core/utils/iterator';
import { name as clickEventName } from '../../../../events/click';
import eventsEngine from '../../../../events/core/events_engine';
import messageLocalization from '../../../../localization/message';
import modules from '../m_modules';
var ERROR_ROW_CLASS = 'dx-error-row';
var ERROR_MESSAGE_CLASS = 'dx-error-message';
var ERROR_CLOSEBUTTON_CLASS = 'dx-closebutton';
var ACTION_CLASS = 'action';
var ErrorHandlingController = modules.ViewController.inherit({
  init() {
    var that = this;
    that._columnHeadersView = that.getView('columnHeadersView');
    that._rowsView = that.getView('rowsView');
  },
  _createErrorRow(error, $tableElements) {
    var that = this;
    var $errorRow;
    var $closeButton;
    var $errorMessage = this._renderErrorMessage(error);
    if ($tableElements) {
      $errorRow = $('<tr>').attr('role', 'row').addClass(ERROR_ROW_CLASS);
      $closeButton = $('<div>').addClass(ERROR_CLOSEBUTTON_CLASS).addClass(that.addWidgetPrefix(ACTION_CLASS));
      eventsEngine.on($closeButton, clickEventName, that.createAction(args => {
        var e = args.event;
        var $errorRow;
        var errorRowIndex = $(e.currentTarget).closest(".".concat(ERROR_ROW_CLASS)).index();
        e.stopPropagation();
        each($tableElements, (_, tableElement) => {
          $errorRow = $(tableElement).children('tbody').children('tr').eq(errorRowIndex);
          that.removeErrorRow($errorRow);
        });
        that.getController('resizing') && that.getController('resizing').fireContentReadyAction();
      }));
      $('<td>')
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
    var message = error.url ? error.message.replace(error.url, '') : error.message || error;
    var $message = $('<div>').attr('role', 'alert').attr('aria-roledescription', messageLocalization.format('dxDataGrid-ariaError')).addClass(ERROR_MESSAGE_CLASS).text(message);
    if (error.url) {
      $('<a>').attr('href', error.url).text(error.url).appendTo($message);
    }
    return $message;
  },
  renderErrorRow(error, rowIndex, $popupContent) {
    var that = this;
    var $errorMessageElement;
    var $firstErrorRow;
    if ($popupContent) {
      $popupContent.find(".".concat(ERROR_MESSAGE_CLASS)).remove();
      $errorMessageElement = that._createErrorRow(error);
      $popupContent.prepend($errorMessageElement);
      return $errorMessageElement;
    }
    var viewElement = rowIndex >= 0 || !that._columnHeadersView.isVisible() ? that._rowsView : that._columnHeadersView;
    var $tableElements = viewElement.getTableElements();
    each($tableElements, (_, tableElement) => {
      $errorMessageElement = that._createErrorRow(error, $tableElements);
      $firstErrorRow = $firstErrorRow || $errorMessageElement;
      if (rowIndex >= 0) {
        var $row = viewElement._getRowElements($(tableElement)).eq(rowIndex);
        that.removeErrorRow($row.next());
        $errorMessageElement.insertAfter($row);
      } else {
        var $tbody = $(tableElement).children('tbody');
        var rowElements = $tbody.children('tr');
        if (that._columnHeadersView.isVisible()) {
          that.removeErrorRow(rowElements.last());
          $(tableElement).append($errorMessageElement);
        } else {
          that.removeErrorRow(rowElements.first());
          $tbody.first().prepend($errorMessageElement);
        }
      }
    });
    var resizingController = that.getController('resizing');
    resizingController && resizingController.fireContentReadyAction();
    return $firstErrorRow;
  },
  removeErrorRow($row) {
    if (!$row) {
      var $columnHeaders = this._columnHeadersView && this._columnHeadersView.element();
      $row = $columnHeaders && $columnHeaders.find(".".concat(ERROR_ROW_CLASS));
      if (!$row || !$row.length) {
        var $rowsViewElement = this._rowsView.element();
        $row = $rowsViewElement && $rowsViewElement.find(".".concat(ERROR_ROW_CLASS));
      }
    }
    $row && $row.hasClass(ERROR_ROW_CLASS) && $row.remove();
  },
  optionChanged(args) {
    var that = this;
    switch (args.name) {
      case 'errorRowEnabled':
        args.handled = true;
        break;
      default:
        that.callBase(args);
    }
  }
});
export var errorHandlingModule = {
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
          var that = this;
          var errorHandlingController = that.getController('errorHandling');
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
            var errorHandlingController = that.getController('errorHandling');
            var editingController = that.getController('editing');
            if (editingController && !editingController.hasChanges()) {
              errorHandlingController && errorHandlingController.removeErrorRow();
            }
          });
        }
      }
    }
  }
};