import _extends from "@babel/runtime/helpers/esm/extends";
import { computed, signal } from '@preact/signals-core';
import { createRef } from 'inferno';
import { ColumnsController } from '../../columns_controller/columns_controller';
import { View } from '../../core/view';
import { ItemsController } from '../../items_controller/items_controller';
import { KeyboardNavigationController } from '../../keyboard_navigation/index';
import { OptionsController } from '../../options_controller/options_controller';
import { ToolbarController } from '../../toolbar/controller';
import { EditingController } from '../controller';
import { PendingPromises } from '../utils';
import { EditPopup } from './component';
const EDITOR_TYPES_BY_DATA_TYPE = {
  string: 'dxTextBox',
  number: 'dxNumberBox',
  boolean: 'dxCheckBox',
  object: 'dxTextBox',
  date: 'dxDateBox',
  datetime: 'dxDateBox'
};
export class EditPopupView extends View {
  constructor(options, columnsController, itemsController, editingController, toolbar, kbn) {
    super();
    this.options = options;
    this.columnsController = columnsController;
    this.itemsController = itemsController;
    this.editingController = editingController;
    this.toolbar = toolbar;
    this.kbn = kbn;
    this.promises = new PendingPromises();
    this.formRef = createRef();
    this.component = EditPopup;
    this.items = computed(() => this.columnsController.columns.value.map(column => _extends({
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
    this.formData = computed(() => {
      const editCard = this.editingController.editingCard.value;
      return (editCard === null || editCard === void 0 ? void 0 : editCard.data) && _extends({}, editCard.data);
    });
    this.customizeItems = computed(() => item => {
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
    this.toolbar.addDefaultItem(signal({
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
    return computed(() => ({
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
EditPopupView.dependencies = [OptionsController, ColumnsController, ItemsController, EditingController, ToolbarController, KeyboardNavigationController];