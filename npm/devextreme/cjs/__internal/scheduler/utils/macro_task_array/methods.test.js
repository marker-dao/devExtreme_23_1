/**
* DevExtreme (cjs/__internal/scheduler/utils/macro_task_array/methods.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _dispatcher = _interopRequireDefault(require("./dispatcher"));
var _methods = require("./methods");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
_globals.jest.mock('./dispatcher', () => {
  const actualModule = _globals.jest.requireActual('./dispatcher');
  return _extends({}, actualModule.default, {
    schedule: _globals.jest.fn()
  });
});
const scheduleFnMock = _globals.jest.fn();
_globals.jest.useFakeTimers();
(0, _globals.describe)('Scheduler', () => {
  (0, _globals.describe)('MacroTaskArray', () => {
    (0, _globals.describe)('Methods', () => {
      (0, _globals.beforeEach)(() => {
        scheduleFnMock.mockReset();
        _dispatcher.default.schedule = scheduleFnMock;
      });
      (0, _globals.describe)('macroTaskArrayForEach', () => {
        _globals.it.each([{
          arraySize: 10,
          step: 1,
          expectedCalls: 10
        }, {
          arraySize: 10,
          step: 2,
          expectedCalls: 5
        }, {
          arraySize: 10,
          step: 3,
          expectedCalls: 4
        }, {
          arraySize: 3,
          step: 4,
          expectedCalls: 1
        }, {
          arraySize: 0,
          step: 10,
          expectedCalls: 0
        }])('should split array into batches (arraySize = $arraySize | step = $step)', async _ref => {
          let {
            arraySize,
            step,
            expectedCalls
          } = _ref;
          await (0, _methods.macroTaskArrayForEach)(new Array(arraySize), _globals.jest.fn(), step);
          (0, _globals.expect)(scheduleFnMock).toHaveBeenCalledTimes(expectedCalls);
        });
        _globals.it.each([{
          arraySize: 10,
          step: 1
        }, {
          arraySize: 10,
          step: 2
        }, {
          arraySize: 10,
          step: 3
        }, {
          arraySize: 3,
          step: 4
        }, {
          arraySize: 0,
          step: 10
        }])('should call callback for each array item (arraySize = $arraySize | step = $step)', async _ref2 => {
          let {
            arraySize,
            step
          } = _ref2;
          const callbackMock = _globals.jest.fn();
          scheduleFnMock.mockImplementation(callback => {
            callback();
            return Promise.resolve();
          });
          const array = new Array(arraySize).fill(0).map((_, idx) => idx);
          await (0, _methods.macroTaskArrayForEach)(array, callbackMock, step);
          (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(arraySize);
          (0, _globals.expect)(callbackMock.mock.calls).toEqual(array.map(item => [item]));
        });
        (0, _globals.it)('should pass macroTaskTimeoutMs to dispatcher', async () => {
          const testDelayMs = 12345;
          await (0, _methods.macroTaskArrayForEach)(new Array(10), _globals.jest.fn(), 100, testDelayMs);
          (0, _globals.expect)(scheduleFnMock).toHaveBeenCalledTimes(1);
          (0, _globals.expect)(scheduleFnMock).toHaveBeenCalledWith(_globals.expect.anything(), testDelayMs);
        });
      });
      (0, _globals.describe)('macroTaskArrayMap', () => {
        _globals.it.each([{
          arraySize: 10,
          step: 1,
          expectedCalls: 10
        }, {
          arraySize: 10,
          step: 2,
          expectedCalls: 5
        }, {
          arraySize: 10,
          step: 3,
          expectedCalls: 4
        }, {
          arraySize: 3,
          step: 4,
          expectedCalls: 1
        }, {
          arraySize: 0,
          step: 10,
          expectedCalls: 0
        }])('should split array into batches (arraySize = $arraySize | step = $step)', async _ref3 => {
          let {
            arraySize,
            step,
            expectedCalls
          } = _ref3;
          await (0, _methods.macroTaskArrayMap)(new Array(arraySize), _globals.jest.fn(), step);
          (0, _globals.expect)(scheduleFnMock).toHaveBeenCalledTimes(expectedCalls);
        });
        _globals.it.each([{
          arraySize: 10,
          step: 1
        }, {
          arraySize: 10,
          step: 2
        }, {
          arraySize: 10,
          step: 3
        }, {
          arraySize: 3,
          step: 4
        }, {
          arraySize: 0,
          step: 10
        }])('should call callback for each array item (arraySize = $arraySize | step = $step)', async _ref4 => {
          let {
            arraySize,
            step
          } = _ref4;
          const callbackMock = _globals.jest.fn();
          scheduleFnMock.mockImplementation(callback => {
            callback();
            return Promise.resolve();
          });
          const array = new Array(arraySize).fill(0).map((_, idx) => idx);
          await (0, _methods.macroTaskArrayMap)(array, callbackMock, step);
          (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(arraySize);
          (0, _globals.expect)(callbackMock.mock.calls).toEqual(array.map(item => [item]));
        });
        (0, _globals.it)('should return mapped result', async () => {
          const callbackFn = item => `${item}_processed`;
          scheduleFnMock.mockImplementation(callback => {
            callback();
            return Promise.resolve();
          });
          const array = new Array(10).fill(0).map((_, idx) => idx);
          const result = await (0, _methods.macroTaskArrayMap)(array, callbackFn, 10);
          (0, _globals.expect)(result).toEqual(array.map(callbackFn));
        });
        (0, _globals.it)('should pass macroTaskTimeoutMs to dispatcher', async () => {
          const testDelayMs = 12345;
          await (0, _methods.macroTaskArrayMap)(new Array(10), _globals.jest.fn(), 100, testDelayMs);
          (0, _globals.expect)(scheduleFnMock).toHaveBeenCalledTimes(1);
          (0, _globals.expect)(scheduleFnMock).toHaveBeenCalledWith(_globals.expect.anything(), testDelayMs);
        });
      });
    });
  });
});
