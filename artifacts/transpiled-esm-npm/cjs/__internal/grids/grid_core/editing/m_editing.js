"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingModule = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _extend = require("../../../../core/utils/extend");
var iconUtils = _interopRequireWildcard(require("../../../../core/utils/icon"));
var _iterator = require("../../../../core/utils/iterator");
var _object = require("../../../../core/utils/object");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _index = require("../../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _dialog = require("../../../../ui/dialog");
var _themes = require("../../../../ui/themes");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");
var _m_editing_utils = require("./m_editing_utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } // @ts-expect-error
let EditingControllerImpl = /*#__PURE__*/function (_modules$ViewControll) {
  _inheritsLoose(EditingControllerImpl, _modules$ViewControll);
  function EditingControllerImpl() {
    return _modules$ViewControll.apply(this, arguments) || this;
  }
  var _proto = EditingControllerImpl.prototype;
  _proto.init = function init() {
    this._columnsController = this.getController('columns');
    this._dataController = this.getController('data');
    this._rowsView = this.getView('rowsView');
    this._lastOperation = null;
    // this contains the value of 'editing.changes' option, to check if it has changed in onOptionChanged
    this._changes = [];
    if (this._deferreds) {
      this._deferreds.forEach(d => {
        d.reject('cancel');
      });
    }
    this._deferreds = [];
    if (!this._dataChangedHandler) {
      this._dataChangedHandler = this._handleDataChanged.bind(this);
      this._dataController.changed.add(this._dataChangedHandler);
    }
    if (!this._saveEditorHandler) {
      this.createAction('onInitNewRow', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowInserting', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowInserted', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onEditingStart', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowUpdating', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowUpdated', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowRemoving', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowRemoved', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onSaved', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onSaving', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onEditCanceling', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onEditCanceled', {
        excludeValidators: ['disabled', 'readOnly']
      });
    }
    this._updateEditColumn();
    this._updateEditButtons();
    if (!this._internalState) {
      this._internalState = [];
    }
    this.component._optionsByReference[_const.EDITING_EDITROWKEY_OPTION_NAME] = true;
    this.component._optionsByReference[_const.EDITING_CHANGES_OPTION_NAME] = true;
  };
  _proto.getEditMode = function getEditMode() {
    var _a;
    const editMode = (_a = this.option('editing.mode')) !== null && _a !== void 0 ? _a : _const.EDIT_MODE_ROW;
    if (_const.EDIT_MODES.includes(editMode)) {
      return editMode;
    }
    return _const.EDIT_MODE_ROW;
  };
  _proto.isCellBasedEditMode = function isCellBasedEditMode() {
    const editMode = this.getEditMode();
    return _const.CELL_BASED_MODES.includes(editMode);
  };
  _proto._getDefaultEditorTemplate = function _getDefaultEditorTemplate() {
    return (container, options) => {
      const $editor = (0, _renderer.default)('<div>').appendTo(container);
      const editorOptions = (0, _extend.extend)({}, options.column, {
        value: options.value,
        setValue: options.setValue,
        row: options.row,
        parentType: 'dataRow',
        width: null,
        readOnly: !options.setValue,
        isOnForm: options.isOnForm,
        id: options.id
      });
      const needLabel = _const.REQUIRED_EDITOR_LABELLEDBY_MODES.includes(this.getEditMode());
      if (needLabel) {
        editorOptions['aria-labelledby'] = options.column.headerId;
      }
      this.getController('editorFactory').createEditor($editor, editorOptions);
    };
  };
  _proto._getNewRowPosition = function _getNewRowPosition() {
    const newRowPosition = this.option('editing.newRowPosition');
    const scrollingMode = this.option('scrolling.mode');
    if (scrollingMode === 'virtual') {
      switch (newRowPosition) {
        case _const.PAGE_TOP_NEW_ROW_POSITION:
          return _const.VIEWPORT_TOP_NEW_ROW_POSITION;
        case _const.PAGE_BOTTOM_NEW_ROW_POSITION:
          return _const.VIEWPORT_BOTTOM_NEW_ROW_POSITION;
        default:
          return newRowPosition;
      }
    }
    return newRowPosition;
  };
  _proto.getChanges = function getChanges() {
    return this.option(_const.EDITING_CHANGES_OPTION_NAME);
  };
  _proto.getInsertRowCount = function getInsertRowCount() {
    const changes = this.option(_const.EDITING_CHANGES_OPTION_NAME);
    return changes.filter(change => change.type === 'insert').length;
  };
  _proto.resetChanges = function resetChanges() {
    const changes = this.getChanges();
    const needReset = changes === null || changes === void 0 ? void 0 : changes.length;
    if (needReset) {
      this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, []);
    }
  };
  _proto._getInternalData = function _getInternalData(key) {
    return this._internalState.filter(item => (0, _common.equalByValue)(item.key, key))[0];
  };
  _proto._addInternalData = function _addInternalData(params) {
    const internalData = this._getInternalData(params.key);
    if (internalData) {
      return (0, _extend.extend)(internalData, params);
    }
    this._internalState.push(params);
    return params;
  };
  _proto._getOldData = function _getOldData(key) {
    var _a;
    return (_a = this._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.oldData;
  };
  _proto.getUpdatedData = function getUpdatedData(data) {
    const key = this._dataController.keyOf(data);
    const changes = this.getChanges();
    const editIndex = _m_utils.default.getIndexByKey(key, changes);
    if (changes[editIndex]) {
      return (0, _array_utils.createObjectWithChanges)(data, changes[editIndex].data);
    }
    return data;
  };
  _proto.getInsertedData = function getInsertedData() {
    return this.getChanges().filter(change => change.data && change.type === _const.DATA_EDIT_DATA_INSERT_TYPE).map(change => change.data);
  };
  _proto.getRemovedData = function getRemovedData() {
    return this.getChanges().filter(change => this._getOldData(change.key) && change.type === _const.DATA_EDIT_DATA_REMOVE_TYPE).map(change => this._getOldData(change.key));
  };
  _proto._fireDataErrorOccurred = function _fireDataErrorOccurred(arg) {
    if (arg === 'cancel') return;
    const $popupContent = this.getPopupContent();
    this._dataController.dataErrorOccurred.fire(arg, $popupContent);
  };
  _proto._needToCloseEditableCell = function _needToCloseEditableCell($targetElement) {};
  _proto._closeEditItem = function _closeEditItem($targetElement) {};
  _proto._handleDataChanged = function _handleDataChanged(args) {};
  _proto._isDefaultButtonVisible = function _isDefaultButtonVisible(button, options) {
    let result = true;
    // eslint-disable-next-line default-case
    switch (button.name) {
      case 'delete':
        result = this.allowDeleting(options);
        break;
      case 'undelete':
        result = false;
    }
    return result;
  };
  _proto._isButtonVisible = function _isButtonVisible(button, options) {
    const {
      visible
    } = button;
    if (!(0, _type.isDefined)(visible)) {
      return this._isDefaultButtonVisible(button, options);
    }
    return (0, _type.isFunction)(visible) ? visible.call(button, {
      component: options.component,
      row: options.row,
      column: options.column
    }) : visible;
  };
  _proto._isButtonDisabled = function _isButtonDisabled(button, options) {
    const {
      disabled
    } = button;
    return (0, _type.isFunction)(disabled) ? disabled.call(button, {
      component: options.component,
      row: options.row,
      column: options.column
    }) : !!disabled;
  };
  _proto._getButtonConfig = function _getButtonConfig(button, options) {
    const config = (0, _type.isObject)(button) ? button : {};
    const buttonName = (0, _m_editing_utils.getButtonName)(button);
    const editingTexts = (0, _m_editing_utils.getEditingTexts)(options);
    const methodName = _const.METHOD_NAMES[buttonName];
    const editingOptions = this.option('editing');
    const actionName = _const.ACTION_OPTION_NAMES[buttonName];
    const allowAction = actionName ? editingOptions[actionName] : true;
    return (0, _extend.extend)({
      name: buttonName,
      text: editingTexts[buttonName],
      cssClass: _const.EDIT_LINK_CLASS[buttonName]
    }, {
      onClick: methodName && (e => {
        const {
          event
        } = e;
        event.stopPropagation();
        event.preventDefault();
        setTimeout(() => {
          options.row && allowAction && this[methodName] && this[methodName](options.row.rowIndex);
        });
      })
    }, config);
  };
  _proto._getEditingButtons = function _getEditingButtons(options) {
    let buttonIndex;
    const haveCustomButtons = !!options.column.buttons;
    let buttons = (options.column.buttons || []).slice();
    if (haveCustomButtons) {
      buttonIndex = (0, _m_editing_utils.getButtonIndex)(buttons, 'edit');
      if (buttonIndex >= 0) {
        if ((0, _m_editing_utils.getButtonIndex)(buttons, 'save') < 0) {
          buttons.splice(buttonIndex + 1, 0, 'save');
        }
        if ((0, _m_editing_utils.getButtonIndex)(buttons, 'cancel') < 0) {
          buttons.splice((0, _m_editing_utils.getButtonIndex)(buttons, 'save') + 1, 0, 'cancel');
        }
      }
      buttonIndex = (0, _m_editing_utils.getButtonIndex)(buttons, 'delete');
      if (buttonIndex >= 0 && (0, _m_editing_utils.getButtonIndex)(buttons, 'undelete') < 0) {
        buttons.splice(buttonIndex + 1, 0, 'undelete');
      }
    } else {
      buttons = _const.BUTTON_NAMES.slice();
    }
    return buttons.map(button => this._getButtonConfig(button, options));
  };
  _proto._renderEditingButtons = function _renderEditingButtons($container, buttons, options, change) {
    buttons.forEach(button => {
      if (this._isButtonVisible(button, options)) {
        this._createButton($container, button, options, change);
      }
    });
  };
  _proto._getEditCommandCellTemplate = function _getEditCommandCellTemplate() {
    return (container, options, change) => {
      const $container = (0, _renderer.default)(container);
      if (options.rowType === 'data') {
        const buttons = this._getEditingButtons(options);
        this._renderEditingButtons($container, buttons, options, change);
        options.watch && options.watch(() => buttons.map(button => ({
          visible: this._isButtonVisible(button, options),
          disabled: this._isButtonDisabled(button, options)
        })), () => {
          $container.empty();
          this._renderEditingButtons($container, buttons, options);
        });
      } else {
        _m_utils.default.setEmptyText($container);
      }
    };
  };
  _proto.isRowBasedEditMode = function isRowBasedEditMode() {
    const editMode = this.getEditMode();
    return _const.ROW_BASED_MODES.includes(editMode);
  };
  _proto.getFirstEditableColumnIndex = function getFirstEditableColumnIndex() {
    const columnsController = this.getController('columns');
    let columnIndex;
    const visibleColumns = columnsController.getVisibleColumns();
    // @ts-expect-error
    (0, _iterator.each)(visibleColumns, (index, column) => {
      if (column.allowEditing) {
        columnIndex = index;
        return false;
      }
    });
    return columnIndex;
  };
  _proto.getFirstEditableCellInRow = function getFirstEditableCellInRow(rowIndex) {
    const rowsView = this.getView('rowsView');
    const columnIndex = this.getFirstEditableColumnIndex();
    return rowsView === null || rowsView === void 0 ? void 0 : rowsView._getCellElement(rowIndex || 0, columnIndex);
  };
  _proto.getFocusedCellInRow = function getFocusedCellInRow(rowIndex) {
    return this.getFirstEditableCellInRow(rowIndex);
  };
  _proto.getIndexByKey = function getIndexByKey(key, items) {
    return _m_utils.default.getIndexByKey(key, items);
  };
  _proto.hasChanges = function hasChanges(rowIndex) {
    const changes = this.getChanges();
    let result = false;
    for (let i = 0; i < (changes === null || changes === void 0 ? void 0 : changes.length); i++) {
      if (changes[i].type && (!(0, _type.isDefined)(rowIndex) || this._dataController.getRowIndexByKey(changes[i].key) === rowIndex)) {
        result = true;
        break;
      }
    }
    return result;
  };
  _proto.dispose = function dispose() {
    _modules$ViewControll.prototype.dispose.call(this);
    clearTimeout(this._inputFocusTimeoutID);
    _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.up, this._pointerUpEditorHandler);
    _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.down, this._pointerDownEditorHandler);
    _events_engine.default.off(_dom_adapter.default.getDocument(), _click.name, this._saveEditorHandler);
  }
  // @ts-expect-error
  ;
  _proto._silentOption = function _silentOption(name, value) {
    if (name === 'editing.changes') {
      this._changes = (0, _object.deepExtendArraySafe)([], value);
    }
    // @ts-expect-error
    _modules$ViewControll.prototype._silentOption.call(this, name, value);
  };
  _proto.optionChanged = function optionChanged(args) {
    if (args.name === 'editing') {
      const {
        fullName
      } = args;
      if (fullName === _const.EDITING_EDITROWKEY_OPTION_NAME) {
        this._handleEditRowKeyChange(args);
      } else if (fullName === _const.EDITING_CHANGES_OPTION_NAME) {
        // to prevent render on optionChanged called by two-way binding - T1128881
        const isEqual = (0, _common.equalByValue)(args.value, this._changes, {
          maxDepth: 4
        });
        if (!isEqual) {
          this._changes = (0, _object.deepExtendArraySafe)([], args.value);
          this._handleChangesChange(args);
        }
      } else if (!args.handled) {
        this._columnsController.reinit();
        this.init();
        this.resetChanges();
        this._resetEditColumnName();
        this._resetEditRowKey();
      }
      args.handled = true;
    } else {
      _modules$ViewControll.prototype.optionChanged.call(this, args);
    }
  };
  _proto._handleEditRowKeyChange = function _handleEditRowKeyChange(args) {
    const rowIndex = this._dataController.getRowIndexByKey(args.value);
    const oldRowIndexCorrection = this._getEditRowIndexCorrection();
    const oldRowIndex = this._dataController.getRowIndexByKey(args.previousValue) + oldRowIndexCorrection;
    if ((0, _type.isDefined)(args.value)) {
      if (args.value !== args.previousValue) {
        this._editRowFromOptionChanged(rowIndex, oldRowIndex);
      }
    } else {
      this.cancelEditData();
    }
  };
  _proto._handleChangesChange = function _handleChangesChange(args) {
    const dataController = this._dataController;
    const changes = args.value;
    if (!args.value.length && !args.previousValue.length) {
      return;
    }
    changes.forEach(change => {
      var _a;
      if (change.type === 'insert') {
        this._addInsertInfo(change);
      } else {
        const items = dataController.getCachedStoreData() || ((_a = dataController.items()) === null || _a === void 0 ? void 0 : _a.map(item => item.data));
        const rowIndex = _m_utils.default.getIndexByKey(change.key, items, dataController.key());
        this._addInternalData({
          key: change.key,
          oldData: items[rowIndex]
        });
      }
    });
    dataController.updateItems({
      repaintChangesOnly: true,
      isLiveUpdate: false,
      isOptionChanged: true
    });
  };
  _proto.publicMethods = function publicMethods() {
    return ['addRow', 'deleteRow', 'undeleteRow', 'editRow', 'saveEditData', 'cancelEditData', 'hasEditData'];
  };
  _proto.refresh = function refresh() {
    if (!(0, _type.isDefined)(this._pageIndex)) {
      return;
    }
    // @ts-expect-error
    this._refreshCore.apply(this, arguments);
  };
  _proto._refreshCore = function _refreshCore(params) {};
  _proto.isEditing = function isEditing() {
    const isEditRowKeyDefined = (0, _type.isDefined)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME));
    return isEditRowKeyDefined;
  };
  _proto.isEditRow = function isEditRow(rowIndex) {
    return false;
  };
  _proto._setEditRowKey = function _setEditRowKey(value, silent) {
    if (silent) {
      this._silentOption(_const.EDITING_EDITROWKEY_OPTION_NAME, value);
    } else {
      this.option(_const.EDITING_EDITROWKEY_OPTION_NAME, value);
    }
    if (this._refocusEditCell) {
      this._refocusEditCell = false;
      this._focusEditingCell();
    }
  };
  _proto._setEditRowKeyByIndex = function _setEditRowKeyByIndex(rowIndex, silent) {
    const key = this._dataController.getKeyByRowIndex(rowIndex);
    if (key === undefined) {
      this._dataController.fireError('E1043');
      return;
    }
    this._setEditRowKey(key, silent);
  };
  _proto.getEditRowIndex = function getEditRowIndex() {
    return this._getVisibleEditRowIndex();
  };
  _proto.getEditFormRowIndex = function getEditFormRowIndex() {
    return -1;
  };
  _proto.isEditRowByIndex = function isEditRowByIndex(rowIndex) {
    const key = this._dataController.getKeyByRowIndex(rowIndex);
    // Vitik: performance optimization equalByValue take O(1)
    const isKeyEqual = (0, _type.isDefined)(key) && (0, _common.equalByValue)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME), key);
    if (isKeyEqual) {
      // Vitik: performance optimization _getVisibleEditRowIndex take O(n)
      return this._getVisibleEditRowIndex() === rowIndex;
    }
    return isKeyEqual;
  };
  _proto.isEditCell = function isEditCell(visibleRowIndex, columnIndex) {
    return this.isEditRowByIndex(visibleRowIndex) && this._getVisibleEditColumnIndex() === columnIndex;
  };
  _proto.getPopupContent = function getPopupContent() {};
  _proto._isProcessedItem = function _isProcessedItem(item) {
    return false;
  };
  _proto._getInsertRowIndex = function _getInsertRowIndex(items, change, isProcessedItems) {
    let result = -1;
    const dataController = this._dataController;
    const key = this._getInsertAfterOrBeforeKey(change);
    if (!(0, _type.isDefined)(key) && items.length === 0) {
      result = 0;
    } else if ((0, _type.isDefined)(key)) {
      // @ts-expect-error
      // eslint-disable-next-line array-callback-return
      items.some((item, index) => {
        const isProcessedItem = isProcessedItems || this._isProcessedItem(item);
        if ((0, _type.isObject)(item)) {
          if (isProcessedItem || (0, _type.isDefined)(item[_const.INSERT_INDEX])) {
            // @ts-expect-error
            if ((0, _common.equalByValue)(item.key, key)) {
              result = index;
            }
          } else if ((0, _common.equalByValue)(dataController.keyOf(item), key)) {
            result = index;
          }
        }
        if (result >= 0) {
          const nextItem = items[result + 1];
          if (nextItem && (nextItem.rowType === 'detail' || nextItem.rowType === 'detailAdaptive') && (0, _type.isDefined)(change.insertAfterKey)) {
            return;
          }
          if ((0, _type.isDefined)(change.insertAfterKey)) {
            result += 1;
          }
          return true;
        }
      });
    }
    return result;
  };
  _proto._generateNewItem = function _generateNewItem(key) {
    var _a;
    const item = {
      key
    };
    const insertInfo = (_a = this._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
    if (insertInfo === null || insertInfo === void 0 ? void 0 : insertInfo[_const.INSERT_INDEX]) {
      item[_const.INSERT_INDEX] = insertInfo[_const.INSERT_INDEX];
    }
    return item;
  };
  _proto._getLoadedRowIndex = function _getLoadedRowIndex(items, change, isProcessedItems) {
    let loadedRowIndex = this._getInsertRowIndex(items, change, isProcessedItems);
    const dataController = this._dataController;
    if (loadedRowIndex < 0) {
      const newRowPosition = this._getNewRowPosition();
      const pageIndex = dataController.pageIndex();
      const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
      if (newRowPosition !== _const.LAST_NEW_ROW_POSITION && pageIndex === 0 && !(0, _type.isDefined)(insertAfterOrBeforeKey)) {
        loadedRowIndex = 0;
      } else if (newRowPosition === _const.LAST_NEW_ROW_POSITION && dataController.isLastPageLoaded()) {
        loadedRowIndex = items.length;
      }
    }
    return loadedRowIndex;
  };
  _proto.processItems = function processItems(items, e) {
    const {
      changeType
    } = e;
    this.update(changeType);
    const changes = this.getChanges();
    changes.forEach(change => {
      var _a;
      const isInsert = change.type === _const.DATA_EDIT_DATA_INSERT_TYPE;
      if (!isInsert) {
        return;
      }
      let {
        key
      } = change;
      let insertInfo = (_a = this._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
      if (!(0, _type.isDefined)(key) || !(0, _type.isDefined)(insertInfo)) {
        insertInfo = this._addInsertInfo(change);
        key = insertInfo.key;
      }
      const loadedRowIndex = this._getLoadedRowIndex(items, change);
      const item = this._generateNewItem(key);
      if (loadedRowIndex >= 0) {
        items.splice(loadedRowIndex, 0, item);
      }
    });
    return items;
  };
  _proto.processDataItem = function processDataItem(item, options, generateDataValues) {
    const columns = options.visibleColumns;
    const key = item.data[_const.INSERT_INDEX] ? item.data.key : item.key;
    const changes = this.getChanges();
    const editIndex = _m_utils.default.getIndexByKey(key, changes);
    item.isEditing = false;
    if (editIndex >= 0) {
      this._processDataItemCore(item, changes[editIndex], key, columns, generateDataValues);
    }
  };
  _proto._processDataItemCore = function _processDataItemCore(item, change, key, columns, generateDataValues) {
    const {
      data,
      type
    } = change;
    // eslint-disable-next-line default-case
    switch (type) {
      case _const.DATA_EDIT_DATA_INSERT_TYPE:
        item.isNewRow = true;
        item.key = key;
        item.data = data;
        break;
      case _const.DATA_EDIT_DATA_UPDATE_TYPE:
        item.modified = true;
        item.oldData = item.data;
        item.data = (0, _array_utils.createObjectWithChanges)(item.data, data);
        item.modifiedValues = generateDataValues(data, columns, true);
        break;
      case _const.DATA_EDIT_DATA_REMOVE_TYPE:
        item.removed = true;
        break;
    }
  };
  _proto._initNewRow = function _initNewRow(options) {
    this.executeAction('onInitNewRow', options);
    if (options.promise) {
      // @ts-expect-error
      const deferred = new _deferred.Deferred();
      (0, _deferred.when)((0, _deferred.fromPromise)(options.promise)).done(deferred.resolve).fail((0, _m_editing_utils.createFailureHandler)(deferred)).fail(arg => this._fireDataErrorOccurred(arg));
      return deferred;
    }
  };
  _proto._createInsertInfo = function _createInsertInfo() {
    const insertInfo = {};
    insertInfo[_const.INSERT_INDEX] = this._getInsertIndex();
    return insertInfo;
  };
  _proto._addInsertInfo = function _addInsertInfo(change, parentKey) {
    var _a;
    let insertInfo;
    change.key = this.getChangeKeyValue(change);
    const {
      key
    } = change;
    insertInfo = (_a = this._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
    if (!(0, _type.isDefined)(insertInfo)) {
      const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
      insertInfo = this._createInsertInfo();
      if (!(0, _type.isDefined)(insertAfterOrBeforeKey)) {
        this._setInsertAfterOrBeforeKey(change, parentKey);
      }
    }
    this._addInternalData({
      insertInfo,
      key
    });
    return {
      insertInfo,
      key
    };
  };
  _proto.getChangeKeyValue = function getChangeKeyValue(change) {
    if ((0, _type.isDefined)(change.key)) {
      return change.key;
    }
    const keyExpr = this._dataController.key();
    let keyValue;
    if (change.data && keyExpr && !Array.isArray(keyExpr)) {
      keyValue = change.data[keyExpr];
    }
    if (!(0, _type.isDefined)(keyValue)) {
      keyValue = (0, _m_editing_utils.generateNewRowTempKey)();
    }
    return keyValue;
  };
  _proto._setInsertAfterOrBeforeKey = function _setInsertAfterOrBeforeKey(change, parentKey) {
    const dataController = this._dataController;
    const allItems = dataController.items(true);
    const rowsView = this.getView('rowsView');
    const newRowPosition = this._getNewRowPosition();
    switch (newRowPosition) {
      case _const.FIRST_NEW_ROW_POSITION:
      case _const.LAST_NEW_ROW_POSITION:
        break;
      case _const.PAGE_TOP_NEW_ROW_POSITION:
      case _const.PAGE_BOTTOM_NEW_ROW_POSITION:
        if (allItems.length) {
          const itemIndex = newRowPosition === _const.PAGE_TOP_NEW_ROW_POSITION ? 0 : allItems.length - 1;
          change[itemIndex === 0 ? 'insertBeforeKey' : 'insertAfterKey'] = allItems[itemIndex].key;
        }
        break;
      default:
        {
          const isViewportBottom = newRowPosition === _const.VIEWPORT_BOTTOM_NEW_ROW_POSITION;
          let visibleItemIndex = isViewportBottom ? rowsView === null || rowsView === void 0 ? void 0 : rowsView.getBottomVisibleItemIndex() : rowsView === null || rowsView === void 0 ? void 0 : rowsView.getTopVisibleItemIndex();
          const row = dataController.getVisibleRows()[visibleItemIndex];
          if (row && (!row.isEditing && row.rowType === 'detail' || row.rowType === 'detailAdaptive')) {
            visibleItemIndex++;
          }
          const insertKey = dataController.getKeyByRowIndex(visibleItemIndex);
          if ((0, _type.isDefined)(insertKey)) {
            change.insertBeforeKey = insertKey;
          }
        }
    }
  };
  _proto._getInsertIndex = function _getInsertIndex() {
    let maxInsertIndex = 0;
    this.getChanges().forEach(editItem => {
      var _a;
      const insertInfo = (_a = this._getInternalData(editItem.key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
      if ((0, _type.isDefined)(insertInfo) && editItem.type === _const.DATA_EDIT_DATA_INSERT_TYPE && insertInfo[_const.INSERT_INDEX] > maxInsertIndex) {
        maxInsertIndex = insertInfo[_const.INSERT_INDEX];
      }
    });
    return maxInsertIndex + 1;
  };
  _proto._getInsertAfterOrBeforeKey = function _getInsertAfterOrBeforeKey(insertChange) {
    var _a;
    return (_a = insertChange.insertAfterKey) !== null && _a !== void 0 ? _a : insertChange.insertBeforeKey;
  };
  _proto._getPageIndexToInsertRow = function _getPageIndexToInsertRow() {
    const newRowPosition = this._getNewRowPosition();
    const dataController = this._dataController;
    const pageIndex = dataController.pageIndex();
    const lastPageIndex = dataController.pageCount() - 1;
    if (newRowPosition === _const.FIRST_NEW_ROW_POSITION && pageIndex !== 0) {
      return 0;
    }
    if (newRowPosition === _const.LAST_NEW_ROW_POSITION && pageIndex !== lastPageIndex) {
      return lastPageIndex;
    }
    return -1;
  };
  _proto.addRow = function addRow(parentKey) {
    const dataController = this._dataController;
    const store = dataController.store();
    if (!store) {
      dataController.fireError('E1052', this.component.NAME);
      // @ts-expect-error
      return new _deferred.Deferred().reject();
    }
    return this._addRow(parentKey);
  };
  _proto._addRow = function _addRow(parentKey) {
    const dataController = this._dataController;
    const store = dataController.store();
    const key = store && store.key();
    const param = {
      data: {}
    };
    const oldEditRowIndex = this._getVisibleEditRowIndex();
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    // @ts-expect-error
    this.refresh({
      allowCancelEditing: true
    });
    if (!this._allowRowAdding()) {
      (0, _deferred.when)(this._navigateToNewRow(oldEditRowIndex)).done(deferred.resolve).fail(deferred.reject);
      return deferred.promise();
    }
    if (!key) {
      param.data.__KEY__ = String(new _guid.default());
    }
    // @ts-expect-error
    (0, _deferred.when)(this._initNewRow(param, parentKey)).done(() => {
      if (this._allowRowAdding()) {
        (0, _deferred.when)(this._addRowCore(param.data, parentKey, oldEditRowIndex)).done(deferred.resolve).fail(deferred.reject);
      } else {
        deferred.reject('cancel');
      }
    }).fail(deferred.reject);
    return deferred.promise();
  };
  _proto._allowRowAdding = function _allowRowAdding(params) {
    const insertIndex = this._getInsertIndex();
    if (insertIndex > 1) {
      return false;
    }
    return true;
  };
  _proto._addRowCore = function _addRowCore(data, parentKey, initialOldEditRowIndex) {
    const change = {
      data,
      type: _const.DATA_EDIT_DATA_INSERT_TYPE
    };
    const editRowIndex = this._getVisibleEditRowIndex();
    const insertInfo = this._addInsertInfo(change, parentKey);
    const {
      key
    } = insertInfo;
    this._setEditRowKey(key, true);
    this._addChange(change);
    return this._navigateToNewRow(initialOldEditRowIndex, change, editRowIndex);
  };
  _proto._navigateToNewRow = function _navigateToNewRow(oldEditRowIndex, change, editRowIndex) {
    // @ts-expect-error
    const d = new _deferred.Deferred();
    const dataController = this._dataController;
    const focusController = this.getController('focus');
    editRowIndex = editRowIndex !== null && editRowIndex !== void 0 ? editRowIndex : -1;
    change = change !== null && change !== void 0 ? change : this.getChanges().filter(c => c.type === _const.DATA_EDIT_DATA_INSERT_TYPE)[0];
    if (!change) {
      return d.reject('cancel').promise();
    }
    const pageIndexToInsertRow = this._getPageIndexToInsertRow();
    let rowIndex = this._getLoadedRowIndex(dataController.items(), change, true);
    const navigateToRowByKey = key => {
      (0, _deferred.when)(focusController === null || focusController === void 0 ? void 0 : focusController.navigateToRow(key)).done(() => {
        rowIndex = dataController.getRowIndexByKey(change.key);
        d.resolve();
      });
    };
    const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
    if (pageIndexToInsertRow >= 0) {
      dataController.pageIndex(pageIndexToInsertRow).done(() => {
        navigateToRowByKey(change.key);
      }).fail(d.reject);
    } else if (rowIndex < 0 && (0, _type.isDefined)(insertAfterOrBeforeKey)) {
      navigateToRowByKey(insertAfterOrBeforeKey);
    } else {
      dataController.updateItems({
        changeType: 'update',
        rowIndices: [oldEditRowIndex, editRowIndex, rowIndex]
      });
      rowIndex = dataController.getRowIndexByKey(change.key);
      if (rowIndex < 0) {
        navigateToRowByKey(change.key);
      } else {
        d.resolve();
      }
    }
    d.done(() => {
      var _a;
      (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.waitAsyncTemplates(true).done(() => {
        this._showAddedRow(rowIndex);
        // @ts-expect-error
        this._afterInsertRow(change.key);
      });
    });
    return d.promise();
  };
  _proto._showAddedRow = function _showAddedRow(rowIndex) {
    this._focusFirstEditableCellInRow(rowIndex);
  };
  _proto._beforeFocusElementInRow = function _beforeFocusElementInRow(rowIndex) {};
  _proto._focusFirstEditableCellInRow = function _focusFirstEditableCellInRow(rowIndex) {
    const dataController = this._dataController;
    const keyboardController = this.getController('keyboardNavigation');
    const key = dataController.getKeyByRowIndex(rowIndex);
    const $firstCell = this.getFirstEditableCellInRow(rowIndex);
    keyboardController === null || keyboardController === void 0 ? void 0 : keyboardController.focus($firstCell);
    this.option('focusedRowKey', key);
    this._editCellInProgress = true;
    this._delayedInputFocus($firstCell, () => {
      rowIndex = dataController.getRowIndexByKey(key);
      this._editCellInProgress = false;
      this._beforeFocusElementInRow(rowIndex);
    });
  };
  _proto._isEditingStart = function _isEditingStart(options) {
    this.executeAction('onEditingStart', options);
    return options.cancel;
  };
  _proto._beforeUpdateItems = function _beforeUpdateItems() {};
  _proto._getVisibleEditColumnIndex = function _getVisibleEditColumnIndex() {
    const editColumnName = this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME);
    if (!(0, _type.isDefined)(editColumnName)) {
      return -1;
    }
    return this._columnsController.getVisibleColumnIndex(editColumnName);
  };
  _proto._setEditColumnNameByIndex = function _setEditColumnNameByIndex(index, silent) {
    var _a;
    const visibleColumns = this._columnsController.getVisibleColumns();
    this._setEditColumnName((_a = visibleColumns[index]) === null || _a === void 0 ? void 0 : _a.name, silent);
  };
  _proto._setEditColumnName = function _setEditColumnName(name, silent) {
    if (silent) {
      this._silentOption(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME, name);
    } else {
      this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME, name);
    }
  };
  _proto._resetEditColumnName = function _resetEditColumnName() {
    this._setEditColumnName(null, true);
  };
  _proto._getEditColumn = function _getEditColumn() {
    const editColumnName = this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME);
    return this._getColumnByName(editColumnName);
  };
  _proto._getColumnByName = function _getColumnByName(name) {
    const visibleColumns = this._columnsController.getVisibleColumns();
    let editColumn;
    // @ts-expect-error
    // eslint-disable-next-line array-callback-return
    (0, _type.isDefined)(name) && visibleColumns.some(column => {
      if (column.name === name) {
        editColumn = column;
        return true;
      }
    });
    return editColumn;
  };
  _proto._getVisibleEditRowIndex = function _getVisibleEditRowIndex(columnName) {
    const dataController = this._dataController;
    const editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
    const rowIndex = dataController.getRowIndexByKey(editRowKey);
    if (rowIndex === -1) {
      return rowIndex;
    }
    return rowIndex + this._getEditRowIndexCorrection(columnName);
  };
  _proto._getEditRowIndexCorrection = function _getEditRowIndexCorrection(columnName) {
    const editColumn = columnName ? this._getColumnByName(columnName) : this._getEditColumn();
    const isColumnHidden = (editColumn === null || editColumn === void 0 ? void 0 : editColumn.visibleWidth) === 'adaptiveHidden';
    return isColumnHidden ? 1 : 0;
  };
  _proto._resetEditRowKey = function _resetEditRowKey() {
    this._refocusEditCell = false;
    this._setEditRowKey(null, true);
  };
  _proto._resetEditIndices = function _resetEditIndices() {
    this._resetEditColumnName();
    this._resetEditRowKey();
  }
  // @ts-expect-error
  ;
  _proto.editRow = function editRow(rowIndex) {
    var _a;
    const dataController = this._dataController;
    const items = dataController.items();
    const item = items[rowIndex];
    const params = {
      data: item && item.data,
      cancel: false
    };
    const oldRowIndex = this._getVisibleEditRowIndex();
    if (!item) {
      return;
    }
    if (rowIndex === oldRowIndex) {
      return true;
    }
    if (item.key === undefined) {
      this._dataController.fireError('E1043');
      return;
    }
    if (!item.isNewRow) {
      params.key = item.key;
    }
    if (this._isEditingStart(params)) {
      return;
    }
    this.resetChanges();
    this.init();
    this._resetEditColumnName();
    this._pageIndex = dataController.pageIndex();
    this._addInternalData({
      key: item.key,
      oldData: (_a = item.oldData) !== null && _a !== void 0 ? _a : item.data
    });
    this._setEditRowKey(item.key);
  };
  _proto._editRowFromOptionChanged = function _editRowFromOptionChanged(rowIndex, oldRowIndex) {
    const rowIndices = [oldRowIndex, rowIndex];
    // @ts-expect-error
    this._beforeUpdateItems(rowIndices, rowIndex, oldRowIndex);
    this._editRowFromOptionChangedCore(rowIndices, rowIndex);
  };
  _proto._editRowFromOptionChangedCore = function _editRowFromOptionChangedCore(rowIndices, rowIndex, preventRendering) {
    this._needFocusEditor = true;
    this._dataController.updateItems({
      changeType: 'update',
      rowIndices,
      cancel: preventRendering
    });
  };
  _proto._focusEditorIfNeed = function _focusEditorIfNeed() {};
  _proto._showEditPopup = function _showEditPopup(rowIndex, repaintForm) {};
  _proto._repaintEditPopup = function _repaintEditPopup() {};
  _proto._getEditPopupHiddenHandler = function _getEditPopupHiddenHandler() {
    return e => {
      if (this.isEditing()) {
        this.cancelEditData();
      }
    };
  };
  _proto._getPopupEditFormTemplate = function _getPopupEditFormTemplate(rowIndex) {};
  _proto._getSaveButtonConfig = function _getSaveButtonConfig() {
    const buttonConfig = {
      text: this.option('editing.texts.saveRowChanges'),
      onClick: this.saveEditData.bind(this)
    };
    if ((0, _themes.isFluent)((0, _themes.current)())) {
      buttonConfig.stylingMode = 'contained';
      buttonConfig.type = 'default';
    }
    return buttonConfig;
  };
  _proto._getCancelButtonConfig = function _getCancelButtonConfig() {
    const buttonConfig = {
      text: this.option('editing.texts.cancelRowChanges'),
      onClick: this.cancelEditData.bind(this)
    };
    if ((0, _themes.isFluent)((0, _themes.current)())) {
      buttonConfig.stylingMode = 'outlined';
    }
    return buttonConfig;
  };
  _proto._removeInternalData = function _removeInternalData(key) {
    const internalData = this._getInternalData(key);
    const index = this._internalState.indexOf(internalData);
    if (index > -1) {
      this._internalState.splice(index, 1);
    }
  };
  _proto._updateInsertAfterOrBeforeKeys = function _updateInsertAfterOrBeforeKeys(changes, index) {
    const removeChange = changes[index];
    changes.forEach(change => {
      const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
      if ((0, _common.equalByValue)(insertAfterOrBeforeKey, removeChange.key)) {
        change[(0, _type.isDefined)(change.insertAfterKey) ? 'insertAfterKey' : 'insertBeforeKey'] = this._getInsertAfterOrBeforeKey(removeChange);
      }
    });
  };
  _proto._removeChange = function _removeChange(index) {
    if (index >= 0) {
      const changes = [...this.getChanges()];
      const {
        key
      } = changes[index];
      this._removeInternalData(key);
      this._updateInsertAfterOrBeforeKeys(changes, index);
      changes.splice(index, 1);
      this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
      if ((0, _common.equalByValue)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME), key)) {
        this._resetEditIndices();
      }
    }
  };
  _proto.executeOperation = function executeOperation(deferred, func) {
    this._lastOperation && this._lastOperation.reject();
    this._lastOperation = deferred;
    this.waitForDeferredOperations().done(() => {
      if (deferred.state() === 'rejected') {
        return;
      }
      func();
      this._lastOperation = null;
    }).fail(() => {
      deferred.reject();
      this._lastOperation = null;
    });
  };
  _proto.waitForDeferredOperations = function waitForDeferredOperations() {
    return (0, _deferred.when)(...this._deferreds);
  };
  _proto._processCanceledEditingCell = function _processCanceledEditingCell() {};
  _proto._repaintEditCell = function _repaintEditCell(column, oldColumn, oldEditRowIndex) {
    this._needFocusEditor = true;
    if (!column || !column.showEditorAlways || oldColumn && !oldColumn.showEditorAlways) {
      this._editCellInProgress = true;
      // T316439
      this.getController('editorFactory').loseFocus();
      this._dataController.updateItems({
        changeType: 'update',
        rowIndices: [oldEditRowIndex, this._getVisibleEditRowIndex()]
      });
    } else if (column !== oldColumn) {
      // TODO check this necessity T816039
      this._dataController.updateItems({
        changeType: 'update',
        rowIndices: []
      });
    }
  };
  _proto._delayedInputFocus = function _delayedInputFocus($cell, beforeFocusCallback, callBeforeFocusCallbackAlways) {
    const inputFocus = () => {
      if (beforeFocusCallback) {
        beforeFocusCallback();
      }
      if ($cell) {
        const $focusableElement = $cell.find(_const.FOCUSABLE_ELEMENT_SELECTOR).first();
        _m_utils.default.focusAndSelectElement(this, $focusableElement);
      }
      this._beforeFocusCallback = null;
    };
    if (_devices.default.real().ios || _devices.default.real().android) {
      inputFocus();
    } else {
      if (this._beforeFocusCallback) this._beforeFocusCallback();
      clearTimeout(this._inputFocusTimeoutID);
      if (callBeforeFocusCallbackAlways) {
        this._beforeFocusCallback = beforeFocusCallback;
      }
      this._inputFocusTimeoutID = setTimeout(inputFocus);
    }
  };
  _proto._focusEditingCell = function _focusEditingCell(beforeFocusCallback, $editCell, callBeforeFocusCallbackAlways) {
    const rowsView = this.getView('rowsView');
    const editColumnIndex = this._getVisibleEditColumnIndex();
    $editCell = $editCell || rowsView && rowsView._getCellElement(this._getVisibleEditRowIndex(), editColumnIndex);
    if ($editCell) {
      this._delayedInputFocus($editCell, beforeFocusCallback, callBeforeFocusCallbackAlways);
    }
  };
  _proto.deleteRow = function deleteRow(rowIndex) {
    this._checkAndDeleteRow(rowIndex);
  };
  _proto._checkAndDeleteRow = function _checkAndDeleteRow(rowIndex) {
    const editingOptions = this.option('editing');
    const editingTexts = editingOptions === null || editingOptions === void 0 ? void 0 : editingOptions.texts;
    const confirmDelete = editingOptions === null || editingOptions === void 0 ? void 0 : editingOptions.confirmDelete;
    const confirmDeleteMessage = editingTexts === null || editingTexts === void 0 ? void 0 : editingTexts.confirmDeleteMessage;
    const item = this._dataController.items()[rowIndex];
    const allowDeleting = !this.isEditing() || item.isNewRow; // T741746
    if (item && allowDeleting) {
      if (!confirmDelete || !confirmDeleteMessage) {
        this._deleteRowCore(rowIndex);
      } else {
        const confirmDeleteTitle = editingTexts && editingTexts.confirmDeleteTitle;
        const showDialogTitle = (0, _type.isDefined)(confirmDeleteTitle) && confirmDeleteTitle.length > 0;
        // @ts-expect-error
        (0, _dialog.confirm)(confirmDeleteMessage, confirmDeleteTitle, showDialogTitle).done(confirmResult => {
          if (confirmResult) {
            this._deleteRowCore(rowIndex);
          }
        });
      }
    }
  };
  _proto._deleteRowCore = function _deleteRowCore(rowIndex) {
    const dataController = this._dataController;
    const item = dataController.items()[rowIndex];
    const key = item && item.key;
    const oldEditRowIndex = this._getVisibleEditRowIndex();
    this.refresh();
    const changes = this.getChanges();
    const editIndex = _m_utils.default.getIndexByKey(key, changes);
    if (editIndex >= 0) {
      if (changes[editIndex].type === _const.DATA_EDIT_DATA_INSERT_TYPE) {
        this._removeChange(editIndex);
      } else {
        this._addChange({
          key,
          type: _const.DATA_EDIT_DATA_REMOVE_TYPE
        });
      }
    } else {
      this._addChange({
        key,
        oldData: item.data,
        type: _const.DATA_EDIT_DATA_REMOVE_TYPE
      });
    }
    return this._afterDeleteRow(rowIndex, oldEditRowIndex);
  };
  _proto._afterDeleteRow = function _afterDeleteRow(rowIndex, oldEditRowIndex) {
    return this.saveEditData();
  };
  _proto.undeleteRow = function undeleteRow(rowIndex) {
    const dataController = this._dataController;
    const item = dataController.items()[rowIndex];
    const oldEditRowIndex = this._getVisibleEditRowIndex();
    const key = item && item.key;
    const changes = this.getChanges();
    if (item) {
      const editIndex = _m_utils.default.getIndexByKey(key, changes);
      if (editIndex >= 0) {
        const {
          data
        } = changes[editIndex];
        if ((0, _type.isEmptyObject)(data)) {
          this._removeChange(editIndex);
        } else {
          this._addChange({
            key,
            type: _const.DATA_EDIT_DATA_UPDATE_TYPE
          });
        }
        dataController.updateItems({
          changeType: 'update',
          rowIndices: [oldEditRowIndex, rowIndex]
        });
      }
    }
  };
  _proto._fireOnSaving = function _fireOnSaving() {
    const onSavingParams = {
      cancel: false,
      promise: null,
      changes: [...this.getChanges()]
    };
    this.executeAction('onSaving', onSavingParams);
    // @ts-expect-error
    const d = new _deferred.Deferred();
    (0, _deferred.when)((0, _deferred.fromPromise)(onSavingParams.promise)).done(() => {
      d.resolve(onSavingParams);
    }).fail(arg => {
      (0, _m_editing_utils.createFailureHandler)(d);
      this._fireDataErrorOccurred(arg);
      d.resolve({
        cancel: true
      });
    });
    return d;
  };
  _proto._executeEditingAction = function _executeEditingAction(actionName, params, func) {
    if (this.component._disposed) {
      return null;
    }
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    this.executeAction(actionName, params);
    (0, _deferred.when)((0, _deferred.fromPromise)(params.cancel)).done(cancel => {
      if (cancel) {
        setTimeout(() => {
          deferred.resolve('cancel');
        });
      } else {
        func(params).done(deferred.resolve).fail((0, _m_editing_utils.createFailureHandler)(deferred));
      }
    }).fail((0, _m_editing_utils.createFailureHandler)(deferred));
    return deferred;
  };
  _proto._processChanges = function _processChanges(deferreds, results, dataChanges, changes) {
    const store = this._dataController.store();
    (0, _iterator.each)(changes, (index, change) => {
      const oldData = this._getOldData(change.key);
      const {
        data,
        type
      } = change;
      const changeCopy = _extends({}, change);
      let deferred;
      let params;
      // @ts-expect-error
      if (this._beforeSaveEditData(change, index)) {
        return;
      }
      // eslint-disable-next-line default-case
      switch (type) {
        case _const.DATA_EDIT_DATA_REMOVE_TYPE:
          params = {
            data: oldData,
            key: change.key,
            cancel: false
          };
          deferred = this._executeEditingAction('onRowRemoving', params, () => store.remove(change.key).done(key => {
            dataChanges.push({
              type: 'remove',
              key
            });
          }));
          break;
        case _const.DATA_EDIT_DATA_INSERT_TYPE:
          params = {
            data,
            cancel: false
          };
          deferred = this._executeEditingAction('onRowInserting', params, () => store.insert(params.data).done((data, key) => {
            if ((0, _type.isDefined)(key)) {
              changeCopy.key = key;
            }
            if (data && (0, _type.isObject)(data) && data !== params.data) {
              changeCopy.data = data;
            }
            dataChanges.push({
              type: 'insert',
              data,
              index: 0
            });
          }));
          break;
        case _const.DATA_EDIT_DATA_UPDATE_TYPE:
          params = {
            newData: data,
            oldData,
            key: change.key,
            cancel: false
          };
          deferred = this._executeEditingAction('onRowUpdating', params, () => store.update(change.key, params.newData).done((data, key) => {
            if (data && (0, _type.isObject)(data) && data !== params.newData) {
              changeCopy.data = data;
            }
            dataChanges.push({
              type: 'update',
              key,
              data
            });
          }));
          break;
      }
      changes[index] = changeCopy;
      if (deferred) {
        // @ts-expect-error
        const doneDeferred = new _deferred.Deferred();
        deferred.always(data => {
          results.push({
            key: change.key,
            result: data
          });
        }).always(doneDeferred.resolve);
        deferreds.push(doneDeferred.promise());
      }
    });
  };
  _proto._processRemoveIfError = function _processRemoveIfError(changes, editIndex) {
    const change = changes[editIndex];
    if ((change === null || change === void 0 ? void 0 : change.type) === _const.DATA_EDIT_DATA_REMOVE_TYPE) {
      if (editIndex >= 0) {
        changes.splice(editIndex, 1);
      }
    }
    return true;
  };
  _proto._processRemove = function _processRemove(changes, editIndex, cancel) {
    const change = changes[editIndex];
    if (!cancel || !change || change.type === _const.DATA_EDIT_DATA_REMOVE_TYPE) {
      return this._processRemoveCore(changes, editIndex, !cancel || !change);
    }
  };
  _proto._processRemoveCore = function _processRemoveCore(changes, editIndex, processIfBatch) {
    if (editIndex >= 0) {
      changes.splice(editIndex, 1);
    }
    return true;
  };
  _proto._processSaveEditDataResult = function _processSaveEditDataResult(results) {
    let hasSavedData = false;
    const changes = [...this.getChanges()];
    const changesLength = changes.length;
    for (let i = 0; i < results.length; i++) {
      const arg = results[i].result;
      const cancel = arg === 'cancel';
      const editIndex = _m_utils.default.getIndexByKey(results[i].key, changes);
      const change = changes[editIndex];
      const isError = arg && arg instanceof Error;
      if (isError) {
        if (change) {
          this._addInternalData({
            key: change.key,
            error: arg
          });
        }
        this._fireDataErrorOccurred(arg);
        if (this._processRemoveIfError(changes, editIndex)) {
          break;
        }
      } else if (this._processRemove(changes, editIndex, cancel)) {
        hasSavedData = !cancel;
      }
    }
    if (changes.length < changesLength) {
      this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
    }
    return hasSavedData;
  };
  _proto._fireSaveEditDataEvents = function _fireSaveEditDataEvents(changes) {
    (0, _iterator.each)(changes, (_, _ref) => {
      let {
        data,
        key,
        type
      } = _ref;
      const internalData = this._addInternalData({
        key
      });
      const params = {
        key,
        data
      };
      if (internalData.error) {
        params.error = internalData.error;
      }
      // eslint-disable-next-line default-case
      switch (type) {
        case _const.DATA_EDIT_DATA_REMOVE_TYPE:
          this.executeAction('onRowRemoved', (0, _extend.extend)({}, params, {
            data: internalData.oldData
          }));
          break;
        case _const.DATA_EDIT_DATA_INSERT_TYPE:
          this.executeAction('onRowInserted', params);
          break;
        case _const.DATA_EDIT_DATA_UPDATE_TYPE:
          this.executeAction('onRowUpdated', params);
          break;
      }
    });
    this.executeAction('onSaved', {
      changes
    });
  };
  _proto.saveEditData = function saveEditData() {
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    this.waitForDeferredOperations().done(() => {
      if (this.isSaving()) {
        this._resolveAfterSave(deferred);
        return;
      }
      (0, _deferred.when)(this._beforeSaveEditData()).done(cancel => {
        if (cancel) {
          // @ts-expect-error
          this._resolveAfterSave(deferred, {
            cancel
          });
          return;
        }
        this._saving = true;
        this._saveEditDataInner().always(() => {
          this._saving = false;
          if (this._refocusEditCell) {
            this._focusEditingCell();
          }
        }).done(deferred.resolve).fail(deferred.reject);
      }).fail(deferred.reject);
    }).fail(deferred.reject);
    return deferred.promise();
  }
  // @ts-expect-error
  ;
  _proto._resolveAfterSave = function _resolveAfterSave(deferred) {
    let {
      cancel,
      error
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // @ts-expect-error
    (0, _deferred.when)(this._afterSaveEditData(cancel)).done(() => {
      deferred.resolve(error);
    }).fail(deferred.reject);
  };
  _proto._saveEditDataInner = function _saveEditDataInner() {
    // @ts-expect-error
    const result = new _deferred.Deferred();
    const results = [];
    const deferreds = [];
    const dataChanges = [];
    const dataSource = this._dataController.dataSource();
    (0, _deferred.when)(this._fireOnSaving()).done(_ref2 => {
      let {
        cancel,
        changes
      } = _ref2;
      if (cancel) {
        return result.resolve().promise();
      }
      this._processChanges(deferreds, results, dataChanges, changes);
      if (deferreds.length) {
        this._refocusEditCell = true;
        dataSource === null || dataSource === void 0 ? void 0 : dataSource.beginLoading();
        (0, _deferred.when)(...deferreds).done(() => {
          if (this._processSaveEditDataResult(results)) {
            this._endSaving(dataChanges, changes, result);
          } else {
            dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
            result.resolve();
          }
        }).fail(error => {
          dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
          result.resolve(error);
        });
        return result.always(() => {
          this._refocusEditCell = true;
        }).promise();
      }
      this._cancelSaving(result);
    }).fail(result.reject);
    return result.promise();
  };
  _proto._beforeEndSaving = function _beforeEndSaving(changes) {
    this._resetEditIndices();
  };
  _proto._endSaving = function _endSaving(dataChanges, changes, deferred) {
    const dataSource = this._dataController.dataSource();
    this._beforeEndSaving(changes);
    dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
    this._refreshDataAfterSave(dataChanges, changes, deferred);
  };
  _proto._cancelSaving = function _cancelSaving(result) {
    this.executeAction('onSaved', {
      changes: []
    });
    this._resolveAfterSave(result);
  };
  _proto._refreshDataAfterSave = function _refreshDataAfterSave(dataChanges, changes, deferred) {
    const dataController = this._dataController;
    const refreshMode = this.option('editing.refreshMode');
    const isFullRefresh = refreshMode !== 'reshape' && refreshMode !== 'repaint';
    if (!isFullRefresh) {
      dataController.push(dataChanges);
    }
    (0, _deferred.when)(dataController.refresh({
      selection: isFullRefresh,
      reload: isFullRefresh,
      load: refreshMode === 'reshape',
      changesOnly: this.option('repaintChangesOnly')
    })).always(() => {
      this._fireSaveEditDataEvents(changes);
    }).done(() => {
      this._resolveAfterSave(deferred);
    }).fail(error => {
      // @ts-expect-error
      this._resolveAfterSave(deferred, {
        error
      });
    });
  };
  _proto.isSaving = function isSaving() {
    return this._saving;
  };
  _proto._updateEditColumn = function _updateEditColumn() {
    const isEditColumnVisible = this._isEditColumnVisible();
    const useIcons = this.option('editing.useIcons');
    const cssClass = _const.COMMAND_EDIT_CLASS + (useIcons ? " ".concat(_const.COMMAND_EDIT_WITH_ICONS_CLASS) : '');
    this._columnsController.addCommandColumn({
      type: 'buttons',
      command: 'edit',
      visible: isEditColumnVisible,
      cssClass,
      width: 'auto',
      alignment: 'center',
      cellTemplate: this._getEditCommandCellTemplate(),
      fixedPosition: 'right'
    });
    this._columnsController.columnOption('command:edit', {
      visible: isEditColumnVisible,
      cssClass
    });
  };
  _proto._isEditColumnVisible = function _isEditColumnVisible() {
    const editingOptions = this.option('editing');
    return editingOptions.allowDeleting;
  };
  _proto._isEditButtonDisabled = function _isEditButtonDisabled() {
    const hasChanges = this.hasChanges();
    const isEditRowDefined = (0, _type.isDefined)(this.option('editing.editRowKey'));
    return !(isEditRowDefined || hasChanges);
  };
  _proto._updateEditButtons = function _updateEditButtons() {
    const headerPanel = this.getView('headerPanel');
    const isButtonDisabled = this._isEditButtonDisabled();
    if (headerPanel) {
      headerPanel.setToolbarItemDisabled('saveButton', isButtonDisabled);
      headerPanel.setToolbarItemDisabled('revertButton', isButtonDisabled);
    }
  };
  _proto._applyModified = function _applyModified($element, options) {
    $element && $element.addClass(_const.CELL_MODIFIED);
  };
  _proto._beforeCloseEditCellInBatchMode = function _beforeCloseEditCellInBatchMode(rowIndices) {};
  _proto.cancelEditData = function cancelEditData() {
    const changes = this.getChanges();
    const params = {
      cancel: false,
      changes
    };
    this.executeAction('onEditCanceling', params);
    if (!params.cancel) {
      this._cancelEditDataCore();
      this.executeAction('onEditCanceled', {
        changes
      });
    }
  };
  _proto._cancelEditDataCore = function _cancelEditDataCore() {
    const rowIndex = this._getVisibleEditRowIndex();
    this._beforeCancelEditData();
    this.init();
    this.resetChanges();
    this._resetEditColumnName();
    this._resetEditRowKey();
    this._afterCancelEditData(rowIndex);
  };
  _proto._afterCancelEditData = function _afterCancelEditData(rowIndex) {
    const dataController = this._dataController;
    dataController.updateItems({
      repaintChangesOnly: this.option('repaintChangesOnly')
    });
  };
  _proto._hideEditPopup = function _hideEditPopup() {};
  _proto.hasEditData = function hasEditData() {
    return this.hasChanges();
  };
  _proto.update = function update(changeType) {
    const dataController = this._dataController;
    if (dataController && this._pageIndex !== dataController.pageIndex()) {
      if (changeType === 'refresh') {
        // @ts-expect-error
        this.refresh({
          isPageChanged: true
        });
      }
      this._pageIndex = dataController.pageIndex();
    }
    this._updateEditButtons();
  };
  _proto._getRowIndicesForCascadeUpdating = function _getRowIndicesForCascadeUpdating(row, skipCurrentRow) {
    return skipCurrentRow ? [] : [row.rowIndex];
  }
  /**
   * Adds a deferred object to be awaited before other operations are executed
   */;
  _proto.addDeferred = function addDeferred(deferred) {
    if (!this._deferreds.includes(deferred)) {
      this._deferreds.push(deferred);
      deferred.always(() => {
        const index = this._deferreds.indexOf(deferred);
        if (index >= 0) {
          this._deferreds.splice(index, 1);
        }
      });
    }
  };
  _proto._prepareChange = function _prepareChange(options, value, text) {
    var _a;
    const newData = {};
    const oldData = (_a = options.row) === null || _a === void 0 ? void 0 : _a.data;
    const rowKey = options.key;
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    if (rowKey !== undefined) {
      options.value = value;
      const setCellValueResult = (0, _deferred.fromPromise)(options.column.setCellValue(newData, value, (0, _extend.extend)(true, {}, oldData), text));
      setCellValueResult.done(() => {
        deferred.resolve({
          data: newData,
          key: rowKey,
          oldData,
          type: _const.DATA_EDIT_DATA_UPDATE_TYPE
        });
      }).fail((0, _m_editing_utils.createFailureHandler)(deferred)).fail(arg => this._fireDataErrorOccurred(arg));
      if ((0, _type.isDefined)(text) && options.column.displayValueMap) {
        options.column.displayValueMap[value] = text;
      }
      this._updateRowValues(options);
      this.addDeferred(deferred);
    }
    return deferred;
  };
  _proto._updateRowValues = function _updateRowValues(options) {
    if (options.values) {
      const dataController = this._dataController;
      const rowIndex = dataController.getRowIndexByKey(options.key);
      const row = dataController.getVisibleRows()[rowIndex];
      if (row) {
        options.row.values = row.values; // T1122209
        options.values = row.values;
      }
      options.values[options.columnIndex] = options.value;
    }
  };
  _proto.updateFieldValue = function updateFieldValue(options, value, text, forceUpdateRow) {
    const rowKey = options.key;
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    if (rowKey === undefined) {
      this._dataController.fireError('E1043');
    }
    if (options.column.setCellValue) {
      this._prepareChange(options, value, text).done(params => {
        (0, _deferred.when)(this._applyChange(options, params, forceUpdateRow)).always(() => {
          deferred.resolve();
        });
      });
    } else {
      deferred.resolve();
    }
    return deferred.promise();
  }
  // @ts-expect-error
  ;
  _proto._focusPreviousEditingCellIfNeed = function _focusPreviousEditingCellIfNeed(options) {
    if (this.hasEditData() && !this.isEditCell(options.rowIndex, options.columnIndex)) {
      this._focusEditingCell();
      this._updateEditRow(options.row, true);
      return true;
    }
  };
  _proto._needUpdateRow = function _needUpdateRow(column) {
    const visibleColumns = this._columnsController.getVisibleColumns();
    if (!column) {
      column = this._getEditColumn();
    }
    const isCustomSetCellValue = column && column.setCellValue !== column.defaultSetCellValue;
    const isCustomCalculateCellValue = visibleColumns.some(visibleColumn => visibleColumn.calculateCellValue !== visibleColumn.defaultCalculateCellValue);
    return isCustomSetCellValue || isCustomCalculateCellValue;
  };
  _proto._applyChange = function _applyChange(options, params, forceUpdateRow) {
    const changeOptions = _extends(_extends({}, options), {
      forceUpdateRow
    });
    this._addChange(params, changeOptions);
    this._updateEditButtons();
    return this._applyChangeCore(options, changeOptions.forceUpdateRow);
  };
  _proto._applyChangeCore = function _applyChangeCore(options, forceUpdateRow) {
    const isCustomSetCellValue = options.column.setCellValue !== options.column.defaultSetCellValue;
    const {
      row
    } = options;
    if (row) {
      if (forceUpdateRow || isCustomSetCellValue) {
        this._updateEditRow(row, forceUpdateRow, isCustomSetCellValue);
      } else if (row.update) {
        row.update();
      }
    }
  };
  _proto._updateEditRowCore = function _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
    this._dataController.updateItems({
      changeType: 'update',
      rowIndices: this._getRowIndicesForCascadeUpdating(row, skipCurrentRow)
    });
  };
  _proto._updateEditRow = function _updateEditRow(row, forceUpdateRow, isCustomSetCellValue) {
    if (forceUpdateRow) {
      this._updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue);
    } else {
      this._updateRowWithDelay(row, isCustomSetCellValue);
    }
  };
  _proto._updateRowImmediately = function _updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue) {
    this._updateEditRowCore(row, !forceUpdateRow, isCustomSetCellValue);
    // @ts-expect-error
    this._validateEditFormAfterUpdate(row, isCustomSetCellValue);
    if (!forceUpdateRow) {
      this._focusEditingCell();
    }
  };
  _proto._updateRowWithDelay = function _updateRowWithDelay(row, isCustomSetCellValue) {
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    this.addDeferred(deferred);
    setTimeout(() => {
      var _a;
      // NOTE: if the editForm is enabled then we need to search for focused element in the document root
      // otherwise we need to search for element in the shadow dom
      // @ts-expect-error
      const elementContainer = ((_a = this._editForm) === null || _a === void 0 ? void 0 : _a.element()) || this.component.$element().get(0);
      const $focusedElement = (0, _renderer.default)(_dom_adapter.default.getActiveElement(elementContainer));
      const columnIndex = this._rowsView.getCellIndex($focusedElement, row.rowIndex);
      let focusedElement = $focusedElement.get(0);
      const selectionRange = _m_utils.default.getSelectionRange(focusedElement);
      this._updateEditRowCore(row, false, isCustomSetCellValue);
      // @ts-expect-error
      this._validateEditFormAfterUpdate(row, isCustomSetCellValue);
      if (columnIndex >= 0) {
        const $focusedItem = this._rowsView._getCellElement(row.rowIndex, columnIndex);
        this._delayedInputFocus($focusedItem, () => {
          setTimeout(() => {
            var _a;
            // @ts-expect-error
            focusedElement = _dom_adapter.default.getActiveElement((_a = this.component.$element()) === null || _a === void 0 ? void 0 : _a.get(0));
            if (selectionRange.selectionStart >= 0) {
              _m_utils.default.setSelectionRange(focusedElement, selectionRange);
            }
          });
        });
      }
      deferred.resolve();
    });
  };
  _proto._validateEditFormAfterUpdate = function _validateEditFormAfterUpdate() {};
  _proto._addChange = function _addChange(changeParams, options) {
    var _a;
    const row = options === null || options === void 0 ? void 0 : options.row;
    const changes = [...this.getChanges()];
    let index = _m_utils.default.getIndexByKey(changeParams.key, changes);
    if (index < 0) {
      index = changes.length;
      this._addInternalData({
        key: changeParams.key,
        oldData: changeParams.oldData
      });
      delete changeParams.oldData;
      changes.push(changeParams);
    }
    const change = _extends({}, changes[index]);
    if (change) {
      if (changeParams.data) {
        change.data = (0, _array_utils.createObjectWithChanges)(change.data, changeParams.data);
      }
      if ((!change.type || !changeParams.data) && changeParams.type) {
        change.type = changeParams.type;
      }
      if (row) {
        row.oldData = this._getOldData(row.key);
        row.data = (0, _array_utils.createObjectWithChanges)(row.data, changeParams.data);
      }
    }
    changes[index] = change;
    this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
    // T1043517
    if (options && change !== ((_a = this.getChanges()) === null || _a === void 0 ? void 0 : _a[index])) {
      options.forceUpdateRow = true;
    }
    return change;
  };
  _proto._getFormEditItemTemplate = function _getFormEditItemTemplate(cellOptions, column) {
    return column.editCellTemplate || this._getDefaultEditorTemplate();
  };
  _proto.getColumnTemplate = function getColumnTemplate(options) {
    const {
      column
    } = options;
    const rowIndex = options.row && options.row.rowIndex;
    let template;
    const isRowMode = this.isRowBasedEditMode();
    const isRowEditing = this.isEditRow(rowIndex);
    const isCellEditing = this.isEditCell(rowIndex, options.columnIndex);
    let editingStartOptions;
    if ((column.showEditorAlways || column.setCellValue && (isRowEditing && column.allowEditing || isCellEditing)) && (options.rowType === 'data' || options.rowType === 'detailAdaptive') && !column.command) {
      const allowUpdating = this.allowUpdating(options);
      if (((allowUpdating || isRowEditing) && column.allowEditing || isCellEditing) && (isRowEditing || !isRowMode)) {
        if (column.showEditorAlways && !isRowMode) {
          editingStartOptions = {
            cancel: false,
            key: options.row.isNewRow ? undefined : options.row.key,
            data: options.row.data,
            column
          };
          this._isEditingStart(editingStartOptions);
        }
        if (!editingStartOptions || !editingStartOptions.cancel) {
          options.setValue = (value, text) => {
            this.updateFieldValue(options, value, text);
          };
        }
      }
      template = column.editCellTemplate || this._getDefaultEditorTemplate();
    } else if (column.command === 'detail' && options.rowType === 'detail' && isRowEditing) {
      template = this === null || this === void 0 ? void 0 : this.getEditFormTemplate(options);
    }
    return template;
  };
  _proto._createButton = function _createButton($container, button, options, change) {
    let icon = _const.EDIT_ICON_CLASS[button.name];
    const useIcons = this.option('editing.useIcons');
    const useLegacyColumnButtonTemplate = this.option('useLegacyColumnButtonTemplate');
    let $button = (0, _renderer.default)('<a>').attr('href', '#').addClass(_const.LINK_CLASS).addClass(button.cssClass);
    if (button.template && useLegacyColumnButtonTemplate) {
      this._rowsView.renderTemplate($container, button.template, options, true);
    } else {
      if (button.template) {
        $button = (0, _renderer.default)('<span>').addClass(button.cssClass);
      } else if (useIcons && icon || button.icon) {
        icon = button.icon || icon;
        const iconType = iconUtils.getImageSourceType(icon);
        if (iconType === 'image' || iconType === 'svg') {
          // @ts-expect-error
          $button = iconUtils.getImageContainer(icon).addClass(button.cssClass);
        } else {
          $button.addClass("dx-icon".concat(iconType === 'dxIcon' ? '-' : ' ').concat(icon)).attr('title', button.text);
        }
        $button.addClass(_const.LINK_ICON_CLASS);
        $container.addClass(_const.COMMAND_EDIT_WITH_ICONS_CLASS);
        const localizationName = this.getButtonLocalizationNames()[button.name];
        localizationName && $button.attr('aria-label', _message.default.format(localizationName));
      } else {
        $button.text(button.text);
      }
      if ((0, _type.isDefined)(button.hint)) {
        $button.attr('title', button.hint);
      }
      if (this._isButtonDisabled(button, options)) {
        $button.addClass('dx-state-disabled');
      } else if (!button.template || button.onClick) {
        _events_engine.default.on($button, (0, _index.addNamespace)('click', _const.EDITING_NAMESPACE), this.createAction(e => {
          var _a;
          (_a = button.onClick) === null || _a === void 0 ? void 0 : _a.call(button, (0, _extend.extend)({}, e, {
            row: options.row,
            column: options.column
          }));
          e.event.preventDefault();
          e.event.stopPropagation();
        }));
      }
      $container.append($button, '&nbsp;');
      if (button.template) {
        options.renderAsync = false;
        this._rowsView.renderTemplate($button, button.template, options, true, change);
      }
    }
  };
  _proto.getButtonLocalizationNames = function getButtonLocalizationNames() {
    return {
      edit: 'dxDataGrid-editingEditRow',
      save: 'dxDataGrid-editingSaveRowChanges',
      delete: 'dxDataGrid-editingDeleteRow',
      undelete: 'dxDataGrid-editingUndeleteRow',
      cancel: 'dxDataGrid-editingCancelRowChanges'
    };
  };
  _proto.prepareButtonItem = function prepareButtonItem(headerPanel, name, methodName, sortIndex) {
    var _a;
    const editingTexts = (_a = this.option('editing.texts')) !== null && _a !== void 0 ? _a : {};
    const titleButtonTextByClassNames = {
      revert: editingTexts.cancelAllChanges,
      save: editingTexts.saveAllChanges,
      addRow: editingTexts.addRow
    };
    const classNameButtonByNames = {
      revert: 'cancel',
      save: 'save',
      addRow: 'addrow'
    };
    const className = classNameButtonByNames[name];
    const onInitialized = e => {
      (0, _renderer.default)(e.element).addClass(headerPanel._getToolbarButtonClass("".concat(_const.EDIT_BUTTON_CLASS, " ").concat(this.addWidgetPrefix(className), "-button")));
    };
    const hintText = titleButtonTextByClassNames[name];
    const isButtonDisabled = (className === 'save' || className === 'cancel') && this._isEditButtonDisabled();
    return {
      widget: 'dxButton',
      options: {
        onInitialized,
        icon: "edit-button-".concat(className),
        disabled: isButtonDisabled,
        onClick: () => {
          setTimeout(() => {
            this[methodName]();
          });
        },
        text: hintText,
        hint: hintText
      },
      showText: 'inMenu',
      name: "".concat(name, "Button"),
      location: 'after',
      locateInMenu: 'auto',
      sortIndex
    };
  };
  _proto.prepareEditButtons = function prepareEditButtons(headerPanel) {
    var _a;
    const editingOptions = (_a = this.option('editing')) !== null && _a !== void 0 ? _a : {};
    const buttonItems = [];
    if (editingOptions.allowAdding) {
      buttonItems.push(this.prepareButtonItem(headerPanel, 'addRow', 'addRow', 20));
    }
    return buttonItems;
  };
  _proto.highlightDataCell = function highlightDataCell($cell, params) {
    this.shouldHighlightCell(params) && $cell.addClass(_const.CELL_MODIFIED);
  };
  _proto._afterInsertRow = function _afterInsertRow() {}
  // @ts-expect-error
  ;
  _proto._beforeSaveEditData = function _beforeSaveEditData(change) {
    if (change && !(0, _type.isDefined)(change.key) && (0, _type.isDefined)(change.type)) {
      return true;
    }
  };
  _proto._afterSaveEditData = function _afterSaveEditData() {};
  _proto._beforeCancelEditData = function _beforeCancelEditData() {};
  _proto._allowEditAction = function _allowEditAction(actionName, options) {
    let allowEditAction = this.option("editing.".concat(actionName));
    if ((0, _type.isFunction)(allowEditAction)) {
      allowEditAction = allowEditAction({
        component: this.component,
        row: options.row
      });
    }
    return allowEditAction;
  };
  _proto.allowUpdating = function allowUpdating(options, eventName) {
    var _a;
    const startEditAction = (_a = this.option('editing.startEditAction')) !== null && _a !== void 0 ? _a : _const.DEFAULT_START_EDIT_ACTION;
    const needCallback = arguments.length > 1 ? startEditAction === eventName || eventName === 'down' : true;
    return needCallback && this._allowEditAction('allowUpdating', options);
  };
  _proto.allowDeleting = function allowDeleting(options) {
    return this._allowEditAction('allowDeleting', options);
  };
  _proto.isCellModified = function isCellModified(parameters) {
    var _a, _b, _c;
    const {
      columnIndex
    } = parameters;
    let modifiedValue = (_b = (_a = parameters === null || parameters === void 0 ? void 0 : parameters.row) === null || _a === void 0 ? void 0 : _a.modifiedValues) === null || _b === void 0 ? void 0 : _b[columnIndex];
    if ((_c = parameters === null || parameters === void 0 ? void 0 : parameters.row) === null || _c === void 0 ? void 0 : _c.isNewRow) {
      modifiedValue = parameters.value;
    }
    return modifiedValue !== undefined;
  };
  _proto.isNewRowInEditMode = function isNewRowInEditMode() {
    const visibleEditRowIndex = this._getVisibleEditRowIndex();
    const rows = this._dataController.items();
    return visibleEditRowIndex >= 0 ? rows[visibleEditRowIndex].isNewRow : false;
  };
  _proto._isRowDeleteAllowed = function _isRowDeleteAllowed() {};
  _proto.shouldHighlightCell = function shouldHighlightCell(parameters) {
    const cellModified = this.isCellModified(parameters);
    return cellModified && parameters.column.setCellValue && (this.getEditMode() !== _const.EDIT_MODE_ROW || !parameters.row.isEditing);
  };
  return EditingControllerImpl;
}(_m_modules.default.ViewController);
const editingModule = {
  defaultOptions() {
    return {
      editing: {
        mode: 'row',
        refreshMode: 'full',
        newRowPosition: _const.VIEWPORT_TOP_NEW_ROW_POSITION,
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        useIcons: false,
        selectTextOnEditStart: false,
        confirmDelete: true,
        texts: {
          editRow: _message.default.format('dxDataGrid-editingEditRow'),
          saveAllChanges: _message.default.format('dxDataGrid-editingSaveAllChanges'),
          saveRowChanges: _message.default.format('dxDataGrid-editingSaveRowChanges'),
          cancelAllChanges: _message.default.format('dxDataGrid-editingCancelAllChanges'),
          cancelRowChanges: _message.default.format('dxDataGrid-editingCancelRowChanges'),
          addRow: _message.default.format('dxDataGrid-editingAddRow'),
          deleteRow: _message.default.format('dxDataGrid-editingDeleteRow'),
          undeleteRow: _message.default.format('dxDataGrid-editingUndeleteRow'),
          confirmDeleteMessage: _message.default.format('dxDataGrid-editingConfirmDeleteMessage'),
          confirmDeleteTitle: ''
        },
        form: {
          colCount: 2
        },
        popup: {},
        startEditAction: 'click',
        editRowKey: null,
        editColumnName: null,
        changes: []
      },
      useLegacyColumnButtonTemplate: false
    };
  },
  controllers: {
    editing: EditingControllerImpl
  },
  extenders: {
    controllers: {
      data: {
        init() {
          this._editingController = this.getController('editing');
          this.callBase();
        },
        reload(full, repaintChangesOnly) {
          !repaintChangesOnly && this._editingController.refresh();
          return this.callBase.apply(this, arguments);
        },
        repaintRows() {
          if (this.getController('editing').isSaving()) return;
          return this.callBase.apply(this, arguments);
        },
        _updateEditRow(items) {
          var _a;
          const editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
          const editRowIndex = _m_utils.default.getIndexByKey(editRowKey, items);
          const editItem = items[editRowIndex];
          if (editItem) {
            editItem.isEditing = true;
            (_a = this._updateEditItem) === null || _a === void 0 ? void 0 : _a.call(this, editItem);
          }
        },
        _updateItemsCore(change) {
          this.callBase(change);
          this._updateEditRow(this.items(true));
        },
        _applyChangeUpdate(change) {
          this._updateEditRow(change.items);
          this.callBase(change);
        },
        _applyChangesOnly(change) {
          this._updateEditRow(change.items);
          this.callBase(change);
        },
        _processItems(items, change) {
          items = this._editingController.processItems(items, change);
          return this.callBase(items, change);
        },
        _processDataItem(dataItem, options) {
          this._editingController.processDataItem(dataItem, options, this.generateDataValues);
          return this.callBase(dataItem, options);
        },
        _processItem(item, options) {
          item = this.callBase(item, options);
          if (item.isNewRow) {
            options.dataIndex--;
            delete item.dataIndex;
          }
          return item;
        },
        _getChangedColumnIndices(oldItem, newItem, rowIndex, isLiveUpdate) {
          if (oldItem.isNewRow !== newItem.isNewRow || oldItem.removed !== newItem.removed) {
            return;
          }
          return this.callBase.apply(this, arguments);
        },
        _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
          const editingController = this.getController('editing');
          const cell = oldRow.cells && oldRow.cells[columnIndex];
          const isEditing = editingController && editingController.isEditCell(visibleRowIndex, columnIndex);
          if (isLiveUpdate && isEditing) {
            return false;
          }
          if (cell && cell.column && !cell.column.showEditorAlways && cell.isEditing !== isEditing) {
            return true;
          }
          return this.callBase.apply(this, arguments);
        },
        needToRefreshOnDataSourceChange(args) {
          const editingController = this.getController('editing');
          const isParasiteChange = Array.isArray(args.value) && args.value === args.previousValue && editingController.isSaving();
          return !isParasiteChange;
        },
        _handleDataSourceChange(args) {
          const result = this.callBase(args);
          const changes = this.option('editing.changes');
          const dataSource = args.value;
          if (Array.isArray(dataSource) && changes.length) {
            const dataSourceKeys = dataSource.map(item => this.keyOf(item));
            const newChanges = changes.filter(change => change.type === 'insert' || dataSourceKeys.some(key => (0, _common.equalByValue)(change.key, key)));
            if (newChanges.length !== changes.length) {
              this.option('editing.changes', newChanges);
            }
            const editRowKey = this.option('editing.editRowKey');
            const isEditNewItem = newChanges.some(change => change.type === 'insert' && (0, _common.equalByValue)(editRowKey, change.key));
            if (!isEditNewItem && dataSourceKeys.every(key => !(0, _common.equalByValue)(editRowKey, key))) {
              this.option('editing.editRowKey', null);
            }
          }
          return result;
        }
      }
    },
    views: {
      rowsView: {
        init() {
          this.callBase();
          this._editingController = this.getController('editing');
        },
        getCellIndex($cell, rowIndex) {
          if (!$cell.is('td') && rowIndex >= 0) {
            const $cellElements = this.getCellElements(rowIndex);
            let cellIndex = -1;
            (0, _iterator.each)($cellElements, (index, cellElement) => {
              if ((0, _renderer.default)(cellElement).find($cell).length) {
                // @ts-expect-error
                cellIndex = index;
              }
            });
            return cellIndex;
          }
          return this.callBase.apply(this, arguments);
        },
        publicMethods() {
          return this.callBase().concat(['cellValue']);
        },
        _getCellTemplate(options) {
          const template = this._editingController.getColumnTemplate(options);
          return template || this.callBase(options);
        },
        _createRow(row) {
          const $row = this.callBase.apply(this, arguments);
          if (row) {
            const isRowRemoved = !!row.removed;
            const isRowInserted = !!row.isNewRow;
            const isRowModified = !!row.modified;
            isRowInserted && $row.addClass(_const.ROW_INSERTED);
            isRowModified && $row.addClass(_const.ROW_MODIFIED);
            if (isRowInserted || isRowRemoved) {
              $row.removeClass(_const.ROW_SELECTED);
            }
          }
          return $row;
        },
        _getColumnIndexByElement($element) {
          let $tableElement = $element.closest('table');
          const $tableElements = this.getTableElements();
          while ($tableElement.length && !$tableElements.filter($tableElement).length) {
            $element = $tableElement.closest('td');
            $tableElement = $element.closest('table');
          }
          return this._getColumnIndexByElementCore($element);
        },
        _getColumnIndexByElementCore($element) {
          const $targetElement = $element.closest(".".concat(_const.ROW_CLASS, "> td:not(.dx-master-detail-cell)"));
          return this.getCellIndex($targetElement);
        },
        _editCellByClick(e, eventName) {
          const editingController = this._editingController;
          const $targetElement = (0, _renderer.default)(e.event.target);
          const columnIndex = this._getColumnIndexByElement($targetElement);
          const row = this._dataController.items()[e.rowIndex];
          const allowUpdating = editingController.allowUpdating({
            row
          }, eventName) || row && row.isNewRow;
          const column = this._columnsController.getVisibleColumns()[columnIndex];
          const isEditedCell = editingController.isEditCell(e.rowIndex, columnIndex);
          const allowEditing = allowUpdating && column && (column.allowEditing || isEditedCell);
          const startEditAction = this.option('editing.startEditAction') || 'click';
          const isShowEditorAlways = column && column.showEditorAlways;
          if (isEditedCell) {
            return true;
          }
          if (eventName === 'down') {
            if (_devices.default.real().ios || _devices.default.real().android) {
              (0, _dom.resetActiveElement)();
            }
            return isShowEditorAlways && allowEditing && editingController.editCell(e.rowIndex, columnIndex);
          }
          if (eventName === 'click' && startEditAction === 'dblClick') {
            const isError = false;
            const withoutSaveEditData = row === null || row === void 0 ? void 0 : row.isNewRow;
            editingController.closeEditCell(isError, withoutSaveEditData);
          }
          if (allowEditing && eventName === startEditAction) {
            return editingController.editCell(e.rowIndex, columnIndex) || editingController.isEditRow(e.rowIndex);
          }
        },
        _rowPointerDown(e) {
          this._pointerDownTimeout = setTimeout(() => {
            this._editCellByClick(e, 'down');
          });
        },
        _rowClick(e) {
          const isEditForm = (0, _renderer.default)(e.rowElement).hasClass(this.addWidgetPrefix(_const.EDIT_FORM_CLASS));
          e.event[_const.TARGET_COMPONENT_NAME] = this.component;
          if (!this._editCellByClick(e, 'click') && !isEditForm) {
            this.callBase.apply(this, arguments);
          }
        },
        _rowDblClick(e) {
          if (!this._editCellByClick(e, 'dblClick')) {
            this.callBase.apply(this, arguments);
          }
        },
        _cellPrepared($cell, parameters) {
          var _a;
          const editingController = this._editingController;
          const isCommandCell = !!parameters.column.command;
          const isEditableCell = parameters.setValue;
          const isEditRow = editingController.isEditRow(parameters.rowIndex);
          const isEditing = (0, _m_editing_utils.isEditingCell)(isEditRow, parameters);
          if ((0, _m_editing_utils.isEditingOrShowEditorAlwaysDataCell)(isEditRow, parameters)) {
            const {
              alignment
            } = parameters.column;
            $cell.toggleClass(this.addWidgetPrefix(_const.READONLY_CLASS), !isEditableCell).toggleClass(_const.CELL_FOCUS_DISABLED_CLASS, !isEditableCell);
            if (alignment) {
              $cell.find(_const.EDITORS_INPUT_SELECTOR).first().css('textAlign', alignment);
            }
          }
          if (isEditing) {
            this._editCellPrepared($cell);
          }
          const hasTemplate = !!((_a = parameters.column) === null || _a === void 0 ? void 0 : _a.cellTemplate);
          if (parameters.column && !isCommandCell && (!hasTemplate || editingController.shouldHighlightCell(parameters))) {
            editingController.highlightDataCell($cell, parameters);
          }
          this.callBase.apply(this, arguments);
        },
        _editCellPrepared: _common.noop,
        _formItemPrepared: _common.noop,
        _getCellOptions(options) {
          const cellOptions = this.callBase(options);
          const {
            columnIndex,
            row
          } = options;
          cellOptions.isEditing = this._editingController.isEditCell(cellOptions.rowIndex, cellOptions.columnIndex);
          cellOptions.removed = row.removed;
          if (row.modified) {
            cellOptions.modified = row.modifiedValues[columnIndex] !== undefined;
          }
          return cellOptions;
        },
        _setCellAriaAttributes($cell, cellOptions) {
          this.callBase($cell, cellOptions);
          if (cellOptions.removed) {
            this.setAria('roledescription', _message.default.format('dxDataGrid-ariaDeletedCell'), $cell);
          }
          if (cellOptions.modified) {
            this.setAria('roledescription', _message.default.format('dxDataGrid-ariaModifiedCell'), $cell);
          }
          const isEditableCell = cellOptions.column.allowEditing && !cellOptions.removed && !cellOptions.modified && cellOptions.rowType === 'data' && cellOptions.column.calculateCellValue === cellOptions.column.defaultCalculateCellValue && this._editingController.isCellBasedEditMode();
          if (isEditableCell) {
            this.setAria('roledescription', _message.default.format('dxDataGrid-ariaEditableCell'), $cell);
          }
        },
        _createCell(options) {
          const $cell = this.callBase(options);
          const isEditRow = this._editingController.isEditRow(options.rowIndex);
          (0, _m_editing_utils.isEditingOrShowEditorAlwaysDataCell)(isEditRow, options) && $cell.addClass(_const.EDITOR_CELL_CLASS);
          return $cell;
        },
        cellValue(rowIndex, columnIdentifier, value, text) {
          const cellOptions = this.getCellOptions(rowIndex, columnIdentifier);
          if (cellOptions) {
            if (value === undefined) {
              return cellOptions.value;
            }
            this._editingController.updateFieldValue(cellOptions, value, text, true);
          }
        },
        dispose() {
          this.callBase.apply(this, arguments);
          clearTimeout(this._pointerDownTimeout);
        },
        _renderCore() {
          this.callBase.apply(this, arguments);
          return this.waitAsyncTemplates(true).done(() => {
            this._editingController._focusEditorIfNeed();
          });
        }
      },
      headerPanel: {
        _getToolbarItems() {
          const items = this.callBase();
          const editButtonItems = this.getController('editing').prepareEditButtons(this);
          return editButtonItems.concat(items);
        },
        optionChanged(args) {
          const {
            fullName
          } = args;
          switch (args.name) {
            case 'editing':
              {
                const excludedOptions = [_const.EDITING_POPUP_OPTION_NAME, _const.EDITING_CHANGES_OPTION_NAME, _const.EDITING_EDITCOLUMNNAME_OPTION_NAME, _const.EDITING_EDITROWKEY_OPTION_NAME];
                const shouldInvalidate = fullName && !excludedOptions.some(optionName => optionName === fullName);
                shouldInvalidate && this._invalidate();
                this.callBase(args);
                break;
              }
            case 'useLegacyColumnButtonTemplate':
              args.handled = true;
              break;
            default:
              this.callBase(args);
          }
        },
        isVisible() {
          const editingOptions = this.getController('editing').option('editing');
          return this.callBase() || (editingOptions === null || editingOptions === void 0 ? void 0 : editingOptions.allowAdding);
        }
      }
    }
  }
};
exports.editingModule = editingModule;