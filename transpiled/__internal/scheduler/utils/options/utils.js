"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentView = getCurrentView;
exports.parseDateOption = exports.parseCurrentDate = exports.getViews = exports.getViewOption = void 0;
var _type = require("../../../../core/utils/type");
var _m_date = require("../../../core/utils/m_date");
var _m_date_serialization = require("../../../core/utils/m_date_serialization");
var _m_extend = require("../../../core/utils/m_extend");
var _constants_view = require("./constants_view");
const isKnownView = view => _constants_view.VIEW_TYPES.includes((0, _type.isObject)(view) ? view.type : view);
const isExistedView = view => Boolean(view);
const normalizeView = view => (0, _type.isObject)(view) ? (0, _m_extend.extend)({}, _constants_view.DEFAULT_VIEW_OPTIONS[view.type], view) : _constants_view.DEFAULT_VIEW_OPTIONS[view];
const getViews = views => views.filter(isKnownView).map(normalizeView).filter(isExistedView);
exports.getViews = getViews;
function getCurrentView(currentView, views) {
  const viewsProps = getViews(views);
  const currentViewProps = viewsProps.find(view => [view.name, view.type].includes(currentView));
  return currentViewProps ?? _constants_view.DEFAULT_VIEW_OPTIONS[currentView] ?? viewsProps[0] ?? _constants_view.DEFAULT_VIEW_OPTIONS[_constants_view.VIEW_TYPES[0]];
}
const parseDateOption = date => date ? new Date(_m_date_serialization.dateSerialization.deserializeDate(date)) : undefined;
exports.parseDateOption = parseDateOption;
const parseCurrentDate = date => {
  const deserialized = parseDateOption(date);
  return _m_date.dateUtils.trimTime(deserialized);
};
exports.parseCurrentDate = parseCurrentDate;
const isDateOption = optionName => ['currentDate', 'min', 'max'].includes(optionName);
const getViewOption = (optionName, currentOptionValue) => {
  if (!isDateOption(optionName)) {
    return currentOptionValue;
  }
  const date = optionName === 'currentDate' ? parseCurrentDate(currentOptionValue) : parseDateOption(currentOptionValue);
  return date;
};
exports.getViewOption = getViewOption;