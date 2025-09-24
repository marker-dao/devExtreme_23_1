"use strict";

var _globals = require("@jest/globals");
var ReactiveDev = _interopRequireWildcard(require("./dev/reactive_primitives/index"));
var Reactive = _interopRequireWildcard(require("./prod/reactive_primitives/index"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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