/**
* DevExtreme (esm/__internal/grids/grid_core/editing/module_cell_based.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import domAdapter from '../../../../core/dom_adapter';
import eventsEngine from '../../../../events/core/events_engine';
import { isDefined, isString } from '../../../../core/utils/type';
import { isElementInDom } from '../../../../core/utils/dom';
import { name as clickEventName } from '../../../../events/click';
import pointerEvents from '../../../../events/pointer';
import { addNamespace } from '../../../../events/utils/index';
import holdEvent from '../../../../events/hold';
import { when, Deferred } from '../../../../core/utils/deferred';
import { deferRender } from '../../../../core/utils/common';
import { createObjectWithChanges } from '../../../../data/array_utils';
import { EDIT_MODE_BATCH, EDIT_MODE_CELL, TARGET_COMPONENT_NAME } from './const';
var FOCUS_OVERLAY_CLASS = 'focus-overlay';
var ADD_ROW_BUTTON_CLASS = 'addrow-button';
var DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
var EDITOR_CELL_CLASS = 'dx-editor-cell';
var ROW_CLASS = 'dx-row';
var CELL_MODIFIED_CLASS = 'dx-cell-modified';
var DATA_ROW_CLASS = 'dx-data-row';
var ROW_REMOVED = 'dx-row-removed';
var EDITING_EDITROWKEY_OPTION_NAME = 'editing.editRowKey';
var EDITING_EDITCOLUMNNAME_OPTION_NAME = 'editing.editColumnName';
var DATA_EDIT_DATA_REMOVE_TYPE = 'remove';
function isEditable($element) {
  return $element && ($element.is('input') || $element.is('textarea'));
}
export var editingCellBasedModule = {
  extenders: {
    controllers: {
      editing: {
        init() {
          var needCreateHandlers = !this._saveEditorHandler;
          this.callBase.apply(this, arguments);
          if (needCreateHandlers) {
            // chrome 73+
            var $pointerDownTarget;
            var isResizing;
            this._pointerUpEditorHandler = () => {
              var _a;
              isResizing = (_a = this.getController('columnsResizer')) === null || _a === void 0 ? void 0 : _a.isResizing();
            };
            // eslint-disable-next-line no-return-assign
            this._pointerDownEditorHandler = e => $pointerDownTarget = $(e.target);
            this._saveEditorHandler = this.createAction(function (e) {
              var {
                event
              } = e;
              var $target = $(event.target);
              var targetComponent = event[TARGET_COMPONENT_NAME];
              var {
                component
              } = this;
              if (isEditable($pointerDownTarget) && !$pointerDownTarget.is($target)) {
                return;
              }
              function checkEditorPopup($element) {
                if (!$element) {
                  return false;
                }
                var $dropDownEditorOverlay = $element.closest(".".concat(DROPDOWN_EDITOR_OVERLAY_CLASS));
                var $componentElement = component.$element();
                return $dropDownEditorOverlay.length > 0 && $componentElement.closest($dropDownEditorOverlay).length === 0;
              }
              if (this.isCellOrBatchEditMode() && !this._editCellInProgress) {
                var isEditorPopup = checkEditorPopup($target) || checkEditorPopup(targetComponent === null || targetComponent === void 0 ? void 0 : targetComponent.$element());
                var isAnotherComponent = targetComponent && !targetComponent._disposed && targetComponent !== this.component;
                var isAddRowButton = !!$target.closest(".".concat(this.addWidgetPrefix(ADD_ROW_BUTTON_CLASS))).length;
                var isFocusOverlay = $target.hasClass(this.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
                var isCellEditMode = this.isCellEditMode();
                if (!isResizing && !isEditorPopup && !isFocusOverlay && !(isAddRowButton && isCellEditMode && this.isEditing()) && (isElementInDom($target) || isAnotherComponent)) {
                  this._closeEditItem.bind(this)($target);
                }
              }
            });
            eventsEngine.on(domAdapter.getDocument(), pointerEvents.up, this._pointerUpEditorHandler);
            eventsEngine.on(domAdapter.getDocument(), pointerEvents.down, this._pointerDownEditorHandler);
            eventsEngine.on(domAdapter.getDocument(), clickEventName, this._saveEditorHandler);
          }
        },
        isCellEditMode() {
          return this.option('editing.mode') === EDIT_MODE_CELL;
        },
        isBatchEditMode() {
          return this.option('editing.mode') === EDIT_MODE_BATCH;
        },
        isCellOrBatchEditMode() {
          return this.isCellEditMode() || this.isBatchEditMode();
        },
        _needToCloseEditableCell($targetElement) {
          var $element = this.component.$element();
          var result = this.isEditing();
          var isCurrentComponentElement = !$element || !!$targetElement.closest($element).length;
          if (isCurrentComponentElement) {
            var isDataRow = $targetElement.closest(".".concat(DATA_ROW_CLASS)).length;
            if (isDataRow) {
              var rowsView = this.getView('rowsView');
              var $targetCell = $targetElement.closest(".".concat(ROW_CLASS, "> td"));
              var rowIndex = rowsView.getRowIndex($targetCell.parent());
              var columnIndex = rowsView.getCellElements(rowIndex).index($targetCell);
              var visibleColumns = this._columnsController.getVisibleColumns();
              // TODO jsdmitry: Move this code to _rowClick method of rowsView
              var allowEditing = visibleColumns[columnIndex] && visibleColumns[columnIndex].allowEditing;
              result = result && !allowEditing && !this.isEditCell(rowIndex, columnIndex);
            }
          }
          return result || this.callBase.apply(this, arguments);
        },
        _closeEditItem($targetElement) {
          if (this._needToCloseEditableCell($targetElement)) {
            this.closeEditCell();
          }
        },
        _focusEditorIfNeed() {
          var _a;
          if (this._needFocusEditor && this.isCellOrBatchEditMode()) {
            var editColumnIndex = this._getVisibleEditColumnIndex();
            var $cell = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a._getCellElement(this._getVisibleEditRowIndex(), editColumnIndex); // T319885
            if ($cell && !$cell.find(':focus').length) {
              this._focusEditingCell(() => {
                this._editCellInProgress = false;
              }, $cell, true);
            } else {
              this._editCellInProgress = false;
            }
            this._needFocusEditor = false;
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        isEditing() {
          if (this.isCellOrBatchEditMode()) {
            var isEditRowKeyDefined = isDefined(this.option(EDITING_EDITROWKEY_OPTION_NAME));
            var isEditColumnNameDefined = isDefined(this.option(EDITING_EDITCOLUMNNAME_OPTION_NAME));
            return isEditRowKeyDefined && isEditColumnNameDefined;
          }
          return this.callBase.apply(this, arguments);
        },
        _handleEditColumnNameChange(args) {
          var oldRowIndex = this._getVisibleEditRowIndex(args.previousValue);
          if (this.isCellOrBatchEditMode() && oldRowIndex !== -1 && isDefined(args.value) && args.value !== args.previousValue) {
            var columnIndex = this._columnsController.getVisibleColumnIndex(args.value);
            var oldColumnIndex = this._columnsController.getVisibleColumnIndex(args.previousValue);
            this._editCellFromOptionChanged(columnIndex, oldColumnIndex, oldRowIndex);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _addRow(parentKey, deferred) {
          if (this.isCellEditMode() && this.hasChanges()) {
            // @ts-expect-error
            var _deferred = new Deferred();
            this.saveEditData().done(() => {
              // T804894
              if (!this.hasChanges()) {
                this.addRow(parentKey).done(_deferred.resolve).fail(_deferred.reject);
              } else {
                _deferred.reject('cancel');
              }
            });
            return _deferred.promise();
          }
          return this.callBase.apply(this, arguments);
        },
        editCell(rowIndex, columnIndex) {
          return this._editCell({
            rowIndex,
            columnIndex
          });
        },
        _editCell(options) {
          // @ts-expect-error
          var d = new Deferred();
          var coreResult;
          this.executeOperation(d, () => {
            coreResult = this._editCellCore(options);
            when(coreResult).done(d.resolve).fail(d.reject);
          });
          return coreResult !== undefined ? coreResult : d.promise();
        },
        _editCellCore(options) {
          var dataController = this._dataController;
          var isEditByOptionChanged = isDefined(options.oldColumnIndex) || isDefined(options.oldRowIndex);
          var {
            columnIndex,
            rowIndex,
            column,
            item
          } = this._getNormalizedEditCellOptions(options);
          var params = {
            data: item === null || item === void 0 ? void 0 : item.data,
            cancel: false,
            column
          };
          if (item.key === undefined) {
            this._dataController.fireError('E1043');
            return;
          }
          if (column && (item.rowType === 'data' || item.rowType === 'detailAdaptive') && !item.removed && this.isCellOrBatchEditMode()) {
            if (!isEditByOptionChanged && this.isEditCell(rowIndex, columnIndex)) {
              return true;
            }
            var editRowIndex = rowIndex + dataController.getRowIndexOffset();
            return when(this._beforeEditCell(rowIndex, columnIndex, item)).done(cancel => {
              if (cancel) {
                return;
              }
              if (!this._prepareEditCell(params, item, columnIndex, editRowIndex)) {
                this._processCanceledEditingCell();
              }
            });
          }
          return false;
        },
        _beforeEditCell(rowIndex, columnIndex, item) {
          if (this.isCellEditMode() && !item.isNewRow && this.hasChanges()) {
            // @ts-expect-error
            var d = new Deferred();
            this.saveEditData().always(() => {
              d.resolve(this.hasChanges());
            });
            return d;
          }
        },
        publicMethods() {
          var publicMethods = this.callBase.apply(this, arguments);
          return publicMethods.concat(['editCell', 'closeEditCell']);
        },
        _getNormalizedEditCellOptions(_ref) {
          var {
            oldColumnIndex,
            oldRowIndex,
            columnIndex,
            rowIndex
          } = _ref;
          var columnsController = this._columnsController;
          var visibleColumns = columnsController.getVisibleColumns();
          var items = this._dataController.items();
          var item = items[rowIndex];
          var oldColumn;
          if (isDefined(oldColumnIndex)) {
            oldColumn = visibleColumns[oldColumnIndex];
          } else {
            oldColumn = this._getEditColumn();
          }
          if (!isDefined(oldRowIndex)) {
            oldRowIndex = this._getVisibleEditRowIndex();
          }
          if (isString(columnIndex)) {
            columnIndex = columnsController.columnOption(columnIndex, 'index');
            columnIndex = columnsController.getVisibleIndex(columnIndex);
          }
          var column = visibleColumns[columnIndex];
          return {
            oldColumn,
            columnIndex,
            oldRowIndex,
            rowIndex,
            column,
            item
          };
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _prepareEditCell(params, item, editColumnIndex, editRowIndex) {
          var _a;
          if (!item.isNewRow) {
            params.key = item.key;
          }
          if (this._isEditingStart(params)) {
            return false;
          }
          this._pageIndex = this._dataController.pageIndex();
          this._setEditRowKey(item.key);
          this._setEditColumnNameByIndex(editColumnIndex);
          if (!params.column.showEditorAlways) {
            this._addInternalData({
              key: item.key,
              oldData: (_a = item.oldData) !== null && _a !== void 0 ? _a : item.data
            });
          }
          return true;
        },
        closeEditCell(isError, withoutSaveEditData) {
          var result = when();
          var oldEditRowIndex = this._getVisibleEditRowIndex();
          if (this.isCellOrBatchEditMode()) {
            // @ts-expect-error
            var deferred = new Deferred();
            // @ts-expect-error
            result = new Deferred();
            this.executeOperation(deferred, () => {
              this._closeEditCellCore(isError, oldEditRowIndex, withoutSaveEditData).always(result.resolve);
            });
          }
          return result.promise();
        },
        _closeEditCellCore(isError, oldEditRowIndex, withoutSaveEditData) {
          var dataController = this._dataController;
          // @ts-expect-error
          var deferred = new Deferred();
          var promise = deferred.promise();
          if (this.isCellEditMode() && this.hasChanges()) {
            if (!withoutSaveEditData) {
              this.saveEditData().done(error => {
                if (!this.hasChanges()) {
                  this.closeEditCell(!!error).always(deferred.resolve);
                  return;
                }
                deferred.resolve();
              });
              return promise;
            }
          } else {
            this._resetEditRowKey();
            this._resetEditColumnName();
            if (oldEditRowIndex >= 0) {
              var rowIndices = [oldEditRowIndex];
              this._beforeCloseEditCellInBatchMode(rowIndices);
              if (!isError) {
                dataController.updateItems({
                  changeType: 'update',
                  rowIndices
                });
              }
            }
          }
          deferred.resolve();
          return promise;
        },
        _resetModifiedClassCells(changes) {
          if (this.isBatchEditMode()) {
            var columnsCount = this._columnsController.getVisibleColumns().length;
            changes.forEach(_ref2 => {
              var {
                key
              } = _ref2;
              var rowIndex = this._dataController.getRowIndexByKey(key);
              if (rowIndex !== -1) {
                for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                  this._rowsView._getCellElement(rowIndex, columnIndex).removeClass(CELL_MODIFIED_CLASS);
                }
              }
            });
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _prepareChange(options, value, text) {
          var $cellElement = $(options.cellElement);
          if (this.isBatchEditMode() && options.key !== undefined) {
            this._applyModified($cellElement, options);
          }
          return this.callBase.apply(this, arguments);
        },
        _cancelSaving() {
          var dataController = this._dataController;
          if (this.isCellOrBatchEditMode()) {
            if (this.isBatchEditMode()) {
              this._resetEditIndices();
            }
            dataController.updateItems();
          }
          this.callBase.apply(this, arguments);
        },
        optionChanged(args) {
          var {
            fullName
          } = args;
          if (args.name === 'editing' && fullName === EDITING_EDITCOLUMNNAME_OPTION_NAME) {
            this._handleEditColumnNameChange(args);
            args.handled = true;
          } else {
            this.callBase(args);
          }
        },
        _editCellFromOptionChanged(columnIndex, oldColumnIndex, oldRowIndex) {
          var columns = this._columnsController.getVisibleColumns();
          if (columnIndex > -1) {
            deferRender(() => {
              this._repaintEditCell(columns[columnIndex], columns[oldColumnIndex], oldRowIndex);
            });
          }
        },
        _handleEditRowKeyChange(args) {
          var _a;
          if (this.isCellOrBatchEditMode()) {
            var columnIndex = this._getVisibleEditColumnIndex();
            var oldRowIndexCorrection = this._getEditRowIndexCorrection();
            var oldRowIndex = this._dataController.getRowIndexByKey(args.previousValue) + oldRowIndexCorrection;
            if (isDefined(args.value) && args.value !== args.previousValue) {
              (_a = this._editCellFromOptionChanged) === null || _a === void 0 ? void 0 : _a.call(this, columnIndex, columnIndex, oldRowIndex);
            }
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        deleteRow(rowIndex) {
          if (this.isCellEditMode() && this.isEditing()) {
            var {
              isNewRow
            } = this._dataController.items()[rowIndex];
            var rowKey = this._dataController.getKeyByRowIndex(rowIndex);
            // T850905
            this.closeEditCell(null, isNewRow).always(() => {
              rowIndex = this._dataController.getRowIndexByKey(rowKey);
              this._checkAndDeleteRow(rowIndex);
            });
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        _checkAndDeleteRow(rowIndex) {
          if (this.isBatchEditMode()) {
            this._deleteRowCore(rowIndex);
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        _refreshCore(params) {
          var {
            isPageChanged
          } = params !== null && params !== void 0 ? params : {};
          var needResetIndexes = this.isBatchEditMode() || isPageChanged && this.option('scrolling.mode') !== 'virtual';
          if (this.isCellOrBatchEditMode()) {
            if (needResetIndexes) {
              this._resetEditColumnName();
              this._resetEditRowKey();
            }
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _allowRowAdding(params) {
          if (this.isBatchEditMode()) {
            return true;
          }
          return this.callBase.apply(this, arguments);
        },
        _afterDeleteRow(rowIndex, oldEditRowIndex) {
          var dataController = this._dataController;
          if (this.isBatchEditMode()) {
            dataController.updateItems({
              changeType: 'update',
              rowIndices: [oldEditRowIndex, rowIndex]
            });
            // @ts-expect-error
            return new Deferred().resolve();
          }
          return this.callBase.apply(this, arguments);
        },
        _updateEditRow(row, forceUpdateRow, isCustomSetCellValue) {
          if (this.isCellOrBatchEditMode()) {
            this._updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue);
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        _isDefaultButtonVisible(button, options) {
          if (this.isCellOrBatchEditMode()) {
            var isBatchMode = this.isBatchEditMode();
            switch (button.name) {
              case 'save':
              case 'cancel':
              case 'edit':
                return false;
              case 'delete':
                return this.callBase.apply(this, arguments) && (!isBatchMode || !options.row.removed);
              case 'undelete':
                return isBatchMode && this.allowDeleting(options) && options.row.removed;
              default:
                return this.callBase.apply(this, arguments);
            }
          }
          return this.callBase.apply(this, arguments);
        },
        _isRowDeleteAllowed() {
          var callBase = this.callBase.apply(this, arguments);
          return callBase || this.isBatchEditMode();
        },
        _beforeEndSaving(changes) {
          var _a;
          if (this.isCellEditMode()) {
            if (((_a = changes[0]) === null || _a === void 0 ? void 0 : _a.type) !== 'update') {
              this.callBase.apply(this, arguments);
            }
          } else {
            if (this.isBatchEditMode()) {
              this._resetModifiedClassCells(changes);
            }
            this.callBase.apply(this, arguments);
          }
        },
        prepareEditButtons(headerPanel) {
          var editingOptions = this.option('editing') || {};
          var buttonItems = this.callBase.apply(this, arguments);
          if ((editingOptions.allowUpdating || editingOptions.allowAdding || editingOptions.allowDeleting) && this.isBatchEditMode()) {
            buttonItems.push(this.prepareButtonItem(headerPanel, 'save', 'saveEditData', 21));
            buttonItems.push(this.prepareButtonItem(headerPanel, 'revert', 'cancelEditData', 22));
          }
          return buttonItems;
        },
        _saveEditDataInner() {
          var editRow = this._dataController.getVisibleRows()[this.getEditRowIndex()];
          var editColumn = this._getEditColumn();
          var showEditorAlways = editColumn === null || editColumn === void 0 ? void 0 : editColumn.showEditorAlways;
          var isUpdateInCellMode = this.isCellEditMode() && !(editRow === null || editRow === void 0 ? void 0 : editRow.isNewRow);
          var deferred;
          if (isUpdateInCellMode && showEditorAlways) {
            // @ts-expect-error
            deferred = new Deferred();
            this.addDeferred(deferred);
          }
          return this.callBase.apply(this, arguments).always(deferred === null || deferred === void 0 ? void 0 : deferred.resolve);
        },
        _applyChange(options, params, forceUpdateRow) {
          var isUpdateInCellMode = this.isCellEditMode() && options.row && !options.row.isNewRow;
          var {
            showEditorAlways
          } = options.column;
          var isCustomSetCellValue = options.column.setCellValue !== options.column.defaultSetCellValue;
          var focusPreviousEditingCell = showEditorAlways && !forceUpdateRow && isUpdateInCellMode && this.hasEditData() && !this.isEditCell(options.rowIndex, options.columnIndex);
          if (focusPreviousEditingCell) {
            this._focusEditingCell();
            this._updateEditRow(options.row, true, isCustomSetCellValue);
            return;
          }
          return this.callBase.apply(this, arguments);
        },
        _applyChangeCore(options, forceUpdateRow) {
          var {
            showEditorAlways
          } = options.column;
          var isUpdateInCellMode = this.isCellEditMode() && options.row && !options.row.isNewRow;
          if (showEditorAlways && !forceUpdateRow) {
            if (isUpdateInCellMode) {
              this._setEditRowKey(options.row.key, true);
              this._setEditColumnNameByIndex(options.columnIndex, true);
              return this.saveEditData();
            }
            if (this.isBatchEditMode()) {
              forceUpdateRow = this._needUpdateRow(options.column);
              return this.callBase(options, forceUpdateRow);
            }
          }
          return this.callBase.apply(this, arguments);
        },
        _processDataItemCore(item, _ref3) {
          var {
            data,
            type
          } = _ref3;
          if (this.isBatchEditMode() && type === DATA_EDIT_DATA_REMOVE_TYPE) {
            item.data = createObjectWithChanges(item.data, data);
          }
          this.callBase.apply(this, arguments);
        },
        _processRemoveCore(changes, editIndex, processIfBatch) {
          if (this.isBatchEditMode() && !processIfBatch) {
            return;
          }
          return this.callBase.apply(this, arguments);
        },
        _processRemoveIfError() {
          if (this.isBatchEditMode()) {
            return;
          }
          return this.callBase.apply(this, arguments);
        },
        _beforeFocusElementInRow(rowIndex) {
          this.callBase.apply(this, arguments);
          var editRowIndex = rowIndex >= 0 ? rowIndex : 0;
          var columnIndex = this.getFirstEditableColumnIndex();
          columnIndex >= 0 && this.editCell(editRowIndex, columnIndex);
        }
      }
    },
    views: {
      rowsView: {
        _createTable() {
          var $table = this.callBase.apply(this, arguments);
          var editingController = this._editingController;
          if (editingController.isCellOrBatchEditMode() && this.option('editing.allowUpdating')) {
            eventsEngine.on($table, addNamespace(holdEvent.name, 'dxDataGridRowsView'), "td:not(.".concat(EDITOR_CELL_CLASS, ")"), this.createAction(() => {
              if (editingController.isEditing()) {
                editingController.closeEditCell();
              }
            }));
          }
          return $table;
        },
        _createRow(row) {
          var $row = this.callBase.apply(this, arguments);
          if (row) {
            var editingController = this._editingController;
            var isRowRemoved = !!row.removed;
            if (editingController.isBatchEditMode()) {
              isRowRemoved && $row.addClass(ROW_REMOVED);
            }
          }
          return $row;
        }
      },
      headerPanel: {
        isVisible() {
          var editingOptions = this.getController('editing').option('editing');
          return this.callBase() || editingOptions && (editingOptions.allowUpdating || editingOptions.allowDeleting) && editingOptions.mode === EDIT_MODE_BATCH;
        }
      }
    }
  }
};
