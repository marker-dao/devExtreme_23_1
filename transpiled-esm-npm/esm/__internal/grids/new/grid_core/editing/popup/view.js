import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-explicit-any */
import $ from '../../../../../../core/renderer';
import { computed, signal } from '../../../../../core/state_manager/index';
import { extend } from '../../../../../core/utils/m_extend';
import { forEachFormItems } from '../../../../../grids/grid_core/editing/m_editing_utils';
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
    this.items = computed(() => {
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
    this.customEditorItems = computed(() => {
      const items = this.items.value;
      const result = [];
      forEachFormItems(items, item => {
        const itemId = (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.dataField);
        if (itemId && !!item.editorType) {
          result.push(itemId);
        }
      });
      return result;
    });
    this.visible = computed(() => !!this.editingController.editingCard.value);
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
      extend(simpleFormItem, column.formItem);
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
            (_$$data = $(e.element).data('dxValidator')) === null || _$$data === void 0 || _$$data.option('dataGetter', () => {
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
    this.toolbar.addDefaultItem(signal({
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
    return computed(() => ({
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
EditPopupView.dependencies = [OptionsController, ColumnsController, ItemsController, EditingController, ToolbarController, KeyboardNavigationController];