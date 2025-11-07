/**
* DevExtreme (cjs/__internal/grids/new/grid_core/lifecycle/controller.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifeCycleController = void 0;
/* eslint-disable max-classes-per-file */
class LifeCycleEvent {
  constructor() {
    this.callbacks = new Set();
  }
  schedule(cb) {
    this.callbacks.add(cb);
  }
  trigger() {
    for (const cb of this.callbacks) {
      cb();
    }
    this.callbacks.clear();
  }
}
/**
 * Controller which can be used to manage lifecycle events, such as rendering, initializing etc.
 *
 * @remarks
 * Please DON'T USE this controller when you're able not to use it.
 * Its purpose is to schedule some imperative things
 * (creating effects, triggering public API callback etc).
 * 99% that you can omit using it, for example using state signal to provide updated value.
 */
class LifeCycleController {
  constructor() {
    this.contentRendered = new LifeCycleEvent();
  }
  provideContentReadyCallback(cb) {
    this.contentReadyCallback = cb;
  }
  fireContentReady() {
    var _this$contentReadyCal;
    (_this$contentReadyCal = this.contentReadyCallback) === null || _this$contentReadyCal === void 0 || _this$contentReadyCal.call(this);
  }
}
exports.LifeCycleController = LifeCycleController;
LifeCycleController.dependencies = [];
