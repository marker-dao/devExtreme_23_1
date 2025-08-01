/**
* DevExtreme (esm/__internal/events/utils/m_event_nodes_disposing.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../common/core/events/core/events_engine';
import { removeEvent } from '../../../common/core/events/remove';
function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(node => !!node);
}
export const subscribeNodesDisposing = (event, callback) => {
  eventsEngine.one(nodesByEvent(event), removeEvent, callback);
};
export const unsubscribeNodesDisposing = (event, callback) => {
  eventsEngine.off(nodesByEvent(event), removeEvent, callback);
};
