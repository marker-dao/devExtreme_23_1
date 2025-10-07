/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/popup/view.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditPopupView = void 0;
var _renderer = _interopRequireDefault(require("../../../../../../core/renderer"));
var _index = require("../../../../../core/state_manager/index");
var _m_extend = require("../../../../../core/utils/m_extend");
var _m_editing_utils = require("../../../../../grids/grid_core/editing/m_editing_utils");
var _inferno = require("inferno");
var _columns_controller = require("../../columns_controller/columns_controller");
var _view = require("../../core/view");
var _items_controller = require("../../items_controller/items_controller");
var _index2 = require("../../keyboard_navigation/index");
var _options_controller = require("../../options_controller/options_controller");
var _controller = require("../../toolbar/controller");
var _controller2 = require("../controller");
var _utils = require("../utils");
var _component = require("./component");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-explicit-any */
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
    this.items = (0, _index.computed)(() => {
      const userItems = this.options.oneWay('editing.form.items').value;
      if (userItems) {
        return userItems;
      }
      return this.columnsController.columns.value.map(column => ({
        column,
        name: column.name,
        dataField: column.dataField
      }));
    });
    this.customEditorItems = (0, _index.computed)(() => {
      const items = this.items.value;
      const result = [];
      (0, _m_editing_utils.forEachFormItems)(items, item => {
        const itemId = (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.dataField);
        if (itemId && !!item.editorType) {
          result.push(itemId);
        }
      });
      return result;
    });
    this.visible = (0, _index.computed)(() => !!this.editingController.editingCard.value);
    this.customizeItems = item => {
      var _simpleFormItem$edito, _editingCard$fields$f;
      const editingCard = this.editingController.editingCard.peek();
      const columns = this.columnsController.columns.peek();
      const customEditorItems = this.customEditorItems.peek();
      if (!editingCard) {
        return;
      }
      if (item.itemType !== 'simple') {
        return;
      }
      const simpleFormItem = item;
      const itemId = simpleFormItem.name ?? simpleFormItem.dataField;
      const column = simpleFormItem.column ?? columns.find(c => c.name === itemId) ?? columns.find(c => c.dataField === itemId);
      if (!column) {
        return;
      }
      simpleFormItem.column = column;
      if (itemId && !customEditorItems.includes(itemId)) {
        simpleFormItem.editorType = EDITOR_TYPES_BY_DATA_TYPE[column.dataType];
      }
      (0, _m_extend.extend)(simpleFormItem, column.formItem);
      simpleFormItem.dataField ?? (simpleFormItem.dataField = column.dataField);
      simpleFormItem.validationRules ?? (simpleFormItem.validationRules = column.validationRules);
      simpleFormItem.label = _extends({
        text: column.caption
      }, column.formItem.label);
      const originalContentReady = simpleFormItem === null || simpleFormItem === void 0 || (_simpleFormItem$edito = simpleFormItem.editorOptions) === null || _simpleFormItem$edito === void 0 ? void 0 : _simpleFormItem$edito.onContentReady;
      simpleFormItem.editorOptions = _extends({
        stylingMode: 'outlined',
        disabled: !column.allowEditing
      }, column.editorOptions, column.formItem.editorOptions, simpleFormItem.editorOptions, {
        onValueChanged: async _ref => {
          let {
            value
          } = _ref;
          const newData = {};
          await this.promises.add(Promise.resolve(column.setFieldValue.bind(column)(newData, value, editingCard.data)));
          this.editingController.addChange(editingCard.key, newData);
        },
        value: (editingCard === null || editingCard === void 0 || (_editingCard$fields$f = editingCard.fields.find(c => c.column.name === column.name)) === null || _editingCard$fields$f === void 0 ? void 0 : _editingCard$fields$f.value) ?? null,
        onContentReady: e => {
          // TODO: refactor
          setTimeout(() => {
            var _$$data;
            // @ts-expect-error
            (_$$data = (0, _renderer.default)(e.element).data('dxValidator')) === null || _$$data === void 0 || _$$data.option('dataGetter', () => {
              var _this$editingControll;
              return {
                data: (_this$editingControll = this.editingController.editingCard.peek()) === null || _this$editingControll === void 0 ? void 0 : _this$editingControll.data,
                column
              };
            });
          });
          originalContentReady === null || originalContentReady === void 0 || originalContentReady(e);
        }
      });
      if (simpleFormItem.editorType === 'dxDateBox') {
        simpleFormItem.editorOptions.type = column.dataType;
      }
    };
    this.toolbar.addDefaultItem((0, _index.signal)({
      name: 'addCardButton',
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'add',
        onClick: () => this.editingController.addCard()
      }
    }), this.editingController.allowAdding);
    this.editingController.provideValidateMethod(async () => {
      const form = this.formRef.current;
      if (!form) {
        return true;
      }
      const preValidationResult = form.validate();
      const validationResult = await (preValidationResult.complete ?? preValidationResult);
      return !!validationResult.isValid;
    });
  }
  getProps() {
    return (0, _index.computed)(() => ({
      visible: this.visible.value,
      formProps: this.options.oneWay('editing.form').value,
      popupProps: this.options.oneWay('editing.popup').value,
      formRef: this.formRef,
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
      customizeItem: this.customizeItems,
      texts: this.editingController.texts.value // TODO: bad typing
    }));
  }
}
exports.EditPopupView = EditPopupView;
EditPopupView.dependencies = [_options_controller.OptionsController, _columns_controller.ColumnsController, _items_controller.ItemsController, _controller2.EditingController, _controller.ToolbarController, _index2.KeyboardNavigationController];
