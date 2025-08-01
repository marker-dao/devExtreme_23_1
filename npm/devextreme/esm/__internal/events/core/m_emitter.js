/**
* DevExtreme (esm/__internal/events/core/m_emitter.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { fireEvent, hasTouches, isDxMouseWheelEvent } from '../../../common/core/events/utils/index';
import Class from '../../../core/class';
import $ from '../../../core/renderer';
import Callbacks from '../../../core/utils/callbacks';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
const Emitter = Class.inherit({
  ctor(element) {
    this._$element = $(element);
    this._cancelCallback = Callbacks();
    this._acceptCallback = Callbacks();
  },
  getElement() {
    return this._$element;
  },
  validate(e) {
    return !isDxMouseWheelEvent(e);
  },
  validatePointers(e) {
    return hasTouches(e) === 1;
  },
  allowInterruptionByMouseWheel() {
    return true;
  },
  configure(data) {
    extend(this, data);
  },
  addCancelCallback(callback) {
    this._cancelCallback.add(callback);
  },
  removeCancelCallback() {
    this._cancelCallback.empty();
  },
  _cancel(e) {
    this._cancelCallback.fire(this, e);
  },
  addAcceptCallback(callback) {
    this._acceptCallback.add(callback);
  },
  removeAcceptCallback() {
    this._acceptCallback.empty();
  },
  _accept(e) {
    this._acceptCallback.fire(this, e);
  },
  _requestAccept(e) {
    this._acceptRequestEvent = e;
  },
  _forgetAccept() {
    this._accept(this._acceptRequestEvent);
    this._acceptRequestEvent = null;
  },
  start: noop,
  move: noop,
  end: noop,
  cancel: noop,
  reset() {
    if (this._acceptRequestEvent) {
      this._accept(this._acceptRequestEvent);
    }
  },
  _fireEvent(eventName, e, params) {
    const eventData = extend({
      type: eventName,
      originalEvent: e,
      target: this._getEmitterTarget(e),
      delegateTarget: this.getElement().get(0)
    }, params);
    e = fireEvent(eventData);
    if (e.cancel) {
      this._cancel(e);
    }
    return e;
  },
  _getEmitterTarget(e) {
    return (this.delegateSelector ? $(e.target).closest(this.delegateSelector) : this.getElement()).get(0);
  },
  dispose: noop
});
export default Emitter;
