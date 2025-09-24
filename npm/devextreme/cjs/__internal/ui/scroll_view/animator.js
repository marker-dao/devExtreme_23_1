/**
* DevExtreme (cjs/__internal/ui/scroll_view/animator.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frame = require("../../../common/core/animation/frame");
var _class = _interopRequireDefault(require("../../../core/class"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Animator {
  constructor() {
    this._finished = true;
    this._stopped = false;
    this._proxiedStepCore = this._stepCore.bind(this);
  }
  start() {
    this._stopped = false;
    this._finished = false;
    this._stepCore();
  }
  stop() {
    this._stopped = true;
    (0, _frame.cancelAnimationFrame)(this._stepAnimationFrame);
  }
  _stepCore() {
    if (this._isStopped()) {
      this._stop();
      return;
    }
    if (this._isFinished()) {
      this._finished = true;
      this._complete();
      return;
    }
    this._step();
    this._stepAnimationFrame = (0, _frame.requestAnimationFrame)(this._proxiedStepCore);
  }
  _step() {
    _class.default.abstract();
  }
  _isFinished() {
    return this._finished;
  }
  _stop() {}
  _complete() {}
  _isStopped() {
    return this._stopped;
  }
  inProgress() {
    return !(this._stopped || this._finished);
  }
}
var _default = exports.default = Animator;
