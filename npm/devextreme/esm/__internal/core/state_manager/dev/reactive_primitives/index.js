/**
* DevExtreme (esm/__internal/core/state_manager/dev/reactive_primitives/index.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as Reactive from '../../prod/reactive_primitives/index';
export function signal(initialValue) {
  const signalInstance = Reactive.signal(initialValue);
  const trace = new Error().stack;
  if (trace) {
    Object.defineProperty(signalInstance, 'stack', {
      value: trace,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  return signalInstance;
}
export function computed(fn) {
  const computedInstance = Reactive.computed(fn);
  const trace = new Error().stack;
  if (trace) {
    Object.defineProperty(computedInstance, 'stack', {
      value: trace,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  return computedInstance;
}
export function effect(fn) {
  return Reactive.effect(fn);
}
export function batch(fn) {
  Reactive.batch(fn);
}
// eslint-disable-next-line spellcheck/spell-checker
export function untracked(fn) {
  // eslint-disable-next-line spellcheck/spell-checker
  return Reactive.untracked(fn);
}
