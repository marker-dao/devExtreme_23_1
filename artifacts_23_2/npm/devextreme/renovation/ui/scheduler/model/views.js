/**
* DevExtreme (renovation/ui/scheduler/model/views.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getValidGroups = exports.getCurrentViewProps = exports.getCurrentViewConfig = exports.getCurrentView = void 0;
exports.getViewConfigProp = getViewConfigProp;
var _untyped_getCurrentView = require("./untyped_getCurrentView");
var _type = require("../../../../core/utils/type");
const _excluded = ["height", "scrolling", "width"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const getCurrentView = _untyped_getCurrentView.renovationGetCurrentView;
exports.getCurrentView = getCurrentView;
const getCurrentViewProps = (currentView, views) => {
  const currentViewProps = getCurrentView(currentView, views);
  return (0, _type.isString)(currentViewProps) ? {
    type: currentViewProps
  } : currentViewProps;
};
exports.getCurrentViewProps = getCurrentViewProps;
function getViewConfigProp(schedulerProp, viewProp) {
  return viewProp !== undefined ? viewProp : schedulerProp;
}
const getCurrentViewConfig = (currentViewProps, schedulerProps, currentDate) => {
  const {
      scrolling: schedulerScrolling
    } = schedulerProps,
    restSchedulerProps = _objectWithoutPropertiesLoose(schedulerProps, _excluded);
  const {
    scrolling
  } = currentViewProps;
  const isVirtualScrolling = schedulerScrolling.mode === 'virtual' || (scrolling === null || scrolling === void 0 ? void 0 : scrolling.mode) === 'virtual';
  const crossScrollingEnabled = schedulerProps.crossScrollingEnabled || isVirtualScrolling;
  const result = _extends({
    scrolling: schedulerScrolling
  }, restSchedulerProps, currentViewProps, {
    schedulerHeight: schedulerProps.height,
    schedulerWidth: schedulerProps.width,
    crossScrollingEnabled,
    appointmentTemplate: currentViewProps.appointmentTemplate || restSchedulerProps.appointmentTemplate,
    dataCellTemplate: currentViewProps.dataCellTemplate || restSchedulerProps.dataCellTemplate,
    dateCellTemplate: currentViewProps.dateCellTemplate || restSchedulerProps.dateCellTemplate,
    timeCellTemplate: currentViewProps.timeCellTemplate || restSchedulerProps.timeCellTemplate,
    resourceCellTemplate: currentViewProps.resourceCellTemplate || restSchedulerProps.resourceCellTemplate,
    appointmentCollectorTemplate: currentViewProps.appointmentCollectorTemplate || restSchedulerProps.appointmentCollectorTemplate,
    appointmentTooltipTemplate: currentViewProps.appointmentTooltipTemplate || restSchedulerProps.appointmentTooltipTemplate,
    allDayPanelMode: currentViewProps.allDayPanelMode || restSchedulerProps.allDayPanelMode
  });
  return _extends({}, result, {
    hoursInterval: result.cellDuration / 60,
    allDayPanelExpanded: true,
    allowMultipleCellSelection: true,
    currentDate
  });
};
exports.getCurrentViewConfig = getCurrentViewConfig;
const getValidGroups = (schedulerGroups, viewGroups) => getViewConfigProp(schedulerGroups, viewGroups);
exports.getValidGroups = getValidGroups;