/**
* DevExtreme (cjs/__internal/grids/new/grid_core/search/utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitHighlightedText = exports.createFilterExpression = exports.compareTextPart = exports.calculateSearchFilter = exports.allowSearch = exports.addSearchTextBox = void 0;
var _type = require("../../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _m_utils = _interopRequireDefault(require("../../../../grids/grid_core/m_utils"));
var _common = require("../utils/common");
var _index = require("../utils/parse_value/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable
  @typescript-eslint/explicit-module-boundary-types,
  @typescript-eslint/no-explicit-any
*/

const HIGHLIGHT_SPLIT_SEPARATOR = '<--|-->';
const FILTERING_TIMEOUT = 700;
const CLASS = {
  searchPanel: 'search-panel'
};
const compareTextPart = (textPart, searchStr, caseSensitive) => caseSensitive ? textPart === searchStr : textPart.toLowerCase() === searchStr.toLowerCase();
exports.compareTextPart = compareTextPart;
const splitHighlightedText = (text, _ref) => {
  var _text$match;
  let {
    enabled,
    searchStr,
    caseSensitive
  } = _ref;
  if (!enabled || !searchStr) {
    return null;
  }
  // NOTE: backslash special characters for correct regexp matches
  const normalizedSearchStr = searchStr.replace(/\W|_/g, match => `\\${match}`);
  const regExp = new RegExp(normalizedSearchStr, `g${caseSensitive ? '' : 'i'}`);
  if (!((_text$match = text.match(regExp)) !== null && _text$match !== void 0 && _text$match.length)) {
    return null;
  }
  return text.replace(regExp, match => `${HIGHLIGHT_SPLIT_SEPARATOR}${match}${HIGHLIGHT_SPLIT_SEPARATOR}`).split(HIGHLIGHT_SPLIT_SEPARATOR).filter(textPart => !!textPart).map(textPart => ({
    type: compareTextPart(textPart, searchStr, caseSensitive) ? 'highlighted' : 'usual',
    text: textPart
  }));
};
exports.splitHighlightedText = splitHighlightedText;
const allowSearch = (column, searchVisibleColumnsOnly) => {
  const allowSearchByVisibility = !searchVisibleColumnsOnly || column.visible;
  const allowSearchByConfig = column.allowSearch;
  return allowSearchByVisibility && allowSearchByConfig;
};
exports.allowSearch = allowSearch;
const createFilterExpression = (column, filterValue, selectedFilterOperation, target) => {
  let result = column.calculateFilterExpression(filterValue, selectedFilterOperation, target);
  if ((0, _type.isFunction)(result)) {
    result = [result, '=', true];
  }
  return result;
};
exports.createFilterExpression = createFilterExpression;
const calculateSearchFilter = (text, columns, searchVisibleColumnsOnly) => {
  const filters = [];
  if (!text) return null;
  for (const column of columns) {
    if (allowSearch(column, searchVisibleColumnsOnly)) {
      const filterValue = (0, _index.parseValue)(column, text);
      if (filterValue !== undefined) {
        const expression = createFilterExpression(column, filterValue, undefined, 'search');
        filters.push(expression);
      }
    }
  }
  if (filters.length === 0) {
    return ['!'];
  }
  return _m_utils.default.combineFilters(filters, 'or');
};
// eslint-disable-next-line @typescript-eslint/init-declarations
exports.calculateSearchFilter = calculateSearchFilter;
let timer;
const addSearchTextBox = (props, setTextBoxRef) => ({
  name: 'searchPanel',
  showText: 'inMenu',
  location: 'after',
  locateInMenu: 'auto',
  widget: 'dxTextBox',
  options: {
    onContentReady: _ref2 => {
      let {
        component
      } = _ref2;
      setTextBoxRef(component);
    },
    onInput: e => {
      clearTimeout(timer);
      const component = e.component;
      const newValue = component._input().val();
      timer = setTimeout(() => {
        var _props$onValueChanged;
        (_props$onValueChanged = props.onValueChanged) === null || _props$onValueChanged === void 0 || _props$onValueChanged.call(props, newValue);
      }, FILTERING_TIMEOUT);
    },
    value: props.value,
    placeholder: props.placeholder,
    width: props.width,
    inputAttr: {
      'aria-label': _message.default.format(`${(0, _common.getName)()}-ariaSearchInGrid`)
    },
    elementAttr: {
      class: (0, _common.addWidgetPrefix)(CLASS.searchPanel)
    },
    mode: 'search',
    onDisposing: () => {
      clearTimeout(timer);
    }
  }
});
exports.addSearchTextBox = addSearchTextBox;
