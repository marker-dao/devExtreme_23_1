/**
* DevExtreme (cjs/common/core/environment/init_mobile_viewport/init_mobile_viewport.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.initMobileViewport = void 0;
var _size = require("../../../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _window = require("../../../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _extend = require("../../../../core/utils/extend");
var _resize_callbacks = _interopRequireDefault(require("../../../../core/utils/resize_callbacks"));
var _style = require("../../../../core/utils/style");
var _m_devices = _interopRequireDefault(require("../../../../__internal/core/m_devices"));
var _m_dom_adapter = _interopRequireDefault(require("../../../../__internal/core/m_dom_adapter"));
var _m_support = _interopRequireDefault(require("../../../../__internal/core/utils/m_support"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
const initMobileViewport = function (options) {
  options = (0, _extend.extend)({}, options);
  let realDevice = _m_devices.default.real();
  const allowZoom = options.allowZoom;
  const allowPan = options.allowPan;
  const allowSelection = 'allowSelection' in options ? options.allowSelection : realDevice.platform === 'generic';
  const metaSelector = 'meta[name=viewport]';
  if (!(0, _renderer.default)(metaSelector).length) {
    (0, _renderer.default)('<meta>').attr('name', 'viewport').appendTo('head');
  }
  const metaVerbs = ['width=device-width'];
  const msTouchVerbs = [];
  if (allowZoom) {
    msTouchVerbs.push('pinch-zoom');
  } else {
    metaVerbs.push('initial-scale=1.0', 'maximum-scale=1.0, user-scalable=no');
  }
  if (allowPan) {
    msTouchVerbs.push('pan-x', 'pan-y');
  }
  if (!allowPan && !allowZoom) {
    (0, _renderer.default)('html, body').css({
      'msContentZooming': 'none',
      'msUserSelect': 'none',
      'overflow': 'hidden'
    });
  } else {
    (0, _renderer.default)('html').css('msOverflowStyle', '-ms-autohiding-scrollbar');
  }
  if (!allowSelection && _m_support.default.supportProp('userSelect')) {
    (0, _renderer.default)('.dx-viewport').css((0, _style.styleProp)('userSelect'), 'none');
  }
  (0, _renderer.default)(metaSelector).attr('content', metaVerbs.join());
  (0, _renderer.default)('html').css('msTouchAction', msTouchVerbs.join(' ') || 'none');
  realDevice = _m_devices.default.real();
  if (_m_support.default.touch) {
    _events_engine.default.off(_m_dom_adapter.default.getDocument(), '.dxInitMobileViewport');
    _events_engine.default.on(_m_dom_adapter.default.getDocument(), 'dxpointermove.dxInitMobileViewport', function (e) {
      const count = e.pointers.length;
      const isTouchEvent = e.pointerType === 'touch';
      const zoomDisabled = !allowZoom && count > 1;
      const panDisabled = !allowPan && count === 1 && !e.isScrollingEvent;
      if (isTouchEvent && (zoomDisabled || panDisabled)) {
        e.preventDefault();
      }
    });
  }
  if (realDevice.ios) {
    const isPhoneGap = _m_dom_adapter.default.getLocation().protocol === 'file:';
    if (!isPhoneGap) {
      // NOTE: fix app size after device rotation in Safari when keyboard was shown
      _resize_callbacks.default.add(function () {
        const windowWidth = (0, _size.getWidth)(window);
        (0, _size.setWidth)((0, _renderer.default)('body'), windowWidth);
      });
    }
  }
  if (realDevice.android) {
    _resize_callbacks.default.add(function () {
      setTimeout(function () {
        const activeElement = _m_dom_adapter.default.getActiveElement();
        activeElement.scrollIntoViewIfNeeded ? activeElement.scrollIntoViewIfNeeded() : activeElement.scrollIntoView(false);
      });
    });
  }
};
exports.initMobileViewport = initMobileViewport;
