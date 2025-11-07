/**
* DevExtreme (esm/__internal/grids/new/grid_core/search/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable
  @typescript-eslint/explicit-module-boundary-types,
  @typescript-eslint/no-explicit-any
*/
import { isFunction } from '../../../../../core/utils/type';
import messageLocalization from '../../../../../localization/message';
import gridCoreUtils from '../../../../grids/grid_core/m_utils';
import { addWidgetPrefix, getName } from '../utils/common';
import { parseValue } from '../utils/parse_value/index';
const HIGHLIGHT_SPLIT_SEPARATOR = '<--|-->';
const FILTERING_TIMEOUT = 700;
const CLASS = {
  searchPanel: 'search-panel'
};
export const compareTextPart = (textPart, searchStr, caseSensitive) => caseSensitive ? textPart === searchStr : textPart.toLowerCase() === searchStr.toLowerCase();
export const splitHighlightedText = (text, _ref) => {
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
export const allowSearch = (column, searchVisibleColumnsOnly) => {
  const allowSearchByVisibility = !searchVisibleColumnsOnly || column.visible;
  const allowSearchByConfig = column.allowSearch;
  return allowSearchByVisibility && allowSearchByConfig;
};
export const createFilterExpression = (column, filterValue, selectedFilterOperation, target) => {
  let result = column.calculateFilterExpression(filterValue, selectedFilterOperation, target);
  if (isFunction(result)) {
    result = [result, '=', true];
  }
  return result;
};
export const calculateSearchFilter = (text, columns, searchVisibleColumnsOnly) => {
  const filters = [];
  if (!text) return null;
  for (const column of columns) {
    if (allowSearch(column, searchVisibleColumnsOnly)) {
      const filterValue = parseValue(column, text);
      if (filterValue !== undefined) {
        const expression = createFilterExpression(column, filterValue, undefined, 'search');
        filters.push(expression);
      }
    }
  }
  if (filters.length === 0) {
    return ['!'];
  }
  return gridCoreUtils.combineFilters(filters, 'or');
};
// eslint-disable-next-line @typescript-eslint/init-declarations
let timer;
export const addSearchTextBox = (props, setTextBoxRef) => ({
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
      'aria-label': messageLocalization.format(`${getName()}-ariaSearchInGrid`)
    },
    elementAttr: {
      class: addWidgetPrefix(CLASS.searchPanel)
    },
    mode: 'search',
    onDisposing: () => {
      clearTimeout(timer);
    }
  }
});
