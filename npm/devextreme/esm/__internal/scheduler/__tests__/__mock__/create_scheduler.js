/**
* DevExtreme (esm/__internal/scheduler/__tests__/__mock__/create_scheduler.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Scheduler from '../../../scheduler/m_scheduler';
import { createSchedulerModel } from './model/scheduler';
export const createScheduler = async config => {
  const container = document.createElement('div');
  const scheduler = new Scheduler(container, config);
  await new Promise(process.nextTick);
  document.body.appendChild(container);
  return {
    container,
    scheduler,
    POM: createSchedulerModel(container),
    keydown: (element, key) => {
      element.dispatchEvent(new KeyboardEvent('keydown', {
        key,
        bubbles: true
      }));
    }
  };
};
