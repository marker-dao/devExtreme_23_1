/**
* DevExtreme (cjs/__internal/integration/jquery/hooks.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_iterator = require("../../core/utils/m_iterator");
var _m_type = require("../../core/utils/m_type");
var _m_version = require("../../core/utils/m_version");
var _m_event_registrator = _interopRequireDefault(require("../../events/core/m_event_registrator"));
var _m_hook_touch_props = _interopRequireDefault(require("../../events/core/m_hook_touch_props"));
var _index = require("../../events/utils/index");
var _jquery = _interopRequireDefault(require("jquery"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  if ((0, _m_version.compare)(_jquery.default.fn.jquery, [3]) < 0) {
    const POINTER_TYPE_MAP = {
      2: 'touch',
      3: 'pen',
      4: 'mouse'
    };
    (0, _m_iterator.each)(['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel', 'MSPointerOver', 'MSPointerOut', 'mouseenter', 'mouseleave', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave'
    // eslint-disable-next-line func-names
    ], function () {
      // @ts-expect-error
      _jquery.default.event.fixHooks[this] = {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        filter(event, originalEvent) {
          const {
            pointerType
          } = originalEvent;
          if ((0, _m_type.isNumeric)(pointerType)) {
            event.pointerType = POINTER_TYPE_MAP[pointerType];
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return event;
        },
        // @ts-expect-error
        props: _jquery.default.event.mouseHooks.props.concat(['pointerId', 'pointerType', 'originalTarget', 'width', 'height', 'pressure', 'result', 'tiltX', 'charCode', 'tiltY', 'detail', 'isPrimary', 'prevValue'])
      };
    });
    (0, _m_iterator.each)(['touchstart', 'touchmove', 'touchend', 'touchcancel'], function () {
      // @ts-expect-error
      _jquery.default.event.fixHooks[this] = {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        filter(event, originalEvent) {
          (0, _m_hook_touch_props.default)((name, hook) => {
            event[name] = hook(originalEvent);
          });
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return event;
        },
        // @ts-expect-error
        props: _jquery.default.event.mouseHooks.props.concat(['touches', 'changedTouches', 'targetTouches', 'detail', 'result', 'originalTarget', 'charCode', 'prevValue'])
      };
    });
    // @ts-expect-error
    _jquery.default.event.fixHooks.wheel = _jquery.default.event.mouseHooks;
    const DX_EVENT_HOOKS = {
      // @ts-expect-error
      props: _jquery.default.event.mouseHooks.props.concat(['pointerType', 'pointerId', 'pointers'])
    };
    _m_event_registrator.default.callbacks.add(name => {
      // @ts-expect-error
      _jquery.default.event.fixHooks[name] = DX_EVENT_HOOKS;
    });
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fix = function (event, originalEvent) {
      // @ts-expect-error
      const fixHook = _jquery.default.event.fixHooks[originalEvent.type] || _jquery.default.event.mouseHooks;
      // @ts-expect-error
      const props = fixHook.props ? _jquery.default.event.props.concat(fixHook.props) : _jquery.default.event.props;
      let propIndex = props.length;
      // eslint-disable-next-line no-cond-assign
      while (propIndex -= 1) {
        const prop = props[propIndex];
        event[prop] = originalEvent[prop];
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    };
    (0, _index.setEventFixMethod)(fix);
  } else {
    (0, _m_hook_touch_props.default)((name, hook) => {
      // @ts-expect-error
      _jquery.default.event.addProp(name, hook);
    });
  }
}
