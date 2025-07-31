/**
* DevExtreme (esm/__internal/grids/new/grid_core/utils/parse_value/parse_value.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../../../../common/core/localization/date';
import { isDefined, isNumeric, isString } from '../../../../../../core/utils/type';
import { strictParseNumber } from '../../../../../grids/grid_core/columns_controller/m_columns_controller_utils';
import gridCoreUtils from '../../../../../grids/grid_core/m_utils';
export const parseNumberValue = (text, format) => {
  switch (true) {
    case isString(text) && !!format:
      return strictParseNumber(text.trim(), format);
    case isDefined(text) && isNumeric(text):
      return Number(text);
    default:
      return undefined;
  }
};
export const parseBooleanValue = (text, trueText, falseText) => {
  switch (true) {
    case text === trueText:
      return true;
    case text === falseText:
      return false;
    default:
      return undefined;
  }
};
export const parseDateValue = (text, format) => {
  let parsedValue = null;
  if (format) {
    try {
      // @ts-expect-error
      parsedValue = dateLocalization.parse(text, format);
    } catch {
      parsedValue = null;
    }
  }
  if (!parsedValue) {
    parsedValue = new Date(text);
  }
  return isNaN(parsedValue.getTime()) ? text : parsedValue;
};
export const parseValue = (column, text) => {
  switch (true) {
    case column.dataType === 'number':
      return parseNumberValue(text, column.format);
    case column.dataType === 'boolean':
      return parseBooleanValue(text, column.trueText, column.falseText);
    case gridCoreUtils.isDateType(column.dataType):
      return parseDateValue(text, column.format);
    default:
      return text;
  }
};
