"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.macroTaskArrayMap = exports.macroTaskArrayForEach = exports.DEFAULT_STEPS_VALUE = exports.DEFAULT_MACRO_TASK_TIMEOUT = void 0;
var _dispatcher = _interopRequireDefault(require("./dispatcher"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_STEPS_VALUE = exports.DEFAULT_STEPS_VALUE = 100;
const DEFAULT_MACRO_TASK_TIMEOUT = exports.DEFAULT_MACRO_TASK_TIMEOUT = 0;
const macroTaskArrayForEach = async function (array, callback) {
  let step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_STEPS_VALUE;
  let macroTaskTimeoutMs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_MACRO_TASK_TIMEOUT;
  const promises = [];
  const batchesCount = Math.ceil(array.length / step);
  for (let batchIdx = 0; batchIdx < batchesCount; batchIdx += 1) {
    const scheduledTask = _dispatcher.default.schedule(() => {
      const startIdx = batchIdx * step;
      const maxIdx = startIdx + step;
      for (let idx = startIdx; idx < maxIdx && array[idx] !== undefined; idx += 1) {
        callback(array[idx]);
      }
    }, macroTaskTimeoutMs);
    promises.push(scheduledTask);
  }
  await Promise.all(promises);
};
exports.macroTaskArrayForEach = macroTaskArrayForEach;
const macroTaskArrayMap = async function (array, callback) {
  let step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_STEPS_VALUE;
  let macroTaskTimeoutMs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_MACRO_TASK_TIMEOUT;
  const result = [];
  await macroTaskArrayForEach(array, item => {
    result.push(callback(item));
  }, step, macroTaskTimeoutMs);
  return result;
};
exports.macroTaskArrayMap = macroTaskArrayMap;