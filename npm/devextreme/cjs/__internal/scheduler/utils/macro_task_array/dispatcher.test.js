/**
* DevExtreme (cjs/__internal/scheduler/utils/macro_task_array/dispatcher.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _dispatcher = _interopRequireWildcard(require("./dispatcher"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable @typescript-eslint/no-floating-promises */

_globals.jest.useFakeTimers();
(0, _globals.describe)('Scheduler', () => {
  (0, _globals.describe)('MacroTaskArray', () => {
    (0, _globals.describe)('Dispatcher', () => {
      (0, _globals.describe)('schedule', () => {
        (0, _globals.it)('should add timeout ids to timeout ids set', () => {
          _dispatcher.default.schedule(_globals.jest.fn(), 0).finally(() => {});
          _dispatcher.default.schedule(_globals.jest.fn(), 0).finally(() => {});
          (0, _globals.expect)(_dispatcher.macroTaskIdSet.size).toBe(2);
        });
        (0, _globals.it)('should remove timeout id from timeout ids set after macro task execution', async () => {
          const p1 = _dispatcher.default.schedule(_globals.jest.fn(), 0);
          const p2 = _dispatcher.default.schedule(_globals.jest.fn(), 0);
          _globals.jest.advanceTimersByTime(0);
          await Promise.all([p1, p2]);
          (0, _globals.expect)(_dispatcher.macroTaskIdSet.size).toBe(0);
        });
        (0, _globals.it)('should call callback as macro task', () => {
          const callbackMock = _globals.jest.fn();
          _dispatcher.default.schedule(callbackMock, 0).finally(() => {});
          (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(0);
          _globals.jest.advanceTimersByTime(0);
          (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        });
        (0, _globals.it)('should use macroTaskTimeoutMs form macro task delay', () => {
          const callbackMock = _globals.jest.fn();
          const macroTaskDelayMs = 1000;
          _dispatcher.default.schedule(callbackMock, macroTaskDelayMs).finally(() => {});
          (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(0);
          _globals.jest.advanceTimersByTime(macroTaskDelayMs / 2);
          (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(0);
          _globals.jest.advanceTimersByTime(macroTaskDelayMs / 2);
          (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        });
      });
      (0, _globals.describe)('dispose', () => {
        (0, _globals.it)('should clear scheduled macro tasks', () => {
          const clearTimeoutSpy = _globals.jest.spyOn(window, 'clearTimeout');
          _dispatcher.default.schedule(_globals.jest.fn(), 0).finally(() => {});
          _dispatcher.default.schedule(_globals.jest.fn(), 0).finally(() => {});
          const [firstId, secondId] = Array.from(_dispatcher.macroTaskIdSet);
          _dispatcher.default.dispose();
          (0, _globals.expect)(clearTimeoutSpy).toHaveBeenCalledTimes(2);
          (0, _globals.expect)(clearTimeoutSpy.mock.calls).toEqual([[firstId], [secondId]]);
        });
        (0, _globals.it)('should clear timeout ids set', () => {
          _dispatcher.default.schedule(_globals.jest.fn(), 0).finally(() => {});
          _dispatcher.default.schedule(_globals.jest.fn(), 0).finally(() => {});
          (0, _globals.expect)(_dispatcher.macroTaskIdSet.size).toBe(2);
          _dispatcher.default.dispose();
          (0, _globals.expect)(_dispatcher.macroTaskIdSet.size).toBe(0);
        });
      });
    });
  });
});
