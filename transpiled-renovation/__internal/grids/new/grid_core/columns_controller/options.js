"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.defaultColumnPropertiesByDataType = exports.defaultColumnProperties = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _filtering = _interopRequireDefault(require("../../../../../ui/shared/filtering"));
var _utils = require("../editing/utils");
var _utils2 = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultColumnProperties = exports.defaultColumnProperties = {
  dataType: 'string',
  calculateFieldValue(data) {
    // @ts-expect-error
    const value = data[this.dataField];
    return (0, _utils2.parseValue)(this, value) ?? value;
  },
  calculateDisplayValue(data) {
    // @ts-expect-error
    return data[this.dataField];
  },
  calculateFilterExpression: _filtering.default.defaultCalculateFilterExpression,
  alignment: 'left',
  visible: true,
  allowReordering: true,
  allowSorting: true,
  allowHiding: true,
  allowFiltering: true,
  allowHeaderFiltering: true,
  allowSearch: true,
  trueText: _message.default.format('dxDataGrid-trueText'),
  falseText: _message.default.format('dxDataGrid-falseText'),
  showInColumnChooser: true,
  validationRules: [],
  allowEditing: true,
  editorOptions: {},
  formItem: {},
  setFieldValue: _utils.defaultSetFieldValue,
  defaultSetFieldValue: _utils.defaultSetFieldValue
};
const defaultColumnPropertiesByDataType = exports.defaultColumnPropertiesByDataType = {
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
const defaultOptions = exports.defaultOptions = {
  allowColumnReordering: false
};