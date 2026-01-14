/**
* DevExtreme (cjs/__internal/ui/gantt/ui.gantt.dialogs.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GanttDialog = void 0;
require("../../../ui/tag_box");
require("../../../ui/radio_group");
require("../../../ui/list_light");
require("../../ui/list/modules/deleting");
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _form = _interopRequireDefault(require("../../ui/form/form"));
var _m_popup = _interopRequireDefault(require("../../ui/popup/m_popup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file,@typescript-eslint/explicit-module-boundary-types */

class DialogInfoBase {
  constructor(parameters, applyAction, hideAction, editingOptions, owner) {
    this._parameters = parameters;
    this._applyAction = applyAction;
    this._hideAction = hideAction;
    this._editingOptions = editingOptions;
    this._owner = owner;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFormItems() {
    return {};
  }
  _getFormCssClass() {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFormData() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._parameters;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateParameters(_formData) {}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getOkToolbarItem() {
    return this._getToolbarItem('OK', this._applyAction);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCancelToolbarItem() {
    return this._getToolbarItem('Cancel', this._hideAction);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getYesToolbarItem() {
    return this._getToolbarItem('Yes', this._applyAction);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getNoToolbarItem() {
    return this._getToolbarItem('No', this._hideAction);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getToolbarItem(localizationText, action) {
    return {
      widget: 'dxButton',
      toolbar: 'bottom',
      options: {
        text: _message.default.format(localizationText),
        onClick: action
      }
    };
  }
  getTitle() {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getToolbarItems() {
    return this._editingOptions.enabled ? [this._getOkToolbarItem(), this._getCancelToolbarItem()] : [this._getCancelToolbarItem()];
  }
  getMaxWidth() {
    return 400;
  }
  getHeight() {
    return 'auto';
  }
  getContentTemplate() {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return content => {
      // @ts-expect-error ts-error
      this._form = new _form.default(content, {
        formData: this._getFormData(),
        items: this._getFormItems(),
        elementAttr: {
          class: this._getFormCssClass()
        },
        rtlEnabled: false
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return content;
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getResult() {
    const formData = this.getFormData();
    this._updateParameters(formData);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._parameters;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getFormData() {
    var _this$_form;
    const formData = (_this$_form = this._form) === null || _this$_form === void 0 ? void 0 : _this$_form.option('formData');
    return formData;
  }
  isValidated() {
    return true;
  }
  shouldHidePopup() {
    return true;
  }
}
class TaskEditDialogInfo extends DialogInfoBase {
  getTitle() {
    return _message.default.format('dxGantt-dialogTaskDetailsTitle');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFormItems() {
    const readOnly = !this._editingOptions.enabled || !this._editingOptions.allowTaskUpdating;
    const readOnlyRange = readOnly || !this._parameters.enableRangeEdit;
    return [{
      dataField: 'title',
      editorType: 'dxTextBox',
      label: {
        text: _message.default.format('dxGantt-dialogTitle')
      },
      editorOptions: {
        readOnly: readOnly || this._isReadOnlyField('title')
      },
      visible: !this._isHiddenField('title')
    }, {
      dataField: 'start',
      editorType: 'dxDateBox',
      label: {
        text: _message.default.format('dxGantt-dialogStartTitle')
      },
      editorOptions: {
        type: 'datetime',
        width: '100%',
        readOnly: readOnlyRange || this._isReadOnlyField('start')
      },
      visible: !this._isHiddenField('start'),
      validationRules: [{
        type: 'required',
        message: _message.default.format('validation-required-formatted',
        // @ts-expect-error ts-error
        _message.default.format('dxGantt-dialogStartTitle'))
      }, {
        type: 'custom',
        validationCallback: e => {
          if (this._parameters.isValidationRequired) {
            const correctDateRange = this._parameters.getCorrectDateRange(this._parameters.id, e.value, this._parameters.end);
            if (correctDateRange.start.getTime() !== e.value.getTime()) {
              e.rule.message = this._getValidationMessage(true, correctDateRange.start);
              return false;
            }
          }
          return true;
        }
      }]
    }, {
      dataField: 'end',
      editorType: 'dxDateBox',
      label: {
        text: _message.default.format('dxGantt-dialogEndTitle')
      },
      editorOptions: {
        type: 'datetime',
        width: '100%',
        readOnly: readOnlyRange || this._isReadOnlyField('end')
      },
      visible: !this._isHiddenField('end'),
      validationRules: [{
        type: 'required',
        message: _message.default.format('validation-required-formatted',
        // @ts-expect-error ts-error
        _message.default.format('dxGantt-dialogEndTitle'))
      }, {
        type: 'custom',
        validationCallback: e => {
          if (this._parameters.isValidationRequired) {
            const correctDateRange = this._parameters.getCorrectDateRange(this._parameters.id, this._parameters.start, e.value);
            if (correctDateRange.end.getTime() !== e.value.getTime()) {
              e.rule.message = this._getValidationMessage(false, correctDateRange.end);
              return false;
            }
          }
          return true;
        }
      }]
    }, {
      dataField: 'progress',
      editorType: 'dxNumberBox',
      label: {
        text: _message.default.format('dxGantt-dialogProgressTitle')
      },
      editorOptions: {
        showSpinButtons: true,
        min: 0,
        max: 1,
        format: '#0%',
        step: 0.01,
        readOnly: readOnlyRange || this._isReadOnlyField('progress')
      },
      visible: !this._isHiddenField('progress')
    }, {
      dataField: 'assigned.items',
      editorType: 'dxTagBox',
      label: {
        text: _message.default.format('dxGantt-dialogResourcesTitle')
      },
      editorOptions: {
        readOnly: readOnly || !this._editingOptions.allowTaskResourceUpdating,
        dataSource: this._parameters.resources.items,
        displayExpr: 'text',
        buttons: [{
          name: 'editResources',
          location: 'after',
          options: {
            disabled: !this._editingOptions.allowResourceAdding && !this._editingOptions.allowResourceDeleting,
            text: '...',
            hint: _message.default.format('dxGantt-dialogEditResourceListHint'),
            onClick: () => {
              const formData = this.getFormData();
              const showTaskEditDialogCallback = () => {
                this._parameters.showTaskEditDialogCommand.execute();
                this._restoreFormData(formData);
              };
              this._parameters.showResourcesDialogCommand.execute(showTaskEditDialogCallback);
            }
          }
        }]
      }
    }];
  }
  _restoreFormData(formData) {
    const newForm = this._owner._dialogInfo._form;
    const titleEdit = newForm.getEditor('title');
    const assignedEdit = newForm.getEditor('assigned.items');
    const startEdit = newForm.getEditor('start');
    const endEdit = newForm.getEditor('end');
    const progressEdit = newForm.getEditor('progress');
    titleEdit.option('value', formData.title);
    assignedEdit.option('value', formData.assigned.items);
    startEdit.option('value', formData.start);
    endEdit.option('value', formData.end);
    progressEdit.option('value', formData.progress);
  }
  _getValidationMessage(isStartDependencies, correctDate) {
    if (isStartDependencies) {
      return _message.default.format('dxGantt-dialogStartDateValidation',
      // @ts-expect-error ts-error
      this._getFormattedDateText(correctDate));
    }
    return _message.default.format('dxGantt-dialogEndDateValidation',
    // @ts-expect-error ts-error
    this._getFormattedDateText(correctDate));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFormattedDateText(date) {
    return date ? _date.default.format(date, 'shortDateShortTime') : '';
  }
  _isReadOnlyField(field) {
    return this._parameters.readOnlyFields.indexOf(field) > -1;
  }
  _isHiddenField(field) {
    return this._parameters.hiddenFields.indexOf(field) > -1;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFormData() {
    const data = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const field in this._parameters) {
      data[field] = field === 'progress' ? this._parameters[field] / 100 : this._parameters[field];
    }
    return data;
  }
  _updateParameters(formData) {
    this._parameters.title = formData.title;
    this._parameters.start = formData.start;
    this._parameters.end = formData.end;
    this._parameters.progress = Math.round(formData.progress * 100);
    this._parameters.assigned = formData.assigned;
  }
  isValidated() {
    var _this$_form2;
    const validationResult = (_this$_form2 = this._form) === null || _this$_form2 === void 0 ? void 0 : _this$_form2.validate();
    // @ts-expect-error ts-error
    return validationResult === null || validationResult === void 0 ? void 0 : validationResult.isValid;
  }
}
class ResourcesEditDialogInfo extends DialogInfoBase {
  getTitle() {
    return _message.default.format('dxGantt-dialogResourceManagerTitle');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFormItems() {
    return [{
      label: {
        visible: false
      },
      dataField: 'resources.items',
      editorType: 'dxList',
      editorOptions: {
        allowItemDeleting: this._editingOptions.enabled && this._editingOptions.allowResourceDeleting,
        itemDeleteMode: 'static',
        selectionMode: 'none',
        items: this._parameters.resources.items,
        height: 250,
        noDataText: _message.default.format('dxGantt-dialogEditNoResources'),
        onInitialized: e => {
          // @ts-expect-error ts-error
          this.list = e.component;
        },
        onItemDeleted: e => {
          this._parameters.resources.remove(e.itemData);
        }
      }
    }, {
      label: {
        visible: false
      },
      editorType: 'dxTextBox',
      editorOptions: {
        readOnly: !this._editingOptions.enabled || !this._editingOptions.allowResourceAdding,
        onInitialized: e => {
          // @ts-expect-error ts-error
          this.textBox = e.component;
        },
        onInput: e => {
          const addButton = e.component.getButton('addResource');
          const resourceName = e.component.option('text');
          addButton.option('disabled', resourceName.length === 0);
        },
        buttons: [{
          name: 'addResource',
          location: 'after',
          options: {
            text: _message.default.format('dxGantt-dialogButtonAdd'),
            disabled: true,
            onClick: e => {
              const newItem = this._parameters.resources.createItem();
              // @ts-expect-error ts-error
              newItem.text = this.textBox.option('text');
              this._parameters.resources.add(newItem);
              // @ts-expect-error ts-error
              this.list.option('items', this._parameters.resources.items);
              // @ts-expect-error ts-error
              this.list.scrollToItem(newItem);
              // @ts-expect-error ts-error
              this.textBox.clear();
              e.component.option('disabled', true);
            }
          }
        }]
      }
    }];
  }
  shouldHidePopup() {
    return false;
  }
}
class ConfirmDialogInfo extends DialogInfoBase {
  getContentTemplate() {
    return () => this._getConfirmMessage();
  }
  _getConfirmMessage() {
    switch (this._parameters.type) {
      case 0:
        return _message.default.format('dxGantt-dialogTaskDeleteConfirmation');
      case 1:
        return _message.default.format('dxGantt-dialogDependencyDeleteConfirmation');
      case 2:
        return _message.default.format('dxGantt-dialogResourcesDeleteConfirmation',
        // @ts-expect-error ts-error
        this._parameters.message);
      default:
        return '';
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getToolbarItems() {
    return [this._getYesToolbarItem(), this._getNoToolbarItem()];
  }
}
class ConstraintViolationDialogInfo extends DialogInfoBase {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFormItems() {
    const {
      hasCriticalErrors
    } = this._parameters;
    const severalErrors = this._parameters.errorsCount > 1;
    const items = [];
    const deleteMessage = severalErrors ? 'dxGantt-dialogDeleteDependenciesMessage' : 'dxGantt-dialogDeleteDependencyMessage';
    const moveMessage = severalErrors ? 'dxGantt-dialogMoveTaskAndKeepDependenciesMessage' : 'dxGantt-dialogMoveTaskAndKeepDependencyMessage';
    let titleMessage = '';
    if (hasCriticalErrors) {
      titleMessage = severalErrors ? 'dxGantt-dialogConstraintCriticalViolationSeveralTasksMessage' : 'dxGantt-dialogConstraintCriticalViolationMessage';
    } else {
      titleMessage = severalErrors ? 'dxGantt-dialogConstraintViolationSeveralTasksMessage' : 'dxGantt-dialogConstraintViolationMessage';
    }
    items.push({
      text: _message.default.format('dxGantt-dialogCancelOperationMessage'),
      value: 0
    });
    items.push({
      text: _message.default.format(deleteMessage),
      value: 1
    });
    if (!hasCriticalErrors) {
      items.push({
        text: _message.default.format(moveMessage),
        value: 2
      });
    }
    return [{
      template: _message.default.format(titleMessage)
    }, {
      cssClass: 'dx-cv-dialog-row',
      dataField: 'option',
      label: {
        visible: false
      },
      editorType: 'dxRadioGroup',
      editorOptions: {
        items,
        valueExpr: 'value',
        value: 0
      }
    }];
  }
  _getFormCssClass() {
    return 'dx-cv-dialog';
  }
  _updateParameters(formData) {
    this._parameters.option = formData.option;
  }
}
class GanttDialog {
  constructor(owner, $element) {
    this._popupInstance = owner._createComponent($element, _m_popup.default);
    this.infoMap = {
      TaskEdit: TaskEditDialogInfo,
      Resources: ResourcesEditDialogInfo,
      Confirmation: ConfirmDialogInfo,
      ConstraintViolation: ConstraintViolationDialogInfo
    };
  }
  _apply() {
    if (this._dialogInfo.isValidated()) {
      const result = this._dialogInfo.getResult();
      this._callback(result);
      this.hide();
    }
  }
  show(name, parameters, callback, afterClosing, editingOptions) {
    var _this$_popupInstance, _this$_popupInstance2;
    this._callback = callback;
    this._afterClosing = afterClosing;
    if (!this.infoMap[name]) {
      return;
    }
    const isRefresh = ((_this$_popupInstance = this._popupInstance) === null || _this$_popupInstance === void 0 ? void 0 : _this$_popupInstance._isVisible()) && this._dialogInfo && this._dialogInfo instanceof this.infoMap[name];
    this._dialogInfo = new this.infoMap[name](parameters, this._apply.bind(this), this.hide.bind(this), editingOptions, this);
    (_this$_popupInstance2 = this._popupInstance) === null || _this$_popupInstance2 === void 0 || _this$_popupInstance2.option({
      showTitle: !!this._dialogInfo.getTitle(),
      title: this._dialogInfo.getTitle(),
      toolbarItems: this._dialogInfo.getToolbarItems(),
      maxWidth: this._dialogInfo.getMaxWidth(),
      height: this._dialogInfo.getHeight(),
      contentTemplate: this._dialogInfo.getContentTemplate()
    });
    if (this._afterClosing) {
      var _this$_popupInstance3;
      (_this$_popupInstance3 = this._popupInstance) === null || _this$_popupInstance3 === void 0 || _this$_popupInstance3.option('onHidden', this._afterClosing);
    }
    if (!isRefresh) {
      var _this$_popupInstance4;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_popupInstance4 = this._popupInstance) === null || _this$_popupInstance4 === void 0 || _this$_popupInstance4.show();
    }
  }
  hide() {
    if (this._dialogInfo.shouldHidePopup()) {
      var _this$_popupInstance5;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_popupInstance5 = this._popupInstance) === null || _this$_popupInstance5 === void 0 || _this$_popupInstance5.hide();
    }
    if (this._afterClosing) {
      this._afterClosing();
    }
  }
}
exports.GanttDialog = GanttDialog;
