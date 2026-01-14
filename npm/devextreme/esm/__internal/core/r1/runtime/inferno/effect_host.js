/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/effect_host.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/array-type */
export const InfernoEffectHost = {
  lockCount: 0,
  lock() {
    this.lockCount++;
  },
  callbacks: [],
  callEffects() {
    this.lockCount--;
    if (this.lockCount < 0) {
      throw new Error('Unexpected Effect Call');
    }
    if (this.lockCount === 0) {
      const effects = this.callbacks;
      this.callbacks = [];
      effects.forEach(callback => callback());
    }
  }
};
