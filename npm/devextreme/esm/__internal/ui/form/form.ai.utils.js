/**
* DevExtreme (esm/__internal/ui/form/form.ai.utils.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Color from '../../../color';
import { isObject } from '../../../core/utils/type';
import errors from '../../../ui/widget/ui.errors';
import { dateUtilsTs } from '../../core/utils/date';
const getEditorTypeInfo = editorType => {
  switch (editorType) {
    case 'dxDateBox':
    case 'dxCalendar':
      return 'date in ISO format';
    case 'dxDateRangeBox':
      return 'date range in ISO format, use pattern {start}:::{end}';
    case 'dxColorBox':
      return 'color in hex format';
    case 'dxCheckBox':
    case 'dxSwitch':
      return 'boolean value, true or false';
    case 'dxNumberBox':
    case 'dxSlider':
      return 'numeric value';
    case 'dxRangeSlider':
      return 'numeric range, use pattern {start}:::{end}';
    default:
      return 'text';
  }
};
export const parseResultForEditorType = (dataField, editorType, value) => {
  const errorValue = JSON.stringify(value);
  switch (editorType) {
    case 'dxDateBox':
    case 'dxCalendar':
      if (!dateUtilsTs.isValidDate(value)) {
        throw errors.Error('E1064', dataField, errorValue, 'date');
      }
      return value;
    case 'dxDateRangeBox':
      if (!Array.isArray(value) || value.length > 2 || value.some(item => !dateUtilsTs.isValidDate(item))) {
        throw errors.Error('E1064', dataField, errorValue, 'date range');
      }
      return value;
    case 'dxColorBox':
      if (new Color(value).colorIsInvalid) {
        throw errors.Error('E1064', dataField, errorValue, 'color');
      }
      return value;
    case 'dxCheckBox':
    case 'dxSwitch':
      if (value === 'false') {
        return false;
      }
      if (value === 'true') {
        return true;
      }
      throw errors.Error('E1064', dataField, errorValue, 'boolean');
    case 'dxNumberBox':
    case 'dxSlider':
      if (Array.isArray(value) || isNaN(parseFloat(value))) {
        throw errors.Error('E1064', dataField, errorValue, 'number');
      }
      return value;
    case 'dxRangeSlider':
      if (!Array.isArray(value) || value.length > 2 || value.some(item => isNaN(parseFloat(item)))) {
        throw errors.Error('E1064', dataField, errorValue, 'number range');
      }
      return value;
    case 'dxHtmlEditor':
      if (Array.isArray(value)) {
        throw errors.Error('E1064', dataField, errorValue, 'string');
      }
      return value;
    default:
      return value;
  }
};
const getItemsAcceptedValuesInfo = editorOptions => {
  if (!(editorOptions !== null && editorOptions !== void 0 && editorOptions.items)) {
    return '';
  }
  const items = editorOptions.items.map(item => {
    if (isObject(item)) {
      return item.text;
    }
    return item;
  });
  const acceptedValues = `, accepted values: ${items.join(', ')}, split values with :::`;
  const customItemsAllowed = editorOptions !== null && editorOptions !== void 0 && editorOptions.acceptCustomValue ? ' (custom values are allowed)' : '';
  return `${acceptedValues}${customItemsAllowed}`;
};
export const getItemFormatInfo = _ref => {
  let {
    editorType,
    editorOptions
  } = _ref;
  const dataType = getEditorTypeInfo(editorType);
  const acceptedValues = getItemsAcceptedValuesInfo(editorOptions);
  return `${dataType}${acceptedValues}`;
};
