"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScheduler = void 0;
var _m_scheduler = _interopRequireDefault(require("../../../scheduler/m_scheduler"));
var _scheduler = require("./model/scheduler");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createScheduler = async config => {
  const container = document.createElement('div');
  const scheduler = new _m_scheduler.default(container, config);
  await new Promise(process.nextTick);
  document.body.appendChild(container);
  return {
    container,
    scheduler,
    POM: (0, _scheduler.createSchedulerModel)(container),
    keydown: (element, key) => {
      element.dispatchEvent(new KeyboardEvent('keydown', {
        key,
        bubbles: true
      }));
    }
  };
};
exports.createScheduler = createScheduler;