import messageLocalization from '../../../../../localization/message';
import filterUtils from '../../../../../ui/shared/filtering';
import { defaultSetFieldValue } from '../editing/utils';
import { parseValue } from '../utils/parse_value/index';
export const defaultColumnProperties = {
  dataType: 'string',
  calculateFieldValue(data) {
    // @ts-expect-error
    const value = data[this.dataField];
    return parseValue(this, value) ?? value;
  },
  calculateDisplayValue(data) {
    return this.calculateFieldValue(data);
  },
  calculateFilterExpression: filterUtils.defaultCalculateFilterExpression,
  defaultCalculateFilterExpression: filterUtils.defaultCalculateFilterExpression,
  alignment: 'left',
  visible: true,
  allowReordering: true,
  allowHiding: true,
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
  date: {
    format: 'shortDate'
  },
  datetime: {
    format: 'shortDateShortTime'
  },
  number: {},
  object: {}
};
export const defaultOptions = {
  allowColumnReordering: false
};