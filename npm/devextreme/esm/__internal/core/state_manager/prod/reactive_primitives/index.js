/**
* DevExtreme (esm/__internal/core/state_manager/prod/reactive_primitives/index.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
