"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingRowBasedModule = void 0;
var _common = require("../../../../core/utils/common");
var _const = require("./const");
var EDIT_ROW = 'dx-edit-row';
var editingRowBasedModule = {
  extenders: {
    controllers: {
      editing: {
        isRowEditMode: function isRowEditMode() {
          return this.getEditMode() === _const.EDIT_MODE_ROW;
        },
        _afterCancelEditData: function _afterCancelEditData(rowIndex) {
          var dataController = this._dataController;
          if (this.isRowBasedEditMode() && rowIndex >= 0) {
            dataController.updateItems({
              changeType: 'update',
              rowIndices: [rowIndex, rowIndex + 1]
            });
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        _isDefaultButtonVisible: function _isDefaultButtonVisible(button, options) {
          var isRowMode = this.isRowBasedEditMode();
          var isEditRow = options.row && (0, _common.equalByValue)(options.row.key, this.option(_const.EDITING_EDITROWKEY_OPTION_NAME));
          if (isRowMode) {
            switch (button.name) {
              case 'edit':
                return !isEditRow && this.allowUpdating(options);
              case 'delete':
                return this.callBase.apply(this, arguments) && !isEditRow;
              case 'save':
              case 'cancel':
                return isEditRow;
              default:
                return this.callBase.apply(this, arguments);
            }
          }
          return this.callBase.apply(this, arguments);
        },
        isEditRow: function isEditRow(rowIndex) {
          return this.isRowBasedEditMode() && this.isEditRowByIndex(rowIndex);
        },
        _cancelSaving: function _cancelSaving() {
          if (this.isRowBasedEditMode()) {
            if (!this.hasChanges()) {
              this._cancelEditDataCore();
            }
          }
          this.callBase.apply(this, arguments);
        },
        _refreshCore: function _refreshCore(params) {
          var _ref = params !== null && params !== void 0 ? params : {},
            allowCancelEditing = _ref.allowCancelEditing;
          if (this.isRowBasedEditMode()) {
            var hasUpdateChanges = this.getChanges().filter(function (it) {
              return it.type === 'update';
            }).length > 0;
            this.init();
            allowCancelEditing && hasUpdateChanges && this._cancelEditDataCore();
          }
          this.callBase.apply(this, arguments);
        },
        _isEditColumnVisible: function _isEditColumnVisible() {
          var result = this.callBase.apply(this, arguments);
          var editingOptions = this.option('editing');
          var isRowEditMode = this.isRowEditMode();
          var isVisibleInRowEditMode = editingOptions.allowUpdating || editingOptions.allowAdding;
          return result || isRowEditMode && isVisibleInRowEditMode;
        },
        _focusEditorIfNeed: function _focusEditorIfNeed() {
          var _this = this;
          var editMode = this.getEditMode();
          if (this._needFocusEditor) {
            if (_const.MODES_WITH_DELAYED_FOCUS.includes(editMode)) {
              var $editingCell = this.getFocusedCellInRow(this._getVisibleEditRowIndex());
              this._delayedInputFocus($editingCell, function () {
                $editingCell && _this.component.focus($editingCell);
              });
            }
            this._needFocusEditor = false;
          }
        }
      },
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _getChangedColumnIndices: function _getChangedColumnIndices(oldItem, newItem, rowIndex, isLiveUpdate) {
          var editingController = this.getController('editing');
          if (editingController.isRowBasedEditMode() && oldItem.isEditing !== newItem.isEditing) {
            return;
          }
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        _createRow: function _createRow(row) {
          var $row = this.callBase.apply(this, arguments);
          if (row) {
            var editingController = this._editingController;
            var isEditRow = editingController.isEditRow(row.rowIndex);
            if (isEditRow) {
              $row.addClass(EDIT_ROW);
              $row.removeClass(_const.ROW_SELECTED_CLASS);
              if (row.rowType === 'detail') {
                $row.addClass(this.addWidgetPrefix(_const.EDIT_FORM_CLASS));
              }
            }
          }
          return $row;
        },
        _update: function _update(change) {
          this.callBase(change);
          if (change.changeType === 'updateSelection') {
            this.getTableElements().children('tbody').children(".".concat(EDIT_ROW)).removeClass(_const.ROW_SELECTED_CLASS);
          }
        }
      }
    }
  }
};
exports.editingRowBasedModule = editingRowBasedModule;