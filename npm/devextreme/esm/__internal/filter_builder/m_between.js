/**
* DevExtreme (esm/__internal/filter_builder/m_between.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
const FILTER_BUILDER_RANGE_CLASS = 'dx-filterbuilder-range';
const FILTER_BUILDER_RANGE_START_CLASS = `${FILTER_BUILDER_RANGE_CLASS}-start`;
const FILTER_BUILDER_RANGE_END_CLASS = `${FILTER_BUILDER_RANGE_CLASS}-end`;
const FILTER_BUILDER_RANGE_SEPARATOR_CLASS = `${FILTER_BUILDER_RANGE_CLASS}-separator`;
const SEPARATOR = '\u2013';
function editorTemplate(conditionInfo, container) {
  const $editorStart = $('<div>').addClass(FILTER_BUILDER_RANGE_START_CLASS);
  const $editorEnd = $('<div>').addClass(FILTER_BUILDER_RANGE_END_CLASS);
  let values = conditionInfo.value || [];
  const getStartValue = function (values) {
    return values && values.length > 0 ? values[0] : null;
  };
  const getEndValue = function (values) {
    return values && values.length === 2 ? values[1] : null;
  };
  container.append($editorStart);
  container.append($('<span>').addClass(FILTER_BUILDER_RANGE_SEPARATOR_CLASS).text(SEPARATOR));
  container.append($editorEnd);
  container.addClass(FILTER_BUILDER_RANGE_CLASS);
  this._editorFactory.createEditor.call(this, $editorStart, extend({}, conditionInfo.field, conditionInfo, {
    value: getStartValue(values),
    parentType: 'filterBuilder',
    setValue(value) {
      values = [value, getEndValue(values)];
      conditionInfo.setValue(values);
    }
  }));
  this._editorFactory.createEditor.call(this, $editorEnd, extend({}, conditionInfo.field, conditionInfo, {
    value: getEndValue(values),
    parentType: 'filterBuilder',
    setValue(value) {
      values = [getStartValue(values), value];
      conditionInfo.setValue(values);
    }
  }));
}
export function getConfig(caption, context) {
  return {
    name: 'between',
    caption,
    icon: 'range',
    valueSeparator: SEPARATOR,
    dataTypes: ['number', 'date', 'datetime'],
    editorTemplate: editorTemplate.bind(context),
    notForLookup: true
  };
}
