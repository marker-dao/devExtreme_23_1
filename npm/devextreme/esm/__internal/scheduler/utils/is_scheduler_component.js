/**
* DevExtreme (esm/__internal/scheduler/utils/is_scheduler_component.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const schedulerComponentName = 'dxScheduler';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isSchedulerComponent(component) {
  return component.NAME === schedulerComponentName;
}
