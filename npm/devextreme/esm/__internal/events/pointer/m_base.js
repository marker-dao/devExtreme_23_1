/**
* DevExtreme (esm/__internal/events/pointer/m_base.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../common/core/events/core/events_engine';
import { getEventTarget } from '../../../common/core/events/utils/event_target';
import { addNamespace, eventSource, fireEvent } from '../../../common/core/events/utils/index';
import Class from '../../../core/class';
import domAdapter from '../../../core/dom_adapter';
import browser from '../../../core/utils/browser';
const POINTER_EVENTS_NAMESPACE = 'dxPointerEvents';
const BaseStrategy = Class.inherit({
  ctor(eventName, originalEvents) {
    this._eventName = eventName;
    this._originalEvents = addNamespace(originalEvents, POINTER_EVENTS_NAMESPACE);
    this._handlerCount = 0;
    this.noBubble = this._isNoBubble();
  },
  _isNoBubble() {
    const eventName = this._eventName;
    return eventName === 'dxpointerenter' || eventName === 'dxpointerleave';
  },
  _handler(e) {
    const delegateTarget = this._getDelegateTarget(e);
    const event = {
      type: this._eventName,
      pointerType: e.pointerType || eventSource(e),
      originalEvent: e,
      delegateTarget,
      // NOTE: TimeStamp normalization (FF bug #238041) (T277118)
      timeStamp: browser.mozilla ? new Date().getTime() : e.timeStamp
    };
    const target = getEventTarget(e);
    // @ts-expect-error
    event.target = target;
    return this._fireEvent(event);
  },
  _getDelegateTarget(e) {
    let delegateTarget;
    if (this.noBubble) {
      delegateTarget = e.delegateTarget;
    }
    return delegateTarget;
  },
  _fireEvent(args) {
    return fireEvent(args);
  },
  _setSelector(handleObj) {
    this._selector = this.noBubble && handleObj ? handleObj.selector : null;
  },
  _getSelector() {
    return this._selector;
  },
  setup() {
    return true;
  },
  add(element, handleObj) {
    if (this._handlerCount <= 0 || this.noBubble) {
      element = this.noBubble ? element : domAdapter.getDocument();
      this._setSelector(handleObj);
      const that = this;
      eventsEngine.on(element, this._originalEvents, this._getSelector(), e => {
        that._handler(e);
      });
    }
    if (!this.noBubble) {
      this._handlerCount++;
    }
  },
  remove(handleObj) {
    this._setSelector(handleObj);
    if (!this.noBubble) {
      this._handlerCount--;
    }
  },
  teardown(element) {
    if (this._handlerCount && !this.noBubble) {
      return;
    }
    element = this.noBubble ? element : domAdapter.getDocument();
    if (this._originalEvents !== `.${POINTER_EVENTS_NAMESPACE}`) {
      eventsEngine.off(element, this._originalEvents, this._getSelector());
    }
  },
  dispose(element) {
    element = this.noBubble ? element : domAdapter.getDocument();
    eventsEngine.off(element, this._originalEvents);
  }
});
export default BaseStrategy;
