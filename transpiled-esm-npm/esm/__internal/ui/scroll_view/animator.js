import { cancelAnimationFrame, requestAnimationFrame } from '../../../common/core/animation/frame';
import Class from '../../../core/class';
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
    cancelAnimationFrame(this._stepAnimationFrame);
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
    this._stepAnimationFrame = requestAnimationFrame(this._proxiedStepCore);
  }
  _step() {
    Class.abstract();
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
export default Animator;