import messageLocalization from '../../../../../localization/message';
import filterUtils from '../../../../../ui/shared/filtering';
import { defaultSetFieldValue } from '../editing/utils';
export const defaultColumnProperties = {
  dataType: 'string',
  calculateFieldValue(data) {
    // @ts-expect-error
    return data[this.dataField];
  },
  calculateDisplayValue(data) {
    return this.calculateFieldValue(data);
  },
  calculateFilterExpression: filterUtils.defaultCalculateFilterExpression,
  alignment: 'left',
  visible: true,
  allowReordering: true,
  allowSorting: true,
  allowHiding: true,
  allowFiltering: true,
  allowHeaderFiltering: true,
  allowSearch: true,
  trueText: messageLocalization.format('dxDataGrid-trueText'),
  falseText: messageLocalization.format('dxDataGrid-falseText'),
  showInColumnChooser: true,
  validationRules: [],
  allowEditing: true,
  editorOptions: {},
  formItem: {},
  setFieldValue: defaultSetFieldValue,
  defaultSetFieldValue
};
export const defaultColumnPropertiesByDataType = {
  boolean: {
    customizeText(_ref) {
      let {
        value
      } = _ref;
      return value ? this.trueText : this.falseText;
    }
  },
  string: {},
  date: {},
  datetime: {},
  number: {},
  object: {}
};
export const defaultOptions = {
  allowColumnReordering: false
};