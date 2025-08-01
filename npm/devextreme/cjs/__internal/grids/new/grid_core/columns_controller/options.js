/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/options.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.defaultColumnPropertiesByDataType = exports.defaultColumnProperties = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _filtering = _interopRequireDefault(require("../../../../../ui/shared/filtering"));
var _utils = require("../editing/utils");
var _index = require("../utils/parse_value/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultColumnProperties = exports.defaultColumnProperties = {
  dataType: 'string',
  calculateFieldValue(data) {
    // @ts-expect-error
    const value = data[this.dataField];
    return (0, _index.parseValue)(this, value) ?? value;
  },
  calculateDisplayValue(data) {
    return this.calculateFieldValue(data);
  },
  calculateFilterExpression: _filtering.default.defaultCalculateFilterExpression,
  defaultCalculateFilterExpression: _filtering.default.defaultCalculateFilterExpression,
  alignment: 'left',
  visible: true,
  allowReordering: true,
  allowHiding: true,
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
