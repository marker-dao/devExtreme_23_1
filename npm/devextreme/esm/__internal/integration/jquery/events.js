/**
* DevExtreme (esm/__internal/integration/jquery/events.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerEventCallbacks from '../../../common/core/events/core/event_registrator_callbacks';
import domAdapter from '../../core/m_dom_adapter';
import eventsEngine from '../../events/core/m_events_engine';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
import useJQueryFn from './use_jquery';
const useJQuery = useJQueryFn();
if (useJQuery) {
  registerEventCallbacks.add((name, eventObject) => {
    jQuery.event.special[name] = eventObject;
  });
  if (eventsEngine.passiveEventHandlersSupported()) {
    eventsEngine.forcePassiveFalseEventNames.forEach(eventName => {
      jQuery.event.special[eventName] = {
        setup(data, namespaces, handler) {
          domAdapter.listen(this, eventName, handler, {
            passive: false
          });
        }
      };
    });
  }
  eventsEngine.set({
    on(element) {
      // @ts-expect-error
      // eslint-disable-next-line prefer-spread,prefer-rest-params
      jQuery(element).on.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    one(element) {
      // @ts-expect-error
      // eslint-disable-next-line prefer-spread,prefer-rest-params
      jQuery(element).one.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    off(element) {
      // @ts-expect-error
      // eslint-disable-next-line prefer-spread,prefer-rest-params
      jQuery(element).off.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    trigger(element) {
      // @ts-expect-error
      // eslint-disable-next-line prefer-spread,prefer-rest-params
      jQuery(element).trigger.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    triggerHandler(element) {
      // @ts-expect-error
      // eslint-disable-next-line prefer-spread,prefer-rest-params,@stylistic/max-len
      jQuery(element).triggerHandler.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    Event: jQuery.Event
  });
}
