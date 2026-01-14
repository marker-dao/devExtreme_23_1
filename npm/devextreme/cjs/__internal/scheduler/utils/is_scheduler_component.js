/**
* DevExtreme (cjs/__internal/scheduler/utils/is_scheduler_component.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSchedulerComponent = isSchedulerComponent;
const schedulerComponentName = 'dxScheduler';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function isSchedulerComponent(component) {
  return component.NAME === schedulerComponentName;
}
