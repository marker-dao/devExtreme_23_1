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