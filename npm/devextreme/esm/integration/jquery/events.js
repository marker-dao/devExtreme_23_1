/**
* DevExtreme (esm/integration/jquery/events.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import eventsEngine from '../../common/core/events/core/events_engine';
import useJQueryFn from './use_jquery';
import registerEventCallbacks from '../../common/core/events/core/event_registrator_callbacks';
import domAdapter from '../../core/dom_adapter';
const useJQuery = useJQueryFn();
if (useJQuery) {
  registerEventCallbacks.add(function (name, eventObject) {
    jQuery.event.special[name] = eventObject;
  });
  if (eventsEngine.passiveEventHandlersSupported()) {
    eventsEngine.forcePassiveFalseEventNames.forEach(function (eventName) {
      jQuery.event.special[eventName] = {
        setup: function (data, namespaces, handler) {
          domAdapter.listen(this, eventName, handler, {
            passive: false
          });
        }
      };
    });
  }
  eventsEngine.set({
    on: function (element) {
      jQuery(element).on.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    one: function (element) {
      jQuery(element).one.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    off: function (element) {
      jQuery(element).off.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    trigger: function (element) {
      jQuery(element).trigger.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    triggerHandler: function (element) {
      jQuery(element).triggerHandler.apply(jQuery(element), Array.prototype.slice.call(arguments, 1));
    },
    Event: jQuery.Event
  });
}
