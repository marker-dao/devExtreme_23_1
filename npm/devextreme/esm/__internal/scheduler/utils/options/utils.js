/**
* DevExtreme (esm/__internal/scheduler/utils/options/utils.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isObject } from '../../../../core/utils/type';
import { dateUtils } from '../../../core/utils/m_date';
import { dateSerialization } from '../../../core/utils/m_date_serialization';
import { extend } from '../../../core/utils/m_extend';
import { DEFAULT_VIEW_OPTIONS, VIEW_TYPES } from './constants_view';
const isKnownView = view => VIEW_TYPES.includes(isObject(view) ? view.type : view);
const isExistedView = view => Boolean(view);
const normalizeView = view => isObject(view) ? extend({}, DEFAULT_VIEW_OPTIONS[view.type], view) : DEFAULT_VIEW_OPTIONS[view];
export const getViews = views => views.filter(isKnownView).map(normalizeView).filter(isExistedView);
export function getCurrentView(currentView, views) {
  const viewsProps = getViews(views);
  const currentViewProps = viewsProps.find(view => [view.name, view.type].includes(currentView));
  return currentViewProps ?? DEFAULT_VIEW_OPTIONS[currentView] ?? viewsProps[0] ?? DEFAULT_VIEW_OPTIONS[VIEW_TYPES[0]];
}
export const parseDateOption = date => date ? new Date(dateSerialization.deserializeDate(date)) : undefined;
export const parseCurrentDate = date => {
  const deserialized = parseDateOption(date);
  return dateUtils.trimTime(deserialized);
};
const isDateOption = optionName => ['currentDate', 'min', 'max'].includes(optionName);
export const getViewOption = (optionName, currentOptionValue) => {
  if (!isDateOption(optionName)) {
    return currentOptionValue;
  }
  const date = optionName === 'currentDate' ? parseCurrentDate(currentOptionValue) : parseDateOption(currentOptionValue);
  return date;
};
