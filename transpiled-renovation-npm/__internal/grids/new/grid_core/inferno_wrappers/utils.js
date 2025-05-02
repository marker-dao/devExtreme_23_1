"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRef = wrapRef;
function wrapRef(ref) {
  return {
    // @ts-expect-error
    dxRenderer: true,
    get 0() {
      return ref.current;
    },
    get() {
      return ref.current;
    },
    length: 1
  };
}