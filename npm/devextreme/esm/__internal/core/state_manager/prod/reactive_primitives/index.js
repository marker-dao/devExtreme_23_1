/**
* DevExtreme (esm/__internal/core/state_manager/prod/reactive_primitives/index.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as SignalsCore from '@preact/signals-core';
export function signal(initialValue) {
  return SignalsCore.signal(initialValue);
}
export function computed(fn) {
  return SignalsCore.computed(fn);
}
export function effect(fn) {
  return SignalsCore.effect(fn);
}
export function batch(fn) {
  SignalsCore.batch(fn);
}
// eslint-disable-next-line spellcheck/spell-checker
export function untracked(fn) {
  // eslint-disable-next-line spellcheck/spell-checker
  return SignalsCore.untracked(fn);
}
