/**
* DevExtreme (esm/__internal/core/state_manager/reactive_primitives.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { describe, expect, it } from '@jest/globals';
import * as ReactiveDev from './dev/reactive_primitives/index';
import * as Reactive from './prod/reactive_primitives/index';
describe('Reactive wrapper', () => {
  describe.each([['Prod', Reactive], ['Dev', ReactiveDev]])('%s version', (name, ReactiveModule) => {
    it('signal correctly wrapped', () => {
      const testSignal = ReactiveModule.signal(42);
      expect(testSignal.value).toBe(42);
      if (name === 'Dev') {
        expect('stack' in testSignal).toBeTruthy();
      }
    });
    it('computed correctly wrapped', () => {
      const testSignal = ReactiveModule.signal(42);
      expect(testSignal.value).toBe(42);
      // eslint-disable-next-line @stylistic/max-len
      const testComputed = ReactiveModule.computed(() => testSignal.value * 2);
      expect(testComputed.value).toBe(84);
      if (name === 'Dev') {
        expect('stack' in testComputed).toBeTruthy();
      }
    });
    it('batch correctly wrapped', () => {
      const testSignal = ReactiveModule.signal(42);
      expect(testSignal.value).toBe(42);
      let batchRan = false;
      ReactiveModule.batch(() => {
        batchRan = true;
        testSignal.value = 50;
      });
      expect(batchRan).toBe(true);
    });
    it('effect and untracked correctly wrapped', () => {
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
      expect(untrackedEffectRunCount).toBe(1);
      untrackedSignal.value = 'Doe';
      expect(untrackedEffectRunCount).toBe(1);
      trackedSignal.value = 'updated';
      expect(untrackedEffectRunCount).toBe(2);
      untrackedDispose();
    });
  });
});
