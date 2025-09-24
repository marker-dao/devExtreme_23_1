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