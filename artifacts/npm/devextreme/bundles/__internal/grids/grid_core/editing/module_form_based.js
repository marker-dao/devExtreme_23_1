/**
* DevExtreme (bundles/__internal/grids/grid_core/editing/module_form_based.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingFormBasedModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _type = require("../../../../core/utils/type");
var _iterator = require("../../../../core/utils/iterator");
var _extend = require("../../../../core/utils/extend");
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _form = _interopRequireDefault(require("../../../../ui/form"));
var _deferred = require("../../../../core/utils/deferred");
var _common = require("../../../../core/utils/common");
var _dom = require("../../../../core/utils/dom");
var _ui = _interopRequireDefault(require("../../../../ui/scroll_view/ui.scrollable"));
var _ui2 = _interopRequireDefault(require("../../../../ui/popup/ui.popup"));
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var isRenovatedScrollable = !!_ui.default.IS_RENOVATED_WIDGET;
var EDIT_FORM_ITEM_CLASS = 'edit-form-item';
var EDIT_POPUP_CLASS = 'edit-popup';
var EDIT_POPUP_FORM_CLASS = 'edit-popup-form';
var FOCUSABLE_ELEMENT_CLASS = isRenovatedScrollable ? 'dx-scrollable' : 'dx-scrollable-container';
var BUTTON_CLASS = 'dx-button';
var FORM_BUTTONS_CONTAINER_CLASS = 'form-buttons-container';
var getEditorType = function getEditorType(item) {
  var _a;
  var column = item.column;
  return item.isCustomEditorType ? item.editorType : (_a = column.formItem) === null || _a === void 0 ? void 0 : _a.editorType;
};
var forEachFormItems = function forEachFormItems(items, callBack) {
  items.forEach(function (item) {
    if (item.items || item.tabs) {
      forEachFormItems(item.items || item.tabs, callBack);
    } else {
      callBack(item);
    }
  });
};
var editingFormBasedModule = {
  extenders: {
    controllers: {
      editing: {
        init: function init() {
          this._editForm = null;
          this._updateEditFormDeferred = null;
          this.callBase.apply(this, arguments);
        },
        isFormOrPopupEditMode: function isFormOrPopupEditMode() {
          return this.isPopupEditMode() || this.isFormEditMode();
        },
        isPopupEditMode: function isPopupEditMode() {
          var editMode = this.option('editing.mode');
          return editMode === _const.EDIT_MODE_POPUP;
        },
        isFormEditMode: function isFormEditMode() {
          var editMode = this.option('editing.mode');
          return editMode === _const.EDIT_MODE_FORM;
        },
        getFirstEditableColumnIndex: function getFirstEditableColumnIndex() {
          var firstFormItem = this._firstFormItem;
          if (this.isFormEditMode() && firstFormItem) {
            var editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
            var editRowIndex = this._dataController.getRowIndexByKey(editRowKey);
            var $editFormElements = this._rowsView.getCellElements(editRowIndex);
            return this._rowsView._getEditFormEditorVisibleIndex($editFormElements, firstFormItem.column);
          }
          return this.callBase.apply(this, arguments);
        },
        getEditFormRowIndex: function getEditFormRowIndex() {
          return this.isFormOrPopupEditMode() ? this._getVisibleEditRowIndex() : this.callBase.apply(this, arguments);
        },
        _isEditColumnVisible: function _isEditColumnVisible() {
          var result = this.callBase.apply(this, arguments);
          var editingOptions = this.option('editing');
          return this.isFormOrPopupEditMode() ? editingOptions.allowUpdating || result : result;
        },
        _handleDataChanged: function _handleDataChanged(args) {
          var _a, _b;
          if (this.isPopupEditMode()) {
            var editRowKey = this.option('editing.editRowKey');
            var hasEditRow = (_a = args === null || args === void 0 ? void 0 : args.items) === null || _a === void 0 ? void 0 : _a.some(function (item) {
              return (0, _common.equalByValue)(item.key, editRowKey);
            });
            var onlyInsertChanges = ((_b = args.changeTypes) === null || _b === void 0 ? void 0 : _b.length) && args.changeTypes.every(function (item) {
              return item === 'insert';
            });
            if ((args.changeType === 'refresh' || hasEditRow && args.isOptionChanged) && !onlyInsertChanges) {
              this._repaintEditPopup();
            }
          }
          this.callBase.apply(this, arguments);
        },
        getPopupContent: function getPopupContent() {
          var _a;
          var popupVisible = (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible');
          if (this.isPopupEditMode() && popupVisible) {
            return this._$popupContent;
          }
        },
        _showAddedRow: function _showAddedRow(rowIndex) {
          if (this.isPopupEditMode()) {
            this._showEditPopup(rowIndex);
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        _cancelEditDataCore: function _cancelEditDataCore() {
          this.callBase.apply(this, arguments);
          if (this.isPopupEditMode()) {
            this._hideEditPopup();
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _updateEditRowCore: function _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
          var _a;
          var editForm = this._editForm;
          if (this.isPopupEditMode()) {
            if (this.option('repaintChangesOnly')) {
              (_a = row.update) === null || _a === void 0 ? void 0 : _a.call(row, row);
              this._rowsView.renderDelayedTemplates();
            } else if (editForm) {
              // @ts-expect-error
              this._updateEditFormDeferred = new _deferred.Deferred().done(function () {
                return editForm.repaint();
              });
              if (!this._updateLockCount) {
                this._updateEditFormDeferred.resolve();
              }
            }
          } else {
            this.callBase.apply(this, arguments);
          }
        },
        _showEditPopup: function _showEditPopup(rowIndex, repaintForm) {
          var _this = this;
          var isMobileDevice = _devices.default.current().deviceType !== 'desktop';
          var editPopupClass = this.addWidgetPrefix(EDIT_POPUP_CLASS);
          var popupOptions = (0, _extend.extend)({
            showTitle: false,
            fullScreen: isMobileDevice,
            wrapperAttr: {
              class: editPopupClass
            },
            toolbarItems: [{
              toolbar: 'bottom',
              location: 'after',
              widget: 'dxButton',
              options: this._getSaveButtonConfig()
            }, {
              toolbar: 'bottom',
              location: 'after',
              widget: 'dxButton',
              options: this._getCancelButtonConfig()
            }],
            contentTemplate: this._getPopupEditFormTemplate(rowIndex)
          }, this.option(_const.EDITING_POPUP_OPTION_NAME));
          if (!this._editPopup) {
            var $popupContainer = (0, _renderer.default)('<div>').appendTo(this.component.$element()).addClass(editPopupClass);
            this._editPopup = this._createComponent($popupContainer, _ui2.default);
            this._editPopup.on('hiding', this._getEditPopupHiddenHandler());
            this._editPopup.on('shown', function (e) {
              var _a;
              _events_engine.default.trigger(e.component.$content().find(_const.FOCUSABLE_ELEMENT_SELECTOR).not(".".concat(FOCUSABLE_ELEMENT_CLASS)).first(), 'focus');
              if (repaintForm) {
                (_a = _this._editForm) === null || _a === void 0 ? void 0 : _a.repaint();
              }
            });
          }
          this._editPopup.option(popupOptions);
          this._editPopup.show();
          this.callBase.apply(this, arguments);
        },
        _getPopupEditFormTemplate: function _getPopupEditFormTemplate(rowIndex) {
          var _this2 = this;
          var row = this.component.getVisibleRows()[rowIndex];
          var templateOptions = {
            row: row,
            values: row.values,
            rowType: row.rowType,
            key: row.key,
            rowIndex: rowIndex
          };
          this._rowsView._addWatchMethod(templateOptions, row);
          return function (container) {
            var formTemplate = _this2.getEditFormTemplate();
            var scrollable = _this2._createComponent((0, _renderer.default)('<div>').appendTo(container), _ui.default);
            _this2._$popupContent = (0, _renderer.default)(scrollable.content());
            formTemplate(_this2._$popupContent, templateOptions, {
              isPopupForm: true
            });
            _this2._rowsView.renderDelayedTemplates();
          };
        },
        _repaintEditPopup: function _repaintEditPopup() {
          var _a, _b;
          var rowIndex = this._getVisibleEditRowIndex();
          if (rowIndex >= 0) {
            var defaultAnimation = (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('animation');
            (_b = this._editPopup) === null || _b === void 0 ? void 0 : _b.option('animation', null);
            this._showEditPopup(rowIndex, true);
            if (defaultAnimation !== undefined) {
              this._editPopup.option('animation', defaultAnimation);
            }
          }
        },
        _hideEditPopup: function _hideEditPopup() {
          var _a;
          (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible', false);
        },
        optionChanged: function optionChanged(args) {
          if (args.name === 'editing' && this.isFormOrPopupEditMode()) {
            var fullName = args.fullName;
            if (fullName.indexOf(_const.EDITING_FORM_OPTION_NAME) === 0) {
              this._handleFormOptionChange(args);
              args.handled = true;
            } else if (fullName.indexOf(_const.EDITING_POPUP_OPTION_NAME) === 0) {
              this._handlePopupOptionChange(args);
              args.handled = true;
            }
          }
          this.callBase.apply(this, arguments);
        },
        _handleFormOptionChange: function _handleFormOptionChange(args) {
          var _a;
          if (this.isFormEditMode()) {
            var editRowIndex = this._getVisibleEditRowIndex();
            if (editRowIndex >= 0) {
              this._dataController.updateItems({
                changeType: 'update',
                rowIndices: [editRowIndex]
              });
            }
          } else if (((_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible')) && args.fullName.indexOf(_const.EDITING_FORM_OPTION_NAME) === 0) {
            this._repaintEditPopup();
          }
        },
        _handlePopupOptionChange: function _handlePopupOptionChange(args) {
          var editPopup = this._editPopup;
          if (editPopup) {
            var popupOptionName = args.fullName.slice(_const.EDITING_POPUP_OPTION_NAME.length + 1);
            if (popupOptionName) {
              editPopup.option(popupOptionName, args.value);
            } else {
              editPopup.option(args.value);
            }
          }
        },
        renderFormEditorTemplate: function renderFormEditorTemplate(detailCellOptions, item, formTemplateOptions, container, isReadOnly) {
          var _this3 = this;
          var that = this;
          var $container = (0, _renderer.default)(container);
          var column = item.column;
          var editorType = getEditorType(item);
          var rowData = detailCellOptions === null || detailCellOptions === void 0 ? void 0 : detailCellOptions.row.data;
          var form = formTemplateOptions.component;
          var _ref = formTemplateOptions.editorOptions || {},
            label = _ref.label,
            labelMark = _ref.labelMark,
            labelMode = _ref.labelMode;
          var cellOptions = (0, _extend.extend)({}, detailCellOptions, {
            data: rowData,
            cellElement: null,
            isOnForm: true,
            item: item,
            id: form.getItemID(item.name || item.dataField),
            column: (0, _extend.extend)({}, column, {
              editorType: editorType,
              editorOptions: (0, _extend.extend)({
                label: label,
                labelMark: labelMark,
                labelMode: labelMode
              }, column.editorOptions, item.editorOptions)
            }),
            columnIndex: column.index,
            setValue: !isReadOnly && column.allowEditing && function (value, text) {
              that.updateFieldValue(cellOptions, value, text);
            }
          });
          cellOptions.value = column.calculateCellValue(rowData);
          var template = this._getFormEditItemTemplate.bind(this)(cellOptions, column);
          this._rowsView.renderTemplate($container, template, cellOptions, !!(0, _dom.isElementInDom)($container)).done(function () {
            _this3._rowsView._updateCell($container, cellOptions);
          });
          return cellOptions;
        },
        getFormEditorTemplate: function getFormEditorTemplate(cellOptions, item) {
          var _this4 = this;
          var column = this.component.columnOption(item.dataField);
          return function (options, container) {
            var _a, _b;
            var $container = (0, _renderer.default)(container);
            (_b = (_a = cellOptions.row).watch) === null || _b === void 0 ? void 0 : _b.call(_a, function () {
              return column.selector(cellOptions.row.data);
            }, function () {
              var $editorElement = $container.find('.dx-widget').first();
              var validator = $editorElement.data('dxValidator');
              var validatorOptions = validator === null || validator === void 0 ? void 0 : validator.option();
              $container.contents().remove();
              cellOptions = _this4.renderFormEditorTemplate.bind(_this4)(cellOptions, item, options, $container);
              $editorElement = $container.find('.dx-widget').first();
              validator = $editorElement.data('dxValidator');
              if (validatorOptions && !validator) {
                $editorElement.dxValidator({
                  validationRules: validatorOptions.validationRules,
                  validationGroup: validatorOptions.validationGroup,
                  dataGetter: validatorOptions.dataGetter
                });
              }
            });
            cellOptions = _this4.renderFormEditorTemplate.bind(_this4)(cellOptions, item, options, $container);
          };
        },
        getEditFormOptions: function getEditFormOptions(detailOptions) {
          var _this5 = this;
          var _a;
          var editFormOptions = (_a = this._getValidationGroupsInForm) === null || _a === void 0 ? void 0 : _a.call(this, detailOptions);
          var userCustomizeItem = this.option('editing.form.customizeItem');
          var editFormItemClass = this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS);
          var items = this.option('editing.form.items');
          var isCustomEditorType = {};
          if (!items) {
            var columns = this.getController('columns').getColumns();
            items = [];
            (0, _iterator.each)(columns, function (_, column) {
              if (!column.isBand && !column.type) {
                items.push({
                  column: column,
                  name: column.name,
                  dataField: column.dataField
                });
              }
            });
          } else {
            forEachFormItems(items, function (item) {
              var itemId = (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.dataField);
              if (itemId) {
                isCustomEditorType[itemId] = !!item.editorType;
              }
            });
          }
          return (0, _extend.extend)({}, editFormOptions, {
            items: items,
            formID: "dx-".concat(new _guid.default()),
            customizeItem: function customizeItem(item) {
              var column;
              var itemId = item.name || item.dataField;
              if (item.column || itemId) {
                column = item.column || _this5._columnsController.columnOption(item.name ? "name:".concat(item.name) : "dataField:".concat(item.dataField));
              }
              if (column) {
                item.label = item.label || {};
                item.label.text = item.label.text || column.caption;
                if (column.dataType === 'boolean' && item.label.visible === undefined) {
                  var labelMode = _this5.option('editing.form.labelMode');
                  if (labelMode === 'floating' || labelMode === 'static') {
                    item.label.visible = true;
                  }
                }
                item.template = item.template || _this5.getFormEditorTemplate(detailOptions, item);
                item.column = column;
                item.isCustomEditorType = isCustomEditorType[itemId];
                if (column.formItem) {
                  (0, _extend.extend)(item, column.formItem);
                }
                if (item.isRequired === undefined && column.validationRules) {
                  item.isRequired = column.validationRules.some(function (rule) {
                    return rule.type === 'required';
                  });
                  item.validationRules = [];
                }
                var itemVisible = (0, _type.isDefined)(item.visible) ? item.visible : true;
                if (!_this5._firstFormItem && itemVisible) {
                  _this5._firstFormItem = item;
                }
              }
              userCustomizeItem === null || userCustomizeItem === void 0 ? void 0 : userCustomizeItem.call(_this5, item);
              item.cssClass = (0, _type.isString)(item.cssClass) ? "".concat(item.cssClass, " ").concat(editFormItemClass) : editFormItemClass;
            }
          });
        },
        getEditFormTemplate: function getEditFormTemplate() {
          var _this6 = this;
          return function ($container, detailOptions, options) {
            var editFormOptions = _this6.option(_const.EDITING_FORM_OPTION_NAME);
            var baseEditFormOptions = _this6.getEditFormOptions(detailOptions);
            var $formContainer = (0, _renderer.default)('<div>').appendTo($container);
            var isPopupForm = options === null || options === void 0 ? void 0 : options.isPopupForm;
            _this6._firstFormItem = undefined;
            if (isPopupForm) {
              $formContainer.addClass(_this6.addWidgetPrefix(EDIT_POPUP_FORM_CLASS));
            }
            _this6._editForm = _this6._createComponent($formContainer, _form.default, (0, _extend.extend)({}, editFormOptions, baseEditFormOptions));
            if (!isPopupForm) {
              var $buttonsContainer = (0, _renderer.default)('<div>').addClass(_this6.addWidgetPrefix(FORM_BUTTONS_CONTAINER_CLASS)).appendTo($container);
              _this6._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, _this6._getSaveButtonConfig());
              _this6._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, _this6._getCancelButtonConfig());
            }
            _this6._editForm.on('contentReady', function () {
              var _a;
              _this6._rowsView.renderDelayedTemplates();
              (_a = _this6._editPopup) === null || _a === void 0 ? void 0 : _a.repaint();
            });
          };
        },
        getEditForm: function getEditForm() {
          return this._editForm;
        },
        _endUpdateCore: function _endUpdateCore() {
          var _a;
          (_a = this._updateEditFormDeferred) === null || _a === void 0 ? void 0 : _a.resolve();
        },
        _beforeEndSaving: function _beforeEndSaving() {
          var _a;
          this.callBase.apply(this, arguments);
          if (this.isPopupEditMode()) {
            (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.hide();
          }
        },
        _processDataItemCore: function _processDataItemCore(item, _ref2) {
          var type = _ref2.type;
          if (this.isPopupEditMode() && type === _const.DATA_EDIT_DATA_INSERT_TYPE) {
            item.visible = false;
          }
          this.callBase.apply(this, arguments);
        },
        _editRowFromOptionChangedCore: function _editRowFromOptionChangedCore(rowIndices, rowIndex) {
          var isPopupEditMode = this.isPopupEditMode();
          this.callBase(rowIndices, rowIndex, isPopupEditMode);
          if (isPopupEditMode) {
            this._showEditPopup(rowIndex);
          }
        }
      },
      data: {
        _updateEditItem: function _updateEditItem(item) {
          if (this._editingController.isFormEditMode()) {
            item.rowType = 'detail';
          }
        },
        _getChangedColumnIndices: function _getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
          if (isLiveUpdate === false && newItem.isEditing && this._editingController.isFormEditMode()) {
            return;
          }
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        _renderCellContent: function _renderCellContent($cell, options) {
          if (options.rowType === 'data' && this._editingController.isPopupEditMode() && options.row.visible === false) {
            return;
          }
          this.callBase.apply(this, arguments);
        },
        getCellElements: function getCellElements(rowIndex) {
          var $cellElements = this.callBase(rowIndex);
          var editingController = this._editingController;
          var editForm = editingController.getEditForm();
          var editFormRowIndex = editingController.getEditFormRowIndex();
          if (editFormRowIndex === rowIndex && $cellElements && editForm) {
            return editForm.$element().find(".".concat(this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS), ", .").concat(BUTTON_CLASS));
          }
          return $cellElements;
        },
        _getVisibleColumnIndex: function _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
          var editFormRowIndex = this._editingController.getEditFormRowIndex();
          if (editFormRowIndex === rowIndex && (0, _type.isString)(columnIdentifier)) {
            var column = this._columnsController.columnOption(columnIdentifier);
            return this._getEditFormEditorVisibleIndex($cells, column);
          }
          return this.callBase.apply(this, arguments);
        },
        _getEditFormEditorVisibleIndex: function _getEditFormEditorVisibleIndex($cells, column) {
          var visibleIndex = -1;
          // @ts-expect-error
          (0, _iterator.each)($cells, function (index, cellElement) {
            var item = (0, _renderer.default)(cellElement).find('.dx-field-item-content').data('dx-form-item');
            if ((item === null || item === void 0 ? void 0 : item.column) && column && item.column.index === column.index) {
              visibleIndex = index;
              return false;
            }
          });
          return visibleIndex;
        },
        _isFormItem: function _isFormItem(parameters) {
          var isDetailRow = parameters.rowType === 'detail' || parameters.rowType === 'detailAdaptive';
          var isPopupEditing = parameters.rowType === 'data' && this._editingController.isPopupEditMode();
          return (isDetailRow || isPopupEditing) && parameters.item;
        },
        _updateCell: function _updateCell($cell, parameters) {
          if (this._isFormItem(parameters)) {
            this._formItemPrepared(parameters, $cell);
          } else {
            this.callBase($cell, parameters);
          }
        }
      }
    }
  }
};
exports.editingFormBasedModule = editingFormBasedModule;
