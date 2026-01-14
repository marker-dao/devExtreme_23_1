/**
* DevExtreme (cjs/__internal/core/state_manager/reactive_primitives.test.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var ReactiveDev = _interopRequireWildcard(require("./dev/reactive_primitives/index"));
var Reactive = _interopRequireWildcard(require("./prod/reactive_primitives/index"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/* eslint-disable spellcheck/spell-checker */

(0, _globals.describe)('Reactive wrapper', () => {
  _globals.describe.each([['Prod', Reactive], ['Dev', ReactiveDev]])('%s version', (name, ReactiveModule) => {
    (0, _globals.it)('signal correctly wrapped', () => {
      const testSignal = ReactiveModule.signal(42);
      (0, _globals.expect)(testSignal.value).toBe(42);
      if (name === 'Dev') {
        (0, _globals.expect)('stack' in testSignal).toBeTruthy();
      }
    });
    (0, _globals.it)('computed correctly wrapped', () => {
      const testSignal = ReactiveModule.signal(42);
      (0, _globals.expect)(testSignal.value).toBe(42);
      // eslint-disable-next-line @stylistic/max-len
      const testComputed = ReactiveModule.computed(() => testSignal.value * 2);
      (0, _globals.expect)(testComputed.value).toBe(84);
      if (name === 'Dev') {
        (0, _globals.expect)('stack' in testComputed).toBeTruthy();
      }
    });
    (0, _globals.it)('batch correctly wrapped', () => {
      const testSignal = ReactiveModule.signal(42);
      (0, _globals.expect)(testSignal.value).toBe(42);
      let batchRan = false;
      ReactiveModule.batch(() => {
        batchRan = true;
        testSignal.value = 50;
      });
      (0, _globals.expect)(batchRan).toBe(true);
    });
    (0, _globals.it)('effect and untracked correctly wrapped', () => {
      const untrackedSignal = ReactiveModule.signal('Jane');
      const trackedSignal = ReactiveModule.signal('tracked');
      let untrackedEffectRunCount = 0;
      const untrackedDispose = ReactiveModule.effect(() => {
        untrackedEffectRunCount += 1;
        ReactiveModule.untracked(() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          untrackedSignal.value;
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        trackedSignal.value;
      });
      (0, _globals.expect)(untrackedEffectRunCount).toBe(1);
      untrackedSignal.value = 'Doe';
      (0, _globals.expect)(untrackedEffectRunCount).toBe(1);
      trackedSignal.value = 'updated';
      (0, _globals.expect)(untrackedEffectRunCount).toBe(2);
      untrackedDispose();
    });
  });
});
