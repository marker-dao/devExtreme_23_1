/**
* DevExtreme (esm/__internal/events/m_hover.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerEvent from '../../common/core/events/core/event_registrator';
import eventsEngine from '../../common/core/events/core/events_engine';
import pointerEvents from '../../common/core/events/pointer';
import { addNamespace, fireEvent, isTouchEvent } from '../../common/core/events/utils/index';
import Class from '../../core/class';
import { data as elementData, removeData } from '../../core/element_data';
import devices from '../core/m_devices';
const HOVERSTART_NAMESPACE = 'dxHoverStart';
const HOVERSTART = 'dxhoverstart';
const POINTERENTER_NAMESPACED_EVENT_NAME = addNamespace(pointerEvents.enter, HOVERSTART_NAMESPACE);
const HOVEREND_NAMESPACE = 'dxHoverEnd';
const HOVEREND = 'dxhoverend';
const POINTERLEAVE_NAMESPACED_EVENT_NAME = addNamespace(pointerEvents.leave, HOVEREND_NAMESPACE);
const Hover = Class.inherit({
  noBubble: true,
  ctor() {
    this._handlerArrayKeyPath = `${this._eventNamespace}_HandlerStore`;
  },
  setup(element) {
    elementData(element, this._handlerArrayKeyPath, {});
  },
  add(element, handleObj) {
    const that = this;
    const handler = function (e) {
      that._handler(e);
    };
    eventsEngine.on(element, this._originalEventName, handleObj.selector, handler);
    elementData(element, this._handlerArrayKeyPath)[handleObj.guid] = handler;
  },
  _handler(e) {
    if (isTouchEvent(e) || devices.isSimulator()) {
      return;
    }
    fireEvent({
      type: this._eventName,
      originalEvent: e,
      delegateTarget: e.delegateTarget
    });
  },
  remove(element, handleObj) {
    const handler = elementData(element, this._handlerArrayKeyPath)[handleObj.guid];
    // @ts-expect-error
    eventsEngine.off(element, this._originalEventName, handleObj.selector, handler);
  },
  teardown(element) {
    removeData(element, this._handlerArrayKeyPath);
  }
});
const HoverStart = Hover.inherit({
  ctor() {
    this._eventNamespace = HOVERSTART_NAMESPACE;
    this._eventName = HOVERSTART;
    this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
    this.callBase();
  },
  _handler(e) {
    const pointers = e.pointers || [];
    if (!pointers.length) {
      this.callBase(e);
    }
  }
});
const HoverEnd = Hover.inherit({
  ctor() {
    this._eventNamespace = HOVEREND_NAMESPACE;
    this._eventName = HOVEREND;
    this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
    this.callBase();
  }
});
registerEvent(HOVERSTART, new HoverStart());
registerEvent(HOVEREND, new HoverEnd());
export { HOVEREND as end, HOVERSTART as start };
