/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/popup/view.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditPopupView = void 0;
var _signalsCore = require("@preact/signals-core");
var _inferno = require("inferno");
var _columns_controller = require("../../columns_controller/columns_controller");
var _view = require("../../core/view");
var _items_controller = require("../../items_controller/items_controller");
var _index = require("../../keyboard_navigation/index");
var _options_controller = require("../../options_controller/options_controller");
var _controller = require("../../toolbar/controller");
var _controller2 = require("../controller");
var _utils = require("../utils");
var _component = require("./component");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const EDITOR_TYPES_BY_DATA_TYPE = {
  string: 'dxTextBox',
  number: 'dxNumberBox',
  boolean: 'dxCheckBox',
  object: 'dxTextBox',
  date: 'dxDateBox',
  datetime: 'dxDateBox'
};
class EditPopupView extends _view.View {
  constructor(options, columnsController, itemsController, editingController, toolbar, kbn) {
    super();
    this.options = options;
    this.columnsController = columnsController;
    this.itemsController = itemsController;
    this.editingController = editingController;
    this.toolbar = toolbar;
    this.kbn = kbn;
    this.promises = new _utils.PendingPromises();
    this.formRef = (0, _inferno.createRef)();
    this.component = _component.EditPopup;
    this.items = (0, _signalsCore.computed)(() => this.columnsController.columns.value.map(column => _extends({
      // @ts-expect-error
      column,
      name: column.name,
      dataField: column.dataField,
      validationRules: column.validationRules,
      label: _extends({
        text: column.caption
      }, column.formItem.label),
      editorType: EDITOR_TYPES_BY_DATA_TYPE[column.dataType],
      editorOptions: _extends({}, column.editorOptions, {
        disabled: !column.allowEditing
      }, column.formItem.editorOptions)
    }, column.formItem)));
    this.formData = (0, _signalsCore.computed)(() => {
      const editCard = this.editingController.editingCard.value;
      return (editCard === null || editCard === void 0 ? void 0 : editCard.data) && _extends({}, editCard.data);
    });
    this.customizeItems = (0, _signalsCore.computed)(() => item => {
      var _editingCard$fields$f;
      const editingCard = this.editingController.editingCard.value;
      if (!editingCard) {
        return;
      }
      const column = this.columnsController.columns.peek().find(c => c.name === item.name);
      item.editorOptions ?? (item.editorOptions = {});
      item.editorOptions.onValueChanged = async _ref => {
        var _this$formRef$current;
        let {
          value
        } = _ref;
        const newData = {};
        await this.promises.add(Promise.resolve(column.setFieldValue.bind(column)(newData, value, editingCard.data)));
        this.editingController.addChange(editingCard.key, newData);
        (_this$formRef$current = this.formRef.current) === null || _this$formRef$current === void 0 || _this$formRef$current.repaint();
      };
      item.editorOptions.value = editingCard === null || editingCard === void 0 || (_editingCard$fields$f = editingCard.fields.find(c => c.column.name === column.name)) === null || _editingCard$fields$f === void 0 ? void 0 : _editingCard$fields$f.value;
    });
    this.toolbar.addDefaultItem((0, _signalsCore.signal)({
      name: 'addCardButton',
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'add',
        onClick: () => this.editingController.addCard()
      }
    }), this.editingController.allowAdding);
  }
  getProps() {
    return (0, _signalsCore.computed)(() => ({
      formProps: this.options.oneWay('editing.form').value,
      popupProps: this.options.oneWay('editing.popup').value,
      formRef: this.formRef,
      data: this.formData.value,
      onSave: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.editingController.save();
        this.kbn.returnFocus();
      },
      onCancel: () => {
        this.editingController.cancel();
        this.kbn.returnFocus();
      },
      onHide: () => {
        this.editingController.cancel();
        this.kbn.returnFocus();
      },
      items: this.items.value,
      customizeItem: this.customizeItems.value
    }));
  }
}
exports.EditPopupView = EditPopupView;
EditPopupView.dependencies = [_options_controller.OptionsController, _columns_controller.ColumnsController, _items_controller.ItemsController, _controller2.EditingController, _controller.ToolbarController, _index.KeyboardNavigationController];
