/**
* DevExtreme (bundles/__internal/grids/grid_core/validating/m_validating.js)
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
exports.validatingModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _string = require("../../../../core/utils/string");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _load_indicator = _interopRequireDefault(require("../../../../ui/load_indicator"));
var _ui = _interopRequireDefault(require("../../../../ui/overlay/ui.overlay"));
var _themes = require("../../../../ui/themes");
var _validation_engine = _interopRequireDefault(require("../../../../ui/validation_engine"));
var _validator = _interopRequireDefault(require("../../../../ui/validator"));
var _selectors = require("../../../../ui/widget/selectors");
var _ui2 = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _const = require("../editing/const");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

// @ts-expect-error

const INVALIDATE_CLASS = 'invalid';
const REVERT_TOOLTIP_CLASS = 'revert-tooltip';
const INVALID_MESSAGE_CLASS = 'dx-invalid-message';
const INVALID_MESSAGE_ID = 'dxInvalidMessage';
const WIDGET_INVALID_MESSAGE_CLASS = 'invalid-message';
const INVALID_MESSAGE_ALWAYS_CLASS = 'dx-invalid-message-always';
const REVERT_BUTTON_CLASS = 'dx-revert-button';
const REVERT_BUTTON_ID = 'dxRevertButton';
const VALIDATOR_CLASS = 'validator';
const PENDING_INDICATOR_CLASS = 'dx-pending-indicator';
const VALIDATION_PENDING_CLASS = 'dx-validation-pending';
const CONTENT_CLASS = 'content';
const INSERT_INDEX = '__DX_INSERT_INDEX__';
const PADDING_BETWEEN_TOOLTIPS = 2;
const EDIT_MODE_ROW = 'row';
const EDIT_MODE_FORM = 'form';
const EDIT_MODE_BATCH = 'batch';
const EDIT_MODE_CELL = 'cell';
const EDIT_MODE_POPUP = 'popup';
const GROUP_CELL_CLASS = 'dx-group-cell';
const FORM_BASED_MODES = [EDIT_MODE_POPUP, EDIT_MODE_FORM];
const COMMAND_TRANSPARENT = 'transparent';
const VALIDATION_STATUS = {
  valid: 'valid',
  invalid: 'invalid',
  pending: 'pending'
};
const EDIT_DATA_INSERT_TYPE = 'insert';
const EDIT_DATA_REMOVE_TYPE = 'remove';
const VALIDATION_CANCELLED = 'cancel';
const validationResultIsValid = function (result) {
  return (0, _type.isDefined)(result) && result !== VALIDATION_CANCELLED;
};
const cellValueShouldBeValidated = function (value, rowOptions) {
  return value !== undefined || value === undefined && rowOptions && !rowOptions.isNewRow;
};
const ValidatingController = _m_modules.default.Controller.inherit(function () {
  return {
    init() {
      this._editingController = this.getController('editing');
      this.createAction('onRowValidating');
      if (!this._validationState) {
        this.initValidationState();
      }
    },
    initValidationState() {
      this._validationState = [];
      this._validationStateCache = {};
    },
    _rowIsValidated(change) {
      const validationData = this._getValidationData(change === null || change === void 0 ? void 0 : change.key);
      return !!validationData && !!validationData.validated;
    },
    _getValidationData(key, create) {
      const keyHash = (0, _common.getKeyHash)(key);
      const isObjectKeyHash = (0, _type.isObject)(keyHash);
      let validationData;
      if (isObjectKeyHash) {
        // eslint-disable-next-line prefer-destructuring
        validationData = this._validationState.filter(data => (0, _common.equalByValue)(data.key, key))[0];
      } else {
        validationData = this._validationStateCache[keyHash];
      }
      if (!validationData && create) {
        validationData = {
          key,
          isValid: true
        };
        this._validationState.push(validationData);
        if (!isObjectKeyHash) {
          this._validationStateCache[keyHash] = validationData;
        }
      }
      return validationData;
    },
    _getBrokenRules(validationData, validationResults) {
      let brokenRules;
      if (validationResults) {
        brokenRules = validationResults.brokenRules || validationResults.brokenRule && [validationResults.brokenRule];
      } else {
        brokenRules = validationData.brokenRules || [];
      }
      return brokenRules;
    },
    _rowValidating(validationData, validationResults) {
      // @ts-expect-error
      const deferred = new _deferred.Deferred();
      const change = this._editingController.getChangeByKey(validationData === null || validationData === void 0 ? void 0 : validationData.key);
      const brokenRules = this._getBrokenRules(validationData, validationResults);
      const isValid = validationResults ? validationResults.isValid : validationData.isValid;
      const parameters = {
        brokenRules,
        isValid,
        key: change.key,
        newData: change.data,
        oldData: this._editingController._getOldData(change.key),
        promise: null,
        errorText: this.getHiddenValidatorsErrorText(brokenRules)
      };
      this.executeAction('onRowValidating', parameters);
      (0, _deferred.when)((0, _deferred.fromPromise)(parameters.promise)).always(() => {
        validationData.isValid = parameters.isValid;
        validationData.errorText = parameters.errorText;
        deferred.resolve(parameters);
      });
      return deferred.promise();
    },
    getHiddenValidatorsErrorText(brokenRules) {
      const brokenRulesMessages = [];
      (0, _iterator.each)(brokenRules, (_, brokenRule) => {
        const {
          column
        } = brokenRule;
        const isGroupExpandColumn = column && column.groupIndex !== undefined && !column.showWhenGrouped;
        const isVisibleColumn = column && column.visible;
        if (!brokenRule.validator.$element().parent().length && (!isVisibleColumn || isGroupExpandColumn)) {
          brokenRulesMessages.push(brokenRule.message);
        }
      });
      return brokenRulesMessages.join(', ');
    },
    validate(isFull) {
      let isValid = true;
      const editingController = this._editingController;
      // @ts-expect-error
      const deferred = new _deferred.Deferred();
      const completeList = [];
      const editMode = editingController.getEditMode();
      isFull = isFull || editMode === EDIT_MODE_ROW;
      if (this._isValidationInProgress) {
        return deferred.resolve(false).promise();
      }
      this._isValidationInProgress = true;
      if (isFull) {
        editingController.addDeferred(deferred);
        const changes = editingController.getChanges();
        (0, _iterator.each)(changes, (index, _ref) => {
          let {
            type,
            key
          } = _ref;
          if (type !== 'remove') {
            const validationData = this._getValidationData(key, true);
            const validationResult = this.validateGroup(validationData);
            completeList.push(validationResult);
            validationResult.done(validationResult => {
              validationData.validated = true;
              isValid = isValid && validationResult.isValid;
            });
          }
        });
      } else if (this._currentCellValidator) {
        const validationResult = this.validateGroup(this._currentCellValidator._findGroup());
        completeList.push(validationResult);
        validationResult.done(validationResult => {
          isValid = validationResult.isValid;
        });
      }
      (0, _deferred.when)(...completeList).done(() => {
        this._isValidationInProgress = false;
        deferred.resolve(isValid);
      });
      return deferred.promise();
    },
    validateGroup(validationData) {
      // @ts-expect-error
      const result = new _deferred.Deferred();
      const validateGroup = validationData && _validation_engine.default.getGroupConfig(validationData);
      let validationResult;
      if (validateGroup === null || validateGroup === void 0 ? void 0 : validateGroup.validators.length) {
        this.resetRowValidationResults(validationData);
        validationResult = _validation_engine.default.validateGroup(validationData);
      }
      (0, _deferred.when)((validationResult === null || validationResult === void 0 ? void 0 : validationResult.complete) || validationResult).done(validationResult => {
        (0, _deferred.when)(this._rowValidating(validationData, validationResult)).done(result.resolve);
      });
      return result.promise();
    },
    isRowDataModified(change) {
      return !(0, _type.isEmptyObject)(change.data);
    },
    updateValidationState(change) {
      const editMode = this._editingController.getEditMode();
      const {
        key
      } = change;
      const validationData = this._getValidationData(key, true);
      if (!FORM_BASED_MODES.includes(editMode)) {
        if (change.type === EDIT_DATA_INSERT_TYPE && !this.isRowDataModified(change)) {
          validationData.isValid = true;
          return;
        }
        this.setDisableApplyValidationResults(true);
        const groupConfig = _validation_engine.default.getGroupConfig(validationData);
        if (groupConfig) {
          const validationResult = _validation_engine.default.validateGroup(validationData);
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          (0, _deferred.when)(validationResult.complete || validationResult).done(validationResult => {
            // @ts-expect-error
            validationData.isValid = validationResult.isValid;
            // @ts-expect-error
            validationData.brokenRules = validationResult.brokenRules;
          });
        } else if (!validationData.brokenRules || !validationData.brokenRules.length) {
          validationData.isValid = true;
        }
        this.setDisableApplyValidationResults(false);
      } else {
        validationData.isValid = true;
      }
    },
    setValidator(validator) {
      this._currentCellValidator = validator;
    },
    renderCellPendingIndicator($container) {
      let $indicator = $container.find(".".concat(PENDING_INDICATOR_CLASS));
      if (!$indicator.length) {
        const $indicatorContainer = $container;
        $indicator = (0, _renderer.default)('<div>').appendTo($indicatorContainer).addClass(PENDING_INDICATOR_CLASS);
        this._createComponent($indicator, _load_indicator.default);
        $container.addClass(VALIDATION_PENDING_CLASS);
      }
    },
    disposeCellPendingIndicator($container) {
      const $indicator = $container.find(".".concat(PENDING_INDICATOR_CLASS));
      if ($indicator.length) {
        const indicator = _load_indicator.default.getInstance($indicator);
        if (indicator) {
          indicator.dispose();
          indicator.$element().remove();
        }
        $container.removeClass(VALIDATION_PENDING_CLASS);
      }
    },
    validationStatusChanged(result) {
      const {
        validator
      } = result;
      const validationGroup = validator.option('validationGroup');
      const {
        column
      } = validator.option('dataGetter')();
      this.updateCellValidationResult({
        rowKey: validationGroup.key,
        columnIndex: column.index,
        validationResult: result
      });
    },
    validatorInitialized(arg) {
      arg.component.on('validating', this.validationStatusChanged.bind(this));
      arg.component.on('validated', this.validationStatusChanged.bind(this));
    },
    validatorDisposing(arg) {
      const validator = arg.component;
      const validationGroup = validator.option('validationGroup');
      const {
        column
      } = validator.option('dataGetter')();
      const result = this.getCellValidationResult({
        rowKey: validationGroup === null || validationGroup === void 0 ? void 0 : validationGroup.key,
        columnIndex: column.index
      });
      if (validationResultIsValid(result) && result.status === VALIDATION_STATUS.pending) {
        this.cancelCellValidationResult({
          change: validationGroup,
          columnIndex: column.index
        });
      }
    },
    applyValidationResult($container, result) {
      const {
        validator
      } = result;
      const validationGroup = validator.option('validationGroup');
      const {
        column
      } = validator.option('dataGetter')();
      result.brokenRules && result.brokenRules.forEach(rule => {
        rule.columnIndex = column.index;
        rule.column = column;
      });
      if ($container) {
        const validationResult = this.getCellValidationResult({
          rowKey: validationGroup.key,
          columnIndex: column.index
        });
        const requestIsDisabled = validationResultIsValid(validationResult) && validationResult.disabledPendingId === result.id;
        if (this._disableApplyValidationResults || requestIsDisabled) {
          return;
        }
        if (result.status === VALIDATION_STATUS.invalid) {
          const $focus = $container.find(':focus');
          if (!(0, _selectors.focused)($focus)) {
            // @ts-expect-error
            _events_engine.default.trigger($focus, 'focus');
            // @ts-expect-error
            _events_engine.default.trigger($focus, _pointer.default.down);
          }
        }
        const editor = !column.editCellTemplate && this.getController('editorFactory').getEditorInstance($container);
        if (result.status === VALIDATION_STATUS.pending) {
          if (editor) {
            editor.option('validationStatus', VALIDATION_STATUS.pending);
          } else {
            this.renderCellPendingIndicator($container);
          }
        } else if (editor) {
          editor.option('validationStatus', VALIDATION_STATUS.valid);
        } else {
          this.disposeCellPendingIndicator($container);
        }
        $container.toggleClass(this.addWidgetPrefix(INVALIDATE_CLASS), result.status === VALIDATION_STATUS.invalid);
      }
    },
    _syncInternalEditingData(parameters) {
      var _a;
      const editingController = this._editingController;
      const change = editingController.getChangeByKey(parameters.key);
      const oldDataFromState = editingController._getOldData(parameters.key);
      const oldData = (_a = parameters.row) === null || _a === void 0 ? void 0 : _a.oldData;
      if (change && oldData && !oldDataFromState) {
        editingController._addInternalData({
          key: parameters.key,
          oldData
        });
      }
    },
    createValidator(parameters, $container) {
      var _a, _b;
      const editingController = this._editingController;
      const {
        column
      } = parameters;
      let {
        showEditorAlways
      } = column;
      if ((0, _type.isDefined)(column.command) || !column.validationRules || !Array.isArray(column.validationRules) || !column.validationRules.length) return;
      const editIndex = editingController.getIndexByKey(parameters.key, editingController.getChanges());
      let needCreateValidator = editIndex > -1;
      if (!needCreateValidator) {
        if (!showEditorAlways) {
          const columnsController = this.getController('columns');
          const visibleColumns = (columnsController === null || columnsController === void 0 ? void 0 : columnsController.getVisibleColumns()) || [];
          showEditorAlways = visibleColumns.some(column => column.showEditorAlways);
        }
        const isEditRow = (0, _common.equalByValue)(this.option('editing.editRowKey'), parameters.key);
        const isCellOrBatchEditingAllowed = editingController.isCellOrBatchEditMode() && editingController.allowUpdating({
          row: parameters.row
        });
        needCreateValidator = isEditRow || isCellOrBatchEditingAllowed && showEditorAlways;
        if (isCellOrBatchEditingAllowed && showEditorAlways) {
          editingController._addInternalData({
            key: parameters.key,
            oldData: (_b = (_a = parameters.row) === null || _a === void 0 ? void 0 : _a.oldData) !== null && _b !== void 0 ? _b : parameters.data
          });
        }
      }
      if (needCreateValidator) {
        if ($container && !$container.length) {
          _ui2.default.log('E1050');
          return;
        }
        this._syncInternalEditingData(parameters);
        const validationData = this._getValidationData(parameters.key, true);
        const getValue = () => {
          const change = editingController.getChangeByKey(validationData === null || validationData === void 0 ? void 0 : validationData.key);
          const value = column.calculateCellValue((change === null || change === void 0 ? void 0 : change.data) || {});
          return value !== undefined ? value : parameters.value;
        };
        const useDefaultValidator = $container && $container.hasClass('dx-widget');
        $container && $container.addClass(this.addWidgetPrefix(VALIDATOR_CLASS));
        const validator = new _validator.default($container || (0, _renderer.default)('<div>'), {
          name: column.caption,
          validationRules: (0, _extend.extend)(true, [], column.validationRules),
          validationGroup: validationData,
          // @ts-expect-error
          adapter: useDefaultValidator ? null : {
            getValue,
            applyValidationResults: result => {
              this.applyValidationResult($container, result);
            }
          },
          dataGetter() {
            const key = validationData === null || validationData === void 0 ? void 0 : validationData.key;
            const change = editingController.getChangeByKey(key);
            const oldData = editingController._getOldData(key);
            return {
              data: (0, _array_utils.createObjectWithChanges)(oldData, change === null || change === void 0 ? void 0 : change.data),
              column
            };
          },
          onInitialized: this.validatorInitialized.bind(this),
          onDisposing: this.validatorDisposing.bind(this)
        });
        if (useDefaultValidator) {
          const adapter = validator.option('adapter');
          if (adapter) {
            const originBypass = adapter.bypass;
            const defaultAdapterBypass = () => parameters.row.isNewRow && !this._isValidationInProgress && !editingController.isCellModified(parameters);
            adapter.getValue = getValue;
            adapter.validationRequestsCallbacks = [];
            // @ts-expect-error
            adapter.bypass = () => originBypass.call(adapter) || defaultAdapterBypass();
          }
        }
        return validator;
      }
      return undefined;
    },
    setDisableApplyValidationResults(flag) {
      this._disableApplyValidationResults = flag;
    },
    getDisableApplyValidationResults() {
      return this._disableApplyValidationResults;
    },
    isCurrentValidatorProcessing(_ref2) {
      let {
        rowKey,
        columnIndex
      } = _ref2;
      return this._currentCellValidator && (0, _common.equalByValue)(this._currentCellValidator.option('validationGroup').key, rowKey) && this._currentCellValidator.option('dataGetter')().column.index === columnIndex;
    },
    validateCell(validator) {
      const cellParams = {
        rowKey: validator.option('validationGroup').key,
        columnIndex: validator.option('dataGetter')().column.index
      };
      let validationResult = this.getCellValidationResult(cellParams);
      const stateRestored = validationResultIsValid(validationResult);
      const adapter = validator.option('adapter');
      if (!stateRestored) {
        validationResult = validator.validate();
      } else {
        const currentCellValue = adapter.getValue();
        if (!(0, _common.equalByValue)(currentCellValue, validationResult.value)) {
          validationResult = validator.validate();
        }
      }
      // @ts-expect-error
      const deferred = new _deferred.Deferred();
      if (stateRestored && validationResult.status === VALIDATION_STATUS.pending) {
        this.updateCellValidationResult(cellParams);
        adapter.applyValidationResults(validationResult);
      }
      (0, _deferred.when)(validationResult.complete || validationResult).done(validationResult => {
        stateRestored && adapter.applyValidationResults(validationResult);
        deferred.resolve(validationResult);
      });
      return deferred.promise();
    },
    updateCellValidationResult(_ref3) {
      let {
        rowKey,
        columnIndex,
        validationResult
      } = _ref3;
      const validationData = this._getValidationData(rowKey);
      if (!validationData) {
        return;
      }
      if (!validationData.validationResults) {
        validationData.validationResults = {};
      }
      let result;
      if (validationResult) {
        result = (0, _extend.extend)({}, validationResult);
        validationData.validationResults[columnIndex] = result;
        if (validationResult.status === VALIDATION_STATUS.pending) {
          if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
            // @ts-expect-error
            result.deferred = new _deferred.Deferred();
            result.complete.always(() => {
              result.deferred.resolve();
            });
            this._editingController.addDeferred(result.deferred);
          }
          if (this._disableApplyValidationResults) {
            result.disabledPendingId = validationResult.id;
            return;
          }
        }
      } else {
        result = validationData.validationResults[columnIndex];
      }
      if (result && result.disabledPendingId) {
        delete result.disabledPendingId;
      }
    },
    getCellValidationResult(_ref4) {
      let {
        rowKey,
        columnIndex
      } = _ref4;
      var _a;
      const validationData = this._getValidationData(rowKey, true);
      return (_a = validationData === null || validationData === void 0 ? void 0 : validationData.validationResults) === null || _a === void 0 ? void 0 : _a[columnIndex];
    },
    removeCellValidationResult(_ref5) {
      let {
        change,
        columnIndex
      } = _ref5;
      const validationData = this._getValidationData(change === null || change === void 0 ? void 0 : change.key);
      if (validationData && validationData.validationResults) {
        this.cancelCellValidationResult({
          change,
          columnIndex
        });
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete validationData.validationResults[columnIndex];
      }
    },
    cancelCellValidationResult(_ref6) {
      let {
        change,
        columnIndex
      } = _ref6;
      const validationData = this._getValidationData(change.key);
      if (change && validationData.validationResults) {
        const result = validationData.validationResults[columnIndex];
        if (result) {
          result.deferred && result.deferred.reject(VALIDATION_CANCELLED);
          validationData.validationResults[columnIndex] = VALIDATION_CANCELLED;
        }
      }
    },
    resetRowValidationResults(validationData) {
      if (validationData) {
        validationData.validationResults && delete validationData.validationResults;
        delete validationData.validated;
      }
    },
    isInvalidCell(_ref7) {
      let {
        rowKey,
        columnIndex
      } = _ref7;
      const result = this.getCellValidationResult({
        rowKey,
        columnIndex
      });
      return validationResultIsValid(result) && result.status === VALIDATION_STATUS.invalid;
    },
    getCellValidator(_ref8) {
      let {
        rowKey,
        columnIndex
      } = _ref8;
      const validationData = this._getValidationData(rowKey);
      const groupConfig = validationData && _validation_engine.default.getGroupConfig(validationData);
      const validators = groupConfig && groupConfig.validators;
      return validators && validators.filter(v => {
        const {
          column
        } = v.option('dataGetter')();
        return column ? column.index === columnIndex : false;
      })[0];
    },
    setCellValidationStatus(cellOptions) {
      const validationResult = this.getCellValidationResult({
        rowKey: cellOptions.key,
        columnIndex: cellOptions.column.index
      });
      if ((0, _type.isDefined)(validationResult)) {
        cellOptions.validationStatus = validationResult !== VALIDATION_CANCELLED ? validationResult.status : VALIDATION_CANCELLED;
      } else {
        delete cellOptions.validationStatus;
      }
    }
  };
}());
const validatingModule = {
  defaultOptions() {
    return {
      editing: {
        texts: {
          validationCancelChanges: _message.default.format('dxDataGrid-validationCancelChanges')
        }
      }
    };
  },
  controllers: {
    validating: ValidatingController
  },
  extenders: {
    controllers: {
      editing: {
        _addChange(changeParams) {
          const change = this.callBase.apply(this, arguments);
          const validatingController = this.getController('validating');
          if (change && changeParams.type !== EDIT_DATA_REMOVE_TYPE) {
            validatingController.updateValidationState(change);
          }
          return change;
        },
        _handleChangesChange(args) {
          this.callBase.apply(this, arguments);
          const validatingController = this.getController('validating');
          args.value.forEach(change => {
            if (validatingController._getValidationData(change.key) === undefined) {
              validatingController.updateValidationState(change);
            }
          });
        },
        _updateRowAndPageIndices() {
          const that = this;
          const startInsertIndex = that.getView('rowsView').getTopVisibleItemIndex();
          let rowIndex = startInsertIndex;
          (0, _iterator.each)(that.getChanges(), (_, _ref9) => {
            let {
              key,
              type
            } = _ref9;
            const validationData = this.getController('validating')._getValidationData(key);
            if (validationData && !validationData.isValid && validationData.pageIndex !== that._pageIndex) {
              validationData.pageIndex = that._pageIndex;
              if (type === EDIT_DATA_INSERT_TYPE) {
                validationData.rowIndex = startInsertIndex;
              } else {
                validationData.rowIndex = rowIndex;
              }
              rowIndex++;
            }
          });
        },
        _getValidationGroupsInForm(detailOptions) {
          const validatingController = this.getController('validating');
          const validationData = validatingController._getValidationData(detailOptions.key, true);
          return {
            validationGroup: validationData
          };
        },
        _validateEditFormAfterUpdate(row, isCustomSetCellValue) {
          // T816256, T844143
          if (isCustomSetCellValue && this._editForm) {
            this._editForm.validate();
          }
          this.callBase.apply(this, arguments);
        },
        _prepareEditCell(params) {
          const isNotCanceled = this.callBase.apply(this, arguments);
          const validatingController = this.getController('validating');
          if (isNotCanceled && params.column.showEditorAlways) {
            validatingController.updateValidationState({
              key: params.key
            });
          }
          return isNotCanceled;
        },
        processItems(items, changeType) {
          const changes = this.getChanges();
          const dataController = this.getController('data');
          const validatingController = this.getController('validating');
          const getIndexByChange = function (change, items) {
            let index = -1;
            const isInsert = change.type === EDIT_DATA_INSERT_TYPE;
            const {
              key
            } = change;
            (0, _iterator.each)(items, (i, item) => {
              if ((0, _common.equalByValue)(key, isInsert ? item.key : dataController.keyOf(item))) {
                index = i;
                return false;
              }
              return undefined;
            });
            return index;
          };
          items = this.callBase(items, changeType);
          const itemsCount = items.length;
          const addInValidItem = function (change, validationData) {
            const data = {
              key: change.key
            };
            const index = getIndexByChange(change, items);
            if (index >= 0) {
              return;
            }
            validationData.rowIndex = validationData.rowIndex > itemsCount ? validationData.rowIndex % itemsCount : validationData.rowIndex;
            const {
              rowIndex
            } = validationData;
            data[INSERT_INDEX] = 1;
            items.splice(rowIndex, 0, data);
          };
          if (this.getEditMode() === EDIT_MODE_BATCH && changeType !== 'prepend' && changeType !== 'append') {
            changes.forEach(change => {
              const {
                key
              } = change;
              const validationData = validatingController._getValidationData(key);
              if (validationData && change.type && validationData.pageIndex === this._pageIndex && (change === null || change === void 0 ? void 0 : change.pageIndex) !== this._pageIndex) {
                addInValidItem(change, validationData);
              }
            });
          }
          return items;
        },
        processDataItem(item) {
          const isInserted = item.data[INSERT_INDEX];
          const key = isInserted ? item.data.key : item.key;
          const editMode = this.getEditMode();
          if (editMode === EDIT_MODE_BATCH && isInserted && key) {
            const changes = this.getChanges();
            const editIndex = _m_utils.default.getIndexByKey(key, changes);
            if (editIndex >= 0) {
              const change = changes[editIndex];
              if (change.type !== EDIT_DATA_INSERT_TYPE) {
                const oldData = this._getOldData(change.key);
                item.data = (0, _extend.extend)(true, {}, oldData, change.data);
                item.key = key;
              }
            }
          }
          this.callBase.apply(this, arguments);
        },
        _createInvisibleColumnValidators(changes) {
          const that = this;
          const validatingController = this.getController('validating');
          const columnsController = this.getController('columns');
          const columns = columnsController.getColumns();
          const invisibleColumns = columnsController.getInvisibleColumns().filter(column => !column.isBand);
          const groupColumns = columnsController.getGroupColumns().filter(column => !column.showWhenGrouped && invisibleColumns.indexOf(column) === -1);
          const invisibleColumnValidators = [];
          const isCellVisible = (column, rowKey) => this._dataController.getRowIndexByKey(rowKey) >= 0 && invisibleColumns.indexOf(column) < 0;
          invisibleColumns.push(...groupColumns);
          if (!FORM_BASED_MODES.includes(this.getEditMode())) {
            (0, _iterator.each)(columns, (_, column) => {
              changes.forEach(change => {
                let data;
                if (isCellVisible(column, change.key)) {
                  return;
                }
                if (change.type === EDIT_DATA_INSERT_TYPE) {
                  data = change.data;
                } else if (change.type === 'update') {
                  const oldData = that._getOldData(change.key);
                  if (!(0, _type.isDefined)(oldData)) {
                    return;
                  }
                  data = (0, _array_utils.createObjectWithChanges)(oldData, change.data);
                }
                if (data) {
                  const validator = validatingController.createValidator({
                    column,
                    key: change.key,
                    value: column.calculateCellValue(data)
                  });
                  if (validator) {
                    invisibleColumnValidators.push(validator);
                  }
                }
              });
            });
          }
          return function () {
            invisibleColumnValidators.forEach(validator => {
              validator.dispose();
            });
          };
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _beforeSaveEditData(change, editIndex) {
          let result = this.callBase.apply(this, arguments);
          const validatingController = this.getController('validating');
          const validationData = validatingController._getValidationData(change === null || change === void 0 ? void 0 : change.key);
          if (change) {
            const isValid = change.type === 'remove' || validationData.isValid;
            result = result || !isValid;
          } else {
            const disposeValidators = this._createInvisibleColumnValidators(this.getChanges());
            // @ts-expect-error
            result = new _deferred.Deferred();
            this.executeOperation(result, () => {
              validatingController.validate(true).done(isFullValid => {
                disposeValidators();
                this._updateRowAndPageIndices();
                // eslint-disable-next-line default-case
                switch (this.getEditMode()) {
                  case EDIT_MODE_CELL:
                    if (!isFullValid) {
                      this._focusEditingCell();
                    }
                    break;
                  case EDIT_MODE_BATCH:
                    if (!isFullValid) {
                      this._resetEditRowKey();
                      this._resetEditColumnName();
                      this.getController('data').updateItems();
                    }
                    break;
                }
                result.resolve(!isFullValid);
              });
            });
          }
          return result.promise ? result.promise() : result;
        },
        /**
        * @param rowIndex Row index
        * @param columnIndex Column index
        * @param item Data item
        * @returns A deferred object that resolves to a boolean or just a boolean to determine whether to cancel cell editing
        */
        _beforeEditCell(rowIndex, columnIndex, item) {
          const result = this.callBase(rowIndex, columnIndex, item);
          if (this.getEditMode() === EDIT_MODE_CELL) {
            const $cell = this._rowsView._getCellElement(rowIndex, columnIndex);
            const validator = $cell && $cell.data('dxValidator');
            const rowOptions = $cell && $cell.closest('.dx-row').data('options');
            const value = validator && validator.option('adapter').getValue();
            if (validator && cellValueShouldBeValidated(value, rowOptions)) {
              const validatingController = this.getController('validating');
              // @ts-expect-error
              const deferred = new _deferred.Deferred();
              (0, _deferred.when)(validatingController.validateCell(validator), result).done((validationResult, result) => {
                deferred.resolve(validationResult.status === VALIDATION_STATUS.valid && result);
              });
              return deferred.promise();
            }
            if (!validator) {
              return result;
            }
          }
          return false;
        },
        _afterSaveEditData(cancel) {
          let $firstErrorRow;
          const isCellEditMode = this.getEditMode() === EDIT_MODE_CELL;
          (0, _iterator.each)(this.getChanges(), (_, change) => {
            const $errorRow = this._showErrorRow(change);
            $firstErrorRow = $firstErrorRow || $errorRow;
          });
          if ($firstErrorRow) {
            const scrollable = this._rowsView.getScrollable();
            if (scrollable) {
              scrollable.update();
              scrollable.scrollToElement($firstErrorRow);
            }
          }
          if (cancel && isCellEditMode && this._needUpdateRow()) {
            const editRowIndex = this.getEditRowIndex();
            this._dataController.updateItems({
              changeType: 'update',
              rowIndices: [editRowIndex]
            });
            this._focusEditingCell();
          } else if (!cancel) {
            let shouldResetValidationState = true;
            if (isCellEditMode) {
              const columns = this.getController('columns').getColumns();
              const columnsWithValidatingEditors = columns.filter(col => {
                var _a;
                return col.showEditorAlways && ((_a = col.validationRules) === null || _a === void 0 ? void 0 : _a.length) > 0;
              }).length > 0;
              shouldResetValidationState = !columnsWithValidatingEditors;
            }
            if (shouldResetValidationState) {
              this.getController('validating').initValidationState();
            }
          }
        },
        _handleDataChanged(args) {
          const validationState = this.getController('validating')._validationState;
          if (this.option('scrolling.mode') === 'standard') {
            this.resetRowAndPageIndices();
          }
          if (args.changeType === 'prepend') {
            (0, _iterator.each)(validationState, (_, validationData) => {
              validationData.rowIndex += args.items.length;
            });
          }
          this.callBase(args);
        },
        resetRowAndPageIndices() {
          const validationState = this.getController('validating')._validationState;
          (0, _iterator.each)(validationState, (_, validationData) => {
            if (validationData.pageIndex !== this._pageIndex) {
              delete validationData.pageIndex;
              delete validationData.rowIndex;
            }
          });
        },
        _beforeCancelEditData() {
          this.getController('validating').initValidationState();
          this.callBase();
        },
        _showErrorRow(change) {
          let $popupContent;
          const errorHandling = this.getController('errorHandling');
          const items = this.getController('data').items();
          const rowIndex = this.getIndexByKey(change.key, items);
          const validationData = this.getController('validating')._getValidationData(change.key);
          if (!(validationData === null || validationData === void 0 ? void 0 : validationData.isValid) && (validationData === null || validationData === void 0 ? void 0 : validationData.errorText) && rowIndex >= 0) {
            $popupContent = this.getPopupContent();
            return errorHandling && errorHandling.renderErrorRow(validationData === null || validationData === void 0 ? void 0 : validationData.errorText, rowIndex, $popupContent);
          }
        },
        updateFieldValue(e) {
          const validatingController = this.getController('validating');
          // @ts-expect-error
          const deferred = new _deferred.Deferred();
          validatingController.removeCellValidationResult({
            change: this.getChangeByKey(e.key),
            columnIndex: e.column.index
          });
          this.callBase.apply(this, arguments).done(() => {
            const currentValidator = validatingController.getCellValidator({
              rowKey: e.key,
              columnIndex: e.column.index
            });
            (0, _deferred.when)(currentValidator && validatingController.validateCell(currentValidator)).done(validationResult => {
              this.getController('editorFactory').refocus();
              deferred.resolve(validationResult);
            });
          });
          return deferred.promise();
        },
        highlightDataCell($cell, parameters) {
          this.callBase.apply(this, arguments);
          const validatingController = this.getController('validating');
          validatingController.setCellValidationStatus(parameters);
          const isEditableCell = !!parameters.setValue;
          const cellModified = this.isCellModified(parameters);
          const isValidated = (0, _type.isDefined)(parameters.validationStatus);
          const needValidation = cellModified && parameters.column.setCellValue || isEditableCell && !cellModified && !(parameters.row.isNewRow || !isValidated);
          if (needValidation) {
            const validator = $cell.data('dxValidator');
            if (validator) {
              (0, _deferred.when)(this.getController('validating').validateCell(validator)).done(() => {
                validatingController.setCellValidationStatus(parameters);
              });
            }
          }
        },
        getChangeByKey(key) {
          const changes = this.getChanges();
          return changes[_m_utils.default.getIndexByKey(key, changes)];
        },
        isCellModified(parameters) {
          const cellModified = this.callBase(parameters);
          const change = this.getChangeByKey(parameters.key);
          const isCellInvalid = !!parameters.row && this.getController('validating').isInvalidCell({
            rowKey: parameters.key,
            columnIndex: parameters.column.index
          });
          return cellModified || this.getController('validating')._rowIsValidated(change) && isCellInvalid;
        }
      },
      editorFactory: function () {
        const getWidthOfVisibleCells = function (that, element) {
          const rowIndex = (0, _renderer.default)(element).closest('tr').index();
          const $cellElements = (0, _renderer.default)(that._rowsView.getRowElement(rowIndex)).first().children().filter(':not(.dx-hidden-cell)');
          return that._rowsView._getWidths($cellElements).reduce((w1, w2) => w1 + w2, 0);
        };
        const getBoundaryNonFixedColumnsInfo = function (fixedColumns) {
          let firstNonFixedColumnIndex;
          let lastNonFixedColumnIndex;
          // eslint-disable-next-line array-callback-return
          fixedColumns.some((column, index) => {
            if (column.command === COMMAND_TRANSPARENT) {
              firstNonFixedColumnIndex = index === 0 ? -1 : index;
              lastNonFixedColumnIndex = index === fixedColumns.length - 1 ? -1 : index + column.colspan - 1;
              return true;
            }
            return undefined;
          });
          return {
            startColumnIndex: firstNonFixedColumnIndex,
            endColumnIndex: lastNonFixedColumnIndex
          };
        };
        return {
          _showRevertButton($container) {
            var _a;
            let $tooltipElement = (_a = this._revertTooltip) === null || _a === void 0 ? void 0 : _a.$element();
            if (!$container || !$container.length) {
              $tooltipElement === null || $tooltipElement === void 0 ? void 0 : $tooltipElement.remove();
              this._revertTooltip = undefined;
              return;
            }
            // do not render tooltip if it is already rendered
            if ($container.find($tooltipElement).length) {
              return;
            }
            const $overlayContainer = $container.closest(".".concat(this.addWidgetPrefix(CONTENT_CLASS))).parent();
            const revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
            $tooltipElement === null || $tooltipElement === void 0 ? void 0 : $tooltipElement.remove();
            $tooltipElement = (0, _renderer.default)('<div>').addClass(revertTooltipClass).appendTo($container);
            const tooltipOptions = {
              animation: null,
              visible: true,
              width: 'auto',
              height: 'auto',
              shading: false,
              container: $overlayContainer,
              propagateOutsideClick: true,
              hideOnOutsideClick: false,
              wrapperAttr: {
                class: revertTooltipClass
              },
              contentTemplate: () => {
                const $buttonElement = (0, _renderer.default)('<div>').addClass(REVERT_BUTTON_CLASS);
                const buttonOptions = {
                  icon: 'revert',
                  hint: this.option('editing.texts.validationCancelChanges'),
                  elementAttr: {
                    id: REVERT_BUTTON_ID,
                    'aria-label': _message.default.format('dxDataGrid-ariaRevertButton')
                  },
                  onClick: () => {
                    this._editingController.cancelEditData();
                  }
                };
                // @ts-expect-error
                return new _button.default($buttonElement, buttonOptions).$element();
              },
              position: {
                my: 'left top',
                at: 'right top',
                offset: '1 0',
                collision: 'flip',
                boundaryOffset: '0 0',
                boundary: this._rowsView.element(),
                of: $container
              },
              onPositioned: this._positionedHandler.bind(this)
            };
            this._revertTooltip = new _ui.default($tooltipElement, tooltipOptions);
          },
          _hideFixedGroupCell($cell, overlayOptions) {
            let $nextFixedRowElement;
            let $groupCellElement;
            const isFixedColumns = this._rowsView.isFixedColumns();
            const isFormOrPopupEditMode = this._editingController.isFormOrPopupEditMode();
            if (isFixedColumns && !isFormOrPopupEditMode) {
              const nextRowOptions = $cell.closest('.dx-row').next().data('options');
              if (nextRowOptions && nextRowOptions.rowType === 'group') {
                $nextFixedRowElement = (0, _renderer.default)(this._rowsView.getRowElement(nextRowOptions.rowIndex)).last();
                $groupCellElement = $nextFixedRowElement.find(".".concat(GROUP_CELL_CLASS));
                if ($groupCellElement.length && $groupCellElement.get(0).style.visibility !== 'hidden') {
                  $groupCellElement.css('visibility', 'hidden');
                  overlayOptions.onDisposing = function () {
                    $groupCellElement.css('visibility', '');
                  };
                }
              }
            }
          },
          _positionedHandler(e, isOverlayVisible) {
            if (!e.component.__skipPositionProcessing) {
              const isRevertButton = (0, _renderer.default)(e.element).hasClass(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS));
              const needRepaint = !isRevertButton && this._rowsView.updateFreeSpaceRowHeight();
              const normalizedPosition = this._normalizeValidationMessagePositionAndMaxWidth(e, isRevertButton, isOverlayVisible);
              e.component.__skipPositionProcessing = !!(needRepaint || normalizedPosition);
              if (normalizedPosition) {
                e.component.option(normalizedPosition);
              } else if (needRepaint) {
                e.component.repaint();
              }
            }
          },
          _showValidationMessage($cell, messages, alignment) {
            var _a;
            const editorPopup = $cell.find('.dx-dropdowneditor-overlay').data('dxPopup');
            const isOverlayVisible = editorPopup && editorPopup.option('visible');
            const myPosition = isOverlayVisible ? 'top right' : "top ".concat(alignment);
            const atPosition = isOverlayVisible ? 'top left' : "bottom ".concat(alignment);
            // TODO: Don't forget to remove this code
            //  after refactoring the fixed table position (or implementation).
            const hasFixedColumns = ((_a = this._columnsController.getFixedColumns()) === null || _a === void 0 ? void 0 : _a.length) > 0;
            const $overlayContainer = hasFixedColumns ? this.getView('rowsView').element() : $cell.closest(".".concat(this.addWidgetPrefix(CONTENT_CLASS)));
            let errorMessageText = '';
            messages && messages.forEach(message => {
              errorMessageText += (errorMessageText.length ? '<br/>' : '') + (0, _string.encodeHtml)(message);
            });
            const invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
            this._rowsView.element().find(".".concat(invalidMessageClass)).remove();
            const $overlayElement = (0, _renderer.default)('<div>').addClass(INVALID_MESSAGE_CLASS).addClass(INVALID_MESSAGE_ALWAYS_CLASS).addClass(invalidMessageClass).html(errorMessageText).appendTo($cell);
            const overlayOptions = {
              container: $overlayContainer,
              shading: false,
              width: 'auto',
              height: 'auto',
              visible: true,
              animation: false,
              propagateOutsideClick: true,
              hideOnOutsideClick: false,
              wrapperAttr: {
                id: INVALID_MESSAGE_ID,
                class: "".concat(INVALID_MESSAGE_CLASS, " ").concat(INVALID_MESSAGE_ALWAYS_CLASS, " ").concat(invalidMessageClass)
              },
              position: {
                collision: 'flip',
                boundary: this._rowsView.element(),
                boundaryOffset: '0 0',
                offset: {
                  x: 0,
                  // Firefox consider the top row/cell border when calculating a cell offset.
                  y: !isOverlayVisible && _browser.default.mozilla ? -1 : 0
                },
                my: myPosition,
                at: atPosition,
                of: $cell
              },
              onPositioned: e => {
                this._positionedHandler(e, isOverlayVisible);
                this._shiftValidationMessageIfNeed(e.component.$content(), $cell);
              }
            };
            this._hideFixedGroupCell($cell, overlayOptions);
            // eslint-disable-next-line no-new
            new _ui.default($overlayElement, overlayOptions);
          },
          _hideValidationMessage() {
            var _a;
            const validationMessages = (_a = this._rowsView.element()) === null || _a === void 0 ? void 0 : _a.find(this._getValidationMessagesSelector());
            validationMessages === null || validationMessages === void 0 ? void 0 : validationMessages.remove();
          },
          _normalizeValidationMessagePositionAndMaxWidth(options, isRevertButton, isOverlayVisible) {
            const fixedColumns = this._columnsController.getFixedColumns();
            if (!fixedColumns || !fixedColumns.length) {
              return;
            }
            let position;
            const visibleTableWidth = !isRevertButton && getWidthOfVisibleCells(this, options.element);
            const $overlayContentElement = options.component.$content();
            const validationMessageWidth = (0, _size.getOuterWidth)($overlayContentElement, true);
            const needMaxWidth = !isRevertButton && validationMessageWidth > visibleTableWidth;
            const columnIndex = this._rowsView.getCellIndex((0, _renderer.default)(options.element).closest('td'));
            const boundaryNonFixedColumnsInfo = getBoundaryNonFixedColumnsInfo(fixedColumns);
            if (!isRevertButton && (columnIndex === boundaryNonFixedColumnsInfo.startColumnIndex || needMaxWidth)) {
              position = {
                collision: 'none flip',
                my: 'top left',
                at: isOverlayVisible ? 'top right' : 'bottom left'
              };
            } else if (columnIndex === boundaryNonFixedColumnsInfo.endColumnIndex) {
              position = {
                collision: 'none flip',
                my: 'top right',
                at: isRevertButton || isOverlayVisible ? 'top left' : 'bottom right'
              };
              if (isRevertButton) {
                position.offset = '-1 0';
              }
            }
            return position && {
              position,
              maxWidth: needMaxWidth ? visibleTableWidth - 2 : undefined
            };
          },
          _shiftValidationMessageIfNeed($content, $cell) {
            const $revertContent = this._revertTooltip && this._revertTooltip.$content();
            if (!$revertContent) return;
            const contentOffset = $content.offset();
            const revertContentOffset = $revertContent.offset();
            if (contentOffset.top === revertContentOffset.top && contentOffset.left + (0, _size.getWidth)($content) > revertContentOffset.left) {
              const left = (0, _size.getWidth)($revertContent) + PADDING_BETWEEN_TOOLTIPS;
              $content.css('left', revertContentOffset.left < $cell.offset().left ? -left : left);
            }
          },
          _getRevertTooltipsSelector() {
            const revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
            return ".dx-editor-cell .".concat(revertTooltipClass);
          },
          _getValidationMessagesSelector() {
            const invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
            return ".dx-editor-cell .".concat(invalidMessageClass, ", .dx-cell-modified .").concat(invalidMessageClass);
          },
          init() {
            this.callBase();
            this._editingController = this.getController('editing');
            this._columnsController = this.getController('columns');
            this._rowsView = this.getView('rowsView');
          },
          loseFocus(skipValidator) {
            if (!skipValidator) {
              this.getController('validating').setValidator(null);
            }
            this.callBase();
          },
          updateCellState($element, validationResult, isHideBorder) {
            var _a;
            const $focus = $element === null || $element === void 0 ? void 0 : $element.closest(this._getFocusCellSelector());
            const $cell = ($focus === null || $focus === void 0 ? void 0 : $focus.is('td')) ? $focus : null;
            const rowOptions = $focus === null || $focus === void 0 ? void 0 : $focus.closest('.dx-row').data('options');
            const change = rowOptions ? this.getController('editing').getChangeByKey(rowOptions.key) : null;
            const column = $cell && this.getController('columns').getVisibleColumns()[$cell.index()];
            const isCellModified = ((_a = change === null || change === void 0 ? void 0 : change.data) === null || _a === void 0 ? void 0 : _a[column === null || column === void 0 ? void 0 : column.name]) !== undefined && !this._editingController.isSaving();
            const validationDescriptionValues = [];
            if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
              if ((validationResult === null || validationResult === void 0 ? void 0 : validationResult.status) === VALIDATION_STATUS.invalid || isCellModified) {
                this._showRevertButton($focus);
                validationDescriptionValues.push(REVERT_BUTTON_ID);
              } else {
                this._revertTooltip && this._revertTooltip.$element().remove();
              }
            }
            const showValidationMessage = validationResult && validationResult.status === VALIDATION_STATUS.invalid;
            if (showValidationMessage && $cell && column && validationResult && validationResult.brokenRules) {
              const errorMessages = [];
              validationResult.brokenRules.forEach(rule => {
                if (rule.message) {
                  errorMessages.push(rule.message);
                }
              });
              if (errorMessages.length) {
                this._showValidationMessage($focus, errorMessages, column.alignment || 'left');
                validationDescriptionValues.push(INVALID_MESSAGE_ID);
              }
            }
            this._updateAriaValidationAttributes($focus, validationDescriptionValues);
            !isHideBorder && this._rowsView.element() && this._rowsView.updateFreeSpaceRowHeight();
          },
          _updateAriaValidationAttributes($focus, inputDescriptionValues) {
            if (inputDescriptionValues.length === 0) {
              return;
            }
            const editMode = this._editingController.getEditMode();
            const shouldSetValidationAriaAttributes = [EDIT_MODE_CELL, EDIT_MODE_BATCH, EDIT_MODE_ROW].includes(editMode);
            if (shouldSetValidationAriaAttributes) {
              const $focusElement = this._getCurrentFocusElement($focus);
              $focusElement.attr('aria-labelledby', inputDescriptionValues.join(' '));
              $focusElement.attr('aria-invalid', true);
            }
          },
          _getCurrentFocusElement($focus) {
            if (this._editingController.isEditing()) {
              return $focus.find(_const.EDITORS_INPUT_SELECTOR).first();
            }
            return $focus;
          },
          focus($element, isHideBorder) {
            if (!arguments.length) return this.callBase();
            this._hideValidationMessage();
            if (($element === null || $element === void 0 ? void 0 : $element.hasClass('dx-row')) || ($element === null || $element === void 0 ? void 0 : $element.hasClass('dx-master-detail-cell'))) {
              return this.callBase($element, isHideBorder);
            }
            const $focus = $element === null || $element === void 0 ? void 0 : $element.closest(this._getFocusCellSelector());
            const {
              callBase
            } = this;
            const validator = $focus && ($focus.data('dxValidator') || $element.find(".".concat(this.addWidgetPrefix(VALIDATOR_CLASS))).eq(0).data('dxValidator'));
            const rowOptions = $focus && $focus.closest('.dx-row').data('options');
            const editingController = this.getController('editing');
            const change = rowOptions ? editingController.getChangeByKey(rowOptions.key) : null;
            const validatingController = this.getController('validating');
            let validationResult;
            if (validator) {
              validatingController.setValidator(validator);
              const value = validator.option('adapter').getValue();
              if (cellValueShouldBeValidated(value, rowOptions) || validatingController._rowIsValidated(change)) {
                editingController.waitForDeferredOperations().done(() => {
                  (0, _deferred.when)(validatingController.validateCell(validator)).done(result => {
                    validationResult = result;
                    const {
                      column
                    } = validationResult.validator.option('dataGetter')();
                    if (change && column && !validatingController.isCurrentValidatorProcessing({
                      rowKey: change.key,
                      columnIndex: column.index
                    })) {
                      return;
                    }
                    if (!(0, _themes.isFluent)((0, _themes.current)()) && validationResult.status === VALIDATION_STATUS.invalid) {
                      isHideBorder = true;
                    }
                    this.updateCellState($element, validationResult, isHideBorder);
                    callBase.call(this, $element, isHideBorder);
                  });
                });
                return this.callBase($element, isHideBorder);
              }
            }
            this.updateCellState($element, validationResult, isHideBorder);
            return this.callBase($element, isHideBorder);
          },
          getEditorInstance($container) {
            const $editor = $container.find('.dx-texteditor').eq(0);
            return _m_utils.default.getWidgetInstance($editor);
          }
        };
      }(),
      data: {
        _getValidationStatus(validationResult) {
          const validationStatus = validationResultIsValid(validationResult) ? validationResult.status : validationResult;
          return validationStatus || VALIDATION_STATUS.valid;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
          var _a, _b;
          const cell = (_a = oldRow.cells) === null || _a === void 0 ? void 0 : _a[columnIndex];
          const oldValidationStatus = this._getValidationStatus({
            status: cell === null || cell === void 0 ? void 0 : cell.validationStatus
          });
          const validatingController = this.getController('validating');
          const validationResult = validatingController.getCellValidationResult({
            rowKey: oldRow.key,
            columnIndex
          });
          const validationData = validatingController._getValidationData(oldRow.key);
          const newValidationStatus = this._getValidationStatus(validationResult);
          const rowIsModified = JSON.stringify(newRow.modifiedValues) !== JSON.stringify(oldRow.modifiedValues);
          const validationStatusChanged = oldValidationStatus !== newValidationStatus && rowIsModified;
          const cellIsMarkedAsInvalid = (0, _renderer.default)(cell === null || cell === void 0 ? void 0 : cell.cellElement).hasClass(this.addWidgetPrefix(INVALIDATE_CLASS));
          const hasValidationRules = (_b = cell === null || cell === void 0 ? void 0 : cell.column.validationRules) === null || _b === void 0 ? void 0 : _b.length;
          const rowEditStateChanged = oldRow.isEditing !== newRow.isEditing && hasValidationRules;
          const cellValidationStateChanged = validationStatusChanged || validationData.isValid && cellIsMarkedAsInvalid;
          if (rowEditStateChanged || cellValidationStateChanged) {
            return true;
          }
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        updateFreeSpaceRowHeight($table) {
          const that = this;
          let $rowElements;
          let $freeSpaceRowElement;
          let $freeSpaceRowElements;
          const $element = that.element();
          const $tooltipContent = $element && $element.find(".".concat(that.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS), " .dx-overlay-content"));
          that.callBase($table);
          if ($tooltipContent && $tooltipContent.length) {
            $rowElements = that._getRowElements();
            $freeSpaceRowElements = that._getFreeSpaceRowElements($table);
            $freeSpaceRowElement = $freeSpaceRowElements.first();
            if ($freeSpaceRowElement && $rowElements.length === 1 && (!$freeSpaceRowElement.is(':visible') || (0, _size.getOuterHeight)($tooltipContent) > (0, _size.getOuterHeight)($freeSpaceRowElement))) {
              $freeSpaceRowElements.show();
              (0, _size.setHeight)($freeSpaceRowElements, (0, _size.getOuterHeight)($tooltipContent));
              return true;
            }
          }
          return undefined;
        },
        _formItemPrepared(cellOptions, $container) {
          this.callBase.apply(this, arguments);
          (0, _common.deferUpdate)(() => {
            const $editor = $container.find('.dx-widget').first();
            const isEditorDisposed = $editor.length && !$editor.children().length;
            // T736360
            if (!isEditorDisposed) {
              this.getController('validating').createValidator(cellOptions, $editor);
            }
          });
        },
        _cellPrepared($cell, parameters) {
          if (!this.getController('editing').isFormOrPopupEditMode()) {
            this.getController('validating').createValidator(parameters, $cell);
          }
          this.callBase.apply(this, arguments);
        },
        _restoreErrorRow(contentTable) {
          const editingController = this.getController('editing');
          editingController && editingController.hasChanges() && this._getRowElements(contentTable).each((_, item) => {
            const rowOptions = (0, _renderer.default)(item).data('options');
            if (rowOptions) {
              // @ts-expect-error
              const change = editingController.getChangeByKey(rowOptions.key);
              change && editingController._showErrorRow(change);
            }
          });
        }
      }
    }
  }
};
exports.validatingModule = validatingModule;