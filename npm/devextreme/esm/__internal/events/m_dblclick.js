/**
* DevExtreme (esm/__internal/events/m_dblclick.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { name as clickEventName } from '../../common/core/events/click';
import eventsEngine from '../../common/core/events/core/events_engine';
import { addNamespace, fireEvent } from '../../common/core/events/utils/index';
import Class from '../../core/class';
import domAdapter from '../../core/dom_adapter';
import { closestCommonParent } from '../../core/utils/dom';
const DBLCLICK_EVENT_NAME = 'dxdblclick';
const DBLCLICK_NAMESPACE = 'dxDblClick';
const NAMESPACED_CLICK_EVENT = addNamespace(clickEventName, DBLCLICK_NAMESPACE);
const DBLCLICK_TIMEOUT = 300;
const DblClick = Class.inherit({
  ctor() {
    this._handlerCount = 0;
    this._forgetLastClick();
  },
  _forgetLastClick() {
    this._firstClickTarget = null;
    this._lastClickTimeStamp = -DBLCLICK_TIMEOUT;
  },
  add() {
    if (this._handlerCount <= 0) {
      eventsEngine.on(domAdapter.getDocument(), NAMESPACED_CLICK_EVENT, this._clickHandler.bind(this));
    }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this._handlerCount += 1;
  },
  _clickHandler(e) {
    const timeStamp = e.timeStamp || Date.now();
    const timeBetweenClicks = timeStamp - this._lastClickTimeStamp;
    // NOTE: jQuery sets `timeStamp = Date.now()` for the triggered events, but
    // in the real event timeStamp is the number of milliseconds elapsed from the
    // beginning of the current document's lifetime till the event was created
    // (https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp).
    const isSimulated = timeBetweenClicks < 0;
    const isDouble = !isSimulated && timeBetweenClicks < DBLCLICK_TIMEOUT;
    if (isDouble) {
      fireEvent({
        type: DBLCLICK_EVENT_NAME,
        target: closestCommonParent(this._firstClickTarget, e.target),
        originalEvent: e
      });
      this._forgetLastClick();
    } else {
      this._firstClickTarget = e.target;
      this._lastClickTimeStamp = timeStamp;
      clearTimeout(this._lastClickClearTimeout);
      this._lastClickClearTimeout = setTimeout(() => {
        this._forgetLastClick();
      }, DBLCLICK_TIMEOUT * 2);
    }
  },
  remove() {
    this._handlerCount -= 1;
    if (this._handlerCount <= 0) {
      this._forgetLastClick();
      eventsEngine.off(domAdapter.getDocument(), NAMESPACED_CLICK_EVENT, undefined);
      clearTimeout(this._lastClickClearTimeout);
      this._handlerCount = 0;
    }
  }
});
const dblClick = new DblClick();
export { dblClick, DBLCLICK_EVENT_NAME as name };
