/**
* DevExtreme (cjs/renovation/ui/scheduler/model/untyped_getCurrentView.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.renovationGetCurrentView = void 0;
var _type = require("../../../../core/utils/type");
const VIEW_TYPES = ['day', 'week', 'workWeek', 'month', 'timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth', 'agenda'];
const renovationGetCurrentView = (currentView, views) => {
  let currentViewProps = views.find(view => {
    const names = (0, _type.isObject)(view) ? [view.name, view.type] : [view];
    if (names.includes(currentView)) {
      return true;
    }
    return false;
  });
  if (currentViewProps === undefined) {
    if (VIEW_TYPES.includes(currentView)) {
      currentViewProps = currentView;
    } else {
      [currentViewProps] = views;
    }
  }
  return currentViewProps;
};
exports.renovationGetCurrentView = renovationGetCurrentView;
